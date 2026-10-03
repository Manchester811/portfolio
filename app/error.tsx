"use client";

import { motion } from "framer-motion";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)] px-6 text-[var(--text-primary)]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-[15%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[rgba(255,80,80,0.06)] blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-center"
      >
        <span className="label mb-6 block">Unexpected Error</span>

        <h1 className="heading-display text-[var(--text-primary)]">Something Broke</h1>

        <p className="mx-auto mt-6 max-w-sm text-[var(--text-body-sm)] leading-relaxed text-[var(--text-secondary)]">
          An unexpected error occurred. Try again, or navigate back to the homepage.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button onClick={reset} className="btn-primary px-7 py-3.5 text-[var(--text-label-sm)]">
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>

          <Link href="/" className="btn-secondary px-7 py-3.5 text-[var(--text-label-sm)]">
            <Home className="h-4 w-4" />
            <span>Back Home</span>
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mx-auto mt-12 max-w-sm rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 text-left text-xs text-[var(--text-muted)]">
            <summary className="cursor-pointer font-mono text-[var(--text-micro)] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              Error Details (Development)
            </summary>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-[var(--text-muted)]">
              {error.message}
              {error.digest ? `\nDigest: ${error.digest}` : ""}
            </pre>
          </details>
        )}
      </motion.div>
    </div>
  );
}