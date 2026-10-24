"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Home, User, FolderOpen, Layers, Briefcase, Award, Mail,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Navigation items matching actual portfolio sections
const dockItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

export const Dock = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [activeId, setActiveId] = useState("hero");
  const shouldReduce = useReducedMotion();
  const dockRef = useRef<HTMLDivElement>(null);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    dockItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 30;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: shouldReduce ? "auto" : "smooth" });
    }
  }, [shouldReduce]);

  return (
    <nav
      ref={dockRef}
      aria-label="Dock navigation"
      className="dock-wrapper"
    >
      <div className="dock-panel" role="menu">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          const isHovered = hovered === item.id;
          const isFocused = focused === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setFocused(item.id)}
              onBlur={() => setFocused(null)}
              onClick={() => scrollTo(item.id)}
              className={`dock-tile ${isActive ? "is-active" : ""} ${isHovered || isFocused ? "is-hovered" : ""}`}
            >
              <div className="dock-icon-wrap">
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <AnimatePresence>
                {(isHovered || isFocused) && (
                  <motion.span
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="dock-label"
                    role="tooltip"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && <span className="dock-indicator" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
