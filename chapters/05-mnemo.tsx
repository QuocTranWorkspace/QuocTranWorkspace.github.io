"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { useMnemoVersion } from "@/lib/use-mnemo-version";
import { cn } from "@/lib/utils";

// ---------- Mock corpus & scoring (mirrors mnemo's six-term retrieval) ----------

type MemoryNode = {
  id: string;
  name: string;
  type: "memory_project" | "memory_feedback" | "memory_user" | "project_doc";
  description: string;
  // 0..1, larger = more recent
  recency: number;
  // tags used for graph-similarity heuristics
  tags: string[];
  // optional project scope match
  project?: string;
};

const corpus: MemoryNode[] = [
  {
    id: "mnemo-built",
    name: "mnemo-built",
    type: "memory_project",
    description:
      "mnemo (local-first knowledge memory for Claude Code) shipped through v1.1.0 — architecture, six-term scoring, plugin install flow.",
    recency: 0.95,
    tags: ["mnemo", "scoring", "rag", "fastapi", "sqlite"],
    project: "mnemo",
  },
  {
    id: "mnemo-alpine-gotchas",
    name: "mnemo-alpine-gotchas",
    type: "memory_feedback",
    description:
      "Three Alpine.js + browser pitfalls on the mnemo UI: x-data races, click bindings, transitions clobbering state.",
    recency: 0.7,
    tags: ["alpine", "ui", "mnemo", "frontend"],
    project: "mnemo",
  },
  {
    id: "starlette-middleware-order",
    name: "starlette-middleware-order",
    type: "memory_feedback",
    description:
      "Starlette runs the LAST add_middleware OUTERMOST. Outer middleware sees responses from inner short-circuits.",
    recency: 0.6,
    tags: ["starlette", "fastapi", "middleware", "python"],
  },
  {
    id: "petrolimex-aibox",
    name: "aibox-petrolimex",
    type: "memory_project",
    description:
      "Edge AI multi-camera surveillance on Jetson for Petrolimex Aviation — helmet / oil-spill / smoke / plate / face YOLO models.",
    recency: 0.85,
    tags: ["aibox", "yolo", "jetson", "edge", "rtsp"],
    project: "aibox",
  },
  {
    id: "swisslife-nats",
    name: "swisslife-nats-jetstream",
    type: "memory_project",
    description:
      "Swisslife microservices behind Kong, NATS JetStream messaging, full observability stack with Jaeger + Prometheus + Grafana.",
    recency: 0.75,
    tags: ["microservices", "nats", "kong", "swisslife"],
    project: "swisslife",
  },
  {
    id: "mnemo-release-workflow",
    name: "mnemo-release-workflow",
    type: "memory_feedback",
    description:
      "PR-only release workflow for mmct-jsc/mnemo: push to release/<ver>, open PR, merge in web UI — main is branch-protected.",
    recency: 0.5,
    tags: ["mnemo", "release", "ci", "github"],
    project: "mnemo",
  },
];

