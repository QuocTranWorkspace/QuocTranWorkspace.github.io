import { cn } from "@/lib/utils";

const skillGroups = [
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
    items: ["YOLO v8/v11", "FaceNet / MTCNN", "pgvector", "Llama 3.1", "OpenAI + Whisper", "sentence-transformers"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "SQLite + sqlite-vec", "MongoDB", "Redis", "Prisma", "GORM"],
  },
  {
    label: "Infra",
    items: ["Docker", "Kubernetes (GKE)", "Nginx", "HAProxy", "MediaMTX RTSP", "Terraform"],
  },
  {
    label: "Edge / IoT",
    items: ["NVIDIA Jetson (CUDA 12.8)", "RTSP", "WebRTC", "WebSocket"],
  },
  {
    label: "Architecture",
    items: ["Clean Architecture", "DDD", "Microservices", "Event-driven", "Multi-tenant SaaS", "Local-first"],
  },
];

export function Skills() {
  return (
    <section
      id="chapter-6"
      data-chapter="skills"
      className={cn("chapter container-edge py-24")}
    >
      <header className="mb-14 max-w-3xl space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Chapter 06 · Constellation
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-balance">
          Tools I reach for, grouped by where they live in the stack.
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border rule bg-rule md:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g) => (
          <section key={g.label} className="bg-bg-elev p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-ink-mute mb-4">
              {g.label}
            </h3>
            <ul className="space-y-1.5">
              {g.items.map((it) => (
                <li key={it} className="font-display text-lg">
                  {it}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-ink-mute text-sm">
        The cinematic version animates this as a force-directed graph; hovering a node
        lights up the projects that use it. Reduced-motion stays on this static grid.
      </p>
    </section>
  );
}
