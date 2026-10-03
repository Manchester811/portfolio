"use client";

import React from "react";
import { certificationsData } from "@/data/certifications";
import { MotionSection } from "@/components/ui/MotionSection";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export const CertificationsLanguages: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="certifications" className="py-0">
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
            05 / Credentials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.05, ease }}
            className="heading-display max-w-4xl text-[var(--text-primary)]"
          >
            Verified{" "}
            <span className="text-[var(--text-muted)]">credentials.</span>
          </motion.h2>
        </div>

        {/* =====================================================
            CERTIFICATIONS — compact rows
        ===================================================== */}

        <div className="border-t border-[var(--border-default)]">
          {certificationsData.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.65, delay: 0.04 * index, ease }}
              className="group grid grid-cols-1 items-center gap-4 border-b border-[var(--border-subtle)] py-6 transition-colors duration-500 hover:bg-[rgba(255,255,255,0.015)] md:grid-cols-12 md:gap-6"
            >
              {/* name + issuer */}
              <div className="flex items-start gap-4 md:col-span-8">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--text-primary)]" />
                <div>
                  <h3 className="text-[var(--text-body)] font-semibold leading-snug text-[var(--text-primary)]">
                    {cert.name}
                  </h3>
                  <p className="body-text-sm mt-1.5">{cert.issuer}</p>
                </div>
              </div>

              {/* date + credential id */}
              <div className="flex flex-col items-start gap-1 md:col-span-4 md:items-end">
                <span className="meta-text">{cert.issueDate}</span>
                {cert.credentialId && (
                  <span className="font-mono text-[var(--text-micro)] tracking-[0.05em] text-[var(--text-dim)]">
                    ID: {cert.credentialId}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </MotionSection>
  );
};

export default CertificationsLanguages;
