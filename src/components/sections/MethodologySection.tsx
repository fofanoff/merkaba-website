"use client";

import { FadeIn } from "@/components/ui/FadeIn";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MethodologySection({ dict }: { dict: any }) {
  const pillars = dict.services.pillars;

  if (!pillars || pillars.length === 0) return null;

  const accentColors = ["#E879A8", "#9B59B6", "#3B82F6", "#D4A843"];

  return (
    <section className="py-24 md:py-32 relative bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
            {dict.services.methodology_title}
          </h2>
        </FadeIn>

        <div className="space-y-8">
          {pillars.map(
            (
              pillar: { number: string; title: string; items: string[] },
              i: number
            ) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="rounded-2xl bg-bg-card/50 border border-white/5 p-8 md:p-10 relative overflow-hidden">
                  {/* Number accent */}
                  <div
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{ background: accentColors[i] }}
                  />

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="shrink-0">
                      <span
                        className="text-5xl font-heading font-bold opacity-20"
                        style={{ color: accentColors[i] }}
                      >
                        {pillar.number}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-4">
                        {pillar.title}
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {pillar.items.map((item: string, j: number) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-text-secondary text-sm"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                              style={{ background: accentColors[i] }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )
          )}
        </div>
      </div>
    </section>
  );
}
