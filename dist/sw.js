var staticCacheName = 'restaurant-app-v02';              //This is where all of the js, html files will be cached
var contentImgsCache = 'restaurant-content-imgs';       //This is where all of the images will be saved

// ** Installing the static files into the cache using the service worker 
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'index.html',
        'restaurant.html',
        '/js/bundle_restaurant_info.js',
        '/js/bundle.js',
        '/css/styles.css',
      ]);
    })
  );
  
});


// ** Clearing all of the other non relevant/outdated cache files 
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
          cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// ** Intercepting fetch requests
self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);
// ------ Cache photos ----- 
    if (requestUrl.pathname.endsWith('.jpg')) {
        event.respondWith(servePhoto(event.request));
      return;
    }
// ------ Return restaurant.html in case of *restaurants* ----- 
    if (requestUrl.pathname.includes('restaurants')) {
      console.log('intercepting restaurant id page');
      event.respondWith(
        caches.match('restaurant.html')
        .then(function(response) {
            return response;
        })
      );
      return;
    }
// ------ Match the request from the cache if possbile, if not fetch it from the server ----- 
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
          .then(function(res) {
                  return res;
            })
            .catch(function(err) {
            });
        }
      })
  );



});

function servePhoto(request) {
  var storageUrl = request.url.replace(/-\d+px\.jpg$/, '');
  //1. Will try to load the images-cache
  return caches.open(contentImgsCache).then(function(cache) {
    //2. Will try to match the url from the cache
    return cache.match(storageUrl).then(function(response) {
      //3. If there is a response it will return with it from the cache
      if (response) return response;
      //4. If not it will fetch the data
      return fetch(request).then(function(networkResponse) {
        //5. Then it will save it in the cache
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}
