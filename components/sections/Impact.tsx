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
        title: "Established brands with",
        highlight: "Instant Trust",
        text: "By focusing on modern, psychological design patterns, I ensure your audience inherently trusts your brand from the very first click.",
        metric: "100%",
        metricLabel: "Premium Delivery"
    },
    {
        title: "Crafted visually striking",
        highlight: "Digital Assets",
        text: "Algorithms reward attention. I craft visual hooks and high-retention assets that command clicks and views across platforms.",
        metric: "1M+",
        metricLabel: "Est. Impressions"
    },
    {
        title: "Improved platform flow through",
        highlight: "Visual Storytelling",
        text: "Moving beyond static layouts, I integrate dynamic flow and interaction that turns passive scrollers into active users.",
        metric: "10x",
        metricLabel: "Engagement Rate"
    }
];

export default function Impact() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="results" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col md:flex-row gap-16 md:gap-24 items-start">

                {/* Left Side: Sticky Title */}
                <div className="w-full md:w-1/3 flex flex-col items-start md:sticky md:top-40 md:self-start">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="label-section mb-10">
                            <span className="label-number">03</span>
                            <span>/</span>
                            <span>RESULTS</span>
                        </div>

                        <h2 className="heading-editorial text-4xl md:text-5xl lg:text-6xl mb-6">
                            Results Over <br /><span className="text-brand-mint">Visuals.</span>
                        </h2>
                        <p className="body-lead max-w-sm">
                            Building brands that don&apos;t just exist, but lead.
                            I build digital assets specifically designed to maximize trust and generate measurable conversions.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Impact Cards */}
                <div className="w-full md:w-2/3 flex flex-col gap-6">
                    {impactList.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="glass-panel-premium group flex flex-col sm:flex-row gap-6 p-8 md:p-10 rounded-2xl overflow-hidden"
                        >
                            {/* Hover shimmer sweep */}
                            <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(152,255,152,0.04), transparent)" }} />

                            <div className="sm:w-[35%] flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0 sm:pr-6">
                                <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 group-hover:from-brand-mint group-hover:to-white transition-all duration-500 tracking-tighter" style={{ fontFamily: "var(--font-orbitron)" }}>
                                    <AnimatedMetric value={item.metric} />
                                </span>
                                <span className="text-[10px] text-white/50 font-mono uppercase tracking-[0.2em] mt-2 block">
                                    {item.metricLabel}
                                </span>
                            </div>

                            <div className="sm:w-[65%] flex flex-col justify-center">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight font-heading">
                                    {item.title} {" "}
                                    <span className="text-brand-mint">
                                        {item.highlight}
                                    </span>
                                </h3>
                                <p className="body-refined">
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
