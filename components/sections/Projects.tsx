"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projectsData, type ProjectItem } from "@/data/projects";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { ProjectDossier } from "@/components/ui/ProjectDossier";
import { MotionSection } from "@/components/ui/MotionSection";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { FadeContent } from "@/components/reactbits/FadeContent";

export function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const project = projectsData[selectedIndex] ?? projectsData[0];

  if (!project) return null;

  return (
    <MotionSection id="projects" className="py-0">
      <section className="section-container">
        <div className="mb-10 flex flex-col gap-6 border-b border-[var(--border-default)] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="label block">01 / Work</span>
            <h2 className="heading-display mt-5 text-[var(--text-primary)]">Selected <span className="text-[var(--text-muted)]">systems.</span></h2>
          </div>
          <a href="https://github.com/Manchester811" target="_blank" rel="noopener noreferrer" className="link-primary inline-flex items-center gap-2 font-mono text-[var(--text-label-sm)] uppercase tracking-[0.18em]" data-cursor-hover>
            GitHub <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mb-8 overflow-x-auto pb-2" role="tablist" aria-label="Selected projects">
          <div className="flex min-w-max gap-2">
            {projectsData.map((item, index) => {
              const active = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  id={`project-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`project-panel-${item.id}`}
                  onClick={() => setSelectedIndex(index)}
                  className={`group inline-flex cursor-pointer items-center gap-3 rounded-full border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none ${active ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]" : "border-[var(--border-default)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"}`}
                  data-cursor-hover
                >
                  <span className={active ? "text-[var(--bg-primary)]/60" : "text-[var(--text-dim)]"}>{String(index + 1).padStart(2, "0")}</span>
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            id={`project-panel-${project.id}`}
            role="tabpanel"
            aria-labelledby={`project-tab-${project.id}`}
             initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <FadeContent
              className="h-full"
              effect="focus"
              blur={3}
              duration={0.76}
              ease="power2.out"
              threshold={0.12}
              initialOpacity={0.08}
              once
            >
              <SpotlightCard
                className="spotlight-card--project grid gap-8 border border-[var(--border-default)] p-5 sm:p-6 lg:grid-cols-12 lg:gap-10 lg:p-8"
                spotlightColor="var(--text-primary)"
                intensity={0.14}
                spotlightSize={250}
                softness={0.82}
                borderGlow={0.32}
                proximity={72}
                smoothing={0.3}
                flare
                data-spotlight="project"
              >
                <div className="lg:col-span-5">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-primary)]" />
                  <span className="label-muted">{project.badge}</span>
                </div>
                <h3 className="font-display text-[clamp(2.4rem,6vw,5.8rem)] font-bold uppercase leading-[0.86] tracking-[-0.06em] text-[var(--text-primary)]">{project.title}</h3>
                <p className="mt-6 max-w-md text-xl leading-snug text-[var(--text-secondary)]">{project.subtitle}</p>
                <p className="project-description mt-5">{project.description}</p>

                <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--border-default)]">
                  {[
                    { label: "Domain", value: project.category },
                    { label: "Type", value: project.badge },
                    { label: "Stack", value: project.technologies?.slice(0, 2).join(" · ") ?? "See project notes" },
                    { label: "Status", value: project.status ?? "Documented" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[var(--bg-primary)] p-4">
                      <dt className="label-muted">{stat.label}</dt>
                      <dd className="mt-2 text-sm font-medium leading-snug text-[var(--text-primary)]">{stat.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-3.5 text-[var(--text-label-sm)]" data-cursor-hover>
                      <GithubIcon className="h-4 w-4" /> Source
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary px-6 py-3.5 text-[var(--text-label-sm)]" data-cursor-hover>
                      <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live demo
                    </a>
                  )}
                  <button type="button" onClick={() => setSelectedProject(project)} className="btn-outline cursor-pointer px-6 py-3.5 text-[var(--text-label-sm)]" data-cursor-project data-cursor-label="OPEN">
                    Open case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                </div>

                <div className="lg:col-span-7">
                <ArchitectureDiagram project={project} />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.keyHighlights.slice(0, 4).map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                      <span className="mt-2 h-px w-4 shrink-0 bg-[var(--text-primary)]" aria-hidden="true" />
                      {highlight}
                    </div>
                  ))}
                </div>
                </div>
              </SpotlightCard>
            </FadeContent>
          </motion.div>
        </AnimatePresence>

        <ProjectDossier project={selectedProject} onClose={() => setSelectedProject(null)} />
      </section>
    </MotionSection>
  );
}

export default Projects;
