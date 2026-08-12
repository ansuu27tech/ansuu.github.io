"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Mail, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-transparent text-white overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-brand-mint/5 blur-[100px] pointer-events-none z-0 rounded-t-full" />
            
            <div className="relative border-t border-white/5 pt-24 pb-12 overflow-hidden">
                <div className="max-w-6xl mx-auto text-center px-6 relative z-10 flex flex-col items-center">
                    
                    {/* Crafted With Love Display */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full flex justify-center mb-8"
                    >
                        <h2 
                            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-heading" 
                        >
                            Crafted with passion <span className="mx-1 md:mx-2 animate-pulse inline-block">❤️</span> by Anas.
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-[10px] md:text-xs font-mono tracking-widest text-brand-mint uppercase mb-12"
                    >
                        Digital Creator • Developer • Strategist
                    </motion.p>

                    {/* Small Glowing Icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex items-center justify-center gap-4 mb-16"
                    >
                        {[
                            { icon: Twitter, href: "https://x.com/anas_moham80856" },
                            { icon: Github, href: "https://github.com/ansuu27tech/ansuu.github.io" },
                            { icon: Instagram, href: "https://instagram.com/ansuu__._" },
                            { icon: Mail, href: "mailto:mohdanas53n@gmail.com" }
                        ].map((social, i) => (
                             <a key={i} href={social.href} target="_blank" rel="noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-brand-mint hover:bg-brand-mint/10 hover:border-brand-mint/30 hover:shadow-[0_0_20px_rgba(152,255,152,0.2)] transition-all duration-300">
                                <social.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </motion.div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                    <div className="text-center text-[10px] font-mono tracking-widest uppercase text-white/30 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 w-full">
                        <span>© {new Date().getFullYear()} N.Mohammed Anas</span>
                        <span className="hidden sm:inline">—</span>
                        <span>
                            <a
                                href="https://pixelmint-studio-delta.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/40 hover:text-brand-mint transition-colors duration-300"
                            >
                                PixelMint Studio MVS
                            </a>
                        </span>
                        <span className="hidden sm:inline">—</span>
                        <span>All Rights Reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
