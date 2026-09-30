"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "purple" | "blue" | "emerald" | "amber" | "neutral";
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
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.12)]",
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.12)]",
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.12)]",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.12)]",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.12)]",
    neutral: "bg-slate-800/80 text-slate-300 border-slate-700/50",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3 py-1 text-xs",
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
