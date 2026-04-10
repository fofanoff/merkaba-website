"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { BlogArticle } from "@/data/blog";
import { FadeIn } from "@/components/ui/FadeIn";

const accentColors = ["#E879A8", "#9B59B6", "#3B82F6"];

export function BlogList({
  locale,
  dict,
  articles,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  articles: BlogArticle[];
}) {
  const b = dict.blog;

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-[1.08] mb-6">
              <span className="text-gradient">{b.title}</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {b.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 0.1}>
                <Link
                  href={`/${locale}/blog/${article.slug}`}
                  className="group block rounded-2xl bg-bg-card/50 border border-white/5 p-8 card-glow h-full relative overflow-hidden hover:border-white/10 transition-all duration-300"
                >
                  <div
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{ background: accentColors[i % accentColors.length] }}
                  />
                  <div className="pl-4">
                    <time className="text-text-muted text-xs block mb-3">
                      {formatDate(article.date, locale)}
                    </time>
                    <h2 className="text-xl font-heading font-bold mb-4 text-text-primary group-hover:text-white transition-colors leading-snug">
                      {article.title[locale]}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {article.description[locale]}
                    </p>
                    <span className="text-sm font-medium text-accent-pink group-hover:underline">
                      {b.read_more} &rarr;
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 text-text-primary">
              {b.cta_title}
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              {b.cta_subtitle}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="btn-gradient inline-block px-8 py-4 rounded-xl text-white font-semibold text-lg"
            >
              {b.cta_button}
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  const localeMap: Record<Locale, string> = {
    ru: "ru-RU",
    en: "en-US",
    tr: "tr-TR",
    ar: "ar-SA",
  };
  return date.toLocaleDateString(localeMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
