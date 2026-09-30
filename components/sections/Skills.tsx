"use client";

import React, { useState } from "react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Code2, Brain, Database, Server, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

type IconFC = React.FC<{ className?: string }>;

const iconMap: Record<string, IconFC> = {
  Code: Code2 as IconFC,
  Brain: Brain as IconFC,
  Database: Database as IconFC,
  Server: Server as IconFC,
  Wrench: Wrench as IconFC,
};

type AccentKey = "cyan" | "purple" | "blue" | "emerald" | "amber";

type AccentStyle = { pill: string; dot: string; tag: string };

const accentMap: Record<AccentKey, AccentStyle> = {
  cyan:    { pill: "bg-cyan-950/50 border-cyan-500/25 text-cyan-300",      dot: "bg-cyan-400",    tag: "bg-cyan-950/40 text-cyan-400 border-cyan-500/20" },
  purple:  { pill: "bg-purple-950/50 border-purple-500/25 text-purple-300", dot: "bg-purple-400",  tag: "bg-purple-950/40 text-purple-400 border-purple-500/20" },
  blue:    { pill: "bg-blue-950/50 border-blue-500/25 text-blue-300",      dot: "bg-blue-400",    tag: "bg-blue-950/40 text-blue-400 border-blue-500/20" },
  emerald: { pill: "bg-emerald-950/50 border-emerald-500/25 text-emerald-300", dot: "bg-emerald-400", tag: "bg-emerald-950/40 text-emerald-400 border-emerald-500/20" },
  amber:   { pill: "bg-amber-950/50 border-amber-500/25 text-amber-300",   dot: "bg-amber-400",   tag: "bg-amber-950/40 text-amber-400 border-amber-500/20" },
};

export const Skills: React.FC = () => {
  const [active, setActive] = useState(skillCategories[0].id);
  const shouldReduceMotion = useReducedMotion();

  const activeCategory = skillCategories.find((c) => c.id === active)!;
  const accent: AccentStyle = accentMap[activeCategory.accentColor as AccentKey];
  const ActiveIcon: IconFC = (iconMap[activeCategory.icon] ?? Code2) as IconFC;

  return (
    <MotionSection id="skills">
      <SectionHeading
        title="Skills"
        subtitle="Technologies and tools I work with across the AI/ML and software engineering stack."
        accentColor="cyan"
      />

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {skillCategories.map((cat) => {
          const TabIcon: IconFC = (iconMap[cat.icon] ?? Code2) as IconFC;
          const a: AccentStyle = accentMap[cat.accentColor as AccentKey];
          const isActive = active === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              data-cursor-hover
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                isActive
                  ? cn(a.pill, "shadow-lg")
                  : "text-slate-400 border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:text-slate-200"
              )}
            >
              <TabIcon className={cn("w-3.5 h-3.5", isActive ? "opacity-100" : "text-slate-500")} />
              {cat.category.split(" ")[0]}
            </button>
          );
        })}
      </div>

      {/* Active category panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="rounded-2xl border border-white/8 bg-[#080f24]/80 backdrop-blur-sm p-5 sm:p-6"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/6">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center border", accent.pill)}>
              <ActiveIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{activeCategory.category}</h3>
              <p className="text-xs text-slate-500">{activeCategory.description}</p>
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeCategory.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-colors duration-200 group"
              >
                <span className={cn("mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 opacity-80", accent.dot)} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white group-hover:text-cyan-100 transition-colors duration-150">
                      {skill.name}
                    </span>
                    {skill.tag && (
                      <span className={cn("px-2 py-0.5 text-[10px] font-medium rounded-md border", accent.tag)}>
                        {skill.tag}
                      </span>
                    )}
                  </div>
                  {skill.description && (
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
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
