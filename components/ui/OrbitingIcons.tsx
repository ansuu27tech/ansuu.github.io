"use client";

import { useEffect, useState } from "react";
import {
    SiFigma,
    SiPython,
    SiReact,
    SiNextdotjs,
    SiGithub,
    SiTailwindcss,
} from "react-icons/si";

/* ─────────────────────────────────────────────────────────
   Premium, elliptical orbiting icons that sit BEHIND the face.
   Minimalistic, subtle styling with a highlighted primary icon.
   ───────────────────────────────────────────────────────── */

const ICONS = [
    { id: 1, Icon: SiReact,      color: "#61DAFB", startAngle: 0,   isHighlight: true },
    { id: 2, Icon: SiNextdotjs,  color: "#ffffff", startAngle: 60,  isHighlight: false },
    { id: 3, Icon: SiPython,     color: "#3776AB", startAngle: 120, isHighlight: false },
    { id: 4, Icon: SiFigma,      color: "#F24E1E", startAngle: 180, isHighlight: false },
    { id: 5, Icon: SiTailwindcss,color: "#06B6D4", startAngle: 240, isHighlight: false },
    { id: 6, Icon: SiGithub,     color: "#ffffff", startAngle: 300, isHighlight: false },
];

type IconItem = typeof ICONS[0];

function OrbitIcon({ item, isMobile, loopDuration }: { item: IconItem, isMobile: boolean, loopDuration: number }) {
    const [isHovered, setIsHovered] = useState(false);
    
    // Elliptical boundary: guarantees orbit sits strictly outside the face area
    const radiusX = isMobile ? 150 : 220; 
    const radiusY = isMobile ? 190 : 270; 
    
    const steps = 60;
    let keyframes = `@keyframes orbit-path-${item.id} {`;
    for (let i = 0; i <= steps; i++) {
        const percent = (i / steps) * 100;
        const currentAngle = item.startAngle - (i / steps) * 360; 
        const rad = currentAngle * (Math.PI / 180);
        const x = Math.cos(rad) * radiusX;
        const y = Math.sin(rad) * radiusY;
        
        // Added subtle floaty wobble motion on the Y-axis
        const floatOffset = Math.sin((i / steps) * Math.PI * 6) * 15;
        
        keyframes += `${percent}% { transform: translate(${x}px, ${y + floatOffset}px); }`;
    }
    keyframes += `}`;

    const sizeClass = item.isHighlight 
        ? "w-12 h-12 md:w-14 md:h-14" 
        : "w-8 h-8 md:w-10 md:h-10";

    const baseBoxShadow = item.isHighlight ? `0 0 25px ${item.color}30, inset 0 0 10px ${item.color}20` : `none`;
    const hoverBoxShadow = `0 0 30px ${item.color}60, inset 0 0 15px ${item.color}40`;

    const iconSize = isMobile ? (item.isHighlight ? 22 : 16) : (item.isHighlight ? 28 : 20);

    return (
        <div
            className="absolute flex items-center justify-center pointer-events-auto"
            style={{
                animation: `orbit-path-${item.id} ${loopDuration}s linear infinite`,
                animationPlayState: isHovered ? "paused" : "running",
                zIndex: isHovered ? 30 : (item.isHighlight ? 25 : 20)
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`rounded-full flex items-center justify-center transition-all duration-300 ease-out 
                    ${item.isHighlight ? 'border border-white/20' : 'border border-white/5 backdrop-blur-[2px]'}
                    ${sizeClass}`}
                style={{
                    backgroundColor: isHovered ? "rgba(0,0,0,0.9)" : (item.isHighlight ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.4)"),
                    boxShadow: isHovered ? hoverBoxShadow : baseBoxShadow,
                    opacity: isHovered ? 1 : (item.isHighlight ? 0.95 : 0.65),
                    filter: isHovered || item.isHighlight ? "blur(0px)" : "blur(2px)",
                    transform: isHovered ? "scale(1.25)" : "scale(1)"
                }}
            >
                <item.Icon 
                    style={{ 
                        color: isHovered || item.isHighlight ? item.color : "rgba(255,255,255,0.5)", 
                        filter: isHovered || item.isHighlight ? `drop-shadow(0 0 8px ${item.color}80)` : "none",
                        transition: "color 0.3s ease, filter 0.3s ease"
                    }} 
                    size={iconSize} 
                />
            </div>
            <style>{keyframes}</style>
        </div>
    );
}

export default function OrbitingIcons() {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Very slow rotation: 35s per loop
    const loopDuration = 35; 

    return (
        <div className="absolute inset-0 z-[19] pointer-events-none flex items-center justify-center overflow-visible">
            {mounted && ICONS.map((item) => (
                <OrbitIcon key={item.id} item={item} isMobile={isMobile} loopDuration={loopDuration} />
            ))}
        </div>
    );
}
