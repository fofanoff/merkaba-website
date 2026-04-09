"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

export function FaqSection({
  dict,
  section,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  section: "services" | "contact";
}) {
  const faqData = dict[section]?.faq;
  const faqTitle = dict[section]?.faq_title;

  if (!faqData || faqData.length === 0) return null;

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">{faqTitle}</h2>
        </FadeIn>

        <div className="space-y-4">
          {faqData.map(
            (item: { q: string; a: string }, i: number) => (
              <FadeIn key={i} delay={i * 0.05}>
                <FaqItem question={item.q} answer={item.a} />
              </FadeIn>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-white/5 bg-bg-card/30 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-text-primary font-medium text-sm md:text-base pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="text-text-muted text-xl shrink-0"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-text-secondary text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
