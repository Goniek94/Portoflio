'use client';

export default function HorizontalGlitchBars() {
  return (
    <>
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
    </>
  );
}
