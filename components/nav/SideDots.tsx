"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { strings } from "@/content/strings";
import { t } from "@/lib/i18n";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";

// Chapter IDs are stable across locales — the labels swap, the structure
// doesn't. Order matters: matches the visual order on the page.
const CHAPTER_IDS = [
  "chapter-0",
  "chapter-1",
  "chapter-2",
  "chapter-3",
  "chapter-4",
  "chapter-5",
  "chapter-6",
  "chapter-7",
] as const;

// Compute the active chapter directly from a scrollY — used as both the
// initial seed (correct even after ScrollRestoration snaps the page) and a
// belt-and-braces on every Lenis scroll tick so the dot never lies.
function activeIndexFromScrollY(y: number): number {
  // Active = the latest chapter whose offsetTop has crossed our reference
  // line (35 % from the top of the viewport). Mirrors the IO threshold.
  const line = y + window.innerHeight * 0.35;
  let idx = 0;
  for (let i = 0; i < CHAPTER_IDS.length; i++) {
    const el = document.getElementById(CHAPTER_IDS[i]!);
    if (el && el.offsetTop <= line) idx = i;
  }
  return idx;
}

export function SideDots() {
  const { locale } = useLocale();
  const sd = strings.sideDots;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = CHAPTER_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    setActive(activeIndexFromScrollY(window.scrollY));

    const recompute = () =>
      setActive(activeIndexFromScrollY(window.scrollY));
    const lenis = getLenis();
    lenis?.on("scroll", recompute);
    window.addEventListener("scroll", recompute, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = CHAPTER_IDS.findIndex((id) => id === entry.target.id);
          if (idx >= 0) setActive(idx);
        });
      },
      { rootMargin: "-35% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      observer.disconnect();
      lenis?.off("scroll", recompute);
      window.removeEventListener("scroll", recompute);
    };
  }, []);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.4, lock: true });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label={t(sd.aria, locale)}
      // lg:block (1024+) instead of md:block (768+) so we never collide with
      // container-edge content at 175% zoom or narrow widescreens.
      className="fixed right-4 top-1/2 z-30 -translate-y-1/2 hidden lg:block xl:right-6"
    >
      <ul className="flex flex-col gap-3.5">
        {CHAPTER_IDS.map((id, i) => {
          const isActive = i === active;
          const label = t(sd.chapters[id], locale);
          return (
            <li key={id} className="relative flex justify-end">
              <button
                type="button"
                onClick={() => jumpTo(id)}
                aria-label={`${t(sd.jumpTo, locale)} ${label}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative flex size-6 items-center justify-center cursor-pointer",
                  "focus-visible:outline-none rounded-full",
                )}
              >
                <span
                  className={cn(
                    "size-2 rounded-full border transition-all duration-300",
                    isActive
                      ? "bg-accent border-accent scale-125 shadow-[0_0_10px_2px_rgba(var(--color-accent-glow)/0.55)]"
                      : "border-ink-mute/50 bg-transparent group-hover:border-ink group-focus-visible:border-ink",
                  )}
                />
                <span
                  className={cn(
                    "pointer-events-none absolute right-full mr-3 whitespace-nowrap",
                    "rounded-full border rule bg-bg/90 px-2 py-1 backdrop-blur-sm",
                    "font-mono text-[10px] uppercase tracking-widest text-ink",
                    "opacity-0 translate-x-2 transition-all duration-200",
                    "group-hover:opacity-100 group-hover:translate-x-0",
                    "group-focus-visible:opacity-100 group-focus-visible:translate-x-0",
                  )}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
