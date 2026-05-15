// Timeline Interactive Script
// This script handles drag and drop functionality for organizing daily activities

class TimelineInteractive {
    constructor() {
        // Initialize variables to track game state
        this.draggedElement = null;
        this.correctPlacements = 0;
        this.totalActivities = 9;
        
        // Bind event handlers to maintain 'this' context
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        
        this.init();
    }
    
    init() {
        // Set up all event listeners and initialize the interactive
        this.setupDragAndDrop();
        this.setupButtons();
        this.setupTooltips();
        
        // Check if running in iframe and adjust styling
        if (window.self !== window.top) {
            document.body.classList.add('iframe-mode');
        }
    }
    
    setupDragAndDrop() {
        // Set up drag and drop for desktop
        const cards = document.querySelectorAll('.card');
        const dropZones = document.querySelectorAll('.drop-zone');
        
        // Add drag event listeners to all cards
        cards.forEach(card => {
            card.addEventListener('dragstart', this.handleDragStart);
            card.addEventListener('dragend', this.handleDragEnd);
            
            // Touch events for mobile devices
            card.addEventListener('touchstart', this.handleTouchStart, { passive: false });
            card.addEventListener('touchmove', this.handleTouchMove, { passive: false });
            card.addEventListener('touchend', this.handleTouchEnd, { passive: false });
        });
        
        // Add drop event listeners to all drop zones
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', this.handleDragOver);
            zone.addEventListener('drop', this.handleDrop);
        });
    }
    
    setupButtons() {
        // Set up check and reset button functionality
        const checkBtn = document.getElementById('checkBtn');
        const resetBtn = document.getElementById('resetBtn');
        
        checkBtn.addEventListener('click', () => this.checkAnswers());
        resetBtn.addEventListener('click', () => this.resetTimeline());
    }
    
    setupTooltips() {
        // Enhanced tooltip functionality for better accessibility
        const tooltipElements = document.querySelectorAll('[title]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip);
            element.addEventListener('mouseleave', this.hideTooltip);
        });
    }
    
    // Drag and Drop Event Handlers
    handleDragStart(e) {
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.outerHTML);
    }
    
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.draggedElement = null;
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        e.currentTarget.classList.add('drag-over');
    }
    
    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        if (this.draggedElement) {
            // Move the dragged element to the drop zone
            this.moveCardToZone(this.draggedElement, e.currentTarget);
        }
    }
    
    // Touch Event Handlers for Mobile Support
    handleTouchStart(e) {
        e.preventDefault();
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        
        // Store initial touch position
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        if (!this.draggedElement) return;
        
        const touch = e.touches[0];
        const element = this.draggedElement;
        
        // Move the element with the touch
        element.style.position = 'fixed';
        element.style.left = (touch.clientX - 35) + 'px';
        element.style.top = (touch.clientY - 35) + 'px';
        element.style.zIndex = '1000';
        element.style.pointerEvents = 'none';
        
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
        e.preventDefault();
        if (!this.draggedElement) return;
        
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropZone = elementBelow?.closest('.drop-zone');
        
        // Reset element styles
        this.draggedElement.style.position = '';
        this.draggedElement.style.left = '';
        this.draggedElement.style.top = '';
        this.draggedElement.style.zIndex = '';
        this.draggedElement.style.pointerEvents = '';
        this.draggedElement.classList.remove('dragging');
        
        // Remove all drag-over highlights
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.remove('drag-over');
        });
        
        // Move card to drop zone if valid
        if (dropZone) {
            this.moveCardToZone(this.draggedElement, dropZone);
        }
        
        this.draggedElement = null;
    }
    
    moveCardToZone(card, dropZone) {
        // Move a card to a specific drop zone
        const cardClone = card.cloneNode(true);
        
        // Remove the original card from its current location
        card.remove();
        
        // Add the card to the new drop zone
        dropZone.appendChild(cardClone);
        
        // Hide the drop hint when cards are added
        const dropHint = dropZone.querySelector('.drop-hint');
        if (dropHint) {
            dropHint.style.display = 'none';
        }
        
        // Re-setup event listeners for the cloned card
        this.setupCardEvents(cardClone);
        
        // Clear any previous feedback
        this.clearFeedback();
    }
    
    setupCardEvents(card) {
        // Set up event listeners for a newly created card
        card.addEventListener('dragstart', this.handleDragStart);
        card.addEventListener('dragend', this.handleDragEnd);
        card.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        card.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        card.addEventListener('touchend', this.handleTouchEnd, { passive: false });
    }
    
    checkAnswers() {
        // Check if all activities are placed in correct time periods
        const dropZones = document.querySelectorAll('.drop-zone');
        let correctCount = 0;
        let totalPlaced = 0;
        
        // Clear previous visual feedback
        dropZones.forEach(zone => {
            zone.classList.remove('correct', 'incorrect');
        });
        
        dropZones.forEach(zone => {
            const zoneTime = zone.dataset.time;
            const cardsInZone = zone.querySelectorAll('.card');
            
            cardsInZone.forEach(card => {
                totalPlaced++;
                const cardTime = card.dataset.time;
                
                if (cardTime === zoneTime) {
                    correctCount++;
                    zone.classList.add('correct');
                } else {
                    zone.classList.add('incorrect');
                }
            });
        });
        
        // Show feedback based on results
        this.showFeedback(correctCount, totalPlaced);
    }
    
    showFeedback(correct, total) {
        // Display feedback message based on performance
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('hidden', 'success', 'error');
        
        if (correct === total && total === this.totalActivities) {
            // Perfect score
            feedback.textContent = '🎉 Excellent! You got all activities in the right time! Well done!';
            feedback.classList.add('success');
            this.celebrateSuccess();
        } else if (correct === total && total > 0) {
            // All placed activities are correct, but not all activities placed
            feedback.textContent = `✅ Great job! ${correct} activities are correct. Try placing the remaining activities.`;
            feedback.classList.add('success');
        } else if (correct > total / 2) {
            // More than half correct
            feedback.textContent = `👍 Good try! You got ${correct} out of ${total} activities correct. Keep going!`;
            feedback.classList.add('error');
        } else {
            // Less than half correct
            feedback.textContent = `🤔 Let's try again! Think about when you do these activities during the day.`;
            feedback.classList.add('error');
        }
    }
    
    celebrateSuccess() {
        // Add celebration animation for perfect completion
        const container = document.querySelector('.container');
        container.style.animation = 'pulse 0.6s ease-in-out';
        
        setTimeout(() => {
            container.style.animation = '';
        }, 600);
    }
    
    resetTimeline() {
        // Reset all activities back to the activity cards section
        const activityCards = document.querySelector('.activity-cards');
        const dropZones = document.querySelectorAll('.drop-zone');
        
        // Move all cards back to activity cards section
        dropZones.forEach(zone => {
            const cards = zone.querySelectorAll('.card');
            cards.forEach(card => {
                activityCards.appendChild(card);
                this.setupCardEvents(card);
            });
            
            // Show drop hints again
            const dropHint = zone.querySelector('.drop-hint');
            if (dropHint) {
                dropHint.style.display = 'block';
            }
            
            // Clear visual feedback
            zone.classList.remove('correct', 'incorrect', 'drag-over');
        });
        
        // Clear feedback message
        this.clearFeedback();
    }
    
    clearFeedback() {
        // Hide the feedback message
        const feedback = document.getElementById('feedback');
        feedback.classList.add('hidden');
        feedback.classList.remove('success', 'error');
    }
    
    showTooltip(e) {
        // Enhanced tooltip display (can be expanded for custom tooltips)
        e.target.setAttribute('aria-label', e.target.title);
    }
    
    hideTooltip(e) {
        // Hide tooltip
        e.target.removeAttribute('aria-label');
    }
}

// Initialize the interactive when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TimelineInteractive();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust layout if needed on resize
    const container = document.querySelector('.container');
    if (window.self !== window.top) {
        container.style.height = '450px';
    } else {
        container.style.height = '90vh';
    }
});