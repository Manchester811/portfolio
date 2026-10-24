"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type FadeContentEffect = "fade" | "focus" | "develop";
export type FadeContentStaggerFrom = "start" | "end" | "center" | "edges" | "random";

export interface FadeContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Optional scroll container. Defaults to the window, matching the Lenis setup. */
  container?: Element | string | null;
  effect?: FadeContentEffect;
  /** `true` uses a restrained 10px blur, or pass a pixel value. */
  blur?: boolean | number;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  stagger?: number;
  staggerFrom?: FadeContentStaggerFrom;
  trigger?: "scroll" | "mount";
  once?: boolean;
  exit?: boolean;
  scrub?: boolean | number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onStart?: () => void;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  className?: string;
  style?: CSSProperties;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const toSeconds = (value: number) => (value > 10 ? value / 1000 : value);
const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

/**
 * A small local adaptation of React Bits FadeContent. It keeps the useful
 * fade/focus/develop modes and ScrollTrigger lifecycle, while leaving the
 * heavier noise-mask effects out of this portfolio's restrained visual system.
 */
export const FadeContent = ({
  children,
  container,
  effect = "fade",
  blur = false,
  duration = 0.8,
  ease = "power2.out",
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  stagger = 0,
  staggerFrom = "start",
  trigger = "scroll",
  once = true,
  exit = false,
  scrub = false,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = "power2.in",
  onStart,
  onComplete,
  onDisappearanceComplete,
  className = "",
  style,
  ...props
}: FadeContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const scroller =
      typeof container === "string"
        ? document.querySelector(container)
        : container ?? undefined;
    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const targets =
      stagger > 0 && element.children.length > 0
        ? (Array.from(element.children) as HTMLElement[])
        : [element];
    const durationSeconds = Math.max(toSeconds(duration) || 0, 0.01);
    const delaySeconds = Math.max(toSeconds(delay) || 0, 0);
    const staggerSeconds = Math.max(toSeconds(stagger) || 0, 0);
    const blurAmount = blur === true ? 10 : Math.max(Number(blur) || 0, 0);
    const startOpacity = clamp01(Number(initialOpacity) || 0);
    const staggerVars: gsap.TweenVars =
      staggerSeconds > 0
        ? { stagger: { each: staggerSeconds, from: staggerFrom } }
        : {};

    const context = gsap.context(() => {
      gsap.set(element, { visibility: "visible" });

      if (reduceMotion) {
        gsap.set(targets, { autoAlpha: 1, clearProps: "filter,transform" });
        onComplete?.();
        return;
      }

      const from: gsap.TweenVars = { autoAlpha: startOpacity };
      const to: gsap.TweenVars = { autoAlpha: 1 };

      if (effect === "focus") {
        from.filter = `blur(${Math.max(blurAmount, 8)}px)`;
        from.scale = 0.985;
        to.filter = "blur(0px)";
        to.scale = 1;
      } else if (effect === "develop") {
        from.filter = `grayscale(1) contrast(0.7) brightness(1.15) blur(${blurAmount}px)`;
        to.filter = "grayscale(0) contrast(1) brightness(1) blur(0px)";
      } else if (blurAmount > 0) {
        from.filter = `blur(${blurAmount}px)`;
        to.filter = "blur(0px)";
      }

      const timeline = gsap.timeline({
        paused: true,
        onStart,
        onComplete: () => {
          onComplete?.();

          if (disappearAfter <= 0 || exit || scrub) return;

          gsap.delayedCall(toSeconds(disappearAfter), () => {
            gsap.to(targets, {
              autoAlpha: startOpacity,
              duration: Math.max(toSeconds(disappearDuration) || 0, 0.01),
              ease: disappearEase,
              ...staggerVars,
              onComplete: onDisappearanceComplete,
            });
          });
        },
      });

      timeline.fromTo(
        targets,
        from,
        {
          ...to,
          duration: durationSeconds,
          ease,
          delay: delaySeconds,
          ...staggerVars,
        },
        0
      );

      if (trigger === "mount") {
        timeline.play();
        return;
      }

      const isScrubbed = scrub !== false;
      const replay = !once || exit;
      const start = `top ${Math.round((1 - clamp01(threshold)) * 100)}%`;
      const end = exit ? `bottom ${Math.round(clamp01(threshold) * 100)}%` : undefined;

      ScrollTrigger.create({
        trigger: element,
        scroller,
        animation: isScrubbed ? timeline : undefined,
        start,
        end,
        scrub: isScrubbed ? (scrub === true ? true : Math.max(Number(scrub) || 0, 0)) : false,
        once: !replay && !isScrubbed,
        invalidateOnRefresh: true,
        onEnter: isScrubbed ? undefined : () => timeline.play(),
        onEnterBack: isScrubbed ? undefined : () => timeline.play(),
        onLeave: exit && !isScrubbed ? () => timeline.reverse() : undefined,
        onLeaveBack: replay && !isScrubbed ? () => timeline.reverse() : undefined,
      });

      ScrollTrigger.refresh();
    }, element);

    return () => {
      context.revert();
      ScrollTrigger.refresh();
    };
  }, [
    container,
    effect,
    blur,
    duration,
    ease,
    delay,
    threshold,
    initialOpacity,
    stagger,
    staggerFrom,
    trigger,
    once,
    exit,
    scrub,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onStart,
    onComplete,
    onDisappearanceComplete,
  ]);

  return (
    <div ref={ref} className={className} style={style} data-fade-content="true" {...props}>
      {children}
    </div>
  );
};

export default FadeContent;
