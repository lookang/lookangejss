// ===================================
// GAME STATE MANAGEMENT
// ===================================

// Modified: Game configuration for JC level students with age-appropriate difficulties
const gameState = {
    difficulty: 'easy',           // Current difficulty level
    level: 1,                     // Current game level
    score: 0,                     // Player's score
    questionsAnswered: 0,         // Number of questions answered in current level
    questionsPerLevel: 8,         // Modified: Increased questions per level for JC students
    correctAnswers: 0,            // Correct answers in current level
    currentQuestion: null,        // Current question object {expression, answer, type}
    startTime: null,              // Time when current question started
    questionTimes: [],            // Array of response times for analytics
    sessionStartTime: null,       // Time when game session started
    timerInterval: null,          // Timer interval reference
    timeLimit: 30,                // Modified: Increased time limit for complex problems
    timeRemaining: 30             // Current time remaining
};

// Modified: Age-appropriate difficulty settings for JC students
const difficultySettings = {
    easy: { 
        name: 'Foundation', 
        icon: '📘',
        description: 'Basic Operations',
        types: ['multiplication', 'division', 'powers'],
        timeLimit: 30
    },
    medium: { 
        name: 'Intermediate', 
        icon: '📗',
        description: 'Mixed Operations',
        types: ['fractions', 'percentages', 'algebraic', 'roots'],
        timeLimit: 40
    },
    hard: { 
        name: 'Advanced', 
        icon: '📕',
        description: 'Complex Problems',
        types: ['trigonometry', 'logarithms', 'complex_algebraic', 'calculus_basic'],
        timeLimit: 50
    }
};

// ===================================
// DOM ELEMENT REFERENCES
// ===================================

// Screen elements
const welcomeScreen = document.getElementById('welcomeScreen');
const gameScreen = document.getElementById('gameScreen');
const resultsScreen = document.getElementById('resultsScreen');

// Status bar elements
const levelDisplay = document.getElementById('levelDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const progressDisplay = document.getElementById('progressDisplay');
const timerDisplay = document.getElementById('timerDisplay');

// Question elements
const questionDisplay = document.getElementById('questionDisplay');
const questionText = document.getElementById('questionText');
const answerInput = document.getElementById('answerInput');
const feedback = document.getElementById('feedback');

// Button elements
const startBtn = document.getElementById('startBtn');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const numberPadBtns = document.querySelectorAll('.num-btn');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const restartBtn = document.getElementById('restartBtn');

// Results elements
const resultsIcon = document.getElementById('resultsIcon');
const resultsTitle = document.getElementById('resultsTitle');
const finalScore = document.getElementById('finalScore');
const accuracy = document.getElementById('accuracy');
const avgTime = document.getElementById('avgTime');
const resultsMessage = document.getElementById('resultsMessage');

// Analytics elements
const analyticsPanel = document.getElementById('analyticsPanel');
const analyticsHeader = document.getElementById('analyticsHeader');
const analyticsContent = document.getElementById('analyticsContent');
const analyticsLog = document.getElementById('analyticsLog');
const toggleAnalyticsBtn = document.getElementById('toggleAnalyticsBtn');
const clearLogBtn = document.getElementById('clearLogBtn');

// Main panel for tooltip
const mainPanel = document.getElementById('mainPanel');

// ===================================
// INITIALIZATION
// ===================================

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    setupEventListeners();
    logAction('🎮', 'Session started - JC Math Challenge ready');
});

// Set up all event listeners
function setupEventListeners() {
    // Difficulty selection
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', handleDifficultySelect);
    });

    // Start button
    startBtn.addEventListener('click', startGame);

    // Answer input - submit on Enter key
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    });

    // Number pad buttons
    numberPadBtns.forEach(btn => {
        btn.addEventListener('click', handleNumberPad);
        // Touch support
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleNumberPad.call(btn, e);
        });
    });

    // Results buttons
    nextLevelBtn.addEventListener('click', nextLevel);
    restartBtn.addEventListener('click', restartGame);

    // Analytics controls
    toggleAnalyticsBtn.addEventListener('click', toggleAnalytics);
    analyticsHeader.addEventListener('click', toggleAnalytics);
    clearLogBtn.addEventListener('click', clearAnalyticsLog);

    // Prevent double-tap zoom on touch devices
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
}

