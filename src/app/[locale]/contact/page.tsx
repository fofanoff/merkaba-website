import { getDictionary, type Locale } from "@/lib/i18n";
import { ContactForm } from "@/components/sections/ContactForm";
import { FaqSection } from "@/components/sections/FaqSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.nav.contact} | Merkaba Digital — GEO`,
    description: dict.contact.hero_subtitle,
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <ContactForm dict={dict} />
      <FaqSection dict={dict} section="contact" />
    </>
  );
}
