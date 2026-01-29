import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { CATEGORIES } from "@/lib/constants";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticleCard({ post }: { post: PostMeta }) {
  const category = CATEGORIES.find((c) => c.slug === post.category);

  return (
    <article className="group">
      <Link href={`/${post.category}/${post.slug}`} className="block">
        {/* Thumbnail placeholder */}
        <div className="aspect-[4/3] bg-stone-200 mb-5 overflow-hidden">
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
              <span className="font-serif text-stone-400 text-lg italic">
                {category?.labelEn ?? "Article"}
              </span>
            </div>
          )}
        </div>

        {/* Category tag */}
        <span className="text-stone-500 text-[11px] tracking-[0.15em] uppercase">
          {category?.label ?? post.category}
        </span>

        {/* Title */}
        <h3 className="mt-2 font-serif text-xl md:text-2xl text-stone-900 leading-snug group-hover:text-stone-600 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-2.5 text-stone-500 text-sm leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {/* Date */}
        <time className="mt-3 block text-stone-400 text-xs">
          {formatDate(post.date)}
        </time>
      </Link>
    </article>
  );
}
