// Life cycle data structure containing different organisms and their stages
const lifeCycleData = {
    butterfly: {
        name: 'Butterfly Life Cycle',
        stages: [
            { id: 'egg', name: 'Egg', emoji: '🥚', position: 0 },
            { id: 'larva', name: 'Larva (Caterpillar)', emoji: '🐛', position: 1 },
            { id: 'pupa', name: 'Pupa (Chrysalis)', emoji: '🛡️', position: 2 },
            { id: 'adult', name: 'Adult Butterfly', emoji: '🦋', position: 3 }
        ]
    },
    frog: {
        name: 'Frog Life Cycle',
        stages: [
            { id: 'egg', name: 'Eggs', emoji: '🥚', position: 0 },
            { id: 'tadpole', name: 'Tadpole', emoji: '🐟', position: 1 },
            { id: 'froglet', name: 'Froglet', emoji: '🐸', position: 2 },
            { id: 'adult', name: 'Adult Frog', emoji: '🐸', position: 3 }
        ]
    },
    plant: {
        name: 'Plant Life Cycle',
        stages: [
            { id: 'seed', name: 'Seed', emoji: '🌰', position: 0 },
            { id: 'seedling', name: 'Seedling', emoji: '🌱', position: 1 },
            { id: 'flower', name: 'Flowering Plant', emoji: '🌸', position: 2 },
            { id: 'fruit', name: 'Fruit with Seeds', emoji: '🍎', position: 3 }
        ]
    }
};

// Global variables for drag and drop functionality
let currentLifeCycle = 'butterfly';
let draggedElement = null;
let dropZones = [];
let stageElements = [];
let analyticsData = [];
let isCheckingAnswers = false;

// DOM elements
let lifecycleSelect, resetBtn, checkBtn, analyticsToggle, analyticsPanel, analyticsContent;
let lifecycleSvg, centerLabel, stagesContainer, dropZonesGroup;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    createLifeCycle();
    checkIfInIframe();
});

// Initialize DOM element references
function initializeElements() {
    lifecycleSelect = document.getElementById('lifecycleSelect');
    resetBtn = document.getElementById('resetBtn');
    checkBtn = document.getElementById('checkBtn');
    analyticsToggle = document.getElementById('analyticsToggle');
    analyticsPanel = document.getElementById('analyticsPanel');
    analyticsContent = document.getElementById('analyticsContent');
    lifecycleSvg = document.getElementById('lifecycleSvg');
    centerLabel = document.getElementById('centerLabel');
    stagesContainer = document.getElementById('stagesContainer');
    dropZonesGroup = document.getElementById('dropZones');
}

// Set up all event listeners
function setupEventListeners() {
    // Life cycle selector change event
    lifecycleSelect.addEventListener('change', function() {
        currentLifeCycle = this.value;
        createLifeCycle();
        logAnalytics('Lifecycle Changed', `Changed to ${lifeCycleData[currentLifeCycle].name}`, '', 'info');
    });

    // Reset button click event
    resetBtn.addEventListener('click', function() {
        resetLifeCycle();
        logAnalytics('Reset', 'Life cycle reset to initial state', '', 'info');
    });

    // Check answers button click event
    checkBtn.addEventListener('click', function() {
        checkAnswers();
    });

    // Analytics panel toggle
    analyticsToggle.addEventListener('click', function() {
        analyticsPanel.classList.toggle('show');
        this.textContent = analyticsPanel.classList.contains('show') ? '📊 Hide Analytics' : '📊 Show Analytics';
    });

    // Clear analytics button
    document.getElementById('clearAnalytics').addEventListener('click', function() {
        clearAnalytics();
    });

    // Touch and mouse event handlers for drag and drop
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

// Check if running in iframe and adjust container class
function checkIfInIframe() {
    if (window.self === window.top) {
        document.querySelector('.container').classList.remove('in-iframe');
    } else {
        document.querySelector('.container').classList.add('in-iframe');
    }
}

// Create the life cycle diagram and draggable elements
function createLifeCycle() {
    const data = lifeCycleData[currentLifeCycle];
    centerLabel.textContent = data.name;
    
    createDropZones(data.stages);
    createDraggableStages(data.stages);
    resetPositions();
}

// Create circular drop zones for the life cycle stages
function createDropZones(stages) {
    dropZonesGroup.innerHTML = '';
    dropZones = [];
    
    const centerX = 200;
    const centerY = 200;
    const radius = 120;
    
    stages.forEach((stage, index) => {
        // Calculate position on circle (starting from top, going clockwise)
        const angle = (index * 2 * Math.PI / stages.length) - (Math.PI / 2);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        // Create drop zone circle
        const dropZone = document.createElementNS('vendor/external_0.txt', 'circle');
        dropZone.setAttribute('cx', x);
        dropZone.setAttribute('cy', y);
        dropZone.setAttribute('r', 35);
        dropZone.classList.add('drop-zone');
        dropZone.dataset.stageId = stage.id;
        dropZone.dataset.position = stage.position;
        
        // Create label for the drop zone
        const label = document.createElementNS('vendor/external_0.txt', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y + 50);
        label.classList.add('stage-label');
        label.textContent = stage.name;
        
        // Add drag and drop event listeners
        setupDropZoneEvents(dropZone);
        
        dropZonesGroup.appendChild(dropZone);
        dropZonesGroup.appendChild(label);
        
        dropZones.push({
            element: dropZone,
            stageId: stage.id,
            position: stage.position,
            x: x,
            y: y,
            occupied: false
        });
    });
}

// Set up event listeners for drop zones
function setupDropZoneEvents(dropZone) {
    // Mouse events
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
    
    // Touch events
    dropZone.addEventListener('touchstart', handleTouchStart, { passive: false });
}

// Create draggable stage elements
function createDraggableStages(stages) {
    stagesContainer.innerHTML = '';
    stageElements = [];
    
    // Shuffle stages for random initial order
    const shuffledStages = [...stages].sort(() => Math.random() - 0.5);
    
    shuffledStages.forEach(stage => {
        const stageElement = document.createElement('div');
        stageElement.classList.add('stage-item', `stage-${stage.id}`);
        stageElement.dataset.stageId = stage.id;
        stageElement.dataset.position = stage.position;
        stageElement.textContent = stage.emoji;
        stageElement.title = stage.name;
        stageElement.draggable = true;
        
        // Add drag event listeners
        setupDragEvents(stageElement);
        
        stagesContainer.appendChild(stageElement);
        stageElements.push({
            element: stageElement,
            stageId: stage.id,
            position: stage.position,
            originalParent: stagesContainer
        });
    });
}

// Set up drag event listeners for stage elements
function setupDragEvents(element) {
    // Mouse drag events
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd);
    element.addEventListener('mousedown', handleMouseDown);
    
    // Touch drag events
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
}

