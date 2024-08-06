/* const entities = [
    {
        img: '../image/1.jpg'
    },
    {
        img: '../image/2.jpg'
    },
    {
        img: '../image/3.jpg'
    }
]

const img = document.querySelector('.image')

const setEntity = (index) => {
    img.style.backgroundImage = `url(${entities[index].img})`
}

const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
let currentIndex = 0

prev.addEventListener('click', () => {
    setEntity(currentIndex - 1);
    currentIndex -= 1;
})
next.addEventListener('click', () => {
    setEntity(currentIndex + 1);
    currentIndex += 1;
}) */
const entities = [
    {
        img: '../src/image/1.jpg'
    },
    {
        img: '../src/image/2.jpg'
    },
    {
        img: '../src/image/3.jpg'
    }
];

const img = document.querySelector('.image');
const dotsContainer = document.querySelector('.dots');

const setEntity = (index) => {
    if (index < 0) {
        currentIndex = entities.length - 1;
    } else if (index >= entities.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    img.style.backgroundImage = `url(${entities[currentIndex].img})`;

    updateDots();
};

const updateDots = () => {
    const dots = dotsContainer.querySelectorAll('span');
    dots.forEach((dot, index) => {
        dot.className = index === currentIndex ? 'active' : '';
    });
};

const createDots = () => {
    entities.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => setEntity(index));
        dotsContainer.appendChild(dot);
    });
};

let currentIndex = 0;

// Автоматическое переключение изображений
const autoSlide = () => {
    setInterval(() => {
        setEntity(currentIndex + 1);
    }, 5000); // Переключение каждые 5 секунд
};

document.addEventListener('DOMContentLoaded', () => {
    createDots();
    setEntity(currentIndex);
    autoSlide();
});