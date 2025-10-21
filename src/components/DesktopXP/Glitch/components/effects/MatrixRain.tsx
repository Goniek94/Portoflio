'use client';

import { useEffect, useRef } from 'react';
import { MATRIX_CHARS, CANVAS_CONFIG, GLITCH_COLORS } from '../../constants/glitchConfig';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = CANVAS_CONFIG.FONT_SIZE;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let animationId: number;
    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${CANVAS_CONFIG.MATRIX_FADE_ALPHA})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Rainbow glitch colors
        ctx.fillStyle = GLITCH_COLORS[Math.floor(Math.random() * GLITCH_COLORS.length)];
        ctx.shadowBlur = CANVAS_CONFIG.SHADOW_BLUR;
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

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7, mixBlendMode: 'screen' }}
    />
  );
}
