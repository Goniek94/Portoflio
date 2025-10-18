'use client';

import React from 'react';

interface StartMenuProps {
  /** czy menu ma być widoczne */
  visible: boolean;
  /** zamykamy menu (klik poza albo wybór) */
  onClose: () => void;
  /** callback po kliknięciu wpisu */
  onMenuItemClick?: (id: string) => void;
}

/* główne wpisy – prawa kolumna */
const MAIN = [
  { id: 'programs', label: 'Programy', icon: '📁', submenu: true },
  { id: 'documents', label: 'Dokumenty', icon: '📄', submenu: true },
  { id: 'settings', label: 'Ustawienia', icon: '⚙️', submenu: true },
  { id: 'search', label: 'Wyszukaj', icon: '🔍' },
  { id: 'help', label: 'Pomoc i obsługa techn.', icon: '❓' },
  { id: 'run', label: 'Uruchom…', icon: '▶️' },
];

/* dolny pasek */
const BOTTOM = [
  { id: 'logoff', label: 'Wyloguj użytkownika…', icon: '👤' },
  { id: 'shutdown', label: 'Zamknij komputer…', icon: '🔌' },
];

/* pinned apps */
const PINNED = [
  { label: 'Internet Explorer', icon: '🌐' },
  { label: 'Outlook Express', icon: '📧' },
  { label: 'Gadu-Gadu', icon: '💬' },
  { label: 'Winamp', icon: '🎵' },
];

export default function StartMenu({ visible, onClose, onMenuItemClick }: StartMenuProps) {
  if (!visible) return null;

  const click = (id: string) => {
    onMenuItemClick?.(id);
    onClose();
  };

  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 z-[98]" onClick={onClose} />

      <div
        className="z-[99]"
        style={{
          position: 'absolute',
          bottom: 30,
          left: 2,
          width: 292,
          height: 450,
          background:
            'linear-gradient(to right, #1f4788 0%, #285ea4 49%, #f0f0f0 49%, #f0f0f0 100%)',
          border: '1px solid #1941a5',
          borderRadius: '8px 8px 0 0',
          boxShadow: '3px -3px 10px rgba(0,0,0,.6)',
          fontFamily: 'Tahoma,"MS Sans Serif",sans-serif',
          fontSize: 11,
          overflow: 'hidden',
        }}
      >
        {/* górny pasek */}
        <div
          style={{
            height: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '0 12px',
            background: 'linear-gradient(#1f4788, #4a90e2)',
            borderBottom: '1px solid #1941a5',
            color: '#fff',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '2px solid #fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              background: '#2151a0',
            }}
          >
            👤
          </div>
          <div style={{ fontWeight: 'bold' }}>Użytkownik</div>
        </div>

        {/* zawartość */}
        <div style={{ display: 'flex', height: 'calc(100% - 60px)' }}>
          {/* lewa kolumna – pinned / często używane */}
          <div
            style={{
              width: 150,
              background: 'linear-gradient(#2151a0, #4a90e2)',
              padding: 8,
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 10, opacity: 0.8, marginBottom: 6 }}>Najczęściej używane:</div>
            {PINNED.map((app) => (
              <div
                key={app.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 6px',
                  cursor: 'pointer',
                  fontSize: 11,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.12)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                onClick={() => click(`pinned-${app.label}`)}
              >
                <span style={{ fontSize: 16 }}>{app.icon}</span>
                {app.label}
              </div>
            ))}
          </div>

          {/* prawa kolumna – główne wpisy */}
          <div style={{ flex: 1, background: '#f0f0f0', padding: 8 }}>
            {MAIN.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 6px',
                  cursor: 'pointer',
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#316ac5';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#000';
                }}
                onClick={() => click(item.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  {item.label}
                </div>
                {item.submenu && <span style={{ fontSize: 8 }}>▶</span>}
              </div>
            ))}

            {/* separator */}
            <div style={{ margin: '6px 0', borderTop: '1px solid #ccc' }} />

            {BOTTOM.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 6px',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#316ac5';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#000';
                }}
                onClick={() => click(item.id)}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