// Handle drag start event
function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
}

// Handle drag end event
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedElement = null;
}

// Handle drag over event for drop zones
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.target.classList.add('drag-over');
}

// Handle drop event
function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    if (draggedElement && !e.target.classList.contains('stage-item')) {
        const dropZone = findDropZoneByElement(e.target);
        if (dropZone && !dropZone.occupied) {
            placeStageInDropZone(draggedElement, dropZone);
        }
    }
}

// Mouse down handler for custom drag implementation
function handleMouseDown(e) {
    if (e.button === 0) { // Left mouse button
        draggedElement = e.target;
        e.target.classList.add('dragging');
        
        // Create a clone for visual feedback
        const rect = e.target.getBoundingClientRect();
        e.target.style.position = 'fixed';
        e.target.style.left = rect.left + 'px';
        e.target.style.top = rect.top + 'px';
        e.target.style.zIndex = '1000';
        e.target.style.pointerEvents = 'none';
        
        e.preventDefault();
    }
}

// Mouse move handler for custom drag
function handleMouseMove(e) {
    if (draggedElement && e.buttons === 1) {
        draggedElement.style.left = (e.clientX - 25) + 'px';
        draggedElement.style.top = (e.clientY - 25) + 'px';
        
        // Check for drop zone hover
        const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
        updateDropZoneHover(elementBelow);
    }
}

// Mouse up handler for custom drag
function handleMouseUp(e) {
    if (draggedElement) {
        const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
        
        if (elementBelow && elementBelow.classList.contains('drop-zone')) {
            const dropZone = findDropZoneByElement(elementBelow);
            if (dropZone && !dropZone.occupied) {
                placeStageInDropZone(draggedElement, dropZone);
            } else {
                returnToOriginalPosition(draggedElement);
            }
        } else {
            returnToOriginalPosition(draggedElement);
        }
        
        // Reset drag state
        draggedElement.classList.remove('dragging');
        resetDraggedElementStyle();
        clearDropZoneHovers();
        draggedElement = null;
    }
}

// Touch event handlers
function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const element = e.target;
    
    if (element.classList.contains('stage-item')) {
        draggedElement = element;
        element.classList.add('dragging');
        
        // Position element at touch point
        const rect = element.getBoundingClientRect();
        element.style.position = 'fixed';
        element.style.left = (touch.clientX - 25) + 'px';
        element.style.top = (touch.clientY - 25) + 'px';
        element.style.zIndex = '1000';
        element.style.pointerEvents = 'none';
    }
}

