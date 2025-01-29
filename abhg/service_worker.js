// /* eslint-disable no-restricted-globals */
// const STATIC_CACHE_NAME = "interoperability-cache-data";
// const DYNAMIC_CACHE_NAME = "interoperability-cache-data-dynamic";

// self.addEventListener('install', event => {
//   const cachePromises = caches.open(STATIC_CACHE_NAME).then(cache => {
//     self.skipWaiting();
//     return cache.addAll([
//       '/static/js/bundle.js',
//       '/static/js/0.chunk.js',
//       '/static/media/usa.ecdc9c9e.svg',
//       '/static/media/logo.b51b4a11.png',
//       '/static/js/main.chunk.js',
//       '/static/media/prt.07f887f2.svg',
//       '/logo192.png',
//       '/manifest.json	',
//       '/favicon.ico',
//       '/static/js/1.chunk.js',
//       '/covid/home',
//       '/'
//     ])
//   })
//   event.waitUntil(cachePromises)
// })

// self.addEventListener('activate', event => {
//   self.clients.claim();
// });

// //Cache de dados dinamicos
// self.addEventListener('fetch', event => {
//   const response = caches.match(event.request).then(res => {
//     return res || fetch(event.request).then(res => {
//       caches.open(DYNAMIC_CACHE_NAME).then(cache => {
//         if (event.request.url !== "https://httpbin.org/get") {
//           cache.put(event.request, res);
//         }
//       });
//       return res.clone();
//     });
//   });

//   event.respondWith(response)

// });


