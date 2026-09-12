// Минимальный Service Worker для PWA
const CACHE_NAME = 'uptime-dashboard-v1';
const ASSETS = [
  './',
  './index.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Сеть в приоритете, кэш — как fallback (чтобы данные с ntfy всегда были свежие)
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
