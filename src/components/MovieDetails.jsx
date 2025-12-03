import { useEffect, useMemo, useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { SmallData } from './SmallData';


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

const AddToWatchedButton = ( { onAdd, disabled } ) => (
    <button
        className="add-to-watched"
        type="button"
        onClick={ onAdd }
        disabled={ disabled }
    >
        Add to watched list
    </button>
);

export const MovieDetails = () => {
    const [userRating, setUserRating] = useState( 0 );
    const { selectedMovie, setSelectedMovieId, setSelectedMovie, detailsLoading, detailsError, watched, addToWatched } = useMovieContext();

    const watchedMovie = useMemo(
        () => watched.find( ( movie ) => movie.imdbID === selectedMovie?.imdbID ),
        [watched, selectedMovie?.imdbID],
    );

    useEffect( () => {
        setUserRating( watchedMovie?.userRating || 0 );
    }, [watchedMovie?.userRating, selectedMovie?.imdbID] );

    const removeSelectedMovie = () => {
        setSelectedMovieId( null );
        setSelectedMovie( null );
    };

    const handleAddToWatched = () => {
        if ( !selectedMovie || !userRating ) return;

        addToWatched( selectedMovie, userRating );
        removeSelectedMovie();
    };

    return (
        <div className="movie-details">
            { detailsLoading && <p>Cargando detalle...</p> }
            { detailsError && <p className="error">{ detailsError }</p> }

            { !detailsLoading && !detailsError && selectedMovie && (
                <div className="movie-details-body">

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
                            onRate={ setUserRating }
                        />
                        <AddToWatchedButton
                            onAdd={ handleAddToWatched }
                            disabled={ !userRating }
                        />
                    </div>
                </div>
            ) }
        </div>
    );
};
