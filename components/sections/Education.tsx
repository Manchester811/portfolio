"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { educationData } from "@/data/education";
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const Education: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="education" className="py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Education"
          subtitle="Academic foundations and specialized data science curriculum at VIT Vellore."
          badge="Academia"
          icon={GraduationCap}
        />

        {educationData.map((edu, idx) => (
          <GlassCard key={idx} glow="cyan" className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-sky-500/15">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {edu.degree}
                  </h3>
                  <div className="text-sm sm:text-base font-semibold text-cyan-300 mb-2">
                    {edu.field}
                  </div>
                  <div className="text-sm text-slate-300 font-medium">
                    {edu.institution}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {edu.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* CGPA Badge with subtle spring hover */}
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                className="flex flex-row md:flex-col items-center md:items-end justify-between p-4 rounded-2xl bg-[#081226]/80 border border-cyan-500/25 shrink-0 shadow-[0_0_18px_rgba(6,182,212,0.12)] cursor-default"
              >
                <span className="text-xs text-slate-400">{edu.scoreLabel}</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 tracking-tight">
                  {edu.score}
                </span>
                <span className="text-[11px] text-cyan-400/70 font-mono">Scale: 10.0</span>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              {/* Highlights */}
              <div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  Key Academic Highlights
                </h4>
                <ul className="space-y-2.5">
                  {edu.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Relevant Coursework */}
              <div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course, cIdx) => (
                    <motion.span
                      key={cIdx}
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                      className="text-xs px-3 py-1 rounded-lg bg-[#09142b] text-slate-300 border border-sky-500/15 hover:border-cyan-500/30 transition-colors cursor-default"
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </MotionSection>
  );
};
