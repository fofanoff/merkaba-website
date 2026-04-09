import { getDictionary, type Locale } from "@/lib/i18n";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqSection } from "@/components/sections/FaqSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.nav.services} | Merkaba Digital - GEO`,
    description: dict.services.hero_title,
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <ServicesHero dict={dict} />
      <MethodologySection dict={dict} />
      <PricingSection locale={locale as Locale} dict={dict} detailed />
      <FaqSection dict={dict} section="services" />
    </>
  );
}
