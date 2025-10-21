// desktop/Folders/PortfolioXPRepoInfo.tsx

import { useState } from 'react';

interface PortfolioXPRepoInfoProps {
  onClose: () => void;
}

type TabType = 'about' | 'components' | 'features' | 'tech';

export default function PortfolioXPRepoInfo({ onClose }: PortfolioXPRepoInfoProps) {
  const [activeTab, setActiveTab] = useState<TabType>('about');

  const handleOpenRepo = () => {
    window.open('https://github.com/Goniek94/Portoflio.git', '_blank');
  };

  return (
    <div className="w-full max-w-5xl rounded border-2 border-[#7a7a7a] shadow-xl bg-[#f6f6f6] max-h-[90vh] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1 bg-gradient-to-r from-[#0a246a] to-[#0055cc] border-b border-[#f6f6f6]">
        <span className="text-white font-bold tracking-wide text-xs select-none flex items-center gap-2">
          <span className="text-lg">💻</span>
          <span>Windows XP Portfolio - Repository.txt</span>
        </span>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center bg-[#e81123] border border-[#888] rounded-sm shadow hover:bg-[#ff4d4d] transition-all hover:scale-105"
          title="Close"
        >
          <span className="text-white text-xl font-bold -mt-[2px]">×</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-[#ece9d8] border-b-2 border-[#888] px-3 py-2 flex gap-2">
        {[
          { id: 'about', label: '📋 About Project' },
          { id: 'components', label: '🎨 Components' },
          { id: 'features', label: '✨ Features' },
          { id: 'tech', label: '💻 Tech Stack' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-6 py-3 text-sm font-bold rounded-t border-2 transition-all ${
              activeTab === tab.id
                ? 'bg-white border-[#0a246a] text-[#0a246a] -mb-[2px] relative z-10'
                : 'bg-[#d4d0c8] border-[#888] text-gray-700 hover:bg-[#e6e3d5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content - scrollable */}
      <div className="flex-1 overflow-y-auto bg-white p-8">
        {/* TAB: ABOUT PROJECT */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-6 rounded-r shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                <span className="text-2xl">💻</span>
                Windows XP Interactive Portfolio
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                Interactive portfolio in Windows XP style - pixel-perfect recreation of the iconic
                operating system as a modern web application. The project combines nostalgia with
                modern frontend technologies.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                <span className="text-xl">🎯</span>
                Concept
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Instead of a traditional portfolio - <strong>a live demonstration of skills</strong>
                . Users navigate through a functional Windows XP desktop, discovering projects,
                skills and information about me through interaction with icons, windows and
                applications.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-purple-800 mb-4 text-base flex items-center gap-2">
                  <span>🎨</span>
                  <span>Main Elements</span>
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">🖥️</span>
                    <span>
                      <strong>Desktop System</strong> - icons, context menu, wallpaper
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">🪟</span>
                    <span>
                      <strong>Window Manager</strong> - draggable, resizable, z-index orchestration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">📊</span>
                    <span>
                      <strong>Taskbar</strong> - start menu, quick launch, system tray, clock
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">🎵</span>
                    <span>
                      <strong>Applications</strong> - Winamp player, Gadu-Gadu, Notepad
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">💫</span>
                    <span>
                      <strong>Effects</strong> - boot screen, glitch animations, BSOD
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-orange-800 mb-4 text-base flex items-center gap-2">
                  <span>📊</span>
                  <span>Project Scale</span>
                </h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex justify-between">
                    <span>React Components:</span>
                    <strong className="text-orange-600">50+</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Custom Hooks:</span>
                    <strong className="text-orange-600">8+</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>TypeScript Lines:</span>
                    <strong className="text-orange-600">5000+</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>CSS Animations:</span>
                    <strong className="text-orange-600">20+</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Development Time:</span>
                    <strong className="text-orange-600">3 weeks</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB: COMPONENTS */}
        {activeTab === 'components' && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-purple-600 pb-2 mb-4">
              🎨 Key Components
            </h2>

            <div className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🖥️</span>
                <div className="flex-1">
                  <h3 className="font-bold text-blue-800 mb-2 text-sm">Desktop System</h3>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• Grid-based icon positioning</li>
                    <li>• Right-click context menu</li>
                    <li>• Dynamic wallpaper support</li>
                    <li>• Icon selection & focus states</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🪟</span>
                <div className="flex-1">
                  <h3 className="font-bold text-green-800 mb-2 text-sm">Window Manager</h3>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• Draggable windows with custom hook</li>
                    <li>• Minimize/Maximize/Close controls</li>
                    <li>• Z-index state management</li>
                    <li>• Window resize functionality</li>
                    <li>• Taskbar integration</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 bg-purple-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">📊</span>
                <div className="flex-1">
                  <h3 className="font-bold text-purple-800 mb-2 text-sm">Taskbar & Start Menu</h3>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• XP-style Start button with animation</li>
                    <li>• Active window indicators</li>
                    <li>• System tray with clock</li>
                    <li>• Quick launch area</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🎵</span>
                <div className="flex-1">
                  <h3 className="font-bold text-orange-800 mb-2 text-sm">Interactive Apps</h3>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• Winamp music player (skin-accurate)</li>
                    <li>• Gadu-Gadu messenger interface</li>
                    <li>• Notepad text editor</li>
                    <li>• Custom folder structures</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: FEATURES */}
        {activeTab === 'features' && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-green-600 pb-2 mb-4">
              ✨ Technical Features
            </h2>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2 text-sm flex items-center gap-2">
                  <span>🎨</span>
                  <span>UI/UX</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li>• Pixel-perfect Windows XP recreation</li>
                  <li>• Authentic system fonts & colors</li>
                  <li>• Smooth CSS animations</li>
                  <li>• Interactive hover states</li>
                </ul>
              </div>

              <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2 text-sm flex items-center gap-2">
                  <span>⚡</span>
                  <span>Performance</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li>• Optimized re-renders with React.memo</li>
                  <li>• Lazy loading for heavy components</li>
                  <li>• Optimized animations (CSS transforms)</li>
                  <li>• Debounced event handlers</li>
                </ul>
              </div>

              <div className="border border-orange-200 bg-orange-50 p-4 rounded-lg">
                <h3 className="font-bold text-orange-800 mb-2 text-sm flex items-center gap-2">
                  <span>📱</span>
                  <span>Responsive Design</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li>• Adaptation to mobile/tablet/desktop</li>
                  <li>• Touch-friendly controls</li>
                  <li>• Scaled UI for small screens</li>
                  <li>• Graceful degradation</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB: TECH STACK */}
        {activeTab === 'tech' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-indigo-600 pb-2 mb-4">
              💻 Technology Stack
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Core Technologies */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">⚛️</span>
                  <span className="text-sm">Core Technologies</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>Next.js 14 (App Router)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>React 18</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>TypeScript (strict mode)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>Tailwind CSS</span>
                  </li>
                </ul>
              </div>

              {/* Advanced Features */}
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">🎨</span>
                  <span className="text-sm">Advanced Features</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Custom Hooks Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>CSS Animations & Keyframes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Drag & Drop Implementation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Z-index Management System</span>
                  </li>
                </ul>
              </div>

              {/* Development Tools */}
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">🛠️</span>
                  <span className="text-sm">Development Tools</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>ESLint + Prettier</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>Git + GitHub</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>VS Code</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>Chrome DevTools</span>
                  </li>
                </ul>
              </div>

              {/* Patterns & Architecture */}
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">🏗️</span>
                  <span className="text-sm">Patterns & Architecture</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>Component Composition</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>Custom Hooks Pattern</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>Modular File Structure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>TypeScript Interfaces</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with PULSING button */}
      <div className="flex items-center justify-between text-xs px-3 py-2 bg-[#f3f3f3] border-t border-[#c3c3c3]">
        <span className="text-gray-600 flex items-center gap-2">
          <span className="text-sm">📂</span>
          <span>Portfolio XP • Next.js 14 + TypeScript</span>
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleOpenRepo}
            className="relative bg-gradient-to-r from-green-600 to-green-700 text-white text-xs px-5 py-2 rounded-md hover:from-green-500 hover:to-green-600 transition-all flex items-center gap-2 font-bold shadow-lg animate-pulse hover:animate-none"
          >
            <span className="text-base">🔗</span>
            <span>View GitHub</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </button>
          <button
            onClick={onClose}
            className="bg-blue-700 text-white text-xs px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
