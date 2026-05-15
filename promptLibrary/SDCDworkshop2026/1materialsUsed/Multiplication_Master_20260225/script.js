// ===================================
// GAME STATE MANAGEMENT
// Tracks all game variables and progress
// ===================================

const gameState = {
    score: 0,
    level: 1,
    timeRemaining: 60,
    questionsAnswered: 0,
    correctAnswers: 0,
    questionsPerLevel: 5, // Questions needed to level up
    currentQuestion: null,
    correctAnswer: null,
    timerInterval: null,
    isGameActive: false
};

// ===================================
// DOM ELEMENT REFERENCES
// Cache all frequently accessed elements
// ===================================

const elements = {
    // Screens
    startScreen: document.getElementById('start-screen'),
    questionScreen: document.getElementById('question-screen'),
    levelupScreen: document.getElementById('levelup-screen'),
    gameoverScreen: document.getElementById('gameover-screen'),
    
    // Stats display
    scoreDisplay: document.getElementById('score'),
    levelDisplay: document.getElementById('level'),
    timerDisplay: document.getElementById('timer'),
    progressBar: document.getElementById('progress-bar'),
    
    // Question elements
    questionDisplay: document.getElementById('question-display'),
    answerButtons: document.querySelectorAll('.answer-btn'),
    feedback: document.getElementById('feedback'),
    
    // Buttons
    startBtn: document.getElementById('start-btn'),
    continueBtn: document.getElementById('continue-btn'),
    restartBtn: document.getElementById('restart-btn'),
    
    // Other
    encouragement: document.getElementById('encouragement'),
    infoIcon: document.getElementById('info-icon'),
    tooltip: document.getElementById('header-tooltip')
};

// ===================================
// MULTIPLICATION TABLES
// Defines difficulty progression for Primary 2
// Lower progress students start with easier tables
// ===================================

const multiplicationTables = {
    1: [2, 5, 10], // Level 1: Easiest tables
    2: [2, 3, 5, 10], // Level 2: Add 3x table
    3: [2, 3, 4, 5, 10], // Level 3: Add 4x table
    4: [2, 3, 4, 5, 6, 10], // Level 4: Add 6x table
    5: [2, 3, 4, 5, 6, 8, 10], // Level 5+: All tables up to 10
};

// ===================================
// ENCOURAGEMENT MESSAGES
// Positive reinforcement based on cognitive psychology
// Reduces anxiety and builds confidence
// ===================================

const encouragementMessages = [
    "Great job! 🌟",
    "You're doing amazing! 🎉",
    "Keep it up! 💪",
    "Fantastic! ⭐",
    "You're a star! ✨",
    "Excellent work! 🏆",
    "Super! 🚀"
];

// ===================================
// INITIALIZATION
// Set up event listeners when page loads
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    checkIframeMode();
});

// ===================================
// IFRAME DETECTION
// Adjusts height based on context
// ===================================

function checkIframeMode() {
    try {
        if (window.self !== window.top) {
            document.body.classList.add('iframe-mode');
        }
    } catch (e) {
        document.body.classList.add('iframe-mode');
    }
}

// ===================================
// EVENT LISTENER SETUP
// Handles all user interactions
// ===================================

function initializeEventListeners() {
    // Start game
    elements.startBtn.addEventListener('click', startGame);
    
    // Continue after level up
    elements.continueBtn.addEventListener('click', continueGame);
    
    // Restart game
    elements.restartBtn.addEventListener('click', resetGame);
    
    // Answer buttons
    elements.answerButtons.forEach(btn => {
        btn.addEventListener('click', handleAnswer);
    });
    
    // Info tooltip
    elements.infoIcon.addEventListener('mouseenter', showTooltip);
    elements.infoIcon.addEventListener('mouseleave', hideTooltip);
    elements.infoIcon.addEventListener('click', toggleTooltip);
}

// ===================================
// TOOLTIP FUNCTIONS
// Shows game information without taking vertical space
// ===================================

function showTooltip() {
    elements.tooltip.classList.remove('hidden');
}

function hideTooltip() {
    elements.tooltip.classList.add('hidden');
}

function toggleTooltip() {
    elements.tooltip.classList.toggle('hidden');
}

// ===================================
// GAME START
// Initializes game state and starts timer
// ===================================

function startGame() {
    // Reset game state
    gameState.score = 0;
    gameState.level = 1;
    gameState.timeRemaining = 60;
    gameState.questionsAnswered = 0;
    gameState.correctAnswers = 0;
    gameState.isGameActive = true;
    
    // Update displays
    updateStats();
    updateProgressBar();
    
    // Switch to question screen
    switchScreen('question');
    
    // Start timer
    startTimer();
    
    // Generate first question
    generateQuestion();
}

