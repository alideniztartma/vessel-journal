const CACHE_NAME = 'vessel-v0.3';
const ASSETS = [
    './',
'./index.html',
'./assets/css/main.css',
'./assets/js/app.js',
'./assets/icons/icon.png',
'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css',
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Lora:ital,wght@0,500;0,600;1,400&display=swap'
];

// Install Service Worker
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Fetch Assets
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
