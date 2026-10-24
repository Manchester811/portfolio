"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { getServerTheme, getTheme, setTheme, subscribeTheme } from "@/lib/theme";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const label = theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Toggle color theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(getTheme() === "dark" ? "light" : "dark")}
      className="nav-icon-button border border-[var(--border-subtle)] bg-[var(--bg-primary)]"
      aria-label={label}
      title={label}
      data-cursor-hover
    >
      <Sun className="theme-icon-sun size-4" aria-hidden="true" />
      <Moon className="theme-icon-moon size-4" aria-hidden="true" />
    </button>
  );
}
