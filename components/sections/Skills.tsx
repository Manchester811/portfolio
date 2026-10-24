"use client";

import React from "react";
import { skillCategories } from "@/data/skills";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, useReducedMotion } from "framer-motion";
import { Brain, Code, Database, Server, type LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { FadeContent } from "@/components/reactbits/FadeContent";

const ease = [0.16, 1, 0.3, 1] as const;

const categoryIcons: Record<string, LucideIcon> = {
  Code,
  Database,
  Brain,
  Server,
};

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

        <FadeContent
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
          effect="fade"
          blur={2}
          duration={0.72}
          ease="power2.out"
          threshold={0.12}
          initialOpacity={0.06}
          stagger={0.1}
          staggerFrom="start"
          once
        >
          {skillCategories.map((cat, index) => (
            <div
              key={cat.id}
              className="min-h-full"
            >
              <SpotlightCard
                className="spotlight-card--skill group flex flex-col border border-[var(--border-default)] p-5 transition-[border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-[var(--border-hover)] sm:p-6"
                spotlightColor="var(--text-primary)"
                intensity={0.13}
                spotlightSize={230}
                softness={0.84}
                borderGlow={0.3}
                proximity={60}
                smoothing={0.32}
                flare
                data-spotlight="skill"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    {(() => {
                      const Icon = categoryIcons[cat.icon] ?? Code;
                      return (
                        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-colors duration-300 group-hover:border-[var(--border-hover)] group-hover:text-[var(--text-primary)]">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                      );
                    })()}
                    <h3 className="pt-1 font-display text-[clamp(1.05rem,1.4vw,1.35rem)] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
                      {cat.category}
                    </h3>
                  </div>
                  <span className="shrink-0 pt-1 font-mono text-[var(--text-micro)] tracking-[0.2em] text-[var(--text-dim)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="body-text-sm mt-3 text-[var(--text-muted)]">
                  {cat.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill.name}
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
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </div>
          ))}
        </FadeContent>
      </section>
    </MotionSection>
  );
};

export default Skills;
