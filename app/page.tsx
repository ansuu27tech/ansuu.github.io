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
const StudioSamples = dynamic(() => import("@/components/sections/StudioSamples"));
const WebShowcase = dynamic(() => import("@/components/sections/WebShowcase"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const Mindset = dynamic(() => import("@/components/sections/Mindset"));
const Impact = dynamic(() => import("@/components/sections/Impact"));
import Intro from "@/components/ui/Intro";
import Team from "@/components/sections/Team";



export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-white selection:bg-brand-mint selection:text-black">

      <div className="relative z-10 bg-transparent">
        <Intro />
        <Hero />
        <About />
        <Mindset />
        <Impact />
        <Experience />
        <Pixelmint />
        <Team />
        <Services />
        <Scene3D />
        <Portfolio />
        <StudioSamples />
        <WebShowcase />
        <Testimonials />
        <Contact />
      </div>
    </main>
  );
}
