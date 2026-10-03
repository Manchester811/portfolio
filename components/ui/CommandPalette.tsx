"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/components/layout/SmoothScroll";
import { personalData } from "@/data/personal";
import {
  Home,
  FolderGit2,
  User,
  Cpu,
  Briefcase,
  GraduationCap,
  Download,
  Mail,
  Search,
  X,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
}

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { scrollTo } = useSmoothScroll();

  const navigate = useCallback(
    (id: string) => {
      setOpen(false);
      const el = document.getElementById(id);
      if (el) scrollTo(el, { offset: -30, duration: 1.0 });
    },
    [scrollTo]
  );

  const commands: Command[] = [
    { id: "go-home",        label: "Home",              icon: <Home className="w-4 h-4" />,         action: () => navigate("hero"),         group: "Navigation" },
    { id: "go-projects",    label: "Selected Work",     icon: <FolderGit2 className="w-4 h-4" />,   action: () => navigate("projects"),     group: "Navigation" },
    { id: "go-skills",      label: "Services & Skills", icon: <Cpu className="w-4 h-4" />,          action: () => navigate("skills"),       group: "Navigation" },
    { id: "go-about",       label: "About Me",          icon: <User className="w-4 h-4" />,         action: () => navigate("about"),        group: "Navigation" },
    { id: "go-experience",  label: "Experience",        icon: <Briefcase className="w-4 h-4" />,    action: () => navigate("experience"),   group: "Navigation" },
    { id: "go-education",   label: "Education",         icon: <GraduationCap className="w-4 h-4" />,action: () => navigate("education"),    group: "Navigation" },
    { id: "go-contact",     label: "Contact",           icon: <Mail className="w-4 h-4" />,         action: () => navigate("contact"),      group: "Navigation" },
    {
      id: "dl-resume",
      label: "Download Resume",
      description: "PDF Curriculum Vitae",
      icon: <Download className="w-4 h-4" />,
      action: () => { setOpen(false); const a = document.createElement("a"); a.href = personalData.resumeUrl; a.download = "Rishabh_Jain_Resume.pdf"; a.click(); },
      group: "Actions",
    },
    {
      id: "open-github",
      label: "GitHub Profile",
      description: personalData.github,
      icon: <GithubIcon className="w-4 h-4" />,
      action: () => { setOpen(false); window.open(personalData.github, "_blank"); },
      group: "Links",
    },
    {
      id: "open-linkedin",
      label: "LinkedIn Profile",
      description: personalData.linkedin,
      icon: <LinkedinIcon className="w-4 h-4" />,
      action: () => { setOpen(false); window.open(personalData.linkedin, "_blank"); },
      group: "Links",
    },
  ];

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase()) ||
          c.group.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // Reset the selection whenever the query changes. Doing this in the event
  // handler (rather than an effect) avoids the cascading-render warning.
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelected(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      filtered[selected]?.action();
    }
  };

  const groups = [...new Set(filtered.map((c) => c.group))];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[18vh] left-1/2 -translate-x-1/2 z-[201] w-[92vw] max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onKeyDown={handleKeyDown}
          >
            <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden font-sans">
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                <Search className="w-4 h-4 text-[var(--text-accent)] shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  placeholder="Type a command or jump to section…"
                  className="flex-1 bg-transparent text-sm text-[var(--text-primary)] font-medium placeholder:text-[var(--text-muted)] outline-none"
                />
                <button onClick={() => setOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Commands list */}
              <div className="max-h-[50vh] overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <p className="text-center text-[var(--text-muted)] text-xs py-8">No results found</p>
                )}
                {groups.map((group) => (
                  <div key={group}>
                    <p className="px-5 pt-3 pb-1 text-[10px] font-mono font-semibold uppercase tracking-widest text-[var(--text-accent)]">
                      {group}
                    </p>
                    {filtered
                      .filter((c) => c.group === group)
                      .map((cmd) => {
                        const idx = filtered.findIndex((c) => c.id === cmd.id);
                        return (
                          <button
                            key={cmd.id}
                            onClick={cmd.action}
                            onMouseEnter={() => setSelected(idx)}
                            className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer ${
                              selected === idx
                                ? "bg-[var(--accent-primary-muted)] text-[var(--text-accent)] border-l-2 border-[var(--accent-primary)]"
                                : "text-[var(--text-secondary)] hover:bg-white/[0.03] border-l-2 border-transparent"
                            }`}
                          >
                            <span className="shrink-0">
                              {cmd.icon}
                            </span>
                            <span className="flex-1">
                              <span className="text-xs font-semibold uppercase tracking-wide">{cmd.label}</span>
                              {cmd.description && (
                                <span className={`block text-[10px] ${selected === idx ? "text-[var(--text-accent)]/70" : "text-[var(--text-muted)]"}`}>
                                  {cmd.description}
                                </span>
                              )}
                            </span>
                            {selected === idx && (
                              <span className="text-[10px] font-mono text-[var(--text-accent)]">↵</span>
                            )}
                          </button>
                        );
                      })}
                  </div>
                ))}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.05] text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-primary)]/40">
                <span>↑↓ navigate · ↵ select · esc close</span>
                <span>⌘K</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
