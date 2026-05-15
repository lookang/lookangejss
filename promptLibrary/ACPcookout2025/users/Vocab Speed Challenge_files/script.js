// Game state management and vocabulary data
class VocabSpeedGame {
    constructor() {
        // Game configuration optimized for Secondary 1 Lower Progress students
        this.gameConfig = {
            timeLimit: 60, // 1 minute per game
            wordsPerLevel: 5,
            basePoints: 50,
            timeBonus: 10,
            accuracyBonus: 20
        };

        // Vocabulary database with Singapore curriculum alignment
        this.vocabularyData = [
            {
                word: "Diligent",
                definitions: [
                    "Working hard and carefully",
                    "Being lazy and careless", 
                    "Moving very quickly"
                ],
                correct: 0,
                sentence: "Sarah is a diligent student who always completes her homework on time."
            },
            {
                word: "Compassionate",
                definitions: [
                    "Being angry and upset",
                    "Showing kindness and concern for others",
                    "Acting without thinking"
                ],
                correct: 1,
                sentence: "The compassionate teacher helped the struggling student after class."
            },
            {
                word: "Persevere",
                definitions: [
                    "To give up easily",
                    "To continue trying despite difficulties",
                    "To work very slowly"
                ],
                correct: 1,
                sentence: "You must persevere through challenges to achieve your goals."
            },
            {
                word: "Innovative",
                definitions: [
                    "Following old traditions exactly",
                    "Being very expensive",
                    "Introducing new ideas or methods"
                ],
                correct: 2,
                sentence: "The innovative solution helped solve the environmental problem."
            },
            {
                word: "Resilient",
                definitions: [
                    "Able to recover quickly from difficulties",
                    "Being very fragile and weak",
                    "Always avoiding problems"
                ],
                correct: 0,
                sentence: "Children are often more resilient than adults when facing changes."
            },
            {
                word: "Collaborate",
                definitions: [
                    "To work alone on everything",
                    "To compete against others",
                    "To work together with others"
                ],
                correct: 2,
                sentence: "Students should collaborate on group projects to learn from each other."
            },
            {
                word: "Empathy",
                definitions: [
                    "Understanding and sharing others' feelings",
                    "Feeling sorry for yourself",
                    "Being completely emotionless"
                ],
                correct: 0,
                sentence: "Showing empathy helps build stronger friendships and relationships."
            },
            {
                word: "Integrity",
                definitions: [
                    "Being dishonest when convenient",
                    "Having strong moral principles",
                    "Changing your mind frequently"
                ],
                correct: 1,
                sentence: "A person with integrity always tells the truth even when it's difficult."
            }
        ];

        // Game state variables
        this.currentLevel = 1;
        this.score = 0;
        this.timeRemaining = this.gameConfig.timeLimit;
        this.wordsCompleted = 0;
        this.currentWordIndex = 0;
        this.gamePhase = 'mcq'; // 'mcq', 'typing', 'gameover'
        this.gameTimer = null;
        this.typingStartTime = null;
        this.totalTypingTime = 0;
        this.totalAccuracy = 0;
        this.bestWPM = 0;
        this.levelProgress = 0;

        // Shuffle vocabulary for variety
        this.shuffleArray(this.vocabularyData);
        
        this.initializeGame();
    }

    // Initialize game components and event listeners
    initializeGame() {
        this.updateUI();
        this.startMCQPhase();
        this.startGameTimer();
        
        // Add keyboard event listeners for better accessibility
        document.addEventListener('keydown', (e) => {
            if (this.gamePhase === 'mcq' && e.key >= '1' && e.key <= '3') {
                this.selectDefinition(parseInt(e.key) - 1);
            }
        });
    }

