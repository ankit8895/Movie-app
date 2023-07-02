//getting searched movie from localStorage
var searchedMovieDetails = JSON.parse(
  localStorage.getItem('searchedMoviesArray')
);

//for movie title
var movieTitle = document.getElementById('movie-title');
//for movie's released year
var movieYear = document.getElementById('movie-year');
//for movie's runtime
var movieRuntime = document.getElementById('movie-runtime');
//for movie's genre
var movieGenre = document.getElementById('movie-genre');
//for movie's director
var movieDirector = document.getElementById('movie-director');
//for movie's writer
var movieWriter = document.getElementById('movie-writer');
//for movie's actors
var movieActors = document.getElementById('movie-actors');
//for movie's language
var movieLanguage = document.getElementById('movie-language');
//for movie's country
var movieCountry = document.getElementById('movie-country');
//for movie's awards
var movieAwards = document.getElementById('movie-awards');
//for movie's plot
var moviePlot = document.getElementById('movie-plot');
//for movie's poster
var moviePoster = document.getElementById('movie-poster');
//for movie's imdb rating
var movieImdb = document.getElementById('movie-imdb');
//for movie's box office collection
var movieBoxOffice = document.getElementById('movie-boxOffice');
//for movie's total user given ratings
var movieImdbVotes = document.getElementById('movie-imdbVotes');

//addToMovieDetailsDOM() function with searched movie
function addToMovieDetailsDOM(movie) {
  //set movie's title
  movieTitle.innerHTML =
      movie.Title === undefined
          ? '<i class="fa-solid fa-ban" style="color: #e23003;"></i>'
          : `" ${movie.Title} "`;
  //set movie's released year
  movieYear.innerHTML =
      movie.Year === undefined
          ? '<i class="fa-solid fa-ban" style="color: #e23003;"></i>'
          : `${movie.Year}`;
  //set movie's runtime
  movieRuntime.innerHTML =
      movie.Runtime === undefined
          ? '<i class="fa-solid fa-ban" style="color: #e23003;"></i>'
          : `${movie.Runtime}`;
  //set movie's genre
  movieGenre.innerHTML =
      movie.Genre === undefined
          ? '<i class="fa-solid fa-ban" style="color: #e23003;"></i>'
          : `${movie.Genre}`;
  //set movie's director
  movieDirector.innerHTML =
      movie.Director === undefined
          ? '<i class="fa-solid fa-ban" style="color: #e23003;"></i>'
          : `${movie.Director}`;
  //set movie's writer
  movieWriter.innerHTML =
      movie.Writer === undefined
          ? '<i class="fa-solid fa-ban" style="color: #e23003;"></i>'
          : `${movie.Writer}`;
  //set movie's actors
  movieActors.innerHTML =
      movie.Actors === undefined
          ? '<i class="fa-solid fa-ban" style="color: #e23003;"></i>'
          : `${movie.Actors}`;
  //set movie's language
  movieLanguage.innerHTML =
      movie.Language === undefined
          ? '<i class="fa-solid fa-ban" style="color: #e23003;"></i>'
          : `${movie.Language}`;
  //set movie's country
  movieCountry.innerHTML =
      movie.Country === undefined
          ? '<i class="fa-solid fa-ban" style="color: #e23003;"></i>'
          : `${movie.Country}`;
  //set movie's awards
  movieAwards.innerHTML =
      movie.Awards === undefined
          ? '<i class="fa-solid fa-ban" style="color: #e23003;"></i>'
          : `${movie.Awards}`;
  //set movie's plot
  moviePlot.innerHTML =
      movie.Plot === undefined
          ? '<i class="fa-solid fa-ban" style="color: #e23003;"></i>'
          : `${movie.Plot}`;
  //set movie's imdb rating
  movieImdb.innerHTML =
      movie.imdbRating === undefined ? 'N/A' : `${movie.imdbRating}`;
  //set movie's box office collection
  movieBoxOffice.innerHTML =
      movie.BoxOffice === undefined
          ? '<i class="fa-solid fa-ban" style="color: #e23003;"></i>'
          : `${movie.BoxOffice}`;

  movieImdbVotes.innerHTML =
      movie.imdbVotes === undefined ? '' : `(${movie.imdbVotes})`;
  //set image to "src" attribute of movie's poster
  moviePoster.setAttribute('src', `${movie.Poster}`);
  //set movie's title to "alt" attribute
  moviePoster.setAttribute('alt', `${movie.Title}`);
}

//when movieInfo page gets loaded, addToMovieDetailsDOM() function will be called with the searched movie
document.body.onload = () => {
  addToMovieDetailsDOM(searchedMovieDetails[0]);
};
