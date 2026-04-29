import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export const PLANS = {
  initiated: { name: "Initiated", priceId: process.env.STRIPE_INITIATED_PRICE_ID! },
  channeler: { name: "Channeler", priceId: process.env.STRIPE_CHANNELER_PRICE_ID! },
};
