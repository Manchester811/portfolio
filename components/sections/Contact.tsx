"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionSection } from "@/components/ui/MotionSection";
import { Button } from "@/components/ui/Button";
import { personalData } from "@/data/personal";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
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

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (!shouldReduceMotion) {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.8 },
          colors: ["#22d3ee", "#38bdf8", "#818cf8"],
        });
      }
    }, 600);
  };

  return (
    <MotionSection id="contact" className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Get In Touch"
          subtitle="Let's discuss data science projects, research opportunities, or technical collaborations."
          badge="Connect"
          icon={Mail}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Details Card */}
          <GlassCard glow="cyan" className="lg:col-span-5 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-2">
              Let&apos;s Build Together
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              I am actively seeking AI/ML engineering internships, research partnerships, and open-source collaborations.
            </p>

            <div className="space-y-4 mb-8">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { x: 3 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#091224]/80 border border-sky-500/15 hover:border-cyan-500/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-slate-400 block">Direct Email</span>
                  <a
                    href={`mailto:${personalData.email}`}
                    className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-cyan-300 truncate block transition-colors"
                  >
                    {personalData.email}
                  </a>
                </div>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { x: 3 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#091224]/80 border border-sky-500/15 hover:border-cyan-500/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Location</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    {personalData.location}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Social Connects with Micro-interactions */}
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-3 uppercase tracking-wider">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                <motion.a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a142c] hover:bg-[#101f42] text-xs font-medium text-slate-300 hover:text-white border border-sky-500/20 hover:border-cyan-500/40 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </motion.a>

                <motion.a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a142c] hover:bg-[#101f42] text-xs font-medium text-slate-300 hover:text-white border border-sky-500/20 hover:border-cyan-500/40 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </motion.a>
              </div>
            </div>
          </GlassCard>

          {/* Interactive Form Card */}
          <GlassCard glow="blue" className="lg:col-span-7 p-6 sm:p-8">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="py-12 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Message Dispatched!</h4>
                <p className="text-sm text-slate-300 max-w-sm mx-auto mb-6 leading-relaxed">
                  Thank you for reaching out, Rishabh will review your message and reply promptly.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#081124] border border-sky-500/20 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#081124] border border-sky-500/20 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="AI/ML Project Collaboration"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081124] border border-sky-500/20 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your ideas, requirements, or opportunities..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081124] border border-sky-500/20 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-200 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  icon={<Send className="w-4 h-4" />}
                  className="w-full mt-2"
                >
                  {isSubmitting ? "Transmitting..." : "Send Message"}
                </Button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </MotionSection>
  );
};
