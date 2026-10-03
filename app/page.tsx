"use client";

import React from "react";
import { SmoothScrollProvider } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { ExperienceEducation } from "@/components/sections/ExperienceEducation";
import { CertificationsLanguages } from "@/components/sections/CertificationsLanguages";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden selection:bg-[var(--accent-primary-muted)] selection:text-[var(--text-primary)]">
        {/* Custom cursor (desktop only — auto-hides on touch) */}
        <CustomCursor />

        {/* Command palette (Ctrl+K) */}
        <CommandPalette />

        {/* Top scroll progress bar */}
        <ScrollProgress />

        {/* Clean horizontal top navigation */}
        <Navbar />

        {/* Main cinematic content frame */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Hero />

          <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 pb-24 pt-10 sm:px-6 sm:pt-14 lg:px-8">
            <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
              <Projects />
              <About />
              <Skills />
              <ExperienceEducation />
              <CertificationsLanguages />
              <Contact />
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </SmoothScrollProvider>
  );
}
