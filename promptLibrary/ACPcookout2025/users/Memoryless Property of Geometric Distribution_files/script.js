// Memoryless Property Simulation - JavaScript
// This script manages the dice rolling simulation to demonstrate the memoryless property of geometric distribution

class MemorylessSimulation {
    constructor() {
        // Initialize simulation state
        this.player1 = {
            attempts: 0,
            successes: 0,
            currentRoll: null,
            element: document.getElementById('player1')
        };
        
        this.player2 = {
            attempts: 10, // Starts with 10 failed attempts
            successes: 0,
            currentRoll: null,
            element: document.getElementById('player2')
        };
        
        this.totalRolls = 0;
        this.currentPrediction = null;
        this.isRolling = false;
        
        // Bind DOM elements
        this.bindElements();
        
        // Initialize event listeners
        this.initializeEventListeners();
        
        // Update initial display
        this.updateDisplay();
    }
    
    bindElements() {
        // Control elements
        this.rollBtn = document.getElementById('rollBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.predictionButtons = document.querySelectorAll('.predict-btn');
        this.predictionDisplay = document.getElementById('predictionDisplay');
        
        // Display elements
        this.dice1 = document.getElementById('dice1');
        this.dice2 = document.getElementById('dice2');
        this.attempts1 = document.getElementById('attempts1');
        this.attempts2 = document.getElementById('attempts2');
        this.status1 = document.getElementById('status1');
        this.status2 = document.getElementById('status2');
        
        // Results elements
        this.progress1 = document.getElementById('progress1');
        this.progress2 = document.getElementById('progress2');
        this.progressText1 = document.getElementById('progressText1');
        this.progressText2 = document.getElementById('progressText2');
        this.totalRollsDisplay = document.getElementById('totalRolls');
        this.p1SuccessesDisplay = document.getElementById('p1Successes');
        this.p2SuccessesDisplay = document.getElementById('p2Successes');
        this.insightPanel = document.getElementById('insightPanel');
    }
    
    initializeEventListeners() {
        // Roll button click handler
        this.rollBtn.addEventListener('click', () => this.rollDice());
        
        // Reset button click handler
        this.resetBtn.addEventListener('click', () => this.resetSimulation());
        
        // Prediction button handlers
        this.predictionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.makePrediction(e.target.dataset.prediction));
        });
        
        // Keyboard support for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.classList.contains('predict-btn')) {
                    e.preventDefault();
                    this.makePrediction(e.target.dataset.prediction);
                } else if (e.target === this.rollBtn) {
                    e.preventDefault();
                    this.rollDice();
                }
            }
        });
    }
    
    makePrediction(prediction) {
        // Handle user prediction selection
        this.currentPrediction = prediction;
        
        // Update UI to show selected prediction
        this.predictionButtons.forEach(btn => {
            btn.classList.remove('selected');
        });
        
        const selectedBtn = document.querySelector(`[data-prediction="${prediction}"]`);
        selectedBtn.classList.add('selected');
        
        // Display prediction text
        const predictionTexts = {
            'player1': 'You predict Player 1 is more likely to succeed',
            'equal': 'You predict both players have equal chances',
            'player2': 'You predict Player 2 is more likely to succeed'
        };
        
        this.predictionDisplay.textContent = predictionTexts[prediction];
        
        // Enable roll button if prediction is made
        this.rollBtn.disabled = false;
    }
    
    async rollDice() {
        if (this.isRolling) return;
        
        this.isRolling = true;
        this.rollBtn.disabled = true;
        
        // Add rolling animation
        this.dice1.classList.add('dice-rolling');
        this.dice2.classList.add('dice-rolling');
        
        // Simulate rolling delay for better UX
        await this.sleep(500);
        
        // Generate random dice rolls (1-6)
        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;
        
        this.player1.currentRoll = roll1;
        this.player2.currentRoll = roll2;
        
        // Update attempts
        this.player1.attempts++;
        this.player2.attempts++;
        this.totalRolls++;
        
        // Check for successes (rolling a 6)
        const p1Success = roll1 === 6;
        const p2Success = roll2 === 6;
        
        if (p1Success) this.player1.successes++;
        if (p2Success) this.player2.successes++;
        
        // Update dice display with actual numbers
        this.dice1.textContent = roll1;
        this.dice2.textContent = roll2;
        
        // Remove rolling animation
        this.dice1.classList.remove('dice-rolling');
        this.dice2.classList.remove('dice-rolling');
        
        // Apply visual feedback for success/failure
        this.applyVisualFeedback(p1Success, p2Success);
        
        // Update all displays
        this.updateDisplay();
        
        // Show insight after sufficient data
        if (this.totalRolls >= 10) {
            this.showInsight();
        }
        
        this.isRolling = false;
        this.rollBtn.disabled = false;
    }
    
    applyVisualFeedback(p1Success, p2Success) {
        // Apply success/failure visual states
        this.player1.element.classList.remove('success', 'failure');
        this.player2.element.classList.remove('success', 'failure');
        
        if (p1Success) {
            this.player1.element.classList.add('success');
        } else {
            this.player1.element.classList.add('failure');
        }
        
        if (p2Success) {
            this.player2.element.classList.add('success');
        } else {
            this.player2.element.classList.add('failure');
        }
        
        // Remove classes after animation
        setTimeout(() => {
            this.player1.element.classList.remove('success', 'failure');
            this.player2.element.classList.remove('success', 'failure');
        }, 1000);
    }
    
    updateDisplay() {
        // Update attempt counters
        this.attempts1.textContent = this.player1.attempts;
        this.attempts2.textContent = this.player2.attempts;
        
        // Update status messages
        if (this.player1.currentRoll) {
            const isSuccess = this.player1.currentRoll === 6;
            this.status1.textContent = `Rolled ${this.player1.currentRoll} - ${isSuccess ? 'Success!' : 'Try again'}`;
        }
        
        if (this.player2.currentRoll) {
            const isSuccess = this.player2.currentRoll === 6;
            this.status2.textContent = `Rolled ${this.player2.currentRoll} - ${isSuccess ? 'Success!' : 'Try again'}`;
        }
        
        // Calculate and update success rates
        const p1Rate = this.player1.attempts > 0 ? (this.player1.successes / this.player1.attempts) * 100 : 0;
        const p2Rate = this.player2.attempts > 10 ? (this.player2.successes / (this.player2.attempts - 10)) * 100 : 0;
        
        // Update progress bars
        this.progress1.style.width = `${Math.min(p1Rate * 6, 100)}%`; // Scale for visibility
        this.progress2.style.width = `${Math.min(p2Rate * 6, 100)}%`;
        
        this.progressText1.textContent = `${p1Rate.toFixed(1)}%`;
        this.progressText2.textContent = `${p2Rate.toFixed(1)}%`;
        
        // Update statistics
        this.totalRollsDisplay.textContent = this.totalRolls;
        this.p1SuccessesDisplay.textContent = this.player1.successes;
        this.p2SuccessesDisplay.textContent = this.player2.successes;
    }
    
    showInsight() {
        // Show the learning insight panel
        this.insightPanel.classList.add('show');
        
        // Calculate convergence to theoretical probability
        const p1Rate = this.player1.attempts > 0 ? (this.player1.successes / this.player1.attempts) * 100 : 0;
        const p2Rate = this.player2.attempts > 10 ? (this.player2.successes / (this.player2.attempts - 10)) * 100 : 0;
        const theoretical = 16.67;
        
        // Update insight content based on convergence
        const difference = Math.abs(p1Rate - p2Rate);
        if (difference < 5 && this.totalRolls >= 20) {
            this.insightPanel.innerHTML = `
                <div class="insight-content">
                    <strong>Excellent!</strong> Both players' success rates (${p1Rate.toFixed(1)}% vs ${p2Rate.toFixed(1)}%) 
                    are converging to the theoretical 16.67%. This proves the memoryless property - 
                    past failures don't affect future success probability!
                </div>
            `;
        }
    }
    
    resetSimulation() {
        // Reset all simulation data
        this.player1.attempts = 0;
        this.player1.successes = 0;
        this.player1.currentRoll = null;
        
        this.player2.attempts = 10; // Reset to initial 10 failures
        this.player2.successes = 0;
        this.player2.currentRoll = null;
        
        this.totalRolls = 0;
        this.currentPrediction = null;
        
        // Reset UI elements
        this.dice1.textContent = '🎲';
        this.dice2.textContent = '🎲';
        
        this.status1.textContent = 'Ready to roll';
        this.status2.textContent = 'Already failed 10 times';
        
        // Clear prediction selection
        this.predictionButtons.forEach(btn => btn.classList.remove('selected'));
        this.predictionDisplay.textContent = '';
        
        // Hide insight panel
        this.insightPanel.classList.remove('show');
        
        // Reset progress bars
        this.progress1.style.width = '0%';
        this.progress2.style.width = '0%';
        
        // Update display
        this.updateDisplay();
        
        // Disable roll button until prediction is made
        this.rollBtn.disabled = true;
    }
    
    // Utility function for async delays
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create and start the simulation
    const simulation = new MemorylessSimulation();
    
    // Add touch support for mobile devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Enhance touch interactions
        const touchElements = document.querySelectorAll('.predict-btn, .action-btn');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Add keyboard navigation support
    const focusableElements = document.querySelectorAll('button, [tabindex]');
    focusableElements.forEach((element, index) => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Custom tab navigation for better UX in iframe
                e.preventDefault();
                const nextIndex = e.shiftKey ? 
                    (index - 1 + focusableElements.length) % focusableElements.length :
                    (index + 1) % focusableElements.length;
                focusableElements[nextIndex].focus();
            }
        });
    });
    
    // Disable roll button initially
    document.getElementById('rollBtn').disabled = true;
    
    console.log('Memoryless Property Simulation initialized successfully');
});