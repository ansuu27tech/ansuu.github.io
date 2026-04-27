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
                    <div key={index} className="group perspective-1000">
                        <motion.div
                            initial={{ opacity: 0, rotateX: 10, y: 20 }}
                            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.02,
                                rotateX: 5,
                                zIndex: 10,
                                boxShadow: "0 20px 40px -10px rgba(152, 255, 152, 0.1)"
                            }}
                            className="glass-panel p-8 rounded-xl h-full flex flex-col justify-between hover:border-brand-mint/40 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div>
                                <service.icon className="w-10 h-10 text-gray-400 mb-6 group-hover:text-brand-mint" />
                                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-light">{service.description}</p>
                            </div>

                            <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-widest text-brand-mint opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                Learn More
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
