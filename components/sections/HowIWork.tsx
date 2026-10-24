"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { workPrinciples } from "@/data/workPrinciples";
import { MotionSection } from "@/components/ui/MotionSection";

export function HowIWork() {
  const [open, setOpen] = useState(workPrinciples[0]?.id ?? "");
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionSection id="how-i-work" className="py-0">
      <section className="section-container">
        <div className="mb-10 grid gap-6 border-b border-[var(--border-default)] pb-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="label block">04 / How I work</span>
            <h2 className="heading-display mt-5 text-[var(--text-primary)]">A clear way to build <span className="text-[var(--text-muted)]">intelligent systems.</span></h2>
          </div>
          <p className="body-text-sm lg:col-span-4 lg:pb-1">A practical set of principles shaped by project work, coursework, and hands-on learning.</p>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {workPrinciples.map((principle, index) => {
            const isOpen = open === principle.id;
            return (
              <motion.article
                key={principle.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.06 }}
                className={`rounded-[var(--radius-lg)] border bg-[var(--bg-card)] p-5 transition-colors duration-300 sm:p-6 ${isOpen ? "border-[var(--border-strong)]" : "border-[var(--border-default)]"}`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`principle-${principle.id}`}
                  onClick={() => setOpen(isOpen ? "" : principle.id)}
                  className="flex w-full cursor-pointer items-start justify-between gap-5 text-left focus-visible:outline-none"
                >
                  <span className="flex items-start gap-4">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)]">0{index + 1}</span>
                    <span className="font-display text-xl font-bold uppercase tracking-[-0.03em] text-[var(--text-primary)]">{principle.title}</span>
                  </span>
                  <ChevronDown className={`mt-0.5 h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`principle-${principle.id}`}
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-5 border-t border-[var(--border-subtle)] pt-5 text-sm leading-7 text-[var(--text-secondary)]">{principle.description}</p>
                      <div className="mt-5 flex items-center gap-2" aria-hidden="true">
                        <span className="h-px w-10 bg-[var(--text-primary)]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-primary)]" />
                        <span className="h-px flex-1 bg-[var(--border-default)]" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </section>
    </MotionSection>
  );
}

export default HowIWork;
