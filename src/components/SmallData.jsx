import React from 'react';

export const SmallData = ( { children, icon } ) => {
    return (
        <p>
            <span>{ icon }</span>
            <span> { children }</span>
        </p>
    );
};
