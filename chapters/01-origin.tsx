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
      // Distance the horizontal track must travel = (trackWidth - viewport).
      // Pin distance = same, so vertical scroll progress maps 1:1 to translate.
      const getDistance = () => track.scrollWidth - pin.clientWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: pin,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Map scroll progress to active milestone index (one card wide each).
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

    // Recalc on resize / font swap.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
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
      <div ref={pinRef} className="relative h-svh w-full overflow-hidden">
        <div className="container-edge pt-24">
          <header className="max-w-3xl space-y-3 mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Chapter 01 · Origin
            </p>
            <h2 className="font-display text-5xl md:text-7xl text-balance">
              The first three years happened on a single laptop in Hanoi.
            </h2>
          </header>
        </div>

        {/* Year ticker — sticks to the left edge, swaps as scrub progresses */}
        <div
          aria-hidden
          className="container-edge mb-6 hidden lg:flex items-baseline gap-6"
        >
          <span className="font-display text-7xl text-accent leading-none">
            {milestones[activeIndex]?.year ?? milestones[0]?.year}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
            {String(activeIndex + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
          </span>
        </div>

        {/* The horizontal track. On lg+ this gets translated via GSAP. Below
            lg it remains a vertical stack inside container-edge. */}
        <div className="container-edge">
          <div
            ref={trackRef}
            className={cn(
              "flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10",
              // Trailing space on the right so the last card has breathing
              // room when it reaches viewport right edge.
              "lg:pr-[20vw] lg:will-change-transform",
            )}
          >
            {milestones.map((m, i) => (
              <article
                key={m.year + m.title}
                className={cn(
                  "relative shrink-0 rounded-2xl border rule bg-bg-elev/60 p-8 transition-colors",
                  "lg:w-[26rem]",
                  i === activeIndex && "lg:border-accent/40",
                )}
                aria-current={i === activeIndex ? "true" : undefined}
              >
                <p className="stat text-xs uppercase tracking-widest text-ink-mute">
                  {m.year}
                </p>
                <h3 className="mt-4 font-display text-3xl leading-tight">
                  {m.title}
                </h3>
                <p className="mt-4 text-ink-mute text-base leading-relaxed">
                  {m.detail}
                </p>
                <span
                  aria-hidden
                  className={cn(
                    "mt-8 block h-px w-12 transition-colors",
                    i === activeIndex ? "bg-accent" : "bg-rule",
                  )}
                />
              </article>
            ))}
          </div>
        </div>

        {/* Scroll hint, hidden when the user has already engaged */}
        <p className="container-edge mt-10 hidden lg:block font-mono text-xs uppercase tracking-widest text-ink-mute">
          Scroll to advance →
        </p>
      </div>
    </section>
  );
}
