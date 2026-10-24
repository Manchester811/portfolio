"use client";

import React from "react";
import { skillCategories } from "@/data/skills";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export const Skills: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="skills" className="py-0">
      <section className="section-container">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mb-10 border-b border-[var(--border-default)] pb-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="label mb-5 block"
          >
            03 / Stack
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.05, ease }}
            className="heading-display max-w-4xl text-[var(--text-primary)]"
          >
            The stack I{" "}
            <span className="text-[var(--text-muted)]">build with.</span>
          </motion.h2>
        </div>

        {/* =====================================================
            CAPABILITY GRID — four compact categories in one row
            on desktop, so no single card is forced to be tall.
        ===================================================== */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: 0.05 * index, ease }}
              className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-5 transition-colors duration-500 hover:border-[var(--border-hover)] sm:p-6"
            >
              {/* header */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-[clamp(1.05rem,1.4vw,1.35rem)] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
                  {cat.category}
                </h3>
                <span className="shrink-0 font-mono text-[var(--text-micro)] tracking-[0.2em] text-[var(--text-dim)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="body-text-sm mt-2 text-[var(--text-muted)]">
                {cat.description}
              </p>

              {/* skills */}
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <motion.li
                    key={skill.name}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, ease }}
                    className="chip flex items-center gap-2"
                  >
                    <span className="text-[var(--text-label-sm)] font-semibold normal-case tracking-normal text-[var(--text-primary)]">
                      {skill.name}
                    </span>
                    {skill.tag && (
                      <span className="meta-text normal-case tracking-normal text-[var(--text-dim)]">
                        {skill.tag}
                      </span>
                    )}
                    {skill.flagged && (
                      <span
                        title="No matching project yet — decide whether to keep this skill"
                        aria-label="No matching project yet"
                        className="font-mono text-[var(--text-micro)] leading-none text-[var(--text-dim)]"
                      >
                        ?
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </MotionSection>
  );
};

export default Skills;
