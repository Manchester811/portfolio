"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface ScrollStackItem {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  badge?: string;
  status?: string;
  category?: string;
  subtitle?: string;
}

interface ScrollStackProps {
  items: ScrollStackPropsItem[];
  itemDistance?: number;
  itemStackDistance?: number;
  stackPosition?: number;
  itemScale?: number;
  baseScale?: number;
  dimAmount?: number;
  blurAmount?: number;
  tiltAmount?: number;
  rotationAmount?: number;
  holdDistance?: number;
  className?: string;
  onActiveChange?: (index: number) => void;
}

type ScrollStackPropsItem = ScrollStackItem & { element?: React.ReactNode };

export const ScrollStack: React.FC<ScrollStackProps> = ({
  items,
  itemDistance = 80,
  itemStackDistance = 24,
  stackPosition = 14,
  itemScale = 0.03,
  baseScale = 0.88,
  dimAmount = 0.14,
  blurAmount = 0.6,
  tiltAmount = 0.6,
  rotationAmount = 0,
  holdDistance = 180,
  className = "",
  onActiveChange,
}) => {
  const shouldReduce = useReducedMotion();
  const itemCount = items.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafRef = useRef<number | null>(null);
  const scrollRef = useRef(0);

  void tiltAmount;
  void rotationAmount;
  void holdDistance;

  const computeTransform = useCallback((i: number, scrollY: number) => {
    const el = itemRefs.current[i];
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const stackTop = viewportH * (stackPosition / 100);
    const relative = rect.top - stackTop;
    const totalTravel = itemDistance + itemStackDistance;
    let progress = (scrollY - relative) / totalTravel;
    progress = Math.max(0, Math.min(1, progress));
    const scale = baseScale + progress * (1 - baseScale) * (1 - itemScale);
    const translateY = -relative * (1 - progress);
    const opacity = 0.35 + progress * 0.65;
    const blur = shouldReduce ? 0 : blurAmount * (1 - progress);
    const dim = 1 - dimAmount * (1 - progress);
    return { scale, translateY, opacity, blur, dim, progress };
  }, [shouldReduce, baseScale, itemScale, dimAmount, blurAmount, itemDistance, itemStackDistance, stackPosition]);

  const update = useCallback(() => {
    rafRef.current = null;
    const scrollY = window.scrollY;
    scrollRef.current = scrollY;
    let maxActive = 0;
    for (let i = 0; i < itemCount; i += 1) {
      const t = computeTransform(i, scrollY);
      const el = itemRefs.current[i];
      if (!el || !t) continue;
      el.style.transform = `translate3d(0, ${t.translateY}px, 0) scale(${t.scale})`;
      el.style.opacity = String(t.opacity);
      el.style.filter = `blur(${t.blur}px) brightness(${t.dim})`;
      if (t.progress > 0.5) maxActive = i;
    }
    if (maxActive !== activeIndex) {
      setActiveIndex(maxActive);
      onActiveChange?.(maxActive);
    }
  }, [itemCount, computeTransform, activeIndex, onActiveChange]);

  useEffect(() => {
    if (shouldReduce) return;
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const initialFrame = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(initialFrame);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update, shouldReduce]);

  if (shouldReduce) {
    return (
      <div className={className}>
        {items.map((item, i) => (
          <div key={item.id} ref={(el) => { itemRefs.current[i] = el; }} className="mb-6 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
            <h3 className="font-display text-[var(--text-heading)] text-[var(--text-primary)]">{item.title}</h3>
            <p className="mt-2 text-[var(--text-secondary)]">{item.description}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`scroll-stack ${className}`} style={{ minHeight: `${items.length * itemDistance + itemStackDistance * (items.length - 1) + window.innerHeight * 0.4}px` }}>
      <div className="scroll-stack__spacer" style={{ height: `${stackPosition}vh` }} />
      {items.map((item, i) => (
        <div
          key={item.id}
          ref={(el) => { itemRefs.current[i] = el; }}
          className="scroll-stack__item"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            willChange: "transform, opacity, filter",
          }}
        >
          {item.element ?? (
            <div className="scroll-stack__card rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6 sm:p-8">
              <span className="label-muted">{item.badge ?? `0${i + 1}`}</span>
              <h3 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-[var(--text-primary)] mt-3">{item.title}</h3>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
              {item.technologies && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.technologies.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              )}
              <div className="mt-6 flex gap-3">
                {item.githubUrl && (
                  <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-2.5 text-[var(--text-label-sm)]" data-cursor-hover>Source</a>
                )}
                {item.liveDemoUrl && (
                  <a href={item.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary px-5 py-2.5 text-[var(--text-label-sm)]" data-cursor-hover>Live demo</a>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;
