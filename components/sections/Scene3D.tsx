"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";

const Scene3DCanvas = dynamic(() => import("../ui/Scene3DCanvas"), { ssr: false });

export default function Scene3D() {
    return (
        <section className="relative w-full h-[500px] md:h-[600px] bg-transparent overflow-hidden flex items-center justify-center border-y border-white/5 my-12 md:my-24">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(152,255,152,0.03)_0%,transparent_70%)] pointer-events-none" />

            {/* 3D Canvas */}
            <div className="absolute inset-0 opacity-80 mix-blend-screen">
                <Suspense fallback={null}>
                    <Scene3DCanvas />
                </Suspense>
            </div>

            {/* Overlay text */}
            <div className="relative z-10 text-center pointer-events-none select-none px-6">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-brand-mint/70 mb-4 font-bold"
                >
                    Crafting Digital Experiences
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.15 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white drop-shadow-2xl leading-tight"
                >
                    Where Creativity Meets
                    <br />
                    <span className="text-brand-mint italic pr-4">Technology.</span>
                </motion.h2>
            </div>

            {/* Top and Bottom fade edges to blend seamlessly */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
        </section>
    );
}
