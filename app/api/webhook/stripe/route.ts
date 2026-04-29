import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import Stripe from "stripe";
export const config = { api: { bodyParser: false } };
export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!); }
  catch { return NextResponse.json({ error: "Invalid signature" }, { status: 400 }); }
  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.CheckoutSession;
    if (s.customer_email && s.metadata?.plan) {
      await supabaseAdmin.from("subscribers").upsert({ email: s.customer_email, plan: s.metadata.plan, stripe_customer_id: s.customer as string, stripe_subscription_id: s.subscription as string, active: true, updated_at: new Date().toISOString() }, { onConflict: "email" });
    }
  }
  return NextResponse.json({ received: true });
}
