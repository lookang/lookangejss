// ============================================
// GAME STATE AND CONFIGURATION
// ============================================

// Game state object to track all game variables
// MODIFIED: Lives now persist across levels (not reset per level)
// NEW: Added mistakes array to track student errors
const gameState = {
    level: 1,
    score: 0,
    lives: 3, // Lives persist for entire game
    timeRemaining: 60,
    isPlaying: false,
    isPaused: false,
    bubbles: [],
    timerInterval: null,
    spawnInterval: null,
    maxLevel: 10,
    mistakes: [] // NEW: Array to track all mistakes made during the game
};

// Configuration for difficulty scaling across levels
const levelConfig = {
    1: { spawnRate: 2000, bubbleSpeed: 8, maxBubbles: 3 },
    2: { spawnRate: 1800, bubbleSpeed: 9, maxBubbles: 4 },
    3: { spawnRate: 1600, bubbleSpeed: 10, maxBubbles: 4 },
    4: { spawnRate: 1400, bubbleSpeed: 11, maxBubbles: 5 },
    5: { spawnRate: 1300, bubbleSpeed: 12, maxBubbles: 5 },
    6: { spawnRate: 1200, bubbleSpeed: 13, maxBubbles: 6 },
    7: { spawnRate: 1100, bubbleSpeed: 14, maxBubbles: 6 },
    8: { spawnRate: 1000, bubbleSpeed: 15, maxBubbles: 7 },
    9: { spawnRate: 900, bubbleSpeed: 16, maxBubbles: 7 },
    10: { spawnRate: 800, bubbleSpeed: 17, maxBubbles: 8 }
};

// ============================================
// DOM ELEMENTS
// ============================================

