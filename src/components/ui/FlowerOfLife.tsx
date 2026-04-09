"use client";

export function FlowerOfLife({
  className = "",
  opacity = 0.04,
  size = 600,
  color = "#9B59B6",
}: {
  className?: string;
  opacity?: number;
  size?: number;
  color?: string;
}) {
  const r = size / 6;
  const cx = size / 2;
  const cy = size / 2;

  // Generate circles for Flower of Life pattern
  const circles: { x: number; y: number }[] = [{ x: cx, y: cy }];

  // First ring (6 circles)
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 * Math.PI) / 180;
    circles.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    });
  }

  // Second ring (6 circles)
  for (let i = 0; i < 6; i++) {
    const angle = ((i * 60 + 30) * Math.PI) / 180;
    circles.push({
      x: cx + r * 1.732 * Math.cos(angle),
      y: cy + r * 1.732 * Math.sin(angle),
    });
  }

  // Third ring (6 more)
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 * Math.PI) / 180;
    circles.push({
      x: cx + r * 2 * Math.cos(angle),
      y: cy + r * 2 * Math.sin(angle),
    });
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ opacity }}
    >
      {circles.map((c, i) => (
        <circle
          key={i}
          cx={c.x}
          cy={c.y}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={0.5}
        />
      ))}
    </svg>
  );
}
