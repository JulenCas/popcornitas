import { useMemo } from 'react';

const calculateAverage = ( arr ) =>
    arr.length === 0 ? 0 : arr.reduce( ( acc, cur ) => acc + cur / arr.length, 0 );

export const useMovieStats = ( watched ) => {
    const stats = useMemo( () => {
        const imdbRatings = watched.map( ( movie ) => movie.imdbRating );
        const userRatings = watched.map( ( movie ) => movie.userRating );
        const runtimes = watched.map( ( movie ) => movie.runtime );

        return {
            avgImdbRating: calculateAverage( imdbRatings ),
            avgUserRating: calculateAverage( userRatings ),
            avgRuntime: calculateAverage( runtimes ),
            numMovies: watched.length,
        };
    }, [watched] );

    return stats;
};