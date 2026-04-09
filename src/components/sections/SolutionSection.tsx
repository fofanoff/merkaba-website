"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const pillarIcons = [
  // AI Audit - eye/scan
  <svg key="audit" viewBox="0 0 48 48" className="w-12 h-12" fill="none">
    <circle cx="24" cy="24" r="20" stroke="url(#g1)" strokeWidth="1" />
    <circle cx="24" cy="24" r="10" stroke="url(#g1)" strokeWidth="1.5" />
    <circle cx="24" cy="24" r="4" fill="url(#g1)" />
    <line x1="4" y1="24" x2="14" y2="24" stroke="url(#g1)" strokeWidth="0.5" />
    <line x1="34" y1="24" x2="44" y2="24" stroke="url(#g1)" strokeWidth="0.5" />
    <line x1="24" y1="4" x2="24" y2="14" stroke="url(#g1)" strokeWidth="0.5" />
    <line x1="24" y1="34" x2="24" y2="44" stroke="url(#g1)" strokeWidth="0.5" />
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="48" y2="48">
        <stop stopColor="#E879A8" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>,
  // Entity Building - network
  <svg key="entity" viewBox="0 0 48 48" className="w-12 h-12" fill="none">
    <circle cx="24" cy="12" r="4" stroke="#9B59B6" strokeWidth="1.5" />
    <circle cx="12" cy="36" r="4" stroke="#9B59B6" strokeWidth="1.5" />
    <circle cx="36" cy="36" r="4" stroke="#9B59B6" strokeWidth="1.5" />
    <circle cx="24" cy="24" r="3" fill="#9B59B6" opacity="0.5" />
    <line x1="24" y1="16" x2="24" y2="21" stroke="#9B59B6" strokeWidth="1" />
    <line x1="15" y1="33" x2="21" y2="27" stroke="#9B59B6" strokeWidth="1" />
    <line x1="33" y1="33" x2="27" y2="27" stroke="#9B59B6" strokeWidth="1" />
    <circle cx="24" cy="24" r="20" stroke="#9B59B6" strokeWidth="0.5" opacity="0.3" />
  </svg>,
  // Content Engineering - document
  <svg key="content" viewBox="0 0 48 48" className="w-12 h-12" fill="none">
    <rect x="10" y="6" width="28" height="36" rx="3" stroke="#3B82F6" strokeWidth="1.5" />
    <line x1="16" y1="16" x2="32" y2="16" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
    <line x1="16" y1="22" x2="28" y2="22" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
    <line x1="16" y1="28" x2="30" y2="28" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
    <line x1="16" y1="34" x2="24" y2="34" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
    <circle cx="34" cy="34" r="8" fill="#0B0E1A" stroke="#3B82F6" strokeWidth="1.5" />
    <path d="M31 34 L33 36 L37 32" stroke="#3B82F6" strokeWidth="1.5" />
  </svg>,
  // Monitoring - dashboard
  <svg key="monitor" viewBox="0 0 48 48" className="w-12 h-12" fill="none">
    <rect x="4" y="8" width="40" height="28" rx="3" stroke="#D4A843" strokeWidth="1.5" />
    <line x1="4" y1="16" x2="44" y2="16" stroke="#D4A843" strokeWidth="0.5" />
    <rect x="8" y="20" width="8" height="12" rx="1" fill="#D4A843" opacity="0.2" />
    <rect x="20" y="24" width="8" height="8" rx="1" fill="#D4A843" opacity="0.3" />
    <rect x="32" y="22" width="8" height="10" rx="1" fill="#D4A843" opacity="0.25" />
    <circle cx="8" cy="12" r="1.5" fill="#D4A843" opacity="0.5" />
    <circle cx="13" cy="12" r="1.5" fill="#D4A843" opacity="0.3" />
    <line x1="16" y1="40" x2="32" y2="40" stroke="#D4A843" strokeWidth="1" />
    <line x1="24" y1="36" x2="24" y2="40" stroke="#D4A843" strokeWidth="1" />
  </svg>,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SolutionSection({ dict }: { dict: any }) {
  const pillars = [
    { title: dict.solution.pillar1_title, desc: dict.solution.pillar1_desc },
    { title: dict.solution.pillar2_title, desc: dict.solution.pillar2_desc },
    { title: dict.solution.pillar3_title, desc: dict.solution.pillar3_desc },
    { title: dict.solution.pillar4_title, desc: dict.solution.pillar4_desc },
  ];

  return (
    <section className="py-24 md:py-32 relative bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gradient mb-4">
            {dict.solution.title}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {dict.solution.subtitle}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="group rounded-2xl bg-bg-card/50 border border-white/5 p-6 h-full card-glow">
                <div className="mb-5">{pillarIcons[i]}</div>
                <h3 className="text-text-primary font-heading font-semibold text-lg mb-3">
                  {pillar.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
