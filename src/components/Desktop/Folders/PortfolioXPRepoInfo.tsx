// desktop/Folders/PortfolioXPRepoInfo.tsx

import NotepadHeader from './NotepadHeader';
import NotepadMenu from './NotepadMenu';

interface PortfolioXPRepoInfoProps {
  onClose: () => void;
}

export default function PortfolioXPRepoInfo({ onClose }: PortfolioXPRepoInfoProps) {
  const handleOpenRepo = () => {
    // TODO: Wstaw tutaj link do repo Portfolio XP
    window.open('https://github.com/twoj-username/portfolio-xp', '_blank');
  };

  return (
    <div className="w-full max-w-2xl rounded border-2 border-[#7a7a7a] shadow-xl bg-[#f6f6f6]">
      <NotepadHeader fileName="Repozytorium.txt" onClose={onClose} />
      <NotepadMenu />

      <div
        className="px-4 py-2 bg-white h-80 font-mono text-xs text-black overflow-y-scroll border-x border-b border-[#b5b5b5] whitespace-pre-wrap select-text notepad-content"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#c0c0c0 #f0f0f0',
        }}
      >
        <section className="mb-6">
          <span className="font-bold text-sm">💻 REPOZYTORIUM - PORTFOLIO XP</span>
          {'\n'}
          {'\n'}Kod źródłowy tego projektu jest dostępny publicznie na GitHub.{'\n'}Poniżej
          znajdziesz link do pełnego repozytorium.{'\n'}
          {'\n'}
        </section>

        <section className="mb-6">
          <span className="font-bold text-sm">📂 CO ZNAJDZIESZ W REPO:</span>
          {'\n'}
          {'\n'}* Struktura projektu Next.js 15 (App Router){'\n'}* Komponenty Windows XP (Desktop,
          Start Menu, Taskbar, Windows){'\n'}* Aplikacje (Winamp, Gadu-Gadu, Notatnik)
          {'\n'}* Animacje i efekty (Glitch, Boot, BSOD){'\n'}* State management (useState,
          useCallback)
          {'\n'}* Stylizacja Tailwind CSS + custom scrollbary XP{'\n'}
          {'\n'}
        </section>

        <section className="mb-6">
          <span className="font-bold text-sm">📸 A CO ZE ZDJĘCIAMI?</span>
          {'\n'}
          {'\n'}
          <span className="text-red-600 font-bold">
            😄 Nie ma zdjęć, bo właśnie przegladasz to portfolio!
          </span>
          {'\n'}
          {'\n'}Zamiast screenshotów - możesz po prostu kliknąć w różne ikony{'\n'}na pulpicie i
          zobaczyć projekt w akcji. To żywa demonstracja!{'\n'}
          {'\n'}
        </section>

        <section className="mb-4">
          <span className="font-bold text-sm">🔗 LINK DO REPOZYTORIUM:</span>
          {'\n'}
          {'\n'}Kliknij przycisk poniżej, aby otworzyć repozytorium w nowej karcie.{'\n'}
          {'\n'}
        </section>
      </div>

      <div className="flex items-center justify-between text-[10px] px-3 py-1 bg-[#f3f3f3] border-t border-[#c3c3c3]">
        <span>Wiersz 1, kolumna 1</span>
        <div className="flex gap-2">
          <button
            onClick={handleOpenRepo}
            className="bg-green-700 text-white text-xs px-4 py-1 rounded hover:bg-green-600 transition flex items-center gap-1"
          >
            <span>🔗</span>
            <span>Otwórz GitHub</span>
          </button>
          <button
            onClick={onClose}
            className="bg-blue-700 text-white text-xs px-4 py-1 rounded hover:bg-blue-600 transition"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
