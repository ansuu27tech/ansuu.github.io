"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* Animated metric counter — counts up when scrolled into view */
const AnimatedMetric = ({ value }: { value: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        const numericMatch = value.match(/^([\d.]+)(.*)$/);
        if (!inView || !numericMatch) return;
        
        const end = parseFloat(numericMatch[1]);
        const suffix = numericMatch[2];
        const duration = 2000;
        let startTime: number | null = null;
        let rafId: number;

        const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            // Use easeOutExpo for a fast start and slow finish
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            let currentStr = "";
            if (end % 1 !== 0) {
                // If it's a decimal (e.g., 1.5)
                currentStr = (eased * end).toFixed(1);
            } else {
                // If it's an integer
                currentStr = Math.round(eased * end).toString();
            }
            
            setDisplay(`${currentStr}${suffix}`);
            if (progress < 1) {
                rafId = requestAnimationFrame(step);
            } else {
                setDisplay(value); // Ensure it ends on the exact string
            }
        };
        rafId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafId);
    }, [inView, value]);

    // Render original value during SSR, but update to 0 before animating on client
    // To avoid hydration mismatch, we render the full value initially
    return <span ref={ref}>{inView ? display : value}</span>;
};

const impactList = [
    {
        title: "Helped brands look premium and establish",
        highlight: "Instant Trust",
        text: "By focusing on modern, psychological design patterns, I ensure your audience inherently trusts your brand from the very first click.",
        metric: "100%",
        metricLabel: "Premium Delivery"
    },
    {
        title: "Created visually striking, high-converting",
        highlight: "Social Designs",
        text: "Algorithms reward attention. I craft visual hooks, engaging carousels, and high-retention video assets that command clicks and views.",
        metric: "7M+",
        metricLabel: "Impressions Generated"
    },
    {
        title: "Improved platform engagement through",
        highlight: "Visual Storytelling",
        text: "Moving beyond static layouts, I integrate dynamic flow and interaction that turns passive scrollers into active, recurring users.",
        metric: "10x",
        metricLabel: "Engagement Rate"
    }
];

export default function Impact() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="results" ref={sectionRef} className="relative w-full py-24 md:py-40 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col md:flex-row gap-16 md:gap-24 items-center">

                {/* Glowing vertical connector line — desktop only */}
                <div className="hidden md:block absolute left-[33.33%] top-[15%] bottom-[15%] w-[1px]">
                    <motion.div
                        className="w-full h-full"
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            transformOrigin: "top",
                            background: "linear-gradient(to bottom, transparent, rgba(34,211,238,0.15), rgba(34,211,238,0.3), rgba(34,211,238,0.15), transparent)",
                        }}
                    />
                </div>

                {/* Left Side: Sticky Title */}
                <div className="w-full md:w-1/3 flex flex-col items-start md:sticky md:top-40 md:self-start">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-brand-mint/90 bg-brand-mint/10 border border-brand-mint/20 rounded-full inline-block mb-6"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            style={{ animation: "glow-pulse 3s ease-in-out infinite" }}
                        >
                            The Value I Bring
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-[1.1]" style={{ fontFamily: "var(--font-orbitron)" }}>
                            Results Over <br /> Visuals.
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Building brands that don&apos;t just exist, but lead.
                            I build digital assets specifically designed to maximize trust, drive retention, and generate measurable conversions for your brand.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Impact Cards */}
                <div className="w-full md:w-2/3 flex flex-col gap-8 md:gap-10">
                    {impactList.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
                            whileHover={{ y: -4, boxShadow: "0 20px 50px -15px rgba(34,211,238,0.08), 0 0 0 1px rgba(34,211,238,0.1)" }}
                            className="group flex flex-col sm:flex-row gap-6 p-8 md:p-10 rounded-[2rem] bg-[#0a0a0a] border border-white/[0.04] hover:bg-[#0c0c0c] hover:border-white/10 transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Hover shimmer sweep */}
                            <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.04), transparent)" }} />

                            <div className="sm:w-[25%] flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0 sm:pr-6 whitespace-nowrap">
                                <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-500 tracking-tighter" style={{ fontFamily: "var(--font-orbitron)" }}>
                                    <AnimatedMetric value={item.metric} />
                                </span>
                                <span className="text-[0.65rem] md:text-xs text-brand-mint font-mono uppercase tracking-[0.2em] mt-2 block">
                                    {item.metricLabel}
                                </span>
                            </div>

                            <div className="sm:w-[75%] flex flex-col justify-center">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                                    {item.title} {" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
                                        {item.highlight}
                                    </span>
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
