// Game state management and core functionality
class LibraryOfLostWords {
    constructor() {
        // Game state variables
        this.gameActive = false;
        this.currentWordIndex = 0;
        this.score = 0;
        this.timeLeft = 60;
        this.gameTimer = null;
        this.typingStartTime = null;
        this.totalTypingTime = 0;
        this.totalCharactersTyped = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 0;
        this.currentAccuracy = 100;

        // Word database with definitions and example sentences
        this.wordDatabase = [
            {
                word: "Serendipity",
                definitions: [
                    "A pleasant surprise or fortunate accident",
                    "A type of ancient scroll",
                    "The study of stars and planets",
                    "A magical potion ingredient"
                ],
                correct: 0,
                sentence: "Finding the old treasure map in the library was pure serendipity."
            },
            {
                word: "Ephemeral",
                definitions: [
                    "Lasting for a very short time",
                    "Related to ancient Egypt",
                    "A type of butterfly",
                    "Extremely large in size"
                ],
                correct: 0,
                sentence: "The rainbow was ephemeral, disappearing within minutes."
            },
            {
                word: "Resilient",
                definitions: [
                    "Able to recover quickly from difficulties",
                    "Having a shiny surface",
                    "Making a loud noise",
                    "Moving very slowly"
                ],
                correct: 0,
                sentence: "The resilient young hero overcame every obstacle in her path."
            },
            {
                word: "Meticulous",
                definitions: [
                    "Showing great attention to detail",
                    "Related to weather patterns",
                    "Having multiple colors",
                    "Being very tall"
                ],
                correct: 0,
                sentence: "The scholar was meticulous in organizing every book in the library."
            },
            {
                word: "Enigmatic",
                definitions: [
                    "Difficult to interpret or understand; mysterious",
                    "Related to engineering",
                    "Having eight sides",
                    "Making engine sounds"
                ],
                correct: 0,
                sentence: "The enigmatic riddle puzzled even the wisest wizards."
            },
            {
                word: "Vivacious",
                definitions: [
                    "Attractively lively and animated",
                    "Related to living things",
                    "Having good eyesight",
                    "Eating only vegetables"
                ],
                correct: 0,
                sentence: "The vivacious fairy danced joyfully through the enchanted forest."
            },
            {
                word: "Tenacious",
                definitions: [
                    "Tending to keep a firm hold; persistent",
                    "Having ten of something",
                    "Related to tennis",
                    "Being very thin"
                ],
                correct: 0,
                sentence: "The tenacious knight never gave up on his quest."
            },
            {
                word: "Eloquent",
                definitions: [
                    "Fluent and persuasive in speaking or writing",
                    "Related to elephants",
                    "Having electrical power",
                    "Being very tall"
                ],
                correct: 0,
                sentence: "The eloquent princess convinced everyone with her wise words."
            }
        ];

        // Initialize the game
        this.initializeGame();
    }

    // Initialize game elements and event listeners
    initializeGame() {
        this.bindEventListeners();
        this.showStartScreen();
    }

