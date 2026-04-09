"use client";

export function GradientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #9B59B6 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #6366F1 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-2/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #D4A843 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
