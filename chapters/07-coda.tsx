"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const EMAIL = "quoctranworkspace@gmail.com";

const externalLinks = [
  { label: "GitHub", href: "https://github.com/QuocTranWorkspace", value: "@QuocTranWorkspace" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/quoc-tran-trung-070b34268/", value: "quoc-tran-trung" },
  { label: "mnemo", href: "https://github.com/mmct-jsc/mnemo", value: "mmct-jsc/mnemo" },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const viewportOpts = { once: true, amount: 0.3 };

export function Coda() {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const copyResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.show("Email copied");
      setCopied(true);
      if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
      copyResetTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard API blocked (older browser, insecure context). Fall back
      // to the mailto: link — the anchor wrapper handles it.
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section
      id="chapter-7"
      data-chapter="coda"
      className={cn("chapter container-edge py-24")}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        variants={container}
        className="flex w-full flex-col gap-14"
      >
        {/* Heading row — headline left, intro balanced on the right at lg+ */}
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div className="space-y-5">
            <motion.p
              variants={item}
              className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
            >
              Chapter 07 · Coda
            </motion.p>
            <motion.h2
              variants={item}
              className="font-display leading-[0.92] text-balance text-6xl md:text-8xl xl:text-[9.5rem]"
            >
              Let&rsquo;s talk.
            </motion.h2>
          </div>
          <motion.p
            variants={item}
            className="text-ink-mute text-lg text-balance lg:pb-4"
          >
            Open to <span className="text-ink">Full-Stack Engineer</span> and{" "}
            <span className="text-ink">Technical Lead</span> roles. Hanoi-based,
            GMT+7, response within one working day.
          </motion.p>
        </div>

        {/* Contact rail — spans the full container width */}
        <div className="space-y-4">
          <motion.div variants={item}>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email address ${EMAIL} to clipboard`}
              className={cn(
                "group flex w-full flex-col gap-3 rounded-2xl border rule bg-bg-elev/60 px-6 py-6 text-left sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-8",
                "transition-all hover:border-accent/60 hover:bg-bg-elev focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
              )}
            >
              <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-ink-mute">
                Email — tap to copy
              </span>
              <span className="flex min-w-0 items-center gap-3">
                <span className="min-w-0 break-all font-display text-lg text-ink transition-colors group-hover:text-accent sm:text-2xl md:text-3xl">
                  {EMAIL}
                </span>
                {/* Swap Copy <-> Check on copy — a tiny rotate+scale crossfade
                    so the affordance reads as a confirmed state, not just a
                    silent toast. Resets after 2.2 s. */}
                <span
                  aria-hidden
                  className="relative inline-flex size-5 shrink-0 items-center justify-center"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0 inline-flex items-center justify-center text-accent"
                      >
                        <Check className="size-4" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0 inline-flex items-center justify-center text-ink-mute transition-colors group-hover:text-accent"
                      >
                        <Copy className="size-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </span>
            </button>
          </motion.div>

          <motion.ul variants={item} className="grid gap-4 sm:grid-cols-3">
            {externalLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-1 rounded-2xl border rule bg-bg-elev/40 px-6 py-5 transition-colors hover:border-accent/40 hover:bg-bg-elev"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
                    {l.label}
                  </span>
                  <span className="font-display text-xl text-ink transition-colors group-hover:text-accent">
                    {l.value}
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.footer variants={item} className="border-t rule pt-10">
          <p className="text-center font-mono text-xs text-ink-mute">
            Built with Next.js · Tailwind v4 · GSAP · Lenis · Framer Motion.
            Source on GitHub. © {new Date().getFullYear()} Quoc Tran Trung.
          </p>
        </motion.footer>
      </motion.div>
    </section>
  );
}
