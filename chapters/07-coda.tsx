import { cn } from "@/lib/utils";

const links = [
  { label: "Email", href: "mailto:quoctranworkspace@gmail.com", value: "quoctranworkspace@gmail.com" },
  { label: "GitHub", href: "https://github.com/QuocTranWorkspace", value: "@QuocTranWorkspace" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/quoc-tran-trung-070b34268/", value: "quoc-tran-trung" },
  { label: "mnemo", href: "https://github.com/mmct-jsc/mnemo", value: "mmct-jsc/mnemo" },
];

export function Coda() {
  return (
    <section
      id="chapter-7"
      data-chapter="coda"
      className={cn("chapter container-edge py-24")}
    >
      <div className="space-y-10 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Chapter 07 · Coda
        </p>

        <h2 className="font-display text-5xl md:text-8xl text-balance leading-[0.95]">
          Let&rsquo;s talk.
        </h2>

        <p className="text-ink-mute text-lg text-balance">
          Open to <span className="text-ink">Full-Stack Engineer</span> and{" "}
          <span className="text-ink">Technical Lead</span> roles. Hanoi-based, GMT+7,
          response within one working day.
        </p>

        <ul className="grid gap-4 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="group flex items-baseline justify-between gap-4 rounded-xl border rule bg-bg-elev/40 px-5 py-4 transition-colors hover:border-accent/40 hover:bg-bg-elev"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-ink-mute">
                  {l.label}
                </span>
                <span className="font-display text-xl text-ink group-hover:text-accent transition-colors">
                  {l.value}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="pt-16 border-t rule">
          <p className="font-mono text-xs text-ink-mute">
            Built with Next.js · Tailwind v4 · GSAP · Lenis · Framer Motion. Source on
            GitHub. © {new Date().getFullYear()} Quoc Tran Trung.
          </p>
        </footer>
      </div>
    </section>
  );
}
