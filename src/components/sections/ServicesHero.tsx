"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { FlowerOfLife } from "@/components/ui/FlowerOfLife";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ServicesHero({ dict }: { dict: any }) {
  const rows = dict.services.comparison.rows;

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute top-20 -right-40 pointer-events-none">
        <FlowerOfLife size={500} opacity={0.03} color="#6366F1" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn className="text-center mb-16">
          {dict.services.definition && (
            <p className="page-intro hero-description text-text-muted text-xs mb-4">
              {dict.services.definition}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold max-w-4xl mx-auto leading-tight">
            {dict.services.hero_title}
          </h1>
          {dict.services.last_updated && (
            <p className="text-text-muted text-xs mt-4">{dict.services.last_updated}</p>
          )}
        </FadeIn>

        {/* SEO vs GEO Comparison */}
        <FadeIn delay={0.2}>
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/5">
            {/* Header row */}
            <div className="grid grid-cols-2">
              <div className="p-4 md:p-6 bg-bg-card/30 border-r border-white/5 border-b border-white/5">
                <span className="text-text-muted text-sm font-mono uppercase tracking-wider">
                  {dict.services.comparison.seo_title}
                </span>
              </div>
              <div className="p-4 md:p-6 bg-accent-indigo/5 border-b border-white/5">
                <span className="text-accent-indigo text-sm font-mono uppercase tracking-wider">
                  {dict.services.comparison.geo_title}
                </span>
              </div>
            </div>

            {/* Data rows */}
            {rows.map((row: string[], i: number) => (
              <div
                key={i}
                className={`grid grid-cols-2 ${i < rows.length - 1 ? "border-b border-white/5" : ""}`}
              >
                <div className="p-4 md:p-6 bg-bg-card/20 border-r border-white/5 text-text-muted text-sm">
                  {row[0]}
                </div>
                <div className="p-4 md:p-6 bg-accent-indigo/5 text-text-primary text-sm font-medium">
                  {row[1]}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
