// Game data - vocabulary words and their meanings organized by levels
const gameLevels = [
    // Level 1 - Basic vocabulary
    [
        { word: "Happy", meaning: "Feeling joy or pleasure" },
        { word: "Sad", meaning: "Feeling unhappy or sorrowful" },
        { word: "Big", meaning: "Large in size" },
        { word: "Small", meaning: "Little in size" },
        { word: "Fast", meaning: "Moving quickly" }
    ],
    // Level 2 - Intermediate vocabulary
    [
        { word: "Brave", meaning: "Showing courage" },
        { word: "Clever", meaning: "Quick to understand" },
        { word: "Gentle", meaning: "Kind and soft" },
        { word: "Shiny", meaning: "Reflecting light" },
        { word: "Noisy", meaning: "Making loud sounds" },
        { word: "Quiet", meaning: "Making little sound" }
    ],
    // Level 3 - Advanced vocabulary
    [
        { word: "Curious", meaning: "Eager to learn" },
        { word: "Generous", meaning: "Willing to give" },
        { word: "Mysterious", meaning: "Difficult to understand" },
        { word: "Magnificent", meaning: "Extremely beautiful" },
        { word: "Enormous", meaning: "Extremely large" },
        { word: "Delicious", meaning: "Very tasty" },
        { word: "Ancient", meaning: "Very old" }
    ]
];

// Game state variables
let currentLevel = 0;
let score = 0;
let selectedWord = null;
let selectedMeaning = null;
let correctMatches = [];
let attempts = 0;
let interactionLog = []; // Array to store interaction logs
let starsEarned = 0;

// DOM elements
const wordContainer = document.getElementById('word-container');
const meaningContainer = document.getElementById('meaning-container');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const feedbackMessage = document.getElementById('feedback-message');
const checkButton = document.getElementById('check-button');
const nextLevelButton = document.getElementById('next-level-button');
const resetButton = document.getElementById('reset-button');
const stars = [
    document.getElementById('star1'),
    document.getElementById('star2'),
    document.getElementById('star3')
];

// Initialize the game
function initGame() {
    // Reset game state
    currentLevel = 0;
    score = 0;
    correctMatches = [];
    attempts = 0;
    starsEarned = 0;
    
    // Update UI
    updateScore();
    updateLevel();
    resetStars();

    // Display analytics on reset
    displayAnalytics();
    
    // Load the first level
    loadLevel(currentLevel);
    
    // Reset button states
    checkButton.disabled = false;
    nextLevelButton.disabled = true;
}

// Load a specific level
function loadLevel(level) {
    // Clear previous level content
    wordContainer.innerHTML = '';
    meaningContainer.innerHTML = '';
    feedbackMessage.textContent = '';
    correctMatches = [];
    attempts = 0;
    
    // Get the vocabulary pairs for this level
    const vocabularyPairs = gameLevels[level];
    
    // Create and shuffle arrays of words and meanings
    const words = vocabularyPairs.map(pair => pair.word);
    const meanings = vocabularyPairs.map(pair => pair.meaning);
    
    // Shuffle the arrays
    shuffleArray(words);
    shuffleArray(meanings);
    
    // Create word cards
    words.forEach(word => {
        const wordCard = document.createElement('div');
        wordCard.className = 'word-card';
        wordCard.textContent = word;
        wordCard.dataset.word = word;
        wordCard.addEventListener('click', () => selectWord(wordCard));
        wordContainer.appendChild(wordCard);
    });
    
    // Create meaning cards
    meanings.forEach(meaning => {
        const meaningCard = document.createElement('div');
        meaningCard.className = 'meaning-card';
        meaningCard.textContent = meaning;
        meaningCard.dataset.meaning = meaning;
        meaningCard.addEventListener('click', () => selectMeaning(meaningCard));
        meaningContainer.appendChild(meaningCard);
    });
}

// Handle word card selection
function selectWord(wordCard) {
    // Deselect previously selected word if any
    const previouslySelectedWord = document.querySelector('.word-card.selected');
    if (previouslySelectedWord) {
        previouslySelectedWord.classList.remove('selected');
    }
    
    // Select the clicked word
    wordCard.classList.add('selected');
    selectedWord = wordCard.dataset.word;
    
    // Check if we have both a word and meaning selected
    checkSelection();
}

