// ===================================
// GAME STATE AND DATA
// ===================================

// Game state object to track current game status
const gameState = {
    currentLevel: 1,
    score: 0,
    challengesSolved: 0,
    totalChallenges: 0,
    isGameActive: false,
    hintsUsed: 0,
    analytics: []
};

// Security challenges database organized by level and category
const securityChallenges = {
    level1: [
        { id: 1, text: "Hackers steal personal data from online shopping websites", category: "cybersecurity", icon: "💻" },
        { id: 2, text: "COVID-19 pandemic spreads rapidly across countries", category: "health", icon: "🦠" },
        { id: 3, text: "Terrorist groups use social media to recruit members globally", category: "terrorism", icon: "⚠️" },
        { id: 4, text: "Money laundering through international banking systems", category: "economic", icon: "💰" }
    ],
    level2: [
        { id: 5, text: "Ransomware attacks on hospitals demanding cryptocurrency payments", category: "cybersecurity", icon: "🔒" },
        { id: 6, text: "Counterfeit medicines sold online across borders", category: "health", icon: "💊" },
        { id: 7, text: "Extremist content spreads through encrypted messaging apps", category: "terrorism", icon: "📱" },
        { id: 8, text: "Credit card fraud in international e-commerce transactions", category: "economic", icon: "💳" },
        { id: 9, text: "Phishing emails targeting government officials", category: "cybersecurity", icon: "📧" },
        { id: 10, text: "Illegal wildlife trade spreading infectious diseases", category: "health", icon: "🐾" }
    ],
    level3: [
        { id: 11, text: "State-sponsored cyber attacks on critical infrastructure", category: "cybersecurity", icon: "🏭" },
        { id: 12, text: "Bioterrorism threats using engineered pathogens", category: "health", icon: "🧬" },
        { id: 13, text: "Terrorist financing through cryptocurrency networks", category: "terrorism", icon: "🪙" },
        { id: 14, text: "Stock market manipulation through fake news campaigns", category: "economic", icon: "📈" },
        { id: 15, text: "Identity theft rings operating across multiple countries", category: "cybersecurity", icon: "🎭" },
        { id: 16, text: "Pandemic preparedness gaps in global supply chains", category: "health", icon: "🚚" },
        { id: 17, text: "Lone wolf attacks inspired by online extremist content", category: "terrorism", icon: "🎯" },
        { id: 18, text: "Ponzi schemes targeting international investors", category: "economic", icon: "🎰" }
    ]
};

// Category definitions with descriptions
const categories = {
    cybersecurity: {
        name: "Cybersecurity",
        icon: "🛡️",
        description: "Digital threats, hacking, and online security issues"
    },
    health: {
        name: "Health Security",
        icon: "🏥",
        description: "Disease spread, pandemics, and health-related threats"
    },
    economic: {
        name: "Economic Security",
        icon: "💼",
        description: "Financial crimes, fraud, and economic threats"
    },
    terrorism: {
        name: "Terrorism",
        icon: "🚨",
        description: "Extremism, terrorist activities, and related threats"
    }
};

// Scenario texts for each level
const scenarios = {
    1: "Welcome! In our globalised world, security challenges can spread quickly across borders. Let's learn to identify different types of security threats.",
    2: "Great job! Now let's explore more complex security challenges that affect multiple countries simultaneously.",
    3: "Excellent progress! You're now facing advanced security scenarios that require careful analysis and understanding."
};

// ===================================
// DOM ELEMENTS
// ===================================

let challengeCardsContainer;
let dropZonesContainer;
let scenarioText;
let startBtn;
let checkBtn;
let resetBtn;
let hintBtn;
let scoreValue;
let levelValue;
let progressValue;
let feedbackMessage;
let analyticsLog;
let analyticsPanel;
let toggleAnalyticsBtn;
let clearAnalyticsBtn;
let helpModal;

