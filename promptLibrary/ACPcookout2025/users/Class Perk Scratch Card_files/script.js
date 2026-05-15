// Configuration - Easy to modify prize probabilities and text
const PRIZES = {
    chocolate: {
        text: 'Chocolate Bar!',
        subtitle: 'Enjoy your treat!',
        icon: '🍫',
        sound: 'win'
    },
    sweet: {
        text: 'Sweet Treat!',
        subtitle: 'Yummy reward!',
        icon: '🍭',
        sound: 'win'
    },
    lose: {
        text: 'Better Luck Next Time!',
        subtitle: 'Try again soon!',
        icon: '😅',
        sound: 'lose'
    }
};

// Weighted probabilities (must sum to 100)
const PRIZE_WEIGHTS = {
    chocolate: 10,  // 10% chance
    sweet: 30,      // 30% chance
    lose: 60        // 60% chance
};

// Game state management
class ScratchCardGame {
    constructor() {
        this.canvas = document.getElementById('scratch-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isScratching = false;
        this.hasStarted = false;
        this.currentPrize = null;
        this.scratchedArea = 0;
        this.totalArea = 0;
        this.startTime = null;
        this.timer = null;
        this.soundEnabled = true;
        this.results = [];
        this.keyboardMode = false;
        this.keyboardX = 200;
        this.keyboardY = 150;
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.bindEvents();
        this.drawScratchSurface();
        this.calculateTotalArea();
        this.loadResults();
        // Auto-start the game since there's no start button
        this.autoStartGame();
    }
    
    // Auto-start game functionality to replace manual start button
    autoStartGame() {
        this.hasStarted = true;
        document.querySelector('.scratch-instruction').style.display = 'flex';
        document.getElementById('result-layer').style.pointerEvents = 'none';
    }
    
    // Canvas setup and scratch surface drawing
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = 400;
        this.canvas.height = 300;
        
        // Prevent context menu on right click
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    drawScratchSurface() {
        // Create metallic scratch surface with sparkles
        const gradient = this.ctx.createLinearGradient(0, 0, 400, 300);
        gradient.addColorStop(0, '#C0C0C0');
        gradient.addColorStop(0.5, '#E5E5E5');
        gradient.addColorStop(1, '#A8A8A8');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, 400, 300);
        
        // Add sparkle effect
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 400;
            const y = Math.random() * 300;
            const size = Math.random() * 3 + 1;
            this.ctx.fillRect(x, y, size, size);
        }
        
