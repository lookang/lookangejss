// ===== GAME STATE MANAGEMENT =====
// This object holds all the game state variables
const gameState = {
    level: 1,
    score: 0,
    streak: 0,
    currentQuestion: null,
    correctAnswer: null,
    timeLeft: 10,
    timerInterval: null,
    isPaused: false,
    questionsInLevel: 0,
    questionsToAdvance: 5,
    startTime: Date.now(),
    questionStartTime: null,
    
    // Analytics data
    totalAttempts: 0,
    correctCount: 0,
    responseTimes: [],
    actionLog: []
};

// ===== DOM ELEMENTS =====
// Cache DOM elements for better performance
const elements = {
    level: document.getElementById('level'),
    score: document.getElementById('score'),
    timer: document.getElementById('timer'),
    streak: document.getElementById('streak'),
    question: document.getElementById('question'),
    progressBar: document.getElementById('progressBar'),
    answerGrid: document.getElementById('answerGrid'),
    feedbackMessage: document.getElementById('feedbackMessage'),
    
    // Buttons
    pauseBtn: document.getElementById('pauseBtn'),
    resetBtn: document.getElementById('resetBtn'),
    helpBtn: document.getElementById('helpBtn'),
    
    // Modals
    helpModal: document.getElementById('helpModal'),
    pauseModal: document.getElementById('pauseModal'),
    closeModal: document.getElementById('closeModal'),
    resumeBtn: document.getElementById('resumeBtn'),
    
    // Analytics
    analyticsToggle: document.getElementById('analyticsToggle'),
    analyticsContent: document.getElementById('analyticsContent'),
    toggleIcon: document.getElementById('toggleIcon'),
    actionLog: document.getElementById('actionLog'),
    clearLogBtn: document.getElementById('clearLogBtn'),
    totalAttempts: document.getElementById('totalAttempts'),
    correctCount: document.getElementById('correctCount'),
    accuracy: document.getElementById('accuracy'),
    avgResponse: document.getElementById('avgResponse'),
    
    // Celebration
    celebrationOverlay: document.getElementById('celebrationOverlay'),
    celebrationEmoji: document.getElementById('celebrationEmoji'),
    celebrationText: document.getElementById('celebrationText')
};

// ===== INITIALIZATION =====
// Initialize the game when the page loads
function init() {
    logAction('🎮', 'Game initialized');
    generateQuestion();
    updateDisplay();
    attachEventListeners();
    startTimer();
    
    // Auto-expand analytics panel initially
    setTimeout(() => {
        toggleAnalytics();
    }, 500);
}

// ===== EVENT LISTENERS =====
// Attach all event listeners for user interactions
function attachEventListeners() {
    // Control buttons
    elements.pauseBtn.addEventListener('click', togglePause);
    elements.resetBtn.addEventListener('click', resetGame);
    elements.helpBtn.addEventListener('click', showHelp);
    
    // Modal controls
    elements.closeModal.addEventListener('click', hideHelp);
    elements.resumeBtn.addEventListener('click', togglePause);
    
    // Analytics controls
    elements.analyticsToggle.addEventListener('click', toggleAnalytics);
    elements.clearLogBtn.addEventListener('click', clearLog);
    
    // Close modals when clicking outside
    elements.helpModal.addEventListener('click', (e) => {
        if (e.target === elements.helpModal) hideHelp();
    });
    
    elements.pauseModal.addEventListener('click', (e) => {
        if (e.target === elements.pauseModal) togglePause();
    });
}

// ===== QUESTION GENERATION =====
// Generate a new multiplication question based on current level
function generateQuestion() {
    gameState.questionStartTime = Date.now();
    
    // Difficulty increases with level
    const maxNumber = Math.min(5 + gameState.level, 12); // Cap at 12
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;
    
    gameState.currentQuestion = { num1, num2 };
    gameState.correctAnswer = num1 * num2;
    
    // Display question
    elements.question.textContent = `${num1} × ${num2} = ?`;
    
    // Generate answer options
    generateAnswerOptions();
    
    // Reset timer
    gameState.timeLeft = 10;
    updateTimer();
    
    logAction('❓', `New question: ${num1} × ${num2} = ?`);
}

