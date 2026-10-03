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

        <div className="mb-14 border-b border-[var(--border-default)] pb-10 md:mb-16">
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
            CAPABILITY GRID — 2x2 category blocks
        ===================================================== */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: 0.05 * index, ease }}
              className="group rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-card)] p-6 transition-colors duration-500 hover:border-[var(--border-hover)] sm:p-8"
            >
              {/* header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold uppercase leading-[1.04] tracking-[-0.03em] text-[var(--text-primary)]">
                    {cat.category}
                  </h3>
                  <p className="body-text-sm mt-2 max-w-sm text-[var(--text-muted)]">
                    {cat.description}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[var(--text-micro)] tracking-[0.2em] text-[var(--text-dim)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* skills */}
              <ul className="mt-6 flex flex-wrap gap-2">
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
