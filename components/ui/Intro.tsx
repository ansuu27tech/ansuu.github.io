"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ParticleText from "./ParticleText";

export default function Intro() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        // Total sequence: 5s to allow particle text to fully assemble and be readable
        const timer = setTimeout(() => {
            setShow(false);
            document.body.style.overflow = "auto";
        }, 5000);

        return () => {
            document.body.style.overflow = "auto";
            clearTimeout(timer);
        };
    }, []);



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
                        className="relative z-10 w-full h-full flex items-center justify-center"
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ 
                            scale: [1.1, 1, 1, 15],
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                            duration: 5,
                            times: [0, 0.15, 0.85, 1],
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

                        {/* Particle Text Animation */}
                        <div className="w-full h-screen absolute inset-0 pointer-events-auto">
                            <ParticleText
                                text="ANAS"
                                particleSize={2.5}
                                density={3}
                                color="#ffffff"
                                highlightColor="#98ff98"
                                scatter={250}
                                gatherDuration={800}
                                stagger={150}
                                pointerRepel={60}
                                repelRadius={150}
                                idleDrift={0.15}
                                trigger="mount"
                                fontSize="clamp(5rem, 18vw, 12rem)"
                                fontWeight={900}
                                fontFamily="var(--font-syne)"
                                glow
                            />
                        </div>
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
