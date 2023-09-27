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
}

const searchBar = document.querySelector('.searchBar')
// searchBar.addEventListener('keypress', async function (e) {
//     if (e.key === 'Enter' && searchBar.value.length > 0) {
//         searchSongs(accessToken, searchBar.value, document.querySelector('.searchResults'))
//     }
// })
body.addEventListener('click', function (e) {
    contentWiper(document.querySelector('.searchResults'))
})
body.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && searchBar.value.length > 0) {
        searchSongs(accessToken, searchBar.value, document.querySelector('.searchResults'))
    }
})
searchBar.addEventListener('change', function () {
    contentWiper(document.querySelector('.searchResults'))
})
