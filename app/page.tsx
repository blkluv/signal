import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{background:"var(--bg)",overflow:"hidden"}}>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1rem 2.5rem",background:"rgba(7,6,8,0.8)",backdropFilter:"blur(16px)",borderBottom:"1px solid rgba(201,168,92,0.1)"}}>
        <span style={{fontFamily:"var(--font-display)",color:"var(--gold)",fontSize:"1rem",letterSpacing:"0.2em"}}>✦ SPIRIT SIGNAL</span>
        <div style={{display:"flex",gap:"2.5rem",alignItems:"center"}}>
          <Link href="#how" style={{color:"var(--text-muted)",fontSize:"0.78rem",fontFamily:"var(--font-display)",letterSpacing:"0.12em"}}>HOW IT WORKS</Link>
          <Link href="#spirits" style={{color:"var(--text-muted)",fontSize:"0.78rem",fontFamily:"var(--font-display)",letterSpacing:"0.12em"}}>SPIRITS</Link>
          <Link href="/pricing" style={{color:"var(--text-muted)",fontSize:"0.78rem",fontFamily:"var(--font-display)",letterSpacing:"0.12em"}}>PRICING</Link>
          <Link href="/board" style={{background:"var(--gold)",color:"#070608",padding:"0.55rem 1.6rem",fontFamily:"var(--font-display)",fontSize:"0.72rem",letterSpacing:"0.18em",borderRadius:"2px",fontWeight:700}}>ENTER</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100dvh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"10rem 2rem 6rem",position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 50% 30%, rgba(107,63,160,0.22) 0%, transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(201,168,92,0.025) 60px,rgba(201,168,92,0.025) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(201,168,92,0.025) 60px,rgba(201,168,92,0.025) 61px)",pointerEvents:"none"}}/>
        <p style={{fontFamily:"var(--font-display)",letterSpacing:"0.45em",color:"var(--gold)",fontSize:"0.68rem",marginBottom:"2rem",opacity:0.7}}>THE VEIL IS THIN TONIGHT</p>
        <h1 style={{fontFamily:"var(--font-display)",fontSize:"clamp(4rem,11vw,9.5rem)",color:"var(--gold)",lineHeight:0.95,marginBottom:"2rem",textShadow:"0 0 120px rgba(201,168,92,0.4),0 0 40px rgba(201,168,92,0.2)"}}>SPIRIT<br/>SIGNAL</h1>
        <p style={{fontFamily:"var(--font-body)",fontStyle:"italic",fontSize:"clamp(1.05rem,2.2vw,1.45rem)",color:"var(--text-muted)",maxWidth:"520px",lineHeight:1.8,marginBottom:"3.5rem"}}>
          An AI-powered spirit board that channels answers from beyond. Ask anything. The planchette moves. The spirits speak.
        </p>
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center",marginBottom:"5rem"}}>
          <Link href="/board" style={{background:"var(--gold)",color:"#070608",padding:"1.1rem 3rem",fontFamily:"var(--font-display)",fontSize:"0.8rem",letterSpacing:"0.22em",borderRadius:"2px",fontWeight:700}}>BEGIN THE SÉANCE</Link>
          <Link href="/pricing" style={{border:"1px solid rgba(201,168,92,0.35)",color:"var(--gold)",padding:"1.1rem 3rem",fontFamily:"var(--font-display)",fontSize:"0.8rem",letterSpacing:"0.22em",borderRadius:"2px"}}>VIEW PLANS</Link>
        </div>
        <div style={{display:"flex",gap:"3rem",flexWrap:"wrap",justifyContent:"center",opacity:0.55}}>
          {[["10K+","Séances held"],["4","Spirit personas"],["∞","Questions answered"],["0","Ghosts harmed"]].map(([n,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:"1.6rem",color:"var(--gold)",letterSpacing:"0.05em"}}>{n}</div>
              <div style={{fontFamily:"var(--font-body)",fontSize:"0.72rem",color:"var(--text-muted)",letterSpacing:"0.1em",marginTop:"0.2rem"}}>{l}</div>
            </div>
          ))}
        </div>
        {/* scroll cue */}
        <div style={{position:"absolute",bottom:"2.5rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:"0.4rem",opacity:0.35}}>
          <div style={{width:"1px",height:"48px",background:"linear-gradient(to bottom,transparent,var(--gold))"}}/>
          <span style={{fontFamily:"var(--font-display)",fontSize:"0.55rem",letterSpacing:"0.3em",color:"var(--gold)"}}>SCROLL</span>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{height:"1px",background:"linear-gradient(to right,transparent,rgba(201,168,92,0.3),transparent)",margin:"0 4rem"}}/>

      {/* HOW IT WORKS */}
      <section id="how" style={{padding:"clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,6rem)",maxWidth:"1100px",margin:"0 auto"}}>
        <p style={{fontFamily:"var(--font-display)",letterSpacing:"0.4em",color:"var(--gold)",fontSize:"0.65rem",marginBottom:"1rem",opacity:0.6,textAlign:"center"}}>THE RITUAL</p>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:"clamp(2.2rem,5vw,4rem)",color:"var(--gold)",textAlign:"center",marginBottom:"5rem",lineHeight:1.1}}>How to Conduct<br/>Your Séance</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"2.5rem"}}>
          {[
            {n:"01",t:"Choose Your Spirit",b:"Select from four distinct entities — each with their own personality, knowledge, and way of communicating. Some are ancient. Some are dark. All are real."},
            {n:"02",t:"Ask Your Question",b:"Type or speak any question into the void. The universe doesn't filter. Neither do we. Ask what you dare, receive what you deserve."},
            {n:"03",t:"Watch the Planchette",b:"The board comes alive. The planchette slides across letters one by one, spelling out the spirit's message in real time. Watch. Don't look away."},
            {n:"04",t:"Interpret the Answer",b:"Spirits don't speak plainly. Their words arrive cryptic, poetic, or unsettling. The meaning is yours to decipher."},
          ].map(s=>(
            <div key={s.n} style={{padding:"2.5rem",background:"var(--surface)",border:"1px solid rgba(201,168,92,0.1)",borderRadius:"4px",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:"1.25rem",right:"1.5rem",fontFamily:"var(--font-display)",fontSize:"3.5rem",color:"rgba(201,168,92,0.06)",lineHeight:1,userSelect:"none"}}>{s.n}</div>
              <div style={{fontFamily:"var(--font-display)",fontSize:"0.65rem",color:"var(--gold)",letterSpacing:"0.25em",marginBottom:"1rem",opacity:0.65}}>{s.n}</div>
              <h3 style={{fontFamily:"var(--font-display)",color:"var(--gold)",fontSize:"1.15rem",marginBottom:"1rem",lineHeight:1.3}}>{s.t}</h3>
              <p style={{fontFamily:"var(--font-body)",fontStyle:"italic",color:"var(--text-muted)",lineHeight:1.8,fontSize:"0.93rem"}}>{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{height:"1px",background:"linear-gradient(to right,transparent,rgba(201,168,92,0.3),transparent)",margin:"0 4rem"}}/>

      {/* SPIRIT SHOWCASE */}
      <section id="spirits" style={{padding:"clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,6rem)",maxWidth:"1100px",margin:"0 auto"}}>
        <p style={{fontFamily:"var(--font-display)",letterSpacing:"0.4em",color:"var(--gold)",fontSize:"0.65rem",marginBottom:"1rem",opacity:0.6,textAlign:"center"}}>THE ENTITIES</p>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:"clamp(2.2rem,5vw,4rem)",color:"var(--gold)",textAlign:"center",marginBottom:"1.5rem",lineHeight:1.1}}>Choose Your Spirit</h2>
        <p style={{fontFamily:"var(--font-body)",fontStyle:"italic",color:"var(--text-muted)",textAlign:"center",maxWidth:"520px",margin:"0 auto 4.5rem",lineHeight:1.8}}>Four distinct entities wait on the other side. Each carries a different energy, a different truth.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1.5rem"}}>
          {[
            {e:"👁️",n:"The Elder",sub:"Ancient & Cryptic",d:"Speaks from centuries of accumulated knowledge. Uses archaic language. Answers are riddles wrapped in time.",color:"rgba(201,168,92,0.15)"},
            {e:"🌑",n:"The Shadow",sub:"Dark & Terse",d:"An entity that inhabits the negative spaces. Direct. Unsettling. Reveals what others refuse to say.",color:"rgba(107,63,160,0.15)"},
            {e:"🔮",n:"The Oracle",sub:"Prophetic & Poetic",d:"Sees threads of fate across timelines. Speaks in verse and prophecy. Truth is never straightforward here.",color:"rgba(63,107,160,0.15)"},
            {e:"🃏",n:"The Jester",sub:"Mischievous & Ironic",d:"Chaos incarnate. Darkly funny. Tells the truth through jokes and riddles designed to unsettle.",color:"rgba(160,63,63,0.15)"},
          ].map(s=>(
            <div key={s.n} style={{padding:"2.5rem 2rem",background:`linear-gradient(145deg,${s.color},var(--surface))`,border:"1px solid rgba(201,168,92,0.14)",borderRadius:"6px",textAlign:"center"}}>
              <div style={{fontSize:"2.75rem",marginBottom:"1.25rem"}}>{s.e}</div>
              <h3 style={{fontFamily:"var(--font-display)",color:"var(--gold)",fontSize:"1.15rem",marginBottom:"0.3rem"}}>{s.n}</h3>
              <p style={{fontFamily:"var(--font-display)",fontSize:"0.6rem",letterSpacing:"0.18em",color:"var(--text-muted)",marginBottom:"1rem",opacity:0.7}}>{s.sub}</p>
              <p style={{fontFamily:"var(--font-body)",fontStyle:"italic",color:"var(--text-muted)",fontSize:"0.88rem",lineHeight:1.75}}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{height:"1px",background:"linear-gradient(to right,transparent,rgba(201,168,92,0.3),transparent)",margin:"0 4rem"}}/>

      {/* TESTIMONIALS */}
      <section style={{padding:"clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,6rem)",maxWidth:"1000px",margin:"0 auto"}}>
        <p style={{fontFamily:"var(--font-display)",letterSpacing:"0.4em",color:"var(--gold)",fontSize:"0.65rem",marginBottom:"1rem",opacity:0.6,textAlign:"center"}}>TRANSMISSIONS RECEIVED</p>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:"clamp(2rem,4vw,3.5rem)",color:"var(--gold)",textAlign:"center",marginBottom:"4.5rem",lineHeight:1.1}}>What the Living Say</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
          {[
            {q:"\"I asked The Shadow about my ex. The answer was two words. I haven't slept since.\"",a:"— @darkwavejen"},
            {q:"\"The Oracle predicted something about my career. Three weeks later, it happened. Exactly.\"",a:"— @skeptic_turned"},
            {q:"\"The Jester told me the truth about myself through a knock-knock joke. I cried.\"",a:"— @midnightuser_3"},
            {q:"\"I showed my friends the board at our Halloween party. Nobody wanted to stop. We went until 4am.\"",a:"— @haunted.house.host"},
            {q:"\"The Elder speaks like no AI I've ever used. It felt ancient. It felt real.\"",a:"— @occult_tech_nerd"},
            {q:"\"Asked about my grandmother who passed. The response used words only she would say. I don't know how.\"",a:"— @grieving_believer"},
          ].map((t,i)=>(
            <div key={i} style={{padding:"2rem",background:"var(--surface)",border:"1px solid rgba(201,168,92,0.1)",borderRadius:"4px"}}>
              <p style={{fontFamily:"var(--font-body)",fontStyle:"italic",color:"var(--text)",lineHeight:1.8,fontSize:"0.93rem",marginBottom:"1.25rem"}}>{t.q}</p>
              <p style={{fontFamily:"var(--font-display)",fontSize:"0.65rem",color:"var(--gold)",letterSpacing:"0.12em",opacity:0.65}}>{t.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{height:"1px",background:"linear-gradient(to right,transparent,rgba(201,168,92,0.3),transparent)",margin:"0 4rem"}}/>

      {/* PRICING PREVIEW */}
      <section style={{padding:"clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,6rem)",maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
        <p style={{fontFamily:"var(--font-display)",letterSpacing:"0.4em",color:"var(--gold)",fontSize:"0.65rem",marginBottom:"1rem",opacity:0.6}}>THE OFFERING</p>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:"clamp(2.2rem,5vw,4rem)",color:"var(--gold)",marginBottom:"1.5rem",lineHeight:1.1}}>Start Free.<br/>Go Deeper.</h2>
        <p style={{fontFamily:"var(--font-body)",fontStyle:"italic",color:"var(--text-muted)",maxWidth:"480px",margin:"0 auto 4rem",lineHeight:1.8}}>10 free séances per day. No credit card. Upgrade when the spirits demand more of you.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1.25rem",marginBottom:"3rem"}}>
          {[
            {n:"Seeker",p:"Free",f:"10 questions / day · 4 spirits · Standard board"},
            {n:"Initiated",p:"$6.66/mo",f:"Unlimited · Session history · No limits"},
            {n:"Channeler",p:"$13.13/mo",f:"Everything + Custom spirit · Priority response"},
          ].map(p=>(
            <div key={p.n} style={{padding:"2rem 1.5rem",background:"var(--surface)",border:"1px solid rgba(201,168,92,0.14)",borderRadius:"4px"}}>
              <div style={{fontFamily:"var(--font-display)",color:"var(--gold)",fontSize:"1rem",marginBottom:"0.5rem"}}>{p.n}</div>
              <div style={{fontFamily:"var(--font-display)",fontSize:"1.5rem",color:"var(--gold-light)",marginBottom:"1rem"}}>{p.p}</div>
              <p style={{fontFamily:"var(--font-body)",fontStyle:"italic",color:"var(--text-muted)",fontSize:"0.82rem",lineHeight:1.7}}>{p.f}</p>
            </div>
          ))}
        </div>
        <Link href="/pricing" style={{display:"inline-block",border:"1px solid rgba(201,168,92,0.4)",color:"var(--gold)",padding:"1rem 3rem",fontFamily:"var(--font-display)",fontSize:"0.78rem",letterSpacing:"0.2em",borderRadius:"2px"}}>SEE ALL PLANS →</Link>
      </section>

      {/* DIVIDER */}
      <div style={{height:"1px",background:"linear-gradient(to right,transparent,rgba(201,168,92,0.3),transparent)",margin:"0 4rem"}}/>

      {/* FAQ */}
      <section style={{padding:"clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,6rem)",maxWidth:"720px",margin:"0 auto"}}>
        <p style={{fontFamily:"var(--font-display)",letterSpacing:"0.4em",color:"var(--gold)",fontSize:"0.65rem",marginBottom:"1rem",opacity:0.6,textAlign:"center"}}>THE QUESTIONS</p>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:"clamp(2rem,4vw,3.5rem)",color:"var(--gold)",textAlign:"center",marginBottom:"4rem",lineHeight:1.1}}>You Had Questions</h2>
        <div style={{display:"flex",flexDirection:"column",gap:"0"}}>
          {[
            {q:"Is this real?",a:"Spirit Signal is an AI-powered entertainment experience. The responses are generated by AI language models. Whether that makes them less real is something only you can decide."},
            {q:"What AI powers the spirits?",a:"Google Gemini 1.5 Flash. Each spirit persona is given a distinct system prompt that shapes personality, tone, and answer style — creating four genuinely different voices."},
            {q:"Can I use it at a party?",a:"Absolutely. It's designed for group use. Project it on a screen, take turns asking questions, let the planchette do its work. Halloween, sleepovers, or just a weird Tuesday."},
            {q:"Why are the prices $6.66 and $13.13?",a:"Why do you think?"},
            {q:"Is my data private?",a:"Sessions are logged by IP for rate-limiting free users. Subscribers are logged by email. We don't sell data. We're a spirit board, not an ad network."},
            {q:"Can spirits actually contact me through this?",a:"This is entertainment software powered by AI. We make no claims about the supernatural. That said — some answers have been unsettling enough that we double-checked."},
          ].map((f,i)=>(
            <div key={i} style={{borderTop:"1px solid rgba(201,168,92,0.1)",padding:"2rem 0"}}>
              <h3 style={{fontFamily:"var(--font-display)",color:"var(--gold)",fontSize:"1rem",marginBottom:"0.75rem",letterSpacing:"0.05em"}}>{f.q}</h3>
              <p style={{fontFamily:"var(--font-body)",fontStyle:"italic",color:"var(--text-muted)",lineHeight:1.8,fontSize:"0.92rem"}}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{padding:"clamp(6rem,12vw,10rem) 2rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 50% at 50% 50%, rgba(107,63,160,0.25) 0%, transparent 70%)",pointerEvents:"none"}}/>
        <p style={{fontFamily:"var(--font-display)",letterSpacing:"0.45em",color:"var(--gold)",fontSize:"0.65rem",marginBottom:"2rem",opacity:0.65}}>THE BOARD IS WAITING</p>
        <h2 style={{fontFamily:"var(--font-display)",fontSize:"clamp(2.5rem,7vw,6rem)",color:"var(--gold)",marginBottom:"1.5rem",lineHeight:1.0,textShadow:"0 0 80px rgba(201,168,92,0.35)"}}>Ask Your Question</h2>
        <p style={{fontFamily:"var(--font-body)",fontStyle:"italic",color:"var(--text-muted)",maxWidth:"400px",margin:"0 auto 3.5rem",lineHeight:1.8,fontSize:"1.05rem"}}>The spirits have been waiting. They are patient. They are not kind.</p>
        <Link href="/board" style={{display:"inline-block",background:"var(--gold)",color:"#070608",padding:"1.25rem 4rem",fontFamily:"var(--font-display)",fontSize:"0.85rem",letterSpacing:"0.25em",borderRadius:"2px",fontWeight:700}}>OPEN THE BOARD →</Link>
        <p style={{marginTop:"2.5rem",fontSize:"0.65rem",color:"var(--text-muted)",opacity:0.35,letterSpacing:"0.1em"}}>FOR ENTERTAINMENT PURPOSES ONLY</p>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid rgba(201,168,92,0.08)",padding:"3rem 2.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1.5rem"}}>
        <span style={{fontFamily:"var(--font-display)",color:"var(--gold)",fontSize:"0.9rem",letterSpacing:"0.2em",opacity:0.7}}>✦ SPIRIT SIGNAL</span>
        <div style={{display:"flex",gap:"2.5rem"}}>
          {[["Board","/board"],["Pricing","/pricing"],["How It Works","#how"],["Spirits","#spirits"]].map(([l,h])=>(
            <Link key={l} href={h} style={{fontFamily:"var(--font-display)",fontSize:"0.65rem",color:"var(--text-muted)",letterSpacing:"0.12em",opacity:0.6}}>{l.toUpperCase()}</Link>
          ))}
        </div>
        <p style={{fontFamily:"var(--font-display)",color:"var(--text-muted)",fontSize:"0.6rem",letterSpacing:"0.2em",opacity:0.4}}>FOR ENTERTAINMENT ONLY · 2026</p>
      </footer>

    </main>
  );
}
