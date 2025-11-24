const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

const normalizeMovie = ( movie ) => ( {
  imdbID: movie.imdbID,
  title: movie.Title,
  year: movie.Year,
  poster: movie.Poster,
} );

export const searchMovies = async ( query ) => {
  const trimmedQuery = query.trim();
  if ( !trimmedQuery ) {
    return [];
  }

  const response = await fetch( `${BASE_URL}?apikey=${API_KEY}&s=${trimmedQuery}` );

  if ( !response.ok ) {
    throw new Error( 'No se pudo conectar con el servicio de películas' );
  }

  const data = await response.json();
  if ( data.Response === 'False' ) {
    throw new Error( data.Error || 'No se encontraron resultados' );
  }

  return ( data.Search || [] ).map( normalizeMovie );
};

export const getMovieDetails = async ( imdbID ) => {
  const response = await fetch( `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}` );
  if ( !response.ok ) {
    throw new Error( 'No se pudo obtener el detalle de la película' );
  }

  const data = await response.json();

  if ( data.Response === 'False' ) {
    throw new Error( data.Error || 'No se encontraron resultados' );
  }

  return {
    imdbID: data.imdbID,
    title: data.Title,
    year: data.Year,
    poster: data.Poster,
    imdbRating: data.imdbRating,
    runtime: data.Runtime,
    genre: data.Genre,
    plot: data.Plot,
  };
};