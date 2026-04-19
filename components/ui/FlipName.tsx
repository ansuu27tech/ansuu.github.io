"use client";
import { motion } from "framer-motion";

export default function FlipName({ text = "MOHAMMED ANAS N" }: { text?: string }) {
    const letters = text.split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, rotateX: 90, y: 20 },
        visible: {
            opacity: 1,
            rotateX: 0,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    return (
        <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center md:justify-start text-3xl md:text-[2.25rem] font-extrabold tracking-[0.15em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
            {letters.map((char, index) => (
                <motion.span 
                    key={index} 
                    variants={letterVariants}
                    style={{ perspective: 1000, whiteSpace: char === " " ? "pre" : "normal" }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400"
                >
                    {char}
                </motion.span>
            ))}
        </motion.h1>
    );
}