const stopWords = new Set([
  "the",
  "a",
  "an",
  "of",
  "to",
  "in",
  "on",
  "for",
  "and",
  "or",
  "is",
  "are",
  "how",
  "do",
  "i",
  "with",
  "what",
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !stopWords.has(t));
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

type Scored = {
  node: MemoryNode;
  total: number;
  terms: Record<string, number>;
};

const WEIGHTS = {
  vector: 0.4,
  graph: 0.15,
  recency: 0.1,
  type: 0.1,
  project: 0.05,
  lexical: 0.2,
} as const;

// Score one node against a query — returns each term's contribution and total.
function scoreNode(query: string, node: MemoryNode): Scored {
  const qTokens = tokenize(query);
  const qSet = new Set(qTokens);
  const nodeText = `${node.name} ${node.description}`.toLowerCase();
  const nTokens = tokenize(nodeText);
  const nSet = new Set(nTokens);

  // "Vector similarity" — Jaccard over tokens as a fast stand-in for cosine.
  const vector = jaccard(qSet, nSet);

  // "Typed-edge graph" — overlap with tags.
  const tagSet = new Set(node.tags);
  const graph = jaccard(qSet, tagSet);

  // Recency baked into the node, scaled to 0..1.
  const recency = node.recency;

  // Type bias — feedback wins on "how-to" queries, project memory wins on
  // architecture / what-is queries.
  const lowered = query.toLowerCase();
  const wantsHow = /\b(how|why|workflow|gotcha|fix|debug)\b/.test(lowered);
  const wantsArch = /\b(architecture|build|stack|model|system|graph|scoring)\b/.test(lowered);
  const type =
    wantsHow && node.type === "memory_feedback"
      ? 1
      : wantsArch && node.type === "memory_project"
        ? 1
        : 0.3;

  // Project — does the query mention the node's project name?
  const project = node.project && lowered.includes(node.project) ? 1 : 0;

  // Lexical overlap — count exact substring matches of query tokens in name+description.
  const lexicalHits =
    qTokens.filter((t) => nodeText.includes(t)).length / Math.max(qTokens.length, 1);
  const lexical = lexicalHits;

  const terms = { vector, graph, recency, type, project, lexical };
  const total =
    vector * WEIGHTS.vector +
    graph * WEIGHTS.graph +
    recency * WEIGHTS.recency +
    type * WEIGHTS.type +
    project * WEIGHTS.project +
    lexical * WEIGHTS.lexical;

  return { node, total, terms };
}

function aggregateTerms(scored: Scored[]): Record<string, number> {
  // For the breakdown bars, show the AVERAGE contribution of each term across
  // the top hits — gives the user a feel for which term carried the recall.
  const top = scored.slice(0, 3);
  if (top.length === 0) {
    return { vector: 0, graph: 0, recency: 0, type: 0, project: 0, lexical: 0 };
  }
  const sums: Record<string, number> = {
    vector: 0,
    graph: 0,
    recency: 0,
    type: 0,
    project: 0,
    lexical: 0,
  };
  for (const s of top) {
    for (const k of Object.keys(sums)) {
      sums[k]! += s.terms[k] ?? 0;
    }
  }
  for (const k of Object.keys(sums)) {
    sums[k]! /= top.length;
  }
  return sums;
}

// ---------- Static content ----------

const SCORE_TERMS_META = [
  { key: "vector", weight: WEIGHTS.vector, label: "Vector similarity" },
  { key: "graph", weight: WEIGHTS.graph, label: "Typed-edge graph" },
  { key: "recency", weight: WEIGHTS.recency, label: "Recency (90d half-life)" },
  { key: "type", weight: WEIGHTS.type, label: "Memory type bias" },
  { key: "project", weight: WEIGHTS.project, label: "Project scope" },
  { key: "lexical", weight: WEIGHTS.lexical, label: "Lexical overlap" },
];

const stats = [
  { value: "100%", label: "top-1 accuracy" },
  { value: "1.000", label: "MRR" },
  { value: "17 ms", label: "median query" },
  { value: "≤ 800", label: "tokens injected per prompt" },
];

const SUGGESTIONS = [
  "how does the scoring work",
  "alpine gotchas",
  "edge AI detection on jetson",
  "release workflow",
];

const DEFAULT_QUERY = "how does the scoring work";

// ---------- Component ----------

export function Mnemo() {
  const mnemo = useMnemoVersion();
  const [query, setQuery] = useState(DEFAULT_QUERY);
  // Deferring keeps typing snappy while letting the heavier scoring math
  // settle a frame behind. (No real perf cost here — the corpus is tiny —
  // but matches the actual mnemo daemon's debounced re-query feel.)
  const deferredQuery = useDeferredValue(query);

  const { hits, termAverages } = useMemo(() => {
    const scored = corpus
      .map((node) => scoreNode(deferredQuery, node))
      .sort((a, b) => b.total - a.total)
      // Drop near-zero matches so empty queries don't render six fake hits.
      .filter((s) => s.total > 0.04);
    return {
      hits: scored.slice(0, 3),
      termAverages: aggregateTerms(scored),
    };
  }, [deferredQuery]);

  // Each bar's fill = average term contribution (0..1) normalized against
  // the maximum across all terms so the strongest bar always fills its track.
  const maxTerm = Math.max(0.001, ...Object.values(termAverages));

  return (
    <section
      id="chapter-5"
      data-chapter="mnemo"
      className={cn("chapter relative py-24")}
    >
      <div className="container-edge">
        <header className="mb-10 max-w-3xl space-y-3">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.3em] text-accent-warm">
            <span>Chapter 05 · mnemo</span>
            <a
              href="https://github.com/mmct-jsc/mnemo/releases"
              target="_blank"
              rel="noopener noreferrer"
              title={
                mnemo.live
                  ? "Live from GitHub releases"
                  : "Build-time version (GitHub API unreachable)"
              }
              className="inline-flex items-center gap-1.5 rounded-full border border-accent-warm/40 px-2 py-0.5 normal-case tracking-normal text-accent-warm transition-colors hover:bg-accent-warm hover:text-bg"
            >
              <span
                className={cn(
                  "size-1.5 rounded-full bg-accent-warm",
                  mnemo.live && "animate-pulse",
                )}
                aria-hidden
              />
              {mnemo.version} published
            </a>
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-balance">
            <span className="italic text-accent-warm">A memory layer</span> that
            makes Claude Code remember what you&rsquo;ve already taught it.
          </h2>
          <p className="text-ink-mute text-lg max-w-2xl text-balance">
            Local-first daemon on 127.0.0.1:7373. Hybrid Graph-RAG, six-term
            scoring, sentence-transformers MiniLM embeddings, SQLite + sqlite-vec
            store. Ships a versioned protocol, a VS Code extension, and
            provider-shim middleware for OpenAI / Anthropic / Google / Ollama —
            and keeps shipping (version above is live from GitHub).
          </p>
        </header>

        {/* Interactive query — drives the breakdown bars + hit list below */}
        <div className="mb-8 max-w-2xl">
          <label className="sr-only" htmlFor="mnemo-query">
            Try a mnemo query
          </label>
          <div className="group flex items-center gap-3 rounded-xl border rule bg-bg-elev/60 px-4 py-3 transition-colors focus-within:border-accent-warm/60">
            <Search className="size-4 shrink-0 text-ink-mute" aria-hidden />
            <input
              id="mnemo-query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try a query against a six-node mock corpus…"
              className="flex-1 bg-transparent font-mono text-sm text-ink placeholder:text-ink-mute focus:outline-none"
              autoComplete="off"
              spellCheck="false"
            />
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest text-ink-mute">
              live
            </span>
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => setQuery(s)}
                  className={cn(
                    "rounded-full border rule px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors",
                    "hover:border-accent-warm/40 hover:text-accent-warm",
                    query === s
                      ? "border-accent-warm/50 text-accent-warm"
                      : "text-ink-mute",
                  )}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 md:gap-8 md:grid-cols-[1.2fr_1fr] md:items-stretch">
          <div className="flex flex-col rounded-2xl border rule bg-bg-elev/60 p-6 sm:p-8">
            <div className="mb-6 flex items-baseline justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-mute">
                Scoring breakdown
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                avg of top {hits.length || 0}
              </p>
            </div>
            <ul className="flex flex-1 flex-col justify-between gap-3">
              {SCORE_TERMS_META.map((t) => {
                const contribution = termAverages[t.key] ?? 0;
                const fill = (contribution / maxTerm) * 100;
                return (
                  <li
                    key={t.key}
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)_3rem] items-center gap-3 sm:grid-cols-[3rem_minmax(0,1fr)_5rem] sm:gap-4 lg:grid-cols-[3rem_minmax(0,1fr)_7rem]"
                  >
                    <span className="stat text-xs">{t.weight.toFixed(2)}</span>
                    <span className="font-mono text-xs sm:text-sm text-ink">
                      {t.label}
                    </span>
                    <span
                      aria-hidden
                      className="h-1 w-full overflow-hidden rounded-full bg-rule"
                    >
                      <span
                        className="block h-full rounded-full bg-accent-warm/70 transition-[width] duration-500 ease-out"
                        style={{ width: `${fill}%` }}
                      />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="grid h-full grid-cols-2 grid-rows-2 gap-4">
            {stats.map((s) => (
              <li
                key={s.label}
                className="flex flex-col justify-center rounded-2xl border rule bg-bg-elev/60 p-5 sm:p-6"
              >
                <p className="stat text-2xl sm:text-3xl text-accent-warm">
                  {s.value}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ink-mute">
                  {s.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Top-3 hits — animate in/out as the query changes */}
        <div className="mt-8 rounded-2xl border rule bg-bg-elev/30 p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-mute mb-4">
            Top hits
          </p>
          <AnimatePresence mode="popLayout" initial={false}>
            {hits.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-sm text-ink-mute"
              >
                No nodes scored above threshold. Try a more specific term.
              </motion.p>
            ) : (
              <ul className="space-y-3">
                {hits.map((h) => (
                  <motion.li
                    key={h.node.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="grid gap-2 rounded-xl border rule bg-bg-elev/50 px-4 py-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
                  >
                    <span className="stat text-sm text-accent-warm">
                      {h.total.toFixed(3)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-mono text-sm text-ink">
                        {h.node.name}
                      </p>
                      <p className="truncate text-xs text-ink-mute">
                        {h.node.description}
                      </p>
                    </div>
                    <span className="justify-self-start font-mono text-[10px] uppercase tracking-widest text-ink-mute sm:justify-self-end">
                      [{h.node.type.replace("memory_", "")}]
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </div>

        {/* Live demo embed — the real mnemo "Nebula" UI, not a mock */}
        <div className="mt-12">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-mute">
              Live demo · the real UI
            </p>
            <a
              href="https://mmct-jsc.github.io/mnemo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-accent-warm transition-colors hover:underline underline-offset-4"
            >
              Open full-screen
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>
          <div className="relative overflow-hidden rounded-2xl border rule bg-bg-elev">
            <iframe
              src="https://mmct-jsc.github.io/mnemo/"
              title="mnemo live Nebula demo — interactive knowledge graph UI"
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-popups"
              className="h-[clamp(420px,70vh,720px)] w-full border-0 bg-bg"
            />
          </div>
        </div>

        <p className="mt-8 text-ink-mute text-sm max-w-2xl">
          The query box above is a six-node mock that mirrors the scoring; the
          embed is the real shipped demo. Source:&nbsp;
          <a
            href="https://github.com/mmct-jsc/mnemo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline-offset-4 hover:underline"
          >
            github.com/mmct-jsc/mnemo
          </a>
          {mnemo.live ? (
            <>
              {" "}
              · running <span className="text-accent-warm">{mnemo.version}</span>{" "}
              as of your visit.
            </>
          ) : (
            <>.</>
          )}
        </p>
      </div>
    </section>
  );
}
