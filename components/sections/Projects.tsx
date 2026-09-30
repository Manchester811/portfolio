"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { projectsData, ProjectItem } from "@/data/projects";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { MotionSection } from "@/components/ui/MotionSection";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

/* ─── Tilt card wrapper ─── */
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
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const srx = useSpring(rotX, { stiffness: 160, damping: 20 });
  const sry = useSpring(rotY, { stiffness: 160, damping: 20 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || shouldReduceMotion) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotX.set((0.5 - py) * 7);
      rotY.set((px - 0.5) * 7);
      glowX.set(px * 100);
      glowY.set(py * 100);
    },
    [rotX, rotY, glowX, glowY, shouldReduceMotion]
  );

  const onLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [rotX, rotY, glowX, glowY]);

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

/* ─── Single Project Card ─── */
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const, delay: index * 0.12 },
    },
  };

  return (
    <motion.article
      variants={cardV}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`group relative ${featured ? "md:col-span-2" : ""}`}
      data-cursor-project
      data-cursor-label="VIEW"
    >
      <TiltCard className="h-full rounded-2xl overflow-hidden bg-[#080f24]/90 border border-white/8 hover:border-cyan-500/40 transition-colors duration-400 cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Image */}
        <div
          className={`relative overflow-hidden ${featured ? "h-64 sm:h-72 lg:h-80" : "h-48 sm:h-56"}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onOpen(project)}
        >
          <motion.div
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080f24] via-[#080f24]/30 to-transparent" />

          {/* Badge */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-cyan-300">
              {project.badge}
            </span>
            <span
              className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border backdrop-blur-sm ${
                project.status === "PRODUCTION READY"
                  ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-300"
                  : project.status === "RESEARCH / DEMO"
                  ? "bg-amber-950/60 border-amber-500/30 text-amber-300"
                  : "bg-blue-950/60 border-blue-500/30 text-blue-300"
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* Hover CTA */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
              >
                <motion.span
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/12 border border-white/20 text-white text-sm font-semibold backdrop-blur-md"
                >
                  View Details <ArrowUpRight className="w-4 h-4" />
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6" onClick={() => onOpen(project)}>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium mb-3">{project.subtitle}</p>
          <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.slice(0, featured ? 7 : 4).map((t) => (
              <Badge key={t} className="text-[10px]">
                {t}
              </Badge>
            ))}
            {project.technologies.length > (featured ? 7 : 4) && (
              <span className="text-[10px] text-slate-500 self-center">
                +{project.technologies.length - (featured ? 7 : 4)} more
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 flex-wrap" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onOpen(project)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group/btn"
              data-cursor-hover
            >
              View Case Study
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>

            {project.githubUrl && !project.githubUrl.includes("placeholder") && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                data-cursor-hover
              >
                <GithubIcon className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}

            {project.liveDemoUrl && !project.liveDemoUrl.includes("placeholder") && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                data-cursor-hover
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}

/* ─── Main Projects Section ─── */
export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const featured = projectsData[0];
  const rest = projectsData.slice(1);

  return (
    <MotionSection id="projects">
      <SectionHeading
        title="Featured Projects"
        subtitle="Selected work in AI, Machine Learning, and intelligent systems."
        accentColor="cyan"
      />

      {/* Grid: featured card spans 2 cols on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
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

      {/* Cmd+K hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center text-xs text-slate-600"
      >
        Press{" "}
        <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white/6 border border-white/10 rounded">
          Ctrl K
        </kbd>{" "}
        to open command palette
      </motion.p>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </MotionSection>
  );
};
