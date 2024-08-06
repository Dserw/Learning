import './slider.js';
import './api.js';
import './style.css';
// Функция для обновления бейджика корзины
function updateCartBadge(count) {
    const badge = document.getElementById('cart-badge');
    badge.textContent = count;
}

// Обработка события обновления корзины
window.addEventListener('cartUpdated', (event) => {
    const { count } = event.detail;
    updateCartBadge(count);
});

// Инициализация бейджика корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartBadge(savedCart.length);
});

// Пример добавления товара в корзину
let cartCount = 0;
document.getElementById('cart-button').addEventListener('click', () => {
    cartCount++;
    updateCartBadge(cartCount);
});

// Инициализация шапки
document.addEventListener('DOMContentLoaded', () => {
    // Сюда можно добавить дополнительные инициализации, если нужно
});

