"use client";

import { useEffect, useRef } from "react";

// ============================================================
// FLOWER OF LIFE GEOMETRY
// Circles share radius R. Ring 1 at distance R, Ring 2 at R*sqrt(3)
// ============================================================
function buildFlowerCircles(R: number) {
  const circles: { cx: number; cy: number }[] = [{ cx: 0, cy: 0 }];
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    circles.push({ cx: R * Math.cos(a), cy: R * Math.sin(a) });
  }
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 + Math.PI / 6;
    circles.push({ cx: R * 1.732 * Math.cos(a), cy: R * 1.732 * Math.sin(a) });
  }
  return circles;
}

// ============================================================
// BRAIN CIRCUIT TRACES - wide, covering full brain area
// Coordinates are fractions of brainScale (which = R * 0.9)
// Traces look like PCB circuit paths
// ============================================================
const TRACES = [
  // Left hemisphere - purple
  { points: [[-0.55, -0.25], [-0.35, -0.35], [-0.10, -0.20], [0.0, -0.05]], side: "left" as const },
  { points: [[-0.50, 0.10], [-0.30, 0.0], [-0.15, 0.15], [0.0, 0.05]], side: "left" as const },
  { points: [[-0.45, -0.05], [-0.25, -0.15], [-0.10, 0.05], [-0.05, -0.10]], side: "left" as const },
  { points: [[-0.40, 0.25], [-0.20, 0.10], [-0.10, 0.25], [0.0, 0.15]], side: "left" as const },
  { points: [[-0.35, -0.30], [-0.20, -0.20], [-0.30, -0.05], [-0.15, 0.05]], side: "left" as const },
  // Right hemisphere - gold
  { points: [[0.0, -0.05], [0.15, -0.20], [0.35, -0.30], [0.50, -0.15]], side: "right" as const },
  { points: [[0.0, 0.05], [0.20, 0.15], [0.35, 0.05], [0.50, 0.15]], side: "right" as const },
  { points: [[0.05, -0.15], [0.20, -0.05], [0.30, -0.20], [0.45, -0.05]], side: "right" as const },
  { points: [[0.0, 0.15], [0.15, 0.05], [0.25, 0.20], [0.40, 0.25]], side: "right" as const },
  { points: [[0.10, 0.0], [0.25, -0.10], [0.35, 0.10], [0.45, -0.10]], side: "right" as const },
];

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

    // CW glows along flower circles (purple/pink/indigo)
    const cwGlows = [
      { circleIdx: 0, angle: 0, speed: 0.0035, size: 10, color: [155, 89, 182] as [number, number, number], opacity: 0.55 },
      { circleIdx: 2, angle: Math.PI * 0.8, speed: 0.003, size: 9, color: [232, 121, 168] as [number, number, number], opacity: 0.5 },
      { circleIdx: 4, angle: Math.PI * 1.5, speed: 0.004, size: 8, color: [99, 102, 241] as [number, number, number], opacity: 0.45 },
      { circleIdx: 6, angle: Math.PI * 0.3, speed: 0.0032, size: 10, color: [155, 89, 182] as [number, number, number], opacity: 0.5 },
      { circleIdx: 1, angle: Math.PI * 1.1, speed: 0.0038, size: 8, color: [232, 121, 168] as [number, number, number], opacity: 0.4 },
      { circleIdx: 3, angle: Math.PI * 0.5, speed: 0.0028, size: 9, color: [99, 102, 241] as [number, number, number], opacity: 0.45 },
      { circleIdx: 5, angle: Math.PI * 1.7, speed: 0.0042, size: 7, color: [155, 89, 182] as [number, number, number], opacity: 0.4 },
    ];

    // CCW glows along outer ring (gold)
    const outerGlows = [
      { angle: 0, speed: -0.0012, size: 12, color: [212, 168, 67] as [number, number, number], opacity: 0.5 },
      { angle: Math.PI * 0.67, speed: -0.0015, size: 10, color: [240, 199, 94] as [number, number, number], opacity: 0.4 },
      { angle: Math.PI * 1.33, speed: -0.001, size: 11, color: [212, 168, 67] as [number, number, number], opacity: 0.45 },
    ];

    // Impulse state per trace
    const impulses = TRACES.map((_, i) => ({
      position: Math.random(),
      speed: 0.08 + Math.random() * 0.05, // slow steady movement
    }));

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const cx = w / 2;
      const cy = h / 2;

      // Scale R to match the actual flower of life in the background image
      const imageH = Math.min(h * 0.72, 650);
      const R = imageH * 0.165; // calibrated to match hero-bg.webp
      const outerR = R * 2.15;
      const brainScale = R * 0.9;

      const circles = buildFlowerCircles(R);

      // ── CW GLOWS along flower circle arcs ──
      for (const glow of cwGlows) {
        glow.angle += glow.speed;
        const circle = circles[glow.circleIdx];

        // Point on the circumference of this flower circle
        const x = cx + circle.cx + R * Math.cos(glow.angle);
        const y = cy + circle.cy + R * Math.sin(glow.angle);

        const flicker = 0.75 + Math.sin(time * 1.2 + glow.angle * 2) * 0.25;
        const alpha = glow.opacity * flicker;
        const [r, g, b] = glow.color;

        // Core spot
        const grad = ctx.createRadialGradient(x, y, 0, x, y, glow.size);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(x - glow.size, y - glow.size, glow.size * 2, glow.size * 2);

        // Soft halo
        const hs = glow.size * 2.5;
        const halo = ctx.createRadialGradient(x, y, 0, x, y, hs);
        halo.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.1})`);
        halo.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = halo;
        ctx.fillRect(x - hs, y - hs, hs * 2, hs * 2);
      }

      // ── CCW GLOWS along outer ring ──
      for (const glow of outerGlows) {
        glow.angle += glow.speed;
        const x = cx + outerR * Math.cos(glow.angle);
        const y = cy + outerR * Math.sin(glow.angle);

        const flicker = 0.8 + Math.sin(time * 0.7 + glow.angle) * 0.2;
        const alpha = glow.opacity * flicker;
        const [r, g, b] = glow.color;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, glow.size);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.3})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(x - glow.size, y - glow.size, glow.size * 2, glow.size * 2);

        const hs = glow.size * 3;
        const halo = ctx.createRadialGradient(x, y, 0, x, y, hs);
        halo.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.08})`);
        halo.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = halo;
        ctx.fillRect(x - hs, y - hs, hs * 2, hs * 2);
      }

      // ── BRAIN CIRCUIT TRACES + IMPULSES ──
      for (let ti = 0; ti < TRACES.length; ti++) {
        const trace = TRACES[ti];
        const imp = impulses[ti];
        const pts = trace.points;
        const isLeft = trace.side === "left";
        const [ir, ig, ib] = isLeft ? [160, 140, 240] : [230, 200, 110];

        // Compute segment lengths
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

        // Draw trace lines
        ctx.strokeStyle = `rgba(${ir},${ig},${ib},0.05)`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        for (let i = 0; i < pts.length; i++) {
          const px = cx + pts[i][0] * brainScale;
          const py = cy + pts[i][1] * brainScale;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Find impulse screen position
        let dist = imp.position * totalLen;
        let impulseX = cx + pts[0][0] * brainScale;
        let impulseY = cy + pts[0][1] * brainScale;
        let onSegment = 0;

        for (let i = 0; i < segLens.length; i++) {
          if (dist <= segLens[i]) {
            const t = dist / segLens[i];
            impulseX = cx + (pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t) * brainScale;
            impulseY = cy + (pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t) * brainScale;
            onSegment = i;
            break;
          }
          dist -= segLens[i];
        }

        // Check if near any node for flash effect
        let nearestNodeDist = Infinity;
        let nearNodeX = 0;
        let nearNodeY = 0;
        for (let i = 0; i < pts.length; i++) {
          const nx = cx + pts[i][0] * brainScale;
          const ny = cy + pts[i][1] * brainScale;
          const d = Math.sqrt((impulseX - nx) ** 2 + (impulseY - ny) ** 2);
          if (d < nearestNodeDist) {
            nearestNodeDist = d;
            nearNodeX = nx;
            nearNodeY = ny;
          }
        }

        const nearNode = nearestNodeDist < 6;

        // Draw impulse dot (bigger + brighter near nodes)
        const impSize = nearNode ? 7 : 4;
        const impAlpha = nearNode ? 0.85 : 0.55;

        const impGrad = ctx.createRadialGradient(impulseX, impulseY, 0, impulseX, impulseY, impSize);
        impGrad.addColorStop(0, `rgba(255,255,255,${impAlpha})`);
        impGrad.addColorStop(0.3, `rgba(${ir},${ig},${ib},${impAlpha * 0.7})`);
        impGrad.addColorStop(1, `rgba(${ir},${ig},${ib},0)`);
        ctx.fillStyle = impGrad;
        ctx.fillRect(impulseX - impSize, impulseY - impSize, impSize * 2, impSize * 2);

        // Flash burst at node
        if (nearNode) {
          const fs = 15;
          const fGrad = ctx.createRadialGradient(nearNodeX, nearNodeY, 0, nearNodeX, nearNodeY, fs);
          fGrad.addColorStop(0, `rgba(255,255,255,0.35)`);
          fGrad.addColorStop(0.15, `rgba(${ir},${ig},${ib},0.2)`);
          fGrad.addColorStop(0.5, `rgba(${ir},${ig},${ib},0.05)`);
          fGrad.addColorStop(1, `rgba(${ir},${ig},${ib},0)`);
          ctx.fillStyle = fGrad;
          ctx.fillRect(nearNodeX - fs, nearNodeY - fs, fs * 2, fs * 2);
        }

        // Draw nodes (subtle, brighter when impulse nearby)
        for (let i = 0; i < pts.length; i++) {
          const nx = cx + pts[i][0] * brainScale;
          const ny = cy + pts[i][1] * brainScale;
          const d = Math.sqrt((impulseX - nx) ** 2 + (impulseY - ny) ** 2);
          const proximity = Math.max(0, 1 - d / 25);
          const nodeAlpha = 0.08 + proximity * 0.3;
          const ns = 2 + proximity * 2;

          const nGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, ns);
          nGrad.addColorStop(0, `rgba(${ir},${ig},${ib},${nodeAlpha})`);
          nGrad.addColorStop(1, `rgba(${ir},${ig},${ib},0)`);
          ctx.fillStyle = nGrad;
          ctx.fillRect(nx - ns, ny - ns, ns * 2, ns * 2);
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
