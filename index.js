require('dotenv').config();
const { generateRandomString } = require('./helpers/helpers');
const axios = require('axios');
const express = require('express');
const app = express();

/* Environment variables */
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const stateKey = 'spotify_auth_state';

app.get('/', (req, res) => {
    res.send('hello world');
});

// https://api.spotify.com
app.get('/login', (req, res) => {
    // set cookie 
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'user-read-private user-read-email';

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
    console.log(code);
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
                const { access_token, token_type } = response.data;
                const { refresh_token } = response.data;
                // axios.get('https://api.spotify.com/v1/me', {
                //     headers: {
                //         Authorization: `${token_type} ${access_token}`
                //     }
                // })
                //     .then(response => {
                //         res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`)
                //     })
                //     .catch(error => {
                //         res.send(error);
                //     })
                axios.get(`http://localhost:8888/refresh_token?refresh_token=${refresh_token}`)
                    .then(response => {
                        res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`)
                    })
                    .catch(error => {
                        res.send(error);
                    })
            } else {
                res.send(response);
            }
        })
        .catch(error => {
            console.log(error);
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
})

const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})