import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/features", "/resume-guide"];

  return pages.flatMap((path, index) => {
    const url = absoluteSiteUrl(path);
    if (!url) return [];

    return [
      {
        url,
        changeFrequency: index === 0 ? "weekly" : "monthly",
        priority: index === 0 ? 1 : 0.7,
      },
    ];
  });
}
