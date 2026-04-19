"use client";
import { useState, useEffect } from "react";

export const TypingEffect = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text.charAt(index));
                setIndex((prev) => prev + 1);
            }, 50); // Typing speed
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <span className="inline-block border-r-2 border-brand-mint animate-pulse pr-1">
            {displayedText}
        </span>
    );
};
