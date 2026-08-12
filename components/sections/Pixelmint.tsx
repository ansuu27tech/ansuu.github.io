"use client";

import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import SectionWrapper from "../ui/SectionWrapper";
import {
    Globe,
    Code2,
    ShoppingCart,
    Figma,
    Palette,
    FileText,
    ArrowUpRight,
} from "lucide-react";

const services = [
    {
        icon: Globe,
        name: "Website Design",
        desc: "Premium, conversion-focused websites that elevate your brand.",
    },
    {
        icon: Code2,
        name: "Web Development",
        desc: "Clean, performant code built with modern frameworks.",
    },
    {
        icon: ShoppingCart,
        name: "E-Commerce",
        desc: "Online stores that drive sales and delight customers.",
    },
    {
        icon: Figma,
        name: "UI/UX Design",
        desc: "Intuitive interfaces designed for maximum engagement.",
    },
    {
        icon: Palette,
        name: "Branding",
        desc: "Complete brand identity systems that stand out.",
    },
    {
        icon: FileText,
        name: "Landing Pages",
        desc: "High-converting pages engineered to capture leads.",
    },
];

const stats = [
    { value: "15+", label: "Projects Delivered" },
    { value: "100%", label: "Client Success" },
    { value: "0", label: "Compromises" },
    { value: "5.0★", label: "Rating" },
];

export default function Pixelmint() {
    return (
        <SectionWrapper id="pixelmint" className="bg-transparent relative overflow-hidden">
            {/* Background Glow */}
            <div
                className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(152,255,152,0.06) 0%, transparent 65%)",
                    filter: "blur(80px)",
                }}
            />
            <div
                className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(152,255,152,0.04) 0%, transparent 65%)",
                    filter: "blur(100px)",
                }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
                {/* ── LEFT: Studio Identity ── */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-8"
                >
                    {/* Numbering + Studio Badge */}
                    <div>
                        <div className="label-section mb-10">
                            <span className="label-number">05</span>
                            <span>/</span>
                            <span>AGENCY</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-mint/30 flex-shrink-0 shadow-[0_0_15px_rgba(152,255,152,0.2)]">
                                <Image
                                    src="/pixelmint-logo.jpg"
                                    alt="PixelMint Studio MVS"
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                />
                            </div>
                            <span className="text-brand-mint text-xs font-bold tracking-[0.3em] uppercase font-mono">
                                PIXELMINT STUDIO MVS
                            </span>
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="heading-editorial text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.1]">
                        Crafting the <span className="text-brand-mint">Future</span> <br /> of Digital.
                    </h2>

                    {/* Body */}
                    <p className="body-lead max-w-lg text-white/80">
                        PixelMint Studio MVS is a specialized design and engineering collective. We fuse experimental aesthetics with rigorous logic to build premium web experiences, resilient digital brands, and high-converting platforms for ambitious founders worldwide.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4">
                        <a
                            href="https://pixelmint-studio-delta.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-black text-sm bg-brand-mint hover:bg-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(152,255,152,0.4)] active:scale-95"
                        >
                            <div
                                className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12"
                                style={{
                                    background:
                                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                                }}
                            />
                            <span className="relative z-10 flex items-center gap-2">
                                Visit the Studio
                                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        </a>
                        <a
                            href="https://pixelmint-studio-delta.vercel.app/contact.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border border-brand-mint/50 text-brand-mint hover:bg-brand-mint hover:text-black transition-all duration-500 hover:scale-105 active:scale-95"
                        >
                            Start a Project
                        </a>
                    </div>

                    {/* Stat Pills */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.4 + i * 0.1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm"
                            >
                                <span
                                    className="text-brand-mint font-bold text-sm"
                                    style={{ fontFamily: "var(--font-orbitron)" }}
                                >
                                    {stat.value}
                                </span>
                                <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── RIGHT: Mini Service Grid ── */}
                <div className="grid grid-cols-2 gap-4">
                    {services.map((service, i) => (
                        <ServiceCard key={i} service={service} index={i} />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}

/* ── Service Card ── */
function ServiceCard({
    service,
    index,
}: {
    service: (typeof services)[0];
    index: number;
}) {
    const Icon = service.icon;
    const cardRef = useRef<HTMLDivElement>(null);
    const [spot, setSpot] = useState({ x: 0, y: 0, visible: false });

    const onMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const r = cardRef.current?.getBoundingClientRect();
            if (!r) return;
            setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true });
        },
        []
    );

    const onLeave = useCallback(
        () => setSpot((s) => ({ ...s, visible: false })),
        []
    );

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: 40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: 0.1 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="group relative p-6 glass-panel-premium rounded-2xl overflow-hidden transition-all duration-300"
        >
            {/* Mouse spotlight */}
            <div
                className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                style={{
                    opacity: spot.visible ? 1 : 0,
                    background: `radial-gradient(180px circle at ${spot.x}px ${spot.y}px, rgba(152,255,152,0.1) 0%, transparent 70%)`,
                }}
            />

            {/* Icon */}
            <div className="relative z-10 w-10 h-10 rounded-xl bg-brand-mint/10 border border-brand-mint/20 flex items-center justify-center mb-4 group-hover:bg-brand-mint/20 group-hover:border-brand-mint/40 transition-all duration-300">
                <Icon
                    size={18}
                    className="text-brand-mint/80 group-hover:text-brand-mint transition-colors duration-300"
                    strokeWidth={1.8}
                />
            </div>

            {/* Name */}
            <h4 className="relative z-10 text-white font-bold text-sm mb-2 group-hover:text-brand-mint transition-colors duration-300 font-heading tracking-wide">
                {service.name}
            </h4>

            {/* Desc */}
            <p className="relative z-10 text-white/40 text-xs leading-relaxed">
                {service.desc}
            </p>

            {/* Bottom shimmer */}
            <motion.div
                className="pointer-events-none absolute bottom-0 left-0 h-[1px] rounded-full"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(152,255,152,0.6), transparent)",
                }}
                initial={{ width: "0%", left: "0%" }}
                whileInView={{
                    width: ["0%", "100%", "0%"],
                    left: ["0%", "0%", "100%"],
                }}
                viewport={{ once: true }}
                transition={{
                    duration: 2,
                    delay: 0.2 + index * 0.1,
                    ease: "easeInOut",
                }}
            />
        </motion.div>
    );
}
