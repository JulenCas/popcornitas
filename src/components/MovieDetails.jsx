import { useMemo, useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { MovieListBox } from './MovieListBox';
import { SmallData } from './SmallData';

const FALLBACK_POSTER = 'https://via.placeholder.com/300x450/3D1414/DEE2E6?text=No+image';

const StarRating = ( { max = 10, defaultValue = 0, onRate = () => { } } ) => {
    const [hoveredStar, setHoveredStar] = useState( 0 );
    const [selectedStar, setSelectedStar] = useState( defaultValue );

    const effectiveRating = hoveredStar || selectedStar;

    return (
        <div className="star-rating" aria-label="Calificación por estrellas">
            { Array.from( { length: max }, ( _, index ) => {
                const starValue = index + 1;
                const isFilled = starValue <= effectiveRating;

                return (
                    <button
                        key={ starValue }
                        type="button"
                        className={ `star ${isFilled ? 'filled' : ''}` }
                        onMouseEnter={ () => setHoveredStar( starValue ) }
                        onMouseLeave={ () => setHoveredStar( 0 ) }
                        onClick={ () => {
                            setSelectedStar( starValue );
                            onRate( starValue );
                        } }
                        aria-label={ `Calificar con ${starValue} estrellas` }
                    >
                        ★
                    </button>
                );
            } ) }
        </div>
    );
};

export const MovieDetails = () => {
    const { selectedMovie, detailsLoading, detailsError, watched, addToWatched } = useMovieContext();

    const watchedMovie = useMemo(
        () => watched.find( ( movie ) => movie.imdbID === selectedMovie?.imdbID ),
        [watched, selectedMovie?.imdbID],
    );

    const poster = useMemo( () => {
        if ( !selectedMovie?.poster ) return FALLBACK_POSTER;
        return selectedMovie.poster !== 'N/A' ? selectedMovie.poster : FALLBACK_POSTER;
    }, [selectedMovie] );

    return (
        <div className="movie-details">
            { detailsLoading && <p>Cargando detalle...</p> }
            { detailsError && <p className="error">{ detailsError }</p> }

            { !detailsLoading && !detailsError && !selectedMovie && (
                <p>Selecciona una película para ver sus detalles.</p>
            ) }

            { !detailsLoading && !detailsError && selectedMovie && (
                <div className="movie-details-body">
                    {/* <img
                        className="movie-details-poster"
                        src={ poster }
                        alt={ `${selectedMovie.title} poster` }
                    /> */}

                    <div className="movie-details-content">
                        <div className="movie-details-heading">
                            <h2>{ selectedMovie.title }</h2>
                            <div className="movie-details-meta">
                                { selectedMovie.year && (
                                    <SmallData icon="🗓">{ selectedMovie.year }</SmallData>
                                ) }
                                { selectedMovie.released && (
                                    <SmallData icon="🎞">{ selectedMovie.released }</SmallData>
                                ) }
                                { selectedMovie.imdbRating && (
                                    <SmallData icon="⭐️">{ selectedMovie.imdbRating }</SmallData>
                                ) }
                                { selectedMovie.runtime && (
                                    <SmallData icon="⏳">{ selectedMovie.runtime }</SmallData>
                                ) }
                                { selectedMovie.genre && (
                                    <SmallData icon="🎬">{ selectedMovie.genre }</SmallData>
                                ) }
                            </div>
                        </div>

                        <p className="movie-details-plot">
                            {/* Todo: read more pop up and text trim (200 char) */ }
                            { selectedMovie.plot || 'No hay sinopsis disponible para esta película.' }
                        </p>

                        <div className="movie-details-extra">
                            { selectedMovie.director && (
                                <p>
                                    <strong>Director:</strong> { selectedMovie.director }
                                </p>
                            ) }
                            { selectedMovie.actors && (
                                <p>
                                    <strong>Reparto:</strong> { selectedMovie.actors }
                                </p>
                            ) }
                            { selectedMovie.language && (
                                <p>
                                    <strong>Idioma:</strong> { selectedMovie.language }
                                    { selectedMovie.country ? ` (${selectedMovie.country})` : '' }
                                </p>
                            ) }
                            { selectedMovie.imdbVotes && (
                                <p>
                                    <strong>Votos IMDb:</strong> { selectedMovie.imdbVotes }
                                </p>
                            ) }
                        </div>

                        <StarRating
                            key={ selectedMovie.imdbID }
                            defaultValue={ watchedMovie?.userRating || 0 }
                            onRate={ ( rating ) => addToWatched( selectedMovie, rating ) }
                        />
                    </div>
                </div>
            ) }
        </div>
    );
};
