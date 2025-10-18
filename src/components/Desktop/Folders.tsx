/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';

type FolderKey = 'cv' | 'projects' | 'aboutMe';

interface FoldersProps {
  onFinish?: () => void;
}

export default function Folders({ onFinish }: FoldersProps) {
  const [viewed, setViewed] = useState<Record<FolderKey, boolean>>({
    cv: false,
    projects: false,
    aboutMe: false,
  });
  const [current, setCurrent] = useState<FolderKey | null>(null);
  const allDone = Object.values(viewed).every(Boolean);

  const openFolder = (key: FolderKey) => {
    setCurrent(key);
    setViewed((v) => ({ ...v, [key]: true }));
  };
  const closeFolder = () => setCurrent(null);

  // ------ Notatnik XP header ------
  const notepadHeader = (file: string) => (
    <div className="flex items-center justify-between px-2 py-1 bg-[#0a246a] border-b border-[#f6f6f6] relative">
      <span className="text-white font-bold tracking-wide text-xs select-none">
        {file} - Notatnik
      </span>
      <div className="flex space-x-1">
        <button
          onClick={closeFolder}
          className="w-7 h-7 flex items-center justify-center bg-[#e81123] border border-[#888] rounded-sm shadow hover:bg-[#e34a4a] transition"
          title="Zamknij"
        >
          <span className="text-white text-xl font-bold -mt-[2px]">×</span>
        </button>
      </div>
    </div>
  );

  // ------ Notatnik XP menu ------
  const notepadMenu = (
    <div className="flex gap-4 pl-2 bg-[#f6f6f6] border-b border-[#b5b5b5] text-xs font-bold text-[#2d2d2d] select-none h-7 items-center">
      <span className="hover:bg-[#cbe8fa] px-1 rounded cursor-default">Plik</span>
      <span className="hover:bg-[#cbe8fa] px-1 rounded cursor-default">Edycja</span>
      <span className="hover:bg-[#cbe8fa] px-1 rounded cursor-default">Format</span>
      <span className="hover:bg-[#cbe8fa] px-1 rounded cursor-default">Widok</span>
      <span className="hover:bg-[#cbe8fa] px-1 rounded cursor-default">Pomoc</span>
    </div>
  );

  // ------ Treść plików ------
  const folderBody = (key: FolderKey) => {
    if (key === 'aboutMe')
      return (
        <>
          <section className="mb-6">
            <span className="font-bold text-sm">👨‍💻 DANE OSOBOWE</span>
            {'\n'}
            {'\n'}
            <span className="font-bold">Imię i nazwisko:</span> Mateusz Goszczycki{'\n'}
            <span className="font-bold">Data urodzenia:</span> 22.10.1994{'\n'}
            <span className="font-bold">Email:</span> Mateusz.goszczycki1994@gmail.com{'\n'}
            <span className="font-bold">Telefon:</span> [DO UZUPEŁNIENIA]{'\n'}
            <span className="font-bold">Lokalizacja:</span> Gdynia, Polska{'\n'}
            {'\n'}
          </section>

          <section className="mb-6">
            <span className="font-bold text-sm">💼 DOŚWIADCZENIE</span>
            {'\n'}
            {'\n'}
            <span className="font-bold">[STANOWISKO] - [FIRMA]</span>
            {'\n'}[DATA OD] - [DATA DO / obecnie]{'\n'}
            {'\n'}* [OPIS OBOWIĄZKÓW 1]{'\n'}* [OPIS OBOWIĄZKÓW 2]{'\n'}* [OPIS OBOWIĄZKÓW 3]{'\n'}
            {'\n'}
            <span className="font-bold">[POPRZEDNIE STANOWISKO]</span>
            {'\n'}[FIRMA | DATA]{'\n'}* [OPIS]{'\n'}
            {'\n'}
          </section>

          <section className="mb-6">
            <span className="font-bold text-sm">🛠️ UMIEJĘTNOŚCI</span>
            {'\n'}
            {'\n'}
            <span className="font-bold">Frontend:</span>
            {'\n'}React, TypeScript, Next.js, Tailwind CSS, Socket.IO{'\n'}
            {'\n'}
            <span className="font-bold">Backend:</span>
            {'\n'}Node.js, Express, MongoDB, REST API, WebSocket{'\n'}
            {'\n'}
            <span className="font-bold">DevOps & Tools:</span>
            {'\n'}Docker, Git, CI/CD, ESLint, Webpack{'\n'}
            {'\n'}
          </section>

          <section className="mb-4">
            <span className="font-bold text-sm">🔗 LINKI</span>
            {'\n'}
            {'\n'}
            <span className="font-bold">GitHub:</span> github.com/[UZUPEŁNIJ]{'\n'}
            <span className="font-bold">LinkedIn:</span> linkedin.com/in/[UZUPEŁNIJ]{'\n'}
            <span className="font-bold">Portfolio:</span> [UZUPEŁNIJ]{'\n'}
          </section>
        </>
      );

    if (key === 'projects')
      return (
        <>
          <section className="mb-6">
            <span className="font-bold text-sm">🚗 MARKETPLACE SAMOCHODOWY</span>
            {'\n'}
            {'\n'}
            Pełna platforma ogłoszeniowa do kupna i sprzedaży samochodów{'\n'}z zaawansowaną
            wyszukiwarką i systemem realtime.{'\n'}
            {'\n'}
            <span className="font-bold">Tech Stack:</span>
            {'\n'}* Frontend: React 18.2 + TypeScript, Tailwind CSS, React Router 6.28{'\n'}*
            Backend: Node.js, Express, MongoDB{'\n'}* Realtime: Socket.IO (powiadomienia, live
            updates){'\n'}* UI: MUI, Headless UI, Heroicons, lucide-react{'\n'}* Tools: Axios
            (interceptory, retry, cookies), PWA, react-toastify{'\n'}
            {'\n'}
            <span className="font-bold">Zakres odpowiedzialności:</span>
            {'\n'}* Projekt i wdrożenie pełnej architektury aplikacji (FE, BE, DevOps){'\n'}*
            Obsługa wszystkich warstw: UI, API, autoryzacja, baza danych, realtime{'\n'}* Integracje
            zewnętrzne (płatności, zewnętrzne API){'\n'}* Praca z kodem produkcyjnym: optymalizacja,
            bezpieczeństwo, wersjonowanie{'\n'}
            {'\n'}
            <span className="font-bold">Kluczowe funkcjonalności:</span>
            {'\n'}* Zaawansowana wyszukiwarka z filtrami (marka, model, generacja, parametry){'\n'}*
            System powiadomień realtime (HTTP + WebSocket){'\n'}* Ulubione z sync localStorage +
            backend{'\n'}* Panel użytkownika z historią przeglądania{'\n'}* System komentarzy i
            podobnych ofert{'\n'}* PWA z offline support i auto-update{'\n'}* Responsywna nawigacja
            z licznikami powiadomień{'\n'}
            {'\n'}
            <span className="font-bold">Architektura:</span>
            {'\n'}* Aplikacja modułowa z leniwie ładowanymi widokami{'\n'}* Konteksty: autoryzacja
            (HttpOnly cookies), powiadomienia, ulubione{'\n'}* apiClient z retry, refresh tokenów,
            cache, custom headers{'\n'}* Komponenty komunikują się z backend w czasie rzeczywistym
            {'\n'}
            {'\n'}
          </section>

          <section className="mb-4">
            <span className="font-bold text-sm">🪟 PORTFOLIO XP (ten projekt!)</span>
            {'\n'}
            {'\n'}
            Interaktywne portfolio w stylu Windows XP - nostalgiczna podróż{'\n'}do świata
            komputerów z lat 2000.{'\n'}
            {'\n'}
            <span className="font-bold">Tech Stack:</span>
            {'\n'}* Next.js 14, React 18, TypeScript{'\n'}* Tailwind CSS{'\n'}
            {'\n'}
            <span className="font-bold">Features:</span>
            {'\n'}* Symulacja boot screen Windows XP z progress barem{'\n'}* System okien z drag &
            drop (przeciąganie, minimalizowanie){'\n'}* Działające aplikacje nostalgiczne: Winamp,
            Gadu-Gadu, gry retro{'\n'}* Glitch effects i easter eggs (Crazy Frog virus!){'\n'}*
            System wirusa Crazy Frog z animacjami{'\n'}* Responsywny taskbar i Start Menu{'\n'}*
            Notatnik w stylu XP z 3 plikami do przejrzenia{'\n'}* Ikony w stylu Windows XP,
            autentyczne dźwięki systemu{'\n'}
            {'\n'}
            <span className="font-bold">Easter Eggs:</span>
            {'\n'}* Crazy Frog jako "wirus" z możliwością usunięcia{'\n'}* Winamp z odtwarzaniem
            muzyki{'\n'}* Gadu-Gadu z symulacją czatu{'\n'}* Retro gry (Paint, Minesweeper){'\n'}
          </section>
        </>
      );

    // CV
    return (
      <>
        <section className="mb-6">
          <span className="font-bold text-sm">🧠 ZAKRES ODPOWIEDZIALNOŚCI</span>
          {'\n'}
          {'\n'}* Projekt i wdrożenie architektury aplikacji (frontend, backend, DevOps).{'\n'}*
          Obsługa wszystkich warstw: UI, API, autoryzacja, baza danych, realtime.{'\n'}* Integracje
          z zewnętrznymi usługami (Płatności, zewnętrzne API).{'\n'}* Praca z kodem produkcyjnym:
          optymalizacja, bezpieczeństwo, wersjonowanie.{'\n'}
          {'\n'}
        </section>

        <section className="mb-6">
          <span className="font-bold text-sm">🖥 FRONTEND</span>
          {'\n'}
          {'\n'}* React 18.2 + TypeScript, React Router 6.28, Create React App.{'\n'}* Tailwind CSS
          z custom breakpoints i plugins (typography, animations).{'\n'}* Komponenty UI: MUI,
          Headless UI, Heroicons, lucide-react.{'\n'}* Axios z interceptorami (obsługa 401/431,
          retry, cookies).{'\n'}* Socket.io-client do komunikacji realtime.{'\n'}* PWA: service
          worker, detekcja aktualizacji, dedykowany przycisk instalacji.{'\n'}* UX tools:
          react-toastify, notistack.{'\n'}* Dev: ESLint, Babel, autoprefixer,
          webpack-bundle-analyzer.{'\n'}
          {'\n'}
        </section>

        <section className="mb-6">
          <span className="font-bold text-sm">📦 ARCHITEKTURA APLIKACJI</span>
          {'\n'}
          {'\n'}* Aplikacja zorganizowana modułowo: App.js centralnie łączy router,{'\n'}
          {'  '}leniwe widoki i warstwy kontekstowe.{'\n'}* Konteksty: autoryzacja (HttpOnly
          cookies), powiadomienia, ulubione,{'\n'}
          {'  '}socket, formularz ogłoszeń, mobilne menu, responsywność.{'\n'}* Obsługa stanu
          aplikacji + realtime przez NotificationService,{'\n'}
          {'  '}SocketContext, FavoritesContext (localStorage + backend sync).{'\n'}
          {'\n'}
        </section>

        <section className="mb-6">
          <span className="font-bold text-sm">⚙️ KLUCZOWE FUNKCJONALNOŚCI</span>
          {'\n'}
          {'\n'}* Wyszukiwarka i filtry: SearchFormUpdated (marka, model, generacja,{'\n'}
          {'  '}technikalia), useFilterCounts, BasicFilters, useCarData (z fallbackiem cache).
          {'\n'}* Lista ogłoszeń: ListingsPage z sortowaniem, integracją ulubionych,{'\n'}
          {'  '}dopasowaniem wyników.{'\n'}* Widok szczegółowy: ListingDetails — dane, komentarze,
          podobne oferty,{'\n'}
          {'  '}historia przeglądania.{'\n'}* System powiadomień i ulubionych: HTTP + WebSocket,
          notyfikacje dla{'\n'}
          {'  '}właścicieli ogłoszeń.{'\n'}* Karta ogłoszenia: ListingCard – responsywna prezentacja
          danych{'\n'}
          {'  '}z szybkim dodaniem do ulubionych.{'\n'}* Responsywna nawigacja z dostępem do panelu
          użytkownika, licznikiem{'\n'}
          {'  '}powiadomień i modalem logowania.{'\n'}
          {'\n'}
        </section>

        <section className="mb-6">
          <span className="font-bold text-sm">🌐 INTEGRACJA Z BACKENDEM</span>
          {'\n'}
          {'\n'}* apiClient: obsługuje retry, refresh tokenów, cache, cookies (HttpOnly),{'\n'}
          {'  '}custom nagłówki.{'\n'}* AdsService: wszystkie endpointy ogłoszeń (liczniki, rotacje,
          multimedia,{'\n'}
          {'  '}statusy).{'\n'}* CarDataService: dane marek/modeli/generacji z fallbackiem.{'\n'}*
          NotificationService: REST + Socket.IO – aktualizacja stanu i toastów w UI.{'\n'}*
          Komponenty i konteksty komunikują się z backendem i reagują na akcje{'\n'}
          {'  '}użytkowników w czasie rzeczywistym.{'\n'}
          {'\n'}
        </section>

        <section className="mb-4">
          <span className="font-bold text-sm">🌱 ROZWÓJ</span>
          {'\n'}
          {'\n'}
          Stale rozwijam swoje umiejętności pracując nad nowymi projektami{'\n'}i eksperymentując z
          najnowszymi technologiami frontendowymi.{'\n'}
        </section>
      </>
    );
  };

  // ------ RENDER ------
  return (
    <div className="fixed inset-0 bg-blue-600/90 flex flex-col items-center justify-center p-8 z-50">
      {/* Notatnik XP window */}
      {current ? (
        <div className="w-full max-w-2xl rounded border-2 border-[#7a7a7a] shadow-xl bg-[#f6f6f6]">
          {/* Pasek tytułu */}
          {notepadHeader(
            current === 'aboutMe'
              ? 'AboutMe.txt'
              : current === 'projects'
                ? 'Projects.txt'
                : 'CV.txt'
          )}
          {/* Menu Notatnika */}
          {notepadMenu}
          {/* Arkusz Notatnika */}
          <div
            className="px-4 py-2 bg-white h-80 font-mono text-xs text-black overflow-y-scroll border-x border-b border-[#b5b5b5] whitespace-pre-wrap select-text notepad-content"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#c0c0c0 #f0f0f0',
            }}
          >
            {folderBody(current)}
          </div>
          {/* Dolny pasek, jak w notatniku */}
          <div className="flex items-center justify-between text-[10px] px-3 py-1 bg-[#f3f3f3] border-t border-[#c3c3c3]">
            <span>Wiersz 1, kolumna 1</span>
            <button
              onClick={closeFolder}
              className="bg-blue-700 text-white text-xs px-4 py-1 rounded hover:bg-blue-600 transition"
            >
              Zamknij
            </button>
          </div>
        </div>
      ) : allDone ? (
        <div className="text-center space-y-6 bg-gradient-to-br from-green-50 to-blue-50 p-10 rounded-lg border-2 border-green-500 shadow-2xl max-w-xl">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-4xl">✅</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-green-700">System Odzyskany!</h2>
          <div className="space-y-3 text-gray-700 text-left bg-white/50 p-5 rounded-lg">
            <p className="text-center font-semibold text-lg text-blue-800">
              🎮 Zapraszam w podróż do lat 2000! 🎮
            </p>
            <p className="leading-relaxed">
              Na pulpicie czeka prawdziwa nostalgiczna przygoda. <strong>Kliknij w ikonki</strong> -
              każda z nich kryje coś wyjątkowego:
            </p>
            <ul className="space-y-2 pl-4">
              <li>
                🎵 <strong>Winamp</strong> z hitami z lat 2000
              </li>
              <li>
                💬 <strong>Gadu-Gadu</strong> - kultowy komunikator
              </li>
              <li>
                🎯 <strong>Gry retro</strong> - CS 1.6, Tibia, GTA San Andreas
              </li>
              <li>
                🎨 <strong>Easter eggs</strong> - warto eksplorować!
              </li>
            </ul>
            <p className="text-center text-sm italic text-gray-600 pt-2">
              Nie jest to zwykłe portfolio - to interaktywne doświadczenie! 🚀
            </p>
          </div>
          <button
            onClick={onFinish}
            className="group relative bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold px-10 py-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform">🚀</span>
            <span className="text-lg">URUCHOM PULPIT</span>
            <span className="text-2xl group-hover:-rotate-12 transition-transform">💻</span>
          </button>
        </div>
      ) : (
        <div className="bg-white text-black w-full max-w-2xl rounded shadow-lg overflow-hidden">
          <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-1">
            Moje pliki
          </header>
          <main className="p-6">
            <h2 className="text-xl font-bold mb-6">Wybierz plik do otwarcia:</h2>
            <div className="grid grid-cols-3 gap-6">
              {(Object.keys(viewed) as FolderKey[]).map((key) => (
                <div
                  key={key}
                  onClick={() => openFolder(key)}
                  className={`flex flex-col items-center cursor-pointer p-3 rounded ${
                    viewed[key] ? 'bg-blue-50' : 'hover:bg-blue-100'
                  }`}
                >
                  <div className="w-16 h-16 bg-yellow-300 mb-2 flex items-center justify-center text-2xl">
                    {key === 'aboutMe' ? '👤' : key === 'projects' ? '📁' : '📄'}
                  </div>
                  <span className="text-sm">
                    {key === 'aboutMe'
                      ? 'AboutMe.txt'
                      : key === 'projects'
                        ? 'Projects.txt'
                        : 'CV.txt'}
                  </span>
                  {viewed[key] && <span className="text-xs text-green-600">✓ Przejrzane</span>}
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-red-600 font-bold text-sm">
              Aby Odzyskać System, przejrzyj wszystkie pliki!
            </p>
          </main>
        </div>
      )}

      {/* Style dla scrollbara Windows XP */}
      <style jsx>{`
        .notepad-content::-webkit-scrollbar {
          width: 16px;
          background-color: #f0f0f0;
        }

        .notepad-content::-webkit-scrollbar-track {
          background-color: #f0f0f0;
          border-left: 1px solid #c0c0c0;
        }

        .notepad-content::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #e0e0e0, #c0c0c0);
          border: 1px outset #d0d0d0;
          border-radius: 1px;
        }

        .notepad-content::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to right, #d0d0d0, #b0b0b0);
        }

        .notepad-content::-webkit-scrollbar-button {
          height: 16px;
          background-color: #e0e0e0;
          border: 1px outset #d0d0d0;
        }

        .notepad-content::-webkit-scrollbar-button:vertical:decrement {
          background: #e0e0e0
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M8 6 L12 10 L4 10 Z" fill="%23000"/></svg>')
            center no-repeat;
        }

        .notepad-content::-webkit-scrollbar-button:vertical:increment {
          background: #e0e0e0
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M8 10 L12 6 L4 6 Z" fill="%23000"/></svg>')
            center no-repeat;
        }
      `}</style>
    </div>
  );
}
