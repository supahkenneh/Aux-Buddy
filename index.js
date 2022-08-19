require('dotenv').config();
const { generateRandomString } = require('./helpers/helpers');
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

/* Environment variables */
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || 8888;

const stateKey = 'spotify_auth_state';

app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/login', (req, res) => {
    // set cookie 
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

    const queryParams = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    })
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', (req, res) => {
    const code = req.query.code || null;
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then(response => {
            if (response.status === 200) {
                const { access_token, refresh_token, expires_in } = response.data;
                // pass tokens in query params
                const queryParams = new URLSearchParams({
                    access_token,
                    refresh_token,
                    expires_in
                });

                // redirect to react app
                res.redirect(`${FRONTEND_URI}?${queryParams}`);
            } else {
                res.redirect(`/?${new URLSearchParams({ error: 'invalid_token' })}`);
            }
        })
        .catch(error => {
            res.send(error);
        })
});

app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        })
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})