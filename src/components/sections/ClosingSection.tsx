"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { FlowerOfLife } from "@/components/ui/FlowerOfLife";
import type { Locale } from "@/lib/i18n";

export function ClosingSection({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  return (
    <section className="py-24 md:py-32 relative bg-bg-secondary/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <FlowerOfLife size={700} opacity={0.03} color="#D4A843" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            {dict.closing.title}
          </h2>
          <p className="text-text-secondary text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            {dict.closing.subtitle}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex btn-gradient text-white font-semibold px-10 py-5 rounded-xl text-lg"
          >
            {dict.closing.cta}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
