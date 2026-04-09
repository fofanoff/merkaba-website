"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { type Locale, locales } from "@/lib/i18n";

const localeLabels: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  tr: "TR",
  ar: "AR",
};

interface NavItem {
  label: string;
  href: string;
}

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.services, href: `/${locale}/services` },
    { label: dict.nav.cases, href: `/${locale}/cases` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - text only, image logo used as background element */}
          <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
            <span className="text-text-primary font-heading font-bold text-xl tracking-wide">
              MERKABA<span className="text-text-muted font-light ml-1.5 tracking-widest">DIGITAL</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-pink to-accent-indigo group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-1 text-xs">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className={`px-2 py-1 rounded transition-colors ${
                    l === locale
                      ? "text-text-primary bg-bg-surface"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {localeLabels[l]}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/contact`}
              className="hidden md:inline-flex btn-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
            >
              {dict.nav.cta}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Menu"
            >
              <span
                className={`w-5 h-0.5 bg-text-primary transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-1" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-text-primary transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-text-primary transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/5 overflow-hidden"
          >
            <nav className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-text-secondary hover:text-text-primary text-base font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={`/${l}`}
                    className={`px-3 py-1.5 rounded text-sm ${
                      l === locale
                        ? "text-text-primary bg-bg-surface"
                        : "text-text-muted"
                    }`}
                  >
                    {localeLabels[l]}
                  </Link>
                ))}
              </div>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileOpen(false)}
                className="block btn-gradient text-white text-center font-semibold px-5 py-3 rounded-lg mt-4"
              >
                {dict.nav.cta}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
