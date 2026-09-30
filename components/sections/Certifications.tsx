"use client";

import React from "react";
import { certificationsData } from "@/data/certifications";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { ExternalLink, Award } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const accentBg: Record<string, string> = {
  "Deep Learning":           "border-purple-500/20 bg-purple-950/30",
  "Computer Vision & NLP":   "border-blue-500/20   bg-blue-950/30",
  "Supervised & Unsupervised ML": "border-cyan-500/20  bg-cyan-950/30",
  "Cloud & Infrastructure":  "border-emerald-500/20 bg-emerald-950/30",
};

export const Certifications: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="certifications">
      <SectionHeading
        title="Certifications"
        subtitle="Professional credentials in AI, deep learning, and cloud computing."
        accentColor="purple"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {certificationsData.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            className={`group relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 backdrop-blur-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] ${
              accentBg[cert.badge] ?? "border-white/8 bg-[#080f24]/80"
            }`}
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="shrink-0 w-9 h-9 rounded-xl bg-black/30 border border-white/8 flex items-center justify-center">
                <Award className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white leading-snug group-hover:text-cyan-200 transition-colors duration-200">
                  {cert.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{cert.issuer}</p>
              </div>
            </div>

            {/* Badge + date */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="px-2.5 py-0.5 text-[10px] font-semibold tracking-wide rounded-full bg-white/6 border border-white/10 text-slate-300 uppercase">
                {cert.badge}
              </span>
              <span className="text-[10px] text-slate-600">{cert.issueDate}</span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {cert.skills.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 text-[10px] rounded-md bg-white/5 border border-white/8 text-slate-400"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Verify link — only shown when real URL exists */}
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                data-cursor-hover
              >
                <ExternalLink className="w-3 h-3" />
                Verify Certificate
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </MotionSection>
  );
};
