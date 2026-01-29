import type { PostMeta } from "@/lib/posts";
import ArticleCard from "./ArticleCard";

interface Props {
  posts: PostMeta[];
  title?: string;
  subtitle?: string;
}

export default function ArticleGrid({ posts, title, subtitle }: Props) {
  if (posts.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-stone-400 text-sm">아직 발행된 글이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      {(title || subtitle) && (
        <div className="mb-12 md:mb-16">
          {title && (
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 text-stone-500 text-sm tracking-wide">
              {subtitle}
            </p>
          )}
          <div className="mt-6 w-12 h-px bg-stone-300" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
        {posts.map((post) => (
          <ArticleCard key={`${post.category}-${post.slug}`} post={post} />
        ))}
      </div>
    </section>
  );
}
