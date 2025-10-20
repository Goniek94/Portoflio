// desktop/Folders/ProjectSubfolderSelection.tsx

import { ProjectSubfolder } from './types';

interface ProjectSubfolderSelectionProps {
  onOpen: (subfolder: ProjectSubfolder) => void;
  onClose: () => void;
}

export default function ProjectSubfolderSelection({
  onOpen,
  onClose,
}: ProjectSubfolderSelectionProps) {
  return (
    <div className="bg-white text-black w-full max-w-2xl rounded shadow-lg overflow-hidden">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-1 flex justify-between items-center">
        <span>📁 Moje Projekty</span>
        <button
          onClick={onClose}
          className="text-white hover:bg-blue-600 px-2 rounded"
          title="Wróć"
        >
          ← Wróć
        </button>
      </header>
      <main className="p-6">
        <h2 className="text-xl font-bold mb-6">Wybierz projekt:</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Marketplace */}
          <div
            onClick={() => onOpen('marketplace')}
            className="flex flex-col items-center cursor-pointer p-6 rounded hover:bg-blue-100 transition"
          >
            <div className="w-20 h-20 bg-blue-300 mb-3 flex items-center justify-center text-3xl">
              🚗
            </div>
            <span className="text-sm text-center font-semibold">Marketplace</span>
            <span className="text-xs text-gray-600 text-center mt-1">Platforma sprzedaży aut</span>
          </div>

          {/* Portfolio XP */}
          <div
            onClick={() => onOpen('portfolioxp')}
            className="flex flex-col items-center cursor-pointer p-6 rounded hover:bg-blue-100 transition"
          >
            <div className="w-20 h-20 bg-purple-300 mb-3 flex items-center justify-center text-3xl">
              🪟
            </div>
            <span className="text-sm text-center font-semibold">Portfolio XP</span>
            <span className="text-xs text-gray-600 text-center mt-1">Interaktywne portfolio</span>
          </div>
        </div>
      </main>
    </div>
  );
}
