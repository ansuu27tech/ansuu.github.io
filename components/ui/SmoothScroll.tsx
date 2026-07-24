"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.9,                                          // Snappier than 1.2 — feels more responsive
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.8,
            infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        }

        // Start the loop
        rafRef.current = requestAnimationFrame(raf);

        // Pause Lenis when the tab is hidden — saves battery/CPU
        const handleVisibilityChange = () => {
            if (document.hidden) {
                lenis.stop();
                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current);
                    rafRef.current = null;
                }
            } else {
                lenis.start();
                rafRef.current = requestAnimationFrame(raf);
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}
