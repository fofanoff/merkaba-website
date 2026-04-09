import { getDictionary, type Locale } from "@/lib/i18n";
import { HeroSection } from "@/components/sections/HeroSection";
import { PainSection } from "@/components/sections/PainSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ClosingSection } from "@/components/sections/ClosingSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `Merkaba Digital — ${dict.solution.title}`,
    description: dict.hero.subtitle,
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <HeroSection locale={locale as Locale} dict={dict} />
      <PainSection dict={dict} />
      <SolutionSection dict={dict} />
      <DashboardSection dict={dict} />
      <PricingSection locale={locale as Locale} dict={dict} />
      <ClosingSection locale={locale as Locale} dict={dict} />
    </>
  );
}
