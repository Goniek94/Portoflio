'use client';

import React, { useEffect, useRef, useState } from 'react';

interface WarningProps {
  onFinish: () => void;
}

const AUDIO_FILES = [
  '/sound/CrazyFrog.mp3',
  '/sound/Crazy Frog - Axel F (Official Video) (mp3cut.net).mp3',
];

export default function Warning({ onFinish }: WarningProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlockRef = useRef<(() => void) | null>(null);
  const [playing, setPlaying] = useState(false);

  /* ---------- Audio init ---------- */
  useEffect(() => {
    let mounted = true;

    const loadAndPlay = async () => {
      for (const src of AUDIO_FILES) {
        try {
          const a = new Audio(src);
          a.volume = 0.5;
          a.loop = true;

          await new Promise<void>((resolve, reject) => {
            a.addEventListener('loadedmetadata', () => resolve(), { once: true });
            a.addEventListener('error', () => reject(), { once: true });
            a.load();
          });

          if (!mounted) return;

          audioRef.current = a;

          const tryPlay = () =>
            a
              .play()
              .then(() => {
                setPlaying(true);
              })
              .catch(() => {
                /* autoplay blocked */
              });

          unlockRef.current = tryPlay;
          tryPlay();

          ['click', 'pointerdown', 'keydown'].forEach((evt) =>
            document.addEventListener(evt, tryPlay)
          );

          break;
        } catch {
          /* try next file */
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

      if (unlockRef.current) {
        ['click', 'pointerdown', 'keydown'].forEach((evt) =>
          document.removeEventListener(evt, unlockRef.current as () => void)
        );
        unlockRef.current = null;
      }
    };
  }, []);

  /* ---------- render ---------- */
  return (
    <div
      className="fixed inset-0 flex flex-col justify-center px-8 md:px-12 z-50"
      style={{
        background: '#0000AA',
        fontFamily: '"Lucida Console", "Courier New", monospace',
        color: '#FFFFFF',
      }}
    >
      {/* BSOD Content */}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-base md:text-lg font-bold mb-6">
          A problem has been detected and Windows has been shut down to prevent damage to your
          computer.
        </div>

        {/* Error Name */}
        <div className="text-lg md:text-xl mb-6 font-bold">CRAZY_FROG_VIRUS_2000</div>

        {/* Instructions */}
        <div className="text-xs md:text-sm mb-4">
          If this is the first time you&apos;ve seen this Stop error screen, restart your computer.
          If this screen appears again, follow these steps:
        </div>

        <div className="text-xs md:text-sm mb-6">
          Check to make sure any new hardware or software is properly installed. If this is a new
          installation, ask your hardware or software manufacturer for any Windows updates you might
          need.
        </div>

        <div className="text-xs md:text-sm mb-6">
          If problems continue, disable or remove any newly installed hardware or software. Disable
          BIOS memory options such as caching or shadowing. If you need to use Safe Mode to remove
          or disable components, restart your computer, press F8 to select Advanced Startup Options,
          and then select Safe Mode.
        </div>

        {/* Technical Info */}
        <div className="text-xs md:text-sm mb-8 font-mono">
          Technical information:
          <br />
          <br />
          *** STOP: 0x0000007B (0xF78D2524, 0xC0000034, 0x00000000, 0x00000000)
        </div>

        {/* Crazy Frog Warning Box */}
        <div className="bg-white text-black p-4 md:p-6 mb-8 border-2 border-gray-400">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold mb-4 text-red-600">
              🐸 ZOSTAŁEŚ ZAINFEKOWANY WIRUSEM CRAZY FROG Z LAT 2000! 🐸
            </div>

            {playing && (
              <div className="text-base md:text-lg mb-4 text-green-600 font-bold animate-bounce">
                ♪ Ring ding ding daa baa baa aramba baa bom baa barooumba ♪
              </div>
            )}

            <div className="text-sm md:text-base mb-2">
              You have been infected with the Crazy Frog virus from the year 2000!
            </div>

            <div className="text-base md:text-lg font-bold text-blue-600">
              Aby odzyskać system, sprawdź moje CV i portfolio!
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={onFinish}
            className="bg-gray-300 text-black px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-bold border-2 border-gray-500 hover:bg-gray-400 transition-colors shadow-lg"
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            [NACIŚNIJ DOWOLNY KLAWISZ ABY KONTYNUOWAĆ]
          </button>
        </div>
      </div>

      {/* Scanlines Effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.1) 2px,
            rgba(255, 255, 255, 0.1) 4px
          )`,
        }}
      />

      {/* Local Animations */}
      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
}
