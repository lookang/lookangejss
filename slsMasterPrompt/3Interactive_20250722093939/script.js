// Singapore Government Branches Interactive Game
// This game teaches students about the three branches of government through drag-and-drop gameplay

class GovernmentBranchesGame {
    constructor() {
        // Game data - functions for each branch of government
        this.gameData = {
            legislature: [
                "Debate proposed laws",
                "Vote on bills",
                "Represent citizens"
            ],
            executive: [
                "Implement policies",
                "Enforce regulations", 
                "Manage government departments"
            ],
            judiciary: [
                "Interpret laws",
                "Resolve legal disputes",
                "Ensure justice"
            ]
        };
        
        // Game state tracking
        this.score = 0;
        this.streak = 0;
        this.placedFunctions = 0;
        this.totalFunctions = 9;
        this.hintsUsed = 0;
        this.draggedElement = null;
        
        // Initialize the game
        this.init();
    }
    
    init() {
        // Detect if running in iframe and adjust height accordingly
        this.detectIframeMode();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Create draggable function cards
        this.createFunctionCards();
        
        // Set up drag and drop functionality
        this.setupDragAndDrop();
        
        // Initialize tooltips
        this.setupTooltips();
        
        // Update display
        this.updateDisplay();
    }
    
    detectIframeMode() {
        // Check if running in iframe by comparing window objects
        try {
            if (window.self !== window.top) {
                document.body.classList.add('iframe-mode');
            }
        } catch (e) {
            // If we can't access parent window, assume iframe
            document.body.classList.add('iframe-mode');
        }
    }
    
