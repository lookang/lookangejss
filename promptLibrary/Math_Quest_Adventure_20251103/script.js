// Game state management
class MathQuestGame {
    constructor() {
        // Game configuration
        this.currentLevel = 1;
        this.score = 0;
        this.lives = 3;
        this.timeLeft = 60;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.currentQuestion = null;
        this.isGameActive = false;
        this.isPaused = false;
        this.timer = null;
        
        // DOM elements
        this.elements = {
            score: document.getElementById('score'),
            level: document.getElementById('level'),
            lives: document.getElementById('lives'),
            timer: document.getElementById('timer'),
            storyText: document.getElementById('storyText'),
            questionText: document.getElementById('questionText'),
            answerGrid: document.getElementById('answerGrid'),
            progressFill: document.getElementById('progressFill'),
            feedbackMessage: document.getElementById('feedbackMessage'),
            startBtn: document.getElementById('startBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            hintBtn: document.getElementById('hintBtn'),
            achievementPopup: document.getElementById('achievementPopup'),
            achievementText: document.getElementById('achievementText'),
            character: document.getElementById('character'),
            tooltip: document.getElementById('tooltip')
        };
        
        // Multiplication tables based on level (Singapore curriculum progression)
        this.levelConfig = {
            1: { tables: [2, 5, 10], timeBonus: 10, description: "Master the easy tables!" },
            2: { tables: [3, 4, 6], timeBonus: 15, description: "Building multiplication skills!" },
            3: { tables: [7, 8, 9], timeBonus: 20, description: "Tackling the tricky tables!" },
            4: { tables: [2, 3, 4, 5, 6, 7, 8, 9, 10], timeBonus: 25, description: "Mixed practice - you're a math wizard!" }
        };
        
        this.init();
    }
    
    // Initialize the game
    init() {
        this.bindEvents();
        this.updateDisplay();
        this.showWelcomeMessage();
    }
    
    // Bind event listeners
    bindEvents() {
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.pauseBtn.addEventListener('click', () => this.togglePause());
        this.elements.hintBtn.addEventListener('click', () => this.showHint());
        
        // Tooltip functionality
        document.addEventListener('mouseover', (e) => this.showTooltip(e));
        document.addEventListener('mouseout', () => this.hideTooltip());
        
        // Keyboard support for accessibility
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    // Show welcome message
    showWelcomeMessage() {
        this.elements.storyText.textContent = "Welcome, young mathematician! Help the wizard solve multiplication spells to unlock magical treasures!";
        this.elements.questionText.textContent = "Click START to begin your adventure!";
    }
    
    // Start the game
    startGame() {
        this.isGameActive = true;
        this.isPaused = false;
        this.timeLeft = 60;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        
        // Update UI
        this.elements.startBtn.style.display = 'none';
        this.elements.pauseBtn.style.display = 'inline-block';
        this.elements.hintBtn.style.display = 'inline-block';
        
        // Start timer
        this.startTimer();
        
        // Generate first question
        this.generateQuestion();
        
        // Update story
        this.elements.storyText.textContent = `Level ${this.currentLevel}: ${this.levelConfig[this.currentLevel].description}`;
        
        // Show achievement
        this.showAchievement("Adventure Begins! 🎯");
    }
    
    // Start game timer
    startTimer() {
        this.timer = setInterval(() => {
            if (!this.isPaused && this.isGameActive) {
                this.timeLeft--;
                this.elements.timer.textContent = this.timeLeft;
                
                // Time warning
                if (this.timeLeft <= 10) {
                    this.elements.timer.style.color = '#ff6b6b';
                    this.elements.timer.style.animation = 'pulse 1s infinite';
                }
                
                // Game over
                if (this.timeLeft <= 0) {
                    this.endGame();
                }
            }
        }, 1000);
    }
    
    // Generate a new multiplication question
    generateQuestion() {
        if (!this.isGameActive) return;
        
        const config = this.levelConfig[this.currentLevel];
        const table = config.tables[Math.floor(Math.random() * config.tables.length)];
        const multiplier = Math.floor(Math.random() * 12) + 1; // 1-12 range
        
        const correctAnswer = table * multiplier;
        
        // Generate wrong answers (distractors)
        const wrongAnswers = [];
        while (wrongAnswers.length < 3) {
            let wrongAnswer;
            // Create plausible wrong answers
            const variation = Math.floor(Math.random() * 20) - 10; // ±10 variation
            wrongAnswer = correctAnswer + variation;
            
            // Ensure wrong answer is positive and not the correct answer
            if (wrongAnswer > 0 && wrongAnswer !== correctAnswer && !wrongAnswers.includes(wrongAnswer)) {
                wrongAnswers.push(wrongAnswer);
            }
        }
        
        // Shuffle answers
        const allAnswers = [correctAnswer, ...wrongAnswers];
        this.shuffleArray(allAnswers);
        
        // Store current question
        this.currentQuestion = {
            question: `${table} × ${multiplier}`,
            correctAnswer: correctAnswer,
            answers: allAnswers
        };
        
        // Update display
        this.elements.questionText.textContent = this.currentQuestion.question + " = ?";
        this.generateAnswerButtons();
    }
    
    // Generate answer buttons
    generateAnswerButtons() {
        this.elements.answerGrid.innerHTML = '';
        
        this.currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.addEventListener('click', () => this.checkAnswer(answer, button));
            
            // Add keyboard support
            button.setAttribute('tabindex', index + 1);
            
            this.elements.answerGrid.appendChild(button);
        });
    }
    
