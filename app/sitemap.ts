import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";
import { caseStudies } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    ...caseStudies.map((study) => ({
      url: `${siteUrl}/work/${study.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
