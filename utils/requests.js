const API_KEY = process.env.NEXT_PUBLIC_API_KEY
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
export const BASE_IMG_URL_500w = "https://image.tmdb.org/t/p/w500";

const requests = {
  fetchTrending: `trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
}

export default requests