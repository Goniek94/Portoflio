'use client';

import { APP_CONFIGS, WindowConfig } from '@/components/Tools/WindowManager';

/* ---------- TYPES ---------- */
interface Icon {
  id: number;
  label: string;
  src: string;
  x: number;
  y: number;
}

interface DesktopHandlersProps {
  openWindow: (config: WindowConfig) => void;
  closeContextMenu: () => void;
}

/* ---------- HANDLERS ---------- */
export function createDesktopHandlers({ openWindow, closeContextMenu }: DesktopHandlersProps) {
  /**
   * Handle icon double click - opens corresponding application
   */
  const handleIconDoubleClick = (icon: Icon) => {
    closeContextMenu();

    switch (icon.label) {
      case 'About_Me.txt':
        openWindow(APP_CONFIGS.aboutMe);
        break;
      case 'Projects.txt':
        openWindow(APP_CONFIGS.projects);
        break;
      case 'Winamp':
        openWindow(APP_CONFIGS.winampPlaylist); // Otwiera najpierw playlistę
        break;
      case 'Gadu-Gadu':
        openWindow(APP_CONFIGS.gaduGadu);
        break;
      case 'Counter-Strike 1.6':
        openWindow(APP_CONFIGS.counterStrike);
        break;
      case 'Internet Explorer':
        openWindow(APP_CONFIGS.internetExplorer);
        break;
      case 'Tibia':
        openWindow(APP_CONFIGS.tibia);
        break;
      case 'GTA: San Andreas':
        openWindow(APP_CONFIGS.gtaSanAndreas);
        break;
      default:
        console.log('🚧 Aplikacja jeszcze nie zaimplementowana:', icon.label);
    }
  };

  /**
   * Handle context menu actions
   */
  const handleSortIcons = () => {
    closeContextMenu();
    // Future: Implement icon sorting logic
  };

  const handleRefresh = () => {
    closeContextMenu();
  };

  const handleProperties = () => {
    closeContextMenu();
    // Future: Implement properties dialog
  };

  return {
    handleIconDoubleClick,
    handleSortIcons,
    handleRefresh,
    handleProperties,
  };
}

/**
 * Handle window restore from taskbar
 */
export function handleWindowRestore(
  windowId: string,
  updateWindow: (id: string, updates: Partial<{ isMinimized: boolean }>) => void,
  focusWindow: (id: string) => void
) {
  updateWindow(windowId, { isMinimized: false });
  focusWindow(windowId);
}
