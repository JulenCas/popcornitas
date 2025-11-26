import { useMemo } from 'react';

const calculateAverage = ( arr ) =>
    arr.length === 0 ? 0 : arr.reduce( ( acc, cur ) => acc + cur / arr.length, 0 );

const formatNumber = ( num ) => {
    const rounded = Math.round( num * 100 ) / 100;
    return Number.isInteger( rounded ) ? rounded : rounded.toString();
};

export const useMovieStats = ( watched ) => {
    const stats = useMemo( () => {
        const imdbRatings = watched.map( ( movie ) => movie.imdbRating );
        const userRatings = watched.map( ( movie ) => movie.userRating );
        const runtimes = watched.map( ( movie ) => movie.runtime );

        return {
            avgImdbRating: formatNumber( calculateAverage( imdbRatings ) ),
            avgUserRating: formatNumber( calculateAverage( userRatings ) ),
            avgRuntime: formatNumber( calculateAverage( runtimes ) ),
            numMovies: watched.length,
        };
    }, [watched] );

    return stats;
};