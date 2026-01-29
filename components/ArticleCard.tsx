import Link from "next/link";
import { Stethoscope, Dumbbell, TreePine } from "lucide-react";
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

const CATEGORY_STYLES: Record<
  string,
  { gradient: string; icon: React.ReactNode }
> = {
  "medical-column": {
    gradient: "from-stone-100 via-stone-50 to-amber-50",
    icon: <Stethoscope size={28} className="text-stone-400" strokeWidth={1.5} />,
  },
  "power-pilates": {
    gradient: "from-stone-100 via-stone-50 to-stone-200",
    icon: <Dumbbell size={28} className="text-stone-400" strokeWidth={1.5} />,
  },
  "grove-story": {
    gradient: "from-stone-100 via-stone-50 to-emerald-50",
    icon: <TreePine size={28} className="text-stone-400" strokeWidth={1.5} />,
  },
};

export default function ArticleCard({ post }: { post: PostMeta }) {
  const category = CATEGORIES.find((c) => c.slug === post.category);
  const style = CATEGORY_STYLES[post.category] ?? CATEGORY_STYLES["medical-column"];

  return (
    <article className="group">
      <Link href={`/${post.category}/${post.slug}`} className="block">
        {/* Thumbnail */}
        <div className="aspect-[4/3] mb-5 overflow-hidden rounded-sm group-hover:shadow-lg transition-shadow duration-300">
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div
              className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${style.gradient} group-hover:scale-105 transition-transform duration-500`}
            >
              {style.icon}
              <span className="mt-3 font-serif text-stone-400 text-sm italic tracking-wide">
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
        <h3 className="mt-2 font-serif text-xl md:text-2xl text-stone-900 leading-snug group-hover:text-stone-700 transition-colors duration-200">
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
