'use client';

export default function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(255,255,255,0.1) 2px,
          rgba(255,255,255,0.1) 4px
        )`,
        animation: 'scanlines 0.1s linear infinite',
      }}
    />
  );
}
