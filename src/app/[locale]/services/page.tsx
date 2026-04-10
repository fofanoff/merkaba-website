import { getDictionary, type Locale } from "@/lib/i18n";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { SchemaOrgServices } from "@/components/SchemaOrg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ru: "GEO услуги - AI Visibility Audit, Monitoring, Content Engineering | Merkaba Digital",
    en: "GEO Services - AI Visibility Audit, Monitoring, Content Engineering | Merkaba Digital",
    tr: "GEO Hizmetleri - AI Visibility Audit, Monitoring, Content Engineering | Merkaba Digital",
    ar: "خدمات GEO - تدقيق رؤية AI، المراقبة، هندسة المحتوى | Merkaba Digital",
  };
  const descriptions: Record<string, string> = {
    ru: "Три программы AI-оптимизации: LAUNCH ($5000), GROWTH ($8500/мес), DOMINANCE ($15000/мес). Structured Data, Entity Building, AI Dashboard",
    en: "Three AI optimization programs: LAUNCH ($5000), GROWTH ($8500/mo), DOMINANCE ($15000/mo). Structured Data, Entity Building, AI Dashboard",
    tr: "Uc AI optimizasyon programi: LAUNCH ($5000), GROWTH ($8500/ay), DOMINANCE ($15000/ay). Structured Data, Entity Building, AI Dashboard",
    ar: "ثلاثة برامج لتحسين AI: LAUNCH ($5000)، GROWTH ($8500/شهر)، DOMINANCE ($15000/شهر). بيانات مهيكلة، بناء الكيان، لوحة تحكم AI",
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `https://merkaba.vip/${locale}/services`,
      languages: {
        ru: "https://merkaba.vip/ru/services",
        en: "https://merkaba.vip/en/services",
        tr: "https://merkaba.vip/tr/services",
        ar: "https://merkaba.vip/ar/services",
        "x-default": "https://merkaba.vip/en/services",
      },
    },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <SchemaOrgServices locale={locale as Locale} dict={dict} />
      <ServicesHero dict={dict} />
      <MethodologySection dict={dict} />
      <PricingSection locale={locale as Locale} dict={dict} detailed />
      <FaqSection dict={dict} section="services" />
    </>
  );
}
