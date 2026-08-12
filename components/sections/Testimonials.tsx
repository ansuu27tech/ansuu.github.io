"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionWrapper from "../ui/SectionWrapper";

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
          ? "text-brand-mint fill-brand-mint drop-shadow-[0_0_8px_rgba(152,255,152,0.8)]"
          : "text-white/10 fill-white/10"
      }`}
    />
  </motion.div>
);

const reviews = [
  {
    name: "Client Lead",
    brand: "Draughtman Studio",
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
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <SectionWrapper id="testimonials" className="bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto z-10 w-full flex flex-col items-center">
        {/* ── Section Title ── */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="label-section mb-6"
          >
             <span className="label-number">07</span>
             <span>/</span>
             <span>TESTIMONIALS</span>
          </motion.div>

          <div className="overflow-hidden pb-2">
            <motion.h2 
              initial={{ opacity: 0, y: "100%", rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="heading-editorial text-4xl md:text-5xl lg:text-6xl mb-4 text-center origin-bottom-left"
            >
              Trusted by Clients <br/><span className="text-brand-mint">Worldwide.</span>
            </motion.h2>
          </div>
          
          <motion.div
             initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
             whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="body-refined max-w-sm text-center">
              Real feedback from collaborations that focus on pushing boundaries and delivering quality.
            </p>
          </motion.div>
        </div>

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
            const xOffset = isMobile ? logicalOffset * 105 : logicalOffset * 40; 
            const zOffset = Math.abs(logicalOffset) * -200;
            const scale = isCenter ? 1 : 0.85;
            const opacity = isCenter ? 1 : Math.max(1 - Math.abs(logicalOffset) * 0.5, 0);
            const blur = isCenter ? 0 : Math.abs(logicalOffset) * 4;

            return (
              <motion.div
                key={i}
                className={`absolute w-full max-w-[320px] md:max-w-[400px] rounded-3xl p-8 overflow-hidden group transition-all duration-700
                  ${isCenter ? 'bg-white/[0.03] backdrop-blur-md shadow-2xl z-30' : 'bg-transparent border-white/5 z-10 pointer-events-none opacity-40'}`}
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
                  rotateY: logicalOffset * -15, // Deep 3D rotation pointing inward
                  filter: `blur(${blur}px)` // Cinematic depth of field
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={isCenter ? { 
                  y: -8,
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(152,255,152,0.3)",
                  backgroundColor: "rgba(255,255,255,0.05)",
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
                  <div className="w-14 h-14 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center shadow-inner group-hover:border-brand-mint/50 transition-colors duration-300">
                    <span className="text-xl font-heading font-bold text-white/40 group-hover:text-brand-mint transition-colors">
                      {review.logoKey}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-white group-hover:text-brand-mint transition-colors">{review.name}</h4>
                    <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">{review.brand}</p>
                  </div>
                </div>

                <div className="mb-6 relative z-10 flex">
                  {[...Array(5)].map((_, idx) => (
                    <GlowingStar key={idx} filled={idx < review.rating} delay={idx * 0.1} />
                  ))}
                </div>

                <p className="relative z-10 text-white/60 text-sm md:text-base leading-relaxed font-light line-clamp-3">
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
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-brand-mint hover:bg-brand-mint/5 hover:shadow-[0_0_20px_rgba(152,255,152,0.2)] transition-all duration-300 backdrop-blur-md active:scale-95 bg-white/[0.02]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-brand-mint hover:bg-brand-mint/5 hover:shadow-[0_0_20px_rgba(152,255,152,0.2)] transition-all duration-300 backdrop-blur-md active:scale-95 bg-white/[0.02]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </SectionWrapper>
  );
}
