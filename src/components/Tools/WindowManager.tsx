import React, { useState, useRef, useEffect, ReactNode } from 'react';

// Typy okien - różne zachowania
type WindowType = 'windowed' | 'fullscreen' | 'dialog';

interface WindowConfig {
  id: string;
  title: string;
  icon: string;
  type: WindowType;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
  resizable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
}

interface WindowState {
  id: string;
  title: string;
  icon: string;
  type: WindowType;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
  resizable: boolean;
  minimizable: boolean;
  maximizable: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isVisible: boolean;
  zIndex: number;
  currentSize: { width: number; height: number };
  currentPosition: { x: number; y: number };
}

// Export typów
export type { WindowConfig, WindowState };

interface WindowManagerProps {
  windows: WindowState[];
  onWindowUpdate: (windowId: string, updates: Partial<WindowState>) => void;
  onWindowClose: (windowId: string) => void;
  onWindowFocus: (windowId: string) => void;
  children: (windowId: string, windowState: WindowState) => ReactNode;
}

interface DraggableWindowProps {
  window: WindowState;
  onUpdate: (updates: Partial<WindowState>) => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: ReactNode;
}

// Hook do zarządzania oknami
export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);

  // Otwórz nowe okno
  const openWindow = (config: WindowConfig) => {
    const existingWindow = windows.find((w) => w.id === config.id);
    if (existingWindow) {
      // Jeśli okno już istnieje, przywróć je i przenieś na wierzch
      updateWindow(config.id, {
        isMinimized: false,
        isVisible: true,
        zIndex: nextZIndex,
      });
      setNextZIndex((prev) => prev + 1);
      return;
    }

    const newWindow: WindowState = {
      id: config.id,
      title: config.title,
      icon: config.icon,
      type: config.type,
      defaultSize: config.defaultSize,
      defaultPosition: config.defaultPosition,
      resizable: config.resizable ?? true,
      minimizable: config.minimizable ?? true,
      maximizable: config.maximizable ?? config.type !== 'fullscreen',
      isMinimized: false,
      isMaximized: config.type === 'fullscreen',
      isVisible: true,
      zIndex: nextZIndex,
      currentSize: config.defaultSize,
      currentPosition: config.defaultPosition,
    };

    setWindows((prev) => [...prev, newWindow]);
    setNextZIndex((prev) => prev + 1);
  };

  // Aktualizuj okno
  const updateWindow = (windowId: string, updates: Partial<WindowState>) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, ...updates } : w)));
  };

  // Zamknij okno
  const closeWindow = (windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  };

  // Przenieś okno na wierzch
  const focusWindow = (windowId: string) => {
    updateWindow(windowId, { zIndex: nextZIndex });
    setNextZIndex((prev) => prev + 1);
  };

  return {
    windows,
    openWindow,
    updateWindow,
    closeWindow,
    focusWindow,
  };
}

// Pojedyncze okno
function DraggableWindow({
  window,
  onUpdate,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}: DraggableWindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement | null>(null);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.isMaximized) return;

    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      onFocus();
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !window.isMaximized) {
        const screenWidth =
          typeof globalThis !== 'undefined' && globalThis.innerWidth ? globalThis.innerWidth : 1920;
        const screenHeight =
          typeof globalThis !== 'undefined' && globalThis.innerHeight
            ? globalThis.innerHeight
            : 1080;

        const newX = Math.max(
          0,
          Math.min(screenWidth - window.currentSize.width, e.clientX - dragOffset.x)
        );
        const newY = Math.max(
          0,
          Math.min(screenHeight - window.currentSize.height - 30, e.clientY - dragOffset.y)
        );

        onUpdate({
          currentPosition: { x: newX, y: newY },
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, window, onUpdate]);

  // ESC key handler dla fullscreen apps
  useEffect(() => {
    if (window.type === 'fullscreen' && window.isVisible) {
      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscKey);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [window.type, window.isVisible, onClose]);

  // Fullscreen apps nie pokazują window frame
  if (window.type === 'fullscreen') {
    const fullscreenStyle: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: window.zIndex,
      backgroundColor: '#000',
      overflow: 'hidden',
    };

    const escHintStyle: React.CSSProperties = {
      position: 'absolute',
      top: '10px',
      right: '10px',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '12px',
      fontFamily: 'Tahoma, Arial, sans-serif',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '6px 12px',
      borderRadius: '4px',
      zIndex: 9999,
      pointerEvents: 'none',
    };

    return (
      <div style={fullscreenStyle} onClick={onFocus}>
        <div style={escHintStyle}>Press ESC to exit</div>
        {children}
      </div>
    );
  }

  // Ukryj jeśli zminimalizowane
  if (window.isMinimized || !window.isVisible) return null;

  const windowStyle: React.CSSProperties = {
    position: 'fixed',
    left: window.isMaximized ? 0 : window.currentPosition.x,
    top: window.isMaximized ? 0 : window.currentPosition.y,
    width: window.isMaximized ? '100vw' : window.currentSize.width,
    height: window.isMaximized ? 'calc(100vh - 30px)' : window.currentSize.height,
    zIndex: window.zIndex,
    backgroundColor: '#C0C0C0',
    border: window.isMaximized ? 'none' : '2px outset #C0C0C0',
    fontFamily: 'Tahoma, Arial, sans-serif',
    fontSize: '11px',
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: window.isMaximized ? 'none' : '2px 2px 8px rgba(0,0,0,0.3)',
  };

  const titleBarStyle: React.CSSProperties = {
    height: '18px',
    background: 'linear-gradient(to bottom, #0050A0, #003875)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 4px',
    cursor: isDragging ? 'grabbing' : 'grab',
    color: 'white',
    fontSize: '11px',
  };

  const titleTextStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  const titleButtonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2px',
  };

  const titleBtnStyle: React.CSSProperties = {
    width: '16px',
    height: '14px',
    fontSize: '10px',
    border: '1px outset #C0C0C0',
    backgroundColor: '#C0C0C0',
    cursor: 'pointer',
    padding: '0',
    color: 'black',
    lineHeight: '1',
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  };

  return (
    <div ref={windowRef} style={windowStyle} onClick={onFocus}>
      {/* Title Bar */}
      <div style={titleBarStyle} onMouseDown={handleMouseDown}>
        <div style={titleTextStyle}>
          <span style={{ fontSize: '12px' }}>{window.icon}</span>
          <span>{window.title}</span>
        </div>
        <div style={titleButtonsStyle}>
          {window.minimizable && (
            <button style={titleBtnStyle} onClick={onMinimize} title="Minimize">
              _
            </button>
          )}
          {window.maximizable && (
            <button
              style={titleBtnStyle}
              onClick={onMaximize}
              title={window.isMaximized ? 'Restore' : 'Maximize'}
            >
              {window.isMaximized ? '❐' : '□'}
            </button>
          )}
          <button style={titleBtnStyle} onClick={onClose} title="Close">
            ✕
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div style={contentStyle}>{children}</div>
    </div>
  );
}

