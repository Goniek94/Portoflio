'use client';

import React from 'react';
import {
  getStartButtonStyle,
  startButtonHoverGradient,
  startButtonNormalGradient,
} from '../styles/taskbarStyles';

/* ---------- TYPES ---------- */
interface StartButtonProps {
  onClick?: () => void;
  isActive: boolean;
}

/* ---------- COMPONENT ---------- */
export function StartButton({ onClick, isActive }: StartButtonProps) {
  return (
    <button
      onClick={onClick}
      style={getStartButtonStyle(isActive)}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = startButtonHoverGradient;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = startButtonNormalGradient;
        }
      }}
    >
      <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23fff' d='M2 2h7v7H2zm0 9h7v7H2zm9-9h7v7h-7zm0 9h7v7h-7z'/%3E%3C/svg%3E"
        alt=""
        width={18}
        height={18}
        style={{ filter: isActive ? 'brightness(0.85)' : 'none' }}
      />
      start
    </button>
  );
}
