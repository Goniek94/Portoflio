'use client';

interface SkipButtonProps {
  onClick: () => void;
}

export default function SkipButton({ onClick }: SkipButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 text-red-500 hover:text-red-300 transition-colors bg-black/90 px-4 py-2 rounded font-mono font-bold border-2 border-red-500 z-50"
      style={{
        textShadow: '0 0 10px #ff0000',
        animation: 'pulse 1s infinite',
      }}
    >
      [ESC] SKIP
    </button>
  );
}
