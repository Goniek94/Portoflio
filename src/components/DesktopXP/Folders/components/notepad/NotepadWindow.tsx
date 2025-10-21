// desktop/Folders/NotepadWindow.tsx

import NotepadHeader from './NotepadHeader';
import NotepadMenu from './NotepadMenu';
import { AboutMeContent } from '../about';
import { ProjectsContent } from '../projects';
import { FolderKey } from '../../types';

interface NotepadWindowProps {
  folderKey: FolderKey;
  onClose: () => void;
}

export default function NotepadWindow({ folderKey, onClose }: NotepadWindowProps) {
  const fileName = folderKey === 'aboutMe' ? 'About_Me.txt' : 'Projects.txt';

  return (
    <div className="w-full max-w-2xl rounded border-2 border-[#7a7a7a] shadow-xl bg-[#f6f6f6]">
      {/* Pasek tytułu */}
      <NotepadHeader fileName={fileName} onClose={onClose} />

      {/* Menu Notatnika */}
      <NotepadMenu />

      {/* Arkusz Notatnika */}
      <div
        className="px-4 py-2 bg-white h-80 font-mono text-xs text-black overflow-y-scroll border-x border-b border-[#b5b5b5] whitespace-pre-wrap select-text notepad-content"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#c0c0c0 #f0f0f0',
        }}
      >
        {folderKey === 'aboutMe' ? <AboutMeContent /> : <ProjectsContent />}
      </div>

      {/* Dolny pasek */}
      <div className="flex items-center justify-between text-[10px] px-3 py-1 bg-[#f3f3f3] border-t border-[#c3c3c3]">
        <span>Line 1, Col 1</span>
        <button
          onClick={onClose}
          className="bg-blue-700 text-white text-xs px-4 py-1 rounded hover:bg-blue-600 transition"
        >
          Exit
        </button>
      </div>
    </div>
  );
}
