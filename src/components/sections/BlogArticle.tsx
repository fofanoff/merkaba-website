"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { BlogArticle as BlogArticleType } from "@/data/blog";
import { FadeIn } from "@/components/ui/FadeIn";

export function BlogArticle({
  locale,
  dict,
  article,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  article: BlogArticleType;
}) {
  const b = dict.blog;

  return (
    <main>
      {/* Breadcrumbs + header */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, #9B59B6 0%, transparent 70%)" }}
          />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
              <Link href={`/${locale}`} className="hover:text-text-secondary transition-colors">
                {dict.nav.home}
              </Link>
              <span>/</span>
              <Link href={`/${locale}/blog`} className="hover:text-text-secondary transition-colors">
                {b.nav_label}
              </Link>
              <span>/</span>
              <span className="text-text-secondary truncate max-w-[200px]">
                {article.title[locale]}
              </span>
            </nav>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-text-muted mb-6">
              <time>{formatDate(article.date, locale)}</time>
              <span className="w-1 h-1 rounded-full bg-text-muted" />
              <span>{article.author}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold leading-tight mb-4">
              {article.title[locale]}
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed">
              {article.description[locale]}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Article content */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: article.content[locale] }}
            />
          </FadeIn>
        </div>
      </section>

      {/* Back to blog CTA */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Link
              href={`/${locale}/blog`}
              className="inline-flex text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
            >
              &larr; {b.back_to_blog}
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
