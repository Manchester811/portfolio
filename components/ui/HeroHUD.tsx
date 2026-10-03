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
      <div className="absolute left-6 top-24 md:left-12 md:top-28 flex items-center gap-3">
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-[#00E5FF] opacity-75 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#00E5FF] font-semibold">
            SYSTEM STATUS // ONLINE
          </span>
          <span className="text-[9px] uppercase tracking-[0.18em] text-[#8D98A8]">
            {phase} • {personalData.location}
          </span>
        </div>
      </div>

      {/* ─── Top Right: Pipeline Status ─── */}
      <div className="absolute right-6 top-24 md:right-12 md:top-28 flex items-center gap-3 text-right">
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#8D98A8]">
            DATA PIPELINE
          </span>
          <span className="text-[9px] uppercase tracking-[0.18em] text-[#00E5FF]">
            READY • LATENCY 0.018s
          </span>
        </div>
        <div className="hidden sm:flex h-7 w-7 items-center justify-center rounded-lg border border-[#00E5FF]/25 bg-[#0A0F1D]/70 shadow-[0_0_12px_rgba(0,229,255,0.1)]">
          <div className="h-2 w-2 rounded-sm bg-[#00E5FF] animate-pulse-glow" />
        </div>
      </div>

      {/* ─── Top-Left Corner Bracket ─── */}
      <div className="absolute left-5 top-20 md:left-10 md:top-24 text-[#00E5FF]/30 hud-bracket">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M 2 22 L 2 2 L 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* ─── Top-Right Corner Bracket ─── */}
      <div className="absolute right-5 top-20 md:right-10 md:top-24 text-[#00E5FF]/30 hud-bracket">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M 0 2 L 20 2 L 20 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* ─── Bottom-Left Corner Bracket ─── */}
      <div className="absolute left-5 bottom-16 md:left-10 md:bottom-20 text-[#00E5FF]/30 hud-bracket">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M 2 0 L 2 20 L 22 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* ─── Bottom-Right Corner Bracket ─── */}
      <div className="absolute right-5 bottom-16 md:right-10 md:bottom-20 text-[#00E5FF]/30 hud-bracket">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M 0 20 L 20 20 L 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </div>

      {/* ─── Bottom HUD Bar: Sequence Counter & Scrub Progress ─── */}
      <div className="absolute inset-x-0 bottom-0 z-30 pb-4 md:pb-5">
        {/* Dynamic Cyan Scrub Line */}
        <div className="mx-6 md:mx-12 mb-2.5 h-[1.5px] bg-white/8 overflow-hidden rounded-full">
          <div
            className="h-full origin-left bg-gradient-to-r from-[#00E5FF] via-[#38BDF8] to-[#818CF8] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(0,229,255,0.7)]"
            style={{ width: `${Math.min(100, Math.max(0, progressNumber))}%` }}
          />
        </div>

        {/* Status Meta */}
        <div className="mx-6 md:mx-12 flex items-center justify-between text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-[#8D98A8]">
          <div className="flex items-center gap-2">
            <span className="text-[#00E5FF] font-semibold">
              SEQ {String(Math.min(169, Math.max(1, Math.floor(progressNumber * 1.69)))).padStart(3, "0")} / 169
            </span>
            <span className="hidden sm:inline text-stone-700">|</span>
            <span className="hidden sm:inline text-[#8D98A8]">RISHABH JAIN // ARCHITECTURE</span>
          </div>

          <div className="flex items-center gap-2 text-[#8D98A8]">
            <span>SCROLL TO ENGAGE</span>
            <svg width="10" height="10" fill="currentColor" viewBox="0 0 256 256" className="animate-bounce text-[#00E5FF]">
              <path d="M208.49,152.49l-72,72a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L116,187V40a12,12,0,0,1,24,0V187l51.51-51.52a12,12,0,0,1,17,17Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});

HeroHUD.displayName = "HeroHUD";
