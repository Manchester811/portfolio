"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
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

  const sectionVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 32,
      scale: shouldReduceMotion ? 1 : 0.985,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.7,
        ease: [0.16, 1, 0.3, 1], // Luxury cubic-bezier curve
        delay,
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={sectionVariants}
      className={cn("relative", className)}
    >
      {children}
    </motion.section>
  );
};

export const motionItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
