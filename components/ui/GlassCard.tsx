"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: "none" | "cyan" | "blue" | "purple";
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = "none",
  hoverEffect = false,
  ...props
}) => {
  const glowClasses = {
    none: "",
    cyan: "shadow-[0_0_25px_-5px_rgba(6,182,212,0.18)] border-cyan-500/30",
    blue: "shadow-[0_0_25px_-5px_rgba(59,130,246,0.18)] border-blue-500/30",
    purple: "shadow-[0_0_25px_-5px_rgba(168,85,247,0.18)] border-purple-500/30"
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl md:rounded-3xl",
        "bg-gradient-to-b from-[#0e172e]/85 to-[#091022]/80",
        "backdrop-blur-xl border border-sky-500/15",
        "transition-all duration-300",
        glowClasses[glow],
        hoverEffect && "hover:border-cyan-400/35 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
