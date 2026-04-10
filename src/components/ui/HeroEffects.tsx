"use client";

import { useEffect, useRef } from "react";

// ============================================================
// FLOWER OF LIFE GEOMETRY
// All circles share the same radius R.
// Ring 0: center circle
// Ring 1: 6 circles at distance R, 60deg apart
// Ring 2: 6 circles at distance R*sqrt(3), offset 30deg
// Outer bounding circle: radius ~2.15R
// ============================================================

function buildFlowerCircles(R: number) {
  const circles: { cx: number; cy: number }[] = [{ cx: 0, cy: 0 }];
  // Ring 1
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    circles.push({ cx: R * Math.cos(a), cy: R * Math.sin(a) });
  }
  // Ring 2
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 + Math.PI / 6;
    circles.push({ cx: R * 1.732 * Math.cos(a), cy: R * 1.732 * Math.sin(a) });
  }
  return circles;
}

// ============================================================
// BRAIN CIRCUIT TRACES
// Each trace is a path of points (normalized to brain area).
// Impulses travel strictly along these segments.
// ============================================================

const TRACES = [
  // Left hemisphere traces (will be purple)
  { points: [[-0.07, -0.04], [-0.03, -0.06], [0.0, -0.03]], side: "left" as const },
  { points: [[-0.06, 0.01], [-0.03, -0.01], [-0.01, 0.02]], side: "left" as const },
  { points: [[-0.05, -0.02], [-0.02, 0.03], [0.0, 0.0]], side: "left" as const },
  { points: [[-0.04, 0.04], [-0.01, 0.01], [-0.03, -0.03]], side: "left" as const },
  // Right hemisphere traces (will be gold)
  { points: [[0.0, -0.03], [0.03, -0.05], [0.07, -0.02]], side: "right" as const },
  { points: [[0.01, 0.02], [0.04, 0.0], [0.06, 0.03]], side: "right" as const },
  { points: [[0.0, 0.0], [0.03, 0.03], [0.05, -0.01]], side: "right" as const },
  { points: [[0.02, -0.01], [0.05, 0.02], [0.04, -0.04]], side: "right" as const },
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

    // CW glow spots - each assigned to a specific flower circle
    const cwGlows = [
      { circleIdx: 1, angle: 0, speed: 0.004, size: 12, color: [155, 89, 182] as [number, number, number], opacity: 0.6 },
      { circleIdx: 3, angle: Math.PI, speed: 0.0035, size: 10, color: [232, 121, 168] as [number, number, number], opacity: 0.5 },
      { circleIdx: 5, angle: Math.PI * 0.5, speed: 0.0045, size: 11, color: [99, 102, 241] as [number, number, number], opacity: 0.55 },
      { circleIdx: 0, angle: Math.PI * 1.2, speed: 0.003, size: 13, color: [155, 89, 182] as [number, number, number], opacity: 0.5 },
      { circleIdx: 2, angle: Math.PI * 0.7, speed: 0.0038, size: 9, color: [232, 121, 168] as [number, number, number], opacity: 0.45 },
      { circleIdx: 4, angle: Math.PI * 1.8, speed: 0.0032, size: 10, color: [99, 102, 241] as [number, number, number], opacity: 0.4 },
    ];

    // Outer ring CCW glow
    const outerGlows = [
      { angle: 0, speed: -0.0015, size: 14, color: [212, 168, 67] as [number, number, number], opacity: 0.5 },
      { angle: Math.PI, speed: -0.0012, size: 12, color: [240, 199, 94] as [number, number, number], opacity: 0.4 },
    ];

    // Impulse state for each trace
    const impulses = TRACES.map((_, i) => ({
      position: Math.random(), // 0-1 along trace
      speed: 0.12 + Math.random() * 0.06, // units per second, slower
      phase: i * 0.8,
    }));

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const cx = w / 2;
      const cy = h / 2;

      // Estimate displayed image size to match flower geometry
      const imageH = Math.min(h * 0.72, 650);
      const flowerDiameter = imageH * 0.6;
      const R = flowerDiameter / 4.3;
      const outerR = R * 2.15;

      const circles = buildFlowerCircles(R);

      // ── CW glows along flower circles ──
      for (const glow of cwGlows) {
        glow.angle += glow.speed;
        const circle = circles[glow.circleIdx];

        const x = cx + circle.cx + R * Math.cos(glow.angle);
        const y = cy + circle.cy + R * Math.sin(glow.angle);

        const flicker = 0.75 + Math.sin(time * 1.2 + glow.angle * 2) * 0.25;
        const alpha = glow.opacity * flicker;
        const [r, g, b] = glow.color;

        // Bright core
        const grad = ctx.createRadialGradient(x, y, 0, x, y, glow.size);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(x - glow.size, y - glow.size, glow.size * 2, glow.size * 2);

        // Soft halo
        const haloSize = glow.size * 3;
        const halo = ctx.createRadialGradient(x, y, 0, x, y, haloSize);
        halo.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.12})`);
        halo.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = halo;
        ctx.fillRect(x - haloSize, y - haloSize, haloSize * 2, haloSize * 2);
      }

      // ── CCW glows along outer ring ──
      for (const glow of outerGlows) {
        glow.angle += glow.speed;

        const x = cx + outerR * Math.cos(glow.angle);
        const y = cy + outerR * Math.sin(glow.angle);

        const flicker = 0.8 + Math.sin(time * 0.8 + glow.angle) * 0.2;
        const alpha = glow.opacity * flicker;
        const [r, g, b] = glow.color;

        // Core
        const grad = ctx.createRadialGradient(x, y, 0, x, y, glow.size);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(x - glow.size, y - glow.size, glow.size * 2, glow.size * 2);

        // Halo
        const haloSize = glow.size * 3.5;
        const halo = ctx.createRadialGradient(x, y, 0, x, y, haloSize);
        halo.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.1})`);
        halo.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = halo;
        ctx.fillRect(x - haloSize, y - haloSize, haloSize * 2, haloSize * 2);
      }

      // ── BRAIN NEURAL TRACES + IMPULSES ──
      const brainScale = R * 1.8; // brain area scale

      for (let ti = 0; ti < TRACES.length; ti++) {
        const trace = TRACES[ti];
        const imp = impulses[ti];
        const pts = trace.points;

        // Calculate total trace length
        let totalLen = 0;
        const segLens: number[] = [];
        for (let i = 0; i < pts.length - 1; i++) {
          const dx = (pts[i + 1][0] - pts[i][0]) * brainScale;
          const dy = (pts[i + 1][1] - pts[i][1]) * brainScale;
          const len = Math.sqrt(dx * dx + dy * dy);
          segLens.push(len);
          totalLen += len;
        }

        // Advance impulse position
        imp.position += (imp.speed * 0.016) / Math.max(totalLen / brainScale, 0.01);
        if (imp.position > 1) imp.position -= 1;

        // Draw trace lines (subtle)
        const isLeft = trace.side === "left";
        const lineColor = isLeft ? "rgba(160, 140, 240, 0.06)" : "rgba(220, 190, 100, 0.06)";

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        for (let i = 0; i < pts.length; i++) {
          const px = cx + pts[i][0] * brainScale;
          const py = cy + pts[i][1] * brainScale;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Find impulse position on trace
        let distAlongTrace = imp.position * totalLen;
        let impulseX = cx + pts[0][0] * brainScale;
        let impulseY = cy + pts[0][1] * brainScale;

        for (let i = 0; i < segLens.length; i++) {
          if (distAlongTrace <= segLens[i]) {
            const t = distAlongTrace / segLens[i];
            impulseX = cx + (pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t) * brainScale;
            impulseY = cy + (pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t) * brainScale;
            break;
          }
          distAlongTrace -= segLens[i];
        }

        // Check proximity to nodes for flash effect
        const [ir, ig, ib] = isLeft ? [180, 160, 255] : [240, 210, 120];
        let nearNode = false;
        let nearNodeX = 0;
        let nearNodeY = 0;
        for (let i = 0; i < pts.length; i++) {
          const nx = cx + pts[i][0] * brainScale;
          const ny = cy + pts[i][1] * brainScale;
          const dist = Math.sqrt((impulseX - nx) ** 2 + (impulseY - ny) ** 2);
          if (dist < 8) {
            nearNode = true;
            nearNodeX = nx;
            nearNodeY = ny;
            break;
          }
        }

        // Draw impulse dot - brighter when near a node
        const baseAlpha = nearNode ? 0.9 : 0.5;
        const impSize = nearNode ? 8 : 5;

        const impGrad = ctx.createRadialGradient(impulseX, impulseY, 0, impulseX, impulseY, impSize);
        impGrad.addColorStop(0, `rgba(255, 255, 255, ${baseAlpha})`);
        impGrad.addColorStop(0.3, `rgba(${ir},${ig},${ib},${baseAlpha * 0.7})`);
        impGrad.addColorStop(1, `rgba(${ir},${ig},${ib},0)`);
        ctx.fillStyle = impGrad;
        ctx.fillRect(impulseX - impSize, impulseY - impSize, impSize * 2, impSize * 2);

        // Flash burst when impulse hits a node
        if (nearNode) {
          const flashSize = 18;
          const flashGrad = ctx.createRadialGradient(nearNodeX, nearNodeY, 0, nearNodeX, nearNodeY, flashSize);
          flashGrad.addColorStop(0, `rgba(255, 255, 255, 0.4)`);
          flashGrad.addColorStop(0.2, `rgba(${ir},${ig},${ib},0.25)`);
          flashGrad.addColorStop(0.5, `rgba(${ir},${ig},${ib},0.08)`);
          flashGrad.addColorStop(1, `rgba(${ir},${ig},${ib},0)`);
          ctx.fillStyle = flashGrad;
          ctx.fillRect(nearNodeX - flashSize, nearNodeY - flashSize, flashSize * 2, flashSize * 2);
        }

        // Draw trace nodes
        for (let i = 0; i < pts.length; i++) {
          const nx = cx + pts[i][0] * brainScale;
          const ny = cy + pts[i][1] * brainScale;

          // Node glows brighter briefly when impulse just passed
          const distToImpulse = Math.sqrt((impulseX - nx) ** 2 + (impulseY - ny) ** 2);
          const recentlyHit = distToImpulse < 20;
          const nodePulse = recentlyHit
            ? 0.3 + (1 - distToImpulse / 20) * 0.4
            : 0.12 + Math.sin(time * 1.2 + i * 2 + imp.phase) * 0.06;
          const nodeSize = recentlyHit ? 4 : 2.5;

          const nodeGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nodeSize);
          nodeGrad.addColorStop(0, `rgba(${ir},${ig},${ib},${nodePulse})`);
          nodeGrad.addColorStop(1, `rgba(${ir},${ig},${ib},0)`);
          ctx.fillStyle = nodeGrad;
          ctx.fillRect(nx - nodeSize, ny - nodeSize, nodeSize * 2, nodeSize * 2);
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
