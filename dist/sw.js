//THese scripts has to be in the root folder!!
importScripts('idb.js');

const SERVER_URL = 'http://localhost:1337';

var dbPromise = idb.open('restaurant-db', 1, function (db) {
});

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
    if (requestUrl.href.includes('restaurants') && !requestUrl.href.includes('is_favorite')) {
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


//0.This will be triggered when connection is reestablished and synronization might be needed
self.addEventListener('sync', function(event) {
  console.log('[Service Worker] Background syncing', event);
//1.To identify our sync task specificly
  if (event.tag === 'sync-new-review') {
    console.log('[Service Worker] Syncing new Posts');
//3. Wait until the following scripts will end    
    event.waitUntil(
//4. Will fetch all of the stored data from the indexDB

      readyReviewsToBeSynced('sync-reviews')
        .then(function(data) {
//5. We make a seperate Post requests to store all of the posts seperately on firebase.
          for (var dt of data) {
            fetch(SERVER_URL+'/reviews/', {
              method: 'POST',
              body: JSON.stringify(dt)
            })
  //6.Delete the sent post from indexDB, we do not have access to the DOM          
              .then(function(res) {
                console.log('Background snyc post worked',res);
                deleteItemFromData(dt.id);
              })
//7.Catch any error during the fetch method
              .catch(function(err) {
                console.log('Error while sending data', err);
              });
          }

        })
    );
  }
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

function readyReviewsToBeSynced(params) {
  return dbPromise.then(function(db) {
        
    var tx = db.transaction('sync-reviews', 'readwrite');
    var syncReviewsStore = tx.objectStore('sync-reviews');
  //Get the object from the OjbectStore by it's id, it is important that the id keypath is a type of number, so we should search number types
    return syncReviewsStore.getAll();
  
  });
}

function deleteItemFromData(id) {
  dbPromise
    .then(function(db) {
      var tx = db.transaction('sync-reviews', 'readwrite');
      var store = tx.objectStore('sync-reviews');
      store.delete(id);
      return tx.complete;
    })
    .then(function() {
      console.log('Item deleted!');
    });
}


