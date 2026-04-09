"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { HeroCanvas } from "@/components/ui/HeroCanvas";
import { HeroTerminal } from "@/components/ui/HeroTerminal";

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

  // Subtle parallax for logo
  const logoX = useTransform(mouseX, [-0.5, 0.5], [12, -12]);
  const logoY = useTransform(mouseY, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[700px] max-h-[1200px] flex items-center overflow-hidden"
      style={{ background: "#0B0E1A" }}
    >
      {/* ===== LOGO + EFFECTS LAYER ===== */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[5%] pointer-events-none z-[1]"
        style={isMobile ? {} : { x: logoX, y: logoY }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[680px]"
        >
          {/* Ambient halo - outermost glow */}
          <div
            className="absolute -inset-[25%] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(212,168,67,0.07) 0%, rgba(99,102,241,0.04) 40%, rgba(155,89,182,0.02) 60%, transparent 70%)",
              animation: "ambient-halo 18s ease-in-out infinite",
            }}
          />

          {/* Logo image - cropped to remove text, blended */}
          <div className="w-full overflow-hidden" style={{ aspectRatio: "1 / 0.82" }}>
            <Image
              src="/logo.png"
              alt="Merkaba Digital"
              width={800}
              height={800}
              className="w-full h-auto select-none"
              style={{
                opacity: 0.5,
                mixBlendMode: "lighten",
                filter:
                  "drop-shadow(0 0 40px rgba(99, 102, 241, 0.08)) drop-shadow(0 0 80px rgba(155, 89, 182, 0.06))",
              }}
              priority
            />
          </div>

          {/* Orbiting glow 1 - clockwise, purple/pink */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ animation: "orbit-cw 25s linear infinite" }}
          >
            <div
              className="absolute -top-[15%] left-[25%] w-[45%] aspect-square rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(155,89,182,0.22) 0%, rgba(232,121,168,0.1) 45%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          </div>

          {/* Orbiting glow 2 - counter-clockwise, gold */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ animation: "orbit-ccw 30s linear infinite" }}
          >
            <div
              className="absolute -bottom-[10%] right-[20%] w-[40%] aspect-square rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,168,67,0.18) 0%, rgba(240,199,94,0.07) 45%, transparent 70%)",
                filter: "blur(55px)",
              }}
            />
          </div>

          {/* Brain pulse - left hemisphere (purple) */}
          <div
            className="absolute top-[35%] left-[38%] w-[12%] aspect-square rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(155,89,182,0.4) 0%, rgba(99,102,241,0.15) 50%, transparent 70%)",
              filter: "blur(12px)",
              animation: "brain-pulse-left 4.5s ease-in-out infinite",
            }}
          />

          {/* Brain pulse - right hemisphere (gold) */}
          <div
            className="absolute top-[35%] left-[50%] w-[12%] aspect-square rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(212,168,67,0.35) 0%, rgba(240,199,94,0.12) 50%, transparent 70%)",
              filter: "blur(12px)",
              animation: "brain-pulse-right 4.5s ease-in-out infinite 2.25s",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ===== PARTICLES CANVAS ===== */}
      <motion.div
        className="absolute inset-0 z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <HeroCanvas />
      </motion.div>

      {/* ===== DARK GRADIENT OVERLAY (left side for text readability) ===== */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,14,26,0.88) 0%, rgba(11,14,26,0.65) 30%, rgba(11,14,26,0.25) 55%, transparent 75%)",
        }}
      />

      {/* ===== BOTTOM FADE ===== */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary to-transparent z-[4]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-[5] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column: Text */}
          <div>
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

          {/* Right column: Terminal card */}
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
