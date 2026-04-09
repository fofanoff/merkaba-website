"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  color: string;
  orbitRadius: number;
  orbitAngle: number;
}

const COLORS = [
  "rgba(155, 89, 182, 0.8)",  // purple
  "rgba(99, 102, 241, 0.8)",  // indigo
  "rgba(59, 130, 246, 0.7)",  // blue
  "rgba(232, 121, 168, 0.7)", // pink
  "rgba(212, 168, 67, 0.8)",  // gold
];

function createParticles(cx: number, cy: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const orbitRadius = 40 + Math.random() * 220;
    const orbitAngle = Math.random() * Math.PI * 2;
    particles.push({
      x: cx + Math.cos(orbitAngle) * orbitRadius,
      y: cy + Math.sin(orbitAngle) * orbitRadius,
      angle: orbitAngle,
      radius: orbitRadius,
      speed: 0.001 + Math.random() * 0.003,
      size: 1 + Math.random() * 2.5,
      opacity: 0.3 + Math.random() * 0.7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      orbitRadius,
      orbitAngle,
    });
  }
  return particles;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const particleCount = rect.width < 768 ? 40 : 80;
      particlesRef.current = createParticles(cx, cy, particleCount);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Ambient glow - pulsating halo around center
      const pulseScale = 1 + Math.sin(t * 0.8) * 0.08;
      const glowSize = Math.min(w, h) * 0.4 * pulseScale;

      // Purple glow (left side - brain left hemisphere)
      const purpleGlow = ctx.createRadialGradient(
        cx - 30, cy, 0,
        cx - 30, cy, glowSize
      );
      purpleGlow.addColorStop(0, "rgba(155, 89, 182, 0.12)");
      purpleGlow.addColorStop(0.4, "rgba(99, 102, 241, 0.06)");
      purpleGlow.addColorStop(1, "rgba(99, 102, 241, 0)");
      ctx.fillStyle = purpleGlow;
      ctx.fillRect(0, 0, w, h);

      // Gold glow (right side - brain right hemisphere)
      const goldPulse = 1 + Math.sin(t * 0.8 + Math.PI) * 0.08;
      const goldSize = Math.min(w, h) * 0.35 * goldPulse;
      const goldGlow = ctx.createRadialGradient(
        cx + 30, cy, 0,
        cx + 30, cy, goldSize
      );
      goldGlow.addColorStop(0, "rgba(212, 168, 67, 0.1)");
      goldGlow.addColorStop(0.4, "rgba(240, 199, 94, 0.04)");
      goldGlow.addColorStop(1, "rgba(212, 168, 67, 0)");
      ctx.fillStyle = goldGlow;
      ctx.fillRect(0, 0, w, h);

      // Running light beam along a circular path
      const beamAngle = t * 0.4;
      const beamRadius = Math.min(w, h) * 0.22;
      const beamX = cx + Math.cos(beamAngle) * beamRadius;
      const beamY = cy + Math.sin(beamAngle) * beamRadius;
      const beamGrad = ctx.createRadialGradient(beamX, beamY, 0, beamX, beamY, 80);
      beamGrad.addColorStop(0, "rgba(232, 121, 168, 0.15)");
      beamGrad.addColorStop(0.5, "rgba(155, 89, 182, 0.06)");
      beamGrad.addColorStop(1, "rgba(155, 89, 182, 0)");
      ctx.fillStyle = beamGrad;
      ctx.fillRect(0, 0, w, h);

      // Second beam (opposite direction, gold)
      const beam2Angle = t * 0.3 + Math.PI;
      const beam2X = cx + Math.cos(beam2Angle) * beamRadius * 0.9;
      const beam2Y = cy + Math.sin(beam2Angle) * beamRadius * 0.9;
      const beam2Grad = ctx.createRadialGradient(beam2X, beam2Y, 0, beam2X, beam2Y, 60);
      beam2Grad.addColorStop(0, "rgba(212, 168, 67, 0.12)");
      beam2Grad.addColorStop(0.5, "rgba(240, 199, 94, 0.04)");
      beam2Grad.addColorStop(1, "rgba(212, 168, 67, 0)");
      ctx.fillStyle = beam2Grad;
      ctx.fillRect(0, 0, w, h);

      // Particles
      const mouse = mouseRef.current;
      for (const p of particlesRef.current) {
        p.orbitAngle += p.speed;
        let targetX = cx + Math.cos(p.orbitAngle) * p.orbitRadius;
        let targetY = cy + Math.sin(p.orbitAngle) * p.orbitRadius;

        // Mouse interaction
        if (mouse.active) {
          const dx = targetX - mouse.x;
          const dy = targetY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            targetX += dx * force * 0.3;
            targetY += dy * force * 0.3;
          }
        }

        p.x += (targetX - p.x) * 0.05;
        p.y += (targetY - p.y) * 0.05;

        const flickerOpacity = p.opacity * (0.6 + Math.sin(t * 2 + p.angle * 10) * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("0.8", String(flickerOpacity)).replace("0.7", String(flickerOpacity * 0.9));
        ctx.fill();

        // Particle glow
        if (p.size > 1.5) {
          const pglow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          pglow.addColorStop(0, p.color.replace("0.8", "0.15").replace("0.7", "0.12"));
          pglow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = pglow;
          ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] pointer-events-auto"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
