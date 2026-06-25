"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { strings } from "@/content/strings";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// The horizontal scrub is a treat for screens with real estate. It needs
// BOTH enough width (the cards are a horizontal row) and enough height (the
// pinned section is one viewport tall and must fit header + year-rail +
// cards + hint without clipping). Below either threshold we fall back to a
// plain vertical stack, which always fits because it's allowed to grow.
//
// 700px height covers the failure the user hit: a ~1366x768 laptop has a
// usable viewport around 690-700px after browser chrome, where the big
// display type overflowed the pinned viewport and the scroll hint landed
// on top of the cards.
const SCRUB_QUERY = "(min-width: 1024px) and (min-height: 700px)";

export function Origin() {
  const { locale } = useLocale();
  const s = strings.origin;
  const milestones = s.milestones;

  const outerRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // `scrub` decides the whole layout. Default false so SSR + first paint
  // render the always-safe vertical stack; the effect upgrades to the
  // pinned scrub when the viewport can actually hold it. Chapter 1 is below
  // the fold on load, so the upgrade is never visible as a flash.
  const [scrub, setScrub] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(SCRUB_QUERY);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setScrub(mq.matches && !reduced.matches);
    update();
    mq.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!scrub) return;
    const gsap = ensureGsap();
    const outer = outerRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!outer || !pin || !track) return;

    const ctx = gsap.context(() => {
      // Distance the horizontal track must travel so the LAST card's right
      // edge lands at (viewport-right minus the track's right padding) — the
      // trailing card gets the same gutter the leading card does. Using the
      // last child's offsetLeft + offsetWidth pins the math to the actual
      // card layout rather than relying on a flex container's scrollWidth
      // (which excludes trailing padding when content overflows).
      const getDistance = () => {
        const last = track.lastElementChild as HTMLElement | null;
        const rightPad = parseFloat(getComputedStyle(track).paddingRight) || 0;
        if (!last) return 0;
        const totalContentRight = last.offsetLeft + last.offsetWidth + rightPad;
        return Math.max(0, totalContentRight - pin.clientWidth);
      };

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: pin,
          pinSpacing: true,
          // `scrub: true` (no lag) keeps the track exactly synced to scroll
          // so the last card can't be left partially clipped at the edge.
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              milestones.length - 1,
              Math.floor(self.progress * milestones.length),
            );
            setActiveIndex(idx);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, outer);

    // Late layout shifts (font swap, image decode) move the measured
    // distance; refresh on each so the scrub end recalculates.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => undefined);
    }
    const settleTimer = setTimeout(refresh, 350);

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      clearTimeout(settleTimer);
      ctx.revert();
    };
    // Re-run only when `scrub` flips (a resize across the threshold), NOT on
    // locale change — card widths are fixed so translated text doesn't
    // alter the scrub distance, and reverting on locale change would strip
    // the pin spacer and jump the user. milestones.length is constant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrub]);

  const activeYear = milestones[activeIndex]?.year ?? milestones[0]?.year;

  return (
    <section
      ref={outerRef}
      id="chapter-1"
      data-chapter="origin"
      className="relative bg-bg"
    >
      <div
        ref={pinRef}
        className={cn(
          "relative w-full",
          // Scrub: exactly one viewport tall, clipped, laid out as a flex
          // column so each zone gets a fixed slice and the cards fill (and
          // vertically center within) whatever height is left over.
          // Stack: free to grow, generous vertical padding.
          scrub ? "h-svh overflow-hidden flex flex-col" : "py-24",
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "container-edge",
            scrub && "shrink-0 pt-10 2xl:pt-16",
          )}
        >
          <header className="max-w-3xl space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {t(s.eyebrow, locale)}
            </p>
            <h2
              className={cn(
                "font-display text-balance leading-[1.05]",
                // Scrub headline scales with viewport HEIGHT, not width:
                // text-6xl/7xl assumed a tall viewport and overflowed short
                // ones. clamp(2rem, 5vh, 3.5rem) stays ~32px on the 700px
                // floor and grows to ~54px on a 1080p screen — impactful
                // where there's room, safe where there isn't.
                scrub
                  ? "text-[clamp(2rem,5vh,3.5rem)]"
                  : "text-4xl md:text-5xl",
              )}
            >
              {t(s.headline, locale)}
            </h2>
          </header>
        </div>

        {/* Year ticker — scrub only; swaps as the scrub progresses */}
        {scrub ? (
          <div
            aria-hidden
            className="container-edge mt-6 flex shrink-0 items-baseline gap-6"
          >
            <span className="font-display leading-none text-accent text-5xl 2xl:text-6xl">
              {activeYear}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(milestones.length).padStart(2, "0")}
            </span>
          </div>
        ) : null}

        {/* Cards */}
        <div
          className={cn(
            scrub
              ? // flex-1 + min-h-0 lets this zone absorb the leftover height;
                // items-center vertically centers the row inside it.
                "mt-6 flex min-h-0 flex-1 items-center"
              : "mx-auto mt-2 w-full max-w-[1280px] px-[clamp(1.25rem,4vw,4rem)]",
          )}
        >
          <div
            ref={trackRef}
            className={cn(
              "flex w-full",
              scrub
                ? "flex-row items-stretch gap-8 2xl:gap-10 pl-[clamp(1.25rem,4vw,4rem)] pr-[clamp(1.25rem,4vw,4rem)] will-change-transform"
                : "flex-col gap-6",
            )}
          >
            {milestones.map((m, i) => (
              <article
                key={m.year + t(m.title, locale)}
                className={cn(
                  "relative rounded-2xl border rule bg-bg-elev/60 p-6 transition-colors",
                  scrub
                    ? "shrink-0 w-[20rem] xl:w-[22rem] 2xl:w-[24rem]"
                    : "",
                  i === activeIndex && scrub && "border-accent/40",
                )}
                aria-current={i === activeIndex && scrub ? "true" : undefined}
              >
                <p className="stat text-xs uppercase tracking-widest text-ink-mute">
                  {m.year}
                </p>
                <h3 className="mt-3 font-display text-2xl leading-tight 2xl:text-3xl">
                  {t(m.title, locale)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-mute 2xl:text-base">
                  {t(m.detail, locale)}
                </p>
                <span
                  aria-hidden
                  className={cn(
                    "mt-6 block h-px w-12 transition-colors",
                    i === activeIndex && scrub ? "bg-accent" : "bg-rule",
                  )}
                />
              </article>
            ))}
          </div>
        </div>

        {/* Scroll hint — scrub only, now in normal flow at the bottom of the
            flex column (was absolutely positioned and overlapped the cards
            on short viewports). */}
        {scrub ? (
          <div className="container-edge flex shrink-0 justify-end pb-6 pt-4">
            <p className="pointer-events-none font-mono text-[11px] uppercase tracking-[0.25em] text-ink-mute">
              {t(s.scrollHint, locale)}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
