import { ArrowDown } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

export function ColdOpen() {
  return (
    <section
      id="chapter-0"
      data-chapter="cold-open"
      className={cn("chapter container-edge")}
    >
      <div className="space-y-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-mute">
          Quoc Tran Trung — portfolio
        </p>

        <h1 className="font-display text-balance text-[clamp(3.5rem,11vw,9rem)] leading-[0.95]">
          I ship<br />
          <span className="italic">production</span> systems<br />
          end to end.
        </h1>

        <p className="text-ink-mute text-lg max-w-xl text-balance">
          Full-Stack Engineer · Technical Lead. Edge AI on Jetson, Go on Kubernetes,
          local-first developer tooling. Hanoi, Vietnam.
        </p>

        <div className="flex flex-wrap items-center gap-6 pt-4">
          <MagneticButton href="#chapter-1">
            Begin the story
            <ArrowDown className="size-3.5" aria-hidden />
          </MagneticButton>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-mute inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" />
            Open to lead roles
          </span>
        </div>
      </div>
    </section>
  );
}
