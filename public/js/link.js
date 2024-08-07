const admLinks = [
    { alias: 'Simpeg', url: 'https://simpeg.bps.go.id', clicks: 0 },
    { alias: 'Kipapp', url: 'https://webapps.bps.go.id/kipapp/', clicks: 0 },
    { alias: 'Sipecut', url: 'https://sipecut.bps.go.id', clicks: 0 },
    { alias: 'BOS', url: 'https://backoffice.bps.go.id/', clicks: 0 },
    { alias: 'PPID', url: 'https://ppid.bps.go.id/?mfd=3313', clicks: 0 },
    { alias: 'Emonev Bappenas', url: 'https://e-monev.bappenas.go.id/', clicks: 0 },
    { alias: 'Daftar Hadir BPS', url: 'https://webapps.bps.go.id/daftarhadir/', clicks: 0 },
    { alias: 'SMART', url: 'https://smart.kemenkeu.go.id/', clicks: 0 },
    { alias: 'Manajemen Mitra', url: 'https://manajemen-mitra.bps.go.id/', clicks: 0 }
];

const teknisLinks = [
    { alias: 'Evita', url: 'https://s.bps.go.id/evitajateng', clicks: 0 },
    { alias: 'Monitoring', url: 'https://webmonitoring.bps.go.id/', clicks: 0 },
    { alias: 'Dashboard BPS', url: 'http://dashboard.bps.go.id/', clicks: 0 },
    { alias: 'Quality Gate', url: 'https://webapps.bps.go.id/nqaf/qgate/', clicks: 0 },
    { alias: 'Pengolahan', url: 'https://pengolahan.bps.go.id/', clicks: 0 },
    { alias: 'Webentry', url: 'https://webentry.bps.go.id/', clicks: 0 },
    { alias: 'Portal Publikasi', url: 'https://portalpublikasi.bps.go.id/', clicks: 0 },
    { alias: 'Omae', url: 'https://webapps.bps.go.id/jateng/omae/', clicks: 0 },
    { alias: 'Romantik', url: 'https://romantik.web.bps.go.id/', clicks: 0 },
    { alias: 'Pembinaan Statistik Sektoral', url: 'https://webapps.bps.go.id/rujukan/pembinaan/public/', clicks: 0 },
    { alias: 'Sinergi', url: 'https://webapps.bps.go.id/jateng/sinergi/', clicks: 0 },
    { alias: 'KSA', url: 'https://ksa.bps.go.id/', clicks: 0 },
    { alias: 'KSA Pro', url: 'https://ksapro-manajemen.bps.go.id/', clicks: 0 },
    { alias: 'PemirsaSDGs', url: 'https://pemirsasdgs.jatengprov.go.id/', clicks: 0 }
];

// Event Listeners
document.addEventListener('DOMContentLoaded', loadLinks);
document.addEventListener('DOMContentLoaded', updateTopLinks);
document.getElementById('addLinkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addLink();
});
document.getElementById('editLinkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    updateLink();
});

// Draggable Initialization
function initializeDraggable() {
    let linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragover', handleDragOver);
        card.addEventListener('drop', handleDrop);
        card.addEventListener('dragend', handleDragEnd);
    });
}

