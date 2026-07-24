"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import SectionWrapper from "../ui/SectionWrapper";

import { SiPython, SiHtml5, SiCss, SiJavascript, SiReact, SiFigma } from "react-icons/si";
import { FaBrain, FaRobot, FaPalette, FaLayerGroup, FaVideo, FaInstagram, FaProjectDiagram, FaTools, FaCrown, FaInfinity } from "react-icons/fa";
import { Brain, Code2, Palette } from "lucide-react";

const radialStats = [
    { num: "10+", label: "Projects Built", icon: FaProjectDiagram, percent: 90 },
    { num: "5+", label: "Core Skills", icon: FaTools, percent: 85 },
    { num: "1", label: "MindStacked", icon: FaCrown, percent: 100 },
    { num: "∞", label: "Learning Mindset", icon: FaInfinity, percent: 95 },
];

const DOMAINS = [
  {
    id: "ai", icon: Brain, label: "AI & Data Science", tag: "Logic Core",
    accent: "#34d399", accentTo: "#22d3ee",
    glow: "rgba(52,211,153,0.16)", borderGlow: "rgba(52,211,153,0.6)",
    skills: [
      { name: "Python",           pct: 85 },
      { name: "Machine Learning", pct: 75 },
      { name: "AI & Automation",  pct: 80 },
      { name: "Data Analysis",    pct: 78 },
    ],
  },
  {
    id: "frontend", icon: Code2, label: "Frontend Engineering", tag: "Architecture",
    accent: "#22d3ee", accentTo: "#818cf8",
    glow: "rgba(34,211,238,0.14)", borderGlow: "rgba(34,211,238,0.6)",
    skills: [
      { name: "HTML / CSS",    pct: 92 },
      { name: "JavaScript",    pct: 78 },
      { name: "React / Next",  pct: 82 },
      { name: "Framer Motion", pct: 75 },
    ],
  },
  {
    id: "creative", icon: Palette, label: "Creative Strategy", tag: "Brand & Vision",
    accent: "#a78bfa", accentTo: "#f472b6",
    glow: "rgba(167,139,250,0.14)", borderGlow: "rgba(167,139,250,0.6)",
    skills: [
      { name: "UI / UX Design", pct: 88 },
      { name: "Branding",       pct: 85 },
      { name: "Graphic Design", pct: 82 },
      { name: "Social Media",   pct: 80 },
    ],
  },
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <SectionWrapper id="about" className="overflow-hidden bg-[#050505]">
            {/* Background Typography */}
            <div className="absolute top-20 left-0 w-full overflow-hidden opacity-5 select-none pointer-events-none z-0">
                <div className="whitespace-nowrap about-bg-text" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                    <span className="text-[20vw] font-bold font-heading leading-none">
                        ANAS PIXELMINT ANAS PIXELMINT
                    </span>
                </div>
            </div>

            {/* ── Top: Bio (2-col) ── */}
            <div ref={containerRef} className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-start lg:mt-8">
                {/* Left: Image & Stats */}
                <div className="flex flex-col gap-10 w-full max-w-md mx-auto">
                    <motion.div
                        className="relative aspect-[3/4] w-full"
                        initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                        animate={isInView ? { opacity: 1, clipPath: "inset(0 0 0 0)" } : {}}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="absolute inset-0 bg-brand-mint/20 -translate-x-4 translate-y-4 rounded-xl" />
                        <Image
                            src="/mohammed anas founder.jpeg"
                            alt="Anas - Pixelmint Studio"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover rounded-xl filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>

                    {/* Radial Stats */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-5">
                        {radialStats.map((stat, idx) => (
                            <RadialStat key={idx} {...stat} delay={0.2 + idx * 0.1} />
                        ))}
                    </div>
                </div>

                {/* Right: Text + Skills */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                            About <span className="text-brand-mint">Me.</span>
                        </h2>
                        <p className="text-xl font-medium text-white mb-6">
                            &quot;Blending AI thinking with clean design to build ideas that stand out.&quot;
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            I am a B.Tech Artificial Intelligence &amp; Data Science student with a passion for building meaningful digital products.
                            My approach combines logical problem-solving with creative design to engineer solutions that are both functional and visually compelling.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed mb-10">
                            With a strong focus on frontend development, automation, and creative tech, I bridge the gap between complex algorithms and intuitive user experiences.
                        </p>

                        {/* ── Skills & Expertise Bento Grid — inside About Me ── */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <h3 className="text-2xl font-bold text-white shrink-0" style={{ fontFamily: "var(--font-syne)" }}>
                                    Skills &amp;{" "}
                                    <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#34d399,#22d3ee,#a78bfa)" }}>
                                        Expertise
                                    </span>
                                </h3>
                                <div className="h-px flex-1 bg-white/8" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {DOMAINS.map((domain, i) => (
                                    <BentoCard key={domain.id} domain={domain} index={i} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}

// ── Bento Skill Bar ────────────────────────────────────────────────────────
interface BentoSkillBarProps { name: string; pct: number; accent: string; accentTo: string; delay: number; }
const BentoSkillBar = ({ name, pct, accent, accentTo, delay }: BentoSkillBarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-30px" });
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
                >{pct}%</motion.span>
            </div>
            <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg,${accent},${accentTo})`, boxShadow: `0 0 8px ${accent}80` }}
                    initial={{ width: "0%" }}
                    animate={inView ? { width: `${pct}%` } : {}}
                    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
        </div>
    );
};

// ── Bento Domain Card ──────────────────────────────────────────────────────
const BentoCard = ({ domain, index }: { domain: typeof DOMAINS[0]; index: number }) => {
    const Icon = domain.icon;
    const cardRef = useRef<HTMLDivElement>(null);
    const [spot, setSpot] = useState({ x: 0, y: 0, visible: false });
    const inView = useInView(cardRef, { once: true, margin: "-40px" });

    const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (!r) return;
        setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true });
    }, []);
    const onLeave = useCallback(() => setSpot(s => ({ ...s, visible: false })), []);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative rounded-2xl p-7 flex flex-col gap-6 overflow-hidden group"
            style={{
                background: "rgba(6,10,6,0.75)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.07)",
            }}
        >
            {/* Mouse spotlight */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                style={{
                    opacity: spot.visible ? 1 : 0,
                    background: `radial-gradient(220px circle at ${spot.x}px ${spot.y}px, ${domain.borderGlow} 0%, transparent 70%)`,
                }}
            />
            {/* Ambient inner glow */}
            <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 0 40px ${domain.glow}` }} />
            {/* Subtle grid pattern */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.025]"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />

            {/* Header */}
            <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-mono tracking-[0.25em] uppercase px-2.5 py-0.5 rounded-full border self-start"
                        style={{ color: domain.accent, borderColor: `${domain.accent}30`, background: `${domain.accent}10` }}>
                        {domain.tag}
                    </span>
                    <h4 className="text-white text-[17px] font-bold leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                        {domain.label}
                    </h4>
                </div>
                <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border"
                    style={{ background: `${domain.accent}12`, borderColor: `${domain.accent}28`, boxShadow: `0 0 16px ${domain.accent}22` }}>
                    <Icon size={20} style={{ color: domain.accent }} strokeWidth={1.8} />
                </div>
            </div>

            {/* Accent divider */}
            <div className="relative z-10 h-px w-full"
                style={{ background: `linear-gradient(90deg,${domain.accent}40,transparent)` }} />

            {/* Skill bars */}
            <div className="relative z-10 flex flex-col gap-4">
                {domain.skills.map((s, i) => (
                    <BentoSkillBar
                        key={s.name} name={s.name} pct={s.pct}
                        accent={domain.accent} accentTo={domain.accentTo}
                        delay={index * 0.13 + i * 0.11}
                    />
                ))}
            </div>

            {/* Bottom shimmer sweep */}
            <motion.div className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] rounded-full"
                style={{ background: `linear-gradient(90deg,transparent,${domain.accent},${domain.accentTo},transparent)` }}
                initial={{ width: "0%", left: "0%" }}
                animate={inView ? { width: ["0%","100%","0%"], left: ["0%","0%","100%"] } : {}}
                transition={{ duration: 2.4, delay: index * 0.15 + 0.3, ease: "easeInOut" }}
            />
        </motion.div>
    );
};

// ── Legacy SkillCard (kept but unused) ────────────────────────────────────
interface IconProps { className?: string; }
const SkillCard = ({ label, percentage, icon: Icon, delay }: { label: string; percentage: number; icon: React.ComponentType<IconProps>; delay: number }) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className="flex items-center justify-between p-3 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl border-l-2 border-l-cyan-400 group hover:bg-white/10 transition-all duration-300 shadow-xl shadow-black/20"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-cyan-400/30 transition-colors">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <span className="font-semibold text-gray-200 group-hover:text-white transition-colors text-sm">{label}</span>
            </div>
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-black/50 rounded-full border border-white/5" />
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="20" cy="20" r={radius} fill="none" stroke="transparent" />
                    <motion.circle
                        cx="20" cy="20" r={radius} fill="none"
                        stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round"
                        className="drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
                        style={{ strokeDasharray: circumference }}
                    />
                </svg>
                <span className="relative z-10 text-[0.65rem] font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                    {percentage}
                </span>
            </div>
        </motion.div>
    );
};