    // Utility function to shuffle array for randomization
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Start the main game timer
    startGameTimer() {
        this.gameTimer = setInterval(() => {
            this.timeRemaining--;
            this.updateUI();
            
            if (this.timeRemaining <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    // Initialize MCQ phase with current vocabulary word
    startMCQPhase() {
        this.gamePhase = 'mcq';
        const currentWord = this.vocabularyData[this.currentWordIndex];
        
        // Update UI elements
        document.getElementById('currentWord').textContent = currentWord.word;
        document.getElementById('mcqPhase').classList.remove('hidden');
        document.getElementById('typingPhase').classList.add('hidden');
        
        // Populate definition options
        const optionButtons = ['option1', 'option2', 'option3'];
        optionButtons.forEach((buttonId, index) => {
            const button = document.getElementById(buttonId);
            button.textContent = currentWord.definitions[index];
            button.className = 'option-btn'; // Reset button styling
            button.disabled = false;
        });
    }

    // Handle definition selection in MCQ phase
    selectDefinition(selectedIndex) {
        const currentWord = this.vocabularyData[this.currentWordIndex];
        const isCorrect = selectedIndex === currentWord.correct;
        
        // Visual feedback for selection
        const selectedButton = document.getElementById(`option${selectedIndex + 1}`);
        const correctButton = document.getElementById(`option${currentWord.correct + 1}`);
        
        if (isCorrect) {
            selectedButton.classList.add('correct');
            this.score += this.gameConfig.basePoints;
            this.showCelebration('Correct!', `+${this.gameConfig.basePoints} points`);
        } else {
            selectedButton.classList.add('incorrect');
            correctButton.classList.add('correct');
            this.showCelebration('Try again next time!', 'No points awarded');
        }
        
        // Disable all buttons to prevent multiple selections
        ['option1', 'option2', 'option3'].forEach(id => {
            document.getElementById(id).disabled = true;
        });
        
        // Proceed to typing phase after brief delay
        setTimeout(() => {
            if (isCorrect) {
                this.startTypingPhase();
            } else {
                this.nextWord();
            }
        }, 1500);
    }

    // Initialize typing phase for sentence practice
    startTypingPhase() {
        this.gamePhase = 'typing';
        const currentWord = this.vocabularyData[this.currentWordIndex];
        
        // Update UI for typing phase
        document.getElementById('mcqPhase').classList.add('hidden');
        document.getElementById('typingPhase').classList.remove('hidden');
        document.getElementById('targetSentence').textContent = currentWord.sentence;
        
        // Reset and focus typing input
        const typingInput = document.getElementById('typingInput');
        typingInput.value = '';
        typingInput.focus();
        
        // Record typing start time for WPM calculation
        this.typingStartTime = Date.now();
        
        // Reset typing statistics display
        document.getElementById('wpm').textContent = '0';
        document.getElementById('accuracy').textContent = '100%';
    }

    // Real-time typing validation and statistics
    checkTyping() {
        const typingInput = document.getElementById('typingInput');
        const targetSentence = this.vocabularyData[this.currentWordIndex].sentence;
        const typedText = typingInput.value;
        
        // Calculate accuracy
        const accuracy = this.calculateAccuracy(typedText, targetSentence);
        document.getElementById('accuracy').textContent = `${Math.round(accuracy)}%`;
        
        // Calculate WPM if user has been typing
        if (this.typingStartTime && typedText.length > 0) {
            const timeElapsed = (Date.now() - this.typingStartTime) / 1000 / 60; // minutes
            const wordsTyped = typedText.trim().split(/\s+/).length;
            const wpm = Math.round(wordsTyped / timeElapsed) || 0;
            document.getElementById('wpm').textContent = wpm.toString();
            
            // Update best WPM
            if (wpm > this.bestWPM) {
                this.bestWPM = wpm;
            }
        }
        
        // Check if sentence is completed correctly
        if (typedText.trim().toLowerCase() === targetSentence.toLowerCase()) {
            this.completeTypingPhase(accuracy);
        }
    }

    // Calculate typing accuracy percentage
    calculateAccuracy(typed, target) {
        if (typed.length === 0) return 100;
        
        const typedLower = typed.toLowerCase();
        const targetLower = target.toLowerCase();
        let correct = 0;
        
        for (let i = 0; i < Math.min(typedLower.length, targetLower.length); i++) {
            if (typedLower[i] === targetLower[i]) {
                correct++;
            }
        }
        
        return (correct / Math.max(typed.length, target.length)) * 100;
    }

    // Complete typing phase and award points
    completeTypingPhase(accuracy) {
        const typingTime = (Date.now() - this.typingStartTime) / 1000;
        const wpm = Math.round((this.vocabularyData[this.currentWordIndex].sentence.split(' ').length / (typingTime / 60)));
        
        // Calculate bonus points
        let bonusPoints = 0;
        if (accuracy >= 95) bonusPoints += this.gameConfig.accuracyBonus;
        if (wpm >= 30) bonusPoints += this.gameConfig.timeBonus;
        
        this.score += bonusPoints;
        this.totalTypingTime += typingTime;
        this.totalAccuracy += accuracy;
        
        // Show completion celebration
        this.showCelebration('Sentence Complete!', `+${bonusPoints} bonus points`);
        
        setTimeout(() => {
            this.nextWord();
        }, 1500);
    }

    // Progress to next word or level
    nextWord() {
        this.wordsCompleted++;
        this.levelProgress++;
        this.currentWordIndex++;
        
        // Check if level is complete
        if (this.levelProgress >= this.gameConfig.wordsPerLevel) {
            this.levelProgress = 0;
            this.currentLevel++;
            this.showCelebration('Level Complete!', `Level ${this.currentLevel} unlocked!`);
        }
        
        // Check if all words are completed or game should end
        if (this.currentWordIndex >= this.vocabularyData.length || this.timeRemaining <= 0) {
            setTimeout(() => this.endGame(), 1500);
            return;
        }
        
        this.updateUI();
        setTimeout(() => {
            this.startMCQPhase();
        }, this.levelProgress === 0 ? 2000 : 500);
    }

    // Display celebration messages with animation
    showCelebration(message, points) {
        const celebration = document.getElementById('celebration');
        document.getElementById('celebrationText').textContent = message;
        document.getElementById('pointsEarned').textContent = points;
        
        celebration.classList.remove('hidden');
        setTimeout(() => {
            celebration.classList.add('hidden');
        }, 1200);
    }

    // Update all UI elements with current game state
    updateUI() {
        document.getElementById('score').textContent = this.score.toString();
        document.getElementById('timer').textContent = this.timeRemaining.toString();
        document.getElementById('level').textContent = this.currentLevel.toString();
        document.getElementById('wordsCompleted').textContent = this.wordsCompleted.toString();
        
        // Update progress bar
        const progressPercentage = (this.levelProgress / this.gameConfig.wordsPerLevel) * 100;
        document.getElementById('progressFill').style.width = `${progressPercentage}%`;
        document.getElementById('progressText').textContent = `${this.levelProgress}/${this.gameConfig.wordsPerLevel} words`;
    }

    // End game and show final statistics
    endGame() {
        clearInterval(this.gameTimer);
        this.gamePhase = 'gameover';
        
        // Hide game phases and show game over screen
        document.getElementById('mcqPhase').classList.add('hidden');
        document.getElementById('typingPhase').classList.add('hidden');
        document.getElementById('gameOver').classList.remove('hidden');
        
        // Calculate and display final statistics
        const avgAccuracy = this.wordsCompleted > 0 ? Math.round(this.totalAccuracy / this.wordsCompleted) : 0;
        
        document.getElementById('finalScore').textContent = this.score.toString();
        document.getElementById('finalWords').textContent = this.wordsCompleted.toString();
        document.getElementById('bestWPM').textContent = this.bestWPM.toString();
        document.getElementById('avgAccuracy').textContent = `${avgAccuracy}%`;
    }

    // Restart game with fresh state
    restart() {
        // Reset all game state variables
        this.currentLevel = 1;
        this.score = 0;
        this.timeRemaining = this.gameConfig.timeLimit;
        this.wordsCompleted = 0;
        this.currentWordIndex = 0;
        this.gamePhase = 'mcq';
        this.typingStartTime = null;
        this.totalTypingTime = 0;
        this.totalAccuracy = 0;
        this.bestWPM = 0;
        this.levelProgress = 0;
        
        // Clear existing timer
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }
        
        // Shuffle vocabulary for new game variety
        this.shuffleArray(this.vocabularyData);
        
        // Reset UI and restart
        document.getElementById('gameOver').classList.add('hidden');
        this.updateUI();
        this.startMCQPhase();
        this.startGameTimer();
    }
}

// Global game instance and functions for HTML event handlers
let game;

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    game = new VocabSpeedGame();
});

// Global functions called from HTML onclick handlers
function selectDefinition(index) {
    if (game && game.gamePhase === 'mcq') {
        game.selectDefinition(index);
    }
}

function checkTyping() {
    if (game && game.gamePhase === 'typing') {
        game.checkTyping();
    }
}

function restartGame() {
    if (game) {
        game.restart();
    }
}

// Prevent context menu on right click for better mobile experience
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle visibility change to pause/resume game
document.addEventListener('visibilitychange', () => {
    if (game && game.gameTimer) {
        if (document.hidden) {
            // Pause game when tab is not visible
            clearInterval(game.gameTimer);
        } else {
            // Resume game when tab becomes visible again
            game.startGameTimer();
        }
    }
});