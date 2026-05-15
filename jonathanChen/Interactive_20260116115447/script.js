// Tamil Word Game - Primary 2 Level
// This game helps students form Tamil words from given letters

// Check if running in fullscreen mode (new tab vs iframe)
if (window.self === window.top) {
    document.body.classList.add('fullscreen');
}

// Game state management
const gameState = {
    score: 0,
    wordsFound: 0,
    targetWords: 5,
    currentWord: [],
    completedWords: [],
    availableLetters: [],
    usedLetterIndices: [],
    hintsUsed: 0, // ADDED: Track number of hints used
    currentHintWord: null // ADDED: Track which word hint is showing for
};

// Tamil words database for Primary 2 level (3-5 letters)
// These are common Tamil words appropriate for Primary 2 students
const wordDatabase = [
    { word: ['அ', 'ம்', 'மா'], meaning: 'Mother', points: 10 },
    { word: ['அ', 'ப்', 'பா'], meaning: 'Father', points: 10 },
    { word: ['ப', 'ல்', 'லி'], meaning: 'Lizard', points: 10 },
    { word: ['க', 'ண்'], meaning: 'Eye', points: 8 },
    { word: ['க', 'ய', 'ல்'], meaning: 'Rope', points: 10 },
    { word: ['ம', 'ர', 'ம்'], meaning: 'Tree', points: 10 },
    { word: ['ப', 'ல', 'ம்'], meaning: 'Fruit', points: 10 },
    { word: ['ந', 'ல', 'ம்'], meaning: 'Good', points: 10 },
    { word: ['வ', 'ண', 'ம்'], meaning: 'Color', points: 10 },
    { word: ['ப', 'ட', 'ம்'], meaning: 'Picture', points: 10 }
];

// Select 5 random words for the game
let selectedWords = [];
let letterPool = [];

