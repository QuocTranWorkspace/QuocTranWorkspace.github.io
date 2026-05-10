import { cn } from "@/lib/utils";

const stats = [
  { value: "10+", label: "YOLO models in prod" },
  { value: "50+", label: "REST endpoints" },
  { value: "4", label: "concurrent CCTV feeds" },
  { value: "CUDA 12.8", label: "Jetson runtime" },
];

const models = [
  "helmet detection",
  "oil-spill",
  "smoke + fire",
  "license-plate recognition",
  "face recognition",
  "people control",
  "petrolimex uniform",
];

export function AIBoxCloseup() {
  return (
    <section
      id="chapter-4"
      data-chapter="aibox-closeup"
      className={cn("chapter relative overflow-hidden py-24")}
    >
      <div className="container-edge">
        <header className="mb-14 max-w-3xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Chapter 04 · AIBox closeup
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-balance">
            Edge AI that actually runs at a Hanoi gas station.
          </h2>
          <p className="text-ink-mute text-lg max-w-2xl">
            One Jetson box, four RTSP cameras, real-time bounding boxes streamed back
            to the cloud over WebRTC. WebSocket events, MJPEG fallback, PostgreSQL +
            pgvector for the analytics tail.
          </p>
        </header>

        <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 mb-16">
          {stats.map((s) => (
            <li key={s.label} className="space-y-2">
              <p className="stat text-4xl md:text-5xl">{s.value}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-ink-mute max-w-[10rem]">
                {s.label}
              </p>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border rule bg-bg-elev/60 p-8 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-mute mb-4">
            Models in the field
          </p>
          <ul className="flex flex-wrap gap-2">
            {models.map((m) => (
              <li
                key={m}
                className="rounded-full border rule px-3 py-1 font-mono text-xs text-ink"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 max-w-2xl text-ink-mute text-base">
          The cinematic version of this chapter pins the section, tilts the device,
          and draws bounding boxes on detected helmets / faces / plates as you scroll.
          That lands in the next implementation pass.
        </p>
      </div>
    </section>
  );
}
