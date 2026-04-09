"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: [number, number, number];
  baseOpacity: number;
  phase: number;
}

const PALETTE: [number, number, number][] = [
  [155, 89, 182],  // purple
  [99, 102, 241],  // indigo
  [59, 130, 246],  // blue
  [232, 121, 168], // pink
  [212, 168, 67],  // gold
];

function createParticles(w: number, h: number, count: number): Particle[] {
  return Array.from({ length: count }, () => {
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    const baseOpacity = 0.2 + Math.random() * 0.5;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.12,
      size: 0.8 + Math.random() * 2,
      opacity: baseOpacity,
      color,
      baseOpacity,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 768 ? 30 : 55;
      particlesRef.current = createParticles(w, h, count);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Gentle flicker
        const flicker = 0.6 + Math.sin(t * 0.8 + p.phase) * 0.4;
        const alpha = p.baseOpacity * flicker;

        const [r, g, b] = p.color;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();

        // Soft glow for larger particles
        if (p.size > 1.5) {
          const glow = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.size * 4
          );
          glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.2})`);
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
