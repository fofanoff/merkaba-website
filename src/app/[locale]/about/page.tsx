import { getDictionary, type Locale } from "@/lib/i18n";
import { AboutPage } from "@/components/sections/AboutPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.nav.about} | Merkaba Digital - GEO`,
    description: dict.about.hero_subtitle,
  };
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return <AboutPage locale={locale as Locale} dict={dict} />;
}