// ===================================
// GAME FLOW FUNCTIONS
// ===================================

// Initialize game state
function initializeGame() {
    gameState.sessionStartTime = Date.now();
    updateStatusDisplay();
}

// Handle difficulty selection
function handleDifficultySelect(e) {
    const btn = e.currentTarget;
    const difficulty = btn.dataset.difficulty;
    
    // Update active state
    difficultyBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update game state
    gameState.difficulty = difficulty;
    
    logAction('⚙️', `Difficulty set to ${difficultySettings[difficulty].name} (${difficultySettings[difficulty].description})`);
}

// Start the game
function startGame() {
    // Hide welcome screen, show game screen
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    // Reset game state for new game
    gameState.level = 1;
    gameState.score = 0;
    gameState.questionsAnswered = 0;
    gameState.correctAnswers = 0;
    gameState.questionTimes = [];
    gameState.timeLimit = difficultySettings[gameState.difficulty].timeLimit;
    
    updateStatusDisplay();
    generateQuestion();
    
    logAction('🎯', `Game started - Difficulty: ${difficultySettings[gameState.difficulty].name}, Level: ${gameState.level}`);
}

// Modified: Generate age-appropriate questions for JC students
function generateQuestion() {
    const settings = difficultySettings[gameState.difficulty];
    const questionTypes = settings.types;
    const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let question = generateQuestionByType(randomType);
    
    gameState.currentQuestion = question;
    
    // Display question
    questionText.textContent = question.expression;
    
    // Clear input and focus
    answerInput.value = '';
    answerInput.focus();
    
    // Start timer
    gameState.startTime = Date.now();
    gameState.timeRemaining = gameState.timeLimit;
    startTimer();
    
    logAction('❓', `New question: ${question.expression} (Type: ${randomType})`);
}

// Modified: Generate questions based on type for JC level
function generateQuestionByType(type) {
    let expression, answer;
    
    switch(type) {
        case 'multiplication':
            const m1 = Math.floor(Math.random() * 20) + 10;
            const m2 = Math.floor(Math.random() * 20) + 10;
            expression = `${m1} × ${m2} = ?`;
            answer = m1 * m2;
            break;
            
        case 'division':
            const divisor = Math.floor(Math.random() * 12) + 3;
            const quotient = Math.floor(Math.random() * 15) + 5;
            const dividend = divisor * quotient;
            expression = `${dividend} ÷ ${divisor} = ?`;
            answer = quotient;
            break;
            
        case 'powers':
            const base = Math.floor(Math.random() * 8) + 2;
            const exp = Math.floor(Math.random() * 3) + 2;
            expression = `${base}^${exp} = ?`;
            answer = Math.pow(base, exp);
            break;
            
        case 'fractions':
            const num1 = Math.floor(Math.random() * 8) + 1;
            const den1 = Math.floor(Math.random() * 8) + 2;
            const num2 = Math.floor(Math.random() * 8) + 1;
            const den2 = den1; // Same denominator for easier calculation
            const sumNum = num1 + num2;
            expression = `${num1}/${den1} + ${num2}/${den2} = ? (as decimal)`;
            answer = parseFloat((sumNum / den1).toFixed(2));
            break;
            
        case 'percentages':
            const percent = [10, 15, 20, 25, 30, 40, 50, 75][Math.floor(Math.random() * 8)];
            const number = Math.floor(Math.random() * 180) + 20;
            expression = `${percent}% of ${number} = ?`;
            answer = (percent / 100) * number;
            break;
            
        case 'algebraic':
            const coef = Math.floor(Math.random() * 8) + 2;
            const constant = Math.floor(Math.random() * 20) + 5;
            const result = Math.floor(Math.random() * 30) + 10;
            const x = (result - constant) / coef;
            if (x === Math.floor(x) && x > 0) {
                expression = `${coef}x + ${constant} = ${result}, x = ?`;
                answer = x;
            } else {
                // Fallback to simpler equation
                const simpleX = Math.floor(Math.random() * 10) + 1;
                const simpleResult = coef * simpleX + constant;
                expression = `${coef}x + ${constant} = ${simpleResult}, x = ?`;
                answer = simpleX;
            }
            break;
            
        case 'roots':
            const perfect = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144][Math.floor(Math.random() * 11)];
            expression = `√${perfect} = ?`;
            answer = Math.sqrt(perfect);
            break;
            
        case 'trigonometry':
            const angles = [0, 30, 45, 60, 90];
            const angle = angles[Math.floor(Math.random() * angles.length)];
            const funcs = ['sin', 'cos'];
            const func = funcs[Math.floor(Math.random() * funcs.length)];
            expression = `${func}(${angle}°) = ? (2 decimal places)`;
            const radians = angle * Math.PI / 180;
            answer = parseFloat((func === 'sin' ? Math.sin(radians) : Math.cos(radians)).toFixed(2));
            break;
            
        case 'logarithms':
            const logBases = [2, 10];
            const logBase = logBases[Math.floor(Math.random() * logBases.length)];
            const logPower = Math.floor(Math.random() * 3) + 1;
            const logValue = Math.pow(logBase, logPower);
            expression = `log${logBase}(${logValue}) = ?`;
            answer = logPower;
            break;
            
        case 'complex_algebraic':
            const a = Math.floor(Math.random() * 5) + 2;
            const b = Math.floor(Math.random() * 10) + 5;
            const c = Math.floor(Math.random() * 5) + 1;
            const xVal = Math.floor(Math.random() * 5) + 1;
            const resultVal = a * xVal * xVal + b * xVal + c;
            expression = `If ${a}x² + ${b}x + ${c} = ${resultVal}, x = ? (positive integer)`;
            answer = xVal;
            break;
            
        case 'calculus_basic':
            const power = Math.floor(Math.random() * 4) + 2;
            const coefficient = Math.floor(Math.random() * 5) + 1;
            expression = `d/dx(${coefficient}x^${power}) = ? (coefficient only)`;
            answer = coefficient * power;
            break;
            
        default:
            // Fallback to multiplication
            const fm1 = Math.floor(Math.random() * 15) + 10;
            const fm2 = Math.floor(Math.random() * 15) + 10;
            expression = `${fm1} × ${fm2} = ?`;
            answer = fm1 * fm2;
    }
    
    return { expression, answer, type };
}

