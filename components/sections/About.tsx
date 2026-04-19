"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import SectionWrapper from "../ui/SectionWrapper";




import { SiPython, SiHtml5, SiCss, SiJavascript, SiReact, SiFigma } from "react-icons/si";
import { FaBrain, FaRobot, FaPalette, FaLayerGroup, FaVideo, FaInstagram, FaProjectDiagram, FaTools, FaCrown, FaInfinity } from "react-icons/fa";

const radialStats = [
    { num: "10+", label: "Projects Built", icon: FaProjectDiagram, percent: 90 },
    { num: "5+", label: "Core Skills", icon: FaTools, percent: 85 },
    { num: "1", label: "MindStacked", icon: FaCrown, percent: 100 },
    { num: "∞", label: "Learning Mindset", icon: FaInfinity, percent: 95 },
];

const skills = [
    { label: "Python", percentage: 85, icon: SiPython },
    { label: "Machine Learning", percentage: 75, icon: FaBrain },
    { label: "AI & Automation", percentage: 80, icon: FaRobot },
    { label: "HTML", percentage: 90, icon: SiHtml5 },
    { label: "CSS", percentage: 85, icon: SiCss },
    { label: "JavaScript", percentage: 70, icon: SiJavascript },
    { label: "React", percentage: 65, icon: SiReact },
    { label: "Graphic Design", percentage: 85, icon: FaPalette },
    { label: "UI/UX Design", percentage: 75, icon: SiFigma },
    { label: "Branding", percentage: 80, icon: FaLayerGroup },
    { label: "Content Creation", percentage: 85, icon: FaVideo },
    { label: "Social Media Strategy", percentage: 80, icon: FaInstagram },
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <SectionWrapper id="about" className="overflow-hidden bg-[#050505]">
            {/* Background Typography — CSS-only drift, no JS on scroll */}
            <div className="absolute top-20 left-0 w-full overflow-hidden opacity-5 select-none pointer-events-none z-0">
                <div
                    className="whitespace-nowrap about-bg-text"
                    style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                >
                    <span className="text-[20vw] font-bold font-heading leading-none">
                        ANAS PIXELMINT ANAS PIXELMINT
                    </span>
                </div>
            </div>

            <div ref={containerRef} className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-start lg:mt-8">
                {/* Left Side: Image & Highlights */}
                <div className="flex flex-col gap-10 w-full max-w-md mx-auto">
                    <motion.div
                        className="relative aspect-[3/4] w-full"
                        initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                        animate={isInView ? { opacity: 1, clipPath: "inset(0 0 0 0)" } : {}}
                        transition={{ duration: 1, ease: "circOut" }}
                    >
                        <div className="absolute inset-0 bg-brand-mint/20 -translate-x-4 translate-y-4 rounded-xl" />
                        <Image
                            src="/about-profile.jpg"
                            alt="Anas - Pixelmint Studio"
                            fill
                            className="object-cover rounded-xl filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>

                    {/* Radial Stats 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-5">
                        {radialStats.map((stat, idx) => (
                            <RadialStat key={idx} {...stat} delay={0.2 + idx * 0.1} />
                        ))}
                    </div>
                </div>

                {/* Text Side */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                            About <span className="text-brand-mint">Me.</span>
                        </h2>

                        <p className="text-xl font-medium text-white mb-6">
                            &quot;Blending AI thinking with clean design to build ideas that stand out.&quot;
                        </p>

                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            I am a B.Tech Artificial Intelligence & Data Science student with a passion for building meaningful digital products.
                            My approach combines logical problem-solving with creative design to engineer solutions that are both functional and visually compelling.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed mb-10">
                            With a strong focus on frontend development, automation, and creative tech, I bridge the gap between complex algorithms and intuitive user experiences.
                        </p>

                        {/* Skills Section */}
                        <div className="pt-4">
                            <div className="mb-6">
                                <h3 className="text-3xl font-bold text-white mb-2">Skills & Expertise</h3>
                                <div className="w-12 h-1 bg-cyan-400 rounded-full drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {skills.map((s, idx) => (
                                    <SkillCard key={s.label} label={s.label} percentage={s.percentage} icon={s.icon} delay={idx * 0.15} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}

interface IconProps { className?: string; }
const SkillCard = ({ label, percentage, icon: Icon, delay }: { label: string; percentage: number; icon: React.ComponentType<IconProps>; delay: number }) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className="flex items-center justify-between p-3 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl border-l-2 border-l-cyan-400 group hover:bg-white/10 transition-all duration-300 shadow-xl shadow-black/20"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-cyan-400/30 transition-colors">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <span className="font-semibold text-gray-200 group-hover:text-white transition-colors text-sm">{label}</span>
            </div>
            
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-black/50 rounded-full border border-white/5" />
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="20" cy="20" r={radius} fill="none" stroke="transparent" />
                    <motion.circle
                        cx="20" cy="20" r={radius} fill="none"
                        stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round"
                        className="drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
                        style={{ strokeDasharray: circumference }}
                    />
                </svg>
                <span className="relative z-10 text-[0.65rem] font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                    {percentage}
                </span>
            </div>
        </motion.div>
    );
};

const RadialStat = ({ num, label, icon: Icon, percent, delay }: { num: string; label: string; icon: React.ComponentType<IconProps>; percent: number; delay: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const radius = 46; 
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = isInView ? circumference - (percent / 100) * circumference : circumference;
    const gradId = `grad-${num.replace('+', '')}-${label.replace(/\s+/g,'')}`;

    return (
        <div ref={ref} className="group relative flex flex-col items-center justify-center p-2 transition-all duration-500 hover:scale-[1.05]">
            <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                {/* Background Track */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="56" cy="56" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                </svg>

                {/* Animated Gradient Stroke */}
                <motion.svg 
                    className="absolute inset-0 w-full h-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                    <defs>
                        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                    <motion.circle 
                        cx="56" cy="56" r={radius} fill="none" 
                        stroke={`url(#${gradId})`} strokeWidth="4" strokeLinecap="round"
                        className="drop-shadow-[0_0_12px_rgba(34,197,94,0.4)] opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_20px_rgba(34,197,94,0.7)] transition-all duration-300"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
                        style={{ strokeDasharray: circumference, transformOrigin: '56px 56px', rotate: '-90deg' }}
                    />
                </motion.svg>
                
                {/* Inner Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors duration-300 mb-0.5" />
                    <span className="text-3xl font-black text-white drop-shadow-md">
                        {num}
                    </span>
                </div>
            </div>
            
            {/* Label below */}
            <span className="text-xs tracking-widest text-[#a1a1aa] font-bold uppercase text-center group-hover:text-white transition-colors duration-300">
                {label}
            </span>
        </div>
    );
};
