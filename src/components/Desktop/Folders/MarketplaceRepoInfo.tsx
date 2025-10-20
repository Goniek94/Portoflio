// desktop/Folders/MarketplaceRepoInfo.tsx

import NotepadHeader from './NotepadHeader';
import NotepadMenu from './NotepadMenu';

interface MarketplaceRepoInfoProps {
  onClose: () => void;
}

export default function MarketplaceRepoInfo({ onClose }: MarketplaceRepoInfoProps) {
  const handleOpenRepo = () => {
    // TODO: Wstaw tutaj swój link do repo Marketplace
    window.open('https://github.com/twoj-username/marketplace-repo', '_blank');
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
          <span className="font-bold text-sm">💻 REPOZYTORIUM PROJEKTU</span>
          {'\n'}
          {'\n'}
          <span className="font-bold text-red-600">⚠️ Projekt objęty NDA</span>
          {'\n'}
          {'\n'}Kod źródłowy projektu jest dostępny w repozytorium prywatnym.{'\n'}Poniżej
          znajdziesz link do fragmentów kodu, które mogę udostępnić{'\n'}publicznie za zgodą
          klienta.{'\n'}
          {'\n'}
        </section>

        <section className="mb-6">
          <span className="font-bold text-sm">📂 CO ZNAJDZIESZ W REPO:</span>
          {'\n'}
          {'\n'}* Architektura aplikacji (frontend + backend){'\n'}* Przykładowe komponenty React
          {'\n'}* Konfiguracja API i middleware{'\n'}* Struktura bazy danych{'\n'}* Testy
          jednostkowe i integracyjne{'\n'}
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
