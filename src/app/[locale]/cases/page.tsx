import { getDictionary, type Locale } from "@/lib/i18n";
import { CasesPage } from "@/components/sections/CasesPage";
import { SchemaOrgCases } from "@/components/SchemaOrg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ru: "GEO кейсы и результаты - до +840% AI Visibility | Merkaba Digital",
    en: "GEO Case Studies and Results - up to +840% AI Visibility | Merkaba Digital",
    tr: "GEO Vaka Calismalari ve Sonuclar - +840% AI Visibility | Merkaba Digital",
    ar: "دراسات حالة GEO والنتائج - حتى +840% رؤية AI | Merkaba Digital",
  };
  const descriptions: Record<string, string> = {
    ru: "Реальные результаты Generative Engine Optimization. AI Visibility Score с 5% до 47% за 4 месяца. Демо-дашборд доступен онлайн",
    en: "Real Generative Engine Optimization results. AI Visibility Score from 5% to 47% in 4 months. Demo dashboard available online",
    tr: "Gercek Generative Engine Optimization sonuclari. AI Visibility Score 4 ayda %5'ten %47'ye. Demo dashboard cevrimici mevcut",
    ar: "نتائج حقيقية لـ Generative Engine Optimization. نقاط رؤية AI من 5% إلى 47% في 4 أشهر. لوحة تحكم تجريبية متاحة عبر الإنترنت",
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `https://merkaba.vip/${locale}/cases`,
      languages: {
        ru: "https://merkaba.vip/ru/cases",
        en: "https://merkaba.vip/en/cases",
        tr: "https://merkaba.vip/tr/cases",
        ar: "https://merkaba.vip/ar/cases",
        "x-default": "https://merkaba.vip/en/cases",
      },
    },
  };
}

export default async function Cases({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <SchemaOrgCases locale={locale as Locale} dict={dict} />
      <CasesPage locale={locale as Locale} dict={dict} />
    </>
  );
}
