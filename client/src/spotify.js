import axios from 'axios';

const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
};

const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

export const logout = () => {
    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }

    window.location = window.location.origin;
}

const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
    if (!accessToken || !timestamp) {
        return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
};

const refreshToken = async () => {
    try {
        if (!LOCALSTORAGE_VALUES.refreshToken || LOCALSTORAGE_VALUES.refreshToken === 'undefined' || (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000) {
            console.error('No refresh token available');
            logout();
        }

        const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

        window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        window.location.reload();
    } catch (e) {
        console.error(e);
    }
};

const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };

    const hasError = urlParams.get('error');

    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken();
    }

    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken;
    }

    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        };

        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    return false;
};


export const accessToken = getAccessToken();

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

export const getCurrentUserProfile = () => axios.get('/me');

export const fetchSearchData = async (searchStr) => {
    if (!searchStr)
        return { data: null };

    const queryParams = new URLSearchParams({
        q: searchStr,
        type: 'artist',
        limit: 10
    });
    return await axios.get(`/search/?${queryParams}`);
}

export const paginateFetch = async (searchUrl) => {
    return await axios.get(`${searchUrl}`);
}

export const composePlaylist = async ({ artists, user, playlistName }) => {
    // get tracks for selected artists
    const tracks = await Promise.all(
        artists.map(async (artist) => {
            const queryParams = new URLSearchParams({
                id: artist.id,
                market: 'US'
            });
            const { data } = await axios.get(`/artists/${artist.id}/top-tracks?${queryParams}`);
            return data;
        })
    )
    if (tracks?.length) {
        // create playlist
        const { data } = await axios({
            method: 'post',
            url: `/users/${user}/playlists`,
            data: JSON.stringify({
                name: playlistName,
                description: 'Created with Aux Buddy',
                public: false
            })
        });

        const playlistData = data;
        // use playlist id to add tracks
        if (data?.id) {
            // get all uris
            let tracksUri = '';
            tracks.map(trackGrp => {
                return trackGrp.tracks.map(track => {
                    return tracksUri += track.uri + ',';
                });
            });
            tracksUri = tracksUri.substring(0, tracksUri.length - 1);
            const queryParams = new URLSearchParams({
                uri: tracksUri
            });
            const response = await axios({
                method: 'post',
                url: `/playlists/${data.id}/tracks?${queryParams}`,
                data: JSON.stringify({
                    uris: tracksUri.split(',')
                })
            });
            if (response) {
                return playlistData;
            }
        }
    }
}

export const getPlaylistSongs = async (id) => {

}