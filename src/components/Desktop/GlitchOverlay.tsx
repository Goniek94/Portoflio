'use client';
import React, { useEffect, useRef, useState } from 'react';

// Definiujemy interfejs dla propsów
interface GlitchOverlayProps {
  onFinish: () => void;
}

/* ----------  generator linii glitcha ---------- */
function makeLines() {
  const arr: Array<{ top: string; height: string; skew: string }> = [];
  const n = Math.floor(Math.random() * 10) + 15; // 15-25
  for (let i = 0; i < n; i++) {
    arr.push({
      top: `${Math.random() * 100}%`,
      height: `${Math.random() * 10 + 2}px`,
      skew: `skew(${Math.random() * 20 - 10}deg)`
    });
  }
  return arr;
}

/* ----------  KOMPONENT GLITCH OVERLAY  ---------- */
export default function GlitchOverlay({ onFinish }: GlitchOverlayProps) {
  const [lines, setLines] = useState(makeLines);
  const [isVisible, setIsVisible] = useState(true);
  const raf = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* animujemy paski co klatkę */
  useEffect(() => {
    const animate = () => {
      setLines(makeLines());
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    
    // Automatycznie kończymy po 3 sekundach
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 300); // Dajemy czas na fade out
    }, 3000);
    
    return () => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onFinish]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 overflow-hidden">
        {/* centralny napis */}
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div
            className="text-green-500 text-4xl font-bold animate-[shake_0.1s_infinite]"
            style={{ textShadow: '3px 0 #00ff00, -3px 0 #00ff00' }}
          >
            SYSTEM&nbsp;CORRUPTED
          </div>
        </div>

        {/* zielone paski */}
        {lines.map((l, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 bg-green-500"
            style={{
              top: l.top,
              height: l.height,
              transform: l.skew,
              opacity: Math.random() * 0.7 + 0.3,
              boxShadow: '0 0 8px #00ff00'
            }}
          />
        ))}

        {/* matrix-like tło */}
        <div className="absolute inset-0 matrix-background pointer-events-none" />

        {/* przycisk do ręcznego zakończenia */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onFinish, 300);
          }}
          className="absolute top-4 right-4 text-green-500 hover:text-green-300 transition-colors z-10"
        >
          [ESC]
        </button>

        {/* lokalne style animacji */}
        <style jsx>{`
          @keyframes shake {
            0% { transform: translate(0) rotate(0deg); }
            25% { transform: translate(4px, 4px) rotate(1deg); }
            50% { transform: translate(-4px, -4px) rotate(-1deg); }
            75% { transform: translate(-4px, 4px) rotate(1deg); }
            100% { transform: translate(4px, -4px) rotate(-1deg); }
          }
          @keyframes matrixRain {
            0%   { background-position: 0% 0%; }
            100% { background-position: 0% 100%; }
          }
          .matrix-background {
            opacity: 0.3;
            background: linear-gradient(
              0deg,
              rgba(0,255,0,0.2) 25%,
              rgba(0,255,0,0.1) 50%,
              rgba(0,255,0,0.05) 75%,
              transparent
            );
            background-size: 100% 400%;
            animation: matrixRain 10s linear infinite;
            mix-blend-mode: screen;
          }
        `}</style>
      </div>
    </div>
  );
}