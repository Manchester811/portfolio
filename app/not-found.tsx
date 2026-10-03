"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)] px-6 text-[var(--text-primary)]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-[15%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[var(--accent-glow)] blur-[140px]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-center"
      >
        <span className="label mb-6 block">Error 404</span>

        <h1 className="heading-display text-[var(--text-primary)]">Page Not Found</h1>

        <p className="mx-auto mt-6 max-w-sm text-[var(--text-body-sm)] leading-relaxed text-[var(--text-secondary)]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary px-7 py-3.5 text-[var(--text-label-sm)]">
            <Home className="h-4 w-4" />
            <span>Back Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn-secondary px-7 py-3.5 text-[var(--text-label-sm)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}