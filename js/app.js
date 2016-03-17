// STEP 1 - get the input from the user
$(document).ready(function () {

    var getTasteKidAPIResults = function (searchTerm) {

        var params = {
            k: '212836-APITesti-7MEW060H',
            type: 'movies',
            q: searchTerm,
            callback: 'foobar',
            verbose: 1,
            info: 1
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
            .done(function (result) { //show Results
                /* if the results are meeningful, we can just console.log them */
                if (result.Similar.Results.length === 0) {
                    alert('No results found.');
                } else {
                    var output = "";


                    $.each(result.Similar.Results, function (key, value) {
                        //concatenate the results inside the HTML variable
                        console.log(value);
                        output += '<li>';
                        output += '<div class="movie-container">';
                        output += '<div class="title-wrapper"><h3 class="movie-name">' + value.Name + '</h3></div>';
                        output += '<br>'
                        output += '<div class= "movie-details">'; //movie desctiption
                        //Youtube clip URL yURL
                        //Wikipedia URL wURL
                        //Movie description
                        output += '<p class="movie-teaser">' + "<span class='info-heading'><b>Information about the movie: </b></span>" + value.wTeaser + '</p>';
                        output += '<br>'
                        output += '<p class="youtube-clip"><a href="' + value.yUrl + '" target= _blank>' + "<span><b>Click here to watch the trailer:</b></span> " + value.yUrl + '</a></p>';
                        output += '<br>'
                        output += '<p class="wiki-info"><a href="' + value.wUrl + '" target= _blank>' + "<span><b>Click here for more info about the film:</b></span> " + value.wUrl + '</a></p>';
                        output += '</div>';
                        output += '</div>';
                        output += '</li>';
                    });

                    $('.results ul').html(output);
                }
            });
    };

    $('#search-button').on('click', function (e) {
        e.preventDefault();
        getTasteKidAPIResults($("#search-box").val());
        $("#search-box").val('');
        $('.results ul').show();

    });
    $(document).on('keypress', function (e) {
        //keyCode == 13 is the ENTER key
        if (key.keyCode === 13) {
            e.preventDefault();
            getTasteKidAPIResults($("#search-box").val());
            $("#search-box").val('');
            $('.results ul').show();
        }
    });

});
