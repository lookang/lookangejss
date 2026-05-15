// ===== GLOBAL STATE AND CONFIGURATION =====
let startTime = Date.now();
let actionLog = [];
let correctPlacements = 0;
let totalAnimals = 0;
let submitted = false;
let touchDevice = 'unknown';

// Animal data with habitat assignments and hints
const animalData = [
    { id: 1, name: '🐧 Penguin', habitat: 'polar', hint: 'Think about where it is cold and icy.' },
    { id: 2, name: '🐻‍❄️ Polar Bear', habitat: 'polar', hint: 'This animal lives in the Arctic ice.' },
    { id: 3, name: '🐫 Camel', habitat: 'desert', hint: 'This animal can survive without water for long periods.' },
    { id: 4, name: '🦎 Lizard', habitat: 'desert', hint: 'This animal loves hot, dry places.' },
    { id: 5, name: '🐒 Monkey', habitat: 'rainforest', hint: 'This animal swings from trees in tropical forests.' },
    { id: 6, name: '🦜 Parrot', habitat: 'rainforest', hint: 'This colorful bird lives in dense, wet forests.' },
    { id: 7, name: '🐠 Clownfish', habitat: 'ocean', hint: 'This animal needs a lot of water and lives underwater.' },
    { id: 8, name: '🐋 Whale', habitat: 'ocean', hint: 'This large animal lives in the sea.' },
    { id: 9, name: '🦁 Lion', habitat: 'savanna', hint: 'This animal roams the grasslands of Africa.' },
    { id: 10, name: '🦒 Giraffe', habitat: 'savanna', hint: 'This tall animal lives in open grasslands.' },
    { id: 11, name: '🐻 Bear', habitat: 'forest', hint: 'This animal lives in wooded areas with many trees.' },
    { id: 12, name: '🦌 Deer', habitat: 'forest', hint: 'This animal grazes in temperate woodlands.' }
];

// Habitat zones configuration
const habitats = [
    { id: 'polar', name: '❄️ Polar (Arctic/Antarctic)', color: '#e1f5fe' },
    { id: 'desert', name: '🏜️ Desert', color: '#fff3e0' },
    { id: 'rainforest', name: '🌴 Rainforest', color: '#e8f5e9' },
    { id: 'ocean', name: '🌊 Ocean', color: '#e0f2f1' },
    { id: 'savanna', name: '🌾 Savanna (Grassland)', color: '#fff9c4' },
    { id: 'forest', name: '🌲 Temperate Forest', color: '#f1f8e9' }
];

// Track current drag state
let draggedElement = null;
let draggedAnimalId = null;
let touchStartX = 0;
let touchStartY = 0;
let lastTouchTime = 0;
const DEBOUNCE_DELAY = 50; // 50ms debounce for IR touch

// ===== DEVICE DETECTION =====
function detectDeviceType() {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches;
    
    if (!hasTouch && hasHover) {
        touchDevice = '🖱️ Mouse (Desktop)';
    } else if (hasTouch && hasCoarsePointer) {
        // Could be capacitive or IR - we can't distinguish perfectly
        touchDevice = '👆 Touch Device (Tablet/Smartboard)';
    } else if (hasTouch) {
        touchDevice = '📱 Touch Device (Mobile)';
    } else {
        touchDevice = '🖱️ Mouse/Trackpad';
    }
    
    document.getElementById('deviceType').textContent = touchDevice;
    logAction('🔍 System', `Device detected: ${touchDevice}`, 'Device detection');
}

