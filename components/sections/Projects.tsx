"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectsData, ProjectItem } from "@/data/projects";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { FolderGit2, Info, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { motion, useReducedMotion, Variants } from "framer-motion";

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const shouldReduceMotion = useReducedMotion();

  const categories = ["All", "AI / ML", "Computer Vision", "Cybersecurity & Data"];

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.14,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 25,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="projects" className="py-16 md:py-24 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Featured Projects"
          subtitle="Production-grade AI applications, deep learning architectures, and predictive security systems."
          badge="Showcase"
          icon={FolderGit2}
        />

        <GlassCard glow="cyan" className="p-6 sm:p-8 md:p-10">
          {/* Category Filter Tabs with smooth active indicators */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 pb-5 border-b border-sky-500/15">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer ${
                  activeFilter === cat
                    ? "text-white"
                    : "text-slate-400 hover:text-cyan-300 bg-[#091224] border border-sky-500/15"
                }`}
              >
                {activeFilter === cat && (
                  <motion.div
                    layoutId="projectFilterPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_14px_rgba(6,182,212,0.45)]"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Sequential Project Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <div className="h-full rounded-2xl bg-[#091328]/85 border border-sky-500/15 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.22)] transition-all duration-400 flex flex-col overflow-hidden group">
                  {/* Thumbnail Container with Zoom on Hover */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative w-full h-48 overflow-hidden bg-[#060b17] cursor-pointer"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-106 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091328] via-transparent to-transparent opacity-80" />

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#070e1f]/85 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        {project.badge}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/20">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-1 cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs text-cyan-400/90 font-medium mb-3">
                        {project.subtitle}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Badges with subtle scale */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#0e1c38] text-slate-300 border border-sky-500/10 group-hover:border-cyan-500/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#0e1c38] text-cyan-400">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-sky-500/10">
                        <motion.button
                          onClick={() => setSelectedProject(project)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-medium border border-cyan-500/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Specs</span>
                        </motion.button>

                        {project.liveDemoUrl && (
                          <motion.a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Live demo for ${project.title}`}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-xl bg-[#0e1c38] hover:bg-[#14264d] text-slate-300 hover:text-white border border-sky-500/20 transition-colors"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </motion.a>
                        )}

                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub repo for ${project.title}`}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-xl bg-[#0e1c38] hover:bg-[#14264d] text-slate-300 hover:text-white border border-sky-500/20 transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </GlassCard>
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
