// SocialAI Studio Service Worker v4
// Fixed: network-first for JS/CSS assets, MIME validation, cache busting
const CACHE_VERSION = "socialai-studio-v4";
const SHELL_CACHE = "socialai-shell-v4";

const PRECACHE_ASSETS = [
  "/manifest.json",
  "/socialaistudio.png"
];

// On install: precache only safe static assets (NOT HTML, NOT JS bundles)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  // Immediately activate the new SW, replacing the old one
  self.skipWaiting();
});

// On activate: delete ALL old caches from previous versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          // Delete any cache that isn't the current version
          if (key !== CACHE_VERSION && key !== SHELL_CACHE) {
            console.log("[SW] Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// On fetch: smart strategy per resource type
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Always bypass SW for API requests → pure network
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // 2. JS / CSS / Module scripts → NETWORK FIRST (never serve stale bundles)
  //    This prevents the MIME text/html error from cached bad responses
  const isJSorCSS = url.pathname.includes("/assets/") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".mjs");

  if (isJSorCSS) {
    event.respondWith(
      fetch(request).then((networkResponse) => {
        // Only cache if MIME type is correct (not HTML)
        const contentType = networkResponse.headers.get("content-type") || "";
        if (
          networkResponse.ok &&
          !contentType.includes("text/html")
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      }).catch(() => caches.match(request))
    );
    return;
  }

  // 3. HTML navigation requests → NETWORK FIRST (always get fresh HTML)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/index.html"))
    );
    return;
  }

  // 4. Images / icons / manifest → Cache first, fallback network
  event.respondWith(
    caches.match(request).then(
      (cached) => cached || fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
          const clone = networkResponse.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      })
    )
  );
});

// Handle Notification Click event - Focus or Open Application
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("/") && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});
