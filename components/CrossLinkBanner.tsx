import { LINKS } from "@/lib/constants";

interface Props {
  articleTitle: string;
  category: string;
}

export default function CrossLinkBanner({ articleTitle, category }: Props) {
  return (
    <aside className="mt-16 border border-stone-200 bg-white p-8 md:p-10">
      {/* Top section: Naver Blog cross-link */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span className="text-stone-400 text-[11px] tracking-[0.2em] uppercase block mb-2">
            Pilates Grove
          </span>
          <h4 className="font-serif text-lg text-stone-900 leading-snug">
            더 많은 이야기가 궁금하시다면
          </h4>
          <p className="mt-2 text-stone-500 text-sm leading-relaxed max-w-md">
            네이버 블로그에서 더 많은 재활 칼럼과 센터 소식을 만나보세요.
            매거진에서는 보다 심층적인 의학 칼럼을 연재합니다.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={LINKS.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-stone-300 text-stone-700 text-[11px] tracking-[0.15em] uppercase px-5 py-3 hover:border-stone-500 hover:text-stone-900 transition-colors"
          >
            네이버 블로그
          </a>
          <a
            href={LINKS.reserve}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-stone-900 text-white text-[11px] tracking-[0.15em] uppercase px-5 py-3 hover:bg-stone-800 transition-colors"
          >
            상담 예약
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-stone-200" />

      {/* Bottom section: Social links */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="text-stone-400 text-xs">Follow us</span>
        <a
          href={LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-500 hover:text-stone-800 text-xs transition-colors"
        >
          Instagram
        </a>
        <span className="text-stone-300">|</span>
        <a
          href={LINKS.naverPlace}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-500 hover:text-stone-800 text-xs transition-colors"
        >
          네이버 지도
        </a>
        <span className="text-stone-300">|</span>
        <a
          href={LINKS.blog}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-500 hover:text-stone-800 text-xs transition-colors"
        >
          Blog
        </a>
      </div>

      {/* Naver search nudge */}
      <p className="mt-8 text-center font-serif italic text-stone-400 text-[13px] tracking-wide leading-relaxed">
        더 많은 재활 사례와 실시간 소식은 네이버에서
        <br className="sm:hidden" />
        &lsquo;필라테스 그로브&rsquo;를 검색해 보세요.
      </p>
    </aside>
  );
}
