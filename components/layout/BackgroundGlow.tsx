"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import GradientASCII from "@/components/reactbits/GradientASCII";
import { getServerTheme, getTheme, subscribeTheme } from "@/lib/theme";

export const BackgroundGlow: React.FC = () => {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const shouldReduceMotion = useReducedMotion();
  const spotlightRef = useRef<HTMLDivElement>(null);
  const lightMode = theme === "light";

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight || shouldReduceMotion) return undefined;

    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return undefined;

    let frame = 0;
    let nextX = "50%";
    let nextY = "30%";

    const paint = () => {
      frame = 0;
      spotlight.style.setProperty("--spotlight-x", nextX);
      spotlight.style.setProperty("--spotlight-y", nextY);
    };

    const onPointerMove = (event: PointerEvent) => {
      nextX = `${(event.clientX / Math.max(1, window.innerWidth)) * 100}%`;
      nextY = `${(event.clientY / Math.max(1, window.innerHeight)) * 100}%`;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="portfolio-background pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="portfolio-background__grid" />
      <div className="portfolio-background__ambient" />
      <GradientASCII
        colors={
          lightMode
            ? ["#f7f7f5", "#d4d8f2", "#9ca9dc", "#4d5a98"]
            : ["#070912", "#27347d", "#5a4aa3", "#a7c7ff"]
        }
        shape="horizon"
        characters=" .:-=+*#@"
        cellSize={18}
        density={0.42}
        glyphOpacity={0.48}
        gradientOpacity={0.2}
        glow={0.06}
        depthOfField={0.1}
        flicker={0.05}
        softness={0.78}
        scale={1.18}
        flow={0.28}
        speed={0}
        grain={0.025}
        mouseInteraction={false}
        clickEffect="none"
        lightMode={lightMode}
        className="portfolio-gradient-ascii"
      />
      <div ref={spotlightRef} className="portfolio-background__spotlight" />
    </div>
  );
};
