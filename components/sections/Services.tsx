"use client";

import { motion } from "framer-motion";
import { Palette, Youtube, Instagram, MonitorSmartphone, ArrowUpRight } from "lucide-react";
import SectionWrapper from "../ui/SectionWrapper";

const services = [
    {
        title: "Branding & Identity",
        description: "Complete visual identity systems that tell your brand's unique story and establish instant market presence.",
        icon: Palette,
    },
    {
        title: "Digital Marketing",
        description: "Conversion-focused posters, ad creatives, and strategic campaigns that drive measurable growth.",
        icon: MonitorSmartphone,
    },
    {
        title: "Social Media Creatives",
        description: "Engaging, high-retention posts and stories tailored for Instagram, LinkedIn, and X.",
        icon: Instagram,
    },
    {
        title: "Thumbnail Design",
        description: "High-CTR thumbnails designed with color theory and psychology to capture attention instantly.",
        icon: Youtube,
    },
];

export default function Services() {
    return (
        <SectionWrapper id="services" className="bg-transparent">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                    <div className="label-section mb-6">
                        <span className="label-number">09</span>
                        <span>/</span>
                        <span>SERVICES</span>
                    </div>
                    <h2 className="heading-editorial text-4xl md:text-5xl lg:text-[4rem]">
                        Creative <span className="text-white/30">Arsenal.</span>
                    </h2>
                </div>
                <p className="body-refined max-w-sm">
                    Strategic design solutions engineered for attention, retention, and conversion.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <div key={index} className="group" style={{ perspective: "1000px" }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="glass-panel-premium p-8 rounded-2xl h-full flex flex-col justify-between hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group"
                        >
                            {/* Oversized index number */}
                            <span
                                className="absolute -top-4 -right-2 text-[6rem] font-heading font-bold leading-none text-white/[0.02] select-none pointer-events-none group-hover:text-brand-mint/[0.05] transition-colors duration-700"
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* Shimmer sweep */}
                            <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(152,255,152,0.06), transparent)" }} />

                            <div className="absolute inset-0 bg-gradient-to-br from-[#050505] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="relative w-12 h-12 mb-8 overflow-hidden rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-mint/10 group-hover:border-brand-mint/30 transition-all duration-500">
                                    <service.icon className="w-5 h-5 text-white/40 group-hover:text-brand-mint transition-colors duration-500" />
                                </div>
                                <h3 className="text-xl font-heading font-bold mb-3 text-white group-hover:text-brand-mint transition-colors duration-300">{service.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed font-light">{service.description}</p>
                            </div>

                            <div className="relative z-10 mt-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-mint opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                Explore <ArrowUpRight className="w-3 h-3" />
                            </div>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-brand-mint/40 transition-all duration-700 ease-out" />
                        </motion.div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
