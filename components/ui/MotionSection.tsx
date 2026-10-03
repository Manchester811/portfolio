"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export const MotionSection: React.FC<MotionSectionProps> = ({
  id,
  className,
  children,
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 32,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.4 : 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay,
          staggerChildren: shouldReduceMotion ? 0 : 0.1,
          delayChildren: shouldReduceMotion ? 0 : 0.08,
        },
      }}
      viewport={{ once: true, margin: "-80px" }}
      className={cn("relative", className)}
    >
      {children}
    </motion.section>
  );
};

export const motionItemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};