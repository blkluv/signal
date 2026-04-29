import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe, PLANS, type PlanKey } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { planKey } = body as { planKey: PlanKey };

    if (!planKey || !PLANS[planKey]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const plan = PLANS[planKey];

    if (plan.price === 0 || !plan.stripePriceId) {
      return NextResponse.json({ error: 'This plan does not require checkout' }, { status: 400 });
    }

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile?.email ?? user.email,
        metadata: { user_id: user.id },
      });
      customerId = customer.id;

      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id);
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: plan.stripePriceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard/billing?success=1&plan=${planKey}`,
      cancel_url: `${appUrl}/dashboard/billing?canceled=1`,
      metadata: {
        user_id: user.id,
        plan_key: planKey,
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
          plan_key: planKey,
        },
      },
    });

    // Track checkout_started
    await supabase.from('usage_events').insert({
      user_id: user.id,
      event_name: 'checkout_started',
      metadata: { plan_key: planKey, session_id: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[/api/checkout]', err);
    return NextResponse.json({ error: 'Checkout failed. Please try again.' }, { status: 500 });
  }
}
