/**
 * Apple Catch Addition Game - JavaScript Implementation
 * Educational game for Primary 2 students to practice addition facts up to 10
 * Implements cognitive load theory and multimedia learning principles
 */

class AppleCatchGame {
    constructor() {
        // Game state variables
        this.score = 0;
        this.lives = 3;
        this.currentQuestion = null;
        this.correctAnswer = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.apples = [];
        this.basketPosition = 50; // Percentage from left
        
        // Game difficulty settings for Primary 2 level
        this.appleSpeed = 2; // Pixels per frame
        this.appleSpawnRate = 0.02; // Probability per frame
        this.maxApples = 4; // Maximum apples on screen
        
        // DOM element references
        this.gameContainer = document.getElementById('gameContainer');
        this.scoreValue = document.getElementById('scoreValue');
        this.livesValue = document.getElementById('livesValue');
        this.questionDisplay = document.getElementById('currentQuestion');
        this.gameArea = document.getElementById('gameArea');
        this.applesContainer = document.getElementById('applesContainer');
        this.basket = document.getElementById('basket');
        this.feedbackDisplay = document.getElementById('feedbackDisplay');
        this.happyFace = document.getElementById('happyFace');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.finalScore = document.getElementById('finalScore');
        this.encouragementMessage = document.getElementById('encouragementMessage');
        
        // Control buttons
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        
        // Audio context for celebration sounds
        this.audioContext = null;
        this.initAudio();
        
        // Initialize game
        this.init();
    }
    
