// ============================================
// LIFE CYCLE QUIZ - DRAG & DROP SCRIPT
// ============================================

// Data structure for life cycles of different organisms
// Each organism has stages with unicode emojis and descriptions
const lifeCycleData = {
    grasshopper: {
        name: 'Grasshopper',
        emoji: '🦗',
        type: 'Incomplete Metamorphosis',
        stages: [
            { id: 'g1', name: 'Egg', emoji: '🥚', order: 1 },
            { id: 'g2', name: 'Nymph', emoji: '🦗', order: 2 },
            { id: 'g3', name: 'Adult', emoji: '🦗', order: 3 }
        ]
    },
    beetle: {
        name: 'Beetle',
        emoji: '🪲',
        type: 'Complete Metamorphosis',
        stages: [
            { id: 'b1', name: 'Egg', emoji: '🥚', order: 1 },
            { id: 'b2', name: 'Larva', emoji: '🐛', order: 2 },
            { id: 'b3', name: 'Pupa', emoji: '🫘', order: 3 },
            { id: 'b4', name: 'Adult', emoji: '🪲', order: 4 }
        ]
    },
    mosquito: {
        name: 'Mosquito',
        emoji: '🦟',
        type: 'Complete Metamorphosis',
        stages: [
            { id: 'm1', name: 'Egg', emoji: '🥚', order: 1 },
            { id: 'm2', name: 'Larva', emoji: '🐛', order: 2 },
            { id: 'm3', name: 'Pupa', emoji: '🫘', order: 3 },
            { id: 'm4', name: 'Adult', emoji: '🦟', order: 4 }
        ]
    },
    cockroach: {
        name: 'Cockroach',
        emoji: '🪳',
        type: 'Incomplete Metamorphosis',
        stages: [
            { id: 'c1', name: 'Egg', emoji: '🥚', order: 1 },
            { id: 'c2', name: 'Nymph', emoji: '🪳', order: 2 },
            { id: 'c3', name: 'Adult', emoji: '🪳', order: 3 }
        ]
    },
    chicken: {
        name: 'Chicken',
        emoji: '🐔',
        type: 'Direct Development',
        stages: [
            { id: 'ch1', name: 'Egg', emoji: '🥚', order: 1 },
            { id: 'ch2', name: 'Chick', emoji: '🐤', order: 2 },
            { id: 'ch3', name: 'Adult', emoji: '🐔', order: 3 }
        ]
    }
};

// Global state management
const state = {
    currentOrganism: 'grasshopper',
    draggedItem: null,
    placement: {}, // Track which stage is placed in which drop zone
    attempts: 0,
    correctAttempts: 0,
    activityLog: [], // Time-based log of all attempts
    organismStats: {}, // Performance stats per organism
    startTime: Date.now()
};

// Initialize organism stats
Object.keys(lifeCycleData).forEach(org => {
    state.organismStats[org] = {
        attempts: 0,
        correct: 0,
        accuracy: 0,
        lastAttempt: null
    };
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
    setupEventListeners();
    renderCurrentOrganism();
});

/**
 * Initialize UI elements and set up the interface
 */
function initializeUI() {
    // Set up organism selector buttons
    document.querySelectorAll('.organism-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.organism-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            state.currentOrganism = e.target.dataset.organism;
            state.placement = {}; // Reset placement when switching organisms
            renderCurrentOrganism();
        });
    });
}

/**
 * Set up event listeners for buttons and interactions
 */
function setupEventListeners() {
    document.getElementById('checkBtn').addEventListener('click', checkAnswer);
    document.getElementById('resetBtn').addEventListener('click', resetQuiz);
    document.getElementById('analyticsBtn').addEventListener('click', showAnalytics);
    document.getElementById('closeAnalyticsBtn').addEventListener('click', hideAnalytics);
}

/**
 * Render the current organism's life cycle stages
 * Creates draggable stage items and drop zones
 */