    // Check if answer is correct
    checkAnswer(selectedAnswer, buttonElement) {
        if (!this.isGameActive || this.isPaused) return;
        
        const isCorrect = selectedAnswer === this.currentQuestion.correctAnswer;
        
        // Disable all buttons temporarily
        const allButtons = this.elements.answerGrid.querySelectorAll('.answer-btn');
        allButtons.forEach(btn => btn.disabled = true);
        
        if (isCorrect) {
            // Correct answer
            buttonElement.classList.add('correct');
            this.correctAnswers++;
            this.score += this.currentLevel * 10;
            this.timeLeft += 3; // Bonus time
            
            this.elements.feedbackMessage.textContent = "Excellent! ✨";
            this.elements.feedbackMessage.style.color = '#00b894';
            
            // Character celebration
            this.elements.character.style.animation = 'bounce 0.5s ease';
            
        } else {
            // Wrong answer
            buttonElement.classList.add('incorrect');
            this.lives--;
            
            this.elements.feedbackMessage.textContent = `Oops! The answer was ${this.currentQuestion.correctAnswer}`;
            this.elements.feedbackMessage.style.color = '#d63031';
            
            // Show correct answer
            allButtons.forEach(btn => {
                if (parseInt(btn.textContent) === this.currentQuestion.correctAnswer) {
                    btn.classList.add('correct');
                }
            });
        }
        
        this.questionsAnswered++;
        this.updateDisplay();
        this.updateProgress();
        
        // Check for level up or game over
        setTimeout(() => {
            if (this.lives <= 0) {
                this.endGame();
            } else if (this.questionsAnswered % 5 === 0 && isCorrect) {
                this.checkLevelUp();
            } else {
                this.generateQuestion();
            }
        }, 1500);
    }
    
    // Check if player should level up
    checkLevelUp() {
        const accuracy = (this.correctAnswers / this.questionsAnswered) * 100;
        
        if (accuracy >= 80 && this.currentLevel < 4) {
            this.currentLevel++;
            this.timeLeft += this.levelConfig[this.currentLevel].timeBonus;
            
            this.showAchievement(`Level Up! Welcome to Level ${this.currentLevel}! 🎉`);
            this.elements.storyText.textContent = `Level ${this.currentLevel}: ${this.levelConfig[this.currentLevel].description}`;
            
            setTimeout(() => this.generateQuestion(), 2000);
        } else {
            this.generateQuestion();
        }
    }
    
    // Show hint for current question
    showHint() {
        if (!this.currentQuestion || !this.isGameActive) return;
        
        const parts = this.currentQuestion.question.split(' × ');
        const num1 = parseInt(parts[0]);
        const num2 = parseInt(parts[1]);
        
        let hint = "";
        if (num1 <= 5 || num2 <= 5) {
            hint = `Try counting by ${num1}s: ${num1}, ${num1*2}, ${num1*3}...`;
        } else {
            hint = `Break it down: ${num1} × ${num2} = ${num1} × ${Math.floor(num2/2)} × 2`;
        }
        
        this.elements.feedbackMessage.textContent = `💡 Hint: ${hint}`;
        this.elements.feedbackMessage.style.color = '#fdcb6e';
        
        setTimeout(() => {
            this.elements.feedbackMessage.textContent = '';
        }, 3000);
    }
    
    // Toggle pause
    togglePause() {
        this.isPaused = !this.isPaused;
        this.elements.pauseBtn.textContent = this.isPaused ? 'RESUME' : 'PAUSE';
        
        if (this.isPaused) {
            this.elements.feedbackMessage.textContent = 'Game Paused ⏸️';
            this.elements.feedbackMessage.style.color = '#fdcb6e';
        } else {
            this.elements.feedbackMessage.textContent = '';
        }
    }
    
