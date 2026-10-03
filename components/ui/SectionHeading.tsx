"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  number?: string;
  actionText?: string;
  actionHref?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  number,
  actionText,
  actionHref,
  align = "left",
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6",
        "border-b border-[var(--border-subtle)]",
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-left",
        className
      )}
    >
      <div>
        {number && (
          <span className="font-mono text-[var(--text-micro)] font-semibold text-[var(--text-accent)] tracking-[0.25em] uppercase mb-3 block">
            {number}
          </span>
        )}
        <h2 className="font-display text-[var(--text-heading)] font-black tracking-tight text-[var(--text-primary)] leading-[0.95] uppercase">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-[var(--text-body)] text-[var(--text-secondary)] font-sans font-normal max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && actionHref && (
        <a
          href={actionHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-[var(--text-label-sm)] font-semibold text-[var(--text-accent)] hover:text-[var(--accent-primary-hover)] tracking-wider uppercase transition-colors shrink-0 group pb-1"
          data-cursor-hover
        >
          <span>{actionText}</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </a>
      )}
    </motion.div>
  );
};
