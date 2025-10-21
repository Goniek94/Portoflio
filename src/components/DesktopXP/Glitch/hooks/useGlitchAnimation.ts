'use client';

import { useState, useEffect, useCallback } from 'react';
import { TIMINGS } from '../constants/glitchConfig';

interface UseGlitchAnimationProps {
  onFinish: () => void;
}

export function useGlitchAnimation({ onFinish }: UseGlitchAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);

  const handleFinish = useCallback(() => {
    if (!isVisible) return;
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, TIMINGS.FADE_OUT);
  }, [isVisible, onFinish]);

  // Glitch intensity animation
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchIntensity(Math.random());
    }, TIMINGS.GLITCH_INTENSITY_UPDATE);

    const finishTimer = setTimeout(() => {
      handleFinish();
    }, TIMINGS.AUTO_FINISH);

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

  return {
    isVisible,
    isFadingOut,
    glitchIntensity,
    handleFinish,
  };
}
