"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface TrueFocusProps {
  sentence?: string;
  focusWords?: string[];
  blurAmount?: number;
  focusScale?: number;
  unfocusedOpacity?: number;
  cornerSize?: number;
  borderWidth?: number;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "Intelligent Systems",
  focusWords = ["Intelligent", "Systems"],
  blurAmount = 3,
  focusScale = 1,
  unfocusedOpacity = 0.85,
  cornerSize = 12,
  borderWidth = 2,
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.5,
  className = "",
}) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const words = sentence.split(/\s+/);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const reduced = typeof window !== "undefined" ? window.matchMedia?.("(prefers-reduced-motion: reduce)").matches : false;

  const cycle = useCallback(() => {
    if (reduced) return;
    setFocusIndex((prev) => (prev + 1) % focusWords.length);
  }, [focusWords.length, reduced]);

  useEffect(() => {
    if (reduced) return;
    timerRef.current = setInterval(cycle, (animationDuration + pauseBetweenAnimations) * 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [cycle, animationDuration, pauseBetweenAnimations, reduced]);

  return (
    <div className={`true-focus ${className}`} aria-label={sentence} role="text">
      <div className="true-focus-text" style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
        {words.map((word, i) => {
          const isFocused = focusWords.some((w) => w.toLowerCase() === word.toLowerCase()) && 
            focusWords[focusIndex]?.toLowerCase() === word.toLowerCase();
          return (
            <span
              key={i}
              className={`true-focus-word ${isFocused ? "true-focus-active" : ""}`}
              style={{
                filter: isFocused ? "blur(0px)" : `blur(${blurAmount}px)`,
                opacity: isFocused ? 1 : unfocusedOpacity,
                transform: `scale(${isFocused ? focusScale : 1})`,
                transition: `filter ${animationDuration}s ease, opacity ${animationDuration}s ease, transform ${animationDuration}s ease`,
                display: "inline-block",
                marginRight: "0.35em",
              }}
            >
              <span
                style={{
                  border: isFocused ? `${borderWidth}px solid rgba(255,255,255,0.35)` : "none",
                  borderRadius: cornerSize,
                  padding: isFocused ? "4px 8px" : undefined,
                  background: isFocused ? "rgba(255,255,255,0.06)" : undefined,
                  whiteSpace: "nowrap",
                  transition: "all 0.4s ease",
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
