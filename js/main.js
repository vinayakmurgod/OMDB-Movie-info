$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

// functions

function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com/?apikey=57b3d1b8&s=" + searchText)
    .then((response) => {
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $("#movies").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieID", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieID");

  axios
    .get("http://www.omdbapi.com/?apikey=57b3d1b8&i=" + movieId)
    .then((response) => {
      let movie = response.data;
      console.log(movie)
      let output = `
      <div class="row">
          <div class="col-md-4">
            <div class="well text-center">
              <img src="${movie.Poster}">
            </div>
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
            <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
            <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
            <li class="list-group-item"><strong> Rated: </strong>${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
            <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
        </ul>
        <div class="row">
            <div class="well">
                <h3>Plot</h3>
                <p>${movie.Plot}</p>
                <hr>
                <a href="https://imdb.com/title/${movie.imdbID}" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-default">Back To Search</a>
            </div>
        </div>
          </div>
      </div>

      `;

      $("#movie").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
