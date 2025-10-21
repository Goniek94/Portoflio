'use client';

interface RGBSplitEffectProps {
  glitchIntensity: number;
}

export default function RGBSplitEffect({ glitchIntensity }: RGBSplitEffectProps) {
  return (
    <>
      {/* Red Channel */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, transparent 0%, rgba(255,0,0,0.2) 100%)',
          mixBlendMode: 'screen',
          transform: `translate(${glitchIntensity * 10}px, 0)`,
        }}
      />
      {/* Green Channel */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, transparent 0%, rgba(0,255,0,0.2) 100%)',
          mixBlendMode: 'screen',
          transform: `translate(${-glitchIntensity * 10}px, 0)`,
        }}
      />
      {/* Blue Channel */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, transparent 0%, rgba(0,0,255,0.2) 100%)',
          mixBlendMode: 'screen',
          transform: `translate(0, ${glitchIntensity * 10}px)`,
        }}
      />
    </>
  );
}
