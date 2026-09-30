"use client";

import React from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

const orbs: { className: string; color: string; t: Transition }[] = [
  {
    className: "top-[-12%] left-[-8%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px]",
    color: "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 65%)",
    t: { duration: 22, repeat: Infinity, ease: "easeInOut" },
  },
  {
    className: "bottom-[10%] right-[-10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px]",
    color: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 65%)",
    t: { duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 },
  },
  {
    className: "top-[40%] left-[40%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px]",
    color: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)",
    t: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 8 },
  },
];

export const BackgroundGlow: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden cyber-grid-pattern"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          style={{ background: orb.color }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, i % 2 === 0 ? 30 : -25, i % 2 === 0 ? -15 : 18, 0],
                  y: [0, i % 2 === 0 ? -20 : 20, i % 2 === 0 ? 25 : -15, 0],
                  scale: [1, 1 + 0.06 - i * 0.01, 0.97 + i * 0.01, 1],
                }
          }
          transition={shouldReduceMotion ? {} : orb.t}
        />
      ))}
    </div>
  );
};
