"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "blue" | "violet" | "emerald" | "orange" | "copper" | "amber" | "purple" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "cyan",
  size = "sm",
  className,
}) => {
  const variantStyles = {
    cyan: "bg-[var(--accent-primary-muted)] text-[var(--accent-primary)] border-[var(--border-accent)]",
    blue: "bg-[var(--accent-primary-muted)] text-[var(--accent-primary)] border-[var(--border-accent)]",
    violet: "bg-[var(--accent-primary-muted)] text-[var(--accent-primary)] border-[var(--border-accent)]",
    emerald: "bg-[var(--accent-primary-muted)] text-[var(--accent-primary)] border-[var(--border-accent)]",
    neutral: "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-default)]",
    // Backwards-compatible aliases
    orange: "bg-[var(--accent-primary-muted)] text-[var(--accent-primary)] border-[var(--border-accent)]",
    copper: "bg-[var(--accent-primary-muted)] text-[var(--accent-primary)] border-[var(--border-accent)]",
    amber: "bg-[var(--accent-primary-muted)] text-[var(--accent-primary)] border-[var(--border-accent)]",
    purple: "bg-[var(--accent-primary-muted)] text-[var(--accent-primary)] border-[var(--border-accent)]",
  };

  const sizeStyles = {
    sm: "px-2.5 py-1 font-mono text-[var(--text-micro)] uppercase tracking-[0.15em]",
    md: "px-3 py-1.5 font-mono text-[var(--text-micro)] uppercase tracking-[0.15em]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium tracking-tight border backdrop-blur-sm select-none",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
