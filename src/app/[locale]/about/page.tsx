import { getDictionary, type Locale } from "@/lib/i18n";
import { AboutPage } from "@/components/sections/AboutPage";
import { SchemaOrgAbout } from "@/components/SchemaOrg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ru: "О Merkaba Digital - 15+ лет digital-экспертизы, инженерный подход к GEO",
    en: "About Merkaba Digital - 15+ years of digital expertise, engineering approach to GEO",
    tr: "Merkaba Digital Hakkinda - 15+ yil dijital uzmanlik, GEO'ya muhendislik yaklasimi",
    ar: "عن Merkaba Digital - أكثر من 15 عاماً من الخبرة الرقمية، نهج هندسي تجاه GEO",
  };
  const descriptions: Record<string, string> = {
    ru: "Не агентство, а инженеры AI-видимости. Понимаем механику LLM, structured data и алгоритмов цитирования. Проприетарные инструменты мониторинга",
    en: "Not an agency, but AI visibility engineers. We understand LLM mechanics, structured data and citation algorithms. Proprietary monitoring tools",
    tr: "Ajans degil, AI gorunurluk muhendisleri. LLM mekanigi, structured data ve alintilar algoritmalari anliyoruz",
    ar: "لسنا وكالة، بل مهندسو رؤية AI. نفهم آليات نماذج اللغة الكبيرة والبيانات المهيكلة وخوارزميات الاستشهاد",
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `https://merkaba.vip/${locale}/about`,
      languages: {
        ru: "https://merkaba.vip/ru/about",
        en: "https://merkaba.vip/en/about",
        tr: "https://merkaba.vip/tr/about",
        ar: "https://merkaba.vip/ar/about",
        "x-default": "https://merkaba.vip/en/about",
      },
    },
  };
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <SchemaOrgAbout locale={locale as Locale} dict={dict} />
      <AboutPage locale={locale as Locale} dict={dict} />
    </>
  );
}
