"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "../ui/SectionWrapper";

const experiences = [
  {
    role: "Founder & Creative Director",
    company: "Pixelmint Studio",
    period: "2024 – Present",
    description:
      "Founded and scaled Pixelmint Studio — a premium creative digital agency specializing in web design, development, branding, and growth solutions. Leading a team of designers, developers, and strategists to deliver exceptional digital experiences for clients across 25+ countries.",
    badge: "STUDIO FOUNDER",
  },
  {
    role: "Digital Marketing Strategist",
    company: "Draughtman Studio",
    period: "2026 - Present",
    description:
      "Working as a Digital Marketing Strategist at Draughtman Studio, focusing on social media growth, performance marketing, brand positioning, and data-driven campaign strategies. Managing content planning, audience targeting, and analytics to increase engagement, leads, and overall digital presence.",
  },
  {
    role: "Freelance Developer",
    company: "Self-Employed",
    period: "2023 - Present",
    description:
      "Specializing in web design, UI development, and creating tailored digital solutions for diverse clients. Delivering high-impact visuals and functional code.",
  },
  {
    role: "E-Book Author",
    company: "Digital Publication",
    period: "2024",
    description:
      "Authoring digital content focused on skill-based learning and tech education. Creating resources that simplify complex concepts for aspiring developers.",
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Work <span className="text-brand-mint">Experience.</span>
          </h2>
          <p className="text-gray-600">My professional journey so far.</p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-white/10 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row gap-8 ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 w-10 h-10 flex items-center justify-center md:left-1/2 md:-translate-x-1/2">
        <div
          className="w-4 h-4 rounded-full border-4 shadow-[0_0_0_4px_rgba(0,0,0,0.05)]"
          style={{
            background: data.badge ? "#a3e635" : "var(--color-brand-mint)",
            borderColor: "white",
            boxShadow: data.badge
              ? "0 0 0 4px rgba(0,0,0,0.05), 0 0 12px rgba(163,230,53,0.5)"
              : "0 0 0 4px rgba(0,0,0,0.05)",
          }}
        />
      </div>

      {/* Content Card */}
      <div className="ml-12 md:ml-0 md:w-1/2">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className={`group relative p-6 glass-panel rounded-xl bg-transparent border overflow-hidden ${isEven ? "md:text-right" : "md:text-left"}`}
          style={{
            borderColor: data.badge ? "rgba(163,230,53,0.15)" : "rgba(255,255,255,0.05)",
            boxShadow: data.badge ? "0 0 25px rgba(163,230,53,0.08)" : undefined,
          }}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]) =>
                  `radial-gradient(600px circle at ${x}px ${y}px, ${data.badge ? "rgba(163,230,53,0.1)" : "rgba(75, 255, 255, 0.1)"}, transparent 40%)`,
              ),
            }}
          />
          <div className={`relative z-10 flex items-center gap-2 mb-3 flex-wrap ${isEven ? "md:justify-end" : ""}`}>
            <span className="inline-block px-3 py-1 text-xs font-medium text-brand-mint bg-brand-mint/10 rounded-full">
              {data.period}
            </span>
            {data.badge && (
              <span className="inline-block px-3 py-1 text-[10px] font-bold text-lime-400 bg-lime-400/10 border border-lime-400/25 rounded-full tracking-wider">
                {data.badge}
              </span>
            )}
          </div>
          <h3 className="relative z-10 text-xl font-bold text-white mb-1">
            {data.role}
          </h3>
          <p className="relative z-10 text-sm text-gray-400 mb-4">
            {data.company}
          </p>
          <p className="relative z-10 text-gray-300 leading-relaxed text-sm">
            {data.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
