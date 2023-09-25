export function searchSongs(accessToken, query) {
    let searchResults = {}
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
    })
        .then(res => res.json()).then(data => {
        searchResults = data
        console.log(searchResults)
    });
}