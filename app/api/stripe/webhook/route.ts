import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';

// Use service role for webhook writes (bypasses RLS)
function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[Stripe Webhook] signature verification failed', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = getServiceClient();

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.CheckoutSession;
      const userId = session.metadata?.user_id;
      const planKey = session.metadata?.plan_key;

      if (!userId || !planKey) {
        console.warn('[Webhook] Missing metadata', session.id);
        return NextResponse.json({ received: true });
      }

      // Insert purchase record
      await supabase.from('purchases').insert({
        user_id: userId,
        stripe_customer_id: session.customer as string,
        stripe_session_id: session.id,
        price_id: session.line_items?.data?.[0]?.price?.id ?? null,
        plan_key: planKey,
        status: 'completed',
        amount_total: session.amount_total,
        currency: session.currency,
      });

      // Update profile plan
      await supabase
        .from('profiles')
        .update({ current_plan: planKey })
        .eq('id', userId);

      // Upsert credits (unlimited for paid plans)
      await supabase.from('credits').upsert(
        {
          user_id: userId,
          plan_key: planKey,
          credits_total: -1, // -1 = unlimited
          credits_used: 0,
        },
        { onConflict: 'user_id' }
      );

      // Track event
      await supabase.from('usage_events').insert({
        user_id: userId,
        event_name: 'purchase_completed',
        metadata: { plan_key: planKey, session_id: session.id },
      });
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.user_id;

      if (userId) {
        await supabase
          .from('profiles')
          .update({ current_plan: 'free' })
          .eq('id', userId);
      }
    }
  } catch (err) {
    console.error('[Stripe Webhook] processing error', err);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
