// Game state management and configuration
class EquivalentFractionsGame {
    constructor() {
        // Initialize game state variables
        this.currentLevel = 1;
        this.score = 0;
        this.timeRemaining = 0;
        this.timer = null;
        this.gameActive = false;
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.totalPairs = 0;
        this.cards = [];
        
        // Level configuration with increasing difficulty
        this.levelConfig = {
            1: { pairs: 2, grid: '2x2', time: 60, gridClass: 'grid-2x2' },
            2: { pairs: 4, grid: '4x2', time: 90, gridClass: 'grid-4x2' },
            3: { pairs: 8, grid: '4x4', time: 120, gridClass: 'grid-4x4' },
            4: { pairs: 16, grid: '8x4', time: 180, gridClass: 'grid-8x4' },
            5: { pairs: 32, grid: '8x8', time: 240, gridClass: 'grid-8x8' }
        };
        
        // Initialize DOM elements and event listeners
        this.initializeElements();
        this.bindEvents();
        this.showWelcomeModal();
    }
    
    // Initialize DOM element references
    initializeElements() {
        this.elements = {
            levelNumber: document.getElementById('level-number'),
            score: document.getElementById('score'),
            timer: document.getElementById('timer'),
            gameGrid: document.getElementById('game-grid'),
            startBtn: document.getElementById('start-btn'),
            retryBtn: document.getElementById('retry-btn'),
            pauseBtn: document.getElementById('pause-btn'),
            modal: document.getElementById('game-modal'),
            modalTitle: document.getElementById('modal-title'),
            modalMessage: document.getElementById('modal-message'),
            modalBtn: document.getElementById('modal-btn'),
            tooltip: document.getElementById('tooltip')
        };
    }
    
    // Bind event listeners for user interactions
    bindEvents() {
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.retryBtn.addEventListener('click', () => this.retryLevel());
        this.elements.pauseBtn.addEventListener('click', () => this.pauseGame());
        this.elements.modalBtn.addEventListener('click', () => this.handleModalAction());
        
        // Add tooltip functionality for information displays
        this.addTooltipListeners();
    }
    
    // Add hover tooltips for game information
    addTooltipListeners() {
        const tooltipElements = [
            { element: document.querySelector('.level-display'), text: 'Current game level' },
            { element: document.querySelector('.score-display'), text: 'Points earned from matches' },
            { element: document.querySelector('.timer-display'), text: 'Time remaining in current level' }
        ];
        
        tooltipElements.forEach(({ element, text }) => {
            element.addEventListener('mouseenter', (e) => this.showTooltip(e, text));
            element.addEventListener('mouseleave', () => this.hideTooltip());
        });
    }
    
    // Show tooltip with positioning
    showTooltip(event, text) {
        const tooltip = this.elements.tooltip;
        tooltip.textContent = text;
        tooltip.classList.add('show');
        
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.bottom + 10 + 'px';
    }
    
    // Hide tooltip
    hideTooltip() {
        this.elements.tooltip.classList.remove('show');
    }
    
    // Generate equivalent fraction pairs for the game
    generateFractionPairs(numPairs) {
        const pairs = [];
        const usedFractions = new Set();
        
        // Base fractions to generate equivalents from
        const baseFractions = [
            { num: 1, den: 2 }, { num: 1, den: 3 }, { num: 1, den: 4 }, { num: 1, den: 5 },
            { num: 1, den: 6 }, { num: 2, den: 3 }, { num: 2, den: 5 }, { num: 3, den: 4 },
            { num: 3, den: 5 }, { num: 4, den: 5 }, { num: 5, den: 6 }, { num: 2, den: 7 },
            { num: 3, den: 7 }, { num: 4, den: 7 }, { num: 5, den: 7 }, { num: 6, den: 7 },
            { num: 1, den: 8 }, { num: 3, den: 8 }, { num: 5, den: 8 }, { num: 7, den: 8 },
            { num: 1, den: 9 }, { num: 2, den: 9 }, { num: 4, den: 9 }, { num: 5, den: 9 },
            { num: 7, den: 9 }, { num: 8, den: 9 }, { num: 1, den: 10 }, { num: 3, den: 10 },
            { num: 7, den: 10 }, { num: 9, den: 10 }, { num: 1, den: 12 }, { num: 5, den: 12 },
            { num: 7, den: 12 }, { num: 11, den: 12 }
        ];
        
        for (let i = 0; i < numPairs; i++) {
            let baseFraction, fraction1, fraction2;
            let attempts = 0;
            
            // Generate unique equivalent fraction pairs
            do {
                baseFraction = baseFractions[Math.floor(Math.random() * baseFractions.length)];
                
                // Generate two different equivalent fractions
                const multiplier1 = Math.floor(Math.random() * 4) + 2; // 2-5
                const multiplier2 = Math.floor(Math.random() * 4) + 2; // 2-5
                
                fraction1 = {
                    num: baseFraction.num * multiplier1,
                    den: baseFraction.den * multiplier1
                };
                
                fraction2 = {
                    num: baseFraction.num * multiplier2,
                    den: baseFraction.den * multiplier2
                };
                
                attempts++;
            } while (
                (usedFractions.has(`${fraction1.num}/${fraction1.den}`) ||
                 usedFractions.has(`${fraction2.num}/${fraction2.den}`) ||
                 (fraction1.num === fraction2.num && fraction1.den === fraction2.den) ||
                 fraction1.den > 12 || fraction2.den > 12) && attempts < 100
            );
            
            if (attempts < 100) {
                usedFractions.add(`${fraction1.num}/${fraction1.den}`);
                usedFractions.add(`${fraction2.num}/${fraction2.den}`);
                pairs.push([fraction1, fraction2]);
            }
        }
        
        return pairs;
    }
    
