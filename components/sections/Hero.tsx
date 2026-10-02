"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { personalData } from "@/data/personal";
import { HeroHUD } from "@/components/ui/HeroHUD";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { ArrowRight, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
  { ssr: false }
);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [progressNum, setProgressNum] = useState(0);
  const [currentPhase, setCurrentPhase] = useState("PHASE 01 — INITIALIZATION");

  // Scroll tracking across the 350vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const p = Math.round(latest * 100);
      setProgressNum(p);

      if (latest < 0.2) {
        setCurrentPhase("PHASE 01 — INITIALIZATION");
      } else if (latest < 0.45) {
        setCurrentPhase("PHASE 02 — SYSTEM ANALYSIS");
      } else if (latest < 0.7) {
        setCurrentPhase("PHASE 03 — INTELLIGENCE");
      } else if (latest < 0.9) {
        setCurrentPhase("PHASE 04 — TRANSITION");
      } else {
        setCurrentPhase("PHASE 05 — HANDOFF");
      }
    });
  }, [scrollYProgress]);

  /* ─── Scroll-driven Transforms ─── */
  // Phase 1: Name and initial title
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.18, 0.25], [1, 1, 0]);
  const phase1Y = useTransform(scrollYProgress, [0, 0.22], [0, -35]);

  // Phase 2: Technical analysis callout
  const phase2Opacity = useTransform(scrollYProgress, [0.22, 0.28, 0.42, 0.47], [0, 1, 1, 0]);
  const phase2Y = useTransform(scrollYProgress, [0.22, 0.35, 0.47], [30, 0, -25]);

  // Phase 3: Building Intelligent Systems highlight
  const phase3Opacity = useTransform(scrollYProgress, [0.46, 0.52, 0.68, 0.73], [0, 1, 1, 0]);
  const phase3Scale = useTransform(scrollYProgress, [0.46, 0.6, 0.73], [0.94, 1, 1.05]);

  // Phase 4 & 5: Transition toward Featured Projects
  const heroExitOpacity = useTransform(scrollYProgress, [0.82, 0.98], [1, 0]);
  const heroExitScale = useTransform(scrollYProgress, [0.82, 0.98], [1, 0.92]);

  // Portrait scale and spatial positioning across scroll
  const portraitScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 0.95], [1, 1.08, 1.15, 1.25]);
  const portraitY = useTransform(scrollYProgress, [0, 0.35, 0.7, 0.95], [0, -15, -30, -50]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.85, 0.98], [1, 1, 0]);

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-[320vh] md:h-[350vh] bg-[#050814]"
    >
      {/* ─── Pinned Sticky Viewport ─── */}
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 1 : heroExitOpacity,
          scale: shouldReduceMotion ? 1 : heroExitScale,
        }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center"
      >
        {/* 3D WebGL Background Canvas */}
        {!shouldReduceMotion && (
          <Suspense fallback={null}>
            <HeroCanvas progress={progressNum / 100} />
          </Suspense>
        )}

        {/* Ambient atmospheric vignettes */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/90 via-transparent to-[#050814]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-[#050814]/80" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
        </div>

        {/* Technical HUD Overlay Graphics */}
        <HeroHUD progressNumber={progressNum} phase={currentPhase} />

        {/* Main Viewport Content Container */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">

          {/* ─── LEFT: Dynamic Scroll Typographic Stages ─── */}
          <div className="flex-1 w-full text-center md:text-left relative min-h-[300px] md:min-h-[360px] flex items-center">

            {/* STAGE 1: Identity & Roles (0% - 25%) */}
            <motion.div
              style={{
                opacity: shouldReduceMotion ? 1 : phase1Opacity,
                y: shouldReduceMotion ? 0 : phase1Y,
                pointerEvents: progressNum < 25 ? "auto" : "none",
              }}
              className="absolute inset-0 flex flex-col justify-center items-center md:items-start"
            >
              {/* Status pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 rounded-full text-xs font-mono font-medium bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
                {personalData.status}
              </div>

              {/* Name */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-2 leading-[0.95]">
                {personalData.name.split(" ")[0]}{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                  {personalData.name.split(" ")[1]}
                </span>
              </h1>

              {/* Sub-identity */}
              <p className="text-base sm:text-lg font-mono text-cyan-400 tracking-wider mb-4 uppercase">
                {personalData.role}
              </p>

              {/* Brief mission statement */}
              <p className="text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed mb-6">
                {personalData.tagline}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <MagneticElement strength={0.3}>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.65)] hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                    data-cursor-hover
                  >
                    Inspect Projects <ArrowRight className="w-4 h-4" />
                  </a>
                </MagneticElement>

                <ResumeButton url={personalData.resumeUrl} variant="ghost" />

                {/* Social icons */}
                <div className="flex items-center gap-2 ml-1">
                  <a
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-cyan-300 transition-colors"
                    data-cursor-hover
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-cyan-300 transition-colors"
                    data-cursor-hover
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* STAGE 2: System Analysis (22% - 47%) */}
            <motion.div
              style={{
                opacity: shouldReduceMotion ? 0 : phase2Opacity,
                y: shouldReduceMotion ? 0 : phase2Y,
                pointerEvents: progressNum >= 22 && progressNum < 48 ? "auto" : "none",
              }}
              className="absolute inset-0 flex flex-col justify-center items-center md:items-start"
            >
              <div className="inline-flex items-center gap-2 font-mono text-[11px] text-cyan-400 uppercase tracking-[0.25em] mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
                NEURAL ARCHITECTURE DIAGNOSTIC
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.05] mb-4">
                High-Throughput <br />
                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                  Machine Intelligence.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed font-sans mb-6">
                Specializing in production deep learning models, natural language understanding pipelines, and end-to-end data systems.
              </p>

              {/* Live Metric Cards */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm font-mono">
                <div className="p-3 rounded-xl bg-[#09142b]/70 border border-cyan-500/20">
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Focus</span>
                  <span className="text-xs font-semibold text-cyan-300">Deep Learning & NLP</span>
                </div>
                <div className="p-3 rounded-xl bg-[#09142b]/70 border border-cyan-500/20">
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Institution</span>
                  <span className="text-xs font-semibold text-slate-200">VIT Vellore</span>
                </div>
              </div>
            </motion.div>

            {/* STAGE 3: Intelligence & Purpose (46% - 73%) */}
            <motion.div
              style={{
                opacity: shouldReduceMotion ? 0 : phase3Opacity,
                scale: shouldReduceMotion ? 1 : phase3Scale,
                pointerEvents: progressNum >= 46 && progressNum < 74 ? "auto" : "none",
              }}
              className="absolute inset-0 flex flex-col justify-center items-center md:items-start"
            >
              <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
                SYSTEM PHILOSOPHY
              </div>

              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[0.98] mb-4">
                Building <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
                  Intelligent Systems.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed mb-6 font-sans">
                Bridging mathematical foundations with scalable software engineering to turn raw data into deployed impact.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="#projects"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider hover:bg-cyan-500/20 transition-colors"
                  data-cursor-hover
                >
                  Enter Project Registry ↓
                </a>
              </div>
            </motion.div>
          </div>

          {/* ─── RIGHT: Visual Anchor (Portrait & HUD Rings) ─── */}
          <motion.div
            style={{
              opacity: shouldReduceMotion ? 1 : portraitOpacity,
              scale: shouldReduceMotion ? 1 : portraitScale,
              y: shouldReduceMotion ? 0 : portraitY,
            }}
            className="flex-shrink-0 relative flex items-center justify-center"
          >
            {/* Ambient Cyan Aura */}
            <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-500/15 to-transparent blur-3xl pointer-events-none" />

            {/* Outer Rotating HUD Coordinate Ring */}
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 sm:-inset-6 rounded-full border border-dashed border-cyan-500/20 pointer-events-none"
            />
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: -360 }}
              transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 sm:-inset-11 rounded-full border border-dotted border-blue-500/15 pointer-events-none"
            />

            {/* Target Reticle Crosshairs */}
            <div className="absolute -inset-2 pointer-events-none">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-[1px] bg-cyan-400" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-[1px] bg-cyan-400" />
              <span className="absolute top-1/2 -left-1 -translate-y-1/2 h-2 w-[1px] bg-cyan-400" />
              <span className="absolute top-1/2 -right-1 -translate-y-1/2 h-2 w-[1px] bg-cyan-400" />
            </div>

            {/* Portrait Image Frame */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl sm:rounded-3xl p-[3px] bg-gradient-to-b from-cyan-400/80 via-sky-500/30 to-blue-600/60 shadow-[0_0_50px_rgba(6,182,212,0.35)] overflow-hidden">
              <div className="relative w-full h-full rounded-[14px] sm:rounded-[22px] overflow-hidden bg-[#070d1e]">
                <Image
                  src={personalData.avatarUrl}
                  alt={`${personalData.name} — Portrait`}
                  fill
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 320px"
                  className="object-cover object-top"
                />

                {/* Subtle sci-fi overlay scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-12 w-full animate-scanline pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050814]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Status Badge in corner */}
              <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/75 border border-cyan-500/40 backdrop-blur-md flex items-center gap-1.5 text-[9px] font-mono uppercase text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
                AI // VERIFIED
              </div>
            </div>
          </motion.div>
        </div>

        {/* Phase Indicator Micro-dots (Vertical, Right Side) */}
        <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 font-mono text-[9px]">
          {["01", "02", "03", "04", "05"].map((stg, i) => {
            const activeThresholds = [
              progressNum < 20,
              progressNum >= 20 && progressNum < 45,
              progressNum >= 45 && progressNum < 70,
              progressNum >= 70 && progressNum < 90,
              progressNum >= 90,
            ];
            const isCurrent = activeThresholds[i];
            return (
              <div key={stg} className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? "bg-cyan-400 scale-150 shadow-[0_0_8px_#22d3ee]"
                      : "bg-white/20"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
