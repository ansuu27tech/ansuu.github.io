"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

const DISMISS_KEY = "pixelmint-badge-dismissed";

export default function StudioBadge() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(true);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const wasDismissed = localStorage.getItem(DISMISS_KEY) === "true";
        if (wasDismissed) return;
        setDismissed(false);
        const timer = setTimeout(() => setVisible(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setVisible(false);
        localStorage.setItem(DISMISS_KEY, "true");
        setTimeout(() => setDismissed(true), 500);
    };

    if (dismissed) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-6 right-6 z-[90]"
                >
                    <a
                        href="https://pixelmint-studio-delta.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-500 cursor-pointer"
                        style={{
                            background: "rgba(10, 10, 10, 0.85)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset",
                        }}
                    >
                        {/* Logo */}
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                            <Image
                                src="/pixelmint-logo.jpg"
                                alt="PixelMint Studio MVS"
                                fill
                                className="object-cover"
                                sizes="32px"
                            />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col overflow-hidden">
                            <span
                                className="text-white text-xs font-bold tracking-wide whitespace-nowrap"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                PixelMint Studio MVS
                            </span>
                            <motion.span
                                initial={false}
                                animate={{
                                    height: hovered ? "auto" : 0,
                                    opacity: hovered ? 1 : 0,
                                    marginTop: hovered ? 2 : 0,
                                }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="text-lime-400 text-[11px] font-semibold whitespace-nowrap overflow-hidden"
                            >
                                Visit Studio{" "}
                                <span className="inline-block border-b border-lime-400/60">→</span>
                            </motion.span>
                        </div>

                        {/* Dismiss button */}
                        <button
                            onClick={handleDismiss}
                            className="ml-1 p-1 rounded-full text-white/30 hover:text-white/80 hover:bg-white/10 transition-all duration-200 flex-shrink-0"
                            aria-label="Dismiss"
                        >
                            <X size={12} />
                        </button>

                        {/* Subtle glow effect on hover */}
                        <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                                boxShadow: "0 0 30px rgba(163, 230, 53, 0.12), 0 0 60px rgba(163, 230, 53, 0.06)",
                            }}
                        />
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
