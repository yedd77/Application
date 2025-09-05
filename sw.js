// sw.js - Service Worker for PWA
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("pwa-v1").then((cache) => { // Cache essential assets
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/icon-192.png",
        "/icon-512.png"
      ]);
    })
  );
});

// Activate event
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)) // Serve from cache or fetch from network
  ); 
});
