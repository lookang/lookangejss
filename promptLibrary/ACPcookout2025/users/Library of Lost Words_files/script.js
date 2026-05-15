// JavaScript for Library of Lost Words Game

class LibraryOfLostWords {
    constructor() {
        // Game state variables
        this.gameState = 'intro'; // intro, playing, typing, ended
        this.currentWordIndex = 0;
        this.crystals = 0;
        this.wordsRescued = 0;
        this.timeLeft = 60;
        this.gameTimer = null;
        this.typingStartTime = null;
        this.bestTypingSpeed = 0;
        
        // MODIFICATION: Track used words to prevent repetition during a single game session
        this.usedWordIndices = new Set();
        this.availableWordIndices = [];
        
        // Word database with fantasy-themed definitions and sentences
        this.wordDatabase = [
            {
                word: "Enchanted",
                pronunciation: "/ɪnˈtʃæntɪd/",
                correctDefinition: "Under a magical spell; filled with delight",
                incorrectDefinitions: [
                    "Very angry or upset",
                    "Extremely tired and sleepy",
                    "Completely lost and confused"
                ],
                sentence: "The enchanted forest glowed with mystical light."
            },
            {
                word: "Quest",
                pronunciation: "/kwest/",
                correctDefinition: "A long search for something important",
                incorrectDefinitions: [
                    "A type of magical creature",
                    "A powerful spell or curse",
                    "A golden treasure chest"
                ],
                sentence: "The brave knight began his quest for the crystal."
            },
            {
                word: "Mystical",
                pronunciation: "/ˈmɪstɪkəl/",
                correctDefinition: "Having spiritual or magical powers",
                incorrectDefinitions: [
                    "Very old and ancient",
                    "Extremely difficult to understand",
                    "Completely invisible to others"
                ],
                sentence: "The wizard cast a mystical spell on the door."
            },
            {
                word: "Ancient",
                pronunciation: "/ˈeɪnʃənt/",
                correctDefinition: "Very old, from long ago",
                incorrectDefinitions: [
                    "Extremely powerful and strong",
                    "Hidden from view or secret",
                    "Made of pure gold"
                ],
                sentence: "The ancient tome held secrets of magic."
            },
            {
                word: "Treasure",
                pronunciation: "/ˈtreʒər/",
                correctDefinition: "Valuable objects like gold and jewels",
                incorrectDefinitions: [
                    "A dangerous monster or beast",
                    "A magical potion or elixir",
                    "A mysterious riddle or puzzle"
                ],
                sentence: "Pirates buried their treasure on the island."
            },
            {
                word: "Magical",
                pronunciation: "/ˈmædʒɪkəl/",
                correctDefinition: "Having special powers beyond nature",
                incorrectDefinitions: [
                    "Very beautiful and colorful",
                    "Extremely fast and quick",
                    "Completely silent and quiet"
                ],
                sentence: "The magical wand sparkled with golden light."
            },
            {
                word: "Adventure",
                pronunciation: "/ədˈventʃər/",
                correctDefinition: "An exciting and dangerous experience",
                incorrectDefinitions: [
                    "A comfortable place to rest",
                    "A type of magical spell",
                    "A precious gemstone or crystal"
                ],
                sentence: "The young hero sought a grand adventure."
            },
            {
                word: "Mysterious",
                pronunciation: "/mɪˈstɪriəs/",
                correctDefinition: "Strange and difficult to understand",
                incorrectDefinitions: [
                    "Very bright and shining",
                    "Extremely heavy and solid",
                    "Completely smooth and soft"
                ],
                sentence: "A mysterious fog covered the haunted castle."
            }
        ];
        
        this.currentWord = null;
        this.shuffledDefinitions = [];
        
        // Initialize the game
        this.initializeGame();
    }
    
