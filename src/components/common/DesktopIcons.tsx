'use client';

import React, { useState, useEffect } from 'react';

type IconData = {
  id: number;
  label: string;
  src: string;
  x: number;
  y: number;
};

interface DesktopIconsProps {
  showPortfolioIcons?: boolean;
  onIconDoubleClick?: (icon: IconData) => void;
}

/* ----------  STAŁE IKONY  ---------- */
const DEFAULT_ICONS: IconData[] = [
  { id: 1, label: 'Gadu-Gadu', src: '/images/chat-icon.png', x: 32, y: 32 },
  { id: 2, label: 'Counter-Strike 1.6', src: '/images/game-icon.png', x: 32, y: 140 },
  { id: 3, label: 'Internet Explorer', src: '/images/winamp-icon.svg', x: 32, y: 248 }, // 👈 UŻYJ DOSTĘPNEJ IKONY
  { id: 4, label: 'Kosz', src: '/images/trash-icon.png', x: 32, y: 356 },

  { id: 5, label: 'Tibia', src: '/images/rpg-icon.png', x: 150, y: 32 },
  { id: 6, label: 'Winamp', src: '/images/winamp-icon.svg', x: 150, y: 140 }, // 👈 UŻYJ DOSTĘPNEJ IKONY
  { id: 7, label: 'GTA: San Andreas', src: '/images/Gtasaicon.jpg', x: 150, y: 240 },
  { id: 8, label: 'Need for Speed', src: '/images/racing-icon.png', x: 150, y: 356 },
  { id: 9, label: 'Icy Tower', src: '/images/icy-icon.png', x: 268, y: 32 },
];

const PORTFOLIO_ICONS: IconData[] = [
  { id: 101, label: 'About_Me.txt', src: '/images/document-icon.png', x: 386, y: 32 },
  { id: 102, label: 'Projects.txt', src: '/images/folder-icon.png', x: 386, y: 140 },
];

export default function DesktopIcons({
  showPortfolioIcons = false,
  onIconDoubleClick,
}: DesktopIconsProps) {
  const [icons, setIcons] = useState<IconData[]>(DEFAULT_ICONS);
  const [draggingIconId, setDraggingIconId] = useState<number | null>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  /* --- Dodawanie ikon portfolio --- */
  useEffect(() => {
    if (showPortfolioIcons) {
      setIcons((prev) => {
        const existing = new Set(prev.map((i) => i.id));
        const fresh = PORTFOLIO_ICONS.filter((i) => !existing.has(i.id));
        return [...prev, ...fresh];
      });
    }
  }, [showPortfolioIcons]);

  /* ----------  DRAG & DROP  ---------- */
  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>, iconId: number) {
    e.preventDefault();
    e.stopPropagation();
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    setDraggingIconId(iconId);
    setOffsetX(e.clientX - rect.left);
    setOffsetY(e.clientY - rect.top);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (draggingIconId === null) return;
    e.preventDefault();
    const { clientX, clientY } = e;
    setIcons((prev) =>
      prev.map((icon) =>
        icon.id === draggingIconId ? { ...icon, x: clientX - offsetX, y: clientY - offsetY } : icon
      )
    );
  }

  function handleMouseUp() {
    setDraggingIconId(null);
  }

  /* ----------  DOUBLE CLICK  ---------- */
  function handleIconDoubleClick(icon: IconData) {
    // Wywołaj zewnętrzny callback - desktop.tsx obsługuje otwieranie aplikacji
    if (onIconDoubleClick) {
      onIconDoubleClick(icon);
    }
  }

  /* ----------  EMOJI MAPPER Z FALLBACKIEM ---------- */
  function getIconEmoji(label: string): string {
    if (label.includes('About') || label.includes('mnie')) return '👤';
    if (label.includes('Project') || label.includes('Projekt')) return '📁';
    if (label.includes('CV')) return '📄';
    if (label.includes('Gadu')) return '💬';
    if (label.includes('Counter')) return '🎯';
    if (label.includes('Internet')) return '🌐';
    if (label.includes('Kosz')) return '🗑️';
    if (label.includes('Tibia')) return '⚔️';
    if (label.includes('Winamp')) return '🎵';
    if (label.includes('GTA')) return '🚗';
    if (label.includes('Need')) return '🏎️';
    if (label.includes('Icy')) return '🧊';
    return '💾';
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* ----------  IKONY NA PULPICIE  ---------- */}
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="absolute text-center cursor-pointer select-none pointer-events-auto"
          onMouseDown={(e) => handleMouseDown(e, icon.id)}
          onDoubleClick={() => handleIconDoubleClick(icon)}
          style={{ left: icon.x, top: icon.y, width: '64px', padding: '4px' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(49,106,197,.3)';
            e.currentTarget.style.border = '1px dotted #316ac5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.border = '1px solid transparent';
          }}
        >
          {/* Icon - używamy emoji zamiast PNG */}
          <div
            style={{
              width: 32,
              height: 32,
              margin: '0 auto 2px',
              backgroundColor: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              borderRadius: '2px',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
            }}
          >
            {getIconEmoji(icon.label)}
          </div>

          {/* Icon label */}
          <div
            style={{
              color: '#fff',
              fontSize: 11,
              textShadow: '1px 1px 1px #000, -1px -1px 1px #000',
              lineHeight: 1.2,
              wordWrap: 'break-word',
              maxWidth: 64,
            }}
          >
            {icon.label}
          </div>
        </div>
      ))}
    </div>
  );
}
