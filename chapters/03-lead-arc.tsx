"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { workSlugs } from "@/content/work";
import { rememberHomeScroll } from "@/lib/scroll-memory";
import { cn } from "@/lib/utils";

type Tile = {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  span?: "wide" | "tall" | "default";
};

const tiles: Tile[] = [
  {
    slug: "aibox",
    name: "AIBox",
    tagline:
      "Production multi-camera surveillance on NVIDIA Jetson — 10+ YOLO models (helmet / oil-spill / smoke / plate / face), real-time WebRTC/RTSP/MJPEG, 50+ REST endpoints across 9 routers.",
    stack: ["FastAPI", "PyTorch", "Ultralytics YOLO", "pgvector", "FaceNet", "Jetson"],
    span: "wide",
  },
  {
    slug: "aicloud",
    name: "AICloud",
    tagline:
      "Multi-tenant SaaS to manage AIBox fleets. Web dashboard + companion mobile app, RBAC across four roles, automated Ubuntu deploys, full DB seeding pipeline.",
    stack: ["NestJS", "Prisma", "React 19", "React Native"],
  },
  {
    slug: "unlimit",
    name: "Unlimit",
    tagline:
      "Multi-tenant WhatsApp integration platform. Express + Sequelize backend with a separate worker, Bull queues on Redis, granular permissions matrix, MinIO + Mailhog dev stack.",
    stack: ["Node.js", "Express", "Sequelize", "Redis", "Bull", "React 19", "TanStack"],
  },
  {
    slug: "swisslife",
    name: "Swisslife",
    tagline:
      "Microservices platform behind a Kong gateway: auth, config, envoi, recipient, audit, email. NATS JetStream messaging, full observability stack, Postgres + ElasticSearch + MinIO storage.",
    stack: ["Microservices", "Kong", "NATS JetStream", "Postgres", "ElasticSearch", "Jaeger", "Prometheus"],
    span: "tall",
  },
  {
    slug: "keanu",
    name: "Keanu",
    tagline:
      "Reservation / booking system with a Gemini-powered intelligence layer. React 19 + Vite frontend, NestJS backend with a dedicated reservations module.",
    stack: ["React 19", "Vite", "NestJS", "Gemini"],
  },
  {
    slug: "ham-cap",
    name: "ham-cap",
    tagline:
      "AIBox sibling for sensor-data deployments. NestJS cloud backend, Postgres + MinIO, automated Ubuntu provisioning script, Docker Compose stack.",
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
          Chapter 03 · Lead arc · PathTech, Jul 2025 → present
        </motion.p>
        <motion.h2
          variants={headerItem}
          className="font-display text-5xl md:text-7xl text-balance"
        >
          Six months in, I was leading the AI + cloud workstreams.
        </motion.h2>
        <motion.p variants={headerItem} className="text-ink-mute text-lg max-w-2xl">
          Promoted to Technical Lead in December. I own architecture, code
          review, roadmap, and on-call rituals across the surfaces below.
        </motion.p>
      </motion.header>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={tileContainer}
        className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[18rem]"
      >
        {tiles.map((t) => {
          const hasDeepDive = workSlugs.includes(t.slug);
          // A tile is interactive when it links to a /work page; otherwise it
          // stays a static <li> so we don't promise a destination that 404s.
          const inner = (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-accent/5 group-hover:to-accent/0 group-hover:opacity-100"
              />
              <div className="relative space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-3xl">{t.name}</h3>
                  {hasDeepDive ? (
                    <ArrowUpRight
                      className="size-5 shrink-0 text-ink-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <p className="text-ink-mute text-sm leading-relaxed">
                  {t.tagline}
                </p>
              </div>
              <ul className="relative mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-ink-mute">
                {t.stack.map((s) => (
                  <li key={s} className="transition-colors group-hover:text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </>
          );
          return (
            <motion.li
              key={t.slug}
              variants={tileItem}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl border rule bg-bg-elev/60 transition-colors hover:border-accent/40 hover:bg-bg-elev",
                spanClass[t.span ?? "default"],
              )}
            >
              {hasDeepDive ? (
                <Link
                  href={`/work/${t.slug}`}
                  onClick={rememberHomeScroll}
                  aria-label={`Read the ${t.name} deep dive`}
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
            and many more&hellip;
          </span>
        </motion.li>
      </motion.ul>
    </section>
  );
}
