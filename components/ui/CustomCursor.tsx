"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smoother spring — lowered stiffness to prevent jitter on PC
    const springConfig = { damping: 30, stiffness: 500 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [hovered, setHovered] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const [cursorLabel, setCursorLabel] = useState("");

    // Trail dots — 4 trailing dots with increasing spring delay
    const trail1X = useSpring(cursorX, { damping: 35, stiffness: 300 });
    const trail1Y = useSpring(cursorY, { damping: 35, stiffness: 300 });
    const trail2X = useSpring(cursorX, { damping: 40, stiffness: 200 });
    const trail2Y = useSpring(cursorY, { damping: 40, stiffness: 200 });
    const trail3X = useSpring(cursorX, { damping: 45, stiffness: 150 });
    const trail3Y = useSpring(cursorY, { damping: 45, stiffness: 150 });

    useEffect(() => {
        // Detect touch/coarse pointer devices (phones, tablets)
        // Using a non-synchronous update to satisfy strict render checks
        const timeout = setTimeout(() => {
            const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
            setIsTouch(isTouchDevice);
        }, 0);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseEnter = (e: Event) => {
            setHovered(true);
            const target = e.target as HTMLElement;
            const link = target.closest("a");
            if (link) {
                setCursorLabel("View");
            } else {
                setCursorLabel("");
            }
        };
        const handleMouseLeave = () => {
            setHovered(false);
            setCursorLabel("");
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll("a, button");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [cursorX, cursorY]);

    // Don't render cursor on touch devices at all
    if (isTouch) return null;

    return (
        <>
            {/* Trail dots — smaller, fading behind the main cursor */}
            {[
                { x: trail3X, y: trail3Y, size: 3, opacity: 0.12 },
                { x: trail2X, y: trail2Y, size: 4, opacity: 0.2 },
                { x: trail1X, y: trail1Y, size: 5, opacity: 0.3 },
            ].map((dot, i) => (
                <motion.div
                    key={i}
                    className="fixed top-0 left-0 rounded-full bg-brand-mint pointer-events-none z-[9998]"
                    style={{
                        translateX: dot.x,
                        translateY: dot.y,
                        width: dot.size,
                        height: dot.size,
                        opacity: dot.opacity,
                        marginLeft: 16 - dot.size / 2,
                        marginTop: 16 - dot.size / 2,
                        willChange: "transform",
                    }}
                />
            ))}

            {/* Main cursor ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-brand-mint rounded-full pointer-events-none z-[9999] flex items-center justify-center"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    scale: hovered ? 1.8 : 1,
                    backgroundColor: hovered ? "rgba(75, 255, 255, 0.08)" : "transparent",
                    borderColor: hovered ? "rgba(75, 255, 255, 0.6)" : "rgba(75, 255, 255, 0.4)",
                    mixBlendMode: "difference",
                    willChange: "transform",
                    transition: "scale 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
                }}
            >
                {/* Center dot */}
                <div className="w-1 h-1 bg-brand-mint rounded-full" style={{ opacity: hovered ? 0 : 1, transition: "opacity 0.2s ease" }} />

                {/* Label on hover */}
                {cursorLabel && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="text-[8px] font-bold text-brand-mint uppercase tracking-widest"
                    >
                        {cursorLabel}
                    </motion.span>
                )}
            </motion.div>
        </>
    );
}
