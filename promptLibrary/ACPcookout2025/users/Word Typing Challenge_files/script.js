// Word Typing Challenge Game - JavaScript Implementation
// Designed for Secondary 1 English Language students
// Focuses on vocabulary building and typing speed improvement

class WordTypingGame {
    constructor() {
        // Game state variables
        this.gameState = 'stopped'; // stopped, playing, paused
        this.currentWordIndex = 0;
        this.score = 0;
        this.level = 1;
        this.wordsTypedCorrect = 0;
        this.totalWordsAttempted = 0;
        this.startTime = null;
        this.gameTimer = null;
        this.timeLeft = 60;
        this.currentWord = '';
        
        // Typing metrics
        this.correctCharacters = 0;
        this.totalCharacters = 0;
        
        // Word database for Secondary 1 level with meanings
        this.wordDatabase = [
            // Level 1 - Basic vocabulary
            { word: 'adventure', meaning: 'An exciting or unusual experience', level: 1 },
            { word: 'brilliant', meaning: 'Very bright or clever', level: 1 },
            { word: 'curious', meaning: 'Eager to know or learn something', level: 1 },
            { word: 'discover', meaning: 'To find something for the first time', level: 1 },
            { word: 'enormous', meaning: 'Very large in size or quantity', level: 1 },
            { word: 'fantastic', meaning: 'Extremely good or impressive', level: 1 },
            { word: 'generous', meaning: 'Willing to give more than necessary', level: 1 },
            { word: 'hilarious', meaning: 'Extremely funny', level: 1 },
            { word: 'incredible', meaning: 'Impossible to believe; amazing', level: 1 },
            { word: 'journey', meaning: 'An act of traveling from one place to another', level: 1 },
            
            // Level 2 - Intermediate vocabulary
            { word: 'accomplish', meaning: 'To achieve or complete successfully', level: 2 },
            { word: 'beneficial', meaning: 'Favorable or advantageous', level: 2 },
            { word: 'collaborate', meaning: 'To work jointly with others', level: 2 },
            { word: 'demonstrate', meaning: 'To clearly show the existence of something', level: 2 },
            { word: 'elaborate', meaning: 'To develop or present in detail', level: 2 },
            { word: 'fascinating', meaning: 'Extremely interesting', level: 2 },
            { word: 'gracious', meaning: 'Courteous, kind, and pleasant', level: 2 },
            { word: 'harmonious', meaning: 'Forming a pleasing combination', level: 2 },
            { word: 'innovative', meaning: 'Featuring new methods or ideas', level: 2 },
            { word: 'magnificent', meaning: 'Extremely beautiful or impressive', level: 2 },
            
            // Level 3 - Advanced vocabulary
            { word: 'articulate', meaning: 'To express thoughts clearly', level: 3 },
            { word: 'conscientious', meaning: 'Careful and thorough', level: 3 },
            { word: 'distinguished', meaning: 'Successful and commanding respect', level: 3 },
            { word: 'extraordinary', meaning: 'Very unusual or remarkable', level: 3 },
            { word: 'fundamental', meaning: 'Forming a necessary base or core', level: 3 },
            { word: 'intellectual', meaning: 'Relating to the ability to think', level: 3 },
            { word: 'perseverance', meaning: 'Persistence in doing something', level: 3 },
            { word: 'sophisticated', meaning: 'Having great knowledge or experience', level: 3 },
            { word: 'tremendous', meaning: 'Very great in amount or intensity', level: 3 },
            { word: 'understanding', meaning: 'The ability to comprehend something', level: 3 }
        ];
        
        this.currentWords = [];
        this.nextWordsQueue = [];
        
        // Initialize DOM elements
        this.initializeElements();
        this.setupEventListeners();
        this.resetGame();
    }
    
