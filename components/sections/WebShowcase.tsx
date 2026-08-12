"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Globe } from "lucide-react";
import SectionWrapper from "../ui/SectionWrapper";

interface Project {
    id: string;
    name: string;
    tagline: string;
    url: string;
    preview: string;
    tags: string[];
    details?: {
        description: string;
        tech: string[];
    };
}

const projects: Project[] = [
    {
        id: "draughtsman",
        name: "Draughtsman Studio",
        tagline: "Architectural Firm – Official Website",
        url: "https://www.draughtsmanstudio.com",
        preview: "/draughtsman-preview.png",
        tags: ["Next.js", "Web Design", "Branding"],
        details: {
            description:
                "A premium portfolio website for Draughtsman Studio, an architectural and interior design firm. Features a sleek dark theme, project showcases, and a seamless contact experience.",
            tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
        },
    },
    {
        id: "ss-builders",
        name: "SS Builders",
        tagline: "Construction & Builders Website",
        url: "https://ss-builders-mvs.vercel.app/",
        preview: "/ss-builders.jpeg",
        tags: ["Java", "HTML", "CSS", "JavaScript"],
        details: {
            description:
                "A professional web presence for SS Builders, showcasing construction projects, services, and industry expertise with a modern interface.",
            tech: ["Java", "HTML5", "CSS3", "JavaScript"],
        },
    },
];

export default function WebShowcase() {
    const [selected, setSelected] = useState<Project | null>(null);

    return (
        <SectionWrapper id="web-showcase" className="bg-transparent">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="mb-16 text-center flex flex-col items-center"
                >
                    <div className="label-section mb-6">
                        <span className="label-number">10</span>
                        <span>/</span>
                        <span>SHOWCASE</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
                        Websites Built by{" "}
                        <span className="text-brand-mint">Pixelmint.</span>
                    </h2>
                    <p className="body-refined mt-4 max-w-xl mx-auto">
                        Real products. Real clients. Designed and developed end-to-end.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                            className="group relative rounded-3xl border border-white/10 glass-panel-premium overflow-hidden hover:-translate-y-2 transition-all duration-500"
                        >
                            {/* Preview Image */}
                            <div className="relative h-56 overflow-hidden">
                                <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
                                <Image
                                    src={project.preview}
                                    alt={`${project.name} preview`}
                                    fill
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                />
                                {/* Live badge */}
                                <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-[#050505]/80 border border-white/10 rounded-full px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase text-brand-mint backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
                                    Live
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 relative z-20 -mt-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-mint/10 group-hover:border-brand-mint/30 transition-colors">
                                        <Globe className="w-5 h-5 text-white/50 group-hover:text-brand-mint transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-heading font-bold text-white leading-tight group-hover:text-brand-mint transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-xs text-white/50 mt-1 font-light">{project.tagline}</p>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 text-white/50 font-mono"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-mint text-black font-bold text-sm hover:shadow-[0_0_20px_rgba(152,255,152,0.4)] transition-all duration-300 active:scale-95"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Visit
                                    </a>
                                    {project.details && (
                                        <button
                                            onClick={() => setSelected(project)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white/70 font-semibold text-sm hover:bg-white/10 hover:text-white transition-all duration-300 active:scale-95"
                                        >
                                            Details
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Details Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/90 backdrop-blur-xl"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-64 md:h-80 overflow-hidden">
                                <Image
                                    src={selected.preview}
                                    alt={selected.name}
                                    fill
                                    className="object-cover object-top opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                                <button
                                    onClick={() => setSelected(null)}
                                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                
                                <div className="absolute bottom-6 left-8 right-8">
                                    <h3 className="text-3xl font-heading font-bold text-white mb-2 drop-shadow-md">
                                        {selected.name}
                                    </h3>
                                    <p className="text-white/70 text-sm font-light">{selected.tagline}</p>
                                </div>
                            </div>

                            <div className="p-8">
                                {selected.details && (
                                    <>
                                        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 font-light">
                                            {selected.details.description}
                                        </p>
                                        <div className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                            <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-4">
                                                Tech Stack
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {selected.details.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="text-[10px] px-3 py-1.5 rounded-full bg-brand-mint/5 border border-brand-mint/20 text-brand-mint font-mono"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                                <a
                                    href={selected.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-brand-mint text-black font-bold hover:shadow-[0_0_30px_rgba(152,255,152,0.3)] transition-all duration-300 text-lg active:scale-[0.98]"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    Launch Project
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
