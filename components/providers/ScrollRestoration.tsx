"use client";

import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/lib/lenis";
import { hideRouteLoader } from "@/lib/route-loader";
import { consumeHomeScroll } from "@/lib/scroll-memory";

/**
 * Restores scroll position when the user comes back from a /work deep dive.
 *
 * The challenge in this app:
 *   - Chapter 01's horizontal scrub creates a ScrollTrigger pin spacer
 *     AFTER mount. Before the spacer exists, every chapter's offsetTop
 *     is ~800 px lower than its final value. Applying scroll then would
 *     land the user at the wrong chapter.
 *   - ScrollTrigger fires `refresh` multiple times during boot (initial
 *     create, pin-spacer injection, font-swap reflow). A time-based
 *     debounce on the reveal misses late refreshes on slow machines and
 *     produces the visible "1-frame flick" the user reported.
 *
 * Two masking strategies, picked automatically:
 *   - INITIAL load with saved scroll: the pre-paint <script> in layout.tsx
 *     hides <html> synchronously before any paint. The page is invisible
 *     until we reveal it at the end of stability polling.
 *   - CLIENT-side nav from a back link: a Link onClick triggered the
 *     <RouteLoader> overlay (rendered above everything). We DON'T touch
 *     html.visibility — that would hide the loader too — and instead
 *     signal the loader to fade out at the end of stability polling.
 *
 * Stability detection — layout-stability rather than time-based debounce:
 *   1. On every animation frame, observe documentElement.scrollHeight.
 *   2. If it changed since last frame, the layout is still shifting:
 *      re-apply the scroll target (using the current chapter offsetTop)
 *      and reset the stable-frame counter.
 *   3. If it stayed the same for N consecutive frames (~70 ms at 60 fps),
 *      we trust the layout is settled. Re-apply one final time, then
 *      reveal on the next paint.
 *   4. Belt-and-braces upper bound (1.5 s) reveals unconditionally so the
 *      user is never stuck behind the loader/blank page.
 *
 * Net effect: reveal happens at the moment the page stops shifting, not
 * a fixed delay. Slow machine? We wait longer. Fast machine? We reveal
 * almost instantly. No flick on either.
 */
const STABLE_FRAMES_REQUIRED = 4;
const HARD_REVEAL_MS = 1500;

export function ScrollRestoration() {
  // useLayoutEffect (not useEffect) so the hide runs BEFORE the browser
  // paints the new home tree on a client-side navigation. The pre-paint
  // <script> only runs on initial HTML parse, not on Next.js Link
  // navigation, so this is the belt to the script's braces.
  useLayoutEffect(() => {
    const saved = consumeHomeScroll();
    const hash = window.location.hash;

    if (!saved && !hash) {
      // No restoration to do. If the route loader is showing (e.g. user
      // clicked a back link that didn't have saved-scroll), hide it now
      // — there's nothing to wait for, the page is already at the right
      // place. No-op when the loader isn't showing.
      hideRouteLoader();
      return;
    }

    const html = document.documentElement;

    // Decide which masking strategy to use:
    //   - INITIAL load with saved scroll: the pre-paint inline <script> in
    //     layout.tsx has already set html.style.visibility = "hidden". The
    //     <RouteLoader> can't help here — it's a React component and the
    //     page hasn't finished hydrating yet — so we keep managing
    //     visibility ourselves and reveal at the end.
    //   - CLIENT-side nav (Back-link click): visibility is unset. The
    //     <RouteLoader> overlay is already painted on top and will fade
    //     out when we signal hide. Don't touch html.visibility — toggling
    //     it would hide the loader along with everything else, creating
    //     the exact flick we're trying to eliminate.
    const usingHtmlVisibility = html.style.visibility === "hidden";

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
        if (usingHtmlVisibility) {
          // Initial load: un-hide the pre-paint-hidden html, then signal
          // the loader to fade (it's almost certainly not showing on a
          // fresh hit, but this is harmless if it is).
          html.style.visibility = "";
        }
        // Client-side nav: the loader is the only thing masking — fade it.
        // On initial load this is a no-op when the loader isn't showing.
        hideRouteLoader();
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
