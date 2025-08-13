/* Qurbatan PWA Service Worker: caching + push */
const CACHE_NAME = 'qurbatan-static-v1';
const OFFLINE_URLS = [
  '/', '/index.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(OFFLINE_URLS);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const fresh = await fetch(request);
      return fresh;
    } catch {
      // fallback to index for SPA navigations
      if (request.mode === 'navigate') {
        const cache = await caches.open(CACHE_NAME);
        return cache.match('/index.html');
      }
      throw new Error('Network error');
    }
  })());
});

// Web Push
self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data?.json() || {}; } catch { data = {}; }
  const title = data.title || 'Qurbatan';
  const body = data.body || 'You have an update.';
  const url = data.url || '/';
  const icon = data.icon || '/icons/icon-192.png';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      badge: icon,
      data: { url },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = event.notification.data?.url || '/';
  event.waitUntil((async () => {
    const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    const found = allClients.find(c => c.url.includes(self.registration.scope) && 'focus' in c);
    if (found) {
      found.navigate(target);
      return found.focus();
    }
    return clients.openWindow(target);
  })());
});