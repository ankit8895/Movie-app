// movies container inside which display all searched movies
var moviesContainer = document.getElementById('movies-container');

// this variable is input tag for searched movies
var searchMovieText = document.getElementById('getUserInputMovie');

// this array contains all searched movies
var moviesArray = [];

// this array contains movies which add to favourites
var favouriteMoviesArray = [];

// addSearchMoviesToDOM() with the movie to display searched movies in the movies container
function addSearchMoviesToDOM(movie) {
    // create a div element
    const divElement = document.createElement('div');

    // add bootstrap card to created div element to display movie data's
    divElement.innerHTML = `
                        <div class="card mb-3 position-relative shadow p-3 mb-5 bg-body-tertiary rounded" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${movie.Poster}" class="img-fluid rounded-start" alt="${movie.Title}">
                                </div>
                                <div class="col-md-8">
                                <div class="card-body">
                                  <h5 class="card-title text-decoration-underline">${movie.Title}</h5>
                                  <p class="card-text fw-bolder text-body-secondary">${movie.Runtime}</p>
                                  <p class="card-text fw-bolder text-body-secondary">${movie.Genre}</p>
                                  <p class="card-text fw-bolder text-body-secondary"><i class="fa-solid fa-star" style="color: #e7e70d;"></i>${movie.imdbRating}</p>
                                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                      <a href="./movieInfo.html" class="btn btn-primary fw-bolder" id="${movie.imdbID}" onclick="searchedMoviesHandler(this)">More Details</a>
                                      <a href="./favourites.html" class="btn btn-danger fw-bolder" id="${movie.imdbID}" onclick="event.preventDefault(); favouriteMovieHandler(this)">
                                          <i class="fa-regular fa-heart"></i>
                                      </a>
                                  </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                         `;

    // append the div element to the movies container
    moviesContainer.append(divElement);
}

// renderMovies() function with the movie
function renderMovies(movieData) {
    // mark false to check if movie present in movies array
    let isPresent = false;

    // iterate over movies array
    moviesArray.forEach((movie) => {
        // if movie is found in the movies array then make it true
        if (movie.imdbID === movieData.imdbID) {
            isPresent = true;
        }
    });

    // if movie is not present then push to movies array
    if (!isPresent) {
        moviesArray.push(movieData);
    }

    // called addSearchMoviesToDOM() with movie to display movie in movies container
    addSearchMoviesToDOM(movieData);
}

// fetchingMovie() called on keypress on input tag
async function fetchingMovie(e) {
    //if key is ENTER then it prevents it from reload the whole page and return
    if (e.key === 'Enter') {
        e.preventDefault();
        return;
    }

    //it takes entered text
    let movie = e.target.value;

    // if input tag for search movies got empty, then movies container and movies array also make empty
    if (movie === '') {
        moviesContainer.innerHTML = '';
        moviesArray = [];
    }

    //url to fetch movies from omdb api with entered search movie text
    const url = `https://www.omdbapi.com/?t=${movie}&apikey=9d0f3ee`;

    // catching error using try catch
    try {
        // fetching movies
        const response = await fetch(url);
        // getting fetched data
        const data = await response.json();
        // renderMovies() is called with data and neglecting if response is error
        if (!data.Error) {
            renderMovies(data);
        }
    } catch (error) {
        // catching error message if any issue with the fetching data
        console.error('Error', error.message);
    }
}

//favouriteMovieHandler() will be called with on click to heart icon to add movie to favourites page & favourites array and save the favourites array to localStorage
function favouriteMovieHandler(element) {
    // getting movie-imdb id from "id" attribute
    const movieId = element.getAttribute('id');

    // finding the movie from movies array with movie-imdb id
    let movieData = moviesArray.find((movie) => movieId === movie.imdbID);

    //getting favourites array from the localStorage
    let favouriteLocalArray = localStorage.getItem('favouriteMoviesArray');

    // if the favourites array is present in localStorage
    if (favouriteLocalArray !== null) {
        // get favourites movie array from localStorage
        favouriteMoviesArray = Array.from(JSON.parse(favouriteLocalArray));

        // finding the movie from favourites movie array of localStorage
        let movieExists = favouriteMoviesArray.find(
            (movie) => movieId === movie.imdbID
        );

        // if movie is exists
        if (movieExists) {
            // show alert that movie already exists
            window.alert('Movie Already added to the Favourites');
        } else {
            // if movie not exists then push to favourites movie array of localStorage
            favouriteMoviesArray.push(movieData);
            //set updated fvourite movies array to localStorage
            localStorage.setItem(
                'favouriteMoviesArray',
                JSON.stringify(favouriteMoviesArray)
            );
        }
        // if the favourite array is not present in localSTorage
    } else {
        // adding the movie to favourite movies array
        favouriteMoviesArray.push(movieData);
        // set the favourite movies array to the localStorage
        localStorage.setItem(
            'favouriteMoviesArray',
            JSON.stringify(favouriteMoviesArray)
        );
    }
}

//searchedMoviesHandler() will be called with on click to movie details button to add movie to localStorage to display on the moviesInfo page
function searchedMoviesHandler(element) {
    //searched movies array
    let searchedMoviesArray = [];

    // getting movie-imdb id from the "id" element
    const movieId = element.getAttribute('id');

    // finding the movie in the movies array
    let movieData = moviesArray.find((movie) => movieId === movie.imdbID);

    //push the movie to searched movie array
    searchedMoviesArray.push(movieData);

    //set searched movie array to localStorage
    localStorage.setItem(
        'searchedMoviesArray',
        JSON.stringify(searchedMoviesArray)
    );
}

// keypress event listener attached to the input tag of search movies and attached fetchingMovie() function
searchMovieText.addEventListener('keypress', fetchingMovie);
