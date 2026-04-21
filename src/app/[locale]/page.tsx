import { getDictionary, type Locale } from "@/lib/i18n";
import { HeroSection } from "@/components/sections/HeroSection";
import { ScanContextSection } from "@/components/sections/ScanContextSection";
import { PainSection } from "@/components/sections/PainSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { SchemaOrgHome } from "@/components/SchemaOrg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ru: "Merkaba Digital - Generative Engine Optimization (GEO)",
    en: "Merkaba Digital - Generative Engine Optimization (GEO)",
    tr: "Merkaba Digital - Generative Engine Optimization (GEO)",
    ar: "Merkaba Digital - Generative Engine Optimization (GEO)",
  };
  const descriptions: Record<string, string> = {
    ru: "Делаем бизнес видимым для AI. Оптимизация для ChatGPT, Gemini, Perplexity, Claude. AI Visibility Audit, мониторинг, контент-инжиниринг. merkaba.vip",
    en: "Making businesses visible to AI. Optimization for ChatGPT, Gemini, Perplexity, Claude. AI Visibility Audit, monitoring, content engineering. merkaba.vip",
    tr: "Isletmenizi AI icin gorunur kiliyoruz. ChatGPT, Gemini, Perplexity, Claude icin optimizasyon. merkaba.vip",
    ar: "نجعل عملك مرئيا للذكاء الاصطناعي. التحسين لـ ChatGPT وGemini وPerplexity وClaude. merkaba.vip",
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `https://merkaba.vip/${locale}`,
      languages: {
        ru: "https://merkaba.vip/ru",
        en: "https://merkaba.vip/en",
        tr: "https://merkaba.vip/tr",
        ar: "https://merkaba.vip/ar",
        "x-default": "https://merkaba.vip/en",
      },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <SchemaOrgHome locale={locale as Locale} dict={dict} />
      <HeroSection locale={locale as Locale} dict={dict} />
      <ScanContextSection locale={locale as Locale} dict={dict} />
      <PainSection dict={dict} />
      <SolutionSection dict={dict} />
      <DashboardSection locale={locale as Locale} dict={dict} />
      <PricingSection locale={locale as Locale} dict={dict} />
      <FaqSection dict={dict} section="home" />
      <ClosingSection locale={locale as Locale} dict={dict} />
    </>
  );
}