const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('scoreDisplay');
const levelDisplay = document.getElementById('levelDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const livesDisplay = document.getElementById('livesDisplay');
const tooltip = document.getElementById('tooltip');

// Overlay screens
const startScreen = document.getElementById('startScreen');
const levelCompleteScreen = document.getElementById('levelCompleteScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const victoryScreen = document.getElementById('victoryScreen');

// Buttons
const startBtn = document.getElementById('startBtn');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const restartBtn = document.getElementById('restartBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// NEW: Mistake review elements
const mistakeList = document.getElementById('mistakeList');

// ============================================
// INITIALIZATION
// ============================================

// Check if running in fullscreen mode (new tab vs iframe)
if (window.self === window.top) {
    document.body.classList.add('fullscreen');
}

// ============================================
// EQUATION GENERATION
// ============================================

/**
 * Generates a random math equation (addition or subtraction within 10)
 * @param {boolean} shouldBeCorrect - Whether the equation should be mathematically correct
 * @returns {object} Object containing equation string and correctness
 */
function generateEquation(shouldBeCorrect) {
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, correctAnswer, displayAnswer;
    
    if (operation === '+') {
        // Addition within 10
        num1 = Math.floor(Math.random() * 9) + 1; // 1-9
        num2 = Math.floor(Math.random() * (10 - num1)) + 1; // Ensure sum <= 10
        correctAnswer = num1 + num2;
    } else {
        // Subtraction (result >= 0)
        num1 = Math.floor(Math.random() * 10) + 1; // 1-10
        num2 = Math.floor(Math.random() * num1) + 1; // Ensure positive result
        correctAnswer = num1 - num2;
    }
    
    if (shouldBeCorrect) {
        displayAnswer = correctAnswer;
    } else {
        // Generate a wrong answer (different from correct answer)
        const wrongAnswers = [];
        for (let i = 0; i <= 10; i++) {
            if (i !== correctAnswer) wrongAnswers.push(i);
        }
        displayAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
    }
    
    return {
        equation: `${num1} ${operation} ${num2} = ${displayAnswer}`,
        isCorrect: shouldBeCorrect,
        // NEW: Store the correct answer for review purposes
        correctAnswer: correctAnswer,
        num1: num1,
        num2: num2,
        operation: operation,
        displayAnswer: displayAnswer
    };
}

// ============================================
// BUBBLE CREATION AND MANAGEMENT
// ============================================

/**
 * Creates a new bubble with an equation
 * MODIFIED: Changed probability - 60% correct (should pop), 40% wrong (should avoid)
 */
function createBubble() {
    const config = levelConfig[gameState.level];
    
    // Limit number of bubbles on screen
    if (gameState.bubbles.length >= config.maxBubbles) {
        return;
    }
    
    // MODIFIED: 60% chance of CORRECT equation (which students should pop)
    // 40% chance of WRONG equation (which students should avoid)
    const shouldBeCorrect = Math.random() < 0.6;
    const equationData = generateEquation(shouldBeCorrect);
    
    // Create bubble element
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = equationData.equation;
    bubble.dataset.correct = equationData.isCorrect;
    
    // Random horizontal position
    const maxLeft = gameArea.clientWidth - 80;
    const left = Math.random() * maxLeft;
    bubble.style.left = `${left}px`;
    
    // Random size between 60-90px
    const size = 60 + Math.random() * 30;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Set animation duration based on level speed
    const duration = config.bubbleSpeed;
    bubble.style.animationDuration = `${duration}s`;
    
    // Add click/touch event listeners
    bubble.addEventListener('click', handleBubbleClick);
    bubble.addEventListener('touchstart', handleBubbleTouch, { passive: false });
    
    // Add to game area
    gameArea.appendChild(bubble);
    
    // Track bubble
    const bubbleData = {
        element: bubble,
        isCorrect: equationData.isCorrect,
        equationData: equationData, // NEW: Store full equation data for mistake tracking
        timeout: setTimeout(() => {
            removeBubble(bubbleData, true);
        }, duration * 1000)
    };
    
    gameState.bubbles.push(bubbleData);
}

/**
 * Handles bubble click event
 */
function handleBubbleClick(event) {
    if (!gameState.isPlaying) return;
    event.preventDefault();
    popBubble(event.target);
}

/**
 * Handles bubble touch event (for mobile devices)
 */
function handleBubbleTouch(event) {
    if (!gameState.isPlaying) return;
    event.preventDefault();
    popBubble(event.target);
}

/**
 * Pops a bubble and handles scoring logic
 * MODIFIED: Reversed logic - pop correct = good, pop wrong = lose life
 * NEW: Track mistakes for review
 */
function popBubble(bubbleElement) {
    const bubbleData = gameState.bubbles.find(b => b.element === bubbleElement);
    if (!bubbleData) return;
    
    const isCorrect = bubbleElement.dataset.correct === 'true';
    
    // Create particle effect
    createParticles(bubbleElement, isCorrect);
    
    // MODIFIED: Reversed game logic
    if (isCorrect) {
        // Student popped a CORRECT equation (correct action!)
        gameState.score += 10;
        updateScore();
        showTooltip('✓ Good job! +10', '#4CAF50');
    } else {
        // Student popped a WRONG equation (should NOT have popped it)
        gameState.lives--;
        updateLives();
        showTooltip('❌ That was wrong!', '#FF5252');
        
        // NEW: Record this mistake for review
        recordMistake(bubbleData.equationData, 'wrongPop');
        
        // MODIFIED: Check for game over (lives persist across levels)
        if (gameState.lives <= 0) {
            endGame();
        }
    }
    
    // Remove bubble
    removeBubble(bubbleData, false);
}

/**
 * Removes a bubble from the game
 * @param {object} bubbleData - The bubble data object
 * @param {boolean} escaped - Whether the bubble escaped (floated away)
 * MODIFIED: If a CORRECT equation escapes, lose a life
 * NEW: Track missed correct equations as mistakes
 */
function removeBubble(bubbleData, escaped) {
    if (!bubbleData || !bubbleData.element.parentNode) return;
    
    // MODIFIED: If a CORRECT equation escaped, lose a life
    if (escaped && bubbleData.isCorrect) {
        gameState.lives--;
        updateLives();
        showTooltip('❌ Missed one!', '#FF9800');
        
        // NEW: Record this mistake for review
        recordMistake(bubbleData.equationData, 'missedCorrect');
        
        // MODIFIED: Check for game over (lives persist across levels)
        if (gameState.lives <= 0) {
            endGame();
            return;
        }
    }
    
    // Clear timeout
    clearTimeout(bubbleData.timeout);
    
    // Add popping animation
    bubbleData.element.classList.add('popping');
    
    // Remove from DOM after animation
    setTimeout(() => {
        if (bubbleData.element.parentNode) {
            bubbleData.element.parentNode.removeChild(bubbleData.element);
        }
    }, 300);
    
    // Remove from tracking array
    const index = gameState.bubbles.indexOf(bubbleData);
    if (index > -1) {
        gameState.bubbles.splice(index, 1);
    }
}

/**
 * Creates particle effect when bubble is popped
 */
function createParticles(bubbleElement, isCorrect) {
    const rect = bubbleElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create 8 particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = `particle ${isCorrect ? 'correct' : 'wrong'}`;
        
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 30 + Math.random() * 20;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 600);
    }
}

// ============================================
// NEW: MISTAKE TRACKING SYSTEM
// ============================================

/**
 * Records a mistake made by the student for later review
 * @param {object} equationData - The equation data object
 * @param {string} mistakeType - Type of mistake: 'wrongPop' or 'missedCorrect'
 */
function recordMistake(equationData, mistakeType) {
    const mistake = {
        equation: equationData.equation,
        num1: equationData.num1,
        num2: equationData.num2,
        operation: equationData.operation,
        correctAnswer: equationData.correctAnswer,
        displayAnswer: equationData.displayAnswer,
        type: mistakeType,
        level: gameState.level
    };
    
    gameState.mistakes.push(mistake);
}

/**
 * Displays the mistake review section on the game over screen
 */
function displayMistakeReview() {
    mistakeList.innerHTML = ''; // Clear previous content
    
    if (gameState.mistakes.length === 0) {
        // No mistakes made - show congratulatory message
        const noMistakes = document.createElement('div');
        noMistakes.className = 'no-mistakes';
        noMistakes.textContent = '🎉 Perfect! You made no mistakes!';
        mistakeList.appendChild(noMistakes);
        return;
    }
    
    // Display each mistake
    gameState.mistakes.forEach((mistake, index) => {
        const mistakeItem = document.createElement('div');
        mistakeItem.className = `mistake-item ${mistake.type === 'missedCorrect' ? 'missed' : ''}`;
        
        // Equation display
        const equationDiv = document.createElement('div');
        equationDiv.className = 'mistake-equation';
        equationDiv.textContent = mistake.equation;
        
        // Mistake type description
        const typeDiv = document.createElement('div');
        typeDiv.className = `mistake-type ${mistake.type === 'wrongPop' ? 'wrong-pop' : 'missed-correct'}`;
        if (mistake.type === 'wrongPop') {
            typeDiv.textContent = '❌ You popped this wrong equation';
        } else {
            typeDiv.textContent = '⚠️ You missed this correct equation';
        }
        
        // Explanation with correct answer
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'mistake-explanation';
        explanationDiv.textContent = `✓ Correct: ${mistake.num1} ${mistake.operation} ${mistake.num2} = ${mistake.correctAnswer}`;
        
        // Assemble the mistake item
        mistakeItem.appendChild(equationDiv);
        mistakeItem.appendChild(typeDiv);
        mistakeItem.appendChild(explanationDiv);
        
        mistakeList.appendChild(mistakeItem);
    });
}

// ============================================
// GAME FLOW CONTROL
// ============================================

/**
 * Starts a new game
 * MODIFIED: Lives are reset only when starting a completely new game
 * NEW: Clear mistakes array when starting new game
 */
function startGame() {
    // Reset game state
    gameState.level = 1;
    gameState.score = 0;
    gameState.lives = 3; // Reset lives only at game start
    gameState.timeRemaining = 60;
    gameState.isPlaying = true;
    gameState.mistakes = []; // NEW: Clear mistakes for new game
    
    // Update displays
    updateScore();
    updateLevel();
    updateLives();
    updateTimer();
    
    // Hide start screen
    startScreen.classList.add('hidden');
    
    // Clear any existing bubbles
    clearAllBubbles();
    
    // Start game loops
    startGameLoops();
}

/**
 * Starts the game timer and bubble spawning
 */
function startGameLoops() {
    const config = levelConfig[gameState.level];
    
    // Timer countdown
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        updateTimer();
        
        if (gameState.timeRemaining <= 0) {
            completeLevel();
        }
    }, 1000);
    
    // Bubble spawning
    gameState.spawnInterval = setInterval(() => {
        if (gameState.isPlaying) {
            createBubble();
        }
    }, config.spawnRate);
    
    // Create initial bubbles
    createBubble();
}

