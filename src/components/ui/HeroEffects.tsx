"use client";

import { useEffect, useRef } from "react";

// Synapse flash - brief bright spark at a point within the brain
interface Synapse {
  x: number; // relative to brain center (-1 to 1)
  y: number;
  life: number; // 0 to 1, fades out
  maxLife: number;
  size: number;
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

    // CW inner orbit glows (purple/pink)
    const cwGlows = [
      { angle: 0, speed: 0.0018 },
      { angle: Math.PI * 0.5, speed: 0.0018 },
      { angle: Math.PI, speed: 0.0018 },
      { angle: Math.PI * 1.5, speed: 0.0018 },
    ];

    // CCW outer orbit glows (gold)
    const ccwGlows = [
      { angle: 0, speed: -0.0012 },
      { angle: Math.PI * 0.67, speed: -0.0012 },
      { angle: Math.PI * 1.33, speed: -0.0012 },
    ];

    // Active synapses
    const synapses: Synapse[] = [];
    let nextSynapseTime = 0;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const cx = w / 2;
      const cy = h / 2;

      const imageH = Math.min(h * 0.72, 650);
      const R = imageH * 0.155;
      const innerOrbitR = R * 1.25;
      const outerOrbitR = R * 2.2;
      const brainR = R * 0.55; // brain radius for synapse area

      // ── CW GLOWS - inner orbit (purple/pink) ──
      for (const glow of cwGlows) {
        glow.angle += glow.speed;
        const x = cx + innerOrbitR * Math.cos(glow.angle);
        const y = cy + innerOrbitR * Math.sin(glow.angle);

        const flicker = 0.8 + Math.sin(time * 0.9 + glow.angle * 3) * 0.2;

        const size = 10;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
        grad.addColorStop(0, `rgba(155,89,182,${0.5 * flicker})`);
        grad.addColorStop(0.4, `rgba(232,121,168,${0.25 * flicker})`);
        grad.addColorStop(1, "rgba(155,89,182,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(x - size, y - size, size * 2, size * 2);

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

      // ── BRAIN: BREATHING GLOW ──
      // Soft pulsing light inside the brain area
      const breathe = 0.04 + Math.sin(time * 0.5) * 0.025;
      const brainGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, brainR * 1.8);
      brainGlow.addColorStop(0, `rgba(200,210,240,${breathe})`);
      brainGlow.addColorStop(0.5, `rgba(180,190,220,${breathe * 0.4})`);
      brainGlow.addColorStop(1, "rgba(180,190,220,0)");
      ctx.fillStyle = brainGlow;
      ctx.fillRect(cx - brainR * 2, cy - brainR * 2, brainR * 4, brainR * 4);

      // ── BRAIN: SYNAPSE FLASHES ──
      // Spawn new synapse every 0.4-0.8 seconds
      if (time > nextSynapseTime) {
        // Random position within brain ellipse
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 0.85; // 0-85% of brain radius
        const sx = Math.cos(angle) * dist * 1.3; // wider horizontally (brain shape)
        const sy = Math.sin(angle) * dist * 0.9; // narrower vertically

        synapses.push({
          x: sx,
          y: sy,
          life: 1,
          maxLife: 0.4 + Math.random() * 0.3, // 0.4-0.7 sec lifetime
          size: 3 + Math.random() * 5,
        });

        nextSynapseTime = time + 0.3 + Math.random() * 0.5;
      }

      // Update and draw synapses
      for (let i = synapses.length - 1; i >= 0; i--) {
        const s = synapses[i];
        s.life -= 0.016 / s.maxLife;

        if (s.life <= 0) {
          synapses.splice(i, 1);
          continue;
        }

        const sx = cx + s.x * brainR;
        const sy = cy + s.y * brainR;

        // Sharp flash in, smooth fade out
        const intensity = s.life > 0.7
          ? (1 - s.life) / 0.3 // quick ramp up in first 30%
          : s.life / 0.7; // slow fade over remaining 70%
        const alpha = intensity * 0.6;

        // White core
        const sGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.size);
        sGrad.addColorStop(0, `rgba(255,255,255,${alpha})`);
        sGrad.addColorStop(0.3, `rgba(210,220,245,${alpha * 0.5})`);
        sGrad.addColorStop(1, "rgba(200,210,240,0)");
        ctx.fillStyle = sGrad;
        ctx.fillRect(sx - s.size, sy - s.size, s.size * 2, s.size * 2);

        // Wider soft glow
        if (s.size > 5) {
          const gs = s.size * 2.5;
          const gGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, gs);
          gGrad.addColorStop(0, `rgba(200,210,240,${alpha * 0.1})`);
          gGrad.addColorStop(1, "rgba(200,210,240,0)");
          ctx.fillStyle = gGrad;
          ctx.fillRect(sx - gs, sy - gs, gs * 2, gs * 2);
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
