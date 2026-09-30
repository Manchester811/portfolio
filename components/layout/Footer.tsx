"use client";

import React from "react";
import { personalData } from "@/data/personal";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-sky-500/15 bg-[#050916]/90 backdrop-blur-xl py-12 px-4 md:px-8 pb-24 md:pb-12 text-slate-400 text-xs">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <span className="font-bold text-sm text-white tracking-wide">
              {personalData.name}
            </span>
          </div>
          <p className="text-slate-400 text-xs">
            B.Tech CSE (Data Science) @ VIT Vellore • Class of 2027
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-lg bg-[#091224] hover:bg-[#101f3d] text-slate-400 hover:text-cyan-300 border border-sky-500/15 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={personalData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-lg bg-[#091224] hover:bg-[#101f3d] text-slate-400 hover:text-cyan-300 border border-sky-500/15 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${personalData.email}`}
            aria-label="Email"
            className="p-2 rounded-lg bg-[#091224] hover:bg-[#101f3d] text-slate-400 hover:text-cyan-300 border border-sky-500/15 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors ml-2 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-sky-500/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
        <div>
          © {new Date().getFullYear()} Rishabh Jain. All rights reserved.
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span>Engineered with Next.js, TypeScript & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};
