import type { Metadata } from "next";
import ArticleGrid from "@/components/ArticleGrid";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "그로브 소식",
  description: "필라테스 그로브의 센터 업데이트와 회원 성공 사례.",
};

export default function GroveStoryPage() {
  const posts = getPostsByCategory("grove-story");

  return (
    <div className="pt-8">
      {/* Page header */}
      <div className="mx-auto max-w-5xl px-6 pt-12 pb-4">
        <span className="text-stone-400 text-[11px] tracking-[0.3em] uppercase">
          Grove Story
        </span>
        <h1 className="mt-3 font-serif text-3xl md:text-4xl text-stone-900 tracking-tight">
          그로브 소식
        </h1>
        <p className="mt-4 text-stone-500 text-sm leading-relaxed max-w-xl">
          필라테스 그로브의 이야기. 센터 소식과 회원분들의 변화를 기록합니다.
        </p>
        <div className="mt-8 w-12 h-px bg-stone-300" />
      </div>

      <ArticleGrid posts={posts} />
    </div>
  );
}
