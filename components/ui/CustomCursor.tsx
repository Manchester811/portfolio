"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "project">("default");
  const [label, setLabel] = useState("");
  const isVisible = useRef(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const springCfg = { stiffness: 420, damping: 30, mass: 0.5 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  // Slow follower for glow ring
  const glowSpringCfg = { stiffness: 90, damping: 18, mass: 0.8 };
  const gx = useSpring(rawX, glowSpringCfg);
  const gy = useSpring(rawY, glowSpringCfg);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible.current) {
        isVisible.current = true;
      }
    };

    const checkTarget = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isProjectCard = !!el.closest("[data-cursor-project]");
      const isInteractive =
        !!el.closest("a, button, [role='button'], input, textarea, select") ||
        !!el.closest("[data-cursor-hover]");

      if (isProjectCard) {
        setCursorType("project");
        setLabel(el.closest("[data-cursor-project]")?.getAttribute("data-cursor-label") ?? "VIEW");
      } else if (isInteractive) {
        setCursorType("hover");
        setLabel("");
      } else {
        setCursorType("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousemove", checkTarget, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkTarget);
    };
  }, [rawX, rawY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer glow ring — slow follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: gx,
          y: gy,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: cursorType === "project" ? 80 : cursorType === "hover" ? 44 : 36,
            height: cursorType === "project" ? 80 : cursorType === "hover" ? 44 : 36,
            borderColor:
              cursorType === "project"
                ? "rgba(168,85,247,0.7)"
                : "rgba(34,211,238,0.5)",
            opacity: 1,
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full border flex items-center justify-center"
        />
      </motion.div>

      {/* Inner dot — fast */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: cursorType === "project" ? 6 : 7,
            height: cursorType === "project" ? 6 : 7,
            backgroundColor:
              cursorType === "project" ? "#a855f7" : "#22d3ee",
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full shadow-[0_0_8px_currentColor]"
        />
        {cursorType === "project" && label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold tracking-widest text-purple-200 uppercase whitespace-nowrap pointer-events-none select-none"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
