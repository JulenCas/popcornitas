import { createContext, useContext, useState } from 'react';
import { TEMP_MOVIE_DATA, TEMP_WATCHED_DATA } from '../data/moviesData';
import * as moviesService from '../services/moviesService';

const MovieContext = createContext();

export const MovieProvider = ( { children } ) => {
    const [query, setQuery] = useState( "" );
    const [movies, setMovies] = useState( TEMP_MOVIE_DATA );
    const [watched, setWatched] = useState( TEMP_WATCHED_DATA );
    const [isOpen1, setIsOpen1] = useState( true );
    const [isOpen2, setIsOpen2] = useState( true );
    const [loading, setLoading] = useState( false );
    const [error, setError] = useState( null );

    const toggleOpen = ( setter ) => setter( ( open ) => !open );

    const handleSearch = async ( searchQuery ) => {
        if ( !searchQuery.trim() ) {
            setMovies( TEMP_MOVIE_DATA );
            return;
        }

        setLoading( true );
        setError( null );
        try {
            const results = await moviesService.searchMovies( searchQuery );
            setMovies( results );
        } catch ( err ) {
            setError( 'Error al buscar películas' );
            console.error( err );
        } finally {
            setLoading( false );
        }
    };

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