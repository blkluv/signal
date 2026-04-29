"use client";
import { useState } from "react";
import Link from "next/link";
const PLANS=[
  {key:"free",name:"Seeker",price:"Free",sub:"Forever",features:["10 questions / day","4 spirit personas","Standard board"],cta:"Begin →",href:"/board",accent:false},
  {key:"initiated",name:"Initiated",price:"$6.66",sub:"/ month",features:["Unlimited questions","All 4 spirits","Session history","No ads"],cta:"Ascend →",href:null,accent:true},
  {key:"channeler",name:"Channeler",price:"$13.13",sub:"/ month",features:["Everything in Initiated","Priority response","Custom spirit persona","Export sessions"],cta:"Transcend →",href:null,accent:false},
];
export default function PricingPage(){
  const [loading,setLoading]=useState<string|null>(null);
  async function checkout(plan:string){
    setLoading(plan);
    const email=window.prompt("Enter your email to subscribe:");
    if(!email){setLoading(null);return;}
    const r=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({plan,email})});
    const d=await r.json();
    if(d.url)window.location.href=d.url;
    setLoading(null);
  }
  return(
    <main style={{minHeight:"100dvh",background:"var(--bg)",padding:"0 1rem 5rem"}}>
      <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.1rem 1rem",borderBottom:"1px solid rgba(201,168,92,0.1)"}}>
        <Link href="/" style={{fontFamily:"var(--font-display)",color:"var(--gold)",fontSize:"0.95rem",letterSpacing:"0.15em"}}>✦ SPIRIT SIGNAL</Link>
        <Link href="/board" style={{fontFamily:"var(--font-display)",fontSize:"0.65rem",color:"var(--text-muted)",letterSpacing:"0.15em"}}>← BACK TO BOARD</Link>
      </nav>
      <div style={{maxWidth:"920px",margin:"4rem auto 0",textAlign:"center"}}>
        <p style={{fontFamily:"var(--font-display)",letterSpacing:"0.3em",color:"var(--gold)",fontSize:"0.65rem",marginBottom:"1rem",opacity:0.7}}>THE TIERS OF THE VEIL</p>
        <h1 style={{fontFamily:"var(--font-display)",color:"var(--gold)",fontSize:"clamp(2.2rem,5vw,4rem)",marginBottom:"1.5rem",lineHeight:1.1}}>Choose Your Path</h1>
        <p style={{color:"var(--text-muted)",fontStyle:"italic",marginBottom:"4rem",fontSize:"1.05rem"}}>The deeper you go, the more the spirits reveal.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1.25rem",textAlign:"left"}}>
          {PLANS.map(p=>(
            <div key={p.key} style={{background:p.accent?"linear-gradient(145deg,rgba(201,168,92,0.1),var(--surface-2))":"var(--surface)",border:`1px solid ${p.accent?"rgba(201,168,92,0.4)":"rgba(201,168,92,0.12)"}`,borderRadius:"6px",padding:"2rem",display:"flex",flexDirection:"column",gap:"1.25rem"}}>
              {p.accent&&<div style={{fontFamily:"var(--font-display)",fontSize:"0.6rem",color:"var(--gold)",letterSpacing:"0.2em",background:"rgba(201,168,92,0.12)",padding:"0.3rem 0.75rem",borderRadius:"2px",alignSelf:"flex-start"}}>MOST POPULAR</div>}
              <div>
                <h2 style={{fontFamily:"var(--font-display)",color:"var(--gold)",letterSpacing:"0.1em",marginBottom:"0.35rem"}}>{p.name}</h2>
                <span style={{fontFamily:"var(--font-display)",fontSize:"2rem",color:"var(--gold-light)"}}>{p.price}</span>
                <span style={{color:"var(--text-muted)",fontSize:"0.8rem",marginLeft:"0.25rem"}}>{p.sub}</span>
              </div>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:"0.65rem"}}>
                {p.features.map(f=><li key={f} style={{color:"var(--text-muted)",fontSize:"0.87rem",display:"flex",gap:"0.5rem",alignItems:"center"}}><span style={{color:"var(--gold)",opacity:0.7}}>✦</span>{f}</li>)}
              </ul>
              {p.href?<Link href={p.href} style={{marginTop:"auto",display:"block",textAlign:"center",border:"1px solid rgba(201,168,92,0.3)",color:"var(--gold)",padding:"0.85rem",fontFamily:"var(--font-display)",fontSize:"0.75rem",letterSpacing:"0.15em",borderRadius:"2px"}}>{p.cta}</Link>:<button onClick={()=>checkout(p.key)} disabled={loading===p.key} style={{marginTop:"auto",padding:"0.85rem",background:p.accent?"var(--gold)":"none",border:p.accent?"none":"1px solid rgba(201,168,92,0.3)",color:p.accent?"#070608":"var(--gold)",fontFamily:"var(--font-display)",fontSize:"0.75rem",letterSpacing:"0.15em",borderRadius:"2px",cursor:"pointer"}}>{loading===p.key?"OPENING CHANNEL...":p.cta}</button>}
            </div>
          ))}
        </div>
        <p style={{marginTop:"3rem",fontSize:"0.7rem",color:"var(--text-muted)",opacity:0.45,letterSpacing:"0.08em"}}>For entertainment purposes only. Cancel anytime. Secure payments via Stripe.</p>
      </div>
    </main>
  );
}
