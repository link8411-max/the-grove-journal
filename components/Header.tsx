"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LINKS, CATEGORIES } from "@/lib/constants";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/60">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link href="/" className="text-stone-900 tracking-[0.25em] text-sm font-semibold uppercase">
          The Grove Journal
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="text-stone-600 hover:text-stone-900 text-[13px] tracking-wide transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        {/* Reserve Button + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href={LINKS.reserve}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex bg-stone-900 text-white text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-stone-800 transition-colors"
          >
            Reserve
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-stone-700 p-1"
            aria-label="메뉴 토글"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-stone-50 border-b border-stone-200 px-6 pb-6 pt-2">
          <nav className="flex flex-col gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="text-stone-700 hover:text-stone-900 text-sm tracking-wide"
              >
                {cat.label}
              </Link>
            ))}
            <a
              href={LINKS.reserve}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-stone-900 text-white text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 text-center mt-2 hover:bg-stone-800 transition-colors"
            >
              Reserve
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
