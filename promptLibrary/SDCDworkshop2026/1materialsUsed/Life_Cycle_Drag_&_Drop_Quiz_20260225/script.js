// ===== LIFE CYCLE DATA =====
// Data structure containing all organism life cycle information
const lifecycleData = {
    butterfly: {
        name: 'Butterfly',
        stages: [
            { id: 0, name: 'Egg', emoji: '🥚', description: 'Tiny eggs laid on leaves' },
            { id: 1, name: 'Caterpillar (Larva)', emoji: '🐛', description: 'Hatches and eats leaves to grow' },
            { id: 2, name: 'Pupa (Chrysalis)', emoji: '🛡️', description: 'Forms a protective case for transformation' },
            { id: 3, name: 'Adult Butterfly', emoji: '🦋', description: 'Emerges with wings and can reproduce' }
        ],
        explanation: 'Butterflies undergo complete metamorphosis with four distinct stages. The caterpillar looks completely different from the adult butterfly.',
        misconception: '⚠️ Common Misconception: Many students think the pupa is resting. Actually, dramatic changes are happening inside!'
    },
    frog: {
        name: 'Frog',
        stages: [
            { id: 0, name: 'Egg (Frogspawn)', emoji: '⚫', description: 'Jelly-like eggs in water' },
            { id: 1, name: 'Tadpole', emoji: '🐟', description: 'Lives in water, has tail and gills' },
            { id: 2, name: 'Tadpole with Legs', emoji: '🦎', description: 'Grows legs, tail shrinks' },
            { id: 3, name: 'Adult Frog', emoji: '🐸', description: 'Lives on land, breathes with lungs' }
        ],
        explanation: 'Frogs undergo metamorphosis from water-dwelling tadpoles to land-dwelling adults. They change from breathing with gills to breathing with lungs.',
        misconception: '⚠️ Common Misconception: Students often think tadpoles are baby fish. Tadpoles are actually young frogs!'
    },
    chicken: {
        name: 'Chicken',
        stages: [
            { id: 0, name: 'Egg', emoji: '🥚', description: 'Hard-shelled egg laid by hen' },
            { id: 1, name: 'Embryo', emoji: '🌡️', description: 'Develops inside egg for 21 days' },
            { id: 2, name: 'Chick', emoji: '🐤', description: 'Hatches from egg, covered in down feathers' },
            { id: 3, name: 'Adult Chicken', emoji: '🐔', description: 'Fully grown with adult feathers' }
        ],
        explanation: 'Chickens undergo incomplete metamorphosis. The chick looks similar to the adult, just smaller. No dramatic body changes like butterflies.',
        misconception: '⚠️ Common Misconception: Size does not always indicate age. A small chicken might be fully grown (bantam breed)!'
    },
    plant: {
        name: 'Bean Plant',
        stages: [
            { id: 0, name: 'Seed', emoji: '🌰', description: 'Contains embryo and stored food' },
            { id: 1, name: 'Germination', emoji: '🌱', description: 'Seed sprouts roots and shoot' },
            { id: 2, name: 'Seedling', emoji: '🌿', description: 'Young plant with first leaves' },
            { id: 3, name: 'Mature Plant', emoji: '🌳', description: 'Produces flowers and new seeds' }
        ],
        explanation: 'Plants grow from seeds through germination. The seed contains everything needed to start a new plant, including stored food.',
        misconception: '⚠️ Common Misconception: Seeds don\'t need soil to germinate - they need water, air, and warmth. Soil provides nutrients for later growth.'
    }
};

// ===== GLOBAL STATE =====
let currentOrganism = 'butterfly';
let teacherMode = false;
let draggedCard = null;
let touchStartX = 0;
let touchStartY = 0;
let analyticsLog = [];
let placedCards = {}; // Track which cards are placed in which zones

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadOrganism(currentOrganism);
});

