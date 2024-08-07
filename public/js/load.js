document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loading').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('content').style.display = 'block';
            document.getElementById('content').style.opacity = '1';
        }, 500);
    }, 650);
});

function toggleSearchBar() {
    const searchInputContainer = document.getElementById('searchInputContainer');
    if (searchInputContainer.classList.contains('hidden')) {
        searchInputContainer.classList.remove('hidden');
    } else {
        searchInputContainer.classList.add('hidden');
    }
}
