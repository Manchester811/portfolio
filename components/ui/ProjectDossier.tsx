"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ProjectItem } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { X, ExternalLink, Cpu, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface ProjectDossierProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDossier: React.FC<ProjectDossierProps> = ({ project, onClose }) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#02050e]/88 backdrop-blur-md"
          />

          {/* Dossier Modal Card */}
          <motion.div
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.94,
              y: shouldReduceMotion ? 0 : 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.95,
              y: shouldReduceMotion ? 0 : 15,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 340,
            }}
            className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl bg-[#070e22] border border-cyan-500/35 shadow-[0_0_60px_rgba(6,182,212,0.22)] overflow-hidden z-10 my-8 font-sans"
          >
            {/* Top HUD Telemetry Ribbon */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/8 bg-[#040816] font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
                <span className="text-cyan-400 font-bold">PROJECT DOSSIER // {project.id.toUpperCase()}</span>
              </div>
              <span className="text-slate-400">{project.status}</span>
            </div>

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              aria-label="Close dossier"
              className="absolute top-11 right-4 z-20 p-2.5 rounded-full bg-[#050b1d]/85 text-slate-300 hover:text-white hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Dossier Hero Visual Header */}
            <div className="relative w-full h-56 sm:h-72 overflow-hidden bg-[#050814]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e22] via-[#070e22]/50 to-transparent" />

              {/* In-situ Dossier Badges */}
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-cyan-400 bg-black/60 px-3 py-1 rounded-md border border-cyan-500/25">
                  {project.badge}
                </span>
              </div>
            </div>

            {/* Dossier Body Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-cyan-400 font-mono">
                  {project.subtitle}
                </p>
              </div>

              {/* OVERVIEW & SOLUTION */}
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block">
                  SYSTEM OVERVIEW & PROBLEM
                </span>
                {project.longDescription.map((desc, idx) => (
                  <p key={idx}>{desc}</p>
                ))}
              </div>

              {/* ARCHITECTURE & METRICS (REAL DATA) */}
              <div className="p-4 rounded-2xl bg-[#040816] border border-cyan-500/20 font-mono text-xs space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                  <Cpu className="w-4 h-4" />
                  <span>ARCHITECTURE & SYSTEM SPECS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/6">
                    <span className="text-slate-400 block text-[10px] mb-1">MODEL / CORE ENGINE</span>
                    <span className="text-white font-medium">{project.architectureDetails.modelType}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/6">
                    <span className="text-slate-400 block text-[10px] mb-1">INPUT / DATASET</span>
                    <span className="text-white font-medium">{project.architectureDetails.datasetOrInput}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/6">
                    <span className="text-slate-400 block text-[10px] mb-1">BENCHMARK METRICS</span>
                    <span className="text-cyan-300 font-medium">{project.architectureDetails.metrics}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/6">
                    <span className="text-slate-400 block text-[10px] mb-1">BACKEND PIPELINE</span>
                    <span className="text-white font-medium">{project.architectureDetails.backendStack}</span>
                  </div>
                </div>
              </div>

              {/* KEY TECHNICAL INNOVATIONS */}
              <div className="p-4 rounded-2xl bg-[#09132b]/50 border border-white/8">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  Key Technical Innovations
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.keyHighlights.map((hl, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TECHNOLOGIES USED */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  TECHNOLOGY STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="cyan" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* ACTION LINKS */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 font-mono text-xs">
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all cursor-pointer"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 hover:border-cyan-500/40 transition-colors cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>SOURCE REPOSITORY</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
