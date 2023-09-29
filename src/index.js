import "./styles.css"
import "process"
import {contentWiper} from "./contentWiper";
import {authenticateToSpotify, getSpotifyToken, getProfile} from "./authentication";
import {pageBuilder} from "./pageBuilder";
import {searchSongs} from "./search";

//Grab elements
const body = document.querySelector('body')

let authenticatedToSpotify = localStorage.getItem('code_verifier')?.length === 128
let accessToken

if (!authenticatedToSpotify) {
    const button = document.querySelector('#login-button')
    button.addEventListener('click', function () {
        authenticateToSpotify()
    })
} else {
    contentWiper(document.querySelector('.container'))
    getSpotifyToken()
    accessToken = localStorage.getItem('access_token')
    pageBuilder()

    setTimeout(function () {
        fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }).then(res => res.json())
            .then(data => console.log(data))
    }, 3000)

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = localStorage.getItem('access_token');
        const player = new Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => {
                cb(token);
            },
            volume: 0.6
        });
        player.connect().then(success => {
            if (success) {
                console.log('The Web Playback SDK successfully connected to Spotify!');
            } else {
                console.log('not connected to spotify :( ')
            }
        })
        player.addListener('ready', ({device_id}) => {
            console.log('The Web Playback SDK is ready to play music!');
            console.log('Device ID', device_id);
        })
        player.getCurrentState().then(state => {
            if (!state) {
                console.error('User is not playing music through the Web Playback SDK');
                return;
            }

            var current_track = state.track_window.current_track;
            var next_track = state.track_window.next_tracks[0];

            console.log('Currently Playing', current_track);
            console.log('Playing Next', next_track);
        });

    }


}

const searchBar = document.querySelector('.searchBar')
searchBar.addEventListener('change', async function (e) {
    searchSongs(accessToken, searchBar.value, document.querySelector('.searchResults'))
})
body.addEventListener('click', function (e) {
    contentWiper(document.querySelector('.searchResults'))
})

searchBar.addEventListener('change', function () {
    contentWiper(document.querySelector('.searchResults'))
})
