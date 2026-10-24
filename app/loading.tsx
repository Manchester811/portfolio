"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hard ceiling on how long this fallback may cover the page.
 *
 * The route is statically prerendered, so this normally flashes for a few
 * hundred milliseconds during a client navigation. If something upstream stalls
 * (a slow frame decode, a suspended server component), the fallback would
 * otherwise sit in front of the content indefinitely. After this timeout it
 * unmounts itself so the page is never blocked by a loading screen.
 */
const MAX_BLOCK_MS = 1800;

export default function Loading() {
  const shouldReduceMotion = useReducedMotion();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setTimedOut(true), MAX_BLOCK_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Stop blocking: render nothing so the real content is interactive.
  if (timedOut) return null;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {shouldReduceMotion ? (
            <span className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-strong)] font-display text-xs font-bold">RJ</span><span className="label">Loading Portfolio</span></span>
        ) : (
          <>
            <span className="mb-8 block h-px w-24 overflow-hidden bg-[var(--border-default)]">
              <motion.span
                className="block h-full w-1/3 bg-[var(--accent-primary)]"
                animate={{ x: ["-100%", "320%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>

            <p className="label">Loading intelligent systems</p>
          </>
        )}
      </motion.div>
    </div>
  );
}
