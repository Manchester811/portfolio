"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { personalData } from "@/data/personal";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSmoothScroll } from "@/components/layout/SmoothScroll";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { GooeyNav } from "@/components/reactbits/GooeyNav";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Trajectory" },
  { id: "certifications", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();

  const openContact = useCallback(() => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMobileMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileMenuOpen]);

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

    [{ id: "hero" }, ...navItems].forEach((item) => {
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
      if (el) scrollTo(el, { duration: 1.1 });
    },
    [scrollTo]
  );

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-2 top-3 z-50 sm:left-1/2 sm:right-auto sm:top-6 sm:w-max sm:max-w-[calc(100%-2rem)] sm:-translate-x-1/2"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMobileMenuOpen(false);
      }}
    >
      <div className="glass-pill flex w-full min-w-0 items-center gap-2 rounded-full px-2.5 py-2 sm:w-max sm:gap-3 sm:px-4 sm:py-2.5 lg:gap-5 lg:px-5 lg:py-3">
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick("hero"); }} className="nav-icon-button font-display text-xs font-bold shrink-0" aria-label="Rishabh Jain — back to top" title="Rishabh Jain">
          <span className="flex size-8 items-center justify-center rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)]">RJ</span>
        </a>

        <div className="mx-0.5 h-4 w-px shrink-0 bg-[var(--border-default)] sm:mx-1" aria-hidden="true" />

        <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
          <GooeyNav />
        </div>

        <div className="mx-1 h-4 w-px bg-[var(--border-default)] shrink-0 hidden lg:block" aria-hidden="true" />

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="nav-icon-button md:hidden"
            data-cursor-hover
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
          <button type="button" onClick={() => { setMobileMenuOpen(false); window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true })); }} className="nav-icon-button" data-cursor-hover aria-label="Open command palette" title="Search · Ctrl/⌘ K">
            <Search className="size-4" aria-hidden="true" />
          </button>
          <ThemeToggle />
          <button type="button" onClick={openContact} className="hidden lg:inline-flex min-h-8 cursor-pointer items-center gap-1 rounded-full bg-[var(--text-primary)] px-3 text-xs font-semibold text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-primary-hover)]" data-cursor-hover aria-label="Hire me">
            Hire me <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div id="mobile-navigation" initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -6 }} transition={{ duration: shouldReduceMotion ? 0 : 0.16 }} style={{ backgroundColor: "var(--bg-secondary)" }} className="glass-pill absolute left-0 right-0 top-full mx-auto mt-2 max-h-[calc(100dvh-6rem)] w-full max-w-[20rem] overflow-y-auto overscroll-contain rounded-[var(--radius-xl)] p-2 md:hidden" data-lenis-prevent>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navItems.map((item) => (
                <button key={item.id} type="button" onClick={() => { menuButtonRef.current?.focus(); handleNavClick(item.id); }} aria-current={activeSection === item.id ? "location" : undefined} className="nav-link flex min-h-11 items-center justify-between rounded-full px-4 text-left text-sm font-medium" data-cursor-hover>
                  {item.label}
                  {activeSection === item.id && <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}
                </button>
              ))}
            </nav>
            <div className="mt-2 grid grid-cols-2 gap-1 border-t border-[var(--border-subtle)] pt-2">
              <button type="button" onClick={openContact} className="btn-primary col-span-2 min-h-11 px-3"><span>Start a conversation</span><ArrowUpRight className="h-4 w-4" /></button>
              <a href={personalData.resumeUrl} target="_blank" rel="noopener noreferrer" className="nav-link flex min-h-11 items-center justify-center gap-1 rounded-full text-xs"><span>Download Résumé</span><ArrowUpRight className="h-4 w-4" /></a>
              <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="nav-link flex min-h-11 items-center justify-center gap-1 rounded-full text-xs"><span>GitHub</span><ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
