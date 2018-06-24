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
      console.log('there has been an error while fething fetchReviewsByRestaurantId',error);

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

  //Creating add Review button + the Submittion from in JS
  const formDiv = document.createElement('div');
  formDiv.id = 'review-add';

  const link = document.createElement('a');
  link.innerHTML = 'Add a Review';
  const button = document.createElement('button');
  button.id = 'addReview';
  button.appendChild(link);
  
  let formDivision = document.createElement('div');
  formDivision.className ="addReviewFormContainer"
  formDivision.innerHTML = createForm();
  formDivision.style.display = "none";
  formDiv.appendChild(button);
  formDiv.appendChild(formDivision);
  
  container.appendChild(formDiv);
  
  let addReviewClose = document.getElementById('add-review-close');
  let submitReviewButton = document.getElementById('formSubmission');

  //Add event listeners, to hide/show form,button.
  button.addEventListener('click',function() {
    this.style.display = 'none'
    formDivision.style.display = 'flex';
  });
  
  addReviewClose.addEventListener('click',function() {
    button.style.display = 'initial'
    formDivision.style.display = 'none';
  });

  submitReviewButton.addEventListener('click',function (e) {
    console.log('submitting review');
    e.preventDefault();
    this.validateReviewForm();
  }.bind(window));
  
}

/**
 * Create the submission html
 */
function createForm() {

    let formHTML =`  <form>

    <div id="add-review-container">
  
      <div class="header">
        <input  type="text" name="name"  value='' placeholder='Your Name' id="reviewerName">
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
      <div id='formErrors'></div>
      
      <button id="formSubmission">Submit Review</button>

  
    </div>
  
  </form>`

  return formHTML;

}

/**
 * Will check if all of the fields are correct.
 */
function validateReviewForm() {

  let errors = [];
  let restaurantID = restaurant.id; 

  //DOM SELECTORS 
  let formErrorsDiv = document.getElementById('formErrors');
  let reviewName = document.getElementById('reviewerName');
  let reviewRating = document.getElementById('reviewerRating');
  let reviewComments = document.getElementById('reviewerComments');

  if(!validName(reviewName.value)){
      errors.push('Name length should be between 0 and 10 charachters');
  }
  if (!validComment(reviewComments.value)) {
    errors.push('Comment cannot be empty');
  }
  formErrorsDiv.innerHTML='';

  for (let index = 0; index < errors.length; index++) {
    const element = errors[index];
    
    let errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.innerText = element;

    formErrorsDiv.appendChild(errorDiv);
    
  }

  if(errors.length == 0){
      postReview(createPostObject(restaurantID,reviewName.value,reviewRating.value,reviewComments.value),showPostResult);  
  }
}

/**
 * Will check if the recieved name variable is not empty
 */
function validName(name) {

  if(name == 'name' || name =='' || name ==null || name== undefined){
    return false;
  }
  return true;
  
}
/**
 * Will check if the recieved comments variable is not empty
 */
function validComment(comments) {

  if( comments =='' || comments ==null || comments== undefined){
    return false;
  }
  return true;
  
}
/**
 * Will create a object for the POST request
 */
function createPostObject(id,name,rating,comments) {
  
  let obj = {
    "restaurant_id": id,
    "name":name,
    "rating": rating,
    "comments": comments
  }
  return obj;
}
/**
 * Will create a POST request to the server, to add review to the restaurant + will execute a callback
 */
function postReview(data,callback) {

    fetch(DBHelper.DATABASE_URL+'/reviews/', {
      method: 'post',
      body: JSON.stringify(data)
    }).then(function(response) {
      return response.json();
    }).then(function(res) {
      console.log('successful post',res);
      callback(true,data);
    }).catch(function(error) {
      console.log('error has been occured',error);
      callback(false,data);
    });
 
}


/**
 * WIll hide the form + button, will add a success message + fill in the reviewmessage html for the created review
 */
function showPostResult(success,review) {
  let reviewForm = document.getElementById('add-review-container');
  let reviewAdd = document.getElementById('review-add');

  reviewForm.style.display = 'none';
  let createdDiv = document.createElement('div');
  createdDiv.className = 'review-post-status';

  const ul = document.getElementById('reviews-list');

  let reviewObj =  {
    comments:  review.comments,
    id:review.restaurant_id,
    name:review.name,
    rating:review.rating,
    restaurant_id:restaurant.id,
    updatedAt:Date.now(),
  }

  ul.appendChild(createReviewHTML(reviewObj));

  if(success){
    createdDiv.innerHTML = 'Review has been successfully posted';

  }else{
    createBackgroundSyncTaskForReview(reviewObj);
    // DBHelper.storeReviewsForLaterSync(reviewObj);
    createdDiv.innerHTML = 'Review will be posted upon reconnection';
  }
  
  reviewAdd.appendChild(createdDiv);

}
function createBackgroundSyncTaskForReview(reviewObj){
    //1.We can only use background sync only if there is a service manager a&& SyncManager
    // if ('serviceWorker' in navigator && 'SyncManager' in window) {
    if (navigator.serviceWorker && window.SyncManager) {

      console.log('Syncmasmanager is working, registering task');
      //2. Check if the service worker is installed and ready to work, will return a promise
        navigator.serviceWorker.ready
          .then(function(sw) {

      //4.Store it in the indexedDB, returns a promise
      DBHelper.storeReviewsForLaterSync(reviewObj)
              .then(function() {
      //5.Register syncronization task in the service worker that it can 
                console.log('review storedm ready to register a task');
                return sw.sync.register('sync-new-review');
              })
      //6. Adding some user feedback that we saved this data
              .then(function() {
                  console.log('registered task');
              })
              .catch(function(err) {
                console.log(err);
              });
          });
      }
}
/**
 * Create review HTML and add it to the webpage.
 */
function createReviewHTML (review){
  console.log('creating review',review);
  const li = document.createElement('li');
  const header = document.createElement('div');
  header.className="review-header";
  const name = document.createElement('p');
  name.innerHTML = review.name;
  name.className="review-name";
  header.appendChild(name);

  const date = document.createElement('p');
  date.className="review-date"; 
  // let reviewDate = new Date (review.updatedAt);
  // date.innerHTML = reviewDate.getDay() + ' / ' + reviewDate.getMonth() + ' / ' +  reviewDate.getFullYear();
  date.innerHTML = createDateFormat(review.updatedAt);
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

function createDateFormat(data) {

  if (typeof data == 'number') {

    let reviewDate = new Date (data);
    return reviewDate.getDay() + ' / ' + reviewDate.getMonth() + ' / ' +  reviewDate.getFullYear();
    
  }else if(typeof data == 'string'){

    let fullDate = data.split('T');
    let date = fullDate[0];
    let dateParts = date.split('-');

    return dateParts[2] + ' / ' + parseInt(dateParts[1],10) + ' / ' +  parseInt(dateParts[0],10);

  }
  
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

