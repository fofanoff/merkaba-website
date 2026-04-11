"use client";

import { useState, type FormEvent } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { FlowerOfLife } from "@/components/ui/FlowerOfLife";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ContactForm({ dict }: { dict: any }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = dict.contact;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Auto-add https:// if missing
    if (data.website && !/^https?:\/\//i.test(data.website)) {
      data.website = `https://${data.website}`;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute -top-20 -left-40 pointer-events-none">
        <FlowerOfLife size={500} opacity={0.03} color="#E879A8" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero text */}
        <FadeIn className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            {t.hero_title}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t.hero_subtitle}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <FadeIn className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">
                    {t.form.name} *
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full bg-bg-card/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-indigo/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">
                    {t.form.company} *
                  </label>
                  <input
                    name="company"
                    required
                    className="w-full bg-bg-card/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-indigo/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">
                    {t.form.website} *
                  </label>
                  <input
                    name="website"
                    type="text"
                    required
                    placeholder="example.com"
                    className="w-full bg-bg-card/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-indigo/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">
                    {t.form.email} *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-bg-card/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-indigo/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">
                    {t.form.phone}
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full bg-bg-card/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-indigo/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-1.5">
                    {t.form.industry}
                  </label>
                  <select
                    name="industry"
                    className="w-full bg-bg-card/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-indigo/50 transition-colors"
                  >
                    <option value="">-</option>
                    {t.industries.map((ind: string) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-1.5">
                  {t.form.language}
                </label>
                <select
                  name="language"
                  className="w-full bg-bg-card/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-accent-indigo/50 transition-colors"
                >
                  {t.languages.map((lang: string) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-1.5">
                  {t.form.comment}
                </label>
                <textarea
                  name="comment"
                  rows={4}
                  className="w-full bg-bg-card/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-indigo/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full btn-gradient text-white font-semibold px-8 py-4 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "..." : t.form.submit}
              </button>

              {status === "success" && (
                <p className="text-success text-sm text-center">{t.form.success}</p>
              )}
              {status === "error" && (
                <p className="text-danger text-sm text-center">{t.form.error}</p>
              )}
            </form>
          </FadeIn>

          {/* Direct contacts */}
          <FadeIn delay={0.2} className="lg:col-span-2">
            <div className="rounded-2xl bg-bg-card/50 border border-white/5 p-8">
              <h3 className="text-text-primary font-heading font-semibold text-lg mb-6">
                {t.direct_title}
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-indigo/10 border border-accent-indigo/20 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-accent-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs mb-1">{t.email_label}</p>
                    <a href={`mailto:${t.email_value}`} className="text-text-primary text-sm hover:text-accent-indigo transition-colors">
                      {t.email_value}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs mb-1">{t.whatsapp_label}</p>
                    <a
                      href="https://wa.me/996700555785"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary text-sm hover:text-success transition-colors"
                    >
                      +996 700 555 785
                    </a>
                  </div>
                </div>

                {/* Telegram */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-accent-blue" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs mb-1">{t.telegram_label}</p>
                    <a
                      href="https://t.me/merkaba_vip"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary text-sm hover:text-accent-blue transition-colors"
                    >
                      @merkaba_vip
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
