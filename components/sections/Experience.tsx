"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { experienceData } from "@/data/experience";
import { Briefcase, Calendar, MapPin, CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const Experience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="experience" className="py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Practical Experience & Research"
          subtitle="Applied machine learning engineering, data analytics initiatives, and deep learning implementations."
          badge="Journey"
          icon={Briefcase}
        />

        <div className="space-y-6">
          {experienceData.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.6,
                delay: shouldReduceMotion ? 0 : idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <GlassCard glow="blue" hoverEffect className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse-glow" />
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 ml-1">
                        {exp.type}
                      </span>
                    </div>
                    <div className="text-sm text-cyan-300/90 font-medium">
                      {exp.organization}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
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

                <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-xs sm:text-sm text-slate-400 flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-cyan-400/80 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-sky-500/10">
                  {exp.technologies.map((tech, tIdx) => (
                    <motion.span
                      key={tIdx}
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-[#081226] text-cyan-300 border border-sky-500/20 cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
};
