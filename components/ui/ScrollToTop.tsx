"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            setVisible(scrollY > 400);
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const circumference = 2 * Math.PI * 18; // radius = 18
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="scroll-top"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Scroll to top"
                    className="fixed bottom-6 right-6 z-50 group w-12 h-12 flex items-center justify-center cursor-pointer"
                >
                    {/* SVG Progress Ring */}
                    <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 40 40">
                        {/* Background track */}
                        <circle cx="20" cy="20" r="18" fill="rgba(10,10,10,0.8)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                        {/* Progress arc */}
                        <circle
                            cx="20" cy="20" r="18"
                            fill="none"
                            stroke="url(#progress-gradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-[stroke-dashoffset] duration-150 ease-out"
                            style={{ filter: "drop-shadow(0 0 4px rgba(34,211,238,0.4))" }}
                        />
                        <defs>
                            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#98ff98" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Glow behind on hover */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />

                    {/* Arrow icon */}
                    <ChevronUp className="relative z-10 w-5 h-5 text-cyan-300 group-hover:text-white transition-colors duration-300 group-hover:-translate-y-0.5 transform" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
