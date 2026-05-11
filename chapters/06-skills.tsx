"use client";

import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SkillGroup = {
  label: string;
  items: string[];
};

const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "Go 1.25", "TypeScript", "Java", "PHP", "C#"],
  },
  {
    label: "Backend",
    items: ["FastAPI", "NestJS", "Spring Boot", "Laravel", "Express"],
  },
  {
    label: "Frontend",
    items: ["React", "React Native", "Vue 3", "Tailwind"],
  },
  {
    label: "AI / ML",
    items: [
      "YOLO v8/v11",
      "FaceNet / MTCNN",
      "pgvector",
      "Llama 3.1",
      "OpenAI + Whisper",
      "sentence-transformers",
    ],
  },
  {
    label: "Data",
    items: [
      "PostgreSQL",
      "MySQL",
      "SQLite + sqlite-vec",
      "MongoDB",
      "Redis",
      "Prisma",
      "GORM",
    ],
  },
  {
    label: "Infra",
    items: [
      "Docker",
      "Kubernetes (GKE)",
      "Nginx",
      "HAProxy",
      "MediaMTX RTSP",
      "Terraform",
    ],
  },
  {
    label: "Edge / IoT",
    items: ["NVIDIA Jetson (CUDA 12.8)", "RTSP", "WebRTC", "WebSocket"],
  },
  {
    label: "Architecture",
    items: [
      "Clean Architecture",
      "DDD",
      "Microservices",
      "Event-driven",
      "Multi-tenant SaaS",
      "Local-first",
    ],
  },
];

// Hand-picked cross-group edges — pairs of group indices that often co-occur in
// the projects on this site (AIBox, mnemo, Swisslife, Keanu, etc.). Drawn as
// soft curves behind the cards so the surface feels like a graph, not a grid.
const EDGES: Array<[number, number]> = [
  [0, 1], // Languages -> Backend
  [1, 4], // Backend -> Data
  [4, 5], // Data -> Infra
  [5, 6], // Infra -> Edge / IoT
  [3, 4], // AI / ML -> Data (pgvector / sqlite-vec)
  [3, 6], // AI / ML -> Edge / IoT (Jetson)
  [1, 7], // Backend -> Architecture
  [2, 1], // Frontend -> Backend
  [7, 5], // Architecture -> Infra
  [0, 3], // Languages -> AI / ML
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const viewportOpts = { once: true, amount: 0.2 };

// Position each group on a unit grid (4 cols × 2 rows). x in [0,3], y in [0,1].
// Converted to viewBox coords later.
const POS: Array<{ x: number; y: number }> = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
];

const VIEW_W = 400;
const VIEW_H = 200;

function gridToView(g: { x: number; y: number }) {
  // Center of each cell in the 4×2 grid.
  return {
    cx: (g.x + 0.5) * (VIEW_W / 4),
    cy: (g.y + 0.5) * (VIEW_H / 2),
  };
}

export function Skills() {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  const isEdgeActive = (a: number, b: number) =>
    activeGroup === null || activeGroup === a || activeGroup === b;

  return (
    <section
      id="chapter-6"
      data-chapter="skills"
      className={cn("chapter container-edge py-24")}
    >
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={containerVariants}
        className="mb-14 max-w-3xl space-y-3"
      >
        <motion.p
          variants={cardVariants}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          Chapter 06 · Constellation
        </motion.p>
        <motion.h2
          variants={cardVariants}
          className="font-display text-5xl md:text-7xl text-balance"
        >
          Tools I reach for, grouped by where they live in the stack.
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className="text-ink-mute text-sm max-w-xl"
        >
          Hover a cluster to see the edges that link it to the rest of the
          stack — these are the typical seams the projects on this site cross.
        </motion.p>
      </motion.header>

      <div className="relative">
        {/* SVG connector layer — drawn behind the cards so edges visibly bridge
            adjacent clusters. preserveAspectRatio:'none' so the curves stretch
            with the card grid. */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="edge-gradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#6CE5C7" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6CE5C7" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {EDGES.map(([a, b], i) => {
            const pa = POS[a];
            const pb = POS[b];
            if (!pa || !pb) return null;
            const A = gridToView(pa);
            const B = gridToView(pb);
            // Quadratic curve with a midpoint nudged perpendicular to AB so
            // the line bows away from the straight chord (more "constellation"
            // less "geometric grid").
            const mx = (A.cx + B.cx) / 2;
            const my = (A.cy + B.cy) / 2;
            const dx = B.cx - A.cx;
            const dy = B.cy - A.cy;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;
            const bow = 12;
            const ctrlX = mx + nx * bow;
            const ctrlY = my + ny * bow;
            const path = `M ${A.cx} ${A.cy} Q ${ctrlX} ${ctrlY} ${B.cx} ${B.cy}`;
            const active = isEdgeActive(a, b);
            return (
              <motion.path
                key={i}
                d={path}
                fill="none"
                stroke="url(#edge-gradient)"
                strokeWidth={0.6}
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{
                  pathLength: 1,
                  opacity: active ? 1 : 0.15,
                  transition: {
                    pathLength: {
                      duration: 1.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.3 + i * 0.08,
                    },
                    opacity: { duration: 0.3 },
                  },
                }}
                viewport={viewportOpts}
                animate={{ opacity: active ? 1 : 0.15 }}
              />
            );
          })}
        </svg>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          variants={containerVariants}
          className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillGroups.map((g, i) => {
            const isActive = activeGroup === i;
            const isDimmed = activeGroup !== null && !isActive;
            return (
              <motion.section
                key={g.label}
                variants={cardVariants}
                onMouseEnter={() => setActiveGroup(i)}
                onMouseLeave={() => setActiveGroup(null)}
                onFocus={() => setActiveGroup(i)}
                onBlur={() => setActiveGroup(null)}
                tabIndex={0}
                aria-label={`${g.label} skills cluster`}
                className={cn(
                  "group relative rounded-2xl border rule bg-bg-elev/70 p-6 backdrop-blur-sm transition-all duration-500",
                  "focus-visible:outline-none focus-visible:border-accent/60",
                  isActive && "border-accent/50 bg-bg-elev",
                  isDimmed && "opacity-45",
                )}
              >
                {/* Cluster index node — visually anchors the SVG edges */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -top-2 left-6 inline-flex h-5 items-center gap-2 rounded-full border rule bg-bg px-2 font-mono text-[10px] uppercase tracking-widest transition-colors",
                    isActive ? "text-accent border-accent/60" : "text-ink-mute",
                  )}
                >
                  <span className="size-1.5 rounded-full bg-current" />
                  {String(i).padStart(2, "0")}
                </span>

                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-ink-mute mb-4 mt-2">
                  {g.label}
                </h3>
                <ul className="space-y-1.5">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className={cn(
                        "font-display text-lg transition-colors",
                        isActive ? "text-ink" : "text-ink/90",
                      )}
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.section>
            );
          })}
        </motion.div>
      </div>

      <p className="mt-10 max-w-2xl text-ink-mute text-sm">
        Each thin curve marks a seam between clusters that show up together in
        the projects above — Languages ↔ Backend, AI/ML ↔ Edge, Backend ↔ Data,
        and so on. Reduced-motion users see the same layout without the draw-in.
      </p>
    </section>
  );
}
