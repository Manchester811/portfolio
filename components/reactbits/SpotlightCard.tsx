"use client";

import React, { useEffect, useRef } from "react";

export type SpotlightShape = "circle" | "beam";

export type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  spotlightColor?: string;
  intensity?: number;
  spotlightSize?: number;
  softness?: number;
  shape?: SpotlightShape;
  borderGlow?: number;
  proximity?: number;
  smoothing?: number;
  ambient?: boolean;
  flare?: boolean;
  grain?: number;
  theme?: "dark" | "light" | "auto";
};

type Settings = {
  shape: SpotlightShape;
  fill: string;
  edge: string;
  size: number;
  intensity: number;
  borderGlow: number;
  proximity: number;
  smoothing: number;
  ambient: boolean;
  flare: boolean;
  grain: number;
  theme: "dark" | "light" | "auto";
};

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const falloff = (color: string, softness: number) => {
  const soft = clamp(softness, 0, 1);
  const core = (1 - soft) ** 1.5 * 0.85;
  const stop = (alpha: number, at: number) =>
    `color-mix(in srgb, ${color} ${(alpha * 100).toFixed(2)}%, transparent) ${(at * 100).toFixed(2)}%`;
  const stops = [stop(1, 0)];

  for (let index = 0; index <= 14; index += 1) {
    const position = core + ((1 - core) * index) / 14;
    const gradient = (position - core) / (1 - core);
    const smooth = 1 - gradient * gradient * (3 - 2 * gradient);
    const glow = Math.exp(-4.6 * gradient * gradient) * (1 - gradient ** 6);
    stops.push(stop(smooth + (glow - smooth) * soft, position));
  }

  return stops.join(", ");
};

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  style,
  spotlightColor = "var(--text-primary)",
  intensity = 0.15,
  spotlightSize = 240,
  softness = 0.8,
  shape = "circle",
  borderGlow = 0.35,
  proximity = 64,
  smoothing = 0.3,
  ambient = false,
  flare = true,
  grain = 0,
  theme = "auto",
  ...rest
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  const grainRef = useRef<HTMLSpanElement>(null);
  const edgeRef = useRef<HTMLSpanElement>(null);
  const wakeRef = useRef<(() => void) | null>(null);

  const settings: Settings = {
    shape: shape === "beam" ? "beam" : "circle",
    fill: falloff(spotlightColor, softness),
    edge: falloff(spotlightColor, 1),
    size: Math.max(20, spotlightSize),
    intensity: clamp(intensity, 0, 1),
    borderGlow: clamp(borderGlow, 0, 1),
    proximity: Math.max(0, proximity),
    smoothing: clamp(smoothing, 0, 1),
    ambient,
    flare,
    grain: clamp(grain, 0, 1),
    theme,
  };
  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
    wakeRef.current?.();
  });

  useEffect(() => {
    const root = rootRef.current;
    const light = lightRef.current;
    const noise = grainRef.current;
    const edge = edgeRef.current;
    if (!root || !light || !noise || !edge) return undefined;

    const desktopPointer = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
    ).matches;
    if (!desktopPointer) return undefined;

    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const state = {
      x: 0,
      y: 0,
      presence: 0,
      flare: 0,
      time: Math.random() * 60,
      pressed: false,
      visible: true,
    };
    const pointer = { x: 0, y: 0, active: false };
    const drawn = { light: "", edge: "", noise: "" };
    let focusedElement: Element | null = null;
    let animationFrame = 0;
    let lastTime = 0;
    let alive = true;

    const getThemeScale = (currentTheme: Settings["theme"]) => {
      const isLight =
        currentTheme === "light" ||
        (currentTheme === "auto" &&
          document.documentElement.dataset.theme === "light");
      return { fill: isLight ? 0.32 : 1, edge: isLight ? 0.7 : 1 };
    };

    const gradient = (
      currentSettings: Settings,
      size: number,
      x: number,
      y: number,
      stops: string
    ) => {
      if (currentSettings.shape === "beam") {
        const reach = Math.max(size * 0.6, y + size * 0.55);
        return `radial-gradient(${(size * 0.55).toFixed(1)}px ${reach.toFixed(1)}px at ${x.toFixed(1)}px 0px, ${stops})`;
      }
      return `radial-gradient(circle ${size.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, ${stops})`;
    };

    const paint = (currentSettings: Settings) => {
      const scale = getThemeScale(currentSettings.theme);
      const size = currentSettings.size * (1 + 0.2 * state.flare);
      const flareBoost = 1 + 0.7 * state.flare;
      const fill = gradient(
        currentSettings,
        size,
        state.x,
        state.y,
        currentSettings.fill
      );
      const rim = gradient(
        currentSettings,
        size * 0.6,
        state.x,
        currentSettings.shape === "beam" ? 0 : state.y,
        currentSettings.edge
      );

      if (fill !== drawn.light) {
        drawn.light = fill;
        light.style.background = fill;
      }
      if (rim !== drawn.edge) {
        drawn.edge = rim;
        edge.style.background = rim;
      }

      light.style.opacity = String(
        Math.min(1, state.presence * currentSettings.intensity * scale.fill * flareBoost)
      );
      edge.style.opacity = String(
        Math.min(1, state.presence * currentSettings.borderGlow * scale.edge * flareBoost)
      );

      const grainGradient =
        currentSettings.grain > 0
          ? gradient(
              currentSettings,
              size,
              state.x,
              state.y,
              "#000 0%, transparent 100%"
            )
          : "none";
      if (grainGradient !== drawn.noise) {
        drawn.noise = grainGradient;
        noise.style.webkitMaskImage = grainGradient;
        noise.style.maskImage = grainGradient;
      }
      noise.style.opacity = String(state.presence * currentSettings.grain);
    };

    const tick = (now: number) => {
      animationFrame = 0;
      if (!alive) return;

      const currentSettings = settingsRef.current;
      const delta = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;
      const rect = root.getBoundingClientRect();
      let targetX = state.x;
      let targetY = state.y;
      let targetPresence = 0;

      if (focusedElement && root.contains(focusedElement)) {
        const focusedBox = focusedElement.getBoundingClientRect();
        targetX = focusedBox.left + focusedBox.width / 2 - rect.left;
        targetY = focusedBox.top + focusedBox.height / 2 - rect.top;
        targetPresence = 1;
      } else if (pointer.active) {
        targetX = pointer.x - rect.left;
        targetY = pointer.y - rect.top;
        const outsideDistance = Math.hypot(
          Math.max(0, -targetX, targetX - rect.width),
          Math.max(0, -targetY, targetY - rect.height)
        );
        if (outsideDistance === 0) targetPresence = 1;
        else if (currentSettings.proximity > 0) {
          targetPresence =
            Math.max(0, 1 - outsideDistance / currentSettings.proximity) ** 2;
        }
      }

      if (
        targetPresence < 0.6 &&
        currentSettings.ambient &&
        state.visible
      ) {
        if (!reducedMotion) state.time += delta;
        const drift = 0.6 - targetPresence;
        targetX +=
          (rect.width * (0.5 + 0.34 * Math.sin(state.time * 0.43)) - targetX) *
          (drift / 0.6);
        targetY +=
          (rect.height * (0.5 + 0.3 * Math.sin(state.time * 0.61 + 1.3)) - targetY) *
          (drift / 0.6);
        targetPresence = 0.6;
      }

      if (state.presence < 0.02 && targetPresence > 0 && !currentSettings.ambient) {
        state.x = targetX;
        state.y = targetY;
      }

      const follow =
        reducedMotion || currentSettings.smoothing === 0
          ? 1
          : 1 - Math.exp(-delta / (0.015 + currentSettings.smoothing * 0.22));
      state.x += (targetX - state.x) * follow;
      state.y += (targetY - state.y) * follow;

      const fade = reducedMotion
        ? 1
        : 1 - Math.exp(-delta / (targetPresence > state.presence ? 0.1 : 0.32));
      state.presence += (targetPresence - state.presence) * fade;
      if (Math.abs(targetPresence - state.presence) < 0.002) {
        state.presence = targetPresence;
      }

      const pressed = state.pressed && currentSettings.flare && !reducedMotion ? 1 : 0;
      state.flare +=
        (pressed - state.flare) * (1 - Math.exp(-delta / (pressed ? 0.05 : 0.28)));
      if (Math.abs(pressed - state.flare) < 0.002) state.flare = pressed;

      paint(currentSettings);

      const moving =
        Math.abs(targetX - state.x) > 0.1 || Math.abs(targetY - state.y) > 0.1;
      const settled =
        !moving && state.presence === targetPresence && state.flare === pressed;
      if (!settled || (currentSettings.ambient && state.visible && !reducedMotion)) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    const wake = () => {
      if (animationFrame || !alive) return;
      lastTime = performance.now();
      animationFrame = requestAnimationFrame(tick);
    };
    wakeRef.current = wake;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      if (
        state.presence > 0 ||
        settingsRef.current.proximity > 0 ||
        root.contains(event.target as Node | null)
      ) {
        wake();
      }
    };
    const onOut = (event: PointerEvent) => {
      if (event.relatedTarget && root.contains(event.relatedTarget as Node)) return;
      pointer.active = false;
      wake();
    };
    const onDown = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      state.pressed = true;
      wake();
    };
    const onUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") pointer.active = false;
      if (!state.pressed && event.pointerType === "mouse") return;
      state.pressed = false;
      wake();
    };
    const onFocusIn = (event: FocusEvent) => {
      if (
        !(event.target instanceof Element) ||
        !event.target.matches(":focus-visible")
      ) {
        return;
      }
      focusedElement = event.target;
      wake();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (root.contains(event.relatedTarget as Node | null)) return;
      focusedElement = null;
      wake();
    };
    const onScroll = () => {
      if (pointer.active || state.presence > 0) wake();
    };

    const observer = new IntersectionObserver((entries) => {
      state.visible = entries.some((entry) => entry.isIntersecting);
      if (state.visible) wake();
    });
    observer.observe(root);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    document.addEventListener("pointerout", onOut);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    wake();

    return () => {
      alive = false;
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("scroll", onScroll, { capture: true });
      document.removeEventListener("pointerout", onOut);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      wakeRef.current = null;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`spotlight-card${className ? ` ${className}` : ""}`}
      style={style}
      {...rest}
    >
      <span ref={lightRef} className="spotlight-card__light" aria-hidden="true" />
      <span
        ref={grainRef}
        className="spotlight-card__grain"
        style={{ backgroundImage: NOISE }}
        aria-hidden="true"
      />
      {children}
      <span className="spotlight-card__border" aria-hidden="true" />
      <span ref={edgeRef} className="spotlight-card__edge" aria-hidden="true" />
    </div>
  );
};

export default SpotlightCard;
