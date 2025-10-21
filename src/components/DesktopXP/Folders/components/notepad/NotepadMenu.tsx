// desktop/Folders/components/NotepadMenu.tsx

export default function NotepadMenu() {
  return (
    <div className="flex gap-4 pl-2 bg-[#f6f6f6] border-b border-[#b5b5b5] text-xs font-bold text-[#2d2d2d] select-none h-7 items-center">
      <span className="hover:bg-[#cbe8fa] px-1 rounded cursor-default">Plik</span>
      <span className="hover:bg-[#cbe8fa] px-1 rounded cursor-default">Edycja</span>
      <span className="hover:bg-[#cbe8fa] px-1 rounded cursor-default">Format</span>
      <span className="hover:bg-[#cbe8fa] px-1 rounded cursor-default">Widok</span>
      <span className="hover:bg-[#cbe8fa] px-1 rounded cursor-default">Pomoc</span>
    </div>
  );
}
