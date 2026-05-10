# Portfolio Implementation Plan

**Owner:** Quoc Tran Trung
**Concept:** Cinematic scroll storyline — professional and elegant on the surface, animated and a little playful underneath, structured so a recruiter can scroll once and absorb a complete narrative arc from "first line of PHP at BUV" to "Tech Lead shipping edge AI + maintaining mnemo."

---

## 1. Recommended stack

> **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + GSAP ScrollTrigger + Lenis + Three.js (R3F, optional).**
> **Hosting:** Vercel (free tier, edge runtime).
> **CMS:** none — content lives in MDX files inside the repo (one `.mdx` per chapter).

### Why this stack

| Need | Why it fits |
|---|---|
| Cinematic scroll | GSAP ScrollTrigger is the industry standard for scroll-jacked timelines. Lenis layers buttery inertia on top with one config object. |
| Animation-rich UI | Framer Motion handles per-component micro-interactions (hover, tap, layout) where GSAP would be overkill. The two libraries pair cleanly when you give each a clear job. |
| Embedded interactive demos | Next.js Server Components + Edge runtime let you ship a live mnemo-style query box (or v3 chat surface) without standing up a separate backend. |
| SEO + share cards | App Router's metadata API and Open Graph image generation are the cleanest way to make every chapter share well on LinkedIn. |
| Future-proof | When v3 chat surface lands you can drop the BYO-API-key UI in as a route group; no platform migration needed. |

### Stacks ruled out (and why)

- **Astro + GSAP.** Beautiful content-first option, fastest LCP. Ruled out only because you'll likely want an interactive demo / chat surface later, and Astro islands are clunkier for that than Next.js. If you decide to keep the site purely static, Astro is the better pick — flag this and we'll switch.
- **SvelteKit + Motion One.** Smaller bundles and lovely animations, but smaller ecosystem and you'd be the only person on the PathTech team using it. Friction for hiring conversations.
- **Plain Vite + React.** Loses metadata, image optimisation, and OG image generation. Not worth saving the framework overhead.

### Library budget (target: < 150 KB gzipped JS on first paint)

| Library | Job | Notes |
|---|---|---|
| `gsap` + `gsap/ScrollTrigger` | Scroll-pinned timelines, scrub animations | Lazy-loaded only on chapters that use it |
| `framer-motion` | Component-level motion, page transitions | Use the `motion/react-lite` build where possible |
| `lenis` | Smooth-scroll inertia | One global instance |
| `@react-three/fiber` + `@react-three/drei` | Hero 3D nameplate, optional mnemo graph viz | Optional; gate behind `prefers-reduced-motion` |
| `lucide-react` | Icons | Tree-shakes per icon |
| `class-variance-authority` + `tailwind-merge` | Variant-driven components | Standard shadcn pattern |

---

## 2. Information architecture — the storyline

The site is a single long page (`/`) with **eight chapters**, each pinned for one viewport-height of scroll. Side-nav dots let recruiters jump but the default is scroll. Sub-routes (`/work/<slug>`, `/blog/<slug>`) live for deep dives later.

