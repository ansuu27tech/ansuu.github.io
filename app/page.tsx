import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

// Lazy-load all heavy sections — skips their JS from the initial bundle
// so the page renders fast and the main thread is freed up early
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Pixelmint = dynamic(() => import("@/components/sections/Pixelmint"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Scene3D = dynamic(() => import("@/components/sections/Scene3D"));
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));
const WebShowcase = dynamic(() => import("@/components/sections/WebShowcase"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const Mindset = dynamic(() => import("@/components/sections/Mindset"));
const Philosophy = dynamic(() => import("@/components/sections/Philosophy"));
const Impact = dynamic(() => import("@/components/sections/Impact"));
const SplitText = dynamic(() => import("@/components/ui/SplitText"));
// Intro is also lazy-loaded — not needed at first paint
const Intro = dynamic(() => import("@/components/ui/Intro"));



export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-white selection:bg-brand-mint selection:text-black">

      <div className="relative z-10 bg-transparent">
        <Intro />
        <Hero />
        <About />
        <div className="section-divider mx-auto max-w-4xl my-4" />
        <Mindset />
        <Philosophy />
        <div className="section-divider mx-auto max-w-4xl my-4" />
        <Impact />
        <div className="section-divider mx-auto max-w-4xl my-4" />
        <Experience />
        <Pixelmint />

        <div className="section-divider mx-auto max-w-4xl my-4" />
        <Services />
        <Scene3D />

        {/* Invitation to Portfolio */}
        <div className="py-24 md:py-32 flex flex-col items-center justify-center relative z-10 bg-transparent">
          <SplitText
            text="Crafted for impact."
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight text-white font-heading"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.3}
            rootMargin="-50px"
            textAlign="center"
          />
          <div className="mt-6 text-brand-mint/70 text-lg md:text-xl font-mono uppercase tracking-[0.2em] animate-fade-in delay-1000">
            Selected Works
          </div>
        </div>

        <Portfolio />
        <div className="section-divider mx-auto max-w-4xl my-4" />
        <WebShowcase />
        <Testimonials />
        <Contact />
      </div>
    </main>
  );
}
