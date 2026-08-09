"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  baseOpacity?: number;
  enableBlur?: boolean;
  blurStrength?: number;
  baseRotation?: number;
  baseTranslateY?: number;
  accentWords?: string[];
}

export default function ScrollReveal({
  children,
  className = "",
  baseOpacity = 0.05,
  enableBlur = true,
  blurStrength = 8,
  baseRotation = 3,
  baseTranslateY = 40,
  accentWords = [],
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Split text into words manually or rely on child nodes if it's simple text
    // Assuming children is a string for simplicity based on React Bits usage
    const text = typeof children === "string" ? children : "";
    if (!text) return;

    const words = text.split(/(\s+)/); // Preserve spaces
    containerRef.current.innerHTML = "";

    const wordElements: HTMLElement[] = [];

    words.forEach((word) => {
      if (word.trim() === "") {
        // Just append space
        containerRef.current!.appendChild(document.createTextNode(word));
      } else {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.opacity = baseOpacity.toString();
        span.style.willChange = "opacity, transform, filter";
        
        // Strip punctuation for matching
        const cleanWord = word.replace(/[^\w]/g, "").toUpperCase();
        if (accentWords.includes(cleanWord)) {
          span.className = "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]";
        }
        
        if (enableBlur) {
          span.style.filter = `blur(${blurStrength}px)`;
        }
        span.style.transform = `translateY(${baseTranslateY}px) rotate(${baseRotation}deg)`;
        
        containerRef.current!.appendChild(span);
        wordElements.push(span);
      }
    });

    const ctx = gsap.context(() => {
      wordElements.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          filter: enableBlur ? "blur(0px)" : "none",
          y: 0,
          rotation: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // Starts revealing when word is 85% down the viewport
            end: "top 40%",   // Finishes revealing when it reaches 40% down
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [children, baseOpacity, enableBlur, blurStrength, baseRotation, baseTranslateY]);

  return (
    <div
      ref={containerRef}
      className={className}
      // If children is not a string, we just render it directly (fallback)
    >
      {typeof children !== "string" ? children : null}
    </div>
  );
}
