import { ArrowDown } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RevealText } from "@/components/motion/RevealText";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/utils";

export function ColdOpen() {
  return (
    <section
      id="chapter-0"
      data-chapter="cold-open"
      className={cn("chapter container-edge")}
    >
      <div className="space-y-8">
        <FadeUp delay={0}>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-mute">
            Quoc Tran Trung — portfolio
          </p>
        </FadeUp>

        <RevealText
          as="h1"
          delay={0.15}
          text={"I ship\n*production* systems\nend to end."}
          className="font-display text-balance text-[clamp(3.5rem,11vw,9rem)] leading-[0.95]"
        />

        <FadeUp delay={0.9}>
          <p className="text-ink-mute text-lg max-w-xl text-balance">
            Full-Stack Engineer · Technical Lead. AI cameras at airports,
            cloud platforms that scale, and tools that help small teams ship
            big things. Based in Hanoi.
          </p>
        </FadeUp>

        <FadeUp delay={1.15}>
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <MagneticButton href="#chapter-1">
              Begin the story
              <ArrowDown className="size-3.5" aria-hidden />
            </MagneticButton>
            <span className="font-mono text-xs uppercase tracking-widest text-ink-mute inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              Open to lead roles
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