    /**
     * Initialize audio context for sound effects
     * Uses Web Audio API for better performance and control
     */
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio not supported');
        }
    }
    
    /**
     * Play celebration sound when answer is correct
     * Creates a pleasant chime sound using oscillators
     */
    playSuccessSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }
    
    /**
     * Play error sound when answer is incorrect
     * Creates a gentle error tone to avoid negative reinforcement
     */
    playErrorSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
    
    /**
     * Initialize game event listeners and setup
     */
    init() {
        this.setupEventListeners();
        this.generateNewQuestion();
        this.updateDisplay();
        this.showInstructions();
    }
    
    /**
     * Setup all event listeners for game interaction
     * Supports both mouse and touch interactions
     */
    setupEventListeners() {
        // Control button events
        this.startBtn.addEventListener('click', () => this.startGame());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
        
        // Basket movement - mouse events
        this.gameArea.addEventListener('mousemove', (e) => this.moveBucket(e));
        this.gameArea.addEventListener('click', (e) => this.moveBucket(e));
        
        // Basket movement - touch events for mobile
        this.gameArea.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.moveBucket(e.touches[0]);
        });
        
        this.gameArea.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.moveBucket(e.touches[0]);
        });
        
        // Keyboard controls for accessibility
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    this.basketPosition = Math.max(10, this.basketPosition - 5);
                    this.updateBasketPosition();
                    break;
                case 'ArrowRight':
                    this.basketPosition = Math.min(90, this.basketPosition + 5);
                    this.updateBasketPosition();
                    break;
                case ' ':
                    e.preventDefault();
                    this.togglePause();
                    break;
            }
        });
        
        // Show instructions on game area hover
        this.gameArea.addEventListener('mouseenter', () => this.showInstructions());
        this.gameArea.addEventListener('mouseleave', () => this.hideInstructions());
    }
    
    /**
     * Move basket based on mouse/touch position
     * Calculates percentage position for responsive design
     */
    moveBucket(event) {
        if (!this.gameRunning || this.gamePaused) return;
        
        const rect = this.gameArea.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        
        // Keep basket within bounds
        this.basketPosition = Math.max(10, Math.min(90, percentage));
        this.updateBasketPosition();
    }
    
    /**
     * Update basket visual position
     */
    updateBasketPosition() {
        this.basket.style.left = this.basketPosition + '%';
    }
    
    /**
     * Show game instructions tooltip
     */
    showInstructions() {
        const tooltip = document.getElementById('instructionsTooltip');
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 3000);
    }
    
    /**
     * Hide game instructions tooltip
     */
    hideInstructions() {
        const tooltip = document.getElementById('instructionsTooltip');
        tooltip.classList.remove('show');
    }
    
    /**
     * Generate new addition question appropriate for Primary 2 level
     * Focuses on addition facts up to 10 as per Singapore curriculum
     */
    generateNewQuestion() {
        // Generate two numbers that add up to 10 or less
        const num1 = Math.floor(Math.random() * 6) + 1; // 1-6
        const num2 = Math.floor(Math.random() * (10 - num1)) + 1; // Ensure sum ≤ 10
        
        this.correctAnswer = num1 + num2;
        this.currentQuestion = `${num1} + ${num2} = ?`;
        
        this.questionDisplay.textContent = this.currentQuestion;
    }
    
    /**
     * Create falling apple with number
     */
    createApple(number, isCorrect = false) {
        const apple = document.createElement('div');
        apple.className = 'apple';
        apple.textContent = number;
        apple.dataset.value = number;
        apple.dataset.correct = isCorrect;
        
        // Random horizontal position
        const leftPosition = Math.random() * 80 + 10; // 10% to 90%
        apple.style.left = leftPosition + '%';
        apple.style.top = '-60px';
        
        // Add click/touch event for catching
        apple.addEventListener('click', (e) => this.catchApple(e, apple));
        apple.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.catchApple(e, apple);
        });
        
        this.applesContainer.appendChild(apple);
        
        return {
            element: apple,
            x: leftPosition,
            y: -60,
            value: number,
            isCorrect: isCorrect
        };
    }
    
    /**
     * Handle apple catching logic
     */
    catchApple(event, appleElement) {
        if (!this.gameRunning || this.gamePaused) return;
        
        event.stopPropagation();
        
        const appleData = this.apples.find(a => a.element === appleElement);
        if (!appleData) return;
        
        // Check if apple is near basket
        const basketLeft = this.basketPosition - 8; // Basket width consideration
        const basketRight = this.basketPosition + 8;
        const appleBottom = appleData.y + 50; // Apple height
        
        if (appleData.x >= basketLeft && appleData.x <= basketRight && appleBottom >= 300) {
            this.processAppleCatch(appleData);
        }
    }
    
    /**
     * Process caught apple and provide feedback
     */
    processAppleCatch(appleData) {
        // Remove apple from game
        this.removeApple(appleData);
        
        if (appleData.isCorrect) {
            // Correct answer
            this.score += 10;
            this.showFeedback('Correct! +10 points', 'correct');
            this.showHappyFace();
            this.playSuccessSound();
            
            // Generate new question after short delay
            setTimeout(() => {
                this.generateNewQuestion();
            }, 1000);
            
        } else {
            // Incorrect answer
            this.lives--;
            this.showFeedback('Try again!', 'incorrect');
            this.playErrorSound();
            
            if (this.lives <= 0) {
                this.endGame();
            }
        }
        
        this.updateDisplay();
    }
    
    /**
     * Show feedback message with animation
     */
    showFeedback(message, type) {
        this.feedbackDisplay.textContent = message;
        this.feedbackDisplay.className = `feedback-display ${type}`;
        
        setTimeout(() => {
            this.feedbackDisplay.className = 'feedback-display';
        }, 1500);
    }
    
    /**
     * Show happy face animation for correct answers
     */
    showHappyFace() {
        this.happyFace.classList.add('show');
        setTimeout(() => {
            this.happyFace.classList.remove('show');
        }, 1000);
    }
    
    /**
     * Remove apple from game
     */
    removeApple(appleData) {
        const index = this.apples.indexOf(appleData);
        if (index > -1) {
            this.apples.splice(index, 1);
            appleData.element.remove();
        }
    }
    
    /**
     * Update game display elements
     */
    updateDisplay() {
        this.scoreValue.textContent = this.score;
        
        // Update lives display with hearts
        const hearts = '❤️'.repeat(this.lives) + '🤍'.repeat(3 - this.lives);
        this.livesValue.textContent = hearts;
    }
    
    /**
     * Start the game
     */
    startGame() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        this.gameRunning = true;
        this.gamePaused = false;
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        
        this.gameLoop();
    }
    
    /**
     * Toggle game pause
     */
    togglePause() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        this.pauseBtn.textContent = this.gamePaused ? 'Resume' : 'Pause';
        
        if (!this.gamePaused) {
            this.gameLoop();
        }
    }
    
    /**
     * Reset game to initial state
     */
    resetGame() {
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.lives = 3;
        this.basketPosition = 50;
        
        // Clear all apples
        this.apples.forEach(apple => apple.element.remove());
        this.apples = [];
        
        // Reset UI
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.pauseBtn.textContent = 'Pause';
        this.gameOverScreen.classList.remove('show');
        
        this.generateNewQuestion();
        this.updateDisplay();
        this.updateBasketPosition();
    }
    
    /**
     * End game and show results
     */
    endGame() {
        this.gameRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        
        // Show game over screen
        this.finalScore.textContent = this.score;
        
        // Provide encouraging message based on performance
        let message = '';
        if (this.score >= 100) {
            message = 'Excellent work! You\'re a math star! ⭐';
        } else if (this.score >= 50) {
            message = 'Great job! Keep practicing! 👍';
        } else {
            message = 'Good effort! Try again to improve! 💪';
        }
        
        this.encouragementMessage.textContent = message;
        this.gameOverScreen.classList.add('show');
    }
    
    /**
     * Main game loop - handles apple spawning and movement
     */
    gameLoop() {
        if (!this.gameRunning || this.gamePaused) return;
        
        // Spawn new apples
        if (Math.random() < this.appleSpawnRate && this.apples.length < this.maxApples) {
            this.spawnApples();
        }
        
        // Move existing apples
        this.moveApples();
        
        // Check for collisions and cleanup
        this.checkCollisions();
        
        // Continue game loop
        requestAnimationFrame(() => this.gameLoop());
    }
    
    /**
     * Spawn new apples with correct and incorrect answers
     */
    spawnApples() {
        // Always spawn one correct answer
        const correctApple = this.createApple(this.correctAnswer, true);
        this.apples.push(correctApple);
        
        // Spawn 1-2 incorrect answers
        const numIncorrect = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numIncorrect && this.apples.length < this.maxApples; i++) {
            let incorrectAnswer;
            do {
                incorrectAnswer = Math.floor(Math.random() * 10) + 1;
            } while (incorrectAnswer === this.correctAnswer);
            
            const incorrectApple = this.createApple(incorrectAnswer, false);
            this.apples.push(incorrectApple);
        }
    }
    
    /**
     * Move all apples downward
     */
    moveApples() {
        this.apples.forEach(apple => {
            apple.y += this.appleSpeed;
            apple.element.style.top = apple.y + 'px';
        });
    }
    
    /**
     * Check for collisions and remove off-screen apples
     */
    checkCollisions() {
        const gameAreaHeight = this.gameArea.offsetHeight;
        
        // Remove apples that have fallen off screen
        this.apples = this.apples.filter(apple => {
            if (apple.y > gameAreaHeight) {
                apple.element.remove();
                
                // Lose life if correct answer falls off screen
                if (apple.isCorrect) {
                    this.lives--;
                    this.showFeedback('Missed the correct answer!', 'incorrect');
                    this.playErrorSound();
                    
                    if (this.lives <= 0) {
                        this.endGame();
                    } else {
                        // Generate new question
                        setTimeout(() => {
                            this.generateNewQuestion();
                        }, 1000);
                    }
                    
                    this.updateDisplay();
                }
                
                return false;
            }
            return true;
        });
        
        // Check basket collisions
        this.checkBasketCollisions();
    }
    
    /**
     * Check if apples are caught by basket
     */
    checkBasketCollisions() {
        const basketLeft = this.basketPosition - 8;
        const basketRight = this.basketPosition + 8;
        const basketTop = this.gameArea.offsetHeight - 60; // Basket position from bottom
        
        this.apples.forEach(apple => {
            if (apple.x >= basketLeft && apple.x <= basketRight && 
                apple.y + 50 >= basketTop && apple.y <= basketTop + 20) {
                this.processAppleCatch(apple);
            }
        });
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new AppleCatchGame();
    
    // Make game globally accessible for debugging
    window.appleCatchGame = game;
});