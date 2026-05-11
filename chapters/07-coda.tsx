"use client";

import { motion, type Variants } from "framer-motion";
import { Copy } from "lucide-react";
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.show("Email copied");
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
        className="space-y-10 max-w-3xl"
      >
        <motion.p
          variants={item}
          className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          Chapter 07 · Coda
        </motion.p>

        <motion.h2
          variants={item}
          className="font-display text-5xl md:text-8xl text-balance leading-[0.95]"
        >
          Let&rsquo;s talk.
        </motion.h2>

        <motion.p variants={item} className="text-ink-mute text-lg text-balance">
          Open to <span className="text-ink">Full-Stack Engineer</span> and{" "}
          <span className="text-ink">Technical Lead</span> roles. Hanoi-based,
          GMT+7, response within one working day.
        </motion.p>

        <motion.div variants={item}>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={`Copy email address ${EMAIL} to clipboard`}
            className={cn(
              "group flex w-full items-baseline justify-between gap-4 rounded-xl border rule bg-bg-elev/60 px-5 py-4 text-left",
              "transition-all hover:border-accent/60 hover:bg-bg-elev focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
            )}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
              Email
            </span>
            <span className="flex items-baseline gap-3">
              <span className="font-display text-xl text-ink transition-colors group-hover:text-accent">
                {EMAIL}
              </span>
              <Copy
                className="size-3.5 self-center text-ink-mute transition-colors group-hover:text-accent"
                aria-hidden
              />
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
                className="group flex flex-col gap-1 rounded-xl border rule bg-bg-elev/40 px-5 py-4 transition-colors hover:border-accent/40 hover:bg-bg-elev"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
                  {l.label}
                </span>
                <span className="font-display text-lg text-ink transition-colors group-hover:text-accent">
                  {l.value}
                </span>
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.footer variants={item} className="pt-16 border-t rule">
          <p className="font-mono text-xs text-ink-mute">
            Built with Next.js · Tailwind v4 · GSAP · Lenis · Framer Motion.
            Source on GitHub. © {new Date().getFullYear()} Quoc Tran Trung.
          </p>
        </motion.footer>
      </motion.div>
    </section>
  );
}
