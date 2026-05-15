// Clue Chase Detective Vocabulary Game
// Educational game for Primary 6 students based on STELLAR Unit 1: Stop Thief!

class ClueChaseGame {
    constructor() {
        // Game state variables
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameRunning = false;
        this.gamePaused = false;
        this.currentPrompt = '';
        this.currentAnswer = '';
        this.mode = 'definition-to-word'; // or 'word-to-definition'
        this.streak = 0;
        this.cardsPerLevel = 10;
        this.cardsCaught = 0;
        
        // Game mechanics
        this.cardSpeed = 2;
        this.cardSpawnRate = 2000; // milliseconds
        this.detectivePosition = 50; // percentage from left
        this.detectiveSpeed = 5;
        
        // Vocabulary data from STELLAR Unit 1: Stop Thief!
        this.vocabulary = [
            { word: 'THIEF', definition: 'A person who steals things' },
            { word: 'STEAL', definition: 'To take something without permission' },
            { word: 'CRIME', definition: 'An illegal act' },
            { word: 'DETECTIVE', definition: 'A person who investigates crimes' },
            { word: 'EVIDENCE', definition: 'Proof that helps solve a case' },
            { word: 'SUSPECT', definition: 'A person believed to have committed a crime' },
            { word: 'WITNESS', definition: 'A person who saw what happened' },
            { word: 'INVESTIGATE', definition: 'To examine carefully to find the truth' },
            { word: 'CLUE', definition: 'A piece of information that helps solve a mystery' },
            { word: 'MYSTERY', definition: 'Something that is difficult to understand' },
            { word: 'BURGLAR', definition: 'A person who breaks into buildings to steal' },
            { word: 'ROBBERY', definition: 'The act of stealing from someone' },
            { word: 'FINGERPRINT', definition: 'A mark left by a finger that can identify someone' },
            { word: 'ALIBI', definition: 'Proof that someone was somewhere else during a crime' },
            { word: 'ARREST', definition: 'To catch and hold someone who broke the law' }
        ];
        
        // DOM elements
        this.gameContainer = document.getElementById('gameContainer');
        this.detective = document.getElementById('detective');
        this.cardsContainer = document.getElementById('cardsContainer');
        this.promptText = document.getElementById('promptText');
        this.scoreDisplay = document.getElementById('score');
        this.livesDisplay = document.getElementById('lives');
        this.levelDisplay = document.getElementById('level');
        this.progressBar = document.getElementById('progressBar');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.pauseScreen = document.getElementById('pauseScreen');
        this.levelUpAnimation = document.getElementById('levelUpAnimation');
        this.effectsContainer = document.getElementById('effectsContainer');
        this.tooltip = document.getElementById('tooltip');
        
        // Game timers
        this.gameLoop = null;
        this.cardSpawnTimer = null;
        this.fallingCards = [];
        
        // Leaderboard
        this.leaderboard = this.loadLeaderboard();
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateDisplay();
        this.showTooltipOnHover();
        this.startGame();
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning || this.gamePaused) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.moveDetective('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.moveDetective('right');
                    break;
                case ' ':
                    e.preventDefault();
                    this.togglePause();
                    break;
            }
        });
        
        // Touch controls
        document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.moveDetective('left');
        });
        
        document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.moveDetective('right');
        });
        
        // Mouse controls for desktop
        document.getElementById('leftBtn').addEventListener('mousedown', () => {
            this.moveDetective('left');
        });
        
        document.getElementById('rightBtn').addEventListener('mousedown', () => {
            this.moveDetective('right');
        });
        
        // Button controls
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.togglePause();
        });
        
        document.getElementById('modeToggle').addEventListener('click', () => {
            this.toggleMode();
        });
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartGame();
        });
        
        document.getElementById('resumeBtn').addEventListener('click', () => {
            this.togglePause();
        });
        
        document.getElementById('restartFromPauseBtn').addEventListener('click', () => {
            this.restartGame();
        });
        
        // Prevent context menu on long press
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
    
    showTooltipOnHover() {
        // Add tooltip functionality for elements with title attributes
        const elementsWithTooltips = document.querySelectorAll('[title]');
        
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const title = e.target.getAttribute('title');
                if (title) {
                    this.showTooltip(e.pageX, e.pageY, title);
                    e.target.removeAttribute('title'); // Prevent default tooltip
                    e.target.setAttribute('data-original-title', title);
                }
            });
            
            element.addEventListener('mouseleave', (e) => {
                this.hideTooltip();
                const originalTitle = e.target.getAttribute('data-original-title');
                if (originalTitle) {
                    e.target.setAttribute('title', originalTitle);
                }
            });
        });
    }
    
    showTooltip(x, y, text) {
        this.tooltip.textContent = text;
        this.tooltip.style.left = Math.min(x, window.innerWidth - 220) + 'px';
        this.tooltip.style.top = (y - 40) + 'px';
        this.tooltip.classList.remove('hidden');
    }
    
    hideTooltip() {
        this.tooltip.classList.add('hidden');
    }
    
    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        this.generateNewPrompt();
        this.startCardSpawning();
        this.startGameLoop();
        this.updateDisplay();
    }
    
    togglePause() {
        this.gamePaused = !this.gamePaused;
        
        if (this.gamePaused) {
            this.pauseScreen.classList.remove('hidden');
            clearInterval(this.cardSpawnTimer);
        } else {
            this.pauseScreen.classList.add('hidden');
            this.startCardSpawning();
        }
    }
    
    toggleMode() {
        this.mode = this.mode === 'definition-to-word' ? 'word-to-definition' : 'definition-to-word';
        const modeToggle = document.getElementById('modeToggle');
        modeToggle.textContent = this.mode === 'definition-to-word' ? 'Mode: D→W' : 'Mode: W→D';
        this.generateNewPrompt();
    }
    
    moveDetective(direction) {
        const moveAmount = this.detectiveSpeed;
        
        if (direction === 'left') {
            this.detectivePosition = Math.max(5, this.detectivePosition - moveAmount);
        } else {
            this.detectivePosition = Math.min(95, this.detectivePosition + moveAmount);
        }
        
        this.detective.style.left = this.detectivePosition + '%';
    }
    
    generateNewPrompt() {
        const randomVocab = this.vocabulary[Math.floor(Math.random() * this.vocabulary.length)];
        
        if (this.mode === 'definition-to-word') {
            this.currentPrompt = randomVocab.definition;
            this.currentAnswer = randomVocab.word;
            this.promptText.textContent = `Find the word: ${this.currentPrompt}`;
        } else {
            this.currentPrompt = randomVocab.word;
            this.currentAnswer = randomVocab.definition;
            this.promptText.textContent = `Find the definition: ${this.currentPrompt}`;
        }
    }
    
    startCardSpawning() {
        clearInterval(this.cardSpawnTimer);
        
        this.cardSpawnTimer = setInterval(() => {
            if (!this.gamePaused && this.gameRunning) {
                this.spawnCard();
            }
        }, Math.max(800, this.cardSpawnRate - (this.level * 100)));
    }
    
    spawnCard() {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Determine if this should be the correct answer or a distractor
        const isCorrect = Math.random() < 0.3; // 30% chance for correct answer
        
        if (isCorrect) {
            card.textContent = this.currentAnswer;
            card.classList.add('correct');
        } else {
            // Generate distractor
            const distractors = this.vocabulary.filter(v => 
                (this.mode === 'definition-to-word' ? v.word : v.definition) !== this.currentAnswer
            );
            const randomDistractor = distractors[Math.floor(Math.random() * distractors.length)];
            card.textContent = this.mode === 'definition-to-word' ? randomDistractor.word : randomDistractor.definition;
            card.classList.add('incorrect');
        }
        
        // Position card randomly at top
        const leftPosition = Math.random() * 80 + 10; // 10% to 90% from left
        card.style.left = leftPosition + '%';
        card.style.top = '-100px';
        
        // Add to containers
        this.cardsContainer.appendChild(card);
        this.fallingCards.push({
            element: card,
            x: leftPosition,
            y: -100,
            isCorrect: isCorrect
        });
        
        // Animate card falling
        this.animateCardFall(card);
    }
    
    animateCardFall(cardElement) {
        const fallDuration = Math.max(2000, 4000 - (this.level * 200)); // Faster at higher levels
        
        // Compute dynamic fall distance so cards reliably reach the detective
        const gameArea = document.getElementById('gameArea');
        const gameAreaRect = gameArea.getBoundingClientRect();
        const detectiveRect = this.detective.getBoundingClientRect();
        // Detective Y relative to gameArea top
        const detectiveTopRelative = detectiveRect.top - gameAreaRect.top;
        // Ensure the card passes the detective by a margin so collision can occur
        const fallDistance = Math.max(detectiveTopRelative + 120, gameArea.clientHeight + 60);
        // Set CSS variable for dynamic keyframes
        cardElement.style.setProperty('--fall-distance', `${fallDistance}px`);
        // Use dynamic animation so distance adapts to viewport/layout
        cardElement.style.animation = `cardFallDynamic ${fallDuration}ms linear forwards`;
        
        // Remove card after animation
        setTimeout(() => {
            if (cardElement.parentNode) {
                cardElement.parentNode.removeChild(cardElement);
                this.fallingCards = this.fallingCards.filter(card => card.element !== cardElement);
            }
        }, fallDuration);
    }
    
    startGameLoop() {
        this.gameLoop = setInterval(() => {
            if (!this.gamePaused && this.gameRunning) {
                this.checkCollisions();
                this.updateCardPositions();
            }
        }, 50);
    }
    
    updateCardPositions() {
        this.fallingCards.forEach(card => {
            const rect = card.element.getBoundingClientRect();
            card.y = rect.top;
        });
    }
    
    checkCollisions() {
        const detectiveRect = this.detective.getBoundingClientRect();
        
        this.fallingCards.forEach((card, index) => {
            const cardRect = card.element.getBoundingClientRect();
            
            // Check if card is at detective level and overlapping horizontally
            if (cardRect.bottom >= detectiveRect.top && 
                cardRect.top <= detectiveRect.bottom &&
                cardRect.right >= detectiveRect.left &&
                cardRect.left <= detectiveRect.right) {
                
                this.handleCardCatch(card, index);
            }
        });
    }
    
    handleCardCatch(card, index) {
        // Remove card from game
        if (card.element.parentNode) {
            card.element.parentNode.removeChild(card.element);
        }
        this.fallingCards.splice(index, 1);
        
        if (card.isCorrect) {
            this.handleCorrectCatch(card);
        } else {
            this.handleIncorrectCatch(card);
        }
    }
    
    handleCorrectCatch(card) {
        // Increase score and streak
        const points = 10 + (this.streak * 2);
        this.score += points;
        this.streak++;
        this.cardsCaught++;
        
        // Show score popup
        this.showScorePopup(card.element, `+${points}`, false);
        
        // Play success sound (visual feedback)
        this.detective.style.transform = 'translateX(-50%) scale(1.2)';
        setTimeout(() => {
            this.detective.style.transform = 'translateX(-50%) scale(1)';
        }, 200);
        
        // Generate new prompt
        this.generateNewPrompt();
        
        // Check for level up
        if (this.cardsCaught >= this.cardsPerLevel) {
            this.levelUp();
        }
        
        this.updateDisplay();
    }
    
    handleIncorrectCatch(card) {
        // Lose life and reset streak
        this.lives--;
        this.streak = 0;
        
        // Show negative score popup
        this.showScorePopup(card.element, '-1 Life', true);
        
        // Visual feedback for mistake
        this.detective.style.filter = 'drop-shadow(2px 2px 4px rgba(255, 0, 0, 0.8))';
        setTimeout(() => {
            this.detective.style.filter = 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))';
        }, 500);
        
        if (this.lives <= 0) {
            this.gameOver();
        }
        
        this.updateDisplay();
    }
    
    showScorePopup(nearElement, text, isNegative) {
        const popup = document.createElement('div');
        popup.className = 'score-popup' + (isNegative ? ' negative' : '');
        popup.textContent = text;
        
        // Position near the caught card
        const rect = nearElement.getBoundingClientRect();
        popup.style.left = rect.left + 'px';
        popup.style.top = rect.top + 'px';
        
        this.effectsContainer.appendChild(popup);
        
        // Remove popup after animation
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 1000);
    }
    
    levelUp() {
        this.level++;
        this.cardsCaught = 0;
        this.cardSpeed += 0.5;
        
        // Show level up animation
        this.showLevelUpAnimation();
        
        // Increase difficulty
        this.cardSpawnRate = Math.max(500, this.cardSpawnRate - 100);
        this.startCardSpawning();
    }
    
    showLevelUpAnimation() {
        const levelUpText = this.levelUpAnimation.querySelector('.level-up-number');
        levelUpText.textContent = `Level ${this.level}`;
        
        this.levelUpAnimation.classList.remove('hidden');
        
        setTimeout(() => {
            this.levelUpAnimation.classList.add('hidden');
        }, 2000);
    }
    
    updateDisplay() {
        this.scoreDisplay.textContent = this.score;
        this.livesDisplay.textContent = this.lives;
        this.levelDisplay.textContent = this.level;
        
        // Update progress bar
        const progress = (this.cardsCaught / this.cardsPerLevel) * 100;
        this.progressBar.style.width = progress + '%';
    }
    
    gameOver() {
        this.gameRunning = false;
        clearInterval(this.gameLoop);
        clearInterval(this.cardSpawnTimer);
        
        // Clear falling cards
        this.fallingCards.forEach(card => {
            if (card.element.parentNode) {
                card.element.parentNode.removeChild(card.element);
            }
        });
        this.fallingCards = [];
        
        // Update final score display
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLevel').textContent = this.level;
        
        // Update leaderboard
        this.updateLeaderboard();
        
        // Show game over screen
        this.gameOverScreen.classList.remove('hidden');
    }
    
    updateLeaderboard() {
        this.leaderboard.push({
            score: this.score,
            level: this.level,
            date: new Date().toLocaleDateString()
        });
        
        // Sort and keep top 5
        this.leaderboard.sort((a, b) => b.score - a.score);
        this.leaderboard = this.leaderboard.slice(0, 5);
        
        // Save to localStorage
        this.saveLeaderboard();
        
        // Display leaderboard
        this.displayLeaderboard();
    }
    
    displayLeaderboard() {
        const scoresList = document.getElementById('scoresList');
        scoresList.innerHTML = '';
        
        this.leaderboard.forEach((entry, index) => {
            const li = document.createElement('li');
            li.textContent = `${entry.score} pts (Level ${entry.level}) - ${entry.date}`;
            scoresList.appendChild(li);
        });
    }
    
    saveLeaderboard() {
        try {
            localStorage.setItem('clueChaseLeaderboard', JSON.stringify(this.leaderboard));
        } catch (e) {
            console.log('Could not save leaderboard to localStorage');
        }
    }
    
    loadLeaderboard() {
        try {
            const saved = localStorage.getItem('clueChaseLeaderboard');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }
    
    restartGame() {
        // Reset game state
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.streak = 0;
        this.cardsCaught = 0;
        this.cardSpeed = 2;
        this.cardSpawnRate = 2000;
        this.detectivePosition = 50;
        
        // Clear screens
        this.gameOverScreen.classList.add('hidden');
        this.pauseScreen.classList.add('hidden');
        
        // Reset detective position
        this.detective.style.left = '50%';
        this.detective.style.transform = 'translateX(-50%) scale(1)';
        this.detective.style.filter = 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))';
        
        // Clear any remaining cards
        this.cardsContainer.innerHTML = '';
        this.effectsContainer.innerHTML = '';
        this.fallingCards = [];
        
        // Clear timers
        clearInterval(this.gameLoop);
        clearInterval(this.cardSpawnTimer);
        
        // Start new game
        this.startGame();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ClueChaseGame();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust game container height if needed
    const gameContainer = document.getElementById('gameContainer');
    if (window.innerHeight > 500) {
        gameContainer.style.height = '90vh';
    } else {
        gameContainer.style.height = '450px';
    }
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