    // Initialize game event listeners and setup
    initializeGame() {
        // Start game button
        document.getElementById('startGame').addEventListener('click', () => {
            this.startGame();
        });
        
        // Play again button
        document.getElementById('playAgain').addEventListener('click', () => {
            this.resetGame();
        });
        
        // Typing input handler
        const typingInput = document.getElementById('typingInput');
        typingInput.addEventListener('input', () => {
            this.handleTyping();
        });
        
        // Enter key to submit typing
        typingInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkTypingComplete();
            }
        });
        
        // Tooltip functionality for mobile/iframe support
        this.initializeTooltips();
        
        console.log('Library of Lost Words initialized successfully!');
    }
    
    // Initialize tooltip system for better mobile/iframe experience
    initializeTooltips() {
        const tooltip = document.getElementById('tooltip');
        const elementsWithTooltips = document.querySelectorAll('[title]');
        
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const title = e.target.getAttribute('title');
                if (title) {
                    tooltip.textContent = title;
                    tooltip.classList.remove('hidden');
                    this.positionTooltip(e, tooltip);
                }
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.add('hidden');
            });
            
            element.addEventListener('mousemove', (e) => {
                if (!tooltip.classList.contains('hidden')) {
                    this.positionTooltip(e, tooltip);
                }
            });
        });
    }
    
    // Position tooltip near cursor
    positionTooltip(event, tooltip) {
        const rect = document.getElementById('gameContainer').getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        tooltip.style.left = Math.min(x + 10, rect.width - tooltip.offsetWidth - 10) + 'px';
        tooltip.style.top = Math.max(y - tooltip.offsetHeight - 10, 10) + 'px';
    }
    
    // MODIFICATION: Initialize available word indices for the game session
    initializeAvailableWords() {
        this.availableWordIndices = [];
        this.usedWordIndices.clear();
        
        // Create array of all word indices
        for (let i = 0; i < this.wordDatabase.length; i++) {
            this.availableWordIndices.push(i);
        }
        
        // Shuffle the available words for random order
        this.shuffleArray(this.availableWordIndices);
        
        console.log('Available words initialized and shuffled for new game session');
    }
    
    // MODIFICATION: Utility function to shuffle an array using Fisher-Yates algorithm
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    // Start the main game
    startGame() {
        this.gameState = 'playing';
        this.hideElement('introCutscene');
        this.showElement('gameInterface');
        
        // MODIFICATION: Initialize available words for this game session
        this.initializeAvailableWords();
        
        // Start the countdown timer
        this.startTimer();
        
        // Load first word
        this.loadNextWord();
        
        console.log('Game started! Timer running for 60 seconds.');
    }
    
    // Start the game timer
    startTimer() {
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            document.getElementById('timeLeft').textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    // MODIFICATION: Load next word challenge with no repetition logic
    loadNextWord() {
        if (this.timeLeft <= 0) {
            this.endGame();
            return;
        }
        
        // Check if we have any available words left
        if (this.availableWordIndices.length === 0) {
            // All words have been used, show special completion message
            this.showFeedback('🎉 Amazing! You\'ve rescued ALL the words in the library! 🎉', 'success');
            setTimeout(() => {
                this.endGame();
            }, 3000);
            return;
        }
        
        // Get the next available word (already shuffled)
        this.currentWordIndex = this.availableWordIndices.shift();
        this.usedWordIndices.add(this.currentWordIndex);
        this.currentWord = this.wordDatabase[this.currentWordIndex];
        
        // Display word and pronunciation
        document.getElementById('currentWord').textContent = this.currentWord.word;
        document.getElementById('pronunciation').textContent = this.currentWord.pronunciation;
        
        // Shuffle definitions
        this.shuffleDefinitions();
        
        // Create definition buttons
        this.createDefinitionButtons();
        
        // Show word challenge, hide typing challenge
        this.showElement('wordChallenge');
        this.hideElement('typingChallenge');
        
        console.log(`Loaded word: ${this.currentWord.word} (${this.availableWordIndices.length} words remaining)`);
    }
    
    // Shuffle the definitions for random presentation
    shuffleDefinitions() {
        this.shuffledDefinitions = [
            { text: this.currentWord.correctDefinition, isCorrect: true },
            ...this.currentWord.incorrectDefinitions.map(def => ({ text: def, isCorrect: false }))
        ];
        
        // Fisher-Yates shuffle algorithm
        for (let i = this.shuffledDefinitions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledDefinitions[i], this.shuffledDefinitions[j]] = 
            [this.shuffledDefinitions[j], this.shuffledDefinitions[i]];
        }
    }
    
    // Create definition buttons
    createDefinitionButtons() {
        const grid = document.getElementById('definitionsGrid');
        grid.innerHTML = '';
        
        this.shuffledDefinitions.forEach((definition, index) => {
            const button = document.createElement('button');
            button.className = 'definition-btn';
            button.textContent = definition.text;
            button.addEventListener('click', () => {
                this.selectDefinition(definition.isCorrect, button);
            });
            grid.appendChild(button);
        });
    }
    
    // Handle definition selection
    selectDefinition(isCorrect, buttonElement) {
        // Disable all buttons to prevent multiple clicks
        const allButtons = document.querySelectorAll('.definition-btn');
        allButtons.forEach(btn => btn.disabled = true);
        
        if (isCorrect) {
            buttonElement.classList.add('correct');
            this.crystals += 10;
            this.updateStats();
            
            // Show success feedback
            this.showFeedback('✨ Correct! The word glows brighter! ✨', 'success');
            
            // Move to typing challenge after brief delay
            setTimeout(() => {
                this.startTypingChallenge();
            }, 1500);
            
        } else {
            buttonElement.classList.add('incorrect');
            
            // Highlight correct answer
            allButtons.forEach(btn => {
                if (btn.textContent === this.currentWord.correctDefinition) {
                    btn.classList.add('correct');
                }
            });
            
            // Show feedback and move to next word
            this.showFeedback('❌ Not quite right. The correct meaning glows above.', 'error');
            
            setTimeout(() => {
                this.loadNextWord();
            }, 2500);
        }
        
        console.log(`Definition selected: ${isCorrect ? 'Correct' : 'Incorrect'}`);
    }
    
    // Start typing challenge
    startTypingChallenge() {
        this.gameState = 'typing';
        this.hideElement('wordChallenge');
        this.showElement('typingChallenge');
        this.hideFeedback();
        
        // Display sentence to type
        document.getElementById('sentenceToType').textContent = this.currentWord.sentence;
        
        // Clear and focus typing input
        const typingInput = document.getElementById('typingInput');
        typingInput.value = '';
        typingInput.focus();
        
        // Record typing start time
        this.typingStartTime = Date.now();
        
        console.log(`Starting typing challenge: "${this.currentWord.sentence}"`);
    }
    
    // Handle typing input
    handleTyping() {
        const typingInput = document.getElementById('typingInput');
        const targetSentence = this.currentWord.sentence;
        const typedText = typingInput.value;
        
        // Calculate accuracy
        let correctChars = 0;
        for (let i = 0; i < Math.min(typedText.length, targetSentence.length); i++) {
            if (typedText[i] === targetSentence[i]) {
                correctChars++;
            }
        }
        
        const accuracy = typedText.length > 0 ? Math.round((correctChars / typedText.length) * 100) : 100;
        document.getElementById('accuracy').textContent = `${accuracy}%`;
        
        // Calculate typing speed (WPM)
        if (this.typingStartTime) {
            const timeElapsed = (Date.now() - this.typingStartTime) / 1000 / 60; // minutes
            const wordsTyped = typedText.split(' ').length;
            const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
            document.getElementById('typingSpeed').textContent = `${wpm} WPM`;
        }
        
        // Check if sentence is complete
        if (typedText.toLowerCase().trim() === targetSentence.toLowerCase().trim()) {
            this.checkTypingComplete();
        }
    }
    
    // Check and handle completed typing
    checkTypingComplete() {
        const typingInput = document.getElementById('typingInput');
        const targetSentence = this.currentWord.sentence;
        const typedText = typingInput.value.toLowerCase().trim();
        
        if (typedText === targetSentence.toLowerCase().trim()) {
            // Calculate final typing speed
            const timeElapsed = (Date.now() - this.typingStartTime) / 1000 / 60;
            const wordsTyped = targetSentence.split(' ').length;
            const finalWPM = Math.round(wordsTyped / timeElapsed);
            
            // Update best typing speed
            if (finalWPM > this.bestTypingSpeed) {
                this.bestTypingSpeed = finalWPM;
            }
            
            // Award points based on speed and accuracy
            let speedBonus = Math.max(0, finalWPM - 20); // Bonus for typing over 20 WPM
            this.crystals += 15 + speedBonus;
            this.wordsRescued++;
            
            this.updateStats();
            
            // Show success feedback
            this.showFeedback(`🎉 Word rescued! Speed: ${finalWPM} WPM (+${15 + speedBonus} crystals)`, 'success');
            
            // Move to next word after delay
            setTimeout(() => {
                this.loadNextWord();
            }, 2000);
            
            console.log(`Typing completed! Speed: ${finalWPM} WPM, Crystals awarded: ${15 + speedBonus}`);
        }
    }
    
    // Update game statistics display
    updateStats() {
        document.getElementById('crystals').textContent = this.crystals;
        document.getElementById('wordsRescued').textContent = this.wordsRescued;
    }
    
    // Show feedback message
    showFeedback(message, type) {
        const feedback = document.getElementById('feedbackSection');
        const content = document.getElementById('feedbackContent');
        
        content.textContent = message;
        feedback.classList.remove('hidden');
        feedback.classList.add('fade-in');
        
        // Auto-hide after delay for certain types
        if (type === 'success') {
            setTimeout(() => {
                this.hideFeedback();
            }, 1500);
        }
    }
    
    // Hide feedback message
    hideFeedback() {
        const feedback = document.getElementById('feedbackSection');
        feedback.classList.add('hidden');
        feedback.classList.remove('fade-in');
    }
    
    // End the game
    endGame() {
        this.gameState = 'ended';
        
        // Clear timer
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }
        
        // Hide game interface
        this.hideElement('gameInterface');
        
        // Show end cutscene with final stats
        document.getElementById('finalCrystals').textContent = this.crystals;
        document.getElementById('finalWords').textContent = this.wordsRescued;
        document.getElementById('bestSpeed').textContent = this.bestTypingSpeed;
        
        this.showElement('endCutscene');
        
        console.log(`Game ended! Final stats - Crystals: ${this.crystals}, Words: ${this.wordsRescued}, Best Speed: ${this.bestTypingSpeed} WPM`);
    }
    
    // MODIFICATION: Reset game for replay with fresh word pool
    resetGame() {
        // Reset all game variables
        this.gameState = 'intro';
        this.currentWordIndex = 0;
        this.crystals = 0;
        this.wordsRescued = 0;
        this.timeLeft = 60;
        this.typingStartTime = null;
        this.bestTypingSpeed = 0;
        
        // MODIFICATION: Reset word tracking for new game session
        this.usedWordIndices.clear();
        this.availableWordIndices = [];
        
        // Clear timer if running
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
        
        // Reset UI
        this.updateStats();
        document.getElementById('timeLeft').textContent = this.timeLeft;
        
        // Hide end screen, show intro
        this.hideElement('endCutscene');
        this.showElement('introCutscene');
        
        // Clear typing input
        document.getElementById('typingInput').value = '';
        
        console.log('Game reset successfully! Word pool refreshed for new session.');
    }
    
    // Utility function to show element
    showElement(elementId) {
        const element = document.getElementById(elementId);
        element.classList.remove('hidden');
        element.classList.add('active');
    }
    
    // Utility function to hide element
    hideElement(elementId) {
        const element = document.getElementById(elementId);
        element.classList.add('hidden');
        element.classList.remove('active');
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Library of Lost Words...');
    const game = new LibraryOfLostWords();
    
    // Add some ambient background music simulation (visual feedback)
    setInterval(() => {
        const books = document.querySelectorAll('.floating-books');
        books.forEach(book => {
            book.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px)`;
        });
    }, 50);
    
    console.log('Library of Lost Words fully loaded and ready to play!');
});