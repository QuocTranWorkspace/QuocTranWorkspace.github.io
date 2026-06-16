"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/components/providers/LocaleProvider";
import { strings } from "@/content/strings";
import { t } from "@/lib/i18n";
import { showRouteLoader } from "@/lib/route-loader";

export default function NotFound() {
  const { locale } = useLocale();
  const s = strings.notFound;

  return (
    <main className="container-edge chapter">
      <div className="max-w-xl space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {t(s.eyebrow, locale)}
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-balance leading-[0.95]">
          {t(s.headline, locale)}
        </h1>
        <p className="text-ink-mute text-lg max-w-prose">
          {t(s.body, locale)}
        </p>
        <Link
          href="/#chapter-3"
          scroll={false}
          onClick={() => {
            // Same masking as the other internal nav points — the route
            // loader covers the home-page mount + scroll-to-chapter-3 hop.
            showRouteLoader();
          }}
          className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-bg-elev px-5 py-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-bg"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          {t(s.cta, locale)}
        </Link>
      </div>
    </main>
  );
}