// ===== ANSWER OPTIONS GENERATION =====
// Generate 4 answer options (1 correct, 3 incorrect)
function generateAnswerOptions() {
    const options = [gameState.correctAnswer];
    
    // Generate 3 plausible wrong answers
    while (options.length < 4) {
        const offset = Math.floor(Math.random() * 10) - 5;
        const wrongAnswer = gameState.correctAnswer + offset;
        
        // Ensure unique and positive answers
        if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }
    
    // Shuffle options
    shuffleArray(options);
    
    // Create answer buttons
    elements.answerGrid.innerHTML = '';
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => checkAnswer(option, btn));
        
        // Touch support
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            checkAnswer(option, btn);
        });
        
        elements.answerGrid.appendChild(btn);
    });
}

// ===== ANSWER CHECKING =====
// Check if the selected answer is correct
function checkAnswer(selectedAnswer, btn) {
    if (gameState.isPaused) return;
    
    // Calculate response time
    const responseTime = ((Date.now() - gameState.questionStartTime) / 1000).toFixed(2);
    gameState.responseTimes.push(parseFloat(responseTime));
    
    // Update analytics
    gameState.totalAttempts++;
    
    // Disable all buttons temporarily
    const allButtons = elements.answerGrid.querySelectorAll('.answer-btn');
    allButtons.forEach(b => b.disabled = true);
    
    if (selectedAnswer === gameState.correctAnswer) {
        handleCorrectAnswer(btn, responseTime);
    } else {
        handleIncorrectAnswer(btn, responseTime);
    }
    
    updateAnalytics();
    
    // Generate next question after delay
    setTimeout(() => {
        generateQuestion();
    }, 1500);
}

// ===== CORRECT ANSWER HANDLING =====
function handleCorrectAnswer(btn, responseTime) {
    btn.classList.add('correct');
    gameState.correctCount++;
    gameState.streak++;
    gameState.questionsInLevel++;
    
    // Calculate score with time bonus
    const timeBonus = Math.floor(gameState.timeLeft * 2);
    const streakBonus = gameState.streak * 5;
    const totalPoints = 10 + timeBonus + streakBonus;
    
    gameState.score += totalPoints;
    
    // Show feedback
    showFeedback(`✅ Correct! +${totalPoints} points`, 'success');
    
    logAction('✅', `Correct answer: ${gameState.correctAnswer} (${responseTime}s, +${totalPoints} pts)`);
    
    // Check for level up
    if (gameState.questionsInLevel >= gameState.questionsToAdvance) {
        levelUp();
    }
    
    updateDisplay();
}

// ===== INCORRECT ANSWER HANDLING =====
function handleIncorrectAnswer(btn, responseTime) {
    btn.classList.add('incorrect');
    gameState.streak = 0;
    
    // Highlight correct answer
    const allButtons = elements.answerGrid.querySelectorAll('.answer-btn');
    allButtons.forEach(b => {
        if (parseInt(b.textContent) === gameState.correctAnswer) {
            b.classList.add('correct');
        }
    });
    
    showFeedback(`❌ Incorrect! The answer was ${gameState.correctAnswer}`, 'error');
    
    logAction('❌', `Incorrect answer (${responseTime}s). Correct: ${gameState.correctAnswer}`);
    
    updateDisplay();
}

// ===== LEVEL UP =====
function handleLevelUp() {
    gameState.level++;
    gameState.questionsInLevel = 0;
    
    // Show celebration
    showCelebration('🎉', `Level ${gameState.level}!`);
    
    logAction('🎊', `Level up! Now at Level ${gameState.level}`);
    
    updateDisplay();
}

// ===== TIMER MANAGEMENT =====
function startTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    gameState.timerInterval = setInterval(() => {
        if (!gameState.isPaused) {
            gameState.timeLeft--;
            updateTimer();
            
            if (gameState.timeLeft <= 0) {
                handleTimeout();
            }
        }
    }, 1000);
}

function updateTimer() {
    elements.timer.textContent = `${gameState.timeLeft}s`;
    
    // Update progress bar
    const progress = (gameState.timeLeft / 10) * 100;
    elements.progressBar.style.width = `${progress}%`;
    
    // Change color based on time left
    if (gameState.timeLeft <= 3) {
        elements.progressBar.style.background = '#ff4757';
    } else if (gameState.timeLeft <= 6) {
        elements.progressBar.style.background = '#ffa502';
    } else {
        elements.progressBar.style.background = 'white';
    }
}

