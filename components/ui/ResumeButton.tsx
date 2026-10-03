"use client";

import React from "react";
import { Download, ExternalLink } from "lucide-react";

interface ResumeButtonProps {
  url?: string;
  className?: string;
  variant?: "primary" | "ghost";
}

export const ResumeButton: React.FC<ResumeButtonProps> = ({
  url = "/assets/Rishabh_Jain_Resume_5.pdf",
  className = "",
  variant = "primary",
}) => {
  const base =
    "inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-wider rounded-xl px-4 py-2.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D18C3C] cursor-pointer select-none";

  const primaryStyles =
    "bg-gradient-to-r from-[#D18C3C] to-[#E5A050] text-[#0C0A08] shadow-[0_4px_20px_rgba(209,140,60,0.35)] hover:shadow-[0_4px_30px_rgba(209,140,60,0.55)] hover:scale-[1.02] active:scale-95";

  const ghostStyles =
    "border border-[#D18C3C]/30 bg-[#D18C3C]/5 text-[#D18C3C] hover:bg-[#D18C3C]/12 hover:border-[#D18C3C]/60";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Open in new tab */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open resume in new tab"
        className={`${base} ${variant === "primary" ? primaryStyles : ghostStyles}`}
      >
        <ExternalLink className="w-3.5 h-3.5" />
        <span>View CV</span>
      </a>

      {/* Download */}
      <a
        href={url}
        download="Rishabh_Jain_Resume.pdf"
        aria-label="Download resume PDF"
        className={`${base} ${ghostStyles}`}
      >
        <Download className="w-3.5 h-3.5" />
        <span>Download</span>
      </a>
    </div>
  );
};
