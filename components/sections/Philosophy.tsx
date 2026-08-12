"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Reduced to the absolute best, most impactful statements
const quotes = [
  "DESIGN WITH PURPOSE. BUILD WITH PRECISION.",
  "CLARITY BEFORE CREATIVITY.",
  "IDEAS ARE COMMON. EXECUTION IS RARE.",
  "BUILD SOMETHING WORTH REMEMBERING."
];

const HIGHLIGHT_WORDS = ["BUILD", "EXECUTION", "PURPOSE", "PRECISION", "CLARITY", "REMEMBERING"];

export default function Philosophy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Auto-rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % quotes.length);
    }, 4500); // Slightly slower for better reading pace

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[activeIndex];

  // Helper to render text with highlighted words
  const renderHighlightedText = (text: string) => {
    return text.split(/(\s+)/).map((word, i) => {
      const cleanWord = word.replace(/[^\w]/g, "").toUpperCase();
      if (HIGHLIGHT_WORDS.includes(cleanWord)) {
        return (
          <span
            key={i}
            className="text-brand-mint drop-shadow-[0_0_15px_rgba(152,255,152,0.3)]"
          >
            {word}
          </span>
        );
      }
      return <span key={i}>{word}</span>;
    });
  };

  return (
    <section className="relative w-full min-h-[60vh] flex flex-col justify-center items-center bg-transparent text-white overflow-hidden py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Uses the global CSS grain-overlay instead of external image fetch */}
        <div className="absolute inset-0 grain-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-mint/5 blur-[120px] rounded-full" />
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-12 w-full flex justify-center items-center px-6 pointer-events-none z-10">
        <div className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-white/40 flex items-center gap-3">
          <span className="text-brand-mint font-bold">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="w-8 h-[1px] bg-white/20" />
          <span>{String(quotes.length).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Rotating Quote Block */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 flex justify-center text-center items-center py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, filter: prefersReducedMotion ? "none" : "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20, filter: prefersReducedMotion ? "none" : "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="heading-display text-[clamp(2.5rem,6vw,5.5rem)] uppercase"
          >
            {renderHighlightedText(currentQuote)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-12 w-full max-w-xs mx-auto h-[1px] bg-white/10 overflow-hidden">
        <motion.div
          key={activeIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.5, ease: "linear" }}
          className="h-full bg-brand-mint/60"
        />
      </div>
    </section>
  );
}
