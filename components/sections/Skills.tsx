"use client";

import React, { useState } from "react";
import { skillCategories, SkillCategory } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Code2, Brain, Database, Server, Wrench, Terminal, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

type IconFC = React.FC<{ className?: string }>;

const iconMap: Record<string, IconFC> = {
  Code: Code2 as IconFC,
  Brain: Brain as IconFC,
  Database: Database as IconFC,
  Server: Server as IconFC,
  Wrench: Wrench as IconFC,
};

export const Skills: React.FC = () => {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const shouldReduceMotion = useReducedMotion();

  const activeCategory: SkillCategory =
    skillCategories.find((c) => c.id === activeId) || skillCategories[0];
  const ActiveIcon: IconFC = (iconMap[activeCategory.icon] ?? Cpu) as IconFC;

  return (
    <MotionSection id="skills" className="pt-4">
      {/* HUD Lead-in */}
      <div className="mb-2">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
          TECHNICAL ECOSYSTEM // SYSTEM MAP
        </div>
        <SectionHeading
          title="Skills & Capabilities"
          subtitle="Engineering stack across machine learning frameworks, data architectures, and model deployment."
          accentColor="cyan"
        />
      </div>

      {/* System Category Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-6 font-mono text-xs">
        {skillCategories.map((cat) => {
          const TabIcon = (iconMap[cat.icon] ?? Terminal) as IconFC;
          const isActive = activeId === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveId(cat.id)}
              data-cursor-hover
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer focus:outline-none",
                isActive
                  ? "bg-cyan-950/70 border-cyan-400/50 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                  : "border-white/8 bg-[#060b19] text-slate-400 hover:border-white/20 hover:text-white"
              )}
            >
              <TabIcon className={cn("w-3.5 h-3.5", isActive ? "text-cyan-400" : "text-slate-500")} />
              <span>{cat.category.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Technical System Map Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="rounded-2xl sm:rounded-3xl border border-cyan-500/20 bg-[#060b1b] p-6 sm:p-8 backdrop-blur-md relative overflow-hidden"
        >
          {/* Subtle Corner Brackets */}
          <div className="absolute top-3 left-3 text-cyan-500/30 pointer-events-none hud-bracket">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M 1 15 L 1 1 L 15 1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="absolute top-3 right-3 text-cyan-500/30 pointer-events-none hud-bracket">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M 1 1 L 15 1 L 15 15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Category Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/8">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <ActiveIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {activeCategory.category}
                </h3>
                <p className="text-xs text-slate-400">{activeCategory.description}</p>
              </div>
            </div>

            <div className="font-mono text-[10px] text-cyan-400/80 bg-cyan-950/40 px-3 py-1 rounded-md border border-cyan-500/20 self-start sm:self-auto">
              MODULE // {activeCategory.skills.length} NODES
            </div>
          </div>

          {/* Capabilities Node Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {activeCategory.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/6 hover:border-cyan-500/30 hover:bg-cyan-950/10 transition-all duration-200 group"
              >
                <span className="mt-1 w-2 h-2 rounded-full bg-cyan-400/80 group-hover:bg-cyan-300 group-hover:shadow-[0_0_8px_#22d3ee] transition-all shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors">
                      {skill.name}
                    </span>
                    {skill.tag && (
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase rounded bg-cyan-950/60 border border-cyan-500/25 text-cyan-300">
                        {skill.tag}
                      </span>
                    )}
                  </div>
                  {skill.description && (
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {skill.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </MotionSection>
  );
};
