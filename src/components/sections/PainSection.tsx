"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PainSection({ dict }: { dict: any }) {
  const stats = [
    {
      value: dict.pain.stat1_value,
      label: dict.pain.stat1_label,
      suffix: "%",
      numericValue: "73",
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#6366F1" strokeWidth="1" opacity="0.3" />
          <circle cx="20" cy="20" r="12" stroke="#6366F1" strokeWidth="1" opacity="0.5" />
          <circle cx="20" cy="20" r="6" fill="#6366F1" opacity="0.3" />
          <circle cx="20" cy="20" r="3" fill="#6366F1" />
        </svg>
      ),
    },
    {
      value: dict.pain.stat2_value,
      label: dict.pain.stat2_label,
      suffix: "%",
      numericValue: "40",
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
          <polygon points="20,2 38,20 20,38 2,20" stroke="#9B59B6" strokeWidth="1" opacity="0.3" />
          <polygon points="20,8 32,20 20,32 8,20" stroke="#9B59B6" strokeWidth="1" opacity="0.5" />
          <polygon points="20,14 26,20 20,26 14,20" fill="#9B59B6" opacity="0.5" />
        </svg>
      ),
    },
    {
      value: dict.pain.stat3_value,
      label: dict.pain.stat3_label,
      suffix: "",
      numericValue: "0",
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
          <path d="M20 2 L38 14 L38 26 L20 38 L2 26 L2 14 Z" stroke="#E879A8" strokeWidth="1" opacity="0.3" />
          <path d="M20 8 L32 16 L32 24 L20 32 L8 24 L8 16 Z" stroke="#E879A8" strokeWidth="1" opacity="0.5" />
          <circle cx="20" cy="20" r="4" fill="#E879A8" opacity="0.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
            {dict.pain.title}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="relative group rounded-2xl bg-bg-card/50 border border-white/5 p-8 text-center card-glow">
                <div className="flex justify-center mb-6">{stat.icon}</div>
                <AnimatedCounter
                  value={stat.numericValue}
                  suffix={stat.suffix}
                />
                <p className="text-text-secondary mt-4 text-sm leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