| # | Chapter | Hook | Key motion |
|---|---|---|---|
| 0 | **Cold open** | Name draws letter-by-letter on a dark canvas; subtitle "Full-Stack Engineer · Technical Lead" fades up; subtle particle field reacts to mouse. | SVG stroke draw (GSAP DrawSVG), magnetic cursor on CTA. |
| 1 | **Origin** | Big timeline rail labelled "2021 · Hanoi University." Year scrubs as you scroll. Cards for HANU, Devpro J2EE cert, BUV PHP/Laravel internship, HANU IT Youth Union leadership. | Horizontal scroll-jack inside vertical scroll (ScrollTrigger pin + translate). |
| 2 | **The crossover (Bitsness)** | "March 2025 — first AI automation gig." YouTube-pipeline diagram animates into existence: video → analysis → ideation → script → storyboard. | Sequenced node reveal with stagger; line draws between nodes. |
| 3 | **The lead arc (PathTech)** | Six project tiles in a bento grid: AIBox, AICloud, AI Assistant, APST, AFD, Evolution API. Each tile expands on hover into spec, stack, role. | Magnetic tiles; flip-card on hover; stack badges marquee inside the tile. |
| 4 | **AIBox closeup** | Full-bleed scrub: a Jetson device tilts, four CCTV feeds boot up, YOLO bounding boxes draw on detected helmets / faces / plates. Stat counters tick: "10+ models · 50+ endpoints · WebRTC/RTSP/MJPEG." | Canvas + GSAP scrub; counters use ScrollTrigger toggleClass. |
| 5 | **mnemo (passion)** | Interactive: a mock prompt box. User types a query, the page renders the 6-term scoring breakdown (vector + graph + recency + type + project + lexical) with bars filling. Stat band: 100% top-1 · MRR 1.000 · 17 ms median. Roadmap rail (v1.1 → v4) scrolls horizontally. | Real interactivity on the input; Framer Motion layout animations on the result cards. |
| 6 | **Skills constellation** | Tech logos float in a force-directed graph (D3 or simple physics). Hover a node to see related projects light up via the same edges mnemo uses. | Light Three.js or a 2D canvas; falls back to a static bento grid under reduced-motion. |
| 7 | **Coda — let's talk** | Big email CTA, GitHub + LinkedIn + mnemo repo, "Open to: Full-Stack Engineer / Technical Lead." Footer with timezone, response-time pledge, and a tiny "built with Next.js + GSAP + Lenis" credit. | Magnetic button; mailto: copy-on-click with toast. |

### Content principles

- Every chapter ends with a one-sentence sentence-of-the-arc that points forward. Recruiters who skim get the through-line for free.
- Numbers up front. "10+ models", "12,000+ member companies", "300K+ booking records", "100% top-1." Concrete > clever.
- One persistent voice: confident, slightly dry, no buzzwords. The animation does the showing-off; the copy stays calm.

---

## 3. Visual system

```
Tokens (Tailwind theme extension)
  --bg          #0B0D12   (near-black, warm)
  --bg-elev     #12151D
  --ink         #ECEEF2
  --ink-mute    #8A93A2
  --accent      #6CE5C7   (mint — single accent, used sparingly)
  --accent-warm #FFB86B   (amber — only on the mnemo chapter, signals "passion")
  --rule        #1F2330

Typography
  Display    Instrument Serif (variable)        — chapter titles
  Body       Inter (variable, 14–17px)          — paragraphs
  Mono       JetBrains Mono                      — code, stats, mnemo terminal

Grid
  12-col, 72px gutter on desktop
  Container max 1280px, edge-to-edge for cinematic chapters (4 and 5)

Motion
  Default ease  cubic-bezier(0.22, 1, 0.36, 1)  ("expo out")
  Default dur   600ms hero, 320ms micro
  Stagger       40ms
  Reduced       prefers-reduced-motion → fade-only, no transforms > 16px
```

The "elegant + teen" balance comes from the **type contrast** (Instrument Serif × JetBrains Mono) and the **single mint accent** that earns its keep — most of the surface is restrained black/ink, then mint pops on hover, in stat numbers, and on the mnemo chapter.

---

## 4. Animation system

Three layers, each with one library — never two libraries doing the same job.

```
┌─────────────────────────────────────────────────────┐
│ Layer 3 — Page rhythm (Lenis)                       │
│   Smooth-scroll inertia, scroll velocity, anchor    │
│   navigation                                         │
├─────────────────────────────────────────────────────┤
│ Layer 2 — Scene direction (GSAP + ScrollTrigger)    │
│   Pinned chapters, scrubbed timelines, SVG draws    │
│   Owns: chapters 1, 2, 4, 5                         │
├─────────────────────────────────────────────────────┤
│ Layer 1 — Component motion (Framer Motion)          │
│   Hover, tap, layout transitions, page swap         │
│   Owns: every interactive element                   │
└─────────────────────────────────────────────────────┘
```

**Performance budget**

- 60 fps on a mid-range Android (Pixel 6a or Galaxy A54) at the AIBox chapter.
- Hero LCP ≤ 1.8 s on 4G.
- Total JS ≤ 150 KB gzipped on first paint; chapter 4/5/6 chunks lazy-loaded as the user scrolls in.
- Every animation respects `prefers-reduced-motion: reduce`.

---

## 5. Repo & file layout

