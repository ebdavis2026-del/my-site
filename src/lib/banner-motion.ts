/**
 * Shared page-opener timing: cybersecurity 3D, sparkles, and heartbeat.
 * Snappy enough to intrigue, long enough to read as one beat of motion.
 */
export const BANNER_MOTION_MS = 4200;
export const BANNER_MOTION_EVENT = "banner-motion-start";

/** Bumps each time the opener starts so late listeners can still catch up. */
let bannerMotionGeneration = 0;

export function getBannerMotionGeneration() {
  return bannerMotionGeneration;
}

export function startBannerMotion() {
  if (typeof window === "undefined") return;
  bannerMotionGeneration += 1;
  window.dispatchEvent(new Event(BANNER_MOTION_EVENT));
}
