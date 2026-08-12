"use client";

import { motion, useScroll, useTransform, useMotionValue, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "../ui/SectionWrapper";

const experiences = [
  {
    role: "Digital Marketing Strategist",
    company: "Draughtman Studio",
    period: "2026 – Present",
    description:
      "Leading social media growth, performance marketing, and brand positioning. Managing data-driven campaign strategies, audience targeting, and analytics to maximize engagement and digital presence.",
    badge: "CURRENT ROLE",
  },
  {
    role: "Founder & Creative Director",
    company: "PixelMint Studio MVS",
    period: "2024 – Present",
    description:
      "Founded a premium creative digital agency specializing in web design, development, branding, and growth solutions. Leading a dynamic team to deliver exceptional digital experiences for global clients.",
    badge: "STUDIO FOUNDER",
  },
  {
    role: "E-Book Author",
    company: "Digital Publication",
    period: "2024",
    description:
      "Authored comprehensive digital content focused on skill-based learning and tech education, simplifying complex concepts for aspiring developers.",
  },
  {
    role: "Freelance Developer",
    company: "Self-Employed",
    period: "2023 – 2024",
    description:
      "Specialized in web design, UI development, and tailored digital solutions. Bridged the gap between high-impact visuals and robust functional code for diverse clients.",
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <SectionWrapper id="experience" className="bg-transparent relative">
      <div className="container mx-auto px-6" ref={containerRef}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <div className="label-section mb-6">
            <span className="label-number">04</span>
            <span>/</span>
            <span>EXPERIENCE</span>
          </div>
          
          <h2 className="heading-editorial text-4xl md:text-5xl lg:text-6xl mb-4">
            Professional <span className="text-brand-mint">Journey.</span>
          </h2>
          <p className="body-lead max-w-2xl text-center">
            A track record of delivering premium digital experiences and strategic growth.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line — scroll-driven draw */}
          <motion.div
            className="absolute left-[27px] top-4 bottom-4 w-[2px] md:left-1/2 md:-translate-x-1/2 origin-top"
            style={{
              scaleY: useTransform(
                useScroll({ target: containerRef, offset: ["start center", "end center"] }).scrollYProgress,
                [0, 1],
                [0, 1]
              ),
              background: "linear-gradient(to bottom, rgba(152,255,152,0.6), rgba(152,255,152,0.1))",
              boxShadow: "0 0 12px rgba(152,255,152,0.2)",
            }}
          />

          <div className="space-y-8 md:space-y-16">
            {experiences.map((exp, index) => (
              <TimelineItem key={index} data={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

const TimelineItem = ({ data, index }: { data: (typeof experiences)[0]; index: number }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row gap-8 ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      {/* Timeline Dot — fixed position */}
      <div className="absolute left-0 w-14 h-14 flex items-center justify-center md:left-1/2 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2">
        <div className="w-10 h-10 rounded-full bg-[#030305] flex items-center justify-center border border-white/10 z-10">
            <motion.div
            className="w-3 h-3 rounded-full"
            style={{
                background: "var(--color-brand-mint)",
                boxShadow: "0 0 10px rgba(152,255,152,0.5)"
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
            />
        </div>
      </div>

      {/* Content Card */}
      <div className="ml-16 md:ml-0 md:w-1/2 pt-1 md:pt-0">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className={`group relative p-8 glass-panel-premium rounded-2xl ${isEven ? "md:text-right" : "md:text-left"}`}
          style={{
            borderColor: data.badge ? "rgba(152,255,152,0.2)" : "var(--border-default)",
          }}
        >
          {/* Spotlight hover effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]) =>
                  `radial-gradient(400px circle at ${x}px ${y}px, rgba(152,255,152,0.06), transparent 40%)`,
              ),
            }}
          />
          
          <div className={`relative z-10 flex items-center gap-3 mb-4 flex-wrap ${isEven ? "md:justify-end" : ""}`}>
            <span className="text-3xl md:text-4xl font-bold text-white/20 group-hover:text-white/40 transition-colors duration-500 font-heading">
                {data.period.split(" ")[0]}
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand-mint border border-brand-mint/20 px-2.5 py-1 rounded-md bg-brand-mint/5">
                {data.period}
            </span>
            {data.badge && (
              <span className="text-[10px] font-bold text-black bg-brand-mint px-2.5 py-1 rounded-md tracking-wider uppercase">
                {data.badge}
              </span>
            )}
          </div>
          
          <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white mb-1 font-heading group-hover:text-brand-mint transition-colors duration-300">
            {data.role}
          </h3>
          <p className="relative z-10 text-sm font-mono text-white/50 mb-5 uppercase tracking-wider">
            {data.company}
          </p>
          <p className="relative z-10 body-refined">
            {data.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
