"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSmoothScroll } from "@/components/layout/SmoothScroll";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      scrollTo(targetElement, { offset: -25, duration: 1.1 });
    }
  };

  return (
    <>
      {/* Desktop Vertical Pill Dock (Left Side) */}
      <nav
        aria-label="Primary Navigation"
        className="hidden md:flex fixed left-6 lg:left-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-2 rounded-full bg-[#0a142c]/90 backdrop-blur-2xl border border-cyan-500/25 shadow-[0_0_25px_rgba(6,182,212,0.18)] flex flex-col gap-3"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <div
                key={item.id}
                className="relative flex items-center"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer",
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      isActive ? "scale-110" : "scale-100"
                    )}
                  />

                  {/* Morphing active indicator with spring physics */}
                  {isActive && (
                    <motion.div
                      layoutId="activePillIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-cyan-400 via-sky-500 to-blue-600 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 360, damping: 32 }
                      }
                      style={{ zIndex: -1 }}
                    />
                  )}
                </button>

                {/* Hover Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 8, scale: 0.94 }}
                      animate={{ opacity: 1, x: 16, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.94 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-full px-3 py-1 rounded-lg bg-[#0e1935]/95 text-xs font-medium text-cyan-200 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)] whitespace-nowrap pointer-events-none z-50 backdrop-blur-md"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </nav>

      {/* Mobile Horizontal Pill Dock (Bottom) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-around px-3 py-2 rounded-full bg-[#0a142c]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.2)]"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative p-2.5 rounded-full flex flex-col items-center justify-center transition-all duration-200 focus:outline-none cursor-pointer",
                  isActive ? "text-white" : "text-slate-400 hover:text-cyan-300"
                )}
              >
                <Icon className="w-4 h-4" />
                {isActive && (
                  <motion.div
                    layoutId="mobileActivePill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 360, damping: 32 }
                    }
                    style={{ zIndex: -1 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>
      </nav>
    </>
  );
};
