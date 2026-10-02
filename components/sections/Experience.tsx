"use client";

import React from "react";
import { experienceData } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { Calendar, MapPin, CheckCircle2, Briefcase } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const Experience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="experience" className="pt-4">
      {/* HUD Lead-in */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
          CHRONOLOGY // ENGINEERING TIMELINE
        </div>
        <SectionHeading
          title="Practical Experience & Research"
          subtitle="Applied machine learning, statistical modeling, and predictive engineering initiatives."
          accentColor="cyan"
        />
      </div>

      {/* Cinematic Timeline Track */}
      <div className="relative border-l border-cyan-500/25 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {experienceData.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative"
          >
            {/* Pulsing Origin Marker on Timeline Line */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center justify-center">
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              </span>
            </div>

            {/* Experience Card */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-cyan-500/20 bg-[#060b1b] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/8">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-cyan-400 font-mono">
                    {exp.organization}
                  </p>
                </div>

                <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-slate-300 mb-4 leading-relaxed font-sans">
                {exp.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2 mb-5">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-xs sm:text-sm text-slate-400 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/6 font-mono text-[10px]">
                {exp.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-white/[0.03] text-cyan-300 border border-cyan-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </MotionSection>
  );
};
