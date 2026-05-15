// Global variables to track game state
let draggedElement = null;
let correctPlacements = 0;
let totalEvents = 4;
let gameCompleted = false;

// Event data for reference and validation
const eventData = {
    'founding': { year: 1819, title: 'The Founding of Singapore' },
    'occupation': { year: 1942, title: 'Japanese Occupation' },
    'independence': { year: 1965, title: 'Independence' },
    'nationbuilding': { year: 1965, title: 'Nation-Building' }
};

// Initialize the interactive when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
    setupEventListeners();
    shuffleEvents(); // Initial shuffle
});

/**
 * Initialize the timeline interactive
 * Sets up drag and drop functionality and initial state
 */
function initializeTimeline() {
    console.log('Initializing Singapore History Timeline Interactive');
    
    // Check if running in iframe and adjust height accordingly
    if (window.self !== window.top) {
        document.body.classList.add('iframe-mode');
    }
    
    // Reset game state
    correctPlacements = 0;
    gameCompleted = false;
    
    // Clear any existing feedback
    updateFeedback('');
    
    // Setup drag and drop for all event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        setupDragAndDrop(card);
    });
    
    // Setup drop zones
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        setupDropZone(zone);
    });
}

/**
 * Setup drag and drop functionality for event cards
 * @param {HTMLElement} card - The event card element
 */
function setupDragAndDrop(card) {
    // Mouse/touch drag start
    card.addEventListener('dragstart', function(e) {
        draggedElement = this;
        this.classList.add('dragging');
        
        // Set drag data for accessibility
        e.dataTransfer.setData('text/plain', this.dataset.event);
        e.dataTransfer.effectAllowed = 'move';
        
        console.log('Started dragging:', this.dataset.event);
    });
    
    // Drag end cleanup
    card.addEventListener('dragend', function(e) {
        this.classList.remove('dragging');
        draggedElement = null;
    });
    
    // Touch support for mobile devices
    let touchStartX, touchStartY;
    
    card.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        this.classList.add('dragging');
        
        // Prevent scrolling while dragging
        e.preventDefault();
    });
    
    card.addEventListener('touchmove', function(e) {
        if (this.classList.contains('dragging')) {
            const touch = e.touches[0];
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;
            
            // Move the card with touch
            this.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.95)`;
            
            // Find element under touch point
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            const dropZone = elementBelow?.closest('.drop-zone');
            
            // Highlight drop zones
            document.querySelectorAll('.drop-zone').forEach(zone => {
                zone.classList.remove('drag-over');
            });
            
            if (dropZone) {
                dropZone.classList.add('drag-over');
            }
            
            e.preventDefault();
        }
    });
    
    card.addEventListener('touchend', function(e) {
        if (this.classList.contains('dragging')) {
            const touch = e.changedTouches[0];
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            const dropZone = elementBelow?.closest('.drop-zone');
            
            // Reset transform
            this.style.transform = '';
            this.classList.remove('dragging');
            
            // Handle drop
            if (dropZone) {
                handleDrop(dropZone, this);
            }
            
            // Clean up drag over states
            document.querySelectorAll('.drop-zone').forEach(zone => {
                zone.classList.remove('drag-over');
            });
        }
    });
}

/**
 * Setup drop zone functionality
 * @param {HTMLElement} zone - The drop zone element
 */
function setupDropZone(zone) {
    // Prevent default drag behaviors
    zone.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('drag-over');
    });
    
    zone.addEventListener('dragleave', function(e) {
        this.classList.remove('drag-over');
    });
    
    zone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        if (draggedElement) {
            handleDrop(this, draggedElement);
        }
    });
}

/**
 * Handle drop events and validate placement
 * @param {HTMLElement} dropZone - The drop zone where item was dropped
 * @param {HTMLElement} eventCard - The event card that was dropped
 */
function handleDrop(dropZone, eventCard) {
    const eventType = eventCard.dataset.event;
    const expectedEvent = dropZone.dataset.event;
    
    console.log(`Dropped ${eventType} on ${expectedEvent}`);
    
    // Check if placement is correct
    if (eventType === expectedEvent) {
        // Correct placement
        handleCorrectPlacement(dropZone, eventCard);
    } else {
        // Incorrect placement
        handleIncorrectPlacement(dropZone, eventCard);
    }
}

/**
 * Handle correct event placement
 * @param {HTMLElement} dropZone - The drop zone
 * @param {HTMLElement} eventCard - The event card
 */
function handleCorrectPlacement(dropZone, eventCard) {
    // Visual feedback for correct placement
    dropZone.classList.add('correct');
    eventCard.classList.add('placed');
    
    // Move card to drop zone visually
    const rect = dropZone.getBoundingClientRect();
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    
    eventCard.style.position = 'absolute';
    eventCard.style.left = `${rect.left - containerRect.left - 40}px`;
    eventCard.style.top = `${rect.top - containerRect.top - 10}px`;
    eventCard.style.width = '80px';
    eventCard.style.zIndex = '10';
    
    // Add success animation
    eventCard.classList.add('success-animation');
    
    // Update progress
    correctPlacements++;
    
    // Provide positive feedback
    updateFeedback(`Correct! ${eventData[eventCard.dataset.event].title} placed correctly.`, 'success');
    
    // Check if game is completed
    if (correctPlacements === totalEvents) {
        setTimeout(() => {
            gameCompleted = true;
            updateFeedback('Excellent! You have correctly placed all events on the timeline! 🎉', 'success');
        }, 500);
    }
    
    console.log(`Correct placement! Progress: ${correctPlacements}/${totalEvents}`);
}

/**
 * Handle incorrect event placement
 * @param {HTMLElement} dropZone - The drop zone
 * @param {HTMLElement} eventCard - The event card
 */
function handleIncorrectPlacement(dropZone, eventCard) {
    // Visual feedback for incorrect placement
    dropZone.classList.add('incorrect');
    
    // Remove incorrect styling after animation
    setTimeout(() => {
        dropZone.classList.remove('incorrect');
    }, 500);
    
    // Provide corrective feedback
    const eventTitle = eventData[eventCard.dataset.event].title;
    updateFeedback(`Not quite right. Try placing "${eventTitle}" in a different time period.`, 'error');
    
    console.log('Incorrect placement');
}

/**
 * Update feedback message
 * @param {string} message - The feedback message
 * @param {string} type - The type of feedback ('success' or 'error')
 */
function updateFeedback(message, type = '') {
    const feedbackElement = document.getElementById('feedbackMessage');
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback-message ${type}`;
    
    // Auto-clear feedback after 3 seconds for non-completion messages
    if (type === 'error' || (type === 'success' && !gameCompleted)) {
        setTimeout(() => {
            if (!gameCompleted) {
                feedbackElement.textContent = '';
                feedbackElement.className = 'feedback-message';
            }
        }, 3000);
    }
}

/**
 * Reset the timeline to initial state
 * Shuffles events and clears all placements
 */
function resetTimeline() {
    console.log('Resetting timeline');
    
    // Reset game state
    correctPlacements = 0;
    gameCompleted = false;
    
    // Clear feedback
    updateFeedback('');
    
    // Reset all event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.classList.remove('placed', 'success-animation');
        card.style.position = '';
        card.style.left = '';
        card.style.top = '';
        card.style.width = '';
        card.style.zIndex = '';
        card.style.transform = '';
    });
    
    // Reset all drop zones
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.classList.remove('correct', 'incorrect', 'drag-over');
    });
    
    // Shuffle events for new challenge
    shuffleEvents();
    
    // Provide reset feedback
    setTimeout(() => {
        updateFeedback('Timeline reset! Drag the events to their correct positions.', 'success');
    }, 100);
}

