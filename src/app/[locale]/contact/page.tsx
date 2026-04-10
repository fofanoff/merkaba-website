import { getDictionary, type Locale } from "@/lib/i18n";
import { ContactForm } from "@/components/sections/ContactForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { SchemaOrgContact } from "@/components/SchemaOrg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ru: "Бесплатный AI-аудит вашего бизнеса за 48 часов | Merkaba Digital",
    en: "Free AI Audit of Your Business in 48 Hours | Merkaba Digital",
    tr: "48 Saat Icinde Isletmenizin Ucretsiz AI Denetimi | Merkaba Digital",
    ar: "تدقيق AI مجاني لعملك خلال 48 ساعة | Merkaba Digital",
  };
  const descriptions: Record<string, string> = {
    ru: "Узнайте, что AI говорит о вашем бизнесе. Аудит видимости в ChatGPT, Gemini, Perplexity. merkaba.vip",
    en: "Find out what AI says about your business. Visibility audit in ChatGPT, Gemini, Perplexity. merkaba.vip",
    tr: "AI'nin isletmeniz hakkinda ne soyledigini ogrenin. ChatGPT, Gemini, Perplexity'de gorunurluk denetimi. merkaba.vip",
    ar: "اكتشف ماذا يقول AI عن عملك. تدقيق الرؤية في ChatGPT وGemini وPerplexity. merkaba.vip",
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `https://merkaba.vip/${locale}/contact`,
      languages: {
        ru: "https://merkaba.vip/ru/contact",
        en: "https://merkaba.vip/en/contact",
        tr: "https://merkaba.vip/tr/contact",
        ar: "https://merkaba.vip/ar/contact",
        "x-default": "https://merkaba.vip/en/contact",
      },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <SchemaOrgContact locale={locale as Locale} dict={dict} />
      <ContactForm dict={dict} />
      <FaqSection dict={dict} section="contact" />
    </>
  );
}
