"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaPaintBrush, FaCompressArrowsAlt, FaBullseye } from "react-icons/fa";

const mindsetList = [
    {
        title: "Communication First",
        text: "Design is not decoration, it’s communication. Aesthetics capture attention, but strategy captures trust. I build to communicate your core value instantly.",
        icon: FaPaintBrush
    },
    {
        title: "Clarity Before Creativity",
        text: "I focus on absolute clarity before pure creativity. If the user doesn&apos;t understand your offering within five seconds, the design has failed.",
        icon: FaCompressArrowsAlt
    },
    {
        title: "Purpose-Driven execution",
        text: "Every design choice must have a distinct purpose. No random lines, no needless animations. Every pixel must justify its existence.",
        icon: FaBullseye
    }
];

export default function Mindset() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section id="mindset" ref={sectionRef} className="relative w-full py-24 md:py-32 bg-[#020202] overflow-hidden">
            {/* Ambient Background Light */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-cyan-900/10 blur-[150px] rounded-[100%] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <motion.div
                    className="mb-16 md:mb-20 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: "var(--font-orbitron)" }}>
                        How I <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">Think.</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-lg tracking-widest uppercase font-medium" style={{ fontFamily: "var(--font-exo2)" }}>
                        The philosophy behind my work
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {mindsetList.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                            className="group relative flex flex-col p-8 md:p-10 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] hover:bg-white/[0.04] hover:border-cyan-400/30 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(34,211,238,0.1)] overflow-hidden"
                        >
                            {/* Border trace gradient on hover */}
                            <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{
                                    background: "linear-gradient(var(--gradient-angle, 0deg), transparent 40%, rgba(34,211,238,0.15) 50%, transparent 60%)",
                                    backgroundSize: "300% 300%",
                                    animation: "border-trace 4s ease infinite",
                                }}
                            />

                            {/* Numbered label */}
                            <span
                                className="absolute top-6 right-6 text-[4rem] md:text-[5rem] font-black leading-none text-white/[0.03] select-none pointer-events-none group-hover:text-cyan-400/[0.06] transition-colors duration-700"
                                style={{ fontFamily: "var(--font-orbitron)" }}
                            >
                                {String(idx + 1).padStart(2, "0")}
                            </span>

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black/50 border border-gray-700/50 flex items-center justify-center mb-8 shadow-inner group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-500">
                                <item.icon className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-300 transition-colors">
                                {item.title}
                            </h3>
                            
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed tracking-wide">
                                {item.text}
                            </p>
                            
                            {/* Accent line — animated width on hover */}
                            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-cyan-500/60 via-cyan-400/40 to-transparent transition-all duration-700 ease-out" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