        // Add glossy overlay
        const glossGradient = this.ctx.createLinearGradient(0, 0, 0, 300);
        glossGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        glossGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)');
        glossGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.1)');
        glossGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
        
        this.ctx.fillStyle = glossGradient;
        this.ctx.fillRect(0, 0, 400, 300);
    }
    
    // Calculate total scratchable area for percentage calculation
    calculateTotalArea() {
        this.totalArea = 400 * 300; // Canvas dimensions
    }
    
    // Event binding for mouse, touch, and keyboard interactions
    bindEvents() {
        // Mouse events
        this.canvas.addEventListener('mousedown', this.startScratch.bind(this));
        this.canvas.addEventListener('mousemove', this.scratch.bind(this));
        this.canvas.addEventListener('mouseup', this.stopScratch.bind(this));
        this.canvas.addEventListener('mouseleave', this.stopScratch.bind(this));
        
        // Touch events
        this.canvas.addEventListener('touchstart', this.handleTouch.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouch.bind(this));
        this.canvas.addEventListener('touchend', this.stopScratch.bind(this));
        
        // Keyboard events for accessibility
        this.canvas.addEventListener('keydown', this.handleKeyboard.bind(this));
        this.canvas.addEventListener('focus', () => this.keyboardMode = true);
        this.canvas.addEventListener('blur', () => this.keyboardMode = false);
        
        // Button events - Removed start-btn and reset-btn event listeners
        document.getElementById('sound-toggle').addEventListener('click', this.toggleSound.bind(this));
        document.getElementById('contrast-toggle').addEventListener('click', this.toggleContrast.bind(this));
        document.getElementById('config-btn').addEventListener('click', this.showConfig.bind(this));
        document.getElementById('close-config').addEventListener('click', this.hideConfig.bind(this));
        
        // Tooltip events
        this.setupTooltips();
    }
    
    // Touch event handler with proper coordinate conversion
    handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0] || e.changedTouches[0];
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const mouseEvent = new MouseEvent(e.type.replace('touch', 'mouse'), {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        
        if (e.type === 'touchstart') this.startScratch(mouseEvent);
        else if (e.type === 'touchmove') this.scratch(mouseEvent);
    }
    
    // Keyboard accessibility for scratching simulation
    handleKeyboard(e) {
        if (!this.keyboardMode) return;
        
        const step = 10;
        let moved = false;
        
        switch(e.key) {
            case 'ArrowUp':
                this.keyboardY = Math.max(0, this.keyboardY - step);
                moved = true;
                break;
            case 'ArrowDown':
                this.keyboardY = Math.min(300, this.keyboardY + step);
                moved = true;
                break;
            case 'ArrowLeft':
                this.keyboardX = Math.max(0, this.keyboardX - step);
                moved = true;
                break;
            case 'ArrowRight':
                this.keyboardX = Math.min(400, this.keyboardX + step);
                moved = true;
                break;
            case ' ':
                e.preventDefault();
                this.scratchAtPosition(this.keyboardX, this.keyboardY);
                return;
        }
        
        if (moved) {
            e.preventDefault();
            // Visual indicator for keyboard position
            this.showKeyboardCursor();
        }
    }
    
    showKeyboardCursor() {
        // Temporarily show cursor position for keyboard users
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: absolute;
            left: ${this.keyboardX}px;
            top: ${this.keyboardY}px;
            width: 4px;
            height: 4px;
            background: red;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
        `;
        this.canvas.parentElement.appendChild(indicator);
        setTimeout(() => indicator.remove(), 500);
    }
    
    // Start scratching - initialize prize and timer
    startScratch(e) {
        if (!this.hasStarted) return;
        
        this.isScratching = true;
        
        // Choose prize only on first scratch to prevent peeking
        if (!this.currentPrize) {
            this.currentPrize = this.selectRandomPrize();
            this.updateResultLayer();
            this.startTimer();
        }
        
        this.scratch(e);
        this.playSound('scratch');
    }
    
    // Main scratching logic with smooth brush strokes
    scratch(e) {
        if (!this.isScratching || !this.hasStarted) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        this.scratchAtPosition(x, y);
    }
    
    // Perform scratch at specific position with particle effects
    scratchAtPosition(x, y) {
        // Set up eraser brush
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 35, 0, 2 * Math.PI); // 35px brush size
        this.ctx.fill();
        
        // Add particle flecks
        this.createParticleFlecks(x, y);
        
        // Update scratched area calculation
        this.updateScratchedArea();
        
        // Reset composite operation
        this.ctx.globalCompositeOperation = 'source-over';
    }
    
    // Create particle fleck trail effect
    createParticleFlecks(x, y) {
        for (let i = 0; i < 3; i++) {
            const fleck = document.createElement('div');
            fleck.style.cssText = `
                position: absolute;
                left: ${x + Math.random() * 20 - 10}px;
                top: ${y + Math.random() * 20 - 10}px;
                width: 2px;
                height: 2px;
                background: #C0C0C0;
                pointer-events: none;
                z-index: 5;
                animation: fleckFall 0.5s ease-out forwards;
            `;
            this.canvas.parentElement.appendChild(fleck);
            setTimeout(() => fleck.remove(), 500);
        }
    }
    
    stopScratch() {
        this.isScratching = false;
    }
    
    // Weighted random prize selection ensuring correct probabilities
    selectRandomPrize() {
        const random = Math.random() * 100;
        let cumulative = 0;
        
        for (const [prize, weight] of Object.entries(PRIZE_WEIGHTS)) {
            cumulative += weight;
            if (random <= cumulative) {
                return prize;
            }
        }
        
        return 'lose'; // Fallback
    }
    
    // Update result layer with selected prize
    updateResultLayer() {
        const resultLayer = document.getElementById('result-layer');
        const prize = PRIZES[this.currentPrize];
        
        resultLayer.querySelector('.prize-icon').textContent = prize.icon;
        resultLayer.querySelector('.prize-text').textContent = prize.text;
        resultLayer.querySelector('.prize-subtitle').textContent = prize.subtitle;
        
        // Set background color based on prize
        if (this.currentPrize === 'lose') {
            resultLayer.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
        } else {
            resultLayer.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        }
    }
    
    // Calculate percentage of area scratched for auto-reveal
    updateScratchedArea() {
        const imageData = this.ctx.getImageData(0, 0, 400, 300);
        const pixels = imageData.data;
        let transparentPixels = 0;
        
        // Count transparent pixels (alpha = 0)
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) {
                transparentPixels++;
            }
        }
        
        this.scratchedArea = (transparentPixels / (pixels.length / 4)) * 100;
        this.updateProgressRing();
        
        // Auto-reveal at 70% scratched
        if (this.scratchedArea >= 70 && this.currentPrize) {
            this.revealPrize();
        }
        
        // Enable pointer events on result layer at 40% scratched
        if (this.scratchedArea >= 40) {
            document.getElementById('result-layer').style.pointerEvents = 'auto';
        }
    }
    
    // Update progress ring visual indicator
    updateProgressRing() {
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.querySelector('.progress-text');
        const circumference = 2 * Math.PI * 25; // radius = 25
        const offset = circumference - (this.scratchedArea / 100) * circumference;
        
        progressBar.style.strokeDashoffset = offset;
        progressText.textContent = Math.round(this.scratchedArea) + '%';
    }
    
    // Reveal prize with animations and sound effects
    revealPrize() {
        this.stopTimer();
        
        // Clear canvas to fully reveal
        this.ctx.clearRect(0, 0, 400, 300);
        
        // Play appropriate sound and show effects
        if (this.currentPrize !== 'lose') {
            this.playSound('win');
            this.showConfetti();
            this.animateCardFlip();
        } else {
            this.playSound('lose');
            this.shakeCard();
        }
        
        // Save result
        this.saveResult();
        
        // Auto-reset for next game after delay - replaces manual reset functionality
        setTimeout(() => {
            this.autoResetCard();
        }, 3000);
    }
    
    // Auto-reset functionality to replace manual reset button
    autoResetCard() {
        this.hasStarted = true;
        this.currentPrize = null;
        this.scratchedArea = 0;
        this.stopTimer();
        this.drawScratchSurface();
        this.updateProgressRing();
        document.getElementById('timer').textContent = '0.0s';
        document.querySelector('.scratch-instruction').style.display = 'flex';
        document.getElementById('result-layer').style.pointerEvents = 'none';
    }
    
    // Confetti animation for wins
    showConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                container.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    }
    
    // Card flip animation for wins
    animateCardFlip() {
        const card = document.querySelector('.scratch-card');
        card.style.animation = 'cardFlip 1s ease-in-out';
        setTimeout(() => {
            card.style.animation = '';
        }, 1000);
    }
    
    // Shake animation for losses
    shakeCard() {
        const card = document.querySelector('.scratch-card');
        card.style.animation = 'cardShake 0.5s ease-in-out';
        setTimeout(() => {
            card.style.animation = '';
        }, 500);
    }
    
    // Timer management
    startTimer() {
        this.startTime = Date.now();
        this.timer = setInterval(() => {
            const elapsed = (Date.now() - this.startTime) / 1000;
            document.getElementById('timer').textContent = elapsed.toFixed(1) + 's';
        }, 100);
    }
    
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    // Sound effects management
    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Create audio context for sound synthesis
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (type === 'scratch') {
            // Short scratch sound
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200 + Math.random() * 100, audioContext.currentTime);
            oscillator.type = 'sawtooth';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } else if (type === 'win') {
            // Success sound
            this.playTone(audioContext, 523.25, 0.2); // C5
            setTimeout(() => this.playTone(audioContext, 659.25, 0.2), 100); // E5
            setTimeout(() => this.playTone(audioContext, 783.99, 0.3), 200); // G5
        } else if (type === 'lose') {
            // Sad trombone
            this.playTone(audioContext, 220, 0.3); // A3
            setTimeout(() => this.playTone(audioContext, 196, 0.3), 200); // G3
            setTimeout(() => this.playTone(audioContext, 174.61, 0.5), 400); // F3
        }
    }
    
    playTone(audioContext, frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Removed startNewGame() and resetCard() methods as they are no longer needed
    
    // Results management
    saveResult() {
        const result = {
            prize: this.currentPrize,
            time: document.getElementById('timer').textContent,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.results.unshift(result);
        if (this.results.length > 5) {
            this.results.pop();
        }
        
        this.updateResultsDisplay();
        localStorage.setItem('scratchCardResults', JSON.stringify(this.results));
    }
    
    loadResults() {
        const saved = localStorage.getItem('scratchCardResults');
        if (saved) {
            this.results = JSON.parse(saved);
            this.updateResultsDisplay();
        }
    }
    
    updateResultsDisplay() {
        const resultsList = document.getElementById('results-list');
        
        if (this.results.length === 0) {
            resultsList.innerHTML = '<div class="no-results">No games played yet</div>';
            return;
        }
        
        resultsList.innerHTML = this.results.map(result => `
            <div class="result-item">
                <span class="result-prize">${PRIZES[result.prize].icon} ${PRIZES[result.prize].text}</span>
                <div>
                    <span class="result-time">${result.time}</span><br>
                    <span class="result-time">${result.timestamp}</span>
                </div>
            </div>
        `).join('');
    }
    
    // UI control methods
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const btn = document.getElementById('sound-toggle');
        btn.textContent = this.soundEnabled ? '🔊' : '🔇';
        btn.title = this.soundEnabled ? 'Turn sound off' : 'Turn sound on';
    }
    
    toggleContrast() {
        document.body.classList.toggle('high-contrast');
        const btn = document.getElementById('contrast-toggle');
        btn.title = document.body.classList.contains('high-contrast') ? 
            'Turn off high contrast' : 'Turn on high contrast';
    }
    
    showConfig() {
        document.getElementById('config-panel').classList.add('show');
    }
    
    hideConfig() {
        document.getElementById('config-panel').classList.remove('show');
    }
    
    // Tooltip system
    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        const elementsWithTooltips = document.querySelectorAll('[title]');
        
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const title = e.target.getAttribute('title');
                if (title) {
                    tooltip.textContent = title;
                    tooltip.classList.add('show');
                    e.target.removeAttribute('title');
                    e.target.dataset.originalTitle = title;
                }
            });
            
            element.addEventListener('mousemove', (e) => {
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 30 + 'px';
            });
            
            element.addEventListener('mouseleave', (e) => {
                tooltip.classList.remove('show');
                if (e.target.dataset.originalTitle) {
                    e.target.setAttribute('title', e.target.dataset.originalTitle);
                }
            });
        });
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes cardFlip {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(180deg); }
        100% { transform: rotateY(0deg); }
    }
    
    @keyframes cardShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fleckFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(20px) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScratchCardGame();
});

// Performance optimization - debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate canvas dimensions if needed
        const game = window.scratchCardGame;
        if (game) {
            game.setupCanvas();
        }
    }, 250);
});