"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/FadeIn";

const PACKAGES = [
  { name: "LAUNCH", price: 5000, type: "one-time" },
  { name: "GROWTH", price: 8500, type: "monthly" },
  { name: "DOMINANCE", price: 15000, type: "monthly" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

export function PartnersPage({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const p = dict.partners;
  const spotsLeft = p.hero_spots_total - p.hero_spots_taken;
  const progressPercent = (p.hero_spots_taken / p.hero_spots_total) * 100;

  return (
    <main>
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.08]"
            style={{ background: "radial-gradient(circle, #D4A843 0%, transparent 70%)" }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent-gold/30 bg-accent-gold/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
            <span className="text-accent-gold text-sm font-bold font-mono tracking-wider">
              {p.hero_badge}
            </span>
          </motion.div>

          {/* Spots counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-10"
          >
            <div className="inline-flex flex-col items-center gap-3 px-8 py-5 rounded-2xl border border-accent-gold/20 bg-bg-card/50 backdrop-blur-sm">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-heading font-bold text-accent-gold" style={{ textShadow: "0 0 30px rgba(212,168,67,0.3)" }}>
                  {spotsLeft}
                </span>
                <span className="text-text-secondary text-lg">
                  {p.hero_spots_left} {p.hero_spots_total}
                </span>
              </div>
              <div className="w-full max-w-[200px] h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #D4A843, #F0C75E)" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.08] mb-6"
          >
            <span className="text-gradient-gold">{p.hero_title}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            {p.hero_subtitle}
          </motion.p>
        </div>
      </section>

      {/* ===== SECTION 2: TWO REWARD MODELS ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
              {p.models_title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Cash card */}
            <motion.div {...fadeUp} className="rounded-2xl border border-white/10 bg-bg-card/50 p-8">
              <span className="text-text-muted text-sm font-mono uppercase tracking-wider">{p.cash_label}</span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mt-3 mb-4">{p.cash_title}</h3>
              <p className="text-text-secondary mb-6 leading-relaxed">{p.cash_desc}</p>
              <div className="rounded-xl bg-bg-surface/60 px-5 py-4 text-sm text-text-secondary font-mono">
                {p.cash_example}
              </div>
            </motion.div>

            {/* Balance card (recommended) */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="relative rounded-2xl p-8 overflow-hidden">
              {/* Gradient border */}
              <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, #D4A843, #F0C75E, #D4A843)", padding: "1px" }}>
                <div className="w-full h-full rounded-2xl bg-bg-card" />
              </div>
              {/* Glow */}
              <div className="absolute -inset-1 rounded-2xl opacity-20 blur-xl" style={{ background: "linear-gradient(135deg, #D4A843, #F0C75E)" }} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-text-muted text-sm font-mono uppercase tracking-wider">{p.balance_label}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent-gold/10 text-accent-gold border border-accent-gold/30">
                      {p.balance_badge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-success/10 text-success border border-success/30">
                      {p.balance_recommended}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold mt-3 mb-4 text-gradient-gold">{p.balance_title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">{p.balance_desc}</p>
                <div className="rounded-xl bg-bg-surface/60 px-5 py-4 text-sm text-text-secondary font-mono mb-3">
                  {p.balance_example}
                </div>
                <p className="text-xs text-accent-gold/70">{p.balance_note}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: HOW IT WORKS (4 steps, timeline) ===== */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
              {p.steps_title}
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-gold/40 via-accent-indigo/40 to-accent-purple/40" />

            {[
              { num: "01", title: p.step1_title, desc: p.step1_desc },
              { num: "02", title: p.step2_title, desc: p.step2_desc },
              { num: "03", title: p.step3_title, desc: p.step3_desc },
              { num: "04", title: p.step4_title, desc: p.step4_desc },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step number circle */}
                <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-bg-card border border-accent-gold/30 flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
                  <span className="text-accent-gold text-sm font-mono font-bold">{step.num}</span>
                </div>

                {/* Content */}
                <div className={`md:w-[calc(50%-40px)] ${i % 2 === 0 ? "md:ml-auto md:pl-10" : "md:mr-auto md:pr-10 md:text-right"}`}>
                  <h3 className="text-xl font-heading font-bold mb-2">{step.title}</h3>
                  <p className="text-text-secondary">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: CALCULATOR ===== */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
              {p.calc_title}
            </h2>
          </FadeIn>
          <Calculator dict={p} />
        </div>
      </section>

      {/* ===== SECTION 5: FOR WHOM ===== */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
              {p.audience_title}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "🏢", title: p.audience1_title, desc: p.audience1_desc },
              { icon: "📊", title: p.audience2_title, desc: p.audience2_desc },
              { icon: "💡", title: p.audience3_title, desc: p.audience3_desc },
              { icon: "⚡", title: p.audience4_title, desc: p.audience4_desc },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-bg-card/50 p-6 hover:border-white/20 transition-colors"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="text-lg font-heading font-bold mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: TERMS ===== */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-gold/30 bg-accent-gold/5 text-accent-gold text-sm font-medium mb-6">
                {p.terms_badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                {p.terms_title}
              </h2>
            </div>
          </FadeIn>

          <motion.div
            {...fadeUp}
            className="relative rounded-2xl p-8 overflow-hidden"
          >
            {/* Gold gradient border */}
            <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, #D4A843, #F0C75E, #D4A843)", padding: "1px" }}>
              <div className="w-full h-full rounded-2xl bg-bg-card" />
            </div>

            <ul className="relative z-10 space-y-4">
              {p.terms_items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-gold shrink-0" />
                  <span>
                    {item.includes(p.terms_highlight) ? (
                      <>
                        {item.split(p.terms_highlight)[0]}
                        <span className="text-accent-gold font-semibold">{p.terms_highlight}</span>
                        {item.split(p.terms_highlight)[1]}
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 7: CTA + FORM ===== */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                {p.cta_title}
              </h2>
              <p className="text-text-secondary text-lg">{p.cta_subtitle}</p>
            </div>
          </FadeIn>

          <PartnerForm dict={p} locale={locale} />
        </div>
      </section>
    </main>
  );
}

/* ===== CALCULATOR COMPONENT ===== */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Calculator({ dict }: { dict: any }) {
  const [clients, setClients] = useState(2);
  const [pkgIndex, setPkgIndex] = useState(1); // GROWTH default
  const [mode, setMode] = useState<"cash" | "balance">("balance");

  const pkg = PACKAGES[pkgIndex];
  const rate = mode === "cash" ? 0.1 : 0.2;
  const monthly = pkg.price * rate * clients;
  const yearly = monthly * 12;

  return (
    <motion.div {...fadeUp} className="rounded-2xl border border-white/10 bg-bg-card/50 p-8">
      {/* Clients slider */}
      <div className="mb-8">
        <label className="text-text-secondary text-sm mb-3 block">{dict.calc_clients}</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={10}
            value={clients}
            onChange={(e) => setClients(Number(e.target.value))}
            className="flex-1 h-2 rounded-full appearance-none bg-white/10 accent-accent-gold cursor-pointer"
          />
          <span className="text-2xl font-heading font-bold text-accent-gold w-8 text-center">{clients}</span>
        </div>
      </div>

      {/* Package selection */}
      <div className="mb-8">
        <label className="text-text-secondary text-sm mb-3 block">{dict.calc_package}</label>
        <div className="grid grid-cols-3 gap-2">
          {PACKAGES.map((pk, i) => (
            <button
              key={pk.name}
              onClick={() => setPkgIndex(i)}
              className={`px-4 py-3 rounded-xl text-sm font-mono font-bold transition-all ${
                i === pkgIndex
                  ? "bg-accent-indigo/20 border border-accent-indigo/40 text-text-primary"
                  : "bg-bg-surface/40 border border-white/5 text-text-muted hover:text-text-secondary"
              }`}
            >
              <div>{pk.name}</div>
              <div className="text-xs font-normal mt-1">${pk.price.toLocaleString()}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode toggle */}
      <div className="mb-10">
        <label className="text-text-secondary text-sm mb-3 block">{dict.calc_mode}</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode("cash")}
            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              mode === "cash"
                ? "bg-accent-indigo/20 border border-accent-indigo/40 text-text-primary"
                : "bg-bg-surface/40 border border-white/5 text-text-muted hover:text-text-secondary"
            }`}
          >
            {dict.cash_label} (10%)
          </button>
          <button
            onClick={() => setMode("balance")}
            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              mode === "balance"
                ? "bg-accent-gold/20 border border-accent-gold/40 text-accent-gold"
                : "bg-bg-surface/40 border border-white/5 text-text-muted hover:text-text-secondary"
            }`}
          >
            {dict.balance_label} (20%)
          </button>
        </div>
      </div>

      {/* Result */}
      <div className="text-center py-6 rounded-xl bg-bg-surface/40 border border-white/5">
        <div className="text-text-secondary text-sm mb-2">{dict.calc_monthly}</div>
        <div className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold mb-2">
          ${monthly.toLocaleString()}<span className="text-lg text-text-muted">{dict.calc_per_month}</span>
        </div>
        <div className="text-text-muted text-sm">
          ${yearly.toLocaleString()} {dict.calc_yearly}
        </div>
      </div>
    </motion.div>
  );
}

/* ===== PARTNER FORM COMPONENT ===== */
function PartnerForm({
  dict,
  locale,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  locale: Locale;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("https://formspree.io/f/xqaqpwdo", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
    } catch {
      // Silently handle - form might still work
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 rounded-2xl border border-success/20 bg-success/5"
      >
        <div className="text-4xl mb-4">&#10003;</div>
        <p className="text-text-primary text-lg font-medium">{dict.form_success}</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      {...fadeUp}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input type="hidden" name="_source" value="founding-partners" />
      <input type="hidden" name="_locale" value={locale} />

      {/* Name */}
      <div>
        <label className="text-text-secondary text-sm mb-2 block">{dict.form_name} *</label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-5 py-3.5 rounded-xl bg-bg-card/50 border border-white/10 text-text-primary focus:border-accent-gold/50 focus:outline-none focus:ring-1 focus:ring-accent-gold/30 transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-text-secondary text-sm mb-2 block">{dict.form_email} *</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-5 py-3.5 rounded-xl bg-bg-card/50 border border-white/10 text-text-primary focus:border-accent-gold/50 focus:outline-none focus:ring-1 focus:ring-accent-gold/30 transition-colors"
        />
      </div>

      {/* Messenger */}
      <div>
        <label className="text-text-secondary text-sm mb-2 block">{dict.form_messenger}</label>
        <input
          type="text"
          name="messenger"
          className="w-full px-5 py-3.5 rounded-xl bg-bg-card/50 border border-white/10 text-text-primary focus:border-accent-gold/50 focus:outline-none focus:ring-1 focus:ring-accent-gold/30 transition-colors"
        />
      </div>

      {/* Plan */}
      <div>
        <label className="text-text-secondary text-sm mb-2 block">{dict.form_plan}</label>
        <textarea
          name="plan"
          rows={3}
          className="w-full px-5 py-3.5 rounded-xl bg-bg-card/50 border border-white/10 text-text-primary focus:border-accent-gold/50 focus:outline-none focus:ring-1 focus:ring-accent-gold/30 transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl font-semibold text-lg text-white transition-all disabled:opacity-50"
        style={{ background: "linear-gradient(135deg, #D4A843, #F0C75E, #D4A843)", backgroundSize: "200% 200%" }}
      >
        {loading ? "..." : dict.form_submit}
      </button>

      <p className="text-text-muted text-xs text-center">{dict.form_note}</p>
    </motion.form>
  );
}
