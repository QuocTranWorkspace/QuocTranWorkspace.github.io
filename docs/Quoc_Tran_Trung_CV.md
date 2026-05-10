# Quoc Tran Trung

**Full-Stack Engineer · Technical Lead**
Hanoi, Vietnam &nbsp;·&nbsp; +84 961 267 308 &nbsp;·&nbsp; quoctranworkspace@gmail.com
[github.com/QuocTranWorkspace](https://github.com/QuocTranWorkspace) &nbsp;·&nbsp; [LinkedIn](https://www.linkedin.com/in/quoc-tran-trung-070b34268/) &nbsp;·&nbsp; [github.com/mmct-jsc/mnemo](https://github.com/mmct-jsc/mnemo)

---

## Profile

Full-stack engineer and technical lead who ships production systems end-to-end — from NVIDIA Jetson edge-AI surveillance to Go microservices on Kubernetes to local-first developer tooling. Comfortable owning architecture, data, APIs, CI/CD, deployment, and the people side: I lead small-to-medium teams across AI/computer vision, multi-tenant SaaS, and messaging platforms, and I sweat the boring infrastructure so the product surface stays calm.

Recently promoted to Technical Lead at PathTech after six months as a Full-Stack Engineer; concurrently maintain mnemo, an open-source local-first knowledge memory system for AI coding assistants.

---

## Professional Experience

### Technical Lead — PathTech JSC
*Dec 2025 – Present · Hanoi, Vietnam · On-site*

Lead delivery across AI, backend, and infrastructure workstreams; own architecture review, code review, and roadmap for the AIBox + AICloud product line. Mentor full-stack and AI engineers; set up the team's standards for Go/NestJS service templates, CI/CD, and on-call rituals.

### Full-Stack Engineer — PathTech JSC
*Jul 2025 – Dec 2025 · Hanoi, Vietnam · On-site*

- **AIBox (Edge).** Architected a production multi-camera surveillance system on NVIDIA Jetson devices. Shipped 10+ YOLO-based models — helmet detection, oil-spill, smoke/fire, license-plate and face recognition — with real-time WebRTC/RTSP/MJPEG streaming, WebSocket event broadcasting, and 50+ REST endpoints in **FastAPI + PyTorch + pgvector**.
- **AICloud.** Built the cloud side as a multi-tenant SaaS AIBox-management platform in **NestJS + Prisma + React + React Native**, with automated Ubuntu deployment scripts, RBAC across four roles, and a full database seeding pipeline.
- **AI Assistant Platform.** Designed a five-service Python/FastAPI microservice system behind HAProxy (API gateway, auth, file processor, calendar, AI router) with a React PWA frontend, pgvector semantic search, and Llama 3.1 integration for document ingestion and natural-language querying.
- **APST Platform.** Delivered a 10-microservice Go platform on **GKE** for a French tourism association of 12,000+ member companies. Clean Architecture + DDD, gRPC + REST + event-driven communication, full GitLab CI/CD.
- **AFD (Airline Flight Data Processor).** High-performance Go 1.25 CLI processing 300K+ booking records with a 7-step checkpoint/resume system, SQLite persistence, concurrent CSV processing, and Uber FX dependency injection.
- **Evolution API.** Extended an open-source multi-tenant WhatsApp platform (TypeScript/Node.js) integrating Baileys, Meta Business API, OpenAI GPT + Whisper, Typebot, Chatwoot, Dify, Flowise, N8N, RabbitMQ, SQS, NATS, and S3/MinIO.

### Full-Stack Engineer / Team Lead — Bitsness (A.I. Automation Agency)
*Mar 2025 – Jul 2025 · Hanoi, Vietnam · Hybrid*

- **YouTube content generation platform.** Built an end-to-end pipeline running videos through analysis, ideation, script development, and storyboard creation using OpenAI and YouTube APIs with asynchronous job processing.
- **Backend architecture.** NestJS/TypeScript with modular architecture, MySQL + TypeORM entities, Knex migrations, repository pattern, and React frontend integration.
- **Security and access control.** JWT authentication, role-based access control, and module-specific authorization with Guards and Decorators; built GitLab CI/CD pipelines for build and deploy.

### PHP / Laravel Full-Stack Developer — British University Vietnam (ICT Department)
*Jun 2024 – Sep 2024 · Hung Yen, Vietnam · On-site*

- Developed and maintained internal projects using PHP, WordPress, and Laravel; managed databases via phpMyAdmin.
- Designed a barcode-detection algorithm that automated manual data-entry workflows.
- Worked in Agile sprints with GitLab for version control and code review.

---

## Featured Projects

### mnemo — Local-First Knowledge Memory for Claude Code · *Creator & Maintainer*
*Python · FastAPI · SQLite + sqlite-vec · sentence-transformers · Claude Code plugin*
[github.com/mmct-jsc/mnemo](https://github.com/mmct-jsc/mnemo)

A privacy-first memory layer that auto-injects relevant context into every Claude Code prompt. Daemon binds to 127.0.0.1:7373; embeddings (all-MiniLM-L6-v2, 384-dim) and graph live in `~/.claude/mnemo/`. Hybrid Graph-RAG with a 6-term scoring function (vector + graph + recency + type + project + lexical) reaches **100% top-1 accuracy, MRR 1.000, 17 ms median query** on the 38-node benchmark (v1.0.3). Ships as a Claude Code plugin with skills, hooks, and slash commands; `UserPromptSubmit` hook caps injection at 800 tokens per prompt.

### Restaurant E-commerce Platform · *DevOps & Full-Stack*
*Spring Boot · Vue 3 · Docker · Terraform · GitHub Actions*

Restaurant management platform with customer and admin roles, menu management, and secure order processing. Designed a full CI/CD pipeline on GitHub Actions for automated testing and deployment. Provisioned and managed cloud resources as code with Terraform across Render, Netlify, Railway, and Backblaze.

> *Additional projects from `D:/Game_Dev` and `D:/Repository` to be folded in once those folders are accessible to the session.*

---

## Technical Skills

| Area | Tools |
|---|---|
| **Languages** | Python, Go (1.25), TypeScript / JavaScript, Java, PHP, C# |
| **Backend** | FastAPI, NestJS, Spring Boot, Laravel, Node.js, Express |
| **Frontend** | React, Vue 3, React PWA, React Native, Tailwind, HTML/CSS |
| **AI / ML** | YOLO v8/v11, FaceNet / MTCNN, pgvector, sentence-transformers, Llama 3.1, OpenAI GPT + Whisper |
| **Databases** | PostgreSQL (+pgvector), MySQL, SQLite (+sqlite-vec), MongoDB, Redis · Prisma, TypeORM, GORM |
| **Infra & DevOps** | Docker, Kubernetes (GKE), Nginx, HAProxy, MediaMTX RTSP, Terraform |
| **CI/CD** | GitHub Actions, GitLab CI/CD · Render, Netlify, Railway, Backblaze |
| **Architecture** | Clean Architecture, DDD, Microservices, Event-driven, Multi-tenant SaaS, Local-first |
| **Security** | OAuth 2.0, JWT, Argon2, AES-256, RBAC, Guards & Decorators |
| **Edge / IoT** | NVIDIA Jetson (CUDA 12.8), RTSP cameras, WebRTC, WebSocket |

---

## Leadership & Community

- **Secretary, HANU IT Youth Union** — Led the executive team across campus-wide events; coordinated cross-functional teams for department events and community campaigns. *(May 2023 – May 2024)*
- **Logistics Team Leader, HANU IT Youth Union** — Managed logistics, resource allocation, and scheduling for IT Department Freshmen Welcome 2023 and the Warm Spring for Children volunteer campaign. *(Jun 2022 – May 2023)*

---

## Education & Certifications

- **Hanoi University** — B.Sc. IT, Software Engineering (English programme, B2). *2021 – Present*
- **Devpro Vietnam** — Java Web Full-Stack (J2EE) certification. *Jul 2022 – Mar 2023*

---

*References available on request.*
