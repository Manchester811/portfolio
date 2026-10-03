"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  /**
   * The bar is always rendered and hidden with a CSS media query rather than a
   * `shouldReduceMotion ? null : …` branch.
   *
   * useReducedMotion() is false during SSR and true on the client when the
   * preference is set, so returning null produced a different tree on each
   * side and threw a hydration mismatch. Tailwind's `motion-reduce:hidden`
   * keeps the markup identical and still suppresses the bar.
   */
  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[3px] bg-transparent motion-reduce:hidden">
      <motion.div
        className="h-full origin-left bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-glow-strong)]"
        style={{ scaleX }}
      />
    </div>
  );
};
