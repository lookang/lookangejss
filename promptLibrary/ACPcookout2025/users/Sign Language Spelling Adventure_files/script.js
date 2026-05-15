// Game state management and configuration
class SignLanguageGame {
    constructor() {
        // Game configuration based on Primary 1 curriculum
        this.words = [
            // Level 1: Simple 3-letter words (monosyllabic)
            { word: 'CAT', image: '🐱', level: 1 },
            { word: 'DOG', image: '🐶', level: 1 },
            { word: 'SUN', image: '☀️', level: 1 },
            { word: 'BAT', image: '🦇', level: 1 },
            { word: 'HAT', image: '👒', level: 1 },
            
            // Level 2: 4-letter words
            { word: 'BOOK', image: '📚', level: 2 },
            { word: 'FISH', image: '🐟', level: 2 },
            { word: 'BIRD', image: '🐦', level: 2 },
            { word: 'BALL', image: '⚽', level: 2 },
            { word: 'TREE', image: '🌳', level: 2 },
            
            // Level 3: 5-letter words (multisyllabic)
            { word: 'APPLE', image: '🍎', level: 3 },
            { word: 'HOUSE', image: '🏠', level: 3 },
            { word: 'WATER', image: '💧', level: 3 },
            { word: 'HAPPY', image: '😊', level: 3 }
        ];
        
        // Sign language alphabet representation (simplified for demo)
        this.signAlphabet = {
            'A': '✊', 'B': '🤚', 'C': '👌', 'D': '👆', 'E': '✋', 'F': '👌',
            'G': '👉', 'H': '✌️', 'I': '🤟', 'J': '🤟', 'K': '✌️', 'L': '👆',
            'M': '✊', 'N': '✊', 'O': '👌', 'P': '👇', 'Q': '👇', 'R': '🤞',
            'S': '✊', 'T': '👍', 'U': '✌️', 'V': '✌️', 'W': '🤟', 'X': '👌',
            'Y': '🤟', 'Z': '👆'
        };
        
        // Game state variables
        this.currentWordIndex = 0;
        this.currentLetterIndex = 0;
        this.score = 0;
        this.level = 1;
        this.treasures = 0;
        this.hintsUsed = 0;
        
        // Initialize game
        this.init();
    }
    
    // Initialize game components and event listeners
    init() {
        this.setupEventListeners();
        this.createSignGrid();
        this.loadCurrentWord();
        this.updateUI();
    }
    
