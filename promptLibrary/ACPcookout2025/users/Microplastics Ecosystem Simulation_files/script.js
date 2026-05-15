// Microplastics Ecosystem Simulation
// This script manages the interactive simulation of how microplastics affect marine ecosystems

class EcosystemSimulation {
    constructor() {
        // Initialize simulation state variables
        this.isRunning = false;
        this.isPaused = false;
        this.simulationInterval = null;
        this.timeStep = 0;
        
        // Ecosystem health metrics (0-100 scale)
        this.metrics = {
            marineHealth: 75,
            waterQuality: 70,
            plasticLevel: 25,
            biodiversity: 80
        };
        
        // Initial control values
        this.controls = {
            plasticInput: 20,
            cleanupEffort: 30,
            protectionLevel: 40
        };
        
        // Initialize the simulation
        this.init();
    }
    
    init() {
        // Get DOM elements for controls and displays
        this.elements = {
            // Control sliders
            plasticSlider: document.getElementById('plastic-input'),
            cleanupSlider: document.getElementById('cleanup-effort'),
            protectionSlider: document.getElementById('protection-level'),
            
            // Value displays
            plasticValue: document.getElementById('plastic-value'),
            cleanupValue: document.getElementById('cleanup-value'),
            protectionValue: document.getElementById('protection-value'),
            
            // Action buttons
            startBtn: document.getElementById('start-sim'),
            pauseBtn: document.getElementById('pause-sim'),
            resetBtn: document.getElementById('reset-sim'),
            
            // Progress bars
            marineHealthBar: document.getElementById('marine-health'),
            waterQualityBar: document.getElementById('water-quality'),
            plasticLevelBar: document.getElementById('plastic-level'),
            biodiversityBar: document.getElementById('biodiversity'),
            
            // Text displays
            marineHealthText: document.getElementById('marine-health-text'),
            waterQualityText: document.getElementById('water-quality-text'),
            plasticLevelText: document.getElementById('plastic-level-text'),
            biodiversityText: document.getElementById('biodiversity-text'),
            
            // Feedback
            feedbackMessage: document.getElementById('feedback-message'),
            
            // Ecosystem elements - Updated to work with new container structure
            fish: document.querySelectorAll('.fish'),
            turtle: document.querySelector('.turtle'),
            plasticParticles: document.querySelectorAll('.plastic-particle'),
            
            // Labels for ecosystem elements - Added for better understanding
            fishLabels: document.querySelectorAll('.fish-label'),
            turtleLabel: document.querySelector('.turtle-label'),
            plasticLabels: document.querySelectorAll('.plastic-label'),
            
            // Marine life and pollution containers - Added for coordinated animation
            marineContainers: document.querySelectorAll('.marine-life-container'),
            pollutionContainers: document.querySelectorAll('.pollution-container')
        };
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize display
        this.updateDisplay();
        this.updateEcosystemVisualization();
    }
    
