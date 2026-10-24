"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projectsData } from "@/data/projects";
import { certificationsData } from "@/data/certifications";
import { educationData } from "@/data/education";
import { stackData } from "@/data/stack";
import { CountUp } from "@/components/ui/CountUp";
import { MotionSection } from "@/components/ui/MotionSection";

export function Stats() {
  const shouldReduceMotion = useReducedMotion();
  const stats = [
    { label: "Projects", value: projectsData.length, suffix: "+", subtext: "documented builds" },
    { label: "CGPA", value: Number(educationData[0]?.score ?? 0), decimals: 2, suffix: "/10", subtext: "current record" },
    { label: "Credentials", value: certificationsData.length, suffix: "+", subtext: "listed certifications" },
    { label: "Technologies", value: new Set(stackData).size, suffix: "+", subtext: "in the working stack" },
  ];

  return (
    <MotionSection id="stats" className="py-0">
      <section className="section-container">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border-default)] pb-6">
          <div>
            <span className="label block">Signal / In numbers</span>
            <h2 className="heading-major mt-4 text-[var(--text-primary)]">Built, studied, <span className="text-[var(--text-muted)]">shipped.</span></h2>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)] sm:block">Verified data only</span>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--border-default)] lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="bg-[var(--bg-primary)] p-5 sm:p-7"
            >
              <span className="label-muted">{stat.label}</span>
              <CountUp end={stat.value} decimals={stat.decimals} suffix={stat.suffix} className="mt-5 block font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-none tracking-[-0.06em] text-[var(--text-primary)]" />
              <p className="mt-3 text-sm text-[var(--text-secondary)]">{stat.subtext}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </MotionSection>
  );
}

export default Stats;
