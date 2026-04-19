"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════ */
const C = {
    bg:         "#0a0a0a",
    surface:    "#111111",
    surface2:   "#161616",
    border:     "#222222",
    text:       "#ffffff",
    muted:      "#888888",
    muted2:     "#555555",
    accent:     "#a8ff3e",
    accentDim:  "rgba(168,255,62,0.12)",
    accentDim2: "rgba(168,255,62,0.06)",
} as const;

const FONT = {
    syne:  "var(--font-syne), 'Syne', sans-serif",
    mono:  "var(--font-space-mono), 'Space Mono', monospace",
    inter: "var(--font-inter), 'Inter', sans-serif",
} as const;

/* ═══════════════════════════════════════════════════════════════
   TEAM DATA
   ═══════════════════════════════════════════════════════════════ */
interface TeamMember {
    index: string;
    firstName: string;
    lastName: string;
    role: string;
    isFounder: boolean;
    tagline?: string;
    bio: string;
    stats: { num: string; label: string }[];
    skills: string[];
    image: string | null;
    socials: { label: string; href: string }[];
    quote: string;
}

const TEAM: TeamMember[] = [
    {
        index: "01",
        firstName: "Mohammed",
        lastName: "Anas N",
        role: "Founder & CEO",
        isFounder: true,
        tagline: "Build things that make people stop scrolling.",
        bio: "Design-obsessed engineer who turns abstract ideas into scalable digital experiences. Leading the pixel-perfect vision at PixelMint Studio.",
        stats: [
            { num: "50+", label: "Projects" },
            { num: "3yr", label: "Experience" },
            { num: "∞", label: "Ambition" },
        ],
        skills: ["React", "Next.js", "UI/UX", "Node.js", "Branding"],
        image: "/mohammed anas.jpeg",
        socials: [
            { label: "Instagram", href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "GitHub", href: "#" },
        ],
        quote: "Build things that make people stop scrolling.",
    },
    {
        index: "02",
        firstName: "Mohammed",
        lastName: "Janis P",
        role: "Co-founder & Lead Designer",
        isFounder: false,
        bio: "Turns wireframes into visual poetry. Believes every pixel should earn its place on the screen.",
        stats: [
            { num: "100+", label: "Designs" },
            { num: "2yr", label: "Experience" },
            { num: "∞", label: "Pixels" },
        ],
        skills: ["Figma", "UI Design", "Branding", "Motion"],
        image: "/janis.jpeg",
        socials: [
            { label: "Instagram", href: "#" },
            { label: "LinkedIn", href: "#" },
        ],
        quote: "Good design is obvious. Great design is transparent.",
    },
    {
        index: "03",
        firstName: "Ashraf",
        lastName: "Bari",
        role: "Backend Architect",
        isFounder: false,
        bio: "Quietly builds the infrastructure nobody sees but everyone depends on. Loves clean schemas and cold coffee.",
        stats: [
            { num: "30+", label: "APIs" },
            { num: "2yr", label: "Experience" },
            { num: "99.9%", label: "Uptime" },
        ],
        skills: ["Node.js", "MongoDB", "PostgreSQL", "AWS"],
        image: null,
        socials: [
            { label: "LinkedIn", href: "#" },
            { label: "GitHub", href: "#" },
        ],
        quote: "If the backend is elegant, everything else follows.",
    },
    {
        index: "04",
        firstName: "Ajmal",
        lastName: "Basheer",
        role: "Full Stack Engineer",
        isFounder: false,
        bio: "Bridges the gap between interface and engine. Happiest when shipping features at 2 AM with lo-fi on.",
        stats: [
            { num: "40+", label: "Features" },
            { num: "2yr", label: "Experience" },
            { num: "24/7", label: "Shipping" },
        ],
        skills: ["React", "Node.js", "TypeScript", "Firebase"],
        image: null,
        socials: [
            { label: "LinkedIn", href: "#" },
            { label: "GitHub", href: "#" },
        ],
        quote: "Ship fast, learn faster, refactor later.",
    },
];

const MARQUEE_ITEMS = [
    "designed to inspire",
    "built to scale",
    "obsessed with craft",
    "precision over volume",
    "form meets function",
    "pixel perfect",
];

