const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

const normalizeField = ( value ) => ( value && value !== 'N/A' ? value : '' );

const normalizeMovie = ( movie ) => ( {
  imdbID: movie.imdbID,
  title: movie.Title,
  year: movie.Year,
  poster: normalizeField( movie.Poster ),
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
  const response = await fetch( `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full` );

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
    released: normalizeField( data.Released ),
    poster: normalizeField( data.Poster ),
    imdbRating: normalizeField( data.imdbRating ),
    imdbVotes: normalizeField( data.imdbVotes ),
    runtime: normalizeField( data.Runtime ),
    genre: normalizeField( data.Genre ),
    plot: normalizeField( data.Plot ),
    director: normalizeField( data.Director ),
    actors: normalizeField( data.Actors ),
    language: normalizeField( data.Language ),
    country: normalizeField( data.Country ),
  };
};
