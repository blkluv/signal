import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });
export const PLANS = {
  initiated: { name: "Initiated", price: 666, priceId: process.env.STRIPE_INITIATED_PRICE_ID! },
  channeler: { name: "Channeler", price: 1313, priceId: process.env.STRIPE_CHANNELER_PRICE_ID! },
};
