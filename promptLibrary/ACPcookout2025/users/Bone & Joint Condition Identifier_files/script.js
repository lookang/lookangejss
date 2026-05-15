// Game state management
class BoneJointGame {
    constructor() {
        // Game configuration
        this.timeLimit = 5; // seconds per question
        this.maxLives = 3;
        this.pointsPerCorrect = 10;
        
        // Game state
        this.score = 0;
        this.lives = this.maxLives;
        this.currentQuestion = 0;
        this.isGameActive = false;
        this.timer = null;
        this.timeRemaining = this.timeLimit;
        
        // DOM elements
        this.elements = {
            score: document.getElementById('score'),
            timer: document.getElementById('timer'),
            heartsContainer: document.getElementById('heartsContainer'),
            diagramContent: document.getElementById('diagramContent'),
            startBtn: document.getElementById('startBtn'),
            restartBtn: document.getElementById('restartBtn'),
            feedbackOverlay: document.getElementById('feedbackOverlay'),
            feedbackIcon: document.getElementById('feedbackIcon'),
            feedbackText: document.getElementById('feedbackText'),
            gameOverScreen: document.getElementById('gameOverScreen'),
            finalScore: document.getElementById('finalScore'),
            playAgainBtn: document.getElementById('playAgainBtn'),
            tooltip: document.getElementById('tooltip')
        };
        
        // Answer buttons
        this.answerButtons = document.querySelectorAll('.answer-btn');
        
        // Question bank with visual representations and correct answers
        this.questions = [
            {
                condition: 'osteoporosis',
                visual: '🦴💔',
                description: 'Weakened, porous bone structure',
                explanation: 'Osteoporosis causes bones to become weak and brittle due to loss of bone density.'
            },
            {
                condition: 'fracture',
                visual: '🦴⚡',
                description: 'Broken bone with crack line',
                explanation: 'A fracture is a break in the bone, often caused by trauma or excessive force.'
            },
            {
                condition: 'arthritis',
                visual: '🦴🔥',
                description: 'Inflamed joint with swelling',
                explanation: 'Arthritis involves inflammation of joints, causing pain and stiffness.'
            },
            {
                condition: 'dislocation',
                visual: '🦴↗️',
                description: 'Bone displaced from joint socket',
                explanation: 'Dislocation occurs when a bone is forced out of its normal position in a joint.'
            },
            {
                condition: 'sprain',
                visual: '🦴🌀',
                description: 'Stretched or torn ligament',
                explanation: 'A sprain involves injury to ligaments that connect bones at joints.'
            }
        ];
        
        this.currentQuestionData = null;
        this.init();
    }
    
    // Initialize the game
    init() {
        this.bindEvents();
        this.updateDisplay();
        this.showTooltips();
    }
    
    // Bind event listeners
    bindEvents() {
        // Start game button
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        
        // Restart game button
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());
        
        // Play again button
        this.elements.playAgainBtn.addEventListener('click', () => this.restartGame());
        
