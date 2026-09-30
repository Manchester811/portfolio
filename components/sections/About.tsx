"use client";

import React from "react";
import Image from "next/image";
import { personalData } from "@/data/personal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, useReducedMotion } from "framer-motion";
import { Brain, Database, Code2, Layers, GraduationCap, Cpu } from "lucide-react";

const focusAreas = [
  {
    icon: Brain,
    title: "Machine Learning",
    color: "text-purple-400",
    bg: "bg-purple-950/40 border-purple-500/20",
    desc: "Neural architectures, deep learning, NLP pipelines, LLM integrations.",
  },
  {
    icon: Database,
    title: "Data Engineering",
    color: "text-blue-400",
    bg: "bg-blue-950/40 border-blue-500/20",
    desc: "End-to-end data pipelines, preprocessing, statistical analysis.",
  },
  {
    icon: Code2,
    title: "Software Engineering",
    color: "text-cyan-400",
    bg: "bg-cyan-950/40 border-cyan-500/20",
    desc: "Production APIs, full-stack web, containerized microservices.",
  },
  {
    icon: Layers,
    title: "AI Systems",
    color: "text-emerald-400",
    bg: "bg-emerald-950/40 border-emerald-500/20",
    desc: "Designing and deploying practical, real-world intelligent systems.",
  },
];

const stats = [
  { icon: GraduationCap, label: "Institution", value: "VIT Vellore" },
  { icon: Cpu, label: "CGPA", value: "8.13 / 10" },
];

const itemV = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.09 },
  }),
};

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="about">
      <SectionHeading
        title="About"
        subtitle="Building intelligent systems at the intersection of data, algorithms, and engineering."
        accentColor="blue"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        {/* Left: bio + stats */}
        <div className="lg:col-span-3 space-y-6">
          {personalData.aboutBio.map((para, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={shouldReduceMotion ? undefined : itemV}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-slate-400 leading-relaxed text-sm sm:text-base"
            >
              {para}
            </motion.p>
          ))}

          {/* Stat chips */}
          <motion.div
            custom={3}
            variants={shouldReduceMotion ? undefined : itemV}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 pt-2"
          >
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a1628]/80 border border-white/8 text-sm"
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-500 text-xs">{label}:</span>
                <span className="text-white font-semibold text-xs">{value}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: skills image + focus areas */}
        <div className="lg:col-span-2 space-y-4">
          {/* Skills visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/8"
          >
            <Image
              src={personalData.skillsHandUrl}
              alt="Technical skills visualization"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050814]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
          </motion.div>

          {/* Focus area cards */}
          <div className="grid grid-cols-2 gap-3">
            {focusAreas.map((area, i) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  custom={i}
                  variants={shouldReduceMotion ? undefined : itemV}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`p-3.5 rounded-xl border text-left ${area.bg} backdrop-blur-sm`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${area.color}`} />
                  <p className="text-white text-xs font-semibold mb-1">{area.title}</p>
                  <p className="text-slate-500 text-[10px] leading-relaxed">{area.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </MotionSection>
  );
};
