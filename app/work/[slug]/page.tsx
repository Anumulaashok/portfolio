import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/content/projects";
import { site } from "@/content/profile";
import { CaseStudyTemplate } from "@/components/CaseStudyTemplate";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  const title = `${study.title} — ${site.name}`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title, description: study.summary, url: `/work/${study.slug}`, type: "article" },
    twitter: { title, description: study.summary },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const next = caseStudies[(index + 1) % caseStudies.length];
  return <CaseStudyTemplate study={caseStudies[index]} next={next} />;
}
