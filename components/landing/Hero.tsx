import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.boardGlow} aria-hidden="true" />
      <div className={styles.content}>
        <p className={`${styles.eyebrow} reveal`}>The Board Awaits</p>
        <h1 id="hero-heading" className={`${styles.heading} reveal`}>
          What Do The
          <br />
          <em>Spirits</em> See
          <br />
          For You?
        </h1>
        <p className={`${styles.sub} reveal`}>
          An AI-powered spirit board that reads your symbolic birth profile, your intentions, and your questions — delivering personalized mystical reflections just for you.
        </p>
        <div className={`${styles.ctas} reveal`}>
          <Link href="/register" className="btn-primary">Ask the Board Free</Link>
          <a href="#how-it-works" className="btn-ghost">How It Works</a>
        </div>
        <p className={`${styles.disclaimer} reveal`}>
          For entertainment and self-reflection only. Not a substitute for professional advice.
        </p>
      </div>
      <div className={styles.boardPreview} aria-hidden="true">
        <div className={styles.planchette} />
        <div className={styles.boardLetters}>
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l, i) => (
            <span key={l} className={styles.letter} style={{ animationDelay: `${i * 0.04}s` }}>{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
