
let restaurants,
  neighborhoods,
  cuisines
var map
var markers = []

var mapIframe;

/**
 * Will initate the service worker with global scope.
 * @function startServiceWorker
 */
 function startServiceWorker() {
  if (!navigator.serviceWorker) return;

  var indexController = this;

  navigator.serviceWorker.register('../sw.js',{ scope: '/' }).then(function(reg) {
    if (!navigator.serviceWorker.controller) {
      return;
    }
  });
 }

 startServiceWorker();
/**
 * Will fetch the data from the server to be displayed at the frontend
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
  document.getElementById('map-toggle').addEventListener('click',function (e) {
      toggleMapView();
  })

  fetchRestaurantReviews();

});

/**
 * Will set the display to none for the loader image, after the pages has been fully loaded
 * @function hideLoader
 */
function hideLoader(){
  document.getElementById('maincontent').style.display = 'flex';
  document.getElementById('loader-div').style.display = 'none';
}

/**
 * Will set the display of the map to show or hide
 * @function toggleMapView
 */
function toggleMapView(){
  var $map = document.getElementById('map-container');

  if($map.style.display =="none" || $map.style.display ==""){
    $map.style.display = 'flex';
    document.getElementById('map-toggle').innerText = 'Hide map';

   mapIframe = document.querySelector('iframe')
   if(mapIframe.title && mapIframe.title == ""){
       mapIframe.title = "Google Maps"
    }

  }else{
    $map.style.display = 'none';
    document.getElementById('map-toggle').innerText = 'Show map';
  }
}
/**
 * Fetch all neighborhoods and set their HTML.
 * @function fetchNeighborhoods
 */

function fetchNeighborhoods () {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 *  * @function fillNeighborhoodsHTML
 */
function fillNeighborhoodsHTML (neighborhoods = self.neighborhoods) {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}
 /**
 * Fetch all cuisines and set their HTML.
 * @function fetchCuisines
 */
function fetchCuisines () {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}
function fetchRestaurantReviews () {
  DBHelper.fetchRestaurantReviews();
}

 /**
 * Set cuisines HTML.
 * @function fillCuisinesHTML
 */
function fillCuisinesHTML  (cuisines = self.cuisines) {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });

  updateRestaurants();
  hideLoader();
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
    let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
}

/**
 * Update page and map for current restaurants.
 * @function updateRestaurants
 */
function updateRestaurants () {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}

 /**
 * Clear current restaurants, their HTML and remove their map markers.
 * @function resetRestaurants
 */
function resetRestaurants (restaurants) {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.restaurants = restaurants;
}
 
 /**
 * Create all restaurants HTML and add them to the webpage.
 * @function fillRestaurantsHTML
 */
function fillRestaurantsHTML (restaurants = self.restaurants) {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

 /**
 *  Create restaurant HTML.
 * @function createRestaurantHTML
 */
 
function createRestaurantHTML (restaurant)  {
  const li = document.createElement('li');

  const image = document.createElement('img');
  image.className = 'restaurant-img lazyload';
  image.alt ='Restaurant of ' + restaurant.name + 'with cuisine type of ' + restaurant.cuisine_type;
  image.setAttribute('data-src',DBHelper.imageUrlForRestaurant(restaurant));
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  // image.srcset = DBHelper.imageUrlForRestaurantMobile(restaurant) + " 350w"
  li.append(image);

  const name = document.createElement('h2');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const hiddenSpan = document.createElement('span');
  hiddenSpan.innerHTML = "Link to the " + restaurant.name;

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);
  more.append(hiddenSpan);
  
  li.append(more)

  return li
}

 /**
 *  Add markers for current restaurants to the map.
 * @function createRestaurantHTML
 */
function addMarkersToMap (restaurants = self.restaurants) {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
}