// Drag and drop state
let draggedElement = null;
let touchStartX = 0;
let touchStartY = 0;

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    challengeCardsContainer = document.getElementById('challenge-cards');
    dropZonesContainer = document.getElementById('drop-zones');
    scenarioText = document.getElementById('scenario-text');
    startBtn = document.getElementById('start-btn');
    checkBtn = document.getElementById('check-btn');
    resetBtn = document.getElementById('reset-btn');
    hintBtn = document.getElementById('hint-btn');
    scoreValue = document.getElementById('score-value');
    levelValue = document.getElementById('level-value');
    progressValue = document.getElementById('progress-value');
    feedbackMessage = document.getElementById('feedback-message');
    analyticsLog = document.getElementById('analytics-log');
    analyticsPanel = document.getElementById('analytics-panel');
    toggleAnalyticsBtn = document.getElementById('toggle-analytics');
    clearAnalyticsBtn = document.getElementById('clear-analytics');
    helpModal = document.getElementById('help-modal');

    // Initialize drop zones
    initializeDropZones();

    // Set up event listeners
    startBtn.addEventListener('click', startGame);
    checkBtn.addEventListener('click', checkAnswers);
    resetBtn.addEventListener('click', resetGame);
    hintBtn.addEventListener('click', showHint);
    toggleAnalyticsBtn.addEventListener('click', toggleAnalytics);
    clearAnalyticsBtn.addEventListener('click', clearAnalytics);

    // Show help modal on first load
    setTimeout(() => {
        showHelpModal();
    }, 500);

    // Close modal functionality
    const closeModalBtn = document.querySelector('.close-modal');
    closeModalBtn.addEventListener('click', closeHelpModal);
    
    helpModal.addEventListener('click', function(e) {
        if (e.target === helpModal) {
            closeHelpModal();
        }
    });

    // Update UI
    updateUI();
});

// ===================================
// GAME LOGIC FUNCTIONS
// ===================================

/**
 * Initialize drop zones for all categories
 */
function initializeDropZones() {
    dropZonesContainer.innerHTML = '';
    
    Object.keys(categories).forEach(categoryKey => {
        const category = categories[categoryKey];
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.dataset.category = categoryKey;
        
        dropZone.innerHTML = `
            <div class="drop-zone-header">
                <span class="drop-zone-icon">${category.icon}</span>
                <span>${category.name}</span>
            </div>
            <div class="drop-zone-cards"></div>
        `;
        
        // Add drag and drop event listeners
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', handleDrop);
        dropZone.addEventListener('dragleave', handleDragLeave);
        
        // Touch event listeners for mobile
        dropZone.addEventListener('touchmove', handleTouchMove);
        dropZone.addEventListener('touchend', handleTouchEnd);
        
        dropZonesContainer.appendChild(dropZone);
    });
}

/**
 * Start the game - load challenges for current level
 */
function startGame() {
    gameState.isGameActive = true;
    gameState.challengesSolved = 0;
    
    // Load challenges for current level
    const levelKey = `level${gameState.currentLevel}`;
    const challenges = securityChallenges[levelKey];
    gameState.totalChallenges = challenges.length;
    
    // Update scenario text
    scenarioText.textContent = scenarios[gameState.currentLevel];
    
    // Clear previous challenges
    challengeCardsContainer.innerHTML = '';
    
    // Clear drop zones
    document.querySelectorAll('.drop-zone-cards').forEach(zone => {
        zone.innerHTML = '';
    });
    
    // Shuffle challenges for variety
    const shuffledChallenges = shuffleArray([...challenges]);
    
    // Create challenge cards
    shuffledChallenges.forEach(challenge => {
        const card = createChallengeCard(challenge);
        challengeCardsContainer.appendChild(card);
    });
    
    // Update buttons
    startBtn.disabled = true;
    checkBtn.disabled = false;
    hintBtn.disabled = false;
    
    // Hide feedback
    feedbackMessage.style.display = 'none';
    
    // Update UI
    updateUI();
    
    // Log analytics
    logAnalytics('game_start', `Started Level ${gameState.currentLevel}`, null, null, 'info');
}

/**
 * Create a challenge card element
 */
function createChallengeCard(challenge) {
    const card = document.createElement('div');
    card.className = 'challenge-card';
    card.draggable = true;
    card.dataset.id = challenge.id;
    card.dataset.category = challenge.category;
    card.innerHTML = `${challenge.icon} ${challenge.text}`;
    
    // Mouse drag events
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    
    // Touch events for mobile
    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleTouchEnd);
    
    return card;
}

/**
 * Check if all answers are correct
 */
