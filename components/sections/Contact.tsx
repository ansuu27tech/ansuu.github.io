"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Instagram, Twitter, Mail, CheckCircle, Github } from "lucide-react";
import SectionWrapper from "../ui/SectionWrapper";
import confetti from "canvas-confetti";

export default function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        projectType: "Website Design",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "4190740d-1d52-403a-b128-2e3e1c0b0ab1",
                    subject: `New Inquiry from ${formData.name}`,
                    from_name: formData.name,
                    ...formData
                }),
            });

            const result = await response.json();
            if (result.success) {
                setSubmitStatus("success");
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    projectType: "Website Design",
                });
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#00ffb2', '#ffffff', '#222222']
                });
            } else {
                setSubmitStatus("error");
            }
        } catch {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="bg-transparent text-white overflow-hidden relative">
            <SectionWrapper id="contact" className="py-32">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-12 leading-tight"
                    >
                        Let’s Build <br />
                        Something <br />
                        <span className="text-gradient">That Stands Out.</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-2xl mx-auto mb-20 p-8 md:p-12 rounded-3xl bg-[#0d0d0d] border border-white/10 shadow-2xl relative overflow-hidden text-left"
                    >
                        {/* Subtle background glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-mint/5 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none" />
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Get in Touch</h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm text-gray-400 uppercase tracking-wider ml-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border border-white/10 focus:border-brand-mint focus:bg-white/5 focus:shadow-[0_0_20px_rgba(152,255,152,0.2),inset_0_0_10px_rgba(152,255,152,0.05)] text-white rounded-xl px-5 py-4 outline-none transition-all duration-500 placeholder:text-gray-500"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="phone" className="text-sm text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border border-white/10 focus:border-brand-mint focus:bg-white/5 focus:shadow-[0_0_20px_rgba(152,255,152,0.2),inset_0_0_10px_rgba(152,255,152,0.05)] text-white rounded-xl px-5 py-4 outline-none transition-all duration-500 placeholder:text-gray-500"
                                        placeholder="+1 (234) 567-8900"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border border-white/10 focus:border-brand-mint focus:bg-white/5 focus:shadow-[0_0_20px_rgba(152,255,152,0.2),inset_0_0_10px_rgba(152,255,152,0.05)] text-white rounded-xl px-5 py-4 outline-none transition-all duration-500 placeholder:text-gray-500"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="projectType" className="text-sm text-gray-400 uppercase tracking-wider ml-1">Project Type</label>
                                    <select
                                        id="projectType"
                                        name="projectType"
                                        required
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        className="w-full bg-[#111] border border-white/10 focus:border-brand-mint focus:bg-white/5 focus:shadow-[0_0_20px_rgba(152,255,152,0.2),inset_0_0_10px_rgba(152,255,152,0.05)] text-white rounded-xl px-5 py-4 outline-none transition-all duration-500 appearance-none cursor-pointer placeholder:text-gray-500 [&>option]:bg-[#1a1a1a] [&>option]:text-white"
                                    >
                                        <option value="Website Design">Website Design</option>
                                        <option value="Website Development">Website Development</option>
                                        <option value="Logo Design">Logo Design</option>
                                        <option value="Branding">Branding</option>
                                        <option value="Social Media">Social Media</option>
                                        <option value="Digital Marketing">Digital Marketing</option>
                                        <option value="Custom Project">Custom Project</option>
                                        <option value="Poster">Poster</option>
                                        <option value="Thumbnail">Thumbnail</option>
                                        <option value="UI & UX">UI & UX</option>
                                        <option value="Portfolio">Portfolio</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>


                            <div className="flex flex-col justify-center items-center mt-6 h-32 relative">
                                <AnimatePresence mode="wait">
                                    {submitStatus !== "success" ? (
                                        <motion.button
                                            key="submit-btn"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="group w-full md:w-auto px-12 py-4 rounded-full bg-brand-mint text-black font-bold text-lg disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer relative overflow-hidden absolute"
                                            style={{ boxShadow: "0 0 20px rgba(152,255,152,0.2)" }}
                                        >
                                            <span className={isSubmitting ? "opacity-0" : "opacity-100 transition-opacity"}>Submit Request</span>
                                            <ArrowUpRight className={`w-5 h-5 transition-transform ${isSubmitting ? "opacity-0" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} />

                                            {isSubmitting && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                                </div>
                                            )}
                                        </motion.button>
                                    ) : (
                                        <motion.div
                                            key="success-msg"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center absolute w-full"
                                        >
                                            <div className="w-16 h-16 bg-brand-mint/20 rounded-full flex items-center justify-center mb-4">
                                                <CheckCircle className="w-8 h-8 text-brand-mint" />
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-2">Thank you!</h4>
                                            <p className="text-gray-600 text-center text-sm max-w-[250px]">
                                                Your request has been received. I&apos;ll get back to you shortly.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {submitStatus === "error" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 mt-4 text-sm font-medium absolute -bottom-6"
                                    >
                                        Something went wrong. Please try again.
                                    </motion.p>
                                )}
                            </div>
                        </form>
                    </motion.div>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 md:gap-6 pt-12 w-full">
                        {/* Social Link Card */}
                        {[
                            { href: "https://instagram.com/ansuu__._", icon: Instagram, label: "Personal", handle: "@ansuu__._", accent: false },
                            { href: "https://instagram.com/_pixelmint_studio", icon: Instagram, label: "Studio", handle: "@_pixelmint_studio", accent: false },
                            { href: "mailto:mohdanas53n@gmail.com", icon: Mail, label: "Email", handle: "mohdanas53n@gmail.com", accent: false },
                            { href: "https://x.com/anas_moham80856", icon: Twitter, label: "X Profile", handle: "@anas_moham80856", accent: false },
                            { href: "https://github.com/ansuu27tech/ansuu.github.io", icon: Github, label: "GitHub", handle: "@ansuu27tech", accent: false },
                            { href: "https://pixelmint-studio-delta.vercel.app", icon: ArrowUpRight, label: "Studio", handle: "Pixelmint Studio", accent: true },
                        ].map((link, idx) => (
                            <motion.a
                                key={idx}
                                href={link.href}
                                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -4, borderColor: link.accent ? "rgba(163,230,53,0.4)" : "rgba(152,255,152,0.3)" }}
                                className={`group p-6 md:p-8 rounded-2xl border ${
                                    link.accent
                                        ? "border-lime-400/20 bg-lime-400/5 hover:bg-lime-400/10 hover:shadow-[0_0_25px_rgba(163,230,53,0.15)]"
                                        : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-mint/30"
                                } transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center overflow-hidden relative`}
                            >
                                {/* Shimmer sweep */}
                                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(152,255,152,0.06), transparent)" }} />

                                <div className={`w-12 h-12 rounded-full ${link.accent ? "bg-lime-400/10 text-lime-400" : "bg-white/5 text-brand-mint"} flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(152,255,152,0.3)] transition-all duration-300`}>
                                    <link.icon className="w-6 h-6" />
                                </div>
                                <div className="w-full">
                                    <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-1 line-clamp-1">{link.label}</h3>
                                    <p className={`text-sm md:text-base lg:text-lg font-medium text-white ${link.accent ? "group-hover:text-lime-400" : "group-hover:text-brand-mint"} transition-colors break-words [word-break:break-word]`}>{link.handle}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Gradient Noise Background */}
                <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-brand-mint/10 to-transparent pointer-events-none" />
                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-900/20 to-transparent blur-[100px] pointer-events-none" />
            </SectionWrapper>

            {/* Personal Signature Section */}
            <div className="relative border-t border-white/5 pt-20 pb-16 overflow-hidden">
                {/* Subtle top glowing divider line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 max-w-lg h-[1px] bg-gradient-to-r from-transparent via-brand-mint/40 to-transparent shadow-[0_0_15px_rgba(152,255,152,0.5)]" />

                <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white"
                    >
                        Let’s Build Something <span className="text-brand-mint drop-shadow-[0_0_15px_rgba(152,255,152,0.3)]">Amazing</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 text-lg mb-8"
                    >
                        Open to collaborations, creative projects, and innovative ideas.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xs md:text-sm font-medium tracking-[0.2em] text-white/50 uppercase mb-12"
                    >
                        Digital Creator • Developer • Marketing Strategist
                    </motion.p>

                    {/* Small Glowing Icons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-6 mb-16"
                    >
                        <a href="https://x.com/anas_moham80856" target="_blank" aria-label="X Profile" className="p-3.5 rounded-full bg-white/5 text-gray-400 hover:text-brand-mint hover:bg-black/10 hover:shadow-[0_0_20px_rgba(152,255,152,0.4)] hover:-translate-y-1 transition-all duration-300">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="https://github.com/ansuu27tech/ansuu.github.io" target="_blank" aria-label="GitHub Profile" className="p-3.5 rounded-full bg-white/5 text-gray-400 hover:text-brand-mint hover:bg-black/10 hover:shadow-[0_0_20px_rgba(152,255,152,0.4)] hover:-translate-y-1 transition-all duration-300">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://instagram.com/ansuu__._" target="_blank" aria-label="Instagram Profile" className="p-3.5 rounded-full bg-white/5 text-gray-400 hover:text-brand-mint hover:bg-black/10 hover:shadow-[0_0_20px_rgba(152,255,152,0.4)] hover:-translate-y-1 transition-all duration-300">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="mailto:mohdanas53n@gmail.com" aria-label="Email Address" className="p-3.5 rounded-full bg-white/5 text-gray-400 hover:text-brand-mint hover:bg-black/10 hover:shadow-[0_0_20px_rgba(152,255,152,0.4)] hover:-translate-y-1 transition-all duration-300">
                            <Mail className="w-5 h-5" />
                        </a>
                    </motion.div>

                    {/* Animated "Crafted with passion" text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <p className="inline-block relative text-brand-mint/80 font-medium text-lg tracking-wide hover:text-brand-mint transition-colors duration-300 cursor-default">
                            Crafted with passion by Anas
                            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-brand-mint/50 scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100" />
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="text-center py-6 text-xs text-gray-600 border-t border-white/5">
                © {new Date().getFullYear()}{" "}
                <a
                    href="https://pixelmint-studio-delta.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime-400/60 hover:text-lime-400 transition-colors duration-300"
                >
                    Pixelmint Studio
                </a>
                . All Rights Reserved.
            </div>
        </footer>
    );
}
