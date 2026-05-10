import { cn } from "@/lib/utils";

const milestones = [
  {
    year: "2021",
    title: "Hanoi University",
    detail: "B.Sc. IT, Software Engineering — English programme. The PHP-on-WAMP era.",
  },
  {
    year: "2022",
    title: "Devpro J2EE certification",
    detail: "Java Web Full-Stack, eight months of writing servlets after class.",
  },
  {
    year: "2023",
    title: "HANU IT Youth Union — Logistics Lead",
    detail: "Ran logistics for the IT Department Freshmen Welcome and the Warm Spring volunteer campaign.",
  },
  {
    year: "2024",
    title: "British University Vietnam",
    detail: "PHP / Laravel internship in the ICT department. Built a barcode-detection pipeline that retired a manual data-entry workflow.",
  },
  {
    year: "2024",
    title: "HANU Youth Union — Secretary",
    detail: "Led the executive team across campus-wide events. First time owning a roadmap end-to-end.",
  },
];

export function Origin() {
  return (
    <section
      id="chapter-1"
      data-chapter="origin"
      className={cn("chapter container-edge py-24")}
    >
      <header className="mb-14 max-w-3xl space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Chapter 01 · Origin
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-balance">
          The first three years happened on a single laptop in Hanoi.
        </h2>
      </header>

      <ol className="relative grid gap-10 border-l rule pl-8">
        {milestones.map((m) => (
          <li key={m.year + m.title} className="relative">
            <span className="absolute -left-[33px] top-2 size-2 rounded-full bg-accent" />
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
              <span className="stat text-sm uppercase tracking-widest text-ink-mute md:w-24 md:shrink-0">
                {m.year}
              </span>
              <div className="flex-1 space-y-2">
                <h3 className="font-display text-2xl md:text-3xl">{m.title}</h3>
                <p className="text-ink-mute text-base max-w-2xl">{m.detail}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
