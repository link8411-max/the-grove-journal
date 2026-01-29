import type { Metadata } from "next";
import ArticleGrid from "@/components/ArticleGrid";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "의학 칼럼",
  description: "스포츠 재활 전문가의 깊이 있는 건강 아티클. 통증의 진짜 원인과 재활적 해결책을 전합니다.",
};

export default function MedicalColumnPage() {
  const posts = getPostsByCategory("medical-column");

  return (
    <div className="pt-8">
      {/* Page header */}
      <div className="mx-auto max-w-5xl px-6 pt-12 pb-4">
        <span className="text-stone-400 text-[11px] tracking-[0.3em] uppercase">
          Medical Column
        </span>
        <h1 className="mt-3 font-serif text-3xl md:text-4xl text-stone-900 tracking-tight">
          의학 칼럼
        </h1>
        <p className="mt-4 text-stone-500 text-sm leading-relaxed max-w-xl">
          스포츠건강재활 석사이자 미국 Power Pilates 지도자가 전하는 깊이 있는 건강 아티클.
          통증의 진짜 원인을 파헤치고, 재활적 해결책을 제시합니다.
        </p>
        <div className="mt-8 w-12 h-px bg-stone-300" />
      </div>

      <ArticleGrid posts={posts} />
    </div>
  );
}
