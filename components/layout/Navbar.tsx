"use client";

import React, { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { personalData } from "@/data/personal";
import { ArrowUpRight, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/components/layout/SmoothScroll";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback(
    (id: string) => {
      setActiveSection(id);
      setMobileMenuOpen(false);
      const el = document.getElementById(id);
      if (el) scrollTo(el, { offset: -20, duration: 1.1 });
    },
    [scrollTo]
  );

  return (
    <>
      <header
        role="banner"
        className="fixed inset-x-0 top-5 z-50 transition-all duration-500 md:top-6"
      >
        <div className="mx-auto flex w-full max-w-[var(--container-max)] items-center px-4 sm:px-6 lg:px-8">
          {/* Glass pill navbar */}
          <nav
            className={cn(
              "relative flex w-full items-center gap-2 rounded-full border px-3 py-2 transition-all duration-500 sm:gap-3 sm:px-4 sm:py-2.5",
              "border-[var(--border-default)] backdrop-blur-2xl",
              isScrolled
                ? "bg-[rgba(8,8,8,0.82)] shadow-[0_12px_40px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
                : "bg-[rgba(5,5,5,0.6)] shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)_inset]"
            )}
          >
            {/* Inner highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(255,255,255,0.06)] via-transparent to-transparent" />

            {/* Brand / Logo — small circular element */}
            <button
              onClick={() => handleNavClick("hero")}
              className="relative z-10 flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
              data-cursor-hover
              aria-label="Rishabh Jain — back to top"
            >
              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[var(--border-default)] bg-[var(--bg-card)]">
                <span className="flex h-9 w-9 items-center justify-center bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-secondary)]">
                  <span className="font-display text-[11px] font-bold tracking-[-0.02em] text-[var(--bg-primary)]">
                    RJ
                  </span>
                </span>
              </span>
              <span className="relative z-10 hidden font-display text-sm font-semibold uppercase tracking-[-0.02em] text-[var(--text-primary)] lg:inline">
                Rishabh Jain
              </span>
            </button>

            {/* Subtle divider */}
            <div className="hidden h-5 w-px shrink-0 bg-[var(--border-default)] md:block" />

            {/* Desktop navigation links */}
            <div
              className="hidden flex-1 items-center justify-center gap-1 md:flex"
              role="navigation"
              aria-label="Primary"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative flex cursor-pointer items-center rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300",
                      "focus-visible:ring-2 focus-visible:ring-[var(--text-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] focus-visible:outline-none",
                      isActive
                        ? "bg-[rgba(255,255,255,0.12)] text-[var(--text-primary)] shadow-[0_2px_8px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.08)_inset]"
                        : "text-[var(--text-muted)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text-secondary)]"
                    )}
                    data-cursor-hover
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Right side — search + resume + mobile hamburger */}
            <div className="relative z-10 ml-auto flex items-center gap-1.5 sm:gap-2">
              {/* Search / Command Palette */}
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
                  );
                }}
                className="group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-muted)] transition-all duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-secondary)]"
                data-cursor-hover
                aria-label="Open command palette"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Resume button */}
              <a
                href={personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-9 cursor-pointer items-center gap-1.5 rounded-full bg-[var(--text-primary)] px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--bg-primary)] transition-all duration-300 hover:bg-[var(--accent-primary-hover)] md:flex"
                data-cursor-hover
              >
                <span>Résumé</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--border-strong)] md:hidden"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                data-cursor-hover
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[var(--bg-primary)]/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 * i + 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => handleNavClick(item.id)}
                    className="flex cursor-pointer items-baseline justify-between border-b border-[var(--border-subtle)] py-5 text-left"
                  >
                    <span className="font-display text-3xl font-bold uppercase tracking-[-0.03em] text-[var(--text-primary)]">
                      {item.label}
                    </span>
                    <span className="font-mono text-[var(--text-micro)] text-[var(--text-muted)]">
                      0{i + 1}
                    </span>
                  </motion.button>
                )
              )}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.5 }}
              className="flex flex-col gap-3"
            >
              <a
                href={personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full py-4 text-[var(--text-label-sm)]"
              >
                <span>Download Résumé</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full py-4 text-[var(--text-label-sm)]"
              >
                <span>GitHub</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
