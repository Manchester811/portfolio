"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  icon,
  className,
  href,
  target,
  rel,
  ...props
}) => {
  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs rounded-full gap-1.5",
    md: "px-6 py-2.5 text-sm rounded-full gap-2",
    lg: "px-8 py-3.5 text-base rounded-full gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-medium shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] hover:brightness-110 border border-cyan-300/30",
    secondary:
      "bg-[#0e1933]/90 text-slate-200 font-medium border border-sky-500/25 hover:border-cyan-400/50 hover:bg-[#142347] hover:text-white shadow-[0_0_15px_rgba(0,0,0,0.3)]",
    outline:
      "bg-transparent text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/10 hover:border-cyan-400 font-medium",
    ghost:
      "bg-transparent text-slate-300 hover:text-white hover:bg-white/5 font-normal",
  };

  const content = (
    <>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  );

  const baseClasses = cn(
    "inline-flex items-center justify-center tracking-wide transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
      {...props}
    >
      {content}
    </motion.button>
  );
};
