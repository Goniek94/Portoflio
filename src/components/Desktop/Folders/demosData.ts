// desktop/Folders/demosData.ts

export interface DemoImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export const demosData: DemoImage[] = [
  {
    src: '/images/Zrzuty/Wyszukiwarka.webp',
    alt: 'Wyszukiwarka zaawansowana',
    title: '🔍 Wyszukiwarka zaawansowana',
    description: 'Filtry: nadwozie, marka, model, generacja, rok, cena, przebieg, lokalizacja',
  },
  {
    src: '/images/Zrzuty/Lista ogłoszeń.webp',
    alt: 'Lista ogłoszeń',
    title: '📋 Lista ogłoszeń',
    description: 'Karty z badge "Gorąca oferta", ceny, podstawowe parametry',
  },
  {
    src: '/images/Zrzuty/szczegóły ogłoszenia.webp',
    alt: 'Widok szczegółowy',
    title: '🚗 Widok szczegółowy',
    description: 'Galeria zdjęć, pełna specyfikacja techniczna, dane pojazdu',
  },
  {
    src: '/images/Zrzuty/Sekcja moje ogłoszenia.webp',
    alt: 'Moje ogłoszenia',
    title: '🚗 Moje ogłoszenia',
    description: 'Widok na sekcje "moich ogłoszeń"',
  },
  {
    src: '/images/Zrzuty/Formularz.webp',
    alt: 'Formularz dodawania',
    title: '➕ Formularz dodawania',
    description: 'Wieloetapowy formularz z integracją CEPiK (automatyczne pobieranie danych)',
  },
  {
    src: '/images/Zrzuty/Formularz 1.jpg',
    alt: 'Formularz dodawania - sekcje',
    title: '➕ Formularz dodawania - sekcje',
    description: 'Wieloetapowy formularz z integracją CEPiK (automatyczne pobieranie danych)',
  },
  {
    src: '/images/Zrzuty/Wiadomości.webp',
    alt: 'System wiadomości',
    title: '💬 Wiadomości',
    description: 'Trójpanelowy layout: kategorie, lista konwersacji, szczegóły',
  },
  {
    src: '/images/Zrzuty/Powiadomienia.webp',
    alt: 'System powiadomień',
    title: '🔔 Powiadomienia',
    description: 'Realtime notifications, kategorie, oznaczanie jako przeczytane',
  },
  {
    src: '/images/Zrzuty/Panel - Admina Dashboard.webp',
    alt: 'Panel administratora - Dashboard',
    title: '⚙️ Panel Administratora',
    description: 'Dashboard ze statystykami platformy, aktualizowane na żywo',
  },
  {
    src: '/images/Zrzuty/Panel Admina - lista użytkowników.webp',
    alt: 'Zarządzanie użytkownikami',
    title: '👥 Zarządzanie użytkownikami',
    description: 'Lista, statusy, weryfikacja, eksport CSV, wysyłka wiadomości',
  },
  {
    src: '/images/Zrzuty/Panel admina - ogłoszenia.webp',
    alt: 'Zarządzanie ogłoszeniami (Admin)',
    title: '🚙 Zarządzanie ogłoszeniami',
    description: 'Moderacja, statusy (aktywne, zakończone, oczekujące), filtry',
  },
];