    // Bind all event listeners for game interaction
    bindEventListeners() {
        // Start game button
        document.getElementById('startGame').addEventListener('click', () => {
            this.startGame();
        });

        // Definition buttons
        document.querySelectorAll('.definition-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.selectDefinition(index);
            });
        });

        // Typing input for real-time feedback
        document.getElementById('typingInput').addEventListener('input', () => {
            this.updateTypingFeedback();
        });

        // Submit typing button
        document.getElementById('submitTyping').addEventListener('click', () => {
            this.submitTyping();
        });

        // Next word button
        document.getElementById('nextWord').addEventListener('click', () => {
            this.nextWord();
        });

        // Restart game button
        document.getElementById('restartGame').addEventListener('click', () => {
            this.restartGame();
        });

        // Keyboard shortcuts for better accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.id === 'typingInput') {
                e.preventDefault();
                this.submitTyping();
            }
        });

        // Tooltip functionality for help text
        this.initializeTooltips();
    }

    // Initialize tooltip system for additional information
    initializeTooltips() {
        const tooltip = document.getElementById('tooltip');
        const elementsWithTooltips = [
            { element: '.crystals-collected', text: 'Crystals earned for correct answers' },
            { element: '.timer', text: 'Time remaining in current quest' },
            { element: '.typing-stats', text: 'Your current typing speed' },
            { element: '.current-word', text: 'The mystical word to learn' }
        ];

        elementsWithTooltips.forEach(item => {
            const elements = document.querySelectorAll(item.element);
            elements.forEach(element => {
                element.addEventListener('mouseenter', (e) => {
                    tooltip.textContent = item.text;
                    tooltip.style.opacity = '1';
                    this.positionTooltip(e, tooltip);
                });

                element.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                });

                element.addEventListener('mousemove', (e) => {
                    this.positionTooltip(e, tooltip);
                });
            });
        });
    }

    // Position tooltip near mouse cursor
    positionTooltip(e, tooltip) {
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2) + 'px';
        tooltip.style.top = (rect.top - 40) + 'px';
    }

    // Show the start screen
    showStartScreen() {
        document.getElementById('startScreen').style.display = 'flex';
        document.getElementById('gameOver').style.display = 'none';
        this.hideAllGameSections();
    }

    // Start the main game
    startGame() {
        document.getElementById('startScreen').style.display = 'none';
        this.gameActive = true;
        this.resetGameState();
        this.startTimer();
        this.presentWord();
    }

    // Reset all game state variables
    resetGameState() {
        this.currentWordIndex = 0;
        this.score = 0;
        this.timeLeft = 60;
        this.totalTypingTime = 0;
        this.totalCharactersTyped = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 0;
        this.updateDisplay();
    }

    // Start the game timer
    startTimer() {
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    // Present a new word to the player
    presentWord() {
        if (!this.gameActive) return;

        // Select random word from database
        const randomIndex = Math.floor(Math.random() * this.wordDatabase.length);
        const currentWord = this.wordDatabase[randomIndex];
        
        // Update word display
        document.getElementById('currentWord').textContent = currentWord.word;
        
        // Shuffle definitions for random order
        const shuffledDefinitions = this.shuffleDefinitions(currentWord);
        
        // Display definitions on buttons
        shuffledDefinitions.forEach((def, index) => {
            const btn = document.getElementById(`def${index + 1}`);
            btn.textContent = def.text;
            btn.dataset.correct = def.isCorrect;
            btn.className = 'definition-btn'; // Reset button styling
        });

        // Show word and definitions section
        this.showSection('wordSection');
        this.showSection('definitionsSection');
        this.hideSection('typingSection');
        this.hideSection('resultsSection');
    }

    // Shuffle definitions and mark correct answer
    shuffleDefinitions(wordData) {
        const definitions = wordData.definitions.map((def, index) => ({
            text: def,
            isCorrect: index === wordData.correct
        }));
        
        // Fisher-Yates shuffle algorithm
        for (let i = definitions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [definitions[i], definitions[j]] = [definitions[j], definitions[i]];
        }
        
        return definitions;
    }

    // Handle definition selection
    selectDefinition(index) {
        if (!this.gameActive) return;

        const selectedBtn = document.getElementById(`def${index + 1}`);
        const isCorrect = selectedBtn.dataset.correct === 'true';
        
        // Visual feedback for all buttons
        document.querySelectorAll('.definition-btn').forEach(btn => {
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            } else if (btn === selectedBtn && !isCorrect) {
                btn.classList.add('incorrect');
            }
            btn.disabled = true;
        });

        this.totalQuestions++;
        
        if (isCorrect) {
            this.correctAnswers++;
            this.score += 10;
            this.playSuccessSound();
        } else {
            this.playErrorSound();
        }

        // Show typing challenge after brief delay
        setTimeout(() => {
            this.showTypingChallenge();
        }, 1500);
    }

    // Show typing challenge section
    showTypingChallenge() {
        const currentWord = document.getElementById('currentWord').textContent;
        const wordData = this.wordDatabase.find(w => w.word === currentWord);
        
        if (wordData) {
            document.getElementById('targetSentence').textContent = wordData.sentence;
            document.getElementById('typingInput').value = '';
            document.getElementById('typingFeedback').textContent = '';
            
            this.hideSection('wordSection');
            this.hideSection('definitionsSection');
            this.showSection('typingSection');
            
            // Focus on typing input and start timing
            document.getElementById('typingInput').focus();
            this.typingStartTime = Date.now();
        }
    }

    // Update typing feedback in real-time
    updateTypingFeedback() {
        const input = document.getElementById('typingInput').value;
        const target = document.getElementById('targetSentence').textContent;
        const feedback = document.getElementById('typingFeedback');
        
        let correctChars = 0;
        let feedback_text = '';
        
        // Character-by-character comparison
        for (let i = 0; i < Math.max(input.length, target.length); i++) {
            if (i < input.length && i < target.length) {
                if (input[i] === target[i]) {
                    correctChars++;
                } else {
                    feedback_text = `Error at position ${i + 1}: expected "${target[i]}", got "${input[i]}"`;
                    break;
                }
            }
        }
        
        // Calculate and display accuracy
        const accuracy = target.length > 0 ? Math.round((correctChars / target.length) * 100) : 0;
        this.currentAccuracy = accuracy;
        
        if (input.length === 0) {
            feedback.textContent = 'Start typing...';
            feedback.style.color = '#666';
        } else if (correctChars === target.length && input.length === target.length) {
            feedback.textContent = '✅ Perfect! Ready to submit.';
            feedback.style.color = '#228b22';
        } else if (feedback_text) {
            feedback.textContent = feedback_text;
            feedback.style.color = '#dc143c';
        } else {
            feedback.textContent = `Accuracy: ${accuracy}%`;
            feedback.style.color = accuracy >= 80 ? '#228b22' : '#ff8c00';
        }
    }

    // Submit typing challenge
    submitTyping() {
        if (!this.gameActive) return;

        const input = document.getElementById('typingInput').value.trim();
        const target = document.getElementById('targetSentence').textContent;
        
        // Calculate typing metrics
        const typingTime = (Date.now() - this.typingStartTime) / 1000; // seconds
        const wordsTyped = input.split(' ').length;
        const wpm = Math.round((wordsTyped / typingTime) * 60);
        
        // Update total statistics
        this.totalTypingTime += typingTime;
        this.totalCharactersTyped += input.length;
        
        // Calculate accuracy
        let correctChars = 0;
        for (let i = 0; i < Math.min(input.length, target.length); i++) {
            if (input[i] === target[i]) correctChars++;
        }
        
        const accuracy = target.length > 0 ? Math.round((correctChars / target.length) * 100) : 0;
        
        // Award points based on accuracy and speed
        let points = 0;
        if (accuracy >= 90) points += 20;
        else if (accuracy >= 80) points += 15;
        else if (accuracy >= 70) points += 10;
        
        if (wpm >= 30) points += 10;
        else if (wpm >= 20) points += 5;
        
        this.score += points;
        
        // Show results
        this.showResults(accuracy, wpm, points, input === target);
    }

    // Show results of typing challenge
    showResults(accuracy, wpm, points, perfect) {
        const resultTitle = document.getElementById('resultTitle');
        const resultMessage = document.getElementById('resultMessage');
        const accuracyDisplay = document.getElementById('accuracy');
        
        if (perfect) {
            resultTitle.textContent = '🎉 Perfect!';
            resultMessage.textContent = `Amazing work! You earned ${points} crystals!`;
            this.playSuccessSound();
        } else if (accuracy >= 80) {
            resultTitle.textContent = '👍 Great Job!';
            resultMessage.textContent = `Well done! You earned ${points} crystals!`;
            this.playSuccessSound();
        } else {
            resultTitle.textContent = '💪 Keep Trying!';
            resultMessage.textContent = `You earned ${points} crystals. Practice makes perfect!`;
        }
        
        accuracyDisplay.textContent = `${accuracy}%`;
        
        this.hideSection('typingSection');
        this.showSection('resultsSection');
        
        this.updateDisplay();
    }

    // Move to next word
    nextWord() {
        // Re-enable definition buttons
        document.querySelectorAll('.definition-btn').forEach(btn => {
            btn.disabled = false;
            btn.className = 'definition-btn';
        });
        
        this.hideSection('resultsSection');
        this.presentWord();
    }

    // End the game
    endGame() {
        this.gameActive = false;
        clearInterval(this.gameTimer);
        
        // Calculate final statistics
        const avgWPM = this.totalTypingTime > 0 ? 
            Math.round((this.totalCharactersTyped / 5) / (this.totalTypingTime / 60)) : 0;
        const overallAccuracy = this.totalQuestions > 0 ? 
            Math.round((this.correctAnswers / this.totalQuestions) * 100) : 0;
        
        // Display final results
        document.getElementById('finalCrystals').textContent = this.score;
        document.getElementById('finalWPM').textContent = avgWPM;
        document.getElementById('finalAccuracy').textContent = `${overallAccuracy}%`;
        
        this.hideAllGameSections();
        document.getElementById('gameOver').style.display = 'flex';
        
        this.playGameOverSound();
    }

    // Restart the game
    restartGame() {
        document.getElementById('gameOver').style.display = 'none';
        this.showStartScreen();
    }

    // Update display elements
    updateDisplay() {
        document.getElementById('crystals').textContent = this.score;
        document.getElementById('timeLeft').textContent = this.timeLeft;
        
        // Calculate current WPM
        const currentWPM = this.totalTypingTime > 0 ? 
            Math.round((this.totalCharactersTyped / 5) / (this.totalTypingTime / 60)) : 0;
        document.getElementById('wpm').textContent = currentWPM;
    }

    // Utility functions for showing/hiding sections
    showSection(sectionId) {
        document.getElementById(sectionId).style.display = 'block';
    }

    hideSection(sectionId) {
        document.getElementById(sectionId).style.display = 'none';
    }

    hideAllGameSections() {
        this.hideSection('wordSection');
        this.hideSection('definitionsSection');
        this.hideSection('typingSection');
        this.hideSection('resultsSection');
    }

    // Sound effects using Web Audio API
    playSuccessSound() {
        this.playTone(523.25, 0.2); // C5 note
        setTimeout(() => this.playTone(659.25, 0.2), 100); // E5 note
    }

    playErrorSound() {
        this.playTone(220, 0.3); // A3 note
    }

    playGameOverSound() {
        // Play a sequence of notes for game over
        const notes = [523.25, 493.88, 440, 415.30]; // C5, B4, A4, G#4
        notes.forEach((freq, index) => {
            setTimeout(() => this.playTone(freq, 0.4), index * 200);
        });
    }

    // Generate tone using Web Audio API
    playTone(frequency, duration) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (error) {
            // Fallback for browsers that don't support Web Audio API
            console.log('Audio not supported');
        }
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LibraryOfLostWords();
});

// Handle visibility change to pause game when tab is not active
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.game && window.game.gameActive) {
        // Optionally pause the game when tab is hidden
        console.log('Game paused due to tab change');
    }
});

// Prevent context menu on right-click for better game experience
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust game container height based on window size
    const gameContainer = document.querySelector('.game-container');
    if (window.innerHeight > 500) {
        gameContainer.style.height = '90vh';
    } else {
        gameContainer.style.height = '450px';
    }
});

// Export game class for potential external use
window.LibraryOfLostWords = LibraryOfLostWords;