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
          roadmap, and on-call rituals across the surfaces below.
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

        <li
          aria-hidden
          className={cn(
            "group relative flex items-center justify-center rounded-2xl border border-dashed rule bg-transparent p-6",
            "transition-colors hover:border-accent/40 hover:text-accent",
          )}
        >
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-ink-mute">
            and many more&hellip;
          </span>
        </li>
      </ul>
    </section>
  );
}
