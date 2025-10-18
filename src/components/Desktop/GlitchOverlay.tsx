'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface GlitchOverlayProps {
  onFinish: () => void;
}

export default function GlitchOverlay({ onFinish }: GlitchOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef<HTMLCanvasElement>(null);

  const handleFinish = useCallback(() => {
    if (!isVisible) return;
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, 600);
  }, [isVisible, onFinish]);

  // Matrix Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01█▓▒░ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let animationId: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Rainbow glitch colors
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ffff00'];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.shadowBlur = 20;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Static Noise Effect
  useEffect(() => {
    const canvas = noiseRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        if (Math.random() > 0.5) {
          buffer[i] = 0xffffffff;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(drawNoise);
    };

    drawNoise();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Glitch intensity animation
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchIntensity(Math.random());
    }, 50);

    const finishTimer = setTimeout(() => {
      handleFinish();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimer);
    };
  }, [handleFinish]);

  // Keyboard handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleFinish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleFinish]);

  if (!isVisible) return null;

  const errorMessages = [
    'CRITICAL SYSTEM FAILURE',
    'MEMORY CORRUPTION DETECTED',
    'KERNEL PANIC',
    'FATAL EXCEPTION 0xDEADBEEF',
    'STACK OVERFLOW',
    'SEGMENTATION FAULT',
    'ACCESS VIOLATION',
    'BUFFER OVERRUN',
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black overflow-hidden"
      style={{
        animation: isFadingOut
          ? 'glitchFadeOut 0.6s ease-out forwards'
          : 'glitchFadeIn 0.3s ease-in, screenShakeExtreme 0.1s infinite 0.3s',
      }}
    >
      {/* Matrix Rain Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7, mixBlendMode: 'screen' }}
      />

      {/* Static Noise Layer */}
      <canvas
        ref={noiseRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.15, mixBlendMode: 'overlay' }}
      />

      {/* RGB Split Effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, transparent 0%, rgba(255,0,0,0.2) 100%)',
          mixBlendMode: 'screen',
          transform: `translate(${glitchIntensity * 10}px, 0)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, transparent 0%, rgba(0,255,0,0.2) 100%)',
          mixBlendMode: 'screen',
          transform: `translate(${-glitchIntensity * 10}px, 0)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, transparent 0%, rgba(0,0,255,0.2) 100%)',
          mixBlendMode: 'screen',
          transform: `translate(0, ${glitchIntensity * 10}px)`,
        }}
      />

      {/* Pixelation Blocks */}
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
              background: ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff'][
                Math.floor(Math.random() * 5)
              ],
              opacity: Math.random() * 0.5,
              mixBlendMode: 'screen',
              animation: `glitchBlock ${0.1 + Math.random() * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Scan Lines */}
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

      {/* Error Messages */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center space-y-4 px-4">
          {errorMessages.map((msg, i) => (
            <div
              key={i}
              className="font-mono font-bold"
              style={{
                fontSize: `${20 + Math.random() * 20}px`,
                color: ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ffff00'][
                  Math.floor(Math.random() * 6)
                ],
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

      {/* Horizontal Glitch Bars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`bar-${i}`}
          className="absolute w-full"
          style={{
            height: `${5 + Math.random() * 30}px`,
            top: `${(i * 5) % 100}%`,
            background: `linear-gradient(90deg, 
              rgba(255,0,0,${0.3 + Math.random() * 0.5}), 
              rgba(0,255,0,${0.3 + Math.random() * 0.5}), 
              rgba(0,0,255,${0.3 + Math.random() * 0.5}))`,
            mixBlendMode: 'screen',
            transform: `translateX(${(Math.random() - 0.5) * 200}px)`,
            animation: `slideGlitch ${0.1 + Math.random() * 0.2}s infinite`,
          }}
        />
      ))}

      {/* Skip button */}
      <button
        onClick={handleFinish}
        className="absolute top-4 right-4 text-red-500 hover:text-red-300 transition-colors bg-black/90 px-4 py-2 rounded font-mono font-bold border-2 border-red-500 z-50"
        style={{
          textShadow: '0 0 10px #ff0000',
          animation: 'pulse 1s infinite',
        }}
      >
        [ESC] SKIP
      </button>

      <style jsx>{`
        @keyframes glitchFadeIn {
          0% {
            opacity: 0;
            transform: scale(1.5) rotate(10deg);
            filter: blur(20px) brightness(3);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8) rotate(-5deg);
            filter: blur(10px) brightness(2);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0px) brightness(1);
          }
        }

        @keyframes glitchFadeOut {
          0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0px) brightness(1);
          }
          30% {
            opacity: 0.7;
            transform: scale(1.1) rotate(5deg);
            filter: blur(5px) brightness(1.5);
          }
          60% {
            opacity: 0.3;
            transform: scale(0.9) rotate(-10deg);
            filter: blur(15px) brightness(0.5);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) rotate(20deg);
            filter: blur(30px) brightness(0);
          }
        }

        @keyframes screenShakeExtreme {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          10% {
            transform: translate(-8px, -5px) rotate(-2deg);
          }
          20% {
            transform: translate(-10px, 0px) rotate(2deg);
          }
          30% {
            transform: translate(8px, 5px) rotate(0deg);
          }
          40% {
            transform: translate(5px, -8px) rotate(2deg);
          }
          50% {
            transform: translate(-5px, 10px) rotate(-2deg);
          }
          60% {
            transform: translate(-10px, 5px) rotate(0deg);
          }
          70% {
            transform: translate(10px, 5px) rotate(-2deg);
          }
          80% {
            transform: translate(-5px, -5px) rotate(2deg);
          }
          90% {
            transform: translate(5px, 8px) rotate(0deg);
          }
          100% {
            transform: translate(5px, -10px) rotate(-2deg);
          }
        }

        @keyframes glitchBlock {
          0% {
            transform: translate(0, 0);
            opacity: 0.8;
          }
          50% {
            transform: translate(-10px, 10px);
            opacity: 0.2;
          }
          100% {
            transform: translate(10px, -10px);
            opacity: 0.8;
          }
        }

        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }

        @keyframes textGlitch {
          0% {
            clip-path: inset(0 0 0 0);
          }
          20% {
            clip-path: inset(20% 0 60% 0);
          }
          40% {
            clip-path: inset(60% 0 20% 0);
          }
          60% {
            clip-path: inset(40% 0 40% 0);
          }
          80% {
            clip-path: inset(80% 0 10% 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes megaGlitch {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          10% {
            transform: translate(-10px, -10px) scale(1.05);
          }
          20% {
            transform: translate(-15px, 0px) scale(0.95);
          }
          30% {
            transform: translate(15px, 10px) scale(1.1);
          }
          40% {
            transform: translate(5px, -15px) scale(0.9);
          }
          50% {
            transform: translate(-5px, 15px) scale(1.05);
          }
          60% {
            transform: translate(-15px, 5px) scale(0.95);
          }
          70% {
            transform: translate(15px, 5px) scale(1.1);
          }
          80% {
            transform: translate(-5px, -5px) scale(0.9);
          }
          90% {
            transform: translate(5px, 10px) scale(1.05);
          }
        }

        @keyframes slideGlitch {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
