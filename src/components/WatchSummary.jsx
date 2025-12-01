import React from 'react';
import { SmallData } from './SmallData';

export const WatchSummary = ( { watched, avgImdbRating, totalRuntime, avgUserRating } ) => {
    return (
        <div>
            <h2>Watch summary</h2>
            <div className='summary'>
                <SmallData icon="#️⃣">{ watched.length } movies</SmallData>
                <SmallData icon="⭐️">{ avgImdbRating }</SmallData>
                <SmallData icon="🌟">{ avgUserRating }</SmallData>
                <SmallData icon="⏳">{ totalRuntime } hours</SmallData>
            </div>
        </div>
    );
};
