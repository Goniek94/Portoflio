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
    if (key === 'cv')
      return (
        <>
          <section className="mb-4">
            <span className="font-bold">Doświadczenie</span>
            {'\n'}
            - Programista Full-Stack (2022 – obecnie){'\n'}
            - Web Developer (2020 – 2022){'\n'}
            - Praktykant IT (2019 – 2020){'\n\n'}
          </section>
          <section className="mb-4">
            <span className="font-bold">Umiejętności</span>
            {'\n'}
            - TypeScript / React / Node.js{'\n'}
            - Tailwind CSS / HTML5 / CSS3{'\n'}
            - MongoDB / SQL / Firebase{'\n'}
            - Git / Docker / AWS{'\n\n'}
          </section>
          Edukacja: Informatyka, PW (2018-2022)
        </>
      );
    if (key === 'projects')
      return (
        <>
          <span className="font-bold">Projekty:</span>{'\n'}
          - Marketplace – platforma ogłoszeniowa (React, Node.js, MongoDB){'\n'}
          - E-commerce Shop – sklep z płatnościami (Next.js, Stripe, PostgreSQL){'\n'}
          - Portfolio XP – obecny projekt (React, TS, Tailwind)
        </>
      );
    return (
      <>
        Fan technologii i retro-gier.{'\n'}
        Front-end (React/TS) + back-end (Node).{'\n'}
        Po godzinach: eksperymenty z AI, gry, sci-fi.{'\n'}
        Otwarty na współpracę!
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
            current === 'cv'
              ? 'CV.txt'
              : current === 'projects'
              ? 'Projects.txt'
              : 'AboutMe.txt'
          )}
          {/* Menu Notatnika */}
          {notepadMenu}
          {/* Arkusz Notatnika */}
          <div className="px-4 py-2 bg-white h-80 font-mono text-xs text-black overflow-y-auto border-x border-b border-[#b5b5b5] whitespace-pre-wrap select-text">
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
        <div className="text-center space-y-6 bg-white/90 p-10 rounded-lg border shadow">
          <h2 className="text-3xl font-bold">Wszystkie pliki przejrzane!</h2>
          <button
            onClick={onFinish}
            className="bg-gray-900 text-white font-bold px-8 py-3 rounded hover:bg-gray-800 transition"
          >
            KONTYNUUJ
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
                    {key === 'cv' ? '📄' : key === 'projects' ? '📁' : '👤'}
                  </div>
                  <span className="text-sm">
                    {key === 'cv'
                      ? 'CV.txt'
                      : key === 'projects'
                      ? 'Projects.txt'
                      : 'AboutMe.txt'}
                  </span>
                  {viewed[key] && (
                    <span className="text-xs text-green-600">✓ Przejrzane</span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-red-600 font-bold text-sm">
              Aby Odzyskać System, przejrzyj wszystkie pliki!
            </p>
          </main>
        </div>
      )}
    </div>
  );
}
