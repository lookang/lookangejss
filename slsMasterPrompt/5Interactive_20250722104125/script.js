// Interactive fraction addition step-by-step solver
// Manages step navigation and tooltip display

let currentStep = 1;
const totalSteps = 4;

// Initialize the interactive when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateStepDisplay();
    updateNavigationButtons();
});

// Navigate to the next step
function nextStep() {
    if (currentStep < totalSteps) {
        // Hide current step with fade out effect
        const currentStepElement = document.getElementById(`step${currentStep}`);
        currentStepElement.classList.remove('active');
        
        // Move to next step
        currentStep++;
        
        // Show next step with fade in effect
        setTimeout(() => {
            const nextStepElement = document.getElementById(`step${currentStep}`);
            nextStepElement.classList.add('active');
            updateStepDisplay();
            updateNavigationButtons();
        }, 100);
    }
}

// Navigate to the previous step
function previousStep() {
    if (currentStep > 1) {
        // Hide current step
        const currentStepElement = document.getElementById(`step${currentStep}`);
        currentStepElement.classList.remove('active');
        
        // Move to previous step
        currentStep--;
        
        // Show previous step
        setTimeout(() => {
            const prevStepElement = document.getElementById(`step${currentStep}`);
            prevStepElement.classList.add('active');
            updateStepDisplay();
            updateNavigationButtons();
        }, 100);
    }
}

// Reset to the first step
function resetSteps() {
    // Hide current step
    const currentStepElement = document.getElementById(`step${currentStep}`);
    currentStepElement.classList.remove('active');
    
    // Reset to step 1
    currentStep = 1;
    
    // Show first step
    setTimeout(() => {
        const firstStepElement = document.getElementById(`step${currentStep}`);
        firstStepElement.classList.add('active');
        updateStepDisplay();
        updateNavigationButtons();
    }, 100);
}

// Update the step indicator display
function updateStepDisplay() {
    const stepIndicator = document.getElementById('stepIndicator');
    stepIndicator.textContent = `Step ${currentStep} of ${totalSteps}`;
}

// Update navigation button states
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Disable previous button on first step
    prevBtn.disabled = (currentStep === 1);
    
    // Disable next button on last step
    nextBtn.disabled = (currentStep === totalSteps);
    
    // Update button text for last step
    if (currentStep === totalSteps) {
        nextBtn.textContent = 'Complete!';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

// Tooltip functionality for header information
function showTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.add('show');
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
        case ' ':
            event.preventDefault();
            nextStep();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            previousStep();
            break;
        case 'Home':
            event.preventDefault();
            resetSteps();
            break;
    }
});

// Touch gesture support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - go to previous step
            previousStep();
        } else {
            // Swipe left - go to next step
            nextStep();
        }
    }
}

// Auto-resize functionality for iframe detection
function checkIfInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// Adjust layout based on container environment
function adjustLayout() {
    const container = document.querySelector('.container');
    const isInIframe = checkIfInIframe();
    
    if (isInIframe) {
        container.style.height = '450px';
        container.classList.add('iframe-mode');
    } else {
        container.style.height = '90vh';
        container.classList.add('fullscreen-mode');
    }
}

// Initialize layout on load
window.addEventListener('load', adjustLayout);
window.addEventListener('resize', adjustLayout);