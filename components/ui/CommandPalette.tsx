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
      if (el) scrollTo(el, { offset: -30, duration: 1.1 });
    },
    [scrollTo]
  );

  const commands: Command[] = [
    { id: "go-home",        label: "Go Home",           icon: <Home className="w-4 h-4" />,         action: () => navigate("hero"),         group: "Navigate" },
    { id: "go-projects",    label: "View Projects",     icon: <FolderGit2 className="w-4 h-4" />,   action: () => navigate("projects"),     group: "Navigate" },
    { id: "go-about",       label: "About Me",          icon: <User className="w-4 h-4" />,         action: () => navigate("about"),        group: "Navigate" },
    { id: "go-skills",      label: "View Skills",       icon: <Cpu className="w-4 h-4" />,          action: () => navigate("skills"),       group: "Navigate" },
    { id: "go-experience",  label: "Experience",        icon: <Briefcase className="w-4 h-4" />,    action: () => navigate("experience"),   group: "Navigate" },
    { id: "go-education",   label: "Education",         icon: <GraduationCap className="w-4 h-4" />,action: () => navigate("education"),    group: "Navigate" },
    { id: "go-contact",     label: "Contact Me",        icon: <Mail className="w-4 h-4" />,         action: () => navigate("contact"),      group: "Navigate" },
    {
      id: "dl-resume",
      label: "Download Resume",
      description: "Download Rishabh's CV as PDF",
      icon: <Download className="w-4 h-4" />,
      action: () => { setOpen(false); const a = document.createElement("a"); a.href = personalData.resumeUrl; a.download = "Rishabh_Jain_Resume.pdf"; a.click(); },
      group: "Actions",
    },
    {
      id: "open-github",
      label: "Open GitHub",
      description: personalData.github,
      icon: <GithubIcon className="w-4 h-4" />,
      action: () => { setOpen(false); window.open(personalData.github, "_blank"); },
      group: "Links",
    },
    {
      id: "open-linkedin",
      label: "Open LinkedIn",
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
    setSelected(0);
  }, [query]);

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

  // Group labels
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
            className="fixed top-[20vh] left-1/2 -translate-x-1/2 z-[201] w-[92vw] max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onKeyDown={handleKeyDown}
          >
            <div className="rounded-2xl overflow-hidden bg-[#080f24]/95 border border-cyan-500/25 shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(6,182,212,0.12)] backdrop-blur-2xl">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                />
                <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Commands list */}
              <div className="max-h-[50vh] overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <p className="text-center text-slate-500 text-sm py-8">No commands found</p>
                )}
                {groups.map((group) => (
                  <div key={group}>
                    <p className="px-4 pt-3 pb-1 text-[10px] font-semibold tracking-widest text-slate-600 uppercase">
                      {group}
                    </p>
                    {filtered
                      .filter((c) => c.group === group)
                      .map((cmd) => {
                        const idx = filtered.indexOf(cmd);
                        return (
                          <button
                            key={cmd.id}
                            onClick={cmd.action}
                            onMouseEnter={() => setSelected(idx)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 cursor-pointer ${
                              selected === idx
                                ? "bg-cyan-500/12 text-cyan-200"
                                : "text-slate-300 hover:bg-white/5"
                            }`}
                          >
                            <span className={`shrink-0 ${selected === idx ? "text-cyan-400" : "text-slate-500"}`}>
                              {cmd.icon}
                            </span>
                            <span className="flex-1">
                              <span className="text-sm font-medium">{cmd.label}</span>
                              {cmd.description && (
                                <span className="block text-xs text-slate-500 truncate">{cmd.description}</span>
                              )}
                            </span>
                            {selected === idx && (
                              <kbd className="shrink-0 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/8 rounded border border-white/10">
                                ↵
                              </kbd>
                            )}
                          </button>
                        );
                      })}
                  </div>
                ))}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/5 text-[10px] text-slate-600">
                <span>↑↓ navigate · ↵ select · esc close</span>
                <span className="font-mono">⌘K</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
