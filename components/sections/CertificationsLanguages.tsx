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

        <div className="mb-10 border-b border-[var(--border-default)] pb-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="label mb-5 block"
          >
             06 / Credentials
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
            CERTIFICATIONS — four compact cards in one horizontal row
        ===================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certificationsData.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.65, delay: 0.04 * index, ease }}
              className="group flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-5 transition-colors duration-500 hover:border-[var(--border-hover)]"
            >
              {/* name + issuer */}
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--text-primary)]" aria-hidden="true" />
                <h3 className="text-[var(--text-body-sm)] font-semibold leading-snug text-[var(--text-primary)]">
                  {cert.name}
                </h3>
              </div>

              <p className="body-text-sm mt-auto">{cert.issuer}</p>

              {/* date + credential id + verification link */}
              <div className="flex flex-col items-start gap-1.5">
                <span className="meta-text">{cert.issueDate}</span>
                {cert.credentialId && (
                  <span className="break-all font-mono text-[var(--text-micro)] leading-[1.5] tracking-[0.05em] text-[var(--text-dim)]">
                    ID: {cert.credentialId}
                  </span>
                )}
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify ${cert.name} — opens in a new tab`}
                    data-cursor-hover
                    className="link-primary inline-flex items-center gap-1 font-mono text-[var(--text-micro)] tracking-[0.08em] text-[var(--text-primary)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors duration-300 hover:decoration-[var(--text-primary)]"
                  >
                    Verify <span aria-hidden="true">↗</span>
                  </a>
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
