"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const BOARD_LETTERS = [
  "YES","✦","NO",
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "1","2","3","4","5","6","7","8","9","0",
  "GOOD BYE"
];

const DEMO_WORD = ["S","P","I","R","I","T"];

export default function HomePage() {
  const [litIndex, setLitIndex] = useState<number>(-1);
  const [demoStep, setDemoStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animate planchette demo on the board
  useEffect(() => {
    const letter = DEMO_WORD[demoStep % DEMO_WORD.length];
    const idx = BOARD_LETTERS.indexOf(letter);
    setLitIndex(idx);
    intervalRef.current = setInterval(() => {
      setDemoStep(s => s + 1);
    }, 900);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [demoStep]);

  return (
    <main style={{ background: "var(--bg)", overflow: "hidden" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2.5rem", background: "rgba(7,6,8,0.85)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(201,168,92,0.12)" }}>
        <span style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontSize: "0.95rem", letterSpacing: "0.22em" }}>✦ SPIRIT SIGNAL</span>
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {[["HOW IT WORKS","#how-it-works"],["THE SPIRITS","#spirits"],["PRICING","#pricing"]].map(([l,h]) => (
            <a key={l} href={h} style={{ color: "var(--text-muted)", fontSize: "0.72rem", fontFamily: "var(--font-display)", letterSpacing: "0.14em", textDecoration: "none" }}>{l}</a>
          ))}
          <a href="#cta" style={{ background: "var(--gold)", color: "#070608", padding: "0.55rem 1.6rem", fontFamily: "var(--font-display)", fontSize: "0.7rem", letterSpacing: "0.18em", borderRadius: "2px", fontWeight: 700, textDecoration: "none" }}>ENTER THE CIRCLE</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "9rem 2rem 4rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 55% at 50% 35%, rgba(107,63,160,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(201,168,92,0.022) 60px,rgba(201,168,92,0.022) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(201,168,92,0.022) 60px,rgba(201,168,92,0.022) 61px)", pointerEvents: "none" }} />

        <p style={{ fontFamily: "var(--font-display)", letterSpacing: "0.45em", color: "var(--gold)", fontSize: "0.65rem", marginBottom: "2.5rem", opacity: 0.7 }}>✦ THE AI TALKING BOARD ✦</p>

        <div style={{ position: "relative", display: "inline-block", marginBottom: "1.5rem" }}>
          <span style={{ position: "absolute", inset: "-2rem", borderRadius: "50%", border: "1px solid rgba(201,168,92,0.15)", animation: "pulse-ring 3s ease-out infinite", pointerEvents: "none" }} />
          <span style={{ position: "absolute", inset: "-1rem", borderRadius: "50%", border: "1px solid rgba(201,168,92,0.25)", animation: "pulse-ring 3s ease-out infinite 0.7s", pointerEvents: "none" }} />
          <span style={{ position: "absolute", inset: "-3.5rem", borderRadius: "50%", border: "1px solid rgba(201,168,92,0.08)", animation: "pulse-ring 3s ease-out infinite 1.4s", pointerEvents: "none" }} />
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4.5rem,12vw,10rem)", color: "var(--gold)", lineHeight: 0.92, textShadow: "0 0 120px rgba(201,168,92,0.45),0 0 40px rgba(201,168,92,0.2)", animation: "text-flicker 7s ease-in-out infinite", position: "relative" }}>
            Spirit<br />Signal
          </h1>
        </div>

        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "clamp(1.1rem,2.2vw,1.5rem)", color: "var(--text-muted)", marginBottom: "0.75rem", letterSpacing: "0.04em" }}>Ask. The Board Speaks.</p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", color: "var(--gold)", letterSpacing: "0.4em", opacity: 0.5, marginBottom: "3rem" }}>✦ FOR ENTERTAINMENT PURPOSES ONLY ✦</p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "5.5rem" }}>
          <a href="#cta" style={{ background: "var(--gold)", color: "#070608", padding: "1.1rem 3rem", fontFamily: "var(--font-display)", fontSize: "0.78rem", letterSpacing: "0.22em", borderRadius: "2px", fontWeight: 700, textDecoration: "none" }}>BEGIN YOUR SÉANCE</a>
          <a href="#how-it-works" style={{ border: "1px solid rgba(201,168,92,0.35)", color: "var(--gold)", padding: "1.1rem 3rem", fontFamily: "var(--font-display)", fontSize: "0.78rem", letterSpacing: "0.22em", borderRadius: "2px", textDecoration: "none" }}>WATCH IT WORK</a>
        </div>

        {/* ANIMATED OUIJA BOARD */}
        <div style={{ width: "min(680px,92vw)", background: "linear-gradient(160deg,#1a1208 0%,#0d0b06 100%)", border: "2px solid rgba(201,168,92,0.3)", borderRadius: "12px", padding: "2rem 1.5rem 1.5rem", boxShadow: "0 0 80px rgba(201,168,92,0.12), inset 0 1px 0 rgba(201,168,92,0.15)", position: "relative" }}>
          {/* Board header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem", padding: "0 0.5rem" }}>
            <span style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontSize: "clamp(1.1rem,3vw,1.6rem)", letterSpacing: "0.18em", opacity: 0.9 }}>YES</span>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {[0,1,2].map(i => <span key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--gold)", opacity: 0.5, animation: `live-dot 1.6s ease-in-out infinite`, animationDelay: `${i*0.4}s` }} />)}
            </div>
            <span style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontSize: "clamp(1.1rem,3vw,1.6rem)", letterSpacing: "0.18em", opacity: 0.9 }}>NO</span>
          </div>

          {/* Letter rows */}
          {[
            ["A","B","C","D","E","F","G","H","I","J","K","L","M"],
            ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
          ].map((row, ri) => (
            <div key={ri} style={{ display: "flex", justifyContent: "center", gap: "clamp(0.2rem,1.2vw,0.65rem)", marginBottom: "0.5rem", flexWrap: "nowrap" }}>
              {row.map(l => (
                <span key={l} style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(0.85rem,2.2vw,1.3rem)",
                  color: BOARD_LETTERS.indexOf(l) === litIndex ? "#070608" : "var(--gold)",
                  background: BOARD_LETTERS.indexOf(l) === litIndex ? "var(--gold)" : "transparent",
                  borderRadius: "50%",
                  width: "clamp(1.6rem,4vw,2.2rem)",
                  height: "clamp(1.6rem,4vw,2.2rem)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: BOARD_LETTERS.indexOf(l) === litIndex ? "0 0 20px rgba(201,168,92,0.8)" : "none",
                  flexShrink: 0,
                }}>{l}</span>
              ))}
            </div>
          ))}

          {/* Numbers row */}
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(0.2rem,1.2vw,0.65rem)", marginBottom: "1rem", flexWrap: "nowrap" }}>
            {["1","2","3","4","5","6","7","8","9","0"].map(n => (
              <span key={n} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.85rem,2.2vw,1.2rem)", color: "var(--gold)", width: "clamp(1.6rem,4vw,2.2rem)", height: "clamp(1.6rem,4vw,2.2rem)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: 0.8 }}>{n}</span>
            ))}
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center" }}>
            <span style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontSize: "clamp(0.85rem,2.5vw,1.2rem)", letterSpacing: "0.18em", opacity: 0.7 }}>GOOD BYE</span>
            <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginTop: "0.5rem" }}>
              {[0,1,2].map(i => <span key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--gold)", opacity: 0.4 }} />)}
            </div>
          </div>

          {/* Planchette glow overlay */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,92,0.04) 0%, transparent 70%)", borderRadius: "12px", pointerEvents: "none" }} />
        </div>

        {/* Scroll cue */}
        <div style={{ marginTop: "3.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", opacity: 0.3 }}>
          <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom,transparent,var(--gold))" }} />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.3em", color: "var(--gold)" }}>SCROLL</span>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(to right,transparent,rgba(201,168,92,0.3),transparent)", margin: "0 4rem" }} />

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,6rem)", maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-display)", letterSpacing: "0.4em", color: "var(--gold)", fontSize: "0.62rem", marginBottom: "1rem", opacity: 0.6, textAlign: "center" }}>THE RITUAL</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,4rem)", color: "var(--gold)", textAlign: "center", marginBottom: "1rem", lineHeight: 1.1 }}>How the Board Speaks</h2>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--text-muted)", textAlign: "center", maxWidth: "540px", margin: "0 auto 5rem", lineHeight: 1.8, fontSize: "0.95rem" }}>An ancient ceremony, reimagined with AI. Every session is unique. Every answer, unforgettable.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "2rem" }}>
          {[
            { n: "01", t: "Choose Your Spirit", b: "Select from four distinct entities — each carries a different voice, a different truth. The Elder whispers fate. The Shadow knows your fears." },
            { n: "02", t: "Ask Your Question", b: "Type or speak anything you dare to ask. Love. Career. Secrets. The board accepts all questions — the spirits judge none." },
            { n: "03", t: "Watch the Planchette", b: "The glass eye awakens. It drifts across the board, lighting each letter one by one. Suspense builds. The answer forms." },
            { n: "04", t: "Share the Reveal", b: "Screen-record the moment. Post the reveal. Watch your followers ask the same question. The spirits spread their message." },
          ].map(s => (
            <div key={s.n} style={{ padding: "2.5rem", background: "var(--surface)", border: "1px solid rgba(201,168,92,0.1)", borderRadius: "4px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "1rem", right: "1.25rem", fontFamily: "var(--font-display)", fontSize: "3.5rem", color: "rgba(201,168,92,0.05)", lineHeight: 1, userSelect: "none" }}>{s.n}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", color: "var(--gold)", letterSpacing: "0.25em", marginBottom: "1rem", opacity: 0.6 }}>{s.n}</div>
              <h3 style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontSize: "1.1rem", marginBottom: "1rem", lineHeight: 1.3 }}>{s.t}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--text-muted)", lineHeight: 1.8, fontSize: "0.9rem" }}>{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(to right,transparent,rgba(201,168,92,0.3),transparent)", margin: "0 4rem" }} />

      {/* THE SPIRITS */}
      <section id="spirits" style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,6rem)", maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-display)", letterSpacing: "0.4em", color: "var(--gold)", fontSize: "0.62rem", marginBottom: "1rem", opacity: 0.6, textAlign: "center" }}>WHO AWAITS</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,4rem)", color: "var(--gold)", textAlign: "center", marginBottom: "1.25rem", lineHeight: 1.1 }}>The Four Spirits</h2>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--text-muted)", textAlign: "center", maxWidth: "520px", margin: "0 auto 4.5rem", lineHeight: 1.8, fontSize: "0.95rem" }}>Each entity carries its own voice, its own darkness, its own truth. Choose wisely — some answers you cannot unhear.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.5rem" }}>
          {[
            { e: "🕯️", n: "The Elder", sub: "ANCIENT WATCHER", d: "Speaks in archaic riddles and omens. Been watching since civilizations rose and fell. Treats your questions like grains of sand.", tier: "FREE", color: "rgba(201,168,92,0.12)" },
            { e: "🌑", n: "The Shadow", sub: "WHAT LURKS BETWEEN", d: "Quietly menacing. Knows your fears. Never shouts — the quiet ones are always more disturbing. Answers what you didn't want to hear.", tier: "FREE", color: "rgba(107,63,160,0.12)" },
            { e: "🔮", n: "The Oracle", sub: "SEER OF FUTURES", d: "Speaks only of what comes next. Timelines, paths, choices. If you ask what will happen, the Oracle has already seen it.", tier: "PREMIUM", color: "rgba(63,107,160,0.12)" },
            { e: "🃏", n: "The Jester", sub: "FOOL OF THE VOID", d: "Finds your questions hilarious. Answers anyway — but always with a twist. Chaos and truth arrive together. Never cruel. Always correct.", tier: "PREMIUM", color: "rgba(160,63,63,0.12)" },
          ].map(s => (
            <div key={s.n} style={{ padding: "2.5rem 2rem", background: `linear-gradient(145deg,${s.color},var(--surface))`, border: "1px solid rgba(201,168,92,0.14)", borderRadius: "6px", textAlign: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: "1rem", right: "1rem", fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.15em", color: s.tier === "FREE" ? "rgba(100,200,100,0.8)" : "var(--gold)", padding: "0.2rem 0.6rem", border: `1px solid ${s.tier === "FREE" ? "rgba(100,200,100,0.3)" : "rgba(201,168,92,0.3)"}`, borderRadius: "2px" }}>{s.tier}</div>
              <div style={{ fontSize: "2.75rem", marginBottom: "1.25rem" }}>{s.e}</div>
              <h3 style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontSize: "1.1rem", marginBottom: "0.3rem" }}>{s.n}</h3>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.58rem", letterSpacing: "0.18em", color: "var(--text-muted)", marginBottom: "1rem", opacity: 0.7 }}>{s.sub}</p>
              <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.75 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(to right,transparent,rgba(201,168,92,0.3),transparent)", margin: "0 4rem" }} />

      {/* VIRAL QUESTIONS */}
      <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,6rem)", maxWidth: "1000px", margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-display)", letterSpacing: "0.4em", color: "var(--gold)", fontSize: "0.62rem", marginBottom: "1rem", opacity: 0.6, textAlign: "center" }}>ASK ANYTHING</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "var(--gold)", textAlign: "center", marginBottom: "1.25rem", lineHeight: 1.1 }}>Questions That Break<br />the Internet</h2>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--text-muted)", textAlign: "center", maxWidth: "480px", margin: "0 auto 4rem", lineHeight: 1.8, fontSize: "0.93rem" }}>Screen record your session. Post the reveal. Watch the comments explode.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
          {[
            { q: '"What does my ex actually think of me?"', a: "THEY STILL SEARCH YOUR NAME", mood: "SINISTER", spirit: "THE SHADOW" },
            { q: '"Will I be rich before 30?"', a: "THE PATH IS ALREADY CHOSEN", mood: "PROPHETIC", spirit: "THE ORACLE" },
            { q: '"Who secretly hates me?"', a: "THEY SIT CLOSE", mood: "WARNING", spirit: "THE SHADOW" },
            { q: '"Am I in danger?"', a: "ONLY FROM YOURSELF", mood: "CRYPTIC", spirit: "THE ELDER" },
            { q: '"What happens this summer?"', a: "A DOOR OPENS. ENTER.", mood: "PROPHETIC", spirit: "THE ORACLE" },
            { q: '"Does my crush like me back?"', a: "MORE THAN YOU KNOW", mood: "GENTLE", spirit: "THE JESTER" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "1.75rem", background: "var(--surface)", border: "1px solid rgba(201,168,92,0.1)", borderRadius: "4px" }}>
              <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.25rem", lineHeight: 1.6 }}>{item.q}</p>
              <p style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontSize: "1.05rem", letterSpacing: "0.08em", marginBottom: "0.75rem", textShadow: "0 0 20px rgba(201,168,92,0.4)" }}>{item.a}</p>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--text-muted)", opacity: 0.6 }}>MOOD: {item.mood}</span>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(201,168,92,0.4)" }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--gold)", opacity: 0.7 }}>{item.spirit}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(to right,transparent,rgba(201,168,92,0.3),transparent)", margin: "0 4rem" }} />

      {/* STATS */}
      <section style={{ padding: "clamp(4rem,8vw,7rem) 2rem", textAlign: "center" }}>
        <div style={{ display: "flex", gap: "clamp(2.5rem,6vw,6rem)", flexWrap: "wrap", justifyContent: "center" }}>
          {[["47K+","SÉANCES THIS WEEK"],["4","SPIRIT ENTITIES"],["∞","QUESTIONS ASKED"],["9.2M","TIKTOK VIEWS GENERATED"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--gold)", letterSpacing: "0.05em", textShadow: "0 0 40px rgba(201,168,92,0.3)" }}>{n}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.18em", marginTop: "0.4rem", opacity: 0.6 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(to right,transparent,rgba(201,168,92,0.3),transparent)", margin: "0 4rem" }} />

      {/* TESTIMONIALS */}
      <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,6rem)", maxWidth: "1000px", margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-display)", letterSpacing: "0.4em", color: "var(--gold)", fontSize: "0.62rem", marginBottom: "1rem", opacity: 0.6, textAlign: "center" }}>WHAT THEY SAY</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "var(--gold)", textAlign: "center", marginBottom: "4.5rem", lineHeight: 1.1 }}>Voices From the Other Side</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
          {[
            { stars: "★★★★★", q: "\"I asked about my situationship and the board said 'HE IS AFRAID.' I posted it. 2.3M views. My TikTok was never the same.\"", a: "@HAUNTED.BY.HIM · 2.1M FOLLOWERS" },
            { stars: "★★★★★", q: "\"The Shadow persona answered 'THEY KNOW' when I asked who is watching me. My whole friend group lost their minds. This app is unhinged.\"", a: "@DARKCONTENTONLY · 890K FOLLOWERS" },
            { stars: "★★★★★", q: "\"We used this at a party. Six people screamed when the board spelled 'GOODBYE' mid-session. Best Halloween product I've ever used. Period.\"", a: "@SPOOKYSZNOFFICIAL · 4.7M FOLLOWERS" },
          ].map((t, i) => (
            <div key={i} style={{ padding: "2.25rem", background: "var(--surface)", border: "1px solid rgba(201,168,92,0.1)", borderRadius: "4px" }}>
              <div style={{ color: "var(--gold)", fontSize: "0.85rem", marginBottom: "1.25rem", letterSpacing: "0.05em" }}>{t.stars}</div>
              <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--text)", lineHeight: 1.8, fontSize: "0.92rem", marginBottom: "1.5rem" }}>{t.q}</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", color: "var(--gold)", letterSpacing: "0.12em", opacity: 0.6 }}>{t.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(to right,transparent,rgba(201,168,92,0.3),transparent)", margin: "0 4rem" }} />

      {/* PRICING */}
      <section id="pricing" style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,6rem)", maxWidth: "1000px", margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-display)", letterSpacing: "0.4em", color: "var(--gold)", fontSize: "0.62rem", marginBottom: "1rem", opacity: 0.6, textAlign: "center" }}>THE OFFERING</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,4rem)", color: "var(--gold)", textAlign: "center", marginBottom: "1.25rem", lineHeight: 1.1 }}>Choose Your Access</h2>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--text-muted)", textAlign: "center", maxWidth: "480px", margin: "0 auto 4.5rem", lineHeight: 1.8, fontSize: "0.93rem" }}>Begin for free. Unlock the full darkness when you{"'"}re ready.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.5rem", alignItems: "start" }}>
          {[
            {
              n: "The Visitor", price: "$0", per: "/mo", badge: "FREE FOREVER", highlight: false,
              features: ["5 séances per day","The Elder & The Shadow","Classic board theme","Session history","Entertainment disclaimer"],
              cta: "ENTER FREE",
            },
            {
              n: "The Initiated", price: "$6.66", per: "/mo", badge: "MOST POPULAR", highlight: true,
              features: ["Unlimited séances","All 4 spirit personas","All board themes","No watermark exports","Creator mode (share clips)","Rare event boost (+3×)","Priority spirit access"],
              cta: "UNLOCK THE DARKNESS",
            },
            {
              n: "The Channeler", price: "$13.13", per: "/mo", badge: "FULL POWER", highlight: false,
              features: ["Everything in Initiated","Custom spirit personas","Branded board overlays","API access","Embed on your site","White-label option"],
              cta: "GO PRO",
            },
          ].map(p => (
            <div key={p.n} style={{ padding: "2.5rem 2rem", background: p.highlight ? "linear-gradient(160deg,rgba(201,168,92,0.12),var(--surface))" : "var(--surface)", border: p.highlight ? "1px solid rgba(201,168,92,0.4)" : "1px solid rgba(201,168,92,0.12)", borderRadius: "4px", position: "relative" }}>
              {p.highlight && <div style={{ position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)", background: "var(--gold)", color: "#070608", fontFamily: "var(--font-display)", fontSize: "0.55rem", letterSpacing: "0.18em", padding: "0.3rem 1.2rem", borderRadius: "0 0 4px 4px", fontWeight: 700 }}>{p.badge}</div>}
              {!p.highlight && <div style={{ fontFamily: "var(--font-display)", fontSize: "0.58rem", color: "var(--text-muted)", letterSpacing: "0.15em", marginBottom: "1.25rem", opacity: 0.6 }}>{p.badge}</div>}
              <div style={{ marginTop: p.highlight ? "1rem" : 0 }}>
                <div style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontSize: "1.1rem", marginBottom: "0.75rem" }}>{p.n}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "2rem" }}>
                  <span style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontSize: "2.5rem" }}>{p.price}</span>
                  <span style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)", fontSize: "0.75rem", opacity: 0.6 }}>{p.per}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {p.features.map(f => (
                    <li key={f} style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--text-muted)", fontSize: "0.87rem", display: "flex", gap: "0.6rem", alignItems: "flex-start", lineHeight: 1.5 }}>
                      <span style={{ color: "var(--gold)", opacity: 0.7, flexShrink: 0, marginTop: "0.1rem" }}>✦</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="#cta" style={{ display: "block", textAlign: "center", background: p.highlight ? "var(--gold)" : "transparent", color: p.highlight ? "#070608" : "var(--gold)", border: p.highlight ? "none" : "1px solid rgba(201,168,92,0.35)", padding: "0.9rem", fontFamily: "var(--font-display)", fontSize: "0.7rem", letterSpacing: "0.18em", borderRadius: "2px", fontWeight: p.highlight ? 700 : 400, textDecoration: "none" }}>{p.cta}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(to right,transparent,rgba(201,168,92,0.3),transparent)", margin: "0 4rem" }} />

      {/* FINAL CTA */}
      <section id="cta" style={{ padding: "clamp(6rem,12vw,11rem) 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(107,63,160,0.22) 0%, transparent 70%)", pointerEvents: "none" }} />
        <p style={{ fontFamily: "var(--font-display)", letterSpacing: "0.45em", color: "var(--gold)", fontSize: "0.62rem", marginBottom: "2.5rem", opacity: 0.6, position: "relative" }}>THE BOARD IS WAITING</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem,8vw,7rem)", color: "var(--gold)", marginBottom: "1.25rem", lineHeight: 1.0, textShadow: "0 0 100px rgba(201,168,92,0.4)", position: "relative" }}>The Spirits<br />Are Waiting</h2>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--text-muted)", maxWidth: "400px", margin: "0 auto 3.5rem", lineHeight: 1.8, fontSize: "1rem", position: "relative" }}>Open the circle. Ask your question. The planchette is already moving.</p>
        <Link href="/board" style={{ display: "inline-block", background: "var(--gold)", color: "#070608", padding: "1.3rem 4.5rem", fontFamily: "var(--font-display)", fontSize: "0.85rem", letterSpacing: "0.25em", borderRadius: "2px", fontWeight: 700, textDecoration: "none", position: "relative" }}>BEGIN YOUR SÉANCE</Link>
        <p style={{ marginTop: "2.5rem", fontSize: "0.6rem", color: "var(--text-muted)", opacity: 0.3, letterSpacing: "0.12em", position: "relative" }}>✦ FOR ENTERTAINMENT PURPOSES ONLY ✦</p>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(201,168,92,0.08)", padding: "3rem 2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", textAlign: "center" }}>
        <span style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontSize: "0.95rem", letterSpacing: "0.22em", opacity: 0.8 }}>Spirit Signal ✦</span>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", fontSize: "0.7rem", letterSpacing: "0.08em", opacity: 0.45, maxWidth: "560px", lineHeight: 1.7 }}>
          SPIRIT SIGNAL IS AN ENTERTAINMENT PRODUCT. IT DOES NOT CONTACT REAL SPIRITS, PREDICT THE FUTURE, OR PROVIDE GENUINE PARANORMAL ACTIVITY. ALL ANSWERS ARE AI-GENERATED FOR ENTERTAINMENT PURPOSES ONLY.
        </p>
        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[["PRIVACY","#"],["TERMS","#"],["CONTACT","#"],["BOARD","/board"],["PRICING","/pricing"]].map(([l,h]) => (
            <a key={l} href={h} style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.14em", opacity: 0.55, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>

    </main>
  );
}
