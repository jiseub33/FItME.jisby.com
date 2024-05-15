const CACHE_URLS = [
  '/',
  '/dictionary.html',
  '/css/main.css',
  '/css/dictionary.css',
  '/js/time.js',
  '/js/missions.js',
  '/js/dictionary.js',
  '/offline.html'
];

const CURRENT_PAGE_URL = location.pathname; // 현재 페이지의 URL을 가져옵니다.

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CACHE_URLS))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(OFFLINE_URL);
        return cachedResp;
      }
    })());
  }
});

// 현재 페이지의 URL을 CACHE_URLS에 추가합니다.
CACHE_URLS.push(CURRENT_PAGE_URL);

// 현재 페이지를 캐시에 추가하는 route를 등록합니다.
workbox.routing.registerRoute(
  CURRENT_PAGE_URL,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);