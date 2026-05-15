// Global variables for timeline interaction
let draggedElement = null;
let timelinePositions = {};
let zoomLevel = 1;
let eventDetails = {};

// Initialize the timeline interactive
document.addEventListener('DOMContentLoaded', function() {
    initializeEventDetails();
    setupDragAndDrop();
    setupZoomControls();
    setupCheckButton();
    setupEventPopups();
    shuffleEventCards();
});

// Initialize detailed event information for educational context
function initializeEventDetails() {
    eventDetails = {
        1: {
            title: "Strained Marriage",
            description: "Eddie's relationship with his wife Beatrice becomes increasingly tense and distant.",
            analysis: "This represents the foundation of Eddie's emotional isolation. His inability to connect with his wife creates a void that he inappropriately tries to fill through his obsession with Catherine. This marital strain is both a cause and effect of his psychological deterioration."
        },
        2: {
            title: "Unhealthy Obsession",
            description: "Eddie develops an inappropriate and obsessive attachment to his teenage niece Catherine.",
            analysis: "This unhealthy fixation represents Eddie's inability to accept Catherine's transition to adulthood. His possessive behavior stems from his own insecurities and unfulfilled emotional needs, setting the stage for the tragic events that follow."
        },
        3: {
            title: "Jealousy Emerges",
            description: "Eddie's jealousy and contempt for Rodolpho intensifies as Catherine falls in love.",
            analysis: "Eddie's jealousy reveals his true feelings for Catherine. His contempt for Rodolpho is rooted in fear of losing Catherine and his own masculine insecurities. This marks the point where Eddie's internal conflict becomes externalized."
        },
        4: {
            title: "False Accusations",
            description: "Eddie attempts to accuse Rodolpho of crimes he hasn't committed.",
            analysis: "This represents Eddie's descent into dishonesty and manipulation. Unable to accept the reality of Catherine's choice, he resorts to false accusations, showing how his obsession corrupts his moral judgment."
        },
        5: {
            title: "Betrayal",
            description: "Eddie calls immigration authorities, betraying not only Rodolpho but also innocent neighbors.",
            analysis: "This act of betrayal represents Eddie's complete moral collapse. By involving innocent people, Eddie violates the community's code of honor and trust, making his actions unforgivable in the eyes of his neighbors."
        },
        6: {
            title: "Public Humiliation",
            description: "Marco publicly humiliates Eddie by spitting on him and calling him a rat.",
            analysis: "This public shaming represents the community's rejection of Eddie. Being called a 'rat' is the ultimate insult in their culture, marking Eddie as an outcast and setting up the final confrontation."
        },
        7: {
            title: "Violence Escalates",
            description: "Eddie attempts to stab Marco with a knife in a desperate act of violence.",
            analysis: "This represents Eddie's final desperate attempt to restore his honor through violence. His decision to use a knife shows how far he has fallen from a respected community member to someone willing to commit murder."
        },
        8: {
            title: "Tragic End",
            description: "Marco turns Eddie's own knife against him, resulting in Eddie's death.",
            analysis: "Eddie's death by his own weapon represents poetic justice and the inevitable consequence of his actions. His tragic end fulfills the classical definition of tragedy - a hero's downfall caused by his own character flaws."
        }
    };
}

// Setup drag and drop functionality for event cards
function setupDragAndDrop() {
    const eventCards = document.querySelectorAll('.event-card');
    const dateMarkers = document.querySelectorAll('.date-marker');

    // Add drag event listeners to event cards
    eventCards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        
        // Touch events for mobile support
        card.addEventListener('touchstart', handleTouchStart, { passive: false });
        card.addEventListener('touchmove', handleTouchMove, { passive: false });
        card.addEventListener('touchend', handleTouchEnd, { passive: false });
    });

    // Add drop event listeners to date markers
    dateMarkers.forEach(marker => {
        marker.addEventListener('dragover', handleDragOver);
        marker.addEventListener('drop', handleDrop);
        marker.addEventListener('dragenter', handleDragEnter);
        marker.addEventListener('dragleave', handleDragLeave);
    });
}

// Handle drag start event
function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

// Handle drag end event
function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedElement = null;
}

// Handle drag over event (required for drop to work)
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

// Handle drag enter event for visual feedback
function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

// Handle drag leave event
function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

// Handle drop event - place event card on timeline
function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    if (draggedElement) {
        const position = this.dataset.position;
        const eventId = draggedElement.dataset.eventId;
        
        // Remove any existing event at this position
        const existingEvent = this.querySelector('.event-card');
        if (existingEvent) {
            returnEventToGrid(existingEvent);
        }
        
        // Place the dragged event at this position
        placeEventOnTimeline(draggedElement, this);
        timelinePositions[position] = eventId;
        
        // Remove the event from its original position if it was on timeline
        if (draggedElement.parentElement.classList.contains('date-marker')) {
            delete timelinePositions[draggedElement.parentElement.dataset.position];
        }
    }
}

// Touch event handlers for mobile support
let touchStartX, touchStartY, touchElement;

function handleTouchStart(e) {
    touchElement = this;
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    this.classList.add('dragging');
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!touchElement) return;
    
    const touch = e.touches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const marker = elementBelow?.closest('.date-marker');
    
    // Remove previous drag-over classes
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    
    // Add drag-over class to current marker
    if (marker) {
        marker.classList.add('drag-over');
    }
}

function handleTouchEnd(e) {
    if (!touchElement) return;
    
    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const marker = elementBelow?.closest('.date-marker');
    
    // Clean up drag-over classes
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    
    if (marker) {
        const position = marker.dataset.position;
        const eventId = touchElement.dataset.eventId;
        
        // Remove any existing event at this position
        const existingEvent = marker.querySelector('.event-card');
        if (existingEvent) {
            returnEventToGrid(existingEvent);
        }
        
        // Place the event at this position
        placeEventOnTimeline(touchElement, marker);
        timelinePositions[position] = eventId;
    }
    
    touchElement.classList.remove('dragging');
    touchElement = null;
}

