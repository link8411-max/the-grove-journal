import HeroSection from "@/components/HeroSection";
import ArticleGrid from "@/components/ArticleGrid";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <HeroSection />

      {/* Featured articles */}
      <ArticleGrid
        posts={posts.slice(0, 6)}
        title="Latest"
        subtitle="스포츠 재활 전문가가 전하는 움직임 이야기"
      />

      {/* Newsletter CTA */}
      <section className="bg-white border-t border-b border-stone-200">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-4">
            매주 1편의 재활 칼럼을 받아보세요
          </h2>
          <p className="text-stone-500 text-sm mb-8 max-w-md mx-auto">
            광교의 스포츠 재활 전문가가 전하는 의학적 인사이트를 가장 먼저 만나보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="이메일 주소"
              className="flex-1 px-4 py-3 border border-stone-300 text-sm bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500 transition-colors"
            />
            <button className="bg-stone-900 text-white text-[11px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-stone-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
