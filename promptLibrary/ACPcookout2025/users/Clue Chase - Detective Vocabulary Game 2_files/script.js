// Game state and configuration
class ClueChaseGame {
    constructor() {
        // Game state
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.streak = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.currentMode = 'def-to-word'; // 'def-to-word' or 'word-to-def'
        
        // Game mechanics
        this.detectivePosition = 50; // Percentage from left
        this.fallingCards = [];
        this.currentPrompt = null;
        this.cardSpeed = 2;
        this.spawnRate = 0.02;
        this.powerUps = {
            slowMotion: { active: false, timeLeft: 0 },
            doublePoints: { active: false, timeLeft: 0 }
        };
        
        // Default vocabulary - TODO: Replace with STELLAR Unit 1 vocabulary
        this.vocabulary = [
            { word: "detective", definition: "a person who investigates crimes" },
            { word: "evidence", definition: "information that proves something" },
            { word: "suspect", definition: "a person believed to be guilty" },
            { word: "witness", definition: "someone who saw what happened" },
            { word: "investigate", definition: "to examine carefully to find facts" },
            { word: "clue", definition: "a piece of evidence that helps solve a mystery" },
            { word: "mystery", definition: "something that is difficult to understand" },
            { word: "criminal", definition: "a person who commits crimes" },
            { word: "fingerprint", definition: "a mark left by a finger" },
            { word: "alibi", definition: "proof that someone was elsewhere" }
        ];
        
        // DOM elements
        this.initializeElements();
        this.setupEventListeners();
        this.loadVocabulary();
        this.loadLeaderboard();
        
        // Start game loop
        this.gameLoop();
    }
    
    initializeElements() {
        // Game elements
        this.detective = document.getElementById('detective');
        this.gameArea = document.getElementById('gameArea');
        this.cardsContainer = document.getElementById('cardsContainer');
        this.currentPromptEl = document.getElementById('currentPrompt');
        this.scoreValueEl = document.getElementById('scoreValue');
        this.levelValueEl = document.getElementById('levelValue');
        this.livesContainer = document.getElementById('livesContainer');
        this.streakDisplay = document.getElementById('streakDisplay');
        this.progressBar = document.getElementById('progressBar');
        this.powerUpIndicator = document.getElementById('powerUpIndicator');
        
        // Control buttons
        this.pauseBtn = document.getElementById('pauseBtn');
        this.helpBtn = document.getElementById('helpBtn');
        this.modeToggle = document.getElementById('modeToggle');
        this.leaderboardBtn = document.getElementById('leaderboardBtn');
        this.leftBtn = document.getElementById('leftBtn');
        this.rightBtn = document.getElementById('rightBtn');
        
        // Modals
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.helpModal = document.getElementById('helpModal');
        this.leaderboardModal = document.getElementById('leaderboardModal');
        this.vocabModal = document.getElementById('vocabModal');
        
        // Game over elements
        this.finalScore = document.getElementById('finalScore');
        this.finalLevel = document.getElementById('finalLevel');
        this.playerInitials = document.getElementById('playerInitials');
        this.saveScoreBtn = document.getElementById('saveScoreBtn');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        
        // Vocabulary elements
        this.vocabBtn = document.getElementById('vocabBtn');
        this.vocabTextarea = document.getElementById('vocabTextarea');
        this.saveVocabBtn = document.getElementById('saveVocabBtn');
        this.importBtn = document.getElementById('importBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.fileInput = document.getElementById('fileInput');
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
        this.leftBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.moveDetective('left');
        });
        
