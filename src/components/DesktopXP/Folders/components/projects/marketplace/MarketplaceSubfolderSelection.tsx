// desktop/Folders/MarketplaceSubfolderSelection.tsx

import { MarketplaceSubfolder } from '../../../types';

interface MarketplaceSubfolderSelectionProps {
  onOpen: (subfolder: MarketplaceSubfolder) => void;
  onClose: () => void;
}

export default function MarketplaceSubfolderSelection({
  onOpen,
  onClose,
}: MarketplaceSubfolderSelectionProps) {
  return (
    <div className="bg-white text-black w-full max-w-2xl rounded shadow-lg overflow-hidden">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-1 flex justify-between items-center">
        <span>🚗 Car Marketplace</span>
        <button
          onClick={onClose}
          className="text-white hover:bg-blue-600 px-2 rounded"
          title="Wróć"
        >
          ← Back
        </button>
      </header>
      <main className="p-6">
        <h2 className="text-xl font-bold mb-6">Select a folder</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Zdjęcia */}
          <div
            onClick={() => onOpen('screenshots')}
            className="flex flex-col items-center cursor-pointer p-6 rounded hover:bg-blue-100 transition"
          >
            <div className="w-20 h-20 bg-blue-300 mb-3 flex items-center justify-center text-3xl">
              📸
            </div>
            <span className="text-sm text-center font-semibold">Project Screenshots</span>
            <span className="text-xs text-gray-600 text-center mt-1">Interface previews</span>
          </div>

          {/* Repo */}
          <div
            onClick={() => onOpen('repo')}
            className="flex flex-col items-center cursor-pointer p-6 rounded hover:bg-blue-100 transition"
          >
            <div className="w-20 h-20 bg-green-300 mb-3 flex items-center justify-center text-3xl">
              💻
            </div>
            <span className="text-sm text-center font-semibold">Project Repository</span>
            <span className="text-xs text-gray-600 text-center mt-1">Link to the source code</span>
          </div>
        </div>
      </main>
    </div>
  );
}