    // Create and shuffle cards for the game grid
    createCards() {
        const config = this.levelConfig[this.currentLevel];
        const pairs = this.generateFractionPairs(config.pairs);
        this.totalPairs = pairs.length;
        this.matchedPairs = 0;
        
        // Create card objects from fraction pairs
        const cards = [];
        pairs.forEach((pair, pairIndex) => {
            pair.forEach((fraction, fractionIndex) => {
                cards.push({
                    id: `${pairIndex}-${fractionIndex}`,
                    pairId: pairIndex,
                    fraction: fraction,
                    display: `${fraction.num}/${fraction.den}`,
                    flipped: false,
                    matched: false
                });
            });
        });
        
        // Shuffle cards using Fisher-Yates algorithm
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        
        this.cards = cards;
    }
    
    // Render cards in the game grid
    renderCards() {
        const config = this.levelConfig[this.currentLevel];
        this.elements.gameGrid.className = `game-grid ${config.gridClass}`;
        this.elements.gameGrid.innerHTML = '';
        
        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.cardId = card.id;
            cardElement.dataset.pairId = card.pairId;
            
            const fractionElement = document.createElement('div');
            fractionElement.className = 'fraction';
            fractionElement.textContent = card.display;
            
            cardElement.appendChild(fractionElement);
            cardElement.addEventListener('click', () => this.handleCardClick(card, cardElement));
            
            this.elements.gameGrid.appendChild(cardElement);
        });
    }
    
    // Handle card click interactions
    handleCardClick(card, cardElement) {
        // Prevent clicks on already flipped, matched cards or when game is inactive
        if (!this.gameActive || card.flipped || card.matched || this.flippedCards.length >= 2) {
            return;
        }
        
        // Flip the card
        card.flipped = true;
        cardElement.classList.add('flipped');
        this.flippedCards.push({ card, element: cardElement });
        
        // Play flip sound effect
        this.playSound('flip');
        
        // Check for matches when two cards are flipped
        if (this.flippedCards.length === 2) {
            setTimeout(() => this.checkMatch(), 800);
        }
    }
    
    // Check if two flipped cards match
    checkMatch() {
        const [card1, card2] = this.flippedCards;
        
        // Check if cards form an equivalent fraction pair
        if (card1.card.pairId === card2.card.pairId) {
            // Match found
            card1.card.matched = true;
            card2.card.matched = true;
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');
            
            this.matchedPairs++;
            this.score += 10 * this.currentLevel; // Higher levels give more points
            this.updateScore();
            
            this.playSound('match');
            
            // Check if level is complete
            if (this.matchedPairs === this.totalPairs) {
                setTimeout(() => this.levelComplete(), 500);
            }
        } else {
            // No match - flip cards back
            card1.element.classList.add('wrong');
            card2.element.classList.add('wrong');
            
            setTimeout(() => {
                card1.card.flipped = false;
                card2.card.flipped = false;
                card1.element.classList.remove('flipped', 'wrong');
                card2.element.classList.remove('flipped', 'wrong');
            }, 1000);
            
            this.playSound('wrong');
        }
        
        this.flippedCards = [];
    }
    
    // Start the game
    startGame() {
        this.gameActive = true;
        this.createCards();
        this.renderCards();
        this.startTimer();
        this.updateDisplay();
        
        // Update button visibility
        this.elements.startBtn.style.display = 'none';
        this.elements.retryBtn.style.display = 'inline-block';
        this.elements.pauseBtn.style.display = 'inline-block';
        
        this.hideModal();
    }
    
    // Start the countdown timer
    startTimer() {
        const config = this.levelConfig[this.currentLevel];
        this.timeRemaining = config.time;
        this.updateTimer();
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimer();
            
            // Add visual urgency as time runs out
            if (this.timeRemaining <= 10) {
                this.elements.timer.classList.add('timer-critical');
            } else if (this.timeRemaining <= 30) {
                this.elements.timer.classList.add('timer-warning');
            }
            
            // End game when time runs out
            if (this.timeRemaining <= 0) {
                this.gameOver();
            }
        }, 1000);
    }
    
    // Update timer display
    updateTimer() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        this.elements.timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Update game display elements
    updateDisplay() {
        this.elements.levelNumber.textContent = this.currentLevel;
        this.updateScore();
    }
    
    // Update score display
    updateScore() {
        this.elements.score.textContent = this.score;
    }
    
    // Handle level completion
    levelComplete() {
        this.gameActive = false;
        clearInterval(this.timer);
        
        // Bonus points for remaining time
        const timeBonus = this.timeRemaining * 2;
        this.score += timeBonus;
        this.updateScore();
        
        this.playSound('win');
        
        if (this.currentLevel < 5) {
            this.showModal('Level Complete!', 
                `Great job! You earned ${timeBonus} bonus points for remaining time. Ready for the next level?`, 
                'Next Level');
        } else {
            this.showModal('Game Complete!', 
                `Congratulations! You've mastered all levels with a final score of ${this.score} points!`, 
                'Play Again');
        }
    }
    
    // Handle game over (time ran out)
    gameOver() {
        this.gameActive = false;
        clearInterval(this.timer);
        this.playSound('timeout');
        
        this.showModal('Time\'s Up!', 
            `You ran out of time! You matched ${this.matchedPairs} out of ${this.totalPairs} pairs.`, 
            'Retry Level');
    }
    
    // Retry current level
    retryLevel() {
        this.resetLevel();
        this.startGame();
    }
    
    // Reset level state
    resetLevel() {
        clearInterval(this.timer);
        this.gameActive = false;
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.elements.timer.classList.remove('timer-warning', 'timer-critical');
    }
    
    // Pause/resume game
    pauseGame() {
        if (this.gameActive) {
            this.gameActive = false;
            clearInterval(this.timer);
            this.elements.pauseBtn.textContent = 'Resume';
            this.showModal('Game Paused', 'Click Resume to continue playing.', 'Resume');
        } else {
            this.gameActive = true;
            this.startTimer();
            this.elements.pauseBtn.textContent = 'Pause';
            this.hideModal();
        }
    }
    
    // Show modal dialog
    showModal(title, message, buttonText) {
        this.elements.modalTitle.textContent = title;
        this.elements.modalMessage.textContent = message;
        this.elements.modalBtn.textContent = buttonText;
        this.elements.modal.style.display = 'flex';
    }
    
    // Hide modal dialog
    hideModal() {
        this.elements.modal.style.display = 'none';
    }
    
    // Show welcome modal
    showWelcomeModal() {
        this.showModal('Equivalent Fractions Memory Game', 
            'Match pairs of equivalent fractions before time runs out! Click on cards to flip them and find matching pairs.', 
            'Start Game');
    }
    
    // Handle modal button actions
    handleModalAction() {
        const buttonText = this.elements.modalBtn.textContent;
        
        switch (buttonText) {
            case 'Start Game':
                this.startGame();
                break;
            case 'Next Level':
                this.currentLevel++;
                this.resetLevel();
                this.startGame();
                break;
            case 'Retry Level':
                this.retryLevel();
                break;
            case 'Play Again':
                this.currentLevel = 1;
                this.score = 0;
                this.resetLevel();
                this.startGame();
                break;
            case 'Resume':
                this.pauseGame();
                break;
        }
    }
    
    // Play sound effects (simplified for offline use)
    playSound(type) {
        // Create audio context for simple sound effects
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Generate different tones for different actions
            const frequencies = {
                flip: 800,
                match: 1200,
                wrong: 400,
                win: 1600,
                timeout: 200
            };
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequencies[type] || 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EquivalentFractionsGame();
});