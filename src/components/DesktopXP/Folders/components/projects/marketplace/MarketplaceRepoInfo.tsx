// desktop/Folders/MarketplaceRepoInfo.tsx

import { useState } from 'react';

interface MarketplaceRepoInfoProps {
  onClose: () => void;
}

type TabType = 'about' | 'frontend' | 'backend' | 'tech';

export default function MarketplaceRepoInfo({ onClose }: MarketplaceRepoInfoProps) {
  const [activeTab, setActiveTab] = useState<TabType>('about');

  const handleOpenRepo = () => {
    window.open('https://github.com/Goniek94/FullstackCodePortfolio.git', '_blank');
  };

  return (
    <div className="w-full max-w-5xl rounded border-2 border-[#7a7a7a] shadow-xl bg-[#f6f6f6] max-h-[90vh] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1 bg-gradient-to-r from-[#0a246a] to-[#0055cc] border-b border-[#f6f6f6]">
        <span className="text-white font-bold tracking-wide text-xs select-none flex items-center gap-2">
          <span className="text-lg">🚗</span>
          <span>Automotive Marketplace - Portfolio.txt</span>
        </span>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center bg-[#e81123] border border-[#888] rounded-sm shadow hover:bg-[#ff4d4d] transition-all hover:scale-105"
          title="Zamknij"
        >
          <span className="text-white text-xl font-bold -mt-[2px]">×</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-[#ece9d8] border-b-2 border-[#888] px-2 py-1 flex gap-1">
        {[
          { id: 'about', label: '📋 About Project' },
          { id: 'frontend', label: '🎨 Frontend' },
          { id: 'backend', label: '⚙️ Backend' },
          { id: 'tech', label: '💻 Tech Stack' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-4 py-2 text-xs font-bold rounded-t border-2 transition-all ${
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
      <div className="flex-1 overflow-y-auto bg-white p-6">
        {/* TAB: O PROJEKCIE */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-4 rounded-r">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">🚗</span>
                Automotive Marketplace
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                Advanced e-commerce platform dedicated to the automotive industry, connecting car
                buyers and sellers in one intuitive ecosystem.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                Legal Notice
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Project commissioned by a private client.</strong>
                <br />
                Due to an <strong>NDA agreement</strong>, the full source code remains confidential.
                The presented code fragments were selected while maintaining confidentiality clauses
                and illustrate only my technical skills.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-5 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-4 text-base flex items-center gap-2">
                <span>🎯</span>
                <span>Platform Features</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                <ul className="space-y-2.5 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">🔍</span>
                    <span>
                      <strong>Advanced search</strong> with intelligent filter system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">👤</span>
                    <span>
                      <strong>Auth System</strong> - registration, login, email/SMS verification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">💬</span>
                    <span>
                      <strong>Real-time messaging</strong> with WebSocket notifications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">📝</span>
                    <span>
                      <strong>Create listings</strong> - multi-step form, photo upload
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">📸</span>
                    <span>
                      <strong>Listing management</strong> with photo gallery
                    </span>
                  </li>
                </ul>
                <ul className="space-y-2.5 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">💳</span>
                    <span>
                      <strong>Payments</strong> - integration, listing promotion
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">🔔</span>
                    <span>
                      <strong>Notification system</strong> - push notifications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">👨‍💼</span>
                    <span>
                      <strong>Admin Panel</strong> - moderation, user management
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">🛡️</span>
                    <span>
                      <strong>Enterprise security</strong> - rate limiting & authorization
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">📎</span>
                    <span>
                      <strong>File attachments</strong> - messages & comments support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB: FRONTEND */}
        {activeTab === 'frontend' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-4 rounded-r">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">⚛️</span>
                Frontend Architecture
              </h2>
              <p className="text-gray-700 text-sm">
                Modern, performant React-based frontend with advanced state management.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-4 text-base flex items-center gap-2">
                <span>🎨</span>
                <span>Key Features</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>React Hooks:</strong> Custom hooks for authentication, WebSocket,
                    real-time notifications
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>Context API:</strong> Global state (AuthContext, WebSocketContext)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>Lazy Loading:</strong> Dynamic imports for optimized bundle size
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>Tailwind CSS:</strong> Utility-first responsive design
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>PWA Ready:</strong> Service workers, offline support
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB: BACKEND */}
        {activeTab === 'backend' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-4 rounded-r">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🖥️</span>
                Backend & API
              </h2>
              <p className="text-gray-700 text-sm">
                Scalable RESTful API with real-time WebSocket communication.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 p-5 rounded-lg">
              <h3 className="font-bold text-green-900 mb-4 text-base flex items-center gap-2">
                <span>⚙️</span>
                <span>Technical Highlights</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>Express.js:</strong> RESTful API with MVC architecture
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>Socket.IO:</strong> Real-time bidirectional event-based communication
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>MongoDB:</strong> NoSQL database with Mongoose ODM
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>JWT:</strong> Secure token-based authentication
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>Middleware:</strong> Authentication, error handling, rate limiting
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB: TECH STACK */}
        {activeTab === 'tech' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">💻</span>
              Complete Technology Stack
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Frontend */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">⚛️</span>
                  <span className="text-sm">Frontend</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>React 18 + Hooks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>Context API & Custom Hooks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>Socket.IO Client</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>Tailwind CSS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>Progressive Web App (PWA)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span>Responsive Design (Mobile-first)</span>
                  </li>
                </ul>
              </div>

              {/* Backend */}
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">🖥️</span>
                  <span className="text-sm">Backend</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Node.js + Express</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Socket.IO (WebSocket)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>MongoDB + Mongoose</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>JWT Authentication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Rate Limiting (express-rate-limit)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>RESTful API Architecture</span>
                  </li>
                </ul>
              </div>

              {/* DevOps & Production */}
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">🛠️</span>
                  <span className="text-sm">DevOps & Production</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>VPS Setup & Configuration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>NGINX (reverse proxy, SSL)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>PM2 Process Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>SSL/TLS Certificates (Let&apos;s Encrypt)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    <span>Git & Automated Deployment</span>
                  </li>
                </ul>
              </div>

              {/* Architecture Patterns */}
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">🏗️</span>
                  <span className="text-sm">Architecture</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>MVC Pattern (Backend)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>Component-based (Frontend)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>Separation of Concerns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>Middleware Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    <span>Real-time Event-driven</span>
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
          <span>Code Fragments • Automotive Marketplace</span>
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
