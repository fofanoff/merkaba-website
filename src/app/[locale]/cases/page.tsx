import { getDictionary, type Locale } from "@/lib/i18n";
import { CasesPage } from "@/components/sections/CasesPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.nav.cases} | Merkaba Digital - GEO`,
    description: dict.cases.hero_subtitle,
  };
}

export default async function Cases({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <CasesPage locale={locale as Locale} dict={dict} />;
}
