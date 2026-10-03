"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HoverGlowProps {
  className?: string;
  color?: "cyan" | "amber" | "blue";
  size?: "sm" | "md" | "lg";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  intensity?: number;
}

export const HoverGlow: React.FC<HoverGlowProps> = ({
  className,
  color = "cyan",
  size = "md",
  position = "top-right",
  intensity = 1,
}) => {
  const colorStyles = {
    cyan: "bg-cyan-400",
    amber: "bg-[#D18C3C]",
    blue: "bg-blue-500",
  };

  const sizeStyles = {
    sm: "h-36 w-36",
    md: "h-64 w-64",
    lg: "h-72 w-72",
  };

  const positionStyles = {
    "top-right": "-right-16 -top-16",
    "top-left": "-left-16 -top-16",
    "bottom-right": "-right-16 -bottom-16",
    "bottom-left": "-left-16 -bottom-16",
  };

  const opacity = intensity * 0.05;

  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
        colorStyles[color],
        sizeStyles[size],
        positionStyles[position],
        className
      )}
      style={{ opacity: `${opacity}` }}
    />
  );
};

export const HoverGlowVariant: React.FC<{
  color?: "cyan" | "amber" | "blue";
  size?: "sm" | "md" | "lg";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  intensity?: number;
  children: React.ReactNode;
}> = ({ color = "cyan", size = "md", position = "top-right", intensity = 1, children }) => {
  return (
    <>
      <HoverGlow color={color} size={size} position={position} intensity={intensity} />
      {children}
    </>
  );
};