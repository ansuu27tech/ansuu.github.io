"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  categories: string[];
  tags: string[];
  year: string;
  subtitle: string;
  image: string;
  liveUrl: string;
  caseStudyUrl: string;
}

const projects: Project[] = [
  {
    id: "mindmap",
    title: "MindMap AI",
    category: "AI",
    categories: ["AI", "Data", "Dev Tools"],
    tags: ["Machine Learning", "NLP", "Graph DB"],
    year: "2025",
    subtitle: "Intelligent Knowledge Graph Builder",
    image: "/projects/mindmap.jpg",
    liveUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "pixelmint",
    title: "Pixelmint Studio",
    category: "Branding",
    categories: ["Branding", "Creative Tech", "Web Design"],
    tags: ["Visual Identity", "Motion", "Web"],
    year: "2024",
    subtitle: "Creative Brand Identity System",
    image: "/projects/pixelmint.jpg",
    liveUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "pulse",
    title: "Pulse Analytics",
    category: "Data",
    categories: ["Data", "Dev Tools"],
    tags: ["Real-Time Charts", "API"],
    year: "2025",
    subtitle: "Real-Time Social Sentiment Dashboard",
    image: "/projects/pulse.jpg",
    liveUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "aura",
    title: "Aura Health",
    category: "AI",
    categories: ["AI", "Creative Tech"],
    tags: ["LLM", "Mobile UX"],
    year: "2025",
    subtitle: "Personalized AI Wellness Companion",
    image: "/projects/aura.jpg",
    liveUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "gridforge",
    title: "GridForge",
    category: "Dev Tools",
    categories: ["Dev Tools", "Data"],
    tags: ["Drag & Drop", "ETL", "Cloud"],
    year: "2024",
    subtitle: "No-Code Data Pipeline Builder",
    image: "/projects/gridforge.jpg",
    liveUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "synthwave",
    title: "Synthwave FM",
    category: "Creative Tech",
    categories: ["Creative Tech", "AI"],
    tags: ["Generative AI", "Audio Canvas"],
    year: "2024",
    subtitle: "Generative AI Music Experience",
    image: "/projects/synthwave.jpg",
    liveUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "draughtsman",
    title: "Draughtsman Studio",
    category: "Web Design",
    categories: ["Web Design", "Branding"],
    tags: ["Branding"],
    year: "2024",
    subtitle: "Architectural Firm – Official Website",
    image: "/projects/draughtsman.jpg",
    liveUrl: "https://www.draughtsmanstudio.com",
    caseStudyUrl: "#",
  },
];

const FILTERS = [
  "All",
  "AI",
  "Branding",
  "Data",
  "Dev Tools",
  "Creative Tech",
  "Web Design",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
    },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const MagneticButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <section className="bg-[#0A0A0A] text-[#FFFFFF] py-24 px-6 relative overflow-hidden selection:bg-[#00FF9F] selection:text-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
              Selected Works
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed">
              A curated collection of projects spanning AI, design systems, and creative technology.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-6 md:mt-0 flex items-center gap-2 text-sm text-[#00FF9F] font-mono top-0 right-0 whitespace-nowrap"
          >
            <div className="w-2 h-2 rounded-full bg-[#00FF9F] animate-pulse" />
            {String(projects.length).padStart(2, "0")} Selected Works
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap md:flex-nowrap gap-3 mb-12 pb-4 overflow-x-auto scrollbar-hide"
        >
          {FILTERS.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border ${
                activeFilter === filter
                  ? "bg-[#00FF9F] text-black border-[#00FF9F] shadow-[0_0_20px_rgba(0,255,159,0.4)]"
                  : "bg-white/5 text-gray-300 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="block"
        >
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  key={project.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  whileHover="hover"
                  className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden block aspect-[16/10]"
                >
                  {/* Image */}
                  <motion.div
                    variants={{
                      hover: { scale: 1.08 },
                    }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority={idx < 3}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>

                  {/* Dark Overlay */}
                  <motion.div
                    variants={{
                      hover: { opacity: 1 },
                    }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none"
                  />

                  {/* Content Overlay */}
                  <motion.div
                    variants={{
                      hover: { y: 0, opacity: 1 },
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 p-6 flex flex-col justify-end"
                  >
                    <div className="flex gap-2 flex-wrap mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-end justify-between mb-1">
                      <h3 className="text-2xl font-bold text-white drop-shadow-md">{project.title}</h3>
                      <span className="text-[#00FF9F] font-mono text-xs mb-1">{project.year}</span>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-6 max-w-[90%] font-light">
                      {project.subtitle}
                    </p>

                    <div className="flex gap-3 relative z-20">
                      {project.liveUrl !== "#" && (
                        <MagneticButton>
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-semibold hover:border-[#00FF9F] hover:text-[#00FF9F] hover:bg-[#00FF9F]/10 transition-colors bg-black/40 backdrop-blur-sm pointer-events-auto"
                          >
                            Live Site
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </MagneticButton>
                      )}
                      
                      <MagneticButton>
                        <Link
                          href={project.caseStudyUrl}
                          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-semibold hover:border-white hover:bg-white hover:text-black transition-colors bg-black/40 backdrop-blur-sm pointer-events-auto"
                        >
                          Case Study
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </MagneticButton>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center z-10 relative"
        >
          <MagneticButton>
            <Link
              href="#"
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 text-white font-semibold tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 pointer-events-auto"
            >
              View All Projects
              <span className="bg-white text-white rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Studio Samples */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-32 border-t border-white/10 pt-16 relative z-10"
        >
          <h4 className="text-xl font-semibold mb-8 flex items-center gap-3 text-white">
            <span className="w-8 h-px bg-[#00FF9F]"></span>
            Studio Samples
          </h4>
          <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide snap-x">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={`sample-${i}`}
                whileHover={{ y: -5 }}
                className="min-w-[280px] md:min-w-[320px] aspect-video relative rounded-xl overflow-hidden border border-white/10 bg-white/5 snap-center group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#A855F7]/20 to-[#00FF9F]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-10" />
                <Image
                  src={`/projects/sample-${i}.jpg`}
                  alt={`Studio Sample ${i}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                  <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium border border-white/20">
                    View Shot
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Glow Elements */}
      <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-[#A855F7]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#00FF9F]/10 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
