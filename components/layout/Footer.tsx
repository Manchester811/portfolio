"use client";

import { personalData } from "@/data/personal";
import { ArrowUp, ArrowUpRight, Download } from "lucide-react";
import { LocalTime } from "@/components/ui/LocalTime";
import { motion } from "framer-motion";

export function Footer() {
  const openContact = () => window.dispatchEvent(new CustomEvent("open-contact-modal"));
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const links = [
    { label: "GitHub", href: personalData.github },
    { label: "LinkedIn", href: personalData.linkedin },
    { label: "Email", href: `mailto:${personalData.email}` },
  ];

  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-primary)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <span className="label-muted">End of the page / Beginning of the next build</span>
            <h2 className="heading-display mt-6 max-w-4xl text-[var(--text-primary)]">Let&apos;s build something <span className="text-[var(--text-muted)]">intelligent.</span></h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={openContact} className="btn-primary cursor-pointer px-6 py-3.5 text-[var(--text-label-sm)]" data-cursor-hover>Start a conversation <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></button>
              <a href={personalData.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary px-6 py-3.5 text-[var(--text-label-sm)]" data-cursor-hover><Download className="h-4 w-4" aria-hidden="true" /> Résumé</a>
            </div>
          </div>
          <div className="lg:col-span-4 lg:pt-2">
            <p className="label-muted">Direct lines</p>
            <a href={`mailto:${personalData.email}`} className="link-primary mt-4 block break-all text-lg font-medium" data-cursor-hover>{personalData.email}</a>
            <a href={`tel:${personalData.phone.replace(/\s/g, "")}`} className="link-primary mt-2 block text-lg font-medium" data-cursor-hover>{personalData.phone}</a>
            <div className="mt-8 border-t border-[var(--border-default)] pt-5 text-sm"><LocalTime compact /></div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-[var(--border-default)] pt-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl font-bold uppercase tracking-[-0.03em] text-[var(--text-primary)]">Rishabh Jain</p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Computer Science &amp; Data Science · VIT Vellore</p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Footer">
            {links.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"} className="link font-mono text-[10px] uppercase tracking-[0.18em]" data-cursor-hover>{link.label}</a>)}
          </nav>
          <div className="flex items-center justify-between gap-5 md:justify-end">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">© {new Date().getFullYear()}</span>
            <motion.button type="button" onClick={scrollToTop} whileHover={{ y: -3 }} aria-label="Back to top" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]" data-cursor-hover><ArrowUp className="h-4 w-4" aria-hidden="true" /></motion.button>
          </div>
        </div>
        <p className="mt-8 meta-text">Built with Next.js · Tailwind · Framer Motion · Lenis</p>
      </div>
    </footer>
  );
}

export default Footer;