// Initialize the game
function initGame() {
    // Reset game state
    gameState.score = 0;
    gameState.wordsFound = 0;
    gameState.currentWord = [];
    gameState.completedWords = [];
    gameState.usedLetterIndices = [];
    gameState.hintsUsed = 0; // ADDED: Reset hints counter
    gameState.currentHintWord = null; // ADDED: Reset current hint
    
    // Select 5 random words
    selectedWords = shuffleArray([...wordDatabase]).slice(0, 5);
    
    // Create letter pool from selected words
    letterPool = [];
    selectedWords.forEach(wordObj => {
        letterPool.push(...wordObj.word);
    });
    
    // Add some extra random letters to make it challenging
    const extraLetters = ['க', 'ச', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ'];
    const numExtra = Math.min(5, Math.floor(letterPool.length * 0.3));
    for (let i = 0; i < numExtra; i++) {
        letterPool.push(extraLetters[Math.floor(Math.random() * extraLetters.length)]);
    }
    
    // Shuffle the letter pool
    letterPool = shuffleArray(letterPool);
    gameState.availableLetters = [...letterPool];
    
    // Render the game
    renderLetterBank();
    updateDisplay();
    updateCompletedWords();
    hideHint(); // ADDED: Hide hint display on init
}

// Shuffle array utility function
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Render letter bank
function renderLetterBank() {
    const letterBank = document.getElementById('letterBank');
    letterBank.innerHTML = '';
    
    gameState.availableLetters.forEach((letter, index) => {
        const tile = document.createElement('button');
        tile.className = 'letter-tile';
        tile.textContent = letter;
        tile.dataset.index = index;
        
        // Check if letter is already used
        if (gameState.usedLetterIndices.includes(index)) {
            tile.classList.add('used');
            tile.disabled = true;
        }
        
        // Add click event
        tile.addEventListener('click', () => selectLetter(index, letter));
        
        // Add touch feedback
        tile.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        tile.addEventListener('touchend', function() {
            this.style.transform = '';
        });
        
        letterBank.appendChild(tile);
    });
}

// Select a letter from the bank
function selectLetter(index, letter) {
    // Check if already used
    if (gameState.usedLetterIndices.includes(index)) {
        return;
    }
    
    // Check if word is full (max 5 letters)
    if (gameState.currentWord.length >= 5) {
        showFeedback('Word is full! Submit or clear.', 'error');
        return;
    }
    
    // Add letter to current word
    gameState.currentWord.push({ letter, index });
    gameState.usedLetterIndices.push(index);
    
    // Update display
    updateWordDisplay();
    renderLetterBank();
}

// Update word display
function updateWordDisplay() {
    const wordSlots = document.getElementById('wordSlots');
    wordSlots.innerHTML = '';
    
    // Create 5 slots
    for (let i = 0; i < 5; i++) {
        const slot = document.createElement('div');
        slot.className = 'letter-slot';
        
        if (i < gameState.currentWord.length) {
            slot.classList.add('filled');
            slot.textContent = gameState.currentWord[i].letter;
            
            // Make slot clickable to remove letter
            slot.style.cursor = 'pointer';
            slot.addEventListener('click', () => removeLetter(i));
        } else {
            slot.classList.add('empty');
            slot.textContent = '_';
        }
        
        wordSlots.appendChild(slot);
    }
    
    // Enable/disable submit button
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = gameState.currentWord.length === 0;
}

// Remove letter from current word
function removeLetter(slotIndex) {
    if (slotIndex >= gameState.currentWord.length) return;
    
    // Get the letter index to restore
    const letterIndex = gameState.currentWord[slotIndex].index;
    
    // Remove from used indices
    const usedIndex = gameState.usedLetterIndices.indexOf(letterIndex);
    if (usedIndex > -1) {
        gameState.usedLetterIndices.splice(usedIndex, 1);
    }
    
    // Remove from current word
    gameState.currentWord.splice(slotIndex, 1);
    
    // Update display
    updateWordDisplay();
    renderLetterBank();
}

// Clear current word
function clearWord() {
    gameState.currentWord = [];
    gameState.usedLetterIndices = gameState.usedLetterIndices.filter(index => {
        // Keep indices that are in completed words
        return gameState.completedWords.some(word => 
            word.indices.includes(index)
        );
    });
    
    updateWordDisplay();
    renderLetterBank();
}

// ADDED: Show hint function
function showHint() {
    // Get remaining words (not yet completed)
    const remainingWords = selectedWords.filter(wordObj => {
        const wordStr = wordObj.word.join('');
        return !gameState.completedWords.some(completed => completed.word === wordStr);
    });
    
    // Check if there are remaining words
    if (remainingWords.length === 0) {
        showFeedback('No more words to find!', 'error');
        return;
    }
    
    // Select a random word from remaining words
    const hintWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
    gameState.currentHintWord = hintWord;
    
    // Display hint with meaning and word length
    const hintDisplay = document.getElementById('hintDisplay');
    const hintText = document.getElementById('hintText');
    hintText.innerHTML = `<strong>Hint:</strong> Find a word meaning "<em>${hintWord.meaning}</em>" (${hintWord.word.length} letters)`;
    hintDisplay.classList.add('show');
    
    // Highlight the first letter of the hint word in the letter bank
    highlightHintLetter(hintWord.word[0]);
    
    // Increment hints used counter
    gameState.hintsUsed++;
    
    // Auto-hide hint after 8 seconds
    setTimeout(() => {
        hideHint();
    }, 8000);
}

// ADDED: Hide hint function
function hideHint() {
    const hintDisplay = document.getElementById('hintDisplay');
    hintDisplay.classList.remove('show');
    gameState.currentHintWord = null;
    
    // Remove all hint highlights
    const tiles = document.querySelectorAll('.letter-tile');
    tiles.forEach(tile => {
        tile.classList.remove('hint-highlight');
    });
}

// ADDED: Highlight hint letter in letter bank
function highlightHintLetter(targetLetter) {
    // Remove previous highlights
    const tiles = document.querySelectorAll('.letter-tile');
    tiles.forEach(tile => {
        tile.classList.remove('hint-highlight');
    });
    
    // Find and highlight the first occurrence of the target letter that's not used
    gameState.availableLetters.forEach((letter, index) => {
        if (letter === targetLetter && !gameState.usedLetterIndices.includes(index)) {
            const tile = document.querySelector(`.letter-tile[data-index="${index}"]`);
            if (tile && !tile.classList.contains('used')) {
                tile.classList.add('hint-highlight');
                return;
            }
        }
    });
}

// Submit word
function submitWord() {
    if (gameState.currentWord.length === 0) {
        return;
    }
    
    // Get the formed word
    const formedWord = gameState.currentWord.map(item => item.letter);
    const formedWordStr = formedWord.join('');
    
    // Check if word matches any target word
    const matchedWord = selectedWords.find(wordObj => {
        const targetWord = wordObj.word.join('');
        return targetWord === formedWordStr;
    });
    
    // Check if already completed
    const alreadyCompleted = gameState.completedWords.some(word => 
        word.word === formedWordStr
    );
    
    if (matchedWord && !alreadyCompleted) {
        // Correct word!
        gameState.score += matchedWord.points;
        gameState.wordsFound++;
        
        // Save completed word with indices
        gameState.completedWords.push({
            word: formedWordStr,
            meaning: matchedWord.meaning,
            indices: gameState.currentWord.map(item => item.index)
        });
        
        // Clear current word but keep letters as used
        gameState.currentWord = [];
        
        // ADDED: Hide hint if the completed word was the hinted word
        if (gameState.currentHintWord && gameState.currentHintWord.word.join('') === formedWordStr) {
            hideHint();
        }
        
        // Show success feedback
        showFeedback(`✓ Correct! +${matchedWord.points} points`, 'success');
        
        // Update display
        updateDisplay();
        updateCompletedWords();
        updateWordDisplay();
        renderLetterBank();
        
        // Check if game is complete
        if (gameState.wordsFound >= gameState.targetWords) {
            setTimeout(() => showCelebration(), 500);
        }
    } else if (alreadyCompleted) {
        showFeedback('You already found this word!', 'error');
    } else {
        // Wrong word
        showFeedback('✗ Not a valid word. Try again!', 'error');
    }
}

// Update score and words found display
function updateDisplay() {
    document.getElementById('scoreValue').textContent = gameState.score;
    document.getElementById('wordsFound').textContent = 
        `${gameState.wordsFound}/${gameState.targetWords}`;
}

// Update completed words list
function updateCompletedWords() {
    const completedList = document.getElementById('completedList');
    
    if (gameState.completedWords.length === 0) {
        completedList.innerHTML = '<div class="empty-message">No words yet. Start forming words!</div>';
    } else {
        completedList.innerHTML = '';
        gameState.completedWords.forEach(wordObj => {
            const wordElement = document.createElement('div');
            wordElement.className = 'completed-word';
            wordElement.textContent = wordObj.word;
            wordElement.title = wordObj.meaning;
            completedList.appendChild(wordElement);
        });
    }
}

// Show feedback message
function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type} show`;
    
    setTimeout(() => {
        feedback.classList.remove('show');
    }, 2000);
}

// Show celebration overlay
function showCelebration() {
    const overlay = document.getElementById('celebrationOverlay');
    document.getElementById('finalScore').textContent = gameState.score;
    overlay.classList.add('show');
}

// Hide celebration overlay and restart
function hideCelebration() {
    const overlay = document.getElementById('celebrationOverlay');
    overlay.classList.remove('show');
    initGame();
}

// Event listeners
document.getElementById('clearBtn').addEventListener('click', clearWord);
document.getElementById('submitBtn').addEventListener('click', submitWord);
document.getElementById('restartBtn').addEventListener('click', hideCelebration);

// ADDED: Hint button event listener
document.getElementById('hintBtn').addEventListener('click', showHint);

// Info icon and tooltip
document.getElementById('infoIcon').addEventListener('click', () => {
    document.getElementById('tooltip').classList.add('show');
});

document.getElementById('closeTooltip').addEventListener('click', () => {
    document.getElementById('tooltip').classList.remove('show');
});

// Close tooltip when clicking outside
document.getElementById('tooltip').addEventListener('click', (e) => {
    if (e.target.id === 'tooltip') {
        document.getElementById('tooltip').classList.remove('show');
    }
});

// Keyboard support for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        submitWord();
    } else if (e.key === 'Escape') {
        clearWord();
    } else if (e.key === 'h' || e.key === 'H') {
        // ADDED: Press 'H' key for hint
        showHint();
    }
});

// Initialize game on load
window.addEventListener('load', () => {
    initGame();
    // Show instructions on first load
    setTimeout(() => {
        document.getElementById('tooltip').classList.add('show');
    }, 500);
});