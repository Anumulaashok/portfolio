import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/__forms.html" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
