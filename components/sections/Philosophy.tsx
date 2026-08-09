"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const quotes = [
  "THE MORE YOU LEARN, THE MORE YOU EARN.",
  "CREATE. LEARN. BUILD. REPEAT.",
  "DON'T FOLLOW THE FUTURE. BUILD IT.",
  "IDEAS ARE COMMON. EXECUTION IS RARE.",
  "DESIGN WITH PURPOSE. BUILD WITH PRECISION.",
  "TURN IDEAS INTO EXPERIENCES.",
  "CODE IS LOGIC. DESIGN IS EMOTION.",
  "VISION FIRST. EXECUTION ALWAYS.",
  "BUILD SOMETHING WORTH REMEMBERING."
];

const HIGHLIGHT_WORDS = ["BUILD", "EXECUTION", "PURPOSE", "EXPERIENCES", "EARN", "EMOTION", "REMEMBERING", "TRUST"];

export default function Philosophy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Auto-rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % quotes.length);
    }, 4000); // 4 seconds per quote

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
            className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          >
            {word}
          </span>
        );
      }
      return <span key={i}>{word}</span>;
    });
  };

  return (
    <section className="relative w-full min-h-[70vh] flex flex-col justify-center items-center bg-[#020202] text-white overflow-hidden py-24">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-mint/5 blur-[120px] rounded-full" />
      </div>

      {/* Header & Progress Indicator */}
      <div className="absolute top-8 md:top-12 w-full flex justify-between items-start px-6 md:px-12 pointer-events-none z-10">
        <h2 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-white/50">
          MINDSET / PHILOSOPHY
        </h2>
        <div className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-white/50 flex items-center gap-2">
          <span className="text-brand-mint font-bold">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-white/30">/</span>
          <span>{String(quotes.length).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Rotating Quote Block */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 flex justify-center text-center h-[200px] md:h-[300px] items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, filter: prefersReducedMotion ? "none" : "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20, filter: prefersReducedMotion ? "none" : "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute font-black uppercase tracking-tight text-[clamp(2rem,6vw,5rem)] leading-[1.1] text-white"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {renderHighlightedText(currentQuote)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-12 w-full max-w-xs mx-auto h-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          key={activeIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          className="h-full bg-gradient-to-r from-teal-400 to-cyan-500"
        />
      </div>
    </section>
  );
}