// Append Link to Container
function appendLinkToContainer(link, containerId, category) {
    let linksContainer = document.getElementById(containerId);
    let linkCard = document.createElement('a');
    linkCard.href = link.url;
    linkCard.className = 'card bg-base-100 h-[72px] w-[72px] md:h-28 md:w-28 lg:h-32 lg:w-32 border-2 border-base-content/5 card-compact transition-all duration-200 hover:shadow hover:-translate-y-1 link-card tooltip';
    linkCard.draggable = true;
    linkCard.innerHTML = `
        <div class="dropdown dropdown-hover dropdown-end absolute top-2 right-2">
            <label tabindex="4" class="cursor-pointer" onclick="event.stopPropagation()">☰</label>
            <ul tabindex="4" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-auto">
                <li><a class="text-xs" href="#" onclick="editLink('${link.url}', '${category}'); event.stopPropagation(); return false;">Edit</a></li>
                <li><a class="text-xs" href="#" onclick="removeLink('${link.url}', '${category}'); event.stopPropagation(); return false;">Remove</a></li>
            </ul>
        </div>
        <figure class="px-1 lg:px-4 pt-3 lg:pt-7 aspect-[2/1] items-end overflow-visible">
            <img src="https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}" onerror="this.src='{{ asset('logo/logo.png') }}'" class="aspect-square w-6 lg:w-10 h-auto" alt="image"/>
        </figure>
        <div class="card-body text-center">
            <span class="link-text text-xs inline-block max-w-[50px] md:max-w-[75px] lg:max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                ${link.alias}
            </span>
        </div>
    `;

    linkCard.addEventListener('click', function (e) {
        e.preventDefault();
        incrementLinkClick(link.url, category);
        window.open(link.url, '_blank');
    });

    linksContainer.appendChild(linkCard);
    initializeDraggable();
}

// Load Links
function loadLinks() {
    let admLinksContainer = document.getElementById('admLinksContainer');
    let teknisLinksContainer = document.getElementById('teknisLinksContainer');
    let linksContainer = document.getElementById('linksContainer');

    admLinksContainer.innerHTML = '';
    teknisLinksContainer.innerHTML = '';
    linksContainer.innerHTML = '';

    let admLinksData = JSON.parse(localStorage.getItem('admLinks')) || admLinks;
    let teknisLinksData = JSON.parse(localStorage.getItem('teknisLinks')) || teknisLinks;
    let links = JSON.parse(localStorage.getItem('links')) || [];

    localStorage.setItem('admLinks', JSON.stringify(admLinks));
    localStorage.setItem('teknisLinks', JSON.stringify(teknisLinks));

    admLinksData.forEach(link => {
        appendLinkToContainer(link, 'admLinksContainer', 'admLinks');
    });

    teknisLinksData.forEach(link => {
        appendLinkToContainer(link, 'teknisLinksContainer', 'teknisLinks');
    });

    links.forEach(link => {
        appendLinkToContainer(link, 'linksContainer', 'links');
    });

    updateTopLinks();
}

// Add Link
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

    appendLinkToContainer(newLink, 'linksContainer', 'links');
    document.getElementById('add_link').close();
    document.getElementById('addLinkForm').reset();
    updateTopLinks();
}

