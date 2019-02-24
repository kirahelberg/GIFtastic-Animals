var animals = ["cat", "dog", "bird", "lion", "bear", "horse"];

// Function for displaying movie data
function renderButtons() {
  $("#button-view").empty();

  // Looping through the array and add a button for each animal
  for (var i = 0; i < animals.length; i++) {
    var btn = $("<button>");
    btn.addClass("animal");
    btn.attr("data-name", animals[i]);
    btn.text(animals[i]);
    $("#button-view").append(btn);
  }
}

// When the button is clicked or user presses enter
// Add the new animal button to the correct location
$("#add-animal").on("click", function(event) {
  event.preventDefault();

  var userInput = $("#animalButton-input")
    .val()
    .trim();
  animals.push(userInput);

  renderButtons();
});

renderButtons();

$("button").on("click", function() {
  var animal = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");

      //Create variables for rating, still gif, moving gif
      var rating = results[i].rating;
      var stillGif = results[i].images.fixed_height_still.url;
      var movingGif = results[i].images.fixed_height.url;

      var rating = $("<p>").text("Rating: " + rating);

      var animalGif = $("<img id='animalGif'>");
      animalGif.attr("src", stillGif);
      animalGif.attr("data-still", stillGif);
      animalGif.attr("data-animate", movingGif);
      animalGif.attr("state", "still-gif");

      gifDiv.prepend(rating);
      gifDiv.prepend(animalGif);

      $("#gifs-appear-here").prepend(gifDiv);
    }
  });

  //NOT WORKING - WHY?

  //When user clicks GIF, it animates
  //Click again to stop animation
  $("#animalGif").on("click", function(event) {
    // Create variable to check the current state of the GIF
    var state = $(this).attr("state");

    // If the state is still, then animate
    if (state === "still-gif") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("state", "moving-gif");
    }

    // if the state is moving, then change to still
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("state", "still-gif");
    }
  });
});
