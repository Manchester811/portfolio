"use client";

import {
  TOTAL_FRAMES,
  clampFrameIndex,
  framePath,
  type FrameBudget,
} from "./frameSequence";

export type LoadedListener = (index: number) => void;

export interface FrameCache {
  get(index: number): HTMLImageElement | undefined;
  nearestLoaded(index: number): { index: number; img: HTMLImageElement } | null;
  /** prioritise + stream frames around `index` */
  focus(index: number): void;
  /** queue the first frames up front so playback can start immediately */
  prime(from: number, count: number): void;
  onFrameReady(listener: LoadedListener): () => void;
  dispose(): void;
}

/**
 * Windowed frame cache.
 *
 * Each 1600x1080 frame decodes to roughly 6.9 MB, so holding all 240 resident
 * would cost well over a gigabyte. Frames are streamed through a small window
 * around the current index and evicted by distance, which holds peak decoded
 * memory in the tens of megabytes. Frames are requested nearest-first, so the
 * frame the viewer is actually looking at always wins the queue.
 */
export function createFrameCache(budget: FrameBudget, enabled = true): FrameCache {
  const cache = new Map<number, HTMLImageElement>();
  const pending = new Set<number>();
  const failed = new Set<number>();
  const listeners = new Set<LoadedListener>();
  const desired: number[] = [];

  let inFlight = 0;
  let disposed = false;

  /**
   * Re-arm a disposed cache.
   *
   * The cache is memoised by the consumer, so React's StrictMode
   * mount -> unmount -> mount cycle (and any genuine remount) reuses the same
   * instance. Without this the instance would stay permanently disabled after
   * the first cleanup and the sequence would never render again.
   */
  const arm = () => {
    if (!disposed) return;
    disposed = false;
    inFlight = 0;
  };

  const notify = (index: number) => {
    listeners.forEach((listener) => listener(index));
  };

  const pump = () => {
    if (disposed || !enabled) return;

    while (inFlight < budget.maxConcurrent && desired.length > 0) {
      const index = desired.shift();
      if (index === undefined) break;
      if (cache.has(index) || pending.has(index) || failed.has(index)) continue;

      pending.add(index);
      inFlight += 1;

      const img = new Image();
      img.decoding = "async";

      const settle = () => {
        pending.delete(index);
        inFlight -= 1;
        if (!disposed) pump();
      };

      img.onload = () => {
        settle();
        cache.set(index, img);
        const decode = img.decode?.();
        if (decode && typeof decode.then === "function") {
          decode.then(
            () => !disposed && notify(index),
            () => !disposed && notify(index)
          );
        } else {
          notify(index);
        }
      };

      img.onerror = () => {
        // never retry a broken frame; it would spin the queue forever
        failed.add(index);
        settle();
      };

      img.src = framePath(index);
    }
  };

  const evict = (center: number) => {
    if (cache.size <= budget.maxCached) return;
    const byDistance = [...cache.entries()].sort(
      (a, b) => Math.abs(b[0] - center) - Math.abs(a[0] - center)
    );
    while (cache.size > budget.maxCached && byDistance.length > 0) {
      const [index] = byDistance.shift()!;
      cache.delete(index);
    }
  };

  const queue = (center: number) => {
    const target = clampFrameIndex(center);
    const next: number[] = [];

    for (let offset = 0; offset <= budget.lookAhead; offset++) {
      const ahead = target + offset;
      if (ahead <= TOTAL_FRAMES - 1) next.push(ahead);
    }
    for (let offset = 1; offset <= budget.lookBehind; offset++) {
      const behind = target - offset;
      if (behind >= 0) next.push(behind);
    }

    desired.length = 0;
    for (const index of next) {
      if (!cache.has(index) && !pending.has(index) && !failed.has(index)) {
        desired.push(index);
      }
    }

    pump();
    evict(target);
  };

  return {
    get(index) {
      return cache.get(index);
    },

    nearestLoaded(index) {
      const exact = cache.get(index);
      if (exact) return { index, img: exact };
      for (let d = 1; d < TOTAL_FRAMES; d++) {
        const after = cache.get(index + d);
        if (after) return { index: index + d, img: after };
        const before = cache.get(index - d);
        if (before) return { index: index - d, img: before };
      }
      return null;
    },

    focus(index) {
      arm();
      queue(index);
    },

    prime(from, count) {
      arm();
      for (let offset = 0; offset < count; offset++) {
        const index = from + offset;
        if (index > TOTAL_FRAMES - 1) break;
        if (cache.has(index) || pending.has(index) || failed.has(index)) continue;
        desired.push(index);
      }
      pump();
    },

    onFrameReady(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    dispose() {
      disposed = true;
      desired.length = 0;
      listeners.clear();
      pending.clear();
      failed.clear();
      cache.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      });
      cache.clear();
      inFlight = 0;
    },
  };
}