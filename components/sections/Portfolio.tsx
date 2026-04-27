"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "../ui/SectionWrapper";

interface Project {
    id: number;
    index: string;
    title: string;
    subtitle: string;
    category: string;
    tags: string[];
    gradient: string;
    accentColor: string;
    description: string;
    outcome: string;
    stack: string[];
    year: string;
    role: string;
    image: string;
}

const projects: Project[] = [
    {
        id: 1,
        index: "01",
        title: "MindMap AI",
        subtitle: "Intelligent Knowledge Graph Builder",
        category: "AI · Product",
        tags: ["Machine Learning", "NLP", "Graph DB"],
        gradient: "from-violet-950 via-indigo-900 to-blue-950",
        accentColor: "#818cf8",
        description:
            "An AI-powered platform that transforms raw text, PDFs, and voice memos into dynamic, interconnected knowledge graphs. Leverages transformer-based NLP to extract entities and relationships, making complex information instantly navigable.",
        outcome: "Reduced research time by 60% for 2,000+ beta users.",
        stack: ["Python", "Next.js", "Neo4j", "OpenAI API", "Vercel"],
        year: "2025",
        role: "AI Engineer & Product Lead",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    },
    {
        id: 2,
        index: "02",
        title: "Pixelmint Studio",
        subtitle: "Creative Brand Identity System",
        category: "Branding · Design",
        tags: ["Visual Identity", "Motion", "Web"],
        gradient: "from-rose-950 via-pink-900 to-fuchsia-950",
        accentColor: "#f472b6",
        description:
            "Full brand identity creation for Pixelmint Studio — a design-forward creative agency. Designed the logo system, color language, typography scale, and a bespoke portfolio site with cinematic scroll animations.",
        outcome: "Launched with 40+ client inquiries in the first month.",
        stack: ["Figma", "Next.js", "Framer Motion", "GSAP"],
        year: "2024",
        role: "Founder & Creative Director",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    },
    {
        id: 3,
        index: "03",
        title: "Pulse Analytics",
        subtitle: "Real-Time Social Sentiment Dashboard",
        category: "Data · Visualization",
        tags: ["Real-Time", "Charts", "API"],
        gradient: "from-cyan-950 via-teal-900 to-emerald-950",
        accentColor: "#34d399",
        description:
            "A live sentiment analysis dashboard that aggregates data from Twitter, Reddit, and news sources. Uses a fine-tuned BERT model to classify sentiment in real time, visualizing trends with animated D3 charts.",
        outcome: "Processing 10K+ data points per minute with <200ms latency.",
        stack: ["Python", "FastAPI", "React", "D3.js", "Redis"],
        year: "2025",
        role: "Lead Developer",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
        id: 4,
        index: "04",
        title: "Aura Health",
        subtitle: "Personalized AI Wellness Companion",
        category: "AI · Healthcare",
        tags: ["LLM", "Mobile", "UX"],
        gradient: "from-amber-950 via-orange-900 to-red-950",
        accentColor: "#fb923c",
        description:
            "A conversational wellness app that uses a fine-tuned LLM to provide personalized mental health check-ins, guided journaling prompts, and habit tracking — all with empathetic, context-aware responses.",
        outcome: "85% user retention rate after 30 days in closed beta.",
        stack: ["React Native", "Expo", "LangChain", "Supabase"],
        year: "2025",
        role: "AI Product Designer",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    },
    {
        id: 5,
        index: "05",
        title: "GridForge",
        subtitle: "No-Code Data Pipeline Builder",
        category: "Dev Tools · SaaS",
        tags: ["Drag & Drop", "ETL", "Cloud"],
        gradient: "from-slate-900 via-zinc-900 to-neutral-900",
        accentColor: "#94a3b8",
        description:
            "A visual, no-code tool for engineers and analysts to build complex ETL pipelines using a drag-and-drop canvas. Supports 50+ connectors including databases, REST APIs, and cloud storage.",
        outcome: "Saved teams an average of 8 hours/week on data wrangling.",
        stack: ["TypeScript", "Next.js", "PostgreSQL", "Docker", "AWS"],
        year: "2024",
        role: "Full-Stack Engineer",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    },
    {
        id: 6,
        index: "06",
        title: "Synthwave FM",
        subtitle: "Generative AI Music Experience",
        category: "Creative Tech · Music",
        tags: ["Generative AI", "Audio", "Canvas"],
        gradient: "from-purple-950 via-violet-900 to-indigo-950",
        accentColor: "#a78bfa",
        description:
            "An immersive web experience that generates infinite synthwave tracks using AI models. Paired with a real-time WebGL audio visualizer that reacts to the generative music — a fusion of code and creativity.",
        outcome: "Featured on Product Hunt — 1,200 upvotes on launch day.",
        stack: ["Web Audio API", "Three.js", "Python", "MusicGen", "WebGL"],
        year: "2024",
        role: "Creative Technologist",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    },
];

