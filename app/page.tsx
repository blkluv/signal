import Link from "next/link";
export default function HomePage() {
  return (
    <main style={{minHeight:"100dvh",background:"var(--bg)",overflow:"hidden"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1rem 2rem",background:"rgba(7,6,8,0.85)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(201,168,92,0.15)"}}>
        <span style={{fontFamily:"var(--font-display)",color:"var(--gold)",fontSize:"1.1rem",letterSpacing:"0.15em"}}>✦ SPIRIT SIGNAL</span>
        <div style={{display:"flex",gap:"2rem",alignItems:"center"}}>
          <Link href="/pricing" style={{color:"var(--text-muted)",fontSize:"0.85rem",letterSpacing:"0.1em",fontFamily:"var(--font-display)"}}>PRICING</Link>
          <Link href="/board" style={{background:"var(--gold)",color:"#070608",padding:"0.5rem 1.5rem",fontFamily:"var(--font-display)",fontSize:"0.75rem",letterSpacing:"0.15em",borderRadius:"2px",fontWeight:700}}>ENTER</Link>
        </div>
      </nav>
      <section style={{minHeight:"100dvh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"8rem 2rem 4rem",position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 30%, rgba(107,63,160,0.18) 0%, transparent 65%)",pointerEvents:"none"}}/>
        <p style={{fontFamily:"var(--font-display)",letterSpacing:"0.4em",color:"var(--gold)",fontSize:"0.7rem",marginBottom:"1.5rem",opacity:0.75}}>THE VEIL IS THIN TONIGHT</p>
        <h1 style={{fontFamily:"var(--font-display)",fontSize:"clamp(3.5rem,9vw,8rem)",color:"var(--gold)",lineHeight:1.0,marginBottom:"1.5rem",textShadow:"0 0 80px rgba(201,168,92,0.45)"}}>SPIRIT<br/>SIGNAL</h1>
        <p style={{fontFamily:"var(--font-body)",fontStyle:"italic",fontSize:"clamp(1rem,2vw,1.35rem)",color:"var(--text-muted)",maxWidth:"480px",lineHeight:1.75,marginBottom:"3rem"}}>An AI-powered Ouija board. Ask the spirits anything. Receive answers from beyond.</p>
        <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center"}}>
          <Link href="/board" style={{background:"var(--gold)",color:"#070608",padding:"1rem 2.5rem",fontFamily:"var(--font-display)",fontSize:"0.8rem",letterSpacing:"0.2em",borderRadius:"2px",fontWeight:700}}>BEGIN THE SÉANCE</Link>
          <Link href="/pricing" style={{border:"1px solid rgba(201,168,92,0.4)",color:"var(--gold)",padding:"1rem 2.5rem",fontFamily:"var(--font-display)",fontSize:"0.8rem",letterSpacing:"0.2em",borderRadius:"2px"}}>VIEW PLANS</Link>
        </div>
        <p style={{marginTop:"3rem",fontSize:"0.7rem",color:"var(--text-muted)",letterSpacing:"0.1em",opacity:0.5}}>FOR ENTERTAINMENT PURPOSES ONLY</p>
      </section>
      <footer style={{padding:"2.5rem 2rem",borderTop:"1px solid rgba(201,168,92,0.08)",textAlign:"center"}}>
        <p style={{fontFamily:"var(--font-display)",color:"var(--text-muted)",fontSize:"0.65rem",letterSpacing:"0.25em",opacity:0.5}}>✦ SPIRIT SIGNAL ✦ FOR ENTERTAINMENT PURPOSES ONLY ✦ 2026</p>
      </footer>
    </main>
  );
}
