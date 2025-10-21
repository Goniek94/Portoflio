/* eslint-disable react/no-unescaped-entities */
// desktop/Folders/content/AboutMeContent.tsx

import { useState, useEffect } from 'react';

export default function AboutMeContent() {
  const [displayedText, setDisplayedText] = useState({
    name: '',
    surname: '',
    birthdate: '',
    location: '',
  });
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const texts = {
      name: 'Mateusz',
      surname: 'Goszczycki',
      birthdate: '22.10.1994',
      location: 'Łowicz / Warszawa',
    };

    let nameIndex = 0;
    let surnameIndex = 0;
    let birthdateIndex = 0;
    let locationIndex = 0;

    // Type name
    const nameInterval = setInterval(() => {
      if (nameIndex < texts.name.length) {
        setDisplayedText((prev) => ({
          ...prev,
          name: texts.name.substring(0, nameIndex + 1),
        }));
        nameIndex++;
      } else {
        clearInterval(nameInterval);
        // Start surname after name is complete
        const surnameInterval = setInterval(() => {
          if (surnameIndex < texts.surname.length) {
            setDisplayedText((prev) => ({
              ...prev,
              surname: texts.surname.substring(0, surnameIndex + 1),
            }));
            surnameIndex++;
          } else {
            clearInterval(surnameInterval);
            // Start birthdate
            const birthdateInterval = setInterval(() => {
              if (birthdateIndex < texts.birthdate.length) {
                setDisplayedText((prev) => ({
                  ...prev,
                  birthdate: texts.birthdate.substring(0, birthdateIndex + 1),
                }));
                birthdateIndex++;
              } else {
                clearInterval(birthdateInterval);
                // Start location
                const locationInterval = setInterval(() => {
                  if (locationIndex < texts.location.length) {
                    setDisplayedText((prev) => ({
                      ...prev,
                      location: texts.location.substring(0, locationIndex + 1),
                    }));
                    locationIndex++;
                  } else {
                    clearInterval(locationInterval);
                    // Show main content after all typing is done
                    setTimeout(() => setShowContent(true), 300);
                  }
                }, 50);
              }
            }, 50);
          }
        }, 50);
      }
    }, 100);

    return () => {
      clearInterval(nameInterval);
    };
  }, []);

  return (
    <>
      {/* Typewriter animation header */}
      <section className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded border-l-4 border-blue-600">
        <div className="space-y-2 font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-bold">Name:</span>
            <span className="text-blue-700 font-bold">{displayedText.name}</span>
            {displayedText.name.length < 7 && <span className="animate-pulse">|</span>}
          </div>
          {displayedText.name.length === 7 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-bold">Surname:</span>
              <span className="text-blue-700 font-bold">{displayedText.surname}</span>
              {displayedText.surname.length < 10 && <span className="animate-pulse">|</span>}
            </div>
          )}
          {displayedText.surname.length === 10 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-bold">Date of Birth:</span>
              <span className="text-blue-700 font-bold">{displayedText.birthdate}</span>
              {displayedText.birthdate.length < 10 && <span className="animate-pulse">|</span>}
            </div>
          )}
          {displayedText.birthdate.length === 10 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-bold">Location:</span>
              <span className="text-blue-700 font-bold">{displayedText.location}</span>
              {displayedText.location.length < 18 && <span className="animate-pulse">|</span>}
            </div>
          )}
        </div>
      </section>

      {/* Main content with fade-in */}
      <div
        className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        <section className="mb-6 whitespace-pre-line">
          <span className="font-bold text-sm">👋 ABOUT ME</span>
          {'\n'}
          {'\n'}
          Full-stack Developer passionate about delivering complete web solutions — from UX to
          backend architecture. Over the past year, I independently built an enterprise-grade
          marketplace for the automotive industry, taking responsibility for every aspect of the
          project: from UI design and business logic to production deployment.
          {'\n'}
          {'\n'}
          Previously, I spent several years as an instructor-chef at a Vocational Activity Center,
          managing the kitchen and supervising over 20 people with disabilities. This experience
          taught me organization, patience, empathy, and a systematic approach to complex tasks —
          skills that transfer exceptionally well to programming and teamwork.
          {'\n'}
        </section>

        <section className="mb-6 whitespace-pre-line">
          <span className="font-bold text-sm">💻 TECH STACK & EXPERIENCE</span>
          {'\n'}
          {'\n'}
          <span className="font-bold text-blue-600">⚛️ Frontend Development</span>
          {'\n'}
          {'\n'}
          <span className="font-bold">Core:</span> React 18 (Hooks, Context API, Custom Hooks),
          TypeScript (strict mode), Next.js 14 (App Router)
          {'\n'}
          <span className="font-bold">Styling:</span> Tailwind CSS, CSS Modules, Responsive Design
          (mobile-first)
          {'\n'}
          <span className="font-bold">State & Data:</span> Complex state management (30+ form
          fields), real-time WebSocket
          {'\n'}
          <span className="font-bold">UI/UX:</span> Component composition, adaptive layouts,
          Progressive Web Apps
          {'\n'}
          <span className="font-bold">Routing:</span> React Router, dynamic routing, protected
          routes, URL state sync
          {'\n'}
          {'\n'}
          <span className="font-bold">Proven in practice:</span>
          {'\n'}- Advanced forms with cascading dependencies (brand → model → generation)
          {'\n'}- Real-time systems (notifications, chat, counters) using Socket.IO
          {'\n'}- Image galleries with modals, keyboard navigation, and lazy loading
          {'\n'}- Multi-step wizards and file uploads with preview and drag & drop
          {'\n'}- Responsive dashboards (user panel & custom admin panel)
          {'\n'}
          {'\n'}
          <span className="font-bold text-green-600">🖥️ Backend Development</span>
          {'\n'}
          {'\n'}
          <span className="font-bold">Core:</span> Node.js, Express.js, RESTful API architecture
          {'\n'}
          <span className="font-bold">Databases:</span> MongoDB, Mongoose, query optimization,
          indexing, aggregation pipelines
          {'\n'}
          <span className="font-bold">Auth & Security:</span> JWT (cookies + headers), bcrypt, rate
          limiting, CORS
          {'\n'}
          <span className="font-bold">Real-time:</span> Socket.IO (4 managers: connections,
          conversations, notifications, heartbeat)
          {'\n'}
          <span className="font-bold">Files & Media:</span> Supabase Storage, image optimization,
          PDF generation
          {'\n'}
          {'\n'}
          <span className="font-bold">Proven in practice:</span>
          {'\n'}- Enterprise rate limiting (HMAC-hashed keys, per-endpoint limits, DDoS protection)
          {'\n'}- WebSocket architecture (connection pooling, JWT auth, event deduplication)
          {'\n'}- Smart search engine (multi-factor scoring, 4-level sorting, query optimization)
          {'\n'}- Messaging system (file uploads, folders, read receipts, push/email notifications)
          {'\n'}- Two-factor authentication (email/SMS codes, token expiration, audit logs)
          {'\n'}
          {'\n'}
          <span className="font-bold text-orange-600">🛠️ DevOps & Production</span>
          {'\n'}
          {'\n'}
          <span className="font-bold">Server & Deployment:</span> end-to-end VPS setup, NGINX
          configuration (reverse proxy, SSL)
          {'\n'}
          <span className="font-bold">Process Management:</span> PM2 (auto-restart, clustering,
          monitoring), systemd services
          {'\n'}
          <span className="font-bold">Security:</span> SSL/TLS certificates (Let's Encrypt),
          firewall (UFW), SSH hardening
          {'\n'}
          <span className="font-bold">CI/CD:</span> Git hooks, automated deployment scripts,
          zero-downtime updates
          {'\n'}
          <span className="font-bold">Monitoring:</span> custom logging system, error tracking,
          performance metrics
          {'\n'}
          {'\n'}
          <span className="font-bold">Proven in practice:</span>
          {'\n'}- Full green-field deployment: VPS → NGINX → SSL → PM2 → domain routing
          {'\n'}- Reverse proxy setup for frontend + backend on separate ports
          {'\n'}- Automatic SSL renewal, backup strategies
          {'\n'}- Custom logging with rotation, production error monitoring
          {'\n'}
        </section>

        <section className="mb-6 whitespace-pre-line">
          <span className="font-bold text-sm">🚀 KEY PROJECTS</span>
          {'\n'}
          {'\n'}
          <span className="font-bold text-blue-600">Car Marketplace (2024–2025)</span>
          {'\n'}Enterprise platform for the automotive industry | 12 months of development
          {'\n'}
          {'\n'}
          <span className="font-bold">Scope of responsibility (solo developer):</span>
          {'\n'}✓ Full system architecture (frontend + backend + infrastructure)
          {'\n'}✓ 150+ React components, 80+ API endpoints, 30+ database collections/tables
          {'\n'}✓ Real-time features (Socket.IO): chat, notifications, live counters
          {'\n'}✓ Advanced search engine with multi-factor ranking algorithm
          {'\n'}✓ Admin panel with user management and content moderation
          {'\n'}✓ Payment integration, Email/SMS notifications, PDF generation
          {'\n'}✓ Production deployment: VPS setup, NGINX config, PM2 process management
          {'\n'}✓ Security: JWT auth, rate limiting, SQL/NoSQL injection prevention, XSS protection
          {'\n'}
          {'\n'}
          <span className="font-bold text-blue-600">Windows XP Portfolio (2025)</span>
          {'\n'}Interactive Windows-XP-inspired portfolio | Next.js 14 + TypeScript
          {'\n'}
          {'\n'}
          <span className="font-bold">Scope of responsibility (solo developer):</span>
          {'\n'}✓ Pixel-perfect recreation of the XP UI (50+ components, 5000+ lines of TS)
          {'\n'}✓ Desktop system: draggable windows, z-index orchestration, window stacking
          {'\n'}✓ Taskbar & Start Menu with animations, quick launch, system tray, live clock
          {'\n'}✓ Apps: Winamp player (equalizer, playlist), Gadu-Gadu simulator, Notepad
          {'\n'}✓ Boot sequence: BIOS, loading animation, welcome screen with audio
          {'\n'}✓ Glitch system: 6 visual effects (Matrix, RGB split, scanlines, pixelation)
          {'\n'}✓ Custom hooks architecture (useDesktopState, useGlitchTimer), TypeScript interfaces
          {'\n'}✓ Responsive design for mobile/tablet/desktop with touch support
          {'\n'}
        </section>

        <section className="mb-6 whitespace-pre-line">
          <span className="font-bold text-sm">🎯 WHAT SETS ME APART</span>
          {'\n'}
          {'\n'}✓ <span className="font-bold">End-to-end thinking</span> — I think about the whole
          product, not just the code
          {'\n'}✓ <span className="font-bold">User-first approach</span> — every feature is designed
          with UX first
          {'\n'}✓ <span className="font-bold">Clean-code advocate</span> — readability, testability,
          and maintainability
          {'\n'}✓ <span className="font-bold">Problem solver</span> — I decompose complex problems
          and deliver
          {'\n'}✓ <span className="font-bold">Self-directed learner</span> — I mastered full-stack
          development independently
          {'\n'}✓ <span className="font-bold">Production-ready mindset</span> — I code as if it
          ships tomorrow
          {'\n'}
        </section>

        <section className="mb-6 whitespace-pre-line">
          <span className="font-bold text-sm">🔍 WHAT I’M LOOKING FOR</span>
          {'\n'}
          {'\n'}
          I’m looking for a place to grow as a full-stack developer within a team of experienced
          engineers. I want to work on a product with real impact and learn best practices in a
          larger organization.
          {'\n'}I bring solid full-stack fundamentals, proven experience on a production-level
          project, and a strong work ethic. I’m looking for a team that values my solo-developer
          experience and helps me elevate my skills to the next level.
          {'\n'}
        </section>

        <section className="mb-4 whitespace-pre-line">
          <span className="font-bold text-sm">📞 CONTACT</span>
          {'\n'}
          {'\n'}
          <span className="font-bold">Email:</span> mateusz.goszczycki1994@gmail.com
          {'\n'}
          <span className="font-bold">Phone:</span> +48 516 223 029
          {'\n'}
          <span className="font-bold">GitHub:</span> github.com/Goniek94
          {'\n'}
          <span className="font-bold">Location:</span> Łowicz / Warsaw, Poland
          {'\n'}
          {'\n'}
          <span className="text-xs text-gray-600 italic">
            💡 Interactive portfolio — open the folders to explore more projects!
          </span>
          {'\n'}
        </section>
      </div>
    </>
  );
}
