'use client';

import React from 'react';
import { QUICK_LAUNCH_ITEMS } from '../constants/taskbarData';
import { quickLaunchContainerStyle, quickLaunchButtonStyle } from '../styles/taskbarStyles';

/* ---------- COMPONENT ---------- */
export function QuickLaunch() {
  return (
    <div style={quickLaunchContainerStyle}>
      {QUICK_LAUNCH_ITEMS.map((item) => (
        <button
          key={item.id}
          title={item.title}
          style={quickLaunchButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.border = '1px solid transparent';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.border = '1px solid rgba(0,0,0,0.3)';
            e.currentTarget.style.background = 'rgba(0,0,0,0.1)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
          }}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
