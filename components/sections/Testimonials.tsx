"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Helper components
const GlowingStar = ({ filled, delay }: { filled: boolean; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, delay }}
  >
    <Star
      className={`w-4 h-4 md:w-5 md:h-5 ${
        filled
          ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
          : "text-gray-700 fill-gray-800"
      }`}
    />
  </motion.div>
);

const reviews = [
  {
    name: "Client Lead",
    brand: "Draughtsmanstudio",
    rating: 5,
    text: "Exceptional design quality and attention to detail. Delivered beyond expectations.",
    logoKey: "D",
  },
  {
    name: "Amjath",
    brand: "Amjathtalks",
    rating: 5,
    text: "Creative, fast, and highly professional. The final output was outstanding.",
    logoKey: "A",
  },
  {
    name: "Founder",
    brand: "Dr Wagon",
    rating: 5,
    text: "Perfect blend of technology and design. Highly recommended for modern projects.",
    logoKey: "W",
  },
  {
    name: "Product Manager",
    brand: "Nexora Labs",
    rating: 5,
    text: "Innovative thinking and clean execution. Truly futuristic approach.",
    logoKey: "NL",
  },
  {
    name: "Tech Director",
    brand: "VisionGrid AI",
    rating: 5,
    text: "Understands AI design deeply. Delivered a powerful digital experience.",
    logoKey: "VG",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  // Background particles
  const [particles, setParticles] = useState<{ x: number; y: number; s: number; d: number; o: number }[] | null>(null);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 1,
        d: Math.random() * 10 + 10,
        o: Math.random() * 0.4 + 0.1,
      }))
    );
  }, []);

  return (
    <section className="relative w-full py-24 min-h-screen flex flex-col justify-center overflow-hidden bg-[#0f0f0f]">
      {/* ── Background Design ── */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#0f0f0f_70%)]">
        {/* Tech Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.4) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        
        {/* Floating Particles */}
        {particles?.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-mint"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, opacity: p.o }}
            animate={{ y: [0, -40, 0], opacity: [p.o, p.o * 2, p.o] }}
            transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 z-10 w-full flex flex-col items-center">
        {/* ── Section Title ── */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: "var(--font-orbitron)" }}>
            Trusted by Clients Worldwide
          </h2>
          <div className="relative inline-block">
            <p className="text-gray-400 text-sm md:text-lg tracking-widest uppercase font-light" style={{ fontFamily: "var(--font-exo2)" }}>
              Real feedback from real collaborations
            </p>
            {/* Minimal Underline animation */}
            <motion.div 
              className="absolute -bottom-3 left-0 h-[1px] bg-gradient-to-r from-transparent via-brand-mint/60 to-transparent w-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "circOut" }}
            />
          </div>
        </motion.div>

        {/* ── Carousel Container ── */}
        <div 
          className="relative w-full h-[450px] md:h-[350px] flex items-center justify-center perspective-[1200px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {reviews.map((review, i) => {
            // Calculate distance from active index, wrapping around
            const distance = (i - activeIndex + reviews.length) % reviews.length;
            let logicalOffset = distance;
            // Map [0, 1, 2, 3, 4] to [0, 1, 2, -2, -1] for centering
            if (logicalOffset > Math.floor(reviews.length / 2)) logicalOffset -= reviews.length;

            // Positioning logic
            const isCenter = logicalOffset === 0;
            const xOffset = isMobile ? logicalOffset * 105 : logicalOffset * 40; // Desktop spacing vs Mobile spacing
            const zOffset = Math.abs(logicalOffset) * -150;
            const scale = isCenter ? 1 : 0.85;
            const opacity = isCenter ? 1 : Math.max(1 - Math.abs(logicalOffset) * 0.4, 0);

            return (
              <motion.div
                key={i}
                className={`absolute w-full max-w-[320px] md:max-w-[400px] rounded-3xl p-8 overflow-hidden group transition-all duration-500
                  ${isCenter ? 'bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-30' : 'bg-transparent border-white/5 z-10 pointer-events-none opacity-40'}`}
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: isCenter ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'
                }}
                animate={{
                  x: `${xOffset}%`,
                  z: zOffset,
                  scale,
                  opacity,
                  rotateY: logicalOffset * -10, // Slight 3D rotation pointing inward
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={isCenter ? { 
                  y: -8,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 25px rgba(34,197,94,0.15)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(34,197,94,0.4)" // neon green subtle border
                } : {}}
              >
                {/* Floating Quote Icon */}
                <Quote className="absolute top-6 right-6 w-16 h-16 text-white/5 rotate-12 transition-transform duration-500 group-hover:scale-110" />

                {/* Light Reflection Sweep */}
                {isCenter && (
                  <motion.div 
                    className="absolute inset-0 w-full h-[100%] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-[150%] skew-x-[-20deg]"
                    animate={{ translateX: ["-150%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                  />
                )}

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  {/* Avatar / Logo Placeholder */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center shadow-inner group-hover:border-brand-mint/50 transition-colors duration-300">
                    <span className="text-xl font-bold text-gray-400 group-hover:text-brand-mint transition-colors" style={{ fontFamily: "var(--font-orbitron)" }}>
                      {review.logoKey}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">{review.name}</h4>
                    <p className="text-xs text-gray-400 font-mono tracking-widest">{review.brand}</p>
                  </div>
                </div>

                <div className="mb-6 relative z-10 flex">
                  {[...Array(5)].map((_, idx) => (
                    <GlowingStar key={idx} filled={idx < review.rating} delay={idx * 0.1} />
                  ))}
                </div>

                <p className="relative z-10 text-gray-300 italic text-sm md:text-base leading-relaxed font-light line-clamp-3">
                  &quot;{review.text}&quot;
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ── Navigation Arrows ── */}
        <div className="flex gap-4 mt-8 md:mt-12 z-20">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-brand-mint hover:shadow-[0_0_20px_rgba(152,255,152,0.4)] transition-all duration-300 backdrop-blur-md active:scale-95 bg-white/5"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-brand-mint hover:shadow-[0_0_20px_rgba(152,255,152,0.4)] transition-all duration-300 backdrop-blur-md active:scale-95 bg-white/5"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div 
          className="mt-20 md:mt-32 text-center flex flex-col items-center gap-6 z-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-700 font-light text-xl" style={{ fontFamily: "var(--font-exo2)" }}>
            Want to be my next success story?
          </p>
          <button 
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-10 py-4 font-bold text-black rounded-full overflow-hidden shadow-[0_0_20px_rgba(152,255,152,0.3)] hover:shadow-[0_0_40px_rgba(152,255,152,0.6)] transition-all duration-500 hover:scale-105 active:scale-95 bg-brand-mint"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay group-hover:animate-[pulse_1s_ease-in-out_infinite]" />
            
            {/* Pulsing glow animation background */}
            <motion.div 
              className="absolute inset-0 bg-white/20 mix-blend-overlay"
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-[150%] skew-x-[-20deg] group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
            <span className="relative z-10 tracking-widest uppercase text-sm">
              Work With Me
            </span>
          </button>

          <style>{`
            @keyframes sweep {
              0% { transform: translateX(-150%) skewX(-20deg); }
              100% { transform: translateX(200%) skewX(-20deg); }
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}
