// desktop/Folders/FileSelection.tsx

import { FolderKey } from '../../types';

interface FileSelectionProps {
  viewed: Record<FolderKey, boolean>;
  onOpen: (key: FolderKey) => void;
  allDone?: boolean;
  onFinish?: () => void;
}

export default function FileSelection({ viewed, onOpen, allDone, onFinish }: FileSelectionProps) {
  return (
    <div className="bg-white text-black w-full max-w-2xl rounded shadow-lg overflow-hidden">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-1">
        My Files
      </header>
      <main className="p-6">
        <h2 className="text-xl font-bold mb-6">Choose a file to open:</h2>
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
                {key === 'aboutMe'
                  ? 'About_Me.txt'
                  : key === 'projects'
                    ? 'Projects.txt'
                    : '📁 Demo'}
              </span>
              {viewed[key] && (
                <span className="text-xs text-green-600 mt-1 font-bold">✓ Reviewed</span>
              )}
            </div>
          ))}
        </div>
        {allDone ? (
          <div className="mt-8 text-center space-y-4">
            <p className="text-green-600 font-bold text-lg">✓ All files reviewed!</p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 text-left text-sm">
              <p className="font-semibold text-blue-800 mb-2">💡 Tip:</p>
              <p className="text-gray-700 leading-relaxed">
                Feel free to explore other desktop icons like <strong>Winamp</strong>,{' '}
                <strong>Gadu-Gadu</strong>, and more! I plan to complete the portfolio in the
                future, but I&apos;m currently <strong>actively seeking employment</strong>.
              </p>
              <p className="text-gray-700 mt-2">
                You can also review <strong>Projects</strong> and <strong>About Me</strong> again
                anytime!
              </p>
            </div>

            <p className="text-xl font-bold text-blue-600">ENJOY! 🎉</p>

            <button
              onClick={onFinish}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded shadow-lg transition-all transform hover:scale-105"
            >
              Continue to desktop →
            </button>
          </div>
        ) : (
          <p className="mt-8 text-center text-red-600 font-bold text-sm">
            To unlock the system, review all files!
          </p>
        )}
      </main>
    </div>
  );
}
