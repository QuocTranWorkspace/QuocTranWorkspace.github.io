"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LOCALES, type Locale } from "@/lib/i18n";
import { hideRouteLoader, showRouteLoader } from "@/lib/route-loader";
import { applyScrollAnchor, readScrollAnchor } from "@/lib/scroll-memory";
import { cn } from "@/lib/utils";

// Re-anchor for at most this many frames before giving up. At 60fps that's
// ~0.65s — comfortably longer than any locale reflow, and the loader's
// minimum hold masks the whole window anyway.
const MAX_SETTLE_FRAMES = 40;
// Document height must hold steady this many consecutive frames before we
// trust the reflow is done and reveal.
const STABLE_FRAMES = 4;

const LABELS: Record<Locale, string> = {
  en: "EN",
  vi: "VI",
};

const ARIA: Record<Locale, string> = {
  en: "Switch to English",
  vi: "Chuyển sang Tiếng Việt",
};

/**
 * Two-cell pill toggle with a sliding cobalt indicator powered by Framer
 * Motion's `layoutId`. Sits top-right (above SideDots' vertical-center
 * column) and is always visible — the toggle is the primary affordance for
 * the new bilingual support, so we don't hide it behind a menu.
 *
 * The indicator uses shared-layout animation: when the user clicks the
 * inactive cell, the same `motion.span` re-mounts on the other side and
 * Framer interpolates position automatically. Cheaper + smoother than
 * computing offsets ourselves.
 */
export function LangToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      // z-30 sits ABOVE SideDots (z-30 too) but below RouteLoader (z-[120]).
      // Toggle should always be reachable; the loader covers it during nav.
      className={cn(
        "fixed right-4 top-4 z-30 lg:right-6 lg:top-6",
        "select-none",
      )}
    >
      <div
        role="group"
        aria-label="Language"
        className={cn(
          "relative inline-flex items-center gap-0.5 rounded-full border rule",
          "bg-bg-elev/85 p-1 backdrop-blur-md",
          "shadow-lg shadow-black/30",
          "font-mono text-[11px] uppercase tracking-[0.2em]",
        )}
      >
        {LOCALES.map((value) => {
          const isActive = value === locale;
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                if (value === locale) return;

                // VI and EN copy differ in length, so every chapter's
                // height changes on swap. Chapters ABOVE the user's current
                // position shift the rest of the page down/up, so the
                // user's absolute scrollY no longer points at the content
                // they were reading — the page appears to jump (and drifts
                // further on each toggle).
                //
                // Fix: snapshot {chapter, offset-within-chapter} BEFORE the
                // swap, then re-apply it every frame until the document
                // height stops changing. Re-reading the chapter's live
                // offsetTop each frame makes this robust to the reflow.
                // The whole settle runs behind the route loader so none of
                // the re-anchoring is visible.
                const anchor = readScrollAnchor();
                showRouteLoader();
                setLocale(value);

                let frames = 0;
                let lastHeight = -1;
                let stable = 0;
                const settle = () => {
                  if (anchor) applyScrollAnchor(anchor);
                  const h = document.documentElement.scrollHeight;
                  if (h === lastHeight) stable += 1;
                  else {
                    stable = 0;
                    lastHeight = h;
                  }
                  frames += 1;
                  if (stable >= STABLE_FRAMES || frames >= MAX_SETTLE_FRAMES) {
                    // One final apply once the layout is provably stable,
                    // then reveal — the loader's MIN_HOLD keeps it on screen
                    // long enough that this never flashes.
                    if (anchor) applyScrollAnchor(anchor);
                    hideRouteLoader();
                    return;
                  }
                  requestAnimationFrame(settle);
                };
                requestAnimationFrame(settle);
              }}
              aria-label={ARIA[value]}
              aria-pressed={isActive}
              className={cn(
                "relative inline-flex h-7 min-w-[2.5rem] items-center justify-center rounded-full px-3",
                "transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                isActive ? "text-bg" : "text-ink-mute hover:text-ink",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="lang-toggle-indicator"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span className="relative">{LABELS[value]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
