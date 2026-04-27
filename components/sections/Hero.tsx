"use client";

import { useRef, useEffect, useState } from "react";
import WebGLCursorMask from "../ui/WebGLCursorMask";
import { motion, useScroll, useTransform, AnimatePresence, useInView, animate } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import AnimatedName from "@/components/ui/AnimatedName";
import Logo from "../ui/Logo";
import OrbitingIcons from "../ui/OrbitingIcons";
import MagneticButton from "../ui/MagneticButton";

const RotatingText = () => {
    const texts = [
        "I design brands that convert",
        "I build visuals that sell",
        "I turn ideas into premium experiences"
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setIndex(prev => (prev + 1) % texts.length), 3500);
        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <div className="w-full flex justify-center items-center" style={{ height: "1.8rem", overflow: "visible", marginBottom: "10px" }}>
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute text-gray-300 font-normal whitespace-nowrap text-center"
                    style={{ fontSize: "0.9rem", fontFamily: "var(--font-exo2)", letterSpacing: "0.08em" }}
                >
                    {texts[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};
import { useMotionValue } from "framer-motion";

const StatCounter = ({ end, suffix, label, delayIndex }: { end: number; suffix: string; label: string, delayIndex: number }) => {
    const count = useMotionValue(0);
    const animatedCount = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, end, {
                type: "tween",
                duration: 2.5,
                ease: [0.22, 1, 0.36, 1],
                delay: delayIndex * 0.2,
            });
            return () => controls.stop();
        }
    }, [isInView, end, delayIndex, count]);

    return (
        <motion.div 
            ref={ref} 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: delayIndex * 0.2, ease: "easeOut" }}
            className="flex flex-col items-end text-right glass-panel px-5 py-3 rounded-xl border border-white/5 hover:border-brand-mint/40 transition-all duration-300 relative overflow-hidden group min-w-[130px]"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out pointer-events-none" />
            <div className="font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-brand-mint to-cyan-400 drop-shadow-[0_0_12px_rgba(152,255,152,0.4)] flex items-center justify-end" style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}>
                <motion.span>{animatedCount}</motion.span><span>{suffix}</span>
            </div>
            <span className="text-gray-300 text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] uppercase mt-1.5 font-bold" style={{ fontFamily: "var(--font-syne)" }}>
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
            Array.from({ length: 25 }, () => ({
                x: Math.random() * 100,
                y: Math.random() * 100,
                s: Math.random() * 2 + 1,
                d: Math.random() * 12 + 8,
                dl: Math.random() * 6,
            }))
        );
    }, []);

    // WebGL2 cursor mask handles its own mouse events via window

    // Animated background node-line network (canvas)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const COUNT = 70;
        const LINK_DIST = 180;
        const FACE_R_FRAC = 0.30;

        const nodes = Array.from({ length: COUNT }, () => {
            const angle = Math.random() * Math.PI * 2;
            const r = (FACE_R_FRAC + Math.random() * (0.5 - FACE_R_FRAC)) * Math.min(window.innerWidth, window.innerHeight);
            return {
                x: window.innerWidth  / 2 + Math.cos(angle) * r * 2.2,
                y: window.innerHeight / 2 + Math.sin(angle) * r * 1.1,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
            };
        });

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
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

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < LINK_DIST) {
                        const alpha = (1 - dist / LINK_DIST) * 0.22;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(96,165,250,${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            for (const n of nodes) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(34,211,238,0.3)";
                ctx.fill();
            }
            ctx.restore();
            lineRafRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            if (lineRafRef.current) cancelAnimationFrame(lineRafRef.current);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[100svh] md:h-[100svh] overflow-x-hidden md:overflow-hidden bg-transparent flex flex-col md:block pb-16 md:pb-0"
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }} />

                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <span className="select-none whitespace-nowrap font-black uppercase text-white pointer-events-none"
                        style={{ fontSize: "clamp(4rem, 15vw, 14rem)", opacity: 0.12, letterSpacing: "-0.04em", filter: "blur(2px)", mixBlendMode: "screen", userSelect: "none" }}>
                        PIXELMINT
                    </span>
                </div>

                <style>{`
                    @keyframes marquee-ltr  { from { transform: translateX(-50%); } to { transform: translateX(0%); } }
                    @keyframes marquee-rtl  { from { transform: translateX(0%);  } to { transform: translateX(-50%); } }
                `}</style>
                <div className="absolute top-[18%] left-0 right-0 overflow-hidden pointer-events-none select-none">
                    <div className="flex whitespace-nowrap" style={{ animation: "marquee-ltr 30s linear infinite", opacity: 0.18 }}>
                        {[...Array(4)].map((_, i) => <span key={i} className="text-blue-300 font-mono font-semibold uppercase tracking-widest mr-16" style={{ fontSize: "clamp(0.6rem, 1.1vw, 0.85rem)" }}>Artificial Intelligence &nbsp;·&nbsp; Machine Learning &nbsp;·&nbsp; Data Science &nbsp;·&nbsp; Neural Networks &nbsp;·&nbsp; Deep Learning &nbsp;·&nbsp; Python &nbsp;·&nbsp; B.Tech AI&amp;DS &nbsp;·&nbsp; Computer Vision &nbsp;·&nbsp;</span>)}
                    </div>
                </div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none flex items-center" style={{ transform: "rotate(-6deg)", transformOrigin: "center" }}>
                    <div className="flex whitespace-nowrap w-full" style={{ animation: "marquee-rtl 22s linear infinite", opacity: 0.15 }}>
                        {[...Array(4)].map((_, i) => <span key={i} className="text-cyan-300 font-mono font-bold uppercase tracking-[0.25em] mr-20" style={{ fontSize: "clamp(0.7rem, 1.4vw, 1rem)" }}>PIXELMINT STUDIO &nbsp;·&nbsp; UI / UX Design &nbsp;·&nbsp; Web Development &nbsp;·&nbsp; Creative Technology &nbsp;·&nbsp; AI Engineer &nbsp;·&nbsp;</span>)}
                    </div>
                </div>
                <div className="absolute bottom-[30%] left-0 right-0 overflow-hidden pointer-events-none select-none">
                    <div className="flex whitespace-nowrap" style={{ animation: "marquee-ltr 40s linear infinite", opacity: 0.16 }}>
                        {[...Array(4)].map((_, i) => <span key={i} className="text-indigo-300 font-mono font-semibold uppercase tracking-widest mr-16" style={{ fontSize: "clamp(0.55rem, 1vw, 0.78rem)" }}>NLP &nbsp;·&nbsp; Data Analysis &nbsp;·&nbsp; TensorFlow &nbsp;·&nbsp; PyTorch &nbsp;·&nbsp; Next.js &nbsp;·&nbsp; React &nbsp;·&nbsp; Cloud AI &nbsp;·&nbsp; Portfolio &nbsp;·&nbsp; Problem Solving &nbsp;·&nbsp; Innovation &nbsp;·&nbsp;</span>)}
                    </div>
                </div>

                {particles?.map((p, i) => (
                    <motion.div key={i} className="absolute rounded-full bg-blue-400"
                        style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, opacity: 0 }}
                        animate={{ y: [0, -60, 0], opacity: [0, 0.35, 0] }}
                        transition={{ duration: p.d, repeat: Infinity, delay: p.dl, ease: "easeInOut" }} />
                ))}
            </div>

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

            <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none bg-gradient-to-t from-[#030305]/100 via-[#030305]/70 to-transparent" style={{ height: "58%" }} />
            <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none h-[130px] bg-gradient-to-b from-[#030305]/80 to-transparent" />

            <nav className="absolute top-0 left-0 w-full px-8 py-6 z-40 flex items-center gap-5">
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <Logo className="w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-105 transition-transform origin-center" />
                </button>
                <div className="flex flex-col select-none cursor-default pb-1">
                    <span className="text-white font-bold leading-none tracking-wide text-2xl md:text-3xl" style={{ fontFamily: "var(--font-orbitron)" }}>
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">PIXELMINT</span>
                    </span>
                    <span className="text-gray-300 text-[0.7rem] md:text-sm tracking-[0.6em] mt-1 uppercase" style={{ fontFamily: "var(--font-exo2)" }}>STUDIO</span>
                </div>
            </nav>

            <motion.div
                className="relative md:absolute md:inset-0 z-30 w-full order-2 md:order-none pointer-events-none mt-6 md:mt-0"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}>

                <div className="md:absolute md:top-[68vh] lg:top-[70vh] left-0 right-0 flex flex-col items-center justify-center text-center w-full px-4 pointer-events-auto mb-16 md:mb-0">
                    <AnimatedName />
                    <div>
                        <RotatingText />
                    </div>
                </div>

                <div className="md:absolute md:bottom-[5vh] left-0 right-0 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex flex-row items-center justify-between w-full pointer-events-auto mt-2 md:mt-0">
                    <div className="flex justify-start">
                        <MagneticButton strength={30}>
                            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                                className="group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.65)] active:scale-95 whitespace-nowrap text-sm md:text-base"
                                style={{ background: "linear-gradient(135deg, #06b6d4, #2563eb)" }}>
                                Know More
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </MagneticButton>
                    </div>

                    <div className="flex justify-end">
                        <MagneticButton strength={30}>
                            <a href="https://www.linkedin.com/in/mohammed-anas-30110b35b" target="_blank" rel="noopener noreferrer"
                                className="group relative flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] border border-cyan-500/60 hover:border-cyan-400 active:scale-95 whitespace-nowrap text-sm md:text-base">
                                <div className="absolute inset-0 bg-cyan-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                                <span className="relative z-10 flex items-center gap-2 text-cyan-400 group-hover:text-black transition-colors duration-200">
                                    LinkedIn <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                                </span>
                            </a>
                        </MagneticButton>
                    </div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div style={{ opacity: scrollOpacity }} className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-none hidden md:block">
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-12 mx-auto" style={{ background: "linear-gradient(to bottom, #06b6d4, transparent)" }} />
            </motion.div>

            {/* Stat Counters Overlay */}
            <div className="absolute top-24 right-4 md:right-10 z-[40] flex flex-col gap-3 pointer-events-none">
                {[
                    { end: 170, suffix: "+", label: "Clients" },
                    { end: 350, suffix: "+", label: "Designs" },
                    { end: 2, suffix: "+", label: "Yrs Exp" }
                ].map((stat, i) => (
                    <StatCounter key={i} end={stat.end} suffix={stat.suffix} label={stat.label} delayIndex={i} />
                ))}
            </div>

        </section>
    );
}
