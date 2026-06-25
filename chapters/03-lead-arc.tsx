"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { strings, format } from "@/content/strings";
import { works, workSlugs } from "@/content/work";
import { t, type LocalizedText } from "@/lib/i18n";
import { showRouteLoader } from "@/lib/route-loader";
import { rememberHomeScroll } from "@/lib/scroll-memory";
import { cn } from "@/lib/utils";

type Tile = {
  slug: keyof typeof strings.leadArc.tiles;
  name: string;
  tagline: LocalizedText;
  stack: string[];
  span?: "wide" | "tall" | "default";
};

// Tile metadata that does NOT translate (brand name, stack, layout span).
// Translations are pulled from strings.leadArc.tiles[slug] in render.
const tileMeta: Tile[] = [
  {
    slug: "aicloud",
    name: "AICloud",
    tagline: strings.leadArc.tiles.aicloud,
    stack: ["NestJS", "Prisma", "React 19", "React Native"],
    span: "wide",
  },
  {
    slug: "aibox",
    name: "AIBox",
    tagline: strings.leadArc.tiles.aibox,
    stack: ["FastAPI", "PyTorch", "Ultralytics YOLO", "pgvector", "Jetson"],
  },
  {
    slug: "unlimit",
    name: "Unlimit",
    tagline: strings.leadArc.tiles.unlimit,
    stack: ["Node.js", "Express", "Sequelize", "Redis", "Bull", "React 19", "TanStack"],
  },
  {
    slug: "swisslife",
    name: "Swisslife",
    tagline: strings.leadArc.tiles.swisslife,
    stack: ["Microservices", "Kong", "NATS JetStream", "Postgres", "Mongo", "Twilio", "Grafana"],
    span: "tall",
  },
  {
    slug: "keanu",
    name: "Keanu Residences",
    tagline: strings.leadArc.tiles.keanu,
    stack: ["NestJS", "Prisma", "Postgres", "Redis", "Stripe", "Socket.io", "React 19"],
  },
  {
    slug: "ham-cap",
    name: "ham-cap",
    tagline: strings.leadArc.tiles["ham-cap"],
    stack: ["NestJS", "Postgres", "MinIO", "Docker Compose"],
  },
];

const spanClass: Record<NonNullable<Tile["span"]>, string> = {
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  default: "",
};

const headerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const tileContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const tileItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const viewportOpts = { once: true, amount: 0.15 };

export function LeadArc() {
  const { locale } = useLocale();
  const s = strings.leadArc;
  const wa = strings.workArticle;

  return (
    <section
      id="chapter-3"
      data-chapter="lead-arc"
      className={cn("chapter container-edge py-24")}
    >
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={headerVariants}
        className="mb-12 max-w-3xl space-y-3"
      >
        <motion.p
          variants={headerItem}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          {t(s.eyebrow, locale)}
        </motion.p>
        <motion.h2
          variants={headerItem}
          className="font-display text-5xl md:text-7xl text-balance"
        >
          {t(s.headline, locale)}
        </motion.h2>
        <motion.p variants={headerItem} className="text-ink-mute text-lg max-w-2xl">
          {t(s.subtitle, locale)}
        </motion.p>
      </motion.header>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={tileContainer}
        className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[18rem]"
      >
        {tileMeta.map((tile) => {
          const hasDeepDive = workSlugs.includes(tile.slug);
          // First live screenshot for this project, if any — fed to the
          // custom cursor's floating hover preview (CursorFx reads
          // data-preview-src). Tiles without a gallery (swisslife, ham-cap)
          // simply show the "View" label with no image.
          const previewSrc = works[tile.slug]?.images?.[0]?.src;
          const inner = (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-accent/10 group-hover:to-accent/0 group-hover:opacity-100"
              />
              <div className="relative space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-3xl">{tile.name}</h3>
                  {hasDeepDive ? (
                    <ArrowUpRight
                      className="size-5 shrink-0 text-ink-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <p className="text-ink-mute text-sm leading-relaxed">
                  {t(tile.tagline, locale)}
                </p>
              </div>
              <ul className="relative mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-ink-mute">
                {tile.stack.map((s) => (
                  <li key={s} className="transition-colors group-hover:text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </>
          );
          return (
            <motion.li
              key={tile.slug}
              variants={tileItem}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl border rule bg-bg-elev/60 transition-colors hover:border-accent/50 hover:bg-bg-elev",
                spanClass[tile.span ?? "default"],
              )}
            >
              {hasDeepDive ? (
                <Link
                  href={`/work/${tile.slug}`}
                  onClick={() => {
                    rememberHomeScroll();
                    showRouteLoader();
                  }}
                  data-cursor="view"
                  data-preview-src={previewSrc}
                  aria-label={format(t(wa.deepDiveAria, locale), { name: tile.name })}
                  className="flex h-full flex-col justify-between p-6 focus-visible:outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  {inner}
                </Link>
              ) : (
                <div className="flex h-full flex-col justify-between p-6">{inner}</div>
              )}
            </motion.li>
          );
        })}

        <motion.li
          variants={tileItem}
          whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
          aria-hidden
          className={cn(
            "group relative flex items-center justify-center rounded-2xl border border-dashed rule bg-transparent p-6",
            "transition-colors hover:border-accent/40",
          )}
        >
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-ink-mute transition-colors group-hover:text-accent">
            {t(s.moreTile, locale)}
          </span>
        </motion.li>
      </motion.ul>
    </section>
  );
}
