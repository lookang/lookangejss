// JavaScript for Chinese Coffee Culture Matching Game
// Educational game for Junior College students to learn Chinese vocabulary pairs
// Modified: Reduced speed, Chinese instructions, each word appears only once, refined coffee cups

class CoffeeCultureGame {
    constructor() {
        // Game state variables - Modified for 5 pairs and slower speed
        this.score = 0;
        this.totalPairs = 5;
        this.currentLevel = 0;
        this.gameActive = true;
        this.caughtSaucer = null;
        this.fallSpeed = 1; // Reduced from 2 to 1 for slower falling speed
        this.spawnRate = 0.01; // Reduced from 0.02 to 0.01 for less frequent spawning
        this.maxSaucers = 2;
        
        // Chinese vocabulary pairs for coffee culture learning
        this.vocabularyPairs = [
            { first: '浓郁', second: '香味', translation: 'rich aroma' },
            { first: '传统', second: '工艺', translation: 'traditional craftsmanship' },
            { first: '文化', second: '传承', translation: 'cultural heritage' },
            { first: '社交', second: '场所', translation: 'social venue' },
            { first: '多元', second: '融合', translation: 'multicultural integration' }
        ];
        
        // Track completed pairs and used words to ensure each word appears only once
        this.completedPairs = [];
        this.usedWords = []; // New: Track which second words have been used
        this.activeSaucers = [];
        
        // DOM elements
        this.gameContainer = document.getElementById('gameContainer');
        this.cupsContainer = document.getElementById('cupsContainer');
        this.saucersContainer = document.getElementById('saucersContainer');
        this.scoreDisplay = document.getElementById('score');
        this.feedbackOverlay = document.getElementById('feedbackOverlay');
        this.gameComplete = document.getElementById('gameComplete');
        this.finalScore = document.getElementById('finalScore');
        
        // Initialize game
        this.init();
    }
    
    init() {
        // Create refined coffee cups with first words of pairs
        this.createCoffeeCups();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Start game loop
        this.gameLoop();
        
        // Show Chinese instructions tooltip briefly
        this.showInstructions();
    }
    
    createCoffeeCups() {
        // Clear existing cups
        this.cupsContainer.innerHTML = '';
        
        // Create refined cups for each vocabulary pair
        this.vocabularyPairs.forEach((pair, index) => {
            const cup = document.createElement('div');
            cup.className = 'coffee-cup';
            cup.dataset.pairIndex = index;
            cup.dataset.word = pair.first;
            cup.title = `${pair.first} + ${pair.second} (${pair.translation})`;
            
            const cupText = document.createElement('div');
            cupText.className = 'cup-text';
            cupText.textContent = pair.first;
            
            cup.appendChild(cupText);
            
            // Add click handler for cup selection
            cup.addEventListener('click', (e) => this.handleCupClick(e, index));
            cup.addEventListener('touchstart', (e) => this.handleCupClick(e, index));
            
            this.cupsContainer.appendChild(cup);
        });
    }
    
