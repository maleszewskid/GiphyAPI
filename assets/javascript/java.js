var topics = ["Star Wars", "Lord of the Rings", "Harry Potter", "Gears of War", "Mario", "JonTron", "Filthy Frank", "Donald Trump"];

function addSearchBtns() {
    $("#buttons").html("");
    for (i = 0; i < topics.length; i++) {
        var $button = $("<input id='button1' type='button' class='btn btn-lg search-btn' />");
        $button.val(topics[i]);
        $("#buttons").append($button);
    }
}
addSearchBtns();
$(document).on("click", ".btn", function(event) {
    event.preventDefault();
    $("#images").html("");
    var queryURL = "https://api.giphy.com/v1/gifs/search?";
    var query;
    var params = {
        q: query,
        limit: 10,
        api_key: "bmtPIdMB8ARfXzmvwaxCnMnsayy46MFh",
        fmt: "json"
    };
    if ($(this).hasClass("search-btn")) {
        query = $(this).val();
    } else if ($("#search").val() !== "") {
        query = $("#search").val();
        topics.push(query);
        if (topics.length > 6) {
            topics.shift();
        }
        addSearchBtns();
    }
    params.q = query;
    $.ajax({
        url: queryURL + $.param(params),
        method: "GET",
        success: function(r) {
            for (i = 0; i < params.limit; i++) {
                var $img = $("<img>");
                var $div = $("<div>");
                var $rating = $("<h6>");
                var gifObj = r.data[i];
                var gif = gifObj.images;

                $img.attr({

                    src: gif.fixed_height_still.url,
                    "data-animate": gif.fixed_height.url,
                    "data-still": gif.fixed_height_still.url,
                    "data-state": "still",
                    class: "gif"
                });

                $div.addClass("gif-image");
                $rating.text("Rating: " + gifObj.rating);
                $div.append($img, $rating);
                $("#images").append($div);
            }
            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        }
    });
});