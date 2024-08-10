const admLinks = [{
    alias: 'Simpeg',
    image: 'logo/',
    url: 'https://simpeg.bps.go.id',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true
}, {
    alias: 'Kipapp',
    image: 'logo/kipapp.png',
    url: 'https://webapps.bps.go.id/kipapp/',
    clicks: 0,
    bgColor: '#66CC8A',
    vpn: false
}, {
    alias: 'Sipecut',
    image: 'logo/sipecut.svg',
    url: 'https://sipecut.bps.go.id',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true
}, {
    alias: 'BOS',
    image: 'logo/BOS.png',
    url: 'https://backoffice.bps.go.id/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true
}, {
    alias: 'PPID',
    image: 'logo/PPID.png',
    url: 'https://ppid.bps.go.id/?mfd=3313',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: false
}, {
    alias: 'Emonev Bappenas',
    image: 'logo/emonev.png',
    url: 'https://e-monev.bappenas.go.id/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: false
}, {
    alias: 'Daftar Hadir BPS',
    image: 'logo/daftar-hadir.svg',
    url: 'https://webapps.bps.go.id/daftarhadir/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true
}, {
    "alias": "SMART",
    "image": "https://www.google.com/s2/favicons?domain=smart.kemenkeu.go.id&sz=128",
    "url": "https://smart.kemenkeu.go.id/",
    "clicks": 0,
    "bgColor": "#F8F8F2",
    "vpn": false
}, {
    alias: 'Manajemen Mitra',
    image: 'logo/',
    url: 'https://manajemen-mitra.bps.go.id/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true
}];

