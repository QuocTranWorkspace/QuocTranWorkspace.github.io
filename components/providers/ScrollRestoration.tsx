"use client";

import { useEffect } from "react";
import { getLenis } from "@/lib/lenis";
import { consumeHomeScroll } from "@/lib/scroll-memory";

/**
 * Restores scroll position on the home page when the user comes back from a
 * /work deep dive.
 *
 * Priority:
 *   1. A saved exact position (set on tile click) — restore precisely.
 *   2. A URL hash (#chapter-N) — scroll to that chapter (covers direct
 *      visitors who used the "Back to portfolio" link).
 *   3. Nothing — leave the page at the top so the cinematic intro plays.
 *
 * GSAP ScrollTrigger pins (chapter 1) inject a spacer that changes total
 * page height after first paint, so we re-apply the target a couple of
 * times across rAF + a short timeout until layout settles.
 */
export function ScrollRestoration() {
  useEffect(() => {
    const savedY = consumeHomeScroll();
    const hash = window.location.hash;

    if (savedY === null && !hash) return;

    let cancelled = false;

    const apply = () => {
      if (cancelled) return;
      const lenis = getLenis();

      if (savedY !== null) {
        if (lenis) lenis.scrollTo(savedY, { immediate: true });
        else window.scrollTo(0, savedY);
        return;
      }

      // Hash path — resolve the element and jump to its top.
      const id = hash.replace(/^#/, "");
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { immediate: true });
      else el.scrollIntoView();
    };

    // rAF×2 lets the first layout + ScrollTrigger.create pass complete;
    // the timeouts re-apply after the pin spacer + fonts settle.
    const raf1 = requestAnimationFrame(() =>
      requestAnimationFrame(apply),
    );
    const t1 = setTimeout(apply, 250);
    const t2 = setTimeout(apply, 600);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return null;
}
