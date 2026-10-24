import type { Transition, Variants } from "framer-motion";

/** Shared easing curve for the portfolio's reveal motion. */
export const ease = [0.16, 1, 0.3, 1] as const;

export interface RevealOptions {
  distance?: number;
  duration?: number;
  delay?: number;
}

export interface StaggerOptions {
  delayChildren?: number;
  staggerChildren?: number;
}

/**
 * Builds a reduced-motion-safe transition. Reduced motion removes both the
 * duration and delay while keeping the same shared easing for normal motion.
 */
export const reducedMotionTransition = (
  shouldReduceMotion: boolean,
  duration = 0.8,
  delay = 0
): Transition => ({
  duration: shouldReduceMotion ? 0 : duration,
  delay: shouldReduceMotion ? 0 : delay,
  ease,
});

/**
 * Creates a simple opacity-and-vertical reveal variant. Pass the value from
 * Framer Motion's useReducedMotion hook to avoid an off-screen movement when
 * the user has requested less motion.
 */
export const reveal = (
  shouldReduceMotion = false,
  { distance = 24, duration = 0.8, delay = 0 }: RevealOptions = {}
): Variants => ({
  hidden: {
    opacity: shouldReduceMotion ? 1 : 0,
    y: shouldReduceMotion ? 0 : distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: reducedMotionTransition(shouldReduceMotion, duration, delay),
  },
});

/** Creates a container variant with reduced-motion-safe child staggering. */
export const stagger = (
  shouldReduceMotion = false,
  {
    delayChildren = 0.08,
    staggerChildren = 0.1,
  }: StaggerOptions = {}
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: shouldReduceMotion ? 0 : delayChildren,
      staggerChildren: shouldReduceMotion ? 0 : staggerChildren,
    },
  },
});

/**
 * Makes an existing hidden/visible variant static for reduced-motion users.
 * This is useful when a component needs custom variant properties but should
 * still render immediately when motion is reduced.
 */
export const reducedMotionSafe = (
  variants: Variants,
  shouldReduceMotion: boolean
): Variants => {
  if (!shouldReduceMotion || variants.visible === undefined) return variants;

  return {
    ...variants,
    hidden: variants.visible,
  };
};
