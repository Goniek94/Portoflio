// desktop/Folders/FileSelection.tsx

import { FolderKey } from './types';

interface FileSelectionProps {
  viewed: Record<FolderKey, boolean>;
  onOpen: (key: FolderKey) => void;
}

export default function FileSelection({ viewed, onOpen }: FileSelectionProps) {
  return (
    <div className="bg-white text-black w-full max-w-2xl rounded shadow-lg overflow-hidden">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-1">
        Moje pliki
      </header>
      <main className="p-6">
        <h2 className="text-xl font-bold mb-6">Wybierz plik do otwarcia:</h2>
        {/* ZMIANA: grid-cols-3 → grid-cols-2 + justify-items-center */}
        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
          {(Object.keys(viewed) as FolderKey[]).map((key) => (
            <div
              key={key}
              onClick={() => onOpen(key)}
              className={`flex flex-col items-center cursor-pointer p-4 rounded transition-all ${
                viewed[key] ? 'bg-blue-50' : 'hover:bg-blue-100'
              }`}
            >
              <div className="w-20 h-20 bg-yellow-300 mb-3 flex items-center justify-center text-3xl rounded shadow">
                {key === 'aboutMe' ? '👤' : key === 'projects' ? '📁' : '🚗'}
              </div>
              <span className="text-sm text-center font-semibold">
                {key === 'aboutMe' ? 'O_mnie.txt' : key === 'projects' ? 'Projekty.txt' : '📁 Demo'}
              </span>
              {viewed[key] && (
                <span className="text-xs text-green-600 mt-1 font-bold">✓ Przejrzane</span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-red-600 font-bold text-sm">
          Aby Odzyskać System, przejrzyj wszystkie pliki!
        </p>
      </main>
    </div>
  );
}
