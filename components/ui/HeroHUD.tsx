"use client";

import React, { memo } from "react";
import { personalData } from "@/data/personal";

interface HeroHUDProps {
  progressNumber: number; // 0 to 100
  phase: string;
}

export const HeroHUD: React.FC<HeroHUDProps> = memo(({ progressNumber, phase }) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 select-none overflow-hidden font-mono">
      {/* ─── Top Left: Telemetry & Live Protocol ─── */}
      <div className="absolute left-5 top-20 md:left-10 md:top-24 flex items-center gap-3">
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.28em] text-cyan-400 font-semibold">
            NEURAL ENGINE // ONLINE
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500">
            {phase} • {personalData.location}
          </span>
        </div>
      </div>

      {/* ─── Top Right: System Status & Diagnostic Mode ─── */}
      <div className="absolute right-5 top-20 md:right-10 md:top-24 flex items-center gap-3 text-right">
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-[0.28em] text-slate-400">
            DATA PIPELINE
          </span>
          <span className="text-[9px] uppercase tracking-[0.22em] text-cyan-300">
            READY • LATENCY 0.018s
          </span>
        </div>
        <div className="hidden sm:flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-950/30">
          <div className="h-2 w-2 rounded-sm bg-cyan-400 animate-pulse-glow" />
        </div>
      </div>

      {/* ─── Top-Left Corner Bracket ─── */}
      <div className="absolute left-4 top-16 md:left-8 md:top-20 text-cyan-500/40 hud-bracket">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M 2 24 L 2 2 L 24 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* ─── Top-Right Corner Bracket ─── */}
      <div className="absolute right-4 top-16 md:right-8 md:top-20 text-cyan-500/40 hud-bracket">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M 0 2 L 22 2 L 22 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* ─── Bottom-Left Corner Bracket ─── */}
      <div className="absolute left-4 bottom-16 md:left-8 md:bottom-20 text-cyan-500/40 hud-bracket">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M 2 0 L 2 22 L 24 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* ─── Bottom-Right Corner Bracket ─── */}
      <div className="absolute right-4 bottom-16 md:right-8 md:bottom-20 text-cyan-500/40 hud-bracket">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M 0 22 L 22 22 L 22 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* ─── Bottom HUD Bar: Sequence Counter & Scrub Progress ─── */}
      <div className="absolute inset-x-0 bottom-0 z-30 pb-3 md:pb-4">
        {/* Dynamic Scrub Line */}
        <div className="mx-5 md:mx-10 mb-2.5 h-[1.5px] bg-white/10 overflow-hidden rounded-full">
          <div
            className="h-full origin-left bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            style={{ width: `${Math.min(100, Math.max(0, progressNumber))}%` }}
          />
        </div>

        {/* Status Meta */}
        <div className="mx-5 md:mx-10 flex items-center justify-between text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">
              SEQ {String(Math.min(169, Math.max(1, Math.floor(progressNumber * 1.69)))).padStart(3, "0")} / 169
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">RISHABH JAIN // ARCHITECTURE</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>SCROLL TO ENGAGE</span>
            <svg width="10" height="10" fill="currentColor" viewBox="0 0 256 256" className="animate-bounce">
              <path d="M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});

HeroHUD.displayName = "HeroHUD";
