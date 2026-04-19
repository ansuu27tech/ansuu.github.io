"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        // Total sequence: 3.5s
        const timer = setTimeout(() => {
            setShow(false);
            document.body.style.overflow = "auto";
        }, 3500);

        return () => {
            document.body.style.overflow = "auto";
            clearTimeout(timer);
        };
    }, []);

    // SVG paths for "ANAS" (sharp, technical, custom geometric style)
    const letterA1 = "M 20 80 L 50 10 L 80 80 M 30 60 L 70 60";
    const letterN = "M 110 80 L 110 10 L 170 80 L 170 10";
    const letterA2 = "M 200 80 L 230 10 L 260 80 M 210 60 L 250 60";
    const letterS = "M 340 20 C 330 10, 290 10, 290 30 C 290 50, 340 40, 340 60 C 340 85, 290 85, 280 75";

    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 2.0, ease: [0.42, 0, 0.58, 1] as const, delay: 0.2 },
                opacity: { duration: 0.1, delay: 0 },
            }
        }
    };

    const fillVariants = {
        hidden: { fillOpacity: 0 },
        visible: {
            fillOpacity: 0.2,
            transition: { duration: 0.8, delay: 2.2, ease: [0, 0, 0.2, 1] as const }
        }
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Deep Noir background elements */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-mint/5 via-[#000000] to-[#000000] opacity-60" />

                    <motion.div 
                        className="relative z-10 w-full max-w-2xl px-8 flex items-center justify-center"
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ 
                            scale: [1.1, 1, 1, 15],
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                            duration: 3.5,
                            times: [0, 0.2, 0.8, 1],
                            ease: "easeInOut"
                        }}
                        style={{ willChange: "transform, opacity", transformOrigin: "center" }}
                    >
                        {/* Static Glow Behind SVG */}
                        <motion.div
                            className="absolute w-3/4 h-1/2 bg-brand-mint/20 blur-[60px] rounded-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />

                        {/* "ANAS" SVG Signature Draw */}
                        <motion.svg
                            viewBox="0 0 360 100"
                            className="w-full h-auto max-w-[500px] overflow-visible"
                            style={{ filter: "drop-shadow(0px 0px 10px rgba(152, 255, 152, 0.6))" }}
                        >
                            <motion.g
                                stroke="#98ff98"
                                strokeWidth="4"
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                                fill="#98ff98"
                                variants={fillVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.path d={letterA1} variants={pathVariants} />
                                <motion.path d={letterN} variants={pathVariants} />
                                <motion.path d={letterA2} variants={pathVariants} />
                                <motion.path d={letterS} variants={pathVariants} />
                            </motion.g>
                        </motion.svg>
                    </motion.div>

                    {/* Microscopic data streams */}
                    <div className="absolute inset-x-0 bottom-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-mint/30 to-transparent" />
                    <motion.div
                        className="absolute bottom-1/4 left-1/2 h-[1px] w-24 bg-brand-mint"
                        initial={{ x: "-500%", opacity: 0 }}
                        animate={{ x: "500%", opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, ease: "linear", repeat: 1, delay: 0.5 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
