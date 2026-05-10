import { cn } from "@/lib/utils";

const scoreTerms = [
  { key: "vector", weight: 0.4, label: "Vector similarity" },
  { key: "graph", weight: 0.15, label: "Typed-edge graph" },
  { key: "recency", weight: 0.1, label: "Recency (90d half-life)" },
  { key: "type", weight: 0.1, label: "Memory type bias" },
  { key: "project", weight: 0.05, label: "Project scope" },
  { key: "lexical", weight: 0.2, label: "Lexical overlap" },
];

const maxWeight = Math.max(...scoreTerms.map((t) => t.weight));

const stats = [
  { value: "100%", label: "top-1 accuracy" },
  { value: "1.000", label: "MRR" },
  { value: "17 ms", label: "median query" },
  { value: "≤ 800", label: "tokens injected per prompt" },
];

const roadmap = [
  "v1.1 — shipped",
  "v1.2 — learning to listen",
  "v2 — code graph",
  "v3 — chat surface",
  "v4 — refinement",
];

export function Mnemo() {
  return (
    <section
      id="chapter-5"
      data-chapter="mnemo"
      className={cn("chapter relative py-24")}
    >
      <div className="container-edge">
        <header className="mb-14 max-w-3xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-warm">
            Chapter 05 · mnemo · v1.1.0 published
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-balance">
            <span className="italic text-accent-warm">A memory layer</span> that makes
            Claude Code remember what you&rsquo;ve already taught it.
          </h2>
          <p className="text-ink-mute text-lg max-w-2xl text-balance">
            Local-first daemon on 127.0.0.1:7373. Hybrid Graph-RAG, six-term scoring,
            sentence-transformers MiniLM embeddings, SQLite + sqlite-vec store. v1.1
            adds a versioned protocol, a VS Code extension, and provider-shim
            middleware for OpenAI / Anthropic / Google / Ollama.
          </p>
        </header>

        <div className="grid gap-4 md:gap-8 md:grid-cols-[1.2fr_1fr] md:items-stretch">
          <div className="flex flex-col rounded-2xl border rule bg-bg-elev/60 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-mute mb-6">
              Scoring breakdown
            </p>
            <ul className="flex flex-1 flex-col justify-between gap-3">
              {scoreTerms.map((t) => (
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
                      className="block h-full rounded-full bg-accent-warm/70"
                      style={{ width: `${(t.weight / maxWeight) * 100}%` }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid h-full grid-cols-2 grid-rows-2 gap-4">
            {stats.map((s) => (
              <li
                key={s.label}
                className="flex flex-col justify-center rounded-2xl border rule bg-bg-elev/60 p-5 sm:p-6"
              >
                <p className="stat text-2xl sm:text-3xl text-accent-warm">{s.value}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ink-mute">
                  {s.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <ol className="mt-14 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest text-ink-mute">
          {roadmap.map((r, i) => (
            <li
              key={r}
              className={cn(
                "rounded-full border rule px-3 py-1",
                i === 0 && "border-accent-warm/50 text-accent-warm",
              )}
            >
              {r}
            </li>
          ))}
        </ol>

        <p className="mt-10 text-ink-mute text-sm max-w-2xl">
          Source:&nbsp;
          <a
            href="https://github.com/mmct-jsc/mnemo"
            className="text-ink underline-offset-4 hover:underline"
          >
            github.com/mmct-jsc/mnemo
          </a>
          . The interactive query box drops in here in the next pass.
        </p>
      </div>
    </section>
  );
}
