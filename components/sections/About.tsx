"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { personalData } from "@/data/personal";
import { Brain, Cpu, Database, Network, UserCheck } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";

const pillars = [
  {
    icon: Brain,
    title: "Machine Learning & Deep Neural Nets",
    desc: "Developing and fine-tuning predictive algorithms, CNNs, and sequence models using TensorFlow & Scikit-learn.",
  },
  {
    icon: Network,
    title: "NLP & LLM Applications",
    desc: "Architecting document extraction pipelines, embedding workflows, and generative agents using the Gemini API.",
  },
  {
    icon: Database,
    title: "Data Engineering & Analytics",
    desc: "Cleaning, structuring, and exploring complex datasets using Pandas, NumPy, and relational SQL engines.",
  },
  {
    icon: Cpu,
    title: "Deployment & Practical AI",
    desc: "Bridging model experimentation into production via FastAPI, Docker containers, and responsive Next.js apps.",
  },
];

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionSection id="about" className="py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="Engineering pragmatic AI solutions grounded in rigorous data science and modern software principles."
          badge="Background"
          icon={UserCheck}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Bio Card */}
          <GlassCard glow="cyan" className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Data Science & AI Focus</h3>
                  <p className="text-xs text-cyan-400/80">VIT Vellore • B.Tech CSE (DS)</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {personalData.aboutBio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-sky-500/10">
              {personalData.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  className="p-2.5 rounded-xl bg-[#091226]/60 border border-sky-500/10 text-center transition-colors hover:border-cyan-500/30"
                >
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                  <div className="text-base sm:text-lg font-bold text-cyan-300 my-0.5">{stat.value}</div>
                  <div className="text-[11px] text-slate-500">{stat.subtext}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Pillars Column */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlassCard
                    hoverEffect
                    className="p-5 h-full flex items-start gap-4 border-sky-500/15"
                  >
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">{pillar.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </MotionSection>
  );
};
