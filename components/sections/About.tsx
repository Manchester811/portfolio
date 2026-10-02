"use client";

import React from "react";
import Image from "next/image";
import { personalData } from "@/data/personal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, useReducedMotion } from "framer-motion";
import { Brain, Database, Code2, Layers, Cpu, Award } from "lucide-react";

const focusAreas = [
  {
    icon: Brain,
    title: "Machine Learning & Deep Learning",
    desc: "Sequential and convolutional architectures, NLP pipelines, and generative LLM orchestrations.",
  },
  {
    icon: Database,
    title: "Data Engineering & Analytics",
    desc: "Feature extraction, statistical modeling, distributed preprocessing, and reliable ETL pipelines.",
  },
  {
    icon: Code2,
    title: "Software Engineering",
    desc: "High-throughput asynchronous REST APIs, containerized microservices, and reactive full-stack interfaces.",
  },
  {
    icon: Layers,
    title: "Practical AI Systems",
    desc: "Designing robust, production-ready intelligent software solving tangible real-world problems.",
  },
];

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="about" className="pt-4">
      {/* HUD Lead-in */}
      <div className="mb-2">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
          DOSSIER // RISHABH JAIN
        </div>
        <SectionHeading
          title="About & Engineering Philosophy"
          subtitle="Building intelligent software at the crossroads of mathematical foundations and production execution."
          accentColor="cyan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Editorial Narrative & Real Metrics */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/8 bg-[#060b1b] backdrop-blur-md space-y-4">
            {personalData.aboutBio.map((paragraph, idx) => (
              <p key={idx} className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                {paragraph}
              </p>
            ))}

            {/* Quick Fact Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/8 font-mono text-xs">
              {personalData.stats.map((stat, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/6">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1">
                    {stat.label}
                  </span>
                  <span className="text-sm font-bold text-white block">{stat.value}</span>
                  <span className="text-[9px] text-cyan-400/80 block mt-0.5">{stat.subtext}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Technical Hands Visual & Core Focus Modules */}
        <div className="lg:col-span-5 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] border border-cyan-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          >
            <Image
              src={personalData.skillsHandUrl}
              alt="Engineering visual"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060b1b] via-[#060b1b]/30 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase text-cyan-300">
              <span>SYSTEM ARCHITECTURE</span>
              <span>VIT VELLORE '27</span>
            </div>
          </motion.div>

          {/* Focus Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {focusAreas.map((area, i) => {
              const Icon = area.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-white/6 bg-[#060b1b] hover:border-cyan-500/30 transition-colors"
                >
                  <Icon className="w-4 h-4 text-cyan-400 mb-2" />
                  <h4 className="text-xs font-bold text-white mb-1">{area.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{area.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MotionSection>
  );
};
