export const TOTAL_FRAMES = 240;
export const FRAME_WIDTH = 1600;
export const FRAME_HEIGHT = 1080;
export const FRAME_ASPECT = FRAME_WIDTH / FRAME_HEIGHT;

export const framePath = (index: number): string =>
  `/frames/frame_${String(index).padStart(6, "0")}.png`;

export const clampFrameIndex = (value: number): number =>
  value < 0 ? 0 : value > TOTAL_FRAMES - 1 ? TOTAL_FRAMES - 1 : value;

export const frameFromProgress = (progress: number): number =>
  clampFrameIndex(Math.round(progress * (TOTAL_FRAMES - 1)));

export interface FrameBudget {
  /** frames kept ahead of the current index */
  lookAhead: number;
  /** frames kept behind the current index, so reverse scrolling stays instant */
  lookBehind: number;
  /** hard ceiling on simultaneously cached (decoded) frames */
  maxCached: number;
  /** how many network requests may be in flight at once */
  maxConcurrent: number;
}

export const DESKTOP_BUDGET: FrameBudget = {
  lookAhead: 8,
  lookBehind: 3,
  maxCached: 12,
  maxConcurrent: 4,
};

export const MOBILE_BUDGET: FrameBudget = {
  lookAhead: 5,
  lookBehind: 2,
  maxCached: 8,
  maxConcurrent: 2,
};

export const isCoarsePointer = (): boolean =>
  typeof window !== "undefined" &&
  (window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches);