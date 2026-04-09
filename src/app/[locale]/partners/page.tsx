import { getDictionary, type Locale } from "@/lib/i18n";
import { PartnersPage } from "@/components/sections/PartnersPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `Founding Partners | Merkaba Digital`,
    description: dict.partners.hero_subtitle,
  };
}

export default async function Partners({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <PartnersPage locale={locale as Locale} dict={dict} />;
}
