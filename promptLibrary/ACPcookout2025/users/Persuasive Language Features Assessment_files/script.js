// Assessment Interactive for Persuasive Language Features
// Implements drag and drop functionality with immediate feedback

class PersuasiveLanguageAssessment {
    constructor() {
        // Initialize assessment state
        this.totalItems = 9;
        this.correctPlacements = 0;
        this.attempts = 0;
        this.draggedElement = null;
        
        // Define correct answers for validation
        this.correctAnswers = {
            'connectors': ['1', '2', '7'], // Because, Since, therefore
            'rhetorical': ['3', '4', '8'], // Why should we waste..., Think about..., Isn't it time...
            'command': ['5', '6', '9']     // Act now!, Tell your teachers..., Support this...
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateProgress();
        this.updateScore();
        this.showWelcomeMessage();
    }

    setupEventListeners() {
        // Drag and drop for desktop
        this.setupDragAndDrop();
        
        // Touch events for mobile
        this.setupTouchEvents();
        
        // Button events
        document.getElementById('submitBtn').addEventListener('click', () => this.submitAnswer());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetAssessment());
        
        // Tooltip events for hints
        this.setupTooltips();
    }

    setupDragAndDrop() {
        const draggables = document.querySelectorAll('.draggable');
        const dropZones = document.querySelectorAll('.drop-area');

        // Make elements draggable
        draggables.forEach(draggable => {
            draggable.draggable = true;
            
            draggable.addEventListener('dragstart', (e) => {
                this.draggedElement = draggable;
                draggable.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', draggable.outerHTML);
            });

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
            });
        });

        // Setup drop zones
        dropZones.forEach(dropZone => {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                dropZone.parentElement.classList.add('drag-over');
            });

            dropZone.addEventListener('dragleave', (e) => {
                if (!dropZone.contains(e.relatedTarget)) {
                    dropZone.parentElement.classList.remove('drag-over');
                }
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.parentElement.classList.remove('drag-over');
                
                if (this.draggedElement) {
                    this.handleDrop(dropZone, this.draggedElement);
                }
            });
        });
    }

    setupTouchEvents() {
        // Touch-based drag and drop for mobile devices
        const draggables = document.querySelectorAll('.draggable');
        let touchElement = null;
        let touchOffset = { x: 0, y: 0 };

        draggables.forEach(draggable => {
            draggable.addEventListener('touchstart', (e) => {
                touchElement = draggable;
                const touch = e.touches[0];
                const rect = draggable.getBoundingClientRect();
                touchOffset.x = touch.clientX - rect.left;
                touchOffset.y = touch.clientY - rect.top;
                
                draggable.style.position = 'fixed';
                draggable.style.zIndex = '1000';
                draggable.classList.add('dragging');
                e.preventDefault();
            });

            draggable.addEventListener('touchmove', (e) => {
                if (touchElement === draggable) {
                    const touch = e.touches[0];
                    draggable.style.left = (touch.clientX - touchOffset.x) + 'px';
                    draggable.style.top = (touch.clientY - touchOffset.y) + 'px';
                    e.preventDefault();
                }
            });

            draggable.addEventListener('touchend', (e) => {
                if (touchElement === draggable) {
                    const touch = e.changedTouches[0];
                    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
                    const dropArea = elementBelow?.closest('.drop-area');
                    
                    if (dropArea) {
                        this.handleDrop(dropArea, draggable);
                    }
                    
                    // Reset positioning
                    draggable.style.position = '';
                    draggable.style.left = '';
                    draggable.style.top = '';
                    draggable.style.zIndex = '';
                    draggable.classList.remove('dragging');
                    touchElement = null;
                }
            });
        });
    }

    handleDrop(dropArea, draggedElement) {
        const dropCategory = dropArea.id.replace('-area', '');
        const elementCategory = draggedElement.dataset.category;
        const elementId = draggedElement.dataset.id;

        // Check if element is already placed correctly
        if (draggedElement.classList.contains('placed')) {
            this.showFeedback('This item is already correctly placed!', 'info');
            return;
        }

        // Move element to drop area
        const clonedElement = draggedElement.cloneNode(true);
        clonedElement.draggable = false;
        dropArea.appendChild(clonedElement);
        
        // Remove original element
        draggedElement.remove();

        // Check if placement is correct
        if (elementCategory === dropCategory) {
            clonedElement.classList.add('placed');
            dropArea.parentElement.classList.add('correct');
            this.correctPlacements++;
            this.showFeedback('Correct! Well done!', 'success');
            this.playSuccessSound();
        } else {
            clonedElement.classList.add('incorrect');
            dropArea.parentElement.classList.add('incorrect');
            this.showHint(elementCategory, dropCategory);
            this.playErrorSound();
            
            // Remove incorrect placement after delay
            setTimeout(() => {
                clonedElement.remove();
                dropArea.parentElement.classList.remove('incorrect');
                this.returnElementToText(elementId, elementCategory);
            }, 2000);
        }

        this.attempts++;
        this.updateProgress();
        this.updateScore();
        this.checkCompletion();
    }

    returnElementToText(elementId, category) {
        // Find the original position and recreate the element
        const textPassage = document.querySelector('.text-passage');
        const spans = textPassage.querySelectorAll('span');
        
        spans.forEach(span => {
            if (span.dataset.id === elementId) {
                const newElement = document.createElement('span');
                newElement.className = 'draggable';
                newElement.dataset.category = category;
                newElement.dataset.id = elementId;
                newElement.textContent = span.textContent;
                newElement.draggable = true;
                
                span.parentNode.replaceChild(newElement, span);
                this.setupSingleDragElement(newElement);
            }
        });
    }

    setupSingleDragElement(element) {
        // Setup drag events for a single element
        element.addEventListener('dragstart', (e) => {
            this.draggedElement = element;
            element.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
        });

        // Touch events
        element.addEventListener('touchstart', (e) => {
            // Touch implementation similar to setupTouchEvents
        });
    }

    showHint(correctCategory, attemptedCategory) {
        const hints = {
            'connectors': 'Look for words that connect ideas and show relationships (because, since, therefore)',
            'rhetorical': 'Look for questions that make readers think but don\'t expect answers',
            'command': 'Look for strong statements that tell readers what to do'
        };
        
        const hint = `Hint: This belongs in "${this.getCategoryDisplayName(correctCategory)}". ${hints[correctCategory]}`;
        this.showFeedback(hint, 'info');
    }

    getCategoryDisplayName(category) {
        const names = {
            'connectors': 'Connectors',
            'rhetorical': 'Rhetorical Questions',
            'command': 'Commands'
        };
        return names[category] || category;
    }

    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        
        // Add bounce animation for positive feedback
        if (type === 'success') {
            feedback.classList.add('bounce');
            setTimeout(() => feedback.classList.remove('bounce'), 600);
        }
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const percentage = (this.correctPlacements / this.totalItems) * 100;
        
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${this.correctPlacements}/${this.totalItems} completed`;
        
        // Enable submit button when all items are placed
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = this.correctPlacements < this.totalItems;
    }

    updateScore() {
        const scoreDisplay = document.getElementById('scoreDisplay');
        scoreDisplay.textContent = `Score: ${this.correctPlacements}/${this.totalItems}`;
    }

    checkCompletion() {
        if (this.correctPlacements === this.totalItems) {
            this.showFeedback('Excellent! You\'ve identified all the persuasive language features correctly!', 'success');
            this.celebrateCompletion();
        }
    }

    celebrateCompletion() {
        // Add celebration animation
        const container = document.querySelector('.container');
        container.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            container.style.animation = '';
        }, 600);
    }

    submitAnswer() {
        if (this.correctPlacements === this.totalItems) {
            const accuracy = ((this.correctPlacements / this.attempts) * 100).toFixed(1);
            this.showFeedback(`Assessment Complete! Final Score: ${this.correctPlacements}/${this.totalItems} (${accuracy}% accuracy)`, 'success');
        }
    }

    resetAssessment() {
        // Reset all state
        this.correctPlacements = 0;
        this.attempts = 0;
        
        // Clear all drop areas
        const dropAreas = document.querySelectorAll('.drop-area');
        dropAreas.forEach(area => {
            area.innerHTML = '';
            area.parentElement.classList.remove('correct', 'incorrect');
        });
        
        // Restore original draggable elements
        this.restoreOriginalElements();
        
        // Update UI
        this.updateProgress();
        this.updateScore();
        this.showFeedback('Assessment reset. Try again!', 'info');
    }

    restoreOriginalElements() {
        // Restore all draggable elements to their original positions
        const textPassage = document.querySelector('.text-passage');
        textPassage.innerHTML = `
            <p>Do you ever feel <strong>exhausted and thirsty</strong> after a tough PE lesson? Or perhaps you finish your lunch with no time left to join the long drink queue? <span class="draggable" data-category="connectors" data-id="1">Because</span> our current system is slow, our school canteen needs a modern solution!</p>
            
            <p>We should install a drinks vending machine immediately. <span class="draggable" data-category="connectors" data-id="2">Since</span> it can be stocked with only healthy, low-sugar options approved by the school, there's no worry about unhealthy choices. <span class="draggable" data-category="rhetorical" data-id="3">Why should we waste valuable recess time</span> standing in line when we could be playing?</p>
            
            <p>A machine gives us <strong>fast, easy access</strong> to water and healthy juices. This helps us stay <strong>hydrated</strong>, keeping our <strong>brains focused</strong> for afternoon lessons. <span class="draggable" data-category="rhetorical" data-id="4">Think about how much more energy you'd have!</span></p>
            
            <p><span class="draggable" data-category="command" data-id="5">Act now!</span> <span class="draggable" data-category="command" data-id="6">Tell your teachers and principal</span> that we need this smart, convenient upgrade for a healthier, happier school day!</p>
            
            <p>We must consider this solution <span class="draggable" data-category="connectors" data-id="7">therefore</span> it benefits everyone. <span class="draggable" data-category="rhetorical" data-id="8">Isn't it time for change?</span> <span class="draggable" data-category="command" data-id="9">Support this initiative today!</span></p>
        `;
        
        // Re-setup drag and drop for restored elements
        this.setupDragAndDrop();
        this.setupTouchEvents();
    }

    setupTooltips() {
        // Setup tooltips for category explanations
        const dropZones = document.querySelectorAll('.drop-zone');
        const tooltip = document.getElementById('hintTooltip');
        
        dropZones.forEach(zone => {
            zone.addEventListener('mouseenter', (e) => {
                const title = zone.getAttribute('title');
                if (title) {
                    tooltip.textContent = title;
                    tooltip.classList.add('show');
                    this.positionTooltip(tooltip, e);
                }
            });
            
            zone.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
            
            zone.addEventListener('mousemove', (e) => {
                if (tooltip.classList.contains('show')) {
                    this.positionTooltip(tooltip, e);
                }
            });
        });
    }

    positionTooltip(tooltip, event) {
        const rect = tooltip.getBoundingClientRect();
        const x = event.clientX - rect.width / 2;
        const y = event.clientY - rect.height - 10;
        
        tooltip.style.left = `${Math.max(10, Math.min(x, window.innerWidth - rect.width - 10))}px`;
        tooltip.style.top = `${Math.max(10, y)}px`;
    }

    showWelcomeMessage() {
        this.showFeedback('Drag the highlighted phrases to the correct categories. Hover over category titles for hints!', 'info');
    }

    // Audio feedback methods (silent implementation for iframe compatibility)
    playSuccessSound() {
        // Could implement Web Audio API for sound feedback
        // For now, using visual feedback only
    }

    playErrorSound() {
        // Could implement Web Audio API for sound feedback
        // For now, using visual feedback only
    }
}

// Initialize the assessment when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PersuasiveLanguageAssessment();
});

// Handle iframe height detection
function detectEnvironment() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// Adjust container height based on environment
if (detectEnvironment()) {
    document.body.style.height = '450px';
    document.querySelector('.container').style.height = '430px';
}