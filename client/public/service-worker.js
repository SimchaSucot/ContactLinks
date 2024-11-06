const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  // כאן אפשר להוסיף קבצים נוספים שתרצה לשמור במטמון
];

// התקנה של Service Worker והוספת קבצים למטמון
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// ניהול בקשות על ידי Service Worker
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // אם הבקשה נמצאת במטמון, החזר אותה
        if (response) {
          return response;
        }
        // אם הבקשה לא במטמון, בקש מהשרת
        return fetch(event.request);
      })
  );
});

// עדכון Service Worker והסרת גרסאות ישנות של מטמון
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
