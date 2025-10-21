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
    alt: 'Advanced search',
    title: '🔍 Advanced Search',
    description:
      '30+ form fields with custom hooks (useCarData, useFilterCounts). Cascade dependencies (brand→model→generation) + URL parameter synchronization. Real-time result counters for each filter.',
  },
  {
    src: '/images/Zrzuty/Lista ogłoszeń.webp',
    alt: 'Listings list',
    title: '📋 Listings List',
    description:
      'Responsive grid (Tailwind) with lazy loading. Cards contain "HOT" badge for promoted listings. Integration with search via URL state - each filter change updates list without reload.',
  },
  {
    src: '/images/Zrzuty/szczegóły ogłoszenia.webp',
    alt: 'Listing detail view',
    title: '🚗 Detail View',
    description:
      'Multi-stage data fetching (listing + comments + similar offers). ImageGallery with fullscreen modal, keyboard navigation (ESC/arrows), thumbnails. Saving in browsing history (viewHistoryService).',
  },
  {
    src: '/images/Zrzuty/Sekcja moje ogłoszenia.webp',
    alt: 'My listings - user dashboard',
    title: '🚗 My Listings',
    description:
      'User dashboard with filtering by status (active/ended/draft). Each card shows statistics (views, favorites, messages). Quick actions: edit, promote, delete.',
  },
  {
    src: '/images/Zrzuty/Formularz.webp',
    alt: 'Add listing form',
    title: '➕ Add Listing Form',
    description:
      'Multi-step wizard with per-section validation. Integration with CEPiK API - auto-fill data by VIN. useImageUpload hook for drag & drop photos with preview. Progressive save in localStorage (crash recovery).',
  },
  {
    src: '/images/Zrzuty/Formularz 1.jpg',
    alt: 'Form - advanced sections',
    title: '➕ Form - Sections',
    description:
      'Sections: basic data, technical details, equipment (multi-select), photos, summary. Each section has its own validation (express-validator on backend). URL tracking of form progress.',
  },
  {
    src: '/images/Zrzuty/Wiadomości.webp',
    alt: 'Messaging system',
    title: '💬 Real-time Messenger',
    description:
      'Three-panel layout with Socket.IO. Folders (inbox/sent/starred/archived) + unread counters. Conversations per listing with context. Attachments (Supabase Storage) + mark as read.',
  },
  {
    src: '/images/Zrzuty/Powiadomienia.webp',
    alt: 'Notification system',
    title: '🔔 Real-time Notifications',
    description:
      'NotificationContext + Socket.IO for live updates. Event deduplication + system noise filtering. Multi-channel feedback: toast notifications + sound + ActivityLog. Categories + bulk marking.',
  },
  {
    src: '/images/Zrzuty/Panel - Admina Dashboard.webp',
    alt: 'Admin panel - Dashboard',
    title: '⚙️ Admin Dashboard',
    description:
      'Real-time statistics (users/listings/messages/revenue) updated via WebSocket. Chart.js charts with aggregation pipelines (MongoDB). Quick actions + recent activity with timestamps.',
  },
  {
    src: '/images/Zrzuty/Panel Admina - lista użytkowników.webp',
    alt: 'Admin - user management',
    title: '👥 User Management',
    description:
      'DataTable with server-side pagination + sorting + advanced filters. Bulk actions (block/verify/email). CSV export via stream API. Audit log of every admin action (profileController).',
  },
  {
    src: '/images/Zrzuty/Panel admina - ogłoszenia.webp',
    alt: 'Admin - listing moderation',
    title: '🚙 Listing Moderation',
    description:
      'Advanced search engine with multi-factor scoring. Workflow statuses (pending→active→featured→closed). Bulk operations + email/push notifications for users. Rate limiting per admin action.',
  },
  {
    src: '/images/Zrzuty/Panel Admina - Promocje.png',
    alt: 'Admin - promotion management',
    title: '🎯 Promotion System',
    description:
      'Management of promotion packages (Basic/Premium/VIP). Pricing configuration, duration, listing limits. Integration with payment gateway. Revenue dashboard from promotions + analytics per package.',
  },
];
