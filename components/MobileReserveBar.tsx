"use client";

import { LINKS } from "@/lib/constants";

export default function MobileReserveBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-stone-900 border-t border-stone-800 safe-area-bottom">
      <a
        href={LINKS.reserve}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-14 text-white text-[12px] tracking-[0.2em] uppercase font-medium"
      >
        Reserve — 상담 예약
      </a>
    </div>
  );
}