/* ═══════════════════════════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
function SkillTag({ label }: { label: string }) {
    return (
        <span
            style={{
                fontFamily: FONT.mono,
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "5px 11px",
                border: `1px solid ${C.border}`,
                color: C.muted,
                background: "transparent",
                display: "inline-block",
            }}
        >
            {label}
        </span>
    );
}

function SocialButton({ label, href }: { label: string; href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                fontFamily: FONT.mono,
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: C.text,
                background: C.surface2,
                border: `1px solid ${C.border}`,
                padding: "9px 16px",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                WebkitTapHighlightColor: "transparent",
            }}
        >
            {label} <span style={{ fontSize: 10 }}>↗</span>
        </a>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE STRIP
   ═══════════════════════════════════════════════════════════════ */
function MarqueeStrip({ reverse = false }: { reverse?: boolean }) {
    const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
    return (
        <div style={{ overflow: "hidden", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "10px 0", background: C.bg }}>
            <div style={{ display: "inline-flex", whiteSpace: "nowrap", animation: `marquee-team 28s linear infinite${reverse ? " reverse" : ""}`, willChange: "transform" }}>
                {doubled.map((item, i) => (
                    <div key={i} style={{ fontFamily: FONT.mono, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: C.muted, padding: "0 24px", display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ width: 3, height: 3, borderRadius: "50%", background: C.accent, flexShrink: 0, display: "block" }} />
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION HEADER — responsive
   ═══════════════════════════════════════════════════════════════ */
function SectionHeader({ isMobile }: { isMobile: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const shouldReduce = useReducedMotion();

    return (
        <motion.div
            ref={ref}
            initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            style={{
                maxWidth: 1280,
                margin: "0 auto",
                padding: isMobile ? "48px 20px 0" : "80px 60px 0",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "flex-end",
                justifyContent: "space-between",
                gap: isMobile ? 16 : 40,
            }}
        >
            <div>
                <div style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: C.accent, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "block", width: 20, height: 1, background: C.accent }} />
                    The Team
                </div>
                <h2 style={{ fontFamily: FONT.syne, fontSize: isMobile ? "clamp(36px, 11vw, 56px)" : "clamp(48px, 6vw, 84px)", fontWeight: 800, lineHeight: 0.93, letterSpacing: "-0.03em" }}>
                    The team<br />
                    behind <span style={{ color: C.accent }}>every</span><br />
                    pixel.
                </h2>
            </div>
            {!isMobile && (
                <div style={{ paddingBottom: 6 }}>
                    <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.75, color: C.muted, maxWidth: 280 }}>
                        We&apos;re a small team that believes great software starts with great people. No hierarchy, no ego — just craft.
                    </p>
                </div>
            )}
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   SIDE DOTS — desktop only
   ═══════════════════════════════════════════════════════════════ */
function SideDots({ activeIndex, count, visible, onDotClick }: { activeIndex: number; count: number; visible: boolean; onDotClick: (i: number) => void }) {
    return (
        <div style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 10, zIndex: 99, opacity: visible ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: visible ? "auto" : "none" }}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} onClick={() => onDotClick(i)} style={{ width: 5, height: activeIndex === i ? 20 : 5, borderRadius: activeIndex === i ? 3 : "50%", background: activeIndex === i ? C.accent : C.muted2, cursor: "pointer", transition: "background 0.3s, height 0.3s, border-radius 0.3s" }} />
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   STATS ROW
   ═══════════════════════════════════════════════════════════════ */
function StatsRow({ stats, isActive, delay, reduced }: { stats: TeamMember["stats"]; isActive: boolean; delay: number; reduced: boolean }) {
    return (
        <motion.div
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 10 })}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay }}
            style={{ display: "flex", marginBottom: 16, border: `1px solid ${C.border}` }}
        >
            {stats.map((stat, i) => (
                <div key={i} style={{ flex: 1, padding: "10px 8px", borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : "none", textAlign: "center" }}>
                    <span style={{ fontFamily: FONT.syne, fontSize: 18, fontWeight: 800, color: C.accent, lineHeight: 1, display: "block", marginBottom: 3 }}>{stat.num}</span>
                    <span style={{ fontFamily: FONT.mono, fontSize: 7, letterSpacing: "0.16em", textTransform: "uppercase", color: C.muted2 }}>{stat.label}</span>
                </div>
            ))}
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   META ROW
   ═══════════════════════════════════════════════════════════════ */
