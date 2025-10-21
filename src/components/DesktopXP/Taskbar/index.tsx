import React from 'react';
import { StartButton, QuickLaunch, WindowButtons, SystemTray, Clock } from './components';
import { taskbarStyle, separatorStyle } from './styles/taskbarStyles';

/* ---------- TYPES ---------- */
interface WindowState {
  id: string;
  title: string;
  icon: string;
  isMinimized: boolean;
  isVisible: boolean;
  type: 'windowed' | 'fullscreen' | 'dialog';
}

interface TaskbarProps {
  windows: WindowState[];
  onWindowRestore: (windowId: string) => void;
  onWindowFocus: (windowId: string) => void;
  onStartClick?: () => void;
  showStartMenu?: boolean;
}

/* ---------- COMPONENT ---------- */
export default function Taskbar({
  windows,
  onWindowRestore,
  onWindowFocus,
  onStartClick,
  showStartMenu = false,
}: TaskbarProps) {
  return (
    <div style={taskbarStyle}>
      {/* Start Button */}
      <StartButton onClick={onStartClick} isActive={showStartMenu} />

      {/* Separator */}
      <div style={{ ...separatorStyle, marginLeft: 4, marginRight: 2 }} />

      {/* Quick Launch */}
      <QuickLaunch />

      {/* Separator */}
      <div style={{ ...separatorStyle, marginLeft: 2, marginRight: 4 }} />

      {/* Window Buttons */}
      <WindowButtons
        windows={windows}
        onWindowRestore={onWindowRestore}
        onWindowFocus={onWindowFocus}
      />

      {/* System Tray */}
      <SystemTray />

      {/* Clock */}
      <Clock />
    </div>
  );
}
