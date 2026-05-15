// Game state management and configuration
class PastTenseVerbShooter {
    constructor() {
        // Game configuration
        this.timePerQuestion = 10; // seconds
        this.totalQuestions = 10;
        this.currentQuestion = 0;
        this.score = 0;
        this.timer = this.timePerQuestion;
        this.gameActive = false;
        this.timerInterval = null;
        
        // Question bank with present tense actions and their past tense forms
        this.questions = [
            {
                action: "The child is running",
                character: "🏃‍♂️",
                correct: "ran",
                options: ["ran", "run", "running", "runs"]
            },
            {
                action: "The girl is jumping",
                character: "🤸‍♀️", 
                correct: "jumped",
                options: ["jumped", "jump", "jumping", "jumps"]
            },
            {
                action: "The boy is eating",
                character: "🍽️",
                correct: "ate",
                options: ["ate", "eat", "eating", "eats"]
            },
            {
                action: "The child is sleeping",
                character: "😴",
                correct: "slept",
                options: ["slept", "sleep", "sleeping", "sleeps"]
            },
            {
                action: "The girl is walking",
                character: "🚶‍♀️",
                correct: "walked",
                options: ["walked", "walk", "walking", "walks"]
            },
            {
                action: "The boy is playing",
                character: "⚽",
                correct: "played",
                options: ["played", "play", "playing", "plays"]
            },
            {
                action: "The child is reading",
                character: "📖",
                correct: "read",
                options: ["read", "reads", "reading", "readed"]
            },
            {
                action: "The girl is singing",
                character: "🎤",
                correct: "sang",
                options: ["sang", "sing", "singing", "sings"]
            },
            {
                action: "The boy is swimming",
                character: "🏊‍♂️",
                correct: "swam",
                options: ["swam", "swim", "swimming", "swims"]
            },
            {
                action: "The child is dancing",
                character: "💃",
                correct: "danced",
                options: ["danced", "dance", "dancing", "dances"]
            }
        ];
        
        // Shuffle questions for variety
        this.shuffleArray(this.questions);
        
        // DOM element references
        this.elements = {
            score: document.getElementById('score'),
            timer: document.getElementById('timer'),
            progressBar: document.getElementById('progressBar'),
            actionDisplay: document.getElementById('actionDisplay'),
            character: document.getElementById('character'),
            actionText: document.getElementById('actionText'),
            crosshair: document.getElementById('crosshair'),
            verbOptions: document.getElementById('verbOptions'),
            feedback: document.getElementById('feedback'),
            nextBtn: document.getElementById('nextBtn'),
            tryAgainBtn: document.getElementById('tryAgainBtn'),
            startBtn: document.getElementById('startBtn'),
            resultsScreen: document.getElementById('resultsScreen'),
            finalScore: document.getElementById('finalScore'),
            performanceMessage: document.getElementById('performanceMessage'),
            playAgainBtn: document.getElementById('playAgainBtn'),
            hintTooltip: document.getElementById('hintTooltip')
        };
        
        this.initializeEventListeners();
        this.setupMouseTracking();
    }
    
    // Initialize all event listeners for game interaction
    initializeEventListeners() {
        // Button event listeners
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.tryAgainBtn.addEventListener('click', () => this.tryAgain());
        this.elements.playAgainBtn.addEventListener('click', () => this.resetGame());
        
        // Touch and click events for verb options will be added dynamically
        // Show hint tooltip on game area hover
        document.querySelector('.game-area').addEventListener('mouseenter', () => {
            if (this.gameActive) {
                this.showHint();
            }
        });
        
        document.querySelector('.game-area').addEventListener('mouseleave', () => {
            this.hideHint();
        });
    }
    