    setupEventListeners() {
        // Button event listeners
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('check-btn').addEventListener('click', () => this.checkAnswers());
        document.getElementById('play-again-btn').addEventListener('click', () => this.resetGame());
        
        // Prevent default drag behavior on images
        document.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        });
    }
    
    createFunctionCards() {
        const container = document.getElementById('draggable-functions');
        const allFunctions = [];
        
        // Collect all functions from all branches
        Object.keys(this.gameData).forEach(branch => {
            this.gameData[branch].forEach(func => {
                allFunctions.push({ text: func, branch: branch });
            });
        });
        
        // Shuffle the functions for random order
        this.shuffleArray(allFunctions);
        
        // Create draggable cards
        allFunctions.forEach((funcData, index) => {
            const card = document.createElement('div');
            card.className = 'function-card';
            card.textContent = funcData.text;
            card.draggable = true;
            card.dataset.branch = funcData.branch;
            card.dataset.function = funcData.text;
            card.id = `function-${index}`;
            
            container.appendChild(card);
        });
    }
    
    setupDragAndDrop() {
        // Add drag event listeners to function cards
        document.querySelectorAll('.function-card').forEach(card => {
            card.addEventListener('dragstart', (e) => this.handleDragStart(e));
            card.addEventListener('dragend', (e) => this.handleDragEnd(e));
            
            // Touch support for mobile devices
            card.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
            card.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
            card.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        });
        
        // Add drop event listeners to branch zones
        document.querySelectorAll('.branch-zone').forEach(zone => {
            zone.addEventListener('dragover', (e) => this.handleDragOver(e));
            zone.addEventListener('drop', (e) => this.handleDrop(e));
            zone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        });
    }
    
    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        
        // Add tooltip functionality to branch zones
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltipText = e.target.dataset.tooltip;
                tooltip.textContent = tooltipText;
                tooltip.classList.add('show');
                this.positionTooltip(e, tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
            
            element.addEventListener('mousemove', (e) => {
                if (tooltip.classList.contains('show')) {
                    this.positionTooltip(e, tooltip);
                }
            });
        });
    }
    
    positionTooltip(event, tooltip) {
        const rect = document.getElementById('main-container').getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Position tooltip to stay within container bounds
        let left = x + 10;
        let top = y - tooltip.offsetHeight - 10;
        
        if (left + tooltip.offsetWidth > rect.width) {
            left = x - tooltip.offsetWidth - 10;
        }
        
        if (top < 0) {
            top = y + 10;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }
    
    // Drag and drop event handlers
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
        e.target.closest('.branch-zone').classList.add('drag-over');
    }
    
    handleDragLeave(e) {
        e.target.closest('.branch-zone').classList.remove('drag-over');
    }
    
    handleDrop(e) {
        e.preventDefault();
        const dropZone = e.target.closest('.branch-zone');
        dropZone.classList.remove('drag-over');
        
        if (this.draggedElement) {
            this.placeFunctionInBranch(this.draggedElement, dropZone);
        }
    }
    
    // Touch event handlers for mobile support
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
        element.style.left = (touch.clientX - 50) + 'px';
        element.style.top = (touch.clientY - 20) + 'px';
        element.style.zIndex = '1000';
        
        // Highlight drop zones
        const dropZone = this.getDropZoneUnderTouch(touch.clientX, touch.clientY);
        document.querySelectorAll('.branch-zone').forEach(zone => {
            zone.classList.remove('drag-over');
        });
        if (dropZone) {
            dropZone.classList.add('drag-over');
        }
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        if (!this.draggedElement) return;
        
        const touch = e.changedTouches[0];
        const dropZone = this.getDropZoneUnderTouch(touch.clientX, touch.clientY);
        
        // Reset element position
        this.draggedElement.style.position = '';
        this.draggedElement.style.left = '';
        this.draggedElement.style.top = '';
        this.draggedElement.style.zIndex = '';
        this.draggedElement.classList.remove('dragging');
        
        // Remove drag-over class from all zones
        document.querySelectorAll('.branch-zone').forEach(zone => {
            zone.classList.remove('drag-over');
        });
        
        if (dropZone) {
            this.placeFunctionInBranch(this.draggedElement, dropZone);
        }
        
        this.draggedElement = null;
    }
    
    getDropZoneUnderTouch(x, y) {
        const elements = document.elementsFromPoint(x, y);
        return elements.find(el => el.classList.contains('branch-zone'));
    }
    
    placeFunctionInBranch(functionCard, branchZone) {
        const functionBranch = functionCard.dataset.branch;
        const zoneBranch = branchZone.dataset.branch;
        const functionsContainer = branchZone.querySelector('.functions-container');
        
        // Check if placement is correct
        if (functionBranch === zoneBranch) {
            // Correct placement
            functionCard.classList.add('placed');
            functionCard.draggable = false;
            functionsContainer.appendChild(functionCard);
            
            this.score += 10;
            this.streak += 1;
            this.placedFunctions += 1;
            
            // Add success animation
            branchZone.classList.add('success-animation');
            setTimeout(() => {
                branchZone.classList.remove('success-animation');
            }, 600);
            
            // Bonus points for streak
            if (this.streak >= 3) {
                this.score += 5;
            }
            
        } else {
            // Incorrect placement
            functionCard.classList.add('incorrect');
            setTimeout(() => {
                functionCard.classList.remove('incorrect');
            }, 500);
            
            this.streak = 0;
            this.score = Math.max(0, this.score - 2);
        }
        
        this.updateDisplay();
        
        // Check if game is complete
        if (this.placedFunctions === this.totalFunctions) {
            setTimeout(() => this.showResults(), 500);
        }
    }
    
    showHint() {
        const unplacedCards = document.querySelectorAll('.function-card:not(.placed)');
        if (unplacedCards.length === 0) return;
        
        // Find a random unplaced card and highlight its correct branch
        const randomCard = unplacedCards[Math.floor(Math.random() * unplacedCards.length)];
        const correctBranch = randomCard.dataset.branch;
        const branchZone = document.querySelector(`[data-branch="${correctBranch}"]`);
        
        // Highlight the correct branch
        branchZone.style.border = '3px solid #4CAF50';
        branchZone.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        
        // Highlight the card
        randomCard.style.border = '2px solid #4CAF50';
        
        setTimeout(() => {
            branchZone.style.border = '';
            branchZone.style.backgroundColor = '';
            randomCard.style.border = '';
        }, 2000);
        
        this.hintsUsed += 1;
        this.score = Math.max(0, this.score - 3);
        this.updateDisplay();
    }
    
    checkAnswers() {
        let correctPlacements = 0;
        let totalPlaced = 0;
        
        document.querySelectorAll('.branch-zone').forEach(zone => {
            const branch = zone.dataset.branch;
            const placedCards = zone.querySelectorAll('.function-card.placed');
            
            placedCards.forEach(card => {
                totalPlaced++;
                if (card.dataset.branch === branch) {
                    correctPlacements++;
                }
            });
        });
        
        const accuracy = totalPlaced > 0 ? Math.round((correctPlacements / totalPlaced) * 100) : 0;
        
        // Show feedback
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = `Accuracy: ${accuracy}% (${correctPlacements}/${totalPlaced} correct)`;
        tooltip.style.left = '50%';
        tooltip.style.top = '50%';
        tooltip.style.transform = 'translate(-50%, -50%)';
        tooltip.classList.add('show');
        
        setTimeout(() => {
            tooltip.classList.remove('show');
            tooltip.style.transform = '';
        }, 3000);
    }
    
    showResults() {
        const resultsPanel = document.getElementById('results-panel');
        const resultsTitle = document.getElementById('results-title');
        const resultsDetails = document.getElementById('results-details');
        
        let title, details;
        const accuracy = Math.round((this.placedFunctions / this.totalFunctions) * 100);
        
        if (accuracy === 100) {
            title = "🎉 Excellent Work!";
            details = `Perfect score! You've mastered the three branches of Singapore's government. 
                      Score: ${this.score} | Hints used: ${this.hintsUsed}`;
        } else if (accuracy >= 70) {
            title = "👍 Good Job!";
            details = `You got ${accuracy}% correct! You have a solid understanding of government branches. 
                      Score: ${this.score} | Hints used: ${this.hintsUsed}`;
        } else {
            title = "📚 Keep Learning!";
            details = `You got ${accuracy}% correct. Review the functions of each branch and try again! 
                      Score: ${this.score} | Hints used: ${this.hintsUsed}`;
        }
        
        resultsTitle.textContent = title;
        resultsDetails.textContent = details;
        resultsPanel.classList.remove('hidden');
    }
    
    resetGame() {
        // Reset game state
        this.score = 0;
        this.streak = 0;
        this.placedFunctions = 0;
        this.hintsUsed = 0;
        
        // Hide results panel
        document.getElementById('results-panel').classList.add('hidden');
        
        // Clear all function containers
        document.querySelectorAll('.functions-container').forEach(container => {
            container.innerHTML = '';
        });
        
        // Reset and recreate function cards
        document.getElementById('draggable-functions').innerHTML = '';
        this.createFunctionCards();
        this.setupDragAndDrop();
        
        // Update display
        this.updateDisplay();
    }
    
    updateDisplay() {
        // Update progress bar
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        const progress = (this.placedFunctions / this.totalFunctions) * 100;
        
        progressFill.style.width = progress + '%';
        progressText.textContent = `${this.placedFunctions}/${this.totalFunctions} Functions Matched`;
        
        // Update score display
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('streak').textContent = `Streak: ${this.streak}`;
    }
    
    // Utility function to shuffle array
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GovernmentBranchesGame();
});