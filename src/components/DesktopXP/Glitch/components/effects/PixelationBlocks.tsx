'use client';

import { GLITCH_COLORS } from '../../constants/glitchConfig';

export default function PixelationBlocks() {
  return (
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => (
        <div
          key={`pixel-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${50 + Math.random() * 200}px`,
            height: `${20 + Math.random() * 100}px`,
            background: GLITCH_COLORS[Math.floor(Math.random() * GLITCH_COLORS.length)],
            opacity: Math.random() * 0.5,
            mixBlendMode: 'screen',
            animation: `glitchBlock ${0.1 + Math.random() * 0.3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
