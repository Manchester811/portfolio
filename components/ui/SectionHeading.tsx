"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: LucideIcon;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  icon: Icon,
  align = "center",
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "mb-10 md:mb-14",
        align === "center" ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      {(badge || Icon) && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium tracking-wide uppercase mb-3",
            "bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 shadow-[0_0_12px_rgba(6,182,212,0.15)]",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {Icon && <Icon className="w-3.5 h-3.5 text-cyan-400" />}
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
        <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
