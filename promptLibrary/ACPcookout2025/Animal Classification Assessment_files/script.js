// Animal classification assessment JavaScript
// This script handles drag-and-drop functionality, progress tracking, and assessment logic

class AnimalClassificationAssessment {
    constructor() {
        // Animal data with emojis and correct classifications
        this.animals = [
            { name: 'Dog', emoji: '🐕', group: 'mammals' },
            { name: 'Cat', emoji: '🐱', group: 'mammals' },
            { name: 'Eagle', emoji: '🦅', group: 'birds' },
            { name: 'Penguin', emoji: '🐧', group: 'birds' },
            { name: 'Snake', emoji: '🐍', group: 'reptiles' },
            { name: 'Turtle', emoji: '🐢', group: 'reptiles' },
            { name: 'Frog', emoji: '🐸', group: 'amphibians' },
            { name: 'Salamander', emoji: '🦎', group: 'amphibians' },
            { name: 'Fish', emoji: '🐟', group: 'fish' },
            { name: 'Shark', emoji: '🦈', group: 'fish' },
            { name: 'Butterfly', emoji: '🦋', group: 'insects' },
            { name: 'Bee', emoji: '🐝', group: 'insects' }
        ];

        // Shuffle animals for random presentation
        this.shuffleArray(this.animals);
        
        // Assessment state
        this.placedAnimals = {};
        this.totalAnimals = this.animals.length;
        this.correctPlacements = 0;
        this.isSubmitted = false;
        
        // Initialize the assessment
        this.init();
    }

    // Initialize the assessment interface and event listeners
    init() {
        this.createAnimalCards();
        this.setupEventListeners();
        this.updateProgress();
        
        // Add touch support detection
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Shuffle array using Fisher-Yates algorithm
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Create animal cards dynamically
    createAnimalCards() {
        const container = document.getElementById('animalsContainer');
        container.innerHTML = '';

        this.animals.forEach((animal, index) => {
            const card = document.createElement('div');
            card.className = 'animal-card';
            card.draggable = true;
            card.dataset.animal = animal.name.toLowerCase();
            card.dataset.group = animal.group;
            card.id = `animal-${index}`;

            card.innerHTML = `
                <span class="animal-emoji">${animal.emoji}</span>
                <div class="animal-name">${animal.name}</div>
            `;

            container.appendChild(card);
        });
    }

    // Setup all event listeners for drag-and-drop and UI interactions
    setupEventListeners() {
        // Drag and drop for desktop
        this.setupDesktopDragDrop();
        
        // Touch events for mobile
        if (this.isTouchDevice) {
            this.setupTouchEvents();
        }

        // Button event listeners
        document.getElementById('submitBtn').addEventListener('click', () => this.submitAssessment());
        document.getElementById('tryAgainBtn').addEventListener('click', () => this.resetAssessment());
        document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());
        document.getElementById('closeModal').addEventListener('click', () => this.hideHelp());

        // Modal click outside to close
        document.getElementById('helpModal').addEventListener('click', (e) => {
            if (e.target.id === 'helpModal') {
                this.hideHelp();
            }
        });
    }

