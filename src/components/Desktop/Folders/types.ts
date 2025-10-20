// desktop/Folders/types.ts

export type FolderKey = 'aboutMe' | 'projects';
export type ProjectSubfolder = 'marketplace' | 'portfolioxp';
export type MarketplaceSubfolder = 'screenshots' | 'repo';
export type PortfolioXPSubfolder = 'description' | 'repo';

export interface FoldersProps {
  onFinish?: () => void;
}
