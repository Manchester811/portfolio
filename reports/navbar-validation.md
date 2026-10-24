# Navbar redesign — validation

Date: October 24, 2026

## Scope and reference

Inspected the rendered reference at `https://rbp-portfolio.vercel.app/projects` and the deployed portfolio at `https://portfolio-jd2s.vercel.app` in headless Chromium, including computed styles and desktop/mobile screenshots.

- Reference: 274 × 46px, centered 24px from the top, fully rounded, 6px padding, 32px theme control, restrained border/shadow and active pill.
- Previous portfolio desktop navbar: 1,376 × 58px at a 1,440px viewport.
- Redesigned desktop navbar: 706 × 46px at the same viewport. The extra width preserves all six existing destinations, RJ identity, search and Hire me.
- Mobile/tablet: content-width pill, 44px touch controls, compact rounded disclosure instead of the old fullscreen overlay. The dropdown is opaque for legibility and scrolls within short viewports.
- This repository has one portfolio page. Work is `#projects`, not a separate `/projects` route. No routes, personal information, projects or page sections were replaced.

## Implementation files

- `components/layout/Navbar.tsx`: compact pill, active section styling, mobile disclosure, Escape/outside-click/blur/resize dismissal, retained actions.
- `components/ui/ThemeToggle.tsx`: accessible Lucide sun/moon button; keyboard activation uses native button behavior.
- `lib/theme.ts`: a single small theme store, local-storage persistence, cross-tab synchronization, blocked-storage fallback and pre-paint initialization.
- `app/layout.tsx`: inline head bootstrap; intentionally suppresses only the root attribute mismatch caused by the saved theme.
- `app/globals.css`: light counterparts to the existing design tokens, theme-aware button surfaces/shadows, navbar utilities and scroll clearance. Existing fonts and section geometry remain unchanged.
- `components/layout/SmoothScroll.tsx`: shared navbar clearance for Lenis, anchors and reduced-motion fallback.
- `components/ui/CommandPalette.tsx`: same scroll clearance and theme-aware hover/border colors.
- `components/sections/Hero.tsx`: one class on the existing portrait wrapper so dark photographic media can be softened in light mode without replacing or inverting it.
- `components/ui/ArchitectureDiagram.tsx` and `components/ui/CustomCursor.tsx`: replace fixed white graphic colors with theme-aware colors.
- `scripts/check-navbar.mjs`: repeatable browser smoke checks. Playwright is a QA-only tool; no application or lockfile dependencies changed.

## Theme behavior

New visitors keep the existing dark default. An explicit choice is stored under `rj-portfolio-theme` and applied to the root before body paint. Both the toggle and existing components read the same CSS tokens; no provider or parallel theme system was introduced. The toggle remains usable if local storage is blocked. An explicit change also synchronizes other open tabs and updates the browser theme-color metadata.

## Checks

- `npm run lint`: passed.
- `npm run build`: passed, including TypeScript and static-page generation.
- `npx tsc --noEmit`: passed.
- `git diff --check`: passed.
- The first build hit a sandbox-only truncated Next.js SWC binary. Loading that native binary independently also crashed. `npm ci --no-audit --no-fund` restored the locked Linux dependencies; the subsequent production build passed without package/lockfile changes.

Browser command, against a running local server:

```bash
PLAYWRIGHT_MODULE=/tmp/portfolio-browser/node_modules/playwright node scripts/check-navbar.mjs
```

`PLAYWRIGHT_MODULE` can point to any installed Playwright package directory; if omitted, the script resolves `playwright` normally. `BASE_URL` defaults to `http://localhost:3000`.

### Functional checks passed

- Six viewports: 1,440×900, 1,024×768, 768×1,024, 390×844, 320×568 and 844×390.
- Both themes at every viewport; 72 section-navigation/active-state cases (six destinations × two themes × six viewports).
- Centering, compact dimensions, no horizontal navbar overflow, section clearance, return to top.
- Mobile menu keyboard order, Escape/focus return, outside-click dismissal, breakpoint changes, short-screen scrolling, résumé/GitHub destinations and theme access while the menu is open.
- Keyboard theme switching, persistence after refreshing in each theme, cross-tab synchronization and `/#projects` loading.
- Search/command palette, Hire me contact dialog and project case-study opening/closing. No contact request was submitted.
- Saved light theme before React: blocked application JS and confirmed the inline bootstrap had already applied the light root and body background.
- Local-storage denial: theme button still changes the complete page.
- Navbar inactive-text contrast on its surface: approximately 10.45:1 dark and 8.63:1 light.
- Separate normal-motion console checks: no uncaught exceptions, console errors or hydration warnings, including saved-theme refreshes.

### Existing limitation — full browser suite remains nonzero

The browser suite deliberately keeps its final zero-console-errors assertion. It fails under **prefers-reduced-motion**, where the existing `CountUp` server render contains `0` but the initial client render contains the final count. Development diagnostics also identify pre-existing reduced-motion differences in Hero/MotionSection initial styles. The identical React hydration error (#418) was reproduced on the unchanged deployed portfolio.

This was not introduced by the theme/navbar work and was left outside the requested navbar scope. Functional checks still passed with reduced motion enabled. Do not describe the full browser suite as completely passing until that separate hydration issue is fixed.

## Visual previews

- `preview-navbar-reference-desktop.png`, `preview-navbar-reference-mobile.png`
- `preview-navbar-current-desktop.png`, `preview-navbar-current-mobile.png` (before)
- `preview-navbar-desktop-dark.png`, `preview-navbar-desktop-light.png`
- `preview-navbar-projects-light.png`
- `preview-navbar-tablet-light.png`
- `preview-navbar-mobile-dark.png`, `preview-navbar-mobile-light.png`

These screenshots show navbar/hero/projects states, not a redesign of the reference's other content. Validation used Chromium; Safari and Firefox were not exercised.
