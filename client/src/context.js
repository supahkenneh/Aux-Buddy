import { createContext } from "react";

export const initialState = { artists: [] };

export const ArtistListContext = createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ARTIST':
            return { artists: [...state.artists, action.data] };
        case 'REMOVE_ARTIST':
            return { artists: state.artists.filter(artist => artist !== action.data) };
        default:
            return state;
    }
}