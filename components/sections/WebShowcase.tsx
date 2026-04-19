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
];

export default function WebShowcase() {
    const [selected, setSelected] = useState<Project | null>(null);

    return (
        <SectionWrapper id="web-showcase" className="py-24 bg-[#050505]">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <p className="text-brand-mint uppercase tracking-[0.3em] text-sm font-semibold mb-4">
                        Portfolio
                    </p>
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                        Websites Built by{" "}
                        <span className="text-gradient">Pixelmint Studio</span>
                    </h2>
                    <p className="text-gray-600 mt-4 text-base max-w-xl mx-auto">
                        Real products. Real clients. Designed and developed end-to-end by us.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden hover:border-brand-mint/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,178,0.08)]"
                        >
                            {/* Preview Image */}
                            <div className="relative h-52 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                <Image
                                    src={project.preview}
                                    alt={`${project.name} preview`}
                                    fill
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Live badge */}
                                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-full px-3 py-1 text-xs text-green-400 backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    Live
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-lg bg-brand-mint/10 border border-brand-mint/20 flex items-center justify-center flex-shrink-0">
                                        <Globe className="w-4 h-4 text-brand-mint" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white leading-tight">
                                            {project.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-0.5">{project.tagline}</p>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400"
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
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-mint text-black font-semibold text-sm hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,255,178,0.3)] transition-all duration-300"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Visit Website
                                    </a>
                                    {project.details && (
                                        <button
                                            onClick={() => setSelected(project)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 font-semibold text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                        >
                                            View Details
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-white border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={selected.preview}
                                    alt={selected.name}
                                    fill
                                    className="object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
                                <button
                                    onClick={() => setSelected(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-black/20 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-white mb-1">
                                    {selected.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4">{selected.tagline}</p>
                                {selected.details && (
                                    <>
                                        <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                            {selected.details.description}
                                        </p>
                                        <div className="mb-6">
                                            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                                                Tech Stack
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {selected.details.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="text-xs px-3 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint"
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
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-mint text-black font-bold hover:brightness-110 transition-all"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Visit Website
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