// Główny WindowManager
export default function WindowManager({
  windows,
  onWindowUpdate,
  onWindowClose,
  onWindowFocus,
  children,
}: WindowManagerProps) {
  const handleMinimize = (windowId: string) => {
    onWindowUpdate(windowId, { isMinimized: true });
  };

  const handleMaximize = (windowId: string) => {
    const windowState = windows.find((w) => w.id === windowId);
    if (windowState && windowState.type !== 'fullscreen') {
      onWindowUpdate(windowId, { isMaximized: !windowState.isMaximized });
    }
  };

  return (
    <>
      {windows.map((windowState) => (
        <DraggableWindow
          key={windowState.id}
          window={windowState}
          onUpdate={(updates) => onWindowUpdate(windowState.id, updates)}
          onClose={() => onWindowClose(windowState.id)}
          onMinimize={() => handleMinimize(windowState.id)}
          onMaximize={() => handleMaximize(windowState.id)}
          onFocus={() => onWindowFocus(windowState.id)}
        >
          {children(windowState.id, windowState)}
        </DraggableWindow>
      ))}
    </>
  );
}

// Konfiguracje aplikacji
export const APP_CONFIGS: Record<string, WindowConfig> = {
  winamp: {
    id: 'winamp',
    title: 'Winamp',
    icon: '🎵',
    type: 'windowed',
    defaultSize: { width: 275, height: 220 },
    defaultPosition: { x: 100, y: 100 },
    resizable: false,
    minimizable: true,
    maximizable: false,
  },
  winampPlaylist: {
    id: 'winampPlaylist',
    title: 'Winamp Playlist',
    icon: '📜',
    type: 'windowed',
    defaultSize: { width: 275, height: 280 },
    defaultPosition: { x: 390, y: 100 },
    resizable: false,
    minimizable: true,
    maximizable: false,
  },
  gaduGadu: {
    id: 'gaduGadu',
    title: 'Gadu-Gadu',
    icon: '💬',
    type: 'windowed',
    defaultSize: { width: 250, height: 400 },
    defaultPosition: { x: 50, y: 50 },
    resizable: true,
    minimizable: true,
    maximizable: true,
  },
  counterStrike: {
    id: 'counterStrike',
    title: 'Counter-Strike 1.6',
    icon: '🎯',
    type: 'fullscreen',
    defaultSize: { width: 0, height: 0 },
    defaultPosition: { x: 0, y: 0 },
    resizable: false,
    minimizable: false,
    maximizable: false,
  },
  tibia: {
    id: 'tibia',
    title: 'Tibia',
    icon: '⚔️',
    type: 'fullscreen',
    defaultSize: { width: 0, height: 0 },
    defaultPosition: { x: 0, y: 0 },
    resizable: false,
    minimizable: false,
    maximizable: false,
  },
  internetExplorer: {
    id: 'internetExplorer',
    title: 'Internet Explorer',
    icon: '🌐',
    type: 'windowed',
    defaultSize: { width: 800, height: 600 },
    defaultPosition: { x: 100, y: 100 },
    resizable: true,
    minimizable: true,
    maximizable: true,
  },
  gtaSanAndreas: {
    id: 'gtaSanAndreas',
    title: 'GTA: San Andreas',
    icon: '🚗',
    type: 'fullscreen',
    defaultSize: { width: 0, height: 0 },
    defaultPosition: { x: 0, y: 0 },
    resizable: false,
    minimizable: false,
    maximizable: false,
  },
  aboutMe: {
    id: 'aboutMe',
    title: 'About_Me',
    icon: '📁',
    type: 'windowed',
    defaultSize: { width: 800, height: 600 },
    defaultPosition: { x: 100, y: 50 },
    resizable: true,
    minimizable: true,
    maximizable: true,
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    icon: '📁',
    type: 'windowed',
    defaultSize: { width: 800, height: 600 },
    defaultPosition: { x: 120, y: 70 },
    resizable: true,
    minimizable: true,
    maximizable: true,
  },
};
