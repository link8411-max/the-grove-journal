import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { CategorySlug } from "./constants";

const contentDirectory = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: CategorySlug;
  excerpt: string;
  thumbnail?: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export function getAllPosts(): PostMeta[] {
  const categories = fs.readdirSync(contentDirectory);
  const posts: PostMeta[] = [];

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      posts.push({
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        category: (data.category ?? category) as CategorySlug,
        excerpt: data.excerpt ?? "",
        thumbnail: data.thumbnail,
      });
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostsByCategory(category: CategorySlug): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export async function getPostBySlug(
  category: string,
  slug: string
): Promise<Post | null> {
  const fullPath = path.join(contentDirectory, category, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    category: (data.category ?? category) as CategorySlug,
    excerpt: data.excerpt ?? "",
    thumbnail: data.thumbnail,
    contentHtml,
  };
}

export function getAllSlugs(): { category: string; slug: string }[] {
  const categories = fs.readdirSync(contentDirectory);
  const slugs: { category: string; slug: string }[] = [];

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      slugs.push({ category, slug: file.replace(/\.md$/, "") });
    }
  }

  return slugs;
}
