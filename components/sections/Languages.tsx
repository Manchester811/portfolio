"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { languagesData } from "@/data/languages";
import { Globe } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const Languages: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="languages" className="py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Languages"
          subtitle="Communication proficiency and linguistic reach for global engineering collaboration."
          badge="Linguistics"
          icon={Globe}
        />

        <GlassCard glow="cyan" className="p-6 sm:p-8 md:p-10">
          <div className="space-y-6">
            {languagesData.map((lang, idx) => (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0.3 : 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-4 sm:p-5 rounded-2xl bg-[#091328]/70 border border-sky-500/15 hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-xs font-mono text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                      {lang.code}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {lang.language}
                      </h3>
                      <p className="text-xs text-cyan-400/80">
                        {lang.proficiency}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {lang.level}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {lang.description}
                </p>

                {/* Animated glowing progress meter */}
                <div className="w-full h-2 rounded-full bg-[#0a1428] border border-sky-500/20 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: shouldReduceMotion ? 0.3 : 1.0,
                      delay: shouldReduceMotion ? 0 : 0.2 + idx * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 shadow-[0_0_10px_#22d3ee]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </MotionSection>
  );
};
