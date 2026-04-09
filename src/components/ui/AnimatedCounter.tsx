"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  value: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const isNumeric = !isNaN(numericPart) && numericPart > 0;

  useEffect(() => {
    if (!isInView || !isNumeric) {
      if (!isNumeric && isInView) setDisplayValue(value);
      return;
    }

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericPart);
      setDisplayValue(String(current));

      if (now < endTime) {
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(String(numericPart));
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, numericPart, duration, isNumeric, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="font-mono text-5xl md:text-6xl font-bold text-gradient"
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
}