// Initialize the application
function initializeApp() {
    // Detect if in iframe
    if (window.self !== window.top) {
        document.body.classList.add('in-iframe');
    }
    
    // Setup tooltips for control buttons
    setupTooltips();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Organism selection
    document.getElementById('organism-select').addEventListener('change', (e) => {
        currentOrganism = e.target.value;
        loadOrganism(currentOrganism);
        logAnalytics('Organism Changed', currentOrganism, '', 'info');
    });
    
    // Teacher mode toggle
    document.getElementById('teacher-toggle').addEventListener('click', toggleTeacherMode);
    
    // Reset button
    document.getElementById('reset-btn').addEventListener('click', resetQuiz);
    
    // Analytics toggle
    document.getElementById('analytics-toggle').addEventListener('click', toggleAnalytics);
    
    // Clear log button
    document.getElementById('clear-log-btn').addEventListener('click', clearAnalyticsLog);
    
    // Check answer button
    document.getElementById('check-answer-btn').addEventListener('click', checkAnswer);
    
    // Show explanation button
    document.getElementById('show-explanation-btn').addEventListener('click', showExplanation);
    
    // Setup drag and drop
    setupDragAndDrop();
}

// ===== LOAD ORGANISM DATA =====
function loadOrganism(organism) {
    const data = lifecycleData[organism];
    const stageCardsContainer = document.getElementById('stage-cards');
    
    // Clear existing cards
    stageCardsContainer.innerHTML = '';
    placedCards = {};
    
    // Clear drop zones
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.classList.remove('filled', 'correct', 'incorrect');
        const placeholder = zone.querySelector('.drop-placeholder');
        if (placeholder) {
            placeholder.textContent = 'Drop here';
            placeholder.style.display = 'block';
        }
        // Remove any placed cards
        const placedCard = zone.querySelector('.stage-card');
        if (placedCard) {
            placedCard.remove();
        }
    });
    
    // Create stage cards
    let stages = [...data.stages];
    
    // Randomize order in teacher mode
    if (teacherMode) {
        stages = shuffleArray(stages);
    }
    
    stages.forEach(stage => {
        const card = createStageCard(stage);
        stageCardsContainer.appendChild(card);
    });
    
    // Clear feedback and hide explanation
    document.getElementById('feedback-message').textContent = '';
    document.getElementById('feedback-message').className = '';
    document.getElementById('explanation-panel').style.display = 'none';
    document.getElementById('show-explanation-btn').style.display = 'none';
    
    // Re-setup drag and drop
    setupDragAndDrop();
}

// Create a stage card element
function createStageCard(stage) {
    const card = document.createElement('div');
    card.className = 'stage-card';
    card.draggable = true;
    card.dataset.correctStage = stage.id;
    card.dataset.stageName = stage.name;
    card.dataset.stageDescription = stage.description;
    
    const cardImage = document.createElement('div');
    cardImage.className = 'card-image';
    cardImage.textContent = stage.emoji;
    
    const cardLabel = document.createElement('div');
    cardLabel.className = 'card-label';
    cardLabel.textContent = stage.name;
    
    card.appendChild(cardImage);
    card.appendChild(cardLabel);
    
    return card;
}

// ===== DRAG AND DROP FUNCTIONALITY =====
function setupDragAndDrop() {
    const cards = document.querySelectorAll('.stage-card');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    // Desktop drag events
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        
        // Touch events for mobile
        card.addEventListener('touchstart', handleTouchStart, { passive: false });
        card.addEventListener('touchmove', handleTouchMove, { passive: false });
        card.addEventListener('touchend', handleTouchEnd, { passive: false });
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragleave', handleDragLeave);
    });
}

// Desktop drag handlers
function handleDragStart(e) {
    draggedCard = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove('drag-over');
    
    if (draggedCard) {
        placeCardInZone(draggedCard, this);
    }
}

// Touch handlers for mobile
function handleTouchStart(e) {
    e.preventDefault();
    draggedCard = this;
    this.classList.add('dragging');
    
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!draggedCard) return;
    
    const touch = e.touches[0];
    const currentX = touch.clientX;
    const currentY = touch.clientY;
    
    // Move the card with the finger
    draggedCard.style.position = 'fixed';
    draggedCard.style.left = currentX - 45 + 'px';
    draggedCard.style.top = currentY - 50 + 'px';
    draggedCard.style.zIndex = '1000';
}

