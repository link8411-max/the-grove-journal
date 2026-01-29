import { SITE } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-32 md:py-44 bg-stone-50">
      {/* Subtle decorative line */}
      <div className="w-12 h-px bg-stone-300 mb-10" />

      {/* English headline */}
      <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-stone-900 tracking-tight text-center leading-tight">
        {SITE.tagline}
      </h1>

      {/* Korean sub-headline */}
      <p className="mt-5 text-stone-500 text-base md:text-lg tracking-wide text-center">
        {SITE.taglineKr}
      </p>

      {/* Decorative detail */}
      <div className="mt-10 flex items-center gap-3">
        <div className="w-8 h-px bg-stone-300" />
        <span className="text-stone-400 text-[11px] tracking-[0.3em] uppercase">
          Pilates Grove
        </span>
        <div className="w-8 h-px bg-stone-300" />
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
    </section>
  );
}