// ===== ANALYTICS LOGGING =====
function logAction(type, description, state) {
    const timestamp = ((Date.now() - startTime) / 1000).toFixed(1);
    const entry = {
        time: timestamp,
        type: type,
        description: description,
        state: state
    };
    
    actionLog.push(entry);
    
    // Add to analytics display
    const logContainer = document.getElementById('analyticsLog');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    // Add special styling for correct/incorrect
    if (description.includes('✅')) {
        logEntry.classList.add('correct');
    } else if (description.includes('❌')) {
        logEntry.classList.add('incorrect');
    }
    
    logEntry.innerHTML = `
        <span class="log-timestamp">t=${timestamp}s</span> | 
        <strong>${type}</strong>: ${description}
        ${state ? `<br><small>State: ${state}</small>` : ''}
    `;
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

// ===== INITIALIZATION =====
function init() {
    detectDeviceType();
    totalAnimals = animalData.length;
    
    // Generate animal cards
    generateAnimalCards();
    
    // Generate habitat zones
    generateHabitatZones();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update progress
    updateProgress();
    
    logAction('🎬 Start', 'Interactive loaded', `Total animals: ${totalAnimals}`);
}

// ===== GENERATE ANIMAL CARDS =====
function generateAnimalCards() {
    const container = document.getElementById('animalCards');
    container.innerHTML = '';
    
    animalData.forEach(animal => {
        const card = document.createElement('div');
        card.className = 'animal-card';
        card.setAttribute('data-animal-id', animal.id);
        card.setAttribute('draggable', 'true');
        card.textContent = animal.name;
        
        // Mouse drag events
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        
        // Touch events for mobile/smartboard
        card.addEventListener('touchstart', handleTouchStart, { passive: false });
        card.addEventListener('touchmove', handleTouchMove, { passive: false });
        card.addEventListener('touchend', handleTouchEnd, { passive: false });
        
        container.appendChild(card);
    });
}

// ===== GENERATE HABITAT ZONES =====
function generateHabitatZones() {
    const container = document.getElementById('habitatZones');
    container.innerHTML = '';
    
    habitats.forEach(habitat => {
        const zone = document.createElement('div');
        zone.className = 'habitat-zone';
        zone.setAttribute('data-habitat-id', habitat.id);
        zone.style.borderColor = habitat.color;
        
        const label = document.createElement('div');
        label.className = 'habitat-label';
        label.textContent = habitat.name;
        label.style.background = habitat.color;
        
        const dropArea = document.createElement('div');
        dropArea.className = 'habitat-drop-area';
        
        zone.appendChild(label);
        zone.appendChild(dropArea);
        
        // Drag and drop events
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragleave', handleDragLeave);
        
        container.appendChild(zone);
    });
}

// ===== MOUSE DRAG HANDLERS =====
function handleDragStart(e) {
    if (submitted) return;
    
    draggedElement = e.target;
    draggedAnimalId = parseInt(e.target.getAttribute('data-animal-id'));
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    
    const animal = animalData.find(a => a.id === draggedAnimalId);
    logAction('🖱️ Drag Start', `Started dragging: ${animal.name}`, 'Mouse interaction');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedElement = null;
}

function handleDragOver(e) {
    if (submitted) return;
    
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const zone = e.currentTarget;
    zone.classList.add('drag-over');
}

function handleDragLeave(e) {
    const zone = e.currentTarget;
    zone.classList.remove('drag-over');
}

function handleDrop(e) {
    if (submitted) return;
    
    e.preventDefault();
    const zone = e.currentTarget;
    zone.classList.remove('drag-over');
    
    if (!draggedElement) return;
    
    const habitatId = zone.getAttribute('data-habitat-id');
    const dropArea = zone.querySelector('.habitat-drop-area');
    
    // Check if correct
    const animal = animalData.find(a => a.id === draggedAnimalId);
    const isCorrect = animal.habitat === habitatId;
    
    if (isCorrect) {
        // Correct placement
        dropArea.appendChild(draggedElement);
        draggedElement.classList.add('correct');
        draggedElement.setAttribute('draggable', 'false');
        showFeedback(`✅ Correct! ${animal.name.split(' ')[1]} lives in the ${habitats.find(h => h.id === habitatId).name}!`, 'success');
        correctPlacements++;
        updateProgress();
        logAction('✅ Correct', `${animal.name} → ${habitatId}`, `Correct placements: ${correctPlacements}/${totalAnimals}`);
    } else {
        // Incorrect placement - return to pool
        draggedElement.classList.add('incorrect');
        showFeedback(`❌ ${animal.hint} Try again!`, 'error');
        setTimeout(() => {
            draggedElement.classList.remove('incorrect');
        }, 400);
        logAction('❌ Incorrect', `${animal.name} → ${habitatId} (wrong)`, `Hint shown: ${animal.hint}`);
    }
    
    draggedElement = null;
    draggedAnimalId = null;
}

// ===== TOUCH HANDLERS FOR MOBILE/SMARTBOARD =====
function handleTouchStart(e) {
    if (submitted) return;
    
    // Debounce for IR touch
    const now = Date.now();
    if (now - lastTouchTime < DEBOUNCE_DELAY) {
        e.preventDefault();
        return;
    }
    lastTouchTime = now;
    
    e.preventDefault(); // Prevent scrolling while dragging
    
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    
    draggedElement = e.currentTarget;
    draggedAnimalId = parseInt(draggedElement.getAttribute('data-animal-id'));
    
    draggedElement.setAttribute('data-touch-active', 'true');
    draggedElement.classList.add('dragging');
    
    const animal = animalData.find(a => a.id === draggedAnimalId);
    logAction('👆 Touch Start', `Touch started: ${animal.name}`, 'Touch interaction');
}

function handleTouchMove(e) {
    if (!draggedElement || submitted) return;
    
    e.preventDefault(); // Prevent scrolling
    
    const touch = e.touches[0];
    
    // Move the element visually (optional - for better UX)
    draggedElement.style.position = 'fixed';
    draggedElement.style.left = touch.clientX - 50 + 'px';
    draggedElement.style.top = touch.clientY - 25 + 'px';
    draggedElement.style.zIndex = '1000';
    draggedElement.style.pointerEvents = 'none';
    
    // Highlight drop zone under touch
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Remove all drag-over states
    document.querySelectorAll('.habitat-zone').forEach(zone => {
        zone.classList.remove('drag-over');
    });
    
    // Add drag-over to current zone
    if (elementUnderTouch) {
        const zone = elementUnderTouch.closest('.habitat-zone');
        if (zone) {
            zone.classList.add('drag-over');
        }
    }
}

function handleTouchEnd(e) {
    if (!draggedElement || submitted) return;
    
    e.preventDefault();
    
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    
    // Reset visual position
    draggedElement.style.position = '';
    draggedElement.style.left = '';
    draggedElement.style.top = '';
    draggedElement.style.zIndex = '';
    draggedElement.style.pointerEvents = '';
    
    draggedElement.removeAttribute('data-touch-active');
    draggedElement.classList.remove('dragging');
    
    // Find element under touch end point
    const elementUnderTouch = document.elementFromPoint(endX, endY);
    const zone = elementUnderTouch ? elementUnderTouch.closest('.habitat-zone') : null;
    
    // Remove all drag-over states
    document.querySelectorAll('.habitat-zone').forEach(z => {
        z.classList.remove('drag-over');
    });
    
    if (zone) {
        const habitatId = zone.getAttribute('data-habitat-id');
        const dropArea = zone.querySelector('.habitat-drop-area');
        
        // Check if correct
        const animal = animalData.find(a => a.id === draggedAnimalId);
        const isCorrect = animal.habitat === habitatId;
        
        if (isCorrect) {
            // Correct placement
            dropArea.appendChild(draggedElement);
            draggedElement.classList.add('correct');
            draggedElement.removeAttribute('draggable');
            draggedElement.style.cursor = 'default';
            
            // Remove touch listeners from correct cards
            draggedElement.removeEventListener('touchstart', handleTouchStart);
            draggedElement.removeEventListener('touchmove', handleTouchMove);
            draggedElement.removeEventListener('touchend', handleTouchEnd);
            
            showFeedback(`✅ Correct! ${animal.name.split(' ')[1]} lives in the ${habitats.find(h => h.id === habitatId).name}!`, 'success');
            correctPlacements++;
            updateProgress();
            logAction('✅ Correct', `${animal.name} → ${habitatId}`, `Correct placements: ${correctPlacements}/${totalAnimals}`);
        } else {
            // Incorrect placement - return to pool
            draggedElement.classList.add('incorrect');
            showFeedback(`❌ ${animal.hint} Try again!`, 'error');
            setTimeout(() => {
                draggedElement.classList.remove('incorrect');
            }, 400);
            logAction('❌ Incorrect', `${animal.name} → ${habitatId} (wrong)`, `Hint shown: ${animal.hint}`);
        }
    }
    
    draggedElement = null;
    draggedAnimalId = null;
}

// ===== FEEDBACK DISPLAY =====
function showFeedback(message, type) {
    const feedbackDiv = document.getElementById('feedbackMessage');
    feedbackDiv.textContent = message;
    feedbackDiv.className = `feedback-message ${type}`;
    feedbackDiv.classList.remove('hidden');
    
    setTimeout(() => {
        feedbackDiv.classList.add('hidden');
    }, 2000);
}

// ===== UPDATE PROGRESS =====
function updateProgress() {
    const progressText = document.getElementById('progressText');
    const progressBar = document.getElementById('progressBar');
    
    progressText.textContent = `${correctPlacements}/${totalAnimals}`;
    const percentage = (correctPlacements / totalAnimals) * 100;
    progressBar.style.width = percentage + '%';
}

// ===== SUBMIT ALL ANSWERS =====
function submitAnswers() {
    if (submitted) return;
    
    submitted = true;
    
    // Check all placements
    let score = 0;
    const allCards = document.querySelectorAll('.animal-card');
    
    allCards.forEach(card => {
        const animalId = parseInt(card.getAttribute('data-animal-id'));
        const animal = animalData.find(a => a.id === animalId);
        
        // Check if card is in a habitat zone
        const parentZone = card.closest('.habitat-zone');
        
        if (parentZone) {
            const habitatId = parentZone.getAttribute('data-habitat-id');
            const isCorrect = animal.habitat === habitatId;
            
            if (isCorrect && !card.classList.contains('correct')) {
                card.classList.add('correct');
                score++;
            } else if (!isCorrect) {
                card.style.background = 'linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%)';
                card.style.borderColor = '#f44336';
            }
        }
    });
    
    // Update score display
    const scoreDisplay = document.getElementById('scoreDisplay');
    const scoreText = document.getElementById('scoreText');
    
    const finalScore = correctPlacements;
    const percentage = ((finalScore / totalAnimals) * 100).toFixed(0);
    
    let message = '';
    if (percentage >= 90) {
        message = `🎉 Excellent! You scored ${finalScore}/${totalAnimals} (${percentage}%)`;
    } else if (percentage >= 70) {
        message = `👍 Good job! You scored ${finalScore}/${totalAnimals} (${percentage}%)`;
    } else if (percentage >= 50) {
        message = `💪 Keep trying! You scored ${finalScore}/${totalAnimals} (${percentage}%)`;
    } else {
        message = `📚 You scored ${finalScore}/${totalAnimals} (${percentage}%). Review and try again!`;
    }
    
    scoreText.textContent = message;
    scoreDisplay.classList.remove('hidden');
    
    // Show Try Again button
    document.getElementById('tryAgainBtn').classList.remove('hidden');
    
    logAction('📝 Submit', 'All answers submitted', `Final score: ${finalScore}/${totalAnimals} (${percentage}%)`);
}

// ===== TRY AGAIN (RESET INCORRECT) =====
function tryAgain() {
    submitted = false;
    
    const allCards = document.querySelectorAll('.animal-card');
    const animalPool = document.getElementById('animalCards');
    
    allCards.forEach(card => {
        if (!card.classList.contains('correct')) {
            // Return incorrect cards to pool
            card.style.background = '';
            card.style.borderColor = '';
            card.setAttribute('draggable', 'true');
            card.style.cursor = 'grab';
            
            // Re-add touch listeners
            card.addEventListener('touchstart', handleTouchStart, { passive: false });
            card.addEventListener('touchmove', handleTouchMove, { passive: false });
            card.addEventListener('touchend', handleTouchEnd, { passive: false });
            
            animalPool.appendChild(card);
        }
    });
    
    // Hide score and Try Again button
    document.getElementById('scoreDisplay').classList.add('hidden');
    document.getElementById('tryAgainBtn').classList.add('hidden');
    
    logAction('🔄 Try Again', 'Incorrect answers reset', 'Student attempting corrections');
}

// ===== RESET ALL =====
function resetAll() {
    submitted = false;
    correctPlacements = 0;
    
    // Clear all habitat zones
    document.querySelectorAll('.habitat-drop-area').forEach(area => {
        area.innerHTML = '';
    });
    
    // Regenerate animal cards
    generateAnimalCards();
    
    // Update progress
    updateProgress();
    
    // Hide score and Try Again button
    document.getElementById('scoreDisplay').classList.add('hidden');
    document.getElementById('tryAgainBtn').classList.add('hidden');
    
    logAction('🔄 Reset', 'All answers reset', 'Interactive restarted');
}

// ===== EVENT LISTENERS SETUP =====
function setupEventListeners() {
    // Info button
    document.getElementById('infoBtn').addEventListener('click', () => {
        document.getElementById('headerTooltip').classList.remove('hidden');
        logAction('ℹ️ Info', 'Instructions tooltip opened', 'User viewing help');
    });
    
    // Close tooltip
    document.getElementById('closeTooltip').addEventListener('click', () => {
        document.getElementById('headerTooltip').classList.add('hidden');
    });
    
    // Close tooltip when clicking outside
    document.getElementById('headerTooltip').addEventListener('click', (e) => {
        if (e.target.id === 'headerTooltip') {
            document.getElementById('headerTooltip').classList.add('hidden');
        }
    });
    
    // Control buttons
    document.getElementById('submitBtn').addEventListener('click', submitAnswers);
    document.getElementById('tryAgainBtn').addEventListener('click', tryAgain);
    document.getElementById('resetBtn').addEventListener('click', resetAll);
    
    // Analytics toggle
    document.getElementById('toggleAnalytics').addEventListener('click', () => {
        const content = document.getElementById('analyticsContent');
        const btn = document.getElementById('toggleAnalytics');
        
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            btn.textContent = '📊 Hide Analytics';
            logAction('📊 Analytics', 'Analytics panel opened', 'Teacher viewing data');
        } else {
            content.classList.add('hidden');
            btn.textContent = '📊 Show Analytics';
        }
    });
    
    // Clear log
    document.getElementById('clearLog').addEventListener('click', () => {
        actionLog = [];
        document.getElementById('analyticsLog').innerHTML = '';
        startTime = Date.now();
        logAction('🗑️ Clear', 'Analytics log cleared', 'Log reset');
    });
}

// ===== START THE APPLICATION =====
window.addEventListener('DOMContentLoaded', init);