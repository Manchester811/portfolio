"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { Home, User, FolderOpen, Layers, Briefcase, Award, Mail } from "lucide-react";

interface GooeyItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string; "aria-hidden"?: boolean }>;
}

const items: GooeyItem[] = [
  { id: "hero", label: "Home", href: "#hero", icon: Home },
  { id: "about", label: "About", href: "#about", icon: User },
  { id: "projects", label: "Work", href: "#projects", icon: FolderOpen },
  { id: "skills", label: "Stack", href: "#skills", icon: Layers },
  { id: "experience", label: "Trajectory", href: "#experience", icon: Briefcase },
  { id: "certifications", label: "Credentials", href: "#certifications", icon: Award },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail },
];

export const GooeyNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.findIndex((i) => i.id === entry.target.id);
            if (idx >= 0) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((index: number, href: string) => {
    setActiveIndex(index);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 30, behavior: shouldReduce ? "auto" : "smooth" });
    }
  }, [shouldReduce]);

  return (
    <nav ref={navRef} aria-label="Primary" className="gooey-nav" role="navigation">
      <div className="gooey-nav-inner glass-pill">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = i === activeIndex;
          const isHovered = hoverIndex === i;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleClick(i, item.href); }}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              onFocus={() => setHoverIndex(i)}
              onBlur={() => setHoverIndex(null)}
              aria-current={isActive ? "page" : undefined}
              className={`gooey-nav-item ${isActive ? "gooey-nav-active" : ""} ${isHovered ? "gooey-nav-hover" : ""}`}
            >
              <span className="gooey-nav-label" aria-label={item.label} title={item.label}>
                {item.label}
              </span>
              <span className="gooey-nav-icon-wrap" aria-hidden="true">
                {Icon && <Icon size={18} strokeWidth={1.5} />}
              </span>
            </a>
          );
        })}
        {/* Fallback pill when WebGL unavailable — shown via CSS only when needed */}
        <span className="gooey-nav-pill" aria-hidden="true" style={{ transform: `translateX(${activeIndex * 100}%)` }} />
      </div>
    </nav>
  );
};
