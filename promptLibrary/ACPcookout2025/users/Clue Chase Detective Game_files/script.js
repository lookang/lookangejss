// Game state and configuration
class ClueChaseGame {
    constructor() {
        // Game configuration
        this.config = {
            detectiveSpeed: 8,
            cardFallSpeed: 2,
            cardSpawnRate: 2000, // milliseconds
            levelUpScore: 100,
            maxLives: 3,
            powerUpThresholds: {
                slowTime: 5,
                doublePoints: 10
            }
        };

        // Game state
        this.gameState = {
            isPlaying: false,
            isPaused: false,
            score: 0,
            lives: this.config.maxLives,
            level: 1,
            streak: 0,
            mode: 'definition-to-word', // 'definition-to-word' or 'word-to-definition'
            powerUps: {
                slowTime: false,
                doublePoints: false
            },
            currentPrompt: null,
            correctAnswer: null
        };

        // Game elements
        this.elements = {
            detective: document.getElementById('detective'),
            gameArea: document.getElementById('gameArea'),
            fallingCards: document.getElementById('fallingCards'),
            currentPrompt: document.getElementById('currentPrompt'),
            modeIndicator: document.getElementById('modeIndicator'),
            score: document.getElementById('score'),
            lives: document.getElementById('lives'),
            level: document.getElementById('level'),
            streak: document.getElementById('streak'),
            progressBar: document.getElementById('progressBar'),
            powerUpDisplay: document.getElementById('powerUpDisplay'),
            feedbackDisplay: document.getElementById('feedbackDisplay')
        };

        // Game timers and intervals
        this.gameLoop = null;
        this.cardSpawnTimer = null;
        this.powerUpTimers = {};

        // Detective position (percentage from left)
        this.detectivePosition = 50;

        // Active falling cards
        this.fallingCards = [];

        // TODO: Teachers can replace this vocabulary with their STELLAR Unit 1 content
        // Format: { word: "word", definition: "definition" }
        this.vocabulary = [
            { word: "thief", definition: "a person who steals things" },
            { word: "suspect", definition: "a person thought to be guilty of a crime" },
            { word: "evidence", definition: "proof that something happened" },
            { word: "witness", definition: "someone who saw what happened" },
            { word: "investigate", definition: "to find out the truth about something" },
            { word: "clue", definition: "a piece of information that helps solve a mystery" },
            { word: "detective", definition: "a person who solves crimes" },
            { word: "mystery", definition: "something that is difficult to understand" },
            { word: "crime", definition: "an illegal act" },
            { word: "guilty", definition: "having done something wrong" },
            { word: "innocent", definition: "not guilty of a crime" },
            { word: "arrest", definition: "to catch and hold someone who broke the law" },
            { word: "fingerprint", definition: "a mark left by a finger that can identify a person" },
            { word: "alibi", definition: "proof that someone was somewhere else when a crime happened" },
            { word: "burglar", definition: "someone who breaks into buildings to steal" }
        ];

        // Initialize the game
        this.init();
    }

    // Initialize game elements and event listeners
    init() {
        this.setupEventListeners();
        this.loadLeaderboard();
        this.loadVocabulary();
        this.updateDisplay();
        this.showInstructions();
    }

    // Set up all event listeners for game controls
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        document.addEventListener('keyup', (e) => this.handleKeyRelease(e));

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
        document.getElementById('leftBtn').addEventListener('mousedown', () => this.moveDetective('left'));
        document.getElementById('rightBtn').addEventListener('mousedown', () => this.moveDetective('right'));

        // Game control buttons
        document.getElementById('startBtn').addEventListener('click', () => this.toggleGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());
        document.getElementById('modeToggle').addEventListener('click', () => this.toggleMode());
        document.getElementById('leaderboardBtn').addEventListener('click', () => this.showLeaderboard());

        // Modal controls
        document.getElementById('closeHelpBtn').addEventListener('click', () => this.hideModal('helpModal'));
        document.getElementById('closeLeaderboardBtn').addEventListener('click', () => this.hideModal('leaderboardModal'));
        document.getElementById('clearLeaderboardBtn').addEventListener('click', () => this.clearLeaderboard());
        
