"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GlobalParallaxText({ 
  text = "DESIGN • EXPLORE • CRÈATE", 
  velocity = 1.0 
}: { 
  text?: string; 
  velocity?: number; 
}) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Non-synchronous state update to satisfy strict render-cascading rules
    const timeout = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll(); // Use global scroll, not container

  const xMovement = useTransform(scrollYProgress, [0, 1], ["0%", `-${velocity * 100}%`]);

  if (!isClient) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 top-[20%] z-0 flex whitespace-nowrap overflow-hidden pointer-events-none mix-blend-screen opacity-[0.04] select-none">
      <motion.div 
        className="flex"
        style={{ x: xMovement }}
      >
        <span className="text-[15rem] font-black uppercase tracking-[-0.04em] text-white whitespace-nowrap" style={{ fontFamily: "var(--font-orbitron)" }}>
          {text} &nbsp; {text} &nbsp; {text} &nbsp; {text}
        </span>
      </motion.div>
    </div>
  );
}
