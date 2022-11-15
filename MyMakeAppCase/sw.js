const cacheName = 'app-v1';

const toCache = [

    "./images/back-svgrepo-com.svg",
    "./images/base.png",
    "./images/batom.png",
    "./images/bkg.png",
    "./images/blush.png",
    "./images/esponja.png",
    "./images/pincel-de-boca.png",
    "./images/pincel-de-olho.png",
    "./images/pofacial.png",
    "./images/pofacial96x96.png",
    "./images/pofacial144x144.png",
    "./images/rimel.png",
    "./images/sombra.png",
    "./scripts/app-makeAPP.js",
    "./scripts/app.js",
    "./scripts/queryMake.js",
    "./style/addProduct.css",
    "./style/style.css",
    "./style/viewProduct.css",
    "./addProduct.html",
    "./index.html",
    "./manifest.json",    
    "./sw.js",
    "./viewProducts.html",    
    "/",
    
];
async function cacheStaticAssets() {

  const cache = await caches.open(cacheName); 
  return cache.addAll(toCache);     
  
}

async function addToCache(request, response){
    
  const cache = await caches.open(cacheName);   
  cache.put(request, response);

}

async function fetchFromNetwork (request){

  const response = await fetch(request);
  addToCache(request, response.clone());
  return response;

}

async function fetchFromCache(request){

  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  return cachedResponse || null;
}

async function networkFirst(request){

  const requestResponse = 
    (await fetchFromCache(request)) || (await fetchFromNetwork(request));
    return requestResponse;

}

self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installing service worker");    
    event.waitUntil(cacheStaticAssets());
    self.skipWaiting();
    
  });
  
  self.addEventListener("activate", () => {
    console.log("[Service Worker] Activating service worker!");
    return self.clients.claim();
  });
  
  self.addEventListener("fetch", (event) => {
    console.log("[Service Worker] Fetch event worker!", event.request.url);
    event.respondWith(networkFirst(event.request));
  });

 