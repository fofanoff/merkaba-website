"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Locale } from "@/lib/i18n";

export function PricingSection({
  locale,
  dict,
  detailed = false,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  detailed?: boolean;
}) {
  const packages = [
    {
      name: dict.pricing.launch_name,
      price: dict.pricing.launch_price,
      type: dict.pricing.launch_type,
      features: dict.pricing.launch_features,
      featured: false,
      gradient: "from-accent-blue/20 to-accent-indigo/20",
      borderColor: "border-accent-blue/20",
    },
    {
      name: dict.pricing.growth_name,
      price: dict.pricing.growth_price,
      type: dict.pricing.growth_type,
      features: dict.pricing.growth_features,
      featured: true,
      badge: dict.pricing.growth_badge,
      gradient: "from-accent-pink/20 via-accent-purple/20 to-accent-indigo/20",
      borderColor: "border-accent-indigo/30",
    },
    {
      name: dict.pricing.dominance_name,
      price: dict.pricing.dominance_price,
      type: dict.pricing.dominance_type,
      features: dict.pricing.dominance_features,
      featured: false,
      gradient: "from-accent-gold/20 to-accent-gold/10",
      borderColor: "border-accent-gold/20",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
            {detailed ? dict.services?.packages_title || dict.pricing.title : dict.pricing.title}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div
                className={`relative rounded-2xl border p-8 h-full flex flex-col ${
                  pkg.featured
                    ? `bg-gradient-to-b ${pkg.gradient} ${pkg.borderColor} scale-[1.02]`
                    : `bg-bg-card/50 ${pkg.borderColor}`
                }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold btn-gradient text-white">
                    {pkg.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-text-muted text-sm font-mono uppercase tracking-wider mb-2">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-heading font-bold text-text-primary">
                      {pkg.price}
                    </span>
                  </div>
                  <span className="text-text-muted text-sm">{pkg.type}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature: string, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-text-secondary">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${locale}/contact`}
                  className={`block text-center font-semibold px-6 py-3 rounded-xl transition-all ${
                    pkg.featured
                      ? "btn-gradient text-white"
                      : "border border-white/10 text-text-primary hover:bg-white/5 hover:border-white/20"
                  }`}
                >
                  {dict.pricing.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        {detailed && dict.services?.packages_cta && (
          <FadeIn className="text-center mt-12">
            <Link
              href={`/${locale}/contact`}
              className="text-accent-indigo hover:text-accent-pink transition-colors text-sm"
            >
              {dict.services.packages_cta}
            </Link>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
