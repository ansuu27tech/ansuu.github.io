"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, Zap, ArrowUpRight, Brain, ChevronLeft, ChevronRight } from "lucide-react";

// ── Quantum Prism Widget ─────────────────────────────────────────────────────

function QuantumPrism({ isHovered }: { isHovered: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const tiltX = useSpring(rawX, { stiffness: 80, damping: 15 });
  const tiltY = useSpring(rawY, { stiffness: 80, damping: 15 });

  // Global mouse tracker for parallax tilt
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      rawX.set(dy * -22);
      rawY.set(dx * 22);
    };
    const onLeave = () => { rawX.set(0); rawY.set(0); };
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove as EventListener);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY]);

  const spinBase = isHovered ? 4 : 11;

  // Outer cube: 6 faces, 56px
  const OUTER: { ry: number; rx: number; tz: number; g: string }[] = [
    { ry: 0,   rx: 0,   tz: 28, g: "linear-gradient(135deg,rgba(52,211,153,0.55),rgba(6,182,212,0.38))"  },
    { ry: 180, rx: 0,   tz: 28, g: "linear-gradient(135deg,rgba(6,182,212,0.5),rgba(139,92,246,0.42))"   },
    { ry: 90,  rx: 0,   tz: 28, g: "linear-gradient(135deg,rgba(139,92,246,0.5),rgba(52,211,153,0.38))"  },
    { ry: -90, rx: 0,   tz: 28, g: "linear-gradient(135deg,rgba(20,184,166,0.55),rgba(6,182,212,0.4))"   },
    { ry: 0,   rx: 90,  tz: 28, g: "linear-gradient(135deg,rgba(52,211,153,0.62),rgba(20,184,166,0.42))" },
    { ry: 0,   rx: -90, tz: 28, g: "linear-gradient(135deg,rgba(6,182,212,0.55),rgba(139,92,246,0.42))"  },
  ];

  // Middle cube: 38px
  const MID: { ry: number; rx: number; tz: number; g: string }[] = [
    { ry: 0,   rx: 0,   tz: 19, g: "linear-gradient(135deg,rgba(20,184,166,0.45),rgba(52,211,153,0.32))"  },
    { ry: 180, rx: 0,   tz: 19, g: "linear-gradient(135deg,rgba(139,92,246,0.4),rgba(6,182,212,0.32))"    },
    { ry: 90,  rx: 0,   tz: 19, g: "linear-gradient(135deg,rgba(6,182,212,0.42),rgba(139,92,246,0.3))"    },
    { ry: -90, rx: 0,   tz: 19, g: "linear-gradient(135deg,rgba(52,211,153,0.45),rgba(20,184,166,0.35))"  },
    { ry: 0,   rx: 90,  tz: 19, g: "linear-gradient(135deg,rgba(139,92,246,0.4),rgba(52,211,153,0.32))"   },
    { ry: 0,   rx: -90, tz: 19, g: "linear-gradient(135deg,rgba(20,184,166,0.42),rgba(6,182,212,0.32))"   },
  ];

  // Inner cube: 20px
  const INNER: { ry: number; rx: number; tz: number; g: string }[] = [
    { ry: 0,   rx: 0,   tz: 10, g: "rgba(52,211,153,0.75)"   },
    { ry: 180, rx: 0,   tz: 10, g: "rgba(6,182,212,0.72)"    },
    { ry: 90,  rx: 0,   tz: 10, g: "rgba(139,92,246,0.7)"    },
    { ry: -90, rx: 0,   tz: 10, g: "rgba(52,211,153,0.72)"   },
    { ry: 0,   rx: 90,  tz: 10, g: "rgba(6,182,212,0.75)"    },
    { ry: 0,   rx: -90, tz: 10, g: "rgba(139,92,246,0.72)"   },
  ];

  // Energy beam angles (6 directions)
  const BEAMS = [0, 60, 120, 180, 240, 300];
  // Orbital node positions
  const NODES = [
    { ry: 0,   rx: 65,  tz: 46, size: 4, color: "#34d399", speed: 1.4 },
    { ry: 60,  rx: 25,  tz: 48, size: 3, color: "#22d3ee", speed: 1.9 },
    { ry: 120, rx: 72,  tz: 44, size: 5, color: "#a78bfa", speed: 1.2 },
    { ry: 180, rx: 18,  tz: 46, size: 3, color: "#34d399", speed: 2.1 },
    { ry: 240, rx: 52,  tz: 44, size: 4, color: "#06b6d4", speed: 1.6 },
    { ry: 300, rx: -38, tz: 48, size: 3, color: "#a78bfa", speed: 1.8 },
  ];

  return (
    <div
      ref={containerRef}
      style={{ perspective: "380px", width: 96, height: 96, position: "relative", cursor: "pointer" }}
    >
      {/* ── Volumetric Atmosphere Glow ── */}
      <motion.div className="absolute pointer-events-none rounded-full"
        style={{ inset: -16 }}
        animate={{
          background: isHovered
            ? [
                "radial-gradient(circle,rgba(52,211,153,0.45)0%,rgba(6,182,212,0.22)38%,rgba(139,92,246,0.1)60%,transparent 76%)",
                "radial-gradient(circle,rgba(6,182,212,0.45)0%,rgba(52,211,153,0.22)38%,rgba(139,92,246,0.1)60%,transparent 76%)",
                "radial-gradient(circle,rgba(139,92,246,0.4)0%,rgba(52,211,153,0.22)38%,rgba(6,182,212,0.08)60%,transparent 76%)",
                "radial-gradient(circle,rgba(52,211,153,0.45)0%,rgba(6,182,212,0.22)38%,rgba(139,92,246,0.1)60%,transparent 76%)",
              ]
            : "radial-gradient(circle,rgba(52,211,153,0.18)0%,rgba(6,182,212,0.08)40%,transparent 68%)",
          scale: isHovered ? 1.4 : 1,
        }}
        transition={{ duration: isHovered ? 4 : 0.7, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
      />

      {/* ── 3D Scene Root ── */}
      <motion.div
        style={{
          position: "absolute", inset: 0,
          transformStyle: "preserve-3d",
          display: "flex", alignItems: "center", justifyContent: "center",
          rotateX: tiltX,
          rotateY: tiltY,
        }}
      >
        {/* Orbital Ring 1 */}
        <div style={{ position:"absolute", width:90, height:90, transformStyle:"preserve-3d", transform:"rotateX(68deg)" }}>
          <motion.div style={{
            position:"absolute", inset:0, borderRadius:"50%",
            border:`1.5px dashed ${isHovered?"rgba(52,211,153,0.8)":"rgba(52,211,153,0.38)"}`,
            boxShadow: isHovered?"0 0 14px rgba(52,211,153,0.5),inset 0 0 8px rgba(52,211,153,0.2)":"none",
          }}
            animate={{ rotate: 360 }}
            transition={{ duration: spinBase * 1.5, repeat: Infinity, ease: "linear" }}
          >
            {/* Moving dot on ring */}
            <motion.div style={{
              position:"absolute", width:5, height:5, borderRadius:"50%",
              background:"#34d399", top:-2.5, left:"calc(50% - 2.5px)",
              boxShadow:"0 0 10px 3px rgba(52,211,153,0.9)",
            }}/>
          </motion.div>
        </div>

        {/* Orbital Ring 2 */}
        <div style={{ position:"absolute", width:76, height:76, transformStyle:"preserve-3d", transform:"rotateX(58deg) rotateY(55deg)" }}>
          <motion.div style={{
            position:"absolute", inset:0, borderRadius:"50%",
            border:`1px dashed ${isHovered?"rgba(6,182,212,0.8)":"rgba(6,182,212,0.32)"}`,
            boxShadow: isHovered?"0 0 10px rgba(6,182,212,0.45)":"none",
          }}
            animate={{ rotate: -360 }}
            transition={{ duration: spinBase, repeat: Infinity, ease: "linear" }}
          >
            <motion.div style={{
              position:"absolute", width:4, height:4, borderRadius:"50%",
              background:"#22d3ee", bottom:-2, right:"calc(50% - 2px)",
              boxShadow:"0 0 8px 3px rgba(6,182,212,0.9)",
            }}/>
          </motion.div>
        </div>

        {/* Orbital Ring 3 */}
        <div style={{ position:"absolute", width:60, height:60, transformStyle:"preserve-3d", transform:"rotateX(78deg) rotateY(-32deg)" }}>
          <motion.div style={{
            position:"absolute", inset:0, borderRadius:"50%",
            border:`1px dashed ${isHovered?"rgba(139,92,246,0.75)":"rgba(139,92,246,0.22)"}`,
          }}
            animate={{ rotate: 360 }}
            transition={{ duration: spinBase * 0.75, repeat: Infinity, ease: "linear" }}
          >
            <motion.div style={{
              position:"absolute", width:3, height:3, borderRadius:"50%",
              background:"#a78bfa", top:-1.5, left:"calc(50% - 1.5px)",
              boxShadow:"0 0 8px 2px rgba(139,92,246,0.9)",
            }}/>
          </motion.div>
        </div>

        {/* ── OUTER CUBE (56px, slow) ── */}
        <motion.div
          style={{ position:"absolute", width:56, height:56, transformStyle:"preserve-3d" }}
          animate={{ rotateX: [12, 372], rotateY: [0, -360] }}
          transition={{ duration: spinBase * 2.2, repeat: Infinity, ease: "linear" }}
        >
          {OUTER.map((f, i) => (
            <div key={i} style={{
              position:"absolute", width:56, height:56,
              transform:`rotateY(${f.ry}deg) rotateX(${f.rx}deg) translateZ(${f.tz}px)`,
              background: f.g,
              border:"1px solid rgba(255,255,255,0.18)",
              borderRadius: 5,
              backdropFilter:"blur(4px)", WebkitBackdropFilter:"blur(4px)",
              overflow:"hidden",
            }}>
              {/* Specular highlight */}
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(255,255,255,0.18)0%,transparent 55%,rgba(255,255,255,0.04)100%)", borderRadius:4 }}/>
              {/* Animated shimmer sweep */}
              <motion.div
                style={{
                  position:"absolute", top:0, bottom:0, width:20,
                  background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)",
                  filter:"blur(3px)",
                }}
                animate={{ left:["-30px","calc(100% + 30px)"] }}
                transition={{ duration:2.2, repeat:Infinity, delay:i*0.36, ease:"easeInOut", repeatDelay:1.8 }}
              />
              {/* Corner LED dots */}
              {([[3,3,-4,-4],[3,-4,-4,3],[-4,3,3,-4],[-4,-4,3,3]] as number[][]).map((pos,j)=>(
                <div key={j} style={{
                  position:"absolute", width:4, height:4, borderRadius:"50%",
                  background: j%2===0?"rgba(52,211,153,0.95)":"rgba(6,182,212,0.9)",
                  boxShadow: j%2===0?"0 0 6px rgba(52,211,153,1)":"0 0 6px rgba(6,182,212,1)",
                  top: pos[0]>=0?pos[0]:"auto", bottom:pos[1]>=0?pos[1]:"auto",
                  left:pos[2]>=0?pos[2]:"auto", right:pos[3]>=0?pos[3]:"auto",
                }}/>
              ))}
              {/* SVG circuit line overlay */}
              <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.25}}>
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(52,211,153,0.6)" strokeWidth="0.5" strokeDasharray="4 4"/>
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(52,211,153,0.6)" strokeWidth="0.5" strokeDasharray="4 4"/>
              </svg>
            </div>
          ))}
        </motion.div>

        {/* ── MIDDLE CUBE (38px, medium, reverse) ── */}
        <motion.div
          style={{ position:"absolute", width:38, height:38, transformStyle:"preserve-3d" }}
          animate={{ rotateX: [360, 0], rotateY: [0, 360] }}
          transition={{ duration: spinBase * 1.4, repeat: Infinity, ease: "linear" }}
        >
          {MID.map((f, i) => (
            <div key={i} style={{
              position:"absolute", width:38, height:38,
              transform:`rotateY(${f.ry}deg) rotateX(${f.rx}deg) translateZ(${f.tz}px)`,
              background: f.g,
              border:"1px solid rgba(255,255,255,0.12)",
              borderRadius: 3,
            }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(255,255,255,0.15)0%,transparent 60%)", borderRadius:2 }}/>
            </div>
          ))}
        </motion.div>

        {/* ── INNER CUBE (20px, fast glow core) ── */}
        <motion.div
          style={{ position:"absolute", width:20, height:20, transformStyle:"preserve-3d" }}
          animate={{ rotateX: [0, 360], rotateY: [360, 0] }}
          transition={{ duration: spinBase * 0.7, repeat: Infinity, ease: "linear" }}
        >
          {INNER.map((f, i) => (
            <div key={i} style={{
              position:"absolute", width:20, height:20,
              transform:`rotateY(${f.ry}deg) rotateX(${f.rx}deg) translateZ(${f.tz}px)`,
              background: f.g,
              borderRadius:2,
              boxShadow:"0 0 6px rgba(52,211,153,0.5)",
            }}/>
          ))}
          {/* Core singularity */}
          <motion.div style={{
            position:"absolute", width:10, height:10, left:5, top:5,
            borderRadius:"50%",
            background:"radial-gradient(circle,#fff 0%,#34d399 40%,rgba(6,182,212,0.3)100%)",
            filter:"blur(1.5px)",
          }}
            animate={{ scale:[0.8,1.5,0.8], opacity: isHovered?[0.9,1,0.9]:[0.5,0.9,0.5] }}
            transition={{ duration:1.4, repeat:Infinity, ease:"easeInOut" }}
          />
        </motion.div>

        {/* ── ENERGY BEAMS ── */}
        {BEAMS.map((angle, i) => (
          <motion.div key={i} style={{
            position:"absolute",
            width: 2, height: isHovered ? 36 : 24,
            left:"50%", top:"50%",
            translateX:"-50%", translateY:"-100%",
            transform:`rotate(${angle}deg) translateX(-50%) translateY(-100%)`,
            transformOrigin:"bottom center",
            background:`linear-gradient(to top,${
              i%3===0?"rgba(52,211,153,0.9)":i%3===1?"rgba(6,182,212,0.9)":"rgba(139,92,246,0.9)"
            },transparent)`,
            borderRadius:2,
            filter:"blur(1px)",
          }}
            animate={{ opacity: isHovered?[0.4,0.9,0.4]:[0.15,0.4,0.15], scaleY: isHovered?[0.8,1.1,0.8]:[0.6,1,0.6] }}
            transition={{ duration:1.2+i*0.2, repeat:Infinity, ease:"easeInOut", delay:i*0.15 }}
          />
        ))}

        {/* ── 3D FLOATING NODES ── */}
        {NODES.map((n, i) => (
          <motion.div key={i} style={{
            position:"absolute", width:n.size, height:n.size, borderRadius:"50%",
            background:n.color, boxShadow:`0 0 ${n.size*2.5}px ${n.color}`,
            transform:`rotateY(${n.ry}deg) rotateX(${n.rx}deg) translateZ(${n.tz}px)`,
          }}
            animate={{ opacity: isHovered?[0.6,1,0.6]:[0.2,0.5,0.2], scale:isHovered?[0.9,1.3,0.9]:[0.8,1.1,0.8] }}
            transition={{ duration:n.speed, repeat:Infinity, ease:"easeInOut" }}
          />
        ))}

      </motion.div>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────
