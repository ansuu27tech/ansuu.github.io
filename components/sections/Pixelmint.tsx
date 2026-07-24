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
    { value: "25+", label: "Countries" },
    { value: "50+", label: "Clients" },
    { value: "99%", label: "Satisfaction" },
    { value: "4.9★", label: "Rating" },
];

export default function Pixelmint() {
    return (
        <SectionWrapper id="pixelmint" className="bg-transparent relative overflow-hidden">
            {/* Background Glow */}
            <div
                className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(163,230,53,0.08) 0%, transparent 65%)",
                    filter: "blur(80px)",
                }}
            />
            <div
                className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(132,204,22,0.06) 0%, transparent 65%)",
                    filter: "blur(100px)",
                }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
                {/* ── LEFT: Studio Identity ── */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-8"
                >
                    {/* Label */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-lime-400/30 flex-shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                            <Image
                                src="/pixelmint-logo.jpg"
                                alt="Pixelmint Studio"
                                fill
                                className="object-cover"
                                sizes="40px"
                            />
                        </div>
                        <span
                            className="text-lime-400 text-xs font-bold tracking-[0.3em] uppercase"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            PIXELMINT STUDIO
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.1] text-white"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        We Build Digital
                        <br />
                        Experiences That{" "}
                        <span className="text-lime-400">Convert.</span>
                    </h2>

                    {/* Body */}
                    <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                        Pixelmint Studio is a premium creative digital agency — building
                        exceptional websites, brands, and digital experiences for ambitious
                        businesses worldwide. From concept to conversion, we handle
                        everything.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4">
                        <a
                            href="https://pixelmint-studio-delta.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-black text-sm bg-lime-400 hover:bg-lime-300 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(163,230,53,0.5)] active:scale-95"
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
                            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border border-lime-400/50 text-lime-400 hover:bg-lime-400 hover:text-black transition-all duration-500 hover:scale-105 active:scale-95"
                        >
                            Start a Project
                        </a>
                    </div>

                    {/* Stat Pills */}
                    <div className="flex flex-wrap gap-3 mt-2">
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
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 bg-white/[0.03] backdrop-blur-sm"
                            >
                                <span
                                    className="text-lime-400 font-bold text-sm"
                                    style={{ fontFamily: "var(--font-orbitron)" }}
                                >
                                    {stat.value}
                                </span>
                                <span className="text-white/40 text-xs font-medium tracking-wide uppercase">
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
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.6,
                delay: 0.15 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="group relative p-6 rounded-2xl overflow-hidden transition-colors duration-300"
            style={{
                background: "rgba(10, 10, 12, 0.5)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            {/* Mouse spotlight */}
            <div
                className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                style={{
                    opacity: spot.visible ? 1 : 0,
                    background: `radial-gradient(180px circle at ${spot.x}px ${spot.y}px, rgba(163,230,53,0.12) 0%, transparent 70%)`,
                }}
            />

            {/* Icon */}
            <div className="relative z-10 w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center mb-4 group-hover:bg-lime-400/20 group-hover:border-lime-400/40 transition-all duration-300">
                <Icon
                    size={18}
                    className="text-lime-400/80 group-hover:text-lime-400 transition-colors duration-300"
                    strokeWidth={1.8}
                />
            </div>

            {/* Name */}
            <h4 className="relative z-10 text-white font-bold text-sm mb-1.5 group-hover:text-lime-400 transition-colors duration-300"
                style={{ fontFamily: "var(--font-syne)" }}
            >
                {service.name}
            </h4>

            {/* Desc */}
            <p className="relative z-10 text-white/35 text-xs leading-relaxed">
                {service.desc}
            </p>

            {/* Bottom shimmer */}
            <motion.div
                className="pointer-events-none absolute bottom-0 left-0 h-[1px] rounded-full"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(163,230,53,0.6), transparent)",
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
