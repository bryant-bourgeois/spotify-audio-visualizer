import "./styles.css"
import "process"
import {contentWiper} from "./contentWiper";
import {authenticateToSpotify, getSpotifyToken, getProfile} from "./authentication";

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
}

