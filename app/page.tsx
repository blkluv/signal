'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // ── MIST PARTICLES ──
    const mist = document.getElementById('mist');
    if (mist) {
      for (let i = 0; i < 18; i++) {
        const s = document.createElement('span');
        const size = 6 + Math.random() * 14;
        s.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;--d:${4 + Math.random() * 6}s;--delay:${Math.random() * 8}s`;
        mist.appendChild(s);
      }
    }

    // ── BUILD BOARD LETTERS ──
    const row1El = document.getElementById('row1');
    const row2El = document.getElementById('row2');
    const numsEl = document.getElementById('nums');
    if (row1El) {
      'ABCDEFGHIJKLM'.split('').forEach(l => {
        const s = document.createElement('span');
        s.className = 'board-letter';
        s.dataset.letter = l;
        s.textContent = l;
        row1El.appendChild(s);
      });
    }
    if (row2El) {
      'NOPQRSTUVWXYZ'.split('').forEach(l => {
        const s = document.createElement('span');
        s.className = 'board-letter';
        s.dataset.letter = l;
        s.textContent = l;
        row2El.appendChild(s);
      });
    }
    if (numsEl) {
      '1234567890'.split('').forEach(n => {
        const s = document.createElement('span');
        s.className = 'board-num';
        s.dataset.letter = n;
        s.textContent = n;
        numsEl.appendChild(s);
      });
    }

    // ── ANIMATED DEMO SEQUENCES ──
    const sequences = [
      { letters: 'THEY STILL WATCH', mood: 'sinister' },
      { letters: 'YES', mood: 'warning' },
      { letters: 'THE PATH OPENS', mood: 'prophetic' },
      { letters: 'TRUST NO ONE', mood: 'cryptic' },
      { letters: 'SOON', mood: 'warning' },
      { letters: 'THEY KNOW', mood: 'sinister' },
    ];
    let seqIdx = 0, charIdx = 0;
    const board = document.getElementById('demo-board');
    const planchette = document.getElementById('planchette');

    function clearLit() {
      document.querySelectorAll('.board-letter.lit').forEach(el => el.classList.remove('lit'));
      const yesLabel = document.getElementById('yes-label');
      const noLabel = document.getElementById('no-label');
      if (yesLabel) yesLabel.style.textShadow = '';
      if (noLabel) noLabel.style.textShadow = '';
    }

    function movePlanchetteToLetter(letter: string) {
      if (!board || !planchette) return;
      let el = board.querySelector(`[data-letter="${letter}"]`) as HTMLElement | null;
      if (!el) return;
      const bRect = board.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      const x = ((eRect.left + eRect.width / 2 - bRect.left) / bRect.width) * 100;
      const y = ((eRect.top + eRect.height / 2 - bRect.top) / bRect.height) * 100;
      planchette.style.left = x + '%';
      planchette.style.top = y + '%';
      el.classList.add('lit');
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    function runNextChar() {
      const seq = sequences[seqIdx];
      const chars = seq.letters.replace(/\s/g, '').split('');
      if (charIdx >= chars.length) {
        timeoutId = setTimeout(() => {
          clearLit();
          charIdx = 0;
          seqIdx = (seqIdx + 1) % sequences.length;
          timeoutId = setTimeout(runNextChar, 800);
        }, 2200);
        return;
      }
      const c = chars[charIdx];
      movePlanchetteToLetter(c);
      charIdx++;
      timeoutId = setTimeout(runNextChar, 320);
    }

    const startTimeout = setTimeout(runNextChar, 1400);

    // ── SCROLL REVEAL ──
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // ── SMOOTH SCROLL ──
    const handleClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        const t = document.querySelector(href);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    };
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(a => a.addEventListener('click', handleClick));

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
      obs.disconnect();
      anchors.forEach(a => a.removeEventListener('click', handleClick));
    };
  }, []);

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --gold:#c9a84c;--gold-glow:#e8c96a;--gold-dim:#7a6430;
          --bg:#06040a;--surface:#0e0b14;--surface-2:#140f1c;
          --ivory:#f5f0e8;--ivory-dim:#b8b0a0;
          --spirit:#6b4e9e;--spirit-glow:#9b6eee;--spirit-bright:#c49eff;
          --blood:#8b1a1a;
          --font-display:'Cinzel',Georgia,serif;
          --font-body:'IM Fell English',Georgia,serif;
          --font-mono:'Courier Prime',monospace;
        }
        html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
        body{
          background:var(--bg);color:var(--ivory);
          font-family:var(--font-body);min-height:100dvh;overflow-x:hidden;
        }
        body::after{
          content:'';position:fixed;inset:-50%;width:200%;height:200%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity:.022;pointer-events:none;z-index:999;
        }
        body::before{
          content:'';position:fixed;inset:0;
          background:
            radial-gradient(ellipse 60% 40% at 20% 10%,rgba(201,168,76,.06) 0%,transparent 60%),
            radial-gradient(ellipse 50% 35% at 80% 8%,rgba(201,168,76,.04) 0%,transparent 55%),
            radial-gradient(ellipse 70% 50% at 50% 100%,rgba(107,78,158,.08) 0%,transparent 60%);
          pointer-events:none;z-index:0;animation:candleFlicker 5s ease-in-out infinite;
        }
        @keyframes candleFlicker{0%,100%{opacity:1}45%{opacity:.82}70%{opacity:.92}}
        .mist{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden}
        .mist span{
          position:absolute;bottom:-30px;border-radius:50%;
          background:rgba(107,78,158,.35);filter:blur(8px);
          animation:mistRise var(--d,6s) ease-out var(--delay,0s) infinite;
        }
        @keyframes mistRise{
          0%{transform:translateY(0) translateX(0) scale(1);opacity:0}
          15%{opacity:.5}70%{opacity:.2}
          100%{transform:translateY(-110vh) translateX(40px) scale(3);opacity:0}
        }
        nav{
          position:fixed;top:0;left:0;right:0;z-index:100;
          display:flex;align-items:center;justify-content:space-between;
          padding:1.25rem 2.5rem;
          background:linear-gradient(to bottom,rgba(6,4,10,.95),transparent);
          backdrop-filter:blur(2px);
        }
        .nav-logo{display:flex;align-items:center;gap:.75rem}
        .nav-logo svg{width:32px;height:32px;flex-shrink:0}
        .nav-logo span{font-family:var(--font-display);font-size:1.1rem;color:var(--gold);letter-spacing:.12em}
        .nav-links{display:flex;align-items:center;gap:2rem}
        .nav-links a{
          font-family:var(--font-mono);font-size:.7rem;color:var(--gold);
          opacity:.5;text-decoration:none;letter-spacing:.15em;text-transform:uppercase;
          transition:opacity .3s;
        }
        .nav-links a:hover{opacity:.9}
        .nav-cta{
          font-family:var(--font-display);font-size:.75rem;padding:.5rem 1.5rem;
          border:1px solid var(--gold);color:var(--gold);text-decoration:none;border-radius:2px;
          letter-spacing:.15em;text-transform:uppercase;transition:all .4s;
        }
        .nav-cta:hover{background:var(--gold);color:var(--bg)}
        .hero{
          position:relative;min-height:100vh;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          padding:7rem 1.5rem 5rem;z-index:2;text-align:center;overflow:hidden;
        }
        .hero-eyebrow{
          font-family:var(--font-mono);font-size:.65rem;letter-spacing:.4em;
          color:var(--gold);opacity:.5;text-transform:uppercase;margin-bottom:2rem;
          animation:fadeUp .8s ease forwards;
        }
        .hero-title{
          font-family:var(--font-display);
          font-size:clamp(3rem,.5rem + 8vw,8rem);font-weight:900;
          color:var(--gold);line-height:1.0;letter-spacing:.05em;
          text-shadow:0 0 60px rgba(201,168,76,.35),0 0 120px rgba(201,168,76,.15);
          animation:fadeUp .8s .15s ease both;margin-bottom:.75rem;
        }
        .hero-title em{
          font-style:italic;color:var(--spirit-bright);
          text-shadow:0 0 40px rgba(196,158,255,.5);
        }
        .hero-subtitle{
          font-family:var(--font-display);font-size:clamp(1.1rem,2vw,1.6rem);
          color:var(--ivory-dim);letter-spacing:.25em;opacity:.6;
          animation:fadeUp .8s .3s ease both;margin-bottom:3rem;
        }
        .hero-disclaimer{
          font-family:var(--font-mono);font-size:.6rem;letter-spacing:.25em;
          color:var(--gold);opacity:.3;text-transform:uppercase;
          animation:fadeUp .8s .35s ease both;margin-bottom:3.5rem;
        }
        .hero-btns{
          display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;
          animation:fadeUp .8s .45s ease both;margin-bottom:5rem;
        }
        .btn-primary{
          font-family:var(--font-display);font-size:.9rem;padding:1rem 2.5rem;
          background:var(--gold);color:var(--bg);border:none;border-radius:2px;
          letter-spacing:.15em;text-transform:uppercase;cursor:pointer;
          text-decoration:none;display:inline-block;
          transition:all .4s;box-shadow:0 0 30px rgba(201,168,76,.25);
        }
        .btn-primary:hover{background:var(--gold-glow);box-shadow:0 0 50px rgba(232,201,106,.4);transform:translateY(-2px)}
        .btn-ghost{
          font-family:var(--font-display);font-size:.9rem;padding:1rem 2.5rem;
          border:1px solid rgba(201,168,76,.4);color:var(--gold);background:transparent;
          border-radius:2px;letter-spacing:.15em;text-transform:uppercase;cursor:pointer;
          text-decoration:none;display:inline-block;transition:all .4s;
        }
        .btn-ghost:hover{border-color:var(--gold);background:rgba(201,168,76,.08)}
        .hero-board{
          position:relative;width:100%;max-width:680px;
          border:1px solid rgba(201,168,76,.25);border-radius:4px;
          background:linear-gradient(160deg,#140e07 0%,#0a0704 50%,#140e07 100%);
          box-shadow:0 0 80px rgba(107,78,158,.12),0 0 40px rgba(201,168,76,.06),inset 0 0 60px rgba(0,0,0,.5);
          padding:2rem;animation:fadeUp .8s .6s ease both;
        }
        .hero-board::before{
          content:'';position:absolute;inset:6px;border:1px solid rgba(201,168,76,.08);border-radius:3px;pointer-events:none;
        }
        .board-row{
          display:flex;justify-content:center;gap:clamp(4px,1vw,10px);margin-bottom:.75rem;flex-wrap:nowrap;
        }
        .board-letter{
          font-family:var(--font-display);
          font-size:clamp(.75rem,.5rem + 1.2vw,1.1rem);
          color:rgba(201,168,76,.65);letter-spacing:.05em;
          min-width:24px;text-align:center;
          transition:color .15s,text-shadow .15s;
          user-select:none;
        }
        .board-letter.lit{
          color:var(--gold-glow);
          text-shadow:0 0 14px rgba(232,201,106,.95),0 0 30px rgba(232,201,106,.5),0 0 60px rgba(232,201,106,.2);
        }
        .board-yes-no{
          display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;padding:0 1rem;
        }
        .board-yes-no span{
          font-family:var(--font-display);font-size:clamp(1rem,2vw,1.5rem);color:var(--gold);
          opacity:.8;letter-spacing:.2em;
        }
        .board-stars{font-family:var(--font-display);color:var(--gold);opacity:.25;font-size:.8rem;letter-spacing:.5em}
        .board-numbers{
          display:flex;justify-content:center;gap:clamp(6px,1.5vw,14px);margin-bottom:1rem;
        }
        .board-num{font-family:var(--font-display);font-size:.85rem;color:rgba(201,168,76,.45);letter-spacing:.1em}
        .board-goodbye{
          text-align:center;font-family:var(--font-display);font-size:.85rem;
          color:rgba(201,168,76,.3);letter-spacing:.5em;text-transform:uppercase;
        }
        .planchette{
          position:absolute;pointer-events:none;z-index:10;
          width:52px;height:52px;
          transition:left .6s cubic-bezier(.25,.46,.45,.94),top .6s cubic-bezier(.25,.46,.45,.94);
        }
        .planchette-inner{
          width:100%;height:100%;border-radius:50%;
          background:radial-gradient(circle,rgba(107,78,158,.85) 0%,rgba(107,78,158,.3) 45%,transparent 70%);
          box-shadow:0 0 20px rgba(107,78,158,.6),0 0 40px rgba(107,78,158,.2);
          display:flex;align-items:center;justify-content:center;
          animation:planchetteGlow 2s ease-in-out infinite;
        }
        .planchette-eye{
          width:16px;height:16px;border-radius:50%;
          border:1.5px solid rgba(196,158,255,.7);
          box-shadow:0 0 10px rgba(196,158,255,.5);
        }
        @keyframes planchetteGlow{
          0%,100%{box-shadow:0 0 20px rgba(107,78,158,.6),0 0 40px rgba(107,78,158,.2)}
          50%{box-shadow:0 0 30px rgba(107,78,158,.9),0 0 60px rgba(107,78,158,.4)}
        }
        .divider{
          display:flex;align-items:center;gap:1.5rem;max-width:800px;margin:0 auto;padding:0 2rem;
        }
        .divider-line{flex:1;height:1px;background:linear-gradient(to right,transparent,rgba(201,168,76,.2),transparent)}
        .divider-icon{font-family:var(--font-display);color:var(--gold);opacity:.3;font-size:.75rem;letter-spacing:.5em;white-space:nowrap}
        section{position:relative;z-index:2}
        .section-inner{max-width:1100px;margin:0 auto;padding:6rem 2rem}
        .section-eyebrow{
          font-family:var(--font-mono);font-size:.6rem;color:var(--gold);opacity:.4;
          letter-spacing:.4em;text-transform:uppercase;margin-bottom:1rem;text-align:center;
        }
        .section-title{
          font-family:var(--font-display);font-size:clamp(1.8rem,3.5vw,3rem);
          color:var(--gold);text-align:center;margin-bottom:1rem;letter-spacing:.06em;
        }
        .section-sub{
          font-family:var(--font-body);font-style:italic;font-size:1.05rem;
          color:var(--ivory-dim);opacity:.6;text-align:center;max-width:520px;margin:0 auto 4rem;
          line-height:1.7;
        }
        .steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2rem;margin-top:3rem}
        .step{
          border:1px solid rgba(201,168,76,.12);border-radius:4px;padding:2rem;
          background:linear-gradient(135deg,rgba(20,14,7,.8),rgba(14,11,20,.8));
          position:relative;transition:border-color .4s,box-shadow .4s;
        }
        .step:hover{border-color:rgba(201,168,76,.35);box-shadow:0 0 30px rgba(201,168,76,.06)}
        .step-num{
          font-family:var(--font-display);font-size:2.5rem;font-weight:900;
          color:rgba(201,168,76,.15);line-height:1;margin-bottom:1rem;
        }
        .step-title{
          font-family:var(--font-display);font-size:1rem;color:var(--gold);
          letter-spacing:.1em;margin-bottom:.75rem;
        }
        .step-text{
          font-family:var(--font-body);font-style:italic;font-size:.9rem;
          color:var(--ivory-dim);opacity:.65;line-height:1.7;
        }
        .personas{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem;margin-top:3rem}
        .persona-card{
          border:1px solid rgba(201,168,76,.12);border-radius:4px;padding:1.75rem;
          background:rgba(14,11,20,.7);
          transition:border-color .4s,transform .4s,box-shadow .4s;cursor:default;
        }
        .persona-card:hover{
          border-color:rgba(201,168,76,.4);transform:translateY(-4px);
          box-shadow:0 20px 60px rgba(0,0,0,.4),0 0 30px rgba(201,168,76,.06);
        }
        .persona-emoji{font-size:2.25rem;margin-bottom:1rem}
        .persona-name{
          font-family:var(--font-display);font-size:1.1rem;color:var(--gold);
          letter-spacing:.08em;margin-bottom:.25rem;
        }
        .persona-title-label{
          font-family:var(--font-mono);font-size:.6rem;color:var(--gold);
          opacity:.4;letter-spacing:.2em;text-transform:uppercase;margin-bottom:.75rem;
        }
        .persona-desc{
          font-family:var(--font-body);font-style:italic;font-size:.875rem;
          color:var(--ivory-dim);opacity:.65;line-height:1.65;
        }
        .persona-tag{
          display:inline-block;margin-top:1rem;font-family:var(--font-mono);font-size:.55rem;
          padding:.25rem .75rem;border:1px solid rgba(201,168,76,.15);border-radius:50px;
          color:var(--gold);opacity:.5;letter-spacing:.15em;text-transform:uppercase;
        }
        .hooks-bg{
          background:linear-gradient(180deg,transparent 0%,rgba(107,78,158,.04) 40%,rgba(107,78,158,.08) 60%,transparent 100%);
        }
        .hooks-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;margin-top:3rem}
        .hook-card{
          border:1px solid rgba(107,78,158,.2);border-radius:4px;padding:1.5rem;
          background:rgba(14,11,20,.5);position:relative;overflow:hidden;
        }
        .hook-card::before{
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(107,78,158,.04),transparent);
          pointer-events:none;
        }
        .hook-q{
          font-family:var(--font-body);font-style:italic;font-size:1.05rem;
          color:var(--ivory);opacity:.85;margin-bottom:.75rem;line-height:1.5;
        }
        .hook-a{
          font-family:var(--font-display);font-size:.95rem;color:var(--spirit-bright);
          letter-spacing:.12em;text-shadow:0 0 12px rgba(196,158,255,.4);
        }
        .hook-mood{
          font-family:var(--font-mono);font-size:.55rem;color:var(--spirit-bright);
          opacity:.4;letter-spacing:.2em;text-transform:uppercase;margin-top:.5rem;
        }
        .social-strip{
          border-top:1px solid rgba(201,168,76,.08);border-bottom:1px solid rgba(201,168,76,.08);
          padding:3rem 2rem;
        }
        .stats{
          display:flex;flex-wrap:wrap;justify-content:center;gap:4rem;max-width:700px;margin:0 auto;
        }
        .stat-num{
          font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);color:var(--gold);
          text-align:center;text-shadow:0 0 20px rgba(201,168,76,.3);
        }
        .stat-label{
          font-family:var(--font-mono);font-size:.6rem;color:var(--ivory-dim);
          opacity:.4;letter-spacing:.2em;text-transform:uppercase;text-align:center;margin-top:.25rem;
        }
        .testimonials{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem}
        .testimonial{
          border:1px solid rgba(201,168,76,.1);border-radius:4px;padding:1.75rem;
          background:rgba(14,11,20,.5);
        }
        .t-text{
          font-family:var(--font-body);font-style:italic;font-size:.95rem;
          color:var(--ivory-dim);opacity:.75;line-height:1.75;margin-bottom:1rem;
        }
        .t-author{
          font-family:var(--font-mono);font-size:.6rem;color:var(--gold);
          opacity:.5;letter-spacing:.2em;text-transform:uppercase;
        }
        .t-stars{color:var(--gold);font-size:.75rem;margin-bottom:.75rem;opacity:.7}
        .pricing{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem;max-width:860px;margin-left:auto;margin-right:auto}
        .plan{
          border:1px solid rgba(201,168,76,.12);border-radius:4px;padding:2.25rem;
          background:rgba(14,11,20,.6);position:relative;
        }
        .plan.featured{
          border-color:rgba(201,168,76,.5);
          background:linear-gradient(135deg,rgba(20,14,7,.9),rgba(14,11,20,.9));
          box-shadow:0 0 40px rgba(201,168,76,.1);
        }
        .plan-badge{
          position:absolute;top:-11px;left:50%;transform:translateX(-50%);
          font-family:var(--font-mono);font-size:.55rem;
          background:var(--gold);color:var(--bg);
          padding:.25rem 1rem;letter-spacing:.2em;text-transform:uppercase;border-radius:50px;
          white-space:nowrap;
        }
        .plan-name{font-family:var(--font-display);font-size:1.1rem;color:var(--gold);letter-spacing:.1em;margin-bottom:.5rem}
        .plan-price{font-family:var(--font-display);font-size:2.5rem;color:var(--ivory);margin-bottom:.25rem}
        .plan-price span{font-size:1rem;opacity:.5}
        .plan-period{font-family:var(--font-mono);font-size:.6rem;color:var(--ivory-dim);opacity:.4;letter-spacing:.15em;text-transform:uppercase;margin-bottom:1.5rem}
        .plan-features{list-style:none;margin-bottom:2rem}
        .plan-features li{
          font-family:var(--font-body);font-style:italic;font-size:.875rem;
          color:var(--ivory-dim);opacity:.7;padding:.4rem 0;
          border-bottom:1px solid rgba(201,168,76,.05);
          display:flex;align-items:center;gap:.5rem;
        }
        .plan-features li::before{content:'✦';color:var(--gold);opacity:.5;font-size:.6rem;flex-shrink:0}
        .plan-btn{
          display:block;text-align:center;font-family:var(--font-display);font-size:.8rem;
          padding:.875rem;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;
          border-radius:2px;transition:all .4s;
        }
        .plan-btn-outline{border:1px solid rgba(201,168,76,.3);color:var(--gold)}
        .plan-btn-outline:hover{border-color:var(--gold);background:rgba(201,168,76,.08)}
        .plan-btn-filled{background:var(--gold);color:var(--bg)}
        .plan-btn-filled:hover{background:var(--gold-glow);box-shadow:0 0 20px rgba(201,168,74,.3)}
        .cta-section{
          text-align:center;padding:7rem 2rem;position:relative;z-index:2;
          background:linear-gradient(to bottom,transparent,rgba(107,78,158,.05) 40%,rgba(107,78,158,.1) 60%,rgba(6,4,10,1) 100%);
        }
        .cta-title{
          font-family:var(--font-display);font-size:clamp(2rem,5vw,4.5rem);
          color:var(--gold);text-shadow:0 0 60px rgba(201,168,76,.3);
          margin-bottom:1rem;letter-spacing:.06em;animation:fadeUp .8s ease both;
        }
        .cta-sub{
          font-family:var(--font-body);font-style:italic;font-size:1.1rem;
          color:var(--ivory-dim);opacity:.55;max-width:420px;margin:0 auto 2.5rem;line-height:1.7;
        }
        footer{
          border-top:1px solid rgba(201,168,76,.08);padding:3rem 2rem;
          display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;
          gap:1.5rem;max-width:1100px;margin:0 auto;
        }
        .footer-logo{font-family:var(--font-display);font-size:.9rem;color:var(--gold);opacity:.5;letter-spacing:.12em}
        .footer-disclaimer{
          font-family:var(--font-mono);font-size:.55rem;color:var(--ivory-dim);opacity:.25;
          letter-spacing:.15em;text-transform:uppercase;max-width:400px;text-align:center;line-height:1.8;
        }
        .footer-links{display:flex;gap:1.5rem}
        .footer-links a{
          font-family:var(--font-mono);font-size:.6rem;color:var(--gold);
          opacity:.3;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;transition:opacity .3s;
        }
        .footer-links a:hover{opacity:.7}
        .reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}
        .reveal.visible{opacity:1;transform:translateY(0)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:768px){
          nav{padding:1rem 1.25rem}
          .nav-links{display:none}
          .hero{padding:6rem 1.25rem 4rem}
          .section-inner{padding:4rem 1.25rem}
          .stats{gap:2.5rem}
          footer{flex-direction:column;align-items:center;text-align:center}
          .footer-links{justify-content:center}
        }
      `}</style>

      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=IM+Fell+English:ital@0;1&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet" />

      {/* Mist particles */}
      <div className="mist" id="mist"></div>

      {/* NAV */}
      <nav>
        <div className="nav-logo">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Spirit Signal logo">
            <ellipse cx="24" cy="36" rx="18" ry="7" stroke="#c9a84c" strokeWidth="1.2" opacity="0.5"/>
            <circle cx="24" cy="22" r="9" stroke="#c9a84c" strokeWidth="1.4"/>
            <circle cx="24" cy="22" r="3.5" fill="#6b4e9e" opacity="0.9"/>
            <circle cx="24" cy="22" r="1.5" fill="#c49eff"/>
            <line x1="24" y1="13" x2="24" y2="6" stroke="#c9a84c" strokeWidth="1.4"/>
            <circle cx="24" cy="4.5" r="2" fill="#c9a84c" opacity="0.6"/>
            <line x1="31" y1="16" x2="37" y2="11" stroke="#c9a84c" strokeWidth="1" opacity="0.5"/>
            <line x1="17" y1="16" x2="11" y2="11" stroke="#c9a84c" strokeWidth="1" opacity="0.5"/>
          </svg>
          <span>Spirit Signal</span>
        </div>
        <div className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#spirits">The Spirits</a>
          <a href="#pricing">Pricing</a>
        </div>
        <a href="#cta" className="nav-cta">Enter the Circle</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <p className="hero-eyebrow">✦ The AI Talking Board ✦</p>
        <h1 className="hero-title">Spirit<br /><em>Signal</em></h1>
        <p className="hero-subtitle">Ask. The Board Speaks.</p>
        <p className="hero-disclaimer">✦ For entertainment purposes only ✦</p>
        <div className="hero-btns">
          <a href="#cta" className="btn-primary">Begin Your Séance</a>
          <a href="#how-it-works" className="btn-ghost">Watch It Work</a>
        </div>
        {/* Live animated board demo */}
        <div className="hero-board" id="demo-board">
          <div className="board-yes-no">
            <span id="yes-label">YES</span>
            <span className="board-stars">✦ ✦ ✦</span>
            <span id="no-label">NO</span>
          </div>
          <div className="board-row" id="row1"></div>
          <div className="board-row" id="row2"></div>
          <div className="board-numbers" id="nums"></div>
          <div className="board-goodbye">GOOD BYE</div>
          <div className="planchette" id="planchette" style={{ left: '45%', top: '15%', transform: 'translate(-50%,-50%)' }}>
            <div className="planchette-inner"><div className="planchette-eye"></div></div>
          </div>
        </div>
      </section>

      <div className="divider reveal"><div className="divider-line"></div><div className="divider-icon">✦ ✦ ✦</div><div className="divider-line"></div></div>

      {/* HOW IT WORKS */}
      <section id="how-it-works">
        <div className="section-inner">
          <p className="section-eyebrow reveal">The Ritual</p>
          <h2 className="section-title reveal">How the Board Speaks</h2>
          <p className="section-sub reveal">An ancient ceremony, reimagined with AI. Every session is unique. Every answer, unforgettable.</p>
          <div className="steps">
            <div className="step reveal">
              <div className="step-num">01</div>
              <div className="step-title">Choose Your Spirit</div>
              <div className="step-text">Select from four distinct entities — each carries a different voice, a different truth. The Elder whispers fate. The Shadow knows your fears.</div>
            </div>
            <div className="step reveal">
              <div className="step-num">02</div>
              <div className="step-title">Ask Your Question</div>
              <div className="step-text">Type or speak anything you dare to ask. Love. Career. Secrets. The board accepts all questions — the spirits judge none.</div>
            </div>
            <div className="step reveal">
              <div className="step-num">03</div>
              <div className="step-title">Watch the Planchette</div>
              <div className="step-text">The glass eye awakens. It drifts across the board, lighting each letter one by one. Suspense builds. The answer forms.</div>
            </div>
            <div className="step reveal">
              <div className="step-num">04</div>
              <div className="step-title">Share the Reveal</div>
              <div className="step-text">Screen-record the moment. Post the reveal. Watch your followers ask the same question. The spirits spread their message.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider reveal"><div className="divider-line"></div><div className="divider-icon">✦ ✦ ✦</div><div className="divider-line"></div></div>

      {/* PERSONAS */}
      <section id="spirits">
        <div className="section-inner">
          <p className="section-eyebrow reveal">Who Awaits</p>
          <h2 className="section-title reveal">The Four Spirits</h2>
          <p className="section-sub reveal">Each entity carries its own voice, its own darkness, its own truth. Choose wisely — some answers you cannot unhear.</p>
          <div className="personas">
            <div className="persona-card reveal">
              <div className="persona-emoji">🕯️</div>
              <div className="persona-name">The Elder</div>
              <div className="persona-title-label">Ancient Watcher</div>
              <div className="persona-desc">Speaks in archaic riddles and omens. Been watching since civilizations rose and fell. Treats your questions like grains of sand.</div>
              <div className="persona-tag">Free</div>
            </div>
            <div className="persona-card reveal">
              <div className="persona-emoji">🌑</div>
              <div className="persona-name">The Shadow</div>
              <div className="persona-title-label">What Lurks Between</div>
              <div className="persona-desc">Quietly menacing. Knows your fears. Never shouts — the quiet ones are always more disturbing. Answers what you didn&apos;t want to hear.</div>
              <div className="persona-tag">Free</div>
            </div>
            <div className="persona-card reveal">
              <div className="persona-emoji">🔮</div>
              <div className="persona-name">The Oracle</div>
              <div className="persona-title-label">Seer of Futures</div>
              <div className="persona-desc">Speaks only of what comes next. Timelines, paths, choices. If you ask what will happen, the Oracle has already seen it.</div>
              <div className="persona-tag">Premium</div>
            </div>
            <div className="persona-card reveal">
              <div className="persona-emoji">🃏</div>
              <div className="persona-name">The Jester</div>
              <div className="persona-title-label">Fool of the Void</div>
              <div className="persona-desc">Finds your questions hilarious. Answers anyway — but always with a twist. Chaos and truth arrive together. Never cruel. Always correct.</div>
              <div className="persona-tag">Premium</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider reveal"><div className="divider-line"></div><div className="divider-icon">✦ ✦ ✦</div><div className="divider-line"></div></div>

      {/* VIRAL HOOKS */}
      <section className="hooks-bg">
        <div className="section-inner">
          <p className="section-eyebrow reveal">Ask Anything</p>
          <h2 className="section-title reveal">Questions That Break the Internet</h2>
          <p className="section-sub reveal">Screen record your session. Post the reveal. Watch the comments explode.</p>
          <div className="hooks-grid">
            <div className="hook-card reveal">
              <div className="hook-q">&ldquo;What does my ex actually think of me?&rdquo;</div>
              <div className="hook-a">THEY STILL SEARCH YOUR NAME</div>
              <div className="hook-mood">Mood: sinister · The Shadow</div>
            </div>
            <div className="hook-card reveal">
              <div className="hook-q">&ldquo;Will I be rich before 30?&rdquo;</div>
              <div className="hook-a">THE PATH IS ALREADY CHOSEN</div>
              <div className="hook-mood">Mood: prophetic · The Oracle</div>
            </div>
            <div className="hook-card reveal">
              <div className="hook-q">&ldquo;Who secretly hates me?&rdquo;</div>
              <div className="hook-a">THEY SIT CLOSE</div>
              <div className="hook-mood">Mood: warning · The Shadow</div>
            </div>
            <div className="hook-card reveal">
              <div className="hook-q">&ldquo;Am I in danger?&rdquo;</div>
              <div className="hook-a">ONLY FROM YOURSELF</div>
              <div className="hook-mood">Mood: cryptic · The Elder</div>
            </div>
            <div className="hook-card reveal">
              <div className="hook-q">&ldquo;What happens this summer?&rdquo;</div>
              <div className="hook-a">A DOOR OPENS. ENTER.</div>
              <div className="hook-mood">Mood: prophetic · The Oracle</div>
            </div>
            <div className="hook-card reveal">
              <div className="hook-q">&ldquo;Does my crush like me back?&rdquo;</div>
              <div className="hook-a">MORE THAN YOU KNOW</div>
              <div className="hook-mood">Mood: gentle · The Jester</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider reveal"><div className="divider-line"></div><div className="divider-icon">✦ ✦ ✦</div><div className="divider-line"></div></div>

      {/* SOCIAL PROOF */}
      <div className="social-strip reveal">
        <div className="stats">
          <div>
            <div className="stat-num">47K+</div>
            <div className="stat-label">Séances This Week</div>
          </div>
          <div>
            <div className="stat-num">4</div>
            <div className="stat-label">Spirit Entities</div>
          </div>
          <div>
            <div className="stat-num">∞</div>
            <div className="stat-label">Questions Asked</div>
          </div>
          <div>
            <div className="stat-num">9.2M</div>
            <div className="stat-label">TikTok Views Generated</div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section>
        <div className="section-inner">
          <p className="section-eyebrow reveal">What They Say</p>
          <h2 className="section-title reveal">Voices From the Other Side</h2>
          <div className="testimonials">
            <div className="testimonial reveal">
              <div className="t-stars">★★★★★</div>
              <div className="t-text">&ldquo;I asked about my situationship and the board said &apos;HE IS AFRAID.&apos; I posted it. 2.3M views. My TikTok was never the same.&rdquo;</div>
              <div className="t-author">@haunted.by.him · 2.1M followers</div>
            </div>
            <div className="testimonial reveal">
              <div className="t-stars">★★★★★</div>
              <div className="t-text">&ldquo;The Shadow persona answered &apos;THEY KNOW&apos; when I asked who is watching me. My whole friend group lost their minds. This app is unhinged.&rdquo;</div>
              <div className="t-author">@darkcontentonly · 890K followers</div>
            </div>
            <div className="testimonial reveal">
              <div className="t-stars">★★★★★</div>
              <div className="t-text">&ldquo;We used this at a party. Six people screamed when the board spelled &apos;GOODBYE&apos; mid-session. Best Halloween product I&apos;ve ever used. Period.&rdquo;</div>
              <div className="t-author">@spookysznofficial · 4.7M followers</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider reveal"><div className="divider-line"></div><div className="divider-icon">✦ ✦ ✦</div><div className="divider-line"></div></div>

      {/* PRICING */}
      <section id="pricing">
        <div className="section-inner">
          <p className="section-eyebrow reveal">The Offering</p>
          <h2 className="section-title reveal">Choose Your Access</h2>
          <p className="section-sub reveal">Begin for free. Unlock the full darkness when you&apos;re ready.</p>
          <div className="pricing">
            <div className="plan reveal">
              <div className="plan-name">The Visitor</div>
              <div className="plan-price">$0<span>/mo</span></div>
              <div className="plan-period">Free Forever</div>
              <ul className="plan-features">
                <li>5 séances per day</li>
                <li>The Elder &amp; The Shadow</li>
                <li>Classic board theme</li>
                <li>Session history</li>
                <li>Entertainment disclaimer</li>
              </ul>
              <a href="#cta" className="plan-btn plan-btn-outline">Enter Free</a>
            </div>
            <div className="plan featured reveal">
              <div className="plan-badge">Most Popular</div>
              <div className="plan-name">The Initiated</div>
              <div className="plan-price">$6.66<span>/mo</span></div>
              <div className="plan-period">Billed Monthly</div>
              <ul className="plan-features">
                <li>Unlimited séances</li>
                <li>All 4 spirit personas</li>
                <li>All board themes</li>
                <li>No watermark exports</li>
                <li>Creator mode (share clips)</li>
                <li>Rare event boost (+3×)</li>
                <li>Priority spirit access</li>
              </ul>
              <a href="#cta" className="plan-btn plan-btn-filled">Unlock the Darkness</a>
            </div>
            <div className="plan reveal">
              <div className="plan-name">The Channeler</div>
              <div className="plan-price">$13.13<span>/mo</span></div>
              <div className="plan-period">Billed Monthly</div>
              <ul className="plan-features">
                <li>Everything in Initiated</li>
                <li>Custom spirit personas</li>
                <li>Branded board overlays</li>
                <li>API access</li>
                <li>Embed on your site</li>
                <li>White-label option</li>
              </ul>
              <a href="#cta" className="plan-btn plan-btn-outline">Go Pro</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <h2 className="cta-title reveal">The Spirits<br />Are Waiting</h2>
        <p className="cta-sub reveal">Open the circle. Ask your question. The planchette is already moving.</p>
        <div className="hero-btns reveal">
          <a href="#" className="btn-primary">Begin Your Séance</a>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', color: 'var(--gold)', opacity: .2, letterSpacing: '.3em', textTransform: 'uppercase', marginTop: '2rem' }} className="reveal">
          ✦ For entertainment purposes only ✦
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Spirit Signal ✦</div>
        <div className="footer-disclaimer">Spirit Signal is an entertainment product. It does not contact real spirits, predict the future, or provide genuine paranormal activity. All answers are AI-generated for entertainment purposes only.</div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </>
  );
}
