import { LINKS } from "@/lib/constants";

export default function ConnectCTA() {
  return (
    <section className="bg-white border-t border-b border-stone-200">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="w-10 h-px bg-stone-300 mx-auto mb-8" />

        <h2 className="font-serif text-2xl md:text-3xl text-stone-900 mb-4">
          더 가까이에서 만나보세요
        </h2>
        <p className="text-stone-500 text-sm mb-10 max-w-md mx-auto leading-relaxed">
          블로그에서 더 많은 칼럼을, 인스타그램에서 일상을,
          <br className="hidden sm:block" />
          그리고 직접 만나 움직임의 변화를 경험해 보세요.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={LINKS.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 border border-stone-300 text-stone-700 text-[11px] tracking-[0.15em] uppercase hover:bg-stone-50 transition-colors"
          >
            네이버 블로그
          </a>
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 border border-stone-300 text-stone-700 text-[11px] tracking-[0.15em] uppercase hover:bg-stone-50 transition-colors"
          >
            Instagram
          </a>
          <a
            href={LINKS.reserve}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 text-white text-[11px] tracking-[0.15em] uppercase hover:bg-stone-800 transition-colors"
          >
            상담 예약하기
          </a>
        </div>
      </div>
    </section>
  );
}
