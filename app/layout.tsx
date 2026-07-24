import type { Metadata, Viewport } from "next";
import { Inter, Syne, Orbitron } from "next/font/google";
import "./globals.css";

// Load only 3 essential fonts — each extra font = extra render-blocking network request
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",   // Show text immediately while font loads
  preload: true,
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Secondary font — don't block
});

export const metadata: Metadata = {
  title: "Anas | Pixelmint Studio",
  description: "Founder of Pixelmint Studio. Designing Brands With Impact.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#050505",
};

import dynamic from "next/dynamic";
import CustomCursor from "@/components/ui/CustomCursor";
import VisitorTracker from "@/components/ui/VisitorTracker";
import SmoothScroll from "@/components/ui/SmoothScroll";

// Defer the heavy AI gift widget — not needed at first paint
const AICoreGift = dynamic(() => import("@/components/ui/AICoreGift"));
const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Provide fallback CSS variables for removed fonts so existing styles don't break
  const fontVariables = [
    inter.variable,
    syne.variable,
    orbitron.variable,
  ].join(" ");

  return (
    <html lang="en">
      <head>
        {/* Map removed font variables to our kept fonts as fallbacks */}
        <style>{`
          :root {
            --font-outfit: var(--font-inter);
            --font-exo2: var(--font-inter);
            --font-playfair: var(--font-syne);
            --font-dm-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            --font-space-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          }
        `}</style>
      </head>
      <body
        className={`${fontVariables} antialiased bg-[#050505] text-white selection:bg-brand-mint selection:text-black overflow-x-clip font-sans`}
      >
        <VisitorTracker />
        <CustomCursor />
        <AICoreGift />
        <ScrollToTop />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
