'use client';

import React, { useEffect, useRef, useState } from 'react';

interface WarningProps {
  onFinish: () => void;
}

/* ścieżki do pliku MP3 (pierwszy istniejący zostanie odtworzony) */
const FILES = [
  '/sound/CrazyFrog.mp3',
  '/sound/Crazy Frog - Axel F (Official Video) (mp3cut.net).mp3',
];

export default function Warning({ onFinish }: WarningProps) {
  const audioRef   = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ↓↓↓  POPRAWIONE: inicjalna wartość „null” ↓↓↓ */
  const unlockRef  = useRef<(() => void) | null>(null);

  const [playing, setPlaying] = useState(false);

  /* ---------- init ---------- */
  useEffect(() => {
    let mounted = true;

    const loadAndPlay = async () => {
      for (const src of FILES) {
        try {
          const a = new Audio(src);
          a.volume = 0.5;

          /* czekamy na metadane, by poznać length utworu */
          await new Promise<void>((resolve, reject) => {
            a.addEventListener('loadedmetadata', () => resolve(), { once: true });
            a.addEventListener('error',          () => reject(),  { once: true });
            a.load();
          });

          if (!mounted) return;

          audioRef.current = a;

          /* funkcja próbująca odtwarzać (przechowywana w ref → potrzebna do removeEventListener) */
          const tryPlay = () =>
            a.play()
              .then(() => {
                setPlaying(true);
                /* ustaw timeout na koniec ostrzeżenia dopiero,
                   gdy audio faktycznie wystartuje */
                if (!timeoutRef.current) {
                  timeoutRef.current = setTimeout(onFinish, a.duration * 1000);
                }
              })
              .catch(() => { /* autoplay jeszcze zablokowany */ });

          unlockRef.current = tryPlay;

          /* pierwsza próba natychmiast */
          tryPlay();

          /* kolejne próby po geście użytkownika */
          ['click', 'pointerdown', 'keydown'].forEach(evt =>
            document.addEventListener(evt, tryPlay)
          );

          break; // sukces – nie szukamy kolejnych plików
        } catch {
          /* spróbuj następny plik */
        }
      }
    };

    loadAndPlay();

    /* ---------- cleanup ---------- */
    return () => {
      mounted = false;

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      /* usuń listener tylko jeśli był podpięty */
      if (unlockRef.current) {
        ['click', 'pointerdown', 'keydown'].forEach(evt =>
          document.removeEventListener(evt, unlockRef.current as () => void)
        );
        unlockRef.current = null;
      }
    };
  }, [onFinish]);

  /* ---------- render ---------- */
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-center p-4 z-50">
      <div className="text-red-500 text-4xl font-bold mb-6 animate-pulse">
        UWAGA / WARNING!
      </div>

      <div className="text-white text-3xl font-bold mb-4">
        Zostałeś zainfekowany&nbsp;wirusem&nbsp;lat&nbsp;2000
      </div>
      <div className="text-white text-3xl font-bold mb-8">
        You have been infected with the crazy&nbsp;2000s&nbsp;virus
      </div>

      <div className="text-yellow-300 text-xl mb-8">
        Przygotuj się na podróż w czasie…<br />
        Prepare for a journey through time…
      </div>

      <div className="mt-8 text-green-400 text-lg animate-bounce">
        ♪ Ring ding ding daa baa {playing ? '🐸' : ''} baa aramba baa bom&nbsp;baa&nbsp;barooumba ♪
      </div>

      {/* lokalne animacje */}
      <style jsx>{`
        @keyframes pulse {
          0%   { opacity: 1; }
          50%  { opacity: 0.4; }
          100% { opacity: 1; }
        }
        .animate-pulse { animation: pulse 1.2s infinite; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .animate-bounce { animation: bounce 1s infinite; }
      `}</style>
    </div>
  );
}
