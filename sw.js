/* ── Aviara Service Worker ──────────────────────
   Caches the app shell so the UI loads instantly
   even offline. The large AI model (~52 MB) is
   handled separately by the app's own Cache API
   code — we don't touch it here.
─────────────────────────────────────────────── */

const SHELL_CACHE = 'aviara-shell-v1';

// App shell files to cache on install
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

/* ── Install: cache the app shell ── */
self.addEventListener('install', event => {
  self.skipWaiting(); // activate immediately
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(SHELL_FILES))
      .catch(err => console.log('SW install cache error:', err))
  );
});

/* ── Activate: clean up old shell caches ── */
self.addEventListener('activate', event => {
  self.clients.claim(); // take control immediately
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key =>
            // Remove old shell caches but keep aviara-v2 (model cache)
            key !== SHELL_CACHE && key.startsWith('aviara-shell')
          )
          .map(key => caches.delete(key))
      )
    )
  );
});

/* ── Fetch: serve shell from cache, let everything else go to network ── */
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  // Let these always go to the network (external APIs, CDNs, tiles, model)
  const passThrough = [
    'huggingface.co',
    'api.inaturalist.org',
    'wikipedia.org',
    'nominatim.openstreetmap.org',
    'xeno-canto.org',
    'tile.openstreetmap.org',
    'unpkg.com',
    'cdn.jsdelivr.net',
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];
  if (passThrough.some(domain => url.includes(domain))) return;

  // Cache-first for app shell files
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      // Not in cache — fetch from network and cache for next time
      return fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(SHELL_CACHE)
            .then(cache => cache.put(event.request, clone))
            .catch(() => {});
        }
        return response;
      }).catch(() => {
        // Offline fallback — return index.html for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
