import { SmallData } from "./SmallData";

export const MovieList = ( { movies } ) => {
    return (
        <ul className="list">
            { movies?.map( ( movie ) => (
                <li className='movie' key={ movie.imdbID }>
                    <img src={ movie.poster } alt={ `${movie.title} poster` } />
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
