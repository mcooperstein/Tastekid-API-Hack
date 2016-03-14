// STEP 1 - get the input from the user
$(document).ready(function () {
    $('.search-movie').submit(function (event) {
        //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
        event.preventDefault();
        // zero out results if previous search has run
        $('.results').html('');
        // get the value of the tags the user submitted
        var tags = $("#movieSearch").val();
        //run the API search with the user input above
        getTasteKidAPIResults(tags);
        getOmdbAPIResults(tags);
    });
});

// STEP 2 - using the input from the user (query) make the API call to get the JSON response

var getTasteKidAPIResults = function (searchTerm) {

    var params = {
        k: '212836-APITesti-7MEW060H',
        type: 'movies',
        info: 0,
        q: searchTerm,
        callback: 'foobar'
    };
    var result = $.ajax({
            /* update API end point */
            url: "https://www.tastekid.com/api/similar",
            data: params,
            dataType: "jsonp",
            /*set the call type GET / POST*/
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            console.log(result);
            showTasteKidResults(result);
            //call here the function to display Tastekid API results
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

// STEP 2 - using the input from the user (query) make the API call to get the JSON response

var getOmdbAPIResults = function (searchTerm) {

    var apiUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&type=movie&tomatoes=true";

    var result = $.ajax({
            /* update API end point */
            url: apiUrl,
            //data: params,
            dataType: "json",
            /*set the call type GET / POST*/
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            console.log(result);
            showOmdbResults(result);
            //call here the function to display Tastekid API results
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

// STEP 3 (showTasteKidResults) - using the JSON response, populate the relevant part of your HTML with the variable inside the JSON

var showTasteKidResults = function (movie) {
    console.log(movie);
    // clone our result template code
    var result = $('.templates .movie').clone();

    // Set the question properties in result
    var movieElem = result.find('.movie-text a');
    movieElem.attr('href', movie.link);
    movieElem.text(movie.title);

    return result;

};


// STEP 3 (showOmdbResults) - using the JSON response, populate the relevant part of your HTML with the variable inside the JSON

var showOmdbResults = function (item) {
    console.log(item);
    var result = $('.templates .omdb').clone();
    var imdb = result.find('.imdb-rating a')
        .attr('href', item.link)
        //.text(item.imdb.display_name);
        //var image = "<img src='" + item.imdb.profile_image + "' alt='" + item.user.display_name + "'>";
        //$(user).append(image);
        //result.find('.imdb-rating').text(item.post_count);
        //result.find('.rt-rating').text(item.score);

    return result;

};


//EXTRA functions

// takes error string and turns it into displayable DOM element
var showError = function (error) {
    var errorElem = $('.templates .error').clone();
    var errorText = '<p>' + error + '</p>';
    errorElem.append(errorText);
};
