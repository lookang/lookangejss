// Interactive Subtraction with Regrouping - Step by step learning tool
// This script manages the progression through subtraction steps with visual feedback

class SubtractionTutor {
    constructor() {
        // Initialize step tracking and DOM elements
        this.currentStep = 0;
        this.totalSteps = 5;
        this.initializeElements();
        this.setupEventListeners();
        this.resetToInitialState();
    }

    // Get references to all DOM elements we'll be manipulating
    initializeElements() {
        this.stepText = document.getElementById('step-text');
        this.progressFill = document.getElementById('progress-fill');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.explanationText = document.getElementById('explanation-text');
        
        // Number elements
        this.tensMinuend = document.getElementById('tens-minuend');
        this.onesMinuend = document.getElementById('ones-minuend');
        this.tensCrossed = document.getElementById('tens-crossed');
        this.tensBorrowed = document.getElementById('tens-borrowed');
        this.onesBorrowed = document.getElementById('ones-borrowed');
        this.tensAnswer = document.getElementById('tens-answer');
        this.onesAnswer = document.getElementById('ones-answer');
        
        // Container elements for highlighting
        this.tensContainer = document.querySelector('.tens-place');
        this.onesContainer = document.querySelector('.ones-place');
    }

    // Set up button click event listeners
    setupEventListeners() {
        this.nextBtn.addEventListener('click', () => this.nextStep());
        this.prevBtn.addEventListener('click', () => this.previousStep());
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    // Reset the interactive to initial state
    resetToInitialState() {
        this.currentStep = 0;
        
        // Hide all step-specific elements
        this.tensCrossed.classList.remove('show-crossed');
        this.tensBorrowed.classList.remove('show-borrowed');
        this.onesBorrowed.classList.remove('show-borrowed');
        this.tensAnswer.classList.remove('show-answer');
        this.onesAnswer.classList.remove('show-answer');
        
        // Remove highlights
        this.removeAllHighlights();
        
        // Update UI
        this.updateStepDisplay();
        this.updateButtons();
    }

    // Move to the next step in the tutorial
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.executeStep();
            this.updateStepDisplay();
            this.updateButtons();
        }
    }

    // Move to the previous step
    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.executeStep();
            this.updateStepDisplay();
            this.updateButtons();
        }
    }

    // Reset to beginning
    reset() {
        this.resetToInitialState();
    }

    // Execute the current step's actions
    executeStep() {
        // Remove previous highlights
        this.removeAllHighlights();
        
        switch(this.currentStep) {
            case 0:
                // Initial state - show the problem setup
                this.resetToInitialState();
                break;
                
            case 1:
                // Step 1: Identify the problem - highlight ones column
                this.highlightElement(this.onesContainer);
                break;
                
            case 2:
                // Step 2: Show borrowing from tens - cross out 4, show 3
                this.tensCrossed.classList.add('show-crossed');
                this.tensBorrowed.classList.add('show-borrowed');
                this.highlightElement(this.tensContainer);
                break;
                
            case 3:
                // Step 3: Show regrouping in ones - 0 becomes 10
                this.onesBorrowed.classList.add('show-borrowed');
                this.highlightElement(this.onesContainer);
                break;
                
            case 4:
                // Step 4: Show subtraction in ones column (10 - 7 = 3)
                this.onesAnswer.classList.add('show-answer');
                this.highlightElement(this.onesContainer);
                break;
                
            case 5:
                // Step 5: Show subtraction in tens column (3 - 2 = 1)
                this.tensAnswer.classList.add('show-answer');
                this.highlightElement(this.tensContainer);
                break;
        }
    }

    // Add highlight effect to an element
    highlightElement(element) {
        element.classList.add('highlight');
        // Auto-remove highlight after animation
        setTimeout(() => {
            element.classList.remove('highlight');
        }, 2000);
    }

    // Remove all highlight effects
    removeAllHighlights() {
        document.querySelectorAll('.highlight').forEach(el => {
            el.classList.remove('highlight');
        });
    }

    // Update the step indicator and explanation text
    updateStepDisplay() {
        const steps = [
            {
                title: "Step 1: Set up the problem",
                explanation: "We need to subtract 27 from 40. Let's work through this step by step!"
            },
            {
                title: "Step 2: Check the ones column",
                explanation: "We can't subtract 7 from 0, so we need to borrow from the tens column."
            },
            {
                title: "Step 3: Borrow from tens",
                explanation: "We borrow 1 ten from 4 tens, leaving 3 tens. Cross out the 4 and write 3."
            },
            {
                title: "Step 4: Regroup in ones",
                explanation: "The borrowed 1 ten becomes 10 ones. Now we have 10 ones instead of 0."
            },
            {
                title: "Step 5: Subtract in ones",
                explanation: "Now we can subtract: 10 - 7 = 3. Write 3 in the ones place of the answer."
            },
            {
                title: "Step 6: Subtract in tens",
                explanation: "Finally, subtract in the tens column: 3 - 2 = 1. The answer is 13!"
            }
        ];

        const currentStepData = steps[this.currentStep];
        this.stepText.textContent = currentStepData.title;
        this.explanationText.textContent = currentStepData.explanation;
        
        // Update progress bar
        const progress = (this.currentStep / this.totalSteps) * 100;
        this.progressFill.style.width = `${progress}%`;
    }

    // Update button states based on current step
    updateButtons() {
        this.prevBtn.disabled = this.currentStep === 0;
        this.nextBtn.disabled = this.currentStep === this.totalSteps;
        
        // Change button text for final step
        if (this.currentStep === this.totalSteps) {
            this.nextBtn.textContent = 'Complete!';
        } else {
            this.nextBtn.textContent = 'Next →';
        }
    }
}

// Initialize the subtraction tutor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're in an iframe and adjust height accordingly
    if (window.self !== window.top) {
        document.body.style.height = '450px';
    }
    
    // Create the interactive subtraction tutor
    const tutor = new SubtractionTutor();
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                if (!tutor.nextBtn.disabled) {
                    tutor.nextStep();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (!tutor.prevBtn.disabled) {
                    tutor.previousStep();
                }
                break;
            case 'r':
            case 'R':
                e.preventDefault();
                tutor.reset();
                break;
        }
    });
    
    // Add touch gesture support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && !tutor.nextBtn.disabled) {
                // Swipe left - next step
                tutor.nextStep();
            } else if (diff < 0 && !tutor.prevBtn.disabled) {
                // Swipe right - previous step
                tutor.previousStep();
            }
        }
    }
    
    console.log('Interactive Subtraction with Regrouping loaded successfully');
});