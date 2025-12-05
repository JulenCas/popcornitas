import { WATCHED_STORAGE_KEY } from '../core/constants';

export const loadWatchedFromStorage = () => {
    try {
        const stored = localStorage.getItem( WATCHED_STORAGE_KEY );
        return stored ? JSON.parse( stored ) : [];
    } catch ( error ) {
        console.error( 'No se pudo leer la lista de vistos desde el almacenamiento', error );
        return [];
    }
};

export const persistWatchedToStorage = ( watched ) => {
    try {
        localStorage.setItem( WATCHED_STORAGE_KEY, JSON.stringify( watched ) );
    } catch ( error ) {
        console.error( 'No se pudo guardar la lista de vistos en el almacenamiento', error );
    }
};