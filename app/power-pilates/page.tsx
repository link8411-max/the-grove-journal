import type { Metadata } from "next";
import ArticleGrid from "@/components/ArticleGrid";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "파워 필라테스",
  description: "미국 뉴욕 Power Pilates의 권위 있는 계보와 클래식 필라테스 철학.",
};

export default function PowerPilatesPage() {
  const posts = getPostsByCategory("power-pilates");

  return (
    <div className="pt-8">
      {/* Page header */}
      <div className="mx-auto max-w-5xl px-6 pt-12 pb-4">
        <span className="text-stone-400 text-[11px] tracking-[0.3em] uppercase">
          Power Pilates
        </span>
        <h1 className="mt-3 font-serif text-3xl md:text-4xl text-stone-900 tracking-tight">
          파워 필라테스
        </h1>
        <p className="mt-4 text-stone-500 text-sm leading-relaxed max-w-xl">
          조셉 필라테스의 직계 계보를 잇는 미국 뉴욕 Power Pilates.
          100% GRATZ 기구와 클래식 메서드의 진정한 가치를 이야기합니다.
        </p>
        <div className="mt-8 w-12 h-px bg-stone-300" />
      </div>

      <ArticleGrid posts={posts} />
    </div>
  );
}
