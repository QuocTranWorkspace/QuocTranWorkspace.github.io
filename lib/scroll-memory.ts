"use client";

import { getLenis } from "@/lib/lenis";

const KEY = "byquoc:home-scroll";

/**
 * Persist the current scroll position before leaving the home page (e.g. a
 * project tile -> /work/<slug>). Read back by ScrollRestoration when the
 * user returns. Uses Lenis' internal scroll when available since it is the
 * source of truth while smooth-scroll is active.
 */
export function rememberHomeScroll() {
  if (typeof window === "undefined") return;
  const lenis = getLenis();
  const y = Math.round(lenis?.scroll ?? window.scrollY ?? 0);
  try {
    sessionStorage.setItem(KEY, String(y));
  } catch {
    /* sessionStorage can throw in private mode — non-fatal */
  }
}

/** Pop the saved scroll position (one-shot). Returns null if none. */
export function consumeHomeScroll(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw === null) return null;
    sessionStorage.removeItem(KEY);
    const y = parseInt(raw, 10);
    return Number.isNaN(y) ? null : y;
  } catch {
    return null;
  }
}
