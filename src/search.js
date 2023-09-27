import {contentWiper} from "./contentWiper";

function convertFromMs(ms) {
    const totalSeconds = ms * 0.001
    let seconds = totalSeconds % 60
    let minutes = (totalSeconds - seconds) / 60
    if (seconds > 60) {
        seconds -= 60
        minutes += 1
    }

    function str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    return minutes + ':' + str_pad_left(seconds, '0', 2)
}

function displaySearchResults(searchResults, targetNode) {
    for (let result in searchResults) {
        const track = document.createElement('div')
        track.classList.add('track')
        const trackName = document.createElement('p')
        trackName.classList.add('trackName')
        trackName.innerText = searchResults[result].name
        const artistName = document.createElement('p')
        artistName.classList.add('artistName')
        artistName.innerText = searchResults[result].artists[0].name
        const albumName = document.createElement('p')
        albumName.classList.add('albumName')
        albumName.innerText = searchResults[result].album.name
        const trackLength = document.createElement('p')
        trackLength.classList.add('trackLength')
        trackLength.innerText = convertFromMs(searchResults[result].duration_ms)
        const trackDetails = document.createElement('div')
        trackDetails.classList.add('trackDetails')


        trackDetails.appendChild(artistName)
        trackDetails.appendChild(albumName)
        trackDetails.appendChild(trackLength)

        track.appendChild(trackName)
        track.appendChild(trackDetails)
        track.dataset.id = searchResults[result].id
        targetNode.appendChild(track)
    }
}

export function searchSongs(accessToken, query, targetNode) {
    contentWiper(targetNode)
    fetch('https://api.spotify.com/v1/search?' + new URLSearchParams({
        q: query,
        type: 'track',
        limit: 5,
    }), {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(res => res.json()).then(data => {
        console.log(data.tracks.items)
        return data.tracks.items
    }).then(returnData => displaySearchResults(returnData, targetNode));
}
