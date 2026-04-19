"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["N.", "MOHAMMED", "ANAS"];

export default function AnimatedName() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 1800); // 1.8s interval ensures ~1.2s of solid visibility between 0.6s transitions
        return () => clearInterval(interval);
    }, []);

    return (
        /* Wrapper reserves explicit height so the absolute flip child never collapses the layout */
        <div
            className="relative w-full flex justify-center items-center"
            style={{
                perspective: "1000px",
                height: "clamp(2.2rem, 5vw, 4.5rem)",   /* matches max font size + line-height */
                marginBottom: "8px"                     /* gap before tagline */
            }}
        >
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, rotateX: -90, y: 20 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    exit={{ opacity: 0, rotateX: 90, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-x-0 flex justify-center items-center whitespace-nowrap font-extrabold tracking-wider leading-none"
                    style={{
                        fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
                        textShadow: "0px 4px 25px rgba(0,0,0,0.85)",
                        transformOrigin: "50% 50%"
                    }}
                >
                    <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.6)]">
                        {words[index]}
                    </span>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
