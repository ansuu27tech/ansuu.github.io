"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Code2, Palette } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const DOMAINS = [
  {
    id: "ai",
    icon: Brain,
    label: "AI & Data Science",
    tag: "Logic Core",
    accent: "#34d399",
    accentTo: "#22d3ee",
    glow: "rgba(52,211,153,0.18)",
    borderGlow: "rgba(52,211,153,0.55)",
    skills: [
      { name: "Python",          pct: 85 },
      { name: "Machine Learning",pct: 75 },
      { name: "AI & Automation", pct: 80 },
      { name: "Data Analysis",   pct: 78 },
    ],
  },
  {
    id: "frontend",
    icon: Code2,
    label: "Frontend Engineering",
    tag: "Architecture",
    accent: "#22d3ee",
    accentTo: "#818cf8",
    glow: "rgba(34,211,238,0.16)",
    borderGlow: "rgba(34,211,238,0.55)",
    skills: [
      { name: "HTML / CSS",  pct: 92 },
      { name: "JavaScript",  pct: 78 },
      { name: "React / Next",pct: 82 },
      { name: "Framer Motion",pct:75 },
    ],
  },
  {
    id: "creative",
    icon: Palette,
    label: "Creative Strategy",
    tag: "Brand & Vision",
    accent: "#a78bfa",
    accentTo: "#f472b6",
    glow: "rgba(167,139,250,0.16)",
    borderGlow: "rgba(167,139,250,0.55)",
    skills: [
      { name: "UI / UX Design", pct: 88 },
      { name: "Branding",       pct: 85 },
      { name: "Graphic Design", pct: 82 },
      { name: "Social Media",   pct: 80 },
    ],
  },
];

// ── Skill Bar ─────────────────────────────────────────────────────────────────
function SkillBar({
  name, pct, accent, accentTo, delay,
}: {
  name: string; pct: number; accent: string; accentTo: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300 font-medium">{name}</span>
        <motion.span
          className="text-xs font-mono"
          style={{ color: accent }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.4 }}
        >
          {pct}%
        </motion.span>
      </div>
      {/* Track */}
      <div className="h-[3px] w-full rounded-full bg-white/6 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accentTo})`,
            boxShadow: `0 0 8px ${accent}80`,
          }}
          initial={{ width: "0%" }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ── Domain Card ───────────────────────────────────────────────────────────────
function DomainCard({
  domain, index,
}: {
  domain: typeof DOMAINS[0]; index: number;
}) {
  const Icon = domain.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpot(s => ({ ...s, visible: false }));
  }, []);

  const cardInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl p-7 flex flex-col gap-6 overflow-hidden group"
      style={{
        background: "rgba(8,12,8,0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Mouse spotlight on border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: `radial-gradient(220px circle at ${spot.x}px ${spot.y}px, ${domain.borderGlow} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 40px ${domain.glow}` }}
      />

      {/* Background grid lines */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase px-2.5 py-1 rounded-full border self-start"
            style={{
              color: domain.accent,
              borderColor: `${domain.accent}30`,
              background: `${domain.accent}10`,
            }}
          >
            {domain.tag}
          </span>
          <h3
            className="text-white text-lg font-bold leading-tight mt-1"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {domain.label}
          </h3>
        </div>

        {/* Icon box */}
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border"
          style={{
            background: `${domain.accent}14`,
            borderColor: `${domain.accent}28`,
            boxShadow: `0 0 16px ${domain.accent}28`,
          }}
        >
          <Icon size={20} style={{ color: domain.accent }} strokeWidth={1.8} />
        </div>
      </div>

      {/* Divider */}
      <div
        className="relative z-10 h-px w-full"
        style={{ background: `linear-gradient(90deg, ${domain.accent}30, transparent)` }}
      />

      {/* Skill bars */}
      <div className="relative z-10 flex flex-col gap-4">
        {domain.skills.map((s, i) => (
          <SkillBar
            key={s.name}
            name={s.name}
            pct={s.pct}
            accent={domain.accent}
            accentTo={domain.accentTo}
            delay={index * 0.15 + i * 0.12}
          />
        ))}
      </div>

      {/* Bottom shimmer sweep */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${domain.accent}, ${domain.accentTo}, transparent)` }}
        initial={{ width: "0%", left: "0%" }}
        animate={cardInView ? { width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] } : {}}
        transition={{ duration: 2.5, delay: index * 0.2 + 0.4, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Skills() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 px-4 md:px-8 overflow-hidden">
      {/* Section ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: "radial-gradient(ellipse, #34d399 0%, #22d3ee 40%, #a78bfa 100%)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-emerald-400 text-[11px] font-mono tracking-[0.3em] uppercase mb-3"
          >
            Capabilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Skills &{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg,#34d399,#22d3ee,#a78bfa)" }}
            >
              Expertise
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-gray-500 text-sm mt-4 max-w-md mx-auto leading-relaxed"
          >
            Three disciplines. One hybrid mindset. Where AI logic, clean code, and visual strategy converge.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DOMAINS.map((d, i) => (
            <DomainCard key={d.id} domain={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
