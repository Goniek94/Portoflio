'use client';

import React from 'react';
import {
  windowButtonsContainerStyle,
  getWindowButtonStyle,
  windowButtonHoverGradient,
  windowButtonNormalGradient,
} from '../styles/taskbarStyles';

/* ---------- TYPES ---------- */
interface WindowState {
  id: string;
  title: string;
  icon: string;
  isMinimized: boolean;
  isVisible: boolean;
  type: 'windowed' | 'fullscreen' | 'dialog';
}

interface WindowButtonsProps {
  windows: WindowState[];
  onWindowRestore: (windowId: string) => void;
  onWindowFocus: (windowId: string) => void;
}

/* ---------- COMPONENT ---------- */
export function WindowButtons({ windows, onWindowRestore, onWindowFocus }: WindowButtonsProps) {
  // Filter windows for taskbar display (exclude fullscreen)
  const taskbarWindows = windows.filter((w) => w.isVisible && w.type !== 'fullscreen');

  return (
    <div style={windowButtonsContainerStyle}>
      {taskbarWindows.map((window) => {
        const isActive = !window.isMinimized;

        return (
          <button
            key={window.id}
            style={getWindowButtonStyle(isActive)}
            onClick={() => {
              if (window.isMinimized) {
                onWindowRestore(window.id);
              } else {
                onWindowFocus(window.id);
              }
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = windowButtonHoverGradient;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = windowButtonNormalGradient;
              }
            }}
            title={window.title}
          >
            <span style={{ fontSize: 14, flexShrink: 0 }}>{window.icon}</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{window.title}</span>
          </button>
        );
      })}
    </div>
  );
}
