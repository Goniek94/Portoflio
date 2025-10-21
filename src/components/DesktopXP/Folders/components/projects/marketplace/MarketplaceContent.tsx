/* eslint-disable react/no-unescaped-entities */
// desktop/Folders/MarketplaceContent.tsx

export default function MarketplaceContent() {
  return (
    <>
      <section className="mb-6">
        <span className="font-bold text-sm">🚗 MARKETPLACE SAMOCHODOWY</span>
        {'\n'}
        {'\n'}
        <span className="font-bold text-red-600">
          ⚠️ Projekt dla prywatnego klienta, objęty NDA
        </span>
        {'\n'}
        {'\n'}
        Pełna platforma ogłoszeniowa do kupna i sprzedaży samochodów.{'\n'}
        12 miesięcy rozwoju jako jedyny fullstack developer (2024-2025).{'\n'}
        {'\n'}
      </section>

      <section className="mb-6">
        <span className="font-bold text-sm">🛠️ STACK TECHNOLOGICZNY</span>
        {'\n'}
        {'\n'}
        <span className="font-bold">Frontend:</span>
        {'\n'}React 18, TypeScript, Tailwind CSS, React Router, MUI, Socket.IO Client, PWA{'\n'}
        {'\n'}
        <span className="font-bold">Backend:</span>
        {'\n'}Node.js, Express, MongoDB, JWT, Socket.IO, Supabase, PDFKit, Node-cron{'\n'}
        {'\n'}
        <span className="font-bold">DevOps:</span>
        {'\n'}VPS, NGINX, PM2, Git, Jest, Supertest{'\n'}
        {'\n'}
      </section>

      <section className="mb-6">
        <span className="font-bold text-sm">⚡ GŁÓWNE FUNKCJE</span>
        {'\n'}
        {'\n'}* Zaawansowana wyszukiwarka z dziesiątkami filtrów i scoring dopasowania{'\n'}* System
        użytkowników z weryfikacją email/SMS i autoryzacją JWT{'\n'}* Wieloetapowy formularz
        dodawania ogłoszeń z integracją CEPiK{'\n'}* Dynamiczne generowanie pól w formularzach
        (parametry techniczne){'\n'}* Galeria zdjęć z upload do Supabase i optymalizacją (sharp)
        {'\n'}* System wiadomości prywatnych (trójpanelowy layout){'\n'}* Powiadomienia realtime
        (HTTP + WebSocket) z toastami{'\n'}* System płatności (karta, BLIK, przelew) z generowaniem
        faktur PDF{'\n'}* Wyróżnienia ogłoszeń i przedłużanie ekspozycji{'\n'}* Panel
        administracyjny z moderacją, statystykami i health-checkiem{'\n'}* Ulubione ogłoszenia z
        synchronizacją localStorage + backend{'\n'}* Historia aktywności użytkownika{'\n'}* System
        komentarzy pod ogłoszeniami{'\n'}* Podobne oferty (bazujące na marce/modelu/nadwoziu){'\n'}*
        PWA z offline support i install prompt{'\n'}* Automatyczna archiwizacja ofert (Node-cron)
        {'\n'}
        {'\n'}
      </section>

      <section className="mb-6">
        <span className="font-bold text-sm">🔒 BEZPIECZEŃSTWO</span>
        {'\n'}
        {'\n'}* HttpOnly cookies (brak localStorage dla tokenów){'\n'}* JWT z rotacją par tokenów
        {'\n'}* Rate limiting i sanitacja NoSQL{'\n'}* Helmet, CSP, HSTS{'\n'}* Wykrywanie przejęcia
        sesji{'\n'}
        {'\n'}
      </section>

      <section className="mb-6">
        <span className="font-bold text-sm">🔌 API & INTEGRACJE</span>
        {'\n'}
        {'\n'}* REST API z paginacją i filtrami{'\n'}* Socket.IO dla komunikacji realtime{'\n'}*
        Supabase Storage (upload zdjęć){'\n'}* CEPiK API (automatyczne pobieranie danych pojazdu)
        {'\n'}* Nodemailer (weryfikacja, faktury){'\n'}* PDFKit (generowanie dokumentów){'\n'}
        {'\n'}
      </section>

      <section className="mb-4">
        <span className="font-bold text-sm">💡 CZEGO SIĘ NAUCZYŁEM</span>
        {'\n'}
        {'\n'}* Projektowanie architektury fullstack od zera{'\n'}* Zarządzanie bezpieczeństwem
        aplikacji webowej{'\n'}* Praca z komunikacją realtime{'\n'}* Integracje zewnętrzne i obsługa
        API{'\n'}* Wdrożenie na produkcję i utrzymanie{'\n'}* Praca z prawdziwym klientem
        (wymagania, deadliny){'\n'}
        {'\n'}
        <span className="text-xs text-gray-600">
          Zobacz screenshoty w folderze &quot;📁 Demo&quot;
        </span>
        {'\n'}
      </section>
    </>
  );
}
