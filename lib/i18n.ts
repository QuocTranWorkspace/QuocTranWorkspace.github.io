/**
 * i18n primitives — a tiny client-side locale store with localStorage
 * persistence. No SSR locale negotiation: every page is statically rendered
 * in EN by Next.js (matches the SEO target), and the client swaps to the
 * user's saved locale on first effect. That trades a single-frame copy flash
 * (only for VI users on first paint of a session) for a much simpler static
 * export — no `/en/` `/vi/` route doubling, no generateStaticParams cross
 * product with `[slug]`, no middleware (which static export can't run).
 *
 * If a future redesign wants pre-paint locale (no flash), the path is:
 *   1. Inline <script> in <head> sets `document.documentElement.lang` and a
 *      data-locale attribute from localStorage before React hydrates.
 *   2. Render both EN + VI variants under sibling `<span lang="en">` /
 *      `<span lang="vi">` tags and use CSS `:where([data-locale="X"]) [lang="Y"]`
 *      to display: none the wrong one.
 * That's about 2x the DOM size on every translated node, so we don't do it
 * by default. Worth it for high-traffic VI pages, not a portfolio.
 */

export type Locale = "en" | "vi";

export const LOCALES: readonly Locale[] = ["en", "vi"] as const;
export const DEFAULT_LOCALE: Locale = "en";
export const STORAGE_KEY = "byquoc:locale";

/**
 * A piece of copy that has both EN and VI variants. Use this for every
 * user-facing string. The .vi field is required — a missing translation
 * should fail typecheck, not silently fall back to EN at runtime.
 */
export type LocalizedText = {
  en: string;
  vi: string;
};

/** Pick the right variant for the current locale. */
export function t(value: LocalizedText, locale: Locale): string {
  return value[locale];
}

/** Lift a plain string into a LocalizedText (same in both languages — for
 *  proper nouns and tech labels that don't translate). */
export function same(s: string): LocalizedText {
  return { en: s, vi: s };
}

/** Read the saved locale synchronously (or null if not set / SSR). */
export function readSavedLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "en" || raw === "vi") return raw;
  } catch {
    /* private mode / disabled storage — non-fatal */
  }
  return null;
}

/** Persist the user's choice. Silently no-ops if storage is blocked. */
export function saveLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* non-fatal */
  }
}