function renderCurrentOrganism() {
    const organism = lifeCycleData[state.currentOrganism];
    const stagesContainer = document.getElementById('stagesContainer');
    const timelineContainer = document.getElementById('timelineContainer');

    // Clear previous content
    stagesContainer.innerHTML = '';
    timelineContainer.innerHTML = '';

    // Shuffle stages for dragging (but keep correct order in data)
    const shuffledStages = [...organism.stages].sort(() => Math.random() - 0.5);

    // Create draggable stage items
    shuffledStages.forEach(stage => {
        const stageItem = document.createElement('div');
        stageItem.className = 'stage-item';
        stageItem.draggable = true;
        stageItem.dataset.stageId = stage.id;
        stageItem.dataset.order = stage.order;
        stageItem.innerHTML = `<span class="stage-emoji">${stage.emoji}</span><span>${stage.name}</span>`;

        // Check if this stage is already placed
        if (state.placement[stage.order]) {
            stageItem.classList.add('placed');
        }

        stageItem.addEventListener('dragstart', handleDragStart);
        stageItem.addEventListener('dragend', handleDragEnd);

        stagesContainer.appendChild(stageItem);
    });

    // Create drop zones for each stage position
    organism.stages.forEach(stage => {
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.dataset.order = stage.order;
        dropZone.innerHTML = `
            <div class="drop-zone-label">Stage ${stage.order}</div>
            <div class="drop-zone-content" id="zone-${stage.order}"></div>
        `;

        // Add dropped item if exists
        if (state.placement[stage.order]) {
            const placedStage = organism.stages.find(s => s.id === state.placement[stage.order]);
            if (placedStage) {
                const zoneContent = dropZone.querySelector('.drop-zone-content');
                zoneContent.innerHTML = `
                    <div class="dropped-item">
                        <span>${placedStage.emoji} ${placedStage.name}</span>
                        <button class="remove-item-btn" onclick="removeFromZone(${stage.order})">✕</button>
                    </div>
                `;
            }
        }

        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', (e) => handleDrop(e, stage.order));
        dropZone.addEventListener('dragleave', handleDragLeave);

        timelineContainer.appendChild(dropZone);
    });

    // Hide feedback when switching organisms
    document.getElementById('feedbackSection').style.display = 'none';
}

// ============================================
// DRAG AND DROP HANDLERS
// ============================================

/**
 * Handle drag start event
 * Stores reference to dragged item and updates UI
 */
function handleDragStart(e) {
    state.draggedItem = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

/**
 * Handle drag end event
 * Cleans up dragging state
 */
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('active');
    });
}

/**
 * Handle drag over drop zone
 * Provides visual feedback for valid drop targets
 */
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('active');
}

/**
 * Handle drag leave drop zone
 * Removes visual feedback
 */
function handleDragLeave(e) {
    e.currentTarget.classList.remove('active');
}

/**
 * Handle drop event
 * Places the dragged stage into the drop zone
 * @param {Event} e - Drop event
 * @param {number} order - The order/position of the drop zone
 */
function handleDrop(e, order) {
    e.preventDefault();
    e.currentTarget.classList.remove('active');

    if (!state.draggedItem) return;

    const stageId = state.draggedItem.dataset.stageId;
    const stageOrder = parseInt(state.draggedItem.dataset.order);

    // Store the placement
    state.placement[order] = stageId;

    // Update UI
    renderCurrentOrganism();
}

/**
 * Remove a stage from a drop zone
 * @param {number} order - The order/position of the drop zone
 */
function removeFromZone(order) {
    delete state.placement[order];
    renderCurrentOrganism();
}

// ============================================
// QUIZ LOGIC
// ============================================

/**
 * Check the answer and provide feedback
 * Validates if stages are placed in correct order
 * Records attempt in activity log
 */
function checkAnswer() {
    const organism = lifeCycleData[state.currentOrganism];
    let isCorrect = true;

    // Check if all stages are placed
    if (Object.keys(state.placement).length !== organism.stages.length) {
        showFeedback(false, 'Please place all stages in the timeline');
        return;
    }

    // Check if stages are in correct order
    for (let i = 1; i <= organism.stages.length; i++) {
        const expectedStageId = organism.stages[i - 1].id;
        const placedStageId = state.placement[i];

        if (placedStageId !== expectedStageId) {
            isCorrect = false;
            break;
        }
    }

    // Update statistics
    state.attempts++;
    state.organismStats[state.currentOrganism].attempts++;
    state.organismStats[state.currentOrganism].lastAttempt = new Date();

    if (isCorrect) {
        state.correctAttempts++;
        state.organismStats[state.currentOrganism].correct++;
        updateAccuracy();
    }

    // Calculate elapsed time
    const elapsedTime = Math.round((Date.now() - state.startTime) / 1000);

    // Log the attempt with timestamp
    const logEntry = {
        timestamp: elapsedTime,
        organism: state.currentOrganism,
        stages: { ...state.placement },
        isCorrect: isCorrect,
        time: new Date().toLocaleTimeString()
    };
    state.activityLog.push(logEntry);

    // Show feedback
    if (isCorrect) {
        showFeedback(true, `✓ Correct! ${organism.name} life cycle is in the right order!`);
    } else {
        showFeedback(false, `✗ Not quite right. Check the order of the stages.`);
    }

    // Highlight correct/incorrect zones
    updateZoneHighlighting(isCorrect);
}

/**
 * Update accuracy percentage
 */
function updateAccuracy() {
    Object.keys(state.organismStats).forEach(org => {
        const stats = state.organismStats[org];
        if (stats.attempts > 0) {
            stats.accuracy = Math.round((stats.correct / stats.attempts) * 100);
        }
    });
}

/**
 * Highlight drop zones with correct/incorrect styling
 * @param {boolean} isCorrect - Whether the answer is correct
 */
