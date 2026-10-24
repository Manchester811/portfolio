"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, Send, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { MotionSection } from "@/components/ui/MotionSection";
import { LocalTime } from "@/components/ui/LocalTime";
import { personalData } from "@/data/personal";
import { FadeContent } from "@/components/reactbits/FadeContent";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_FORM: FormValues = { name: "", email: "", phone: "", subject: "", message: "", website: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.phone.trim().length > 40) errors.phone = "Phone must be under 40 characters.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  else if (values.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitError("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, subject: values.subject.trim() || "Portfolio Contact" }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) throw new Error(data.error || "Could not send your message.");
      setValues(EMPTY_FORM);
      onSuccess();
    } catch (error) {
      console.error("[contact] submit failed", error);
      setSubmitError("Oops! Something went wrong. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "input-field";
  const labelClass = "input-label";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {submitError && (
        <div role="alert" className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>Name <span aria-hidden="true">*</span></label>
          <input id="contact-name" name="name" autoComplete="name" required value={values.name} onChange={update("name")} className={inputClass} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
          {errors.name && <p id="contact-name-error" className="mt-2 text-xs text-red-200">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>Email <span aria-hidden="true">*</span></label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={update("email")} className={inputClass} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
          {errors.email && <p id="contact-email-error" className="mt-2 text-xs text-red-200">{errors.email}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className={labelClass}>Phone <span className="text-[var(--text-dim)]">(optional)</span></label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update("phone")} className={inputClass} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined} />
          {errors.phone && <p id="contact-phone-error" className="mt-2 text-xs text-red-200">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="contact-subject" className={labelClass}>Subject <span className="text-[var(--text-dim)]">(optional)</span></label>
          <input id="contact-subject" name="subject" value={values.subject} onChange={update("subject")} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>Message <span aria-hidden="true">*</span></label>
        <textarea id="contact-message" name="message" required rows={5} value={values.message} onChange={update("message")} className={`${inputClass} resize-none`} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
        {errors.message && <p id="contact-message-error" className="mt-2 text-xs text-red-200">{errors.message}</p>}
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update("website")} />
      </div>
      <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="btn-primary w-full cursor-pointer py-4 text-[var(--text-label-sm)] disabled:cursor-not-allowed disabled:opacity-60">
        <span>{isSubmitting ? "Sending…" : "Send request"}</span>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
      </button>
    </form>
  );
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [success, setSuccess] = useState(false);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => document.getElementById("contact-name")?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button, input, textarea, [href], [tabindex]:not([tabindex='-1'])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close contact request" onClick={onClose} className="absolute inset-0 cursor-default bg-[rgba(5,5,5,0.84)] backdrop-blur-md" />
          <motion.div ref={dialogRef} initial={{ y: shouldReduceMotion ? 0 : 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: shouldReduceMotion ? 0 : 24, opacity: 0 }} transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-[var(--radius-xl)] border border-[var(--border-strong)] bg-[var(--bg-card)] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.78)] sm:p-8" data-lenis-prevent>
            <div className="mb-8 flex items-start justify-between gap-6 border-b border-[var(--border-default)] pb-6">
              <div>
                <span className="label-muted">Contact / Request</span>
                <h2 id="contact-modal-title" className="heading-major mt-3 text-[var(--text-primary)]">Let&apos;s make <span className="text-[var(--text-muted)]">something useful.</span></h2>
              </div>
              <button type="button" onClick={onClose} className="rounded-full border border-[var(--border-default)] p-2.5 text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]" aria-label="Close contact request">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {success ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center" role="status">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--accent-muted)]"><CheckCircle2 className="h-7 w-7" aria-hidden="true" /></div>
                <h3 className="mt-6 font-display text-3xl font-bold uppercase tracking-[-0.04em] text-[var(--text-primary)]">Request sent — Thank you!</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--text-secondary)]">Your note is on its way. I&apos;ll get back to you as soon as possible.</p>
                <button type="button" onClick={onClose} className="btn-secondary mt-8 cursor-pointer px-6 py-3 text-[var(--text-label-sm)]">Close</button>
              </div>
            ) : (
              <ContactForm onSuccess={() => setSuccess(true)} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Contact() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handleOpen = () => openModal();
    window.addEventListener("open-contact-modal", handleOpen);
    return () => window.removeEventListener("open-contact-modal", handleOpen);
  }, []);

  const channels = [
    { label: "Email", value: personalData.email, href: `mailto:${personalData.email}`, icon: Mail },
    { label: "Phone", value: personalData.phone, href: `tel:${personalData.phone.replace(/\s/g, "")}`, icon: Phone },
    { label: "LinkedIn", value: "linkedin.com/in/Manchester811", href: personalData.linkedin, icon: LinkedinIcon },
    { label: "GitHub", value: "github.com/Manchester811", href: personalData.github, icon: GithubIcon },
  ];

  return (
    <MotionSection id="contact" className="py-0">
      <section className="section-container">
        <FadeContent
          effect="fade"
          duration={0.72}
          ease="power2.out"
          threshold={0.1}
          initialOpacity={0.12}
          once
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="label block">07 / Contact</span>
            <h2 className="heading-hero mt-6 text-[var(--text-primary)]">Let&apos;s build<br />something<br /><span className="text-[var(--text-muted)]">intelligent.</span></h2>
            <p className="body-text mt-8 max-w-lg">{personalData.status}. Based in {personalData.location}.</p>
            <div className="mt-7 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 sm:p-5"><LocalTime /></div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return <a key={channel.label} href={channel.href} target={channel.href.startsWith("mailto:") || channel.href.startsWith("tel:") ? undefined : "_blank"} rel={channel.href.startsWith("mailto:") || channel.href.startsWith("tel:") ? undefined : "noopener noreferrer"} className="group flex min-w-0 items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 transition-colors hover:border-[var(--border-strong)]" data-cursor-hover><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)]"><Icon className="h-4 w-4" aria-hidden="true" /></span><span className="min-w-0"><span className="label-muted block">{channel.label}</span><span className="mt-1 block truncate text-sm text-[var(--text-primary)]">{channel.value}</span></span><span className="ml-auto text-[var(--text-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">↗</span></a>;
              })}
            </div>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-card)] p-6 sm:p-8">
              <span className="label-muted">A direct line</span>
              <p className="mt-5 text-2xl font-medium leading-snug tracking-[-0.03em] text-[var(--text-primary)]">Have a problem worth solving, a system to evaluate, or a role to discuss?</p>
              <button type="button" onClick={openModal} className="btn-primary mt-8 w-full cursor-pointer py-4 text-[var(--text-label-sm)]" data-cursor-hover><span>Open contact request</span><Send className="h-4 w-4" aria-hidden="true" /></button>
              <p className="mt-4 text-center text-xs leading-6 text-[var(--text-muted)]">Name, email, optional phone, and a short message. No account required.</p>
            </div>
          </div>
          </div>
        </FadeContent>
      </section>
      <ContactModal key={modalOpen ? "contact-open" : "contact-closed"} open={modalOpen} onClose={closeModal} />
    </MotionSection>
  );
}

export default Contact;
