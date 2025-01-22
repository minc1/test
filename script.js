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
    "Roses are red, violets are blue, the Yes button is perfect for you! 🌹",
    // New fun messages
    "Running away won't solve anything! 🏃‍♂️💨",
    "Error 404: Rejection not found 🤖",
    "You're breaking my pixels! 💔",
    "I've got cookies on the Yes side! 🍪",
    "The Yes button is feeling lonely! 🥺",
    "Legend says the No button never worked 📜",
    "Task failed successfully: Still waiting for Yes! ⌛",
    "Plot twist: This is all a dream, just say Yes! 💭",
    "Loading rejection.exe... Failed! 💿",
    "Ctrl + Alt + Yes for best results! ⌨️",
    "404: No button functionality not found! 🔍",
    "Warning: No button may cause unexpected happiness! ⚠️",
    "Calculating alternative options... Only YES found! 🧮",
    "Have you tried turning it off and saying yes instead? 🔄"
];

// Track number of dodge attempts
let dodgeCount = 0;

// Handle successful Yes click
function respondYes() {
    const response = document.getElementById('response');
    response.innerHTML = "YAY! 💖 You've made me the happiest person! Let's make beautiful memories together! 💑";
    response.style.animation = "heartBeat 1.3s ease-in-out";
    
    // Enhanced celebration effects
    document.body.style.animation = 'rainbowBg 2s infinite';
    
    // Trigger multiple confetti effects
    createConfetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Add heart confetti with delay
    setTimeout(() => {
        createHeartConfetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
        });
    }, 300);

    // Disable and hide the No button
    document.getElementById('noBtn').style.display = 'none';
    
    // Transform the Yes button
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.disabled = true;
    yesBtn.style.transform = 'rotateX(10deg) rotateY(10deg) scale(1.2)';
    yesBtn.style.animation = "heartBeat 1.3s ease-in-out infinite";
    yesBtn.innerHTML = 'Together Forever 💕';

    // Enhanced celebration
    createCelebrationEmojis();
    addFloatingHearts();
    
    // Remove page leave confirmation
    window.onbeforeunload = null;
}

// Handle No button dodge with progressive difficulty
function dodgeButton() {
    // Don't dodge on touch devices
    if (window.matchMedia('(hover: none)').matches) return;
    
    const noBtn = document.getElementById('noBtn');
    const messageElement = document.getElementById('response');
    
    // Increase dodge speed and range based on attempts
    const speed = Math.min(1 + dodgeCount / 8, 2.5);
    const range = Math.min(100 + dodgeCount * 15, 300);
    
    // Calculate new random position with more erratic movement
    const x = Math.random() * range - range/2;
    const y = Math.random() * range - range/2;
    
    // Make movement more erratic as dodge count increases
    const wobble = Math.sin(dodgeCount) * (10 + dodgeCount);
    const rotation = Math.random() * 360 + wobble;
    
    // Progressive size reduction
    const scale = Math.max(0.5, 1 - (dodgeCount * 0.05));
    
    // Apply smooth transition with variable speed
    noBtn.style.transition = `all ${0.2/speed}s ${dodgeCount > 5 ? 'ease-in-out' : 'ease-out'}`;
    noBtn.style.transform = `translate(${x + wobble}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
    
    // Show random pleading message
    messageElement.innerHTML = pleadingMessages[Math.floor(Math.random() * pleadingMessages.length)];
    messageElement.style.color = '#ff4d6d';
    
    // Make Yes button more attractive
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.style.transform = 'rotateX(10deg) rotateY(10deg) scale(1.1)';
    yesBtn.style.boxShadow = '0 0 20px rgba(255, 77, 109, 0.8)';
    
    // Reset Yes button after a short delay
    setTimeout(() => {
        yesBtn.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        yesBtn.style.boxShadow = '0 4px 15px rgba(255, 77, 109, 0.4)';
    }, 200);
    
    dodgeCount++;
    updateBackgroundHearts();
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

// Enhanced celebration emojis
function createCelebrationEmojis() {
    const emojis = ['🎉', '🎊', '🎈', '🎸', '🎺', '✨', '⭐', '🌟'];
    const container = document.querySelector('.celebration-container');
    
    for (let i = 0; i < 50; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'celebration-emoji';
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 2000);
    }
}

// Update dynamic background hearts
function updateBackgroundHearts() {
    const hearts = document.querySelectorAll('.background-heart');
    hearts.forEach(heart => {
        const rotation = Math.random() * 360;
        const scale = 0.5 + Math.random();
        heart.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    });
}

// Add floating hearts celebration
function addFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const hearts = ['💖', '💝', '💕', '💗'];
    const numHearts = 30;
    
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
    
    // Initialize dynamic background
    updateBackgroundHearts();
    
    // Prevent accidental page refresh
    window.onbeforeunload = function() {
        return "Don't leave yet! You haven't answered!";
    };
    
    // Add touch event listener for mobile
    if (window.matchMedia('(hover: none)').matches) {
        const noBtn = document.getElementById('noBtn');
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const messageElement = document.getElementById('response');
            messageElement.innerHTML = pleadingMessages[Math.floor(Math.random() * pleadingMessages.length)];
            messageElement.style.color = '#ff4d6d';
        });
    }
});