        this.rightBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.moveDetective('right');
        });
        
        // Mouse controls for desktop
        this.leftBtn.addEventListener('mousedown', () => this.moveDetective('left'));
        this.rightBtn.addEventListener('mousedown', () => this.moveDetective('right'));
        
        // Control buttons
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.helpBtn.addEventListener('click', () => this.showModal('help'));
        this.modeToggle.addEventListener('click', () => this.toggleMode());
        this.leaderboardBtn.addEventListener('click', () => this.showLeaderboard());
        this.vocabBtn.addEventListener('click', () => this.showModal('vocab'));
        
        // Modal close buttons
        document.getElementById('closeHelp').addEventListener('click', () => this.hideModal('help'));
        document.getElementById('closeLeaderboard').addEventListener('click', () => this.hideModal('leaderboard'));
        document.getElementById('closeVocab').addEventListener('click', () => this.hideModal('vocab'));
        
        // Game over buttons
        this.saveScoreBtn.addEventListener('click', () => this.saveScore());
        this.playAgainBtn.addEventListener('click', () => this.restartGame());
        
        // Vocabulary management
        this.saveVocabBtn.addEventListener('click', () => this.saveVocabulary());
        this.importBtn.addEventListener('click', () => this.fileInput.click());
        this.exportBtn.addEventListener('click', () => this.exportVocabulary());
        this.fileInput.addEventListener('change', (e) => this.importVocabulary(e));
        
        // Leaderboard clear
        document.getElementById('clearLeaderboard').addEventListener('click', () => this.clearLeaderboard());
        
        // Start game when clicking on game area
        this.gameArea.addEventListener('click', () => {
            if (!this.gameRunning && !this.gamePaused) {
                this.startGame();
            }
        });
    }
    
    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.streak = 0;
        this.fallingCards = [];
        this.cardSpeed = 2;
        this.spawnRate = 0.02;
        
        this.updateDisplay();
        this.generateNewPrompt();
        this.hideModal('gameOver');
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        this.pauseBtn.textContent = this.gamePaused ? '▶️' : '⏸️';
        this.pauseBtn.title = this.gamePaused ? 'Resume Game' : 'Pause Game';
    }
    
    toggleMode() {
        this.currentMode = this.currentMode === 'def-to-word' ? 'word-to-def' : 'def-to-word';
        this.modeToggle.textContent = this.currentMode === 'def-to-word' ? '📚 Def→Word' : '📖 Word→Def';
        this.modeToggle.title = `Current mode: ${this.currentMode === 'def-to-word' ? 'Definition to Word' : 'Word to Definition'}`;
        
        if (this.gameRunning) {
            this.generateNewPrompt();
        }
    }
    
    moveDetective(direction) {
        const step = 8; // Movement step size
        
        if (direction === 'left') {
            this.detectivePosition = Math.max(10, this.detectivePosition - step);
        } else {
            this.detectivePosition = Math.min(90, this.detectivePosition + step);
        }
        
        this.detective.style.left = this.detectivePosition + '%';
    }
    
    generateNewPrompt() {
        if (this.vocabulary.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * this.vocabulary.length);
        const vocabItem = this.vocabulary[randomIndex];
        
        this.currentPrompt = {
            question: this.currentMode === 'def-to-word' ? vocabItem.definition : vocabItem.word,
            answer: this.currentMode === 'def-to-word' ? vocabItem.word : vocabItem.definition,
            vocabItem: vocabItem
        };
        
        this.currentPromptEl.textContent = this.currentPrompt.question;
    }
    
    spawnCard() {
        if (!this.gameRunning || this.gamePaused || Math.random() > this.spawnRate) return;
        
        const card = document.createElement('div');
        card.className = 'falling-card';
        
        // Determine if this should be the correct answer or a distractor
        const isCorrect = Math.random() < 0.3; // 30% chance of correct answer
        
        if (isCorrect && this.currentPrompt) {
            card.textContent = this.currentPrompt.answer;
            card.dataset.correct = 'true';
        } else {
            // Generate distractor
            const distractors = this.generateDistractors();
            if (distractors.length > 0) {
                const randomDistractor = distractors[Math.floor(Math.random() * distractors.length)];
                card.textContent = randomDistractor;
                card.dataset.correct = 'false';
            } else {
                return; // Skip if no distractors available
            }
        }
        
        // Random horizontal position
        const leftPosition = Math.random() * 80 + 10; // 10% to 90%
        card.style.left = leftPosition + '%';
        
        this.cardsContainer.appendChild(card);
        this.fallingCards.push({
            element: card,
            x: leftPosition,
            y: -60,
            correct: card.dataset.correct === 'true'
        });
    }
    
    generateDistractors() {
        if (!this.currentPrompt) return [];
        
        const distractors = [];
        const currentAnswer = this.currentPrompt.answer;
        
        // Get other vocabulary items as distractors
        for (let item of this.vocabulary) {
            const potentialDistractor = this.currentMode === 'def-to-word' ? item.word : item.definition;
            if (potentialDistractor !== currentAnswer) {
                distractors.push(potentialDistractor);
            }
        }
        
        return distractors;
    }
    
    updateCards() {
        if (!this.gameRunning || this.gamePaused) return;
        
        const speed = this.powerUps.slowMotion.active ? this.cardSpeed * 0.5 : this.cardSpeed;
        
        for (let i = this.fallingCards.length - 1; i >= 0; i--) {
            const card = this.fallingCards[i];
            card.y += speed;
            card.element.style.top = card.y + 'px';
            
            // Check for collision with detective
            if (this.checkCollision(card)) {
                this.handleCardCatch(card, i);
                continue;
            }
            
            // Remove cards that have fallen off screen
            if (card.y > this.gameArea.offsetHeight) {
                if (card.correct) {
                    // Missed correct answer
                    this.handleMiss();
                }
                this.removeCard(i);
            }
        }
    }
    
    checkCollision(card) {
        const detectiveRect = this.detective.getBoundingClientRect();
        const cardRect = card.element.getBoundingClientRect();
        
        return (
            cardRect.bottom >= detectiveRect.top &&
            cardRect.top <= detectiveRect.bottom &&
            cardRect.right >= detectiveRect.left &&
            cardRect.left <= detectiveRect.right
        );
    }
    
    handleCardCatch(card, index) {
        if (card.correct) {
            // Correct answer caught
            this.handleCorrectCatch(card);
        } else {
            // Wrong answer caught
            this.handleWrongCatch(card);
        }
        
        this.removeCard(index);
        this.generateNewPrompt();
    }
    
    handleCorrectCatch(card) {
        this.streak++;
        const basePoints = 10;
        const streakBonus = Math.min(this.streak - 1, 10) * 5;
        const powerUpMultiplier = this.powerUps.doublePoints.active ? 2 : 1;
        const points = (basePoints + streakBonus) * powerUpMultiplier;
        
        this.score += points;
        
        // Visual feedback
        card.element.classList.add('correct-catch');
        this.showScoreBonus(points, card.element);
        
        // Check for power-ups
        this.checkPowerUps();
        
        // Level progression
        this.checkLevelUp();
        
        this.updateDisplay();
        this.playSound('correct');
    }
    
    handleWrongCatch(card) {
        this.streak = 0;
        this.lives--;
        
        // Visual feedback
        card.element.classList.add('wrong-catch');
        
        if (this.lives <= 0) {
            this.gameOver();
        }
        
        this.updateDisplay();
        this.playSound('wrong');
    }
    
    handleMiss() {
        this.streak = 0;
        this.lives--;
        
        if (this.lives <= 0) {
            this.gameOver();
        }
        
        this.updateDisplay();
        this.playSound('miss');
    }
    
    removeCard(index) {
        const card = this.fallingCards[index];
        if (card && card.element.parentNode) {
            card.element.parentNode.removeChild(card.element);
        }
        this.fallingCards.splice(index, 1);
    }
    
    checkPowerUps() {
        if (this.streak === 5 && !this.powerUps.slowMotion.active) {
            this.activatePowerUp('slowMotion', 5000);
        } else if (this.streak === 10 && !this.powerUps.doublePoints.active) {
            this.activatePowerUp('doublePoints', 10000);
        }
    }
    
    activatePowerUp(type, duration) {
        this.powerUps[type].active = true;
        this.powerUps[type].timeLeft = duration;
        
        const messages = {
            slowMotion: '🐌 Slow Motion!',
            doublePoints: '⭐ Double Points!'
        };
        
        this.showPowerUpIndicator(messages[type], duration);
    }
    
    showPowerUpIndicator(message, duration) {
        this.powerUpIndicator.textContent = message;
        this.powerUpIndicator.classList.add('active');
        
        setTimeout(() => {
            this.powerUpIndicator.classList.remove('active');
        }, duration);
    }
    
    updatePowerUps() {
        for (let type in this.powerUps) {
            if (this.powerUps[type].active) {
                this.powerUps[type].timeLeft -= 16; // Assuming 60fps
                if (this.powerUps[type].timeLeft <= 0) {
                    this.powerUps[type].active = false;
                }
            }
        }
    }
    
    checkLevelUp() {
        const newLevel = Math.floor(this.score / 200) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.cardSpeed += 0.5;
            this.spawnRate = Math.min(0.05, this.spawnRate + 0.005);
            
            // Level up animation
            this.levelValueEl.classList.add('level-up-animation');
            setTimeout(() => {
                this.levelValueEl.classList.remove('level-up-animation');
            }, 500);
            
            this.playSound('levelUp');
        }
    }
    
    showScoreBonus(points, element) {
        const bonus = document.createElement('div');
        bonus.className = 'score-bonus';
        bonus.textContent = '+' + points;
        
        const rect = element.getBoundingClientRect();
        const gameRect = this.gameArea.getBoundingClientRect();
        
        bonus.style.left = (rect.left - gameRect.left) + 'px';
        bonus.style.top = (rect.top - gameRect.top) + 'px';
        
        this.gameArea.appendChild(bonus);
        
        setTimeout(() => {
            if (bonus.parentNode) {
                bonus.parentNode.removeChild(bonus);
            }
        }, 1000);
    }
    
    updateDisplay() {
        this.scoreValueEl.textContent = this.score;
        this.levelValueEl.textContent = this.level;
        this.streakDisplay.textContent = `Streak: ${this.streak}`;
        
        // Update lives display
        const hearts = '❤️'.repeat(this.lives) + '🖤'.repeat(3 - this.lives);
        this.livesContainer.textContent = hearts;
        
        // Update progress bar
        const progressPercent = ((this.score % 200) / 200) * 100;
        this.progressBar.style.width = progressPercent + '%';
    }
    
    gameOver() {
        this.gameRunning = false;
        this.finalScore.textContent = this.score;
        this.finalLevel.textContent = this.level;
        this.showModal('gameOver');
        this.playSound('gameOver');
    }
    
    restartGame() {
        this.hideModal('gameOver');
        this.startGame();
    }
    
    saveScore() {
        const initials = this.playerInitials.value.trim().toUpperCase();
        if (initials.length !== 3) {
            alert('Please enter exactly 3 initials');
            return;
        }
        
        const leaderboard = this.getLeaderboard();
        leaderboard.push({
            initials: initials,
            score: this.score,
            level: this.level,
            date: new Date().toLocaleDateString()
        });
        
        // Sort by score descending
        leaderboard.sort((a, b) => b.score - a.score);
        
        // Keep only top 10
        leaderboard.splice(10);
        
        localStorage.setItem('clueChaseLeaderboard', JSON.stringify(leaderboard));
        this.playerInitials.value = '';
        this.hideModal('gameOver');
        this.showLeaderboard();
    }
    
    getLeaderboard() {
        const stored = localStorage.getItem('clueChaseLeaderboard');
        return stored ? JSON.parse(stored) : [];
    }
    
    showLeaderboard() {
        const leaderboard = this.getLeaderboard();
        const listEl = document.getElementById('leaderboardList');
        
        if (leaderboard.length === 0) {
            listEl.innerHTML = '<p>No scores yet. Be the first!</p>';
        } else {
            listEl.innerHTML = leaderboard.map((entry, index) => `
                <div class="leaderboard-entry">
                    <span>${index + 1}. ${entry.initials}</span>
                    <span>Score: ${entry.score} | Level: ${entry.level}</span>
                </div>
            `).join('');
        }
        
        this.showModal('leaderboard');
    }
    
    clearLeaderboard() {
        if (confirm('Are you sure you want to clear all scores?')) {
            localStorage.removeItem('clueChaseLeaderboard');
            this.showLeaderboard();
        }
    }
    
    loadLeaderboard() {
        // Initialize leaderboard if it doesn't exist
        if (!localStorage.getItem('clueChaseLeaderboard')) {
            localStorage.setItem('clueChaseLeaderboard', JSON.stringify([]));
        }
    }
    
    saveVocabulary() {
        try {
            const vocabText = this.vocabTextarea.value.trim();
            const vocabulary = JSON.parse(vocabText);
            
            // Validate vocabulary format
            if (!Array.isArray(vocabulary)) {
                throw new Error('Vocabulary must be an array');
            }
            
            for (let item of vocabulary) {
                if (!item.word || !item.definition) {
                    throw new Error('Each vocabulary item must have "word" and "definition" properties');
                }
            }
            
            this.vocabulary = vocabulary;
            localStorage.setItem('clueChaseVocabulary', JSON.stringify(vocabulary));
            alert('Vocabulary saved successfully!');
            this.hideModal('vocab');
            
            if (this.gameRunning) {
                this.generateNewPrompt();
            }
        } catch (error) {
            alert('Error saving vocabulary: ' + error.message);
        }
    }
    
    loadVocabulary() {
        const stored = localStorage.getItem('clueChaseVocabulary');
        if (stored) {
            try {
                this.vocabulary = JSON.parse(stored);
            } catch (error) {
                console.error('Error loading vocabulary:', error);
            }
        }
        
        // Update textarea with current vocabulary
        this.vocabTextarea.value = JSON.stringify(this.vocabulary, null, 2);
    }
    
    exportVocabulary() {
        const dataStr = JSON.stringify(this.vocabulary, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'clue-chase-vocabulary.json';
        link.click();
    }
    
    importVocabulary(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const vocabulary = JSON.parse(e.target.result);
                this.vocabTextarea.value = JSON.stringify(vocabulary, null, 2);
            } catch (error) {
                alert('Error reading file: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
    
    showModal(type) {
        const modals = {
            help: this.helpModal,
            leaderboard: this.leaderboardModal,
            vocab: this.vocabModal,
            gameOver: this.gameOverScreen
        };
        
        if (modals[type]) {
            modals[type].classList.remove('hidden');
            if (type !== 'gameOver' && this.gameRunning) {
                this.gamePaused = true;
                this.pauseBtn.textContent = '▶️';
            }
        }
    }
    
    hideModal(type) {
        const modals = {
            help: this.helpModal,
            leaderboard: this.leaderboardModal,
            vocab: this.vocabModal,
            gameOver: this.gameOverScreen
        };
        
        if (modals[type]) {
            modals[type].classList.add('hidden');
            if (type !== 'gameOver' && this.gameRunning && this.gamePaused) {
                this.gamePaused = false;
                this.pauseBtn.textContent = '⏸️';
            }
        }
    }
    
    playSound(type) {
        // Simple audio feedback using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        const frequencies = {
            correct: 523.25, // C5
            wrong: 220.00,   // A3
            miss: 196.00,    // G3
            levelUp: 659.25, // E5
            gameOver: 146.83 // D3
        };
        
        oscillator.frequency.setValueAtTime(frequencies[type] || 440, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    gameLoop() {
        if (this.gameRunning && !this.gamePaused) {
            this.spawnCard();
            this.updateCards();
            this.updatePowerUps();
        }
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ClueChaseGame();
});

// Prevent context menu on touch devices
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);