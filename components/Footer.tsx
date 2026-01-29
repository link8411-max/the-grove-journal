import Link from "next/link";
import { Instagram } from "lucide-react";
import { LINKS, CATEGORIES, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-stone-900 tracking-[0.2em] text-sm font-semibold uppercase mb-4">
              {SITE.name}
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              스포츠건강재활 석사 &amp; 미국 Power Pilates 지도자가 이끄는
              광교의 클래식 필라테스 스튜디오.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-stone-700 text-xs tracking-[0.15em] uppercase mb-4">
              Magazine
            </h4>
            <nav className="flex flex-col gap-2.5">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="text-stone-500 hover:text-stone-800 text-sm transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-stone-700 text-xs tracking-[0.15em] uppercase mb-4">
              Connect
            </h4>
            <nav className="flex flex-col gap-2.5">
              <a
                href={LINKS.naverPlace}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-800 text-sm transition-colors"
              >
                네이버 플레이스
              </a>
              <a
                href={LINKS.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-800 text-sm transition-colors"
              >
                네이버 블로그
              </a>
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-800 text-sm transition-colors inline-flex items-center gap-1.5"
              >
                <Instagram size={14} />
                Instagram
              </a>
              <a
                href={LINKS.reserve}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-800 text-sm transition-colors"
              >
                예약하기
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-stone-400 text-xs">
            &copy; {new Date().getFullYear()} Pilates Grove. All rights reserved.
          </p>
          <p className="text-stone-400 text-xs italic font-serif">
            {SITE.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
