// Blood Circulation Interactive Animation
// This script manages the animation of blood flow through the circulatory system

class BloodCirculationAnimation {
    constructor() {
        // Initialize DOM elements and animation state
        this.playBtn = document.getElementById('playBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.caption = document.getElementById('caption');
        this.tooltip = document.getElementById('tooltip');
        this.bloodCells = document.querySelectorAll('.blood-cell');
        this.heart = document.querySelector('.heart');
        
        // Animation state management
        this.isPlaying = false;
        this.currentStep = 0;
        this.animationInterval = null;
        
        // Educational content for each step of circulation
        this.circulationSteps = [
            {
                caption: "1. Deoxygenated blood from the body enters the right side of the heart",
                duration: 4000,
                highlight: 'right-heart'
            },
            {
                caption: "2. Right heart pumps deoxygenated blood to the lungs through pulmonary arteries",
                duration: 4000,
                highlight: 'pulmonary-artery'
            },
            {
                caption: "3. In the lungs, blood picks up oxygen and releases carbon dioxide",
                duration: 4000,
                highlight: 'lungs'
            },
            {
                caption: "4. Oxygenated blood returns to the left side of the heart via pulmonary veins",
                duration: 4000,
                highlight: 'pulmonary-vein'
            },
            {
                caption: "5. Left heart pumps oxygenated blood to the body through the aorta",
                duration: 4000,
                highlight: 'aorta'
            },
            {
                caption: "6. Body organs use oxygen and nutrients, blood becomes deoxygenated",
                duration: 4000,
                highlight: 'body-organs'
            },
            {
                caption: "7. Deoxygenated blood returns to the heart through veins, completing the cycle",
                duration: 4000,
                highlight: 'vena-cava'
            }
        ];
        
        // Initialize the interactive
        this.init();
    }
    
    init() {
        // Set up event listeners for user interactions
        this.playBtn.addEventListener('click', () => this.toggleAnimation());
        this.resetBtn.addEventListener('click', () => this.resetAnimation());
        
        // Add hover tooltips for educational elements
        this.setupTooltips();
        
        // Add touch support for mobile devices
        this.setupTouchSupport();
        
        // Initialize caption
        this.updateCaption("Click 'Start Animation' to see how blood flows through your circulatory system");
    }
    
    setupTooltips() {
        // Educational tooltips for different parts of the circulatory system
        const tooltipElements = [
            { selector: '.lungs', text: 'Lungs: Where blood picks up oxygen and releases carbon dioxide' },
            { selector: '.heart', text: 'Heart: Four-chambered pump that circulates blood throughout the body' },
            { selector: '.body-organs', text: 'Body Organs: Tissues that receive oxygen and nutrients from blood' },
            { selector: '.pulmonary-artery', text: 'Pulmonary Artery: Carries deoxygenated blood from heart to lungs' },
            { selector: '.pulmonary-vein', text: 'Pulmonary Vein: Carries oxygenated blood from lungs to heart' },
            { selector: '.aorta', text: 'Aorta: Main artery carrying oxygenated blood to the body' },
            { selector: '.vena-cava', text: 'Vena Cava: Large vein returning deoxygenated blood to the heart' }
        ];
        
        tooltipElements.forEach(item => {
            const element = document.querySelector(item.selector);
            if (element) {
                element.addEventListener('mouseenter', (e) => this.showTooltip(e, item.text));
                element.addEventListener('mouseleave', () => this.hideTooltip());
                element.addEventListener('mousemove', (e) => this.moveTooltip(e));
            }
        });
    }
    
    setupTouchSupport() {
        // Add touch event listeners for mobile interaction
        document.addEventListener('touchstart', (e) => {
            // Handle touch interactions for educational elements
            const target = e.target.closest('.lungs, .heart, .body-organs, .vessel');
            if (target) {
                this.handleTouchInteraction(target);
            }
        });
    }
    
    handleTouchInteraction(element) {
        // Provide haptic feedback and educational information on touch
        if (navigator.vibrate) {
            navigator.vibrate(50); // Brief vibration for feedback
        }
        
        // Show relevant educational information
        const tooltipText = this.getTooltipText(element);
        if (tooltipText) {
            this.updateCaption(tooltipText);
            setTimeout(() => {
                if (!this.isPlaying) {
                    this.updateCaption("Click 'Start Animation' to see how blood flows through your circulatory system");
                }
            }, 3000);
        }
    }
    
    getTooltipText(element) {
        // Return appropriate educational text based on element
        if (element.classList.contains('lungs')) {
            return 'Lungs: Where gas exchange occurs - oxygen in, carbon dioxide out';
        } else if (element.classList.contains('heart')) {
            return 'Heart: The muscular pump with four chambers that drives circulation';
        } else if (element.classList.contains('body-organs')) {
            return 'Body Organs: All tissues that need oxygen and nutrients to function';
        }
        return null;
    }
    
    toggleAnimation() {
        if (this.isPlaying) {
            this.pauseAnimation();
        } else {
            this.startAnimation();
        }
    }
    
    startAnimation() {
        // Begin the blood circulation animation
        this.isPlaying = true;
        this.playBtn.textContent = 'Pause';
        this.playBtn.classList.add('playing');
        
        // Start heart beating animation
        this.heart.classList.add('beating');
        
        // Show blood cells
        this.bloodCells.forEach(cell => cell.classList.add('active'));
        
        // Start the educational step sequence
        this.startStepSequence();
    }
    
    pauseAnimation() {
        // Pause the animation
        this.isPlaying = false;
        this.playBtn.textContent = 'Resume';
        this.playBtn.classList.remove('playing');
        
        // Pause heart animation
        this.heart.classList.remove('beating');
        
        // Clear any running intervals
        if (this.animationInterval) {
            clearTimeout(this.animationInterval);
        }
        
        this.updateCaption('Animation paused - click Resume to continue');
    }
    
    resetAnimation() {
        // Reset animation to initial state
        this.isPlaying = false;
        this.currentStep = 0;
        this.playBtn.textContent = 'Start Animation';
        this.playBtn.classList.remove('playing');
        
        // Stop heart animation
        this.heart.classList.remove('beating');
        
        // Hide blood cells
        this.bloodCells.forEach(cell => cell.classList.remove('active'));
        
        // Clear intervals
        if (this.animationInterval) {
            clearTimeout(this.animationInterval);
        }
        
        // Reset caption
        this.updateCaption("Click 'Start Animation' to see how blood flows through your circulatory system");
        
        // Remove any highlights
        this.removeAllHighlights();
    }
    
    startStepSequence() {
        if (!this.isPlaying) return;
        
        // Execute current step
        const step = this.circulationSteps[this.currentStep];
        this.updateCaption(step.caption);
        this.highlightElement(step.highlight);
        
        // Schedule next step
        this.animationInterval = setTimeout(() => {
            this.currentStep = (this.currentStep + 1) % this.circulationSteps.length;
            this.startStepSequence();
        }, step.duration);
    }
    
    highlightElement(elementClass) {
        // Remove previous highlights
        this.removeAllHighlights();
        
        // Add highlight to current element
        const element = document.querySelector(`.${elementClass}`);
        if (element) {
            element.style.filter = 'drop-shadow(0 0 10px #ffff00) brightness(1.2)';
            element.style.transform = 'scale(1.05)';
            element.style.transition = 'all 0.5s ease';
        }
    }
    
    removeAllHighlights() {
        // Remove highlights from all elements
        const highlightableElements = document.querySelectorAll('.lungs, .heart, .body-organs, .vessel');
        highlightableElements.forEach(element => {
            element.style.filter = '';
            element.style.transform = '';
        });
    }
    
    updateCaption(text) {
        // Update the educational caption with smooth transition
        this.caption.style.opacity = '0';
        setTimeout(() => {
            this.caption.textContent = text;
            this.caption.style.opacity = '1';
        }, 150);
    }
    
    showTooltip(event, text) {
        // Display educational tooltip
        this.tooltip.textContent = text;
        this.tooltip.classList.add('show');
        this.moveTooltip(event);
    }
    
    moveTooltip(event) {
        // Position tooltip near cursor/touch point
        const rect = document.querySelector('.container').getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        this.tooltip.style.left = `${x + 10}px`;
        this.tooltip.style.top = `${y - 40}px`;
    }
    
    hideTooltip() {
        // Hide tooltip
        this.tooltip.classList.remove('show');
    }
}

// Initialize the blood circulation animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BloodCirculationAnimation();
});

// Handle visibility changes to pause animation when tab is not active
document.addEventListener('visibilitychange', () => {
    const animation = window.bloodCirculationAnimation;
    if (document.hidden && animation && animation.isPlaying) {
        animation.pauseAnimation();
    }
});

// Accessibility: Handle keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('control-btn')) {
            event.preventDefault();
            activeElement.click();
        }
    }
});