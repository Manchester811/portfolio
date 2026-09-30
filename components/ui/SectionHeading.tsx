"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type AccentColor = "cyan" | "blue" | "purple" | "emerald" | "amber";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: LucideIcon;
  align?: "left" | "center";
  accentColor?: AccentColor;
  className?: string;
}

const accentStyles: Record<AccentColor, string> = {
  cyan:    "bg-cyan-500/10 text-cyan-300 border-cyan-500/25",
  blue:    "bg-blue-500/10 text-blue-300 border-blue-500/25",
  purple:  "bg-purple-500/10 text-purple-300 border-purple-500/25",
  emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
  amber:   "bg-amber-500/10 text-amber-300 border-amber-500/25",
};

const gradientStyles: Record<AccentColor, string> = {
  cyan:    "from-white via-slate-100 to-cyan-200",
  blue:    "from-white via-slate-100 to-blue-200",
  purple:  "from-white via-slate-100 to-purple-200",
  emerald: "from-white via-slate-100 to-emerald-200",
  amber:   "from-white via-slate-100 to-amber-200",
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  icon: Icon,
  align = "left",
  accentColor = "cyan",
  className,
}) => {
  const accent = accentStyles[accentColor];
  const gradient = gradientStyles[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "mb-10 md:mb-12",
        align === "center" ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      {/* Optional badge chip */}
      {(badge || Icon) && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium tracking-wide uppercase mb-3 border shadow-[0_0_12px_rgba(6,182,212,0.12)]",
            accent,
            align === "center" ? "mx-auto" : ""
          )}
        >
          {Icon && <Icon className="w-3.5 h-3.5" />}
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
        <span
          className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        >
          {title}
        </span>
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