        // Game over modal
        document.getElementById('saveScoreBtn').addEventListener('click', () => this.saveScore());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.restartGame());

        // Vocabulary management
        document.getElementById('vocabBtn').addEventListener('click', () => this.showVocabModal());
        document.getElementById('closeVocabBtn').addEventListener('click', () => this.hideModal('vocabModal'));
        document.getElementById('importBtn').addEventListener('click', () => this.importVocabulary());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportVocabulary());
        document.getElementById('addVocabBtn').addEventListener('click', () => this.addVocabulary());
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileImport(e));

        // Prevent context menu on touch devices
        document.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    // Handle keyboard input for detective movement and game controls
    handleKeyPress(e) {
        if (!this.gameState.isPlaying || this.gameState.isPaused) return;

        switch(e.key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                e.preventDefault();
                this.moveDetective('left');
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                e.preventDefault();
                this.moveDetective('right');
                break;
            case ' ':
                e.preventDefault();
                this.togglePause();
                break;
        }
    }

    // Handle key release events
    handleKeyRelease(e) {
        // Stop continuous movement if needed
    }

    // Move detective character left or right
    moveDetective(direction) {
        if (!this.gameState.isPlaying || this.gameState.isPaused) return;

        const moveAmount = direction === 'left' ? -this.config.detectiveSpeed : this.config.detectiveSpeed;
        this.detectivePosition = Math.max(5, Math.min(95, this.detectivePosition + moveAmount));
        
        this.elements.detective.style.left = `${this.detectivePosition}%`;
        
        // Check for collisions with falling cards
        this.checkCollisions();
    }

    // Toggle between game modes (Definition → Word vs Word → Definition)
    toggleMode() {
        if (this.gameState.isPlaying) return; // Can't change mode during game

        this.gameState.mode = this.gameState.mode === 'definition-to-word' ? 'word-to-definition' : 'definition-to-word';
        this.elements.modeIndicator.textContent = this.gameState.mode === 'definition-to-word' ? 'Definition → Word' : 'Word → Definition';
        
        // Show feedback
        this.showFeedback(`Mode: ${this.elements.modeIndicator.textContent}`, 'info');
    }

    // Start or stop the game
    toggleGame() {
        if (this.gameState.isPlaying) {
            this.stopGame();
        } else {
            this.startGame();
        }
    }

    // Start a new game
    startGame() {
        if (this.vocabulary.length === 0) {
            this.showFeedback('Please add vocabulary words first!', 'error');
            return;
        }

        // Reset game state
        this.gameState = {
            ...this.gameState,
            isPlaying: true,
            isPaused: false,
            score: 0,
            lives: this.config.maxLives,
            level: 1,
            streak: 0,
            powerUps: {
                slowTime: false,
                doublePoints: false
            }
        };

        // Clear existing cards
        this.clearFallingCards();
        
        // Reset detective position
        this.detectivePosition = 50;
        this.elements.detective.style.left = '50%';

        // Update UI
        this.updateDisplay();
        document.getElementById('startBtn').textContent = 'STOP GAME';
        document.getElementById('startBtn').style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';

        // Generate first prompt
        this.generateNewPrompt();

        // Start game loops
        this.startGameLoop();
        this.startCardSpawning();
    }

    // Stop the current game
    stopGame() {
        this.gameState.isPlaying = false;
        this.gameState.isPaused = false;

        // Clear timers
        if (this.gameLoop) clearInterval(this.gameLoop);
        if (this.cardSpawnTimer) clearInterval(this.cardSpawnTimer);
        Object.values(this.powerUpTimers).forEach(timer => clearTimeout(timer));
        this.powerUpTimers = {};

        // Clear cards
        this.clearFallingCards();

        // Reset UI
        document.getElementById('startBtn').textContent = 'START GAME';
        document.getElementById('startBtn').style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        this.elements.currentPrompt.textContent = 'Click Start to Begin!';
        this.elements.powerUpDisplay.style.display = 'none';
    }

    // Toggle pause state
    togglePause() {
        if (!this.gameState.isPlaying) return;

        this.gameState.isPaused = !this.gameState.isPaused;
        document.getElementById('pauseBtn').textContent = this.gameState.isPaused ? '▶️' : '⏸️';
        
        if (this.gameState.isPaused) {
            this.showFeedback('Game Paused', 'info');
        } else {
            this.hideFeedback();
        }
    }

    // Main game loop - handles card movement and collision detection
    startGameLoop() {
        this.gameLoop = setInterval(() => {
            if (this.gameState.isPaused) return;

            // Move falling cards
            this.updateFallingCards();
            
            // Check for collisions
            this.checkCollisions();
            
            // Remove cards that have fallen off screen
            this.removeOffScreenCards();

        }, 50); // 20 FPS
    }

    // Start spawning falling cards
    startCardSpawning() {
        const spawnCard = () => {
            if (!this.gameState.isPlaying || this.gameState.isPaused) return;
            
            this.spawnFallingCard();
            
            // Schedule next card spawn with some randomness
            const baseDelay = Math.max(1000, this.config.cardSpawnRate - (this.gameState.level * 100));
            const randomDelay = baseDelay + (Math.random() * 1000);
            this.cardSpawnTimer = setTimeout(spawnCard, randomDelay);
        };

        spawnCard();
    }

    // Generate a new prompt and set correct answer
    generateNewPrompt() {
        if (this.vocabulary.length === 0) return;

        const randomVocab = this.vocabulary[Math.floor(Math.random() * this.vocabulary.length)];
        
        if (this.gameState.mode === 'definition-to-word') {
            this.elements.currentPrompt.textContent = randomVocab.definition;
            this.gameState.correctAnswer = randomVocab.word;
        } else {
            this.elements.currentPrompt.textContent = randomVocab.word;
            this.gameState.correctAnswer = randomVocab.definition;
        }
    }

    // Spawn a new falling card with correct answer and distractors
    spawnFallingCard() {
        const card = document.createElement('div');
        card.className = 'falling-card';
        
        // Determine if this should be the correct answer (25% chance)
        const isCorrect = Math.random() < 0.25;
        
        if (isCorrect) {
            card.textContent = this.gameState.correctAnswer;
            card.dataset.correct = 'true';
        } else {
            // Generate distractor
            const distractors = this.generateDistractors();
            card.textContent = distractors[Math.floor(Math.random() * distractors.length)];
            card.dataset.correct = 'false';
        }

        // Position card randomly across the width
        const leftPosition = Math.random() * 80 + 10; // 10% to 90%
        card.style.left = `${leftPosition}%`;
        card.style.top = '0px';

        // Add to DOM and tracking array
        this.elements.fallingCards.appendChild(card);
        this.fallingCards.push({
            element: card,
            x: leftPosition,
            y: 0,
            isCorrect: isCorrect
        });
    }

    // Generate distractor answers for wrong options
    generateDistractors() {
        const distractors = [];
        const correctAnswer = this.gameState.correctAnswer;
        
        // Get other vocabulary items as distractors
        const otherVocab = this.vocabulary.filter(item => {
            const itemAnswer = this.gameState.mode === 'definition-to-word' ? item.word : item.definition;
            return itemAnswer !== correctAnswer;
        });

        // Add up to 3 distractors
        for (let i = 0; i < Math.min(3, otherVocab.length); i++) {
            const randomItem = otherVocab[Math.floor(Math.random() * otherVocab.length)];
            const distractor = this.gameState.mode === 'definition-to-word' ? randomItem.word : randomItem.definition;
            
            if (!distractors.includes(distractor)) {
                distractors.push(distractor);
            }
        }

        return distractors;
    }

    // Update positions of all falling cards
    updateFallingCards() {
        const fallSpeed = this.gameState.powerUps.slowTime ? this.config.cardFallSpeed * 0.5 : this.config.cardFallSpeed;
        
        this.fallingCards.forEach(card => {
            card.y += fallSpeed;
            card.element.style.top = `${card.y}px`;
        });
    }

    // Check for collisions between detective and falling cards
    checkCollisions() {
        const detectiveRect = this.elements.detective.getBoundingClientRect();
        const gameAreaRect = this.elements.gameArea.getBoundingClientRect();
        
        this.fallingCards.forEach((card, index) => {
            const cardRect = card.element.getBoundingClientRect();
            
            // Check if card is in collision range with detective
            if (this.isColliding(detectiveRect, cardRect)) {
                this.handleCardCatch(card, index);
            }
        });
    }

    // Check if two rectangles are colliding
    isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }

    // Handle when detective catches a card
    handleCardCatch(card, index) {
        const isCorrect = card.element.dataset.correct === 'true';
        
        if (isCorrect) {
            this.handleCorrectAnswer(card);
        } else {
            this.handleIncorrectAnswer(card);
        }

        // Remove card from game
        this.removeFallingCard(index);
        
        // Generate new prompt after a short delay
        setTimeout(() => {
            if (this.gameState.isPlaying) {
                this.generateNewPrompt();
            }
        }, 500);
    }

    // Handle correct answer
    handleCorrectAnswer(card) {
        // Visual feedback
        card.element.classList.add('correct');
        this.showFeedback('Correct! +' + (this.gameState.powerUps.doublePoints ? '20' : '10'), 'success');
        
        // Update score
        const points = this.gameState.powerUps.doublePoints ? 20 : 10;
        this.gameState.score += points;
        this.gameState.streak++;
        
        // Animate score
        this.elements.score.parentElement.classList.add('score-pop');
        setTimeout(() => this.elements.score.parentElement.classList.remove('score-pop'), 500);
        
        // Check for level up
        if (this.gameState.score >= this.gameState.level * this.config.levelUpScore) {
            this.levelUp();
        }
        
        // Check for power-ups
        this.checkPowerUps();
        
        this.updateDisplay();
    }

    // Handle incorrect answer
    handleIncorrectAnswer(card) {
        // Visual feedback
        card.element.classList.add('incorrect');
        this.showFeedback('Wrong! -1 Life', 'error');
        
        // Update lives and streak
        this.gameState.lives--;
        this.gameState.streak = 0;
        
        // Remove power-ups on wrong answer
        this.clearPowerUps();
        
        this.updateDisplay();
        
        // Check for game over
        if (this.gameState.lives <= 0) {
            this.gameOver();
        }
    }

    // Level up the game
    levelUp() {
        this.gameState.level++;
        this.showFeedback(`Level ${this.gameState.level}!`, 'success');
        
        // Animate level display
        this.elements.level.parentElement.classList.add('level-up');
        setTimeout(() => this.elements.level.parentElement.classList.remove('level-up'), 1000);
        
        // Update progress bar
        this.updateProgressBar();
    }

    // Check and activate power-ups based on streak
    checkPowerUps() {
        if (this.gameState.streak === this.config.powerUpThresholds.slowTime && !this.gameState.powerUps.slowTime) {
            this.activatePowerUp('slowTime', 'Slow Time Active!', 10000);
        }
        
        if (this.gameState.streak === this.config.powerUpThresholds.doublePoints && !this.gameState.powerUps.doublePoints) {
            this.activatePowerUp('doublePoints', 'Double Points Active!', 15000);
        }
    }

    // Activate a power-up
    activatePowerUp(type, message, duration) {
        this.gameState.powerUps[type] = true;
        this.showFeedback(message, 'powerup');
        
        // Show power-up indicator
        this.elements.powerUpDisplay.textContent = message;
        this.elements.powerUpDisplay.style.display = 'block';
        
        // Set timer to deactivate
        this.powerUpTimers[type] = setTimeout(() => {
            this.gameState.powerUps[type] = false;
            this.updatePowerUpDisplay();
        }, duration);
        
        this.updatePowerUpDisplay();
    }

    // Update power-up display
    updatePowerUpDisplay() {
        const activePowerUps = Object.keys(this.gameState.powerUps).filter(key => this.gameState.powerUps[key]);
        
        if (activePowerUps.length === 0) {
            this.elements.powerUpDisplay.style.display = 'none';
        } else {
            const powerUpNames = {
                slowTime: 'Slow Time',
                doublePoints: 'Double Points'
            };
            this.elements.powerUpDisplay.textContent = activePowerUps.map(p => powerUpNames[p]).join(' + ');
        }
    }

    // Clear all active power-ups
    clearPowerUps() {
        Object.keys(this.gameState.powerUps).forEach(key => {
            this.gameState.powerUps[key] = false;
            if (this.powerUpTimers[key]) {
                clearTimeout(this.powerUpTimers[key]);
                delete this.powerUpTimers[key];
            }
        });
        this.updatePowerUpDisplay();
    }

    // Remove cards that have fallen off screen
    removeOffScreenCards() {
        const gameAreaHeight = this.elements.gameArea.offsetHeight;
        
        this.fallingCards = this.fallingCards.filter((card, index) => {
            if (card.y > gameAreaHeight) {
                card.element.remove();
                return false;
            }
            return true;
        });
    }

    // Remove a specific falling card
    removeFallingCard(index) {
        if (this.fallingCards[index]) {
            this.fallingCards[index].element.remove();
            this.fallingCards.splice(index, 1);
        }
    }

    // Clear all falling cards
    clearFallingCards() {
        this.fallingCards.forEach(card => card.element.remove());
        this.fallingCards = [];
    }

    // Update progress bar based on current level progress
    updateProgressBar() {
        const currentLevelScore = this.gameState.score % this.config.levelUpScore;
        const progress = (currentLevelScore / this.config.levelUpScore) * 100;
        this.elements.progressBar.style.width = `${progress}%`;
    }

    // Update all display elements
    updateDisplay() {
        this.elements.score.textContent = this.gameState.score;
        this.elements.lives.textContent = this.gameState.lives;
        this.elements.level.textContent = this.gameState.level;
        this.elements.streak.textContent = this.gameState.streak;
        this.updateProgressBar();
    }

    // Show feedback message to player
    showFeedback(message, type = 'info') {
        this.elements.feedbackDisplay.textContent = message;
        this.elements.feedbackDisplay.className = '';
        
        // Add type-specific styling
        if (type === 'success') {
            this.elements.feedbackDisplay.style.background = 'rgba(46, 204, 113, 0.9)';
        } else if (type === 'error') {
            this.elements.feedbackDisplay.style.background = 'rgba(231, 76, 60, 0.9)';
        } else if (type === 'powerup') {
            this.elements.feedbackDisplay.style.background = 'rgba(155, 89, 182, 0.9)';
        } else {
            this.elements.feedbackDisplay.style.background = 'rgba(52, 152, 219, 0.9)';
        }
        
        this.elements.feedbackDisplay.classList.remove('hidden');
        
        // Auto-hide after 2 seconds
        setTimeout(() => this.hideFeedback(), 2000);
    }

    // Hide feedback display
    hideFeedback() {
        this.elements.feedbackDisplay.classList.add('hidden');
    }

    // Handle game over
    gameOver() {
        this.stopGame();
        
        // Show game over screen
        document.getElementById('finalScore').textContent = this.gameState.score;
        document.getElementById('finalLevel').textContent = this.gameState.level;
        document.getElementById('playerInitials').value = '';
        this.showModal('gameOverScreen');
    }

    // Save player score to leaderboard
    saveScore() {
        const initials = document.getElementById('playerInitials').value.trim().toUpperCase();
        
        if (initials.length !== 3) {
            alert('Please enter exactly 3 initials');
            return;
        }
        
        // Get existing leaderboard
        let leaderboard = JSON.parse(localStorage.getItem('clueChaseLeaderboard') || '[]');
        
        // Add new score
        leaderboard.push({
            initials: initials,
            score: this.gameState.score,
            level: this.gameState.level,
            date: new Date().toLocaleDateString()
        });
        
        // Sort by score (descending) and keep top 10
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10);
        
        // Save to localStorage
        localStorage.setItem('clueChaseLeaderboard', JSON.stringify(leaderboard));
        
        this.hideModal('gameOverScreen');
        this.showLeaderboard();
    }

    // Restart the game
    restartGame() {
        this.hideModal('gameOverScreen');
        this.startGame();
    }

    // Show help modal
    showHelp() {
        this.showModal('helpModal');
    }

    // Show leaderboard modal
    showLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('clueChaseLeaderboard') || '[]');
        const leaderboardList = document.getElementById('leaderboardList');
        
        if (leaderboard.length === 0) {
            leaderboardList.innerHTML = '<p>No scores yet. Be the first to play!</p>';
        } else {
            leaderboardList.innerHTML = leaderboard.map((entry, index) => `
                <div class="leaderboard-entry ${index === 0 ? 'top-score' : ''}">
                    <span>${index + 1}. ${entry.initials}</span>
                    <span>Level ${entry.level} - ${entry.score} pts</span>
                </div>
            `).join('');
        }
        
        this.showModal('leaderboardModal');
    }

    // Clear leaderboard
    clearLeaderboard() {
        if (confirm('Are you sure you want to clear all scores?')) {
            localStorage.removeItem('clueChaseLeaderboard');
            this.showLeaderboard(); // Refresh display
        }
    }

    // Load leaderboard from localStorage
    loadLeaderboard() {
        // Leaderboard is loaded when needed in showLeaderboard()
    }

    // Show vocabulary management modal
    showVocabModal() {
        this.updateVocabDisplay();
        this.showModal('vocabModal');
    }

    // Update vocabulary display in modal
    updateVocabDisplay() {
        const vocabList = document.getElementById('vocabList');
        
        if (this.vocabulary.length === 0) {
            vocabList.innerHTML = '<p>No vocabulary words added yet.</p>';
        } else {
            vocabList.innerHTML = this.vocabulary.map((item, index) => `
                <div class="vocab-item">
                    <div>
                        <strong>${item.word}</strong>: ${item.definition}
                    </div>
                    <button onclick="game.removeVocab(${index})">Delete</button>
                </div>
            `).join('');
        }
    }

    // Add new vocabulary item
    addVocabulary() {
        const word = document.getElementById('newWord').value.trim();
        const definition = document.getElementById('newDefinition').value.trim();
        
        if (!word || !definition) {
            alert('Please enter both word and definition');
            return;
        }
        
        // Check for duplicates
        if (this.vocabulary.some(item => item.word.toLowerCase() === word.toLowerCase())) {
            alert('This word already exists');
            return;
        }
        
        this.vocabulary.push({ word, definition });
        this.saveVocabulary();
        this.updateVocabDisplay();
        
        // Clear inputs
        document.getElementById('newWord').value = '';
        document.getElementById('newDefinition').value = '';
    }

    // Remove vocabulary item
    removeVocab(index) {
        if (confirm('Are you sure you want to delete this vocabulary item?')) {
            this.vocabulary.splice(index, 1);
            this.saveVocabulary();
            this.updateVocabDisplay();
        }
    }

    // Import vocabulary from JSON file
    importVocabulary() {
        document.getElementById('fileInput').click();
    }

    // Handle file import
    handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedVocab = JSON.parse(e.target.result);
                
                // Validate format
                if (!Array.isArray(importedVocab) || 
                    !importedVocab.every(item => item.word && item.definition)) {
                    throw new Error('Invalid format');
                }
                
                this.vocabulary = importedVocab;
                this.saveVocabulary();
                this.updateVocabDisplay();
                alert('Vocabulary imported successfully!');
                
            } catch (error) {
                alert('Error importing file. Please check the format.');
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    }

    // Export vocabulary to JSON file
    exportVocabulary() {
        if (this.vocabulary.length === 0) {
            alert('No vocabulary to export');
            return;
        }
        
        const dataStr = JSON.stringify(this.vocabulary, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'clue-chase-vocabulary.json';
        link.click();
    }

    // Save vocabulary to localStorage
    saveVocabulary() {
        localStorage.setItem('clueChaseVocabulary', JSON.stringify(this.vocabulary));
    }

    // Load vocabulary from localStorage
    loadVocabulary() {
        const saved = localStorage.getItem('clueChaseVocabulary');
        if (saved) {
            try {
                this.vocabulary = JSON.parse(saved);
            } catch (error) {
                console.error('Error loading vocabulary:', error);
            }
        }
    }

    // Show modal
    showModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
    }

    // Hide modal
    hideModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }

    // Show initial instructions
    showInstructions() {
        setTimeout(() => {
            this.showFeedback('Welcome to Clue Chase! Click the ? button for instructions.', 'info');
        }, 1000);
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global game instance
    window.game = new ClueChaseGame();
    
    // Prevent scrolling on mobile
    document.addEventListener('touchmove', (e) => {
        if (e.target.closest('#gameContainer')) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Handle window resize for responsive design
    window.addEventListener('resize', () => {
        // Adjust game area if needed
        if (window.game && window.game.gameState.isPlaying) {
            // Recalculate positions if necessary
        }
    });
});