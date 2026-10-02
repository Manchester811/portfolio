"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { projectsData, ProjectItem } from "@/data/projects";
import { ProjectDossier } from "@/components/ui/ProjectDossier";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { MotionSection } from "@/components/ui/MotionSection";
import { ExternalLink, ArrowUpRight, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

/* ─── 3D Tilt Wrapper ─── */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);

  const srx = useSpring(rotX, { stiffness: 180, damping: 22 });
  const sry = useSpring(rotY, { stiffness: 180, damping: 22 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || shouldReduceMotion) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotX.set((0.5 - py) * 8);
      rotY.set((px - 0.5) * 8);
    },
    [rotX, rotY, shouldReduceMotion]
  );

  const onLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
  }, [rotX, rotY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Single Cinematic Project Card ─── */
function ProjectCard({
  project,
  featured = false,
  index,
  onOpen,
}: {
  project: ProjectItem;
  featured?: boolean;
  index: number;
  onOpen: (p: ProjectItem) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const cardV = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" as const, delay: index * 0.1 },
    },
  };

  return (
    <motion.article
      variants={cardV}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative ${featured ? "md:col-span-2" : ""}`}
      data-cursor-project
      data-cursor-label="DOSSIER ↗"
    >
      <TiltCard className="h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#060b1b] border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.65)] hover:shadow-[0_0_35px_rgba(6,182,212,0.18)]">
        {/* Visual Viewport */}
        <div
          className={`relative overflow-hidden cursor-pointer ${
            featured ? "h-64 sm:h-80 lg:h-92" : "h-52 sm:h-64"
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onOpen(project)}
        >
          <motion.div
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060b1b] via-[#060b1b]/40 to-transparent" />

          {/* HUD Corner Marker Crosshairs */}
          <div className="absolute top-3 left-3 text-cyan-400/40 pointer-events-none hud-bracket">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M 2 16 L 2 2 L 16 2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="absolute top-3 right-3 text-cyan-400/40 pointer-events-none hud-bracket">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M 0 2 L 16 2 L 16 16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Badges Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px]">
            <span className="px-3 py-1 rounded-full uppercase tracking-wider bg-black/75 border border-cyan-500/30 text-cyan-300 backdrop-blur-md">
              {project.badge}
            </span>
            <span
              className={`px-2.5 py-1 rounded-full uppercase tracking-wider border backdrop-blur-md ${
                project.status === "PRODUCTION READY"
                  ? "bg-emerald-950/70 border-emerald-500/40 text-emerald-300"
                  : project.status === "RESEARCH / DEMO"
                  ? "bg-amber-950/70 border-amber-500/40 text-amber-300"
                  : "bg-cyan-950/70 border-cyan-500/40 text-cyan-300"
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* Hover Floating Action Overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[2px]"
              >
                <motion.span
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/50 text-cyan-200 text-xs font-mono font-semibold tracking-wider backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  OPEN DOSSIER ↗
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card Content & Metadata */}
        <div className="p-5 sm:p-7" onClick={() => onOpen(project)}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors duration-200">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>

          <p className="text-xs text-cyan-400 font-mono mb-3">{project.subtitle}</p>

          <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technical Specs Metric Strip */}
          <div className="mb-4 p-2.5 rounded-xl bg-white/[0.02] border border-white/6 font-mono text-[11px] text-slate-300 flex items-center justify-between">
            <span className="text-slate-400 text-[10px]">CORE ARCHITECTURE</span>
            <span className="text-cyan-300 text-right truncate max-w-[200px] sm:max-w-none">
              {project.architectureDetails.modelType.split("+")[0]}
            </span>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.slice(0, featured ? 6 : 4).map((t) => (
              <Badge key={t} className="text-[10px] font-mono">
                {t}
              </Badge>
            ))}
            {project.technologies.length > (featured ? 6 : 4) && (
              <span className="text-[10px] font-mono text-slate-500 self-center">
                +{project.technologies.length - (featured ? 6 : 4)} more
              </span>
            )}
          </div>

          {/* Action Row */}
          <div
            className="flex items-center gap-4 flex-wrap pt-2 border-t border-white/8 font-mono text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onOpen(project)}
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer group/btn"
              data-cursor-hover
            >
              <span>Inspect Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                data-cursor-hover
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer ml-auto"
                data-cursor-hover
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}

/* ─── Projects Section ─── */
export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const featured = projectsData[0];
  const rest = projectsData.slice(1);

  return (
    <MotionSection id="projects" className="pt-2 md:pt-4">
      {/* Cinematic Section Header with HUD status */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
          SYSTEM REGISTRY // FEATURED ARCHITECTURES
        </div>
        <SectionHeading
          title="Featured Projects"
          subtitle="Production-grade systems, deep neural architectures, and intelligent data pipelines."
          accentColor="cyan"
        />
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <ProjectCard
          project={featured}
          featured
          index={0}
          onOpen={setSelectedProject}
        />
        {rest.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i + 1}
            onOpen={setSelectedProject}
          />
        ))}
      </div>

      {/* Interactive Dossier Modal */}
      <ProjectDossier
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </MotionSection>
  );
};
