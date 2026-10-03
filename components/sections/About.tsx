"use client";

import React from "react";
import { personalData } from "@/data/personal";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, useReducedMotion } from "framer-motion";

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
            02 / About
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.05, ease }}
            className="heading-display max-w-5xl text-[var(--text-primary)]"
          >
            Turning data into{" "}
            <span className="text-[var(--text-muted)]">intelligent systems.</span>
          </motion.h2>
        </div>

        {/* =====================================================
            ASYMMETRIC BODY — 7 / 5
        ===================================================== */}

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* ---------- LEFT — STATEMENT + BIO + CAPABILITIES ---------- */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="text-[var(--text-body-lg)] font-medium leading-[1.55] tracking-[-0.015em] text-[var(--text-primary)] text-pretty"
            >
              {personalData.shortBio}
            </motion.p>

            {personalData.aboutBio.length > 0 && (
              <div className="mt-8 space-y-5">
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

            {/* capability blocks */}
            <div className="mt-12">
              <p className="label-muted mb-6">Capabilities</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {capabilities.map((area, i) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.04 * i, ease }}
                    className="flex items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] px-5 py-4 transition-colors duration-300 hover:border-[var(--border-hover)]"
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

          {/* ---------- RIGHT — PROFILE + STRENGTHS ---------- */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="label-muted mb-6">Profile</p>

              <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--border-subtle)] sm:grid-cols-2">
                {[
                  { label: "Discipline", value: "Data Science" },
                  { label: "Institution", value: "VIT Vellore" },
                  { label: "Location", value: personalData.location },
                  { label: "Graduating", value: "2027" },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-col gap-2 bg-[var(--bg-card)] p-5"
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
        </div>
      </section>
    </MotionSection>
  );
};

export default About;
