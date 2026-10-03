"use client";

import React from "react";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export const ExperienceEducation: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="experience" className="py-0">
      <section className="section-container">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mb-14 border-b border-[var(--border-default)] pb-10 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="label mb-5 block"
          >
            04 / Trajectory
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.05, ease }}
            className="heading-display max-w-4xl text-[var(--text-primary)]"
          >
            Where I&apos;ve built{" "}
            <span className="text-[var(--text-muted)]">and learned.</span>
          </motion.h2>
        </div>

        {/* =====================================================
            SPLIT LAYOUT — EXPERIENCE | EDUCATION
        ===================================================== */}

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-0">
          {/* ---------- EXPERIENCE ---------- */}
          <div className="lg:pr-12">
            <p className="label-muted mb-8">Experience</p>

            <div className="border-t border-[var(--border-default)]">
              {experienceData.map((exp, index) => (
                <motion.article
                  key={exp.id}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.75, delay: 0.05 * index, ease }}
                  className="group border-b border-[var(--border-subtle)] py-8 transition-colors duration-500 hover:bg-[rgba(255,255,255,0.015)] md:py-10"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[var(--text-label)] tracking-[0.08em] text-[var(--text-primary)]">
                      {exp.period}
                    </p>
                    <p className="font-mono text-[var(--text-micro)] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {exp.type}
                    </p>
                  </div>

                  <h3 className="mt-4 font-display text-[clamp(1.35rem,2.2vw,2rem)] font-bold uppercase leading-[1.05] tracking-[-0.025em] text-[var(--text-primary)]">
                    {exp.role}
                  </h3>
                  <p className="mt-2 text-[var(--text-body-sm)] font-medium text-[var(--text-secondary)]">
                    {exp.organization}
                  </p>
                  <p className="mt-1 font-mono text-[var(--text-micro)] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                    {exp.location}
                  </p>

                  <p className="body-text-sm mt-5">{exp.description}</p>

                  <ul className="mt-5 space-y-2.5">
                    {exp.bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, delay: 0.05 * i, ease }}
                        className="flex gap-3 body-text-sm"
                      >
                        <span className="mt-2.5 h-px w-4 shrink-0 bg-[var(--text-primary)]" />
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* ---------- EDUCATION ---------- */}
          <div id="education" className="lg:border-l lg:border-[var(--border-default)] lg:pl-12">
            <p className="label-muted mb-8">Education</p>

            {educationData.map((edu, index) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.85, delay: 0.05 * index, ease }}
                className="border-t border-[var(--border-default)] py-8 md:py-10"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[clamp(1.15rem,1.8vw,1.5rem)] tracking-[-0.01em] text-[var(--text-primary)]">
                    {edu.period}
                  </p>
                  <p className="font-mono text-[var(--text-micro)] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {edu.location}
                  </p>
                </div>

                <h3 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-bold uppercase leading-[1.04] tracking-[-0.03em] text-[var(--text-primary)]">
                  {edu.degree}
                </h3>
                <p className="mt-3 text-[var(--text-body)] font-medium text-[var(--text-secondary)]">
                  {edu.field}
                </p>
                <p className="mt-4 text-[var(--text-body-sm)] font-semibold text-[var(--text-primary)]">
                  {edu.institution}
                </p>

                {/* score */}
                <div className="mt-7 inline-flex items-baseline gap-3 border-l border-[var(--border-strong)] pl-4">
                  <span className="font-display text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                    {edu.score}
                  </span>
                  <span className="font-mono text-[var(--text-micro)] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {edu.scoreLabel}
                  </span>
                </div>

                <div className="mt-8">
                  <p className="label-muted mb-4">Coursework</p>
                  <ul className="space-y-2">
                    {edu.coursework.map((course, i) => (
                      <motion.li
                        key={course}
                        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: 0.04 * i, ease }}
                        className="flex gap-3 body-text-sm"
                      >
                        <span className="mt-2 h-px w-3 shrink-0 bg-[var(--border-default)]" />
                        {course}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {edu.priorEducation && edu.priorEducation.length > 0 && (
                  <div className="mt-8">
                    <p className="label-muted mb-4">Prior Education</p>
                    <div className="grid grid-cols-2 gap-3">
                      {edu.priorEducation.map((pe) => (
                        <div
                          key={pe.label}
                          className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4"
                        >
                          <span className="font-mono text-[var(--text-micro)] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                            {pe.label}
                          </span>
                          <span className="mt-1 block font-display text-2xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                            {pe.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MotionSection>
  );
};

export default ExperienceEducation;