// Handle meaning card selection
function selectMeaning(meaningCard) {
    // Deselect previously selected meaning if any
    const previouslySelectedMeaning = document.querySelector('.meaning-card.selected');
    if (previouslySelectedMeaning) {
        previouslySelectedMeaning.classList.remove('selected');
    }
    
    // Select the clicked meaning
    meaningCard.classList.add('selected');
    selectedMeaning = meaningCard.dataset.meaning;
    
    // Check if we have both a word and meaning selected
    checkSelection();
}

// Check if both a word and meaning are selected
function checkSelection() {
    if (selectedWord && selectedMeaning) {
        // Enable the check button if both are selected
        checkButton.disabled = false;
    }
}

// Check if the selected word and meaning match
function checkMatch() {
    attempts++;
    
    // Find the correct meaning for the selected word
    const vocabularyPairs = gameLevels[currentLevel];
    const correctPair = vocabularyPairs.find(pair => pair.word === selectedWord);
    
    if (correctPair && correctPair.meaning === selectedMeaning) {
        // Correct match
        handleCorrectMatch();
    } else {
        // Incorrect match
        handleIncorrectMatch();
    }
    
    // Reset selections
    selectedWord = null;
    selectedMeaning = null;
    
    // Check if level is complete
    checkLevelCompletion();
}

// Handle correct match
function handleCorrectMatch() {
    // Log the interaction
    const logEntry = {
        timestamp: new Date().toISOString(),
        action: 'correct_match',
        word: selectedWord,
        meaning: selectedMeaning,
        level: currentLevel + 1
    };
    interactionLog.push(logEntry);
    console.log('Interaction Log:', logEntry);
    // Find the selected elements
    const wordCard = document.querySelector(`.word-card[data-word="${selectedWord}"]`);
    const meaningCard = document.querySelector(`.meaning-card[data-meaning="${selectedMeaning}"]`);
    
    // Add to correct matches
    correctMatches.push(selectedWord);
    
    // Update UI for correct match
    wordCard.classList.remove('selected');
    meaningCard.classList.remove('selected');
    wordCard.classList.add('correct');
    meaningCard.classList.add('correct');
    
    // Disable the matched cards
    wordCard.style.pointerEvents = 'none';
    meaningCard.style.pointerEvents = 'none';
    
    // Update score
    score += 1;
    if (score > 30) score = 30; // Cap score at 30
    updateScore();
    
    // Show feedback
    feedbackMessage.textContent = 'Correct! Great job! 🎉';
    feedbackMessage.style.color = '#22c55e';
    
    // Play success sound effect
    playSound('success');
}

// Handle incorrect match
function handleIncorrectMatch() {
    // Log the interaction
    const logEntry = {
        timestamp: new Date().toISOString(),
        action: 'incorrect_match',
        word: selectedWord,
        meaning: selectedMeaning,
        level: currentLevel + 1
    };
    interactionLog.push(logEntry);
    console.log('Interaction Log:', logEntry);
    // Find the selected elements
    const wordCard = document.querySelector(`.word-card[data-word="${selectedWord}"]`);
    const meaningCard = document.querySelector(`.meaning-card[data-meaning="${selectedMeaning}"]`);
    
    // Update UI for incorrect match
    wordCard.classList.remove('selected');
    meaningCard.classList.remove('selected');
    
    // Temporarily show incorrect feedback
    wordCard.classList.add('incorrect');
    meaningCard.classList.add('incorrect');
    
    // Remove incorrect styling after animation
    setTimeout(() => {
        wordCard.classList.remove('incorrect');
        meaningCard.classList.remove('incorrect');
    }, 1000);
    
    // Show feedback
    feedbackMessage.textContent = 'Not quite right. Try again! 💪';
    feedbackMessage.style.color = '#ef4444';
    
    // Play error sound effect
    playSound('error');
}