const ROLES = [
  { id:"creator", label:"Creator",  emoji:"🎬", sub:"YouTubers, Influencers, Content Teams" },
  { id:"brand",   label:"Brand",    emoji:"💼", sub:"Businesses, Agencies, Local Brands" },
  { id:"tech",    label:"Startup",  emoji:"🚀", sub:"Startups, Dev Teams, SaaS Founders" },
];

const CARDS = {
  creator: {
    emoji:"🎁", badge:"Content Creator's Edge",
    from:"#f59e0b", to:"#ef4444",
    glow:"rgba(245,158,11,0.35)", border:"rgba(245,158,11,0.22)",
    title:"The Viral Hook Formula",
    sub:"Stop the scroll. Command the click.",
    body:"Unlock my private vault of high-CTR thumbnail structures and scroll-stopping visual psychology tactics used across 100M+ viewed content.",
    artifact:"Click-Through Masterclass · 2 Free PSD Templates",
    cta:"Download the Vault", ctaIcon:Zap,
  },
  brand: {
    emoji:"💎", badge:"Executive Strategy",
    from:"#a855f7", to:"#6366f1",
    glow:"rgba(168,85,247,0.35)", border:"rgba(168,85,247,0.22)",
    title:"The Brand Elevation Audit",
    sub:"Clarity before creativity. Strategy before aesthetics.",
    body:"Elevate your digital presence from invisible to premium. Claim a complimentary, zero-BS breakdown of your current brand. Let's find your missing conversions.",
    artifact:"Free 15-Min One-on-One Strategy Session",
    cta:"Claim My Free Audit", ctaIcon:ArrowUpRight,
  },
  tech: {
    emoji:"🚀", badge:"Tech Innovator",
    from:"#22d3ee", to:"#34d399",
    glow:"rgba(34,211,238,0.35)", border:"rgba(52,211,153,0.22)",
    title:"The AI-Driven UI Blueprint",
    sub:"Where complex algorithms meet intuitive design.",
    body:"Building a next-gen product? Grab my exclusive framework blending AI functionalities with glassmorphic UI design that users inherently trust.",
    artifact:"Exclusive 2026 UI/UX E-Book · Notion Workspace",
    cta:"Unlock the Blueprint", ctaIcon:Brain,
  },
};

