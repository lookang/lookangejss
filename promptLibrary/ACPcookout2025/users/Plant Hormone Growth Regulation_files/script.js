// Plant Hormone Growth Regulation Interactive
// This script manages the plant growth simulation based on hormone presence

class PlantGrowthSimulator {
    constructor() {
        // Initialize DOM elements
        this.addHormoneBtn = document.getElementById('addHormone');
        this.removeHormoneBtn = document.getElementById('removeHormone');
        this.resetBtn = document.getElementById('resetPlant');
        this.hormoneStatus = document.getElementById('hormoneStatus');
        this.plantHeight = document.getElementById('plantHeight');
        this.tomatoPlant = document.getElementById('tomatoPlant');
        this.hormoneParticles = document.getElementById('hormoneParticles');
        this.tooltip = document.getElementById('tooltip');
        this.container = document.querySelector('.container');
        
        // State management
        this.hasHormone = true; // Start with hormone present
        this.currentHeight = 15; // Initial height in cm
        this.particleInterval = null;
        
        // Initialize the simulation
        this.init();
    }
    
    init() {
        // Set up event listeners for buttons
        this.addHormoneBtn.addEventListener('click', () => this.addHormone());
        this.removeHormoneBtn.addEventListener('click', () => this.removeHormone());
        this.resetBtn.addEventListener('click', () => this.resetPlant());
        
        // Set up tooltip functionality
        this.setupTooltip();
        
        // Initialize plant state
        this.updatePlantState();
        this.startHormoneAnimation();
        
        // Add visual feedback for button interactions
        this.setupButtonFeedback();
    }
    
    // Add hormone to the plant
    addHormone() {
        if (!this.hasHormone) {
            this.hasHormone = true;
            this.updatePlantState();
            this.startHormoneAnimation();
            this.updateButtonStates();
            
            // Animate height increase
            this.animateHeightChange(25);
            
            // Show visual feedback
            this.showGrowthEffect();
        }
    }
    
    // Remove hormone from the plant
    removeHormone() {
        if (this.hasHormone) {
            this.hasHormone = false;
            this.updatePlantState();
            this.stopHormoneAnimation();
            this.updateButtonStates();
            
            // Animate height decrease
            this.animateHeightChange(10);
        }
    }
    
    // Reset plant to initial state
    resetPlant() {
        this.hasHormone = true;
        this.updatePlantState();
        this.startHormoneAnimation();
        this.updateButtonStates();
        this.animateHeightChange(15);
        
        // Add reset animation effect
        this.tomatoPlant.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.tomatoPlant.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Update the visual state of the plant
    updatePlantState() {
        // Remove existing classes
        this.tomatoPlant.classList.remove('with-hormone', 'without-hormone');
        
        // Add appropriate class based on hormone presence
        if (this.hasHormone) {
            this.tomatoPlant.classList.add('with-hormone');
            this.hormoneStatus.textContent = 'Present';
            this.hormoneStatus.className = 'status-value present';
        } else {
            this.tomatoPlant.classList.add('without-hormone');
            this.hormoneStatus.textContent = 'Absent';
            this.hormoneStatus.className = 'status-value absent';
        }
    }
    
    // Animate height change with smooth transition
    animateHeightChange(targetHeight) {
        const startHeight = this.currentHeight;
        const duration = 1500; // 1.5 seconds
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easing function for smooth animation
            const easeProgress = this.easeInOutCubic(progress);
            const currentHeight = startHeight + (targetHeight - startHeight) * easeProgress;
            
            this.currentHeight = Math.round(currentHeight);
            this.plantHeight.textContent = `${this.currentHeight} cm`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // Easing function for smooth animations
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    // Start hormone particle animation
    startHormoneAnimation() {
        if (this.particleInterval) {
            clearInterval(this.particleInterval);
        }
        
        if (this.hasHormone) {
            this.particleInterval = setInterval(() => {
                this.createHormoneParticle();
            }, 500);
        }
    }
    
    // Stop hormone particle animation
    stopHormoneAnimation() {
        if (this.particleInterval) {
            clearInterval(this.particleInterval);
            this.particleInterval = null;
        }
        
        // Clear existing particles
        this.hormoneParticles.innerHTML = '';
    }
    
    // Create individual hormone particle
    createHormoneParticle() {
        const particle = document.createElement('div');
        particle.className = 'hormone-particle';
        
        // Random horizontal position
        const leftPosition = Math.random() * 80 + 10; // 10% to 90%
        particle.style.left = `${leftPosition}%`;
        particle.style.bottom = '0px';
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 1}s`;
        
        this.hormoneParticles.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }
    
    // Show growth effect when hormone is added
    showGrowthEffect() {
        const growthEffect = document.createElement('div');
        growthEffect.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(76, 175, 80, 0.3), transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: growthPulse 1s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        // Add keyframe animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes growthPulse {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        this.container.appendChild(growthEffect);
        
        setTimeout(() => {
            if (growthEffect.parentNode) {
                growthEffect.parentNode.removeChild(growthEffect);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 1000);
    }
    
    // Update button active states
    updateButtonStates() {
        this.addHormoneBtn.classList.toggle('active', this.hasHormone);
        this.removeHormoneBtn.classList.toggle('active', !this.hasHormone);
    }
    
    // Setup button visual feedback
    setupButtonFeedback() {
        const buttons = [this.addHormoneBtn, this.removeHormoneBtn, this.resetBtn];
        
        buttons.forEach(button => {
            button.addEventListener('mousedown', () => {
                button.style.transform = 'translateY(1px) scale(0.98)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.transform = '';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }
    
    // Setup tooltip functionality
    setupTooltip() {
        let tooltipTimeout;
        
        // Show tooltip on container hover (for iframe compatibility)
        this.container.addEventListener('mouseenter', () => {
            tooltipTimeout = setTimeout(() => {
                this.tooltip.classList.add('show');
            }, 1000); // Show after 1 second hover
        });
        
        // Hide tooltip when mouse leaves
        this.container.addEventListener('mouseleave', () => {
            clearTimeout(tooltipTimeout);
            this.tooltip.classList.remove('show');
        });
        
        // Hide tooltip when clicking anywhere
        this.container.addEventListener('click', () => {
            this.tooltip.classList.remove('show');
        });
        
        // Touch support for mobile
        this.container.addEventListener('touchstart', () => {
            if (this.tooltip.classList.contains('show')) {
                this.tooltip.classList.remove('show');
            } else {
                this.tooltip.classList.add('show');
                setTimeout(() => {
                    this.tooltip.classList.remove('show');
                }, 3000);
            }
        });
    }
}

// Initialize the simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PlantGrowthSimulator();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Adjust container height based on viewport
    const container = document.querySelector('.container');
    if (window.innerHeight > 500) {
        container.style.height = '90vh';
    } else {
        container.style.height = '450px';
    }
});