    // End the game
    endGame() {
        this.isGameActive = false;
        clearInterval(this.timer);
        
        // Calculate final stats
        const accuracy = this.questionsAnswered > 0 ? Math.round((this.correctAnswers / this.questionsAnswered) * 100) : 0;
        
        // Show final message
        let message = "";
        if (accuracy >= 90) {
            message = `🏆 Outstanding! ${accuracy}% accuracy!`;
        } else if (accuracy >= 70) {
            message = `⭐ Great job! ${accuracy}% accuracy!`;
        } else {
            message = `💪 Keep practicing! ${accuracy}% accuracy!`;
        }
        
        this.elements.storyText.textContent = `Adventure Complete! Final Score: ${this.score}`;
        this.elements.questionText.textContent = message;
        this.elements.answerGrid.innerHTML = '';
        
        // Reset UI
        this.elements.startBtn.style.display = 'inline-block';
        this.elements.startBtn.textContent = 'PLAY AGAIN';
        this.elements.pauseBtn.style.display = 'none';
        this.elements.hintBtn.style.display = 'none';
        
        // Reset game state
        this.resetGame();
    }
    
    // Reset game state
    resetGame() {
        this.currentLevel = 1;
        this.score = 0;
        this.lives = 3;
        this.timeLeft = 60;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.updateDisplay();
        this.elements.progressFill.style.width = '0%';
        this.elements.feedbackMessage.textContent = '';
    }
    
    // Update display elements
    updateDisplay() {
        this.elements.score.textContent = this.score;
        this.elements.level.textContent = this.currentLevel;
        this.elements.timer.textContent = this.timeLeft;
        
        // Update lives display
        const heartsArray = Array(Math.max(0, this.lives)).fill('❤️');
        const emptyHearts = Array(Math.max(0, 3 - this.lives)).fill('🤍');
        this.elements.lives.textContent = heartsArray.concat(emptyHearts).join('');
    }
    
    // Update progress bar
    updateProgress() {
        const progress = (this.questionsAnswered % 5) * 20;
        this.elements.progressFill.style.width = progress + '%';
    }
    
    // Show achievement popup
    showAchievement(text) {
        this.elements.achievementText.textContent = text;
        this.elements.achievementPopup.classList.add('show');
        
        setTimeout(() => {
            this.elements.achievementPopup.classList.remove('show');
        }, 2000);
    }
    
    // Show tooltip
    showTooltip(event) {
        const element = event.target;
        const title = element.getAttribute('title');
        
        if (title) {
            this.elements.tooltip.textContent = title;
            this.elements.tooltip.style.left = event.pageX + 10 + 'px';
            this.elements.tooltip.style.top = event.pageY - 30 + 'px';
            this.elements.tooltip.classList.add('show');
            
            // Remove title to prevent default tooltip
            element.removeAttribute('title');
            element.setAttribute('data-title', title);
        }
    }
    
    // Hide tooltip
    hideTooltip() {
        this.elements.tooltip.classList.remove('show');
        
        // Restore title attributes
        document.querySelectorAll('[data-title]').forEach(el => {
            el.setAttribute('title', el.getAttribute('data-title'));
            el.removeAttribute('data-title');
        });
    }
    
    // Handle keyboard input
    handleKeyboard(event) {
        if (!this.isGameActive) return;
        
        // Number keys 1-4 for answer selection
        if (event.key >= '1' && event.key <= '4') {
            const buttonIndex = parseInt(event.key) - 1;
            const buttons = this.elements.answerGrid.querySelectorAll('.answer-btn');
            if (buttons[buttonIndex] && !buttons[buttonIndex].disabled) {
                buttons[buttonIndex].click();
            }
        }
        
        // Space for pause
        if (event.key === ' ') {
            event.preventDefault();
            this.togglePause();
        }
        
        // H for hint
        if (event.key.toLowerCase() === 'h') {
            this.showHint();
        }
    }
    
    // Utility function to shuffle array
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create game instance
    const game = new MathQuestGame();
    
    // Add some visual enhancements
    const addSparkles = () => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 3s ease-out forwards';
        sparkle.style.zIndex = '999';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    };
    
    // Add CSS for sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% { opacity: 1; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
            100% { opacity: 0; transform: scale(0) rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
    
    // Add sparkles periodically when game is active
    setInterval(() => {
        if (game.isGameActive && !game.isPaused && Math.random() < 0.3) {
            addSparkles();
        }
    }, 2000);
    
    console.log('Math Quest Adventure initialized! 🧙‍♂️✨');
});