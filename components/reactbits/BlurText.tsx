"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface BlurTextProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  blur?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  animateOnMount?: boolean;
}

export const BlurText: React.FC<BlurTextProps> = ({
  children,
  duration = 0.8,
  delay = 0,
  blur = 6,
  className = "",
  as: Tag = "span",
  animateOnMount = true,
}) => {
  const shouldReduce = useReducedMotion();
  const [inView, setInView] = useState(!animateOnMount);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!animateOnMount || shouldReduce) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1, rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animateOnMount, shouldReduce]);

  return (
    <Tag
      ref={(node) => {
        ref.current = node;
      }}
      className={className}
      style={{
        display: "inline-block",
        filter: inView && !shouldReduce ? `blur(0px)` : `blur(${blur}px)`,
        opacity: inView ? 1 : 0,
        transition: `filter ${duration}s cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
};

export default BlurText;
