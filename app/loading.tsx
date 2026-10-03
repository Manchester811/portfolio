"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <span className="mb-8 block h-px w-24 overflow-hidden bg-[var(--border-default)]">
          <motion.span
            className="block h-full w-1/3 bg-[var(--accent-primary)]"
            animate={{ x: ["-100%", "320%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>

        <p className="label">Loading Portfolio</p>
      </motion.div>
    </div>
  );
}