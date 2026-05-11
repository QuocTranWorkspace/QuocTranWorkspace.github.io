"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

const milestones = [
  {
    year: "2021",
    title: "Hanoi University",
    detail:
      "B.Sc. IT, Software Engineering — English programme. The PHP-on-WAMP era.",
  },
  {
    year: "2022",
    title: "Devpro J2EE certification",
    detail:
      "Java Web Full-Stack, eight months of writing servlets after class.",
  },
  {
    year: "2023",
    title: "HANU IT Youth Union — Logistics Lead",
    detail:
      "Ran logistics for the IT Department Freshmen Welcome and the Warm Spring volunteer campaign.",
  },
  {
    year: "2024",
    title: "British University Vietnam",
    detail:
      "PHP / Laravel internship in the ICT department. Built a barcode-detection pipeline that retired a manual data-entry workflow.",
  },
  {
    year: "2024",
    title: "HANU Youth Union — Secretary",
    detail:
      "Led the executive team across campus-wide events. First time owning a roadmap end-to-end.",
  },
];

export function Origin() {
  const outerRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const gsap = ensureGsap();
    const outer = outerRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!outer || !pin || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lg = window.matchMedia("(min-width: 1024px)").matches;

    // On reduced-motion or below lg, fall back to native vertical scroll —
    // the chapter still reads cleanly as a stack of cards.
    if (reduced || !lg) {
      track.style.transform = "none";
      return;
    }

    const ctx = gsap.context(() => {
      // Distance the horizontal track must travel so the LAST card's right
      // edge lands at (viewport-right minus the track's right padding) — i.e.
      // the trailing card has the same gutter the leading card does.
      //
      // Flex containers' scrollWidth excludes trailing padding when content
      // overflows, so adding paddingRight explicitly is required. Using the
      // last child's offsetLeft + offsetWidth pins the math to the actual
      // card layout rather than relying on scrollWidth at all.
      const getDistance = () => {
        const last = track.lastElementChild as HTMLElement | null;
        const rightPad =
          parseFloat(getComputedStyle(track).paddingRight) || 0;
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
          // `scrub: true` keeps the track exactly synced to scroll position.
          // With a numeric lag (e.g. 0.8) the user could finish the pin
          // before the track caught up to its end -- partially clipping the
          // last card at the right edge. True = no lag, no clip.
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

    // Things that can move the layout AFTER ScrollTrigger first measures:
    // font swap, image decode, lazy-mounted siblings. Refresh on each so
    // the distance recalculates with the final layout dimensions. Without
    // these refreshes, browser zoom (110-150 percent) frequently leaves
    // the track over- or under-translated at the end of the pin.
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
  }, []);

  return (
    <section
      ref={outerRef}
      id="chapter-1"
      data-chapter="origin"
      className={cn("relative bg-bg")}
    >
      <div
        ref={pinRef}
        className={cn(
          "relative w-full py-24 lg:py-0",
          // Pin / clip behavior only kicks in on lg+ where the horizontal
          // scrub runs. Below lg, the chapter is a normal vertical stack
          // and must be free to grow with its content.
          "lg:h-svh lg:overflow-hidden",
        )}
      >
        <div className="container-edge lg:pt-12 xl:pt-20">
          <header className="max-w-3xl space-y-2 mb-6 lg:mb-4 xl:mb-8 lg:space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Chapter 01 · Origin
            </p>
            <h2 className="font-display text-balance text-4xl md:text-5xl lg:text-4xl xl:text-6xl 2xl:text-7xl leading-[1.05]">
              The first three years happened on a single laptop in Hanoi.
            </h2>
          </header>
        </div>

        {/* Year ticker — sticks to the left edge, swaps as scrub progresses */}
        <div
          aria-hidden
          className="container-edge hidden lg:flex items-baseline gap-6 mb-4 xl:mb-6"
        >
          <span className="font-display text-accent leading-none text-5xl xl:text-6xl 2xl:text-7xl">
            {milestones[activeIndex]?.year ?? milestones[0]?.year}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            {String(activeIndex + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
          </span>
        </div>

        {/*
          The horizontal track.
          - Below lg: stacked vertically inside a max-width 1280 centered
            container (mimicking container-edge).
          - On lg+: the wrapper releases the max-width / padding so the track
            spans full viewport width. The track itself carries symmetric
            left + right padding (matching container-edge's clamp), and the
            distance calc below ends with the last card's right edge offset
            from viewport right by exactly that right-pad value.
        */}
        <div
          className={cn(
            "mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,4vw,4rem)]",
            "lg:max-w-none lg:px-0",
          )}
        >
          <div
            ref={trackRef}
            className={cn(
              "flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10",
              "lg:pl-[clamp(1.25rem,4vw,4rem)] lg:pr-[clamp(1.25rem,4vw,4rem)]",
              "lg:will-change-transform",
            )}
          >
            {milestones.map((m, i) => (
              <article
                key={m.year + m.title}
                className={cn(
                  "relative shrink-0 rounded-2xl border rule bg-bg-elev/60 transition-colors",
                  "p-6 xl:p-8",
                  "lg:w-[20rem] xl:w-[24rem] 2xl:w-[26rem]",
                  i === activeIndex && "lg:border-accent/40",
                )}
                aria-current={i === activeIndex ? "true" : undefined}
              >
                <p className="stat text-xs uppercase tracking-widest text-ink-mute">
                  {m.year}
                </p>
                <h3 className="mt-3 xl:mt-4 font-display text-2xl xl:text-3xl leading-tight">
                  {m.title}
                </h3>
                <p className="mt-3 xl:mt-4 text-ink-mute text-sm xl:text-base leading-relaxed">
                  {m.detail}
                </p>
                <span
                  aria-hidden
                  className={cn(
                    "mt-6 xl:mt-8 block h-px w-12 transition-colors",
                    i === activeIndex ? "bg-accent" : "bg-rule",
                  )}
                />
              </article>
            ))}
          </div>
        </div>

        {/* Scroll hint -- absolutely positioned to the bottom-right of the
            pin so it never competes with the year-rail for vertical space.
            Below lg the pin isn't pinned at all (lg:h-svh lg:overflow-hidden)
            so the hint stays hidden on mobile / tablet. */}
        <p className="pointer-events-none absolute bottom-6 right-[clamp(1.25rem,4vw,4rem)] hidden font-mono text-[11px] uppercase tracking-[0.25em] text-ink-mute lg:block">
          Scroll to advance →
        </p>
      </div>
    </section>
  );
}
