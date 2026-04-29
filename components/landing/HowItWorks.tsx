import styles from './HowItWorks.module.css';

const steps = [
  { num: '01', title: 'Create Your Profile', desc: 'Enter your birth date, time, and location. Set your intentions, preferred spirit persona, and question themes.' },
  { num: '02', title: 'Receive Your Birth Signal', desc: 'We generate a symbolic profile from your birth data — your Sun sign, archetype, and energy alignment.' },
  { num: '03', title: 'Ask the Board', desc: 'Type your question. The planchette moves. Your chosen spirit persona channels a personalized AI response.' },
  { num: '04', title: 'Reflect & Explore', desc: 'Save readings, track patterns, unlock deeper insights with premium plans. Return to the board whenever the spirits call.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <p className={`${styles.eyebrow} reveal`}>The Ritual</p>
        <h2 className={`${styles.heading} reveal`}>How Spirit Signal Works</h2>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={s.num} className={`${styles.step} reveal`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.stepNum}>{s.num}</div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
