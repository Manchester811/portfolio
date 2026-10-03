"use client";

import React from "react";
import { personalData } from "@/data/personal";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { label: "GitHub", href: personalData.github },
    { label: "LinkedIn", href: personalData.linkedin },
    { label: "Email", href: `mailto:${personalData.email}` },
    { label: "Résumé", href: personalData.resumeUrl },
  ];

  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-primary)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-end">
          {/* identity */}
          <div>
            <p className="font-display text-xl font-bold uppercase tracking-[-0.03em] text-[var(--text-primary)]">
              Rishabh Jain
            </p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Computer Science & Data Science
            </p>
          </div>

          {/* links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 md:justify-center" aria-label="Footer">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="link font-mono text-[var(--text-micro)] uppercase tracking-[0.18em]"
                data-cursor-hover
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* meta */}
          <div className="flex items-center justify-between gap-4 md:justify-end">
            <span className="font-mono text-[var(--text-micro)] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              © {new Date().getFullYear()}
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-muted)] transition-colors duration-300 hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mt-12 border-t border-[var(--border-default)] pt-6 meta-text"
        >
          Built with precision · Next.js · Tailwind · Framer Motion
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;