function handleTimeout() {
    gameState.streak = 0;
    gameState.totalAttempts++;
    
    showFeedback(`⏰ Time's up! The answer was ${gameState.correctAnswer}`, 'error');
    
    logAction('⏰', `Timeout. Correct answer: ${gameState.correctAnswer}`);
    
    updateAnalytics();
    updateDisplay();
    
    setTimeout(() => {
        generateQuestion();
    }, 1500);
}

// ===== DISPLAY UPDATES =====
function updateDisplay() {
    elements.level.textContent = gameState.level;
    elements.score.textContent = gameState.score;
    elements.streak.textContent = gameState.streak;
}

function showFeedback(message, type) {
    elements.feedbackMessage.textContent = message;
    elements.feedbackMessage.className = 'feedback-message show';
    
    setTimeout(() => {
        elements.feedbackMessage.className = 'feedback-message';
    }, 1500);
}

function showCelebration(emoji, text) {
    elements.celebrationEmoji.textContent = emoji;
    elements.celebrationText.textContent = text;
    elements.celebrationOverlay.classList.add('show');
    
    setTimeout(() => {
        elements.celebrationOverlay.classList.remove('show');
    }, 2000);
}

// ===== GAME CONTROLS =====
function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    
    if (gameState.isPaused) {
        elements.pauseBtn.innerHTML = '▶️ Resume';
        elements.pauseModal.classList.add('show');
        logAction('⏸️', 'Game paused');
    } else {
        elements.pauseBtn.innerHTML = '⏸ Pause';
        elements.pauseModal.classList.remove('show');
        logAction('▶️', 'Game resumed');
    }
}

function resetGame() {
    if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
        // Reset game state
        gameState.level = 1;
        gameState.score = 0;
        gameState.streak = 0;
        gameState.questionsInLevel = 0;
        gameState.totalAttempts = 0;
        gameState.correctCount = 0;
        gameState.responseTimes = [];
        gameState.startTime = Date.now();
        
        logAction('🔄', 'Game reset');
        
        generateQuestion();
        updateDisplay();
        updateAnalytics();
    }
}

function showHelp() {
    elements.helpModal.classList.add('show');
    logAction('❓', 'Help modal opened');
}

function hideHelp() {
    elements.helpModal.classList.remove('show');
}

// ===== ANALYTICS =====
function toggleAnalytics() {
    const isExpanded = elements.analyticsContent.classList.toggle('expanded');
    elements.toggleIcon.classList.toggle('collapsed');
    
    if (isExpanded) {
        logAction('📊', 'Analytics panel expanded');
    }
}

function updateAnalytics() {
    elements.totalAttempts.textContent = gameState.totalAttempts;
    elements.correctCount.textContent = gameState.correctCount;
    
    const accuracy = gameState.totalAttempts > 0 
        ? ((gameState.correctCount / gameState.totalAttempts) * 100).toFixed(1)
        : 0;
    elements.accuracy.textContent = `${accuracy}%`;
    
    const avgResponse = gameState.responseTimes.length > 0
        ? (gameState.responseTimes.reduce((a, b) => a + b, 0) / gameState.responseTimes.length).toFixed(2)
        : 0;
    elements.avgResponse.textContent = `${avgResponse}s`;
}

function logAction(icon, text) {
    const elapsedTime = ((Date.now() - gameState.startTime) / 1000).toFixed(1);
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="log-time">t=${elapsedTime}s</span>
        <span class="log-icon">${icon}</span>
        <span class="log-text">${text}</span>
    `;
    
    elements.actionLog.appendChild(logEntry);
    
    // Auto-scroll to bottom
    elements.actionLog.scrollTop = elements.actionLog.scrollHeight;
    
    // Keep log manageable (max 50 entries)
    while (elements.actionLog.children.length > 50) {
        elements.actionLog.removeChild(elements.actionLog.firstChild);
    }
}

function clearLog() {
    elements.actionLog.innerHTML = `
        <div class="log-entry">
            <span class="log-time">t=0s</span>
            <span class="log-icon">🎮</span>
            <span class="log-text">Log cleared - Game continues</span>
        </div>
    `;
    gameState.startTime = Date.now();
    logAction('🗑️', 'Action log cleared');
}

// ===== UTILITY FUNCTIONS =====
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function levelUp() {
    gameState.level++;
    gameState.questionsInLevel = 0;
    
    // Show celebration
    showCelebration('🎉', `Level ${gameState.level}!`);
    
    logAction('🎊', `Level up! Now at Level ${gameState.level}`);
    
    updateDisplay();
}

// ===== START THE GAME =====
// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}