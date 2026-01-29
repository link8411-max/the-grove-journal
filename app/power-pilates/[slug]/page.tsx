import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getPostsByCategory } from "@/lib/posts";
import { LINKS, SITE } from "@/lib/constants";
import CrossLinkBanner from "@/components/CrossLinkBanner";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug("power-pilates", slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      siteName: SITE.name,
    },
  };
}

export function generateStaticParams() {
  const posts = getPostsByCategory("power-pilates");
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PowerPilatesArticle({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug("power-pilates", slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pt-20 pb-24">
      <Link
        href="/power-pilates"
        className="inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-600 text-sm transition-colors mb-10"
      >
        <ArrowLeft size={14} />
        파워 필라테스
      </Link>

      <span className="block text-stone-400 text-[11px] tracking-[0.3em] uppercase mb-3">
        Power Pilates
      </span>

      <h1 className="font-serif text-3xl md:text-4xl text-stone-900 leading-snug tracking-tight">
        {post.title}
      </h1>

      <time className="block mt-4 text-stone-400 text-sm">
        {new Date(post.date).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>

      <div className="mt-6 w-12 h-px bg-stone-300" />

      <div
        className="prose mt-10"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Cross-link Banner */}
      <CrossLinkBanner articleTitle={post.title} category="power-pilates" />
    </article>
  );
}
