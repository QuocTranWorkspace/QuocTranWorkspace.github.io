"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";

const chapters = [
  { id: "chapter-0", label: "Cold open" },
  { id: "chapter-1", label: "Origin" },
  { id: "chapter-2", label: "Crossover" },
  { id: "chapter-3", label: "Lead arc" },
  { id: "chapter-4", label: "AIBox" },
  { id: "chapter-5", label: "mnemo" },
  { id: "chapter-6", label: "Constellation" },
  { id: "chapter-7", label: "Coda" },
];

// Compute the active chapter directly from a scrollY — used as both the
// initial seed (correct even after ScrollRestoration snaps the page) and a
// belt-and-braces on every Lenis scroll tick so the dot never lies.
function activeIndexFromScrollY(y: number): number {
  // Active = the latest chapter whose offsetTop has crossed our reference
  // line (35 % from the top of the viewport). Mirrors the IO threshold.
  const line = y + window.innerHeight * 0.35;
  let idx = 0;
  for (let i = 0; i < chapters.length; i++) {
    const el = document.getElementById(chapters[i]!.id);
    if (el && el.offsetTop <= line) idx = i;
  }
  return idx;
}

export function SideDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // 1. Seed initial state from current scroll position. On return from a
    //    /work deep dive, ScrollRestoration snaps the page to chapter 3
    //    *before* the IntersectionObserver fires its initial callback —
    //    relying on IO alone leaves the active dot stuck at chapter 0.
    setActive(activeIndexFromScrollY(window.scrollY));

    // 2. Listen to Lenis scroll events. Lenis is the source of truth while
    //    smooth-scroll is active; native `scroll` events fire too, but
    //    Lenis emits before/with them and is reliable on the snap.
    const recompute = () =>
      setActive(activeIndexFromScrollY(window.scrollY));
    const lenis = getLenis();
    lenis?.on("scroll", recompute);
    window.addEventListener("scroll", recompute, { passive: true });

    // 3. IntersectionObserver still catches in-page transitions cleanly for
    //    chapters taller than the viewport where pure scrollY-vs-offsetTop
    //    flips can stutter. Belt + braces.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = chapters.findIndex((c) => c.id === entry.target.id);
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
      aria-label="Chapter navigation"
      // lg:block (1024+) instead of md:block (768+) so we never collide with
      // container-edge content at 175% zoom or narrow widescreens.
      className="fixed right-4 top-1/2 z-30 -translate-y-1/2 hidden lg:block xl:right-6"
    >
      <ul className="flex flex-col gap-3.5">
        {chapters.map((c, i) => {
          const isActive = i === active;
          return (
            <li key={c.id} className="relative flex justify-end">
              <button
                type="button"
                onClick={() => jumpTo(c.id)}
                aria-label={`Jump to ${c.label}`}
                aria-current={isActive ? "true" : undefined}
                // Hit area is generous (size-6 = 24x24px) but the visible
                // dot is small. Label tooltip appears to the LEFT only on
                // hover/focus, never persistently — so the nav has zero
                // horizontal footprint at rest and won't overlap content.
                className={cn(
                  "group relative flex size-6 items-center justify-center cursor-pointer",
                  "focus-visible:outline-none rounded-full",
                )}
              >
                <span
                  className={cn(
                    "size-2 rounded-full border transition-all duration-300",
                    isActive
                      ? "bg-accent border-accent scale-125"
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
                  {c.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