const RadialStat = ({ num, label, icon: Icon, percent, delay }: { num: string; label: string; icon: React.ComponentType<IconProps>; percent: number; delay: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const radius = 46;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = isInView ? circumference - (percent / 100) * circumference : circumference;
    const gradId = `grad-${num.replace('+', '')}-${label.replace(/\s+/g,'')}`;

    return (
        <div ref={ref} className="group relative flex flex-col items-center justify-center p-2 transition-all duration-500 hover:scale-[1.05]">
            <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="56" cy="56" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                </svg>
                <motion.svg
                    className="absolute inset-0 w-full h-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                    <defs>
                        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                    <motion.circle
                        cx="56" cy="56" r={radius} fill="none"
                        stroke={`url(#${gradId})`} strokeWidth="4" strokeLinecap="round"
                        className="drop-shadow-[0_0_12px_rgba(34,197,94,0.4)] opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_20px_rgba(34,197,94,0.7)] transition-all duration-300"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
                        style={{ strokeDasharray: circumference, transformOrigin: '56px 56px', rotate: '-90deg' }}
                    />
                </motion.svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors duration-300 mb-0.5" />
                    <span className="text-3xl font-black text-white drop-shadow-md">{num}</span>
                </div>
            </div>
            <span className="text-xs tracking-widest text-[#a1a1aa] font-bold uppercase text-center group-hover:text-white transition-colors duration-300">
                {label}
            </span>
        </div>
    );
};
