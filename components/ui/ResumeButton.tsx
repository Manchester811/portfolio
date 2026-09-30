"use client";

import React from "react";
import { Download, ExternalLink } from "lucide-react";

interface ResumeButtonProps {
  url?: string;
  className?: string;
  variant?: "primary" | "ghost";
}

export const ResumeButton: React.FC<ResumeButtonProps> = ({
  url = "/assets/Rishabh_Jain_Resume.pdf",
  className = "",
  variant = "primary",
}) => {
  const base =
    "inline-flex items-center gap-2 font-semibold text-sm rounded-xl px-5 py-2.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer select-none";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.03] active:scale-95"
      : "border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:text-cyan-200";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Open in new tab */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open resume in new tab"
        className={`${base} ${styles}`}
      >
        <ExternalLink className="w-4 h-4" />
        View CV
      </a>

      {/* Download */}
      <a
        href={url}
        download="Rishabh_Jain_Resume.pdf"
        aria-label="Download resume PDF"
        className={`${base} ${
          variant === "primary"
            ? "border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 bg-transparent shadow-none"
            : styles
        }`}
      >
        <Download className="w-4 h-4" />
        Download
      </a>
    </div>
  );
};
