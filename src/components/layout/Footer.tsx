import Link from "next/link";
import Image from "next/image";
import { FlowerOfLife } from "@/components/ui/FlowerOfLife";
import { type Locale } from "@/lib/i18n";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const navItems = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.services, href: `/${locale}/services` },
    { label: dict.nav.cases, href: `/${locale}/cases` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
    { label: dict.nav.partners, href: `/${locale}/partners` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <footer className="relative bg-bg-secondary border-t border-white/5 overflow-hidden">
      {/* Decorative Flower of Life */}
      <div className="absolute -bottom-40 -right-40 pointer-events-none">
        <FlowerOfLife size={500} opacity={0.03} color="#D4A843" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Merkaba Digital" width={36} height={36} />
              <span className="text-text-primary font-heading font-bold text-lg">
                MERKABA<span className="text-text-secondary font-normal ml-1">DIGITAL</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm">{dict.footer.description}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              {dict.nav.home}
            </h4>
            <nav className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-text-muted hover:text-text-secondary text-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              {dict.nav.contact}
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:merkaba.vip@gmail.com"
                className="block text-text-muted hover:text-text-secondary transition-colors"
              >
                merkaba.vip@gmail.com
              </a>
              <a
                href="https://t.me/merkaba_vip"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-text-muted hover:text-text-secondary transition-colors"
              >
                Telegram
              </a>
              <a
                href="https://wa.me/996700555785"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-text-muted hover:text-text-secondary transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-text-muted text-xs">{dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
