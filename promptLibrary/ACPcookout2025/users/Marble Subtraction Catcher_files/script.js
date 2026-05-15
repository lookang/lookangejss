// Marble Subtraction Catcher Game
// Designed for Primary 1 students practicing subtraction facts to 10
// Implements cognitive load theory and multimedia learning principles
// Modified: Updated to use basket instead of tin can for catching marbles

class MarbleSubtractionGame {
    constructor() {
        // Game state variables
        this.score = 0;
        this.lives = 3;
        this.currentQuestion = null;
        this.correctAnswer = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.marbles = [];
        this.gameSpeed = 2000; // Initial marble drop interval
        this.marbleSpeed = 2; // Pixels per frame
        this.gameInterval = null;
        this.animationFrame = null;
        
        // DOM elements
        this.scoreElement = document.getElementById('scoreValue');
        this.livesElement = document.getElementById('livesValue');
        this.questionElement = document.getElementById('questionText');
        this.gameArea = document.getElementById('gameArea');
        this.tinCan = document.getElementById('tinCan'); // Modified: Now references the basket element
        this.canFace = document.getElementById('canFace'); // Modified: Now references the basket face
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.gameOver = document.getElementById('gameOver');
        this.finalScore = document.getElementById('finalScore');
        this.feedbackMessage = document.getElementById('feedbackMessage');
        
        // Audio context for sound effects (using Web Audio API)
        this.audioContext = null;
        this.initAudio();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Generate first question
        this.generateQuestion();
    }
    
    // Initialize Web Audio API for sound effects
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    // Play celebration sound when correct answer is caught
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
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
    
