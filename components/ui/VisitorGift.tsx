"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Download, X } from "lucide-react";

export default function VisitorGift() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setHasMounted(true);
    if (sessionStorage.getItem("visitor-gift-dismissed-v2") === "true") {
      setHasDismissed(true);
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.4 && !isVisible && !hasDismissed) {
      setIsVisible(true);
    }
  });

  const handleDismiss = () => {
    setIsVisible(false);
    setHasDismissed(true);
    sessionStorage.setItem("visitor-gift-dismissed-v2", "true");
  };

  if (!hasMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed z-[9999] bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 md:right-6 md:left-auto md:translate-x-0 w-[calc(100vw-40px)] md:w-[320px] p-5 rounded-2xl group"
          style={{
            background: "rgba(10, 10, 10, 0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Animated gradient border shimmer on hover */}
          <div className="absolute inset-0 rounded-2xl border border-transparent overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent translate-x-[100%] group-hover:-translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          </div>

          {/* Header Row */}
          <div className="flex justify-between items-start mb-4 relative z-10 w-full">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <span className="text-[12px] leading-none">🎁</span>
              <span className="text-[#a855f7] text-[10px] font-bold tracking-widest uppercase leading-none mt-[1px]">Free Gift</span>
            </div>

            <button
              onClick={handleDismiss}
              className="relative flex items-center justify-center w-6 h-6 text-gray-400 hover:text-white transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X size={14} className="relative z-10" />
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 24 24">
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.5"
                  initial={{ strokeDasharray: "62.8", strokeDashoffset: "0" }}
                  animate={{ strokeDashoffset: "62.8" }}
                  transition={{ duration: 3, ease: "linear" }}
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="relative z-10 mb-5 text-left">
            <h3 className="text-white text-[18px] font-semibold mb-1" style={{ fontFamily: "var(--font-syne, sans-serif)" }}>Crafted just for you.</h3>
            <p className="text-gray-400 text-[13px] leading-relaxed">
              Download my free UI Design Cheatsheet — principles I use on every project.
            </p>
          </div>

          {/* Actions */}
          <div className="relative z-10 flex flex-col gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleDismiss();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-[14px] hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(147,51,234,0.4)] cursor-pointer"
            >
              Download <Download size={16} />
            </a>
            
            <button
              onClick={handleDismiss}
              className="text-gray-600 text-[11px] hover:text-gray-400 transition-colors mx-auto cursor-pointer"
            >
              No thanks
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
