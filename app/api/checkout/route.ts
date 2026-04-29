import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";
export async function POST(req: NextRequest) {
  const { plan, email } = await req.json();
  const planData = PLANS[plan as keyof typeof PLANS];
  if (!planData) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  const origin = req.headers.get("origin") ?? "https://spirit-signal.vercel.app";
  const session = await stripe.checkout.sessions.create({
    mode: "subscription", payment_method_types: ["card"], customer_email: email,
    line_items: [{ price: planData.priceId, quantity: 1 }],
    success_url: `${origin}/board?upgraded=true`, cancel_url: `${origin}/pricing`,
    metadata: { plan },
  });
  return NextResponse.json({ url: session.url });
}
