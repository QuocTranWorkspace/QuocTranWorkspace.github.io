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

export function SideDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
            const idx = chapters.findIndex((c) => c.id === entry.target.id);
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { threshold: [0.45, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      aria-label="Chapter navigation"
      className="fixed right-6 top-1/2 z-30 -translate-y-1/2 hidden md:block"
    >
      <ul className="flex flex-col gap-3">
        {chapters.map((c, i) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => jumpTo(c.id)}
              aria-label={`Jump to ${c.label}`}
              className={cn(
                "group flex items-center gap-3 cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full",
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-full border transition-all",
                  i === active
                    ? "bg-accent border-accent scale-125"
                    : "border-ink-mute/60 bg-transparent group-hover:border-ink",
                )}
              />
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-widest opacity-0 -translate-x-2 transition-all duration-300",
                  "group-hover:opacity-100 group-hover:translate-x-0",
                  i === active && "opacity-100 translate-x-0 text-accent",
                )}
              >
                {c.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
