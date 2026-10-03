"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ProjectItem } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { X, ExternalLink, Cpu, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface ProjectDossierProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDossier: React.FC<ProjectDossierProps> = ({ project, onClose }) => {
  const shouldReduceMotion = useReducedMotion();
  const isOpenRef = useRef(false);

  useEffect(() => {
    if (project) {
      isOpenRef.current = true;
      document.body.style.overflow = "hidden";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (isOpenRef.current) {
        document.body.style.overflow = "unset";
        isOpenRef.current = false;
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(5,5,5,0.88)] backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.96,
              y: shouldReduceMotion ? 0 : 24,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.97,
              y: shouldReduceMotion ? 0 : 12,
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 my-8 w-full max-w-4xl overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-card)] shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
          >
            {/* Ribbon */}
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] px-6 py-3.5 font-mono text-[var(--text-micro)] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]" />
                <span className="font-semibold text-[var(--text-accent)]">
                  Case Study // {project.id.toUpperCase()}
                </span>
              </div>
              <span className="shrink-0 font-semibold text-[var(--text-muted)]">
                {project.status ?? project.category}
              </span>
            </div>

            {/* Close */}
            <motion.button
              onClick={onClose}
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              aria-label="Close case study"
              className="absolute right-4 top-12 z-20 cursor-pointer rounded-full border border-[var(--border-default)] bg-[var(--bg-primary)]/90 p-2.5 text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--border-accent)] hover:text-[var(--text-accent)]"
            >
              <X className="h-5 w-5" />
            </motion.button>

            {/* Visual header */}
            <div className="relative h-56 w-full overflow-hidden bg-[var(--bg-primary)] sm:h-72">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.subtitle}`}
                  fill
                  sizes="(max-width: 896px) 96vw, 896px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[linear-gradient(135deg,var(--bg-card)_0%,var(--bg-primary)_100%)]">
                  <span className="font-mono text-[var(--text-micro)] uppercase tracking-[0.3em] text-[var(--text-dim)]">
                    No Preview
                  </span>
                  <span className="font-display text-3xl font-bold uppercase tracking-[-0.03em] text-[var(--text-secondary)]">
                    {project.title}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/40 to-transparent" />

              <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
                <span className="chip-accent backdrop-blur-md">{project.category}</span>
                <span className="chip backdrop-blur-md">{project.badge}</span>
              </div>
            </div>

            {/* Body */}
            <div className="max-h-[62vh] space-y-8 overflow-y-auto p-6 sm:p-8">
              <div>
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold uppercase leading-[1.05] tracking-[-0.035em] text-[var(--text-primary)]">
                  {project.title}
                </h3>
                <p className="mt-3 font-mono text-sm text-[var(--text-accent)]">
                  {project.subtitle}
                </p>
              </div>

              {/* Overview */}
              <div className="space-y-3">
                <span className="label-muted block">System Overview &amp; Problem</span>
                {project.longDescription.map((desc, idx) => (
                  <p
                    key={idx}
                    className="text-sm leading-relaxed text-[var(--text-secondary)]"
                  >
                    {desc}
                  </p>
                ))}
              </div>

              {/* Architecture */}
              <div className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5">
                <div className="flex items-center gap-2 font-mono text-[var(--text-micro)] font-semibold uppercase tracking-[0.2em] text-[var(--text-accent)]">
                  <Cpu className="h-4 w-4" />
                  <span>Architecture &amp; System Specs</span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    {
                      label: "Model / Core Engine",
                      value: project.architectureDetails.modelType,
                      accent: false,
                    },
                    {
                      label: "Input / Dataset",
                      value: project.architectureDetails.datasetOrInput,
                      accent: false,
                    },
                    {
                      label: "Benchmark Metrics",
                      value: project.architectureDetails.metrics,
                      accent: true,
                    },
                    {
                      label: "Backend Pipeline",
                      value: project.architectureDetails.backendStack,
                      accent: false,
                    },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4"
                    >
                      <span className="mb-1.5 block font-mono text-[var(--text-micro)] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                        {spec.label}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          spec.accent
                            ? "text-[var(--text-accent)]"
                            : "text-[var(--text-primary)]"
                        }`}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="mb-4 flex items-center gap-2 font-mono text-[var(--text-micro)] font-semibold uppercase tracking-[0.2em] text-[var(--text-accent)]">
                  <CheckCircle2 className="h-4 w-4" />
                  Key Technical Innovations
                </h4>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project.keyHighlights.map((hl, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-secondary)]"
                    >
                      <span className="mt-2 h-px w-3 shrink-0 bg-[var(--accent-primary)]" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div>
                <span className="mb-3 block font-mono text-[var(--text-micro)] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="cyan" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-6">
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-6 py-3 text-[var(--text-micro)]"
                    data-cursor-hover
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary px-6 py-3 text-[var(--text-micro)]"
                    data-cursor-hover
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span>Source Repository</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};