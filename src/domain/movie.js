import { OMDB_BASE_URL } from '../core/constants';

const normalizeField = ( value ) => ( value && value !== 'N/A' ? value : '' );

const parseRuntime = ( runtime ) => {
    if ( !runtime ) return 0;
    const numericValue = parseInt( runtime, 10 );
    return Number.isFinite( numericValue ) ? numericValue : 0;
};

const parseRating = ( rating ) => {
    const numericValue = Number( rating );
    return Number.isFinite( numericValue ) ? numericValue : 0;
};

export const mapSearchMovie = ( movie ) => ( {
    imdbID: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: normalizeField( movie.Poster ),
} );

export const mapMovieDetails = ( data ) => ( {
    imdbID: data.imdbID,
    title: data.Title,
    year: data.Year,
    released: normalizeField( data.Released ),
    poster: normalizeField( data.Poster ),
    imdbRating: parseRating( data.imdbRating ),
    imdbVotes: normalizeField( data.imdbVotes ),
    runtime: parseRuntime( data.Runtime ),
    genre: normalizeField( data.Genre ),
    plot: normalizeField( data.Plot ),
    director: normalizeField( data.Director ),
    actors: normalizeField( data.Actors ),
    language: normalizeField( data.Language ),
    country: normalizeField( data.Country ),
} );

export const buildOmdbUrl = ( apiKey, params ) => `${OMDB_BASE_URL}?apikey=${apiKey}&${params}`;