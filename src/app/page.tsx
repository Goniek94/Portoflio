'use client';

import React, { useState, useCallback, useEffect } from 'react';
import BootScreen    from '@/components/boot/BootScreen';
import WelcomeScreen from '@/components/boot/WelcomeScreen';
import GlitchOverlay from '@/components/Desktop/GlitchOverlay';
import DesktopXP     from '@/components/Desktop/desktop';   // ← poprawiony import
import Warning       from '@/components/Desktop/Warning';
import Folders       from '@/components/Desktop/Folders';

type AppPhase = 'boot' | 'welcome' | 'desktop' | 'glitch' | 'warning' | 'folders';

interface AppState {
  currentPhase: AppPhase;
  showPortfolioIcons: boolean;
  glitchCompleted: boolean;
  previousPhase: AppPhase | null;
  isTransitioning: boolean;
}

export default function Home() {
  const [state, setState] = useState<AppState>({
    currentPhase: 'boot',
    showPortfolioIcons: false,
    glitchCompleted: false,
    previousPhase: null,
    isTransitioning: false,
  });

  const [transitionAudio, setTransitionAudio] = useState<HTMLAudioElement | null>(null);

  /* ---------- smoothTransition ---------- */
  const smoothTransition = useCallback((nextPhase: AppPhase, withMusic = false) => {
    setState(prev => ({
      ...prev,
      previousPhase: prev.currentPhase,
      isTransitioning: withMusic ? false : true,
      currentPhase: nextPhase,
    }));

    if (withMusic) {
      setTimeout(() => {
        const possiblePaths = [
          '/sound/transition-music.mp3',
          '/sound/transition.mp3',
          '/sound/desktop-transition.mp3',
          '/sound/welcome-to-desktop.mp3',
        ];

        const tryLoadTransitionAudio = async () => {
          for (const path of possiblePaths) {
            try {
              const audio = new Audio(path);
              audio.volume = 0.6;

              await new Promise((res, rej) => {
                audio.addEventListener('canplaythrough', res, { once: true });
                audio.addEventListener('error', rej, { once: true });
                audio.load();
              });

              setTransitionAudio(audio);
              audio.play().catch(() => {});
              break;
            } catch {
              /* próbuj kolejny plik */
            }
          }
        };

        tryLoadTransitionAudio();
      }, 1500);
    }

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isTransitioning: false,
        previousPhase: null,
      }));
    }, withMusic ? 5500 : 1000);
  }, []);

  /* ---------- phase handlers ---------- */
  const handleBootFinish     = useCallback(() => smoothTransition('welcome'), [smoothTransition]);
  const handleWelcomeFinish  = useCallback(() => {
    setState(prev => ({ ...prev, currentPhase: 'desktop', isTransitioning: false, previousPhase: null }));

    const possiblePaths = [
      '/sound/Microsoft Windows XP Startup Sound....mp3',
      '/sound/Microsoft Windows XP Startup Sound.mp3',
      '/sound/windows-startup.mp3',
      '/sound/startup.mp3',
    ];

    (async () => {
      for (const path of possiblePaths) {
        try {
          const audio = new Audio(path);
          audio.volume = 0.7;

          await new Promise((res, rej) => {
            audio.addEventListener('canplaythrough', res, { once: true });
            audio.addEventListener('error', rej, { once: true });
            audio.load();
          });

          setTransitionAudio(audio);
          audio.play().catch(() => {});
          break;
        } catch {
          /* kolejny plik */
        }
      }
    })();
  }, []);

  const handleGlitchTrigger  = useCallback(() => {
    if (!state.glitchCompleted) {
      setState(prev => ({ ...prev, currentPhase: 'glitch', isTransitioning: false, previousPhase: null }));
    }
  }, [state.glitchCompleted]);

  const handleGlitchFinish   = useCallback(() => {
    setState(prev => ({ ...prev, currentPhase: 'warning', isTransitioning: false, previousPhase: null }));
  }, []);

  const handleWarningFinish  = useCallback(() => {
    setState(prev => ({ ...prev, currentPhase: 'folders', isTransitioning: false, previousPhase: null }));
  }, []);

  const handleFoldersFinish  = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentPhase: 'desktop',
      showPortfolioIcons: true,
      glitchCompleted: true,
      isTransitioning: false,
      previousPhase: null,
    }));
  }, []);

  /* ---------- cleanup ---------- */
  useEffect(() => () => {
    transitionAudio?.pause();
  }, [transitionAudio]);

  /* ---------- render ---------- */
  return (
    <div className="w-full h-screen overflow-hidden relative">
      {state.isTransitioning && state.previousPhase && (
        <div className="absolute inset-0 transition-opacity duration-1000 opacity-0 z-10">
          {state.previousPhase === 'boot'     && <BootScreen    onFinish={() => {}} />}
          {state.previousPhase === 'welcome'  && <WelcomeScreen onFinish={() => {}} />}
          {state.previousPhase === 'desktop'  && <DesktopXP showAdditionalIcons={state.showPortfolioIcons} onGlitchTrigger={() => {}} />}
        </div>
      )}

      <div className="absolute inset-0 transition-opacity duration-1000 opacity-100 z-20">
        {state.currentPhase === 'boot'     && <BootScreen    onFinish={handleBootFinish} />}
        {state.currentPhase === 'welcome'  && <WelcomeScreen onFinish={handleWelcomeFinish} />}
        {state.currentPhase === 'desktop'  && <DesktopXP showAdditionalIcons={state.showPortfolioIcons} onGlitchTrigger={handleGlitchTrigger} />}
      </div>

      {state.currentPhase === 'glitch'  && <div className="absolute inset-0 z-40"><GlitchOverlay onFinish={handleGlitchFinish} /></div>}
      {state.currentPhase === 'warning' && <div className="absolute inset-0 z-40"><Warning       onFinish={handleWarningFinish} /></div>}
      {state.currentPhase === 'folders' && <div className="absolute inset-0 z-40"><Folders       onFinish={handleFoldersFinish} /></div>}
    </div>
  );
}