function MetaRow({ index, isActive, delay, reduced }: { index: string; isActive: boolean; delay: number; reduced: boolean }) {
    return (
        <motion.div
            initial={reduced ? {} : { opacity: 0, x: -14 }}
            animate={isActive ? { opacity: 1, x: 0 } : (reduced ? {} : { opacity: 0, x: -14 })}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}
        >
            <span style={{ fontFamily: FONT.mono, fontSize: 10, color: C.accent, letterSpacing: "0.14em" }}>{index}</span>
            <span style={{ flex: 1, height: 1, background: C.border }} />
            <span style={{ fontFamily: FONT.mono, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted2, border: `1px solid ${C.border}`, padding: "3px 8px" }}>Pixelmint</span>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE CARD — vertical stack (image top / content bottom)
   ═══════════════════════════════════════════════════════════════ */
function MobileCard({ member }: { member: TeamMember }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.15 });
    const reduced = useReducedMotion() ?? false;

    const anim = (delay: number) => ({
        initial: reduced ? {} : { opacity: 0, y: 20 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as [number,number,number,number], delay },
    });

    return (
        <div
            ref={ref}
            style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                marginBottom: 2,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Founder top bar */}
            {member.isFounder && (
                <div style={{ height: 3, background: C.accent, width: "100%" }} />
            )}

            {/* Image */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: C.surface2 }}>
                {member.image ? (
                    <Image src={member.image} alt={member.firstName} fill className="object-cover object-top" sizes="100vw" priority={member.isFounder} />
                ) : (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.syne, fontSize: 80, fontWeight: 800, color: "rgba(168,255,62,0.07)" }}>
                        {member.firstName[0]}{member.lastName[0]}
                    </div>
                )}

                {/* Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,17,17,0.85) 0%, transparent 50%)" }} />

                {/* Founder/index badge */}
                <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 6 }}>
                    {member.isFounder ? (
                        <div style={{ background: C.accent, color: C.bg, fontFamily: FONT.mono, fontSize: 8, letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 700, padding: "5px 10px", display: "inline-flex", alignItems: "center", gap: 5 }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.bg, animation: "teamPulse 1.5s ease-in-out infinite", display: "block" }} />
                            Founder
                        </div>
                    ) : (
                        <div style={{ fontFamily: FONT.mono, fontSize: 9, color: C.accent, background: "rgba(10,10,10,0.6)", backdropFilter: "blur(6px)", padding: "4px 8px", border: `1px solid ${C.border}` }}>
                            {member.index}
                        </div>
                    )}
                </div>

                {/* Quote at bottom of image */}
                <div style={{ position: "absolute", bottom: 14, left: 14, right: 14 }}>
                    <p style={{ fontFamily: FONT.syne, fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: "rgba(255,255,255,0.85)", fontStyle: "italic" }}>
                        &ldquo;{member.quote}&rdquo;
                    </p>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: "20px 18px 22px" }}>
                <motion.h3 {...anim(0.05)} style={{ fontFamily: FONT.syne, fontSize: "clamp(28px, 8vw, 38px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 6 }}>
                    {member.firstName} <span style={{ color: C.accent }}>{member.lastName}</span>
                </motion.h3>

                <motion.p {...anim(0.1)} style={{ fontFamily: FONT.mono, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: C.muted, marginBottom: 14 }}>
                    {member.role}
                </motion.p>

                {member.tagline && (
                    <motion.div {...anim(0.13)} style={{ fontFamily: FONT.syne, fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: C.text, marginBottom: 14, paddingLeft: 10, borderLeft: `2px solid ${C.accent}` }}>
                        {member.tagline}
                    </motion.div>
                )}

                {/* Stats */}
                <motion.div {...anim(0.16)} style={{ display: "flex", border: `1px solid ${C.border}`, marginBottom: 14 }}>
                    {member.stats.map((stat, i) => (
                        <div key={i} style={{ flex: 1, padding: "8px 4px", borderRight: i < member.stats.length - 1 ? `1px solid ${C.border}` : "none", textAlign: "center" }}>
                            <span style={{ fontFamily: FONT.syne, fontSize: 16, fontWeight: 800, color: C.accent, display: "block" }}>{stat.num}</span>
                            <span style={{ fontFamily: FONT.mono, fontSize: 7, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted2 }}>{stat.label}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.p {...anim(0.19)} style={{ fontSize: 12.5, fontWeight: 300, lineHeight: 1.75, color: C.muted, marginBottom: 14 }}>
                    {member.bio}
                </motion.p>

                {/* Skills */}
                <motion.div {...anim(0.22)} style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                    {member.skills.map((s) => <SkillTag key={s} label={s} />)}
                </motion.div>

                {/* Socials */}
                <motion.div {...anim(0.25)} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {member.socials.map((s) => <SocialButton key={s.label} {...s} />)}
                </motion.div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   FOUNDER CARD — desktop 52/48 split
   ═══════════════════════════════════════════════════════════════ */
function FounderCard({ member, isActive, reduced }: { member: TeamMember; isActive: boolean; reduced: boolean }) {
    const active = reduced ? true : isActive;
    return (
        <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "52% 48%", position: "relative", background: C.bg }}>
            {/* LEFT — portrait */}
            <div style={{ position: "relative", overflow: "hidden", background: C.surface }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.accent, transform: active ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s", zIndex: 3 }} />
                <div style={{ width: "100%", height: "100%", position: "relative", transition: "transform 1.2s cubic-bezier(0.23,1,0.32,1), filter 0.7s ease", transform: active ? "scale(1)" : "scale(1.04)", filter: active ? "grayscale(0%) brightness(0.9)" : "grayscale(10%) brightness(0.8)", willChange: "transform" }}>
                    {member.image ? (
                        <Image src={member.image} alt={member.firstName} fill className="object-cover object-[center_top]" priority sizes="52vw" />
                    ) : (
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.syne, fontSize: 120, fontWeight: 800, color: "rgba(168,255,62,0.06)" }}>MN</div>
                    )}
                </div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 55%, rgba(10,10,10,0.9) 100%), linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 40%)", zIndex: 1 }} />

                {/* Founder badge */}
                <motion.div
                    initial={reduced ? {} : { opacity: 0, y: -8 }}
                    animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: -8 })}
                    transition={{ duration: 0.4, delay: 0.35 }}
                    style={{ position: "absolute", top: 24, left: 28, zIndex: 4 }}
                >
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: C.accent, color: C.bg, fontFamily: FONT.mono, fontSize: 9, letterSpacing: "0.26em", textTransform: "uppercase", fontWeight: 700, padding: "6px 13px" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.bg, animation: "teamPulse 1.5s ease-in-out infinite", display: "block" }} />
                        Founder
                    </div>
                </motion.div>

                {/* Quote */}
                <motion.div
                    initial={reduced ? {} : { opacity: 0, y: 10 }}
                    animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 10 })}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    style={{ position: "absolute", bottom: 28, left: 28, right: 28, zIndex: 3 }}
                >
                    <span style={{ color: C.accent, fontSize: 18, display: "block", marginBottom: 3, fontFamily: FONT.syne }}>&ldquo;</span>
                    <p style={{ fontFamily: FONT.syne, fontSize: 13, fontWeight: 500, lineHeight: 1.45, color: "rgba(255,255,255,0.85)" }}>{member.quote}</p>
                </motion.div>

                <div style={{ position: "absolute", bottom: 20, right: 20, fontFamily: FONT.syne, fontWeight: 800, fontSize: 90, lineHeight: 1, color: "rgba(255,255,255,0.035)", userSelect: "none", zIndex: 2, letterSpacing: "-0.04em" }}>{member.index}</div>
            </div>

            {/* RIGHT — info */}
            <div style={{ background: C.surface, borderLeft: `1px solid ${C.border}`, display: "flex", flexDirection: "column", justifyContent: "center", padding: "44px 48px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -50, right: -50, width: 240, height: 240, background: `radial-gradient(circle, ${C.accentDim} 0%, transparent 70%)`, pointerEvents: "none", opacity: active ? 1 : 0, transition: "opacity 0.8s ease 0.2s", borderRadius: "50%" }} />
                <div style={{ position: "absolute", bottom: -20, right: -8, fontFamily: FONT.syne, fontWeight: 800, fontSize: 100, lineHeight: 1, color: "rgba(255,255,255,0.025)", userSelect: "none", pointerEvents: "none", letterSpacing: "-0.04em", whiteSpace: "nowrap" }}>{member.firstName}</div>
                <MetaRow index={member.index} isActive={active} delay={0.08} reduced={reduced} />
                <motion.h3 initial={reduced ? {} : { opacity: 0, y: 18 }} animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 18 })} transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1], delay: 0.14 }} style={{ fontFamily: FONT.syne, fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 7 }}>
                    {member.firstName}<br /><span style={{ color: C.accent }}>{member.lastName}</span>
                </motion.h3>
                <motion.p initial={reduced ? {} : { opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 10 })} transition={{ duration: 0.45, delay: 0.2 }} style={{ fontFamily: FONT.mono, fontSize: 9, letterSpacing: "0.23em", textTransform: "uppercase", color: C.muted, marginBottom: 16 }}>{member.role}</motion.p>
                {member.tagline && (
                    <motion.div initial={reduced ? {} : { opacity: 0, x: -10 }} animate={active ? { opacity: 1, x: 0 } : (reduced ? {} : { opacity: 0, x: -10 })} transition={{ duration: 0.45, delay: 0.25 }} style={{ fontFamily: FONT.syne, fontSize: "clamp(13px, 1.4vw, 17px)", fontWeight: 600, lineHeight: 1.4, color: C.text, marginBottom: 16, paddingLeft: 12, borderLeft: `3px solid ${C.accent}` }}>
                        {member.tagline}
                    </motion.div>
                )}
                <StatsRow stats={member.stats} isActive={active} delay={0.3} reduced={reduced} />
                <motion.p initial={reduced ? {} : { opacity: 0, y: 8 }} animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 8 })} transition={{ duration: 0.45, delay: 0.36 }} style={{ fontSize: 12, fontWeight: 300, lineHeight: 1.75, color: C.muted, marginBottom: 14 }}>{member.bio}</motion.p>
                <motion.div initial={reduced ? {} : { opacity: 0, y: 6 }} animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 6 })} transition={{ duration: 0.4, delay: 0.41 }} style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                    {member.skills.map((s) => <SkillTag key={s} label={s} />)}
                </motion.div>
                <motion.div initial={reduced ? {} : { opacity: 0, y: 5 }} animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 5 })} transition={{ duration: 0.4, delay: 0.46 }} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {member.socials.map((s) => <SocialButton key={s.label} {...s} />)}
                </motion.div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   STANDARD CARD — desktop 52/48 split
   ═══════════════════════════════════════════════════════════════ */
