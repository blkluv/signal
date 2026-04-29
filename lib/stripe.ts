import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
});

// Plan config — prices preserved exactly from landing page
export const PLANS = {
  visitor: {
    key: 'visitor',
    name: 'The Visitor',
    price: 0,
    priceLabel: '$0/mo',
    stripePriceId: null, // free tier — no Stripe
    credits: 5, // per day
  },
  initiated: {
    key: 'initiated',
    name: 'The Initiated',
    price: 6.66,
    priceLabel: '$6.66/mo',
    stripePriceId: process.env.STRIPE_PRICE_ID_INITIATED ?? '',
    credits: -1, // unlimited
  },
  channeler: {
    key: 'channeler',
    name: 'The Channeler',
    price: 13.13,
    priceLabel: '$13.13/mo',
    stripePriceId: process.env.STRIPE_PRICE_ID_CHANNELER ?? '',
    credits: -1, // unlimited
  },
} as const;

export type PlanKey = keyof typeof PLANS;
