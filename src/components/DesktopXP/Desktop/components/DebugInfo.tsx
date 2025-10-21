'use client';

import React from 'react';

/* ---------- TYPES ---------- */
interface DebugInfoProps {
  timeOnDesktop: number;
  windowsCount: number;
  showAdditionalIcons: boolean;
  glitchTriggered: boolean;
}

/* ---------- STYLES ---------- */
const containerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 8,
  right: 8,
  padding: 8,
  zIndex: 998,
  background: 'rgba(0,0,0,.7)',
  color: '#fff',
  borderRadius: 4,
  fontSize: 10,
  fontFamily: 'monospace',
};

/* ---------- COMPONENT ---------- */
export function DebugInfo({
  timeOnDesktop,
  windowsCount,
  showAdditionalIcons,
  glitchTriggered,
}: DebugInfoProps) {
  return (
    <div style={containerStyle}>
      <div>Desktop Time: {timeOnDesktop}s</div>
      <div>Open Windows: {windowsCount}</div>
      {timeOnDesktop >= 5 && <div style={{ color: '#ff6666' }}>⚡ Glitch ready!</div>}
      {showAdditionalIcons && <div style={{ color: '#66ff66' }}>✅ Portfolio unlocked!</div>}
      {glitchTriggered && <div style={{ color: '#ffaa00' }}>🌩️ Glitch triggered!</div>}
    </div>
  );
}
