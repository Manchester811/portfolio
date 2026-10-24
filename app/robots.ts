import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing to index behind the form endpoint.
      disallow: ["/api/"],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteConfig.siteUrl,
  };
}
