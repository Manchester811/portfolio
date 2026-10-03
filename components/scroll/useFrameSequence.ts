"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform, MotionValue } from "framer-motion";
import { createFrameCache } from "./frameCache";
import {
  DESKTOP_BUDGET,
  FRAME_ASPECT,
  MOBILE_BUDGET,
  clampFrameIndex,
  frameFromProgress,
  isCoarsePointer,
  type FrameBudget,
} from "./frameSequence";

const DPR_CAP_DESKTOP = 2;
const DPR_CAP_MOBILE = 1.5;
const INITIAL_PRIME_MOBILE = 4;
const INITIAL_PRIME_DESKTOP = 10;
const STATIC_FRAME_KEY = -2;

/**
 * Velocity threshold (progress units per ms) for "fast scroll" detection.
 * At 60fps, 0.001 progress/ms ≈ 0.06 progress/frame ≈ 14 frames per frame.
 */
const FAST_SCROLL_THRESHOLD = 0.0008;

/**
 * How many extra frames to look ahead when scrolling fast.
 */
const FAST_SCROLL_LOOKAHEAD_BOOST = 6;

/**
 * Minimum time between velocity calculations (ms).
 */
const VELOCITY_SAMPLE_INTERVAL = 16;

/**
 * Focal point for the cover crop, as a fraction of the surplus on each axis.
 * Measured from the frames themselves: column brightness peaks at 58-63% of the
 * frame width (not 50%), and the head sits within the top ~8% of the height.
 */
const FOCUS_X = 0.56;
const FOCUS_Y = 0.26;

interface UseFrameSequenceOptions {
  /**
   * The element whose own travel through the viewport drives the sequence.
   * The host owns the section height and the sticky inner element, so this
   * hook stays purely a renderer and never dictates layout.
   */
  targetRef: React.RefObject<HTMLElement | null>;
  /** offsets describe when progress 0 and 1 are reached on the target */
  offset?: NonNullable<Parameters<typeof useScroll>[0]>["offset"];
}

export interface FrameSequence {
  /** attach to the <canvas> element */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** attach to the canvas' sized parent; drives DPR-correct backing store */
  wrapRef: React.RefObject<HTMLDivElement | null>;
  /** 0 -> 1, safe to read in render for chrome that mirrors the sequence */
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  /** subtle zoom factor (1 -> 1.08) for cinematic push-in */
  zoom: MotionValue<number>;
}

/**
 * Scroll-driven frame renderer.
 *
 * The scroll handler only writes a ref and schedules a single animation frame,
 * so React never re-renders while scrolling; the actual paint is a canvas
 * drawImage. Frames stream through a bounded window around the current index
 * (see frameCache) because a full 240-frame residency would cost gigabytes.
 */
