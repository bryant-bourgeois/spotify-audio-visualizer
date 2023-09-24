import {contentWiper} from "./contentWiper";

export function pageBuilder(targetNode) {
    const container = document.querySelector('.container')
    contentWiper(container)

    // Add search input
    const searchContainer = document.createElement('div')
    searchContainer.classList.add('searchContainer')
    const searchBar = document.createElement('input')
    searchBar.type = 'search'
    searchBar.classList.add('searchBar')
    searchBar.placeholder = 'Search for songs'
    searchContainer.appendChild(searchBar)

    //create analyzer
    const visualizer = document.createElement('div')
    visualizer.classList.add('visualizer')

    // create controls panel
    const controlsContainer = document.createElement('div')
    controlsContainer.classList.add('controlsContainer')
    const prevTrack = document.createElement('div')
    prevTrack.textContent = '<'
    prevTrack.classList.add('prevTrack')
    const play = document.createElement('div')
    play.textContent = '|>'
    play.classList.add('play')
    const nextTrack = document.createElement('div')
    nextTrack.textContent = '>'
    nextTrack.classList.add('nextTrack')
    controlsContainer.appendChild(prevTrack)
    controlsContainer.appendChild(play)
    controlsContainer.appendChild(nextTrack)

    // add elements to page
    container.appendChild(searchContainer)
    container.appendChild(visualizer)
    container.appendChild(controlsContainer)

}