    // Initialize DOM element references
    initializeElements() {
        this.elements = {
            score: document.getElementById('score'),
            wpm: document.getElementById('wpm'),
            accuracy: document.getElementById('accuracy'),
            level: document.getElementById('level'),
            progress: document.getElementById('progress'),
            currentWord: document.getElementById('currentWord'),
            wordMeaning: document.getElementById('wordMeaning'),
            typeInput: document.getElementById('typeInput'),
            inputFeedback: document.getElementById('inputFeedback'),
            startBtn: document.getElementById('startBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            resetBtn: document.getElementById('resetBtn'),
            timer: document.getElementById('timer'),
            nextWords: document.getElementById('nextWords'),
            resultsModal: document.getElementById('resultsModal'),
            finalScore: document.getElementById('finalScore'),
            wordsTyped: document.getElementById('wordsTyped'),
            finalWPM: document.getElementById('finalWPM'),
            finalAccuracy: document.getElementById('finalAccuracy'),
            finalLevel: document.getElementById('finalLevel'),
            playAgainBtn: document.getElementById('playAgainBtn'),
            closeModalBtn: document.getElementById('closeModalBtn'),
            tooltip: document.getElementById('tooltip')
        };
    }
    
    // Setup event listeners for user interactions
    setupEventListeners() {
        // Button event listeners
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.pauseBtn.addEventListener('click', () => this.pauseGame());
        this.elements.resetBtn.addEventListener('click', () => this.resetGame());
        this.elements.playAgainBtn.addEventListener('click', () => this.playAgain());
        this.elements.closeModalBtn.addEventListener('click', () => this.closeModal());
        
        // Input event listeners
        this.elements.typeInput.addEventListener('input', (e) => this.handleTyping(e));
        this.elements.typeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkWord();
            }
        });
        
        // Tooltip event listeners for better UX in iframe
        this.setupTooltips();
        
        // Prevent context menu on mobile for better touch experience
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Focus input when game starts
        this.elements.typeInput.addEventListener('focus', () => {
            if (this.gameState === 'stopped') {
                this.elements.inputFeedback.textContent = 'Click Start to begin typing!';
            }
        });
    }
    
    // Setup tooltips for better information display in iframe
    setupTooltips() {
        const elementsWithTooltips = [
            { element: document.querySelector('.game-header'), text: 'Word Typing Challenge - Build vocabulary and improve typing speed' },
            { element: this.elements.wordMeaning, text: 'Hover to see full definition and usage examples' }
        ];
        
        elementsWithTooltips.forEach(({ element, text }) => {
            if (element) {
                element.addEventListener('mouseenter', (e) => this.showTooltip(e, text));
                element.addEventListener('mouseleave', () => this.hideTooltip());
                element.addEventListener('mousemove', (e) => this.moveTooltip(e));
            }
        });
    }
    
    // Tooltip display functions
    showTooltip(event, text) {
        this.elements.tooltip.textContent = text;
        this.elements.tooltip.style.opacity = '1';
        this.moveTooltip(event);
    }
    
    hideTooltip() {
        this.elements.tooltip.style.opacity = '0';
    }
    
    moveTooltip(event) {
        const tooltip = this.elements.tooltip;
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = `${event.clientX - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    }
    
    // Generate word list based on current level
    generateWordList() {
        const levelWords = this.wordDatabase.filter(wordObj => wordObj.level <= this.level);
        
        // Shuffle words for variety
        for (let i = levelWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [levelWords[i], levelWords[j]] = [levelWords[j], levelWords[i]];
        }
        
        this.currentWords = levelWords.slice(0, 20); // Use 20 words per session
        this.currentWordIndex = 0;
        this.updateNextWordsDisplay();
    }
    
    // Update the display of upcoming words
    updateNextWordsDisplay() {
        const nextWords = this.currentWords
            .slice(this.currentWordIndex + 1, this.currentWordIndex + 4)
            .map(wordObj => wordObj.word)
            .join(', ');
        this.elements.nextWords.textContent = nextWords;
    }
    
    // Start the game
    startGame() {
        if (this.gameState === 'paused') {
            this.resumeGame();
            return;
        }
        
        this.gameState = 'playing';
        this.startTime = Date.now();
        this.generateWordList();
        this.showNextWord();
        this.startTimer();
        
        // Update UI
        this.elements.startBtn.disabled = true;
        this.elements.pauseBtn.disabled = false;
        this.elements.typeInput.disabled = false;
        this.elements.typeInput.focus();
        this.elements.inputFeedback.textContent = 'Type the word above!';
        
        console.log('Game started - Level:', this.level);
    }
    
    // Pause the game
    pauseGame() {
        if (this.gameState !== 'playing') return;
        
        this.gameState = 'paused';
        clearInterval(this.gameTimer);
        
        // Update UI
        this.elements.startBtn.disabled = false;
        this.elements.startBtn.textContent = 'Resume';
        this.elements.pauseBtn.disabled = true;
        this.elements.typeInput.disabled = true;
        this.elements.inputFeedback.textContent = 'Game paused. Click Resume to continue.';
        
        console.log('Game paused');
    }
    
    // Resume the game
    resumeGame() {
        this.gameState = 'playing';
        this.startTimer();
        
        // Update UI
        this.elements.startBtn.disabled = true;
        this.elements.startBtn.textContent = 'Start Game';
        this.elements.pauseBtn.disabled = false;
        this.elements.typeInput.disabled = false;
        this.elements.typeInput.focus();
        this.elements.inputFeedback.textContent = 'Type the word above!';
        
        console.log('Game resumed');
    }
    
    // Reset the game to initial state
    resetGame() {
        this.gameState = 'stopped';
        this.currentWordIndex = 0;
        this.score = 0;
        this.level = 1;
        this.wordsTypedCorrect = 0;
        this.totalWordsAttempted = 0;
        this.timeLeft = 60;
        this.correctCharacters = 0;
        this.totalCharacters = 0;
        
        clearInterval(this.gameTimer);
        
        // Reset UI
        this.updateDisplay();
        this.elements.currentWord.textContent = 'Click Start to Begin';
        this.elements.wordMeaning.textContent = '';
        this.elements.typeInput.value = '';
        this.elements.typeInput.disabled = true;
        this.elements.inputFeedback.textContent = '';
        this.elements.nextWords.textContent = '';
        
        this.elements.startBtn.disabled = false;
        this.elements.startBtn.textContent = 'Start Game';
        this.elements.pauseBtn.disabled = true;
        
        // Reset visual states
        this.elements.currentWord.className = 'current-word';
        
        console.log('Game reset');
    }
    
    // Start the game timer
    startTimer() {
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            this.elements.timer.textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    // Show the next word in sequence
    showNextWord() {
        if (this.currentWordIndex >= this.currentWords.length) {
            this.levelUp();
            return;
        }
        
        const wordObj = this.currentWords[this.currentWordIndex];
        this.currentWord = wordObj.word;
        this.elements.currentWord.textContent = this.currentWord;
        this.elements.wordMeaning.textContent = wordObj.meaning;
        this.elements.typeInput.value = '';
        this.elements.currentWord.className = 'current-word';
        
        this.updateNextWordsDisplay();
        
        console.log('Showing word:', this.currentWord);
    }
    
    // Handle typing input with real-time feedback
    handleTyping(event) {
        if (this.gameState !== 'playing') return;
        
        const typedText = event.target.value.toLowerCase().trim();
        const targetWord = this.currentWord.toLowerCase();
        
        // Real-time feedback
        if (targetWord.startsWith(typedText)) {
            this.elements.inputFeedback.textContent = 'Keep typing...';
            this.elements.inputFeedback.className = 'input-feedback correct';
        } else {
            this.elements.inputFeedback.textContent = 'Check your spelling!';
            this.elements.inputFeedback.className = 'input-feedback incorrect';
        }
        
        // Auto-check when word length matches
        if (typedText.length === targetWord.length) {
            setTimeout(() => this.checkWord(), 100);
        }
    }
    
    // Check if the typed word is correct
    checkWord() {
        if (this.gameState !== 'playing') return;
        
        const typedWord = this.elements.typeInput.value.toLowerCase().trim();
        const targetWord = this.currentWord.toLowerCase();
        
        this.totalWordsAttempted++;
        this.totalCharacters += typedWord.length;
        
        if (typedWord === targetWord) {
            // Correct word
            this.wordsTypedCorrect++;
            this.correctCharacters += typedWord.length;
            this.score += this.calculateScore(targetWord.length);
            
            // Visual feedback
            this.elements.currentWord.className = 'current-word correct';
            this.elements.inputFeedback.textContent = 'Correct! Well done!';
            this.elements.inputFeedback.className = 'input-feedback correct';
            
            console.log('Correct word:', targetWord);
            
            // Move to next word after short delay
            setTimeout(() => {
                this.currentWordIndex++;
                this.showNextWord();
            }, 800);
            
        } else {
            // Incorrect word
            this.elements.currentWord.className = 'current-word incorrect';
            this.elements.inputFeedback.textContent = `Incorrect! The word was "${this.currentWord}"`;
            this.elements.inputFeedback.className = 'input-feedback incorrect';
            
            console.log('Incorrect word. Expected:', targetWord, 'Got:', typedWord);
            
            // Move to next word after showing correct answer
            setTimeout(() => {
                this.currentWordIndex++;
                this.showNextWord();
            }, 1500);
        }
        
        this.updateDisplay();
    }
    
    // Calculate score based on word difficulty and speed
    calculateScore(wordLength) {
        const baseScore = wordLength * 10;
        const levelMultiplier = this.level;
        const timeBonus = Math.max(0, this.timeLeft / 60);
        
        return Math.round(baseScore * levelMultiplier * (1 + timeBonus));
    }
    
    // Level up when all words in current level are completed
    levelUp() {
        if (this.level < 3) {
            this.level++;
            this.timeLeft += 30; // Bonus time for leveling up
            this.generateWordList();
            this.showNextWord();
            
            this.elements.inputFeedback.textContent = `Level Up! Now at Level ${this.level}`;
            this.elements.inputFeedback.className = 'input-feedback correct';
            
            console.log('Level up! New level:', this.level);
        } else {
            this.endGame();
        }
    }
    
    // End the game and show results
    endGame() {
        this.gameState = 'stopped';
        clearInterval(this.gameTimer);
        
        // Calculate final statistics
        const finalWPM = this.calculateWPM();
        const finalAccuracy = this.calculateAccuracy();
        
        // Update results modal
        this.elements.finalScore.textContent = this.score;
        this.elements.wordsTyped.textContent = this.wordsTypedCorrect;
        this.elements.finalWPM.textContent = finalWPM;
        this.elements.finalAccuracy.textContent = finalAccuracy;
        this.elements.finalLevel.textContent = this.level;
        
        // Show results modal
        this.elements.resultsModal.style.display = 'block';
        
        // Disable game controls
        this.elements.startBtn.disabled = true;
        this.elements.pauseBtn.disabled = true;
        this.elements.typeInput.disabled = true;
        
        console.log('Game ended. Final score:', this.score);
    }
    
    // Calculate Words Per Minute
    calculateWPM() {
        if (!this.startTime) return 0;
        
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60; // in minutes
        const wordsTyped = this.wordsTypedCorrect;
        
        return Math.round(wordsTyped / timeElapsed) || 0;
    }
    
    // Calculate typing accuracy
    calculateAccuracy() {
        if (this.totalCharacters === 0) return 100;
        return Math.round((this.correctCharacters / this.totalCharacters) * 100);
    }
    
    // Update all display elements
    updateDisplay() {
        this.elements.score.textContent = this.score;
        this.elements.wpm.textContent = this.calculateWPM();
        this.elements.accuracy.textContent = this.calculateAccuracy();
        this.elements.level.textContent = this.level;
        
        // Update progress bar
        const progress = (this.currentWordIndex / this.currentWords.length) * 100;
        this.elements.progress.style.width = `${Math.min(progress, 100)}%`;
    }
    
    // Play again functionality
    playAgain() {
        this.closeModal();
        this.resetGame();
    }
    
    // Close results modal
    closeModal() {
        this.elements.resultsModal.style.display = 'none';
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Word Typing Challenge initialized');
    const game = new WordTypingGame();
    
    // Make game accessible globally for debugging
    window.wordTypingGame = game;
    
    // Add keyboard shortcuts for better accessibility
    document.addEventListener('keydown', (e) => {
        // Space to start/pause (when input is not focused)
        if (e.code === 'Space' && e.target !== game.elements.typeInput) {
            e.preventDefault();
            if (game.gameState === 'stopped') {
                game.startGame();
            } else if (game.gameState === 'playing') {
                game.pauseGame();
            } else if (game.gameState === 'paused') {
                game.resumeGame();
            }
        }
        
        // Escape to reset
        if (e.code === 'Escape') {
            game.resetGame();
        }
    });
    
    // Auto-focus input for better UX
    setTimeout(() => {
        if (game.elements.typeInput) {
            game.elements.typeInput.focus();
        }
    }, 500);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WordTypingGame;
}