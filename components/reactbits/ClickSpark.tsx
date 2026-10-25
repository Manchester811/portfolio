"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type ClickSparkShape = "line" | "streak" | "dot" | "star";
export type ClickSparkEasing = "linear" | "ease-in" | "ease-out" | "ease-in-out" | "spring";

export interface ClickSparkProps extends HTMLAttributes<HTMLDivElement> {
  sparkColor?: string | string[];
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  sparkWidth?: number;
  duration?: number;
  easing?: ClickSparkEasing;
  extraScale?: number;
  shape?: ClickSparkShape;
  randomness?: number;
  gravity?: number;
  spread?: number;
  direction?: number;
  glow?: number;
  ring?: boolean;
  layer?: "front" | "back";
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface ClickSparkHandle {
  spark: (x?: number, y?: number) => void;
}

interface Spark {
  angle: number;
  reach: number;
  scale: number;
  life: number;
  spin: number;
  color: string;
  clear: string;
  glow: number;
}

interface Burst {
  x: number;
  y: number;
  start: number;
  sparks: Spark[];
  settings: Settings;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  ratio: number;
  left: number;
  top: number;
}

interface Settings {
  colors: string[];
  size: number;
  radius: number;
  count: number;
  width: number;
  duration: number;
  ease: (value: number) => number;
  shape: ClickSparkShape;
  randomness: number;
  gravity: number;
  spread: number;
  direction: number;
  glow: number;
  ring: boolean;
  disabled: boolean;
}

const EASINGS: Record<ClickSparkEasing, (value: number) => number> = {
  linear: (value) => value,
  "ease-in": (value) => value * value,
  "ease-out": (value) => 1 - (1 - value) ** 3,
  "ease-in-out": (value) =>
    value < 0.5 ? 4 * value * value * value : 1 - (-2 * value + 2) ** 3 / 2,
  spring: (value) => 1 + 2.4 * (value - 1) ** 3 + 1.4 * (value - 1) ** 2,
};

const MAX_BURSTS = 24;
const GRAVITY_SCALE = 500;
const REDUCED_DURATION = 280;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const smoothstep = (from: number, to: number, value: number) => {
  const progress = clamp((value - from) / (to - from), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

const toColors = (value: string | string[]) => {
  const colors = (Array.isArray(value) ? value : [value]).filter(Boolean);
  return colors.length > 0 ? colors : ["#ffffff"];
};

const getComputedColor = (root: HTMLElement, color: string) => {
  const probe = document.createElement("span");
  probe.style.color = color;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  root.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved || "rgb(255, 255, 255)";
};

const parseRgb = (color: string) => {
  const match = color.match(/[\d.]+/g);
  return match?.slice(0, 3).map(Number) ?? [255, 255, 255];
};

const starPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number
) => {
  const pinch = radius * 0.16;
  ctx.beginPath();
  ctx.moveTo(x + Math.cos(rotation) * radius, y + Math.sin(rotation) * radius);
  for (let index = 1; index <= 4; index += 1) {
    const angle = rotation + (index * Math.PI) / 2;
    const midpoint = angle - Math.PI / 4;
    ctx.quadraticCurveTo(
      x + Math.cos(midpoint) * pinch,
      y + Math.sin(midpoint) * pinch,
      x + Math.cos(angle) * radius,
      y + Math.sin(angle) * radius
    );
  }
  ctx.closePath();
};

export const ClickSpark = forwardRef<ClickSparkHandle, ClickSparkProps>(
  (
    {
      sparkColor = "var(--text-primary)",
      sparkSize = 10,
      sparkRadius = 26,
      sparkCount = 6,
      sparkWidth = 1.75,
      duration = 420,
      easing = "ease-out",
      extraScale = 1,
      shape = "line",
      randomness = 0.2,
      gravity = 0,
      spread = 360,
      direction = 0,
      glow = 0.08,
      ring = false,
      layer = "front",
      disabled = false,
      className = "",
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const layerRef = useRef<HTMLSpanElement>(null);
    const engineRef = useRef<ClickSparkHandle | null>(null);

    useEffect(() => {
      const root = rootRef.current;
      const layerElement = layerRef.current;
      if (!root || !layerElement) return undefined;

      const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
      const bursts: Burst[] = [];
      let animationFrame = 0;
      let lastMousePress = { time: -Infinity, x: 0, y: 0 };

      const settings = (): Settings => ({
        colors: toColors(sparkColor).map((color) => getComputedColor(root, color)),
        size: Math.max(0, sparkSize),
        radius: Math.max(0, sparkRadius) * Math.max(0, extraScale),
        count: clamp(Math.round(sparkCount), 1, 32),
        width: Math.max(0.5, sparkWidth),
        duration: Math.max(80, duration),
        ease: EASINGS[easing] ?? EASINGS["ease-out"],
        shape,
        randomness: clamp(randomness, 0, 1),
        gravity: Math.max(0, gravity),
        spread: clamp(spread, 0, 360),
        direction,
        glow: clamp(glow, 0, 1),
        ring,
        disabled,
      });

      const fallDistance = (current: Settings, seconds: number) =>
        0.5 * current.gravity * GRAVITY_SCALE * seconds * seconds;

      const position = (burst: Burst, spark: Spark, distance: number, seconds: number) => [
        burst.x + Math.cos(spark.angle) * distance,
        burst.y + Math.sin(spark.angle) * distance + fallDistance(burst.settings, seconds),
      ];

      const drawSpark = (
        ctx: CanvasRenderingContext2D,
        burst: Burst,
        spark: Spark,
        elapsed: number
      ) => {
        const current = burst.settings;
        const life = reducedMotion ? REDUCED_DURATION : current.duration * spark.life;
        const progress = elapsed / life;
        if (progress >= 1) return false;

        const eased = reducedMotion ? 0.55 : current.ease(clamp(progress, 0, 1));
        const seconds = reducedMotion ? 0 : elapsed / 1000;
        const distance = current.radius * spark.reach * eased;
        const width = current.width * spark.scale;
        const opacity = reducedMotion
          ? 1 - progress
          : 1 - smoothstep(current.shape === "line" ? 0.55 : 0.7, 1, progress);
        if (opacity <= 0) return true;

        ctx.strokeStyle = spark.color;
        ctx.fillStyle = spark.color;

        if (current.shape === "line") {
          const length = current.size * spark.scale * (reducedMotion ? 0.5 : (1 - progress) ** 1.6);
          const [startX, startY] = position(burst, spark, distance, seconds);
          const [endX, endY] = position(burst, spark, distance + Math.max(0.01, length), seconds);
          ctx.lineCap = "round";
          if (spark.glow > 0) {
            ctx.globalAlpha = opacity * 0.14 * spark.glow;
            ctx.lineWidth = width * 4.5;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
          }
          ctx.globalAlpha = opacity;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          return true;
        }

        if (current.shape === "dot") {
          const [x, y] = position(burst, spark, distance, seconds);
          const radius = width * 1.25 * (1 - 0.5 * eased);
          if (spark.glow > 0) {
            ctx.globalAlpha = opacity * 0.18 * spark.glow;
            ctx.beginPath();
            ctx.arc(x, y, radius * 2.6, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
          return true;
        }

        const [x, y] = position(burst, spark, distance, seconds);
        const radius = current.size * 0.6 * spark.scale * (reducedMotion ? 1 - progress : Math.sin(Math.PI * progress) ** 0.7);
        if (radius <= 0.05) return true;
        if (current.shape === "streak") {
          const [tailX, tailY] = position(burst, spark, distance * 0.4, seconds);
          const gradient = ctx.createLinearGradient(tailX, tailY, x, y);
          gradient.addColorStop(0, spark.clear);
          gradient.addColorStop(1, spark.color);
          ctx.globalAlpha = opacity;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(x, y);
          ctx.lineTo(tailX + (x - tailX) * 0.8, tailY + (y - tailY) * 0.8);
          ctx.closePath();
          ctx.fill();
          return true;
        }

        if (spark.glow > 0) {
          ctx.globalAlpha = opacity * 0.2 * spark.glow;
          ctx.beginPath();
          ctx.arc(x, y, radius * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = opacity;
        starPath(ctx, x, y, radius, spark.angle + spark.spin * progress * Math.PI * 0.5);
        ctx.fill();
        return true;
      };

      const drawRing = (ctx: CanvasRenderingContext2D, burst: Burst, elapsed: number) => {
        const progress = elapsed / (reducedMotion ? REDUCED_DURATION : burst.settings.duration * 0.8);
        if (progress >= 1) return false;
        ctx.globalAlpha = (1 - progress) ** 2 * 0.7;
        ctx.strokeStyle = burst.sparks[0]?.color ?? burst.settings.colors[0];
        ctx.lineWidth = Math.max(0.5, burst.settings.width * (1 - progress) * 0.9);
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, 2 + burst.settings.radius * 0.6 * burst.settings.ease(progress), 0, Math.PI * 2);
        ctx.stroke();
        return true;
      };

      const removeBurst = (burst: Burst) => {
        burst.canvas.remove();
        const index = bursts.indexOf(burst);
        if (index >= 0) bursts.splice(index, 1);
      };

      const frame = (now: number) => {
        animationFrame = 0;
        for (const burst of [...bursts]) {
          const elapsed = now - burst.start;
          const ctx = burst.ctx;
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, burst.canvas.width, burst.canvas.height);
          ctx.setTransform(burst.ratio, 0, 0, burst.ratio, -burst.left * burst.ratio, -burst.top * burst.ratio);
          let alive = burst.settings.ring && drawRing(ctx, burst, elapsed);
          for (const spark of burst.sparks) alive = drawSpark(ctx, burst, spark, elapsed) || alive;
          ctx.globalAlpha = 1;
          if (!alive) removeBurst(burst);
        }
        if (bursts.length) animationFrame = requestAnimationFrame(frame);
      };

      const spawn = (clientX: number, clientY: number) => {
        const current = settings();
        if (current.disabled || reducedMotion) return;
        const rect = root.getBoundingClientRect();
        const colors = current.colors;
        const fullCircle = current.spread >= 359.5;
        const arc = (current.spread * Math.PI) / 180;
        const heading = ((current.direction - 90) * Math.PI) / 180;
        const step = fullCircle ? (Math.PI * 2) / current.count : current.count > 1 ? arc / (current.count - 1) : 0;
        const sparks: Spark[] = Array.from({ length: current.count }, (_, index) => {
          const base = fullCircle ? heading + step * index : current.count > 1 ? heading - arc / 2 + step * index : heading;
          const jitter = (Math.random() - 0.5) * current.randomness;
          const color = colors[index % colors.length];
          const [red, green, blue] = parseRgb(color);
          return {
            angle: base + jitter * (step || arc || 1) * 0.9,
            reach: 1 + (Math.random() - 0.5) * 0.7 * current.randomness,
            scale: 1 + (Math.random() - 0.5) * 0.8 * current.randomness,
            life: 1 + (Math.random() - 0.5) * 0.5 * current.randomness,
            spin: Math.random() - 0.5,
            color,
            clear: `rgba(${red}, ${green}, ${blue}, 0)`,
            glow: current.glow * (0.35 + 0.65 * ((0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255)),
          };
        });
        const reach = current.radius * (1 + 0.35 * current.randomness) + current.size + current.width * 6 + 6;
        const bottom = fallDistance(current, current.duration / 1000) + reach;
        const box = {
          left: Math.max(clientX - reach, 0),
          top: Math.max(clientY - reach, 0),
          right: Math.min(clientX + reach, window.innerWidth),
          bottom: Math.min(clientY + bottom, window.innerHeight),
        };
        if (box.right - box.left < 1 || box.bottom - box.top < 1) return;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil((box.right - box.left) * ratio);
        canvas.height = Math.ceil((box.bottom - box.top) * ratio);
        Object.assign(canvas.style, {
          position: "absolute",
          left: `${box.left - rect.left}px`,
          top: `${box.top - rect.top}px`,
          width: `${box.right - box.left}px`,
          height: `${box.bottom - box.top}px`,
          display: "block",
          pointerEvents: "none",
        });
        canvas.setAttribute("aria-hidden", "true");
        layerElement.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          canvas.remove();
          return;
        }
        bursts.push({ x: clientX, y: clientY, start: performance.now(), sparks, settings: current, canvas, ctx, ratio, left: box.left, top: box.top });
        while (bursts.length > MAX_BURSTS) removeBurst(bursts[0]);
        if (!animationFrame) animationFrame = requestAnimationFrame(frame);
      };

      const onPointerDown = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        lastMousePress = { time: performance.now(), x: event.clientX, y: event.clientY };
        spawn(event.clientX, event.clientY);
      };
      const onClick = (event: MouseEvent) => {
        if (event.detail === 0) {
          const target = event.target instanceof Element ? event.target : root;
          const targetBox = target.getBoundingClientRect();
          spawn(targetBox.left + targetBox.width / 2, targetBox.top + targetBox.height / 2);
          return;
        }
        const mouseAlreadyHandled = performance.now() - lastMousePress.time < 700 && Math.hypot(event.clientX - lastMousePress.x, event.clientY - lastMousePress.y) < 12;
        if (!mouseAlreadyHandled) spawn(event.clientX, event.clientY);
      };

      root.addEventListener("pointerdown", onPointerDown);
      root.addEventListener("click", onClick);
      engineRef.current = {
        spark: (x, y) => {
          const targetBox = root.getBoundingClientRect();
          spawn(targetBox.left + (x ?? targetBox.width / 2), targetBox.top + (y ?? targetBox.height / 2));
        },
      };

      return () => {
        cancelAnimationFrame(animationFrame);
        root.removeEventListener("pointerdown", onPointerDown);
        root.removeEventListener("click", onClick);
        for (const burst of [...bursts]) removeBurst(burst);
        engineRef.current = null;
      };
    }, [sparkColor, sparkSize, sparkRadius, sparkCount, sparkWidth, duration, easing, extraScale, shape, randomness, gravity, spread, direction, glow, ring, disabled]);

    useImperativeHandle(ref, () => ({ spark: (x, y) => engineRef.current?.spark(x, y) }), []);

    return (
      <div ref={rootRef} className={className} style={{ position: "relative", width: "100%", isolation: "isolate", ...style }} {...rest}>
        {children}
        <span ref={layerRef} aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: layer === "back" ? -1 : 1, overflow: "visible", pointerEvents: "none" }} />
      </div>
    );
  }
);

ClickSpark.displayName = "ClickSpark";

export default ClickSpark;