function StandardCard({ member, isActive, reduced }: { member: TeamMember; isActive: boolean; reduced: boolean }) {
    const active = reduced ? true : isActive;
    return (
        <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "52% 48%", position: "relative" }}>
            {/* LEFT — image */}
            <div style={{ position: "relative", overflow: "hidden", background: C.surface }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.accent, transform: active ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 0.65s cubic-bezier(0.23,1,0.32,1) 0.08s", zIndex: 3 }} />
                <div style={{ width: "100%", height: "100%", position: "relative", transition: "transform 1.2s cubic-bezier(0.23,1,0.32,1), filter 0.7s ease", transform: active ? "scale(1)" : "scale(1.04)", filter: active ? "grayscale(0%) brightness(0.85)" : "grayscale(20%) brightness(0.8)", willChange: "transform" }}>
                    {member.image ? (
                        <Image src={member.image} alt={member.firstName} fill className="object-cover object-top" sizes="52vw" />
                    ) : (
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(145deg, ${C.surface} 0%, ${C.surface2} 100%)`, fontFamily: FONT.syne, fontSize: 120, fontWeight: 800, color: "rgba(168,255,62,0.06)", userSelect: "none" }}>
                            {member.firstName[0]}{member.lastName[0]}
                        </div>
                    )}
                </div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(10,10,10,0.85) 100%), linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 40%)", zIndex: 1 }} />
                <div style={{ position: "absolute", bottom: 24, left: 28, fontFamily: FONT.syne, fontWeight: 800, fontSize: 100, lineHeight: 1, color: "rgba(255,255,255,0.04)", userSelect: "none", zIndex: 2, letterSpacing: "-0.04em" }}>{member.index}</div>

                <motion.div initial={reduced ? {} : { opacity: 0, y: -8 }} animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: -8 })} transition={{ duration: 0.4, delay: 0.35 }} style={{ position: "absolute", top: 24, left: 28, zIndex: 4, fontFamily: FONT.mono, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 12px", background: C.accent, color: C.bg, fontWeight: 700 }}>Pixelmint</motion.div>

                <motion.div initial={reduced ? {} : { opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 10 })} transition={{ duration: 0.5, delay: 0.45 }} style={{ position: "absolute", bottom: 28, left: 28, right: 28, zIndex: 3 }}>
                    <span style={{ color: C.accent, fontSize: 18, display: "block", marginBottom: 3, fontFamily: FONT.syne }}>&ldquo;</span>
                    <p style={{ fontFamily: FONT.syne, fontSize: 13, fontWeight: 500, lineHeight: 1.45, color: "rgba(255,255,255,0.85)" }}>{member.quote}</p>
                </motion.div>
            </div>

            {/* RIGHT — info */}
            <div style={{ background: C.surface, borderLeft: `1px solid ${C.border}`, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 52px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, background: `radial-gradient(circle, ${C.accentDim} 0%, transparent 70%)`, pointerEvents: "none", opacity: active ? 1 : 0, transition: "opacity 0.8s ease 0.2s", borderRadius: "50%" }} />
                <div style={{ position: "absolute", bottom: -24, right: -8, fontFamily: FONT.syne, fontWeight: 800, fontSize: 120, lineHeight: 1, color: "rgba(255,255,255,0.025)", userSelect: "none", pointerEvents: "none", letterSpacing: "-0.04em", whiteSpace: "nowrap" }}>{member.firstName}</div>
                <MetaRow index={member.index} isActive={active} delay={0.08} reduced={reduced} />
                <motion.h3 initial={reduced ? {} : { opacity: 0, y: 18 }} animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 18 })} transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1], delay: 0.14 }} style={{ fontFamily: FONT.syne, fontSize: "clamp(34px, 3.8vw, 54px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 8 }}>
                    {member.firstName}<br /><span style={{ color: C.accent }}>{member.lastName}</span>
                </motion.h3>
                <motion.p initial={reduced ? {} : { opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 10 })} transition={{ duration: 0.45, delay: 0.2 }} style={{ fontFamily: FONT.mono, fontSize: 9, letterSpacing: "0.23em", textTransform: "uppercase", color: C.muted, marginBottom: 20 }}>{member.role}</motion.p>
                <StatsRow stats={member.stats} isActive={active} delay={0.28} reduced={reduced} />
                <motion.p initial={reduced ? {} : { opacity: 0, y: 8 }} animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 8 })} transition={{ duration: 0.45, delay: 0.34 }} style={{ fontSize: 12, fontWeight: 300, lineHeight: 1.75, color: C.muted, marginBottom: 16 }}>{member.bio}</motion.p>
                <motion.div initial={reduced ? {} : { opacity: 0, y: 6 }} animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 6 })} transition={{ duration: 0.4, delay: 0.39 }} style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
                    {member.skills.map((s) => <SkillTag key={s} label={s} />)}
                </motion.div>
                <motion.div initial={reduced ? {} : { opacity: 0, y: 5 }} animate={active ? { opacity: 1, y: 0 } : (reduced ? {} : { opacity: 0, y: 5 })} transition={{ duration: 0.4, delay: 0.44 }} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {member.socials.map((s) => <SocialButton key={s.label} {...s} />)}
                </motion.div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER BAR
   ═══════════════════════════════════════════════════════════════ */
function FooterBar({ isMobile }: { isMobile: boolean }) {
    return (
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "32px 20px" : "40px 60px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", borderTop: `1px solid ${C.border}` }}>
            <p style={{ fontFamily: FONT.syne, fontStyle: "italic", fontSize: isMobile ? 14 : 16, color: C.text, opacity: 0.45 }}>Small team. Large ambition.</p>
            <a href="#contact" style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 7, padding: isMobile ? "10px 18px" : "12px 22px", overflow: "hidden", fontFamily: FONT.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: C.text, border: `1px solid ${C.text}`, textDecoration: "none", WebkitTapHighlightColor: "transparent" }}>
                We&apos;re hiring →
            </a>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION EXPORT
   ═══════════════════════════════════════════════════════════════ */
export default function Team() {
    const sectionRef = useRef<HTMLElement>(null);
    const blockRefs  = useRef<(HTMLDivElement | null)[]>([]);
    const stickyRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex]   = useState(0);
    const [sectionInView, setSectionInView] = useState(false);
    const [isMobile, setIsMobile]         = useState(false);
    const activeRef = useRef(0);
    const reduced   = useReducedMotion() ?? false;

    /* ── Detect mobile ─────────────────────────────────── */
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check, { passive: true });
        return () => window.removeEventListener("resize", check);
    }, []);

    /* ── Section visibility for side dots ─────────────── */
    useEffect(() => {
        if (isMobile) return;
        const observer = new IntersectionObserver(([entry]) => setSectionInView(entry.isIntersecting), { threshold: 0.02 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [isMobile]);

    /* ── Desktop: scroll → clip-path wipe + active ────── */
    useEffect(() => {
        if (isMobile || reduced) return;
        let rafId: number;

        const handleScroll = () => {
            rafId = requestAnimationFrame(() => {
                const vh = window.innerHeight;
                let current = 0;

                blockRefs.current.forEach((block, i) => {
                    if (!block) return;
                    const rect = block.getBoundingClientRect();

                    if (i > 0 && stickyRefs.current[i]) {
                        const progress = Math.max(0, Math.min(1, 1 - rect.top / vh));
                        const clipBottom = (1 - progress) * 100;
                        stickyRefs.current[i]!.style.clipPath = `inset(0 0 ${clipBottom}% 0)`;
                    }

                    if (rect.top < vh * 0.55 && rect.bottom > vh * 0.25) {
                        current = i;
                    }
                });

                if (current !== activeRef.current) {
                    activeRef.current = current;
                    setActiveIndex(current);
                }
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, [isMobile, reduced]);

    const handleDotClick = useCallback((i: number) => {
        blockRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    /* ── MOBILE LAYOUT ─────────────────────────────────── */
    if (isMobile) {
        return (
            <section id="teammates" style={{ background: C.bg, color: C.text, fontFamily: FONT.inter }}>
                <MarqueeStrip />
                <SectionHeader isMobile={true} />
                <div style={{ padding: "28px 0 0" }}>
                    {TEAM.map((member) => (
                        <MobileCard key={member.index} member={member} />
                    ))}
                </div>
                <FooterBar isMobile={true} />
                <MarqueeStrip reverse />
            </section>
        );
    }

    /* ── DESKTOP LAYOUT — sticky scroll ────────────────── */
    return (
        <section ref={sectionRef} id="teammates" style={{ background: C.bg, color: C.text, fontFamily: FONT.inter, position: "relative" }}>
            <MarqueeStrip />
            <SectionHeader isMobile={false} />
            <div style={{ maxWidth: 1280, margin: "40px auto 0", padding: "0 60px" }}>
                <hr style={{ border: "none", borderTop: `1px solid ${C.border}` }} />
            </div>

            {/* Sticky scroll cards */}
            <div style={{ position: "relative" }}>
                {TEAM.map((member, i) => (
                    <div
                        key={member.index}
                        ref={(el) => { blockRefs.current[i] = el; }}
                        style={{ position: "relative", height: "100vh" }}
                    >
                        <div
                            ref={(el) => { stickyRefs.current[i] = el; }}
                            style={{
                                position: "sticky",
                                top: 0,
                                height: "100vh",
                                width: "100%",
                                overflow: "hidden",
                                zIndex: i + 1,
                                willChange: "clip-path, transform",
                                ...(i === 0 ? {} : { clipPath: "inset(0 0 100% 0)" }),
                            }}
                        >
                            {member.isFounder ? (
                                <FounderCard member={member} isActive={activeIndex === i} reduced={reduced} />
                            ) : (
                                <StandardCard member={member} isActive={activeIndex === i} reduced={reduced} />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <FooterBar isMobile={false} />
            <MarqueeStrip reverse />
            <SideDots activeIndex={activeIndex} count={TEAM.length} visible={sectionInView} onDotClick={handleDotClick} />
        </section>
    );
}
