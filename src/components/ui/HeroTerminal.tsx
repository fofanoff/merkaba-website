"use client";

import { motion } from "framer-motion";

export function HeroTerminal({
  dict,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}) {
  const t = dict.terminal;

  const results = [
    { platform: "ChatGPT", status: t.not_found, color: "text-danger" },
    { platform: "Gemini", status: t.not_found, color: "text-danger" },
    { platform: "Perplexity", status: t.mentioned_once, color: "text-warning" },
    { platform: "Claude", status: t.not_found, color: "text-danger" },
    { platform: "Copilot", status: t.not_found, color: "text-danger" },
  ];

  return (
    <div className="relative w-full max-w-md">
      {/* Glow behind card */}
      <div className="absolute -inset-4 bg-gradient-to-br from-accent-pink/8 via-accent-indigo/8 to-accent-blue/8 rounded-3xl blur-2xl" />

      <div className="relative rounded-2xl bg-bg-card/70 border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-bg-surface/40">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="text-text-muted text-[11px] ml-3 font-mono">
            {t.title}
          </span>
        </div>

        {/* Terminal content */}
        <div className="p-5 font-mono text-[13px] leading-relaxed space-y-3">
          {/* Command */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-accent-indigo">$</span>
            <span className="text-text-muted ml-2">
              {t.command_prefix} &quot;{t.brand_name}&quot;
            </span>
          </motion.div>

          {/* Scanning */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="text-text-muted"
          >
            <span className="text-accent-gold">&#9656;</span> {t.scanning}
          </motion.div>

          {/* Results */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            {results.map((r, i) => (
              <motion.div
                key={r.platform}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 + i * 0.25 }}
                className="flex justify-between"
              >
                <span className="text-text-muted">{r.platform}</span>
                <span className={r.color}>{r.status}</span>
              </motion.div>
            ))}
          </div>

          {/* Score */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8 }}
            className="pt-3 border-t border-white/5"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-text-secondary">{t.score_label}</span>
              <span className="text-danger font-bold text-base">4%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "4%" }}
                transition={{ delay: 4.0, duration: 0.8 }}
                className="h-full rounded-full bg-danger"
              />
            </div>
          </motion.div>

          {/* Conclusion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.3 }}
            className="pt-3 border-t border-white/5"
          >
            <span className="text-accent-indigo">&#10022;</span>
            <span className="text-accent-pink ml-2">{t.conclusion}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
