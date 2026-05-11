"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { WorkEntry } from "@/content/work";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const viewportOpts = { once: true, amount: 0.25 };

export function WorkArticle({ entry }: { entry: WorkEntry }) {
  return (
    <article className="container-edge py-16 lg:py-24">
      <Link
        href="/#chapter-3"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-mute transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back to portfolio
      </Link>

      <motion.header
        initial="hidden"
        animate="visible"
        variants={container}
        className="mt-10 max-w-3xl space-y-4"
      >
        <motion.p
          variants={item}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          {entry.caption}
        </motion.p>
        <motion.h1
          variants={item}
          className="font-display text-balance text-5xl md:text-7xl leading-[0.95]"
        >
          {entry.name}
        </motion.h1>
        <motion.p
          variants={item}
          className="text-ink-mute text-lg max-w-2xl text-balance"
        >
          {entry.tagline}
        </motion.p>
        <motion.dl
          variants={item}
          className="grid gap-x-10 gap-y-3 pt-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            ["Period", entry.period],
            ["Role", entry.role],
            ["Client", entry.client],
          ].map(([label, value]) => (
            <div key={label} className="space-y-1">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                {label}
              </dt>
              <dd className="font-mono text-xs text-ink">{value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.header>

      {/* Outcomes — big numbers up front */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={container}
        className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
      >
        {entry.outcomes.map((o) => (
          <motion.div key={o.label} variants={item} className="space-y-2">
            <p className="stat text-3xl md:text-4xl text-accent">{o.value}</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-mute">
              {o.label}
            </p>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={container}
        className="mt-20 grid gap-10 lg:grid-cols-[1fr_2fr]"
      >
        <motion.h2
          variants={item}
          className="font-mono text-xs uppercase tracking-[0.3em] text-ink-mute"
        >
          Problem
        </motion.h2>
        <motion.p
          variants={item}
          className="font-display text-2xl md:text-3xl leading-snug text-ink text-balance"
        >
          {entry.problem}
        </motion.p>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={container}
        className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr]"
      >
        <motion.h2
          variants={item}
          className="font-mono text-xs uppercase tracking-[0.3em] text-ink-mute"
        >
          Approach
        </motion.h2>
        <ol className="space-y-4 list-none">
          {entry.approach.map((step, i) => (
            <motion.li
              key={i}
              variants={item}
              className="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 rounded-xl border rule bg-bg-elev/40 p-5"
            >
              <span className="stat text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-ink text-base leading-relaxed">{step}</p>
            </motion.li>
          ))}
        </ol>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={container}
        className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr]"
      >
        <motion.h2
          variants={item}
          className="font-mono text-xs uppercase tracking-[0.3em] text-ink-mute"
        >
          Stack
        </motion.h2>
        <motion.ul
          variants={item}
          className="flex flex-wrap gap-2"
        >
          {entry.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border rule px-3 py-1 font-mono text-xs text-ink"
            >
              {s}
            </li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={container}
        className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr]"
      >
        <motion.h2
          variants={item}
          className="font-mono text-xs uppercase tracking-[0.3em] text-ink-mute"
        >
          Lessons
        </motion.h2>
        <ul className="space-y-4">
          {entry.lessons.map((l, i) => (
            <motion.li
              key={i}
              variants={item}
              className={cn(
                "border-l-2 pl-5 italic font-display text-xl md:text-2xl leading-snug text-ink/90",
                "border-accent/50",
              )}
            >
              {l}
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {entry.links && entry.links.length > 0 ? (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOpts}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-wrap gap-3"
        >
          {entry.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-accent/40 bg-bg-elev px-5 py-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              {l.label} →
            </a>
          ))}
        </motion.section>
      ) : null}

      <footer className="mt-20 border-t rule pt-8">
        <Link
          href="/#chapter-3"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-mute transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to all work
        </Link>
      </footer>
    </article>
  );
}
