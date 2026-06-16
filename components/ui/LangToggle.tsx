"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LOCALES, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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
              onClick={() => setLocale(value)}
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
