"use client";

import { motion, useReducedMotion } from "framer-motion";
import { stackData } from "@/data/stack";
import { MotionSection } from "@/components/ui/MotionSection";

const duplicate = [...stackData, ...stackData];

function MarqueeRow({ reverse = false, items }: { reverse?: boolean; items: string[] }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="tech-marquee__viewport" aria-label="Technology stack">
      <motion.div
        className="tech-marquee__track"
        animate={shouldReduceMotion ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={shouldReduceMotion ? undefined : { duration: 30, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="tech-marquee__item">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <MotionSection id="tech-marquee" className="py-0">
      <section className="section-container overflow-hidden">
        <div className="mb-8 flex flex-col gap-4 border-b border-[var(--border-default)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="label block">Stack / In motion</span>
            <h2 className="heading-major mt-4 text-[var(--text-primary)]">
              Tools that move <span className="text-[var(--text-muted)]">ideas forward.</span>
            </h2>
          </div>
          <p className="body-text-sm max-w-xs">Hover to pause the stack stream.</p>
        </div>
        <div className="space-y-3" onMouseEnter={(event) => event.currentTarget.classList.add("is-paused")} onMouseLeave={(event) => event.currentTarget.classList.remove("is-paused")}>
          <MarqueeRow items={duplicate} />
          <MarqueeRow items={duplicate} reverse />
        </div>
      </section>
    </MotionSection>
  );
}

export default TechMarquee;
