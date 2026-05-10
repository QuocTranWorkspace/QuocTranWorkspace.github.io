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
      "Production multi-camera surveillance on NVIDIA Jetson — 10+ YOLO models, real-time WebRTC/RTSP/MJPEG, 50+ REST endpoints.",
    stack: ["FastAPI", "PyTorch", "pgvector", "Jetson", "WebRTC"],
    span: "wide",
  },
  {
    slug: "aicloud",
    name: "AICloud",
    tagline:
      "Multi-tenant SaaS to manage AIBox fleets — RBAC across four roles, automated Ubuntu deploys, full DB seeding pipeline.",
    stack: ["NestJS", "Prisma", "React", "React Native"],
  },
  {
    slug: "ai-assistant",
    name: "AI Assistant Platform",
    tagline:
      "Five-service Python microservice system behind HAProxy. Document ingestion, pgvector search, Llama 3.1 NL querying.",
    stack: ["Python", "FastAPI", "HAProxy", "pgvector", "Llama 3.1"],
    span: "tall",
  },
  {
    slug: "apst",
    name: "APST",
    tagline:
      "10-microservice Go platform on GKE for a French tourism association of 12,000+ member companies. Clean Architecture + DDD.",
    stack: ["Go 1.25", "GKE", "gRPC", "Event-driven"],
  },
  {
    slug: "afd",
    name: "AFD",
    tagline:
      "High-perf Go CLI processing 300K+ booking records — 7-step checkpoint/resume, SQLite persistence, Uber FX DI.",
    stack: ["Go 1.25", "SQLite", "Uber FX"],
  },
  {
    slug: "evolution-api",
    name: "Evolution API",
    tagline:
      "Extended an open-source multi-tenant WhatsApp platform — Baileys, Meta Business, OpenAI, Typebot, RabbitMQ, S3.",
    stack: ["TypeScript", "Node.js", "Baileys", "RabbitMQ"],
  },
];

const spanClass: Record<NonNullable<Tile["span"]>, string> = {
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  default: "",
};

export function LeadArc() {
  return (
    <section
      id="chapter-3"
      data-chapter="lead-arc"
      className={cn("chapter container-edge py-24")}
    >
      <header className="mb-12 max-w-3xl space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Chapter 03 · Lead arc · PathTech, Jul 2025 → present
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-balance">
          Six months in, I was leading the AI + cloud workstreams.
        </h2>
        <p className="text-ink-mute text-lg max-w-2xl">
          Promoted to Technical Lead in December. I own architecture, code review,
          roadmap, and on-call rituals across these six surfaces.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[18rem]">
        {tiles.map((t) => (
          <li
            key={t.slug}
            className={cn(
              "group relative flex flex-col justify-between rounded-2xl border rule bg-bg-elev/60 p-6 transition-all hover:border-accent/40 hover:bg-bg-elev",
              spanClass[t.span ?? "default"],
            )}
          >
            <div className="space-y-3">
              <h3 className="font-display text-3xl">{t.name}</h3>
              <p className="text-ink-mute text-sm leading-relaxed">{t.tagline}</p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-ink-mute">
              {t.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
