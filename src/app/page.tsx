'use client';

import React, { useState, useCallback, useEffect } from 'react';
import BootScreen from '@/components/boot/BootScreen';
import WelcomeScreen from '@/components/boot/WelcomeScreen';
import GlitchOverlay from '@/components/desktop/GlitchOverlay';
import DesktopXP from '@/components/desktop/desktop';
import Warning from '@/components/desktop/Warning';
import Folders from '@/components/desktop/Folders';

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

  /* ---------- phase handlers ---------- */
  const handleBootFinish = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentPhase: 'welcome',
      isTransitioning: false,
      previousPhase: null,
    }));
  }, []);

  const handleWelcomeFinish = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentPhase: 'desktop',
      isTransitioning: false,
      previousPhase: null,
    }));

    const possiblePaths = [
      '/sound/Microsoft Windows XP Startup Sound.mp3',
      '/audio/Microsoft Windows XP Startup Sound.mp3',
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

  const handleGlitchTrigger = useCallback(() => {
    if (!state.glitchCompleted) {
      setState((prev) => ({
        ...prev,
        currentPhase: 'glitch',
        isTransitioning: false,
        previousPhase: null,
      }));
    }
  }, [state.glitchCompleted]);

  const handleGlitchFinish = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentPhase: 'warning',
      isTransitioning: false,
      previousPhase: null,
    }));
  }, []);

  const handleWarningFinish = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentPhase: 'folders',
      isTransitioning: false,
      previousPhase: null,
    }));
  }, []);

  const handleFoldersFinish = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentPhase: 'desktop',
      showPortfolioIcons: true,
      glitchCompleted: true,
      isTransitioning: false,
      previousPhase: null,
    }));
  }, []);

  /* ---------- cleanup ---------- */
  useEffect(
    () => () => {
      transitionAudio?.pause();
    },
    [transitionAudio]
  );

  /* ---------- render ---------- */
  return (
    <div className="w-full h-screen overflow-hidden relative bg-black">
      {/* Zawsze renderuj wszystkie fazy, kontroluj tylko opacity */}
      {/* BootScreen - renderuj tylko gdy currentPhase = 'boot' (bez previousPhase!) */}
      {state.currentPhase === 'boot' && (
        <div
          className="absolute inset-0"
          style={{
            zIndex: 30,
            pointerEvents: 'auto',
          }}
        >
          <BootScreen onFinish={handleBootFinish} />
        </div>
      )}

      {/* WelcomeScreen - renderuj tylko gdy potrzebny */}
      {state.currentPhase === 'welcome' && (
        <div
          className="absolute inset-0"
          style={{
            zIndex: 30,
            pointerEvents: 'auto',
          }}
        >
          <WelcomeScreen onFinish={handleWelcomeFinish} />
        </div>
      )}

      {/* Desktop - renderuj tylko gdy faktycznie potrzebny (unikamy startowania timera za wcześnie) */}
      {state.currentPhase === 'desktop' && (
        <div
          className="absolute inset-0"
          style={{
            zIndex: 30,
          }}
        >
          <DesktopXP
            showAdditionalIcons={state.showPortfolioIcons}
            onGlitchTrigger={handleGlitchTrigger}
          />
        </div>
      )}

      {state.currentPhase === 'glitch' && (
        <div className="absolute inset-0 z-40">
          <GlitchOverlay onFinish={handleGlitchFinish} />
        </div>
      )}
      {state.currentPhase === 'warning' && (
        <div className="absolute inset-0 z-40">
          <Warning onFinish={handleWarningFinish} />
        </div>
      )}
      {state.currentPhase === 'folders' && (
        <div className="absolute inset-0 z-40">
          <Folders onFinish={handleFoldersFinish} />
        </div>
      )}
    </div>
  );
}
