"use client";

import Lenis from "lenis";

let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Bootstraps a singleton Lenis instance. Safe to call repeatedly; later calls
 * are no-ops. Honors prefers-reduced-motion: returns null and leaves native
 * scroll alone when the user has reduced-motion turned on.
 *
 * Caller (SmoothScrollProvider) is responsible for driving lenis.raf via
 * gsap.ticker so we don't fight a second internal RAF loop.
 */
export function bootLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (instance) return instance;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return null;

  instance = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1.5,
  });

  if (process.env.NODE_ENV !== "production") {
    (window as unknown as { __lenis?: Lenis }).__lenis = instance;
  }

  return instance;
}

export function destroyLenis() {
  instance?.destroy();
  instance = null;
}
