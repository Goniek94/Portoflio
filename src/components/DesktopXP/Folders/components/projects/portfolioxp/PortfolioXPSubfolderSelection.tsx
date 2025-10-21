// desktop/Folders/PortfolioXPSubfolderSelection.tsx
import { PortfolioXPSubfolder } from '../../../types';

interface PortfolioXPSubfolderSelectionProps {
  onOpen: (subfolder: PortfolioXPSubfolder) => void;
  onClose: () => void;
}

export default function PortfolioXPSubfolderSelection({
  onOpen,
  onClose,
}: PortfolioXPSubfolderSelectionProps) {
  const handleOpen = (key: PortfolioXPSubfolder) => () => onOpen(key);

  const Tile: React.FC<{
    onClick: () => void;
    emoji: string;
    title: string;
    subtitle: string;
    bgClass: string;
  }> = ({ onClick, emoji, title, subtitle, bgClass }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center p-6 rounded border border-transparent hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition"
      aria-label={title}
    >
      <div
        className={`w-20 h-20 ${bgClass} mb-3 flex items-center justify-center text-3xl rounded`}
      >
        <span aria-hidden>{emoji}</span>
      </div>
      <span className="text-sm text-center font-semibold">{title}</span>
      <span className="text-xs text-gray-600 text-center mt-1">{subtitle}</span>
    </button>
  );

  return (
    <div className="bg-white text-black w-full max-w-2xl rounded shadow-lg overflow-hidden">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-3 py-1 flex justify-between items-center">
        <span>🪟 Portfolio XP</span>
        <button
          type="button"
          onClick={onClose}
          className="text-white/90 hover:text-white hover:bg-white/10 px-2 py-1 rounded transition"
          title="Back"
          aria-label="Back"
        >
          ← Back
        </button>
      </header>

      <main className="p-6">
        <h2 className="text-xl font-bold mb-6">Choose a folder:</h2>

        <div className="grid grid-cols-2 gap-6">
          <Tile
            onClick={handleOpen('description')}
            emoji="📝"
            title="Project Description"
            subtitle="Technologies and features"
            bgClass="bg-yellow-300"
          />
          <Tile
            onClick={handleOpen('repo')}
            emoji="💻"
            title="Repository"
            subtitle="Link to source code"
            bgClass="bg-green-300"
          />
        </div>
      </main>
    </div>
  );
}
