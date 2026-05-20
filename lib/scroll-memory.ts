"use client";

import { getLenis } from "@/lib/lenis";

const KEY = "byquoc:home-scroll";

/**
 * What we persist when leaving home: WHICH chapter the user is in + the
 * offset within that chapter, NOT a raw scrollY. The chapter-1 horizontal
 * scrub adds a pin spacer that changes every chapter's absolute Y after
 * the page mounts again, so raw scrollY restoration lands in the wrong
 * chapter briefly before ScrollTrigger refresh corrects it ("flicker").
 * Restoring relative to a chapter element is robust against that shift.
 */
export type SavedScroll = { chapter: string; offset: number };

const CHAPTER_IDS = [
  "chapter-0",
  "chapter-1",
  "chapter-2",
  "chapter-3",
  "chapter-4",
  "chapter-5",
  "chapter-6",
  "chapter-7",
];

export function rememberHomeScroll() {
  if (typeof window === "undefined") return;
  const lenis = getLenis();
  const y = Math.round(lenis?.scroll ?? window.scrollY ?? 0);

  // Find the last chapter whose offsetTop is at or above current scroll.
  let chapter = CHAPTER_IDS[0]!;
  let offset = y;
  for (const id of CHAPTER_IDS) {
    const el = document.getElementById(id);
    if (el && y >= el.offsetTop) {
      chapter = id;
      offset = Math.max(0, y - el.offsetTop);
    }
  }

  try {
    sessionStorage.setItem(
      KEY,
      JSON.stringify({ chapter, offset } satisfies SavedScroll),
    );
  } catch {
    /* private mode — non-fatal */
  }
}

export function consumeHomeScroll(): SavedScroll | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw === null) return null;
    sessionStorage.removeItem(KEY);
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof parsed.chapter === "string" &&
      typeof parsed.offset === "number"
    ) {
      return parsed as SavedScroll;
    }
    // Legacy raw-number format — best-effort, treat as chapter-0 offset.
    if (typeof parsed === "number") {
      return { chapter: "chapter-0", offset: parsed };
    }
    return null;
  } catch {
    return null;
  }
}