function handleTouchMove(e) {
    if (draggedElement) {
        e.preventDefault();
        const touch = e.touches[0];
        draggedElement.style.left = (touch.clientX - 25) + 'px';
        draggedElement.style.top = (touch.clientY - 25) + 'px';
        
        // Check for drop zone hover
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        updateDropZoneHover(elementBelow);
    }
}

function handleTouchEnd(e) {
    if (draggedElement) {
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (elementBelow && elementBelow.classList.contains('drop-zone')) {
            const dropZone = findDropZoneByElement(elementBelow);
            if (dropZone && !dropZone.occupied) {
                placeStageInDropZone(draggedElement, dropZone);
            } else {
                returnToOriginalPosition(draggedElement);
            }
        } else {
            returnToOriginalPosition(draggedElement);
        }
        
        // Reset drag state
        draggedElement.classList.remove('dragging');
        resetDraggedElementStyle();
        clearDropZoneHovers();
        draggedElement = null;
    }
}

// Helper function to find drop zone by DOM element
function findDropZoneByElement(element) {
    return dropZones.find(zone => zone.element === element);
}

// Place a stage element in a drop zone
function placeStageInDropZone(stageElement, dropZone) {
    // Remove from current position
    if (stageElement.parentNode) {
        stageElement.parentNode.removeChild(stageElement);
    }
    
    // Mark previous drop zone as unoccupied
    dropZones.forEach(zone => {
        if (zone.occupied && zone.occupiedBy === stageElement) {
            zone.occupied = false;
            zone.occupiedBy = null;
        }
    });
    
    // Create SVG element for the stage in the drop zone
    const stageInZone = document.createElementNS('vendor/external_0.txt', 'text');
    stageInZone.setAttribute('x', dropZone.x);
    stageInZone.setAttribute('y', dropZone.y + 5);
    stageInZone.setAttribute('text-anchor', 'middle');
    stageInZone.setAttribute('font-size', '24');
    stageInZone.textContent = stageElement.textContent;
    stageInZone.classList.add('stage-in-zone');
    stageInZone.dataset.stageId = stageElement.dataset.stageId;
    stageInZone.dataset.position = stageElement.dataset.position;
    
    // Add click handler to remove from drop zone
    stageInZone.addEventListener('click', function() {
        returnStageToContainer(this, dropZone);
    });
    
    dropZonesGroup.appendChild(stageInZone);
    
    // Mark drop zone as occupied
    dropZone.occupied = true;
    dropZone.occupiedBy = stageInZone;
    
    // Log the placement
    const stageName = lifeCycleData[currentLifeCycle].stages.find(s => s.id === stageElement.dataset.stageId).name;
    const zoneName = lifeCycleData[currentLifeCycle].stages.find(s => s.id === dropZone.stageId).name;
    logAnalytics('Stage Placed', `${stageName} placed in ${zoneName} zone`, '', 'placement');
}

// Return stage to original container
function returnStageToContainer(svgElement, dropZone) {
    // Create new draggable element
    const stageData = lifeCycleData[currentLifeCycle].stages.find(s => s.id === svgElement.dataset.stageId);
    const newStageElement = document.createElement('div');
    newStageElement.classList.add('stage-item', `stage-${stageData.id}`);
    newStageElement.dataset.stageId = stageData.id;
    newStageElement.dataset.position = stageData.position;
    newStageElement.textContent = stageData.emoji;
    newStageElement.title = stageData.name;
    newStageElement.draggable = true;
    
    setupDragEvents(newStageElement);
    stagesContainer.appendChild(newStageElement);
    
    // Remove from drop zone
    svgElement.remove();
    dropZone.occupied = false;
    dropZone.occupiedBy = null;
}

// Return dragged element to original position
function returnToOriginalPosition(element) {
    resetDraggedElementStyle();
    
    // Find original parent and return element
    const stageData = stageElements.find(s => s.stageId === element.dataset.stageId);
    if (stageData && stageData.originalParent) {
        stageData.originalParent.appendChild(element);
    }
}

// Reset dragged element styles
function resetDraggedElementStyle() {
    if (draggedElement) {
        draggedElement.style.position = '';
        draggedElement.style.left = '';
        draggedElement.style.top = '';
        draggedElement.style.zIndex = '';
        draggedElement.style.pointerEvents = '';
    }
}

// Update drop zone hover states
function updateDropZoneHover(elementBelow) {
    clearDropZoneHovers();
    if (elementBelow && elementBelow.classList.contains('drop-zone')) {
        elementBelow.classList.add('drag-over');
    }
}

// Clear all drop zone hover states
function clearDropZoneHovers() {
    dropZones.forEach(zone => {
        zone.element.classList.remove('drag-over');
    });
}

