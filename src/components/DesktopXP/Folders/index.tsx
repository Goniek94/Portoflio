'use client';

import React from 'react';
import { FoldersProps } from './types';
import { useFoldersState } from './hooks/useFoldersState';

// Common components
import { FileSelection } from './components/common';

// Notepad components
import { NotepadWindow } from './components/notepad';

// Projects components
import {
  ProjectSubfolderSelection,
  MarketplaceSubfolderSelection,
  MarketplaceRepoInfo,
  GalleryWindow,
  PortfolioXPSubfolderSelection,
  PortfolioXPContent,
  PortfolioXPRepoInfo,
} from './components/projects';

// Notepad specific components for PortfolioXP description
import { NotepadHeader, NotepadMenu } from './components/notepad';

export default function Folders({ onFinish }: FoldersProps) {
  const {
    viewed,
    current,
    projectSubfolder,
    marketplaceSubfolder,
    portfolioXPSubfolder,
    allDone,
    openFolder,
    closeFolder,
    openProjectSubfolder,
    closeProjectSubfolder,
    openMarketplaceSubfolder,
    closeMarketplaceSubfolder,
    openPortfolioXPSubfolder,
    closePortfolioXPSubfolder,
  } = useFoldersState();

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
        <span>Line 1, column 1</span>
        <button
          onClick={closePortfolioXPSubfolder}
          className="bg-blue-700 text-white text-xs px-4 py-1 rounded hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );

  const renderProjects = () => {
    // Project selection level
    if (projectSubfolder === null) {
      return <ProjectSubfolderSelection onOpen={openProjectSubfolder} onClose={closeFolder} />;
    }

    // Marketplace branch
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

      return <MarketplaceRepoInfo onClose={closeMarketplaceSubfolder} />;
    }

    // Portfolio XP branch
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

      return <PortfolioXPRepoInfo onClose={closePortfolioXPSubfolder} />;
    }

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
        return (
          <FileSelection
            viewed={viewed}
            onOpen={openFolder}
            allDone={allDone}
            onFinish={onFinish}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-600/90 flex flex-col items-center justify-center p-8 z-50">
      {renderCurrent()}
    </div>
  );
}
