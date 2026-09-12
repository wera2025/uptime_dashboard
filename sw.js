// Минимальный Service Worker.
// Нужен только для того, чтобы Chrome разрешил установку PWA.
// Ничего не кэширует — все данные всегда грузятся из сети.

self.addEventListener('install', () => {
  self.skipWaiting(); // активироваться сразу, не ждать
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // взять контроль над страницами
      // Удаляем все старые кэши, если они были
      caches.keys().then((keys) =>
        Promise.all(keys.map((key) => caches.delete(key)))
      )
    ])
  );
});

// Обработчик fetch обязателен для установки PWA.
// Ничего не делает — просто пропускает запросы в сеть.
self.addEventListener('fetch', () => {});
