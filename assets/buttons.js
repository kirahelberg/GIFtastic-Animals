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

      var rating = results[i].rating;

      var rating = $("<p>").text("Rating: " + rating);

      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height.url);

      gifDiv.prepend(rating);
      gifDiv.prepend(animalImage);

      $("#gifs-appear-here").prepend(gifDiv);
    }
  });
});
