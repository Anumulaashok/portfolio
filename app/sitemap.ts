import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/profile";

export const dynamic = "force-static";

const siteUrl = "https://anumulaashokportfolio.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date() },
    ...caseStudies.map((study) => ({
      url: `${siteUrl}/work/${study.slug}`,
      lastModified: new Date(),
    })),
  ];
}
