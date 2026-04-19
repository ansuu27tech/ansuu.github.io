"use client";
import { useEffect, useState } from "react";
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

        const handleMouseEnter = () => setHovered(true);
        const handleMouseLeave = () => setHovered(false);

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
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-brand-mint rounded-full pointer-events-none z-[9999]"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                scale: hovered ? 1.5 : 1,
                backgroundColor: hovered ? "rgba(75, 255, 255, 0.1)" : "transparent",
                willChange: "transform",
            }}
        >
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-brand-mint rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    );
}
