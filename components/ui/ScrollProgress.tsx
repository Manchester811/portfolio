"use client";

import React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export const ScrollProgress: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 origin-left shadow-[0_0_10px_rgba(34,211,238,0.7)]"
        style={{ scaleX }}
      />
    </div>
  );
};
