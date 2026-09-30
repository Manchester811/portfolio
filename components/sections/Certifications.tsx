"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { certificationsData } from "@/data/certifications";
import { Award, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const Certifications: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="certifications" className="py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Certifications & Credentials"
          subtitle="Industry-verified professional credentials in Deep Learning, Machine Learning, and Cloud AI."
          badge="Credentials"
          icon={Award}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificationsData.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.5,
                delay: shouldReduceMotion ? 0 : idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
            >
              <GlassCard
                hoverEffect
                className="p-6 h-full flex flex-col justify-between border-sky-500/15 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                      {cert.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {cert.issueDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-cyan-400/90 font-medium mb-4">
                    {cert.issuer}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2 py-0.5 rounded bg-[#09142b] text-slate-300 border border-sky-500/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-sky-500/10 text-xs">
                  {cert.credentialId && (
                    <span className="text-slate-400 font-mono text-[11px]">
                      ID: {cert.credentialId}
                    </span>
                  )}
                  {cert.credentialUrl && (
                    <motion.a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 2 }}
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors ml-auto font-medium"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </motion.a>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
};
