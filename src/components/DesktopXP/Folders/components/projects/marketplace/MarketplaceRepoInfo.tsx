// desktop/Folders/MarketplaceRepoInfo.tsx

import { useState } from 'react';

interface MarketplaceRepoInfoProps {
  onClose: () => void;
}

export default function MarketplaceRepoInfo({ onClose }: MarketplaceRepoInfoProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'frontend' | 'backend' | 'tech'>('about');
  const [language, setLanguage] = useState<'pl' | 'en'>('pl');

  const handleOpenRepo = () => {
    window.open('https://github.com/Goniek94/Portoflio.git', '_blank');
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'pl' ? 'en' : 'pl'));
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
            onClick={() => setActiveTab(tab.id as any)}
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
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-4">
              🎨 Selected Fragments - Frontend (5)
            </h2>

            <div className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🔍</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">SearchFormUpdated.js</h3>
                  <p className="text-xs text-gray-600 italic mb-1">Intelligent filter engine</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    30+ form fields, custom hooks, URL synchronization, cascade dependencies
                    (brand→model)
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">📄</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">ListingDetails.js</h3>
                  <p className="text-xs text-gray-600 italic mb-1">Complete listing view</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Multi-stage data fetching, comment system with file upload, responsive layout
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">⭐</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">FeaturedListings.js</h3>
                  <p className="text-xs text-gray-600 italic mb-1">
                    Landing page with fallback strategy
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Smart data fetching, categorization (featured/hot/regular), graceful degradation
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 bg-purple-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">📸</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">ImageGallery.js</h3>
                  <p className="text-xs text-gray-600 italic mb-1">
                    Gallery with modal & keyboard navigation
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Fullscreen modal, thumbnails, loop navigation, ESC/arrows support
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🔔</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">NotificationContext.js</h3>
                  <p className="text-xs text-gray-600 italic mb-1">
                    Real-time enterprise notifications
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Socket.IO client, event deduplication, multi-channel feedback (toast + sound +
                    log)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: BACKEND */}
        {activeTab === 'backend' && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-orange-600 pb-2 mb-4">
              ⚙️ Selected Fragments - Backend (5)
            </h2>

            <div className="border-l-4 border-red-500 bg-red-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🛡️</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">Rate Limiting Middleware</h3>
                  <p className="text-xs text-gray-600 italic mb-1">Enterprise traffic control</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    HMAC-hashed keys, masked logging, per-endpoint limits, DDoS mitigation,
                    Retry-After headers
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🔌</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">Socket.IO Infrastructure</h3>
                  <p className="text-xs text-gray-600 italic mb-1">
                    Modular real-time architecture
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    4 managers (connections/conversations/notifications/heartbeat), JWT auth, health
                    monitoring
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🔍</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">Advanced Search Engine</h3>
                  <p className="text-xs text-gray-600 italic mb-1">Multi-stage ranking algorithm</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Smart scoring, 4-level sorting (priority→criteria→score→date), query
                    optimization
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 bg-purple-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">💬</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">Messaging System</h3>
                  <p className="text-xs text-gray-600 italic mb-1">Full-featured messenger</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    File uploads (Supabase), folders (inbox/sent/starred), read receipts, push/email
                    notifications
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-indigo-500 bg-indigo-50 p-3 rounded-r">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🔐</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">Profile & Account Security</h3>
                  <p className="text-xs text-gray-600 italic mb-1">Comprehensive user management</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Two-factor auth (email/SMS codes), token-based password reset, enumeration
                    protection, audit logging
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: TECH STACK */}
        {activeTab === 'tech' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b-2 border-purple-600 pb-2 mb-4">
              💻 Technology Stack
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
                    <span>SSL/TLS Certificates (Let's Encrypt)</span>
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
