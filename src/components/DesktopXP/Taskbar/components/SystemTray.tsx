'use client';

import React from 'react';
import { SYSTEM_TRAY_ITEMS } from '../constants/taskbarData';
import {
  systemTrayContainerStyle,
  hideIconsButtonStyle,
  trayIconStyle,
} from '../styles/taskbarStyles';

/* ---------- COMPONENT ---------- */
export function SystemTray() {
  return (
    <div style={systemTrayContainerStyle}>
      {/* Hide inactive icons button */}
      <button style={hideIconsButtonStyle} title="Ukryj nieaktywne ikony">
        ◀
      </button>

      {/* Tray icons */}
      {SYSTEM_TRAY_ITEMS.map((item) => (
        <div
          key={item.id}
          title={item.title}
          style={trayIconStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
