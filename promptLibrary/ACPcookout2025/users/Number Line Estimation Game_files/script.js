// JavaScript for Number Line Estimation Game
// Implements drag-and-drop functionality with educational feedback
// Modified to use random numbers 1-99 and simplified number line

class NumberLineGame {
    constructor() {
        // Game state variables
        this.currentNumber = 10;
        this.score = 0;
        this.level = 1;
        this.attempts = 0;
        this.maxAttempts = 3;
        this.tolerance = 5; // ±5 margin of error as requested
        
        // Modified: Generate completely random numbers within 1-99 range
        this.usedNumbers = [];
        
        // DOM elements
        this.initializeElements();
        this.setupEventListeners();
        this.generateNewNumber();
    }
    
    // Initialize DOM element references
    initializeElements() {
        this.numberBall = document.getElementById('numberBall');
        this.targetNumber = document.getElementById('targetNumber');
        this.numberLine = document.getElementById('numberLine');
        this.numberLineContainer = document.querySelector('.number-line-container');
        this.dropIndicator = document.getElementById('dropIndicator');
        this.feedbackPanel = document.getElementById('feedbackPanel');
        this.feedbackMessage = document.getElementById('feedbackMessage');
        this.feedbackEmoji = document.getElementById('feedbackEmoji');
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.tryAgainBtn = document.getElementById('tryAgainBtn');
        this.showAnswerBtn = document.getElementById('showAnswerBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.audioBtn = document.getElementById('audioBtn');
        this.correctIndicator = document.getElementById('correctIndicator');
    }
    
    // Set up all event listeners for drag-and-drop and button interactions
    setupEventListeners() {
        // Drag and drop events for the number ball
        this.numberBall.addEventListener('dragstart', (e) => this.handleDragStart(e));
        this.numberBall.addEventListener('drag', (e) => this.handleDrag(e));
        this.numberBall.addEventListener('dragend', (e) => this.handleDragEnd(e));
        
        // Touch events for mobile support
        this.numberBall.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.numberBall.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.numberBall.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Number line drop zone events
        this.numberLineContainer.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.numberLineContainer.addEventListener('drop', (e) => this.handleDrop(e));
        this.numberLineContainer.addEventListener('dragenter', (e) => this.handleDragEnter(e));
        this.numberLineContainer.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        
        // Button event listeners
        this.tryAgainBtn.addEventListener('click', () => this.resetCurrentNumber());
        this.showAnswerBtn.addEventListener('click', () => this.showCorrectAnswer());
        this.nextBtn.addEventListener('click', () => this.generateNewNumber());
        this.audioBtn.addEventListener('click', () => this.speakNumber());
    }
    
    // Handle drag start event
    handleDragStart(e) {
        this.numberBall.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.numberBall.outerHTML);
    }
    
    // Handle drag event - show drop indicator
    handleDrag(e) {
        if (e.clientX > 0) { // Only show indicator when mouse is tracked
            this.updateDropIndicator(e.clientX);
        }
    }
    
    // Handle drag end event
    handleDragEnd(e) {
        this.numberBall.classList.remove('dragging');
        this.hideDropIndicator();
        this.numberLineContainer.classList.remove('drag-over');
    }
    
    // Touch event handlers for mobile support
    handleTouchStart(e) {
        e.preventDefault();
        this.numberBall.classList.add('dragging');
        this.touchOffset = {
            x: e.touches[0].clientX - this.numberBall.getBoundingClientRect().left,
            y: e.touches[0].clientY - this.numberBall.getBoundingClientRect().top
        };
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        
        // Move the ball with the touch
        this.numberBall.style.position = 'fixed';
        this.numberBall.style.left = (touch.clientX - this.touchOffset.x) + 'px';
        this.numberBall.style.top = (touch.clientY - this.touchOffset.y) + 'px';
        this.numberBall.style.zIndex = '1000';
        
        // Show drop indicator
        this.updateDropIndicator(touch.clientX);
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        const touch = e.changedTouches[0];
        
        // Reset ball position
        this.numberBall.style.position = 'relative';
        this.numberBall.style.left = 'auto';
        this.numberBall.style.top = 'auto';
        this.numberBall.style.zIndex = '100';
        this.numberBall.classList.remove('dragging');
        
        // Check if dropped on number line
        const lineRect = this.numberLineContainer.getBoundingClientRect();
        if (touch.clientX >= lineRect.left && touch.clientX <= lineRect.right &&
            touch.clientY >= lineRect.top && touch.clientY <= lineRect.bottom) {
            this.processDropAtPosition(touch.clientX);
        }
        
        this.hideDropIndicator();
    }
    
