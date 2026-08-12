"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useCallback } from "react";
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
    liveUrl?: string;
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
        title: "PixelMint Studio MVS",
        subtitle: "Official Agency Website — Built End-to-End",
        category: "Studio",
        tags: ["Next.js", "Web Design", "Agency", "Branding"],
        gradient: "from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]",
        accentColor: "#98ff98", // Brand mint
        description:
            "Designed and developed the complete digital identity for PixelMint Studio MVS — a premium creative agency website featuring multi-page architecture, team showcase, 11-service grid, client testimonials, and a conversion-optimized contact system.",
        outcome: "Serving clients across 25+ countries with a 99% satisfaction rate.",
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        year: "2026",
        role: "Founder & Creative Director",
        image: "/pixelmint-logo.jpg",
        liveUrl: "https://pixelmint-studio-delta.vercel.app",
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

function ProjectCard({ project, i, onSelect }: { project: Project; i: number; onSelect: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const imgX = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), { stiffness: 150, damping: 20 });
    const imgY = useSpring(useTransform(mouseY, [0, 1], [-10, 10]), { stiffness: 150, damping: 20 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (!r) return;
        mouseX.set((e.clientX - r.left) / r.width);
        mouseY.set((e.clientY - r.top) / r.height);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            onClick={onSelect}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group cursor-pointer relative overflow-hidden rounded-[2rem] bg-white/[0.02] transition-all duration-500 hover:-translate-y-2"
            style={{
                minHeight: "380px",
                border: `1px solid rgba(255,255,255,0.06)`,
                ...(project.liveUrl ? { boxShadow: "0 0 40px rgba(152,255,152,0.1)" } : {}),
            }}
            whileHover={{ borderColor: `${project.accentColor}50`, boxShadow: `0 20px 40px -15px rgba(0,0,0,0.7), 0 0 0 1px ${project.accentColor}30, 0 0 40px -10px ${project.accentColor}30` }}
        >
            {/* Parallax image with zoom+rotation */}
            <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                <motion.div className="absolute inset-[-10%] w-[120%] h-[120%]" style={{ x: imgX, y: imgY }}>
                    <motion.div
                        className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    </motion.div>
                </motion.div>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 transition-opacity duration-500 group-hover:opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent" />
            </div>

            {/* Hover glow border inset */}
            <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px ${project.accentColor}30` }} />

            {/* Content */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-between" style={{ minHeight: "380px" }}>
                <div className="flex items-start justify-between">
                    <span className="text-6xl font-heading font-bold leading-none opacity-20 select-none group-hover:opacity-60 transition-opacity duration-300" style={{ color: project.accentColor }}>
                        {project.index}
                    </span>
                    <div className="flex items-center gap-2">
                        {project.liveUrl && (
                            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/30 text-brand-mint">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
                                LIVE
                            </span>
                        )}
                        <span className="text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full border" style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, background: `${project.accentColor}10` }}>
                            {project.category.split("·")[0].trim()}
                        </span>
                    </div>
                </div>

                <div>
                    <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags.map((tag, tagIdx) => (
                            <motion.span
                                key={tag}
                                className="text-[9px] px-3 py-1.5 rounded-full bg-[#020202]/50 border border-white/10 text-white/60 uppercase tracking-widest backdrop-blur-md"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 + tagIdx * 0.05 }}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 leading-tight group-hover:text-[var(--color-brand-mint)] transition-colors duration-300" style={{ ...(project.id === 2 ? { color: 'var(--color-brand-mint)' } : {}) }}>{project.title}</h3>
                    <p className="text-white/50 text-sm mb-6">{project.subtitle}</p>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">{project.year}</span>
                        <motion.div
                            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 45 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                            <ArrowUpRight size={16} className="text-white/40 group-hover:text-white transition-colors" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Portfolio() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedProject = projects.find((p) => p.id === selectedId);

    return (
        <SectionWrapper id="portfolio" className="bg-transparent py-24 md:py-32">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4 md:px-0">
                <div>
                    <div className="label-section mb-6">
                        <span className="label-number">06</span>
                        <span>/</span>
                        <span>PORTFOLIO</span>
                    </div>
                    <h2 className="heading-editorial text-4xl md:text-5xl lg:text-[4rem]">
                        Selected
                        <br />
                        <span className="text-white/30">Works.</span>
                    </h2>
                </div>
                <p className="body-refined max-w-sm">
                    A curated collection of projects spanning AI, design systems, and
                    creative technology. Hover to explore, click for details.
                </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
                {projects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} i={i} onSelect={() => setSelectedId(project.id)} />
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
                            className="absolute inset-0 bg-[#020202]/80 backdrop-blur-xl"
                        />

                        {/* Modal Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 40, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-3xl rounded-[2rem] overflow-hidden border border-white/10 bg-[#050505] shadow-2xl"
                        >
                            {/* Image Banner */}
                            <div className="w-full h-56 relative overflow-hidden">
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover"
                                    style={{ opacity: 0.5 }}
                                    sizes="672px"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.gradient} opacity-50`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                                
                                {/* Big index number */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span
                                        className="text-[10rem] font-heading font-bold opacity-[0.07] select-none"
                                        style={{ color: selectedProject.accentColor }}
                                    >
                                        {selectedProject.index}
                                    </span>
                                </div>
                                
                                {/* Category pill */}
                                <div className="absolute bottom-6 left-8">
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
                                className="absolute top-6 right-6 p-2 rounded-full bg-black/40 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all z-10"
                            >
                                <X size={18} />
                            </button>

                            {/* Body */}
                            <div className="p-8 md:p-10">
                                <div className="flex items-start justify-between mb-3">
                                    <h2 className="text-3xl font-heading font-bold text-white leading-tight">
                                        {selectedProject.title}
                                    </h2>
                                    {selectedProject.liveUrl && <ExternalLink size={18} className="text-white/20 mt-1 flex-shrink-0" />}
                                </div>
                                <p className="text-white/40 text-sm mb-6">{selectedProject.subtitle}</p>

                                <p className="body-refined mb-8">
                                    {selectedProject.description}
                                </p>

                                {/* Outcome */}
                                <div
                                    className="rounded-2xl p-5 mb-8 border"
                                    style={{
                                        background: `${selectedProject.accentColor}05`,
                                        borderColor: `${selectedProject.accentColor}20`,
                                    }}
                                >
                                    <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: selectedProject.accentColor }}>
                                        Outcome
                                    </p>
                                    <p className="text-white/90 text-sm leading-relaxed">{selectedProject.outcome}</p>
                                </div>

                                {/* Live Site Link */}
                                {selectedProject.liveUrl && (
                                    <a
                                        href={selectedProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full text-sm font-bold bg-brand-mint text-black hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(152,255,152,0.4)]"
                                    >
                                        Visit Live Site <ArrowUpRight size={16} />
                                    </a>
                                )}

                                {/* Meta Row */}
                                <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/5">
                                    <div className="flex-1">
                                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Tech Stack</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.stack.map((tech) => (
                                                <span key={tech} className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/50">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Role & Year</p>
                                        <p className="text-white/70 text-xs font-medium">{selectedProject.role}</p>
                                        <p className="text-white/30 text-[10px] font-mono mt-1">{selectedProject.year}</p>
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
