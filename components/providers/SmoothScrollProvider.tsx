"use client";

import { useEffect } from "react";
import { bootLenis, destroyLenis, getLenis } from "@/lib/lenis";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Wires Lenis (smooth scroll) and GSAP ScrollTrigger together. Lenis drives
 * the scroll loop; ScrollTrigger reads from it via the `scroll` callback.
 * Mount this once at the root of the page.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const gsap = ensureGsap();
    const lenis = bootLenis();

    if (lenis) {
      // Bridge Lenis -> ScrollTrigger so pinned timelines stay in lockstep.
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        getLenis()?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}
