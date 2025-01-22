// Fun messages that appear when trying to click "No"
const pleadingMessages = [
    "Pretty please? 🥺",
    "Come on, you know you want to! 😘",
    "Don't be like that! 💝",
    "Is this button being difficult? Just click YES! 😅",
    "Playing hard to get, huh? 😏",
    "My other button is much nicer! ⬅️",
    "Wrong button! The yes button is your friend! 🫂",
    "Resistance is futile! 💘",
    "But we'd be so cute together! 🎀",
    "I'll give you chocolate! 🍫",
    "Look how sad you're making the yes button 😢",
    "Plot twist: This button doesn't even work! 🎬",
    "Error 404: No button functionality not found 😅",
    "Maybe the Yes button is more your style? 💫",
    "Roses are red, violets are blue, the Yes button is perfect for you! 🌹"
];

// Track number of dodge attempts
let dodgeCount = 0;

// Handle successful Yes click
function respondYes() {
    const response = document.getElementById('response');
    response.innerHTML = "YAY! 💖 You've made me the happiest person! Let's make beautiful memories together! 💑";
    response.style.transform = 'scale(1.1)';
    
    // Trigger multiple confetti effects
    createConfetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Add heart confetti
    setTimeout(() => {
        createHeartConfetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
        });
    }, 300);

    // Disable the No button
    document.getElementById('noBtn').style.display = 'none';
    
    // Make the Yes button unclickable after success
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.disabled = true;
    yesBtn.style.transform = 'scale(1.2)';
    yesBtn.innerHTML = 'Together Forever 💕';

    // Add floating hearts celebration
    addFloatingHearts();
}

// Handle No button dodge
function dodgeButton() {
    const noBtn = document.getElementById('noBtn');
    const messageElement = document.getElementById('response');
    
    // Increase dodge speed and range based on attempts
    const speed = Math.min(1 + dodgeCount / 10, 2);
    const range = Math.min(100 + dodgeCount * 10, 300);
    
    // Calculate new position
    const x = Math.random() * range - range/2;
    const y = Math.random() * range - range/2;
    
    // Apply transforms
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
    
    // Add rotation and scale for extra fun
    const rotation = Math.random() * 360;
    const scale = 0.7 + Math.random() * 0.3;
    noBtn.style.transform += ` rotate(${rotation}deg) scale(${scale})`;
    
    // Show random pleading message
    messageElement.innerHTML = pleadingMessages[Math.floor(Math.random() * pleadingMessages.length)];
    messageElement.style.color = '#ff4d6d';
    
    // Make Yes button more attractive
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.style.transform = 'scale(1.1)';
    yesBtn.style.boxShadow = '0 0 20px rgba(255, 77, 109, 0.8)';
    
    // Reset Yes button after a short delay
    setTimeout(() => {
        yesBtn.style.transform = 'scale(1)';
        yesBtn.style.boxShadow = '0 4px 15px rgba(255, 77, 109, 0.4)';
    }, 200);
    
    dodgeCount++;
}

// Create regular confetti
function createConfetti({ particleCount, spread, origin }) {
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '🎉';
        setupParticle(particle, spread, origin);
    }
}

// Create heart confetti
function createHeartConfetti({ particleCount, spread, origin }) {
    const hearts = ['💖', '💝', '💕', '💗'];
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        setupParticle(particle, spread, origin);
    }
}

// Setup particle properties
function setupParticle(particle, spread, origin) {
    particle.style.position = 'fixed';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${origin.y * 100}%`;
    particle.style.fontSize = '20px';
    particle.style.transform = 'translate(-50%, -50%)';
    particle.style.zIndex = '1000';
    particle.style.pointerEvents = 'none';
    
    // Add random rotation and movement
    const angle = Math.random() * spread - spread / 2;
    const velocity = 0.5 + Math.random() * 0.5;
    const rotation = Math.random() * 360;
    
    particle.style.animation = `fall ${3 / velocity}s linear`;
    particle.style.transform += ` rotate(${rotation}deg)`;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, (3 / velocity) * 1000);
}

// Add extra floating hearts after saying yes
function addFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const hearts = ['💖', '💝', '💕', '💗'];
    const numHearts = 30; // Add more hearts for celebration
    
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.animationDelay = (Math.random() * 2) + 's';
        container.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial floating hearts
    addFloatingHearts();
    
    // Prevent accidental page refresh
    window.onbeforeunload = function() {
        return "Don't leave yet! You haven't answered!";
    };
});