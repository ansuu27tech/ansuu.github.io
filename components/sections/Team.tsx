"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Instagram, Linkedin, Github, ExternalLink, Zap, Star, ArrowUpRight, Plus } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const TEAM = [
  {
    index: "01", name: "Mohammed Anas N", firstName: "Anas",
    role: "Founder & CEO", isFounder: true,
    status: "Building Pixelmint",
    tagline: "Build things that make people stop scrolling.",
    bio: "Design-obsessed engineer who turns abstract ideas into scalable digital experiences. Leading the pixel-perfect vision at PixelMint Studio.",
    stats: [{ num: "50+", label: "Projects" }, { num: "3yr", label: "Exp." }, { num: "∞", label: "Ambition" }],
    skills: ["React", "Next.js", "UI/UX", "Branding", "Node.js"],
    image: "/mohammed anas.jpeg",
    socials: { instagram: "#", linkedin: "#", github: "#" },
    accent: "#34d399", accentTo: "#22d3ee",
    glow: "rgba(52,211,153,0.38)", borderCol: "rgba(52,211,153,0.28)",
  },
  {
    index: "02", name: "Mohammed Janis P", firstName: "Janis",
    role: "Lead Designer", isFounder: false,
    status: "Crafting pixels",
    tagline: "Every pixel should earn its place.",
    bio: "Turns wireframes into visual poetry. Believes great design is invisible — only its absence is felt.",
    stats: [{ num: "100+", label: "Designs" }, { num: "2yr", label: "Exp." }, { num: "∞", label: "Pixels" }],
    skills: ["Figma", "UI Design", "Branding", "Motion"],
    image: "/janis.jpeg",
    socials: { instagram: "#", linkedin: "#", github: "" },
    accent: "#22d3ee", accentTo: "#818cf8",
    glow: "rgba(34,211,238,0.32)", borderCol: "rgba(34,211,238,0.25)",
  },
  {
    index: "03", name: "Ashraf Bari", firstName: "Ashraf",
    role: "Backend Architect", isFounder: false,
    status: "Scaling infra",
    tagline: "Elegant schemas, bulletproof infra.",
    bio: "Quietly builds the infrastructure nobody sees but everyone depends on.",
    stats: [{ num: "30+", label: "APIs" }, { num: "2yr", label: "Exp." }, { num: "99.9%", label: "Uptime" }],
    skills: ["Node.js", "MongoDB", "PostgreSQL", "AWS"],
    image: null,
    socials: { instagram: "", linkedin: "#", github: "#" },
    accent: "#a78bfa", accentTo: "#f472b6",
    glow: "rgba(167,139,250,0.32)", borderCol: "rgba(167,139,250,0.22)",
  },
  {
    index: "04", name: "Ajmal Basheer", firstName: "Ajmal",
    role: "Full Stack Engineer", isFounder: false,
    status: "Shipping features",
    tagline: "Ship fast, learn faster.",
    bio: "Bridges the gap between interface and engine. Happiest shipping features at 2AM.",
    stats: [{ num: "40+", label: "Features" }, { num: "2yr", label: "Exp." }, { num: "24/7", label: "Shipping" }],
    skills: ["React", "Node.js", "TypeScript", "Firebase"],
    image: null,
    socials: { instagram: "", linkedin: "#", github: "#" },
    accent: "#f59e0b", accentTo: "#ef4444",
    glow: "rgba(245,158,11,0.3)", borderCol: "rgba(245,158,11,0.22)",
  },
];

const MARQUEE_ITEMS = ["designed to inspire","built to scale","obsessed with craft","precision over volume","form meets function","pixel perfect"];

/* ═══════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════ */
function useTilt(deg = 10) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [deg, -deg]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-deg, deg]), { stiffness: 180, damping: 22 });
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top)  / r.height - 0.5);
  }, [x, y]);
  const onReset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return { rotateX, rotateY, onMove, onReset };
}

function PulseDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-[7px] w-[7px]">
      <motion.span className="absolute inline-flex h-full w-full rounded-full"
        style={{ background: color }}
        animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
      <span className="relative rounded-full h-[7px] w-[7px]" style={{ background: color }} />
    </span>
  );
}

function Social({ href, Icon, color }: { href: string; Icon: any; color: string }) {
  if (!href) return null;
  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.25, y: -1 }}
      className="text-gray-600 transition-colors duration-200"
      style={{ color: "inherit" }}
      onHoverStart={e => { (e.target as HTMLAnchorElement).style.color = color; }}
      onHoverEnd={e => { (e.target as HTMLAnchorElement).style.color = ""; }}>
      <Icon size={14} strokeWidth={1.7} />
    </motion.a>
  );
}

function HoverParticles({ count, color, active }: { count: number; color: string; active: boolean }) {
  if (!active) return null;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10, x: (Math.random() - 0.5) * 40 }}
          animate={{ opacity: [0, 0.8, 0], y: -30 - Math.random() * 50, x: (Math.random() - 0.5) * 60 }}
          transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: "10%",
            left: `${10 + Math.random() * 80}%`,
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 10px ${color}`,
            willChange: "transform, opacity"
          }}
        />
      ))}
    </div>
  );
}

function MarqueeStrip({ reverse = false }: { reverse?: boolean }) {
  const d = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "10px 0", background: "#050805" }}>
      <div style={{ display: "inline-flex", whiteSpace: "nowrap", animation: `pmTeamMarquee 32s linear infinite${reverse ? " reverse" : ""}`, willChange: "transform" }}>
        {d.map((t, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 28px", fontFamily: "monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#374151" }}>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#34d399", display: "block" }} />{t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FOUNDER CARD (wide — spans 2 of 3 columns)
═══════════════════════════════════════════════════════ */
function FounderCard({ member }: { member: typeof TEAM[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { rotateX, rotateY, onMove, onReset } = useTilt(5);
  const [hov, setHov] = useState(false);
  const [spot, setSpot] = useState({ x: 0, y: 0 });

  const trackSpot = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: hov ? -12 : 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], y: { duration: 0.4 } }}
      style={{ perspective: 1000, gridColumn: "span 2" }}
      onMouseMove={(e) => { onMove(e); trackSpot(e); }}
      onMouseLeave={() => { onReset(); setHov(false); }}
      onMouseEnter={() => setHov(true)}
    >
      <motion.div
        style={{
          rotateX, rotateY, transformStyle: "preserve-3d",
          borderRadius: 24, overflow: "hidden", position: "relative",
          minHeight: 380,
          background: hov ? "rgba(8,14,8,0.97)" : "rgba(5,9,5,0.94)",
          backdropFilter: "blur(28px)",
          transition: "box-shadow 0.5s, background 0.5s",
          boxShadow: hov
            ? `0 0 0 1.5px ${member.accent}90, 0 0 60px ${member.glow}, 0 0 120px ${member.glow}, 0 40px 100px rgba(0,0,0,0.7)`
            : "0 1px 0 1px rgba(255,255,255,0.06), 0 16px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Animated gradient border */}
        <div style={{
          position: "absolute", inset: -1, borderRadius: 25, zIndex: 0, padding: 1,
          background: hov
            ? `conic-gradient(from var(--gradient-angle, 0deg), ${member.accent}, ${member.accentTo}, transparent, ${member.accent})`
            : `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`,
          transition: "background 0.6s",
          animation: hov ? `gradient-border-spin 3s linear infinite` : "none",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }} />
        {/* Spotlight overlay */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 24, zIndex: 5,
          opacity: hov ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none",
          background: `radial-gradient(280px circle at ${spot.x}px ${spot.y}px, ${member.glow} 0%, transparent 65%)`,
        }} />

        {/* Grid bg */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 24, pointerEvents: "none",
          opacity: 0.022,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
          backgroundSize: "38px 38px",
        }} />

        <HoverParticles count={15} color={member.accent} active={hov} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", height: "100%", position: "relative", zIndex: 10 }}>
          {/* LEFT — photo */}
          <div style={{ position: "relative", overflow: "hidden", minHeight: 340 }}>
            {/* Top accent bar */}
            <motion.div
              style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, zIndex: 4, background: `linear-gradient(90deg,${member.accent},${member.accentTo})`, transformOrigin: "left" }}
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1.1, delay: 0.4 }} />

            {member.image ? (
              <Image src={member.image} alt={member.name} fill
                className="object-cover object-[center_top]"
                sizes="(max-width: 768px) 100vw, 34vw"
                priority
                style={{ transform: hov ? "scale(1.05)" : "scale(1)", filter: hov ? "grayscale(0%) brightness(0.92)" : "grayscale(60%) brightness(0.65)", transition: "transform 0.7s ease, filter 0.7s ease" }} />
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `${member.accent}0a`, color: `${member.accent}18`, fontSize: 100, fontWeight: 900 }}>
                {member.firstName[0]}
              </div>
            )}

            {/* Gradients */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 55%,rgba(5,9,5,0.95) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,9,5,0.55) 0%,transparent 45%)" }} />

            {/* Ghost index */}
            <div style={{ position: "absolute", bottom: 8, left: 12, fontSize: 80, fontWeight: 900, lineHeight: 1, opacity: 0.05, color: member.accent, pointerEvents: "none", userSelect: "none", fontFamily: "var(--font-syne)" }}>{member.index}</div>

            {/* Founder badge */}
            <div style={{ position: "absolute", top: 18, left: 18, zIndex: 6, display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 100, background: member.accent, color: "#050905", fontSize: 8, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "monospace" }}>
              <Star size={8} fill="currentColor" /> Founder & CEO
            </div>

            {/* Quote on hover */}
            <AnimatePresence>
              {hov && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35 }}
                  style={{ position: "absolute", bottom: 20, left: 18, right: 18, zIndex: 6 }}>
                  <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 13, fontStyle: "italic", lineHeight: 1.55, fontFamily: "var(--font-syne)" }}>
                    &ldquo;{member.tagline}&rdquo;
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT — info */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, padding: "36px 36px", position: "relative", overflow: "hidden" }}>
            {/* Ghost name */}
            <div style={{ position: "absolute", bottom: -10, right: -10, fontSize: 72, fontWeight: 900, opacity: 0.035, lineHeight: 1, pointerEvents: "none", userSelect: "none", fontFamily: "var(--font-syne)", color: "white", whiteSpace: "nowrap" }}>{member.firstName}</div>

            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <PulseDot color={member.accent} />
              <span style={{ color: member.accent, fontSize: 9, fontFamily: "monospace", letterSpacing: "0.22em", textTransform: "uppercase" }}>{member.status}</span>
            </div>

            {/* Name */}
            <div>
              <h3 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(22px,3vw,34px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: 6 }}>
                {member.name.split(" ").slice(0, 2).join(" ")}<br />
                <span style={{ color: member.accent }}>{member.name.split(" ").slice(2).join(" ")}</span>
              </h3>
              <p style={{ color: "#6b7280", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.22em", textTransform: "uppercase" }}>{member.role}</p>
            </div>

            <p style={{ color: "#9ca3af", fontSize: 12.5, lineHeight: 1.75 }}>{member.bio}</p>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {member.stats.map((s, i) => (
                <div key={i} style={{ borderRadius: 12, padding: "10px 8px", textAlign: "center", border: `1px solid ${hov ? member.borderCol : "rgba(255,255,255,0.05)"}`, background: hov ? `${member.accent}0a` : "rgba(255,255,255,0.02)", transition: "all 0.4s" }}>
                  <div style={{ fontFamily: "var(--font-syne)", fontWeight: 900, fontSize: 16, color: member.accent, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 7, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {member.skills.map((skill, i) => (
                <motion.span key={skill}
                  initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  style={{
                    fontSize: 8, fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase",
                    padding: "5px 11px", borderRadius: 100,
                    border: `1px solid ${hov ? member.borderCol : "rgba(255,255,255,0.07)"}`,
                    color: hov ? member.accent : "#6b7280",
                    background: hov ? `${member.accent}08` : "transparent",
                    transition: "all 0.3s",
                    cursor: "default",
                  }}>
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Social href={member.socials.instagram} Icon={Instagram} color={member.accent} />
                <Social href={member.socials.linkedin}  Icon={Linkedin}  color={member.accent} />
                <Social href={member.socials.github}    Icon={Github}    color={member.accent} />
              </div>
              <motion.a href="#contact" whileHover={{ x: 2 }}
                style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 8, fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", padding: "8px 14px", borderRadius: 100, border: `1px solid ${member.borderCol}`, color: member.accent, background: `${member.accent}08`, textDecoration: "none" }}>
                Work with me <ArrowUpRight size={10} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MEMBER CARD (compact)
═══════════════════════════════════════════════════════ */
function MemberCard({ member, delay }: { member: typeof TEAM[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { rotateX, rotateY, onMove, onReset } = useTilt(10);
  const [hov, setHov] = useState(false);
  const [spot, setSpot] = useState({ x: 0, y: 0 });

  const trackSpot = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: hov ? -10 : 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: hov ? 0 : delay, ease: [0.22, 1, 0.36, 1], y: { duration: 0.4 } }}
      style={{ perspective: 900 }}
      onMouseMove={(e) => { onMove(e); trackSpot(e); }}
      onMouseLeave={() => { onReset(); setHov(false); }}
      onMouseEnter={() => setHov(true)}
    >
      <motion.div
        style={{
          rotateX, rotateY, transformStyle: "preserve-3d",
          borderRadius: 20, overflow: "hidden",
          position: "relative", display: "flex", flexDirection: "column",
          background: hov ? "rgba(8,14,8,0.97)" : "rgba(5,9,5,0.92)",
          backdropFilter: "blur(28px)",
          transition: "box-shadow 0.5s, background 0.5s",
          boxShadow: hov
            ? `0 0 0 1.5px ${member.accent}90, 0 0 40px ${member.glow}, 0 0 80px ${member.glow}, 0 30px 80px rgba(0,0,0,0.6)`
            : "0 1px 0 1px rgba(255,255,255,0.06), 0 12px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Animated gradient border */}
        <div style={{
          position: "absolute", inset: -1, borderRadius: 21, zIndex: 0, padding: 1,
          background: hov
            ? `conic-gradient(from var(--gradient-angle, 0deg), ${member.accent}, ${member.accentTo}, transparent, ${member.accent})`
            : `linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))`,
          transition: "background 0.6s",
          animation: hov ? `gradient-border-spin 3s linear infinite` : "none",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }} />
        {/* Top accent line */}
        <motion.div
          style={{ height: 2, background: `linear-gradient(90deg,${member.accent},${member.accentTo})`, transformOrigin: "left" }}
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.9, delay: delay + 0.2 }} />

        {/* Spotlight */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 20, zIndex: 5,
          opacity: hov ? 1 : 0, pointerEvents: "none", transition: "opacity 0.3s",
          background: `radial-gradient(190px circle at ${spot.x}px ${spot.y}px,${member.glow} 0%,transparent 65%)`,
        }} />

        {/* Grid bg */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none", opacity: 0.022,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
          backgroundSize: "30px 30px",
        }} />
        
        <HoverParticles count={10} color={member.accent} active={hov} />

        {/* Ghost index */}
        <div style={{ position: "absolute", top: 6, right: 12, fontSize: 52, fontWeight: 900, opacity: 0.05, color: member.accent, pointerEvents: "none", userSelect: "none", fontFamily: "var(--font-syne)", lineHeight: 1 }}>{member.index}</div>

        <div style={{ position: "relative", zIndex: 10, padding: 24, display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
          {/* Avatar + name */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: 76, height: 76, borderRadius: 14, overflow: "hidden",
                border: `2px solid ${hov ? member.accent : "rgba(255,255,255,0.07)"}`,
                boxShadow: hov ? `0 0 20px ${member.glow}` : "none",
                transition: "border-color 0.4s, box-shadow 0.4s",
              }}>
                {member.image ? (
                  <Image src={member.image} alt={member.name} fill
                    className="object-cover object-top"
                    sizes="76px"
                    style={{ transform: hov ? "scale(1.08)" : "scale(1)", filter: hov ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.55)", transition: "transform 0.65s ease, filter 0.65s ease" }}/>
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `${member.accent}12`, color: member.accent, fontSize: 22, fontWeight: 900, fontFamily: "var(--font-syne)" }}>
                    {member.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                  </div>
                )}
              </div>
              {/* Status dot */}
              <div style={{ position: "absolute", bottom: -2, right: -2, padding: 2, borderRadius: "50%", background: "#050905" }}>
                <PulseDot color={member.accent} />
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
              <h3 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 15, color: "white", lineHeight: 1.2, marginBottom: 4 }}>{member.name}</h3>
              <p style={{ color: member.accent, fontSize: 10, fontFamily: "monospace", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>{member.role}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <PulseDot color={member.accent} />
                <span style={{ color: "#4b5563", fontSize: 8, fontFamily: "monospace", letterSpacing: "0.12em" }}>{member.status}</span>
              </div>
            </div>
          </div>

          {/* Bio / tagline */}
          <AnimatePresence mode="wait">
            {hov ? (
              <motion.p key="bio"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                style={{ color: "#9ca3af", fontSize: 12, lineHeight: 1.7, borderLeft: `2px solid ${member.accent}50`, paddingLeft: 10, margin: 0 }}>
                {member.bio}
              </motion.p>
            ) : (
              <motion.p key="tagline"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ color: "#4b5563", fontSize: 11, fontStyle: "italic", borderLeft: `2px solid ${member.accent}30`, paddingLeft: 10, margin: 0 }}>
                &ldquo;{member.tagline}&rdquo;
              </motion.p>
            )}
          </AnimatePresence>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
            {member.stats.map((s, i) => (
              <div key={i} style={{
                borderRadius: 10, padding: "8px 6px", textAlign: "center",
                border: `1px solid ${hov ? member.borderCol : "rgba(255,255,255,0.05)"}`,
                background: hov ? `${member.accent}0a` : "rgba(255,255,255,0.02)",
                transition: "all 0.4s",
              }}>
                <div style={{ fontFamily: "var(--font-syne)", fontWeight: 900, fontSize: 13, color: member.accent, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: "monospace", fontSize: 7, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Skill tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {member.skills.map((skill, i) => (
              <motion.span key={skill}
                animate={{ opacity: hov ? 1 : 0.4, color: hov ? member.accent : "#6b7280" }}
                transition={{ duration: 0.25, delay: hov ? i * 0.05 : 0 }}
                style={{
                  fontSize: 8, fontFamily: "monospace", letterSpacing: "0.14em", textTransform: "uppercase",
                  padding: "4px 10px", borderRadius: 100,
                  border: `1px solid ${hov ? member.borderCol : "rgba(255,255,255,0.06)"}`,
                  background: hov ? `${member.accent}08` : "transparent",
                  transition: "border-color 0.3s, background 0.3s",
                  cursor: "default",
                }}>
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "auto" }}>
            <span style={{ fontSize: 8, fontFamily: "monospace", color: "#374151", letterSpacing: "0.12em", textTransform: "uppercase" }}>Pixelmint</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Social href={member.socials.instagram} Icon={Instagram} color={member.accent} />
              <Social href={member.socials.linkedin}  Icon={Linkedin}  color={member.accent} />
              <Social href={member.socials.github}    Icon={Github}    color={member.accent} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   JOIN CARD
═══════════════════════════════════════════════════════ */
function JoinCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hov, setHov] = useState(false);
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 20, border: `1px solid ${hov ? "rgba(52,211,153,0.28)" : "rgba(255,255,255,0.06)"}`,
        background: hov ? "rgba(52,211,153,0.04)" : "rgba(5,9,5,0.7)",
        backdropFilter: "blur(16px)",
        boxShadow: hov ? "0 0 60px rgba(52,211,153,0.16)" : "none",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 16, padding: "36px 24px", textAlign: "center", cursor: "pointer",
        transition: "border-color 0.4s, background 0.4s, box-shadow 0.4s",
        overflow: "hidden", position: "relative",
      }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none", opacity: 0.022,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <motion.div animate={{ rotate: hov ? 45 : 0, scale: hov ? 1.1 : 1 }} transition={{ type: "spring", damping: 14 }}
        style={{ width: 48, height: 48, borderRadius: "50%", border: "2px dashed rgba(52,211,153,0.35)", display: "flex", alignItems: "center", justifyContent: "center", color: "#34d399", position: "relative", zIndex: 1 }}>
        <Plus size={20} strokeWidth={1.5} />
      </motion.div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h4 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 16, color: "white", marginBottom: 8 }}>Join the Team</h4>
        <p style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.65, marginBottom: 16 }}>
          We&apos;re looking for exceptional talent who obsess over craft.
        </p>
        <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 100, border: "1px solid rgba(52,211,153,0.3)", color: "#34d399", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.16em", textTransform: "uppercase", background: "rgba(52,211,153,0.06)", textDecoration: "none" }}>
          Apply now <ExternalLink size={10} />
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════ */
export default function Team() {
  const headRef  = useRef<HTMLDivElement>(null);
  const headView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="teammates" style={{ background: "#050905", color: "white", position: "relative", overflow: "hidden" }}>
      <style>{`@keyframes pmTeamMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

      <MarqueeStrip />

      {/* Ambient blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "25%", left: "15%", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(52,211,153,1),transparent 70%)", opacity: 0.035, filter: "blur(120px)" }} />
        <div style={{ position: "absolute", bottom: "25%", right: "15%", width: 500, height: 350, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(34,211,238,1),transparent 70%)", opacity: 0.03, filter: "blur(110px)" }} />
      </div>

      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "96px 40px", position: "relative", zIndex: 1 }}>
        {/* Heading */}
        <div ref={headRef} style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 56, flexWrap: "wrap" }}>
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={headView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ color: "#34d399", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "inline-block", width: 20, height: 1, background: "#34d399" }} />The Talent Nexus
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 22 }} animate={headView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontFamily: "var(--font-syne)", fontWeight: 900, fontSize: "clamp(40px,6vw,72px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
              The team<br />behind{" "}
              <span style={{ color: "#34d399" }}>every</span><br />pixel.
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={headView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.75, maxWidth: 260 }}>
            A small team that believes great software starts with great people. No hierarchy — just craft.
          </motion.p>
        </div>

        {/* ROW 1: Founder (2/3) + Janis (1/3) */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
          <FounderCard member={TEAM[0]} />
          <MemberCard member={TEAM[1]} delay={0.15} />
        </div>

        {/* ROW 2: Ashraf + Ajmal + Join */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          <MemberCard member={TEAM[2]} delay={0.1} />
          <MemberCard member={TEAM[3]} delay={0.2} />
          <JoinCard />
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 56, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap", gap: 16 }}>
          <p style={{ color: "#4b5563", fontStyle: "italic", fontSize: 13 }}>Small team. Large ambition.</p>
          <motion.a href="#contact" whileHover={{ x: 3 }}
            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 9, fontFamily: "monospace", letterSpacing: "0.14em", textTransform: "uppercase", padding: "11px 20px", border: "1px solid rgba(255,255,255,0.08)", color: "white", textDecoration: "none", transition: "border-color 0.3s, color 0.3s" }}>
            We&apos;re hiring <ExternalLink size={11} />
          </motion.a>
        </div>
      </div>

      <MarqueeStrip reverse />
    </section>
  );
}