export const useFrameSequence = ({
  targetRef,
  offset = ["start start", "end start"],
}: UseFrameSequenceOptions): FrameSequence => {
  const shouldReduceMotion = useReducedMotion();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const staticImgRef = useRef<HTMLImageElement | null>(null);

  const lastDrawnRef = useRef(-1);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const nearViewportRef = useRef(false);

  // Scroll velocity tracking for predictive loading
  const lastProgressRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const scrollDirectionRef = useRef<"forward" | "backward" | "none">("none");

  // coarse pointer means a leaner decode budget
  const [coarse] = useState(() =>
    typeof window === "undefined" ? false : isCoarsePointer()
  );
  const baseBudget = coarse ? MOBILE_BUDGET : DESKTOP_BUDGET;
  const dprCap = coarse ? DPR_CAP_MOBILE : DPR_CAP_DESKTOP;

  // Dynamic budget that adjusts based on scroll velocity
  const [budget, setBudget] = useState<FrameBudget>(baseBudget);

  const cache = useMemo(
    () => createFrameCache(budget, !shouldReduceMotion),
    [budget, shouldReduceMotion]
  );

  // progress is scoped to the host element's own travel, never the document
  const { scrollYProgress } = useScroll({ target: targetRef, offset });

  // Gentle push-in across the pinned range: 1.0 -> 1.08
  // Computed here and applied in draw() for sharpness (avoids CSS transform blur)
  const zoom = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  /* ------------------------------------------------------------------ draw */

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let img: HTMLImageElement | undefined;
    let key: number;

    if (shouldReduceMotion) {
      img = staticImgRef.current ?? undefined;
      key = STATIC_FRAME_KEY;
    } else {
      const target = clampFrameIndex(frameFromProgress(progressRef.current));
      const best = cache.nearestLoaded(target);
      // nothing decoded yet: stay transparent rather than flashing
      if (!best) return;
      img = best.img;
      key = best.index;
    }

    if (!img || key === lastDrawnRef.current) return;

    // Apply subtle cinematic zoom (1.0 -> 1.08) directly in draw for sharpness
    const currentZoom = zoom.get();
    const baseScale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const scale = baseScale * currentZoom;
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      (canvas.width - drawWidth) / 2,
      (canvas.height - drawHeight) / 2,
      drawWidth,
      drawHeight
    );
    lastDrawnRef.current = key;
  }, [cache, shouldReduceMotion, zoom]);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      draw();
    });
  }, [draw]);

  /* --------------------------------------------------- canvas + DPR sizing */

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    /**
     * The wrapper is an "available region" chosen by the host layout; the
     * canvas is then sized to *cover* that region with the 1600x1080 frame.
     *
     * Sizing in CSS instead (aspect-ratio + max-h/w) lets the constraints fight
     * and leaves the box a percent or two off the frame's ratio. The frames are
     * opaque #000 against a #050505 page, so any uncovered strip would read as
     * a visible seam. Cover-fitting here guarantees the frame always fills its
     * region edge to edge; the surplus is clipped by the host's overflow and
     * the subject stays centred, so a centred head turn is never lost.
     */
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // cover: the smaller of the two axis fits is discarded
      const scale = Math.max(rect.width / FRAME_ASPECT, rect.height);
      const cssWidth = FRAME_ASPECT * scale;
      const cssHeight = scale;

      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const nextWidth = Math.max(1, Math.round(cssWidth * dpr));
      const nextHeight = Math.max(1, Math.round(cssHeight * dpr));

      /*
       * Bias the crop toward the subject.
       *
       * A centred cover crop is wrong for this footage: the frames are 1600x1080
       * (1.48:1) and the subject sits right of centre with the head near the top
       * edge, so a centred crop on a 16:9 viewport cuts ~90px off the top and
       * clips the head. Nudging the focal point up keeps the head in frame and
       * spends the surplus crop on the lower body, which the copy sits over
       * anyway.
       *
       * Applied as a margin rather than a transform so it does not fight the
       * scroll-driven `transform: scale()` the host sets on the same element.
       */
      const surplusY = cssHeight - rect.height;
      const surplusX = cssWidth - rect.width;
      canvas.style.marginTop = `${(surplusY * (FOCUS_Y - 0.5)).toFixed(2)}px`;
      canvas.style.marginLeft = `${(surplusX * (FOCUS_X - 0.5)).toFixed(2)}px`;

      if (canvas.width === nextWidth && canvas.height === nextHeight) return;

      canvas.style.width = `${cssWidth.toFixed(2)}px`;
      canvas.style.height = `${cssHeight.toFixed(2)}px`;
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      lastDrawnRef.current = -1; // force a repaint at the new resolution
      scheduleDraw();
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    window.addEventListener("orientationchange", resize);

    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", resize);
    };
  }, [dprCap, scheduleDraw]);

  /* ------------------------------------------- progressive frame streaming */

  // repaint the instant a frame finishes decoding, so the "nearest loaded"
  // fallback is replaced seamlessly instead of lingering
  useEffect(() => cache.onFrameReady(scheduleDraw), [cache, scheduleDraw]);

  // hold off on network entirely until the host approaches the viewport, so
  // the 210 MB payload never competes with first paint
  useEffect(() => {
    const target = targetRef.current;
    if (!target || shouldReduceMotion) return;

    let primed = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        nearViewportRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) return;

        // first approach: queue the opening frames so playback can start at once
        if (!primed) {
          primed = true;
          cache.prime(0, coarse ? INITIAL_PRIME_MOBILE : INITIAL_PRIME_DESKTOP);
        }

        cache.focus(frameFromProgress(progressRef.current));
        scheduleDraw();
      },
      { rootMargin: "100% 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [cache, coarse, shouldReduceMotion, scheduleDraw, targetRef]);

  /* ------------------------------------------------- reduced motion static */

  useEffect(() => {
    if (!shouldReduceMotion) {
      staticImgRef.current = null;
      return;
    }

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      staticImgRef.current = img;
      lastDrawnRef.current = -1;
      scheduleDraw();
    };
    img.src = "/frames/frame_000000.png";

    return () => {
      img.onload = null;
      staticImgRef.current = null;
    };
  }, [shouldReduceMotion, scheduleDraw]);

  /* ------------------------------------------------------ scroll -> frame */

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const now = performance.now();
    const prevProgress = lastProgressRef.current;
    const prevTime = lastTimeRef.current;

    // Calculate scroll velocity (progress units per ms)
    if (prevTime > 0 && now - prevTime >= VELOCITY_SAMPLE_INTERVAL) {
      const deltaProgress = progress - prevProgress;
      const deltaTime = now - prevTime;
      const velocity = deltaProgress / deltaTime;

      velocityRef.current = velocity;

      // Determine scroll direction
      if (velocity > FAST_SCROLL_THRESHOLD) {
        scrollDirectionRef.current = "forward";
      } else if (velocity < -FAST_SCROLL_THRESHOLD) {
        scrollDirectionRef.current = "backward";
      } else {
        scrollDirectionRef.current = "none";
      }

      // Adjust cache budget based on scroll velocity
      const isFastScroll = Math.abs(velocity) > FAST_SCROLL_THRESHOLD;
      if (isFastScroll) {
        setBudget((prev) => {
          // Boost lookAhead in the scroll direction
          const boost = FAST_SCROLL_LOOKAHEAD_BOOST;
          const newLookAhead = Math.min(prev.lookAhead + boost, 20);
          const newLookBehind = Math.min(prev.lookBehind + boost, 10);
          const newMaxCached = Math.min(prev.maxCached + boost, 24);

          if (
            newLookAhead !== prev.lookAhead ||
            newLookBehind !== prev.lookBehind ||
            newMaxCached !== prev.maxCached
          ) {
            return {
              ...prev,
              lookAhead: newLookAhead,
              lookBehind: newLookBehind,
              maxCached: newMaxCached,
            };
          }
          return prev;
        });
      } else if (Math.abs(velocity) < FAST_SCROLL_THRESHOLD * 0.3) {
        // Slow scroll or stopped - restore base budget
        setBudget(baseBudget);
      }

      lastProgressRef.current = progress;
      lastTimeRef.current = now;
    }

    progressRef.current = progress;
    if (shouldReduceMotion || !nearViewportRef.current) return;

    cache.focus(frameFromProgress(progress));
    scheduleDraw();
  });

  /* ---------------------------------------------------------- lifecycle */

  useEffect(() => {
    if (shouldReduceMotion) return;

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      cache.dispose();
    };
  }, [cache, shouldReduceMotion]);

  return { canvasRef, wrapRef, progress: scrollYProgress, zoom };
};

export default useFrameSequence;
