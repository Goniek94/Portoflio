'use client';

import React from 'react';
import { useClock } from '../hooks/useClock';
import { clockStyle } from '../styles/taskbarStyles';

/* ---------- COMPONENT ---------- */
export function Clock() {
  const { time, fullDate } = useClock();

  return (
    <div
      style={clockStyle}
      title={fullDate}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(74,144,226,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(16,56,150,0.2)';
      }}
    >
      {time}
    </div>
  );
}
