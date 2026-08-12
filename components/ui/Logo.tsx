"use client";

import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
    return (
        <div className={`relative flex items-center justify-center overflow-hidden rounded-full ${className}`}>
            <Image
                src="/pixelmint-logo.jpg"
                alt="PixelMint Studio MVS Logo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100px, 100px"
            />
        </div>
    );
}

