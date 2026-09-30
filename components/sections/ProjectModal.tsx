"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ProjectItem } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { X, ExternalLink, CheckCircle } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with smooth blur and fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.94,
              y: shouldReduceMotion ? 0 : 20,
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
              damping: 28,
              stiffness: 340,
            }}
            className="relative w-full max-w-3xl rounded-3xl bg-[#0b1328] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden z-10 my-8"
          >
            {/* Animated Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              aria-label="Close project modal"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#080e1e]/85 text-slate-300 hover:text-white hover:bg-cyan-500/20 border border-sky-500/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Project Preview Image */}
            <div className="relative w-full h-56 sm:h-72 overflow-hidden bg-[#070c1a]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1328] via-[#0b1328]/40 to-transparent" />

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                  {project.badge}
                </span>
                <span className="text-xs font-mono text-cyan-400 bg-[#091224]/85 px-2.5 py-1 rounded-md border border-cyan-500/20">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-cyan-400">
                  {project.subtitle}
                </p>
              </div>

              {/* Long Description */}
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                {project.longDescription.map((desc, idx) => (
                  <p key={idx}>{desc}</p>
                ))}
              </div>

              {/* Key Technical Highlights */}
              <div className="p-4 rounded-2xl bg-[#080f22]/70 border border-sky-500/15">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  Key Technical Innovations
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.keyHighlights.map((hl, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#09142b]/60 border border-sky-500/10">
                  <span className="text-slate-400 block mb-0.5">Model / Architecture:</span>
                  <span className="text-white font-medium">{project.architectureDetails.modelType}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#09142b]/60 border border-sky-500/10">
                  <span className="text-slate-400 block mb-0.5">Key Performance Metrics:</span>
                  <span className="text-cyan-300 font-medium">{project.architectureDetails.metrics}</span>
                </div>
              </div>

              {/* Tech Badges */}
              <div>
                <div className="text-xs text-slate-400 mb-2">Technologies Used:</div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="cyan" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-sky-500/15">
                {project.liveDemoUrl && (
                  <Button
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="md"
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Live Demo
                  </Button>
                )}

                <Button
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="md"
                  icon={<GithubIcon className="w-4 h-4" />}
                >
                  Source Repository
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
