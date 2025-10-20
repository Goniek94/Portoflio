'use client';

import React, { useState } from 'react';
import {
  FolderKey,
  FoldersProps,
  ProjectSubfolder,
  MarketplaceSubfolder,
  PortfolioXPSubfolder,
} from './types';

import NotepadWindow from './NotepadWindow';
import NotepadHeader from './NotepadHeader';
import NotepadMenu from './NotepadMenu';

import GalleryWindow from './GalleryWindow';
import CompletionScreen from './CompletionScreen';
import FileSelection from './FileSelection';

import ProjectSubfolderSelection from './ProjectSubfolderSelection';
import MarketplaceSubfolderSelection from './MarketplaceSubfolderSelection';
import PortfolioXPSubfolderSelection from './PortfolioSubfolderSelection';

import MarketplaceRepoInfo from './MarketplaceRepoInfo';
import PortfolioXPRepoInfo from './PortfolioXPRepoInfo';

import PortfolioXPContent from './PortfolioXPContent';

export default function Folders({ onFinish }: FoldersProps) {
  const [viewed, setViewed] = useState<Record<FolderKey, boolean>>({
    aboutMe: false,
    projects: false,
  });

  const [current, setCurrent] = useState<FolderKey | null>(null);

  const [projectSubfolder, setProjectSubfolder] = useState<ProjectSubfolder | null>(null);
  const [marketplaceSubfolder, setMarketplaceSubfolder] = useState<MarketplaceSubfolder | null>(
    null
  );
  const [portfolioXPSubfolder, setPortfolioXPSubfolder] = useState<PortfolioXPSubfolder | null>(
    null
  );

  const allDone = Object.values(viewed).every(Boolean);

  /** Helpers */
  const resetSubfolders = () => {
    setProjectSubfolder(null);
    setMarketplaceSubfolder(null);
    setPortfolioXPSubfolder(null);
  };

  const openFolder = (key: FolderKey) => {
    setCurrent(key);
    setViewed((v) => ({ ...v, [key]: true }));
    resetSubfolders();
  };

  const closeFolder = () => {
    setCurrent(null);
    resetSubfolders();
  };

  const openProjectSubfolder = (subfolder: ProjectSubfolder) => {
    setProjectSubfolder(subfolder);
    setMarketplaceSubfolder(null);
    setPortfolioXPSubfolder(null);
  };

  const openMarketplaceSubfolder = (subfolder: MarketplaceSubfolder) => {
    setMarketplaceSubfolder(subfolder);
  };

  const openPortfolioXPSubfolder = (subfolder: PortfolioXPSubfolder) => {
    setPortfolioXPSubfolder(subfolder);
  };

  const closeProjectSubfolder = () => {
    setProjectSubfolder(null);
    setMarketplaceSubfolder(null);
    setPortfolioXPSubfolder(null);
  };

  const closeMarketplaceSubfolder = () => setMarketplaceSubfolder(null);
  const closePortfolioXPSubfolder = () => setPortfolioXPSubfolder(null);

  /** Render blocks */
  const renderPortfolioXPDescription = () => (
    <div className="w-full max-w-2xl rounded border-2 border-[#7a7a7a] shadow-xl bg-[#f6f6f6]">
      <NotepadHeader fileName="PortfolioXP.txt" onClose={closePortfolioXPSubfolder} />
      <NotepadMenu />
      <div
        className="px-4 py-2 bg-white h-80 font-mono text-xs text-black overflow-y-scroll border-x border-b border-[#b5b5b5] whitespace-pre-wrap select-text notepad-content"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#c0c0c0 #f0f0f0' }}
      >
        <PortfolioXPContent />
      </div>
      <div className="flex items-center justify-between text-[10px] px-3 py-1 bg-[#f3f3f3] border-t border-[#c3c3c3]">
        <span>Wiersz 1, kolumna 1</span>
        <button
          onClick={closePortfolioXPSubfolder}
          className="bg-blue-700 text-white text-xs px-4 py-1 rounded hover:bg-blue-600 transition"
        >
          Zamknij
        </button>
      </div>
    </div>
  );

  const renderProjects = () => {
    // 1) wybór projektu
    if (projectSubfolder === null) {
      return <ProjectSubfolderSelection onOpen={openProjectSubfolder} onClose={closeFolder} />;
    }

    // 2) Marketplace branch
    if (projectSubfolder === 'marketplace') {
      if (marketplaceSubfolder === null) {
        return (
          <MarketplaceSubfolderSelection
            onOpen={openMarketplaceSubfolder}
            onClose={closeProjectSubfolder}
          />
        );
      }

      if (marketplaceSubfolder === 'screenshots') {
        return <GalleryWindow onClose={closeMarketplaceSubfolder} />;
      }

      // 'repo'
      return <MarketplaceRepoInfo onClose={closeMarketplaceSubfolder} />;
    }

    // 3) Portfolio XP branch
    if (projectSubfolder === 'portfolioxp') {
      if (portfolioXPSubfolder === null) {
        return (
          <PortfolioXPSubfolderSelection
            onOpen={openPortfolioXPSubfolder}
            onClose={closeProjectSubfolder}
          />
        );
      }

      if (portfolioXPSubfolder === 'description') {
        return renderPortfolioXPDescription();
      }

      // 'repo'
      return <PortfolioXPRepoInfo onClose={closePortfolioXPSubfolder} />;
    }

    // fallback
    return (
      <ProjectSubfolderSelection onOpen={openProjectSubfolder} onClose={closeProjectSubfolder} />
    );
  };

  const renderCurrent = () => {
    switch (current) {
      case 'aboutMe':
        return <NotepadWindow folderKey={current} onClose={closeFolder} />;
      case 'projects':
        return renderProjects();
      default:
        return allDone ? (
          <CompletionScreen onFinish={onFinish || (() => {})} />
        ) : (
          <FileSelection viewed={viewed} onOpen={openFolder} />
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-600/90 flex flex-col items-center justify-center p-8 z-50">
      {renderCurrent()}
    </div>
  );
}
