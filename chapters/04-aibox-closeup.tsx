"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
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
  // scrollYProgress drives the scan-line sweep over the real detection frame.
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
            Live at{" "}
            <span className="text-ink">Petrolimex Aviation at Noi Bai International Airport</span>{" "}
            and at{" "}
            <span className="text-ink">EVN&rsquo;s 110 kV Mo Lao substation</span>.
            One rugged box per site watches four cameras at once, spots safety
            violations the instant they happen, and pushes alerts to the cloud
            in under a second. No video ever leaves the site for AI — the
            inference runs right there on the device.
          </motion.p>
        </motion.header>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
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

          {/* Real production frame from Petrolimex Aviation, Noi Bai cam 001.
              The image already carries the live YOLO bounding boxes -- our
              overlay is just the CCTV HUD + a scrub-driven scan line. */}
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
  // A horizontal scan line sweeps top-to-bottom as the user scrolls the
  // section. Maps section-progress 0.25..0.85 -> 0%..100% of the frame.
  const scanY = useTransform(scrollYProgress, [0.25, 0.85], ["0%", "100%"]);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOpts}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative aspect-[16/9] min-h-[20rem] w-full overflow-hidden rounded-2xl border rule bg-bg-elev lg:aspect-auto lg:h-full"
    >
      <Image
        src="/media/aibox-noibai-001.jpg"
        alt="Live frame from AIBox at Petrolimex Aviation, Noi Bai: a refueling truck and ground crew with YOLO bounding boxes drawn around helmets, vests, and a flagged PPE-negative person."
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority={false}
        className="object-cover"
      />

      {/* Slight darken so the HUD reads on top */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"
      />

      {/* Subtle scan-line overlay (CRT feel) */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.5) 2px 3px)",
        }}
      />

      {/* Scrub-driven scan line */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 h-px bg-accent/80 shadow-[0_0_12px_2px_rgba(108,229,199,0.6)]"
        style={{ top: scanY }}
      />

      {/* Camera HUD */}
      <figcaption className="absolute inset-0 flex flex-col justify-between p-4 font-mono text-[10px] uppercase tracking-widest text-accent/90">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            AIB-PA-NOIBAI-001 · LIVE
          </span>
          <span>1920×1080 · 25 fps</span>
        </div>
        <div className="flex items-center justify-between text-ink-mute">
          <span className="truncate max-w-[60%]">
            aivision.petrolimexaviation.com
          </span>
          <span>WebRTC ↔ Cloud</span>
        </div>
      </figcaption>
    </motion.figure>
  );
}