// Reset life cycle to initial state
function resetLifeCycle() {
    // Clear all drop zones
    dropZones.forEach(zone => {
        if (zone.occupied && zone.occupiedBy) {
            zone.occupiedBy.remove();
            zone.occupied = false;
            zone.occupiedBy = null;
        }
        zone.element.classList.remove('correct', 'incorrect');
    });
    
    // Recreate draggable stages
    createDraggableStages(lifeCycleData[currentLifeCycle].stages);
    isCheckingAnswers = false;
}

// Reset positions without changing the life cycle type
function resetPositions() {
    dropZones.forEach(zone => {
        if (zone.occupied && zone.occupiedBy) {
            zone.occupiedBy.remove();
            zone.occupied = false;
            zone.occupiedBy = null;
        }
        zone.element.classList.remove('correct', 'incorrect');
    });
    isCheckingAnswers = false;
}

// Check answers and provide feedback
function checkAnswers() {
    isCheckingAnswers = true;
    let correctCount = 0;
    let totalQuestions = dropZones.length;
    
    dropZones.forEach(zone => {
        zone.element.classList.remove('correct', 'incorrect');
        
        if (zone.occupied && zone.occupiedBy) {
            const placedStageId = zone.occupiedBy.dataset.stageId;
            const correctStageId = zone.stageId;
            const isCorrect = placedStageId === correctStageId;
            
            if (isCorrect) {
                zone.element.classList.add('correct');
                correctCount++;
            } else {
                zone.element.classList.add('incorrect');
            }
            
            // Log individual answer
            const stageName = lifeCycleData[currentLifeCycle].stages.find(s => s.id === placedStageId).name;
            const correctStageName = lifeCycleData[currentLifeCycle].stages.find(s => s.id === correctStageId).name;
            const zoneName = lifeCycleData[currentLifeCycle].stages.find(s => s.id === zone.stageId).name;
            
            logAnalytics(
                `Question: ${zoneName} position`,
                correctStageName,
                stageName,
                isCorrect ? 'correct' : 'incorrect'
            );
        } else {
            // Empty drop zone
            const zoneName = lifeCycleData[currentLifeCycle].stages.find(s => s.id === zone.stageId).name;
            logAnalytics(
                `Question: ${zoneName} position`,
                lifeCycleData[currentLifeCycle].stages.find(s => s.id === zone.stageId).name,
                'No answer',
                'incorrect'
            );
        }
    });
    
    // Log overall result
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    logAnalytics(
        'Quiz Completed',
        `${correctCount}/${totalQuestions} correct (${percentage}%)`,
        '',
        correctCount === totalQuestions ? 'correct' : 'incorrect'
    );
    
    // Show analytics panel if not already visible
    if (!analyticsPanel.classList.contains('show')) {
        analyticsToggle.click();
    }
}

// Log analytics data
function logAnalytics(question, correctAnswer, studentAnswer, result) {
    const timestamp = new Date().toLocaleTimeString();
    const entry = {
        timestamp,
        question,
        correctAnswer,
        studentAnswer,
        result,
        lifecycle: lifeCycleData[currentLifeCycle].name
    };
    
    analyticsData.push(entry);
    updateAnalyticsDisplay();
}

// Update analytics display
function updateAnalyticsDisplay() {
    let html = '';
    
    if (analyticsData.length === 0) {
        html = '<p class="analytics-info">No interactions recorded yet. Start dragging stages to track your learning progress!</p>';
    } else {
        analyticsData.forEach((entry, index) => {
            const icon = getResultIcon(entry.result);
            const colorClass = entry.result === 'correct' ? 'correct' : 
                              entry.result === 'incorrect' ? 'incorrect' : '';
            
            html += `
                <div class="analytics-entry ${colorClass}">
                    <strong>${entry.timestamp}</strong> - ${entry.lifecycle}<br>
                    <strong>Q:</strong> ${entry.question}<br>
                    ${entry.correctAnswer ? `<strong>Correct:</strong> ${entry.correctAnswer}<br>` : ''}
                    ${entry.studentAnswer ? `<strong>Your Answer:</strong> ${entry.studentAnswer}<br>` : ''}
                    <strong>Result:</strong> ${icon} ${entry.result.charAt(0).toUpperCase() + entry.result.slice(1)}
                </div>
            `;
        });
    }
    
    analyticsContent.innerHTML = html;
    analyticsContent.scrollTop = analyticsContent.scrollHeight;
}

// Get result icon based on result type
function getResultIcon(result) {
    switch(result) {
        case 'correct': return '✅';
        case 'incorrect': return '❌';
        case 'info': return 'ℹ️';
        case 'placement': return '📍';
        default: return '•';
    }
}

// Clear analytics data
function clearAnalytics() {
    analyticsData = [];
    updateAnalyticsDisplay();
}

// Initialize the application
console.log('Life Cycle Drag & Drop Quiz initialized successfully!');