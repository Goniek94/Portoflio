// hooks/useFoldersState.ts
import { useState, useCallback } from 'react';
import { FolderKey, ProjectSubfolder, MarketplaceSubfolder, PortfolioXPSubfolder } from '../types';

interface FoldersState {
  viewed: Record<FolderKey, boolean>;
  current: FolderKey | null;
  projectSubfolder: ProjectSubfolder | null;
  marketplaceSubfolder: MarketplaceSubfolder | null;
  portfolioXPSubfolder: PortfolioXPSubfolder | null;
}

export function useFoldersState() {
  const [state, setState] = useState<FoldersState>({
    viewed: {
      aboutMe: false,
      projects: false,
    },
    current: null,
    projectSubfolder: null,
    marketplaceSubfolder: null,
    portfolioXPSubfolder: null,
  });

  // Check if all folders viewed
  const allDone = Object.values(state.viewed).every(Boolean);

  // Reset all subfolders
  const resetSubfolders = useCallback(() => {
    setState((prev) => ({
      ...prev,
      projectSubfolder: null,
      marketplaceSubfolder: null,
      portfolioXPSubfolder: null,
    }));
  }, []);

  // Open main folder
  const openFolder = useCallback((key: FolderKey) => {
    setState((prev) => ({
      ...prev,
      current: key,
      viewed: { ...prev.viewed, [key]: true },
      projectSubfolder: null,
      marketplaceSubfolder: null,
      portfolioXPSubfolder: null,
    }));
  }, []);

  // Close main folder - returns to main view instead of closing everything
  const closeFolder = useCallback(() => {
    setState((prev) => ({
      ...prev,
      current: null,
    }));
  }, []);

  // Open project subfolder
  const openProjectSubfolder = useCallback((subfolder: ProjectSubfolder) => {
    setState((prev) => ({
      ...prev,
      projectSubfolder: subfolder,
      marketplaceSubfolder: null,
      portfolioXPSubfolder: null,
    }));
  }, []);

  // Close project subfolder - returns to main view
  const closeProjectSubfolder = useCallback(() => {
    setState((prev) => ({
      ...prev,
      current: null,
      projectSubfolder: null,
      marketplaceSubfolder: null,
      portfolioXPSubfolder: null,
    }));
  }, []);

  // Marketplace subfolder
  const openMarketplaceSubfolder = useCallback((subfolder: MarketplaceSubfolder) => {
    setState((prev) => ({
      ...prev,
      marketplaceSubfolder: subfolder,
    }));
  }, []);

  const closeMarketplaceSubfolder = useCallback(() => {
    setState((prev) => ({
      ...prev,
      marketplaceSubfolder: null,
    }));
  }, []);

  // PortfolioXP subfolder
  const openPortfolioXPSubfolder = useCallback((subfolder: PortfolioXPSubfolder) => {
    setState((prev) => ({
      ...prev,
      portfolioXPSubfolder: subfolder,
    }));
  }, []);

  const closePortfolioXPSubfolder = useCallback(() => {
    setState((prev) => ({
      ...prev,
      portfolioXPSubfolder: null,
    }));
  }, []);

  return {
    ...state,
    allDone,
    resetSubfolders,
    openFolder,
    closeFolder,
    openProjectSubfolder,
    closeProjectSubfolder,
    openMarketplaceSubfolder,
    closeMarketplaceSubfolder,
    openPortfolioXPSubfolder,
    closePortfolioXPSubfolder,
  };
}
