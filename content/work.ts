// Single-source data for the work deep-dive routes.
// Add a new entry here + create the matching folder under /app/work/<slug>.

export type WorkEntry = {
  slug: string;
  name: string;
  tagline: string;
  // Front matter for the page header
  caption: string;
  period: string;
  role: string;
  client: string;
  // Long-form sections
  problem: string;
  approach: string[];
  stack: string[];
  outcomes: { value: string; label: string }[];
  lessons: string[];
  links?: { label: string; href: string }[];
};

export const works: Record<string, WorkEntry> = {
  aibox: {
    slug: "aibox",
    name: "AIBox",
    tagline:
      "Production multi-camera AI surveillance on NVIDIA Jetson — 10+ YOLO models, real-time WebRTC, two live deployments.",
    caption: "Project · Edge AI · Production",
    period: "Jul 2025 — present",
    role: "Architect, lead engineer",
    client:
      "PathTech JSC — shipped to Petrolimex Aviation (Noi Bai International Airport) and EVN (110 kV Mo Lao substation).",
    problem:
      "Each site has 4 CCTV cameras on RTSP feeds and a single Jetson box. The operations team needs real-time detection of helmet / oil-spill / smoke / face / license-plate violations, with evidence images persisted, low-latency alerts, and a remote viewer over the public internet. The whole stack has to run on one constrained edge device while staying recoverable when a camera drops, a model needs swapping, or the power blinks.",
    approach: [
      "Single FastAPI process binds the camera threads, YOLO inference loops, and REST surface — 50+ endpoints across 9 routers (cameras, models, events, streams, auth, exports, RBAC, settings, health).",
      "Per-camera CameraThread captures frames; a SingleThreadProcessor runs inference on a tuned cadence so 4 streams share one GPU cleanly.",
      "Real-time delivery via WebRTC primary, RTSP for camera ingest, MJPEG fallback. Detection events broadcast over WebSocket so the cloud's live timeline reacts within a frame.",
      "PostgreSQL + pgvector backs both the model registry (cosine-distance lookups by class name) and the event tail (full-text + recency queries).",
      "Model lifecycle scripted: sync, list, update conf/iou, hot-swap weights. Zero-downtime model rollout via per-camera atomic re-bind.",
    ],
    stack: [
      "FastAPI",
      "PyTorch",
      "Ultralytics YOLO v8 / v11",
      "OpenCV",
      "FaceNet / MTCNN",
      "PostgreSQL + pgvector",
      "WebRTC · RTSP · MJPEG · WebSocket",
      "NVIDIA Jetson · CUDA 12.8",
      "MediaMTX",
    ],
    outcomes: [
      { value: "10+", label: "YOLO models live" },
      { value: "50+", label: "REST endpoints" },
      { value: "4", label: "concurrent CCTV streams per box" },
      { value: "2", label: "production deployments" },
    ],
    lessons: [
      "Per-camera atomic state — every detection thread owns its own settings, hash, and last-OK timestamp. Cross-camera coupling is the single biggest source of jitter; we ban it.",
      "Hardware-aware throttling: the cadence loop reads GPU temperature + free memory and stretches the inference interval before performance degrades, not after.",
      "Event dedup via IoU on box centers + a hard per-(camera × violation) cooldown — collapses repeated triggers from the same standing person/vehicle into one stored event.",
    ],
  },

  mnemo: {
    slug: "mnemo",
    name: "mnemo",
    tagline:
      "Local-first knowledge memory for Claude Code. Hybrid Graph-RAG, six-term scoring, 100 % top-1 / 17 ms median.",
    caption: "Project · Open source · Maintainer",
    period: "Apr 2026 — present",
    role: "Creator and maintainer",
    client:
      "Open source — mmct-jsc/mnemo. Used personally + by collaborators across the projects on this site.",
    problem:
      "Claude memory is scattered — `~/.claude/projects/<key>/memory/`, per-repo CLAUDE.md, design docs in `docs/plans/`, the global `~/.claude/CLAUDE.md`. The same lessons get re-discovered, the same feedback gets re-given, the same architecture gets re-derived across sessions. There was no retrieval surface that knew about all of it.",
    approach: [
      "Three tiers: a Claude Code plugin (markdown skills + bash/PowerShell hooks + slash commands) talks to a Python daemon (FastAPI on 127.0.0.1:7373), which owns a SQLite + sqlite-vec store under `~/.claude/mnemo/`.",
      "Hybrid Graph-RAG retrieval: sentence-transformers MiniLM embeddings give the vector recall, typed-edge graph traversal gives the precision boost; a six-term scoring function (vector + graph + recency + type + project + lexical) blends them.",
      "UserPromptSubmit hook injects ≤ 800 tokens of the most relevant memory on every prompt — never dumps full files; ranks, compresses, cites with `[mnemo:<id>]` tags.",
      "Web UI at `http://localhost:7373` for graph view, search, node editing, source management, settings.",
      "Ship targets: install.sh / .ps1 drop a `mnemo` shim onto PATH + link the plugin into `~/.claude/plugins/mnemo/`. Cross-platform CI (mac + Win + Linux).",
    ],
    stack: [
      "Python 3.11+",
      "FastAPI · uvicorn",
      "SQLite + sqlite-vec",
      "sentence-transformers MiniLM (22 MB, 384-dim)",
      "Claude Code plugin (markdown skills + hooks + slash commands)",
      "Alpine.js + custom CSS (no Tailwind in the UI)",
      "GitHub Actions CI/CD · branch-protected main",
    ],
    outcomes: [
      { value: "100%", label: "top-1 accuracy on the curated benchmark" },
      { value: "1.000", label: "MRR" },
      { value: "17 ms", label: "median query latency, 22 ms p95" },
      { value: "v1.1.0", label: "shipped public release" },
    ],
    lessons: [
      "87 % of query time is the MiniLM forward pass — only a GPU or a model swap moves the needle. Everything else is rounding error.",
      "Hash-gated ingestion was the unlock: 1,157 nodes/sec reindex throughput is achievable when 99 % of files are unchanged, you just have to refuse to re-embed them.",
      "PR-only main with branch protection on a solo project sounds like overkill; it pays for itself the first time you have a half-baked branch you don't want to ship.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/mmct-jsc/mnemo" },
      { label: "Architecture doc", href: "https://github.com/mmct-jsc/mnemo/blob/main/docs/architecture.md" },
    ],
  },

  swisslife: {
    slug: "swisslife",
    name: "Swisslife",
    tagline:
      "Microservices platform behind a Kong gateway — NATS JetStream, full observability, Postgres + ElasticSearch + MinIO.",
    caption: "Project · Microservices · Insurance",
    period: "2025",
    role: "Backend engineer",
    client: "Insurance domain client.",
    problem:
      "The client's legacy monolith couldn't survive seasonal load spikes and made it impossible to ship per-service safely. We had to peel it apart into clean services that an in-house team could keep extending — without a year-long rewrite.",
    approach: [
      "Six clean services from the start: auth, config, envoi (notifications), recipient, audit, email. Each owns its own Postgres schema; integration is asynchronous via NATS JetStream.",
      "Kong as the public API gateway with per-service rate limits, JWT validation, OpenAPI rewrites. NATS handles the bus traffic with at-least-once delivery + idempotency keys baked into every consumer.",
      "Observability stack day one: Jaeger for distributed tracing, Prometheus for metrics, Grafana dashboards per service, ElasticSearch for log aggregation.",
      "Object storage on MinIO so the on-prem story stays clean; the same code runs against S3 in cloud envs.",
      "Local dev stack is a single `docker-compose up -d` — eight services + Kong + NATS + Postgres + Redis + MinIO + ElasticSearch + Jaeger + Prometheus + Grafana, all wired and seeded.",
    ],
    stack: [
      "Microservices · Kong gateway",
      "NATS JetStream",
      "PostgreSQL · Redis · ElasticSearch · MinIO",
      "Jaeger · Prometheus · Grafana",
      "Docker Compose for dev, Kubernetes-ready manifests",
    ],
    outcomes: [
      { value: "6", label: "production services peeled out of the monolith" },
      { value: "10+", label: "infra components wired in dev stack" },
      { value: "1", label: "command to bring the stack up locally" },
      { value: "0", label: "shared databases between services" },
    ],
    lessons: [
      "Get the observability stack live before any service ships. Adding tracing after the fact is twice the work and you've already missed the bugs it would have caught.",
      "NATS JetStream's at-least-once delivery + idempotency keys on every consumer is a far cheaper guarantee than chasing exactly-once. Build the dedup table once and forget it.",
      "Kong's plugin model is the right abstraction for cross-cutting concerns: do auth, rate limit, OpenAPI, body validation in the gateway, not in every service.",
    ],
  },
};

export const workSlugs = Object.keys(works);
