document.addEventListener('DOMContentLoaded', loadLinks);

document.getElementById('addLinkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addLink();
});

function filterLinks() {
    let input = document.getElementById('searchInput');
    let filter = input.value.toLowerCase();
    let linksContainer = document.getElementById('linksContainer');
    let linkCards = linksContainer.getElementsByClassName('link-card');

    for (let i = 0; i < linkCards.length; i++) {
        let linkText = linkCards[i].getElementsByClassName('link-text')[0];
        if (linkText.innerText.toLowerCase().indexOf(filter) > -1) {
            linkCards[i].style.display = "";
        } else {
            linkCards[i].style.display = "none";
        }
    }
}

function addLink() {
    let alias = document.getElementById('linkAlias').value;
    let url = document.getElementById('linkUrl').value;

    let newLink = {
        alias: alias,
        url: url,
        clicks: 0
    };

    let links = JSON.parse(localStorage.getItem('links')) || [];
    links.push(newLink);
    localStorage.setItem('links', JSON.stringify(links));

    appendLinkToContainer(newLink);
    document.getElementById('add_link').close();
    document.getElementById('addLinkForm').reset();
    updateTopLinks();
}

function appendLinkToContainer(link) {
    let linksContainer = document.getElementById('linksContainer');
    let linkCard = document.createElement('a');
    linkCard.href = link.url;
    linkCard.className = 'card h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32 border-2 border-base-content/5 card-compact transition-all duration-200 hover:shadow hover:-translate-y-1 link-card';
    linkCard.draggable = true;
    linkCard.innerHTML = `
            <figure class="px-1 lg:px-4 pt-3 lg:pt-7 aspect-[2/1] items-end overflow-visible">
                <img src="{{ asset('logo/logo.png') }}" class="aspect-square w-6 lg:w-10 h-auto" alt="image"/>
            </figure>
            <div class="card-body text-center">
                <span class="link-text text-xs inline-block max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                    ${link.alias}
                </span>
            </div>
        `;

    linkCard.addEventListener('click', () => incrementClickCount(link));
    linkCard.addEventListener('dragstart', handleDragStart);
    linkCard.addEventListener('dragover', handleDragOver);
    linkCard.addEventListener('drop', handleDrop);
    linkCard.addEventListener('dragend', handleDragEnd);

    linksContainer.appendChild(linkCard);
}

function incrementClickCount(link) {
    let links = JSON.parse(localStorage.getItem('links')) || [];
    let foundLink = links.find(l => l.url === link.url);
    if (foundLink) {
        foundLink.clicks += 1;
    }
    localStorage.setItem('links', JSON.stringify(links));
    updateTopLinks();
}

function loadLinks() {
    let links = JSON.parse(localStorage.getItem('links')) || [];
    links.forEach(link => appendLinkToContainer(link));
    updateTopLinks();
}

function updateTopLinks() {
    let links = JSON.parse(localStorage.getItem('links')) || [];
    links.sort((a, b) => b.clicks - a.clicks);
    let topLinks = links.slice(0, 5);

    let topLinksContainer = document.getElementById('topLinksContainer');
    topLinksContainer.innerHTML = '';

    topLinks.forEach(link => {
        let linkCard = document.createElement('a');
        linkCard.href = link.url;
        linkCard.className = 'card h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32 border-2 border-base-content/5 card-compact transition-all duration-200 hover:shadow hover:-translate-y-1 link-card';
        linkCard.innerHTML = `
                <figure class="px-1 lg:px-4 pt-3 lg:pt-7 aspect-[2/1] items-end overflow-visible">
                    <img src="{{ asset('logo/logo.png') }}" class="aspect-square w-6 lg:w-10 h-auto" alt="image"/>
                </figure>
                <div class="card-body text-center">
                    <span class="link-text text-xs inline-block max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                        ${link.alias}
                    </span>
                </div>
            `;
        topLinksContainer.appendChild(linkCard);
    });
}

let draggedElement = null;

function handleDragStart(event) {
    draggedElement = this;
    event.dataTransfer.effectAllowed = 'move';
    setTimeout(() => this.classList.add('dragging'), 0);
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event) {
    event.preventDefault();
    if (this !== draggedElement) {
        let linksContainer = document.getElementById('linksContainer');
        let linksArray = Array.from(linksContainer.children);
        let draggedIndex = linksArray.indexOf(draggedElement);
        let targetIndex = linksArray.indexOf(this);

        if (draggedIndex < targetIndex) {
            linksContainer.insertBefore(draggedElement, this.nextSibling);
        } else {
            linksContainer.insertBefore(draggedElement, this);
        }

        updateLinksOrder();
    }
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedElement = null;
}

function updateLinksOrder() {
    let linksContainer = document.getElementById('linksContainer');
    let linkCards = linksContainer.getElementsByClassName('link-card');
    let links = [];

    for (let card of linkCards) {
        let alias = card.getElementsByClassName('link-text')[0].innerText;
        let url = card.href;
        let clicks = JSON.parse(localStorage.getItem('links'))?.find(link => link.url === url)?.clicks || 0;

        links.push({ alias, url, clicks });
    }

    localStorage.setItem('links', JSON.stringify(links));
}
