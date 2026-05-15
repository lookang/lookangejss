// Timeline Interactive for "The Ant and the Dove" Fable
// Designed for Primary 4 students with low progress level
// Implements drag-and-drop functionality with visual feedback

class TimelineInteractive {
    constructor() {
        // Initialize state variables
        this.draggedElement = null;
        this.placedEvents = new Set();
        this.correctPlacements = 0;
        this.totalEvents = 5;
        
        // Bind methods to maintain context
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        
        // Initialize the interactive
        this.init();
    }
    
    init() {
        // Set up drag and drop event listeners
        this.setupDragAndDrop();
        
        // Set up touch events for mobile devices
        this.setupTouchEvents();
        
        // Set up check button
        this.setupCheckButton();
        
        // Initialize progress display
        this.updateProgress();
        
        // Add visual enhancements
        this.addVisualEnhancements();
        
        console.log('Timeline Interactive initialized successfully');
    }
    
    setupDragAndDrop() {
        // Get all draggable event cards
        const eventCards = document.querySelectorAll('.event-card');
        const dropZones = document.querySelectorAll('.drop-zone');
        
        // Add drag event listeners to event cards
        eventCards.forEach(card => {
            card.addEventListener('dragstart', this.handleDragStart);
            card.addEventListener('dragend', this.handleDragEnd);
            
            // Add visual feedback on hover
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('placed')) {
                    card.style.transform = 'translateY(-3px)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('placed')) {
                    card.style.transform = '';
                }
            });
        });
        
        // Add drop event listeners to drop zones
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', this.handleDragOver);
            zone.addEventListener('drop', this.handleDrop);
            zone.addEventListener('dragenter', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            zone.addEventListener('dragleave', (e) => {
                // Only remove highlight if not dragging over a child element
                if (!zone.contains(e.relatedTarget)) {
                    zone.classList.remove('drag-over');
                }
            });
        });
    }
    
    setupTouchEvents() {
        // Touch support for mobile devices
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            card.addEventListener('touchstart', this.handleTouchStart, { passive: false });
            card.addEventListener('touchmove', this.handleTouchMove, { passive: false });
            card.addEventListener('touchend', this.handleTouchEnd, { passive: false });
        });
    }
    
    handleDragStart(e) {
        // Store reference to dragged element
        this.draggedElement = e.target;
        
        // Add visual feedback
        e.target.classList.add('dragging');
        
        // Set drag data
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.outerHTML);
        
        console.log('Drag started:', e.target.dataset.event);
    }
    
    handleDragEnd(e) {
        // Remove visual feedback
        e.target.classList.remove('dragging');
        
        // Remove drag-over class from all drop zones
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.remove('drag-over');
        });
        
        console.log('Drag ended');
    }
    
    handleDragOver(e) {
        // Allow drop by preventing default
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
    
    handleDrop(e) {
        e.preventDefault();
        
        const dropZone = e.currentTarget;
        const draggedEvent = this.draggedElement.dataset.event;
        const correctEvent = dropZone.dataset.correct;
        
        // Check if drop zone is already occupied
        if (dropZone.querySelector('.event-card')) {
            this.showFeedback('This spot is already taken! Try another position.', 'error');
            dropZone.classList.remove('drag-over');
            return;
        }
        
        // Clone the dragged element and place it in the drop zone
        const clonedCard = this.draggedElement.cloneNode(true);
        clonedCard.draggable = false;
        clonedCard.classList.add('placed');
        clonedCard.classList.remove('dragging');
        
        // Add the cloned card to the drop zone
        dropZone.appendChild(clonedCard);
        dropZone.classList.add('filled');
        dropZone.classList.remove('drag-over');
        
        // Mark original card as placed and hide it
        this.draggedElement.classList.add('placed');
        this.placedEvents.add(draggedEvent);
        
        // Update progress
        this.updateProgress();
        
        // Provide immediate visual feedback
        this.providePlacementFeedback(dropZone, draggedEvent === correctEvent);
        
        console.log(`Dropped ${draggedEvent} in position for ${correctEvent}`);
        
        // Enable check button if all events are placed
        if (this.placedEvents.size === this.totalEvents) {
            document.querySelector('.check-btn').disabled = false;
            this.showFeedback('Great! All events are placed. Click "Check My Timeline" to see how you did!', 'success');
        }
    }
    
    // Touch event handlers for mobile support
    handleTouchStart(e) {
        if (e.target.classList.contains('placed')) return;
        
        e.preventDefault();
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        
        // Store initial touch position
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
    }
    
    handleTouchMove(e) {
        if (!this.draggedElement) return;
        
        e.preventDefault();
        const touch = e.touches[0];
        
        // Move the element with the touch
        this.draggedElement.style.position = 'fixed';
        this.draggedElement.style.left = touch.clientX - 50 + 'px';
        this.draggedElement.style.top = touch.clientY - 30 + 'px';
        this.draggedElement.style.zIndex = '1000';
        
        // Highlight drop zones under touch
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropZone = elementBelow?.closest('.drop-zone');
        
        // Remove previous highlights
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.remove('drag-over');
        });
        
        // Add highlight to current drop zone
        if (dropZone) {
            dropZone.classList.add('drag-over');
        }
    }
    
    handleTouchEnd(e) {
        if (!this.draggedElement) return;
        
        e.preventDefault();
        
        // Reset element position
        this.draggedElement.style.position = '';
        this.draggedElement.style.left = '';
        this.draggedElement.style.top = '';
        this.draggedElement.style.zIndex = '';
        this.draggedElement.classList.remove('dragging');
        
        // Find drop zone under touch end position
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropZone = elementBelow?.closest('.drop-zone');
        
        if (dropZone) {
            // Simulate drop event
            const dropEvent = new Event('drop');
            dropEvent.currentTarget = dropZone;
            this.handleDrop(dropEvent);
        }
        
        // Clean up
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.remove('drag-over');
        });
        
        this.draggedElement = null;
    }
    
    setupCheckButton() {
        const checkBtn = document.querySelector('.check-btn');
        checkBtn.disabled = true; // Initially disabled
        
        checkBtn.addEventListener('click', () => {
            this.checkTimeline();
        });
    }
    
    checkTimeline() {
        const dropZones = document.querySelectorAll('.drop-zone');
        let correctCount = 0;
        let totalPlaced = 0;
        
        // Check each drop zone
        dropZones.forEach(zone => {
            const placedCard = zone.querySelector('.event-card');
            if (placedCard) {
                totalPlaced++;
                const placedEvent = placedCard.dataset.event;
                const correctEvent = zone.dataset.correct;
                
                if (placedEvent === correctEvent) {
                    correctCount++;
                    zone.classList.add('correct');
                    zone.classList.remove('incorrect');
                    
                    // Add success animation
                    placedCard.classList.add('success-animation');
                    setTimeout(() => {
                        placedCard.classList.remove('success-animation');
                    }, 600);
                } else {
                    zone.classList.add('incorrect');
                    zone.classList.remove('correct');
                }
            }
        });
        
        // Provide comprehensive feedback
        this.provideFinalFeedback(correctCount, totalPlaced);
        
        // Update progress with final results
        this.updateProgress(correctCount);
        
        console.log(`Timeline check: ${correctCount}/${totalPlaced} correct`);
    }
    
    providePlacementFeedback(dropZone, isCorrect) {
        // Visual feedback for individual placements
        if (isCorrect) {
            dropZone.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.8)';
            setTimeout(() => {
                dropZone.style.boxShadow = '';
            }, 1000);
        }
    }
    
    provideFinalFeedback(correctCount, totalPlaced) {
        const feedback = document.getElementById('feedback');
        const percentage = Math.round((correctCount / this.totalEvents) * 100);
        
        if (correctCount === this.totalEvents) {
            // Perfect score
            feedback.textContent = '🎉 Excellent! You got the timeline perfect! The ant and dove helped each other!';
            feedback.className = 'feedback success';
            this.celebrateSuccess();
        } else if (correctCount >= 3) {
            // Good attempt
            feedback.textContent = `👍 Good job! You got ${correctCount} out of ${this.totalEvents} events correct. Try again to get them all!`;
            feedback.className = 'feedback success';
        } else {
            // Needs improvement
            feedback.textContent = `🤔 You got ${correctCount} out of ${this.totalEvents} events correct. Think about what happened first, then next...`;
            feedback.className = 'feedback error';
        }
        
        // Add reset option for multiple attempts
        if (correctCount < this.totalEvents) {
            setTimeout(() => {
                this.addResetButton();
            }, 2000);
        }
    }
    
    celebrateSuccess() {
        // Add celebration effects for perfect score
        const container = document.querySelector('.container');
        container.style.background = 'linear-gradient(135deg, #c8e6c9, #a5d6a7)';
        
        setTimeout(() => {
            container.style.background = '';
        }, 3000);
        
        // Animate timeline markers
        const markers = document.querySelectorAll('.marker-circle');
        markers.forEach((marker, index) => {
            setTimeout(() => {
                marker.classList.add('success-animation');
                setTimeout(() => {
                    marker.classList.remove('success-animation');
                }, 600);
            }, index * 200);
        });
    }
    
    addResetButton() {
        const controls = document.querySelector('.controls');
        let resetBtn = document.querySelector('.reset-btn');
        
        if (!resetBtn) {
            resetBtn = document.createElement('button');
            resetBtn.className = 'check-btn reset-btn';
            resetBtn.textContent = '🔄 Try Again';
            resetBtn.title = 'Reset the timeline to try again';
            
            resetBtn.addEventListener('click', () => {
                this.resetTimeline();
            });
            
            controls.appendChild(resetBtn);
        }
    }
    
    resetTimeline() {
        // Clear all drop zones
        document.querySelectorAll('.drop-zone').forEach(zone => {
            const placedCard = zone.querySelector('.event-card');
            if (placedCard) {
                placedCard.remove();
            }
            zone.className = 'drop-zone';
        });
        
        // Reset all original event cards
        document.querySelectorAll('.events-container .event-card').forEach(card => {
            card.classList.remove('placed');
            card.draggable = true;
        });
        
        // Reset state
        this.placedEvents.clear();
        this.correctPlacements = 0;
        
        // Reset UI elements
        document.querySelector('.check-btn').disabled = true;
        document.getElementById('feedback').textContent = '';
        document.getElementById('feedback').className = 'feedback';
        
        // Remove reset button
        const resetBtn = document.querySelector('.reset-btn');
        if (resetBtn) {
            resetBtn.remove();
        }
        
        // Update progress
        this.updateProgress();
        
        console.log('Timeline reset');
    }
    
    updateProgress(finalCorrect = null) {
        const progressText = document.getElementById('progress-text');
        const progressFill = document.getElementById('progress-fill');
        
        if (finalCorrect !== null) {
            // Show final results
            progressText.textContent = `Final Score: ${finalCorrect}/${this.totalEvents} correct`;
            progressFill.style.width = `${(finalCorrect / this.totalEvents) * 100}%`;
            
            // Change color based on performance
            if (finalCorrect === this.totalEvents) {
                progressFill.style.background = 'linear-gradient(90deg, #4caf50, #8bc34a)';
            } else if (finalCorrect >= 3) {
                progressFill.style.background = 'linear-gradient(90deg, #ff9800, #ffc107)';
            } else {
                progressFill.style.background = 'linear-gradient(90deg, #f44336, #e57373)';
            }
        } else {
            // Show placement progress
            progressText.textContent = `Events placed: ${this.placedEvents.size}/${this.totalEvents}`;
            progressFill.style.width = `${(this.placedEvents.size / this.totalEvents) * 100}%`;
            progressFill.style.background = 'linear-gradient(90deg, #4caf50, #8bc34a)';
        }
    }
    
    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        
        // Auto-hide after 3 seconds for non-critical messages
        if (type !== 'success' || !message.includes('Check My Timeline')) {
            setTimeout(() => {
                feedback.textContent = '';
                feedback.className = 'feedback';
            }, 3000);
        }
    }
    
    addVisualEnhancements() {
        // Add subtle animations to timeline markers
        const markers = document.querySelectorAll('.marker-circle');
        markers.forEach((marker, index) => {
            setTimeout(() => {
                marker.style.opacity = '0';
                marker.style.transform = 'scale(0.5)';
                marker.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    marker.style.opacity = '1';
                    marker.style.transform = 'scale(1)';
                }, 100);
            }, index * 200);
        });
        
        // Add hover effects to event cards
        document.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('placed')) {
                    card.style.boxShadow = '0 8px 25px rgba(33, 150, 243, 0.3)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('placed')) {
                    card.style.boxShadow = '';
                }
            });
        });
    }
}

// Initialize the interactive when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Detect if running in iframe for responsive height adjustment
    if (window.self !== window.top) {
        document.body.classList.add('iframe');
    }
    
    // Create new instance of the timeline interactive
    const timeline = new TimelineInteractive();
    
    // Add accessibility improvements
    document.addEventListener('keydown', (e) => {
        // Add keyboard navigation support
        if (e.key === 'Escape') {
            // Reset any ongoing drag operations
            document.querySelectorAll('.event-card').forEach(card => {
                card.classList.remove('dragging');
                card.style.position = '';
                card.style.left = '';
                card.style.top = '';
                card.style.zIndex = '';
            });
            
            document.querySelectorAll('.drop-zone').forEach(zone => {
                zone.classList.remove('drag-over');
            });
        }
    });
    
    console.log('The Ant and the Dove Timeline Interactive loaded successfully!');
});