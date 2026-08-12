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
  title: "Mohammed Anas — AI · Design · Creative Technology",
  description:
    "Mohammed Anas is an AI & Data Science student, creative developer, UI/UX designer, and founder of PixelMint Studio MVS. Building premium digital experiences at the intersection of artificial intelligence and design.",
  keywords: [
    "Mohammed Anas",
    "PixelMint Studio MVS",
    "AI Developer",
    "UI/UX Designer",
    "Creative Technologist",
    "Web Developer",
    "Portfolio",
    "Data Science",
  ],
  authors: [{ name: "Mohammed Anas", url: "https://anasbio.vercel.app" }],
  creator: "Mohammed Anas",
  metadataBase: new URL("https://anasbio.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anasbio.vercel.app",
    siteName: "Mohammed Anas — Portfolio",
    title: "Mohammed Anas — AI · Design · Creative Technology",
    description:
      "AI & Data Science student, creative developer, and founder of PixelMint Studio MVS. Building premium digital experiences at the intersection of intelligence and design.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Anas — AI · Design · Creative Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Anas — AI · Design · Creative Technology",
    description:
      "AI & Data Science student, creative developer, and founder of PixelMint Studio MVS.",
    images: ["/og-image.png"],
    creator: "@anas_moham80856",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://anasbio.vercel.app",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#030305",
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
        {/* Structured Data — Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohammed Anas",
              url: "https://anasbio.vercel.app",
              jobTitle: "AI & Data Science Student / Creative Developer",
              description:
                "AI & Data Science student, creative developer, UI/UX designer, and founder of PixelMint Studio MVS.",
              sameAs: [
                "https://github.com/ansuu27tech",
                "https://x.com/anas_moham80856",
                "https://instagram.com/ansuu__._",
              ],
              worksFor: {
                "@type": "Organization",
                name: "PixelMint Studio MVS",
                url: "https://pixelmint-studio-delta.vercel.app",
              },
              knowsAbout: [
                "Artificial Intelligence",
                "Data Science",
                "Web Development",
                "UI/UX Design",
                "Creative Technology",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${fontVariables} antialiased bg-[#030305] text-white selection:bg-brand-mint selection:text-black overflow-x-clip font-sans`}
      >
        {/* Skip to main content — accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <VisitorTracker />
        <CustomCursor />
        <AICoreGift />
        <ScrollToTop />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
