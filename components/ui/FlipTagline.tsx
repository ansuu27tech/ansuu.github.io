"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const TAGLINE_TEXTS = [
    "I turn ideas into premium experiences",
    "I design brands that convert",
    "I build visuals that sell"
];

export default function FlipTagline() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % TAGLINE_TEXTS.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-6 md:h-8 flex justify-center md:justify-start items-center overflow-hidden w-full">
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ opacity: 0, rotateX: -90, y: 15 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    exit={{ opacity: 0, rotateX: 90, y: -15 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    style={{ perspective: "1000px" }}
                    className="absolute text-gray-200 font-medium tracking-wide text-center md:text-left text-[0.85rem] md:text-[1.1rem] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                    {TAGLINE_TEXTS[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}