// Start countdown timer
function startTimer() {
    // Clear existing timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    // Update timer display
    updateTimerDisplay();
    
    // Start new timer
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        updateTimerDisplay();
        
        // Time's up
        if (gameState.timeRemaining <= 0) {
            clearInterval(gameState.timerInterval);
            handleTimeout();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    timerDisplay.textContent = `${gameState.timeRemaining}s`;
    
    // Change color based on time remaining
    if (gameState.timeRemaining <= 10) {
        timerDisplay.style.color = '#ff6b6b';
    } else {
        timerDisplay.style.color = 'white';
    }
}

// Modified: Handle number pad input with decimal and negative support
function handleNumberPad(e) {
    const btn = e.currentTarget;
    const value = btn.dataset.num;
    
    if (value === 'clear') {
        answerInput.value = '';
        logAction('🔄', 'Answer cleared');
    } else if (value === 'submit') {
        submitAnswer();
    } else if (value === '-') {
        // Toggle negative sign
        if (answerInput.value.startsWith('-')) {
            answerInput.value = answerInput.value.substring(1);
        } else {
            answerInput.value = '-' + answerInput.value;
        }
    } else if (value === '.') {
        // Add decimal point if not already present
        if (!answerInput.value.includes('.')) {
            answerInput.value += value;
        }
    } else {
        answerInput.value += value;
    }
}

// Modified: Submit and check answer with tolerance for decimal answers
function submitAnswer() {
    const userAnswer = parseFloat(answerInput.value);
    
    // Validate input
    if (isNaN(userAnswer) || answerInput.value === '') {
        showFeedback('⚠️', false);
        logAction('⚠️', 'Invalid answer submitted (empty or non-numeric)');
        return;
    }
    
    // Stop timer
    clearInterval(gameState.timerInterval);
    
    // Calculate response time
    const responseTime = ((Date.now() - gameState.startTime) / 1000).toFixed(2);
    gameState.questionTimes.push(parseFloat(responseTime));
    
    // Check answer with tolerance for floating point
    const tolerance = 0.01;
    const correct = Math.abs(userAnswer - gameState.currentQuestion.answer) < tolerance;
    
    if (correct) {
        handleCorrectAnswer(responseTime);
    } else {
        handleIncorrectAnswer(userAnswer, responseTime);
    }
}

// Modified: Handle correct answer with adjusted scoring for JC level
function handleCorrectAnswer(responseTime) {
    gameState.correctAnswers++;
    gameState.questionsAnswered++;
    
    // Calculate points based on speed and difficulty (faster = more points)
    let points = 15;
    const timeLimit = gameState.timeLimit;
    
    if (responseTime < timeLimit * 0.3) points = 30;
    else if (responseTime < timeLimit * 0.5) points = 25;
    else if (responseTime < timeLimit * 0.7) points = 20;
    
    // Bonus points for harder difficulties
    if (gameState.difficulty === 'medium') points = Math.floor(points * 1.3);
    if (gameState.difficulty === 'hard') points = Math.floor(points * 1.5);
    
    gameState.score += points;
    
    showFeedback('✓', true);
    logAction('✅', `Correct! ${gameState.currentQuestion.expression.replace(' = ?', '')} = ${gameState.currentQuestion.answer} (${responseTime}s, +${points} points)`);
    
    updateStatusDisplay();
    
    // Check if level complete
    setTimeout(() => {
        if (gameState.questionsAnswered >= gameState.questionsPerLevel) {
            showResults();
        } else {
            generateQuestion();
        }
    }, 1000);
}

// Handle incorrect answer
function handleIncorrectAnswer(userAnswer, responseTime) {
    gameState.questionsAnswered++;
    
    showFeedback('✗', false);
    logAction('❌', `Incorrect. ${gameState.currentQuestion.expression.replace(' = ?', '')} = ${gameState.currentQuestion.answer}, answered ${userAnswer} (${responseTime}s)`);
    
    updateStatusDisplay();
    
    // Continue to next question
    setTimeout(() => {
        if (gameState.questionsAnswered >= gameState.questionsPerLevel) {
            showResults();
        } else {
            generateQuestion();
        }
    }, 1000);
}

// Handle timeout (no answer given)
function handleTimeout() {
    gameState.questionsAnswered++;
    
    showFeedback('⏱', false);
    logAction('⏱️', `Time's up! ${gameState.currentQuestion.expression.replace(' = ?', '')} = ${gameState.currentQuestion.answer}`);
    
    updateStatusDisplay();
    
    // Continue to next question
    setTimeout(() => {
        if (gameState.questionsAnswered >= gameState.questionsPerLevel) {
            showResults();
        } else {
            generateQuestion();
        }
    }, 1500);
}

// Show visual feedback
function showFeedback(symbol, isCorrect) {
    feedback.textContent = symbol;
    feedback.classList.remove('hidden');
    
    // Add color styling
    feedback.style.color = isCorrect ? '#51cf66' : '#ff6b6b';
    
    setTimeout(() => {
        feedback.classList.add('hidden');
    }, 600);
}

// Modified: Show results screen with JC-appropriate messaging
function showResults() {
    // Hide game screen, show results screen
    gameScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    
    // Calculate statistics
    const accuracyPercent = Math.round((gameState.correctAnswers / gameState.questionsAnswered) * 100);
    const avgTimeValue = gameState.questionTimes.length > 0 
        ? (gameState.questionTimes.reduce((a, b) => a + b, 0) / gameState.questionTimes.length).toFixed(1)
        : 0;
    
    // Update results display
    finalScore.textContent = gameState.score;
    accuracy.textContent = `${accuracyPercent}%`;
    avgTime.textContent = `${avgTimeValue}s`;
    
    // Determine results message and icon based on performance
    let message = '';
    let icon = '';
    let title = '';
    
    if (accuracyPercent === 100) {
        icon = '🏆';
        title = 'Perfect Score!';
        message = 'Outstanding! You mastered this level completely!';
    } else if (accuracyPercent >= 87.5) {
        icon = '🌟';
        title = 'Excellent Performance!';
        message = 'Great work! Your math skills are impressive!';
    } else if (accuracyPercent >= 75) {
        icon = '👍';
        title = 'Good Job!';
        message = 'Solid performance! Keep practicing to improve further!';
    } else if (accuracyPercent >= 62.5) {
        icon = '📚';
        title = 'Keep Going!';
        message = 'You\'re making progress! Review the concepts and try again!';
    } else {
        icon = '💪';
        title = 'Practice Makes Perfect!';
        message = 'Don\'t give up! Focus on understanding the fundamentals!';
    }
    
    resultsIcon.textContent = icon;
    resultsTitle.textContent = title;
    resultsMessage.textContent = message;
    
    logAction('📊', `Level ${gameState.level} complete - Score: ${gameState.score}, Accuracy: ${accuracyPercent}%, Avg Time: ${avgTimeValue}s`);
}

// Modified: Proceed to next level with progressive difficulty
function nextLevel() {
    gameState.level++;
    gameState.questionsAnswered = 0;
    gameState.correctAnswers = 0;
    gameState.questionTimes = [];
    
    // Slightly reduce time limit for increased challenge (but not too much)
    if (gameState.timeLimit > 20) {
        gameState.timeLimit -= 2;
    }
    
    resultsScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    updateStatusDisplay();
    generateQuestion();
    
    logAction('⬆️', `Advanced to Level ${gameState.level} - Time limit: ${gameState.timeLimit}s`);
}

// Restart game from beginning
function restartGame() {
    resultsScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    
    gameState.level = 1;
    gameState.score = 0;
    gameState.questionsAnswered = 0;
    gameState.correctAnswers = 0;
    gameState.questionTimes = [];
    gameState.timeLimit = difficultySettings[gameState.difficulty].timeLimit;
    
    updateStatusDisplay();
    
    logAction('🔄', 'Game restarted - Returned to difficulty selection');
}

// ===================================
// UI UPDATE FUNCTIONS
// ===================================

// Update status bar display
function updateStatusDisplay() {
    levelDisplay.textContent = gameState.level;
    scoreDisplay.textContent = gameState.score;
    progressDisplay.textContent = `${gameState.questionsAnswered}/${gameState.questionsPerLevel}`;
}

// ===================================
// ANALYTICS FUNCTIONS
// ===================================

// Log an action to analytics panel
function logAction(icon, text) {
    const elapsedTime = ((Date.now() - gameState.sessionStartTime) / 1000).toFixed(1);
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="log-time">t=${elapsedTime}s</span>
        <span class="log-icon">${icon}</span>
        <span class="log-text">${text}</span>
    `;
    
    analyticsLog.appendChild(logEntry);
    
    // Auto-scroll to bottom
    analyticsLog.scrollTop = analyticsLog.scrollHeight;
    
    // Limit log entries to prevent memory issues (keep last 50)
    const entries = analyticsLog.querySelectorAll('.log-entry');
    if (entries.length > 50) {
        entries[0].remove();
    }
}

// Toggle analytics panel
function toggleAnalytics() {
    analyticsPanel.classList.toggle('collapsed');
    
    // Update toggle button icon
    if (analyticsPanel.classList.contains('collapsed')) {
        toggleAnalyticsBtn.textContent = '▲';
    } else {
        toggleAnalyticsBtn.textContent = '▼';
    }
}

// Clear analytics log
function clearAnalyticsLog() {
    analyticsLog.innerHTML = `
        <div class="log-entry">
            <span class="log-time">t=0s</span>
            <span class="log-icon">🎮</span>
            <span class="log-text">Log cleared - Session continues</span>
        </div>
    `;
    
    gameState.sessionStartTime = Date.now();
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Detect if running in iframe
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// Set appropriate height based on context
if (!isInIframe()) {
    document.body.classList.remove('iframe-mode');
}

// ===================================
// TOUCH SUPPORT ENHANCEMENTS
// ===================================

// Prevent pull-to-refresh on mobile
document.body.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Add haptic feedback for touch interactions (if supported)
function hapticFeedback() {
    if ('vibrate' in navigator) {
        navigator.vibrate(10);
    }
}

// Add haptic feedback to buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('touchstart', hapticFeedback);
});