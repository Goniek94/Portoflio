'use client';

import { useState, useEffect } from 'react';

/* ---------- CONSTANTS ---------- */
const GLITCH_TRIGGER_TIME = 5; // seconds

/* ---------- HOOK ---------- */
export function useGlitchTimer(onGlitchTrigger?: () => void) {
  const [timeOnDesktop, setTimeOnDesktop] = useState(0);
  const [glitchTriggered, setGlitchTriggered] = useState(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnDesktop((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Glitch trigger effect
  useEffect(() => {
    if (timeOnDesktop >= GLITCH_TRIGGER_TIME && !glitchTriggered && onGlitchTrigger) {
      setGlitchTriggered(true);
      onGlitchTrigger();
    }
  }, [timeOnDesktop, glitchTriggered, onGlitchTrigger]);

  return {
    timeOnDesktop,
    glitchTriggered,
  };
}