/**
 * Stops all game loops
 */
function stopGameLoops() {
    clearInterval(gameState.timerInterval);
    clearInterval(gameState.spawnInterval);
    gameState.timerInterval = null;
    gameState.spawnInterval = null;
}

/**
 * Completes the current level
 */
function completeLevel() {
    gameState.isPlaying = false;
    stopGameLoops();
    clearAllBubbles();
    
    if (gameState.level >= gameState.maxLevel) {
        // All levels completed!
        showVictoryScreen();
    } else {
        // Show level complete screen
        showLevelCompleteScreen();
    }
}

/**
 * Advances to the next level
 * MODIFIED: Lives are NOT reset between levels - they persist throughout the game
 */
function nextLevel() {
    gameState.level++;
    gameState.timeRemaining = 60;
    gameState.isPlaying = true;
    // MODIFIED: Lives are NOT reset here - they persist across levels
    
    updateLevel();
    updateTimer();
    updateLives(); // Update display to show current lives
    
    levelCompleteScreen.classList.add('hidden');
    
    startGameLoops();
}

/**
 * Ends the game (game over)
 * NEW: Display mistake review when game ends
 */
function endGame() {
    gameState.isPlaying = false;
    stopGameLoops();
    clearAllBubbles();
    displayMistakeReview(); // NEW: Show mistakes before displaying game over screen
    showGameOverScreen();
}