        // Answer buttons
        this.answerButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAnswer(e.target.dataset.condition));
        });
        
        // Tooltip functionality
        document.addEventListener('mousemove', (e) => this.handleTooltip(e));
    }
    
    // Show tooltips on hover
    showTooltips() {
        const tooltipElements = document.querySelectorAll('[title]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target.title, e);
                e.target.removeAttribute('title');
                e.target.dataset.originalTitle = e.target.title || '';
            });
            
            element.addEventListener('mouseleave', (e) => {
                this.hideTooltip();
                if (e.target.dataset.originalTitle) {
                    e.target.title = e.target.dataset.originalTitle;
                }
            });
        });
    }
    
    // Handle tooltip display
    handleTooltip(e) {
        if (this.elements.tooltip.style.display === 'block') {
            this.elements.tooltip.style.left = e.pageX + 10 + 'px';
            this.elements.tooltip.style.top = e.pageY - 30 + 'px';
        }
    }
    
    // Show tooltip
    showTooltip(text, event) {
        this.elements.tooltip.textContent = text;
        this.elements.tooltip.style.display = 'block';
        this.elements.tooltip.style.left = event.pageX + 10 + 'px';
        this.elements.tooltip.style.top = event.pageY - 30 + 'px';
    }
    
    // Hide tooltip
    hideTooltip() {
        this.elements.tooltip.style.display = 'none';
    }
    
    // Start the game
    startGame() {
        this.isGameActive = true;
        this.score = 0;
        this.lives = this.maxLives;
        this.currentQuestion = 0;
        
        this.elements.startBtn.style.display = 'none';
        this.elements.restartBtn.style.display = 'inline-block';
        
        this.updateDisplay();
        this.nextQuestion();
    }
    
    // Restart the game
    restartGame() {
        this.isGameActive = false;
        this.clearTimer();
        
        // Hide game over screen
        this.elements.gameOverScreen.style.display = 'none';
        
        // Reset display
        this.elements.diagramContent.innerHTML = '<div class="loading-text">Click Start Game to begin!</div>';
        this.elements.startBtn.style.display = 'inline-block';
        this.elements.restartBtn.style.display = 'none';
        
        // Reset button states
        this.resetButtonStates();
        
        // Reset game state
        this.score = 0;
        this.lives = this.maxLives;
        this.currentQuestion = 0;
        this.timeRemaining = this.timeLimit;
        
        this.updateDisplay();
    }
    
    // Generate next question
    nextQuestion() {
        if (!this.isGameActive) return;
        
        // Select random question
        this.currentQuestionData = this.questions[Math.floor(Math.random() * this.questions.length)];
        
        // Display the visual representation
        this.elements.diagramContent.innerHTML = `
            <div style="font-size: 64px; margin-bottom: 12px;">${this.currentQuestionData.visual}</div>
            <div style="font-size: 14px; color: #6c757d; font-weight: 500;">${this.currentQuestionData.description}</div>
        `;
        
        // Reset button states
        this.resetButtonStates();
        
        // Start timer
        this.startTimer();
    }
    
    // Start countdown timer
    startTimer() {
        this.timeRemaining = this.timeLimit;
        this.updateTimer();
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimer();
            
            if (this.timeRemaining <= 0) {
                this.handleTimeout();
            }
        }, 1000);
    }
    
    // Clear timer
    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    // Handle timeout (no answer given)
    handleTimeout() {
        this.clearTimer();
        this.loseLife();
        this.showFeedback('⏰', 'Time\'s up!', false);
        
        setTimeout(() => {
            if (this.lives > 0) {
                this.nextQuestion();
            }
        }, 1500);
    }
    
    // Handle answer selection
    handleAnswer(selectedCondition) {
        if (!this.isGameActive || !this.currentQuestionData) return;
        
        this.clearTimer();
        
        const isCorrect = selectedCondition === this.currentQuestionData.condition;
        const selectedButton = document.querySelector(`[data-condition="${selectedCondition}"]`);
        
        if (isCorrect) {
            this.score += this.pointsPerCorrect;
            selectedButton.classList.add('correct');
            this.showFeedback('✅', 'Correct! Well done!', true);
        } else {
            this.loseLife();
            selectedButton.classList.add('incorrect');
            
            // Highlight correct answer
            const correctButton = document.querySelector(`[data-condition="${this.currentQuestionData.condition}"]`);
            correctButton.classList.add('correct');
            
            this.showFeedback('❌', `Incorrect! The answer was ${this.currentQuestionData.condition}.`, false);
        }
        
        // Disable all buttons
        this.answerButtons.forEach(btn => btn.disabled = true);
        
        this.updateDisplay();
        
        // Continue game or end
        setTimeout(() => {
            if (this.lives > 0) {
                this.nextQuestion();
            }
        }, 2000);
    }
    
    // Lose a life
    loseLife() {
        this.lives--;
        this.updateLives();
        
        if (this.lives <= 0) {
            this.endGame();
        }
    }
    
    // End the game
    endGame() {
        this.isGameActive = false;
        this.clearTimer();
        
        this.elements.finalScore.textContent = this.score;
        
        // Determine performance message
        let message = '';
        if (this.score >= 50) {
            message = 'Excellent work! You have a great understanding of bone and joint conditions.';
        } else if (this.score >= 30) {
            message = 'Good job! Keep practicing to improve your knowledge.';
        } else {
            message = 'Keep studying! Review the different bone and joint conditions.';
        }
        
        document.getElementById('gameOverMessage').innerHTML = `
            Your final score: <span id="finalScore">${this.score}</span><br>
            <small style="color: #6c757d; margin-top: 8px; display: block;">${message}</small>
        `;
        
        this.elements.gameOverScreen.style.display = 'flex';
    }
    
    // Show feedback overlay
    showFeedback(icon, text, isCorrect) {
        this.elements.feedbackIcon.textContent = icon;
        this.elements.feedbackText.textContent = text;
        this.elements.feedbackText.style.color = isCorrect ? '#38a169' : '#e53e3e';
        this.elements.feedbackOverlay.style.display = 'flex';
        
        setTimeout(() => {
            this.elements.feedbackOverlay.style.display = 'none';
        }, 1500);
    }
    
    // Reset button states
    resetButtonStates() {
        this.answerButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
        });
    }
    
    // Update display elements
    updateDisplay() {
        this.elements.score.textContent = this.score;
        this.updateLives();
        this.updateTimer();
    }
    
    // Update lives display
    updateLives() {
        const hearts = this.elements.heartsContainer.querySelectorAll('.heart');
        hearts.forEach((heart, index) => {
            if (index < this.lives) {
                heart.classList.remove('lost');
            } else {
                heart.classList.add('lost');
            }
        });
    }
    
    // Update timer display
    updateTimer() {
        this.elements.timer.textContent = this.timeRemaining;
        
        // Add visual warning when time is running low
        if (this.timeRemaining <= 2) {
            this.elements.timer.style.background = '#ff6b6b';
        } else {
            this.elements.timer.style.background = 'rgba(255, 255, 255, 0.2)';
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create game instance
    const game = new BoneJointGame();
    
    // Add touch support for mobile devices
    document.addEventListener('touchstart', function() {}, { passive: true });
    
    // Prevent context menu on long press for mobile
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    
    // Handle visibility change to pause game when tab is not active
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && game.isGameActive) {
            game.clearTimer();
        }
    });
    
    console.log('Bone & Joint Condition Identifier Game Loaded');
    console.log('Game Features:');
    console.log('- 5 different bone/joint conditions to identify');
    console.log('- 5-second timer per question');
    console.log('- 3 lives system');
    console.log('- Score tracking with 10 points per correct answer');
    console.log('- Visual feedback for correct/incorrect answers');
    console.log('- Mobile-friendly touch interface');
    console.log('- Responsive design for iframe and full browser');
});