// Place event card on timeline at specific marker
function placeEventOnTimeline(eventCard, marker) {
    eventCard.classList.add('placed');
    marker.appendChild(eventCard);
    
    // Add click listener for detailed popup
    eventCard.addEventListener('click', function() {
        showEventPopup(this.dataset.eventId);
    });
}

// Return event card to the events grid
function returnEventToGrid(eventCard) {
    eventCard.classList.remove('placed');
    eventCard.removeEventListener('click', showEventPopup);
    document.getElementById('events-grid').appendChild(eventCard);
}

// Setup zoom controls for timeline
function setupZoomControls() {
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const timelineContainer = document.getElementById('timeline-container');
    
    zoomInBtn.addEventListener('click', function() {
        if (zoomLevel < 1.5) {
            zoomLevel += 0.2;
            timelineContainer.style.transform = `scale(${zoomLevel})`;
            
            if (zoomLevel > 1.2) {
                timelineContainer.classList.add('zoomed-in');
            }
        }
    });
    
    zoomOutBtn.addEventListener('click', function() {
        if (zoomLevel > 0.6) {
            zoomLevel -= 0.2;
            timelineContainer.style.transform = `scale(${zoomLevel})`;
            
            if (zoomLevel < 0.9) {
                timelineContainer.classList.add('zoomed-out');
            } else {
                timelineContainer.classList.remove('zoomed-in', 'zoomed-out');
            }
        }
    });
}

// Setup check button functionality with color feedback
function setupCheckButton() {
    const checkBtn = document.getElementById('check-btn');
    const feedback = document.getElementById('feedback');
    
    checkBtn.addEventListener('click', function() {
        const correctAnswers = {
            '1': '1', '2': '2', '3': '3', '4': '4',
            '5': '5', '6': '6', '7': '7', '8': '8'
        };
        
        let correctCount = 0;
        let totalPlaced = Object.keys(timelinePositions).length;
        
        // Check each position
        for (let position in timelinePositions) {
            if (timelinePositions[position] === correctAnswers[position]) {
                correctCount++;
            }
        }
        
        // Provide feedback based on performance
        if (correctCount === 8 && totalPlaced === 8) {
            feedback.textContent = `Perfect! You've correctly identified the sequence of Eddie's tragic downfall. All ${correctCount}/8 events are in the right order.`;
            feedback.className = 'feedback success';
            
            // Add celebration effect
            celebrateSuccess();
            
        } else if (correctCount >= 6) {
            feedback.textContent = `Great progress! ${correctCount}/8 events are correct. Review the cause-and-effect relationships.`;
            feedback.className = 'feedback partial';
            
        } else if (correctCount >= 4) {
            feedback.textContent = `Good start! ${correctCount}/8 events are correct. Consider how each action leads to the next.`;
            feedback.className = 'feedback partial';
            
        } else {
            feedback.textContent = `Keep trying! ${correctCount}/8 events are correct. Think about the logical progression of Eddie's choices.`;
            feedback.className = 'feedback error';
        }
        
        // Highlight correct and incorrect positions
        highlightPositions(correctAnswers);
    });
}

// Highlight correct and incorrect positions on timeline
function highlightPositions(correctAnswers) {
    const dateMarkers = document.querySelectorAll('.date-marker');
    
    dateMarkers.forEach(marker => {
        const position = marker.dataset.position;
        const placedEventId = timelinePositions[position];
        const markerCircle = marker.querySelector('.marker-circle');
        
        // Reset previous highlighting
        markerCircle.style.background = '';
        
        if (placedEventId) {
            if (placedEventId === correctAnswers[position]) {
                // Correct placement - green
                markerCircle.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            } else {
                // Incorrect placement - red
                markerCircle.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
            }
        }
    });
    
    // Reset highlighting after 3 seconds
    setTimeout(() => {
        dateMarkers.forEach(marker => {
            const markerCircle = marker.querySelector('.marker-circle');
            markerCircle.style.background = '';
        });
    }, 3000);
}

// Celebration effect for perfect score
function celebrateSuccess() {
    const container = document.querySelector('.container');
    container.style.animation = 'pulse 0.6s ease-in-out';
    
    setTimeout(() => {
        container.style.animation = '';
    }, 600);
}

// Setup event popup functionality
function setupEventPopups() {
    const popup = document.getElementById('event-popup');
    const closeBtn = document.getElementById('popup-close');
    
    closeBtn.addEventListener('click', hideEventPopup);
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            hideEventPopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideEventPopup();
        }
    });
}

// Show detailed event popup
function showEventPopup(eventId) {
    const popup = document.getElementById('event-popup');
    const title = document.getElementById('popup-title');
    const description = document.getElementById('popup-description');
    const analysis = document.getElementById('popup-analysis');
    
    const event = eventDetails[eventId];
    if (event) {
        title.textContent = event.title;
        description.textContent = event.description;
        analysis.textContent = event.analysis;
        
        popup.style.display = 'flex';
        
        // Add fade-in animation
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.opacity = '1';
        }, 10);
    }
}

// Hide event popup
function hideEventPopup() {
    const popup = document.getElementById('event-popup');
    popup.style.opacity = '0';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

// Shuffle event cards for randomized starting positions
function shuffleEventCards() {
    const eventsGrid = document.getElementById('events-grid');
    const cards = Array.from(eventsGrid.children);
    
    // Fisher-Yates shuffle algorithm
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    // Re-append shuffled cards
    cards.forEach(card => eventsGrid.appendChild(card));
}

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    .event-popup {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);