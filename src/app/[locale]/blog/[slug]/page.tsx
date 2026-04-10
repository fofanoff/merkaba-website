import { getDictionary, type Locale, locales } from "@/lib/i18n";
import { getArticleBySlug, getAllSlugs } from "@/data/blog";
import { BlogArticle } from "@/components/sections/BlogArticle";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title[(locale as Locale) || "en"],
    description: article.description[(locale as Locale) || "en"],
    authors: [{ name: article.author }],
    alternates: {
      canonical: `https://merkaba.vip/${locale}/blog/${slug}`,
      languages: {
        ru: `https://merkaba.vip/ru/blog/${slug}`,
        en: `https://merkaba.vip/en/blog/${slug}`,
        tr: `https://merkaba.vip/tr/blog/${slug}`,
        ar: `https://merkaba.vip/ar/blog/${slug}`,
        "x-default": `https://merkaba.vip/en/blog/${slug}`,
      },
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return <BlogArticle locale={locale as Locale} dict={dict} article={article} />;
}
