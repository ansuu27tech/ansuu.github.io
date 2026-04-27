"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";

const Scene3DCanvas = dynamic(() => import("../ui/Scene3DCanvas"), { ssr: false });

export default function Scene3D() {
    return (
        <section className="relative w-full h-[500px] bg-transparent overflow-hidden flex items-center justify-center">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,178,0.04)_0%,transparent_70%)] pointer-events-none" />

            {/* 3D Canvas */}
            <div className="absolute inset-0">
                <Suspense fallback={null}>
                    <Scene3DCanvas />
                </Suspense>
            </div>

            {/* Overlay text */}
            <div className="relative z-10 text-center pointer-events-none select-none">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-brand-mint uppercase tracking-[0.5em] text-xs font-semibold mb-3"
                >
                    Crafting Digital Experiences
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="text-3xl md:text-5xl font-heading font-bold text-white/90"
                >
                    Where Creativity Meets
                    <br />
                    <span className="text-gradient">Technology</span>
                </motion.h2>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
        </section>
    );
}