    setupEventListeners() {
        // Slider event listeners with real-time updates
        this.elements.plasticSlider.addEventListener('input', (e) => {
            this.controls.plasticInput = parseInt(e.target.value);
            this.elements.plasticValue.textContent = e.target.value;
            if (this.isRunning) this.updateMetrics();
        });
        
        this.elements.cleanupSlider.addEventListener('input', (e) => {
            this.controls.cleanupEffort = parseInt(e.target.value);
            this.elements.cleanupValue.textContent = e.target.value;
            if (this.isRunning) this.updateMetrics();
        });
        
        this.elements.protectionSlider.addEventListener('input', (e) => {
            this.controls.protectionLevel = parseInt(e.target.value);
            this.elements.protectionValue.textContent = e.target.value;
            if (this.isRunning) this.updateMetrics();
        });
        
        // Button event listeners
        this.elements.startBtn.addEventListener('click', () => this.startSimulation());
        this.elements.pauseBtn.addEventListener('click', () => this.pauseSimulation());
        this.elements.resetBtn.addEventListener('click', () => this.resetSimulation());
        
        // Tooltip functionality for enhanced user experience
        this.setupTooltips();
    }
    
    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        const elementsWithTooltips = document.querySelectorAll('[title]');
        
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const title = e.target.getAttribute('title');
                if (title) {
                    tooltip.textContent = title;
                    tooltip.classList.add('show');
                    // Remove title to prevent default browser tooltip
                    e.target.setAttribute('data-title', title);
                    e.target.removeAttribute('title');
                }
            });
            
            element.addEventListener('mousemove', (e) => {
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 30 + 'px';
            });
            
            element.addEventListener('mouseleave', (e) => {
                tooltip.classList.remove('show');
                // Restore title attribute
                const title = e.target.getAttribute('data-title');
                if (title) {
                    e.target.setAttribute('title', title);
                    e.target.removeAttribute('data-title');
                }
            });
        });
    }
    
    startSimulation() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.isPaused = false;
            
            // Update button states
            this.elements.startBtn.disabled = true;
            this.elements.pauseBtn.disabled = false;
            
            // Start simulation loop - updates every 2 seconds for observable changes
            this.simulationInterval = setInterval(() => {
                this.updateMetrics();
                this.updateDisplay();
                this.updateEcosystemVisualization();
                this.timeStep++;
            }, 2000);
            
            this.updateFeedback("Simulation started! Observe how your decisions affect the ecosystem.", "neutral");
        }
    }
    
    pauseSimulation() {
        if (this.isRunning && !this.isPaused) {
            this.isPaused = true;
            clearInterval(this.simulationInterval);
            
            // Update button states
            this.elements.startBtn.disabled = false;
            this.elements.pauseBtn.disabled = true;
            
            this.updateFeedback("Simulation paused. Adjust controls and click Start to continue.", "neutral");
        }
    }
    
    resetSimulation() {
        // Stop any running simulation
        this.isRunning = false;
        this.isPaused = false;
        clearInterval(this.simulationInterval);
        this.timeStep = 0;
        
        // Reset metrics to initial values
        this.metrics = {
            marineHealth: 75,
            waterQuality: 70,
            plasticLevel: 25,
            biodiversity: 80
        };
        
        // Reset controls to initial values
        this.controls = {
            plasticInput: 20,
            cleanupEffort: 30,
            protectionLevel: 40
        };
        
        // Update sliders
        this.elements.plasticSlider.value = 20;
        this.elements.cleanupSlider.value = 30;
        this.elements.protectionSlider.value = 40;
        
        // Update value displays
        this.elements.plasticValue.textContent = '20';
        this.elements.cleanupValue.textContent = '30';
        this.elements.protectionValue.textContent = '40';
        
        // Update button states
        this.elements.startBtn.disabled = false;
        this.elements.pauseBtn.disabled = true;
        
        // Update display
        this.updateDisplay();
        this.updateEcosystemVisualization();
        this.updateFeedback("Simulation reset to initial conditions. Adjust controls and start simulation.", "neutral");
    }
    
    updateMetrics() {
        // Calculate environmental impact based on user controls
        // This implements a simplified ecosystem model for educational purposes
        
        const plasticImpact = this.controls.plasticInput / 100; // 0-1 scale
        const cleanupBenefit = this.controls.cleanupEffort / 100; // 0-1 scale
        const protectionBenefit = this.controls.protectionLevel / 100; // 0-1 scale
        
        // Calculate plastic level (increases with input, decreases with cleanup)
        const plasticChange = (plasticImpact * 3) - (cleanupBenefit * 2);
        this.metrics.plasticLevel = Math.max(0, Math.min(100, this.metrics.plasticLevel + plasticChange));
        
        // Marine health is negatively affected by plastic levels, positively by protection
        const marineHealthChange = (-this.metrics.plasticLevel / 50) + (protectionBenefit * 2) - plasticImpact;
        this.metrics.marineHealth = Math.max(0, Math.min(100, this.metrics.marineHealth + marineHealthChange));
        
        // Water quality decreases with plastic input, improves with cleanup
        const waterQualityChange = (-plasticImpact * 2) + (cleanupBenefit * 1.5);
        this.metrics.waterQuality = Math.max(0, Math.min(100, this.metrics.waterQuality + waterQualityChange));
        
        // Biodiversity is affected by overall ecosystem health
        const avgHealth = (this.metrics.marineHealth + this.metrics.waterQuality) / 2;
        const biodiversityChange = (avgHealth - this.metrics.biodiversity) * 0.1;
        this.metrics.biodiversity = Math.max(0, Math.min(100, this.metrics.biodiversity + biodiversityChange));
    }
    
    updateDisplay() {
        // Update progress bars with smooth animations
        this.updateProgressBar('marineHealth', this.metrics.marineHealth);
        this.updateProgressBar('waterQuality', this.metrics.waterQuality);
        this.updateProgressBar('plasticLevel', this.metrics.plasticLevel, true); // Inverted - lower is better
        this.updateProgressBar('biodiversity', this.metrics.biodiversity);
        
        // Update feedback based on overall ecosystem health
        this.updateOverallFeedback();
    }
    
    updateProgressBar(metric, value, inverted = false) {
        const bar = this.elements[metric + 'Bar'];
        const text = this.elements[metric + 'Text'];
        
        // Update width and text
        bar.style.width = value + '%';
        text.textContent = Math.round(value) + '%';
        
        // Update color based on value (considering if inverted)
        const effectiveValue = inverted ? (100 - value) : value;
        bar.className = 'progress-fill ' + this.getHealthColor(effectiveValue);
    }
    
    getHealthColor(value) {
        if (value >= 70) return 'good';
        if (value >= 40) return 'warning';
        return 'danger';
    }
    
    updateOverallFeedback() {
        const avgHealth = (this.metrics.marineHealth + this.metrics.waterQuality + 
                          (100 - this.metrics.plasticLevel) + this.metrics.biodiversity) / 4;
        
        let message, type;
        
        if (avgHealth >= 80) {
            message = "Excellent! Your environmental policies are creating a thriving ecosystem. Marine life is flourishing!";
            type = "good";
        } else if (avgHealth >= 60) {
            message = "Good progress! The ecosystem is stable, but there's room for improvement. Consider increasing cleanup efforts.";
            type = "good";
        } else if (avgHealth >= 40) {
            message = "Warning! The ecosystem is under stress. Microplastics are affecting marine life. Take action now!";
            type = "warning";
        } else {
            message = "Critical! The ecosystem is in danger. Immediate action needed to prevent collapse. Reduce plastic input and increase protection!";
            type = "danger";
        }
        
        this.updateFeedback(message, type);
    }
    
    updateFeedback(message, type) {
        this.elements.feedbackMessage.textContent = message;
        this.elements.feedbackMessage.className = `feedback ${type}`;
    }
    
    updateEcosystemVisualization() {
        // Update visual elements based on ecosystem health
        const healthRatio = this.metrics.marineHealth / 100;
        const plasticRatio = this.metrics.plasticLevel / 100;
        
        // Adjust fish opacity and animation based on health - Updated for new structure
        this.elements.fish.forEach((fish, index) => {
            fish.style.opacity = Math.max(0.3, healthRatio);
            fish.style.filter = `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) ${healthRatio < 0.5 ? 'grayscale(50%)' : ''}`;
        });
        
        // Adjust turtle based on health - Updated for new structure
        if (this.elements.turtle) {
            this.elements.turtle.style.opacity = Math.max(0.3, healthRatio);
            this.elements.turtle.style.filter = `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)) ${healthRatio < 0.5 ? 'grayscale(50%)' : ''}`;
        }
        
        // Show/hide plastic particles based on plastic level - Updated for new structure
        this.elements.plasticParticles.forEach((particle, index) => {
            particle.style.opacity = Math.min(1, plasticRatio + 0.3);
            particle.style.display = plasticRatio > 0.2 ? 'block' : 'none';
        });
        
        // Update labels visibility based on ecosystem health - Added for better understanding
        this.elements.fishLabels.forEach((label, index) => {
            label.style.opacity = Math.max(0.7, healthRatio);
        });
        
        if (this.elements.turtleLabel) {
            this.elements.turtleLabel.style.opacity = Math.max(0.7, healthRatio);
        }
        
        this.elements.plasticLabels.forEach((label, index) => {
            label.style.display = plasticRatio > 0.2 ? 'block' : 'none';
            label.style.opacity = Math.min(1, plasticRatio + 0.5);
        });
        
        // Update marine life containers opacity - Added for coordinated visual feedback
        this.elements.marineContainers.forEach((container, index) => {
            container.style.opacity = Math.max(0.4, healthRatio);
        });
        
        // Update pollution containers visibility - Added for coordinated visual feedback
        this.elements.pollutionContainers.forEach((container, index) => {
            container.style.display = plasticRatio > 0.2 ? 'block' : 'none';
            container.style.opacity = Math.min(1, plasticRatio + 0.3);
        });
    }
}

// Initialize the simulation when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create and start the ecosystem simulation
    const simulation = new EcosystemSimulation();
    
    // Add keyboard shortcuts for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') { // Spacebar to start/pause
            e.preventDefault();
            if (!simulation.isRunning) {
                simulation.startSimulation();
            } else {
                simulation.pauseSimulation();
            }
        } else if (e.key === 'r' || e.key === 'R') { // R to reset
            simulation.resetSimulation();
        }
    });
    
    // Add touch support for mobile devices
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        
        // Swipe up to start simulation, swipe down to reset
        if (Math.abs(deltaY) > 50) {
            if (deltaY > 0 && !simulation.isRunning) {
                simulation.startSimulation();
            } else if (deltaY < 0) {
                simulation.resetSimulation();
            }
        }
    });
    
    console.log('Microplastics Ecosystem Simulation initialized successfully!');
    console.log('Controls: Spacebar = Start/Pause, R = Reset, Swipe up = Start, Swipe down = Reset');
    console.log('All ecosystem elements are now labeled for better understanding');
});