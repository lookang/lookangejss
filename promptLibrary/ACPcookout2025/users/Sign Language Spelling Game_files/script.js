// JavaScript for Sign Language Spelling Game
// Designed for Primary 1 students with hearing loss learning letter-sign correspondence

class SignLanguageSpellingGame {
    constructor() {
        // Game state variables
        this.currentLevel = 1;
        this.currentScore = 0;
        this.currentWordIndex = 0;
        this.currentLetterIndex = 0;
        this.playerAnswer = [];
        
        // Word database with increasing difficulty (monosyllabic to multisyllabic)
        this.wordDatabase = {
            level1: [
                { word: 'CAT', image: '🐱', hint: 'A furry pet that meows' },
                { word: 'DOG', image: '🐶', hint: 'A loyal pet that barks' },
                { word: 'SUN', image: '☀️', hint: 'Bright light in the sky' },
                { word: 'BED', image: '🛏️', hint: 'Where you sleep' },
                { word: 'CUP', image: '☕', hint: 'You drink from this' }
            ],
            level2: [
                { word: 'BOOK', image: '📚', hint: 'You read this' },
                { word: 'TREE', image: '🌳', hint: 'Tall plant with leaves' },
                { word: 'FISH', image: '🐟', hint: 'Swims in water' },
                { word: 'BALL', image: '⚽', hint: 'Round toy to play with' },
                { word: 'BIRD', image: '🐦', hint: 'Flies in the sky' }
            ],
            level3: [
                { word: 'APPLE', image: '🍎', hint: 'Red fruit that is crunchy' },
                { word: 'HOUSE', image: '🏠', hint: 'Where you live' },
                { word: 'WATER', image: '💧', hint: 'Clear liquid you drink' },
                { word: 'HAPPY', image: '😊', hint: 'Feeling good and smiling' },
                { word: 'CHAIR', image: '🪑', hint: 'You sit on this' }
            ],
            level4: [
                { word: 'ELEPHANT', image: '🐘', hint: 'Large animal with trunk' },
                { word: 'RAINBOW', image: '🌈', hint: 'Colorful arc in the sky' },
                { word: 'BICYCLE', image: '🚲', hint: 'Two-wheeled vehicle' },
                { word: 'BUTTERFLY', image: '🦋', hint: 'Colorful flying insect' },
                { word: 'SANDWICH', image: '🥪', hint: 'Food between bread slices' }
            ]
        };
        
        // Avatar accessories that can be unlocked
        this.accessories = [
            { id: 'hat', emoji: '🎩', name: 'Top Hat', unlockLevel: 2 },
            { id: 'glasses', emoji: '🤓', name: 'Glasses', unlockLevel: 3 },
            { id: 'crown', emoji: '👑', name: 'Crown', unlockLevel: 4 },
            { id: 'bow', emoji: '🎀', name: 'Bow Tie', unlockLevel: 5 },
            { id: 'medal', emoji: '🏅', name: 'Medal', unlockLevel: 6 }
        ];
        
        this.equippedAccessories = [];
        this.currentWord = null;
        
        // Initialize the game
        this.init();
    }
    
    init() {
        // Get DOM elements
        this.elements = {
            gameContainer: document.getElementById('gameContainer'),
            currentLevel: document.getElementById('currentLevel'),
            currentScore: document.getElementById('currentScore'),
            progressFill: document.getElementById('progressFill'),
            wordImage: document.getElementById('wordImage'),
            wordBlanks: document.getElementById('wordBlanks'),
            wordHint: document.getElementById('wordHint'),
            letterGrid: document.getElementById('letterGrid'),
            clearBtn: document.getElementById('clearBtn'),
            submitBtn: document.getElementById('submitBtn'),
            skipBtn: document.getElementById('skipBtn'),
            avatar: document.getElementById('avatar'),
            avatarAccessories: document.getElementById('avatarAccessories'),
            inventoryBtn: document.getElementById('inventoryBtn'),
            feedbackModal: document.getElementById('feedbackModal'),
            feedbackMessage: document.getElementById('feedbackMessage'),
            nextBtn: document.getElementById('nextBtn'),
            inventoryModal: document.getElementById('inventoryModal'),
            inventoryGrid: document.getElementById('inventoryGrid'),
            closeInventoryBtn: document.getElementById('closeInventoryBtn'),
            tooltip: document.getElementById('tooltip')
        };
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize game display
        this.updateDisplay();
        this.loadNewWord();
        this.setupInventory();
        
        // Set up tooltips
        this.setupTooltips();
    }
    