/**
 * Shuffle the order of event cards
 * Implements Fisher-Yates shuffle algorithm for randomization
 */
function shuffleEvents() {
    const container = document.querySelector('.events-container');
    const cards = Array.from(container.querySelectorAll('.event-card'));
    
    // Fisher-Yates shuffle algorithm
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    // Re-append cards in shuffled order
    cards.forEach(card => {
        container.appendChild(card);
    });
    
    console.log('Events shuffled');
}

/**
 * Setup additional event listeners for enhanced interactivity
 */
function setupEventListeners() {
    // Tooltip functionality for enhanced information display
    const container = document.querySelector('.container');
    const tooltip = document.getElementById('tooltip');
    
    // Show tooltip on hover for timeline markers
    document.querySelectorAll('.timeline-marker').forEach(marker => {
        marker.addEventListener('mouseenter', function(e) {
            const year = this.dataset.year;
            let tooltipText = '';
            
            switch(year) {
                case '1819':
                    tooltipText = 'British colonial period begins';
                    break;
                case '1942':
                    tooltipText = 'World War II occupation period';
                    break;
                case '1965':
                    tooltipText = 'Singapore gains independence';
                    break;
                case '1965onwards':
                    tooltipText = 'Modern Singapore development';
                    break;
            }
            
            showTooltip(e, tooltipText);
        });
        
        marker.addEventListener('mouseleave', hideTooltip);
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'r' || e.key === 'R') {
            resetTimeline();
        }
    });
    
    // Prevent context menu on drag elements for better mobile experience
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    });
}

/**
 * Show tooltip with information
 * @param {Event} e - Mouse event
 * @param {string} text - Tooltip text
 */
function showTooltip(e, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = text;
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.style.top = e.pageY - 30 + 'px';
    tooltip.classList.add('show');
}

/**
 * Hide tooltip
 */
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels for screen readers
    document.querySelectorAll('.event-card').forEach(card => {
        const title = card.querySelector('.event-title').textContent;
        card.setAttribute('aria-label', `Draggable event: ${title}`);
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
    });
    
    document.querySelectorAll('.drop-zone').forEach(zone => {
        const year = zone.closest('.timeline-marker').dataset.year;
        zone.setAttribute('aria-label', `Drop zone for year ${year}`);
        zone.setAttribute('role', 'region');
    });
    
    // Keyboard navigation for event cards
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Simulate drag start for keyboard users
                this.classList.add('dragging');
                updateFeedback('Use arrow keys to move the selected event, Enter to place it.');
            }
        });
    });
});

console.log('Singapore History Timeline Interactive loaded successfully');