// Single-source data for the work deep-dive routes.
// Each entry's copy is written for a general audience (HR, designers,
// operations, founders) first — engineers can still skim the Stack list
// for the technical signal.

export type WorkImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type WorkEntry = {
  slug: string;
  name: string;
  tagline: string;
  caption: string;
  period: string;
  role: string;
  client: string;
  problem: string;
  approach: string[];
  stack: string[];
  outcomes: { value: string; label: string }[];
  lessons: string[];
  images?: WorkImage[];
  links?: { label: string; href: string }[];
};

export const works: Record<string, WorkEntry> = {
  aicloud: {
    slug: "aicloud",
    name: "AICloud",
    tagline:
      "The cloud control room that watches every AIBox in the field — alerts, evidence, escalations, and a live map of every site, all in one dashboard.",
    caption: "Project · SaaS · Live in production",
    period: "Jul 2025 — present",
    role: "Architect and lead full-stack engineer",
    client:
      "PathTech JSC — serving Petrolimex Aviation. Live at aivision.petrolimexaviation.com.",
    problem:
      "Edge AI boxes at airports and substations spot real problems all day — missing helmets, oil spills, smoke, unauthorized people — but until something reaches a human, nothing happens. Operations needed a single cloud surface to watch every site at once, see the evidence photo for every alert, route serious incidents to the right person within an SLA, and let admins manage cameras, AI models, roles, and licenses without ever SSHing into a device.",
    approach: [
      "Designed a microservices backend split by concern: identity (login, roles, permissions), devices (the AIBox fleet), events (every detection), incidents (grouping events into actionable cases with SLA timers), notifications, licensing, organizations, and a real-time push service that streams alerts to browsers within a second.",
      "Built the operator surface in React with a live map, a filterable alerts feed with the AI-annotated photo and short video clip per event, and a tri-state assessment workflow (Unassessed → True / False) so the team's review actions can feed retraining later.",
      "Designed a four-layer permission model — Branch → AIBox → Camera → AI Model — so a regional supervisor only sees their own region and a contractor only sees their own camera. Roles cannot grant rights they don't already hold.",
      "Shipped a companion mobile app for on-call operators, with 90-day sessions for in-the-field reliability and a join-request flow for new accounts.",
      "Wrote a single deploy script that pulls the latest code, rebuilds every service image in parallel, runs database migrations safely, deploys to a three-machine cluster, and verifies health — turns a release from a half-day of work into one command.",
    ],
    stack: [
      "NestJS · TypeScript · pnpm workspaces",
      "PostgreSQL · MikroORM · Redis",
      "Keycloak (OIDC auth)",
      "NATS (service-to-service) · EMQX (MQTT to the edge)",
      "WebSocket real-time push",
      "React 19 · Vite · TanStack Router/Query · oRPC contracts",
      "React Native mobile app",
      "Docker Swarm · Kong gateway",
    ],
    outcomes: [
      { value: "10", label: "backend services in production" },
      { value: "15+", label: "operator surfaces in the web dashboard" },
      { value: "2", label: "client surfaces (web + mobile)" },
      { value: "1-command", label: "fleet deploy across 3 nodes" },
    ],
    lessons: [
      "Multi-tenant isolation is a discipline, not a feature. Every business request carries an organization context and admins never see anything outside it — enforced at the API layer, the UI layer, and the role editor.",
      "Real-time over WebSocket is the right abstraction for a 'control room' UI. Polling for alerts is dead the moment a customer measures it in seconds.",
      "Operators don't want one more alert — they want fewer, with better context. Grouping events into incidents with SLA timers is what made the feed actually usable in the field.",
    ],
    images: [
      {
        src: "/work/aicloud/dashboard.png",
        alt: "AICloud dashboard — live map of every camera, KPI cards for today's events, recent alerts feed.",
        caption: "Dashboard — every site at a glance.",
      },
      {
        src: "/work/aicloud/cameras.png",
        alt: "Camera grid view showing the latest AI-annotated frame per camera with status indicators.",
        caption: "Cameras — latest AI-annotated frame per stream.",
      },
      {
        src: "/work/aicloud/ai-models.png",
        alt: "AI models catalog — list of running detection models with camera counts and versions.",
        caption: "AI models — the catalog of what's running where.",
      },
      {
        src: "/work/aicloud/aibox-management.png",
        alt: "AIBox onboarding queue showing edge devices awaiting approval.",
        caption: "AIBox onboarding — new edge devices come in here.",
      },
    ],
  },

  aibox: {
    slug: "aibox",
    name: "AIBox",
    tagline:
      "The edge box that does the watching — one rugged NVIDIA Jetson per site, four cameras, real-time safety detection without ever leaving the building.",
    caption: "Project · Edge AI · Live in production",
    period: "Jul 2025 — present",
    role: "Architect and lead engineer",
    client:
      "PathTech JSC — shipped to Petrolimex Aviation at Noi Bai International Airport and EVN's 110 kV Mo Lao substation. 18+ cameras in production at Noi Bai alone.",
    problem:
      "A fuel depot or high-voltage substation has cameras everywhere, but no one watches them all day. Pushing every video stream to the cloud for AI is expensive, slow, and stops working the moment the internet hiccups. The site needed AI that runs on a single box right there — spots safety violations in real time, saves a photo and a short video clip as evidence, and only sends finished alerts to the cloud.",
    approach: [
      "Built one Python service that runs continuously on the Jetson box, pulls live video from every camera on site, and runs the right AI models against each one in real time. No cloud round-trip for inference.",
      "Designed a per-camera pipeline so each camera owns its own thread, its own queue, and its own settings — one camera misbehaving never drags down the others. Models can be swapped on a live camera with zero downtime.",
      "Built a three-layer event-dedup system: track each detected object so a static violation only fires once; spatially bucket bounding boxes so duplicates within seconds collapse; and a hard per-(camera × violation) cooldown so a single standing scene doesn't generate hundreds of alerts.",
      "Added a static-region suppressor that auto-learns the camera's painted lines, signs, and fixed objects — and stops re-flagging them as fresh detections every time the tracker resets.",
      "Always-on pre-roll: a tiny background process keeps the last few seconds of every camera in a ring buffer, so when an event fires the system already has video from before it happened — no second connection, no missed keyframes.",
      "Streamed annotated video back to operators over WebRTC, RTSP, or MJPEG depending on the client — and synced events to the cloud over MQTT.",
    ],
    stack: [
      "Python 3.12 · FastAPI · SQLAlchemy",
      "PyTorch · Ultralytics YOLO v8/v11 · OpenCV",
      "FaceNet (face recognition)",
      "PostgreSQL + pgvector (512-dim face embeddings)",
      "MQTT (cloud sync) · WebRTC · RTSP · MJPEG",
      "NVIDIA Jetson · CUDA 12.8 · MediaMTX",
    ],
    outcomes: [
      { value: "18", label: "distinct AI model types (helmet, oil-spill, smoke, plate, face, …)" },
      { value: "91", label: "REST endpoints across 13 routers" },
      { value: "4", label: "concurrent CCTV streams per box" },
      { value: "2", label: "live production deployments (airport + substation)" },
    ],
    lessons: [
      "Hardware-aware throttling beats hardware-blind retries. The pipeline reads GPU temperature and free memory and stretches its inference cadence before things go wrong, not after.",
      "Operators want one alert per real event, not 374,000 in ten minutes. The dedup ladder (object track → spatial bucket → hard cooldown) is the difference between 'safety system' and 'noise generator'.",
      "Never use auto-reload in production for a long-lived multi-camera service. It double-loads weights, doubles VRAM, and kills capture threads mid-frame. Restart, don't reload.",
    ],
    images: [
      {
        src: "/work/aibox/alerts-feed.png",
        alt: "Live alerts feed from AIBox — annotated photos of detected safety violations.",
        caption: "Alerts feed — every detection arrives with a photo, a video clip, and an assessment workflow.",
      },
      {
        src: "/media/aibox-noibai-001.jpg",
        alt: "A real frame from AIBox at Petrolimex Aviation Noi Bai — refueling truck and ground crew with YOLO bounding boxes around helmets, vests, and a flagged PPE-negative person.",
        caption: "Live capture from cam AIB-PA-NOIBAI-001 — Noi Bai airport refueling apron.",
      },
    ],
  },

  unlimit: {
    slug: "unlimit",
    name: "Unlimit",
    tagline:
      "A platform that lets agencies plug WhatsApp into their CRM — many phones, many brands, many agents, one inbox.",
    caption: "Project · Multi-tenant SaaS · Live in production",
    period: "2026",
    role: "Full-stack engineer",
    client:
      "GoSetter — live at admin.unlimit.gosetter.ai. Agency-style platform: a parent account creates 'apps' for each brand or sub-client and attaches WhatsApp devices to each.",
    problem:
      "Sales agencies want to message customers on WhatsApp the way they already message them in their CRM — but WhatsApp has phones, not seats, and a real agency runs dozens of phones across many brands. The platform needed to let an agency add a phone, scan a QR code to pair it, and from then on every inbound WhatsApp message routes to the right agent inside their existing CRM (GoHighLevel) and every CRM reply goes back out to the customer's phone.",
    approach: [
      "Designed a true multi-tenant architecture: every agency gets its own isolated database schema on signup. No customer of one agency can ever see another agency's data, even by accident.",
      "Built the WhatsApp integration as a separate worker process so a customer's connections survive every deploy. WhatsApp sessions are backed up to object storage and restored automatically if the worker restarts.",
      "Wrote a permissions matrix loaded from the database into memory — Super Admin, Agency Admin, Manager, Agent — with the ability to re-sync without code changes.",
      "Plugged the platform into GoHighLevel as both a CRM (every inbound message becomes a conversation) and a billing layer (more apps or more devices = an automatic subscription bump).",
      "Built the front-end with TanStack Router and Query so the UI is fully typed, fast, and only fetches what's on screen.",
    ],
    stack: [
      "Node.js · TypeScript · Express · Sequelize",
      "PostgreSQL (schema-per-tenant) · Redis · Bull queues",
      "Evolution API (self-hosted WhatsApp bridge)",
      "GoHighLevel OAuth + Conversation Provider",
      "Cloudflare R2 / MinIO (media + session backup)",
      "React 19 · Vite · Tailwind v4 · TanStack Router/Query · shadcn-style UI",
    ],
    outcomes: [
      { value: "4", label: "roles in the permissions matrix" },
      { value: "1", label: "schema per tenant (true isolation)" },
      { value: "2-process", label: "split: API + worker on shared DB / Redis" },
      { value: "live", label: "in production with paying customers" },
    ],
    lessons: [
      "Schema-per-tenant pays for itself the first time you onboard a customer whose data must never appear in anyone else's report. Cross-tenant queries become impossible by construction, not by code review.",
      "WhatsApp sessions are precious — losing them on a deploy means every customer's phone has to re-pair. Backing them up to object storage so the worker can rehydrate on restart is the difference between a smooth release and a Sunday-night incident.",
      "The CRM is the user. Once we modeled GoHighLevel as the primary surface — and Unlimit as the WhatsApp adapter — every confusing product decision got easier.",
    ],
    images: [
      {
        src: "/work/unlimit/apps.png",
        alt: "Unlimit organization apps page — list of brands / sub-clients an agency manages.",
        caption: "Apps — each one is a separate brand, with its own WhatsApp devices and routing.",
      },
      {
        src: "/work/unlimit/agencies.png",
        alt: "Agencies list view (super-admin scope).",
        caption: "Agencies — the agency-of-agencies view for platform admins.",
      },
      {
        src: "/work/unlimit/ghl-connections.png",
        alt: "GoHighLevel CRM connections page — manage the OAuth links between Unlimit and a customer's CRM.",
        caption: "GHL connections — every agency plugs into their own GoHighLevel here.",
      },
    ],
  },

  keanu: {
    slug: "keanu",
    name: "Keanu Residences",
    tagline:
      "A reservation platform for a luxury villa launch in Bali — browse, shortlist, lock a unit for a few minutes, deposit, done.",
    caption: "Project · Luxury real estate · Live in production",
    period: "2026",
    role: "Full-stack engineer",
    client:
      "Keanu Residences (Sunrise Coast Living) — live at sales.keanubali.com. A branded villa development in Bali; this is the platform their sales team and buyers use during launch events.",
    problem:
      "Luxury villa launches are competitive: dozens of buyers may want the same unit the moment a launch goes live. A first-come spreadsheet doesn't work — by the time someone refreshes, the unit is gone. Buyers need to lock a unit for a few minutes while they read terms and pay, the system needs to guarantee one buyer per unit, and the whole experience needs to feel as polished as the property itself.",
    approach: [
      "Built an atomic unit-locking system on top of Redis — when a buyer reserves a unit, that unit is held for them only, no one else can lock it, and the lock auto-releases on a timer if they don't complete payment.",
      "Designed a waiting queue so the moment a lock releases, the next person interested gets first dibs — no refresh races, no over-booking.",
      "Connected the system to Stripe with a proper webhook flow: deposit captured, unit confirmed, lock converted into a real reservation, all in one transaction.",
      "Pushed live availability over WebSocket so the visual masterplan updates the second a unit changes state — buyers see other units sell in real time, which is exactly the urgency a launch is built around.",
      "Wired buyer activity into GoHighLevel as a CRM event stream — Signed Up → Shortlisted → Reserved → Deposited become tagged contacts that trigger sales follow-up automatically.",
      "Built a small admin scheduler: pick the launch date and time, and a background job flips the project to LIVE at the exact second, broadcasts to every connected client, and starts accepting reservations.",
    ],
    stack: [
      "NestJS 11 · TypeScript · Prisma · PostgreSQL",
      "Redis · Bull queues",
      "Socket.io WebSocket gateways",
      "Stripe (payment intents + webhooks + embedded checkout)",
      "GoHighLevel CRM (OAuth + tagged contacts)",
      "Cloudinary · Nodemailer",
      "React 19 · Vite · Tailwind v4 · react-router-dom v7",
    ],
    outcomes: [
      { value: "atomic", label: "unit reservation lock under concurrent load" },
      { value: "real-time", label: "availability across every connected device" },
      { value: "scheduled", label: "launches go live at the configured second" },
      { value: "live", label: "in production for ongoing villa sales" },
    ],
    lessons: [
      "Concurrency problems must be solved at the right layer. A database transaction can't stop two buyers from clicking the same unit at the same time — only an atomic Redis lock with a waiting queue can. We had to put the lock above the database, not in it.",
      "Buyers can feel the urgency of a launch only when it's visibly real. Pushing availability over WebSocket so other units 'sell out' as you scroll is what turns a website into an event.",
      "Sales operations live in their CRM. Sending every meaningful buyer event into GoHighLevel as a tagged contact is what lets the sales team automate follow-up without ever touching our database.",
    ],
    images: [
      {
        src: "/work/keanu/residences.png",
        alt: "Keanu Residences buyer landing page — luxury villa gallery and brand surface.",
        caption: "Buyer landing — the surface every prospect lands on at launch.",
      },
      {
        src: "/work/keanu/masterplan.png",
        alt: "Interactive masterplan — see every villa on the site and their availability status.",
        caption: "Interactive masterplan — live availability updates push from server to client.",
      },
      {
        src: "/work/keanu/admin-villas.png",
        alt: "Admin villa management — control unit availability, pricing, and launch timing.",
        caption: "Admin villas — control unit availability, pricing, and launch state.",
      },
    ],
  },

  swisslife: {
    slug: "swisslife",
    name: "Swisslife",
    tagline:
      "A platform that sends personal documents to thousands of people, gets each one to verify with a one-time code, and tracks every step for compliance.",
    caption: "Project · Microservices · Document dispatch",
    period: "2025 — 2026",
    role: "Backend engineer",
    client: "Insurance / financial-services domain client.",
    problem:
      "Insurance work means sending personal documents — policy updates, claim packs, statements — to thousands of people at once, and proving who opened what, when. Email by itself isn't enough: the recipient needs to verify they are who they say they are before any document is shown. The system needed bulk dispatch, time-limited personal links, one-time codes via SMS or email, an unforgeable audit trail, scheduled reminders, and an export-ready report for compliance reviews.",
    approach: [
      "Split the platform into one service per concern: login, settings, the campaigns themselves (envoi), recipients, documents, email, reminders, one-time codes, reports, audit. Each service owns its own database — no shared tables, no hidden coupling.",
      "Wired every service to a message bus so anything that happens — an email opened, a code verified, a document downloaded — fires an event that the audit service catches and writes into an unalterable time-series log.",
      "Consolidated two separate one-time-code systems into a single authority service; every other service now asks for codes over gRPC instead of duplicating the logic.",
      "Designed the reporting service to pull from each service's database read-only, generate a four-sheet Excel workbook (summary, recipients, events, analytics) with charts inline, and cache the result for an hour so big workbooks don't get regenerated for every click.",
      "Configured Kong gateway in declarative mode — every route, every rate limit, every plugin is checked into git, no runtime config drift.",
      "Stood up Prometheus, Grafana, and Jaeger in the dev compose so observability is wired before the first feature ships, not after the first outage.",
    ],
    stack: [
      "Go 1.24 (9 services) · NestJS/TypeScript (email service)",
      "PostgreSQL · MongoDB (documents + audit) · Redis (sessions, OTP cache, report cache)",
      "NATS JetStream (8 streams)",
      "Kong gateway (DB-less, declarative)",
      "MinIO (document storage)",
      "Twilio (SMS OTP) · SMTP (email)",
      "Prometheus · Grafana · Jaeger",
    ],
    outcomes: [
      { value: "10", label: "services from one monolith" },
      { value: "8", label: "JetStream streams in the event bus" },
      { value: "1", label: "command to start the full local stack" },
      { value: "0", label: "shared databases between services" },
    ],
    lessons: [
      "Stand up the observability stack before the first service ships. Adding tracing after an outage is twice the work and you've already missed the bug.",
      "One-time codes should live in exactly one service. Every other service that needs them calls over gRPC. Duplicate OTP systems are a refactor waiting to happen.",
      "Kong's declarative config is the right abstraction for cross-cutting concerns — auth, rate limit, body validation, OpenAPI rewrites all in version-controlled YAML, never in a clicked-through admin panel.",
    ],
  },

  mnemo: {
    slug: "mnemo",
    name: "mnemo",
    tagline:
      "A local-first memory layer for Claude Code — turns scattered notes into searchable, cited context the AI gets fed automatically.",
    caption: "Project · Open source · Maintainer",
    period: "Apr 2026 — present",
    role: "Creator and maintainer",
    client:
      "Open source — github.com/mmct-jsc/mnemo. Used by me daily across every project on this site.",
    problem:
      "Anyone using an AI coding assistant has lessons, decisions, and notes scattered across folders and projects. The assistant doesn't remember any of it across sessions, so you keep teaching it the same things. mnemo collects those notes into a small graph that lives on your laptop, finds the most relevant pieces every time you ask the AI a question, and feeds them into the conversation as cited context — never more than a few hundred tokens at a time.",
    approach: [
      "Built a small Python daemon that runs locally on your computer and indexes every memory file under your `~/.claude/` folder.",
      "Designed a six-term scoring formula that combines vector similarity, typed-edge graph traversal, recency, memory type, project scope, and exact word matches — beats pure vector search on a curated benchmark.",
      "Shipped it as a Claude Code plugin: install once, every prompt you type to the AI gets the most relevant memory automatically injected, capped at 800 tokens so it never blows your context budget.",
      "Added a small local web UI (graph view, search, edit) so you can see what memory the AI is being given.",
      "Cross-platform installer (Linux, macOS, Windows) and a clean release pipeline through GitHub Actions.",
    ],
    stack: [
      "Python 3.11+ · FastAPI · uvicorn",
      "SQLite + sqlite-vec (vector store)",
      "sentence-transformers MiniLM (22 MB embedder)",
      "Claude Code plugin (skills + hooks + slash commands)",
      "Alpine.js + hand-rolled CSS (no Tailwind in the UI)",
      "GitHub Actions CI/CD",
    ],
    outcomes: [
      { value: "100%", label: "top-1 accuracy on the curated benchmark" },
      { value: "1.000", label: "mean reciprocal rank (MRR)" },
      { value: "17 ms", label: "median query latency" },
      { value: "live", label: "see chapter 05 for the version badge" },
    ],
    lessons: [
      "87 % of the query time is the embedder's forward pass. Everything else is rounding error — so optimization energy goes there or nowhere.",
      "Hash-gated ingestion is the unlock. Re-embedding only what actually changed turns a 'reindex' button from a coffee-break into 50 ms.",
      "Branch-protected main on a solo project sounds excessive until the first half-baked branch saves itself from shipping.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/mmct-jsc/mnemo" },
      { label: "Live demo", href: "https://mmct-jsc.github.io/mnemo/" },
    ],
  },
};

export const workSlugs = Object.keys(works);