function checkAnswers() {
    if (!gameState.isGameActive) return;
    
    let correctCount = 0;
    let incorrectCount = 0;
    const dropZones = document.querySelectorAll('.drop-zone');
    
    dropZones.forEach(zone => {
        const categoryKey = zone.dataset.category;
        const cards = zone.querySelectorAll('.challenge-card');
        
        cards.forEach(card => {
            const cardCategory = card.dataset.category;
            const challengeText = card.textContent.trim();
            
            if (cardCategory === categoryKey) {
                // Correct placement
                card.classList.add('correct');
                card.classList.remove('incorrect');
                correctCount++;
                
                // Log analytics
                logAnalytics(
                    'answer_check',
                    challengeText,
                    categories[categoryKey].name,
                    categories[categoryKey].name,
                    'correct'
                );
            } else {
                // Incorrect placement
                card.classList.add('incorrect');
                card.classList.remove('correct');
                incorrectCount++;
                
                // Log analytics
                logAnalytics(
                    'answer_check',
                    challengeText,
                    categories[categoryKey].name,
                    categories[cardCategory].name,
                    'incorrect'
                );
            }
        });
    });
    
    // Check if there are cards still in the challenge container
    const remainingCards = challengeCardsContainer.querySelectorAll('.challenge-card').length;
    
    if (remainingCards > 0) {
        showFeedback('Please place all challenge cards into categories before checking!', 'error');
        return;
    }
    
    // Calculate score
    const pointsEarned = (correctCount * 10) - (incorrectCount * 5);
    gameState.score += Math.max(0, pointsEarned);
    gameState.challengesSolved = correctCount;
    
    // Update UI
    updateUI();
    
    // Check if level is complete
    if (correctCount === gameState.totalChallenges) {
        // Level complete!
        showFeedback(`🎉 Excellent! You've completed Level ${gameState.currentLevel}! Score: +${pointsEarned} points`, 'success');
        
        // Disable check button
        checkBtn.disabled = true;
        hintBtn.disabled = true;
        
        // Advance to next level after delay
        setTimeout(() => {
            if (gameState.currentLevel < 3) {
                gameState.currentLevel++;
                startBtn.disabled = false;
                startBtn.textContent = `Start Level ${gameState.currentLevel}`;
                showFeedback(`Ready for Level ${gameState.currentLevel}? Click "Start Level ${gameState.currentLevel}" to continue!`, 'info');
            } else {
                // Game complete!
                showFeedback(`🏆 Congratulations! You've completed all levels! Final Score: ${gameState.score}`, 'success');
                startBtn.textContent = 'Play Again';
                startBtn.disabled = false;
                gameState.currentLevel = 1;
            }
        }, 2000);
        
    } else {
        // Some incorrect answers
        const incorrectRemaining = incorrectCount;
        showFeedback(`You got ${correctCount} correct and ${incorrectCount} incorrect. Try moving the incorrect cards to the right categories!`, 'error');
        
        // Allow retry - remove incorrect cards back to challenge container
        setTimeout(() => {
            const incorrectCards = document.querySelectorAll('.challenge-card.incorrect');
            incorrectCards.forEach(card => {
                card.classList.remove('incorrect');
                challengeCardsContainer.appendChild(card);
            });
            showFeedback('Incorrect cards have been returned. Try again!', 'info');
        }, 2000);
    }
}

/**
 * Reset the game to initial state
 */
function resetGame() {
    gameState.currentLevel = 1;
    gameState.score = 0;
    gameState.challengesSolved = 0;
    gameState.totalChallenges = 0;
    gameState.isGameActive = false;
    gameState.hintsUsed = 0;
    
    // Clear UI
    challengeCardsContainer.innerHTML = '';
    document.querySelectorAll('.drop-zone-cards').forEach(zone => {
        zone.innerHTML = '';
    });
    
    // Reset buttons
    startBtn.disabled = false;
    startBtn.textContent = 'Start Game';
    checkBtn.disabled = true;
    hintBtn.disabled = true;
    
    // Reset scenario
    scenarioText.textContent = "Click 'Start Game' to begin exploring security challenges in our globalised world!";
    
    // Hide feedback
    feedbackMessage.style.display = 'none';
    
    // Update UI
    updateUI();
    
    // Log analytics
    logAnalytics('game_reset', 'Game reset to initial state', null, null, 'info');
}

/**
 * Show a hint to help the student
 */
