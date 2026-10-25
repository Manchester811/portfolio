"use client";

import React from "react";
import { SmoothScrollProvider } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SiteLoader } from "@/components/ui/SiteLoader";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { ExperienceEducation } from "@/components/sections/ExperienceEducation";
import { CertificationsLanguages } from "@/components/sections/CertificationsLanguages";
import { Contact } from "@/components/sections/Contact";
import { Stats } from "@/components/sections/Stats";
import { HowIWork } from "@/components/sections/HowIWork";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen overflow-x-clip bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent-primary-muted)] selection:text-[var(--text-primary)]">
        <SiteLoader />
        {/* Custom cursor (desktop only — auto-hides on touch) */}
        <CustomCursor />

        {/* Command palette (Ctrl+K) */}
        <CommandPalette />

        {/* Top scroll progress bar */}
        <ScrollProgress />

        {/* Clean horizontal top navigation */}
        <Navbar />

        {/* Main cinematic content frame */}
        <main className="relative z-10 flex flex-col min-h-screen">
          <Hero />

          <div className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 pb-24 pt-10 sm:px-6 sm:pt-14 lg:px-8">
            <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
              <Projects />
              <About />
              <Stats />
              <Skills />
              <TechMarquee />
              <HowIWork />
              <ExperienceEducation />
              <CertificationsLanguages />
              <Contact />
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
