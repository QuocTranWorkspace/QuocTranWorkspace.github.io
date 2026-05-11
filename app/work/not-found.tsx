import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container-edge chapter">
      <div className="max-w-xl space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          404 · Work
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-balance leading-[0.95]">
          That deep-dive isn&rsquo;t shipped yet.
        </h1>
        <p className="text-ink-mute text-lg max-w-prose">
          Only a few projects from the bento have full write-ups so far. Head
          back to the lead-arc chapter to see the rest as tiles.
        </p>
        <Link
          href="/#chapter-3"
          className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-bg-elev px-5 py-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-bg"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
