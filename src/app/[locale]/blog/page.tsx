import { getDictionary, type Locale } from "@/lib/i18n";
import { blogArticles } from "@/data/blog";
import { BlogList } from "@/components/sections/BlogList";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ru: "Блог Merkaba Digital - статьи о GEO, AI-видимости и оптимизации для AI",
    en: "Merkaba Digital Blog - articles on GEO, AI visibility and AI optimization",
    tr: "Merkaba Digital Blog - GEO, AI gorunurlugu ve AI optimizasyonu hakkinda makaleler",
    ar: "مدونة Merkaba Digital - مقالات عن GEO وظهور AI وتحسين الذكاء الاصطناعي",
  };
  const descriptions: Record<string, string> = {
    ru: "Экспертные статьи о Generative Engine Optimization, AI Visibility Score и стратегиях видимости в ChatGPT, Gemini, Perplexity",
    en: "Expert articles on Generative Engine Optimization, AI Visibility Score and visibility strategies for ChatGPT, Gemini, Perplexity",
    tr: "Generative Engine Optimization, AI Visibility Score ve ChatGPT, Gemini, Perplexity icin gorunurluk stratejileri hakkinda uzman makaleleri",
    ar: "مقالات متخصصة حول Generative Engine Optimization وAI Visibility Score واستراتيجيات الظهور في ChatGPT وGemini وPerplexity",
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `https://merkaba.vip/${locale}/blog`,
      languages: {
        ru: "https://merkaba.vip/ru/blog",
        en: "https://merkaba.vip/en/blog",
        tr: "https://merkaba.vip/tr/blog",
        ar: "https://merkaba.vip/ar/blog",
        "x-default": "https://merkaba.vip/en/blog",
      },
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <BlogList locale={locale as Locale} dict={dict} articles={blogArticles} />;
}
