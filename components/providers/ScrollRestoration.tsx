"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/lib/lenis";
import { consumeHomeScroll } from "@/lib/scroll-memory";

/**
 * Restores scroll position when the user comes back from a /work deep dive.
 *
 * Why this is tricky:
 *   1. Chapter 01's horizontal scrub creates a ScrollTrigger pin spacer
 *      AFTER mount, which changes the page's total height and every
 *      subsequent chapter's offsetTop.
 *   2. Lenis boots on a separate useEffect, so lenis.scrollTo isn't
 *      reliable for the first few frames.
 *
 * Strategy:
 *   - Hide <html> immediately if we have something to restore. No
 *     "wrong chapter then correct chapter" flicker is ever visible.
 *   - Save target as { chapter, offset within } rather than raw scrollY,
 *     so it tracks layout shifts caused by the pin spacer.
 *   - Listen for ScrollTrigger's `refresh` event — fires once the pin
 *     spacer is created and offsetTop is final.
 *   - Apply on first refresh, then reveal next frame.
 *   - Safety nets: a 500 ms force-apply (in case ScrollTrigger never
 *     refreshes) and a 1500 ms hard-reveal (never block the page for
 *     more than 1.5 s).
 */
export function ScrollRestoration() {
  useEffect(() => {
    const saved = consumeHomeScroll();
    const hash = window.location.hash;

    if (!saved && !hash) return;

    const html = document.documentElement;
    html.style.visibility = "hidden";

    let restored = false;

    const resolveTarget = (): number | null => {
      if (saved) {
        const el = document.getElementById(saved.chapter);
        if (!el) return null;
        return el.offsetTop + saved.offset;
      }
      if (hash) {
        const el = document.getElementById(hash.slice(1));
        if (!el) return null;
        return el.offsetTop;
      }
      return null;
    };

    const apply = () => {
      if (restored) return;
      const target = resolveTarget();
      if (target === null) return; // try again on the next tick
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { immediate: true });
      else window.scrollTo(0, target);
      restored = true;
      requestAnimationFrame(() => {
        html.style.visibility = "";
      });
    };

    ScrollTrigger.addEventListener("refresh", apply);

    const fallbackApply = setTimeout(apply, 500);
    const hardReveal = setTimeout(() => {
      html.style.visibility = "";
    }, 1500);

    return () => {
      ScrollTrigger.removeEventListener("refresh", apply);
      clearTimeout(fallbackApply);
      clearTimeout(hardReveal);
      html.style.visibility = "";
    };
  }, []);

  return null;
}