    setupEventListeners() {
        // Letter button clicks
        this.elements.letterGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('letter-btn') && !e.target.classList.contains('disabled')) {
                this.selectLetter(e.target.dataset.letter);
            }
        });
        
        // Action button clicks
        this.elements.clearBtn.addEventListener('click', () => this.clearAnswer());
        this.elements.submitBtn.addEventListener('click', () => this.submitAnswer());
        this.elements.skipBtn.addEventListener('click', () => this.skipWord());
        
        // Modal controls
        this.elements.nextBtn.addEventListener('click', () => this.nextWord());
        this.elements.inventoryBtn.addEventListener('click', () => this.openInventory());
        this.elements.closeInventoryBtn.addEventListener('click', () => this.closeInventory());
        
        // Inventory item clicks
        this.elements.inventoryGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('inventory-item') && !e.target.classList.contains('locked')) {
                this.toggleAccessory(e.target.dataset.accessoryId);
            }
        });
        
        // Close modals when clicking outside
        this.elements.feedbackModal.addEventListener('click', (e) => {
            if (e.target === this.elements.feedbackModal) {
                this.nextWord();
            }
        });
        
        this.elements.inventoryModal.addEventListener('click', (e) => {
            if (e.target === this.elements.inventoryModal) {
                this.closeInventory();
            }
        });
    }
    
    setupTooltips() {
        // Add tooltip functionality for better accessibility
        document.addEventListener('mouseover', (e) => {
            if (e.target.hasAttribute('title')) {
                this.showTooltip(e.target, e.target.getAttribute('title'));
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.hasAttribute('title')) {
                this.hideTooltip();
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (this.elements.tooltip.classList.contains('show')) {
                this.elements.tooltip.style.left = e.pageX + 10 + 'px';
                this.elements.tooltip.style.top = e.pageY - 30 + 'px';
            }
        });
    }
    
    showTooltip(element, text) {
        this.elements.tooltip.textContent = text;
        this.elements.tooltip.classList.add('show');
    }
    
    hideTooltip() {
        this.elements.tooltip.classList.remove('show');
    }
    
    getCurrentWords() {
        // Get words for current level
        const levelKey = `level${Math.min(this.currentLevel, 4)}`;
        return this.wordDatabase[levelKey] || this.wordDatabase.level1;
    }
    
    loadNewWord() {
        // Load a new word for the player to spell
        const words = this.getCurrentWords();
        this.currentWord = words[Math.floor(Math.random() * words.length)];
        this.playerAnswer = [];
        this.currentLetterIndex = 0;
        
        // Update display
        this.updateWordDisplay();
        this.updateLetterGrid();
    }
    
    updateWordDisplay() {
        // Update word image and blanks
        this.elements.wordImage.innerHTML = `<div class="image-placeholder">${this.currentWord.image}</div>`;
        this.elements.wordHint.textContent = this.currentWord.hint;
        
        // Create blank spaces for each letter
        this.elements.wordBlanks.innerHTML = '';
        for (let i = 0; i < this.currentWord.word.length; i++) {
            const blank = document.createElement('div');
            blank.className = 'word-blank';
            if (i === this.currentLetterIndex) {
                blank.classList.add('current');
            }
            this.elements.wordBlanks.appendChild(blank);
        }
    }
    
    updateLetterGrid() {
        // Enable/disable letters based on game state
        const letterBtns = this.elements.letterGrid.querySelectorAll('.letter-btn');
        letterBtns.forEach(btn => {
            btn.classList.remove('disabled');
        });
    }
    
    selectLetter(letter) {
        // Handle letter selection
        if (this.currentLetterIndex < this.currentWord.word.length) {
            this.playerAnswer[this.currentLetterIndex] = letter;
            
            // Update display
            const blanks = this.elements.wordBlanks.querySelectorAll('.word-blank');
            blanks[this.currentLetterIndex].textContent = letter;
            blanks[this.currentLetterIndex].classList.add('filled');
            blanks[this.currentLetterIndex].classList.remove('current');
            
            this.currentLetterIndex++;
            
            // Highlight next blank
            if (this.currentLetterIndex < this.currentWord.word.length) {
                blanks[this.currentLetterIndex].classList.add('current');
            }
            
            // Auto-submit when word is complete
            if (this.currentLetterIndex === this.currentWord.word.length) {
                setTimeout(() => this.submitAnswer(), 500);
            }
        }
    }
    
    clearAnswer() {
        // Clear the current answer
        this.playerAnswer = [];
        this.currentLetterIndex = 0;
        this.updateWordDisplay();
    }
    
    submitAnswer() {
        // Check if answer is complete
        if (this.playerAnswer.length !== this.currentWord.word.length) {
            this.showFeedback('Please complete the word first!', 'incomplete');
            return;
        }
        
        // Check if answer is correct
        const playerWord = this.playerAnswer.join('');
        const isCorrect = playerWord === this.currentWord.word;
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer();
        }
    }
    
    handleCorrectAnswer() {
        // Award points and show positive feedback
        this.currentScore += 10;
        this.showFeedback(`Correct! Well done! 🎉\n+10 points`, 'correct');
        
        // Check for level up
        if (this.currentScore >= this.currentLevel * 50) {
            this.levelUp();
        }
        
        this.updateDisplay();
    }
    
    handleIncorrectAnswer() {
        // Show the correct answer and encourage the player
        const correctWord = this.currentWord.word;
        this.showFeedback(`Not quite right. The correct spelling is: ${correctWord}\nTry again! 💪`, 'incorrect');
    }
    
    levelUp() {
        // Increase level and unlock new accessories
        this.currentLevel++;
        this.showFeedback(`Level Up! 🌟\nYou reached Level ${this.currentLevel}!\nNew accessories unlocked!`, 'levelup');
        
        // Update inventory with newly unlocked items
        this.setupInventory();
    }
    
    skipWord() {
        // Skip current word and load a new one
        this.showFeedback(`Skipped! The word was: ${this.currentWord.word}\nLet's try another one! 🔄`, 'skip');
    }
    
    nextWord() {
        // Hide feedback modal and load next word
        this.elements.feedbackModal.style.display = 'none';
        this.loadNewWord();
    }
    
    showFeedback(message, type) {
        // Display feedback modal with appropriate styling
        this.elements.feedbackMessage.textContent = message;
        this.elements.feedbackMessage.className = `feedback-message ${type}`;
        this.elements.feedbackModal.style.display = 'flex';
    }
    
    openInventory() {
        // Show inventory modal
        this.elements.inventoryModal.style.display = 'flex';
    }
    
    closeInventory() {
        // Hide inventory modal
        this.elements.inventoryModal.style.display = 'none';
    }
    
    setupInventory() {
        // Populate inventory with accessories
        this.elements.inventoryGrid.innerHTML = '';
        
        this.accessories.forEach(accessory => {
            const item = document.createElement('div');
            item.className = 'inventory-item';
            item.dataset.accessoryId = accessory.id;
            item.textContent = accessory.emoji;
            item.title = `${accessory.name} (Unlock at Level ${accessory.unlockLevel})`;
            
            // Check if accessory is unlocked
            if (this.currentLevel >= accessory.unlockLevel) {
                if (this.equippedAccessories.includes(accessory.id)) {
                    item.classList.add('equipped');
                }
            } else {
                item.classList.add('locked');
            }
            
            this.elements.inventoryGrid.appendChild(item);
        });
    }
    
    toggleAccessory(accessoryId) {
        // Toggle accessory equipment
        const index = this.equippedAccessories.indexOf(accessoryId);
        if (index > -1) {
            this.equippedAccessories.splice(index, 1);
        } else {
            this.equippedAccessories.push(accessoryId);
        }
        
        this.updateAvatar();
        this.setupInventory();
    }
    
    updateAvatar() {
        // Update avatar display with equipped accessories
        let accessoryDisplay = '';
        this.equippedAccessories.forEach(accessoryId => {
            const accessory = this.accessories.find(a => a.id === accessoryId);
            if (accessory) {
                accessoryDisplay += accessory.emoji;
            }
        });
        
        this.elements.avatarAccessories.textContent = accessoryDisplay;
    }
    
    updateDisplay() {
        // Update all display elements
        this.elements.currentLevel.textContent = this.currentLevel;
        this.elements.currentScore.textContent = this.currentScore;
        
        // Update progress bar
        const progressToNextLevel = (this.currentScore % 50) / 50 * 100;
        this.elements.progressFill.style.width = progressToNextLevel + '%';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if running in iframe and adjust height accordingly
    const gameContainer = document.getElementById('gameContainer');
    if (window.self !== window.top) {
        // Running in iframe
        gameContainer.style.height = '450px';
    } else {
        // Running in full browser
        gameContainer.style.height = '90vh';
    }
    
    // Start the game
    new SignLanguageSpellingGame();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    const gameContainer = document.getElementById('gameContainer');
    if (window.self !== window.top) {
        gameContainer.style.height = '450px';
    } else {
        gameContainer.style.height = '90vh';
    }
});

// Add keyboard support for accessibility
document.addEventListener('keydown', (e) => {
    // Allow Enter key to submit answer
    if (e.key === 'Enter') {
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.click();
        }
    }
    
    // Allow Escape key to close modals
    if (e.key === 'Escape') {
        const feedbackModal = document.getElementById('feedbackModal');
        const inventoryModal = document.getElementById('inventoryModal');
        
        if (feedbackModal.style.display === 'flex') {
            document.getElementById('nextBtn').click();
        }
        
        if (inventoryModal.style.display === 'flex') {
            document.getElementById('closeInventoryBtn').click();
        }
    }
});