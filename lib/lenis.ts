"use client";

import Lenis from "lenis";

let instance: Lenis | null = null;
let rafId: number | null = null;

export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Bootstraps a singleton Lenis instance. Safe to call repeatedly; later calls
 * are no-ops. Honors prefers-reduced-motion: returns null and leaves native
 * scroll alone when the user has reduced-motion turned on.
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

  const raf = (time: number) => {
    instance?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return instance;
}

export function destroyLenis() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  instance?.destroy();
  instance = null;
}
