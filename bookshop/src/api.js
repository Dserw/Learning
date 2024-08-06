const categories = ['Architecture', 'Fiction', 'Art & Fashion', 'Crafts & Hobbies', 'Business', 'Drama', 'Biography', 'Food & Drink', 'Health & Wellbeing', 'History & Politics', 'Humor', 'Poetry', 'Psychology', 'Science', 'Technology', 'Travel & Maps'];
const booksPerPage = 6;
let activeCategory = categories[0];
let currentPage = 0;
let books = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elements
const categoryList = document.getElementById('category-list');
const bookList = document.getElementById('book-list');
const loadMoreButton = document.getElementById('load-more');
const placeholderImage = 'https://via.placeholder.com/128x200.png?text=No+Image';

// Initialize categories
categories.forEach(category => {
    const li = document.createElement('li');
    li.textContent = category;
    li.classList.add('category-item');
    if (category === activeCategory) {
        li.classList.add('active');
    }
    li.addEventListener('click', () => {
        if (activeCategory !== category) {
            document.querySelector('.category-item.active').classList.remove('active');
            li.classList.add('active');
            activeCategory = category;
            currentPage = 0;
            books = [];
            loadBooks();
        }
    });
    categoryList.appendChild(li);
});

// Load books from Google Books API
async function loadBooks() {
    try {
        const startIndex = currentPage * booksPerPage;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${activeCategory}&startIndex=${startIndex}&maxResults=${booksPerPage}`);
        const data = await response.json();
        if (data.items) {
            books = [...books, ...data.items];
            renderBooks();
        } else {
            console.error('No books found');
        }
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Render books with "Buy now" button
function renderBooks() {
    bookList.innerHTML = '';
    books.forEach(book => {
        const { id, volumeInfo, saleInfo } = book;
        const li = document.createElement('li');
        li.classList.add('book-item');

        const coverUrl = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : placeholderImage;

        const bookCover = document.createElement('div');
        bookCover.classList.add('book-cover');
        bookCover.style.backgroundImage = `url(${coverUrl})`;
        li.appendChild(bookCover);

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');

        const title = document.createElement('div');
        title.classList.add('book-title');
        title.textContent = volumeInfo.title || 'No Title';
        bookInfo.appendChild(title);

        const authors = document.createElement('div');
        authors.classList.add('book-author');
        authors.textContent = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author';
        bookInfo.appendChild(authors);

        if (volumeInfo.averageRating) {
            const rating = document.createElement('div');
            rating.classList.add('book-rating');
            rating.innerHTML = `${'★'.repeat(Math.round(volumeInfo.averageRating))} ${'☆'.repeat(5 - Math.round(volumeInfo.averageRating))} <span>(${volumeInfo.ratingsCount || 0})</span>`;
            bookInfo.appendChild(rating);
        }

        if (volumeInfo.description) {
            const description = document.createElement('div');
            description.classList.add('book-description');
            description.textContent = volumeInfo.description.length > 200 ? volumeInfo.description.substring(0, 200) + '...' : volumeInfo.description;
            bookInfo.appendChild(description);
        }

        if (saleInfo && saleInfo.listPrice) {
            const price = document.createElement('div');
            price.classList.add('book-price');
            price.textContent = `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}`;
            bookInfo.appendChild(price);
        }

        const buyButton = document.createElement('button');
        buyButton.classList.add('buy-button');
        if (cart.includes(id)) {
            buyButton.classList.add('added');
            buyButton.textContent = 'REMOVE FROM CART';
        } else {
            buyButton.textContent = 'BUY NOW';
        }
        buyButton.addEventListener('click', () => toggleCart(id, buyButton));
        bookInfo.appendChild(buyButton);

        li.appendChild(bookInfo);
        bookList.appendChild(li);
    });
}

// Function to trigger cart update event
function dispatchCartUpdate() {
    const cartEvent = new CustomEvent('cartUpdated', {
        detail: { count: cart.length }
    });
    window.dispatchEvent(cartEvent);
}

function toggleCart(bookId, button) {
    const index = cart.indexOf(bookId);
    if (index > -1) {
        // Remove from cart
        cart.splice(index, 1);
        button.classList.remove('added');
        button.textContent = 'BUY NOW';
    } else {
        // Add to cart
        cart.push(bookId);
        button.classList.add('added');
        button.textContent = 'REMOVE FROM CART';
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

loadMoreButton.addEventListener('click', () => {
    currentPage++;
    loadBooks();
});

// Initial load
loadBooks();