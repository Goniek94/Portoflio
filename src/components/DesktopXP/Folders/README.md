# Folders Component Architecture

## 📁 Structure Overview

```
Folders/
├── index.tsx                 # Main component orchestrator
├── types.ts                  # TypeScript type definitions
│
├── hooks/                    # Custom React hooks
│   └── useFoldersState.ts   # State management logic
│
├── components/               # UI Components organized by feature
│   ├── common/              # Shared components
│   │   ├── FileSelection.tsx
│   │   ├── CompletionScreen.tsx
│   │   └── index.ts
│   │
│   ├── notepad/             # Notepad-related components
│   │   ├── NotepadWindow.tsx
│   │   ├── NotepadHeader.tsx
│   │   ├── NotepadMenu.tsx
│   │   └── index.ts
│   │
│   ├── about/               # About Me section
│   │   ├── AboutMeContent.tsx
│   │   └── index.ts
│   │
│   └── projects/            # Projects showcase
│       ├── ProjectSubfolderSelection.tsx
│       ├── ProjectsContent.tsx
│       ├── index.ts
│       │
│       ├── marketplace/     # Marketplace project
│       │   ├── MarketplaceSubfolderSelection.tsx
│       │   ├── MarketplaceContent.tsx
│       │   ├── MarketplaceRepoInfo.tsx
│       │   ├── GalleryWindow.tsx
│       │   └── index.ts
│       │
│       └── portfolioxp/     # Portfolio XP project
│           ├── PortfolioXPSubfolderSelection.tsx
│           ├── PortfolioXPContent.tsx
│           ├── PortfolioXPRepoInfo.tsx
│           └── index.ts
│
├── data/                    # Static data
│   ├── demosData.ts        # Demo images data
│   └── index.ts
│
└── utils/                   # Helper functions (future)
```

## 🎯 Design Principles

### 1. **Separation of Concerns**

- **Logic**: Extracted to custom hooks (`useFoldersState`)
- **UI**: Pure presentational components
- **Data**: Centralized in `/data` directory

### 2. **Scalability**

- Modular structure allows easy addition of new features
- Each feature has its own directory
- Barrel exports (`index.ts`) for clean imports

### 3. **Maintainability**

- Clear naming conventions
- Logical file organization
- Type safety with TypeScript

### 4. **Performance**

- Lazy loading support ready
- Memoization-friendly structure
- Optimized re-renders through proper state management

## 📦 Barrel Exports Pattern

Each directory contains an `index.ts` file that re-exports its contents:

```typescript
// components/common/index.ts
export { default as FileSelection } from './FileSelection';
export { default as CompletionScreen } from './CompletionScreen';
```

This allows for clean imports:

```typescript
// ✅ Good
import { FileSelection, CompletionScreen } from './components/common';

// ❌ Avoid
import FileSelection from './components/common/FileSelection';
import CompletionScreen from './components/common/CompletionScreen';
```

## 🔄 State Management

### `useFoldersState` Hook

Centralized state management for the entire Folders feature:

```typescript
const {
  viewed, // Track which folders have been viewed
  current, // Current active folder
  projectSubfolder, // Current project subfolder
  allDone, // All folders viewed flag
  openFolder, // Open main folder
  closeFolder, // Close main folder
  // ... more actions
} = useFoldersState();
```

**Benefits:**

- Single source of truth
- Reusable across components
- Easier testing
- Cleaner component code

## 🧩 Component Hierarchy

```
Folders (Main Orchestrator)
  ├── FileSelection (Initial view)
  ├── CompletionScreen (All done view)
  ├── NotepadWindow (About Me)
  └── Projects Router
      ├── ProjectSubfolderSelection
      ├── Marketplace Branch
      │   ├── MarketplaceSubfolderSelection
      │   ├── GalleryWindow
      │   └── MarketplaceRepoInfo
      └── PortfolioXP Branch
          ├── PortfolioXPSubfolderSelection
          ├── PortfolioXP Description (Notepad)
          └── PortfolioXPRepoInfo
```

## 🚀 Usage

```typescript
import Folders from './components/DesktopXP/Folders';

<Folders onFinish={handleComplete} />
```

## 📝 Adding New Features

### Adding a New Project

1. Create directory: `components/projects/newproject/`
2. Add components to the directory
3. Create `index.ts` barrel export
4. Update `components/projects/index.ts`
5. Add logic to main `index.tsx` render method

### Adding New Common Components

1. Add component to `components/common/`
2. Export in `components/common/index.ts`
3. Import where needed using barrel export

## 🎨 Code Standards

- **TypeScript**: Strict mode enabled
- **Naming**: PascalCase for components, camelCase for functions
- **Exports**: Named exports for utilities, default for components
- **Comments**: JSDoc for complex functions
- **File Size**: Keep components under 300 lines

## 🔧 Future Enhancements

Potential improvements:

- [ ] Add `utils/` helper functions
- [ ] Implement lazy loading for heavy components
- [ ] Add unit tests for each component
- [ ] Create Storybook documentation
- [ ] Add error boundaries
- [ ] Implement analytics tracking

## 📚 Resources

- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Last Updated:** October 2025  
**Architecture Level:** Mid/Senior  
**Purpose:** Portfolio Project Showcase