// Update Top Links
function updateTopLinks() {
    let topLinksContainer = document.getElementById('topLinksContainer');
    topLinksContainer.innerHTML = '';

    let links = JSON.parse(localStorage.getItem('links')) || [];
    let topLinks = links.sort((a, b) => b.clicks - a.clicks).slice(0, 4);

    topLinks.forEach(link => {
        let linkCard = document.createElement('a');
        linkCard.href = link.url;
        linkCard.className = 'card bg-base-100 h-[72px] w-[72px] md:h-28 md:w-28 lg:h-32 lg:w-32 border-2 border-base-content/5 card-compact transition-all duration-200 hover:shadow hover:-translate-y-1 link-card';
        linkCard.innerHTML = `
            <figure class="px-1 lg:px-4 pt-3 lg:pt-7 aspect-[2/1] items-end overflow-visible">
                <img src="https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}" onerror="this.src='{{ asset('logo/logo.png') }}'" class="aspect-square w-6 lg:w-10 h-auto" alt="image"/>
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

// Drag-and-Drop Handlers
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
        let linksContainer;
        let draggedContainerId;
        let targetContainerId;

        // Determine the container IDs for dragged and target elements
        let allContainers = ['linksContainer', 'admLinksContainer', 'teknisLinksContainer'];

        allContainers.forEach(containerId => {
            let container = document.getElementById(containerId);
            if (container.contains(draggedElement)) {
                draggedContainerId = containerId;
            }
            if (container.contains(this)) {
                targetContainerId = containerId;
            }
        });

        if (draggedContainerId && targetContainerId) {
            let draggedContainer = document.getElementById(draggedContainerId);
            let targetContainer = document.getElementById(targetContainerId);

            let draggedIndex = Array.from(draggedContainer.children).indexOf(draggedElement);
            let targetIndex = Array.from(targetContainer.children).indexOf(this);

            if (draggedContainerId === targetContainerId) {
                // If the dragged and target elements are in the same container
                if (draggedIndex < targetIndex) {
                    targetContainer.insertBefore(draggedElement, this.nextSibling);
                } else {
                    targetContainer.insertBefore(draggedElement, this);
                }
            } else {
                // If the dragged and target elements are in different containers
                draggedContainer.removeChild(draggedElement);
                if (targetIndex === -1) {
                    targetContainer.appendChild(draggedElement);
                } else {
                    targetContainer.insertBefore(draggedElement, this);
                }
            }

            updateLinksOrder();
        }
    }
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedElement = null;
}

// Update Links Order
function updateLinksOrder() {
    let linkContainers = ['linksContainer', 'admLinksContainer', 'teknisLinksContainer'];
    let allLinks = [];
    let admLinksData = [];
    let teknisLinksData = [];

    linkContainers.forEach(containerId => {
        let linksContainer = document.getElementById(containerId);
        let linkCards = linksContainer.getElementsByClassName('link-card');

        for (let card of linkCards) {
            let alias = card.getElementsByClassName('link-text')[0].innerText;
            let url = card.href;
            let clicks = JSON.parse(localStorage.getItem('links'))?.find(link => link.url === url)?.clicks || 0;

            if (containerId === 'admLinksContainer') {
                admLinksData.push({ alias, url, clicks });
            } else if (containerId === 'teknisLinksContainer') {
                teknisLinksData.push({ alias, url, clicks });
            } else {
                allLinks.push({ alias, url, clicks });
            }
        }
    });

    localStorage.setItem('admLinks', JSON.stringify(admLinksData));
    localStorage.setItem('teknisLinks', JSON.stringify(teknisLinksData));
    localStorage.setItem('links', JSON.stringify(allLinks));
}

// Increment Link Click
function incrementLinkClick(url, category) {
    let links = JSON.parse(localStorage.getItem(category)) || [];
    let link = links.find(l => l.url === url);
    if (link) {
        link.clicks++;
        localStorage.setItem(category, JSON.stringify(links));
        updateTopLinks();
    }
}

// Edit Link
function editLink(url, category) {
    let links = JSON.parse(localStorage.getItem(category)) || [];
    let link = links.find(l => l.url === url);
    if (link) {
        document.getElementById('editAlias').value = link.alias;
        document.getElementById('editUrl').value = link.url;
        document.getElementById('editLinkForm').setAttribute('data-url', url);
        document.getElementById('editLinkForm').setAttribute('data-category', category);
        document.getElementById('edit_link').showModal();
    }
}

// Update Link
function updateLink() {
    let oldUrl = document.getElementById('editLinkForm').getAttribute('data-url');
    let category = document.getElementById('editLinkForm').getAttribute('data-category');
    let alias = document.getElementById('editAlias').value;
    let url = document.getElementById('editUrl').value;

    let links = JSON.parse(localStorage.getItem(category)) || [];
    let linkIndex = links.findIndex(l => l.url === oldUrl);
    if (linkIndex !== -1) {
        links[linkIndex].alias = alias;
        links[linkIndex].url = url;
        localStorage.setItem(category, JSON.stringify(links));
    }

    loadLinks();
    document.getElementById('edit_link').close();
}

// Remove Link
function removeLink(url, category) {
    let links = JSON.parse(localStorage.getItem(category)) || [];
    links = links.filter(link => link.url !== url);
    localStorage.setItem(category, JSON.stringify(links));

    let containerId = category + 'Container';
    let linksContainer = document.getElementById(containerId);
    let linkCards = linksContainer.getElementsByClassName('link-card');

    for (let card of linkCards) {
        if (card.href === url) {
            card.remove();
            break;
        }
    }

    updateTopLinks();
}
