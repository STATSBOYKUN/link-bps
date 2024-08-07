function filterLinks() {
    let input = document.getElementById('searchInput');
    let filter = input.value.toLowerCase();
    let containers = ['linksContainer', 'admLinksContainer', 'teknisLinksContainer'];

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
