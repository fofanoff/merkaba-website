"use client";

import { useEffect, useRef } from "react";

// ============================================================
// BRAIN CIRCUIT TRACES
// Long paths with trailing light effect
// Coordinates relative to center, scaled by brainScale
// ============================================================
const TRACES = [
  // Left hemisphere - long winding path across the whole left side
  {
    points: [
      [-0.55, -0.30], [-0.45, -0.15], [-0.30, -0.25], [-0.15, -0.10],
      [-0.25, 0.05], [-0.40, 0.15], [-0.20, 0.25], [-0.05, 0.10],
    ],
    side: "left" as const,
  },
  {
    points: [
      [-0.50, 0.05], [-0.35, -0.10], [-0.20, -0.30], [-0.10, -0.15],
      [-0.05, -0.25], [-0.15, 0.0], [-0.30, 0.10], [-0.10, 0.20],
    ],
    side: "left" as const,
  },
  // Right hemisphere - long winding path across the whole right side
  {
    points: [
      [0.05, -0.15], [0.15, -0.30], [0.30, -0.20], [0.45, -0.10],
      [0.35, 0.05], [0.20, 0.15], [0.40, 0.25], [0.55, 0.10],
    ],
    side: "right" as const,
  },
  {
    points: [
      [0.10, 0.10], [0.25, -0.05], [0.40, -0.20], [0.50, -0.05],
      [0.35, 0.10], [0.20, 0.25], [0.30, 0.0], [0.15, -0.15],
    ],
    side: "right" as const,
  },
];

