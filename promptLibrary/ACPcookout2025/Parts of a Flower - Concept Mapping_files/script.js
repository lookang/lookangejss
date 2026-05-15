// Concept Mapping Interactive for Parts of a Flower
// Designed for Primary 5 students with lower progress level
// Implements drag-and-drop functionality with visual feedback

class FlowerConceptMap {
    constructor() {
        // Initialize the interactive elements and state
        this.wordCards = document.querySelectorAll('.word-card');
        this.dropZones = document.querySelectorAll('.drop-zone');
        this.checkButton = document.getElementById('checkButton');
        this.resetButton = document.getElementById('resetButton');
        this.feedback = document.getElementById('feedback');
        this.tooltip = document.getElementById('tooltip');
        this.connectionLines = document.querySelector('.connection-lines');
        
        // Track the current state of placements
        this.placements = {};
        this.connections = [];
        
        // Correct answers mapping
        this.correctAnswers = {
            'petals': 'petals',
            'stem': 'stem',
            'roots': 'roots',
            'leaves': 'leaves'
        };
        
        this.init();
    }
    
    init() {
        // Set up all event listeners and initial state
        this.setupDragAndDrop();
        this.setupButtons();
        this.setupTooltips();
        this.adjustForEnvironment();
    }
    
    adjustForEnvironment() {
        // Detect if running in iframe vs full browser and adjust height
        const container = document.getElementById('mainContainer');
        if (window.self !== window.top) {
            // Running in iframe
            container.style.height = '450px';
        } else {
            // Running in full browser
            container.style.height = '90vh';
        }
    }
    
    setupDragAndDrop() {
        // Set up drag and drop functionality for word cards
        this.wordCards.forEach(card => {
            // Touch events for mobile devices
            card.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
            card.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
            card.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
            
            // Mouse events for desktop
            card.addEventListener('dragstart', this.handleDragStart.bind(this));
            card.addEventListener('dragend', this.handleDragEnd.bind(this));
        });
        
        // Set up drop zones
        this.dropZones.forEach(zone => {
            zone.addEventListener('dragover', this.handleDragOver.bind(this));
            zone.addEventListener('drop', this.handleDrop.bind(this));
            zone.addEventListener('dragenter', this.handleDragEnter.bind(this));
            zone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        });
    }
    
    setupButtons() {
        // Set up button event listeners
        this.checkButton.addEventListener('click', this.checkAnswers.bind(this));
        this.resetButton.addEventListener('click', this.resetActivity.bind(this));
    }
    
