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
        <section className="mb-6">
          <span className="font-bold text-sm">👋 ABOUT ME</span>
          {'\n'}
          {'\n'}
          Fullstack Developer with a passion for building complete web solutions — from UX{'\n'}to
          backend architecture. Over the past year, I independently built an enterprise{'\n'}
          marketplace platform for the automotive industry, taking responsibility for every aspect
          {'\n'}of the project: from UI design, through business logic, to production deployment.
          {'\n'}
          {'\n'}Previously, I worked for several years as an instructor-chef at a Vocational
          {'\n'}Activity Center, managing the kitchen and supervising over 20 people{'\n'}with
          disabilities. This experience taught me organization, patience,{'\n'}empathy, and a
          systematic approach to complex tasks — skills that{'\n'}translate exceptionally well to
          programming and teamwork.{'\n'}
          {'\n'}
        </section>

        <section className="mb-6">
          <span className="font-bold text-sm">💻 TECH STACK & DOŚWIADCZENIE</span>
          {'\n'}
          {'\n'}
          <span className="font-bold text-blue-600">⚛️ Frontend Development</span>
          {'\n'}
          {'\n'}
          <span className="font-bold">Core:</span> React 18 (Hooks, Context API, Custom Hooks),
          TypeScript (strict mode), Next.js 14 (App Router){'\n'}
          <span className="font-bold">Styling:</span> Tailwind CSS, CSS Modules, Responsive Design
          (Mobile-first){'\n'}
          <span className="font-bold">State & Data:</span> Complex state management (30+ form
          fields), Real-time WebSocket{'\n'}
          <span className="font-bold">UI/UX:</span> Component composition, Adaptive layouts,
          Progressive Web Apps{'\n'}
          <span className="font-bold">Routing:</span> React Router, Dynamic routing, Protected
          routes, URL state sync{'\n'}
          {'\n'}
          <span className="font-bold">Proven in practice:</span>
          {'\n'}-Advanced forms with cascading dependencies (brand → model → generation){'\n'}-
          Real-time systems (notifications, chat, counters) using Socket.IO{'\n'}- Image galleries
          with modals, keyboard navigation, and lazy loading{'\n'}-Multi-step wizards and file
          uploads with preview and drag & drop{'\n'}- Responsive dashboards (user panel & custom
          admin panel) {'\n'}
          {'\n'}
          <span className="font-bold text-green-600">🖥️ Backend Development</span>
          {'\n'}
          {'\n'}
          <span className="font-bold">Core:</span> Node.js, Express.js, RESTful API Architecture
          {'\n'}
          <span className="font-bold">Databases:</span> MongoDB, Mongoose, Query optimization,
          Indexing, Aggregation pipelines{'\n'}
          <span className="font-bold">Auth & Security:</span> JWT (cookies + headers), bcrypt, Rate
          limiting, CORS{'\n'}
          <span className="font-bold">Real-time:</span> Socket.IO (4 managers: connections,
          conversations, notifications, heartbeat){'\n'}
          <span className="font-bold">Files & Media:</span> Supabase Storage, Image optimization,
          PDF generation{'\n'}
          {'\n'}
          <span className="font-bold">Proven in practice:</span>
          {'\n'}- Enterprise rate limiting (HMAC-hashed keys, per-endpoint limits, DDoS protection)
          {'\n'}- WebSocket architecture (connection pooling, JWT auth, event deduplication){'\n'}-
          Smart search engine (multi-factor scoring, 4-level sorting, query optimization){'\n'}-
          Messaging system (file uploads, folders, read receipts, push/email notifications){'\n'}-
          Two-factor authentication (email/SMS codes, token expiration, audit logs){'\n'}
          {'\n'}
          <span className="font-bold text-orange-600">🛠️ DevOps & Production</span>
          {'\n'}
          {'\n'}
          <span className="font-bold">Server & Deployment:</span> VPS setup od podstaw, NGINX
          konfiguracja (reverse proxy, SSL){'\n'}
          <span className="font-bold">Process Management:</span> PM2 (auto-restart, clustering,
          monitoring), systemd services{'\n'}
          <span className="font-bold">Security:</span> SSL/TLS certificates (Let's Encrypt),
          Firewall (UFW), SSH hardening{'\n'}
          <span className="font-bold">CI/CD:</span> Git hooks, automated deployment scripts,
          zero-downtime updates{'\n'}
          <span className="font-bold">Monitoring:</span> Custom logging system, error tracking,
          performance metrics{'\n'}
          {'\n'}
          <span className="font-bold">Sprawdzone w praktyce:</span>
          {'\n'}- Kompletne wdrożenie od zera: VPS → NGINX → SSL → PM2 → domain routing{'\n'}-
          Konfiguracja reverse proxy dla frontend + backend na różnych portach{'\n'}- Automatyczne
          odnowienie certyfikatów SSL, backup strategies{'\n'}- Custom logging z rotacją, monitoring
          błędów w produkcji{'\n'}
          {'\n'}
        </section>

        <section className="mb-6">
          <span className="font-bold text-sm">🚀 KLUCZOWE PROJEKTY</span>
          {'\n'}
          {'\n'}
          <span className="font-bold text-blue-600">Marketplace Samochodowy (2024-2025)</span>
          {'\n'}Enterprise platform dla branży motoryzacyjnej | 12 miesięcy development{'\n'}
          {'\n'}
          <span className="font-bold">Zakres odpowiedzialności (solo developer):</span>
          {'\n'}✓ Pełna architektura systemu (frontend + backend + infrastructure){'\n'}✓ 150+
          komponentów React, 80+ API endpoints, 30+ tabel bazodanowych{'\n'}✓ Real-time features
          (Socket.IO): chat, notifications, live counters{'\n'}✓ Advanced search engine z
          multi-factor ranking algorithm{'\n'}✓ Admin panel z zarządzaniem użytkownikami i moderacją
          treści{'\n'}✓ Payment integration, Email/SMS notifications, PDF generation
          {'\n'}✓ Production deployment: VPS setup, NGINX config, PM2 process management{'\n'}✓
          Security: JWT auth, rate limiting, SQL injection prevention, XSS protection{'\n'}
          {'\n'}
          <span className="font-bold text-blue-600">Windows XP Portfolio (2025)</span>
          {'\n'}Interaktywne portfolio w stylu Windows XP | Next.js 14 + TypeScript{'\n'}
          {'\n'}
          <span className="font-bold">Zakres odpowiedzialności (solo developer):</span>
          {'\n'}✓ Pixel-perfect recreation Windows XP UI (50+ komponentów, 5000+ linii TS){'\n'}✓
          Desktop system: draggable windows, z-index orchestration, window stacking{'\n'}✓ Taskbar &
          Start Menu z animacjami, quick launch, system tray, live clock{'\n'}✓ Aplikacje: Winamp
          player (equalizer, playlist), Gadu-Gadu simulator, Notatnik{'\n'}✓ Boot sequence: BIOS,
          loading animation, welcome screen z audio{'\n'}✓ Glitch system: 6 efektów wizualnych
          (Matrix, RGB split, scanlines, pixelation){'\n'}✓ Custom hooks architecture
          (useDesktopState, useGlitchTimer), TypeScript interfaces{'\n'}✓ Responsive design
          adaptujący się do mobile/tablet/desktop z touch support{'\n'}
          {'\n'}
        </section>

        <section className="mb-6">
          <span className="font-bold text-sm">🎯 CO WYRÓŻNIA MOJE PODEJŚCIE</span>
          {'\n'}
          {'\n'}✓ <span className="font-bold">End-to-end thinking</span> - myślę o całym produkcie,
          nie tylko o kodzie{'\n'}✓ <span className="font-bold">User-first approach</span> - każda
          funkcja jest projektowana z UX na pierwszym miejscu{'\n'}✓{' '}
          <span className="font-bold">Clean code advocate</span> - czytelność, testowalność i
          maintainability to priorytety{'\n'}✓ <span className="font-bold">Problem solver</span> -
          nie boję się złożonych problemów, rozbijam je na części{'\n'}✓{' '}
          <span className="font-bold">Self-directed learner</span> - samodzielnie opanowałem
          fullstack development{'\n'}✓ <span className="font-bold">Production-ready mindset</span> -
          koduję tak jakby to miało iść na produkcję jutro{'\n'}
          {'\n'}
        </section>

        <section className="mb-6">
          <span className="font-bold text-sm">🔍 CZEGO SZUKAM</span>
          {'\n'}
          {'\n'}Szukam miejsca gdzie będę mógł rozwijać się jako fullstack developer{'\n'}w zespole
          doświadczonych programistów. Chcę pracować nad produktem który{'\n'}ma realny impact i
          uczyć się best practices w większej organizacji.{'\n'}
          {'\n'}Oferuję solidne fundamenty fullstack, proven experience z produkcyjnym projektem
          {'\n'}i gotowość do ciężkiej pracy. Szukam zespołu który doceni moje doświadczenie
          {'\n'}solo developera i pomoże mi wznieść umiejętności na wyższy poziom.{'\n'}
          {'\n'}
        </section>

        <section className="mb-4">
          <span className="font-bold text-sm">📞 KONTAKT</span>
          {'\n'}
          {'\n'}
          <span className="font-bold">Email:</span> mateusz.goszczycki1994@gmail.com{'\n'}
          <span className="font-bold">Telefon:</span> +48 516 223 029{'\n'}
          <span className="font-bold">GitHub:</span> github.com/Goniek94{'\n'}
          <span className="font-bold">Lokalizacja:</span> Łowicz / Warszawa, Polska{'\n'}
          {'\n'}
          <span className="text-xs text-gray-600 italic">
            💡 Portfolio interaktywne - kliknij foldery aby zobaczyć więcej projektów!
          </span>
          {'\n'}
        </section>
      </div>
    </>
  );
}