type RoleKey = keyof typeof CARDS;
type Stage = "boot"|"role"|"card";

// ── Boot ──────────────────────────────────────────────────────────────────────
function BootSequence({ onDone }: { onDone:()=>void }) {
  const [progress, setProgress] = useState(0);
  const [lineIdx,  setLineIdx]  = useState(0);
  const lines = ["Initializing Quantum Core…","Scanning visitor profile…","Generating personalized vault…","Access granted."];

  useState(()=>{
    const iv = setInterval(()=>{
      setProgress(p=>{ const n=Math.min(p+Math.random()*18+8,100); if(n>=100){clearInterval(iv);setTimeout(onDone,500);} return n; });
    },90);
    const lv = setInterval(()=>setLineIdx(i=>Math.min(i+1,lines.length-1)),500);
    return ()=>{clearInterval(iv);clearInterval(lv);};
  });

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="flex flex-col items-center gap-6 w-72">
      <div className="scale-75"><QuantumPrism isHovered={false}/></div>
      <div className="font-mono text-[11px] space-y-1.5 w-full px-6 text-left">
        {lines.slice(0,lineIdx+1).map((l,i)=>(
          <motion.div key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
            className={i===lineIdx?"text-emerald-400":"text-emerald-900 line-through"}>
            {i<lineIdx?"✓ ":"> "}{l}
          </motion.div>
        ))}
      </div>
      <div className="w-full px-6">
        <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{width:`${progress}%`}}/>
        </div>
        <div className="flex justify-between mt-1.5 text-[9px] font-mono text-gray-700">
          <span>PIXELMINT v2.6</span><span>{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Role Selector ─────────────────────────────────────────────────────────────
function RoleSelector({ onSelect }: { onSelect:(r:RoleKey)=>void }) {
  return (
    <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-24}}
      transition={{duration:0.5,ease:[0.22,1,0.36,1]}}
      className="flex flex-col items-center gap-5 w-full max-w-[360px] px-4">
      <div className="text-center">
        <motion.p className="text-emerald-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-2"
          animate={{opacity:[0.5,1,0.5]}} transition={{duration:2,repeat:Infinity}}>Quantum Core Active</motion.p>
        <h2 className="text-white text-2xl font-bold" style={{fontFamily:"var(--font-syne)"}}>Who are <span className="text-emerald-400">you?</span></h2>
        <p className="text-gray-500 text-xs mt-1">Select your profile to unlock your personalized gift.</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {ROLES.map((r,i)=>(
          <motion.button key={r.id}
            initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.08+i*0.1}}
            onClick={()=>onSelect(r.id as RoleKey)}
            whileHover={{borderColor:"rgba(52,211,153,0.45)",backgroundColor:"rgba(52,211,153,0.06)"}}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-white/6 bg-white/2 text-left group">
            <span className="text-2xl leading-none">{r.emoji}</span>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">{r.label}</p>
              <p className="text-gray-600 text-[11px]">{r.sub}</p>
            </div>
            <ChevronRight size={14} className="text-gray-700 group-hover:text-emerald-400 transition-colors"/>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ── Gift Card ─────────────────────────────────────────────────────────────────
function GiftCard({ role, onBack, onClose }: { role:RoleKey; onBack:()=>void; onClose:()=>void }) {
  const card = CARDS[role];
  const CtaIcon = card.ctaIcon;
  return (
    <motion.div
      initial={{opacity:0,rotateY:-80,scale:0.9}} animate={{opacity:1,rotateY:0,scale:1}}
      exit={{opacity:0,rotateY:80,scale:0.9}} transition={{duration:0.7,type:"spring",damping:18}}
      className="w-[92vw] max-w-[400px]" style={{perspective:"1200px"}}>
      <div className="relative rounded-3xl p-7 overflow-hidden"
        style={{ background:"rgba(4,7,4,0.92)", backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)",
          border:`1px solid ${card.border}`, boxShadow:`0 0 70px ${card.glow},0 50px 100px rgba(0,0,0,0.7)` }}>
        <div className="absolute inset-0 pointer-events-none rounded-3xl opacity-[0.025]"
          style={{backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,#fff 2px,#fff 3px)"}}/>
        <motion.div className="absolute top-0 left-0 w-full h-[1.5px] pointer-events-none"
          style={{background:`linear-gradient(90deg,transparent,${card.from},${card.to},transparent)`}}
          animate={{x:["-100%","100%"]}} transition={{duration:2.8,repeat:Infinity,ease:"easeInOut"}}/>
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none opacity-12 blur-3xl"
          style={{background:`radial-gradient(circle,${card.from},transparent 70%)`}}/>

        <div className="flex items-center justify-between mb-5">
          <button onClick={onBack} className="flex items-center gap-1.5 text-gray-600 hover:text-white transition-colors text-[11px] font-mono tracking-widest uppercase">
            <ChevronLeft size={12}/> Back
          </button>
          <span className="text-[10px] font-mono tracking-[0.18em] uppercase px-3 py-1 rounded-full border"
            style={{color:card.from,borderColor:card.border,background:`${card.from}12`}}>{card.badge}</span>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full text-gray-600 hover:text-white hover:bg-white/10 transition-all">
            <X size={13}/>
          </button>
        </div>

        <motion.h2 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          className="font-bold text-[20px] leading-tight mb-1" style={{fontFamily:"var(--font-syne)"}}>
          <span>{card.emoji} </span>
          <span className="bg-clip-text text-transparent" style={{backgroundImage:`linear-gradient(135deg,${card.from},${card.to})`}}>{card.title}</span>
        </motion.h2>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.18}}
          className="text-gray-400 text-[12px] italic mb-4 tracking-wide">{card.sub}</motion.p>
        <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.26}}
          className="text-gray-300 text-[13px] leading-relaxed mb-5">{card.body}</motion.p>

        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:0.36}}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border mb-6"
          style={{borderColor:card.border,background:`${card.from}0d`}}>
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{background:card.from,boxShadow:`0 0 8px ${card.from}`}}/>
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-600 font-mono tracking-widest uppercase">The Artifact</span>
            <span className="text-[11px] text-gray-200 font-medium">{card.artifact}</span>
          </div>
        </motion.div>

        <motion.a href="#" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.44}}
          onClick={(e)=>{e.preventDefault();onClose();}}
          whileHover={{scale:1.03,boxShadow:`0 0 55px ${card.glow}`}} whileTap={{scale:0.97}}
          className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-black text-[11px] tracking-[0.2em] uppercase text-black cursor-pointer"
          style={{background:`linear-gradient(135deg,${card.from},${card.to})`,boxShadow:`0 0 30px ${card.glow}`}}>
          {card.cta} <CtaIcon size={14} strokeWidth={2.8}/>
        </motion.a>
        <p className="text-center text-gray-700 text-[10px] mt-3 font-mono">No commitment · 100% free · by Anas @ Pixelmint</p>
      </div>
    </motion.div>
  );
}

