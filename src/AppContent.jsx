import { useMovieContext } from './context/MovieContext';
import { useMovieStats } from './hooks/useMovieStats';
import { NavBar } from './components/NavBar';
import { MovieList } from './components/MovieList';
import { WatchedList } from './components/WatchedList';
import { WatchSummary } from './components/WatchSummary';
import { MovieListBox } from "./components/MovieListBox";

import { MovieDetails } from './components/MovieDetails';

export const AppContent = () => {
    const { isOpen1, setIsOpen1, isOpen2, setIsOpen2, movies, watched, selectedMovie, toggleOpen, loading, error } = useMovieContext();
    const { avgImdbRating, avgUserRating, totalRuntime } = useMovieStats( watched );

    return (
        <>
            <NavBar />
            { error && <p style={ { color: 'red' } }>{ error }</p> }
            { loading && <p>Cargando...</p> }

            <div className="content">
                <MovieListBox className={ isOpen1 ? '' : 'closed' }>
                    <div className="movie-list-header">
                        <h2>Results</h2>
                        <button
                            className={ `toggle-button ${isOpen1 ? 'active' : ''}` }
                            onClick={ () => toggleOpen( setIsOpen1 ) }
                            aria-label="Toggle results"
                        >
                            <span className="no-padding">{ isOpen1 ? '-' : '+' }</span>
                        </button>
                    </div>
                    { isOpen1 && <MovieList movies={ movies } /> }
                </MovieListBox>
                <div className="right-panel">

                    <MovieListBox className={ isOpen2 ? '' : 'closed' }>
                        <div className="movie-list-header">
                            <WatchSummary
                                watched={ watched }
                                avgImdbRating={ avgImdbRating }
                                totalRuntime={ totalRuntime }
                                avgUserRating={ avgUserRating }
                            />
                            <button
                                className={ `toggle-button ${isOpen2 ? 'active' : ''}` }
                                onClick={ () => toggleOpen( setIsOpen2 ) }
                                aria-label="Toggle watched"
                            >
                                <span className="no-padding">{ isOpen2 ? '-' : '+' }</span>
                            </button>
                        </div>

                        { selectedMovie !== null ? <MovieDetails /> : <WatchedList watched={ watched } /> }
                    </MovieListBox>
                </div>
            </div>
        </>
    );
};