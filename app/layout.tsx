import type { Metadata } from 'next';
import { Cinzel, IM_Fell_English, Courier_Prime } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--ff-cinzel',
  display: 'swap',
});

const imFell = IM_Fell_English({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--ff-im-fell',
  display: 'swap',
});

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--ff-courier',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Spirit Signal – AI Mystical Reading & Spirit Board',
  description:
    'An AI-powered mystical entertainment platform. Personalized spirit-board readings, birth signal profiles, and self-reflection. For entertainment only.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://spiritsignal.app'),
  openGraph: {
    title: 'Spirit Signal – AI Mystical Reading & Spirit Board',
    description: 'Ask the board. The spirits answer. For entertainment and self-reflection only.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${imFell.variable} ${courierPrime.variable}`}>
      <body>{children}</body>
    </html>
  );
}
