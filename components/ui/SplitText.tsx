"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // per element delay in ms
  duration?: number; // in seconds
  ease?: string | number[];
  splitType?: "chars" | "words";
  from?: { opacity?: number; y?: number; x?: number };
  to?: { opacity?: number; y?: number; x?: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "easeOut",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  showCallback = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Map common GSAP easings to Framer Motion
  const resolvedEase = ease === "power3.out" ? [0.215, 0.61, 0.355, 1] : ease;

  const isInView = useInView(containerRef, {
    once: true,
    amount: threshold,
    margin: rootMargin as any,
  });

  const elements = splitType === "chars" ? text.split("") : text.split(" ");
  
  const handleComplete = (idx: number) => {
    if (showCallback && onLetterAnimationComplete && idx === elements.length - 1) {
      onLetterAnimationComplete();
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ textAlign, display: "block" }}
    >
      <motion.div aria-label={text} className="inline-block">
        {elements.map((element, idx) => {
          // If splitType is words, we need to add spaces back
          const isSpace = element === " ";
          const content = splitType === "words" ? `${element}\u00A0` : element;
          
          return (
            <motion.span
              key={idx}
              aria-hidden="true"
              initial={from}
              animate={isInView ? to : from}
              transition={{
                duration: duration,
                ease: resolvedEase as any,
                delay: (delay * idx) / 1000,
              }}
              onAnimationComplete={() => handleComplete(idx)}
              style={{
                display: "inline-block",
                whiteSpace: "pre",
              }}
            >
              {content}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}