function showHint() {
    if (!gameState.isGameActive) return;
    
    gameState.hintsUsed++;
    
    // Find a card that's either in the wrong zone or still in the challenge container
    const allCards = document.querySelectorAll('.challenge-card');
    let hintCard = null;
    
    // First, check for cards in wrong zones
    allCards.forEach(card => {
        const parent = card.parentElement;
        if (parent.classList.contains('drop-zone-cards')) {
            const zone = parent.parentElement;
            const zoneCategory = zone.dataset.category;
            const cardCategory = card.dataset.category;
            
            if (zoneCategory !== cardCategory && !hintCard) {
                hintCard = card;
            }
        }
    });
    
    // If no wrong cards, pick one from challenge container
    if (!hintCard) {
        const cardsInContainer = challengeCardsContainer.querySelectorAll('.challenge-card');
        if (cardsInContainer.length > 0) {
            hintCard = cardsInContainer[0];
        }
    }
    
    if (hintCard) {
        const correctCategory = hintCard.dataset.category;
        const categoryName = categories[correctCategory].name;
        
        // Highlight the card
        hintCard.style.animation = 'shake 0.5s';
        setTimeout(() => {
            hintCard.style.animation = '';
        }, 500);
        
        showFeedback(`💡 Hint: This challenge belongs to "${categoryName}" category. Think about what type of security threat it represents!`, 'info');
        
        // Log analytics
        logAnalytics('hint_used', hintCard.textContent.trim(), null, categoryName, 'info');
    } else {
        showFeedback('All cards are correctly placed! Click "Check Answers" to verify.', 'success');
    }
}

// ===================================
// DRAG AND DROP HANDLERS (MOUSE)
// ===================================

/**
 * Handle drag start event
 */
function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

/**
 * Handle drag end event
 */
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    
    // Remove drag-over class from all drop zones
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('drag-over');
    });
}

/**
 * Handle drag over event
 */
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    
    e.dataTransfer.dropEffect = 'move';
    
    // Add visual feedback
    const dropZone = e.currentTarget;
    dropZone.classList.add('drag-over');
    
    return false;
}

/**
 * Handle drag leave event
 */
function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

/**
 * Handle drop event
 */
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    e.preventDefault();
    
    const dropZone = e.currentTarget;
    dropZone.classList.remove('drag-over');
    
    if (draggedElement) {
        // Remove any previous correct/incorrect classes
        draggedElement.classList.remove('correct', 'incorrect');
        
        // Append to drop zone cards container
        const cardsContainer = dropZone.querySelector('.drop-zone-cards');
        cardsContainer.appendChild(draggedElement);
        
        draggedElement = null;
    }
    
    return false;
}

// ===================================
// TOUCH HANDLERS (MOBILE)
// ===================================

/**
 * Handle touch start event
 */
function handleTouchStart(e) {
    draggedElement = e.target;
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    
    draggedElement.classList.add('dragging');
    
    // Prevent default to avoid scrolling while dragging
    e.preventDefault();
}

/**
 * Handle touch move event
 */
function handleTouchMove(e) {
    if (!draggedElement) return;
    
    const touch = e.touches[0];
    const currentX = touch.clientX;
    const currentY = touch.clientY;
    
    // Move the element visually (optional - for better UX)
    draggedElement.style.position = 'fixed';
    draggedElement.style.left = currentX - (draggedElement.offsetWidth / 2) + 'px';
    draggedElement.style.top = currentY - (draggedElement.offsetHeight / 2) + 'px';
    draggedElement.style.zIndex = '1000';
    draggedElement.style.opacity = '0.8';
    
    // Check which drop zone we're over
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        if (currentX >= rect.left && currentX <= rect.right &&
            currentY >= rect.top && currentY <= rect.bottom) {
            zone.classList.add('drag-over');
        } else {
            zone.classList.remove('drag-over');
        }
    });
    
    e.preventDefault();
}

/**
 * Handle touch end event
 */
function handleTouchEnd(e) {
    if (!draggedElement) return;
    
    const touch = e.changedTouches[0];
    const currentX = touch.clientX;
    const currentY = touch.clientY;
    
    // Reset visual styles
    draggedElement.style.position = '';
    draggedElement.style.left = '';
    draggedElement.style.top = '';
    draggedElement.style.zIndex = '';
    draggedElement.style.opacity = '';
    draggedElement.classList.remove('dragging');
    
    // Find which drop zone we're over
    const dropZones = document.querySelectorAll('.drop-zone');
    let targetZone = null;
    
    dropZones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        if (currentX >= rect.left && currentX <= rect.right &&
            currentY >= rect.top && currentY <= rect.bottom) {
            targetZone = zone;
        }
        zone.classList.remove('drag-over');
    });
    
    // Drop the element
    if (targetZone) {
        draggedElement.classList.remove('correct', 'incorrect');
        const cardsContainer = targetZone.querySelector('.drop-zone-cards');
        cardsContainer.appendChild(draggedElement);
    }
    
    draggedElement = null;
    e.preventDefault();
}

