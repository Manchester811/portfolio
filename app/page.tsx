"use client";

import React from "react";
import { SmoothScrollProvider } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Languages } from "@/components/sections/Languages";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#050814] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-white cursor-none-desktop">
        {/* Custom cursor (desktop only — auto-hides on touch) */}
        <CustomCursor />

        {/* Command palette Easter egg (Ctrl+K) */}
        <CommandPalette />

        {/* Top scroll progress bar */}
        <ScrollProgress />

        {/* Ambient undulating background */}
        <BackgroundGlow />

        {/* Floating navigation dock */}
        <Navbar />

        {/* Main content */}
        <div className="relative z-10 flex flex-col min-h-screen md:pl-20 lg:pl-24 transition-all duration-300">
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-14">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Certifications />
            <Languages />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </SmoothScrollProvider>
  );
}
