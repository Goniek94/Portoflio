/* eslint-disable react/no-unescaped-entities */
// desktop/Folders/MarketplaceContent.tsx

export default function MarketplaceContent() {
  return (
    <>
      <section className="mb-6">
        <span className="font-bold text-sm">🚗 Car Marketplace</span>
        {'\n'}
        {'\n'}
        <span className="font-bold text-red-600">⚠️ Private client project under NDA</span>
        {'\n'}
        {'\n'}A complete classifieds platform for buying and selling cars.{'\n'}
        12 months of development as the sole full-stack developer (2024–2025).{'\n'}
        {'\n'}
      </section>

      <section className="mb-6">
        <span className="font-bold text-sm">🛠️ TECH STACK</span>
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
        <span className="font-bold text-sm">⚡ KEY FEATURES</span>
        {'\n'}
        {'\n'}* Advanced search with dozens of filters and relevance scoring{'\n'}* User system with
        email/SMS verification and JWT authorization{'\n'}* Multi-step listing form with CEPiK
        integration (Polish vehicle registry){'\n'}* Dynamic form fields (technical parameters)
        {'\n'}* Image gallery with uploads to Supabase and optimization (sharp){'\n'}* Private
        messaging system (three-pane layout){'\n'}* Real-time notifications (HTTP + WebSocket) with
        toasts{'\n'}* Payments (card, BLIK, bank transfer) with PDF invoice generation{'\n'}*
        Listing promotion and exposure extensions{'\n'}* Admin panel with moderation, statistics,
        and health checks{'\n'}* Favorites with localStorage + backend synchronization{'\n'}* User
        activity history{'\n'}* Comments under listings{'\n'}* Similar offers (based on
        make/model/body type){'\n'}* PWA with offline support and install prompt{'\n'}* Automatic
        listing archiving (Node-cron){'\n'}
        {'\n'}
      </section>

      <section className="mb-6">
        <span className="font-bold text-sm">🔒 SECURITY</span>
        {'\n'}
        {'\n'}* HttpOnly cookies (no tokens in localStorage){'\n'}* JWT with rotating token pairs
        {'\n'}* Rate limiting and NoSQL sanitization{'\n'}* Helmet, CSP, HSTS{'\n'}* Session-hijack
        detection{'\n'}
        {'\n'}
      </section>

      <section className="mb-6">
        <span className="font-bold text-sm">🔌 API & INTEGRATIONS</span>
        {'\n'}
        {'\n'}* REST API with pagination and filtering{'\n'}* Socket.IO for real-time communication
        {'\n'}* Supabase Storage (image uploads){'\n'}* CEPiK API (automatic vehicle data fetch)
        {'\n'}* Nodemailer (verification, invoices){'\n'}* PDFKit (document generation){'\n'}
        {'\n'}
      </section>

      <section className="mb-4">
        <span className="font-bold text-sm">💡 WHAT I LEARNED</span>
        {'\n'}
        {'\n'}* Designing full-stack architecture from scratch{'\n'}* Managing web-app security end
        to end{'\n'}* Building real-time communication features{'\n'}* External integrations and API
        handling{'\n'}* Production deployment and maintenance{'\n'}* Working with a real client
        (requirements, deadlines){'\n'}
        {'\n'}
        <span className="text-xs text-gray-600">
          See screenshots in the &quot;📁 Demo&quot; folder
        </span>
        {'\n'}
      </section>
    </>
  );
}