    // Setup desktop drag and drop events
    setupDesktopDragDrop() {
        // Animal card drag events
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('animal-card')) {
                e.target.classList.add('dragging');
                e.dataTransfer.setData('text/plain', e.target.id);
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('animal-card')) {
                e.target.classList.remove('dragging');
            }
        });

        // Drop zone events
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dropZone = e.target.closest('.drop-zone');
            if (dropZone) {
                e.dataTransfer.dropEffect = 'move';
                dropZone.parentElement.classList.add('drag-over');
            }
        });

        document.addEventListener('dragleave', (e) => {
            const dropZone = e.target.closest('.drop-zone');
            if (dropZone && !dropZone.contains(e.relatedTarget)) {
                dropZone.parentElement.classList.remove('drag-over');
            }
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            const dropZone = e.target.closest('.drop-zone');
            if (dropZone) {
                const animalId = e.dataTransfer.getData('text/plain');
                const animalCard = document.getElementById(animalId);
                if (animalCard) {
                    this.placeAnimal(animalCard, dropZone);
                }
                dropZone.parentElement.classList.remove('drag-over');
            }
        });
    }

    // Setup touch events for mobile devices
    setupTouchEvents() {
        let draggedElement = null;
        let touchOffset = { x: 0, y: 0 };

        document.addEventListener('touchstart', (e) => {
            const target = e.target.closest('.animal-card');
            if (target && !this.isSubmitted) {
                draggedElement = target;
                const touch = e.touches[0];
                const rect = target.getBoundingClientRect();
                touchOffset.x = touch.clientX - rect.left;
                touchOffset.y = touch.clientY - rect.top;
                
                target.classList.add('dragging');
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            if (draggedElement) {
                const touch = e.touches[0];
                draggedElement.style.position = 'fixed';
                draggedElement.style.left = (touch.clientX - touchOffset.x) + 'px';
                draggedElement.style.top = (touch.clientY - touchOffset.y) + 'px';
                draggedElement.style.zIndex = '1000';
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('touchend', (e) => {
            if (draggedElement) {
                const touch = e.changedTouches[0];
                const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
                const dropZone = elementBelow?.closest('.drop-zone');
                
                if (dropZone) {
                    this.placeAnimal(draggedElement, dropZone);
                }
                
                // Reset element position
                draggedElement.style.position = '';
                draggedElement.style.left = '';
                draggedElement.style.top = '';
                draggedElement.style.zIndex = '';
                draggedElement.classList.remove('dragging');
                draggedElement = null;
            }
        });
    }

    // Place animal in drop zone and handle feedback
    placeAnimal(animalCard, dropZone) {
        if (this.isSubmitted) return;

        const animalGroup = animalCard.dataset.group;
        const targetGroup = dropZone.id.replace('-zone', '');
        const animalName = animalCard.dataset.animal;

        // Remove from previous location
        if (this.placedAnimals[animalName]) {
            delete this.placedAnimals[animalName];
        }

        // Place in new location
        dropZone.appendChild(animalCard);
        this.placedAnimals[animalName] = targetGroup;

        // Visual feedback
        animalCard.classList.remove('correct', 'incorrect');
        
        if (animalGroup === targetGroup) {
            animalCard.classList.add('correct');
            this.playSuccessSound();
            this.showTooltip(animalCard, 'Correct! Well done!');
        } else {
            animalCard.classList.add('incorrect');
            this.showHint(animalCard, animalGroup);
        }

        // Update drop zone appearance
        this.updateDropZoneAppearance(dropZone);
        this.updateProgress();
        this.checkSubmitButton();
    }

    // Show helpful hints for incorrect placements
    showHint(animalCard, correctGroup) {
        const hints = {
            mammals: 'Think about animals that have fur and feed milk to their babies',
            birds: 'Think about animals that have feathers and can fly',
            reptiles: 'Think about animals that have scales and are cold-blooded',
            amphibians: 'Think about animals that can live both in water and on land',
            fish: 'Think about animals that live in water and breathe through gills',
            insects: 'Think about animals that have 6 legs and 3 body parts'
        };
        
        this.showTooltip(animalCard, hints[correctGroup] || 'Try again!');
    }

    // Show tooltip with custom message
    showTooltip(element, message) {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = message;
        tooltip.classList.add('show');
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 2000);
    }

    // Update drop zone visual appearance
    updateDropZoneAppearance(dropZone) {
        if (dropZone.children.length > 0) {
            dropZone.classList.add('has-animals');
        } else {
            dropZone.classList.remove('has-animals');
        }
    }

    // Update progress bar and text
    updateProgress() {
        const placedCount = Object.keys(this.placedAnimals).length;
        const percentage = Math.round((placedCount / this.totalAnimals) * 100);
        
        document.getElementById('progressFill').style.width = percentage + '%';
        document.getElementById('progressText').textContent = percentage + '% Complete';
    }

    // Enable/disable submit button based on completion
    checkSubmitButton() {
        const submitBtn = document.getElementById('submitBtn');
        const allPlaced = Object.keys(this.placedAnimals).length === this.totalAnimals;
        submitBtn.disabled = !allPlaced;
    }

    // Submit assessment and show results
    submitAssessment() {
        if (this.isSubmitted) return;
        
        this.isSubmitted = true;
        this.correctPlacements = 0;

        // Check all placements
        this.animals.forEach(animal => {
            const animalName = animal.name.toLowerCase();
            const placedGroup = this.placedAnimals[animalName];
            if (placedGroup === animal.group) {
                this.correctPlacements++;
            }
        });

        this.showResults();
        this.disableInteraction();
    }

    // Display assessment results with encouraging messages
    showResults() {
        const resultsDiv = document.getElementById('results');
        const scoreDisplay = document.getElementById('scoreDisplay');
        const encouragementMsg = document.getElementById('encouragementMsg');
        
        const percentage = Math.round((this.correctPlacements / this.totalAnimals) * 100);
        
        scoreDisplay.textContent = `You got ${this.correctPlacements} out of ${this.totalAnimals} correct! (${percentage}%)`;
        
        // Encouraging messages based on performance
        let message = '';
        if (percentage >= 90) {
            message = 'Excellent work! You really understand animal classification!';
        } else if (percentage >= 70) {
            message = 'Great effort! You have a good understanding of animal groups!';
        } else if (percentage >= 50) {
            message = 'Good try! Keep learning about animal characteristics!';
        } else {
            message = 'Keep practicing! Every scientist learns through trying!';
        }
        
        encouragementMsg.textContent = message;
        resultsDiv.style.display = 'block';
        
        // Show try again button
        document.getElementById('tryAgainBtn').style.display = 'inline-block';
        document.getElementById('submitBtn').style.display = 'none';
        
        // Celebration animation
        resultsDiv.classList.add('celebrate');
        this.playSuccessSound();
    }

    // Disable interaction after submission
    disableInteraction() {
        const animalCards = document.querySelectorAll('.animal-card');
        animalCards.forEach(card => {
            card.draggable = false;
            card.style.cursor = 'default';
        });
    }

    // Reset assessment for retry
    resetAssessment() {
        this.isSubmitted = false;
        this.placedAnimals = {};
        this.correctPlacements = 0;
        
        // Reset UI
        document.getElementById('results').style.display = 'none';
        document.getElementById('tryAgainBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'inline-block';
        document.getElementById('submitBtn').disabled = true;
        
        // Reset animal cards
        const animalCards = document.querySelectorAll('.animal-card');
        animalCards.forEach(card => {
            card.draggable = true;
            card.style.cursor = 'grab';
            card.classList.remove('correct', 'incorrect');
        });
        
        // Move all animals back to container
        const container = document.getElementById('animalsContainer');
        animalCards.forEach(card => {
            container.appendChild(card);
        });
        
        // Reset drop zones
        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach(zone => {
            zone.classList.remove('has-animals');
        });
        
        // Shuffle animals again
        this.shuffleArray(this.animals);
        this.createAnimalCards();
        this.setupEventListeners();
        this.updateProgress();
    }

    // Show help modal
    showHelp() {
        document.getElementById('helpModal').style.display = 'flex';
    }

    // Hide help modal
    hideHelp() {
        document.getElementById('helpModal').style.display = 'none';
    }

    // Play success sound (visual feedback since audio might not work in all environments)
    playSuccessSound() {
        // Create visual feedback instead of audio for better compatibility
        const body = document.body;
        body.style.backgroundColor = '#e8f5e8';
        setTimeout(() => {
            body.style.backgroundColor = '';
        }, 200);
    }
}

// Initialize the assessment when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimalClassificationAssessment();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip.classList.contains('show')) {
        tooltip.classList.remove('show');
    }
});