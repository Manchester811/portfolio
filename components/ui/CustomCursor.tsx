"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "project">("default");
  const [label, setLabel] = useState("");
  const isVisible = useRef(false);

  // Fast center dot
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const dotSpringCfg = { stiffness: 850, damping: 45, mass: 0.2 };
  const x = useSpring(rawX, dotSpringCfg);
  const y = useSpring(rawY, dotSpringCfg);

  // Smooth lag trailing ring
  const ringSpringCfg = { stiffness: 220, damping: 25, mass: 0.6 };
  const rx = useSpring(rawX, ringSpringCfg);
  const ry = useSpring(rawY, ringSpringCfg);

  const checkTarget = useCallback((e: MouseEvent) => {
    const el = e.target as HTMLElement;
    if (!el) return;

    const projectEl = el.closest("[data-cursor-project]");
    const interactiveEl =
      el.closest("a, button, [role='button'], input, textarea, select") ||
      el.closest("[data-cursor-hover]");

    if (projectEl) {
      setCursorType("project");
      const customLabel = projectEl.getAttribute("data-cursor-label") || "INSPECT ↗";
      setLabel(customLabel);
    } else if (interactiveEl) {
      setCursorType("hover");
      setLabel("");
    } else {
      setCursorType("default");
      setLabel("");
    }
  }, []);

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

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousemove", checkTarget, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkTarget);
    };
  }, [rawX, rawY, checkTarget]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* ─── Trailing Ring ─── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: cursorType === "project" ? 84 : cursorType === "hover" ? 48 : 34,
            height: cursorType === "project" ? 84 : cursorType === "hover" ? 48 : 34,
            borderColor:
              cursorType === "project"
                ? "rgba(34,211,238,0.7)"
                : cursorType === "hover"
                ? "rgba(56,189,248,0.6)"
                : "rgba(34,211,238,0.35)",
            backgroundColor:
              cursorType === "project"
                ? "rgba(6,182,212,0.12)"
                : cursorType === "hover"
                ? "rgba(34,211,238,0.06)"
                : "transparent",
            scale: cursorType === "project" ? 1.05 : 1,
          }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full border backdrop-blur-[1px] flex items-center justify-center transition-shadow shadow-[0_0_15px_rgba(6,182,212,0.25)]"
        />
      </motion.div>

      {/* ─── Center Dot & Contextual Badge ─── */}
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
            width: cursorType === "project" ? 4 : cursorType === "hover" ? 8 : 6,
            height: cursorType === "project" ? 4 : cursorType === "hover" ? 8 : 6,
            backgroundColor: cursorType === "project" ? "#38bdf8" : "#22d3ee",
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full shadow-[0_0_10px_#22d3ee]"
        />

        {/* Contextual Label for Projects or Interactive Elements */}
        {cursorType === "project" && label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase whitespace-nowrap pointer-events-none select-none text-glow-subtle"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