    // Play error sound for incorrect answers
    playErrorSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }
    
    // Initialize all event listeners for game interaction
    initEventListeners() {
        // Start game button
        this.startBtn.addEventListener('click', () => this.startGame());
        
        // Pause game button
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        
        // Restart game button
        this.restartBtn.addEventListener('click', () => this.restartGame());
        
        // Modified: Basket movement for desktop (improved positioning)
        this.gameArea.addEventListener('mousemove', (e) => this.moveBasket(e));
        
        // Modified: Touch support for mobile devices (improved for basket)
        this.gameArea.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.moveBasket(e.touches[0]);
        });
        
        // Prevent context menu on touch devices
        this.gameArea.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    // Generate subtraction questions appropriate for Primary 1 level
    generateQuestion() {
        // Ensure subtraction results in positive numbers (0-10)
        const minuend = Math.floor(Math.random() * 8) + 3; // 3-10
        const subtrahend = Math.floor(Math.random() * minuend) + 1; // 1 to minuend
        this.correctAnswer = minuend - subtrahend;
        
        this.currentQuestion = `${minuend} - ${subtrahend} = ?`;
        this.questionElement.textContent = this.currentQuestion;
        
        // Clear existing marbles when new question is generated
        this.clearMarbles();
    }
    
    // Start the game and initialize game loop
    startGame() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        this.gameRunning = true;
        this.gamePaused = false;
        this.startBtn.style.display = 'none';
        this.pauseBtn.style.display = 'inline-block';
        
        // Start marble generation
        this.gameInterval = setInterval(() => {
            if (!this.gamePaused) {
                this.createMarble();
            }
        }, this.gameSpeed);
        
        // Start game animation loop
        this.gameLoop();
        
        this.showFeedback('Game Started! Catch the correct answer in the basket!', 'correct'); // Modified: Updated message
    }
    
    // Main game animation loop
    gameLoop() {
        if (!this.gameRunning) return;
        
        if (!this.gamePaused) {
            this.updateMarbles();
            this.checkCollisions();
        }
        
        this.animationFrame = requestAnimationFrame(() => this.gameLoop());
    }
    
    // Create falling marbles with correct and incorrect answers
    createMarble() {
        const marble = document.createElement('div');
        marble.className = 'marble';
        
        // Ensure correct answer appears within 7 marbles as specified
        const shouldBeCorrect = this.marbles.length < 7 && 
                               !this.marbles.some(m => parseInt(m.textContent) === this.correctAnswer) &&
                               (Math.random() < 0.3 || this.marbles.length === 6);
        
        if (shouldBeCorrect) {
            marble.textContent = this.correctAnswer;
            marble.classList.add('correct');
        } else {
            // Generate incorrect answer (different from correct answer)
            let incorrectAnswer;
            do {
                incorrectAnswer = Math.floor(Math.random() * 10);
            } while (incorrectAnswer === this.correctAnswer);
            
            marble.textContent = incorrectAnswer;
            marble.classList.add('incorrect');
        }
        
        // Random horizontal position
        const maxX = this.gameArea.clientWidth - 50;
        marble.style.left = Math.random() * maxX + 'px';
        marble.style.top = '-50px';
        
        // Add click/touch event for marble interaction
        marble.addEventListener('click', (e) => this.catchMarble(e, marble));
        marble.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.catchMarble(e, marble);
        });
        
        this.gameArea.appendChild(marble);
        this.marbles.push(marble);
    }
    
    // Modified: Update marble positions (falling animation) - improved for basket catching
    updateMarbles() {
        this.marbles.forEach((marble, index) => {
            const currentTop = parseInt(marble.style.top) || 0;
            const newTop = currentTop + this.marbleSpeed;
            
            marble.style.top = newTop + 'px';
            
            // Modified: Remove marbles that have fallen past the basket (more precise detection)
            const basketBottom = this.gameArea.clientHeight - 60; // Account for basket height
            if (newTop > basketBottom) {
                this.removeMarble(marble, index);
                
                // Lose a life if correct answer falls past the basket
                if (marble.classList.contains('correct')) {
                    this.loseLife();
                }
            }
        });
    }
    
    // Handle marble catching interaction
    catchMarble(event, marble) {
        event.stopPropagation();
        
        const marbleValue = parseInt(marble.textContent);
        const isCorrect = marbleValue === this.correctAnswer;
        
        if (isCorrect) {
            // Correct answer caught
            this.score += 10;
            this.updateScore();
            this.playSuccessSound();
            this.showHappyFace();
            this.showFeedback('Correct! Well done! 🎉', 'correct');
            
            // Generate new question after correct answer
            setTimeout(() => {
                this.generateQuestion();
                this.increaseSpeed();
            }, 1000);
        } else {
            // Incorrect answer caught
            this.playErrorSound();
            this.showSadFace();
            this.showFeedback('Try again! Look for ' + this.correctAnswer, 'incorrect');
        }
        
        // Remove the caught marble
        const marbleIndex = this.marbles.indexOf(marble);
        this.removeMarble(marble, marbleIndex);
    }
    
    // Remove marble from game area and array
    removeMarble(marble, index) {
        if (marble.parentNode) {
            marble.parentNode.removeChild(marble);
        }
        this.marbles.splice(index, 1);
    }
    
    // Clear all marbles from screen
    clearMarbles() {
        this.marbles.forEach(marble => {
            if (marble.parentNode) {
                marble.parentNode.removeChild(marble);
            }
        });
        this.marbles = [];
    }
    
    // Modified: Move basket based on mouse/touch position (renamed from moveTinCan)
    moveBasket(event) {
        if (!this.gameRunning || this.gamePaused) return;
        
        const gameAreaRect = this.gameArea.getBoundingClientRect();
        const basketWidth = this.tinCan.offsetWidth; // Still using tinCan reference for compatibility
        let mouseX = event.clientX - gameAreaRect.left;
        
        // Modified: Keep basket within game area bounds (improved boundary detection)
        mouseX = Math.max(basketWidth / 2, Math.min(mouseX, gameAreaRect.width - basketWidth / 2));
        
        this.tinCan.style.left = mouseX + 'px';
        this.tinCan.style.transform = 'translateX(-50%)';
    }
    
    // Modified: Check for collisions between marbles and basket (improved collision detection)
    checkCollisions() {
        const basketRect = this.tinCan.getBoundingClientRect();
        const gameAreaRect = this.gameArea.getBoundingClientRect();
        
        this.marbles.forEach((marble, index) => {
            const marbleRect = marble.getBoundingClientRect();
            
            // Modified: Improved collision detection for basket shape
            const marbleBottom = marbleRect.bottom;
            const marbleCenterX = marbleRect.left + marbleRect.width / 2;
            const basketTop = basketRect.top;
            const basketLeft = basketRect.left;
            const basketRight = basketRect.right;
            
            // Check if marble is falling into the basket opening
            if (marbleBottom >= basketTop &&
                marbleCenterX >= basketLeft &&
                marbleCenterX <= basketRight &&
                marbleRect.top < basketRect.bottom) {
                
                // Simulate marble click for collision
                this.catchMarble({ stopPropagation: () => {} }, marble);
            }
        });
    }
    
    // Modified: Display happy face animation on basket
    showHappyFace() {
        this.canFace.textContent = '😊';
        this.tinCan.classList.add('happy');
        
        setTimeout(() => {
            this.tinCan.classList.remove('happy');
        }, 500);
    }
    
    // Modified: Display sad face animation on basket
    showSadFace() {
        this.canFace.textContent = '😢';
        this.tinCan.classList.add('sad');
        
        setTimeout(() => {
            this.canFace.textContent = '😊';
            this.tinCan.classList.remove('sad');
        }, 1000);
    }
    
    // Show feedback messages to students
    showFeedback(message, type) {
        this.feedbackMessage.textContent = message;
        this.feedbackMessage.className = `feedback-message ${type}-feedback`;
        
        setTimeout(() => {
            this.feedbackMessage.textContent = '';
            this.feedbackMessage.className = 'feedback-message';
        }, 3000);
    }
    
    // Update score display
    updateScore() {
        this.scoreElement.textContent = this.score;
    }
    
    // Handle life loss
    loseLife() {
        this.lives--;
        this.updateLives();
        
        if (this.lives <= 0) {
            this.endGame();
        } else {
            this.showFeedback(`Oops! ${this.lives} lives left`, 'incorrect');
        }
    }
    
    // Update lives display
    updateLives() {
        const hearts = '❤️'.repeat(this.lives) + '💔'.repeat(3 - this.lives);
        this.livesElement.textContent = hearts;
    }
    
    // Increase game speed as student progresses
    increaseSpeed() {
        if (this.gameSpeed > 800) {
            this.gameSpeed -= 100;
            this.marbleSpeed += 0.2;
            
            // Restart interval with new speed
            clearInterval(this.gameInterval);
            this.gameInterval = setInterval(() => {
                if (!this.gamePaused) {
                    this.createMarble();
                }
            }, this.gameSpeed);
        }
    }
    
    // Toggle game pause
    togglePause() {
        this.gamePaused = !this.gamePaused;
        this.pauseBtn.textContent = this.gamePaused ? 'Resume' : 'Pause';
        
        if (this.gamePaused) {
            this.showFeedback('Game Paused', 'correct');
        } else {
            this.showFeedback('Game Resumed', 'correct');
        }
    }
    
    // End game and show results
    endGame() {
        this.gameRunning = false;
        this.gamePaused = false;
        
        // Clear intervals and animation
        clearInterval(this.gameInterval);
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Clear remaining marbles
        this.clearMarbles();
        
        // Show game over screen
        this.finalScore.textContent = this.score;
        this.gameOver.style.display = 'flex';
        
        // Hide pause button, show start button
        this.pauseBtn.style.display = 'none';
        this.startBtn.style.display = 'inline-block';
        this.startBtn.textContent = 'Start New Game';
    }
    
    // Restart game with reset values
    restartGame() {
        // Reset game state
        this.score = 0;
        this.lives = 3;
        this.gameSpeed = 2000;
        this.marbleSpeed = 2;
        
        // Update displays
        this.updateScore();
        this.updateLives();
        
        // Hide game over screen
        this.gameOver.style.display = 'none';
        
        // Modified: Reset basket face
        this.canFace.textContent = '😊';
        this.tinCan.classList.remove('happy', 'sad');
        
        // Generate new question
        this.generateQuestion();
        
        // Start new game
        this.startGame();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create game instance
    const game = new MarbleSubtractionGame();
    
    // Add keyboard support for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && game.gameRunning) {
            e.preventDefault();
            game.togglePause();
        }
    });
    
    // Modified: Handle window resize for responsive design (updated for basket)
    window.addEventListener('resize', () => {
        // Adjust basket position if needed
        if (game.tinCan) {
            const gameAreaWidth = game.gameArea.clientWidth;
            const basketLeft = parseInt(game.tinCan.style.left) || gameAreaWidth / 2;
            const adjustedLeft = Math.min(basketLeft, gameAreaWidth - game.tinCan.offsetWidth);
            game.tinCan.style.left = adjustedLeft + 'px';
        }
    });
    
    console.log('Marble Subtraction Catcher Game with Basket initialized successfully!'); // Modified: Updated console message
});