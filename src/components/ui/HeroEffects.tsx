"use client";

import { useEffect, useRef } from "react";

// Glow spot orbiting along flower of life circles
interface GlowSpot {
  angle: number;
  radius: number; // orbit radius as fraction of container width
  speed: number; // radians per frame
  size: number;
  color: [number, number, number];
  opacity: number;
}

// Neural pulse dot in brain area
interface NeuralDot {
  x: number; // relative to center (-1 to 1)
  y: number;
  phase: number;
  speed: number;
  size: number;
  connections: number[]; // indices of connected dots
}

export function HeroEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    // Clockwise glow spots (purple/pink) - along outer flower circles
    const cwSpots: GlowSpot[] = [
      { angle: 0, radius: 0.28, speed: 0.0035, size: 18, color: [155, 89, 182], opacity: 0.6 },
      { angle: Math.PI * 0.7, radius: 0.34, speed: 0.003, size: 14, color: [232, 121, 168], opacity: 0.5 },
      { angle: Math.PI * 1.4, radius: 0.22, speed: 0.004, size: 12, color: [99, 102, 241], opacity: 0.45 },
      { angle: Math.PI * 0.3, radius: 0.4, speed: 0.0025, size: 16, color: [155, 89, 182], opacity: 0.4 },
    ];

    // Counter-clockwise glow spots (gold) - along inner flower circles
    const ccwSpots: GlowSpot[] = [
      { angle: 0, radius: 0.26, speed: -0.003, size: 16, color: [212, 168, 67], opacity: 0.55 },
      { angle: Math.PI * 0.9, radius: 0.32, speed: -0.0035, size: 13, color: [240, 199, 94], opacity: 0.45 },
      { angle: Math.PI * 1.6, radius: 0.2, speed: -0.004, size: 11, color: [212, 168, 67], opacity: 0.4 },
      { angle: Math.PI * 1.2, radius: 0.38, speed: -0.002, size: 15, color: [240, 199, 94], opacity: 0.35 },
    ];

    const allSpots = [...cwSpots, ...ccwSpots];

    // Neural dots in brain area (center of image)
    const neuralDots: NeuralDot[] = [
      { x: -0.04, y: -0.02, phase: 0, speed: 1.2, size: 2.5, connections: [1, 3] },
      { x: 0.03, y: -0.04, phase: 1.5, speed: 0.9, size: 2, connections: [0, 2] },
      { x: 0.05, y: 0.01, phase: 3, speed: 1.1, size: 2.2, connections: [1, 4] },
      { x: -0.03, y: 0.03, phase: 4.5, speed: 1.3, size: 1.8, connections: [0, 5] },
      { x: 0.02, y: 0.04, phase: 2, speed: 1, size: 2, connections: [2, 5] },
      { x: -0.01, y: -0.05, phase: 5, speed: 0.8, size: 2.3, connections: [3, 4] },
      { x: 0.06, y: -0.02, phase: 1, speed: 1.4, size: 1.5, connections: [1, 2] },
      { x: -0.05, y: -0.01, phase: 3.5, speed: 1.1, size: 1.8, connections: [0, 3] },
    ];

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
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const cx = w / 2;
      const cy = h / 2;
      const baseRadius = Math.min(w, h) * 0.5;

      // Draw glow spots along flower of life circles
      for (const spot of allSpots) {
        spot.angle += spot.speed;

        const x = cx + Math.cos(spot.angle) * spot.radius * baseRadius;
        const y = cy + Math.sin(spot.angle) * spot.radius * baseRadius * 0.76; // account for image aspect ratio

        const flicker = 0.7 + Math.sin(time * 1.5 + spot.angle * 3) * 0.3;
        const alpha = spot.opacity * flicker;
        const [r, g, b] = spot.color;

        // Core bright spot
        const grad = ctx.createRadialGradient(x, y, 0, x, y, spot.size);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(x - spot.size, y - spot.size, spot.size * 2, spot.size * 2);

        // Outer soft glow
        const glowSize = spot.size * 3;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.15})`);
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(x - glowSize, y - glowSize, glowSize * 2, glowSize * 2);
      }

      // Draw neural connections and dots in brain area
      const brainScale = baseRadius * 0.8;

      // Connections (thin lines with traveling pulses)
      ctx.lineWidth = 0.8;
      for (const dot of neuralDots) {
        const dx = cx + dot.x * brainScale;
        const dy = cy + dot.y * brainScale * 0.76;

        for (const ci of dot.connections) {
          const target = neuralDots[ci];
          const tx = cx + target.x * brainScale;
          const ty = cy + target.y * brainScale * 0.76;

          // Pulse along connection
          const pulsePos = (Math.sin(time * dot.speed + dot.phase) + 1) / 2;
          const px = dx + (tx - dx) * pulsePos;
          const py = dy + (ty - dy) * pulsePos;

          // Line
          const lineAlpha = 0.08 + Math.sin(time * 0.5 + dot.phase) * 0.04;
          ctx.strokeStyle = `rgba(180, 200, 255, ${lineAlpha})`;
          ctx.beginPath();
          ctx.moveTo(dx, dy);
          ctx.lineTo(tx, ty);
          ctx.stroke();

          // Traveling pulse dot
          const pulseAlpha = 0.4 + Math.sin(time * 2 + dot.phase) * 0.3;
          const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, 4);
          pulseGrad.addColorStop(0, `rgba(200, 220, 255, ${pulseAlpha})`);
          pulseGrad.addColorStop(1, "rgba(200, 220, 255, 0)");
          ctx.fillStyle = pulseGrad;
          ctx.fillRect(px - 4, py - 4, 8, 8);
        }
      }

      // Neural dots (nodes)
      for (const dot of neuralDots) {
        const dx = cx + dot.x * brainScale;
        const dy = cy + dot.y * brainScale * 0.76;

        const pulse = 0.3 + Math.sin(time * dot.speed * 2 + dot.phase) * 0.4;
        const brightPulse = Math.max(0, Math.sin(time * dot.speed * 3 + dot.phase));
        const alpha = pulse + brightPulse * 0.5;

        // Determine color based on x position (left=purple, right=gold)
        const isLeft = dot.x < 0;
        const [r, g, b] = isLeft ? [160, 140, 240] : [220, 190, 100];

        const grad = ctx.createRadialGradient(dx, dy, 0, dx, dy, dot.size * 2);
        grad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(alpha, 0.9)})`);
        grad.addColorStop(0.3, `rgba(${r},${g},${b},${alpha * 0.6})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(dx - dot.size * 2, dy - dot.size * 2, dot.size * 4, dot.size * 4);
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
