"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export const BackgroundGlow: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Deep Midnight Navy/Black base layer */}
      <div className="absolute inset-0 bg-[#050814]" />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 cyber-grid-pattern opacity-30" />

      {/* Primary Cyan Ambient Orb */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 40, -30, 0],
                y: [0, -50, 30, 0],
                scale: [1, 1.08, 0.94, 1],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[12%] left-[12%] w-[580px] h-[580px] rounded-full blur-[140px] opacity-25 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.7) 0%, rgba(14,165,233,0.3) 50%, transparent 70%)",
        }}
      />

      {/* Secondary Violet / Indigo Ambient Orb */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -50, 35, 0],
                y: [0, 45, -35, 0],
                scale: [1, 0.92, 1.06, 1],
              }
        }
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[32%] -right-[8%] w-[540px] h-[540px] rounded-full blur-[150px] opacity-20 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(99,102,241,0.25) 50%, transparent 70%)",
        }}
      />

      {/* Tertiary Deep Ocean Blue Orb */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 35, -25, 0],
                y: [0, -35, 25, 0],
                scale: [1, 1.05, 0.95, 1],
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[6%] left-[22%] w-[680px] h-[480px] rounded-full blur-[160px] opacity-18 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.5) 0%, rgba(56,189,248,0.18) 60%, transparent 80%)",
        }}
      />

      {/* Very subtle vignette overlay for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,8,20,0.5)_100%)]" />
    </div>
  );
};