```
portfolio/
├─ app/
│  ├─ layout.tsx                # Lenis provider, fonts, theme
│  ├─ page.tsx                  # composes the eight chapters
│  ├─ work/[slug]/page.tsx      # per-project deep dive (later)
│  ├─ blog/[slug]/page.tsx      # MDX posts (later)
│  └─ api/og/route.ts           # dynamic Open Graph images
├─ chapters/
│  ├─ 00-cold-open.tsx
│  ├─ 01-origin.tsx
│  ├─ 02-crossover.tsx
│  ├─ 03-lead-arc.tsx
│  ├─ 04-aibox-closeup.tsx
│  ├─ 05-mnemo.tsx
│  ├─ 06-skills.tsx
│  └─ 07-coda.tsx
├─ components/
│  ├─ motion/                   # MagneticButton, TextDraw, ChapterPin
│  ├─ ui/                       # shadcn primitives
│  └─ data/                     # WorkCard, StatCounter, RoadmapRail
├─ content/
│  ├─ work/*.mdx                # one file per project
│  └─ posts/*.mdx
├─ lib/
│  ├─ lenis.ts                  # singleton smooth-scroll
│  ├─ gsap.ts                   # ScrollTrigger registration
│  └─ motion.ts                 # shared variants & easings
├─ public/
│  ├─ media/                    # video posters, model still frames
│  └─ og/                       # static OG fallbacks
└─ styles/
   └─ globals.css               # tokens via @theme in Tailwind v4
```

---

## 6. Milestones (5 weeks, evenings + weekends)

| Week | Focus | Output |
|---|---|---|
| **W1 — Foundation** | Repo scaffold, Tailwind v4 tokens, fonts, layout shell, Lenis + GSAP wired, deploy a "hello world" to Vercel with custom domain. | Live URL with placeholder hero. |
| **W2 — Storyline draft** | All eight chapters in place with real copy and static layouts. No animation yet. Ship to staging for a content review. | Skim-readable narrative. |
| **W3 — Scene direction** | Hero draw-in, Origin scrub, Crossover diagram, Lead-arc bento, Coda. Magnetic buttons, hover micro-interactions. | Site "comes alive." |
| **W4 — Heavy chapters** | AIBox closeup canvas, mnemo interactive query box, skills constellation. Reduced-motion fallbacks. Mobile pass. | Cinematic moments land. |
| **W5 — Polish & ship** | Lighthouse pass (perf/a11y/SEO/best-practices ≥ 95), OG images per chapter, analytics (Plausible), `/work/<slug>` deep dives for the top 3 projects. Launch post on LinkedIn. | v1.0 live. |

Slippage budget: +1 week for AIBox canvas if you decide to use real bounding-box demo footage.

---

## 7. Stretch ideas (post-launch)

- **`/playground`** — drop in a tiny mnemo demo: paste a few notes, type a query, watch the 6-term score animate. Reuses the v3 chat surface UI.
- **Voice tour** — pre-recorded 90-second walkthrough that auto-plays muted with captions; a "Listen to Quoc walk you through this" toggle in the corner.
- **Chapter-as-shareable** — each chapter has its own permalink and OG image, so you can share a single chapter to LinkedIn ("here's the AIBox story") instead of the whole site.
- **CMS migration** — once you're publishing posts, swap content/ for Sanity or Keystatic (still git-backed). Not before.

---

## 8. Open questions to lock before W1

1. **Domain.** `quoctran.dev`? `quoctran.io`? Confirm and register before W1 so DNS propagates.
2. **Tone of copy.** First-person ("I architected…") or third-person ("Quoc architects…")? Recommend first-person — matches the cinematic vibe.
3. **Hero asset.** Three.js nameplate (heavy, "wow") vs SVG draw-in (lighter, more typographic). Recommend SVG for v1, Three.js for v1.1.
4. **Game_Dev / Repository folders.** Once those are reachable, decide which projects earn a tile in chapter 3 vs a footnote vs a `/work/<slug>` deep dive.
5. **Analytics.** Plausible (paid, privacy-first) vs Vercel Analytics (free, less detail). Recommend Plausible after first 100 visits.

---

*Once you green-light the stack and the chapter list, I can scaffold the repo (W1 deliverable) in a follow-up session.*
