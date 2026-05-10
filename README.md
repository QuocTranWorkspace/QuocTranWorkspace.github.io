# byQuoc — portfolio

Cinematic portfolio for **Quoc Tran Trung**. Single long page, eight chapters, scroll-jacked transitions, restrained surface with one mint accent.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind v4 (`@theme` tokens in CSS)
- GSAP + ScrollTrigger — scene direction
- Lenis — smooth-scroll inertia
- Framer Motion — component motion
- Vercel — hosting (later)

## Run locally

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Layout

```
app/         routes + layout shell
chapters/    one component per chapter (00-07)
components/  motion primitives, ui, data widgets
content/     MDX (deep dives, posts) — later
lib/         lenis, gsap, motion, utils
public/      static media
styles/      globals.css with @theme tokens
docs/        plan + CV (read-only reference)
```

## Status

Foundation + chapter shells (W1-W2 of the implementation plan). See [docs/Portfolio_Implementation_Plan.md](docs/Portfolio_Implementation_Plan.md) for the full roadmap.