/**
 * Clears all bubbles from the screen
 */
function clearAllBubbles() {
    gameState.bubbles.forEach(bubbleData => {
        clearTimeout(bubbleData.timeout);
        if (bubbleData.element.parentNode) {
            bubbleData.element.parentNode.removeChild(bubbleData.element);
        }
    });
    gameState.bubbles = [];
}

// ============================================
// UI UPDATE FUNCTIONS
// ============================================

/**
 * Updates the score display
 */
function updateScore() {
    scoreDisplay.textContent = gameState.score;
}

/**
 * Updates the level display
 */
function updateLevel() {
    levelDisplay.textContent = gameState.level;
}

/**
 * Updates the timer display
 */
function updateTimer() {
    timerDisplay.textContent = gameState.timeRemaining;
    
    // Change color when time is running low
    if (gameState.timeRemaining <= 10) {
        timerDisplay.style.color = '#FF5252';
    } else {
        timerDisplay.style.color = '#FF5722';
    }
}

/**
 * Updates the lives display
 */
function updateLives() {
    const hearts = '❤️'.repeat(Math.max(0, gameState.lives));
    const emptyHearts = '🖤'.repeat(Math.max(0, 3 - gameState.lives));
    livesDisplay.textContent = hearts + emptyHearts;
}

/**
 * Shows a tooltip message in the center of the screen
 */
function showTooltip(message, color) {
    tooltip.textContent = message;
    tooltip.style.background = color;
    tooltip.classList.remove('hidden');
    
    setTimeout(() => {
        tooltip.classList.add('hidden');
    }, 1000);
}

// ============================================
// SCREEN MANAGEMENT
// ============================================

/**
 * Shows the level complete screen
 * MODIFIED: Display remaining lives information
 */
function showLevelCompleteScreen() {
    const levelScoreText = document.getElementById('levelScoreText');
    levelScoreText.textContent = `Level ${gameState.level} Complete! Score: ${gameState.score} | Lives: ${gameState.lives}`;
    levelCompleteScreen.classList.remove('hidden');
}

/**
 * Shows the game over screen
 * NEW: Now includes mistake review section
 */
function showGameOverScreen() {
    const finalScoreText = document.getElementById('finalScoreText');
    const levelsCompletedText = document.getElementById('levelsCompletedText');
    
    finalScoreText.textContent = `Final Score: ${gameState.score}`;
    levelsCompletedText.textContent = `Levels Completed: ${gameState.level - 1} / ${gameState.maxLevel}`;
    
    gameOverScreen.classList.remove('hidden');
}

/**
 * Shows the victory screen (all levels completed)
 */
function showVictoryScreen() {
    const victoryScoreText = document.getElementById('victoryScoreText');
    victoryScoreText.textContent = `Final Score: ${gameState.score}`;
    victoryScreen.classList.remove('hidden');
}

// ============================================
// EVENT LISTENERS
// ============================================

startBtn.addEventListener('click', startGame);

nextLevelBtn.addEventListener('click', nextLevel);

restartBtn.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    startGame();
});

playAgainBtn.addEventListener('click', () => {
    victoryScreen.classList.add('hidden');
    startGame();
});

// Prevent context menu on long press (mobile)
gameArea.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// ============================================
// GAME READY
// ============================================

console.log('Bubble Pop Math game loaded and ready!');