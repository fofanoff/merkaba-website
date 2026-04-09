"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { HeroCanvas } from "@/components/ui/HeroCanvas";

export function HeroSection({
  locale,
  dict,
}: {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  // Parallax transforms for logo
  const logoX = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const logoY = useTransform(mouseY, [-0.5, 0.5], [10, -10]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[700px] max-h-[1200px] flex items-center overflow-hidden"
      style={{ background: "#0B0E1A" }}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99, 102, 241, 0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Central logo - the main visual element */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
        style={isMobile ? {} : { x: logoX, y: logoY }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/logo.png"
            alt="Merkaba Digital"
            width={800}
            height={800}
            className="w-[350px] sm:w-[450px] md:w-[550px] lg:w-[650px] xl:w-[700px] select-none"
            style={{
              opacity: 0.45,
              filter: "drop-shadow(0 0 60px rgba(99, 102, 241, 0.15)) drop-shadow(0 0 120px rgba(155, 89, 182, 0.1))",
            }}
            priority
          />
        </motion.div>
      </motion.div>

      {/* Canvas overlay for particles + glow effects */}
      <motion.div
        className="absolute inset-0 z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <HeroCanvas />
      </motion.div>

      {/* Dark gradient overlay for text readability (left side) */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(11, 14, 26, 0.85) 0%, rgba(11, 14, 26, 0.6) 35%, rgba(11, 14, 26, 0.15) 60%, transparent 80%)",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary to-transparent z-[4]" />

      {/* Content */}
      <div className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
            transition={{ duration: 0.8, delay: 0.8 }}
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
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-lg md:text-xl text-text-secondary max-w-xl mb-10 leading-relaxed"
          >
            {dict.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
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
            transition={{ duration: 1, delay: 1.6 }}
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
      </div>
    </section>
  );
}
