"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  // Smart hide — show on scroll up, hide on scroll down
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrollingDown = latest > lastScrollY.current;
    const pastThreshold = latest > 100;

    // Always show nav when near top
    if (latest < 100) {
      setIsVisible(true);
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
      // Only toggle visibility if scroll delta is significant (>5px)
      if (Math.abs(latest - lastScrollY.current) > 5) {
        setIsVisible(!isScrollingDown || !pastThreshold);
      }
    }

    lastScrollY.current = latest;
  });

  // Active section tracking via Intersection Observer
  useEffect(() => {
    const sectionIds = ["about", "portfolio", "experience", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] safe-x"
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            isScrolled
              ? "mt-3 mx-4 md:mx-8 rounded-2xl bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
              : "bg-transparent"
          }`}
        >
          <nav className="flex items-center justify-between px-5 md:px-8 py-3.5 md:py-4">
            {/* Logo / Name */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-3 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="text-sm font-bold tracking-[0.15em] text-white uppercase"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                ANAS
              </span>
              <span className="hidden sm:inline-block w-[1px] h-4 bg-white/15" />
              <span className="hidden sm:inline-block text-[10px] tracking-[0.2em] text-white/40 uppercase font-medium">
                Portfolio
              </span>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-[13px] font-medium tracking-wide rounded-lg transition-colors duration-300 ${
                    activeSection === link.href
                      ? "text-white"
                      : "text-white/40 hover:text-white/80"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.label}
                  {/* Active indicator dot */}
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-mint"
                      style={{ boxShadow: "0 0 8px rgba(152, 255, 152, 0.5)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA */}
            <motion.a
              href="https://pixelmint-studio-delta.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2 text-xs font-bold tracking-wider uppercase text-black bg-brand-mint rounded-full hover:bg-white transition-colors duration-300 hover:shadow-[0_0_20px_rgba(152,255,152,0.3)]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Studio
              <ArrowUpRight size={12} strokeWidth={2.5} />
            </motion.a>

            {/* Mobile Hamburger */}
            <motion.button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white/60 hover:text-white transition-colors"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-[#030305]/98 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`text-3xl font-bold tracking-tight py-3 transition-colors ${
                    activeSection === link.href
                      ? "text-brand-mint"
                      : "text-white/60 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {link.label}
                </motion.button>
              ))}

              {/* Mobile CTA */}
              <motion.a
                href="https://pixelmint-studio-delta.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center gap-2 px-8 py-3.5 text-sm font-bold tracking-wider uppercase text-black bg-brand-mint rounded-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                PixelMint Studio MVS
                <ArrowUpRight size={14} />
              </motion.a>
            </nav>

            {/* Mobile close hint */}
            <motion.p
              className="absolute bottom-12 text-white/20 text-xs tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Tap to navigate
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
