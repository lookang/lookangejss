// Interactive Singapore Government Branches Learning Activity
// This script handles drag-and-drop functionality, progress tracking, and user feedback

class GovernmentBranchesActivity {
    constructor() {
        // Initialize activity state
        this.totalFunctions = 6;
        this.correctPlacements = 0;
        this.draggedElement = null;
        
        // Initialize the activity
        this.init();
    }

    init() {
        // Set up all event listeners for drag and drop functionality
        this.setupDragAndDrop();
        this.setupKeyboardNavigation();
        this.setupResetButton();
        this.updateProgress();
    }

    setupDragAndDrop() {
        // Get all draggable function cards
        const functionCards = document.querySelectorAll('.function-card');
        const dropZones = document.querySelectorAll('.drop-zone');

        // Add drag event listeners to function cards
        functionCards.forEach(card => {
            // Mouse drag events
            card.addEventListener('dragstart', (e) => this.handleDragStart(e));
            card.addEventListener('dragend', (e) => this.handleDragEnd(e));
            
            // Touch events for mobile devices
            card.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
            card.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
            card.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        });

        // Add drop event listeners to drop zones
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => this.handleDragOver(e));
            zone.addEventListener('drop', (e) => this.handleDrop(e));
            zone.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            zone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        });
    }

    setupKeyboardNavigation() {
        // Enable keyboard navigation for accessibility
        const functionCards = document.querySelectorAll('.function-card');
        const dropZones = document.querySelectorAll('.drop-zone');

        functionCards.forEach(card => {
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectForKeyboardMove(card);
                }
            });
        });

        dropZones.forEach(zone => {
            zone.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleKeyboardDrop(zone);
                }
            });
        });
    }

    setupResetButton() {
        // Set up reset functionality
        const resetButton = document.getElementById('resetButton');
        resetButton.addEventListener('click', () => this.resetActivity());
        
        // Keyboard support for reset button
        resetButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.resetActivity();
            }
        });
    }

    handleDragStart(e) {
        // Store reference to dragged element and add visual feedback
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.outerHTML);
    }

    handleDragEnd(e) {
        // Clean up drag visual effects
        e.target.classList.remove('dragging');
        this.draggedElement = null;
    }

    handleDragOver(e) {
        // Allow drop by preventing default behavior
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    handleDragEnter(e) {
        // Add visual feedback when dragging over valid drop zone
        e.preventDefault();
        e.target.closest('.drop-zone').classList.add('drag-over');
    }

    handleDragLeave(e) {
        // Remove visual feedback when leaving drop zone
        const dropZone = e.target.closest('.drop-zone');
        if (dropZone && !dropZone.contains(e.relatedTarget)) {
            dropZone.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        // Handle the drop event and check if placement is correct
        e.preventDefault();
        const dropZone = e.target.closest('.drop-zone');
        dropZone.classList.remove('drag-over');

        if (this.draggedElement) {
            const functionType = this.draggedElement.dataset.function;
            const acceptedType = dropZone.dataset.accepts;

            if (functionType === acceptedType) {
                // Correct placement
                this.placeFunction(this.draggedElement, dropZone);
                this.showFeedback('Correct! Well done!', 'success');
                this.correctPlacements++;
                this.updateProgress();
                this.checkCompletion();
            } else {
                // Incorrect placement
                this.showFeedback('Try again! This function belongs to a different branch.', 'error');
                this.shakeElement(dropZone);
            }
        }
    }

    // Touch event handlers for mobile support
    handleTouchStart(e) {
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
    }

    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        
        // Update visual feedback for touch drag
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.remove('drag-over');
        });
        
        const dropZone = elementBelow?.closest('.drop-zone');
        if (dropZone) {
            dropZone.classList.add('drag-over');
        }
    }

    handleTouchEnd(e) {
        e.preventDefault();
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropZone = elementBelow?.closest('.drop-zone');

        // Clean up visual effects
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.remove('drag-over');
        });
        this.draggedElement.classList.remove('dragging');

        if (dropZone && this.draggedElement) {
            // Simulate drop event for touch
            const functionType = this.draggedElement.dataset.function;
            const acceptedType = dropZone.dataset.accepts;

            if (functionType === acceptedType) {
                this.placeFunction(this.draggedElement, dropZone);
                this.showFeedback('Correct! Well done!', 'success');
                this.correctPlacements++;
                this.updateProgress();
                this.checkCompletion();
            } else {
                this.showFeedback('Try again! This function belongs to a different branch.', 'error');
                this.shakeElement(dropZone);
            }
        }

        this.draggedElement = null;
    }

    // Keyboard navigation support
    selectForKeyboardMove(card) {
        // Highlight selected card for keyboard navigation
        document.querySelectorAll('.function-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.draggedElement = card;
        this.showFeedback('Function selected. Navigate to a branch and press Enter to place it.', 'info');
    }

    handleKeyboardDrop(dropZone) {
        // Handle keyboard-based dropping
        if (this.draggedElement) {
            const functionType = this.draggedElement.dataset.function;
            const acceptedType = dropZone.dataset.accepts;

            if (functionType === acceptedType) {
                this.placeFunction(this.draggedElement, dropZone);
                this.showFeedback('Correct! Well done!', 'success');
                this.correctPlacements++;
                this.updateProgress();
                this.checkCompletion();
            } else {
                this.showFeedback('Try again! This function belongs to a different branch.', 'error');
                this.shakeElement(dropZone);
            }
            
            this.draggedElement.classList.remove('selected');
            this.draggedElement = null;
        }
    }

    placeFunction(functionElement, dropZone) {
        // Create a new element for the dropped function
        const droppedFunction = document.createElement('div');
        droppedFunction.className = 'dropped-function';
        droppedFunction.innerHTML = functionElement.innerHTML;
        
        // Hide the drop hint if this is the first function in the zone
        const dropHint = dropZone.querySelector('.drop-hint');
        if (dropHint) {
            dropHint.style.display = 'none';
        }
        
        // Add the function to the drop zone
        dropZone.appendChild(droppedFunction);
        
        // Remove the original function card from the functions panel
        functionElement.remove();
        
        // Add success animation to the branch
        const branch = dropZone.closest('.branch');
        branch.classList.add('success-animation');
        setTimeout(() => branch.classList.remove('success-animation'), 600);
    }

    updateProgress() {
        // Update the progress bar based on correct placements
        const progressPercentage = (this.correctPlacements / this.totalFunctions) * 100;
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${progressPercentage}%`;
    }

    checkCompletion() {
        // Check if all functions have been correctly placed
        if (this.correctPlacements === this.totalFunctions) {
            setTimeout(() => {
                this.showFeedback('🎉 Excellent! You have successfully matched all government functions to their correct branches!', 'completion');
                this.celebrateCompletion();
            }, 500);
        }
    }

    celebrateCompletion() {
        // Add celebration effects when activity is completed
        const container = document.querySelector('.container');
        container.classList.add('success-animation');
        
        // Create confetti effect
        this.createConfetti();
    }

    createConfetti() {
        // Simple confetti animation using CSS
        const confettiColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
                left: ${Math.random() * 100}%;
                animation: confetti-fall 3s linear forwards;
                pointer-events: none;
                z-index: 1000;
            `;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 3000);
        }
        
        // Add confetti animation keyframes
        if (!document.querySelector('#confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confetti-fall {
                    0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    showFeedback(message, type) {
        // Display feedback messages to the user
        const feedbackElement = document.getElementById('feedbackMessage');
        feedbackElement.textContent = message;
        
        // Style feedback based on type
        feedbackElement.className = `feedback-message ${type}`;
        
        // Add appropriate styling for different feedback types
        switch (type) {
            case 'success':
                feedbackElement.style.color = '#27ae60';
                break;
            case 'error':
                feedbackElement.style.color = '#e74c3c';
                break;
            case 'completion':
                feedbackElement.style.color = '#8e44ad';
                feedbackElement.style.fontWeight = 'bold';
                break;
            default:
                feedbackElement.style.color = '#2c3e50';
        }
    }

    shakeElement(element) {
        // Add shake animation for incorrect placements
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
        
        // Add shake keyframes if not already present
        if (!document.querySelector('#shake-style')) {
            const style = document.createElement('style');
            style.id = 'shake-style';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    resetActivity() {
        // Reset the entire activity to initial state
        this.correctPlacements = 0;
        
        // Clear all drop zones
        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach(zone => {
            // Remove all dropped functions
            const droppedFunctions = zone.querySelectorAll('.dropped-function');
            droppedFunctions.forEach(func => func.remove());
            
            // Show drop hints again
            const dropHint = zone.querySelector('.drop-hint');
            if (dropHint) {
                dropHint.style.display = 'block';
            }
        });
        
        // Restore original function cards
        this.restoreOriginalFunctions();
        
        // Reset progress and feedback
        this.updateProgress();
        this.showFeedback('Activity reset! Drag the functions to their correct government branches!', 'info');
    }

    restoreOriginalFunctions() {
        // Restore the original function cards to the functions panel
        const functionsContainer = document.querySelector('.functions-container');
        functionsContainer.innerHTML = '';
        
        // Define the original functions
        const originalFunctions = [
            { type: 'legislature', icon: '📝', text: 'Debate and vote on new bills' },
            { type: 'legislature', icon: '🔍', text: 'Review government policies' },
            { type: 'executive', icon: '🏢', text: 'Run government ministries' },
            { type: 'executive', icon: '👮', text: 'Enforce laws and regulations' },
            { type: 'judiciary', icon: '⚖️', text: 'Hear court cases' },
            { type: 'judiciary', icon: '📋', text: 'Make legal judgments' }
        ];
        
        // Recreate function cards
        originalFunctions.forEach(func => {
            const card = document.createElement('div');
            card.className = 'function-card';
            card.dataset.function = func.type;
            card.draggable = true;
            card.role = 'button';
            card.ariaLabel = func.text;
            card.tabIndex = 0;
            
            card.innerHTML = `
                <div class="function-icon">${func.icon}</div>
                <div class="function-text">${func.text}</div>
            `;
            
            functionsContainer.appendChild(card);
        });
        
        // Re-setup event listeners for new cards
        this.setupDragAndDrop();
    }
}

// Initialize the activity when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GovernmentBranchesActivity();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust layout if needed for different screen sizes
    const container = document.querySelector('.container');
    if (window.innerWidth < 768) {
        container.classList.add('mobile-layout');
    } else {
        container.classList.remove('mobile-layout');
    }
});