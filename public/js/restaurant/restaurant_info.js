let restaurant;
var map;

window.onload = function () {}

let SAMPLE_REVIEW = {
      comments:  "Five star food, two star atmosphere. I would definitely get takeout from this place - but dont think I have the energy to deal with the hipster ridiculousness again. By the time we left the wait was two hours long.",
      createdAt: 1504095567183,
      id:4,
      name:"Steph",
      rating:4,
      restaurant_id:2,
      updatedAt:1504095567183,
};
  
window.initMap = function ()  {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
      
      // const iframe = document.querySelector('iframe'); iframe.title = "Google Maps"; 
    }
  });
};


/**
 * Initialize Google map, called from HTML.
 */


/**
 * Get current restaurant from page URL.
 */
function fetchRestaurantFromURL (callback) {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    var error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
 * Create restaurant HTML and add it to the webpage
 */
function fillRestaurantHTML (restaurant = self.restaurant) {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img'
  image.alt ='Restaurant of ' + restaurant.name + ' with cuisine type of ' + restaurant.cuisine_type;
  image.src = DBHelper.imageUrlForRestaurant(restaurant);

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  fetchRestaurantReviews();
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
function fillRestaurantHoursHTML (operatingHours = self.restaurant.operating_hours)  {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('th');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}


function fetchRestaurantReviews(){

  const id = getParameterByName('id'); 

  let reviews = DBHelper.fetchReviewsByRestaurantId(id,(error, reviews) => {
    if(error){
      console.log('there has been an error',error);
      DBHelper.fetchReviewsByRestaurantIdFromIDB(id,function (reviews) {
        fillReviewsHTML(reviews);
      });
    }else{
      fillReviewsHTML(reviews);
    }
  });
}
/**
 * Create all reviews HTML and add them to the webpage.
 */
function fillReviewsHTML(reviews) {

  console.log('filling up the revievews html ',reviews);
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h3');
  title.innerHTML = 'Reviews';

  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);

  const formDiv = document.createElement('div');
  formDiv.id = 'review-add';

  const link = document.createElement('a');
  link.innerHTML = 'Add a Review';
  const button = document.createElement('button');
  button.id = 'addReview';
  button.appendChild(link);
  button.addEventListener('click',function() {
    // button.style.display = none;
    console.log('clicked');
  })

  let formDivision = document.createElement('div');
  formDivision.className ="addReviewFormContainer"
  formDivision.innerHTML = createForm();
  formDiv.appendChild(button);
  formDiv.appendChild(formDivision);

  container.appendChild(formDiv);

}


function createForm() {

    let formHTML =`  <form>

    <div id="add-review-container">
  
      <div class="header">
        <input  type="text" name="name" placeholder='Your Name' id="reviewerName">
        <span id="add-review-close"> X </span>
      </div>
  
      <div class="body">
      <div class="rating-div">
        <label for="rating">Rating :</label>
        <select name="rating" id="reviewerRating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
        <textarea name="comments"  placeholder='Write a review' id="reviewerComments" cols="30" rows="10" maxlength="150"></textarea>
      </div>
      
      <button id="formSubmittion">Submit Review</button>
  
    </div>
  
  </form>`

  return formHTML;


  // document.getElementById('addReview').style.display = none;

  // let formDiv = document.getElementById('review-add');

  // formDiv.appendChild(createReviewHTML(SAMPLE_REVIEW));
  
}
/**
 * Create review HTML and add it to the webpage.
 */
function createReviewHTML (review){
  const li = document.createElement('li');
  const header = document.createElement('div');
  header.className="review-header";
  const name = document.createElement('p');
  name.innerHTML = review.name;
  name.className="review-name";
  header.appendChild(name);

  const date = document.createElement('p');
  date.className="review-date"; 
  let reviewDate = new Date (review.updatedAt);
  date.innerHTML = reviewDate.getDay() + ' / ' + reviewDate.getMonth() + ' / ' +  reviewDate.getFullYear();
  // date.innerHTML = reviewDate;
  header.appendChild(date);

  li.appendChild(header);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  rating.className="review-rating";
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  comments.className="review-text";
  li.appendChild(comments);

  return li;
}

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
function fillBreadcrumb (restaurant=self.restaurant) {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  li.setAttribute("aria-current","page");
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
function getParameterByName (name, url) {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