// ── Master ────────────────────────────────────────────────────────────────────
export default function AICoreGift() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered,  setIsHovered]  = useState(false);
  const [stage, setStage] = useState<Stage>("boot");
  const [role,  setRole]  = useState<RoleKey|null>(null);

  const handleOpen  = useCallback(()=>{setStage("boot");setRole(null);setIsExpanded(true);},[]);
  const handleClose = useCallback(()=>setIsExpanded(false),[]);

  return (
    <>
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{opacity:0,scale:0.4,y:30}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.4,y:30}}
            transition={{type:"spring",damping:20,stiffness:260,delay:1.5}}
            className="fixed bottom-6 right-6 z-[9999] select-none"
          >
            <div
              onMouseEnter={()=>setIsHovered(true)}
              onMouseLeave={()=>setIsHovered(false)}
              onClick={handleOpen}
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:6}}
                    className="absolute -top-9 left-1/2 -translate-x-1/2 text-emerald-400 text-[10px] font-bold tracking-widest uppercase whitespace-nowrap pointer-events-none z-10"
                    style={{textShadow:"0 0 14px rgba(52,211,153,1)"}}>
                    Unlock a Gift
                  </motion.span>
                )}
              </AnimatePresence>
              <QuantumPrism isHovered={isHovered}/>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
            style={{background:"rgba(1,4,1,0.95)",backdropFilter:"blur(30px)",WebkitBackdropFilter:"blur(30px)"}}
            onClick={stage==="boot"||stage==="role"?handleClose:undefined}
          >
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(52,211,153,0.4)3px,rgba(52,211,153,0.4)4px)"}}/>
            <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none scale-[0.65]">
              <QuantumPrism isHovered={false}/>
            </div>

            <AnimatePresence mode="wait">
              {stage==="boot" && (
                <motion.div key="boot" className="relative z-10">
                  <BootSequence onDone={()=>setStage("role")}/>
                </motion.div>
              )}
              {stage==="role" && (
                <motion.div key="role" className="relative z-10 w-full flex justify-center" onClick={e=>e.stopPropagation()}>
                  <RoleSelector onSelect={r=>{setRole(r);setStage("card");}}/>
                </motion.div>
              )}
              {stage==="card"&&role&&(
                <motion.div key="card" className="relative z-10 flex justify-center w-full" onClick={e=>e.stopPropagation()}>
                  <GiftCard role={role} onBack={()=>setStage("role")} onClose={handleClose}/>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