    setupTooltips() {
        // Set up tooltip functionality for better accessibility
        const elementsWithTooltips = document.querySelectorAll('[title]');
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip.bind(this));
            element.addEventListener('mouseleave', this.hideTooltip.bind(this));
            element.addEventListener('mousemove', this.moveTooltip.bind(this));
        });
    }
    
    // Touch event handlers for mobile devices
    handleTouchStart(e) {
        e.preventDefault();
        const card = e.target.closest('.word-card');
        if (!card || card.classList.contains('placed')) return;
        
        card.classList.add('dragging');
        this.draggedElement = card;
        this.touchOffset = {
            x: e.touches[0].clientX - card.getBoundingClientRect().left,
            y: e.touches[0].clientY - card.getBoundingClientRect().top
        };
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        if (!this.draggedElement) return;
        
        const touch = e.touches[0];
        this.draggedElement.style.position = 'fixed';
        this.draggedElement.style.left = (touch.clientX - this.touchOffset.x) + 'px';
        this.draggedElement.style.top = (touch.clientY - this.touchOffset.y) + 'px';
        this.draggedElement.style.zIndex = '1000';
        
        // Highlight drop zones when dragging over them
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        this.highlightDropZone(elementBelow);
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        if (!this.draggedElement) return;
        
        const touch = e.changedTouches[0];
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropZone = elementBelow?.closest('.drop-zone');
        
        if (dropZone) {
            this.handleCardPlacement(this.draggedElement, dropZone);
        }
        
        this.resetDraggedElement();
        this.clearHighlights();
    }
    
    // Mouse drag event handlers
    handleDragStart(e) {
        const card = e.target.closest('.word-card');
        if (card.classList.contains('placed')) {
            e.preventDefault();
            return;
        }
        
        card.classList.add('dragging');
        this.draggedElement = card;
        e.dataTransfer.setData('text/plain', card.dataset.word);
    }
    
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.clearHighlights();
    }
    
    handleDragOver(e) {
        e.preventDefault();
    }
    
    handleDragEnter(e) {
        e.preventDefault();
        const dropZone = e.target.closest('.drop-zone');
        if (dropZone) {
            dropZone.classList.add('highlight');
        }
    }
    
    handleDragLeave(e) {
        const dropZone = e.target.closest('.drop-zone');
        if (dropZone && !dropZone.contains(e.relatedTarget)) {
            dropZone.classList.remove('highlight');
        }
    }
    
    handleDrop(e) {
        e.preventDefault();
        const dropZone = e.target.closest('.drop-zone');
        const wordData = e.dataTransfer.getData('text/plain');
        const card = document.querySelector(`[data-word="${wordData}"]`);
        
        if (dropZone && card) {
            this.handleCardPlacement(card, dropZone);
        }
        
        this.clearHighlights();
    }
    
    handleCardPlacement(card, dropZone) {
        // Handle the placement of a word card on a drop zone
        const word = card.dataset.word;
        const part = dropZone.dataset.part;
        
        // Check if this drop zone already has a card
        if (this.placements[part]) {
            // Remove previous placement
            const previousCard = document.querySelector(`[data-word="${this.placements[part]}"]`);
            if (previousCard) {
                this.resetCard(previousCard);
            }
        }
        
        // Place the new card
        this.placements[part] = word;
        card.classList.add('placed');
        
        // Create visual connection
        this.createConnection(card, dropZone);
        
        // Provide immediate feedback
        this.providePlacementFeedback(word, part);
    }
    
    createConnection(card, dropZone) {
        // Create a visual line connecting the card to the flower part
        const cardRect = card.getBoundingClientRect();
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        const dropZoneRect = dropZone.getBoundingClientRect();
        
        // Calculate relative positions
        const startX = cardRect.left + cardRect.width / 2 - containerRect.left;
        const startY = cardRect.top + cardRect.height / 2 - containerRect.top;
        const endX = dropZoneRect.left + dropZoneRect.width / 2 - containerRect.left;
        const endY = dropZoneRect.top + dropZoneRect.height / 2 - containerRect.top;
        
        // Create SVG line element
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', startX);
        line.setAttribute('y1', startY);
        line.setAttribute('x2', endX);
        line.setAttribute('y2', endY);
        line.classList.add('connection-line');
        line.dataset.connection = `${card.dataset.word}-${dropZone.dataset.part}`;
        
        this.connectionLines.appendChild(line);
    }
    
    providePlacementFeedback(word, part) {
        // Provide immediate visual feedback when a card is placed
        const isCorrect = this.correctAnswers[word] === part;
        const dropZone = document.querySelector(`[data-part="${part}"]`);
        
        if (isCorrect) {
            dropZone.classList.add('correct');
            this.showTooltipMessage('Great job! That\'s correct!', 2000);
        } else {
            dropZone.classList.add('incorrect');
            this.showTooltipMessage('Try again! Think about what this part does.', 2000);
        }
        
        // Remove feedback classes after animation
        setTimeout(() => {
            dropZone.classList.remove('correct', 'incorrect');
        }, 2000);
    }
    
    checkAnswers() {
        // Check all placements and provide comprehensive feedback
        let correctCount = 0;
        const totalQuestions = Object.keys(this.correctAnswers).length;
        
        // Clear previous feedback
        this.clearAllFeedback();
        
        // Check each placement
        Object.keys(this.placements).forEach(part => {
            const placedWord = this.placements[part];
            const isCorrect = this.correctAnswers[placedWord] === part;
            const dropZone = document.querySelector(`[data-part="${part}"]`);
            const connectionLine = document.querySelector(`[data-connection="${placedWord}-${part}"]`);
            
            if (isCorrect) {
                correctCount++;
                dropZone.classList.add('correct');
                if (connectionLine) {
                    connectionLine.classList.add('correct');
                }
            } else {
                dropZone.classList.add('incorrect');
            }
        });
        
        // Provide overall feedback
        this.showOverallFeedback(correctCount, totalQuestions);
        
        // Disable check button temporarily
        this.checkButton.disabled = true;
        setTimeout(() => {
            this.checkButton.disabled = false;
        }, 3000);
    }
    
    showOverallFeedback(correct, total) {
        // Display comprehensive feedback based on performance
        let message, className;
        
        if (correct === total) {
            message = `🌸 Excellent! You got all ${total} correct! You understand how flower parts work together!`;
            className = 'success';
            this.celebrateSuccess();
        } else if (correct >= total * 0.7) {
            message = `🌱 Good work! You got ${correct} out of ${total} correct. Check the red ones and try again!`;
            className = 'partial';
        } else {
            message = `🌿 Keep trying! You got ${correct} out of ${total} correct. Remember: each part has a special job!`;
            className = 'error';
        }
        
        this.feedback.textContent = message;
        this.feedback.className = `feedback ${className}`;
    }
    
    celebrateSuccess() {
        // Add celebration animation for perfect score
        const wordCards = document.querySelectorAll('.word-card.placed');
        wordCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'bounce 0.6s ease';
                setTimeout(() => {
                    card.style.animation = '';
                }, 600);
            }, index * 200);
        });
    }
    
    resetActivity() {
        // Reset the entire activity to initial state
        this.placements = {};
        this.clearAllFeedback();
        
        // Reset all word cards
        this.wordCards.forEach(card => {
            this.resetCard(card);
        });
        
        // Clear all connection lines
        this.connectionLines.innerHTML = '';
        
        // Reset feedback
        this.feedback.textContent = '';
        this.feedback.className = 'feedback';
        
        // Re-enable check button
        this.checkButton.disabled = false;
        
        this.showTooltipMessage('Activity reset! Try again!', 2000);
    }
    
    resetCard(card) {
        // Reset a single card to its original state
        card.classList.remove('placed', 'dragging');
        card.style.position = '';
        card.style.left = '';
        card.style.top = '';
        card.style.zIndex = '';
        card.style.animation = '';
    }
    
    resetDraggedElement() {
        // Reset the currently dragged element
        if (this.draggedElement) {
            this.resetCard(this.draggedElement);
            this.draggedElement = null;
        }
    }
    
    clearAllFeedback() {
        // Clear all visual feedback indicators
        this.dropZones.forEach(zone => {
            zone.classList.remove('correct', 'incorrect', 'highlight');
        });
        
        const connectionLines = document.querySelectorAll('.connection-line');
        connectionLines.forEach(line => {
            line.classList.remove('correct');
        });
    }
    
    clearHighlights() {
        // Clear drag-over highlights
        this.dropZones.forEach(zone => {
            zone.classList.remove('highlight');
        });
    }
    
    highlightDropZone(element) {
        // Highlight drop zone during drag operation
        this.clearHighlights();
        const dropZone = element?.closest('.drop-zone');
        if (dropZone) {
            dropZone.classList.add('highlight');
        }
    }
    
    // Tooltip functionality
    showTooltip(e) {
        const title = e.target.getAttribute('title');
        if (title) {
            this.tooltip.textContent = title;
            this.tooltip.classList.add('show');
            e.target.removeAttribute('title');
            e.target.dataset.originalTitle = title;
        }
    }
    
    hideTooltip(e) {
        this.tooltip.classList.remove('show');
        if (e.target.dataset.originalTitle) {
            e.target.setAttribute('title', e.target.dataset.originalTitle);
        }
    }
    
    moveTooltip(e) {
        const rect = document.querySelector('.container').getBoundingClientRect();
        this.tooltip.style.left = (e.clientX - rect.left) + 'px';
        this.tooltip.style.top = (e.clientY - rect.top - 40) + 'px';
    }
    
    showTooltipMessage(message, duration = 3000) {
        // Show a temporary message in the center
        const tempTooltip = document.createElement('div');
        tempTooltip.className = 'tooltip show';
        tempTooltip.textContent = message;
        tempTooltip.style.left = '50%';
        tempTooltip.style.top = '50%';
        tempTooltip.style.transform = 'translate(-50%, -50%)';
        tempTooltip.style.background = 'rgba(76, 175, 80, 0.9)';
        
        document.querySelector('.container').appendChild(tempTooltip);
        
        setTimeout(() => {
            tempTooltip.remove();
        }, duration);
    }
}

// Initialize the interactive when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FlowerConceptMap();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Recalculate connection lines if needed
    const connectionLines = document.querySelectorAll('.connection-line');
    connectionLines.forEach(line => {
        // Could implement line position recalculation here if needed
    });
});