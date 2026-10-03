"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Send, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { motion, useReducedMotion } from "framer-motion";
import { MotionSection } from "@/components/ui/MotionSection";
import { personalData } from "@/data/personal";

const ease = [0.16, 1, 0.3, 1] as const;

const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/rishabhkanha007@gmail.com";

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
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject || "Portfolio Contact",
          message: formState.message,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setIsSubmitted(true);
      if (!shouldReduceMotion) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#FFFFFF", "#E8E8E8", "#FAFAFA"],
        });
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const channels = [
    { label: "Email", value: personalData.email, href: `mailto:${personalData.email}`, icon: Mail },
    { label: "Phone", value: personalData.phone, href: `tel:${personalData.phone.replace(/[^+\d]/g, "")}`, icon: Phone },
    { label: "LinkedIn", value: "linkedin.com/in/Manchester811", href: personalData.linkedin, icon: LinkedinIcon },
    { label: "GitHub", value: "github.com/Manchester811", href: personalData.github, icon: GithubIcon },
  ];

  const inputClass =
    "w-full rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-card)] px-4 py-3.5 text-[var(--text-body-sm)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors duration-300 focus:border-[var(--border-strong)]";
  const labelClass =
    "mb-2 block font-mono text-[var(--text-micro)] uppercase tracking-[0.18em] text-[var(--text-muted)]";

  return (
    <MotionSection id="contact" className="py-0">
      <section className="section-container">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* ---------- LEFT — TEXT / SOCIALS / CONTACT INFO ---------- */}
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease }}
              className="label mb-6 block"
            >
              06 / Contact
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.05, ease }}
              className="heading-hero text-[var(--text-primary)]"
            >
              Let&apos;s build
              <br />
              something
              <br />
              <span className="text-[var(--text-muted)]">intelligent.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="body-text mt-8 max-w-md"
            >
              {personalData.status}. Based in {personalData.location}.
            </motion.p>

            {/* location */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.14, ease }}
              className="mt-6 flex items-center gap-3 text-[var(--text-body-sm)] text-[var(--text-secondary)]"
            >
              <MapPin className="h-4 w-4 text-[var(--text-muted)]" />
              {personalData.location}
            </motion.div>

            {/* channels */}
            <div className="mt-10 space-y-3">
              {channels.map((channel, i) => (
                <motion.a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={channel.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.06 * i, ease }}
                  className="group flex items-center gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] transition-all duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)]"
                  data-cursor-hover
                >
                  <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-muted)] text-[var(--text-primary)]">
                    {React.createElement(channel.icon, { className: "h-5 w-5" })}
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[var(--text-micro)] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {channel.label}
                    </p>
                    <p className="mt-1 truncate text-[var(--text-body-sm)] font-medium text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--text-secondary)]">
                      {channel.value}
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 text-[var(--text-muted)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--text-primary)]">
                    ↗
                  </span>
                </motion.a>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              href={personalData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 w-full sm:w-auto px-8 py-4 text-[var(--text-label-sm)]"
              data-cursor-hover
            >
              <span>Download Résumé</span>
            </motion.a>
          </div>

          {/* ---------- RIGHT — FORM (functionality preserved) ---------- */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="flex h-full flex-col justify-center rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-card)] p-10 text-center"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--accent-muted)]">
                  <CheckCircle2 className="h-6 w-6 text-[var(--text-primary)]" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-[-0.03em] text-[var(--text-primary)]">
                  Message Dispatched
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-[var(--text-body-sm)] leading-relaxed text-[var(--text-secondary)]">
                  Thank you for reaching out. Rishabh will review your message and
                  reply promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="btn-secondary mx-auto mt-8 px-6 py-3 text-[var(--text-micro)]"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-card)] p-6 sm:p-8"
              >
                {submitError && (
                  <div className="mb-6 rounded-[var(--radius-md)] border border-red-500/30 bg-red-500/10 px-4 py-3 text-[var(--text-body-sm)] text-red-300">
                    Failed to send. Please try again or email directly.
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Alex Morgan"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="subject" className={labelClass}>
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Project Inquiry / Collaboration / Role Opportunity"
                    className={inputClass}
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className={labelClass}>
                    Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Briefly describe your objectives, architecture specifications, or opportunity..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary mt-7 w-full py-4 text-[var(--text-label-sm)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>{isSubmitting ? "Sending…" : "Send Message"}</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </MotionSection>
  );
};

export default Contact;
