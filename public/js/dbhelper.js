
// --- *** idb object is loeaded before the dbhelper, so window.idb can be accessed *** --- //

// --- *** Creating a restaurant 'table' in the IndexedDB *** --- //
var dbPromise = window.idb.open('restaurant-db', 1, function (db) {
  if (!db.objectStoreNames.contains('restaurants')) {
    db.createObjectStore('restaurants',{keyPath: 'id'});
  }
  if (!db.objectStoreNames.contains('reviews')) {
    db.createObjectStore('reviews',{keyPath: 'id'});
  }
});


/**
 * Common database helper functions.
 */
class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    //These are the settings to fetch the data from the server

    const port = 1337 // Change this to your server port
    return `http://localhost:${port}`;

    //These are the setting to fetch from the restaurant.json, server by express

    // const port = 3000 // Change this to your server port
    // return `http://localhost:${port}/data/restaurants.json`;

  }

  /**
   * Fetch all restaurants form network first than cache.
   */
  static fetchRestaurants(callback) {
    fetch(DBHelper.DATABASE_URL+'/restaurants')
    .then(function(response) {
      return response.json();
    })
    .then(function(restaurants) {
      //Storing objects recieved in the response seperately in the indexedDb
        dbPromise.then(function(db) {
              var tx = db.transaction('restaurants', 'readwrite');
              var restaurantStore = tx.objectStore('restaurants');

              restaurants.map(function(el){
                restaurantStore.put(el);
              })

              return tx.complete;
        })
        callback(null,restaurants);

    }).catch(function(error) {
      //Fetching data from indexedDB if there is no connection
        dbPromise.then(function(db) {
            var tx = db.transaction('restaurants', 'readwrite');
            var restaurantStore = tx.objectStore('restaurants');

            restaurantStore.getAll().then(function(data){
                callback(null,data);
            })

      });
    });
  }


  static fetchRestaurantReviews(){

    fetch(DBHelper.DATABASE_URL+'/reviews/')
    .then(function(response) {
      return response.json();
    })
    .then(function(reviews) {
      //Storing objects recieved in the response seperately in the indexedDb
        dbPromise.then(function(db) {
              var tx = db.transaction('reviews', 'readwrite');
              var reviewsStore = tx.objectStore('reviews');

              reviews.map(function(el){
                reviewsStore.put(el);
              })

              return tx.complete;
        })
        // callback(null,reviews);

    }).catch(function(error) {
      //Fetching data from indexedDB if there is no connection
      //   dbPromise.then(function(db) {
      //       var tx = db.transaction('reviews', 'readwrite');
      //       var reviewsStore = tx.objectStore('reviews');

      //       reviewsStore.getAll().then(function(data){
      //           callback(null,data);
      //       })

      // });
    });  
  }

  static fetchReviewsByRestaurantId(id,callback){
    console.log('fetching for ', id);
    let url = DBHelper.DATABASE_URL+'/reviews/?restaurant_id='+id;
    
    fetch(url)
    .then(function(response) {
      console.log('this is the response',response);
      return response.json();

    }).then(function(reviews) {

        callback(null,reviews);

    }).catch(function(error){

        callback(error,undefined);
    });

  }

  static fetchReviewsByRestaurantIdFromIDB(id,callback){

    dbPromise.then(function(db) {

      var tx = db.transaction('reviews', 'readwrite');
      var reviewsStore = tx.objectStore('reviews');
  //Get the object from the OjbectStore by it's id, it is important that the id keypath is a type of number, so we should search number types
        reviewsStore.getAll().then(function(data){
          let restaurantReviews = data.filter(function(review) {
              return review.restaurant_id == id;
          })
          callback(restaurantReviews);
      })

    });

  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    fetch(DBHelper.DATABASE_URL+'/restaurants/'+id)
    .then(function(response) {
        return response.json();
    })
    .then(function(restaurant) {
        callback(null,restaurant);

    }).catch(function(error) {
      dbPromise.then(function(db) {

          var tx = db.transaction('restaurants', 'readwrite');
          var restaurantStore = tx.objectStore('restaurants');
      //Get the object from the OjbectStore by it's id, it is important that the id keypath is a type of number, so we should search number types
          restaurantStore.get(Number(id)).then(
              function(data){
                  callback(null,data);
              }

          )

      });
      
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurants?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`img/${restaurant.id}-desktop.jpg`);
  }

  static imageUrlForRestaurantMobile(restaurant) {
    return (`img/${restaurant.id}-mobile.jpg`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  }

}
