const CACHE_NAME = 'sypt-app-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  // Include other assets to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        // Clone the request to ensure it's safe to read when adding to cache
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check for valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response to add to cache
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      ))
  );
});
