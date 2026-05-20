"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const pipelineStages = [
  { id: "01", label: "Video", note: "Source ingestion" },
  { id: "02", label: "Analysis", note: "OpenAI + YouTube APIs" },
  { id: "03", label: "Ideation", note: "Topic + angle generation" },
  { id: "04", label: "Script", note: "Long-form narrative" },
  { id: "05", label: "Storyboard", note: "Shot list + thumbnails" },
];

const stageContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const stageItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineVariant: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.4,
    },
  },
};

const viewportOpts = { once: true, amount: 0.35 };

export function Crossover() {
  return (
    <section
      id="chapter-2"
      data-chapter="crossover"
      className={cn("chapter container-edge py-24")}
    >
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={stageContainer}
        className="mb-12 max-w-3xl space-y-3"
      >
        <motion.p
          variants={stageItem}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          Chapter 02 · Crossover · Mar — Jul 2025
        </motion.p>
        <motion.h2
          variants={stageItem}
          className="font-display text-5xl md:text-7xl text-balance"
        >
          Bitsness gave me my first AI automation gig.
        </motion.h2>
        <motion.p
          variants={stageItem}
          className="text-ink-mute text-lg max-w-2xl text-balance"
        >
          The platform ran a YouTube channel&rsquo;s next video through five
          automated stages — research, ideation, scripting, storyboard,
          finishing — before a human editor ever opened it. My job was the
          backend pipeline that orchestrated it, the security around access,
          and the deploy pipeline that took it from laptop to staging.
        </motion.p>
      </motion.header>

      <div className="relative">
        {/* Connector — drawn left-to-right behind the stage cards on lg+ */}
        <motion.svg
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-[3rem] hidden h-px lg:block"
          width="100%"
          height="2"
          preserveAspectRatio="none"
          viewBox="0 0 100 2"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
        >
          <motion.line
            x1="0"
            y1="1"
            x2="100"
            y2="1"
            stroke="currentColor"
            strokeWidth="1"
            className="text-accent/40"
            variants={lineVariant}
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
        </motion.svg>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          variants={stageContainer}
          className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {pipelineStages.map((s) => (
            <motion.li
              key={s.id}
              variants={stageItem}
              className="group relative rounded-xl border rule bg-bg-elev/60 p-6 backdrop-blur-sm transition-colors hover:border-accent/40"
            >
              <span className="stat text-xs text-ink-mute">{s.id}</span>
              <h3 className="mt-4 font-display text-2xl">{s.label}</h3>
              <p className="mt-2 text-sm text-ink-mute">{s.note}</p>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-accent/0 transition-all duration-500 group-hover:ring-accent/30"
              />
            </motion.li>
          ))}
        </motion.ol>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOpts}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        className="mt-12 max-w-2xl text-ink-mute text-base"
      >
        I led the backend split — modular NestJS services, repository pattern,
        role-based guards — and built the GitLab pipelines that took it from
        laptop to staging.
      </motion.p>
    </section>
  );
}
