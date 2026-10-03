"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: "none" | "cyan" | "blue" | "violet" | "emerald" | "orange" | "copper";
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
    cyan: "shadow-[0_0_30px_-5px_rgba(209,140,60,0.2)] border-[#D18C3C]/35",
    blue: "shadow-[0_0_30px_-5px_rgba(209,140,60,0.15)] border-[#D18C3C]/25",
    violet: "shadow-[0_0_30px_-5px_rgba(209,140,60,0.15)] border-[#D18C3C]/25",
    emerald: "shadow-[0_0_30px_-5px_rgba(209,140,60,0.15)] border-[#D18C3C]/25",
    orange: "shadow-[0_0_30px_-5px_rgba(209,140,60,0.18)] border-[#D18C3C]/30",
    copper: "shadow-[0_0_30px_-5px_rgba(209,140,60,0.18)] border-[#D18C3C]/30",
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-3xl",
        "bg-gradient-to-b from-[#0E1528]/85 via-[#0A0F1D]/80 to-[#070B1A]/85",
        "backdrop-blur-xl border border-white/[0.08]",
        "transition-all duration-300",
        glowClasses[glow],
        hoverEffect && "hover:border-[#D18C3C]/45 hover:shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(209,140,60,0.18)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
