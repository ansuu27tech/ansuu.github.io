"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import SectionWrapper from "../ui/SectionWrapper";

export default function Pixelmint() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
        <SectionWrapper id="pixelmint" className="bg-[#050505] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-mint/10 rounded-full blur-[120px] pointer-events-none" />

            <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center text-center">
                <motion.div
                    style={{ rotate, scale }}
                    className="relative w-40 h-40 md:w-56 md:h-56 mb-10 rounded-full overflow-hidden border-4 border-white/5 shadow-2xl shadow-brand-mint/20"
                >
                    <Image
                        src="/pixelmint-logo.jpg"
                        alt="Pixelmint Studio Logo"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-heading font-bold mb-6"
                >
                    Pixelmint <span className="text-brand-mint">Studio</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-2xl text-lg text-gray-400 mb-12"
                >
                    A premium creative design studio specialized in Branding, Thumbnails, Posters, and high-conversion Digital Marketing designs. We keep it minimal, clean, and impactful.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {["Branding & Identity", "Thumbnails & Socials", "Digital Marketing"].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="glass-panel p-8 rounded-2xl text-left hover:border-brand-mint/30 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-mint/10 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-brand-mint" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-brand-mint transition-colors">{item}</h3>
                            <p className="text-sm text-gray-500">Premium quality designs tailored for high engagement and brand consistency.</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
