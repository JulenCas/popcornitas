import { useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';

export const NavBar = () => {
    const { query, setQuery, movies, handleSearch } = useMovieContext();

    useEffect( () => {
        const timeout = setTimeout( () => {
            handleSearch( query );
        }, 500 );

        return () => clearTimeout( timeout );
    }, [query, handleSearch] );

    return (
        <header className='navbar'>
            <h1>Popcornitas</h1>
            <input
                type="text"
                placeholder='Search...'
                value={ query }
                onChange={ ( e ) => setQuery( e.target.value ) }
            />
            <p>Found { movies.length } results</p>
        </header>
    );
};
