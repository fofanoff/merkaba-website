import { getDictionary, type Locale } from "@/lib/i18n";
import { PartnersPage } from "@/components/sections/PartnersPage";
import { SchemaOrgPartners } from "@/components/SchemaOrg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ru: "Founding Partners Program - зарабатывайте на AI-революции | Merkaba Digital",
    en: "Founding Partners Program - earn from the AI revolution | Merkaba Digital",
    tr: "Founding Partners Programi - AI devriminden kazanin | Merkaba Digital",
    ar: "برنامج Founding Partners - اربح من ثورة الذكاء الاصطناعي | Merkaba Digital",
  };
  const descriptions: Record<string, string> = {
    ru: "Закрытая программа для 20 партнеров. 10% кэш или 20% на баланс с каждого клиента. Пожизненный recurring",
    en: "Exclusive program for 20 partners. 10% cash or 20% balance from every client. Lifetime recurring",
    tr: "20 partner icin ozel program. Her musteriden %10 nakit veya %20 bakiye. Omur boyu recurring",
    ar: "برنامج حصري لـ 20 شريكاً. 10% نقدي أو 20% رصيد من كل عميل. عائد متكرر مدى الحياة",
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `https://merkaba.vip/${locale}/partners`,
      languages: {
        ru: "https://merkaba.vip/ru/partners",
        en: "https://merkaba.vip/en/partners",
        tr: "https://merkaba.vip/tr/partners",
        ar: "https://merkaba.vip/ar/partners",
        "x-default": "https://merkaba.vip/en/partners",
      },
    },
  };
}

export default async function Partners({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <SchemaOrgPartners locale={locale as Locale} dict={dict} />
      <PartnersPage locale={locale as Locale} dict={dict} />
    </>
  );
}
