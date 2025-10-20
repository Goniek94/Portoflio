// desktop/Folders/components/NotepadHeader.tsx

interface NotepadHeaderProps {
  fileName: string;
  onClose: () => void;
}

export default function NotepadHeader({ fileName, onClose }: NotepadHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 py-1 bg-[#0a246a] border-b border-[#f6f6f6] relative">
      <span className="text-white font-bold tracking-wide text-xs select-none">
        {fileName} - Notatnik
      </span>
      <div className="flex space-x-1">
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center bg-[#e81123] border border-[#888] rounded-sm shadow hover:bg-[#e34a4a] transition"
          title="Zamknij"
        >
          <span className="text-white text-xl font-bold -mt-[2px]">×</span>
        </button>
      </div>
    </div>
  );
}
