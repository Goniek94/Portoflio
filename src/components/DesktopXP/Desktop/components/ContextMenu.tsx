'use client';

import React from 'react';

/* ---------- TYPES ---------- */
interface ContextMenuProps {
  x: number;
  y: number;
  visible: boolean;
  onSortIcons: () => void;
  onRefresh: () => void;
  onProperties: () => void;
}

/* ---------- STYLES ---------- */
const menuStyle: React.CSSProperties = {
  position: 'absolute',
  minWidth: 140,
  background: '#f0f0f0',
  zIndex: 1000,
  border: '1px solid #848284',
  boxShadow: '2px 2px 5px rgba(0,0,0,.5)',
  fontSize: 11,
  borderRadius: 2,
};

const menuItemStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderBottom: '1px solid #d0d0d0',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
};

const lastMenuItemStyle: React.CSSProperties = {
  ...menuItemStyle,
  borderBottom: 'none',
};

/* ---------- COMPONENT ---------- */
export function ContextMenu({
  x,
  y,
  visible,
  onSortIcons,
  onRefresh,
  onProperties,
}: ContextMenuProps) {
  if (!visible) return null;

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#316ac5';
    e.currentTarget.style.color = '#fff';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.style.color = '#000';
  };

  return (
    <div style={{ ...menuStyle, top: y, left: x }}>
      {/* Sort Icons */}
      <div
        onClick={onSortIcons}
        style={menuItemStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span style={{ marginRight: 8 }}>📂</span>
        Sortuj ikony według nazwy
      </div>

      {/* Refresh */}
      <div
        onClick={onRefresh}
        style={menuItemStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span style={{ marginRight: 8 }}>🔄</span>
        Odśwież
      </div>

      {/* Properties */}
      <div
        onClick={onProperties}
        style={lastMenuItemStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span style={{ marginRight: 8 }}>🎨</span>
        Właściwości
      </div>
    </div>
  );
}
