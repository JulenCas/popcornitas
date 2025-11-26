import { useMovieContext } from "../context/MovieContext";
import { SmallData } from "./SmallData";

const FALLBACK_POSTER = 'https://via.placeholder.com/80x120/3D1414/DEE2E6?text=No+image';

export const MovieList = ( { movies } ) => {
    const { selectMovie, selectedMovieId } = useMovieContext();

    return (
        <ul className="list">
            { movies?.map( ( movie ) => (
                <li
                    className={ `movie ${selectedMovieId === movie.imdbID ? 'selected' : ''}` }
                    key={ movie.imdbID }
                    onClick={ () => selectMovie( movie.imdbID ) }
                >
                    <img
                        src={ movie.poster || FALLBACK_POSTER }
                        alt={ `${movie.title} poster` }
                    />
                    <div className="info-container">
                        <h3>{ movie.title }</h3>
                        <div>
                            <SmallData icon="🗓">{ movie.year }</SmallData>
                        </div>
                    </div>
                </li>
            ) ) }
        </ul>
    );
};
