"use client";

import React, { useEffect, useRef, useCallback, createContext, useContext } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

interface SmoothScrollContextType {
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept in-page hash links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
            offset: -30,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [shouldReduceMotion]);

  // scrollTo is a stable callback – does NOT read lenisRef during render
  const scrollTo = useCallback(
    (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? -30,
          duration: options?.duration ?? 1.2,
        });
      } else {
        const element =
          typeof target === "string" ? document.querySelector(target) : target;
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    []
  );

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
