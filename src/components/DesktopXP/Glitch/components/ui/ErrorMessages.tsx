'use client';

import { ERROR_MESSAGES, GLITCH_COLORS } from '../../constants/glitchConfig';

export default function ErrorMessages() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="text-center space-y-4 px-4">
        {ERROR_MESSAGES.map((msg, i) => (
          <div
            key={i}
            className="font-mono font-bold"
            style={{
              fontSize: `${20 + Math.random() * 20}px`,
              color: GLITCH_COLORS[Math.floor(Math.random() * GLITCH_COLORS.length)],
              textShadow: `0 0 20px currentColor, 0 0 40px currentColor`,
              opacity: Math.random() > 0.3 ? 1 : 0,
              transform: `
                translateX(${(Math.random() - 0.5) * 50}px) 
                translateY(${(Math.random() - 0.5) * 20}px)
                rotate(${(Math.random() - 0.5) * 5}deg)
                scale(${0.8 + Math.random() * 0.4})
              `,
              animation: `textGlitch ${0.05 + Math.random() * 0.1}s infinite`,
            }}
          >
            {msg}
          </div>
        ))}

        {/* Main System Error */}
        <div
          className="text-6xl md:text-9xl font-black mt-12"
          style={{
            color: '#ff0000',
            textShadow: `
              0 0 20px #ff0000,
              0 0 40px #ff0000,
              5px 0 0 #00ff00,
              -5px 0 0 #0000ff,
              0 5px 0 #ff00ff
            `,
            animation: 'megaGlitch 0.08s infinite',
          }}
        >
          ⚠ SYSTEM ERROR ⚠
        </div>

        <div
          className="text-3xl md:text-5xl font-bold mt-8"
          style={{
            color: '#00ff00',
            textShadow: '0 0 30px #00ff00',
            animation: 'pulse 0.5s infinite',
          }}
        >
          CRITICAL MALFUNCTION
        </div>
      </div>
    </div>
  );
}