function handleTouchEnd(e) {
    e.preventDefault();
    if (!draggedCard) return;
    
    const touch = e.changedTouches[0];
    const dropZone = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Reset card position
    draggedCard.style.position = '';
    draggedCard.style.left = '';
    draggedCard.style.top = '';
    draggedCard.style.zIndex = '';
    draggedCard.classList.remove('dragging');
    
    // Check if dropped on a valid zone
    if (dropZone && dropZone.classList.contains('drop-zone')) {
        placeCardInZone(draggedCard, dropZone);
    }
    
    draggedCard = null;
}

// Place card in drop zone
function placeCardInZone(card, zone) {
    // Check if zone already has a card
    const existingCard = zone.querySelector('.stage-card');
    if (existingCard) {
        // Return existing card to card area
        returnCardToArea(existingCard);
    }
    
    // Clone the card and place it in the zone
    const clonedCard = card.cloneNode(true);
    clonedCard.draggable = false;
    clonedCard.classList.remove('dragging');
    clonedCard.classList.add('placed-in-zone');
    
    // Hide placeholder
    const placeholder = zone.querySelector('.drop-placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    // Add card to zone
    zone.appendChild(clonedCard);
    zone.classList.add('filled');
    
    // Mark original card as placed
    card.classList.add('placed');
    
    // Track placement
    const zoneStage = parseInt(zone.dataset.stage);
    placedCards[zoneStage] = {
        correctStage: parseInt(card.dataset.correctStage),
        stageName: card.dataset.stageName
    };
    
    // Enable check answer button if all zones filled
    checkIfAllZonesFilled();
}

// Return card to card area
function returnCardToArea(card) {
    const stageName = card.querySelector('.card-label').textContent;
    const originalCards = document.querySelectorAll('#stage-cards .stage-card');
    
    originalCards.forEach(origCard => {
        if (origCard.querySelector('.card-label').textContent === stageName) {
            origCard.classList.remove('placed');
        }
    });
    
    card.remove();
}

// Check if all zones are filled
function checkIfAllZonesFilled() {
    const dropZones = document.querySelectorAll('.drop-zone');
    let allFilled = true;
    
    dropZones.forEach(zone => {
        if (!zone.classList.contains('filled')) {
            allFilled = false;
        }
    });
    
    // Show check answer button if all filled
    if (allFilled) {
        document.getElementById('check-answer-btn').style.display = 'block';
    }
}

// ===== CHECK ANSWER =====
function checkAnswer() {
    const dropZones = document.querySelectorAll('.drop-zone');
    let allCorrect = true;
    let results = [];
    
    dropZones.forEach(zone => {
        const zoneStage = parseInt(zone.dataset.stage);
        const placedCard = placedCards[zoneStage];
        
        if (placedCard) {
            const isCorrect = placedCard.correctStage === zoneStage;
            
            if (isCorrect) {
                zone.classList.add('correct');
                zone.classList.remove('incorrect');
            } else {
                zone.classList.add('incorrect');
                zone.classList.remove('correct');
                allCorrect = false;
            }
            
            results.push({
                position: zoneStage + 1,
                placed: placedCard.stageName,
                correct: lifecycleData[currentOrganism].stages[zoneStage].name,
                isCorrect: isCorrect
            });
        }
    });
    
    // Display feedback
    const feedbackMessage = document.getElementById('feedback-message');
    if (allCorrect) {
        feedbackMessage.textContent = '✅ Excellent! All stages are in the correct order!';
        feedbackMessage.className = 'success';
        document.getElementById('show-explanation-btn').style.display = 'block';
    } else {
        feedbackMessage.textContent = '❌ Some stages are incorrect. Try again!';
        feedbackMessage.className = 'error';
    }
    
    // Log analytics
    results.forEach(result => {
        logAnalytics(
            `Stage ${result.position}`,
            result.correct,
            result.placed,
            result.isCorrect ? 'correct' : 'incorrect'
        );
    });
    
    // Hide check button after checking
    document.getElementById('check-answer-btn').style.display = 'none';
}

// ===== SHOW EXPLANATION =====
function showExplanation() {
    const data = lifecycleData[currentOrganism];
    const explanationPanel = document.getElementById('explanation-panel');
    const explanationContent = document.getElementById('explanation-content');
    const misconceptionNote = document.getElementById('misconception-note');
    
    // Build explanation content
    let content = `<p><strong>${data.name} Life Cycle:</strong></p><ol>`;
    data.stages.forEach(stage => {
        content += `<li><strong>${stage.name}:</strong> ${stage.description}</li>`;
    });
    content += `</ol><p>${data.explanation}</p>`;
    
    explanationContent.innerHTML = content;
    misconceptionNote.textContent = data.misconception;
    
    explanationPanel.style.display = 'block';
}

// ===== TEACHER MODE =====
function toggleTeacherMode() {
    teacherMode = !teacherMode;
    const btn = document.getElementById('teacher-toggle');
    
    if (teacherMode) {
        btn.textContent = '👨‍🏫 Teacher Mode: ON';
        btn.classList.add('active');
    } else {
        btn.textContent = '👨‍🏫 Teacher Mode: OFF';
        btn.classList.remove('active');
    }
    
    // Reload organism to apply randomization
    loadOrganism(currentOrganism);
    logAnalytics('Teacher Mode', teacherMode ? 'ON' : 'OFF', '', 'info');
}

// ===== RESET QUIZ =====
function resetQuiz() {
    loadOrganism(currentOrganism);
    document.getElementById('check-answer-btn').style.display = 'none';
    logAnalytics('Quiz Reset', currentOrganism, '', 'info');
}

// ===== ANALYTICS =====
function toggleAnalytics() {
    const panel = document.getElementById('analytics-panel');
    panel.classList.toggle('collapsed');
}

function logAnalytics(question, correct, studentAnswer, result) {
    const timestamp = new Date().toLocaleTimeString();
    const entry = {
        timestamp,
        organism: lifecycleData[currentOrganism].name,
        question,
        correct,
        studentAnswer,
        result
    };
    
    analyticsLog.push(entry);
    updateAnalyticsDisplay();
}

function updateAnalyticsDisplay() {
    const logContainer = document.getElementById('analytics-log');
    
    if (analyticsLog.length === 0) {
        logContainer.innerHTML = '<p style="color: #999;">No activity yet. Start interacting with the quiz!</p>';
        return;
    }
    
    let html = '';
    analyticsLog.forEach((entry, index) => {
        const className = entry.result === 'correct' ? 'correct' : 
                         entry.result === 'incorrect' ? 'incorrect' : '';
        const icon = entry.result === 'correct' ? '✅' : 
                    entry.result === 'incorrect' ? '❌' : 'ℹ️';
        
        html += `
            <div class="log-entry ${className}">
                <strong>${icon} ${entry.timestamp} - ${entry.organism}</strong>
                <div><strong>Question:</strong> ${entry.question}</div>
                ${entry.correct ? `<div><strong>Correct Answer:</strong> ${entry.correct}</div>` : ''}
                ${entry.studentAnswer ? `<div><strong>Student Answer:</strong> ${entry.studentAnswer}</div>` : ''}
            </div>
        `;
    });
    
    logContainer.innerHTML = html;
    logContainer.scrollTop = logContainer.scrollHeight;
}

function clearAnalyticsLog() {
    if (confirm('Clear all analytics data?')) {
        analyticsLog = [];
        updateAnalyticsDisplay();
    }
}

// ===== TOOLTIPS =====
function setupTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[title]');
    const tooltip = document.getElementById('tooltip');
    
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const title = element.getAttribute('title');
            tooltip.textContent = title;
            tooltip.classList.add('show');
            positionTooltip(e, tooltip);
        });
        
        element.addEventListener('mousemove', (e) => {
            positionTooltip(e, tooltip);
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
    });
}

function positionTooltip(e, tooltip) {
    const x = e.clientX;
    const y = e.clientY;
    
    tooltip.style.left = x + 10 + 'px';
    tooltip.style.top = y + 10 + 'px';
}

// ===== UTILITY FUNCTIONS =====
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}