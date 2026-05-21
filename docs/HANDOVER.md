# Handover — byQuoc portfolio

**Last updated:** 2026-05-21
**Live site:** <https://quoctranworkspace.github.io/>
**Repo:** `QuocTranWorkspace/QuocTranWorkspace.github.io` (this one)

This document is the **only** thing the next Claude Code session needs to pick
up where we left off. It assumes zero prior context.

---

## TL;DR

A cinematic 8-chapter scroll portfolio for Quoc Tran Trung. Static-exported
Next.js 16, deployed to GitHub Pages via Actions on every push to `main`.
Six deep-dive `/work/<slug>` routes, real production screenshots, a live
Ko-fi tip surface, a real-time mnemo version badge, and a daily cron rebuild
that keeps the mnemo snapshot fresh.

All 8 chapters + 6 deep-dives ship. The site is feature-complete for now.

---

## 🚨 Read first — security & rotation

The chat history of the previous sessions contains **live credentials** the
user pasted at various points:

- **Production admin logins** (rotate if still active):
  - `aivision.petrolimexaviation.com` — `paadmin / 123456aA@`
  - `admin.unlimit.gosetter.ai` — `admin@test.com / Admin123!`
  - `sales.keanubali.com` — `superadmin@keanu.com / admin123`
- **Two GitHub PATs** for `QuocTranWorkspace` user — both 1-day tokens,
  effectively expired but should be revoked if any still show on
  <https://github.com/settings/tokens>.

The user confirmed they're rotating. Do **NOT** echo these creds back into
chat. If anything else needs the user's GitHub auth, use SSH (`git@github.com`
remote already configured) or ask them for a fresh PAT — never reuse old ones.

---

## Repo topology

Three repos are involved across this work:

| Repo | What it is | How we push |
|---|---|---|
| `QuocTranWorkspace/QuocTranWorkspace.github.io` | The portfolio (this repo) | `git push origin main` via SSH; GitHub Actions deploys |
| `QuocTranWorkspace/QuocTranWorkspace` | GitHub profile README (rendered on the user's GitHub.com profile page) | `gh api -X PUT` against `/repos/.../contents/README.md` |
| `mmct-jsc/mnemo` | The user's open-source mnemo project. We only own `.github/FUNDING.yml` | `gh api -X PUT` against `/repos/mmct-jsc/mnemo/contents/.github/FUNDING.yml` — the fine-grained PAT doesn't work; **`gh` CLI with the user's authenticated session does** |

The current git remote is **SSH**: `git@github.com:QuocTranWorkspace/QuocTranWorkspace.github.io.git`. No token needed for pushes.

---

## Architecture

| Layer | Tech |
|---|---|
| Framework | Next.js 16 App Router, `output: "export"` (static HTML for GitHub Pages) |
| Styling | Tailwind v4 (`@theme` directive in `styles/globals.css`) |
| Component motion | Framer Motion v12 |
| Scroll-driven motion | GSAP + ScrollTrigger (chapter 01 horizontal scrub, chapter 04 scan-line) |
| Smooth scroll | Lenis (singleton in `lib/lenis.ts`, driven by `SmoothScrollProvider`) |
| OG image | Pre-rendered at build time via `next/og` ImageResponse → `public/og.png` (committed) |
| Live mnemo version | Three layers: build-time snapshot to `public/mnemo-version.json` (regenerated each build by `scripts/gen-mnemo-version.mjs`) + daily cron rebuild + client-side fetch from GitHub API on mount (`lib/use-mnemo-version.ts`) |

**`next.config.ts` highlights:**
- `output: "export"` — pre-renders all routes as static HTML
- `images.unoptimized: true` — GitHub Pages can't run the image optimizer
- `trailingSlash: true` — keeps deep links resolving on Pages
- **Do NOT add `framer-motion` or `gsap` to `experimental.optimizePackageImports`**. They both have runtime side effects (Proxy / plugin registration) that the optimizer destroys. Only `lucide-react` is safe to optimize. Hard-won lesson — see commits `89bad63` (framer-motion break) and `ffcb77b` (gsap break).

**CI/CD:**
- `.github/workflows/deploy.yml` — runs on `push: main`, `workflow_dispatch`, and `schedule: "17 6 * * *"` (daily 06:17 UTC). The cron is what keeps the mnemo version badge from going stale.
- One deploy at a time via `concurrency: pages` (no `cancel-in-progress`).
- Build is `pnpm install` → `pnpm build` → upload `out/` → deploy to Pages.

---

## What's live

### 8 chapters (all in `chapters/`)
| # | File | Motion |
|---|---|---|
| 00 | `00-cold-open.tsx` | Word-by-word reveal on headline (`RevealText`), cascade fade-up for caption/subtitle/CTA |
| 01 | `01-origin.tsx` | **lg+:** GSAP ScrollTrigger pinned horizontal year-rail scrub. **<lg:** vertical stack fallback. Pin spacer = layout shift, see *Known issues* |
| 02 | `02-crossover.tsx` | Stagger reveal of 5 pipeline stages + SVG connector draw (lg+) |
| 03 | `03-lead-arc.tsx` | Header + tile stagger; tile hover lift; 6/7 tiles link to `/work/<slug>` |
| 04 | `04-aibox-closeup.tsx` | Counters tick on view (`Counter` primitive); right-column is a real Petrolimex Noi Bai frame (`public/media/aibox-noibai-001.jpg`) with HUD overlay + scrub-driven scan line |
| 05 | `05-mnemo.tsx` | Interactive query box (real 6-term scoring against a 6-node mock corpus), live version badge from GitHub API, iframe embed of `mmct-jsc.github.io/mnemo` |
| 06 | `06-skills.tsx` | 8-cluster constellation. SVG edges drawn between cards on lg+, hidden below |
| 07 | `07-coda.tsx` | Copy-email button with `Copy ↔ Check` icon swap on click. Contact rail: GitHub / LinkedIn / mnemo / Ko-fi (4-col on lg+) |

### 6 `/work/<slug>` deep dives
| Slug | Live URL |
|---|---|
| aicloud | <https://quoctranworkspace.github.io/work/aicloud/> |
| aibox | <https://quoctranworkspace.github.io/work/aibox/> |
| unlimit | <https://quoctranworkspace.github.io/work/unlimit/> |
| keanu | <https://quoctranworkspace.github.io/work/keanu/> |
| swisslife | <https://quoctranworkspace.github.io/work/swisslife/> |
| mnemo | <https://quoctranworkspace.github.io/work/mnemo/> |

Each carries: caption / period / role / client → outcomes → Problem → Approach → **From the live product** gallery (real screenshots) → Stack → Lessons → optional Links. Single component at `components/work/WorkArticle.tsx` renders any entry. Data lives in `content/work.ts`. Screenshots in `public/work/<slug>/*.jpg`.

### Real screenshots captured
- **aicloud/**: `dashboard.jpg`, `cameras.jpg`, `ai-models.jpg`, `aibox-management.jpg`
- **aibox/**: `scene-day.jpg`, `scene-night.jpg` (the user's own AIB-PA-NOIBAI-001 captures)
- **unlimit/**: `apps.jpg`, `agencies.jpg`, `ghl-connections.jpg` (Users + Payment Transactions intentionally skipped per user request)
- **keanu/**: `residences.jpg`, `masterplan.jpg`, `admin-villas.jpg`

All compressed to ~100-200 KB via `scripts/compress-screenshots.mjs` (sharp, mozjpeg q78, max-w 1600). To capture more: log in to the live admin via the Playwright MCP, screenshot to `public/work/<slug>/<name>.png`, run the compress script, commit.

### Integrations
- **Ko-fi**: `https://ko-fi.com/quoctrantrung` — wired into coda contact rail (warm-accent treatment), profile README, and `.github/FUNDING.yml` in `mmct-jsc/mnemo` (so the Sponsor button on the mnemo repo points at Ko-fi + portfolio).
- **mnemo live version**: badge in chapter 05 caption + the "running v…" line at the bottom. Updates every visit via GitHub API; build-time snapshot at `public/mnemo-version.json` is the same-origin no-rate-limit baseline.

---

## Known issues

### 1. Back-link flick (tolerated as of this handover)

Symptom: Clicking "Back to portfolio" inside a `/work/<slug>` page sometimes shows a **single-frame flick** before landing at the saved scroll position. User accepted as-is at session close.

What we've tried (all live, partially mitigating, not fully fixing):
- Pre-paint `<script>` in `<head>` of `app/layout.tsx` that synchronously hides `<html>` if sessionStorage has a saved scroll. **Only fires on initial HTML parse** — Next.js client-side Link nav skips it. (`89bad63`)
- `ScrollRestoration` provider uses `useLayoutEffect` + a scrollHeight-stability poll: re-applies scroll on every frame that changes layout, reveals only after 4 stable frames or 1.5 s hard timeout. (`aff1a79`)
- "Back to portfolio" Links have `onClick={() => document.documentElement.style.visibility = "hidden"}` to hide synchronously before Next swaps the tree. Plus `scroll={false}` so Next doesn't compete. (`6e4b6ec`)

What still leaks:
- One frame between the `onClick` setting visibility:hidden and the actual DOM swap appears to still paint sometimes. Possibly Next is committing the new tree before the inline style attribute gets flushed.
- The browser-back path (popstate) uses bf-cache when available and bypasses React entirely — user said that path was "normal" (no flick).

Next-session ideas to try if revisiting:
- Use the `View Transitions API` (Next 16 has experimental support via `experimental.viewTransition`) — would give us synchronous old-tree-to-new-tree handoff.
- Render a full-bleed cover `<div>` instead of toggling `<html>`'s visibility — a sibling stacking-context cover may flush faster than html-level visibility.
- Move ScrollRestoration's hide into a router-event handler that fires *before* the new tree is committed, not after. Requires Next's experimental App-Router events.

### 2. Origin scrub at very narrow widths

`chapters/01-origin.tsx` runs the horizontal scrub on `lg+` only. At `lg` but with extreme browser zoom (175 %+ on a 1080p screen), the pin spacer math is tight. Already tuned (`1a27e23`, `2bf2d6d`) but if it goes off again, check `getDistance()` and the `clamp(...)` margins.

### 3. mnemo `.github/FUNDING.yml` write needs `gh` CLI

The fine-grained PAT we used twice in the previous sessions does NOT have write access to org-owned repos. To update FUNDING.yml in `mmct-jsc/mnemo`, use `gh api -X PUT repos/mmct-jsc/mnemo/contents/.github/FUNDING.yml ...` — `gh` uses the user's locally-stored authenticated session, which has the org access the PAT lacked.

### 4. Playwright MCP session artifacts

Captures via the Playwright MCP write `.yml` snapshots and console logs to `.playwright-mcp/`. That directory is gitignored (`5abdd10`). If you see those files in `git status`, they're noise — don't commit.

---

## Common operations

### Run locally
```bash
cd D:\Repository\byQuoc_portfolio
pnpm install         # if a fresh checkout
pnpm dev             # → http://localhost:3000
# OR static export build:
pnpm build           # → out/
```
`pnpm typecheck` runs `tsc --noEmit`. The `prebuild` script runs `gen-og.mjs` and `gen-mnemo-version.mjs` automatically.

### Deploy
```bash
git push origin main
# → GitHub Actions auto-runs deploy.yml, ~1-2 min to live
```
Monitor a run:
```bash
gh run watch                                    # active run in current branch
gh api "repos/QuocTranWorkspace/QuocTranWorkspace.github.io/actions/runs?per_page=1&branch=main"
```

### Add a new `/work/<slug>` deep dive
1. Append an entry to `content/work.ts` (typed: `WorkEntry`). Pattern: tagline, caption, period, role, client, problem, approach[], stack[], outcomes[], lessons[], optional images[] and links[].
2. Add the same `slug` as a `Tile` in `chapters/03-lead-arc.tsx` if you want a bento entry too. Any tile whose slug is in `workSlugs` automatically becomes a clickable Link.
3. Drop images at `public/work/<slug>/*.jpg`. Reference them in the entry's `images` array.
4. `pnpm build` → push → done. `generateStaticParams` in `app/work/[slug]/page.tsx` picks up the new slug automatically.

### Update the GitHub profile README
```bash
# rewrite locally, then:
CONTENT_B64=$(base64 -w 0 README.md)
CURRENT_SHA=$(gh api repos/QuocTranWorkspace/QuocTranWorkspace/contents/README.md --jq .sha)
gh api -X PUT repos/QuocTranWorkspace/QuocTranWorkspace/contents/README.md \
  -f "message=docs: refresh" \
  -f "content=$CONTENT_B64" \
  -f "sha=$CURRENT_SHA"
```

### Capture screenshots via Playwright MCP
The MCP server exposes `mcp__plugin_playwright_playwright__browser_*` tools. Pattern:
1. `browser_navigate` to the admin URL
2. `browser_fill_form` to log in (use real selectors from `browser_snapshot`)
3. `browser_navigate` to each page worth capturing
4. `browser_take_screenshot` with `filename: "public/work/<slug>/<name>.png"`
5. After captures: `node scripts/compress-screenshots.mjs` (PNG → JPEG, max-w 1600, q78). It auto-deletes PNGs that compress to JPEG cleanly.
6. Update `content/work.ts` to reference the new `.jpg` paths.

### Force a mnemo version refresh
The daily cron runs at 06:17 UTC. To trigger sooner:
```bash
gh workflow run deploy.yml
```
Or just push any commit — every build re-runs `gen-mnemo-version.mjs`.

---

## File map (annotated)

```
byQuoc_portfolio/
├── app/
│   ├── layout.tsx              ← root layout; SmoothScrollProvider, ToastProvider, pre-paint hide script
│   ├── page.tsx                ← composes 8 chapters; ScrollRestoration is mounted here
│   └── work/[slug]/page.tsx    ← SSG via generateStaticParams; reads content/work.ts
├── chapters/
│   ├── 00-cold-open.tsx        ← word reveal hero, magnetic CTA
│   ├── 01-origin.tsx           ← lg+ horizontal scrub via GSAP; pin spacer
│   ├── 02-crossover.tsx        ← 5-stage pipeline + SVG connector
│   ├── 03-lead-arc.tsx         ← 7-tile bento, 6 link to /work/<slug>
│   ├── 04-aibox-closeup.tsx    ← counters + scan-line on the Petrolimex frame
│   ├── 05-mnemo.tsx            ← interactive query + iframe demo embed + live version
│   ├── 06-skills.tsx           ← 8-cluster constellation
│   └── 07-coda.tsx             ← email copy + 4-link contact rail (Ko-fi included)
├── components/
│   ├── motion/
│   │   ├── Counter.tsx         ← scroll-into-view tick-up
│   │   ├── FadeUp.tsx          ← simple fade-up primitive
│   │   ├── MagneticButton.tsx  ← cursor-magnetic CTA with hash-anchor smooth scroll
│   │   └── RevealText.tsx      ← word-by-word reveal, supports *italic* markers
│   ├── nav/
│   │   └── SideDots.tsx        ← right-side chapter nav; active dot via scrollY + IO
│   ├── providers/
│   │   ├── ScrollRestoration.tsx  ← /work return restoration; useLayoutEffect + stability poll
│   │   └── SmoothScrollProvider.tsx ← Lenis ↔ GSAP ticker bridge
│   ├── ui/
│   │   └── Toast.tsx           ← email-copy toast pill
│   └── work/
│       └── WorkArticle.tsx     ← renders any WorkEntry; image gallery section
├── content/
│   └── work.ts                 ← all 6 /work entries, single source of truth
├── lib/
│   ├── fonts.ts                ← Instrument Serif + Inter + JetBrains Mono via next/font
│   ├── gsap.ts                 ← ScrollTrigger registration; idempotent
│   ├── lenis.ts                ← singleton Lenis instance; __lenis exposed on window in dev
│   ├── motion.ts               ← shared variants
│   ├── scroll-memory.ts        ← rememberHomeScroll / consumeHomeScroll (saves {chapter, offset})
│   ├── use-mnemo-version.ts    ← client-side fetch of GitHub releases/latest
│   └── utils.ts                ← cn() wrapper around clsx + tailwind-merge
├── scripts/
│   ├── compress-screenshots.mjs  ← PNG → progressive mozjpeg q78 max-w 1600
│   ├── gen-mnemo-version.mjs   ← prebuild: fetch latest mnemo tag → public/mnemo-version.json
│   └── gen-og.mjs              ← prebuild: render 1200x630 OG card → public/og.png
├── public/
│   ├── og.png                  ← committed; regenerated by prebuild
│   ├── favicon.svg
│   ├── media/
│   │   └── aibox-noibai-001.jpg ← chapter 04 hero frame
│   ├── mnemo-version.json      ← GITIGNORED; regenerated by prebuild
│   └── work/<slug>/*.jpg       ← real screenshots per deep-dive
├── styles/
│   └── globals.css             ← @theme tokens, base layer, container-edge utility, overflow-x:clip safety
├── docs/
│   ├── HANDOVER.md             ← this file
│   ├── Portfolio_Implementation_Plan.md ← original W1-W5 plan; mostly historical
│   └── Quoc_Tran_Trung_CV.md   ← reference content
└── .github/workflows/deploy.yml ← static export + upload-pages-artifact + deploy-pages on push/cron
```

---

## Open ideas for future sessions

In priority order if the user asks "what should we do next":

1. **Kill the residual back-link flick** (View Transitions API attempt). Outline above under *Known issues #1*.
2. **OG image per /work route** — currently one site-wide card. `app/work/[slug]/opengraph-image.tsx` would give each deep-dive its own social card. Constrained by static export — each one must be pre-generated.
3. **Lighthouse pass** — last full audit was at W5 ship-readiness. With the new /work routes and gallery images, worth a re-run, especially LCP on heavy chapters (04 with the Jetson frame).
4. **Better mobile origin chapter** — the horizontal scrub falls back to vertical stack on `<lg`. Could pin a smaller carousel for tablet (md range).
5. **Custom domain** — currently `quoctranworkspace.github.io`. If the user registers `quoctran.dev` or similar, point an `A` record + add `CNAME` file to `public/` and update `metadataBase` in `app/layout.tsx`.

---

## Quick sanity checks before any deploy

```bash
pnpm typecheck      # must be clean
pnpm build          # must succeed; check route table at the end
```

After deploy, smoke test on the live site:
```bash
curl -sL -o /dev/null -w "HTTP %{http_code}\n" https://quoctranworkspace.github.io/
curl -sL -o /dev/null -w "HTTP %{http_code}\n" https://quoctranworkspace.github.io/work/aibox/
curl -sL -o /dev/null -w "HTTP %{http_code}\n" https://quoctranworkspace.github.io/mnemo-version.json
```
All three should be `200`. The `mnemo-version.json` should contain a recent `tag_name`.

---

## Session-close state (2026-05-21)

- All 30 tasks from this round are completed or accepted-as-is.
- The site is live, deploys auto-update.
- The Ko-fi link is wired in three surfaces and shown to be reachable.
- The single remaining known issue is the back-link 1-frame flick (user tolerated).
- All temporary creds the user pasted in chat have been used and should be revoked by now.

Hand off clean.
