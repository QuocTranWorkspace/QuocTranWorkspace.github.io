"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { strings } from "@/content/strings";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Custom cursor + contextual hover preview — the signature interaction of
 * award-style creative-developer portfolios (quang.studio et al).
 *
 * Three layers, all driven by ONE mousemove listener + ONE rAF loop:
 *   - dot   : a small accent dot that tracks the pointer 1:1 (written in the
 *             move handler, no lerp, so it never feels laggy).
 *   - ring  : an easing ring that trails the dot, grows over interactive
 *             elements, and shows a contextual label ("View" / "Copy") when
 *             an element opts in via data-cursor.
 *   - preview: a floating screenshot that reveals under the pointer when a
 *             work tile opts in via data-preview-src. Trails with more lag
 *             for a tactile, physical feel.
 *
 * Opt-in contract (set on any element):
 *   data-cursor="view|copy|open"   → ring grows + shows that label
 *   data-preview-src="/path.jpg"   → floating image reveal
 * Generic <a>/<button> elements grow the ring without a label automatically.
 *
 * Gating: only on fine-pointer + hover devices (real mouse) with motion
 * allowed. Touch devices and reduced-motion users get the native cursor and
 * render nothing. Inputs/textareas keep a real caret so typing still works.
 *
 * Performance: positions live in refs and are written straight to
 * element.style.transform inside the rAF loop — React never re-renders per
 * frame. State only changes when the pointer crosses into/out of a new
 * interactive target (guarded so identical transitions don't re-render).
 */

const CURSOR_KEYS = ["view", "copy", "open"] as const;
type CursorKey = (typeof CURSOR_KEYS)[number];

type Mode = "default" | "hover" | "label";

function isCursorKey(v: string | undefined): v is CursorKey {
  return !!v && (CURSOR_KEYS as readonly string[]).includes(v);
}

export function CursorFx() {
  const { locale } = useLocale();

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [cursorKey, setCursorKey] = useState<CursorKey | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  // Decide eligibility from the pointer type + motion preference.
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("cursor-fx-active");

    const target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const preview = { x: -100, y: -100 };

    // Guards so we only setState when the target category actually changes.
    let lastMode: Mode = "default";
    let lastKey: CursorKey | null = null;
    let lastSrc: string | null = null;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const d = dotRef.current;
      if (d) {
        d.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.(
        "a, button, [data-cursor], [data-preview-src], input, textarea, select",
      ) as HTMLElement | null;

      let nextMode: Mode = "default";
      let nextKey: CursorKey | null = null;
      let nextSrc: string | null = null;

      if (el) {
        const tag = el.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea" || tag === "select") {
          // leave the native caret alone
          nextMode = "default";
        } else {
          const key = el.dataset.cursor;
          nextSrc = el.dataset.previewSrc ?? null;
          if (isCursorKey(key)) {
            nextMode = "label";
            nextKey = key;
          } else {
            nextMode = "hover";
          }
        }
      }

      if (nextMode !== lastMode) {
        lastMode = nextMode;
        setMode(nextMode);
      }
      if (nextKey !== lastKey) {
        lastKey = nextKey;
        setCursorKey(nextKey);
      }
      if (nextSrc !== lastSrc) {
        lastSrc = nextSrc;
        setPreviewSrc(nextSrc);
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    let raf = 0;
    const loop = () => {
      ring.x += (target.x - ring.x) * 0.2;
      ring.y += (target.y - ring.y) * 0.2;
      const r = ringRef.current;
      if (r) {
        r.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      preview.x += (target.x - preview.x) * 0.13;
      preview.y += (target.y - preview.y) * 0.13;
      const p = previewRef.current;
      if (p) {
        p.style.transform = `translate3d(${preview.x}px, ${preview.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("cursor-fx-active");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const label =
    mode === "label" && cursorKey ? t(strings.cursor[cursorKey], locale) : "";
  const ringSize = mode === "label" ? 76 : mode === "hover" ? 46 : 28;

  return (
    <div
      aria-hidden
      // z-100: above content, below the route loader (z-120) so navigation
      // masks cover the cursor cleanly. pointer-events-none throughout.
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Floating work-tile preview */}
      <div
        ref={previewRef}
        className={cn(
          "fixed left-0 top-0 will-change-transform",
          "transition-[opacity,scale] duration-300 ease-out",
          previewSrc ? "scale-100 opacity-100" : "scale-90 opacity-0",
        )}
      >
        {previewSrc ? (
          <div className="h-[150px] w-[240px] overflow-hidden rounded-xl border border-accent/30 bg-bg-elev shadow-2xl shadow-black/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ) : null}
      </div>

      {/* Easing ring */}
      <div
        ref={ringRef}
        className={cn(
          "fixed left-0 top-0 flex items-center justify-center rounded-full border will-change-transform",
          "transition-[width,height,background-color,border-color] duration-200 ease-out",
          mode === "default" && "border-accent/50",
          mode === "hover" && "border-accent bg-accent/10",
          mode === "label" && "border-accent bg-accent/15 backdrop-blur-sm",
        )}
        style={{ width: ringSize, height: ringSize }}
      >
        {label ? (
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
            {label}
          </span>
        ) : null}
      </div>

      {/* 1:1 dot — hidden when the ring is showing a label so it doesn't
          sit on top of the text. */}
      <div
        ref={dotRef}
        className={cn(
          "fixed left-0 top-0 size-1.5 rounded-full bg-accent will-change-transform",
          "transition-opacity duration-200",
          mode === "label" ? "opacity-0" : "opacity-100",
        )}
      />
    </div>
  );
}
