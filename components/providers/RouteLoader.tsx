"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { subscribeRouteLoader } from "@/lib/route-loader";
import { cn } from "@/lib/utils";

/**
 * Full-screen fade overlay that masks the navigation flick.
 *
 * Lifecycle:
 *   1. A link's onClick calls showRouteLoader() — we fade in (180 ms).
 *   2. The destination page mounts and runs its scroll-restoration logic.
 *   3. When the destination signals it's settled (hideRouteLoader()), we
 *      stay visible until at least MIN_HOLD_MS has elapsed since show,
 *      then fade out (220 ms).
 *
 * Why the minimum hold:
 *   On a fast machine the destination signals "ready" in <100 ms. Without
 *   the floor the overlay would flash for a single frame — perceived as
 *   a glitch, not as an intentional transition. 450 ms feels deliberate
 *   without being slow.
 *
 * Why always-mounted (no AnimatePresence):
 *   We previously wrapped the motion.div in AnimatePresence and ternary-
 *   rendered on `visible`. In React 19 + Next 16 dev (with Strict Mode
 *   double-invoke + HMR refresh), AnimatePresence intermittently failed
 *   to unmount the exit-animated wrapper. A full-screen `inset-0` div at
 *   opacity 0 then silently captured every click on the page underneath.
 *   The fix: always render the wrapper, drive opacity via animate, and
 *   toggle pointer-events from CSS based on visible — no AnimatePresence
 *   means no orphaned-after-exit elements.
 *
 * Why it lives at the layout root:
 *   The loader needs to survive the page-subtree swap during navigation.
 *   React unmounts page components on route change; the layout itself
 *   does not. If the loader lived in a chapter or page it would unmount
 *   mid-transition and the flick would re-appear.
 */
const MIN_HOLD_MS = 450;

export function RouteLoader() {
  const [visible, setVisible] = useState(false);
  const shownAtRef = useRef(0);
  const pendingHideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return subscribeRouteLoader((event) => {
      if (event === "show") {
        // Cancel any in-flight hide — show again resets the clock.
        if (pendingHideRef.current) {
          clearTimeout(pendingHideRef.current);
          pendingHideRef.current = null;
        }
        shownAtRef.current = Date.now();
        setVisible(true);
        return;
      }

      // event === "hide"
      if (pendingHideRef.current) return; // already pending — don't double up
      const elapsed = Date.now() - shownAtRef.current;
      const remaining = Math.max(0, MIN_HOLD_MS - elapsed);
      pendingHideRef.current = setTimeout(() => {
        setVisible(false);
        pendingHideRef.current = null;
      }, remaining);
    });
  }, []);

  return (
    <motion.div
      aria-hidden
      // z-index above SideDots (z-30) and LangToggle (z-30) but below any
      // hypothetical native browser overlay. Background matches the page
      // so the fade reads as "the page is catching its breath" rather
      // than "a black overlay just appeared".
      animate={{ opacity: visible ? 1 : 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-0 z-[120] flex items-center justify-center bg-bg",
        // Critical: pointer-events follows visible, NOT the opacity. A
        // wrapper at opacity 0 still captures clicks if pointer-events
        // is auto — exactly the bug this rewrite fixes.
        visible ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      {/* Three softly-pulsing dots — echoes the SideDots aesthetic
          so the loader feels like part of the same UI vocabulary. */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{
              duration: 1.1,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.18,
            }}
            className="block size-2 rounded-full bg-accent"
          />
        ))}
      </div>
    </motion.div>
  );
}
