import { useState, useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';

export const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState( '' );
    const { handleSearch } = useMovieContext();

    const handleInputChange = ( e ) => {
        setSearchTerm( e.target.value );
    };

    useEffect( () => {
        const timeout = setTimeout( () => {
            if ( searchTerm.trim() !== '' ) {
                handleSearch( searchTerm );
            }
        }, 500 );

        return () => clearTimeout( timeout );
    }, [searchTerm, handleSearch] );

    return (
        <header className='navbar'>
            <h1>Popcornitas</h1>
            <input
                type="text"
                placeholder='Search...'
                value={ searchTerm }
                onChange={ handleInputChange }
            />
            <p>Found { results } results</p>
        </header>
    );
};
