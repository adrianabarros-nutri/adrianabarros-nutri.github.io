const CACHE_NAME='adriana-barros-anamnese-v5-final';
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(CACHE_NAME).then(c=>c.put('./index.html',x));return r;}).catch(()=>caches.match('./index.html').then(x=>x||caches.match('./'))));return;}e.respondWith(caches.match(e.request).then(cached=>{const net=fetch(e.request).then(r=>{if(r&&r.ok){const x=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,x));}return r;}).catch(()=>cached);return cached||net;}));});
