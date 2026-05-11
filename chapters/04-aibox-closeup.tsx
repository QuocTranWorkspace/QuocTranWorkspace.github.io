"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { Counter } from "@/components/motion/Counter";
import { cn } from "@/lib/utils";

const stats = [
  { to: 10, prefix: "", suffix: "+", label: "YOLO models in prod" },
  { to: 50, prefix: "", suffix: "+", label: "REST endpoints" },
  { to: 4, prefix: "", suffix: "", label: "concurrent CCTV feeds" },
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

// Mock YOLO detection boxes (positioned as percentages of the frame).
// They draw in over the scroll progress so a recruiter sees the system
// "detect" things in real time as they read the chapter.
const detections = [
  { id: "helmet", label: "helmet 0.92", x: 18, y: 22, w: 28, h: 24, delay: 0.05 },
  { id: "face", label: "face 0.88", x: 22, y: 28, w: 16, h: 18, delay: 0.18 },
  { id: "vest", label: "vest 0.81", x: 12, y: 48, w: 32, h: 28, delay: 0.32 },
  { id: "plate", label: "plate 0.95", x: 56, y: 60, w: 30, h: 14, delay: 0.5 },
];

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const viewportOpts = { once: true, amount: 0.25 };

export function AIBoxCloseup() {
  // Drive the bbox draw-on from scroll progress through the section so the
  // detections feel scrubbed, not auto-played.
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      id="chapter-4"
      data-chapter="aibox-closeup"
      className={cn("chapter relative overflow-hidden py-24")}
    >
      <div className="container-edge">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          variants={headerVariants}
          className="mb-14 max-w-3xl space-y-3"
        >
          <motion.p
            variants={headerItem}
            className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
          >
            Chapter 04 · AIBox closeup · two production deployments
          </motion.p>
          <motion.h2
            variants={headerItem}
            className="font-display text-5xl md:text-7xl text-balance"
          >
            Edge AI live at Noi Bai airport and a 110 kV substation.
          </motion.h2>
          <motion.p variants={headerItem} className="text-ink-mute text-lg max-w-2xl">
            Shipped to{" "}
            <span className="text-ink">Petrolimex Aviation at Noi Bai International Airport</span>{" "}
            and{" "}
            <span className="text-ink">EVN&rsquo;s 110 kV Mo Lao substation</span>. One
            Jetson box per site, four RTSP cameras, real-time bounding boxes
            streamed back to the cloud over WebRTC. WebSocket events, MJPEG
            fallback, PostgreSQL + pgvector for the analytics tail.
          </motion.p>
        </motion.header>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          {/* Stats column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOpts}
            variants={headerVariants}
            className="space-y-10"
          >
            <ul className="grid grid-cols-3 gap-6">
              {stats.map((s) => (
                <motion.li key={s.label} variants={headerItem} className="space-y-2">
                  <p className="stat text-4xl md:text-5xl">
                    <Counter
                      to={s.to}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      duration={1.4}
                    />
                  </p>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-mute max-w-[10rem]">
                    {s.label}
                  </p>
                </motion.li>
              ))}
            </ul>

            <motion.div
              variants={headerItem}
              className="rounded-2xl border rule bg-bg-elev/60 p-6 sm:p-8"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-mute mb-4">
                Models in the field
              </p>
              <ul className="flex flex-wrap gap-2">
                {models.map((m, i) => (
                  <motion.li
                    key={m}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOpts}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.4 + i * 0.05,
                    }}
                    className="rounded-full border rule px-3 py-1 font-mono text-xs text-ink"
                  >
                    {m}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.p variants={headerItem} className="text-ink-mute text-sm max-w-xl">
              Streaming: <span className="text-ink">WebRTC</span> primary,{" "}
              <span className="text-ink">RTSP</span> for camera ingest,{" "}
              <span className="text-ink">MJPEG</span> fallback. WebSocket
              broadcasts every detection event for the cloud&rsquo;s live timeline.
            </motion.p>
          </motion.div>

          {/* Mock detection frame — bbox draws scrub with scroll */}
          <DetectionFrame scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

type DetectionFrameProps = {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
};

function DetectionFrame({ scrollYProgress }: DetectionFrameProps) {
  // Map the section's scroll progress to a 0..1 detection draw value.
  // Use 0.25..0.7 of section progress (visible mid-scroll) for the reveal.
  const draw = useTransform(scrollYProgress, [0.25, 0.7], [0, 1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOpts}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border rule bg-bg-elev"
    >
      {/* CCTV-feel background — radial vignette + scan lines */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1f2330_0%,#0B0D12_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.5) 2px 3px)",
        }}
      />

      {/* Camera HUD */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between font-mono text-[10px] uppercase tracking-widest text-accent/80">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            CAM-02 · LIVE
          </span>
          <span>1920×1080 · 25 fps</span>
        </div>
        <div className="flex items-center justify-between text-ink-mute">
          <span>RTSP://noibai-aux-02</span>
          <span>WebRTC ↔ Cloud</span>
        </div>
      </div>

      {/* Detection boxes (SVG so we can animate stroke-dashoffset cleanly) */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {detections.map((d) => (
          <DetectionBox key={d.id} det={d} progress={draw} />
        ))}
      </svg>
    </motion.div>
  );
}

type DetectionBoxProps = {
  det: (typeof detections)[number];
  progress: ReturnType<typeof useTransform<number, number>>;
};

function DetectionBox({ det, progress }: DetectionBoxProps) {
  // Each box has its own slot in the master progress (0..1). It draws when
  // progress is between delay and delay + 0.4.
  const start = det.delay;
  const end = Math.min(1, det.delay + 0.4);
  const localProgress = useTransform(progress, [start, end], [0, 1], {
    clamp: true,
  });
  const opacity = useTransform(localProgress, [0, 0.05, 1], [0, 1, 1]);
  const perimeter = (det.w + det.h) * 2;
  const offset = useTransform(localProgress, [0, 1], [perimeter, 0]);

  return (
    <motion.g style={{ opacity }}>
      <motion.rect
        x={det.x}
        y={det.y}
        width={det.w}
        height={det.h}
        fill="none"
        stroke="#6CE5C7"
        strokeWidth={0.4}
        strokeDasharray={perimeter}
        style={{ strokeDashoffset: offset, vectorEffect: "non-scaling-stroke" }}
      />
      <motion.text
        x={det.x + 1}
        y={det.y - 1.2}
        fill="#6CE5C7"
        fontSize={2.2}
        fontFamily="JetBrains Mono, monospace"
        style={{ opacity }}
      >
        {det.label}
      </motion.text>
    </motion.g>
  );
}
