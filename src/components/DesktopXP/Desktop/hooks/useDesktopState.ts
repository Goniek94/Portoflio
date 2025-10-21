'use client';

import { useState } from 'react';

/* ---------- TYPES ---------- */
interface ContextMenuState {
  x: number;
  y: number;
  visible: boolean;
}

/* ---------- HOOK ---------- */
export function useDesktopState() {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [showStartMenu, setShowStartMenu] = useState(false);

  // Context Menu handlers
  const openContextMenu = (x: number, y: number) => {
    setContextMenu({ x, y, visible: true });
  };

  const closeContextMenu = () => {
    setContextMenu({ x: 0, y: 0, visible: false });
  };

  // Start Menu handlers
  const toggleStartMenu = () => setShowStartMenu((prev) => !prev);
  const closeStartMenu = () => setShowStartMenu(false);

  return {
    contextMenu,
    showStartMenu,
    openContextMenu,
    closeContextMenu,
    toggleStartMenu,
    closeStartMenu,
  };
}