const TRAIL_LENGTH = 12; // how many past positions to keep for trail

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

    // Impulse state with trail history
    const impulses = TRACES.map(() => ({
      position: Math.random(),
      speed: 0.04 + Math.random() * 0.02,
      trail: [] as { x: number; y: number }[],
    }));

    // CW inner orbit glows (purple/pink) - simple circular orbit at inner radius
    const cwGlows = [
      { angle: 0, speed: 0.003 },
      { angle: Math.PI * 0.5, speed: 0.003 },
      { angle: Math.PI, speed: 0.003 },
      { angle: Math.PI * 1.5, speed: 0.003 },
    ];

    // CCW outer orbit glows (gold) - spaced around outer ring
    const ccwGlows = [
      { angle: 0, speed: -0.0012 },
      { angle: Math.PI * 0.67, speed: -0.0012 },
      { angle: Math.PI * 1.33, speed: -0.0012 },
    ];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const cx = w / 2;
      const cy = h / 2;

      const imageH = Math.min(h * 0.72, 650);
      const R = imageH * 0.155;
      const innerOrbitR = R * 1.95; // middle flower petals orbit
      const outerOrbitR = R * 2.2; // outer boundary
      const brainScale = R * 1.0;

      // ── CW GLOWS - inner orbit (purple/pink) ──
      for (const glow of cwGlows) {
        glow.angle += glow.speed;
        const x = cx + innerOrbitR * Math.cos(glow.angle);
        const y = cy + innerOrbitR * Math.sin(glow.angle);

        const flicker = 0.8 + Math.sin(time * 0.9 + glow.angle * 3) * 0.2;

        // Core
        const size = 10;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
        grad.addColorStop(0, `rgba(155,89,182,${0.5 * flicker})`);
        grad.addColorStop(0.4, `rgba(232,121,168,${0.25 * flicker})`);
        grad.addColorStop(1, "rgba(155,89,182,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(x - size, y - size, size * 2, size * 2);

        // Halo
        const hs = 25;
        const halo = ctx.createRadialGradient(x, y, 0, x, y, hs);
        halo.addColorStop(0, `rgba(155,89,182,${0.08 * flicker})`);
        halo.addColorStop(1, "rgba(155,89,182,0)");
        ctx.fillStyle = halo;
        ctx.fillRect(x - hs, y - hs, hs * 2, hs * 2);
      }

      // ── CCW GLOWS - outer ring (gold) ──
      for (const glow of ccwGlows) {
        glow.angle += glow.speed;
        const x = cx + outerOrbitR * Math.cos(glow.angle);
        const y = cy + outerOrbitR * Math.sin(glow.angle);

        const flicker = 0.8 + Math.sin(time * 0.7 + glow.angle) * 0.2;

        const size = 12;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
        grad.addColorStop(0, `rgba(212,168,67,${0.45 * flicker})`);
        grad.addColorStop(0.4, `rgba(240,199,94,${0.2 * flicker})`);
        grad.addColorStop(1, "rgba(212,168,67,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(x - size, y - size, size * 2, size * 2);

        const hs = 30;
        const halo = ctx.createRadialGradient(x, y, 0, x, y, hs);
        halo.addColorStop(0, `rgba(212,168,67,${0.06 * flicker})`);
        halo.addColorStop(1, "rgba(212,168,67,0)");
        ctx.fillStyle = halo;
        ctx.fillRect(x - hs, y - hs, hs * 2, hs * 2);
      }

      // ── BRAIN IMPULSES WITH TRAILING LIGHT ──
      for (let ti = 0; ti < TRACES.length; ti++) {
        const trace = TRACES[ti];
        const imp = impulses[ti];
        const pts = trace.points;
        // White/cool-white for all impulses - distinct from colored glows
        const [ir, ig, ib] = [200, 210, 240];

        // Compute segments
        let totalLen = 0;
        const segLens: number[] = [];
        for (let i = 0; i < pts.length - 1; i++) {
          const dx = (pts[i + 1][0] - pts[i][0]) * brainScale;
          const dy = (pts[i + 1][1] - pts[i][1]) * brainScale;
          segLens.push(Math.sqrt(dx * dx + dy * dy));
          totalLen += segLens[segLens.length - 1];
        }

        // Advance impulse
        imp.position += imp.speed * 0.016;
        if (imp.position > 1) imp.position -= 1;

        // Get current position on trace
        let dist = imp.position * totalLen;
        let impulseX = cx + pts[0][0] * brainScale;
        let impulseY = cy + pts[0][1] * brainScale;

        for (let i = 0; i < segLens.length; i++) {
          if (dist <= segLens[i]) {
            const t = dist / segLens[i];
            impulseX = cx + (pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t) * brainScale;
            impulseY = cy + (pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t) * brainScale;
            break;
          }
          dist -= segLens[i];
        }

        // Update trail
        imp.trail.push({ x: impulseX, y: impulseY });
        if (imp.trail.length > TRAIL_LENGTH) imp.trail.shift();

        // Draw trail (fading tail behind the impulse)
        for (let i = 0; i < imp.trail.length; i++) {
          const t = imp.trail[i];
          const age = i / imp.trail.length; // 0 = oldest, 1 = newest
          const trailAlpha = age * 0.3;
          const trailSize = 2 + age * 3;

          const tGrad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, trailSize);
          tGrad.addColorStop(0, `rgba(${ir},${ig},${ib},${trailAlpha})`);
          tGrad.addColorStop(1, `rgba(${ir},${ig},${ib},0)`);
          ctx.fillStyle = tGrad;
          ctx.fillRect(t.x - trailSize, t.y - trailSize, trailSize * 2, trailSize * 2);
        }

        // Draw impulse head (bright dot)
        const headSize = 5;
        const headGrad = ctx.createRadialGradient(impulseX, impulseY, 0, impulseX, impulseY, headSize);
        headGrad.addColorStop(0, `rgba(255,255,255,0.7)`);
        headGrad.addColorStop(0.3, `rgba(${ir},${ig},${ib},0.5)`);
        headGrad.addColorStop(1, `rgba(${ir},${ig},${ib},0)`);
        ctx.fillStyle = headGrad;
        ctx.fillRect(impulseX - headSize, impulseY - headSize, headSize * 2, headSize * 2);

        // Check for node proximity - flash effect
        for (let i = 0; i < pts.length; i++) {
          const nx = cx + pts[i][0] * brainScale;
          const ny = cy + pts[i][1] * brainScale;
          const d = Math.sqrt((impulseX - nx) ** 2 + (impulseY - ny) ** 2);

          if (d < 8) {
            // Flash!
            const fs = 14;
            const fGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, fs);
            fGrad.addColorStop(0, "rgba(255,255,255,0.4)");
            fGrad.addColorStop(0.2, `rgba(${ir},${ig},${ib},0.2)`);
            fGrad.addColorStop(1, `rgba(${ir},${ig},${ib},0)`);
            ctx.fillStyle = fGrad;
            ctx.fillRect(nx - fs, ny - fs, fs * 2, fs * 2);
          }
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
