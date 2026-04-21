"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Locale } from "@/lib/i18n";

export function ScanContextSection({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const s = dict.scan_context;
  if (!s) return null;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          {s.eyebrow && (
            <p className="text-accent-indigo text-xs font-mono uppercase tracking-wider mb-4">
              {s.eyebrow}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
            {s.headline}
          </h2>
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-6">
            {s.subheadline}
          </p>
          {s.supporting && (
            <p className="text-sm md:text-base text-text-muted leading-relaxed mb-10 max-w-3xl">
              {s.supporting}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://app.merkaba.vip/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient text-white font-semibold px-8 py-4 rounded-xl text-lg text-center"
            >
              {s.cta_primary}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="border border-white/10 hover:border-white/20 text-text-primary font-semibold px-8 py-4 rounded-xl text-lg text-center transition-colors hover:bg-white/5"
            >
              {s.cta_secondary}
            </Link>
          </div>

          {s.microcopy && (
            <p className="mt-4 text-xs text-text-muted">{s.microcopy}</p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
