let quotes = JSON.parse(localStorage.getItem('quotes')) || initialQuotes;
let currentPage = 'home';

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function toggleFavoriteMenu(id, event) {
    event.stopPropagation();
    const options = document.querySelectorAll('.favorite-options');
    options.forEach(opt => {
        if (opt.id !== `favorite-options-${id}`) {
            opt.classList.remove('show');
        }
    });
    document.getElementById(`favorite-options-${id}`).classList.toggle('show');
}

function setFavoriteType(id, type, event) {
    event.stopPropagation();
    quotes = quotes.map(quote => 
        quote.id === id 
            ? {...quote, favoriteType: quote.favoriteType === type ? 0 : type}
            : quote
    );
    saveQuotes();
    showCurrentPage();
}

document.addEventListener('click', () => {
    document.querySelectorAll('.favorite-options').forEach(opt => {
        opt.classList.remove('show');
    });
});

function getFavoriteIcon(favoriteType) {
    const colorClass = favoriteType > 0 ? `favorite${favoriteType}-color` : '';
    return favoriteType > 0 
        ? `<i class="fas fa-heart ${colorClass}"></i>`
        : `<i class="far fa-heart"></i>`;
}

function createQuoteCard(quote) {
    return `
        <div class="quote-card">
            <button class="favorite-btn" onclick="toggleFavoriteMenu('${quote.id}', event)">
                ${getFavoriteIcon(quote.favoriteType)}
            </button>
            <div class="favorite-options" id="favorite-options-${quote.id}">
                <button class="favorite-option" onclick="setFavoriteType('${quote.id}', 1, event)">
                    <i class="fas fa-heart favorite1-color"></i> Favorite 1
                </button>
                <button class="favorite-option" onclick="setFavoriteType('${quote.id}', 2, event)">
                    <i class="fas fa-heart favorite2-color"></i> Favorite 2
                </button>
                <button class="favorite-option" onclick="setFavoriteType('${quote.id}', 3, event)">
                    <i class="fas fa-heart favorite3-color"></i> Favorite 3
                </button>
            </div>
            <div class="quote-text">${quote.text}</div>
            <div class="quote-author">- ${quote.author}</div>
        </div>
    `;
}

function toggleDrawer() {
    document.getElementById('drawer').classList.toggle('open');
    document.querySelector('.overlay').classList.toggle('open');
}

function showHome() {
    toggleDrawer();
    currentPage = 'home';
    showCurrentPage();
}

function showFavorites(type) {
    toggleDrawer();
    currentPage = `favorites${type}`;
    showCurrentPage();
}

function showCurrentPage() {
    const mainContent = document.getElementById('main-content');
    if (currentPage === 'home') {
        mainContent.innerHTML = quotes.map(quote => createQuoteCard(quote)).join('');
    } else {
        const favoriteType = parseInt(currentPage.replace('favorites', ''));
        const favoriteQuotes = quotes.filter(quote => quote.favoriteType === favoriteType);
        mainContent.innerHTML = favoriteQuotes.length === 0 
            ? `<div style="text-align: center; margin-top: 2rem;">
                <i class="fas fa-heart-broken" style="font-size: 3rem; color: var(--pink);"></i>
                <p style="margin-top: 1rem;">No favorite quotes in category ${favoriteType}!</p>
               </div>`
            : favoriteQuotes.map(quote => createQuoteCard(quote)).join('');
    }
}

// Initial load
showCurrentPage();