// ===================================
// TIMER MANAGEMENT
// Countdown timer with game over condition
// ===================================

function startTimer() {
    // Clear any existing timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    // Start new timer
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        elements.timerDisplay.textContent = gameState.timeRemaining;
        
        // Visual warning when time is low
        if (gameState.timeRemaining <= 10) {
            elements.timerDisplay.style.color = '#ef4444';
        }
        
        // Game over when time runs out
        if (gameState.timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

// ===================================
// QUESTION GENERATION
// Creates multiplication questions based on level
// Uses appropriate difficulty for Primary 2 lower progress
// ===================================

function generateQuestion() {
    // Get available tables for current level
    const availableTables = multiplicationTables[Math.min(gameState.level, 5)] || multiplicationTables[5];
    
    // Select random table
    const table = availableTables[Math.floor(Math.random() * availableTables.length)];
    
    // Select random multiplier (1-10, but favor 1-5 for lower progress)
    let multiplier;
    if (gameState.level <= 2) {
        // Levels 1-2: Focus on 1-5
        multiplier = Math.floor(Math.random() * 5) + 1;
    } else {
        // Higher levels: Full range 1-10
        multiplier = Math.floor(Math.random() * 10) + 1;
    }
    
    // Calculate correct answer
    const correctAnswer = table * multiplier;
    
    // Store question data
    gameState.currentQuestion = { table, multiplier };
    gameState.correctAnswer = correctAnswer;
    
    // Display question
    elements.questionDisplay.textContent = `${table} × ${multiplier} = ?`;
    
    // Generate answer options
    generateAnswerOptions(correctAnswer);
    
    // Reset feedback
    elements.feedback.classList.add('hidden');
}

// ===================================
// ANSWER OPTIONS GENERATION
// Creates 4 options including correct answer
// Distractors are mathematically plausible
// ===================================

function generateAnswerOptions(correctAnswer) {
    const options = [correctAnswer];
    
    // Generate 3 plausible wrong answers
    while (options.length < 4) {
        // Create distractors within reasonable range
        const distractor = correctAnswer + (Math.floor(Math.random() * 7) - 3) * (Math.random() > 0.5 ? 1 : gameState.currentQuestion.table);
        
        // Ensure positive, unique, and different from correct answer
        if (distractor > 0 && !options.includes(distractor)) {
            options.push(distractor);
        }
    }
    
    // Shuffle options (Fisher-Yates algorithm)
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    // Assign options to buttons
    elements.answerButtons.forEach((btn, index) => {
        btn.textContent = options[index];
        btn.dataset.answer = options[index];
        btn.classList.remove('correct', 'incorrect', 'disabled');
        btn.disabled = false;
    });
}

// ===================================
// ANSWER HANDLING
// Processes student's answer with immediate feedback
// Applies Mayer's principles: immediate feedback, reinforcement
// ===================================

function handleAnswer(event) {
    const selectedAnswer = parseInt(event.target.dataset.answer);
    const isCorrect = selectedAnswer === gameState.correctAnswer;
    
    // Disable all buttons to prevent multiple clicks
    elements.answerButtons.forEach(btn => {
        btn.classList.add('disabled');
        btn.disabled = true;
    });
    
    // Visual and textual feedback
    if (isCorrect) {
        // Correct answer feedback
        event.target.classList.add('correct');
        elements.feedback.textContent = '✓ Correct!';
        elements.feedback.className = 'feedback correct';
        elements.feedback.classList.remove('hidden');
        
        // Update score (more points for higher levels)
        const points = 10 * gameState.level;
        gameState.score += points;
        gameState.correctAnswers++;
        
        // Show encouragement occasionally
        if (Math.random() > 0.6) {
            showEncouragement();
        }
    } else {
        // Incorrect answer feedback
        event.target.classList.add('incorrect');
        
        // Highlight correct answer
        elements.answerButtons.forEach(btn => {
            if (parseInt(btn.dataset.answer) === gameState.correctAnswer) {
                btn.classList.add('correct');
            }
        });
        
        elements.feedback.textContent = `✗ The answer is ${gameState.correctAnswer}`;
        elements.feedback.className = 'feedback incorrect';
        elements.feedback.classList.remove('hidden');
    }
    
    // Update stats
    gameState.questionsAnswered++;
    updateStats();
    updateProgressBar();
    
    // Check for level up
    if (gameState.questionsAnswered % gameState.questionsPerLevel === 0) {
        setTimeout(() => {
            levelUp();
        }, 1500);
    } else {
        // Next question after delay
        setTimeout(() => {
            generateQuestion();
        }, 1500);
    }
}

// ===================================
// ENCOURAGEMENT DISPLAY
// Shows motivational messages to maintain engagement
// Reduces cognitive load and anxiety
// ===================================

function showEncouragement() {
    const message = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
    elements.encouragement.textContent = message;
    elements.encouragement.classList.remove('hidden');
    
    // Auto-hide after 2 seconds
    setTimeout(() => {
        elements.encouragement.classList.add('hidden');
    }, 2000);
}

// ===================================
// LEVEL UP SYSTEM
// Celebrates progress and increases difficulty
// ===================================

function levelUp() {
    gameState.level++;
    
    // Bonus time for leveling up
    gameState.timeRemaining += 15;
    
    // Update level up message
    document.getElementById('levelup-message').textContent = 
        `Amazing! You've reached Level ${gameState.level}!`;
    
    // Switch to level up screen
    switchScreen('levelup');
    
    // Reset progress bar
    updateProgressBar();
}

// ===================================
// CONTINUE AFTER LEVEL UP
// Returns to gameplay after celebration
// ===================================

function continueGame() {
    switchScreen('question');
    generateQuestion();
}

// ===================================
// GAME END
// Stops timer and shows final statistics
// ===================================

function endGame() {
    // Stop timer
    clearInterval(gameState.timerInterval);
    gameState.isGameActive = false;
    
    // Calculate accuracy
    const accuracy = gameState.questionsAnswered > 0 
        ? Math.round((gameState.correctAnswers / gameState.questionsAnswered) * 100)
        : 0;
    
    // Display final stats
    document.getElementById('final-score').textContent = gameState.score;
    document.getElementById('final-level').textContent = gameState.level;
    document.getElementById('total-questions').textContent = 
        `${gameState.correctAnswers} / ${gameState.questionsAnswered} (${accuracy}%)`;
    
    // Switch to game over screen
    switchScreen('gameover');
}

// ===================================
// GAME RESET
// Resets all state and returns to start screen
// ===================================

function resetGame() {
    // Clear timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    // Reset timer color
    elements.timerDisplay.style.color = 'white';
    
    // Return to start screen
    switchScreen('start');
}

// ===================================
// SCREEN MANAGEMENT
// Handles transitions between game screens
// Reduces cognitive load by showing one task at a time
// ===================================

function switchScreen(screenName) {
    // Hide all screens
    elements.startScreen.classList.remove('active');
    elements.questionScreen.classList.remove('active');
    elements.levelupScreen.classList.remove('active');
    elements.gameoverScreen.classList.remove('active');
    
    // Show requested screen
    switch(screenName) {
        case 'start':
            elements.startScreen.classList.add('active');
            break;
        case 'question':
            elements.questionScreen.classList.add('active');
            break;
        case 'levelup':
            elements.levelupScreen.classList.add('active');
            break;
        case 'gameover':
            elements.gameoverScreen.classList.add('active');
            break;
    }
}

// ===================================
// STATS UPDATE
// Updates score, level, and timer displays
// ===================================

function updateStats() {
    elements.scoreDisplay.textContent = gameState.score;
    elements.levelDisplay.textContent = gameState.level;
    elements.timerDisplay.textContent = gameState.timeRemaining;
}

// ===================================
// PROGRESS BAR UPDATE
// Visual indicator of progress toward next level
// Provides clear goal and motivation
// ===================================

function updateProgressBar() {
    const questionsInCurrentLevel = gameState.questionsAnswered % gameState.questionsPerLevel;
    const progress = (questionsInCurrentLevel / gameState.questionsPerLevel) * 100;
    elements.progressBar.style.width = progress + '%';
}

// ===================================
// DESIGN PRINCIPLES APPLIED:
// 
// 1. Cognitive Load Theory:
//    - Single focus per screen (one question at a time)
//    - Clear visual hierarchy
//    - Minimal distractions
//
// 2. Mayer's Multimedia Principles:
//    - Immediate feedback (correct/incorrect)
//    - Visual and textual reinforcement
//    - Coherence (no extraneous elements)
//    - Signaling (color coding for feedback)
//
// 3. Game-Based Learning:
//    - Clear goals (score, level progression)
//    - Immediate rewards (points, celebrations)
//    - Increasing difficulty (adaptive challenge)
//    - Positive reinforcement (encouragement messages)
//
// 4. Singapore Math Curriculum:
//    - Focus on multiplication tables 2-10
//    - Scaffolded difficulty for lower progress students
//    - Emphasis on automaticity and fluency
//    - Concrete practice with immediate feedback
//
// 5. Accessibility:
//    - Touch-friendly button sizes (min 44px)
//    - Clear visual feedback
//    - Readable fonts and contrast
//    - Works offline without dependencies
// ===================================