// Check if level is complete
function checkLevelCompletion() {
    const totalPairsInLevel = gameLevels[currentLevel].length;
    if (correctMatches.length === totalPairsInLevel) {
        // Level complete
        feedbackMessage.textContent = `Level ${currentLevel + 1} complete!`;
        feedbackMessage.className = 'feedback-message correct';
        checkButton.disabled = true;

        if (currentLevel < gameLevels.length - 1) {
            // More levels exist
            nextLevelButton.disabled = false;
        } else {
            // Last level completed - Game Over
            feedbackMessage.textContent = "Congratulations! You've completed all levels.";
            nextLevelButton.disabled = true; // No next level
            checkButton.disabled = true;
            displayAnalytics(); // Show analytics at the end
        }

        // Award stars based on attempts
        awardStars();
    }
}

// Award stars based on performance
function awardStars() {
    const vocabularyPairs = gameLevels[currentLevel];
    const perfectScore = vocabularyPairs.length;
    
    // Calculate stars based on attempts
    // 3 stars: Perfect (no mistakes)
    // 2 stars: Good (few mistakes)
    // 1 star: Completed (many mistakes)
    let newStars = 0;
    
    if (attempts === perfectScore) {
        newStars = 3; // Perfect score
    } else if (attempts <= perfectScore * 1.5) {
        newStars = 2; // Good score
    } else {
        newStars = 1; // Completed
    }
    
    // Update stars display
    for (let i = 0; i < newStars; i++) {
        setTimeout(() => {
            stars[i].classList.add('earned');
            playSound('star');
        }, i * 500);
    }
    
    starsEarned = newStars;
}

// Move to the next level
function nextLevel() {
    currentLevel++;
    updateLevel();
    resetStars();
    loadLevel(currentLevel);
    nextLevelButton.disabled = true;
    checkButton.disabled = false;
}

// Reset stars display
function resetStars() {
    stars.forEach(star => star.classList.remove('earned'));
}

// Update the score display
function updateScore() {
    scoreElement.textContent = score;
    
    // Animate score change
    scoreElement.classList.add('score-change');
    setTimeout(() => {
        scoreElement.classList.remove('score-change');
    }, 500);
}

// Update the level display
function updateLevel() {
    levelElement.textContent = currentLevel + 1;
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Play sound effects (placeholder function - would need actual audio files)
function playSound(type) {
    // This is a placeholder - in a real implementation, you would play actual sound files
    // For example:
    // const sound = new Audio(`sounds/${type}.mp3`);
    // sound.play();
    
    // For now, we'll just log to console
    console.log(`Playing ${type} sound`);
}

// Display learning analytics at the end of the game
function displayAnalytics() {
    const analyticsSection = document.getElementById('analytics-section');
    const analyticsContent = document.getElementById('analytics-content');

    // Clear previous analytics content
    analyticsContent.innerHTML = '';

    // Check if there's any interaction log data
    if (interactionLog.length === 0) {
        analyticsContent.innerHTML = '<p>No interactions recorded yet.</p>';
        analyticsSection.style.display = 'block'; // Show the section
        return;
    }

    // Create the table structure
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Level</th>
                    <th>Action</th>
                    <th>Word</th>
                    <th>Selected Meaning</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Populate table rows with interaction data
    interactionLog.forEach(log => {
        const resultClass = log.action === 'correct_match' ? 'correct-answer' : 'incorrect-answer';
        const resultText = log.action === 'correct_match' ? 'Correct' : 'Incorrect';
        
        // Find the correct meaning for the word in that level's data
        let correctMeaning = 'N/A';
        if (log.level > 0 && log.level <= gameLevels.length) {
            const levelData = gameLevels[log.level - 1];
            const pair = levelData.find(p => p.word === log.word);
            if (pair) {
                correctMeaning = pair.meaning;
            }
        }

        tableHTML += `
            <tr>
                <td>${new Date(log.timestamp).toLocaleString()}</td>
                <td>${log.level}</td>
                <td>${log.action.replace('_', ' ')}</td>
                <td>${log.word}</td>
                <td>${log.meaning} ${log.action !== 'correct_match' ? `(Correct: ${correctMeaning})` : ''}</td>
                <td class="${resultClass}">${resultText}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    // Set the generated table HTML to the content area
    analyticsContent.innerHTML = tableHTML;

    // Make the analytics section visible
    analyticsSection.style.display = 'block';
    console.log('Displaying analytics section.');
}

// Event listeners
checkButton.addEventListener('click', checkMatch);
nextLevelButton.addEventListener('click', nextLevel);
resetButton.addEventListener('click', initGame);

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);