    setupEventListeners() {
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        
        // Play again button
        document.getElementById('playAgainBtn').addEventListener('click', () => this.resetGame());
        
        // Game container tooltip for instructions
        this.gameContainer.addEventListener('mouseenter', () => this.showTooltip());
        this.gameContainer.addEventListener('mouseleave', () => this.hideTooltip());
        
        // Prevent context menu on touch devices
        this.gameContainer.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    gameLoop() {
        if (!this.gameActive) return;
        
        // Spawn new saucers randomly - Modified to ensure each word appears only once
        if (Math.random() < this.spawnRate && this.activeSaucers.length < this.maxSaucers) {
            this.spawnSaucer();
        }
        
        // Update saucer positions with slower speed
        this.updateSaucers();
        
        // Continue game loop
        requestAnimationFrame(() => this.gameLoop());
    }
    
    spawnSaucer() {
        // Get available pairs (not yet completed and second word not used)
        const availablePairs = this.vocabularyPairs.filter((pair, index) => 
            !this.completedPairs.includes(index) && !this.usedWords.includes(pair.second)
        );
        
        if (availablePairs.length === 0) return;
        
        // Select random available pair
        const randomPair = availablePairs[Math.floor(Math.random() * availablePairs.length)];
        const pairIndex = this.vocabularyPairs.indexOf(randomPair);
        
        // Mark this word as used to ensure it only appears once
        this.usedWords.push(randomPair.second);
        
        // Create saucer element
        const saucer = document.createElement('div');
        saucer.className = 'saucer';
        saucer.dataset.pairIndex = pairIndex;
        saucer.dataset.word = randomPair.second;
        saucer.title = `${randomPair.first} + ${randomPair.second} (${randomPair.translation})`;
        
        const saucerText = document.createElement('div');
        saucerText.className = 'saucer-text';
        saucerText.textContent = randomPair.second;
        
        saucer.appendChild(saucerText);
        
        // Position saucer at random x coordinate at top
        const maxX = this.gameContainer.offsetWidth - 60;
        saucer.style.left = Math.random() * maxX + 'px';
        saucer.style.top = '0px';
        
        // Add click/touch handlers
        saucer.addEventListener('click', (e) => this.catchSaucer(e, saucer));
        saucer.addEventListener('touchstart', (e) => this.catchSaucer(e, saucer));
        
        this.saucersContainer.appendChild(saucer);
        this.activeSaucers.push({
            element: saucer,
            pairIndex: pairIndex,
            y: 0
        });
    }
    
    updateSaucers() {
        // Update positions of all active saucers with slower speed
        this.activeSaucers = this.activeSaucers.filter(saucer => {
            saucer.y += this.fallSpeed; // Now slower (1 instead of 2)
            saucer.element.style.top = saucer.y + 'px';
            
            // Remove saucers that fall off screen and mark word as available again
            if (saucer.y > this.gameContainer.offsetHeight) {
                const word = saucer.element.dataset.word;
                this.usedWords = this.usedWords.filter(w => w !== word);
                saucer.element.remove();
                return false;
            }
            
            return true;
        });
    }
    
    catchSaucer(event, saucerElement) {
        event.preventDefault();
        event.stopPropagation();
        
        if (!this.gameActive) return;
        
        // Visual feedback for catching
        saucerElement.classList.add('caught');
        
        // Store caught saucer data
        this.caughtSaucer = {
            element: saucerElement,
            pairIndex: parseInt(saucerElement.dataset.pairIndex),
            word: saucerElement.dataset.word
        };
        
        // Remove from active saucers
        this.activeSaucers = this.activeSaucers.filter(s => s.element !== saucerElement);
        
        // Show Chinese feedback
        this.showFeedback('已接住！点击匹配的咖啡杯', 'info');
        
        // Highlight matching cup
        this.highlightMatchingCup(this.caughtSaucer.pairIndex);
    }
    
    handleCupClick(event, cupIndex) {
        event.preventDefault();
        event.stopPropagation();
        
        if (!this.gameActive || !this.caughtSaucer) return;
        
        const cup = event.currentTarget;
        
        // Check if this is the correct match
        if (this.caughtSaucer.pairIndex === cupIndex) {
            // Correct match!
            this.handleCorrectMatch(cup, cupIndex);
        } else {
            // Incorrect match - word becomes available again
            const word = this.caughtSaucer.word;
            this.usedWords = this.usedWords.filter(w => w !== word);
            this.handleIncorrectMatch(cup);
        }
        
        // Clean up caught saucer
        this.caughtSaucer.element.remove();
        this.caughtSaucer = null;
        this.clearCupHighlights();
    }
    
    handleCorrectMatch(cup, pairIndex) {
        // Update score
        this.score++;
        this.updateScoreDisplay();
        
        // Mark pair as completed
        this.completedPairs.push(pairIndex);
        
        // Visual feedback with refined cup styling
        cup.classList.add('correct');
        this.showFeedback('✓', 'feedback-correct');
        
        // Remove correct class after animation
        setTimeout(() => {
            cup.classList.remove('correct');
        }, 600);
        
        // Check for game completion
        if (this.score >= this.totalPairs) {
            setTimeout(() => this.completeGame(), 1000);
        }
    }
    
    handleIncorrectMatch(cup) {
        // Visual feedback for incorrect match with refined styling
        cup.classList.add('incorrect');
        this.showFeedback('✗', 'feedback-incorrect');
        
        // Remove incorrect class after animation
        setTimeout(() => {
            cup.classList.remove('incorrect');
        }, 600);
    }
    
    highlightMatchingCup(pairIndex) {
        // Clear existing highlights
        this.clearCupHighlights();
        
        // Highlight the matching cup
        const matchingCup = document.querySelector(`[data-pair-index="${pairIndex}"]`);
        if (matchingCup) {
            matchingCup.classList.add('highlight');
        }
    }
    
    clearCupHighlights() {
        document.querySelectorAll('.coffee-cup.highlight').forEach(cup => {
            cup.classList.remove('highlight');
        });
    }
    
    showFeedback(message, className) {
        this.feedbackOverlay.textContent = message;
        this.feedbackOverlay.className = className;
        this.feedbackOverlay.style.opacity = '1';
        
        setTimeout(() => {
            this.feedbackOverlay.style.opacity = '0';
        }, 1000);
    }
    
    updateScoreDisplay() {
        this.scoreDisplay.textContent = this.score;
    }
    
    completeGame() {
        this.gameActive = false;
        this.finalScore.textContent = this.score;
        this.gameComplete.classList.remove('hidden');
    }
    
    resetGame() {
        // Reset game state
        this.score = 0;
        this.completedPairs = [];
        this.usedWords = []; // Reset used words tracking
        this.caughtSaucer = null;
        this.gameActive = true;
        
        // Clear active saucers
        this.activeSaucers.forEach(saucer => saucer.element.remove());
        this.activeSaucers = [];
        
        // Reset UI
        this.updateScoreDisplay();
        this.gameComplete.classList.add('hidden');
        this.clearCupHighlights();
        
        // Remove any visual states from refined cups
        document.querySelectorAll('.coffee-cup').forEach(cup => {
            cup.classList.remove('correct', 'incorrect', 'highlight');
        });
        
        // Restart game loop
        this.gameLoop();
    }
    
    showInstructions() {
        const tooltip = document.getElementById('instructions');
        tooltip.classList.add('show');
        
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 3000);
    }
    
    showTooltip() {
        const tooltip = document.getElementById('instructions');
        tooltip.classList.add('show');
    }
    
    hideTooltip() {
        const tooltip = document.getElementById('instructions');
        tooltip.classList.remove('show');
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create and start the game
    const game = new CoffeeCultureGame();
    
    // Add global error handling for better user experience
    window.addEventListener('error', (e) => {
        console.error('Game error:', e.error);
    });
    
    // Prevent zoom on double tap for mobile devices
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Modified performance monitoring for slower game speed
    let frameCount = 0;
    let lastTime = performance.now();
    
    function monitorPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Adjust game speed based on performance (maintaining slower speeds)
            if (fps < 30 && game.fallSpeed > 0.5) {
                game.fallSpeed = Math.max(0.5, game.fallSpeed - 0.25);
                game.spawnRate = Math.max(0.005, game.spawnRate - 0.002);
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(monitorPerformance);
    }
    
    monitorPerformance();
});