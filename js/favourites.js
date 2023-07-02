// favourite movies container inside which display all movies that marked favourites
var favouriteMovieContainer = document.getElementById('favMovie-container');

// getting favourites movies array from the localStorage
var favouriteMoviesArray = JSON.parse(
    localStorage.getItem('favouriteMoviesArray')
);

//displayFavouritesMovies() with the favourites movies array
function displayFavouritesMovies(movies) {
    //if the favourites movies array is null or its length is 0, then it will return
    if (movies === null || movies.length === 0) {
        //before return favourite movie container will display below text with image
        favouriteMovieContainer.innerHTML = `
                                          <p class="text-body-secondary fw-bolder fs-1">
                                              Your Favourite Movies will Appear here !!!
                                          </p>
                                          <img src="./images/video-editing.png" alt="logo">`;

        return;
    }

    //if favourites movies array is not null or empty then first clear favourite movies container
    favouriteMovieContainer.innerHTML = '';

    // secondly iterate over favourites movies array
    movies.forEach((movie) => {
        //while iterating, call addMoviesToFavouritesDOM() with each movie in favourites movies array
        addMoviesToFavouritesDOM(movie);
    });
}

//addMoviesToFavouritesDOM() function to display all movies of favourites movies array
function addMoviesToFavouritesDOM(movie) {
    //create a div element
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
                                            <h5 class="card-title">" ${movie.Title} "</h5>
                                            <p class="card-text">
                                                <span class="fw-bolder text-decoration-underline">Runtime:</span>
                                                <span class="fw-semibold text-body-secondary" id="movie-runtime">${movie.Runtime}</span>
                                            </p>
                                            <p class="card-text">
                                                <span class="fw-bolder text-decoration-underline">Genre:</span>
                                                <span class="fw-semibold text-body-secondary" id="movie-genre">${movie.Genre}</span>
                                            </p>
                                            <p class="card-text">
                                                <span class="fw-bolder text-decoration-underline">Rating:</span>
                                                <span><i class="fa-solid fa-star" style="color: #e7e70d;"></i></span>
                                                <span class="fw-semibold text-body-secondary" id="movie-imdb">${movie.imdbRating}</span>
                                            </p>
                                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">      
                                            <button type="button" class="btn btn-danger fw-bolder" id="${movie.imdbID}" onclick="deleteMovieHandler(this)">
                                                <i class="fa-solid fa-trash"></i> Delete
                                            </button> 
                                        </div>               
                                        </div>
                                    </div>
                                </div>
                            </div>
                          `;

    // append the div element to the favourites movies container
    favouriteMovieContainer.append(divElement);
}

//deleteMovieHandler() function will be called on click to delete button attached to each movie bootstrap card and the movie also remove from favourites page & favourites movie array in localStorage
function deleteMovieHandler(element) {
    //getting movie-imdb id from "id" attribute
    let movieId = element.getAttribute('id');

    //finding the movie from favourite movies array of localStorage
    let deleteMovie = favouriteMoviesArray.find(
        (movie) => movie.imdbID === movieId
    );

    // if movie found, remove the movie from favourite movies array
    if (deleteMovie) {
        favouriteMoviesArray.splice(favouriteMoviesArray.indexOf(deleteMovie), 1);
    }

    // set the updated favourite movies array to the localStorage
    localStorage.setItem(
        'favouriteMoviesArray',
        JSON.stringify(favouriteMoviesArray)
    );

    //empty the favourite movies container
    favouriteMovieContainer.innerHTML = '';

    //called displayFavouritesMovies() function with updated favourite movies array to display all favourite movies again
    displayFavouritesMovies(favouriteMoviesArray);
}

//when favourites page gets loaded, displaFavouritesMovies() function will be called with the favourites movies array
document.body.onload = () => {
    displayFavouritesMovies(favouriteMoviesArray);
};
