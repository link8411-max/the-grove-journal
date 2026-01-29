import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES, SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE.url}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...categoryEntries,
    ...postEntries,
  ];
}
