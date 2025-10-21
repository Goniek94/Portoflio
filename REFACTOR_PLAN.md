# Plan refaktoryzacji projektu WindowsXP

## Obecna struktura (chaotyczna):

```
DesktopXP/
├── Desktop.tsx
├── Taskbar.tsx
├── StartMenu.tsx
├── GlitchOverlay.tsx
├── Warning.tsx
├── RecoverySystem.tsx
├── Folders/ (17 plików w jednym folderze!)
└── Glitch/
```

## Nowa struktura (uporządkowana):

```
DesktopXP/
├── Desktop.tsx (główny komponent)
├── Taskbar.tsx
├── StartMenu.tsx
├── GlitchOverlay.tsx
├── Warning.tsx
├── RecoverySystem.tsx
│
├── components/              # Wspólne komponenty UI
│   ├── ContextMenu.tsx
│   └── DebugInfo.tsx
│
├── hooks/                   # Custom hooks
│   └── useDesktopState.ts
│
├── utils/                   # Funkcje pomocnicze
│   └── desktopHelpers.ts
│
├── constants/               # Konfiguracja
│   └── desktopConfig.ts
│
├── Folders/
│   ├── index.tsx (główny manager)
│   ├── types.ts
│   │
│   ├── components/
│   │   ├── common/                    # Wspólne komponenty
│   │   │   ├── FileSelection.tsx
│   │   │   └── CompletionScreen.tsx
│   │   │
│   │   ├── notepad/                   # Komponenty Notepad
│   │   │   ├── NotepadWindow.tsx
│   │   │   ├── NotepadHeader.tsx
│   │   │   └── NotepadMenu.tsx
│   │   │
│   │   ├── projects/                  # Projekty
│   │   │   ├── ProjectSubfolderSelection.tsx
│   │   │   ├── ProjectsContent.tsx
│   │   │   │
│   │   │   ├── marketplace/           # Marketplace
│   │   │   │   ├── MarketplaceSubfolderSelection.tsx
│   │   │   │   ├── MarketplaceContent.tsx
│   │   │   │   ├── MarketplaceRepoInfo.tsx
│   │   │   │   └── GalleryWindow.tsx
│   │   │   │
│   │   │   └── portfolioxp/           # PortfolioXP
│   │   │       ├── PortfolioXPSubfolderSelection.tsx
│   │   │       ├── PortfolioXPContent.tsx
│   │   │       └── PortfolioXPRepoInfo.tsx
│   │   │
│   │   └── about/                     # About Me
│   │       └── AboutMeContent.tsx
│   │
│   ├── hooks/                         # Hooks dla Folders
│   │   └── useFoldersState.ts
│   │
│   ├── utils/                         # Funkcje pomocnicze
│   │   └── foldersHelpers.ts
│   │
│   └── data/                          # Dane statyczne
│       └── demosData.ts
│
└── Glitch/
```

## Korzyści z nowej struktury:

1. ✅ Logiczna organizacja według funkcji
2. ✅ Łatwe znalezienie komponentów
3. ✅ Wydzielone hooks i utils
4. ✅ Lepsze skalowanie projektu
5. ✅ Gotowe pod deployment na Vercel
6. ✅ Profesjonalny wygląd w portfolio

## Kroki wykonania:

1. Utworzyć nowe foldery
2. Przenieść komponenty Notepad do `components/notepad/`
3. Przenieść projekty do `components/projects/`
4. Wydzielić hooks do `hooks/useFoldersState.ts`
5. Wydzielić funkcje pomocnicze do `utils/`
6. Przenieść dane do `data/`
7. Zaktualizować importy w `index.tsx`
8. Dodać konfigurację Vercel
9. Przetestować

## Dodatkowe pliki dla Vercel:

- `vercel.json` - konfiguracja deploymentu
- `.vercelignore` - pliki do pominięcia
