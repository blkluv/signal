"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
const SPIRITS: Record<string,{name:string;emoji:string}> = {
  elder:{name:"The Elder",emoji:"👁️"},
  shadow:{name:"The Shadow",emoji:"🌑"},
  oracle:{name:"The Oracle",emoji:"🔮"},
  jester:{name:"The Jester",emoji:"🃏"},
};
const ROWS=[["A","B","C","D","E","F","G","H","I"],["J","K","L","M","N","O","P","Q","R"],["S","T","U","V","W","X","Y","Z"]];
const NUMS=["1","2","3","4","5","6","7","8","9","0"];
function getPos(char:string):{x:number;y:number}|null{
  if(char===" ")return{x:50,y:78};
  for(let r=0;r<ROWS.length;r++){const i=ROWS[r].indexOf(char);if(i!==-1)return{x:8+(i/(ROWS[r].length-1))*84,y:24+r*19};}
  const ni=NUMS.indexOf(char);if(ni!==-1)return{x:6+ni*9.2,y:73};
  return null;
}
function Board({answer,animating}:{answer:string;animating:boolean}){
  const [pos,setPos]=useState({x:50,y:50});
  const [lit,setLit]=useState<Set<string>>(new Set());
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(()=>{
    timers.current.forEach(clearTimeout);timers.current=[];setLit(new Set());
    if(!answer||!animating)return;
    const chars=answer.toUpperCase().replace(/[^A-Z0-9 ]/g,"").split("");
    chars.forEach((c,i)=>{const t=setTimeout(()=>{const p=getPos(c);if(p)setPos(p);setLit(prev=>new Set([...prev,c]));},i*750);timers.current.push(t);});
  },[answer,animating]);
  return(
    <div style={{position:"relative",width:"100%",maxWidth:"680px",margin:"0 auto",background:"linear-gradient(145deg,#2a1f0e,#1a1208,#221a0c)",border:"2px solid rgba(201,168,92,0.35)",borderRadius:"10px",padding:"clamp(1rem,3vw,1.75rem)",boxShadow:"0 0 60px rgba(201,168,92,0.12),inset 0 0 40px rgba(0,0,0,0.5)"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.5rem",padding:"0 6%"}}>
        {["YES","NO"].map(w=><span key={w} style={{fontFamily:"var(--font-display)",fontSize:"clamp(1.1rem,3.5vw,2rem)",color:lit.has(w[0])?"#fff":"rgba(201,168,92,0.65)",textShadow:lit.has(w[0])?"0 0 20px #c9a85c":"none",letterSpacing:"0.15em",transition:"all 0.3s"}}>{w}</span>)}
      </div>
      {ROWS.map((row,ri)=>(
        <div key={ri} style={{display:"flex",justifyContent:"center",gap:"clamp(0.15rem,1.2vw,0.75rem)",marginBottom:"0.25rem"}}>
          {row.map(l=><span key={l} style={{fontFamily:"var(--font-display)",fontSize:"clamp(0.85rem,2.5vw,1.35rem)",color:lit.has(l)?"#fff":"rgba(201,168,92,0.6)",textShadow:lit.has(l)?"0 0 15px #c9a85c":"none",transition:"all 0.2s",minWidth:"1.1em",textAlign:"center"}}>{l}</span>)}
        </div>
      ))}
      <div style={{display:"flex",justifyContent:"center",gap:"clamp(0.2rem,1.4vw,0.9rem)",margin:"0.4rem 0"}}>
        {NUMS.map(n=><span key={n} style={{fontFamily:"var(--font-display)",fontSize:"clamp(0.75rem,2vw,1rem)",color:lit.has(n)?"#fff":"rgba(201,168,92,0.45)",transition:"all 0.2s"}}>{n}</span>)}
      </div>
      <div style={{textAlign:"center",marginTop:"0.4rem"}}>
        <span style={{fontFamily:"var(--font-display)",fontSize:"clamp(0.9rem,2.5vw,1.5rem)",color:"rgba(201,168,92,0.55)",letterSpacing:"0.2em"}}>GOODBYE</span>
      </div>
      <div style={{position:"absolute",left:`${pos.x}%`,top:`${pos.y}%`,transform:"translate(-50%,-50%)",width:"clamp(36px,7vw,56px)",height:"clamp(36px,7vw,56px)",background:"radial-gradient(circle,rgba(201,168,92,0.25) 0%,rgba(201,168,92,0.04) 70%)",border:"2px solid rgba(201,168,92,0.55)",borderRadius:"50% 50% 50% 0",transition:"left 0.65s cubic-bezier(0.25,0.46,0.45,0.94),top 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",boxShadow:"0 0 18px rgba(201,168,92,0.35)",pointerEvents:"none"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"7px",height:"7px",borderRadius:"50%",border:"2px solid rgba(201,168,92,0.75)"}}/>
      </div>
    </div>
  );
}
export default function BoardPage(){
  const [spirit,setSpirit]=useState("elder");
  const [q,setQ]=useState("");
  const [answer,setAnswer]=useState("");
  const [loading,setLoading]=useState(false);
  const [animating,setAnimating]=useState(false);
  const [left,setLeft]=useState(10);
  const [wall,setWall]=useState(false);
  const [sessionId]=useState(()=>Math.random().toString(36).slice(2));
  async function ask(){
    if(!q.trim()||loading)return;
    setLoading(true);setAnswer("");setAnimating(false);
    try{
      const r=await fetch("/api/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:q,spirit,sessionId})});
      const d=await r.json();
      if(d.error==="FREE_LIMIT_REACHED"){setWall(true);setLoading(false);return;}
      setAnswer(d.answer);setAnimating(true);setLeft(p=>Math.max(0,p-1));
    }catch{setAnswer("The spirits are silent...");}
    setLoading(false);
  }
  return(
    <main style={{minHeight:"100dvh",background:"var(--bg)",padding:"0 1rem 5rem"}}>
      <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.1rem 1rem",borderBottom:"1px solid rgba(201,168,92,0.1)"}}>
        <Link href="/" style={{fontFamily:"var(--font-display)",color:"var(--gold)",fontSize:"0.95rem",letterSpacing:"0.15em"}}>✦ SPIRIT SIGNAL</Link>
        <Link href="/pricing" style={{fontFamily:"var(--font-display)",fontSize:"0.65rem",color:"var(--text-muted)",letterSpacing:"0.15em",border:"1px solid rgba(201,168,92,0.25)",padding:"0.4rem 0.9rem",borderRadius:"2px"}}>UPGRADE</Link>
      </nav>
      <div style={{maxWidth:"720px",margin:"2rem auto 0"}}>
        <p style={{fontFamily:"var(--font-display)",textAlign:"center",color:"var(--text-muted)",fontSize:"0.65rem",letterSpacing:"0.3em",marginBottom:"1.75rem"}}>CHOOSE YOUR SPIRIT · {left} FREE SESSIONS REMAINING</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"0.65rem",marginBottom:"1.75rem"}}>
          {Object.entries(SPIRITS).map(([k,s])=>(
            <button key={k} onClick={()=>setSpirit(k)} style={{padding:"0.7rem 0.4rem",background:spirit===k?"rgba(201,168,92,0.12)":"var(--surface)",border:`1px solid ${spirit===k?"rgba(201,168,92,0.45)":"rgba(201,168,92,0.1)"}`,borderRadius:"4px",cursor:"pointer",textAlign:"center"}}>
              <div style={{fontSize:"1.4rem",marginBottom:"0.25rem"}}>{s.emoji}</div>
              <div style={{fontFamily:"var(--font-display)",fontSize:"0.6rem",color:spirit===k?"var(--gold)":"var(--text-muted)",letterSpacing:"0.08em"}}>{s.name.toUpperCase()}</div>
            </button>
          ))}
        </div>
        <Board answer={answer} animating={animating}/>
        {answer&&<div style={{marginTop:"1.5rem",padding:"1.5rem",background:"var(--surface)",border:"1px solid rgba(201,168,92,0.18)",borderRadius:"4px",textAlign:"center"}}>
          <p style={{fontFamily:"var(--font-body)",fontStyle:"italic",fontSize:"1.05rem",color:"var(--text)",lineHeight:1.75}}>&ldquo;{answer}&rdquo;</p>
          <p style={{marginTop:"0.5rem",fontSize:"0.7rem",color:"var(--text-muted)",fontFamily:"var(--font-display)",letterSpacing:"0.1em"}}>— {SPIRITS[spirit].name}</p>
        </div>}
        <div style={{marginTop:"1.75rem",display:"flex",flexDirection:"column",gap:"0.65rem"}}>
          <textarea value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();ask();}}} placeholder="Ask the spirits your question..." rows={3} style={{width:"100%",padding:"1rem",background:"var(--surface)",border:"1px solid rgba(201,168,92,0.18)",borderRadius:"4px",color:"var(--text)",fontFamily:"var(--font-body)",fontSize:"1rem",resize:"none",outline:"none"}}/>
          <button onClick={ask} disabled={loading||!q.trim()} style={{padding:"1rem",background:loading?"rgba(201,168,92,0.25)":"var(--gold)",color:"#070608",fontFamily:"var(--font-display)",fontSize:"0.8rem",letterSpacing:"0.2em",border:"none",borderRadius:"2px",fontWeight:700}}>{loading?"THE SPIRITS STIR...":"ASK THE SPIRITS"}</button>
        </div>
        <p style={{textAlign:"center",marginTop:"1.5rem",fontSize:"0.65rem",color:"var(--text-muted)",opacity:0.45}}>For entertainment purposes only.</p>
      </div>
      {wall&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:"2rem"}}>
        <div style={{background:"var(--surface-2)",border:"1px solid rgba(201,168,92,0.28)",borderRadius:"8px",padding:"3rem 2rem",maxWidth:"380px",textAlign:"center"}}>
          <h2 style={{fontFamily:"var(--font-display)",color:"var(--gold)",fontSize:"1.6rem",marginBottom:"1rem"}}>Free sessions exhausted</h2>
          <p style={{color:"var(--text-muted)",lineHeight:1.7,marginBottom:"2rem"}}>Upgrade to continue your séance.</p>
          <Link href="/pricing" style={{display:"block",background:"var(--gold)",color:"#070608",padding:"1rem",fontFamily:"var(--font-display)",fontSize:"0.8rem",letterSpacing:"0.15em",borderRadius:"2px",fontWeight:700,marginBottom:"0.75rem"}}>UNLOCK THE SPIRITS →</Link>
          <button onClick={()=>setWall(false)} style={{background:"none",border:"none",color:"var(--text-muted)",fontSize:"0.8rem",cursor:"pointer"}}>Maybe later</button>
        </div>
      </div>}
    </main>
  );
}
