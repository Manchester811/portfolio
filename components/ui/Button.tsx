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
    sm: "px-5 py-2 text-[var(--text-micro)] rounded-full gap-2",
    md: "px-7 py-3 text-[var(--text-label-sm)] rounded-full gap-2.5",
    lg: "px-9 py-4 text-[var(--text-label)] rounded-full gap-3",
  };

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    ghost: "btn-ghost",
  };

  const content = (
    <>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  );

  const baseClasses = cn(
    "inline-flex items-center justify-center font-sans font-semibold tracking-wider transition-all duration-200 select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]",
    sizeStyles[size],
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
      {...props}
    >
      {content}
    </motion.button>
  );
};
