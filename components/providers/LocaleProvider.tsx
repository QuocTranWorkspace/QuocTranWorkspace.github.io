"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  DEFAULT_LOCALE,
  type Locale,
  readSavedLocale,
  saveLocale,
} from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Wraps the app in a locale context. Initial render is DEFAULT_LOCALE so
 * server-rendered HTML matches client-rendered HTML on first paint (no
 * hydration mismatch). After mount we read localStorage and swap if needed.
 * That can flash for one frame on a VI user's first visit — acceptable for
 * a portfolio; see the i18n.ts header for the pre-paint approach if we
 * ever need to eliminate it.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = readSavedLocale();
    if (saved && saved !== locale) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    } else {
      document.documentElement.lang = locale;
    }
    // Only on mount — never echo `locale` here or every user-driven change
    // would re-run the localStorage read and clobber itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = (next: Locale) => {
    if (next === locale) return;
    setLocaleState(next);
    saveLocale(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

/** Hook into the current locale + setter. Throws if used outside the
 *  provider — fail loudly during dev rather than silently default to EN. */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return ctx;
}