    // Set up all event listeners for game interaction
    setupEventListeners() {
        // Control button listeners
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetCurrentWord());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextWord());
        document.getElementById('dialogueClose').addEventListener('click', () => this.closeDialogue());
        
        // Keyboard support for accessibility
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    // Create the interactive sign language grid
    createSignGrid() {
        const grid = document.getElementById('signGrid');
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        // Create button for each letter with sign representation
        alphabet.split('').forEach(letter => {
            const button = document.createElement('button');
            button.className = 'sign-btn';
            button.dataset.letter = letter;
            button.innerHTML = `
                <div class="sign-image">${this.signAlphabet[letter]}</div>
                <div>${letter}</div>
            `;
            button.title = `Sign for letter ${letter}`;
            
            // Add click handler for letter selection
            button.addEventListener('click', () => this.selectLetter(letter));
            
            grid.appendChild(button);
        });
    }
    
    // Load and display current word with visual cues
    loadCurrentWord() {
        const currentWord = this.words[this.currentWordIndex];
        
        // Update word image and text
        document.getElementById('wordImage').innerHTML = 
            `<div class="image-placeholder">${currentWord.image}</div>`;
        document.getElementById('targetWord').textContent = currentWord.word;
        
        // Create letter progress slots
        this.createLetterSlots(currentWord.word);
        
        // Reset letter index and update UI
        this.currentLetterIndex = 0;
        this.updateLetterHighlight();
        this.resetSignButtons();
    }
    
    // Create visual slots for each letter in the word
    createLetterSlots(word) {
        const progressContainer = document.getElementById('wordProgress');
        progressContainer.innerHTML = '';
        
        word.split('').forEach((letter, index) => {
            const slot = document.createElement('div');
            slot.className = 'letter-slot';
            slot.dataset.index = index;
            progressContainer.appendChild(slot);
        });
    }
    
    // Handle letter selection from sign grid
    selectLetter(selectedLetter) {
        const currentWord = this.words[this.currentWordIndex];
        const targetLetter = currentWord.word[this.currentLetterIndex];
        const button = document.querySelector(`[data-letter="${selectedLetter}"]`);
        
        // Check if selection is correct
        if (selectedLetter === targetLetter) {
            this.handleCorrectSelection(button, selectedLetter);
        } else {
            this.handleIncorrectSelection(button);
        }
    }
    
    // Handle correct letter selection with positive feedback
    handleCorrectSelection(button, letter) {
        // Visual feedback for correct selection
        button.classList.add('correct');
        
        // Fill the current letter slot
        const slots = document.querySelectorAll('.letter-slot');
        slots[this.currentLetterIndex].textContent = letter;
        slots[this.currentLetterIndex].classList.add('filled');
        
        // Update progress
        this.currentLetterIndex++;
        this.score += 10;
        
        // Check if word is complete
        if (this.currentLetterIndex >= this.words[this.currentWordIndex].word.length) {
            this.completeWord();
        } else {
            this.updateLetterHighlight();
        }
        
        // Remove visual feedback after animation
        setTimeout(() => {
            button.classList.remove('correct');
        }, 600);
        
        this.updateUI();
    }
    
    // Handle incorrect letter selection with corrective feedback
    handleIncorrectSelection(button) {
        // Visual feedback for incorrect selection
        button.classList.add('incorrect');
        
        // Provide gentle feedback for Primary 1 students
        this.showDialogue("Try again! Look at the sign carefully and match it to the letter you need.");
        
        // Remove visual feedback after animation
        setTimeout(() => {
            button.classList.remove('incorrect');
        }, 500);
    }
    
    // Complete current word and provide celebration
    completeWord() {
        this.treasures++;
        this.score += 50; // Bonus for completing word
        
        // Show celebration animation
        this.showCelebration();
        
        // Check for level progression
        this.checkLevelProgression();
        
        // Enable next button
        document.getElementById('nextBtn').style.display = 'inline-block';
        
        // Disable all sign buttons until next word
        this.disableSignButtons();
    }
    
    // Show celebration overlay for completed words
    showCelebration() {
        const celebration = document.getElementById('celebration');
        celebration.style.display = 'flex';
        
        // Auto-hide after 2 seconds
        setTimeout(() => {
            celebration.style.display = 'none';
        }, 2000);
    }
    
    // Check and handle level progression based on words completed
    checkLevelProgression() {
        const wordsPerLevel = 5;
        const newLevel = Math.floor(this.currentWordIndex / wordsPerLevel) + 1;
        
        if (newLevel > this.level) {
            this.level = newLevel;
            this.showDialogue(`Congratulations! You've reached Level ${this.level}! Words are getting more challenging.`);
        }
    }
    
    // Move to next word in sequence
    nextWord() {
        this.currentWordIndex++;
        
        // Check if all words completed
        if (this.currentWordIndex >= this.words.length) {
            this.showDialogue("Amazing! You've completed all the words! You're a Sign Language Spelling Champion! 🏆");
            return;
        }
        
        // Load next word
        this.loadCurrentWord();
        document.getElementById('nextBtn').style.display = 'none';
        this.updateUI();
    }
    
    // Reset current word progress
    resetCurrentWord() {
        this.currentLetterIndex = 0;
        this.hintsUsed = 0;
        
        // Clear letter slots
        const slots = document.querySelectorAll('.letter-slot');
        slots.forEach(slot => {
            slot.textContent = '';
            slot.classList.remove('filled');
        });
        
        this.updateLetterHighlight();
        this.resetSignButtons();
        document.getElementById('nextBtn').style.display = 'none';
    }
    
    // Provide hint for current letter (cognitive support)
    showHint() {
        const currentWord = this.words[this.currentWordIndex];
        const targetLetter = currentWord.word[this.currentLetterIndex];
        const hintButton = document.querySelector(`[data-letter="${targetLetter}"]`);
        
        // Highlight the correct button briefly
        hintButton.style.background = '#FFD700';
        hintButton.style.transform = 'scale(1.1)';
        
        this.hintsUsed++;
        this.showDialogue(`Look for the sign that matches the letter "${targetLetter}". It's highlighted in gold!`);
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
            hintButton.style.background = '';
            hintButton.style.transform = '';
        }, 3000);
    }
    
    // Update visual highlighting for current letter position
    updateLetterHighlight() {
        const slots = document.querySelectorAll('.letter-slot');
        slots.forEach((slot, index) => {
            slot.classList.remove('current');
            if (index === this.currentLetterIndex) {
                slot.classList.add('current');
            }
        });
    }
    
    // Reset all sign button states
    resetSignButtons() {
        const buttons = document.querySelectorAll('.sign-btn');
        buttons.forEach(button => {
            button.classList.remove('correct', 'incorrect', 'disabled');
        });
    }
    
    // Disable all sign buttons (used when word is complete)
    disableSignButtons() {
        const buttons = document.querySelectorAll('.sign-btn');
        buttons.forEach(button => {
            button.classList.add('disabled');
        });
    }
    
    // Show dialogue box with message
    showDialogue(message) {
        document.getElementById('dialogueText').textContent = message;
        document.getElementById('dialogueBox').style.display = 'block';
    }
    
    // Close dialogue box
    closeDialogue() {
        document.getElementById('dialogueBox').style.display = 'none';
    }
    
    // Update UI elements with current game state
    updateUI() {
        document.getElementById('currentLevel').textContent = this.level;
        document.getElementById('score').textContent = this.score;
        document.getElementById('treasureCount').textContent = this.treasures;
        
        // Update progress bar based on current word completion
        const progress = (this.currentWordIndex / this.words.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
    }
    
    // Handle keyboard input for accessibility
    handleKeyboard(event) {
        // Allow letter keys for selection
        if (event.key.match(/[a-zA-Z]/)) {
            const letter = event.key.toUpperCase();
            this.selectLetter(letter);
        }
        
        // Handle special keys
        switch(event.key) {
            case 'Enter':
                if (document.getElementById('nextBtn').style.display !== 'none') {
                    this.nextWord();
                }
                break;
            case 'Escape':
                this.closeDialogue();
                break;
            case ' ':
                event.preventDefault();
                this.showHint();
                break;
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create and start the game
    const game = new SignLanguageGame();
    
    // Add welcome message
    setTimeout(() => {
        game.showDialogue("Welcome to Sign Language Spelling Adventure! Match the sign language symbols to spell words. Click on the signs that match each letter. Use the hint button if you need help!");
    }, 500);
});

// Utility functions for enhanced user experience

// Handle window resize for responsive layout
window.addEventListener('resize', () => {
    // Adjust grid layout based on available space
    const grid = document.getElementById('signGrid');
    const containerWidth = grid.offsetWidth;
    const buttonSize = Math.max(40, Math.min(60, containerWidth / 8));
    
    document.documentElement.style.setProperty('--sign-button-size', `${buttonSize}px`);
});

// Add touch event handling for mobile devices
document.addEventListener('touchstart', (e) => {
    // Prevent zoom on double tap for game buttons
    if (e.target.classList.contains('sign-btn') || e.target.classList.contains('control-btn')) {
        e.preventDefault();
    }
}, { passive: false });

// Performance optimization: Preload next word images
function preloadImages() {
    const game = window.game;
    if (game && game.words) {
        game.words.forEach(wordData => {
            // In a real implementation, you would preload actual images here
            // For this demo, we're using emoji which don't need preloading
        });
    }
}

// Accessibility: Announce important game events to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}