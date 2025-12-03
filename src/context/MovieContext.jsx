import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as moviesService from '../services/MoviesService';

const MovieContext = createContext();
const WATCHED_STORAGE_KEY = 'popcornitas:watched';

const getStoredWatched = () => {
    try {
        const stored = localStorage.getItem( WATCHED_STORAGE_KEY );
        return stored ? JSON.parse( stored ) : [];
    } catch ( error ) {
        console.error( 'No se pudo leer la lista de vistos desde el almacenamiento', error );
        return [];
    }
};

const parseRuntime = ( runtime ) => {
    const parsed = parseInt( runtime, 10 );
    return Number.isNaN( parsed ) ? 0 : parsed;
};

const parseRating = ( rating ) => {
    const parsed = Number( rating );
    return Number.isNaN( parsed ) ? 0 : parsed;
};

export const MovieProvider = ( { children } ) => {
    const [query, setQuery] = useState( "" );
    const [movies, setMovies] = useState( [] );
    const [watched, setWatched] = useState( getStoredWatched );
    const [isOpen1, setIsOpen1] = useState( true );
    const [isOpen2, setIsOpen2] = useState( true );
    const [loading, setLoading] = useState( false );
    const [error, setError] = useState( null );
    const [selectedMovieId, setSelectedMovieId] = useState( null );
    const [selectedMovie, setSelectedMovie] = useState( null );
    const [detailsLoading, setDetailsLoading] = useState( false );
    const [detailsError, setDetailsError] = useState( null );

    const toggleOpen = ( setter ) => setter( ( open ) => !open );

    useEffect( () => {
        try {
            localStorage.setItem( WATCHED_STORAGE_KEY, JSON.stringify( watched ) );
        } catch ( error ) {
            console.error( 'No se pudo guardar la lista de vistos en el almacenamiento', error );
        }
    }, [watched] );

    const handleSearch = useCallback( async ( searchQuery ) => {
        if ( !searchQuery.trim() ) {
            setMovies( [] );
            setError( null );
            return;
        }

        setLoading( true );
        setError( null );
        setSelectedMovieId( null );
        setSelectedMovie( null );
        setDetailsError( null );
        try {
            const results = await moviesService.searchMovies( searchQuery );
            setMovies( results );
        } catch ( err ) {
            setMovies( [] );
            setError( err.message || 'Error al buscar películas' );
            console.error( err );
        } finally {
            setLoading( false );
        }
    }, [] );

    const selectMovie = useCallback( async ( imdbID ) => {
        if ( !imdbID ) return;

        setSelectedMovieId( imdbID );
        setDetailsLoading( true );
        setDetailsError( null );

        try {
            const details = await moviesService.getMovieDetails( imdbID );
            setSelectedMovie( details );
        } catch ( err ) {
            setSelectedMovie( null );
            setDetailsError( err.message || 'Error al obtener el detalle de la película' );
            console.error( err );
        } finally {
            setDetailsLoading( false );
        }
    }, [] );

    const addToWatched = useCallback( ( movie, userRating ) => {
        if ( !movie ) return;

        setWatched( ( prevWatched ) => {
            const runtime = parseRuntime( movie.runtime );
            const imdbRating = parseRating( movie.imdbRating );
            const updatedMovie = {
                ...movie,
                runtime,
                imdbRating,
                userRating,
            };

            const movieIndex = prevWatched.findIndex( ( item ) => item.imdbID === movie.imdbID );

            if ( movieIndex !== -1 ) {
                const updated = [...prevWatched];
                updated[movieIndex] = { ...updated[movieIndex], ...updatedMovie };
                return updated;
            }

            return [...prevWatched, updatedMovie];
        } );
    }, [] );

    const value = {
        query,
        setQuery,
        movies,
        setMovies,
        watched,
        setWatched,
        addToWatched,
        isOpen1,
        setIsOpen1,
        isOpen2,
        setIsOpen2,
        toggleOpen,
        handleSearch,
        loading,
        error,
        selectedMovieId,
        selectedMovie,
        setSelectedMovie,
        setSelectedMovieId,
        selectMovie,
        detailsLoading,
        detailsError,
    };

    return (
        <MovieContext.Provider value={ value }>
            { children }
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    const context = useContext( MovieContext );
    if ( !context ) {
        throw new Error( 'useMovieContext debe usarse dentro de MovieProvider' );
    }
    return context;
};