export default function Portfolio() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedProject = projects.find((p) => p.id === selectedId);

    return (
        <SectionWrapper id="portfolio" className="bg-transparent">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
                <div>
                    <motion.p
                        className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4 font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Work
                    </motion.p>
                    <motion.h2
                        className="text-5xl md:text-7xl font-heading font-bold leading-none"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Selected
                        <br />
                        <span className="text-white/20">Works</span>
                    </motion.h2>
                </div>
                <motion.p
                    className="text-white/40 text-sm max-w-xs leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    A curated collection of projects spanning AI, design systems, and
                    creative technology.
                </motion.p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                            duration: 0.6,
                            delay: i * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        onClick={() => setSelectedId(project.id)}
                        className="group cursor-pointer relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/15 transition-all duration-500"
                        style={{ minHeight: "340px" }}
                    >
                        {/* Project Image with gradient overlay */}
                        <div className="absolute inset-0 overflow-hidden" style={{ willChange: 'transform' }}>
                            <div
                                className="absolute inset-0 opacity-65 group-hover:opacity-85 transition-opacity duration-700 ease-out"
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            {/* Dark + gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-45`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-8 h-full flex flex-col justify-between" style={{ minHeight: "340px" }}>
                            {/* Top Row */}
                            <div className="flex items-start justify-between">
                                <span
                                    className="text-5xl font-heading font-bold leading-none opacity-20 select-none"
                                    style={{ color: project.accentColor }}
                                >
                                    {project.index}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full border"
                                        style={{
                                            color: project.accentColor,
                                            borderColor: `${project.accentColor}40`,
                                            background: `${project.accentColor}10`,
                                        }}
                                    >
                                        {project.category.split("·")[0].trim()}
                                    </span>
                                </div>
                            </div>

                            {/* Bottom Content */}
                            <div>
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 uppercase tracking-wider"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-2xl font-heading font-bold text-white mb-1 leading-tight group-hover:text-white transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-white/40 text-sm mb-5">{project.subtitle}</p>

                                {/* CTA Row */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-white/25 tracking-widest">{project.year}</span>
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300"
                                    >
                                        <ArrowUpRight size={14} className="text-white/40 group-hover:text-white/80 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedId && selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        {/* Modal Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-2xl rounded-3xl overflow-hidden border border-white/10 bg-[#0b0b0f] shadow-2xl"
                        >
                            {/* Image Banner */}
                            <div className="w-full h-52 relative overflow-hidden">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                    style={{ opacity: 0.6 }}
                                    sizes="672px"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.gradient} opacity-55`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent" />
                                {/* Big index number */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span
                                        className="text-9xl font-heading font-bold opacity-10 select-none"
                                        style={{ color: selectedProject.accentColor }}
                                    >
                                        {selectedProject.index}
                                    </span>
                                </div>
                                {/* Category pill */}
                                <div className="absolute bottom-4 left-6">
                                    <span
                                        className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full border"
                                        style={{
                                            color: selectedProject.accentColor,
                                            borderColor: `${selectedProject.accentColor}50`,
                                            background: `${selectedProject.accentColor}15`,
                                        }}
                                    >
                                        {selectedProject.category}
                                    </span>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X size={16} />
                            </button>

                            {/* Body */}
                            <div className="p-8 md:p-10">
                                <div className="flex items-start justify-between mb-2">
                                    <h2 className="text-3xl font-heading font-bold text-white leading-tight">
                                        {selectedProject.title}
                                    </h2>
                                    <ExternalLink size={18} className="text-white/20 mt-1 flex-shrink-0" />
                                </div>
                                <p className="text-white/40 text-sm mb-6">{selectedProject.subtitle}</p>

                                <p className="text-white/60 leading-relaxed mb-8 text-sm">
                                    {selectedProject.description}
                                </p>

                                {/* Outcome */}
                                <div
                                    className="rounded-xl p-4 mb-8 border"
                                    style={{
                                        background: `${selectedProject.accentColor}08`,
                                        borderColor: `${selectedProject.accentColor}25`,
                                    }}
                                >
                                    <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: selectedProject.accentColor }}>
                                        Outcome
                                    </p>
                                    <p className="text-white/80 text-sm font-medium">{selectedProject.outcome}</p>
                                </div>

                                {/* Meta Row */}
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2">Tech Stack</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.stack.map((tech) => (
                                                <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-white/50">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-1">Role</p>
                                        <p className="text-white/60 text-xs">{selectedProject.role}</p>
                                        <p className="text-white/25 text-xs mt-1">{selectedProject.year}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
