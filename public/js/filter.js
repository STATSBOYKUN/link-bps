function updateIndicators() {
    // Check if any link cards are visible in the 'admLinksContainer'
    let admContainer = document.getElementById('admLinksContainer');
    let admIndicator = document.getElementById('admIndicator');
    let admLinkCards = admContainer.getElementsByClassName('link-card');
    let admHasVisibleLinks = Array.from(admLinkCards).some(card => card.style.display !== 'none');

    // Show or hide the 'admIndicator'
    admIndicator.style.display = admHasVisibleLinks ? '' : 'none';

    // Check if any link cards are visible in the 'teknisLinksContainer'
    let teknisContainer = document.getElementById('teknisLinksContainer');
    let teknisIndicator = document.getElementById('teknisIndicator');
    let teknisLinkCards = teknisContainer.getElementsByClassName('link-card');
    let teknisHasVisibleLinks = Array.from(teknisLinkCards).some(card => card.style.display !== 'none');

    // Show or hide the 'teknisIndicator'
    teknisIndicator.style.display = teknisHasVisibleLinks ? '' : 'none';
}

function filterLinks() {
    let input = document.getElementById('searchInput');
    let filter = input.value.toLowerCase();
    let containers = ['linksContainer', 'admLinksContainer', 'teknisLinksContainer'];

    // If the input contains 'adm' or 'teknis', show only the corresponding container
    if (filter.includes('adm')) {
        containers.forEach(containerId => {
            if (containerId === 'admLinksContainer') {
                document.getElementById(containerId).style.display = '';
            } else {
                document.getElementById(containerId).style.display = 'none';
            }
        });
    } else if (filter.includes('teknis')) {
        containers.forEach(containerId => {
            if (containerId === 'teknisLinksContainer') {
                document.getElementById(containerId).style.display = '';
            } else {
                document.getElementById(containerId).style.display = 'none';
            }
        });
    } else {
        // If input is not 'adm' or 'teknis', perform normal filtering
        containers.forEach(containerId => {
            let linksContainer = document.getElementById(containerId);
            let linkCards = linksContainer.getElementsByClassName('link-card');

            for (let i = 0; i < linkCards.length; i++) {
                let linkText = linkCards[i].getElementsByClassName('link-text')[0];
                if (linkText.innerText.toLowerCase().indexOf(filter) > -1) {
                    linkCards[i].style.display = "";
                } else {
                    linkCards[i].style.display = "none";
                }
            }
        });
    }

    // Update the visibility of the indicators based on the link cards
    updateIndicators();
}
