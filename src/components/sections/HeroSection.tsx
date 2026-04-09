"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";

export function HeroSection({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ambient gradient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top-left pink/purple glow */}
        <div
          className="absolute -top-[30%] -left-[10%] w-[700px] h-[700px] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #9B59B6 0%, transparent 70%)" }}
        />
        {/* Bottom-right blue glow */}
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }}
        />
        {/* Center gold subtle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #D4A843 0%, transparent 60%)" }}
        />
      </div>

      {/* Logo as centered background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1]">
        <Image
          src="/logo.png"
          alt=""
          width={600}
          height={600}
          className="w-[500px] md:w-[600px] lg:w-[700px] opacity-[0.04] select-none"
          priority
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-28">

          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-indigo/30 bg-accent-indigo/5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent-indigo animate-pulse" />
              <span className="text-accent-indigo text-sm font-medium font-mono">
                Generative Engine Optimization
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl font-heading font-bold leading-[1.08] mb-8"
            >
              <span className="text-gradient">{dict.hero.title.split(" ").slice(0, 2).join(" ")}</span>{" "}
              {dict.hero.title.split(" ").slice(2).join(" ")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-text-secondary max-w-xl mb-10 leading-relaxed"
            >
              {dict.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href={`/${locale}/contact`}
                className="btn-gradient text-white font-semibold px-8 py-4 rounded-xl text-lg text-center"
              >
                {dict.hero.cta_primary}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="border border-white/10 hover:border-white/20 text-text-primary font-semibold px-8 py-4 rounded-xl text-lg text-center transition-colors hover:bg-white/5"
              >
                {dict.hero.cta_secondary}
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 flex items-center gap-6 text-text-muted text-xs font-mono"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                ChatGPT
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Gemini
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Perplexity
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Claude
              </span>
            </motion.div>
          </div>

          {/* Right: Visual - AI terminal mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-pink/10 via-accent-indigo/10 to-accent-blue/10 rounded-3xl blur-2xl" />

              {/* Terminal window */}
              <div className="relative rounded-2xl bg-bg-card/90 border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5 bg-bg-surface/40">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  <span className="text-text-muted text-[11px] ml-3 font-mono">
                    ai-visibility-check
                  </span>
                </div>

                {/* Terminal content */}
                <div className="p-5 font-mono text-[13px] leading-relaxed space-y-3">
                  {/* Query */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-accent-indigo">$</span>
                    <span className="text-text-muted ml-2">merkaba scan --brand &quot;Your Business&quot;</span>
                  </motion.div>

                  {/* Scanning animation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-text-muted"
                  >
                    <span className="text-accent-gold">&#9656;</span> Scanning 5 AI platforms...
                  </motion.div>

                  {/* Results */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="space-y-2 pt-2 border-t border-white/5"
                  >
                    <div className="flex justify-between">
                      <span className="text-text-muted">ChatGPT</span>
                      <span className="text-danger">Not found</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Gemini</span>
                      <span className="text-danger">Not found</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Perplexity</span>
                      <span className="text-warning">Mentioned once</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Claude</span>
                      <span className="text-danger">Not found</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Copilot</span>
                      <span className="text-danger">Not found</span>
                    </div>
                  </motion.div>

                  {/* Score */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.4 }}
                    className="pt-3 border-t border-white/5"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-text-secondary">AI Visibility Score</span>
                      <span className="text-danger font-bold text-base">4%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "4%" }}
                        transition={{ delay: 2.6, duration: 0.8 }}
                        className="h-full rounded-full bg-danger"
                      />
                    </div>
                  </motion.div>

                  {/* CTA line */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    className="pt-3 border-t border-white/5"
                  >
                    <span className="text-accent-indigo">&#10022;</span>
                    <span className="text-accent-pink ml-2">
                      AI doesn&apos;t know your brand. We can fix that.
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary to-transparent z-20" />
    </section>
  );
}
