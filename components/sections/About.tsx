"use client";

import React from "react";
import { personalData } from "@/data/personal";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, useReducedMotion } from "framer-motion";
import { FadeContent } from "@/components/reactbits/FadeContent";

const ease = [0.16, 1, 0.3, 1] as const;

const capabilities = [
  "Generative AI",
  "Machine Learning",
  "Data Science",
  "Developer Tools",
];

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="about" className="py-0">
      <section className="section-container">
        {/* =====================================================
            SECTION MARKER
            The heading itself lives in the left column below, so the
            composition is heading + paragraph on the left and the 2x2
            capability cards on the right, on one horizontal field.
        ===================================================== */}

        <div className="mb-10 border-b border-[var(--border-default)] pb-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="label block"
          >
            02 / About
          </motion.span>
        </div>

        {/* =====================================================
            BODY — 7 / 5 horizontal split
        ===================================================== */}

        <FadeContent
          effect="focus"
          blur={2}
          duration={0.68}
          ease="power2.out"
          threshold={0.12}
          initialOpacity={0.18}
          once
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* ---------- LEFT — HEADING + STATEMENT + PROFILE ---------- */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.05, ease }}
              className="heading-display text-[var(--text-primary)]"
            >
              Turning data into{" "}
              <span className="text-[var(--text-muted)]">intelligent systems.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="mt-7 text-[var(--text-body-lg)] font-medium leading-[1.55] tracking-[-0.015em] text-[var(--text-primary)] text-pretty"
            >
              {personalData.shortBio}
            </motion.p>

            {personalData.aboutBio.length > 0 && (
              <div className="mt-6 space-y-5">
                {personalData.aboutBio.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.06 * i, ease }}
                    className="body-text-sm max-w-2xl"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            )}

            {/* profile facts */}
            <div className="mt-10">
              <p className="label-muted mb-5">Profile</p>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--border-subtle)]">
                {[
                  { label: "Discipline", value: "Data Science" },
                  { label: "Institution", value: "VIT Vellore" },
                  { label: "Location", value: personalData.location },
                  { label: "Graduating", value: "2027" },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-col gap-1.5 bg-[var(--bg-card)] p-4 sm:p-5"
                  >
                    <dt className="font-mono text-[var(--text-micro)] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {fact.label}
                    </dt>
                    <dd className="text-[var(--text-body-sm)] font-medium text-[var(--text-primary)]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* ---------- RIGHT — 2x2 CAPABILITY CARDS ---------- */}
          <div className="lg:col-span-5">
            <p className="label-muted mb-5">Capabilities</p>
            <div className="grid grid-cols-2 gap-3">
              {capabilities.map((area, i) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.04 * i, ease }}
                  className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] px-4 py-4 transition-colors duration-300 hover:border-[var(--border-hover)]"
                >
                  <span className="shrink-0 font-mono text-[var(--text-label-sm)] tracking-[0.1em] text-[var(--text-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[var(--text-body-sm)] font-medium text-[var(--text-primary)]">
                    {area}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          </div>
        </FadeContent>
      </section>
    </MotionSection>
  );
};

export default About;