function updateZoneHighlighting(isCorrect) {
    const organism = lifeCycleData[state.currentOrganism];
    
    organism.stages.forEach(stage => {
        const dropZone = document.querySelector(`[data-order="${stage.order}"]`);
        if (isCorrect) {
            dropZone.classList.add('drop-zone-correct');
            dropZone.classList.remove('drop-zone-incorrect');
        } else {
            dropZone.classList.add('drop-zone-incorrect');
            dropZone.classList.remove('drop-zone-correct');
        }
    });
}

/**
 * Show feedback message to user
 * @param {boolean} isCorrect - Whether the answer is correct
 * @param {string} message - Feedback message
 */
function showFeedback(isCorrect, message) {
    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackIcon = document.getElementById('feedbackIcon');
    const feedbackText = document.getElementById('feedbackText');

    feedbackIcon.textContent = isCorrect ? '✓' : '✗';
    feedbackText.textContent = message;

    feedbackSection.className = 'feedback-section';
    feedbackSection.classList.add(isCorrect ? 'feedback-correct' : 'feedback-incorrect');
    feedbackSection.style.display = 'block';

    // Auto-hide feedback after 3 seconds
    setTimeout(() => {
        feedbackSection.style.display = 'none';
    }, 3000);
}

/**
 * Reset the quiz for current organism
 * Clears placement and feedback
 */
function resetQuiz() {
    state.placement = {};
    document.getElementById('feedbackSection').style.display = 'none';
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('drop-zone-correct', 'drop-zone-incorrect');
    });
    renderCurrentOrganism();
}

// ============================================
// ANALYTICS
// ============================================

/**
 * Show analytics panel with performance data
 */
function showAnalytics() {
    const analyticsPanel = document.getElementById('analyticsPanel');
    analyticsPanel.style.display = 'block';

    // Update statistics
    document.getElementById('attemptsCount').textContent = state.attempts;
    document.getElementById('correctCount').textContent = state.correctAttempts;
    
    const accuracy = state.attempts > 0 
        ? Math.round((state.correctAttempts / state.attempts) * 100) 
        : 0;
    document.getElementById('accuracyPercent').textContent = accuracy + '%';

    // Populate activity log
    populateActivityLog();

    // Populate organism performance
    populateOrganismPerformance();
}

/**
 * Hide analytics panel
 */
function hideAnalytics() {
    document.getElementById('analyticsPanel').style.display = 'none';
}

/**
 * Populate the time-based activity log
 * Shows each attempt with timestamp and result
 */
function populateActivityLog() {
    const logContainer = document.getElementById('logContainer');
    logContainer.innerHTML = '';

    if (state.activityLog.length === 0) {
        logContainer.innerHTML = '<div style="text-align: center; color: #999; padding: 20px;">No attempts yet</div>';
        return;
    }

    state.activityLog.forEach((entry, index) => {
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${entry.isCorrect ? 'correct' : 'incorrect'}`;

        const organism = lifeCycleData[entry.organism];
        const stageNames = organism.stages
            .map(s => state.placement[s.order] === s.id ? s.name : null)
            .filter(n => n)
            .join(' → ');

        logEntry.innerHTML = `
            <span class="log-time">t=${entry.timestamp}s</span>
            <span class="log-text">${organism.emoji} ${organism.name}</span>
            <span class="log-result ${entry.isCorrect ? 'correct' : 'incorrect'}">
                ${entry.isCorrect ? 'CORRECT' : 'WRONG'}
            </span>
        `;

        logContainer.appendChild(logEntry);
    });
}

/**
 * Populate organism performance statistics
 * Shows accuracy and attempt count for each organism
 */
function populateOrganismPerformance() {
    const perfList = document.getElementById('perfList');
    perfList.innerHTML = '';

    Object.keys(lifeCycleData).forEach(orgKey => {
        const organism = lifeCycleData[orgKey];
        const stats = state.organismStats[orgKey];

        if (stats.attempts === 0) return;

        const perfItem = document.createElement('div');
        perfItem.className = 'perf-item';
        perfItem.innerHTML = `
            <div class="perf-organism">
                <span class="perf-organism-emoji">${organism.emoji}</span>
                <span>${organism.name}</span>
            </div>
            <div class="perf-stats">
                <div class="perf-stat">
                    <div class="perf-stat-label">Attempts</div>
                    <div class="perf-stat-value">${stats.attempts}</div>
                </div>
                <div class="perf-stat">
                    <div class="perf-stat-label">Correct</div>
                    <div class="perf-stat-value">${stats.correct}</div>
                </div>
                <div class="perf-stat">
                    <div class="perf-stat-label">Accuracy</div>
                    <div class="perf-stat-value">${stats.accuracy}%</div>
                </div>
            </div>
        `;

        perfList.appendChild(perfItem);
    });

    if (perfList.children.length === 0) {
        perfList.innerHTML = '<div style="text-align: center; color: #999; padding: 20px;">No data yet</div>';
    }
}