const teknisLinks = [{
    alias: 'Evita',
    image: 'logo/',
    url: 'https://s.bps.go.id/evitajateng',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: false
}, {
    alias: 'Monitoring',
    image: 'logo/monitoring.png',
    url: 'https://webmonitoring.bps.go.id/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true
}, {
    alias: 'Dashboard BPS',
    image: 'logo/',
    url: 'http://dashboard.bps.go.id/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true
}, {
    alias: 'Quality Gate',
    image: 'logo/quality-gate.png',
    url: 'https://webapps.bps.go.id/nqaf/qgate/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true
}, {
    alias: 'Pengolahan',
    image: 'logo/',
    url: 'https://pengolahan.bps.go.id/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: false
}, {
    alias: 'Webentry',
    image: 'logo/',
    url: 'https://webentry.bps.go.id/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true
}, {
    alias: 'Portal Publikasi',
    image: 'logo/publikasi.png',
    url: 'https://portalpublikasi.bps.go.id/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: false
}, {
    alias: 'Omae',
    image: 'logo/',
    url: 'https://webapps.bps.go.id/jateng/omae/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true
}, {alias: 'Romantik',
    image: 'logo/romantik.svg',
    url: 'https://romantik.web.bps.go.id/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true},
    {
    alias: 'Pembinaan Statistik Sektoral',
    image: 'logo/PSS.png',
    url: 'https://webapps.bps.go.id/rujukan/pembinaan/public/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: false
}, {
    alias: 'Sinergi',
    image: 'logo/',
    url: 'https://webapps.bps.go.id/jateng/sinergi/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: false
}, {
    alias: 'KSA',
    image: 'logo/KSA.png',
    url: 'https://ksa.bps.go.id/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true
}, {
    alias: 'KSA Pro',
    image: 'logo/manajemen.png',
    url: 'https://ksapro-manajemen.bps.go.id/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: true
}, {
    alias: 'PemirsaSDGs',
    image: 'logo/',
    url: 'https://pemirsasdgs.jatengprov.go.id/',
    clicks: 0,
    bgColor: '#F8F8F2',
    vpn: false
}];

// Event Listeners
document.addEventListener('DOMContentLoaded', loadLinks);
document.addEventListener('DOMContentLoaded', updateTopLinks);
document.getElementById('addLinkForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addLink();
});
document.getElementById('editLinkForm').addEventListener('submit', function (event) {
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

    try {
        new URL(link.url); // Check if the URL is valid
        linkCard.href = link.url;
    } catch (e) {
        console.error(`Invalid URL: ${link.url}`);
        return; // Skip adding this link if URL is invalid
    }

    linkCard.className = `card h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32 border-2 border-base-content/5 card-compact transition-all duration-200 hover:shadow hover:-translate-y-1 link-card tooltip`;
    linkCard.draggable = true;
    linkCard.style.backgroundColor = link.bgColor;
    linkCard.innerHTML = `
        <div class="hidden md:block absolute dropdown dropdown-hover dropdown-end top-2 right-2">
            <label tabindex="0" class="cursor-pointer" onclick="event.stopPropagation()">☰</label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-auto">
                <li><a class="text-xs" href="#" onclick="editLink('${link.url}', '${category}'); event.stopPropagation(); return false;">Edit</a></li>
                <li><a class="text-xs" href="#" onclick="removeLink('${link.url}', '${category}'); event.stopPropagation(); return false;">Remove</a></li>
            </ul>
        </div>
        <figure class="px-1 lg:px-4 pt-3 lg:pt-7 aspect-[2/1] items-end overflow-visible">
            <img src="${link.image === '/logo' ? 'logo/logo.png' : link.image }"
             onerror="this.src='https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}&sz=128'; this.onerror=null; this.src='logo/logo.png';"
             class="image-logo aspect-square w-6 lg:w-10 h-auto" alt="image"/>
        </figure>
        <div class="card-body text-center">
            <span class="link-text text-xs inline-block max-w-[50px] md:max-w-[75px] lg:max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                ${link.alias}
            </span>
        </div>
        ${link.vpn ? '<div class="vpn-text absolute bottom-0 left-0 w-4 h-4 md:w-6 md:h-6 bg-base-200 rounded-tr-full"><img class="h-3 w-3 md:h-4 md:w-4 mt-0.5 md:mt-1.5" src="logo/shield-keyhole.svg" alt="vpn"/></div>' : ''}
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
        alias: alias, url: url, clicks: 0, bgColor: '#F8F8F2', vpn: false
    };

    let links = JSON.parse(localStorage.getItem('links')) || [];
    links.push(newLink);
    localStorage.setItem('links', JSON.stringify(links));

    appendLinkToContainer(newLink, 'linksContainer', 'links');
    document.getElementById('add_link').close();
    document.getElementById('addLinkForm').reset();
    updateTopLinks();
}

// Update Links Within Containers
function updateTopLinks() {
    function sortLinks(containerId, links) {
        let container = document.getElementById(containerId);
        let linkCards = Array.from(container.getElementsByClassName('link-card'));
        linkCards.sort((a, b) => {
            let urlA = a.href;
            let urlB = b.href;
            let clicksA = links.find(link => link.url === urlA)?.clicks || 0;
            let clicksB = links.find(link => link.url === urlB)?.clicks || 0;
            return clicksB - clicksA;
        });
        container.innerHTML = '';
        linkCards.forEach(card => container.appendChild(card));
    }

    let admLinksData = JSON.parse(localStorage.getItem('admLinks')) || [];
    let teknisLinksData = JSON.parse(localStorage.getItem('teknisLinks')) || [];
    let allLinksData = JSON.parse(localStorage.getItem('links')) || [];

    sortLinks('admLinksContainer', admLinksData);
    sortLinks('teknisLinksContainer', teknisLinksData);
    sortLinks('linksContainer', allLinksData);
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
            let image = card.getElementsByTagName('img')[0].src;
            let url = card.href;
            let bgColor = card.style.backgroundColor;
            let vpn = card.getElementsByClassName('vpn-text').length > 0;
            let clicks = JSON.parse(localStorage.getItem('links'))?.find(link => link.url === url)?.clicks || 0;

            if (containerId === 'admLinksContainer') {
                admLinksData.push({alias, image, url, clicks, bgColor, vpn});
            } else if (containerId === 'teknisLinksContainer') {
                teknisLinksData.push({alias, image, url, clicks, bgColor, vpn});
            } else {
                allLinks.push({alias, image, url, clicks, bgColor, vpn});
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
