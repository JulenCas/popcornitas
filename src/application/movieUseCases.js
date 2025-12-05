import { buildOmdbUrl, mapMovieDetails, mapSearchMovie } from '../domain/movie';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const fetchJson = async ( url ) => {
    const response = await fetch( url );

    if ( !response.ok ) {
        throw new Error( 'No se pudo conectar con el servicio de películas' );
    }

    const data = await response.json();

    if ( data.Response === 'False' ) {
        throw new Error( data.Error || 'No se encontraron resultados' );
    }

    return data;
};

export const searchMovies = async ( query ) => {
    const trimmedQuery = query.trim();
    if ( !trimmedQuery ) {
        return [];
    }

    const url = buildOmdbUrl( API_KEY, `s=${encodeURIComponent( trimmedQuery )}` );
    const data = await fetchJson( url );

    return ( data.Search || [] ).map( mapSearchMovie );
};

export const getMovieDetails = async ( imdbID ) => {
    const url = buildOmdbUrl( API_KEY, `i=${imdbID}&plot=full` );
    const data = await fetchJson( url );

    return mapMovieDetails( data );
};