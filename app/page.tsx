'use client';

import Nav from '@/components/landing/Nav';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Personas from '@/components/landing/Personas';
import HookExamples from '@/components/landing/HookExamples';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';
import MistLayer from '@/components/landing/MistLayer';
import ScrollReveal from '@/components/landing/ScrollReveal';

export default function Home() {
  return (
    <>
      <MistLayer />
      <Nav />
      <main>
        <Hero />
        <div className="divider reveal"><div className="divider-line" /><div className="divider-icon">✶ ✶ ✶</div><div className="divider-line" /></div>
        <HowItWorks />
        <div className="divider reveal"><div className="divider-line" /><div className="divider-icon">✶ ✶ ✶</div><div className="divider-line" /></div>
        <Personas />
        <div className="divider reveal"><div className="divider-line" /><div className="divider-icon">✶ ✶ ✶</div><div className="divider-line" /></div>
        <HookExamples />
        <div className="divider reveal"><div className="divider-line" /><div className="divider-icon">✶ ✶ ✶</div><div className="divider-line" /></div>
        <Testimonials />
        <div className="divider reveal"><div className="divider-line" /><div className="divider-icon">✶ ✶ ✶</div><div className="divider-line" /></div>
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
