export type Theme = "dark" | "light";

const STORAGE_KEY = "rj-portfolio-theme";
const THEME_EVENT = "rj-theme-change";
const THEME_COLORS = { dark: "#070707", light: "#F7F7F5" };

// Runs before the body is painted. Keep the existing dark identity for new visitors.
export const themeInitScript = `(() => {
  let theme = "dark";
  try {
    const saved = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    if (saved === "light" || saved === "dark") theme = saved;
  } catch {}
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = ${JSON.stringify(THEME_COLORS)}[theme];
})();`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function getServerTheme(): null {
  return null;
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Theme switching still works when storage is blocked or unavailable.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function subscribeTheme(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    applyTheme(event.newValue === "light" ? "light" : "dark");
    onChange();
  };
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
