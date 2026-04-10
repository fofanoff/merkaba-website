"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { HeroTerminal } from "@/components/ui/HeroTerminal";

export function HeroSection({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  return (
    <section
      className="relative h-screen min-h-[700px] max-h-[1200px] flex items-center overflow-hidden"
      style={{ background: "#0B0E1A" }}
    >
      {/* ===== BACKGROUND IMAGE - centered, pulsating ===== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-bg-pulse relative"
          style={{
            maxHeight: "700px",
            WebkitMaskImage: "radial-gradient(ellipse 70% 80% at center, black 30%, transparent 65%)",
            maskImage: "radial-gradient(ellipse 70% 80% at center, black 30%, transparent 65%)",
          }}
        >
          <Image
            src="/hero-bg.webp"
            alt=""
            width={1920}
            height={1071}
            className="h-[450px] sm:h-[500px] md:h-[580px] lg:h-[650px] w-auto select-none"
            style={{ mixBlendMode: "lighten" }}
            priority
          />
        </motion.div>
      </div>

      {/* ===== ORBITING GLOWS - z-[1] ===== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        {/* Glow 1 - clockwise, purple/pink, 30s */}
        <div
          className="absolute w-0 h-0"
          style={{ animation: "orbit-cw 30s linear infinite" }}
        >
          <div
            style={{
              position: "absolute",
              top: "-260px",
              left: "-110px",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(155,89,182,0.5) 0%, rgba(232,121,168,0.2) 40%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
        </div>

        {/* Glow 2 - counter-clockwise, gold, 35s */}
        <div
          className="absolute w-0 h-0"
          style={{ animation: "orbit-ccw 35s linear infinite" }}
        >
          <div
            style={{
              position: "absolute",
              top: "120px",
              left: "-100px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212,168,67,0.45) 0%, rgba(240,199,94,0.15) 40%, transparent 70%)",
              filter: "blur(25px)",
            }}
          />
        </div>
      </div>

      {/* ===== DARK GRADIENT OVERLAY LEFT ===== */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,14,26,0.9) 0%, rgba(11,14,26,0.65) 30%, rgba(11,14,26,0.2) 55%, transparent 75%)",
        }}
      />

      {/* ===== BOTTOM FADE ===== */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0E1A] to-transparent z-[3]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-indigo/30 bg-accent-indigo/5 backdrop-blur-sm mb-8"
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
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.08] mb-8"
            >
              <span className="text-gradient">
                {dict.hero.title.split(" ").slice(0, 2).join(" ")}
              </span>{" "}
              {dict.hero.title.split(" ").slice(2).join(" ")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-text-secondary max-w-xl mb-10 leading-relaxed"
            >
              {dict.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
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
                className="border border-white/10 hover:border-white/20 text-text-primary font-semibold px-8 py-4 rounded-xl text-lg text-center transition-colors hover:bg-white/5 backdrop-blur-sm"
              >
                {dict.hero.cta_secondary}
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
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

          {/* Right: Terminal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:flex justify-end"
          >
            <HeroTerminal dict={dict} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
