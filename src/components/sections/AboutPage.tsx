"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FlowerOfLife } from "@/components/ui/FlowerOfLife";
import { FaqSection } from "@/components/sections/FaqSection";

const accentColors = ["#E879A8", "#9B59B6", "#3B82F6", "#D4A843"];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

export function AboutPage({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const a = dict.about;

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #9B59B6 0%, transparent 70%)" }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {a.definition && (
            <p className="page-intro hero-description text-text-muted text-xs mb-4">
              {a.definition}
            </p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.08] mb-6"
          >
            <span className="text-gradient">{a.hero_title}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            {a.hero_subtitle}
          </motion.p>
          {a.last_updated && (
            <p className="text-text-muted text-xs mt-4">{a.last_updated}</p>
          )}
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="py-20 md:py-28 bg-bg-secondary/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10">
              {a.story_title}
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {a.story_text.map((paragraph: string, i: number) => (
              <FadeIn key={i} delay={i * 0.1}>
                <p className="text-text-secondary text-lg leading-relaxed">
                  {paragraph}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY ===== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 pointer-events-none">
          <FlowerOfLife size={500} opacity={0.03} color="#9B59B6" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10">
              {a.philosophy_title}
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {a.philosophy_text.map((paragraph: string, i: number) => (
              <FadeIn key={i} delay={i * 0.1}>
                <p className="text-text-secondary text-lg leading-relaxed">
                  {paragraph}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ADVANTAGES ===== */}
      <section className="py-20 md:py-28 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
              {a.advantages_title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {a.advantages.map(
              (adv: { title: string; desc: string }, i: number) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="rounded-2xl bg-bg-card/50 border border-white/5 p-8 card-glow h-full relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 w-1 h-full"
                      style={{ background: accentColors[i] }}
                    />
                    <h3 className="text-xl font-heading font-bold mb-4 pl-4">
                      {adv.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed pl-4">
                      {adv.desc}
                    </p>
                  </div>
                </FadeIn>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===== NUMBERS ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {a.numbers.map(
              (num: { value: string; label: string }, i: number) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="text-center">
                    <span
                      className="text-5xl md:text-6xl font-heading font-bold block mb-3"
                      style={{ color: accentColors[i] }}
                    >
                      {num.value}
                    </span>
                    <p className="text-text-secondary text-sm">
                      {num.label}
                    </p>
                  </div>
                </FadeIn>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===== APPROACH ===== */}
      <section className="py-20 md:py-28 bg-bg-secondary/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              {a.approach_title}
            </h2>
          </FadeIn>

          <div className="space-y-8">
            {a.approach_items.map(
              (item: { title: string; desc: string }, i: number) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="rounded-2xl bg-bg-card/50 border border-white/5 p-8 relative overflow-hidden">
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
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-4">
                          {item.title}
                        </h3>
                        <p className="text-text-secondary leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              {a.industries_title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {a.industries_list.map((industry: string, i: number) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/10 bg-bg-card/50 p-5 text-center hover:border-white/20 transition-colors h-full flex items-center justify-center">
                  <span className="text-text-secondary text-sm font-medium">
                    {industry}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <p className="text-text-muted text-sm text-center mt-8 max-w-3xl mx-auto">
              {a.industries_note}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FaqSection dict={dict} section="about" />

      {/* ===== CTA ===== */}
      <section className="py-24 md:py-32 relative bg-bg-secondary/50 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <FlowerOfLife size={700} opacity={0.03} color="#D4A843" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              {a.cta_title}
            </h2>
            <p className="text-text-secondary text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              {a.cta_subtitle}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex btn-gradient text-white font-semibold px-10 py-5 rounded-xl text-lg"
            >
              {a.cta_button}
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
