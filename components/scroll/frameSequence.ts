export const TOTAL_FRAMES = 240;
export const FRAME_WIDTH = 1600;
export const FRAME_HEIGHT = 1080;
export const FRAME_ASPECT = FRAME_WIDTH / FRAME_HEIGHT;

/**
 * Frames are served as WebP.
 *
 * The 240 source frames were 1600x1080 PNGs totalling ~210 MB. Re-encoded to
 * WebP (q72) they total ~14.5 MB — a 93% reduction — with no visible
 * difference at playback size. These are loaded through a raw `new Image()`
 * from /public, so the Next image optimizer never touched them; the format had
 * to be fixed at the asset level.
 *
 * TODO(you): the original PNGs are still in /public/frames and are now unused.
 * Delete them once you are happy with the WebP playback (that reclaims ~210 MB
 * of repo/deploy weight). Kept for now so this is trivially reversible.
 */
export const FRAME_EXTENSION = "webp";

export const framePath = (index: number): string =>
  `/frames/frame_${String(index).padStart(6, "0")}.${FRAME_EXTENSION}`;

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