import { useEffect, useRef } from 'react';
import { useMovieContext } from '../context/MovieContext';

export const NavBar = () => {
    const { query, setQuery, movies, handleSearch } = useMovieContext();
    const inputEl = useRef( null );

    useEffect( () => {
        const timeout = setTimeout( () => {
            handleSearch( query );
        }, 500 );

        return () => clearTimeout( timeout );
    }, [query, handleSearch] );


    useEffect( () => {
        inputEl.current.focus();
    }, [] );

    return (
        <header className='navbar'>
            <h1>Popcornitas</h1>
            <input
                type="text"
                placeholder='Search...'
                value={ query }
                onChange={ ( e ) => setQuery( e.target.value ) }
                ref={ inputEl }
            />
            <p>Found { movies.length } results</p>
        </header>
    );
};
