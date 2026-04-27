import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Orbitron, Exo_2, Playfair_Display, DM_Mono, Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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

import CustomCursor from "@/components/ui/CustomCursor";
import VisitorTracker from "@/components/ui/VisitorTracker";
import SmoothScroll from "@/components/ui/SmoothScroll";
import AICoreGift from "@/components/ui/AICoreGift";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} ${orbitron.variable} ${exo2.variable} ${playfair.variable} ${dmMono.variable} ${syne.variable} ${spaceMono.variable} antialiased bg-[#050505] text-white selection:bg-brand-mint selection:text-black overflow-x-clip font-sans`}
      >
        <VisitorTracker />
        <CustomCursor />
        <AICoreGift />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
