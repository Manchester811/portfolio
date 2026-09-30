"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  tiltStrength?: number; // degrees, default 4
  glowColor?: string;
}

export const ParallaxCard: React.FC<ParallaxCardProps> = ({
  children,
  className = "",
  tiltStrength = 4,
  glowColor = "rgba(34,211,238,0.25)",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springConfig = { stiffness: 180, damping: 22, mass: 0.6 };
  const srx = useSpring(rotateX, springConfig);
  const sry = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || shouldReduceMotion) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotateX.set((0.5 - py) * tiltStrength * 2);
      rotateY.set((px - 0.5) * tiltStrength * 2);
      glowX.set(px * 100);
      glowY.set(py * 100);
    },
    [rotateX, rotateY, glowX, glowY, tiltStrength, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [rotateX, rotateY, glowX, glowY]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  if (shouldReduceMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
        backgroundImage: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${glowColor}, transparent 65%)`,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
