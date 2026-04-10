"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FlowerOfLife } from "@/components/ui/FlowerOfLife";

const accentColors = ["#E879A8", "#9B59B6", "#3B82F6", "#D4A843"];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

export function CasesPage({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const c = dict.cases;

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)" }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.08] mb-6"
          >
            <span className="text-gradient">{c.hero_title}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            {c.hero_subtitle}
          </motion.p>
        </div>
      </section>

      {/* ===== MARKET STATS ===== */}
      <section className="py-20 md:py-28 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
              {c.market_title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.market_stats.map(
              (stat: { value: string; label: string }, i: number) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="rounded-2xl bg-bg-card/50 border border-white/5 p-8 text-center card-glow h-full flex flex-col items-center justify-center">
                    <span
                      className="text-4xl md:text-5xl font-heading font-bold mb-4"
                      style={{ color: accentColors[i] }}
                    >
                      {stat.value}
                    </span>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                </FadeIn>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===== CASE STUDY ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeIn className="mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-indigo/30 bg-accent-indigo/5 text-accent-indigo text-sm font-medium mb-6">
              {c.case_badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
              {c.case_title}
            </h2>
            <p className="text-text-secondary text-lg">{c.case_subtitle}</p>
          </FadeIn>

          {/* Problem */}
          <FadeIn>
            <div className="rounded-2xl bg-bg-card/50 border border-white/5 p-8 mb-10">
              <h3 className="text-xl font-heading font-bold mb-4 text-accent-pink">
                {locale === "ar" ? "المشكلة" : locale === "tr" ? "Sorun" : locale === "en" ? "Problem" : "Проблема"}
              </h3>
              <p className="text-text-secondary leading-relaxed">{c.case_problem}</p>
            </div>
          </FadeIn>

          {/* Steps */}
          <div className="space-y-6 mb-10">
            {c.case_steps.map(
              (step: { title: string; items: string[] }, i: number) => (
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
                          {step.title}
                        </h3>
                        <ul className="space-y-2">
                          {step.items.map((item: string, j: number) => (
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

          {/* Results */}
          <FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {c.case_results.map(
                (
                  r: {
                    metric: string;
                    before: string;
                    after: string;
                    growth: string;
                  },
                  i: number
                ) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-bg-card/50 border border-white/5 p-6 text-center card-glow"
                  >
                    <p className="text-text-muted text-xs mb-2 font-mono uppercase tracking-wider">
                      {r.metric}
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-text-muted text-sm line-through">
                        {r.before}
                      </span>
                      <svg
                        className="w-4 h-4 text-text-muted"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      <span className="text-xl font-heading font-bold text-text-primary">
                        {r.after}
                      </span>
                    </div>
                    <span
                      className="text-sm font-bold"
                      style={{ color: accentColors[i] }}
                    >
                      {r.growth}
                    </span>
                  </div>
                )
              )}
            </div>
          </FadeIn>

          {/* Quote */}
          <FadeIn>
            <div className="relative rounded-2xl p-8 overflow-hidden">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1, #9B59B6, #6366F1)",
                  padding: "1px",
                }}
              >
                <div className="w-full h-full rounded-2xl bg-bg-card" />
              </div>
              <div className="relative z-10">
                <svg
                  className="w-8 h-8 text-accent-indigo/30 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="text-text-secondary text-lg leading-relaxed italic mb-4">
                  &quot;{c.case_quote}&quot;
                </p>
                <p className="text-text-muted text-sm">
                  - {c.case_quote_author}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== INDUSTRY RESULTS ===== */}
      <section className="py-20 md:py-28 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              {c.industries_title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.industries.map(
              (
                ind: {
                  name: string;
                  visibility: string;
                  mentions: string;
                  timeline: string;
                },
                i: number
              ) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="rounded-2xl bg-bg-card/50 border border-white/5 p-6 card-glow h-full">
                    <h3 className="text-lg font-heading font-bold mb-6 min-h-[3.5rem] flex items-center">
                      {ind.name}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                          {c.industries_visibility_label}
                        </p>
                        <p
                          className="text-2xl font-heading font-bold"
                          style={{ color: accentColors[i] }}
                        >
                          {ind.visibility}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                          {c.industries_mentions_label}
                        </p>
                        <p className="text-xl font-heading font-bold text-text-primary">
                          {ind.mentions}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                          {c.industries_timeline_label}
                        </p>
                        <p className="text-text-secondary text-sm">
                          {ind.timeline}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )
            )}
          </div>

          <FadeIn delay={0.4}>
            <p className="text-text-muted text-xs text-center mt-8 max-w-3xl mx-auto">
              {c.industries_note}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ===== LIVE DEMO ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {c.demo_title}
            </h2>
            <p className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto">
              {c.demo_subtitle}
            </p>
            <Link
              href={`/${locale}/dashboard`}
              className="inline-flex btn-gradient text-white font-semibold px-10 py-5 rounded-xl text-lg"
            >
              {c.demo_cta}
            </Link>
            <p className="text-text-muted text-xs mt-4">{c.demo_note}</p>
          </FadeIn>
        </div>
      </section>

      {/* ===== PROCESS TIMELINE ===== */}
      <section className="py-20 md:py-28 bg-bg-secondary/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
              {c.process_title}
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-pink/40 via-accent-indigo/40 to-accent-blue/40" />

            {c.process_steps.map(
              (
                step: { period: string; title: string; desc: string },
                i: number
              ) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step circle */}
                  <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-bg-card border border-accent-indigo/30 flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="text-accent-indigo text-sm font-mono font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`md:w-[calc(50%-40px)] ${
                      i % 2 === 0
                        ? "md:ml-auto md:pl-10"
                        : "md:mr-auto md:pr-10 md:text-right"
                    }`}
                  >
                    <span className="text-accent-indigo/60 text-xs font-mono uppercase tracking-wider">
                      {step.period}
                    </span>
                    <h3 className="text-xl font-heading font-bold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <FlowerOfLife size={700} opacity={0.03} color="#6366F1" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              {c.cta_title}
            </h2>
            <p className="text-text-secondary text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              {c.cta_subtitle}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex btn-gradient text-white font-semibold px-10 py-5 rounded-xl text-lg"
            >
              {c.cta_button}
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
