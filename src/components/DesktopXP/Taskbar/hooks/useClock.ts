'use client';

import { useState, useEffect } from 'react';

/* ---------- HOOK ---------- */
export function useClock() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }));
    }, 60_000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getFullDate = () =>
    new Date().toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return {
    time,
    fullDate: getFullDate(),
  };
}
