"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { framePath } from "@/components/scroll/frameSequence";

const MAX_DURATION = 1800;
const FIRST_VISIT_DURATION = 1250;

export function SiteLoader() {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const storageKey = "rj-portfolio-loader-seen";
    const returningVisitor = window.sessionStorage.getItem(storageKey) === "1";
    window.sessionStorage.setItem(storageKey, "1");

    const sources = [framePath(0), framePath(1), "/assets/avatar.jpg"];
    let loaded = 0;

    const updateProgress = () => {
      loaded += 1;
      setProgress(Math.min(86, Math.round((loaded / sources.length) * 86)));
    };

    sources.forEach((src) => {
      const image = new window.Image();
      image.onload = updateProgress;
      image.onerror = updateProgress;
      image.src = src;
    });

    const duration = shouldReduceMotion ? 350 : returningVisitor ? 650 : FIRST_VISIT_DURATION;
    const progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(94, current + (shouldReduceMotion ? 12 : 3)));
    }, 80);
    const closeTimer = window.setTimeout(() => {
      setProgress(100);
      setVisible(false);
    }, Math.min(duration, MAX_DURATION));

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(closeTimer);
    };
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]"
          aria-label="Loading portfolio"
          role="status"
        >
          <div className="w-[min(320px,calc(100vw-48px))]">
            <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              <span className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-strong)] font-display text-xs font-bold text-[var(--text-primary)]">RJ</span> Portfolio</span>
              <span>{progress}%</span>
            </div>
            <div className="h-px overflow-hidden bg-[var(--border-default)]">
              <motion.span className="block h-full bg-[var(--text-primary)]" animate={{ width: `${progress}%` }} transition={{ duration: shouldReduceMotion ? 0 : 0.25 }} />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)]">Loading intelligent systems</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SiteLoader;
