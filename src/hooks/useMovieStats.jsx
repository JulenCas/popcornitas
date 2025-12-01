import { useMemo } from 'react';

const calculateAverage = ( arr ) =>
    arr.length === 0 ? 0 : arr.reduce( ( acc, cur ) => acc + cur / arr.length, 0 );

const calculateTotal = ( arr ) =>
    arr.length === 0 ? 0 : arr.reduce( ( acc, cur ) => acc + cur, 0 );

const formatNumber = ( num ) => num.toFixed( 2 );

const calculateTotalHoursRounded = ( minutes ) => {
    const hours = minutes / 60;
    return Math.round( hours * 100 ) / 100;
};

export const useMovieStats = ( watched ) => {
    const stats = useMemo( () => {
        const imdbRatings = watched.map( ( movie ) => movie.imdbRating );
        const userRatings = watched.map( ( movie ) => movie.userRating );
        const runtimes = watched.map( ( movie ) => movie.runtime );

        return {
            avgImdbRating: formatNumber( calculateAverage( imdbRatings ) ),
            avgUserRating: formatNumber( calculateAverage( userRatings ) ),
            totalRuntime: formatNumber( calculateTotalHoursRounded( calculateTotal( runtimes ) ) ),
            numMovies: watched.length,
        };
    }, [watched] );

    return stats;
};