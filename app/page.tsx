import HeroSection from "@/components/HeroSection";
import ArticleGrid from "@/components/ArticleGrid";
import ConnectCTA from "@/components/ConnectCTA";
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

      {/* Connect CTA */}
      <ConnectCTA />
    </>
  );
}