    // Handle drag over number line
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.updateDropIndicator(e.clientX);
    }
    
    // Handle drop on number line
    handleDrop(e) {
        e.preventDefault();
        this.processDropAtPosition(e.clientX);
        this.hideDropIndicator();
        this.numberLineContainer.classList.remove('drag-over');
    }
    
    // Handle drag enter
    handleDragEnter(e) {
        e.preventDefault();
        this.numberLineContainer.classList.add('drag-over');
    }
    
    // Handle drag leave
    handleDragLeave(e) {
        e.preventDefault();
        // Only remove drag-over if actually leaving the container
        if (!this.numberLineContainer.contains(e.relatedTarget)) {
            this.numberLineContainer.classList.remove('drag-over');
            this.hideDropIndicator();
        }
    }
    
    // Update drop indicator position
    updateDropIndicator(clientX) {
        const lineRect = this.numberLineContainer.getBoundingClientRect();
        const relativeX = clientX - lineRect.left;
        const percentage = Math.max(0, Math.min(100, (relativeX / lineRect.width) * 100));
        
        this.dropIndicator.style.left = percentage + '%';
        this.dropIndicator.classList.add('show');
    }
    
    // Hide drop indicator
    hideDropIndicator() {
        this.dropIndicator.classList.remove('show');
    }
    
    // Process drop at specific position
    processDropAtPosition(clientX) {
        const lineRect = this.numberLineContainer.getBoundingClientRect();
        const relativeX = clientX - lineRect.left;
        const percentage = (relativeX / lineRect.width) * 100;
        const estimatedValue = Math.round(percentage);
        
        this.checkAnswer(estimatedValue);
    }
    
    // Check if the answer is correct - Modified to use ±5 tolerance
    checkAnswer(estimatedValue) {
        const difference = Math.abs(estimatedValue - this.currentNumber);
        const isCorrect = difference <= this.tolerance; // Using ±5 tolerance as requested
        
        this.attempts++;
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer(estimatedValue);
        }
    }
    
    // Handle correct answer
    handleCorrectAnswer() {
        this.score += Math.max(1, 4 - this.attempts); // More points for fewer attempts
        this.updateScore();
        
        this.showFeedback('Excellent! Well done! 🎉', '😊', 'success');
        this.playSuccessSound();
        
        // Show next button after a delay
        setTimeout(() => {
            this.nextBtn.style.display = 'inline-block';
        }, 1500);
        
        this.attempts = 0;
    }
    
    // Handle incorrect answer
    handleIncorrectAnswer(estimatedValue) {
        const encouragingMessages = [
            'Good try! Let\'s try again! 💪',
            'You\'re getting closer! Keep going! 🌟',
            'Almost there! One more try! 🎯'
        ];
        
        const message = encouragingMessages[Math.min(this.attempts - 1, encouragingMessages.length - 1)];
        this.showFeedback(message, '🤔', 'error');
        
        if (this.attempts >= this.maxAttempts) {
            // Show help options after max attempts
            setTimeout(() => {
                this.tryAgainBtn.style.display = 'inline-block';
                this.showAnswerBtn.style.display = 'inline-block';
            }, 1500);
        } else {
            // Allow immediate retry
            setTimeout(() => {
                this.clearFeedback();
            }, 2000);
        }
    }
    
    // Show feedback message and emoji
    showFeedback(message, emoji, type) {
        this.feedbackMessage.textContent = message;
        this.feedbackMessage.className = `feedback-message ${type}`;
        this.feedbackEmoji.textContent = emoji;
        
        // Trigger animation
        this.feedbackEmoji.style.animation = 'none';
        setTimeout(() => {
            this.feedbackEmoji.style.animation = 'bounce 0.6s ease-in-out';
        }, 10);
    }
    
    // Clear feedback
    clearFeedback() {
        this.feedbackMessage.textContent = '';
        this.feedbackEmoji.textContent = '';
    }
    
    // Show correct answer on the number line
    showCorrectAnswer() {
        const correctPosition = this.currentNumber + '%';
        this.correctIndicator.style.left = correctPosition;
        this.correctIndicator.classList.add('show');
        
        this.showFeedback(`The correct position is ${this.currentNumber}! 📍`, '💡', 'success');
        
        setTimeout(() => {
            this.nextBtn.style.display = 'inline-block';
        }, 2000);
    }
    
    // Reset current number for retry
    resetCurrentNumber() {
        this.attempts = 0;
        this.hideAllButtons();
        this.clearFeedback();
        this.correctIndicator.classList.remove('show');
    }
    
    // Modified: Generate completely random numbers within 1-99 range
    generateNewNumber() {
        // Hide all buttons and clear feedback
        this.hideAllButtons();
        this.clearFeedback();
        this.correctIndicator.classList.remove('show');
        
        // Generate random number between 1 and 99
        this.currentNumber = Math.floor(Math.random() * 99) + 1;
        
        // Advance level every 10 correct answers
        if (this.score > 0 && this.score % 10 === 0 && this.score !== this.lastLevelScore) {
            this.advanceLevel();
            this.lastLevelScore = this.score;
        }
        
        // Update display
        this.targetNumber.textContent = this.currentNumber;
        this.attempts = 0;
        
        // Animate ball appearance
        this.numberBall.style.animation = 'bounce 0.6s ease-in-out';
        setTimeout(() => {
            this.numberBall.style.animation = 'none';
        }, 600);
    }
    
    // Advance to next level - Modified for random number system
    advanceLevel() {
        this.level++;
        this.updateLevel();
        
        // Show level up message
        this.showFeedback(`Level ${this.level}! 🎊`, '🎉', 'success');
        setTimeout(() => {
            this.clearFeedback();
        }, 2000);
    }
    
    // Hide all control buttons
    hideAllButtons() {
        this.tryAgainBtn.style.display = 'none';
        this.showAnswerBtn.style.display = 'none';
        this.nextBtn.style.display = 'none';
    }
    
    // Update score display
    updateScore() {
        this.scoreElement.textContent = this.score;
    }
    
    // Update level display
    updateLevel() {
        this.levelElement.textContent = this.level;
    }
    
    // Speak the current number (Web Speech API)
    speakNumber() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(this.currentNumber.toString());
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            utterance.volume = 0.8;
            speechSynthesis.speak(utterance);
        } else {
            // Fallback: show visual feedback
            this.showFeedback(`The number is ${this.currentNumber}`, '🔊', 'success');
            setTimeout(() => {
                this.clearFeedback();
            }, 2000);
        }
    }
    
    // Play success sound (using Web Audio API or fallback)
    playSuccessSound() {
        try {
            // Create a simple success tone
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5 note
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5 note
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5 note
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            // Fallback: no sound
            console.log('Audio not supported');
        }
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new NumberLineGame();
    
    // Add keyboard support for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const activeButton = document.activeElement;
            if (activeButton && activeButton.classList.contains('game-button')) {
                activeButton.click();
            }
        }
    });
    
    // Prevent context menu on long press for mobile
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    // Handle window resize for responsive design
    window.addEventListener('resize', () => {
        // Adjust game container height based on viewport
        const gameContainer = document.getElementById('gameContainer');
        if (window.innerHeight > 600) {
            gameContainer.style.height = '90vh';
        } else {
            gameContainer.style.height = '450px';
        }
    });
});