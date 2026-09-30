"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { skillCategories } from "@/data/skills";
import { personalData } from "@/data/personal";
import { Cpu, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const shouldReduceMotion = useReducedMotion();

  const filteredCategories =
    selectedCategory === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedCategory);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionSection id="skills" className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Skills & Technical Expertise"
          subtitle="Specialized competencies spanning deep learning architectures, statistical computing, and scalable model deployment."
          badge="Expertise"
          icon={Cpu}
        />

        <GlassCard glow="cyan" className="p-6 sm:p-8 md:p-10">
          {/* Top category filter pills with smooth spring transitions */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 pb-6 border-b border-sky-500/15">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer ${
                selectedCategory === "all"
                  ? "text-white"
                  : "bg-[#091224] text-slate-400 hover:text-cyan-300 border border-sky-500/20"
              }`}
            >
              {selectedCategory === "all" && (
                <motion.div
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              All Skills ({skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "text-white"
                    : "bg-[#091224] text-slate-400 hover:text-cyan-300 border border-sky-500/20"
                }`}
              >
                {selectedCategory === cat.id && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                {cat.category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side visual graphic: Robotic Cyber Hand with Holographic Code */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
              <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.2)] bg-[#070e20] mb-5 group">
                <Image
                  src={personalData.skillsHandUrl}
                  alt="Futuristic AI Tech Stack Visual"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070e20] via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-4 rounded-xl bg-[#091224]/80 border border-sky-500/15 text-left w-full">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Engineering Methodology</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Focusing on model interpretability, latency-optimized inference, clean modular code, and verifiable data integrity.
                </p>
              </div>
            </div>

            {/* Right side: Structured Categorized Skill Cards */}
            <div className="lg:col-span-8 space-y-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-5"
                >
                  {filteredCategories.map((category) => (
                    <motion.div
                      key={category.id}
                      variants={itemVariants}
                      className="p-5 rounded-2xl bg-[#091224]/75 border border-sky-500/15 hover:border-cyan-400/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                          <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                            {category.category}
                          </h3>
                        </div>
                        <span className="text-[11px] text-cyan-400/80 font-mono">
                          {category.skills.length} competencies
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                        {category.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {category.skills.map((skill, sIdx) => (
                          <motion.div
                            key={sIdx}
                            whileHover={shouldReduceMotion ? undefined : { x: 3 }}
                            transition={{ duration: 0.15 }}
                            className="p-2.5 rounded-xl bg-[#0d1833]/70 border border-sky-500/10 hover:border-cyan-500/30 transition-colors flex items-start gap-2.5 group cursor-default"
                          >
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                                  {skill.name}
                                </span>
                                {skill.tag && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shrink-0">
                                    {skill.tag}
                                  </span>
                                )}
                              </div>
                              {skill.description && (
                                <p className="text-[11px] text-slate-400 line-clamp-1 leading-tight">
                                  {skill.description}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </GlassCard>
      </div>
    </MotionSection>
  );
};
