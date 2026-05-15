/**
 * Blood Circulation Animation Interactive
 * Designed for Secondary 4 students to understand blood circulation
 * Implements cognitive load theory and multimedia learning principles
 */

class BloodCirculationAnimation {
    constructor() {
        // Initialize DOM elements
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.infoPanel = document.getElementById('infoPanel');
        this.tooltip = document.getElementById('tooltip');
        this.container = document.querySelector('.container');
        
        // Animation state management
        this.isPlaying = false;
        this.isPaused = false;
        this.currentStep = 0;
        this.stepTimer = null;
        this.animationElements = [];
        
        // Initialize the interactive
        this.init();
    }
    
    init() {
        // Detect if running in iframe for responsive design
        this.detectIframe();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize animation elements
        this.setupAnimationElements();
        
        // Set initial state
        this.resetAnimation();
        
        // Add accessibility features
        this.setupAccessibility();
        
        console.log('Blood Circulation Animation initialized');
    }
    
    /**
     * Detect if the content is running in an iframe
     * Adjusts layout accordingly for optimal viewing
     */
    detectIframe() {
        try {
            if (window.self !== window.top) {
                document.body.classList.add('in-iframe');
            }
        } catch (e) {
            document.body.classList.add('in-iframe');
        }
    }
    
    /**
     * Set up all event listeners for interactive elements
     * Supports both mouse and touch interactions
     */
    setupEventListeners() {
        // Control button events
        this.startBtn.addEventListener('click', () => this.startAnimation());
        this.pauseBtn.addEventListener('click', () => this.pauseAnimation());
        this.resetBtn.addEventListener('click', () => this.resetAnimation());
        
        // Touch support for mobile devices
        this.startBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startAnimation();
        });
        
        this.pauseBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.pauseAnimation();
        });
        
        this.resetBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.resetAnimation();
        });
        
        // Tooltip functionality for educational content
        this.setupTooltips();
        
        // Keyboard navigation support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    /**
     * Set up tooltip system for educational information
     * Follows Mayer's principles of multimedia learning
     */
    setupTooltips() {
        const tooltipElements = [
            { selector: '.heart-group', text: 'The heart pumps blood throughout the body. It has four chambers that work together.' },
            { selector: '.lungs-group', text: 'The lungs add oxygen to the blood and remove carbon dioxide.' },
            { selector: '.body-group', text: 'Body tissues use oxygen from the blood and produce carbon dioxide as waste.' },
            { selector: '#to-lungs', text: 'Deoxygenated blood flows from heart to lungs (Pulmonary Artery)' },
            { selector: '#from-lungs', text: 'Oxygenated blood flows from lungs to heart (Pulmonary Vein)' },
            { selector: '#to-body', text: 'Oxygenated blood flows from heart to body (Aorta)' },
            { selector: '#from-body', text: 'Deoxygenated blood flows from body to heart (Vena Cava)' }
        ];
        
        tooltipElements.forEach(item => {
            const element = document.querySelector(item.selector);
            if (element) {
                element.addEventListener('mouseenter', (e) => this.showTooltip(e, item.text));
                element.addEventListener('mouseleave', () => this.hideTooltip());
                element.addEventListener('mousemove', (e) => this.updateTooltipPosition(e));
            }
        });
    }
    
    /**
     * Initialize animation elements and their properties
     */
    setupAnimationElements() {
        this.animationElements = document.querySelectorAll('.blood-cell animateMotion');
        this.steps = [
            { id: 'step1', description: 'Deoxygenated blood returns to heart', duration: 1000 },
            { id: 'step2', description: 'Heart pumps blood to lungs', duration: 1000 },
            { id: 'step3', description: 'Blood picks up oxygen in lungs', duration: 1000 },
            { id: 'step4', description: 'Oxygenated blood returns to heart', duration: 1000 },
            { id: 'step5', description: 'Heart pumps oxygenated blood to body', duration: 1000 }
        ];
    }
    
    /**
     * Start the blood circulation animation
     * Implements step-by-step learning approach
     */
    startAnimation() {
        if (this.isPaused) {
            this.resumeAnimation();
            return;
        }
        
        this.isPlaying = true;
        this.isPaused = false;
        this.currentStep = 0;
        
        // Update UI state
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.resetBtn.disabled = false;
        
        // Remove paused and stopped classes
        this.container.classList.remove('paused', 'stopped');
        
        // Start the step-by-step animation
        this.playNextStep();
        
        // Provide audio feedback (if supported)
        this.playAudioFeedback('start');
        
        console.log('Animation started');
    }
    
    /**
     * Pause the animation while maintaining current state
     */
    pauseAnimation() {
        if (!this.isPlaying) return;
        
        this.isPaused = true;
        this.container.classList.add('paused');
        
        // Update UI state
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.startBtn.textContent = 'Resume';
        
        // Clear step timer
        if (this.stepTimer) {
            clearTimeout(this.stepTimer);
        }
        
        console.log('Animation paused');
    }
    
    /**
     * Resume paused animation
     */
    resumeAnimation() {
        this.isPaused = false;
        this.container.classList.remove('paused');
        
        // Update UI state
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.startBtn.textContent = 'Start Animation';
        
        // Continue from current step
        this.playNextStep();
        
        console.log('Animation resumed');
    }
    
    /**
     * Reset animation to initial state
     */
    resetAnimation() {
        this.isPlaying = false;
        this.isPaused = false;
        this.currentStep = 0;
        
        // Clear any running timers
        if (this.stepTimer) {
            clearTimeout(this.stepTimer);
        }
        
        // Update UI state
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.resetBtn.disabled = true;
        this.startBtn.textContent = 'Start Animation';
        
        // Reset visual state
        this.container.classList.add('stopped');
        this.container.classList.remove('paused');
        
        // Clear active steps
        document.querySelectorAll('.step.active').forEach(step => {
            step.classList.remove('active');
        });
        
        console.log('Animation reset');
    }
    
    /**
     * Play the next step in the circulation sequence
     * Implements chunking principle for cognitive load management
     */
    playNextStep() {
        if (!this.isPlaying || this.isPaused) return;
        
        if (this.currentStep >= this.steps.length) {
            // Animation complete, restart
            this.currentStep = 0;
        }
        
        const step = this.steps[this.currentStep];
        
        // Highlight current step in info panel
        this.highlightStep(step.id);
        
        // Schedule next step
        this.stepTimer = setTimeout(() => {
            this.currentStep++;
            this.playNextStep();
        }, step.duration);
    }
    
    /**
     * Highlight the current step in the information panel
     * Provides visual feedback for learning progression
     */
    highlightStep(stepId) {
        // Remove previous highlights
        document.querySelectorAll('.step.active').forEach(step => {
            step.classList.remove('active');
        });
        
        // Highlight current step
        const currentStepElement = document.getElementById(stepId);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
            
            // Scroll into view if needed
            currentStepElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }
    
    /**
     * Show tooltip with educational information
     * Implements contiguity principle - information appears when needed
     */
    showTooltip(event, text) {
        this.tooltip.textContent = text;
        this.tooltip.classList.add('show');
        this.updateTooltipPosition(event);
    }
    
    /**
     * Hide tooltip
     */
    hideTooltip() {
        this.tooltip.classList.remove('show');
    }
    
    /**
     * Update tooltip position to follow mouse
     */
    updateTooltipPosition(event) {
        const rect = this.container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Position tooltip to avoid going off-screen
        let tooltipX = x + 10;
        let tooltipY = y - 30;
        
        // Adjust if tooltip would go off-screen
        if (tooltipX + 200 > rect.width) {
            tooltipX = x - 210;
        }
        if (tooltipY < 0) {
            tooltipY = y + 20;
        }
        
        this.tooltip.style.left = tooltipX + 'px';
        this.tooltip.style.top = tooltipY + 'px';
    }
    
    /**
     * Handle keyboard navigation for accessibility
     */
    handleKeyboard(event) {
        switch (event.key) {
            case ' ':
            case 'Enter':
                event.preventDefault();
                if (!this.isPlaying) {
                    this.startAnimation();
                } else if (!this.isPaused) {
                    this.pauseAnimation();
                } else {
                    this.resumeAnimation();
                }
                break;
            case 'Escape':
                event.preventDefault();
                this.resetAnimation();
                break;
        }
    }
    
    /**
     * Set up accessibility features
     * Ensures the interactive is usable by all students
     */
    setupAccessibility() {
        // Add ARIA labels
        this.startBtn.setAttribute('aria-label', 'Start blood circulation animation');
        this.pauseBtn.setAttribute('aria-label', 'Pause animation');
        this.resetBtn.setAttribute('aria-label', 'Reset animation to beginning');
        
        // Add keyboard navigation hints
        const keyboardHint = document.createElement('div');
        keyboardHint.className = 'keyboard-hint';
        keyboardHint.textContent = 'Use Space/Enter to start/pause, Escape to reset';
        keyboardHint.style.cssText = `
            position: absolute;
            bottom: 5px;
            right: 5px;
            font-size: 10px;
            color: #666;
            opacity: 0.7;
        `;
        this.container.appendChild(keyboardHint);
        
        // Announce animation state changes for screen readers
        this.announcer = document.createElement('div');
        this.announcer.setAttribute('aria-live', 'polite');
        this.announcer.setAttribute('aria-atomic', 'true');
        this.announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(this.announcer);
    }
    
    /**
     * Announce state changes for screen readers
     */
    announceStateChange(message) {
        if (this.announcer) {
            this.announcer.textContent = message;
        }
    }
    
    /**
     * Play audio feedback for user actions (if supported)
     */
    playAudioFeedback(action) {
        // Simple audio feedback using Web Audio API (if available)
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Different tones for different actions
                switch (action) {
                    case 'start':
                        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                        break;
                    case 'pause':
                        oscillator.frequency.setValueAtTime(330, audioContext.currentTime);
                        break;
                    case 'reset':
                        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
                        break;
                }
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
            } catch (e) {
                // Audio feedback not available, continue silently
                console.log('Audio feedback not available');
            }
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    
    // Initialize the blood circulation animation
    const bloodCirculation = new BloodCirculationAnimation();
    
    // Make it globally available for debugging
    window.bloodCirculation = bloodCirculation;
    
    console.log('Blood Circulation Interactive loaded successfully');
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust layout if needed
    const container = document.querySelector('.container');
    if (container) {
        // Force reflow to ensure proper sizing
        container.style.display = 'none';
        container.offsetHeight; // Trigger reflow
        container.style.display = 'flex';
    }
});

// Handle visibility change to pause animation when tab is not active
document.addEventListener('visibilitychange', () => {
    if (window.bloodCirculation) {
        if (document.hidden && window.bloodCirculation.isPlaying && !window.bloodCirculation.isPaused) {
            window.bloodCirculation.pauseAnimation();
        }
    }
});