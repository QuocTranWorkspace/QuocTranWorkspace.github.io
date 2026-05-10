import { cn } from "@/lib/utils";

const pipelineStages = [
  { id: "01", label: "Video", note: "Source ingestion" },
  { id: "02", label: "Analysis", note: "OpenAI + YouTube APIs" },
  { id: "03", label: "Ideation", note: "Topic + angle generation" },
  { id: "04", label: "Script", note: "Long-form narrative" },
  { id: "05", label: "Storyboard", note: "Shot list + thumbnails" },
];

export function Crossover() {
  return (
    <section
      id="chapter-2"
      data-chapter="crossover"
      className={cn("chapter container-edge py-24")}
    >
      <header className="mb-12 max-w-3xl space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Chapter 02 · Crossover · Mar — Jul 2025
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-balance">
          Bitsness gave me my first AI automation gig.
        </h2>
        <p className="text-ink-mute text-lg max-w-2xl text-balance">
          NestJS, TypeORM, Knex, JWT, GitLab CI. The platform ran videos through five
          asynchronous stages before they ever reached a human editor.
        </p>
      </header>

      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {pipelineStages.map((s) => (
          <li
            key={s.id}
            className="group relative rounded-xl border rule bg-bg-elev/60 p-6 transition-colors hover:border-accent/40"
          >
            <span className="stat text-xs text-ink-mute">{s.id}</span>
            <h3 className="mt-4 font-display text-2xl">{s.label}</h3>
            <p className="mt-2 text-sm text-ink-mute">{s.note}</p>
          </li>
        ))}
      </ol>

      <p className="mt-12 max-w-2xl text-ink-mute text-base">
        I led the backend split — modular NestJS services, repository pattern, role-based
        guards — and built the GitLab pipelines that took it from laptop to staging.
      </p>
    </section>
  );
}
