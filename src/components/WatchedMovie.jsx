import React from 'react';

export const WatchedMovie = ( { movie } ) => {
    const { poster, title, imdbRating, userRating, runtime } = movie;

    return (
        <li className="movie">
            <img src={ poster } alt={ `${title} poster` } />
            <div className="movie-content">
                <h3>{ title }</h3>
                <div className="movie-info">
                    <p>
                        <span>⭐️</span>
                        <span> { imdbRating }</span>
                    </p>
                    <p>
                        <span>🌟</span>
                        <span> { userRating }</span>
                    </p>
                    <p>
                        <span>⏳</span>
                        <span> { runtime } min</span>
                    </p>
                </div>
            </div>
        </li>
    );
};