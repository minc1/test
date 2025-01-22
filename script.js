// Preloader
window.addEventListener('load', () => {
    document.querySelector('.preloader').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 500);
});

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

document.querySelector('.next').addEventListener('click', () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].classList.add('active');
});

document.querySelector('.prev').addEventListener('click', () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
});

// Response handling
function respondYes() {
    const response = document.getElementById('response-message');
    response.innerHTML = `
        <div class="celebration">
            <h2>🎉 Hooray! 💐</h2>
            <p>This is the beginning of forever! I love you more than words can say! 💖</p>
        </div>
    `;

    // Confetti explosion
    const duration = 3000;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 150,
            origin: { x: Math.random(), y: Math.random() }
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);

    // Play celebration sound
    const audio = new Audio('celebration.mp3');
    audio.play();
}

let noButtonMoves = 0;
function moveNoButton() {
    const button = document.querySelector('.no-btn');
    if (noButtonMoves < 5) {
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        button.style.transform = `translate(${x}%, ${y}%)`;
        noButtonMoves++;
    } else {
        button.style.transform = 'none';
        button.textContent = "Okay okay, I was joking! 😘";
        button.removeAttribute('onmouseover');
    }
}

// Music toggle
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');

musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = '🎵 Pause Music';
    } else {
        backgroundMusic.pause();
        musicToggle.textContent = '🎵 Play Our Song';
    }
});