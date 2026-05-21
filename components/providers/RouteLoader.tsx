"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { subscribeRouteLoader } from "@/lib/route-loader";

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
 * Why it's outside <ToastProvider>:
 *   The loader needs to live at the layout root so it persists across
 *   route changes. React unmounts the page subtree on nav; if the loader
 *   lived in a chapter or page component it would unmount mid-transition.
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
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="route-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
          // z-index above SideDots (z-40) and any chapter content. bg-bg
          // matches the page background so the fade reads as "the page is
          // catching its breath" rather than "a black overlay just appeared".
          className="fixed inset-0 z-[120] flex items-center justify-center bg-bg"
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
      ) : null}
    </AnimatePresence>
  );
}
