"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/lib/lenis";
import { consumeHomeScroll } from "@/lib/scroll-memory";

/**
 * Restores scroll position when the user comes back from a /work deep dive.
 *
 * Why this is tricky:
 *   - Chapter 01's horizontal scrub creates a ScrollTrigger pin spacer
 *     AFTER mount. Before the spacer exists, every chapter's offsetTop is
 *     ~800 px lower than its final value.
 *   - Lenis boots on a separate useEffect, so lenis.scrollTo isn't
 *     reliable for the first few frames.
 *   - ScrollTrigger fires `refresh` MULTIPLE times during boot (initial
 *     create, pin spacer injection, font-swap reflow). The FIRST refresh
 *     is the stale one — applying then snaps the user to the wrong
 *     chapter. The LAST refresh has the final layout.
 *
 * Strategy:
 *   - The pre-paint <script> in layout.tsx hid <html> synchronously if
 *     sessionStorage has a saved target. No paint of the wrong position
 *     is ever visible.
 *   - Re-apply on EVERY refresh — the latest apply wins, so as the pin
 *     spacer settles in, the target naturally converges to the right
 *     scrollY.
 *   - Debounce the reveal: only un-hide <html> 180 ms after the LAST
 *     apply. If another refresh fires, the reveal is postponed.
 *   - Two timed fallbacks (250 ms + 600 ms) catch the no-pin path
 *     (below lg / reduced motion), and a 1.5 s hard-reveal upper bound
 *     guarantees the page is never stuck blank.
 */
export function ScrollRestoration() {
  useEffect(() => {
    const saved = consumeHomeScroll();
    const hash = window.location.hash;

    if (!saved && !hash) return;

    const html = document.documentElement;
    html.style.visibility = "hidden";

    let revealTimer: ReturnType<typeof setTimeout> | null = null;

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

    const scheduleReveal = () => {
      if (revealTimer !== null) clearTimeout(revealTimer);
      revealTimer = setTimeout(() => {
        requestAnimationFrame(() => {
          html.style.visibility = "";
        });
      }, 180);
    };

    const apply = () => {
      const target = resolveTarget();
      if (target === null) return; // chapter not in DOM yet — try next refresh
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { immediate: true });
      else window.scrollTo(0, target);
      scheduleReveal();
    };

    ScrollTrigger.addEventListener("refresh", apply);

    // Fallbacks for paths where ScrollTrigger never refreshes (below lg,
    // reduced motion, or if the chapter-1 pin failed to attach).
    const fallback1 = setTimeout(apply, 250);
    const fallback2 = setTimeout(apply, 600);

    // Hard upper bound — never block visibility for more than 1.5 s
    // even if every layer above failed.
    const hardReveal = setTimeout(() => {
      html.style.visibility = "";
    }, 1500);

    return () => {
      ScrollTrigger.removeEventListener("refresh", apply);
      clearTimeout(fallback1);
      clearTimeout(fallback2);
      clearTimeout(hardReveal);
      if (revealTimer !== null) clearTimeout(revealTimer);
      html.style.visibility = "";
    };
  }, []);

  return null;
}
