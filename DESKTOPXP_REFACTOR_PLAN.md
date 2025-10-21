# Plan refaktoryzacji DesktopXP

## 📊 Analiza rozmiaru komponentów

```
File               Lines   Status
----               -----   ------
GlitchOverlay.tsx    457   ❌ DO REFAKTORYZACJI (największy!)
Desktop.tsx          389   ❌ DO REFAKTORYZACJI
Taskbar.tsx          351   ❌ DO REFAKTORYZACJI
RecoverySystem.tsx   261   ⚠️  Średni (opcjonalnie)
StartMenu.tsx        183   ✅ OK
Warning.tsx          168   ✅ OK
```

## 🎯 Priorytety

### 1. **GlitchOverlay** (457 linii) - NAJWYŻSZY PRIORYTET

**Problem:** Monolityczny komponent z wieloma efektami wizualnymi

**Nowa struktura:**

```
Glitch/
├── index.tsx                 # GlitchOverlay - główny manager (50-80 linii)
├── types.ts                  # Interfejsy
│
├── components/
│   ├── effects/             # Efekty wizualne
│   │   ├── MatrixRain.tsx   # Canvas z matrix rain
│   │   ├── StaticNoise.tsx  # Canvas z szumem
│   │   ├── RGBSplitEffect.tsx
│   │   ├── PixelationBlocks.tsx
│   │   ├── HorizontalGlitchBars.tsx
│   │   └── ScanLines.tsx
│   │
│   ├── ui/                  # UI komponenty
│   │   ├── ErrorMessages.tsx
│   │   └── SkipButton.tsx
│   │
│   └── index.ts             # Barrel export
│
├── hooks/
│   ├── useGlitchAnimation.ts  # Główna logika animacji
│   └── useCanvasEffect.ts     # Reusable canvas hook
│
├── styles/
│   └── animations.ts          # Wszystkie @keyframes
│
└── constants/
    └── glitchConfig.ts        # Error messages, kolory, timings
```

**Korzyści:**

- Każdy efekt = osobny plik (~50-100 linii)
- Łatwe wyłączanie efektów dla performance
- Reusable canvas hooks
- Testowalne komponenty

---

### 2. **Desktop** (389 linii) - WYSOKI PRIORYTET

**Problem:** Zbyt wiele odpowiedzialności (ikony, windows, context menu, handlers)

**Nowa struktura:**

```
Desktop/
├── index.tsx                 # Desktop - główny orchestrator (80-100 linii)
├── types.ts
│
├── components/
│   ├── ContextMenu.tsx      # Menu PPM
│   ├── DebugInfo.tsx        # Debug panel
│   └── WindowContent.tsx    # Render treści okien
│
├── hooks/
│   ├── useDesktopState.ts   # Stan desktopu
│   ├── useContextMenu.ts    # Logika menu
│   └── useGlitchTimer.ts    # Timer dla glitch
│
├── handlers/
│   └── desktopHandlers.ts   # Wszystkie event handlers
│
└── constants/
    └── windowConfigs.ts     # Konfiguracje okien aplikacji
```

**Wydzielone pliki:**

- `ContextMenu.tsx` (~80 linii)
- `WindowContent.tsx` (~150 linii)
- `desktopHandlers.ts` (~100 linii)
- `useDesktopState.ts` (~50 linii)

**Desktop/index.tsx** pozostanie ~80-100 linii jako orchestrator

---

### 3. **Taskbar** (351 linii) - WYSOKI PRIORYTET

**Problem:** Duży komponent z wieloma funkcjami

**Nowa struktura:**

```
Taskbar/
├── index.tsx                # Taskbar - główny component (60-80 linii)
├── types.ts
│
├── components/
│   ├── StartButton.tsx     # Przycisk Start
│   ├── WindowButtons.tsx   # Przyciski okien
│   ├── SystemTray.tsx      # System tray
│   └── Clock.tsx           # Zegar
│
├── hooks/
│   └── useTaskbarState.ts  # Stan taskbara
│
└── styles/
    └── taskbarStyles.ts    # Style XP
```

**Wydzielone pliki:**

- `StartButton.tsx` (~50 linii)
- `WindowButtons.tsx` (~120 linii)
- `SystemTray.tsx` (~60 linii)
- `Clock.tsx` (~40 linii)

**Taskbar/index.tsx** ~60-80 linii jako kontener

---

## 📋 Plan wykonania

### Faza 1: Glitch (2-3h)

- [x] Analiza GlitchOverlay
- [ ] Utworzyć strukturę folderów
- [ ] Wydzielić komponenty effects
- [ ] Wydzielić UI komponenty
- [ ] Stworzyć hooks
- [ ] Przenieść styles i constants
- [ ] Zaktualizować importy
- [ ] Test build

### Faza 2: Desktop (2-3h)

- [ ] Analiza Desktop.tsx
- [ ] Utworzyć strukturę folderów
- [ ] Wydzielić komponenty
- [ ] Stworzyć hooks
- [ ] Wydzielić handlers
- [ ] Zaktualizować importy
- [ ] Test build

### Faza 3: Taskbar (1-2h)

- [ ] Analiza Taskbar.tsx
- [ ] Utworzyć strukturę folderów
- [ ] Wydzielić komponenty
- [ ] Stworzyć hooks
- [ ] Zaktualizować importy
- [ ] Test build

### Faza 4: Opcjonalne

- [ ] RecoverySystem.tsx (jeśli będzie czas)
- [ ] Dokumentacja wszystkich zmian
- [ ] Performance optimization

---

## 🎨 Standardy

### Nazewnictwo plików:

- Komponenty: `PascalCase.tsx`
- Hooks: `use*.ts`
- Utils: `camelCase.ts`
- Constants: `SCREAMING_SNAKE` w pliku `camelCase.ts`

### Struktura każdego folderu:

```
Feature/
├── index.tsx          # Główny komponent export
├── types.ts           # TypeScript types
├── components/        # Podkomponenty
├── hooks/             # Custom hooks
├── utils/             # Helper functions
├── constants/         # Konfiguracja
└── styles/            # Styles/animations (jeśli potrzebne)
```

### Barrel Exports:

Każdy podfolder z `components/` ma `index.ts`:

```typescript
export { Component1 } from './Component1';
export { Component2 } from './Component2';
```

---

## ✅ Rezultat końcowy

```
DesktopXP/
├── Desktop/            ✨ (60-80 linii główny + subkomponenty)
├── Taskbar/            ✨ (60-80 linii główny + subkomponenty)
├── Glitch/             ✨ (50-80 linii główny + effects)
├── StartMenu.tsx       ✅ (183 linii - OK)
├── Warning.tsx         ✅ (168 linii - OK)
├── RecoverySystem.tsx  ⚠️  (261 linii - może zostać)
└── Folders/            ✅ (już uporządkowane)
```

**Wszys files <300 linii, większość <100 linii!**

## 🚀 Gotowe do portfolio

Struktura pokazująca:

- ✅ Clean Architecture
- ✅ Separation of Concerns
- ✅ Reusable Components
- ✅ Custom Hooks Pattern
- ✅ Barrel Exports
- ✅ Professional Organization
