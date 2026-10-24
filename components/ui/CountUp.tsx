"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface CountUpProps {
  end: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  end,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1200,
  className,
}: CountUpProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const element = ref.current;
    if (!element || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasStarted(true);

        const start = performance.now();
        let frame = 0;
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(end * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);

        observer.disconnect();
        return () => cancelAnimationFrame(frame);
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [duration, end, hasStarted, shouldReduceMotion]);

  const displayedValue = shouldReduceMotion ? end : value;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayedValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default CountUp;
