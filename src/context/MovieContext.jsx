import { createContext, useContext, useState, useCallback } from 'react';
import * as moviesService from '../services/MoviesService';

const MovieContext = createContext();

export const MovieProvider = ( { children } ) => {
    const [query, setQuery] = useState( "" );
    const [movies, setMovies] = useState( [] );
    const [watched, setWatched] = useState( [] );
    const [isOpen1, setIsOpen1] = useState( true );
    const [isOpen2, setIsOpen2] = useState( true );
    const [loading, setLoading] = useState( false );
    const [error, setError] = useState( null );
    const [selectedMovieId, setSelectedMovieId] = useState( null );
    const [selectedMovie, setSelectedMovie] = useState( null );
    const [detailsLoading, setDetailsLoading] = useState( false );
    const [detailsError, setDetailsError] = useState( null );

    const toggleOpen = ( setter ) => setter( ( open ) => !open );

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

    const value = {
        query,
        setQuery,
        movies,
        setMovies,
        watched,
        setWatched,
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