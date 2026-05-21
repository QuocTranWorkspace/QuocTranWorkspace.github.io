"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/lib/lenis";
import { consumeHomeScroll } from "@/lib/scroll-memory";

/**
 * Restores scroll position when the user comes back from a /work deep dive.
 *
 * The challenge in this app:
 *   - The pre-paint <script> in layout.tsx hides <html> the moment we
 *     see sessionStorage has a saved target. No paint of the wrong
 *     position is ever visible to the user.
 *   - Chapter 01's horizontal scrub creates a ScrollTrigger pin spacer
 *     AFTER mount. Before the spacer exists, every chapter's offsetTop
 *     is ~800 px lower than its final value. Applying scroll then would
 *     land the user at the wrong chapter.
 *   - ScrollTrigger fires `refresh` multiple times during boot (initial
 *     create, pin-spacer injection, font-swap reflow). A time-based
 *     debounce on the reveal misses late refreshes on slow machines and
 *     produces the visible "1-frame flick" the user reported.
 *
 * Strategy — layout-stability detection rather than time-based debounce:
 *   1. On every animation frame, observe documentElement.scrollHeight.
 *   2. If it changed since last frame, the layout is still shifting:
 *      re-apply the scroll target (using the current chapter offsetTop)
 *      and reset the stable-frame counter.
 *   3. If it stayed the same for N consecutive frames (~70 ms at 60 fps),
 *      we trust the layout is settled. Re-apply one final time, then
 *      reveal <html> on the next paint.
 *   4. Belt-and-braces upper bound (1.5 s) reveals the page unconditionally
 *      so the user is never stuck blank — same as before.
 *
 * Net effect: reveal happens at the moment the page stops shifting, not
 * a fixed delay. Slow machine? We wait longer. Fast machine? We reveal
 * almost instantly. No flick on either.
 */
const STABLE_FRAMES_REQUIRED = 4;
const HARD_REVEAL_MS = 1500;

export function ScrollRestoration() {
  useEffect(() => {
    const saved = consumeHomeScroll();
    const hash = window.location.hash;

    if (!saved && !hash) return;

    const html = document.documentElement;
    html.style.visibility = "hidden";

    let revealed = false;
    let stableFrames = 0;
    let lastHeight = -1;
    let rafId: number | null = null;

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

    const applyScroll = () => {
      const target = resolveTarget();
      if (target === null) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { immediate: true });
      else window.scrollTo(0, target);
    };

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      // Final apply with the now-stable layout, then reveal on next paint.
      applyScroll();
      requestAnimationFrame(() => {
        html.style.visibility = "";
      });
    };

    const tick = () => {
      if (revealed) return;
      const h = html.scrollHeight;
      if (h !== lastHeight) {
        // Layout shifted (or first frame) — re-apply target with current
        // offsetTops and reset the stability counter.
        applyScroll();
        lastHeight = h;
        stableFrames = 0;
      } else {
        stableFrames += 1;
      }
      if (stableFrames >= STABLE_FRAMES_REQUIRED) {
        reveal();
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    // ScrollTrigger.refresh sometimes happens without a scrollHeight delta
    // (no pin involved). Treat it as a layout signal too.
    const onRefresh = () => {
      applyScroll();
      stableFrames = 0;
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);

    rafId = requestAnimationFrame(tick);
    const hardReveal = setTimeout(reveal, HARD_REVEAL_MS);

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(hardReveal);
      html.style.visibility = "";
    };
  }, []);

  return null;
}
