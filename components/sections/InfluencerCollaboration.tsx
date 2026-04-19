"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const InfluencerCollaboration = () => {
    return (
        <section className="py-20 bg-[#0f0f0f] text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">

                <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-[#1a1a1a]/50 p-8 md:p-12 rounded-3xl border border-white/5 hover:border-red-500/20 transition-all duration-300 backdrop-blur-sm group"
                    >
                        {/* Logo Card */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative shrink-0"
                        >
                            {/* Fixed Square Container: 140px (mobile) / 200px (desktop) */}
                            <div className="w-[140px] h-[140px] md:w-[200px] md:h-[200px] bg-[#0f0f0f] rounded-[20px] flex items-center justify-center shadow-lg shadow-black/50 overflow-hidden relative border border-white/5">

                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                <div className="relative w-full h-full p-4"> {/* Transparent padding via p-4 */}
                                    <Image
                                        src="/amjath-talks.jpg" // Primary: Users JPG
                                        alt="Amjath Talks Logo"
                                        fill
                                        className="object-contain" // strict object-fit: contain
                                        sizes="(max-width: 768px) 140px, 200px"
                                        onError={(e) => {
                                            // Fallback to SVG if key not found
                                            const target = e.target as HTMLImageElement;
                                            target.srcset = "/amjath-talks.svg";
                                            target.src = "/amjath-talks.svg";
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left space-y-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold tracking-wide uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                YouTube Influencer Collaboration
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold font-outfit leading-tight">
                                Working With <span className="text-red-500">AmjathTalks</span> Channel
                            </h2>

                            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
                                Official Thumbnail Designer & Creative Partner – Creating Eye-Catching Thumbnails,
                                Reels Covers, Posters & Visual Branding.
                            </p>

                            <div className="pt-2">
                                <Link
                                    href="https://www.youtube.com/@AmjathTalks"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-red-600 hover:text-white transition-all duration-300 group/btn"
                                >
                                    Visit Channel
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default InfluencerCollaboration;
