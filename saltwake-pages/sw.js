// Saltwake offline cache. The version changes whenever the game is rebuilt, which refreshes the cache.
const CACHE = 'saltwake-11447317cd';
const FILES = [
 "./",
 "./assets/q/anne.glb",
 "./assets/q/bird.glb",
 "./assets/q/captain.glb",
 "./assets/q/henry.glb",
 "./assets/q/mako.glb",
 "./assets/q/shark.glb",
 "./assets/q/sharky.glb",
 "./assets/q/skeleton.glb",
 "./assets/q/skeleton2.glb",
 "./assets/q/tentacle.glb",
 "./assets/qprops.glb",
 "./assets/sfx/bookFlip1.mp3",
 "./assets/sfx/click-a.mp3",
 "./assets/sfx/click_001.mp3",
 "./assets/sfx/confirmation_001.mp3",
 "./assets/sfx/doorOpen_1.mp3",
 "./assets/sfx/explosionCrunch_002.mp3",
 "./assets/sfx/footstep00.mp3",
 "./assets/sfx/footstep01.mp3",
 "./assets/sfx/footstep02.mp3",
 "./assets/sfx/footstep03.mp3",
 "./assets/sfx/handleCoins.mp3",
 "./assets/sfx/impactGeneric_light_000.mp3",
 "./assets/sfx/impactPlank_medium_001.mp3",
 "./assets/sfx/impactSoft_medium_000.mp3",
 "./assets/sfx/impactWood_heavy_000.mp3",
 "./assets/sfx/switch-a.mp3",
 "./assets/sword.glb",
 "./assets/world.glb",
 "./icons/icon-180.png",
 "./icons/icon-192.png",
 "./icons/icon-512.png",
 "./icons/icon-maskable-512.png",
 "./index.html",
 "./manifest.webmanifest",
 "./vendor/three/build/three.module.min.js",
 "./vendor/three/examples/jsm/libs/meshopt_decoder.module.js",
 "./vendor/three/examples/jsm/loaders/GLTFLoader.js",
 "./vendor/three/examples/jsm/utils/BufferGeometryUtils.js",
 "./vendor/three/examples/jsm/utils/SkeletonUtils.js"
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok && new URL(req.url).origin === location.origin) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => hit)));
});
