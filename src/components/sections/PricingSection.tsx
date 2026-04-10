"use client";

import { useState } from "react";
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
  const [launchMode, setLaunchMode] = useState<"light" | "pro">("light");
  const [hasClickedPro, setHasClickedPro] = useState(false);

  const handleProClick = () => {
    setLaunchMode("pro");
    setHasClickedPro(true);
  };

  const launchPrice =
    launchMode === "light"
      ? dict.pricing.launch_light_price
      : dict.pricing.launch_pro_price;
  const launchType =
    launchMode === "light"
      ? dict.pricing.launch_light_type
      : dict.pricing.launch_pro_type;
  const launchFeatures =
    launchMode === "light"
      ? dict.pricing.launch_light_features
      : dict.pricing.launch_pro_features;
  const launchCta =
    launchMode === "light"
      ? dict.pricing.launch_light_cta
      : dict.pricing.launch_pro_cta;

  const packages = [
    {
      name: dict.pricing.launch_name,
      price: launchPrice,
      type: launchType,
      features: launchFeatures,
      featured: false,
      cta: launchCta,
      gradient: "from-accent-blue/20 to-accent-indigo/20",
      borderColor: "border-accent-blue/20",
      isLaunch: true,
    },
    {
      name: dict.pricing.growth_name,
      price: dict.pricing.growth_price,
      type: dict.pricing.growth_type,
      features: dict.pricing.growth_features,
      featured: true,
      badge: dict.pricing.growth_badge,
      cta: dict.pricing.growth_cta,
      gradient: "from-accent-pink/20 via-accent-purple/20 to-accent-indigo/20",
      borderColor: "border-accent-indigo/30",
      isLaunch: false,
    },
    {
      name: dict.pricing.dominance_name,
      price: dict.pricing.dominance_price,
      type: dict.pricing.dominance_type,
      features: dict.pricing.dominance_features,
      featured: false,
      cta: dict.pricing.dominance_cta,
      gradient: "from-accent-gold/20 to-accent-gold/10",
      borderColor: "border-accent-gold/20",
      isLaunch: false,
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

                {/* LAUNCH mode toggle */}
                {pkg.isLaunch && (
                  <div className="flex gap-1 mb-5 p-1 bg-bg-surface/60 rounded-lg w-fit">
                    <button
                      onClick={() => setLaunchMode("light")}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold tracking-wider transition-all ${
                        launchMode === "light"
                          ? "bg-accent-indigo/25 text-text-primary border border-accent-indigo/40"
                          : "text-text-muted hover:text-text-secondary"
                      }`}
                    >
                      {dict.pricing.launch_light_label}
                    </button>
                    <button
                      onClick={handleProClick}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold tracking-wider transition-all ${
                        launchMode === "pro"
                          ? "bg-accent-indigo/25 text-text-primary border border-accent-indigo/40"
                          : `text-text-muted hover:text-text-secondary ${!hasClickedPro ? "pro-pulse" : ""}`
                      }`}
                    >
                      {dict.pricing.launch_pro_label}
                    </button>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-text-muted text-sm font-mono uppercase tracking-wider mb-2">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span
                      key={pkg.isLaunch ? launchMode : "static"}
                      className="text-3xl md:text-4xl font-heading font-bold text-text-primary transition-opacity duration-300 animate-[fadeIn_0.3s_ease-in-out]"
                    >
                      {pkg.price}
                    </span>
                  </div>
                  <span
                    key={pkg.isLaunch ? `type-${launchMode}` : "type-static"}
                    className="text-text-muted text-sm transition-opacity duration-300 animate-[fadeIn_0.3s_ease-in-out]"
                  >
                    {pkg.type}
                  </span>
                </div>

                <ul
                  key={pkg.isLaunch ? `features-${launchMode}` : "features-static"}
                  className="space-y-3 mb-8 flex-1 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-in-out]"
                >
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
                  {pkg.cta}
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
