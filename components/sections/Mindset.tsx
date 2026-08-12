"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const mindsetList = [
    {
        number: "01",
        title: "Communication First",
        text: "Design is not decoration — it's communication. Aesthetics capture attention, but strategy captures trust. I build to communicate your core value instantly.",
    },
    {
        number: "02",
        title: "Clarity Before Creativity",
        text: "I focus on absolute clarity before pure creativity. If the user doesn't understand your offering within five seconds, the design has failed.",
    },
    {
        number: "03",
        title: "Purpose-Driven Execution",
        text: "Every design choice must have a distinct purpose. No random lines, no needless animations. Every pixel must justify its existence.",
    }
];

export default function Mindset() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="mindset" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-[#020202] overflow-hidden">
            {/* Subtle ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-mint/[0.03] blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Section label */}
                <motion.div
                    className="label-section mb-16"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="label-number">02</span>
                    <span>/</span>
                    <span>THINKING</span>
                </motion.div>

                {/* Section heading */}
                <motion.h2
                    className="heading-editorial text-4xl md:text-5xl lg:text-6xl mb-20 max-w-3xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    How I{" "}
                    <span className="text-brand-mint">Think.</span>
                </motion.h2>

                {/* Principles — editorial scroll layout */}
                <div className="flex flex-col gap-0">
                    {mindsetList.map((item, idx) => (
                        <MindsetPrinciple key={idx} item={item} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

const MindsetPrinciple = ({ item, index }: { item: typeof mindsetList[0]; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div 
            ref={ref} 
            whileHover="hover"
            className="group relative py-12 md:py-16 border-t border-white/[0.06] first:border-t-0"
        >
            {/* Background Hover Shimmer */}
            <motion.div 
                variants={{
                    hover: { opacity: 1, scaleX: 1 }
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-gradient-to-r from-brand-mint/[0.03] to-transparent pointer-events-none" 
            />

            <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 md:gap-12 items-start relative z-10">
                {/* Number */}
                <div className="overflow-hidden">
                    <motion.span
                        initial={{ y: "100%", opacity: 0, rotate: 10 }}
                        animate={inView ? { y: 0, opacity: 1, rotate: 0 } : {}}
                        transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="block text-brand-mint/30 text-5xl md:text-6xl font-black leading-none group-hover:text-brand-mint/80 transition-colors duration-700 origin-bottom-left"
                        style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                        {item.number}
                    </motion.span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4">
                    <div className="overflow-hidden pb-2 -mb-2">
                        <motion.h3
                            initial={{ y: "100%", opacity: 0, rotate: 3 }}
                            animate={inView ? { y: 0, opacity: 1, rotate: 0 } : {}}
                            transition={{ duration: 1, delay: index * 0.15 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="heading-editorial text-2xl md:text-3xl group-hover:text-brand-mint transition-colors duration-500 origin-bottom-left"
                        >
                            {item.title}
                        </motion.h3>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{ duration: 1, delay: index * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="body-refined max-w-2xl text-white/40 group-hover:text-white/70 transition-colors duration-500">
                            {item.text}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Hover accent line drawing */}
            <motion.div 
                variants={{
                    hover: { width: "100%", opacity: 1 }
                }}
                initial={{ width: "0%", opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-brand-mint/50 via-brand-mint/20 to-transparent"
            />
        </motion.div>
    );
};
