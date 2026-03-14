import { getAllToolSlugs, getCategories } from "@/lib/tools";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://toolradar.de";
  const slugs = getAllToolSlugs();
  const categories = getCategories();

  const toolPages = slugs.map((slug) => ({
    url: `${base}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryPages = categories.map((cat) => ({
    url: `${base}/kategorie/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${base}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...toolPages,
    ...categoryPages,
  ];
}
