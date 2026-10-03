"use client";

import React from "react";

export const BackgroundGlow: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "4rem 4rem",
      }}
    />
  );
};