    // Track mouse movement for crosshair positioning
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            if (this.gameActive) {
                this.elements.crosshair.style.left = e.clientX + 'px';
                this.elements.crosshair.style.top = e.clientY + 'px';
                this.elements.crosshair.style.display = 'block';
            } else {
                this.elements.crosshair.style.display = 'none';
            }
        });
    }
    
    // Utility function to shuffle array elements
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    // Start the game
    startGame() {
        this.gameActive = true;
        this.currentQuestion = 0;
        this.score = 0;
        this.elements.startBtn.style.display = 'none';
        this.elements.resultsScreen.style.display = 'none';
        this.updateUI();
        this.loadQuestion();
    }
    
    // Load current question and display options
    loadQuestion() {
        if (this.currentQuestion >= this.totalQuestions) {
            this.endGame();
            return;
        }
        
        const question = this.questions[this.currentQuestion];
        
        // Update action display
        this.elements.character.textContent = question.character;
        this.elements.actionText.textContent = question.action;
        
        // Reset timer
        this.timer = this.timePerQuestion;
        this.startTimer();
        
        // Create floating verb options
        this.createVerbOptions(question.options, question.correct);
        
        // Hide control buttons
        this.elements.nextBtn.style.display = 'none';
        this.elements.tryAgainBtn.style.display = 'none';
        
        // Update progress bar
        this.updateProgressBar();
    }
    
    // Create floating verb options around the screen
    createVerbOptions(options, correctAnswer) {
        this.elements.verbOptions.innerHTML = '';
        
        // Shuffle options for random positioning
        const shuffledOptions = [...options];
        this.shuffleArray(shuffledOptions);
        
        shuffledOptions.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'verb-option';
            optionElement.textContent = option;
            
            // Position options to avoid overlap
            const position = this.getRandomPosition(index, shuffledOptions.length);
            optionElement.style.left = position.x + '%';
            optionElement.style.top = position.y + '%';
            
            // Add random animation delay for variety
            optionElement.style.animationDelay = (Math.random() * 2) + 's';
            
            // Add click/touch event listener
            optionElement.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectOption(option, correctAnswer, optionElement);
            });
            
            // Add touch event for mobile devices
            optionElement.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.selectOption(option, correctAnswer, optionElement);
            });
            
            this.elements.verbOptions.appendChild(optionElement);
        });
    }
    
    // Generate random positions for verb options to avoid overlap
    getRandomPosition(index, total) {
        const gameArea = document.querySelector('.game-area');
        const rect = gameArea.getBoundingClientRect();
        
        // Define safe zones to avoid overlapping with action display
        const safeZones = [
            { x: 5, y: 60 },   // Bottom left
            { x: 75, y: 60 },  // Bottom right
            { x: 5, y: 15 },   // Top left
            { x: 75, y: 15 },  // Top right
            { x: 40, y: 75 },  // Bottom center
            { x: 15, y: 40 },  // Middle left
            { x: 75, y: 40 },  // Middle right
            { x: 60, y: 15 }   // Top right-center
        ];
        
        return safeZones[index % safeZones.length];
    }
    
    // Handle option selection
    selectOption(selectedOption, correctAnswer, optionElement) {
        if (!this.gameActive) return;
        
        this.stopTimer();
        
        // Disable all options to prevent multiple clicks
        const allOptions = document.querySelectorAll('.verb-option');
        allOptions.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        if (selectedOption === correctAnswer) {
            this.handleCorrectAnswer(optionElement);
        } else {
            this.handleIncorrectAnswer(optionElement, correctAnswer);
        }
    }
    
    // Handle correct answer selection
    handleCorrectAnswer(optionElement) {
        this.score++;
        optionElement.classList.add('correct');
        
        // Show positive feedback
        this.showFeedback('Excellent! 🎉', 'correct');
        
        // Update score display
        this.updateUI();
        
        // Show next button after delay
        setTimeout(() => {
            this.elements.nextBtn.style.display = 'inline-block';
        }, 1500);
    }
    
    // Handle incorrect answer selection
    handleIncorrectAnswer(optionElement, correctAnswer) {
        optionElement.classList.add('incorrect');
        
        // Show encouraging feedback
        this.showFeedback('Good try! Try again! 💪', 'incorrect');
        
        // Highlight correct answer
        setTimeout(() => {
            const allOptions = document.querySelectorAll('.verb-option');
            allOptions.forEach(option => {
                if (option.textContent === correctAnswer) {
                    option.classList.add('correct');
                    option.style.pointerEvents = 'none';
                }
            });
            
            // Show try again button
            this.elements.tryAgainBtn.style.display = 'inline-block';
        }, 1000);
    }
    
    // Show feedback message
    showFeedback(message, type) {
        this.elements.feedback.textContent = message;
        this.elements.feedback.className = `feedback show ${type}`;
        
        setTimeout(() => {
            this.elements.feedback.classList.remove('show');
        }, 2000);
    }
    
    // Move to next question
    nextQuestion() {
        this.currentQuestion++;
        this.loadQuestion();
    }
    
    // Retry current question
    tryAgain() {
        this.loadQuestion();
    }
    
    // Start countdown timer
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer--;
            this.elements.timer.textContent = this.timer;
            
            // Change timer color when time is running out
            if (this.timer <= 3) {
                this.elements.timer.style.color = '#e74c3c';
            } else {
                this.elements.timer.style.color = '#2c3e50';
            }
            
            if (this.timer <= 0) {
                this.handleTimeUp();
            }
        }, 1000);
    }
    
    // Stop the timer
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    // Handle when time runs out
    handleTimeUp() {
        this.stopTimer();
        
        // Disable all options
        const allOptions = document.querySelectorAll('.verb-option');
        allOptions.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Show time up feedback
        this.showFeedback('Time\'s up! ⏰', 'incorrect');
        
        // Highlight correct answer
        const correctAnswer = this.questions[this.currentQuestion].correct;
        setTimeout(() => {
            allOptions.forEach(option => {
                if (option.textContent === correctAnswer) {
                    option.classList.add('correct');
                }
            });
            
            this.elements.tryAgainBtn.style.display = 'inline-block';
        }, 1000);
    }
    
    // Update UI elements
    updateUI() {
        this.elements.score.textContent = this.score;
        this.elements.timer.textContent = this.timer;
    }
    
    // Update progress bar
    updateProgressBar() {
        const progress = ((this.currentQuestion) / this.totalQuestions) * 100;
        this.elements.progressBar.style.width = progress + '%';
    }
    
    // End the game and show results
    endGame() {
        this.gameActive = false;
        this.stopTimer();
        this.elements.crosshair.style.display = 'none';
        
        // Calculate final progress
        this.elements.progressBar.style.width = '100%';
        
        // Show results screen
        this.elements.finalScore.textContent = this.score;
        
        // Generate performance message
        let message = '';
        const percentage = (this.score / this.totalQuestions) * 100;
        
        if (percentage >= 90) {
            message = 'Outstanding! You\'re a past tense master! 🌟';
        } else if (percentage >= 70) {
            message = 'Great job! You\'re doing really well! 👏';
        } else if (percentage >= 50) {
            message = 'Good effort! Keep practicing! 💪';
        } else {
            message = 'Nice try! Practice makes perfect! 🌈';
        }
        
        this.elements.performanceMessage.textContent = message;
        this.elements.resultsScreen.style.display = 'flex';
    }
    
    // Reset game to initial state
    resetGame() {
        this.gameActive = false;
        this.currentQuestion = 0;
        this.score = 0;
        this.timer = this.timePerQuestion;
        this.stopTimer();
        
        // Shuffle questions again for variety
        this.shuffleArray(this.questions);
        
        // Reset UI
        this.elements.resultsScreen.style.display = 'none';
        this.elements.startBtn.style.display = 'inline-block';
        this.elements.nextBtn.style.display = 'none';
        this.elements.tryAgainBtn.style.display = 'none';
        this.elements.verbOptions.innerHTML = '';
        this.elements.progressBar.style.width = '0%';
        this.elements.crosshair.style.display = 'none';
        
        this.updateUI();
    }
    
    // Show hint tooltip
    showHint() {
        this.elements.hintTooltip.classList.add('show');
        setTimeout(() => {
            this.hideHint();
        }, 3000);
    }
    
    // Hide hint tooltip
    hideHint() {
        this.elements.hintTooltip.classList.remove('show');
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create game instance
    const game = new PastTenseVerbShooter();
    
    // Add some initial instructions
    console.log('Past Tense Verb Shooter loaded successfully!');
    console.log('Instructions: Click "Start Game" to begin. Shoot the correct past tense verb for each action shown!');
});