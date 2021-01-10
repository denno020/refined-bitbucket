// @flow

import addStyleToPage from '../add-style'

const SELECTOR__SIDEBAR = '[aria-label="Sidebar"]'

export default function setStickySidebarHeaders() {
    addClassNames()
    const cssRule = `
        .refined_bitbucket__sticky-sidebar-header {
            position: sticky;
            top: 0;
            background-color: #FFFFFF;
            z-index: 10;
        }

        /* Offset the headers that Bitbucket does make sticky to account for the new sticky headers above */
        button[aria-controls^="expanderId"] {
            top: 33px;
        }
    `
    addStyleToPage(cssRule)
}

function injectClassNames(bbSidebar) {
    const sidebar = bbSidebar.querySelector(SELECTOR__SIDEBAR).parentNode
    sidebar.classList.add('refined_bitbucket__sticky-sidebar-header')
}

/**
 * Wait for the right sidebar to become available, then inject a specific classname into the DOM, to be used for styling
 */
function addClassNames() {
    const bbSidebar = document.getElementById('bb-sidebar')

    const observer = new MutationObserver((mutationsList, observer) => {
        if (sidebar.querySelector(SELECTOR__SIDEBAR)) {
            injectClassNames(bbSidebar)
            observer.disconnect()
        }
    })

    if (bbSidebar.querySelector(SELECTOR__SIDEBAR)) {
        // If the sidebar has already loaded before this script has executed, we can skip the mutation observer
        injectClassNames(bbSidebar)
    } else {
        // Otherwise, wait for the sidebar to be loaded
        observer.observe(bbSidebar, {
            attributes: true,
            childList: true,
            subtree: true,
        })
    }
}
