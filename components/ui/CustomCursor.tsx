"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "project">("default");
  const [label, setLabel] = useState("");
  const isVisible = useRef(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Defer state updates to avoid sync setState in effect warning
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);
    setIsClient(true);
  }, []);

  // Fast center dot
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const dotSpringCfg = { stiffness: 900, damping: 45, mass: 0.2 };
  const x = useSpring(rawX, dotSpringCfg);
  const y = useSpring(rawY, dotSpringCfg);

  // Smooth lag trailing ring
  const ringSpringCfg = { stiffness: 240, damping: 25, mass: 0.6 };
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
      const customLabel = projectEl.getAttribute("data-cursor-label") || "VIEW ↗";
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
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

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

  if (!isClient || isTouchDevice) return null;

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
            width: cursorType === "project" ? 80 : cursorType === "hover" ? 44 : 28,
            height: cursorType === "project" ? 80 : cursorType === "hover" ? 44 : 28,
            borderColor:
              cursorType === "project"
                ? "#65D9FF"
                : cursorType === "hover"
                ? "rgba(209, 140, 60, 0.6)"
                : "rgba(240, 235, 227, 0.2)",
            backgroundColor:
              cursorType === "project"
                ? "rgba(209, 140, 60, 0.1)"
                : cursorType === "hover"
                ? "rgba(209, 140, 60, 0.06)"
                : "transparent",
            scale: cursorType === "project" ? 1.05 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full border flex items-center justify-center"
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
            width: cursorType === "project" ? 4 : cursorType === "hover" ? 7 : 5,
            height: cursorType === "project" ? 4 : cursorType === "hover" ? 7 : 5,
            backgroundColor:
              cursorType === "project"
                ? "#65D9FF"
                : cursorType === "hover"
                ? "#4FC3E6"
                : "#F5F5F5",
            boxShadow:
              cursorType !== "default"
                ? "0 0 8px rgba(209, 140, 60, 0.7)"
                : "none",
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full"
        />

        {/* Contextual Label */}
        {cursorType === "project" && label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-sans font-semibold tracking-widest text-[#65D9FF] uppercase whitespace-nowrap pointer-events-none select-none"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
