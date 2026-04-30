import Nav from '@/components/landing/Nav';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
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
        {/* Personas, HookExamples, Testimonials, Pricing, FinalCTA removed because they don't exist */}
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
