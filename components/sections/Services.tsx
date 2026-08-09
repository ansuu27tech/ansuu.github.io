"use client";

import { motion } from "framer-motion";
import { Palette, Youtube, Instagram, MonitorSmartphone } from "lucide-react";
import SectionWrapper from "../ui/SectionWrapper";

const services = [
    {
        title: "Branding & Identity",
        description: "Complete visual identity systems that tell your brand&apos;s unique story.",
        icon: Palette,
    },
    {
        title: "Thumbnail Design",
        description: "High-CTR thumbnails designed to capture attention instantly.",
        icon: Youtube,
    },
    {
        title: "Social Media Creatives",
        description: "Engaging posts and stories for Instagram, LinkedIn, and Twitter.",
        icon: Instagram,
    },
    {
        title: "Digital Marketing",
        description: "Conversion-focused posters and ad creatives for your campaigns.",
        icon: MonitorSmartphone,
    },
];

export default function Services() {
    return (
        <SectionWrapper id="services" className="bg-transparent">
            <div className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-heading font-bold mb-4"
                >
                    My <span className="text-brand-mint">Services</span>
                </motion.h2>
                <div className="h-1 w-20 bg-brand-mint" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <div key={index} className="group" style={{ perspective: "1000px" }}>
                        <motion.div
                            initial={{ opacity: 0, rotateX: 10, y: 20 }}
                            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.02,
                                rotateX: 5,
                                y: -6,
                                zIndex: 10,
                                boxShadow: "0 20px 40px -10px rgba(152, 255, 152, 0.1)"
                            }}
                            className="glass-panel p-8 rounded-xl h-full flex flex-col justify-between hover:border-brand-mint/40 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Oversized index number */}
                            <span
                                className="absolute -top-2 -right-1 text-[5rem] font-black leading-none text-white/[0.02] select-none pointer-events-none group-hover:text-brand-mint/[0.06] transition-colors duration-700"
                                style={{ fontFamily: "var(--font-orbitron)" }}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* Shimmer sweep */}
                            <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(152,255,152,0.06), transparent)" }} />

                            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div>
                                <div className="relative w-10 h-10 mb-6 overflow-hidden">
                                    <service.icon className="w-10 h-10 text-gray-400 group-hover:text-brand-mint transition-colors duration-500 relative z-10" />
                                    {/* Icon glow effect on hover */}
                                    <div className="absolute inset-0 rounded-full bg-brand-mint/0 group-hover:bg-brand-mint/10 blur-lg transition-all duration-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-light">{service.description}</p>
                            </div>

                            <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-widest text-brand-mint opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                Learn More
                            </div>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-brand-mint/60 via-cyan-400/40 to-transparent transition-all duration-700 ease-out" />
                        </motion.div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
