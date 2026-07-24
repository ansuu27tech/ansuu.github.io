"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["N.", "MOHAMMED", "ANAS"];

export default function AnimatedName() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="relative w-full flex justify-center items-center"
            style={{
                perspective: "1200px",
                height: "clamp(2.2rem, 5vw, 4.5rem)",
                marginBottom: "8px",
            }}
        >
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, rotateX: -60, y: 15, filter: "blur(4px)" }}
                    animate={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, rotateX: 50, y: -15, filter: "blur(4px)" }}
                    transition={{
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-x-0 flex justify-center items-center whitespace-nowrap font-extrabold tracking-wider leading-none"
                    style={{
                        fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
                        textShadow: "0px 4px 25px rgba(0,0,0,0.85)",
                        transformOrigin: "50% 50%",
                        willChange: "transform, opacity, filter",
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
