// Service Worker — Phase 4: Offline caching
const CACHE_NAME = "roadsos-v1";
const OFFLINE_ASSETS = ["/", "/guide", "/manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_ASSETS)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).catch(() => caches.match("/")))
  );
});
