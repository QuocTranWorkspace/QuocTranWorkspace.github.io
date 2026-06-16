import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkArticle } from "@/components/work/WorkArticle";
import { works, workSlugs } from "@/content/work";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return workSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = works[slug];
  if (!entry) {
    return { title: "Work" };
  }
  // Metadata is rendered at static-export time, before the client locale
  // is known — use the EN copy as the SEO surface. The page body still
  // swaps to VI client-side via <WorkArticle> + useLocale.
  const description = entry.tagline.en;
  return {
    title: entry.name,
    description,
    openGraph: {
      title: `${entry.name} · Quoc Tran Trung`,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${entry.name} · Quoc Tran Trung`,
      description,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = works[slug];
  if (!entry) notFound();
  return <WorkArticle entry={entry} />;
}
