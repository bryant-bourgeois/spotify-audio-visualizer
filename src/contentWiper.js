'use strict';

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export function contentWiper(element) {
    removeAllChildNodes(element);
}
