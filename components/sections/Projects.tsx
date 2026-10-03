"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projectsData, ProjectItem } from "@/data/projects";
import { ProjectDossier } from "@/components/ui/ProjectDossier";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const projects = projectsData.map((project, index) => ({
    project,
    number: String(index + 1).padStart(2, "0"),
    imageSide: index % 2 === 0 ? ("right" as const) : ("left" as const),
  }));

  return (
    <MotionSection id="projects" className="py-0">
      <section className="section-container">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mb-14 flex flex-col gap-6 border-b border-[var(--border-default)] pb-10 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease }}
              className="label mb-4 block"
            >
              01 / Selected Work
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
              className="heading-display max-w-3xl text-[var(--text-primary)]"
            >
              Selected Work
            </motion.h2>
          </div>

          <motion.a
            href="https://github.com/Manchester811"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="link-primary group inline-flex shrink-0 items-center gap-2 font-mono text-[var(--text-label-sm)] uppercase tracking-[0.18em]"
            data-cursor-hover
          >
            <span>View GitHub</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        {/* =====================================================
            PROJECT PRESENTATIONS — asymmetric, no identical cards
        ===================================================== */}

        <div className="flex flex-col gap-24 sm:gap-32 lg:gap-40">
          {projects.map(({ project, number, imageSide }, index) => {
            const textCol = "lg:col-span-5";
            const imageCol = "lg:col-span-7";

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: shouldReduceMotion ? 0.4 : 0.9, ease }}
                className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                {/* ---------- TEXT COLUMN ---------- */}
                <div
                  className={`${textCol} ${imageSide === "left" ? "lg:order-2" : "lg:order-1"}`}
                >
                  {/* number + category */}
                  <div className="mb-6 flex items-center gap-4">
                    <span className="font-mono text-[var(--text-micro)] uppercase tracking-[0.25em] text-[var(--text-primary)]">
                      {number}
                    </span>
                    <span className="h-px w-8 bg-[var(--border-default)]" />
                    <span className="font-mono text-[var(--text-micro)] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                      {project.badge}
                    </span>
                  </div>

                  {/* title — allow natural wrapping for long titles */}
                  <h3 className="font-display text-[clamp(2rem,4vw,3.75rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)] transition-transform duration-500 ease-out group-hover:translate-x-1.5 text-wrap balance">
                    {project.title}
                  </h3>

                  {/* subtitle */}
                  <p className="mt-4 text-[var(--text-body)] font-medium text-[var(--text-secondary)]">
                    {project.subtitle}
                  </p>

                  {/* description — improved readability */}
                  <p className="project-description mt-5">
                    {project.description}
                  </p>

                  {/* technologies */}
                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* cta — prominent */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn-primary group/cta mt-10 inline-flex cursor-pointer items-center gap-3 px-8 py-4 text-[var(--text-label-sm)]"
                    data-cursor-project
                    data-cursor-label="OPEN"
                    aria-label={`Open case study: ${project.title}`}
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1" />
                  </button>
                </div>

                {/* ---------- IMAGE COLUMN ---------- */}
                <div
                  className={`${imageCol} ${imageSide === "left" ? "lg:order-1" : "lg:order-2"}`}
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="project-card group cursor-pointer overflow-hidden"
                    data-cursor-project
                    data-cursor-label="OPEN"
                    aria-label={`Open case study: ${project.title}`}
                  >
                    <div className="relative aspect-[4/3] w-full">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} — ${project.subtitle}`}
                          fill
                          sizes="(max-width: 1024px) 92vw, 58vw"
                          className="project-image"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[linear-gradient(135deg,var(--bg-card)_0%,var(--bg-primary)_100%)]">
                          <span className="font-mono text-[var(--text-micro)] uppercase tracking-[0.3em] text-[var(--text-dim)]">
                            No Preview
                          </span>
                          <span className="font-display text-3xl font-bold uppercase tracking-[-0.03em] text-[var(--text-secondary)]">
                            {project.title}
                          </span>
                          <span className="chip">{project.badge}</span>
                        </div>
                      )}

                      {/* editorial scrim */}
                      <div className="project-scrim" />

                      {/* status tag */}
                      {project.status && (
                        <div className="absolute left-5 top-5">
                          <span className="chip-accent backdrop-blur-md">{project.status}</span>
                        </div>
                      )}

                      {/* hover index */}
                      <div className="absolute bottom-5 right-5">
                        <span className="font-display text-5xl font-bold tracking-[-0.04em] text-white/10 transition-colors duration-500 group-hover:text-white/20">
                          {number}
                        </span>
                      </div>

                      {/* GitHub link overlay on hover */}
                      {project.githubUrl && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pointer-events-auto btn-primary px-8 py-4 text-[var(--text-label-sm)] transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                            data-cursor-hover
                            onClick={(e) => e.stopPropagation()}
                          >
                            <GithubIcon className="h-4 w-4" />
                            <span>View Source</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </button>
                </div>

                {index < projects.length - 1 && (
                  <div className="col-span-full mt-20 h-px bg-[var(--border-default)] sm:mt-28 lg:mt-36" />
                )}
              </motion.article>
            );
          })}
        </div>

        {/* =====================================================
            MODAL
        ===================================================== */}

        <ProjectDossier
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </section>
    </MotionSection>
  );
};

export default Projects;