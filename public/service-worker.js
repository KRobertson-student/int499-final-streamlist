const CACHE_NAME = 'streamlist-final-v1';
const APP_BASE_URL = new URL('./', self.location.href);
const INDEX_URL = new URL('index.html', APP_BASE_URL).href;
const APP_SHELL_URLS = [
  APP_BASE_URL.href,
  INDEX_URL,
  new URL('manifest.webmanifest', APP_BASE_URL).href,
  new URL('icons/streamlist-icon-192.png', APP_BASE_URL).href,
  new URL('icons/streamlist-icon-512.png', APP_BASE_URL).href,
  new URL('icons/streamlist-icon.svg', APP_BASE_URL).href,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const requestUrl = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseCopy = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(INDEX_URL, responseCopy));
          return response;
        })
        .catch(() => caches.match(INDEX_URL)),
    );
    return;
  }

  if (requestUrl.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => {
          if (response.ok) {
            const responseCopy = response.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, responseCopy));
          }

          return response;
        });
      }),
    );
  }
});
