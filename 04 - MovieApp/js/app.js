//uniqe key 
const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
// key for popular movies 
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
//key for search
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

//write function for request for get movies 
async function getMovies(url) {
  const res = await fetch(url, {
    //write basic config
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "API_KEY"
    }
  });
  const resData = await res.json();
  showMovies(resData);
}

getMovies(API_URL_POPULAR)


function showMovies(data) {
  const moviesEl = document.querySelector('.movies');

  data.films.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <div class="movie__cover-inner">
    <img
      src="${movie.posterUrlPreview}"
      class="movie__cover"
      alt="${movie.nameRu}"
    />
    <div class="movie__cover--darkened"></div>
  </div>
  <div class="movie__info">
    <div class="movie__title">${movie.nameRu}</div>
    <div class="movie__category">${movie.genres.map(
      (genre) => ` ${genre.genre}`
    )}</div>
    ${movie.rating &&
      `
    <div class="movie__average movie__average--${getClassByRate(
        movie.rating
      )}">${movie.rating}</div>
    `
      }
  </div>
    `;
    moviesEl.appendChild(movieEl);

  })

}


const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});