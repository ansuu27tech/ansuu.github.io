"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="scroll-top"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Scroll to top"
                    className="fixed bottom-6 right-6 z-50 group w-12 h-12 rounded-full flex items-center justify-center border border-cyan-400/30 bg-[#0a0a0a]/80 backdrop-blur-xl text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] hover:border-cyan-300/60 hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                    {/* Glow fill on hover */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <ChevronUp className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
