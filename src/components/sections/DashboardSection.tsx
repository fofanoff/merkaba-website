"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DashboardSection({ dict }: { dict: any }) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            {dict.dashboard.title}
          </h2>
          <p className="text-text-secondary text-lg">{dict.dashboard.subtitle}</p>
        </FadeIn>

        <FadeIn>
          <div className="relative max-w-5xl mx-auto">
            {/* Glow effect behind dashboard */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-pink/10 via-accent-indigo/10 to-accent-blue/10 blur-3xl rounded-3xl" />

            {/* Dashboard mockup */}
            <motion.div
              initial={{ perspective: 1000 }}
              whileInView={{ rotateX: 0 }}
              className="relative rounded-2xl bg-bg-card border border-white/10 overflow-hidden shadow-2xl"
              style={{ transform: "perspective(1000px) rotateX(2deg)" }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-bg-surface/50">
                <div className="w-3 h-3 rounded-full bg-danger/50" />
                <div className="w-3 h-3 rounded-full bg-warning/50" />
                <div className="w-3 h-3 rounded-full bg-success/50" />
                <span className="text-text-muted text-xs font-mono ml-4">
                  AI Visibility Dashboard - Overview
                </span>
              </div>

              {/* Dashboard content mockup */}
              <div className="p-6 md:p-8">
                {/* Top metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: dict.dashboard.metric1, value: "47%", change: "+12%", color: "accent-indigo" },
                    { label: dict.dashboard.metric2, value: "89", change: "+23", color: "accent-purple" },
                    { label: dict.dashboard.metric3, value: "6.8", change: "+1.2", color: "accent-pink" },
                    { label: dict.dashboard.metric4, value: "8.4", change: "+0.6", color: "accent-gold" },
                  ].map((metric, i) => (
                    <div key={i} className="rounded-xl bg-bg-surface/50 border border-white/5 p-4">
                      <p className="text-text-muted text-xs mb-1">{metric.label}</p>
                      <p className="text-text-primary text-2xl font-heading font-bold">{metric.value}</p>
                      <p className={`text-${metric.color} text-xs font-mono mt-1`}>
                        ↑ {metric.change}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div className="rounded-xl bg-bg-surface/30 border border-white/5 p-6 h-48 flex items-end gap-2">
                  {[30, 35, 25, 40, 38, 45, 50, 55, 48, 60, 65, 72].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="flex-1 rounded-t-sm"
                      style={{
                        background: `linear-gradient(to top, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.8))`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
