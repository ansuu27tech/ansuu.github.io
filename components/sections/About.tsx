"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import SectionWrapper from "../ui/SectionWrapper";
import PixelTransition from "../ui/PixelTransition";

import { FaPalette } from "react-icons/fa";
import { Brain, Code2, Palette, TrendingUp } from "lucide-react";

/* ── Capability Groups — no percentages, just clean lists ── */
const CAPABILITIES = [
    {
        icon: Brain,
        title: "AI & Data Science",
        accent: "#98ff98",
        skills: ["Python", "Machine Learning", "Data Analysis", "AI Automation", "NLP"],
    },
    {
        icon: Code2,
        title: "Engineering",
        accent: "#98ff98",
        skills: ["React / Next.js", "TypeScript", "HTML / CSS", "Framer Motion", "Three.js"],
    },
    {
        icon: Palette,
        title: "Creative",
        accent: "#98ff98",
        skills: ["UI/UX Design", "Branding", "Graphic Design", "Motion Design", "Figma"],
    },
    {
        icon: TrendingUp,
        title: "Strategy",
        accent: "#98ff98",
        skills: ["Digital Marketing", "Social Media", "Content Strategy", "Analytics", "Growth"],
    },
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <SectionWrapper id="about" className="overflow-hidden bg-[#050505]">

            {/* ── Section Label ── */}
            <motion.div
                className="label-section mb-12"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="label-number">01</span>
                <span>/</span>
                <span>ABOUT</span>
            </motion.div>

            {/* ── Top: Bio (2-col) ── */}
            <div ref={containerRef} className="relative z-10 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 lg:items-center">
                {/* Left: Image */}
                <div className="flex flex-col gap-8 w-full">
                    <motion.div
                        className="relative aspect-square sm:aspect-[4/5] w-full"
                        initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                        animate={isInView ? { opacity: 1, clipPath: "inset(0 0 0 0)" } : {}}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="absolute inset-0 bg-brand-mint/15 -translate-x-3 translate-y-3 rounded-xl" />
                        <PixelTransition
                            firstContent={
                                <Image
                                    src="/mohammed anas founder.jpeg"
                                    alt="N.MOHAMMED ANAS — AI Student, Creative Developer, Founder of PixelMint Studio MVS"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover object-top rounded-xl"
                                />
                            }
                            secondContent={
                                <div className="w-full h-full bg-[#050505] flex flex-col items-center justify-center rounded-xl border border-white/10 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-brand-mint/10 opacity-100 blur-3xl rounded-full scale-150 transition-all duration-700" />
                                    <div className="relative z-10 flex flex-col items-center gap-3">
                                        <div className="p-4 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(152,255,152,0.2)]">
                                            <FaPalette className="text-3xl text-brand-mint" />
                                        </div>
                                        <span className="text-2xl sm:text-3xl font-heading font-bold text-brand-mint tracking-wider text-center px-4">
                                            Cooking Pixels
                                        </span>
                                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 mt-1">Design & Code</span>
                                    </div>
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />
                                </div>
                            }
                            gridSize={12}
                            pixelColor="#ffffff"
                            animationStepDuration={0.4}
                            className="absolute inset-0 rounded-xl"
                        />
                    </motion.div>

                    {/* Quick metadata — replaces radial stat circles */}
                    <motion.div
                        className="grid grid-cols-3 gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {[
                            { value: "B.Tech", label: "AI & Data Science" },
                            { value: "2+", label: "Years Active" },
                            { value: "15+", label: "Projects Delivered" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center justify-center text-center py-4 rounded-xl border border-white/[0.06] bg-white/[0.02] h-full">
                                <span className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: "var(--font-orbitron)" }}>{item.value}</span>
                                <span className="text-[9px] md:text-[10px] text-white/40 tracking-wider uppercase mt-1 px-1">{item.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right: Text + Capabilities */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Large editorial tagline */}
                        <h2 className="heading-editorial text-3xl md:text-4xl lg:text-[2.8rem] mb-8 leading-tight">
                            Blending <span className="text-brand-mint">AI thinking</span> with clean design to build ideas that stand out.
                        </h2>

                        <div className="space-y-5 mb-12">
                            <p className="body-lead text-white/80">
                                Hi, I am <span className="text-white font-medium">N.MOHAMMED ANAS</span>, a B.Tech Artificial Intelligence &amp; Data Science student with a passion for building meaningful digital products.
                                My approach combines logical problem-solving with creative design to engineer solutions that are both functional and visually compelling.
                            </p>
                            <p className="body-refined text-white/60">
                                With a strong focus on frontend development, automation, and creative tech, I bridge the gap between complex algorithms and intuitive user experiences.
                                As the founder of <span className="text-brand-mint/90 font-medium">PixelMint Studio MVS</span>, I lead a team delivering premium digital experiences for clients worldwide.
                            </p>
                        </div>

                        {/* ── Capabilities Grid — no percentages ── */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <h3 className="text-lg font-bold text-white shrink-0 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
                                    Capabilities
                                </h3>
                                <div className="h-px flex-1 bg-white/[0.06]" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {CAPABILITIES.map((cap, i) => (
                                    <CapabilityCard key={cap.title} capability={cap} index={i} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}

/* ── Capability Card — clean, no percentage bars ── */
const CapabilityCard = ({ capability, index }: { capability: typeof CAPABILITIES[0]; index: number }) => {
    const Icon = capability.icon;
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
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative rounded-xl p-5 flex flex-col gap-4 overflow-hidden group hover:border-brand-mint/20 transition-colors duration-500"
            style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            {/* Mouse spotlight */}
            <div className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
                style={{
                    opacity: spot.visible ? 1 : 0,
                    background: `radial-gradient(180px circle at ${spot.x}px ${spot.y}px, rgba(152,255,152,0.08) 0%, transparent 70%)`,
                }}
            />

            {/* Header */}
            <div className="relative z-10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand-mint/10 border border-brand-mint/20 flex items-center justify-center group-hover:bg-brand-mint/15 transition-colors duration-300">
                    <Icon size={16} className="text-brand-mint" strokeWidth={1.8} />
                </div>
                <h4 className="text-white text-sm font-bold tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
                    {capability.title}
                </h4>
            </div>

            {/* Skills — clean horizontal flow */}
            <div className="relative z-10 flex flex-wrap gap-1.5">
                {capability.skills.map((skill) => (
                    <span
                        key={skill}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-white/50 border border-white/[0.06] group-hover:text-white/70 group-hover:border-white/10 transition-colors duration-300"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-brand-mint/40 via-brand-mint/20 to-transparent transition-all duration-700 ease-out" />
        </motion.div>
    );
};
