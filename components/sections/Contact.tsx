"use client";

import React, { useState } from "react";
import { personalData } from "@/data/personal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { Mail, MapPin, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { ResumeButton } from "@/components/ui/ResumeButton";
import confetti from "canvas-confetti";
import { motion, useReducedMotion } from "framer-motion";

export const Contact: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (!shouldReduceMotion) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#22d3ee", "#38bdf8", "#3b82f6"],
        });
      }
    }, 600);
  };

  return (
    <MotionSection id="contact" className="pt-4 pb-12">
      {/* HUD Lead-in */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
          TERMINAL // TRANSMISSION PROTOCOL
        </div>
        <SectionHeading
          title="Let's Build Something Intelligent."
          subtitle="Open for machine learning engineering roles, AI research partnerships, and production collaborations."
          accentColor="cyan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Direct Channels & Resume Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-cyan-500/20 bg-[#060b1b] shadow-[0_8px_30px_rgba(0,0,0,0.5)] space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              {personalData.name}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-cyan-400 mb-3">
              {personalData.role}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Looking to deploy scalable AI models or discuss advanced data systems? Reach out directly via any channel.
            </p>
          </div>

          {/* Quick Access Channels */}
          <div className="space-y-3 font-mono text-xs">
            <a
              href={`mailto:${personalData.email}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/6 hover:border-cyan-500/40 hover:bg-cyan-950/20 transition-all group"
              data-cursor-hover
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block uppercase">DIRECT TRANSMISSION</span>
                <span className="text-slate-200 group-hover:text-cyan-300 transition-colors truncate block font-medium">
                  {personalData.email}
                </span>
              </div>
            </a>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/6">
              <div className="w-9 h-9 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">GEOGRAPHIC LOCATION</span>
                <span className="text-slate-200 font-medium">{personalData.location}</span>
              </div>
            </div>
          </div>

          {/* Social Profiles & Resume */}
          <div className="pt-2 border-t border-white/8 space-y-4">
            <div className="flex items-center gap-3 font-mono text-xs">
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-slate-300 hover:text-white transition-colors"
                data-cursor-hover
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-slate-300 hover:text-white transition-colors"
                data-cursor-hover
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Resume Button */}
            <div className="pt-1">
              <ResumeButton url={personalData.resumeUrl} variant="primary" />
            </div>
          </div>
        </div>

        {/* Transmission Terminal Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-cyan-500/20 bg-[#060b1b] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Transmission Dispatched</h4>
              <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed font-sans">
                Thank you for getting in touch. Your transmission has been logged and Rishabh will follow up shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({ name: "", email: "", subject: "", message: "" });
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider hover:bg-cyan-500/20 transition-colors"
              >
                Send Another Dispatch
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">
                    IDENTIFIER / NAME
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040816] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">
                    COMMUNICATION ADDRESS / EMAIL
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040816] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">
                  TRANSMISSION SUBJECT
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="AI / ML Opportunity"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040816] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">
                  PAYLOAD / MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Briefly describe your objectives, architecture specifications, or project details..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040816] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono font-semibold tracking-wider text-xs shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all cursor-pointer"
                data-cursor-hover
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "TRANSMITTING..." : "DISPATCH TRANSMISSION"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </MotionSection>
  );
};
