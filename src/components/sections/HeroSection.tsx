"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FlowerOfLife } from "@/components/ui/FlowerOfLife";
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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Flower of Life - animated pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.04, 0.06, 0.04],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FlowerOfLife size={900} opacity={1} color="#9B59B6" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-4xl">
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
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-8"
          >
            {dict.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mb-12 leading-relaxed"
          >
            {dict.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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
        </div>

        {/* Decorative AI Response Preview */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-[380px]"
        >
          <div className="rounded-2xl bg-bg-card/80 border border-white/5 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-accent-pink" />
              <div className="w-3 h-3 rounded-full bg-accent-gold" />
              <div className="w-3 h-3 rounded-full bg-accent-blue" />
              <span className="text-text-muted text-xs ml-2 font-mono">AI Response</span>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-white/5 rounded w-full" />
              <div className="h-3 bg-white/5 rounded w-4/5" />
              <div className="h-3 bg-accent-indigo/20 rounded w-3/4 border border-accent-indigo/30" />
              <div className="h-3 bg-white/5 rounded w-full" />
              <div className="h-3 bg-white/5 rounded w-2/3" />
              <div className="mt-4 p-3 rounded-lg bg-accent-indigo/10 border border-accent-indigo/20">
                <div className="flex items-center gap-2">
                  <span className="text-accent-indigo text-xs font-mono">✦</span>
                  <span className="text-accent-indigo text-xs">Your Brand — Recommended</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
