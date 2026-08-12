"use client";

import { useRef, useEffect, useState } from "react";
import WebGLCursorMask from "../ui/WebGLCursorMask";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import AnimatedName from "@/components/ui/AnimatedName";
import OrbitingIcons from "../ui/OrbitingIcons";
import MagneticButton from "../ui/MagneticButton";

const RotatingText = () => {
    const texts = [
        "AI & Data Science · Creative Development · UI/UX Design",
        "Founder, PixelMint Studio MVS — Building premium digital experiences",
        "Turning complex ideas into elegant, high-impact products"
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setIndex(prev => (prev + 1) % texts.length), 4000);
        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <div className="w-full flex justify-center items-center" style={{ height: "1.8rem", overflow: "visible", marginBottom: "10px" }}>
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ y: 15, opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -15, opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute text-white/50 font-normal whitespace-nowrap text-center text-sm tracking-wide"
                    style={{ fontFamily: "var(--font-inter)", willChange: "transform, opacity, filter" }}
                >
                    {texts[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};


const StatCounter = ({ end, suffix, label, delayIndex }: { end: number; suffix: string; label: string, delayIndex: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    useEffect(() => {
        if (!isInView) return;

        const duration = 2500;
        const delayMs = delayIndex * 200;
        let startTime: number | null = null;
        let rafId: number;

        const timeout = setTimeout(() => {
            const step = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.round(eased * end));
                if (progress < 1) {
                    rafId = requestAnimationFrame(step);
                }
            };
            rafId = requestAnimationFrame(step);
        }, delayMs);

        return () => {
            clearTimeout(timeout);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [isInView, end, delayIndex]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 + delayIndex * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
            style={{ willChange: "transform, opacity" }}
        >
            <div
                className="font-bold leading-none text-white"
                style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(1.1rem, 2vw, 1.6rem)" }}
            >
                <span>{count}</span><span className="text-brand-mint">{suffix}</span>
            </div>
            <span className="text-white/30 text-[0.6rem] tracking-[0.2em] uppercase mt-1.5 font-medium">
                {label}
            </span>
        </motion.div>
    );
};

export default function Hero() {
    const sectionRef   = useRef<HTMLDivElement>(null);
    const canvasRef    = useRef<HTMLCanvasElement>(null);
    const lineRafRef   = useRef<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const scrollOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const [particles, setParticles] = useState<{ x: number; y: number; s: number; d: number; dl: number }[] | null>(null);

    useEffect(() => {
        setParticles(
            Array.from({ length: 12 }, () => ({
                x: Math.random() * 100,
                y: Math.random() * 100,
                s: Math.random() * 1.5 + 0.5,
                d: Math.random() * 12 + 8,
                dl: Math.random() * 6,
            }))
        );
    }, []);

    // Animated background node-line network (canvas)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const isMobile = window.innerWidth < 768;
        const COUNT = isMobile ? 25 : 40;
        const LINK_DIST = 140;
        const FACE_R_FRAC = 0.30;

        const nodes = Array.from({ length: COUNT }, () => {
            const angle = Math.random() * Math.PI * 2;
            const r = (FACE_R_FRAC + Math.random() * (0.5 - FACE_R_FRAC)) * Math.min(window.innerWidth, window.innerHeight);
            return {
                x: window.innerWidth  / 2 + Math.cos(angle) * r * 2.2,
                y: window.innerHeight / 2 + Math.sin(angle) * r * 1.1,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
            };
        });

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        let isVisible = true;

        const draw = () => {
            if (!isVisible) {
                lineRafRef.current = requestAnimationFrame(draw);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width  / 2;
            const cy = canvas.height / 2;
            const fr = FACE_R_FRAC * Math.min(canvas.width, canvas.height);
            const bodyFr = fr * 1.5;

            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.ellipse(cx, cy + fr * 0.2, fr, bodyFr, 0, 0, Math.PI * 2, true);
            ctx.clip();

            for (const n of nodes) {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0)             n.x = canvas.width;
                if (n.x > canvas.width)  n.x = 0;
                if (n.y < 0)             n.y = canvas.height;
                if (n.y > canvas.height) n.y = 0;
                const dx = n.x - cx, dy = n.y - cy;
                const dist = Math.sqrt(dx * dx + (dy/1.5) * (dy/1.5));
                if (dist < fr) {
                    const push = (fr - dist + 2) / dist;
                    n.x += dx * push;
                    n.y += dy * push;
                }
            }

            const linkDistSq = LINK_DIST * LINK_DIST;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dsq = dx * dx + dy * dy;
                    if (dsq < linkDistSq) {
                        const alpha = (1 - Math.sqrt(dsq) / LINK_DIST) * 0.18;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(152,255,152,${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            for (const n of nodes) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(152,255,152,0.25)";
                ctx.fill();
            }
            ctx.restore();
            lineRafRef.current = requestAnimationFrame(draw);
        };

        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            if (lineRafRef.current) cancelAnimationFrame(lineRafRef.current);
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[100svh] md:h-[100svh] overflow-x-hidden md:overflow-hidden bg-transparent flex flex-col md:block pb-16 md:pb-0"
        >
            {/* ── Background Layer ── */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Single restrained aurora orb */}
                <div
                    className="absolute"
                    style={{
                        top: "25%", left: "15%",
                        width: 500, height: 500,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(152,255,152,0.08) 0%, transparent 65%)",
                        filter: "blur(80px)",
                        animation: "hero-orb-breathe 8s ease-in-out infinite"
                    }}
                />
                {/* Subtle secondary glow */}
                <motion.div
                    className="absolute inset-0 z-0"
                    animate={{ opacity: [0.08, 0.18, 0.08] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    style={{ background: "radial-gradient(circle at 50% 50%, rgba(152, 255, 152, 0.08) 0%, transparent 50%)" }}
                />

                {/* Canvas network */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }} />

                {/* Single marquee band — tech keywords */}
                <style>{`
                    @keyframes marquee-ltr  { from { transform: translateX(-50%); } to { transform: translateX(0%); } }
                `}</style>
                <div className="absolute top-[20%] left-0 right-0 overflow-hidden pointer-events-none select-none">
                    <div className="flex whitespace-nowrap" style={{ animation: "marquee-ltr 35s linear infinite", opacity: 0.08 }}>
                        {[...Array(4)].map((_, i) => <span key={i} className="text-white/60 font-mono font-medium uppercase tracking-[0.3em] mr-16" style={{ fontSize: "clamp(0.55rem, 1vw, 0.75rem)" }}>Artificial Intelligence &nbsp;·&nbsp; Machine Learning &nbsp;·&nbsp; Data Science &nbsp;·&nbsp; UI/UX Design &nbsp;·&nbsp; Web Development &nbsp;·&nbsp; Creative Technology &nbsp;·&nbsp;</span>)}
                    </div>
                </div>

                {/* Floating particles — reduced count */}
                {particles?.map((p, i) => (
                    <motion.div key={i} className="absolute rounded-full bg-brand-mint"
                        style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, opacity: 0, willChange: "transform, opacity" }}
                        animate={{ y: [0, -50, 0], opacity: [0, 0.25, 0] }}
                        transition={{ duration: p.d, repeat: Infinity, delay: p.dl, ease: [0.45, 0, 0.55, 1] }} />
                ))}
            </div>

            {/* ── Portrait / WebGL Mask Layer ── */}
            <div className="relative md:absolute md:inset-0 w-full flex justify-center items-center z-[21] pointer-events-none md:pointer-events-auto order-1 md:order-none flex-shrink-0" style={{ paddingTop: "80px" }}>
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-none mb-12 md:mb-0 aspect-[3/4] md:aspect-auto md:w-full md:h-full block mx-auto">
                    <div className="absolute inset-0 z-[19]">
                        <OrbitingIcons />
                    </div>
                    <div className="absolute inset-0 z-[22]">
                        <WebGLCursorMask
                            bgSrc="/portrait-base-final.png"
                            fgSrc="/glowing-helmet-transparent.png"
                        />
                    </div>
                </div>
            </div>

            {/* ── Gradient Overlays ── */}
            <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none bg-gradient-to-t from-[#030305] via-[#030305]/70 to-transparent" style={{ height: "58%" }} />
            <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none h-[130px] bg-gradient-to-b from-[#030305]/80 to-transparent" />

            {/* ── Content Overlay ── */}
            <motion.div
                className="relative md:absolute md:inset-0 z-30 w-full order-2 md:order-none pointer-events-none mt-6 md:mt-0"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "transform, opacity" }}>

                {/* Name + Rotating Text */}
                <div className="md:absolute md:top-[68vh] lg:top-[70vh] left-0 right-0 flex flex-col items-center justify-center text-center w-full px-4 pointer-events-auto mb-16 md:mb-0">
                    <AnimatedName />
                    <div>
                        <RotatingText />
                    </div>
                </div>

                {/* Bottom CTAs */}
                <div className="md:absolute md:bottom-[5vh] left-0 right-0 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-row items-center justify-between w-full pointer-events-auto mt-2 md:mt-0">
                    <div className="flex justify-start">
                        <MagneticButton strength={30}>
                            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                                className="group relative overflow-hidden flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-black transition-all duration-500 hover:scale-105 active:scale-95 whitespace-nowrap text-sm md:text-base bg-brand-mint hover:bg-white"
                                style={{ boxShadow: "0 0 30px rgba(152,255,152,0.25)" }}>
                                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore My Work
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </button>
                        </MagneticButton>
                    </div>

                    <div className="flex justify-end">
                        <MagneticButton strength={30}>
                            <a href="https://www.linkedin.com/in/mohammed-anas-30110b35b" target="_blank" rel="noopener noreferrer"
                                className="group relative flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(152,255,152,0.3)] border border-brand-mint/30 hover:border-brand-mint active:scale-95 whitespace-nowrap text-sm md:text-base bg-white/5 backdrop-blur-sm">
                                <div className="absolute inset-0 bg-brand-mint translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                <span className="relative z-10 flex items-center gap-2 text-white/80 group-hover:text-black transition-colors duration-300">
                                    LinkedIn <Linkedin className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110" />
                                </span>
                            </a>
                        </MagneticButton>
                    </div>
                </div>
            </motion.div>

            {/* ── Stat Counters — refined, bottom-right ── */}
            <motion.div
                className="absolute top-28 right-4 md:right-10 z-[40] flex flex-col gap-5 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                {[
                    { end: 50, suffix: "+", label: "Clients" },
                    { end: 100, suffix: "+", label: "Projects" },
                    { end: 2, suffix: "+", label: "Yrs Exp" }
                ].map((stat, i) => (
                    <StatCounter key={i} end={stat.end} suffix={stat.suffix} label={stat.label} delayIndex={i} />
                ))}
            </motion.div>

            {/* ── Scroll Indicator ── */}
            <motion.div style={{ opacity: scrollOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none hidden md:flex flex-col items-center gap-3">
                <motion.span
                    className="text-[9px] font-mono tracking-[0.3em] text-white/25 uppercase"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >Scroll</motion.span>
                <div className="w-[1px] h-14 relative overflow-hidden bg-white/5">
                    <motion.div animate={{ y: ['-100%', '200%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        className="w-full h-1/2 absolute top-0 left-0" style={{ background: "linear-gradient(to bottom, transparent, rgba(152,255,152,0.5), transparent)" }} />
                </div>
                <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-brand-mint"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3], boxShadow: ["0 0 0 0 rgba(152,255,152,0)", "0 0 0 6px rgba(152,255,152,0.12)", "0 0 0 0 rgba(152,255,152,0)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

        </section>
    );
}