// ===================================
// UI UPDATE FUNCTIONS
// ===================================

/**
 * Update all UI elements with current game state
 */
function updateUI() {
    scoreValue.textContent = gameState.score;
    levelValue.textContent = gameState.currentLevel;
    progressValue.textContent = `${gameState.challengesSolved}/${gameState.totalChallenges}`;
}

/**
 * Show feedback message to user
 */
function showFeedback(message, type) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = type;
    feedbackMessage.style.display = 'block';
    
    // Auto-hide after 5 seconds for non-critical messages
    if (type === 'info') {
        setTimeout(() => {
            feedbackMessage.style.display = 'none';
        }, 5000);
    }
}

// ===================================
// ANALYTICS FUNCTIONS
// ===================================

/**
 * Log analytics entry
 */
function logAnalytics(action, challenge, studentAnswer, correctAnswer, result) {
    const timestamp = new Date().toLocaleTimeString();
    
    const entry = {
        timestamp,
        action,
        challenge,
        studentAnswer,
        correctAnswer,
        result
    };
    
    gameState.analytics.push(entry);
    
    // Update analytics display
    updateAnalyticsDisplay();
}

/**
 * Update analytics display panel
 */
function updateAnalyticsDisplay() {
    analyticsLog.innerHTML = '';
    
    // Show last 10 entries (most recent first)
    const recentEntries = gameState.analytics.slice(-10).reverse();
    
    recentEntries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = `analytics-entry ${entry.result}`;
        
        let icon = '📝';
        if (entry.result === 'correct') icon = '✅';
        if (entry.result === 'incorrect') icon = '❌';
        if (entry.result === 'info') icon = 'ℹ️';
        
        let detailsHTML = '';
        if (entry.action === 'answer_check') {
            detailsHTML = `
                <div class="analytics-entry-detail">
                    <strong>Challenge:</strong> ${entry.challenge}<br>
                    <strong>Student Answer:</strong> ${entry.studentAnswer}<br>
                    <strong>Correct Answer:</strong> ${entry.correctAnswer}<br>
                    <strong>Result:</strong> ${icon} ${entry.result === 'correct' ? 'Correct' : 'Incorrect'}
                </div>
            `;
        } else if (entry.action === 'hint_used') {
            detailsHTML = `
                <div class="analytics-entry-detail">
                    <strong>Hint requested for:</strong> ${entry.challenge}<br>
                    <strong>Correct category:</strong> ${entry.correctAnswer}
                </div>
            `;
        } else {
            detailsHTML = `
                <div class="analytics-entry-detail">
                    ${entry.challenge}
                </div>
            `;
        }
        
        entryDiv.innerHTML = `
            <div class="analytics-entry-header">
                ${icon} ${entry.timestamp} - ${entry.action.replace('_', ' ').toUpperCase()}
            </div>
            ${detailsHTML}
        `;
        
        analyticsLog.appendChild(entryDiv);
    });
    
    if (gameState.analytics.length === 0) {
        analyticsLog.innerHTML = '<p style="color: #6c757d; font-style: italic;">No analytics data yet. Start playing to see your progress!</p>';
    }
}

/**
 * Toggle analytics panel visibility
 */
function toggleAnalytics() {
    analyticsPanel.classList.toggle('collapsed');
    toggleAnalyticsBtn.textContent = analyticsPanel.classList.contains('collapsed') ? '▲' : '▼';
}

/**
 * Clear analytics log
 */
function clearAnalytics() {
    if (confirm('Are you sure you want to clear the analytics log?')) {
        gameState.analytics = [];
        updateAnalyticsDisplay();
        showFeedback('Analytics log cleared!', 'info');
    }
}

// ===================================
// MODAL FUNCTIONS
// ===================================

/**
 * Show help modal
 */
function showHelpModal() {
    helpModal.classList.add('show');
}

/**
 * Close help modal
 */
function closeHelpModal() {
    helpModal.classList.remove('show');
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ===================================
// PREVENT ACCIDENTAL PAGE NAVIGATION
// ===================================

// Prevent accidental page refresh during game
window.addEventListener('beforeunload', function(e) {
    if (gameState.isGameActive) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// ===================================
// RESPONSIVE DETECTION
// ===================================

// Detect if running in iframe vs standalone
if (window.self !== window.top) {
    document.body.classList.add('iframe-mode');
}