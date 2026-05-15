// Water Electrolysis Simulation Script
// This script manages the interactive electrolysis experiment simulation

class ElectrolysisSimulation {
    constructor() {
        // Initialize simulation state variables
        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.hydrogenVolume = 0;
        this.oxygenVolume = 0;
        this.animationId = null;
        this.bubbleInterval = null;
        
        // Chart data storage
        this.chartData = {
            time: [],
            hydrogen: [],
            oxygen: []
        };
        
        // Get DOM elements for manipulation
        this.elements = {
            waterVolume: document.getElementById('water-volume'),
            voltage: document.getElementById('voltage'),
            current: document.getElementById('current'),
            waterValue: document.getElementById('water-value'),
            voltageValue: document.getElementById('voltage-value'),
            currentValue: document.getElementById('current-value'),
            startBtn: document.getElementById('start-btn'),
            stopBtn: document.getElementById('stop-btn'),
            resetBtn: document.getElementById('reset-btn'),
            waterLevel: document.getElementById('water-level'),
            hydrogenGas: document.getElementById('hydrogen-gas'),
            oxygenGas: document.getElementById('oxygen-gas'),
            h2Volume: document.getElementById('h2-volume'),
            o2Volume: document.getElementById('o2-volume'),
            elapsedTimeDisplay: document.getElementById('elapsed-time'),
            powerDisplay: document.getElementById('power-display'),
            ratioDisplay: document.getElementById('ratio-display'),
            currentFlow: document.getElementById('current-flow'),
            statusMessage: document.getElementById('status-message'),
            gasChart: document.getElementById('gas-chart')
        };
        
        // Initialize the simulation
        this.init();
    }
    
    init() {
        // Set up event listeners for all interactive elements
        this.setupEventListeners();
        
        // Initialize chart canvas context
        this.chartCtx = this.elements.gasChart.getContext('2d');
        
        // Update initial display values
        this.updateDisplayValues();
        this.updateWaterLevel();
        this.drawChart();
        
        console.log('Electrolysis simulation initialized');
    }
    
    setupEventListeners() {
        // Slider input event listeners with real-time updates
        this.elements.waterVolume.addEventListener('input', () => {
            this.elements.waterValue.textContent = this.elements.waterVolume.value;
            this.updateWaterLevel();
            this.updateDisplayValues();
        });
        
        this.elements.voltage.addEventListener('input', () => {
            this.elements.voltageValue.textContent = parseFloat(this.elements.voltage.value).toFixed(1);
            this.updateDisplayValues();
        });
        
        this.elements.current.addEventListener('input', () => {
            this.elements.currentValue.textContent = parseFloat(this.elements.current.value).toFixed(1);
            this.updateDisplayValues();
        });
        
        // Button event listeners
        this.elements.startBtn.addEventListener('click', () => this.startElectrolysis());
        this.elements.stopBtn.addEventListener('click', () => this.stopElectrolysis());
        this.elements.resetBtn.addEventListener('click', () => this.resetSimulation());
        
        // Touch support for mobile devices
        this.addTouchSupport();
    }
    
    addTouchSupport() {
        // Add touch event listeners for better mobile interaction
        const sliders = [this.elements.waterVolume, this.elements.voltage, this.elements.current];
        
        sliders.forEach(slider => {
            slider.addEventListener('touchstart', (e) => {
                e.preventDefault();
                slider.focus();
            });
            
            slider.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = slider.getBoundingClientRect();
                const percent = (touch.clientX - rect.left) / rect.width;
                const min = parseFloat(slider.min);
                const max = parseFloat(slider.max);
                const value = min + (max - min) * Math.max(0, Math.min(1, percent));
                
                slider.value = value;
                slider.dispatchEvent(new Event('input'));
            });
        });
    }
    
    updateDisplayValues() {
        // Calculate and display power (P = V × I)
        const voltage = parseFloat(this.elements.voltage.value);
        const current = parseFloat(this.elements.current.value);
        const power = (voltage * current).toFixed(1);
        this.elements.powerDisplay.textContent = `${power}W`;
        
        // Update H2:O2 ratio display (theoretical 2:1 ratio)
        if (this.hydrogenVolume > 0 && this.oxygenVolume > 0) {
            const ratio = (this.hydrogenVolume / this.oxygenVolume).toFixed(1);
            this.elements.ratioDisplay.textContent = `${ratio}:1`;
        } else {
            this.elements.ratioDisplay.textContent = '2:1';
        }
    }
    
    updateWaterLevel() {
        // Visual representation of water volume in the container
        const volume = parseInt(this.elements.waterVolume.value);
        const maxVolume = 500;
        const percentage = (volume / maxVolume) * 100;
        this.elements.waterLevel.style.height = `${Math.max(20, percentage)}%`;
    }
    
    startElectrolysis() {
        // Begin the electrolysis simulation
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startTime = Date.now();
        
        // Update button states
        this.elements.startBtn.disabled = true;
        this.elements.stopBtn.disabled = false;
        
        // Show current flow indicator
        this.elements.currentFlow.classList.add('active');
        this.elements.currentFlow.textContent = `${this.elements.currentValue.textContent}A`;
        
        // Update status message
        this.elements.statusMessage.textContent = 'Electrolysis in progress - Observing gas production...';
        this.elements.statusMessage.style.background = 'rgba(76, 175, 80, 0.1)';
        this.elements.statusMessage.style.borderColor = '#4CAF50';
        this.elements.statusMessage.style.color = '#2E7D32';
        
        // Start animation and bubble effects
        this.startAnimation();
        this.startBubbleEffect();
        
        console.log('Electrolysis started');
    }
    
    stopElectrolysis() {
        // Stop the electrolysis simulation
        if (!this.isRunning) return;
        
        this.isRunning = false;
        
        // Update button states
        this.elements.startBtn.disabled = false;
        this.elements.stopBtn.disabled = true;
        
        // Hide current flow indicator
        this.elements.currentFlow.classList.remove('active');
        
        // Update status message
        this.elements.statusMessage.textContent = 'Electrolysis stopped - Data preserved for analysis';
        this.elements.statusMessage.style.background = 'rgba(255, 152, 0, 0.1)';
        this.elements.statusMessage.style.borderColor = '#FF9800';
        this.elements.statusMessage.style.color = '#F57C00';
        
        // Stop animations
        this.stopAnimation();
        this.stopBubbleEffect();
        
        console.log('Electrolysis stopped');
    }
    
    resetSimulation() {
        // Reset all simulation parameters to initial state
        this.stopElectrolysis();
        
        // Reset time and volumes
        this.elapsedTime = 0;
        this.hydrogenVolume = 0;
        this.oxygenVolume = 0;
        
        // Reset visual elements
        this.elements.hydrogenGas.style.height = '0%';
        this.elements.oxygenGas.style.height = '0%';
        this.elements.h2Volume.textContent = '0 mL';
        this.elements.o2Volume.textContent = '0 mL';
        this.elements.elapsedTimeDisplay.textContent = '0s';
        
        // Reset chart data
        this.chartData = { time: [], hydrogen: [], oxygen: [] };
        this.drawChart();
        
        // Reset sliders to default values
        this.elements.waterVolume.value = 250;
        this.elements.voltage.value = 6;
        this.elements.current.value = 1.5;
        
        // Update display values
        this.elements.waterValue.textContent = '250';
        this.elements.voltageValue.textContent = '6.0';
        this.elements.currentValue.textContent = '1.5';
        
        this.updateDisplayValues();
        this.updateWaterLevel();
        
        // Reset status message
        this.elements.statusMessage.textContent = 'Simulation reset - Ready to start new experiment';
        this.elements.statusMessage.style.background = 'rgba(33, 150, 243, 0.1)';
        this.elements.statusMessage.style.borderColor = '#2196F3';
        this.elements.statusMessage.style.color = '#1976D2';
        
        console.log('Simulation reset');
    }
    
    startAnimation() {
        // Main animation loop for gas production simulation
        const animate = () => {
            if (!this.isRunning) return;
            
            // Calculate elapsed time
            this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            this.elements.elapsedTimeDisplay.textContent = `${this.elapsedTime}s`;
            
            // Calculate gas production based on Faraday's laws
            // Production rate depends on current and time
            const current = parseFloat(this.elements.current.value);
            const voltage = parseFloat(this.elements.voltage.value);
            const waterVolume = parseInt(this.elements.waterVolume.value);
            
            // Simplified calculation for educational purposes
            // Real electrolysis follows Faraday's laws more precisely
            const productionRate = (current * voltage * 0.1) / Math.sqrt(waterVolume / 100);
            
            // Hydrogen production (2 moles per reaction)
            this.hydrogenVolume += productionRate * 2;
            
            // Oxygen production (1 mole per reaction)
            this.oxygenVolume += productionRate;
            
            // Update visual gas levels (max 90% of tube height)
            const maxGasVolume = 100; // mL visual maximum
            const h2Percentage = Math.min(90, (this.hydrogenVolume / maxGasVolume) * 90);
            const o2Percentage = Math.min(90, (this.oxygenVolume / maxGasVolume) * 90);
            
            this.elements.hydrogenGas.style.height = `${h2Percentage}%`;
            this.elements.oxygenGas.style.height = `${o2Percentage}%`;
            
            // Update volume displays
            this.elements.h2Volume.textContent = `${this.hydrogenVolume.toFixed(1)} mL`;
            this.elements.o2Volume.textContent = `${this.oxygenVolume.toFixed(1)} mL`;
            
            // Update chart data every 2 seconds
            if (this.elapsedTime % 2 === 0 && this.chartData.time[this.chartData.time.length - 1] !== this.elapsedTime) {
                this.chartData.time.push(this.elapsedTime);
                this.chartData.hydrogen.push(this.hydrogenVolume);
                this.chartData.oxygen.push(this.oxygenVolume);
                
                // Keep only last 15 data points for readability
                if (this.chartData.time.length > 15) {
                    this.chartData.time.shift();
                    this.chartData.hydrogen.shift();
                    this.chartData.oxygen.shift();
                }
                
                this.drawChart();
            }
            
            this.updateDisplayValues();
            
            // Continue animation
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    stopAnimation() {
        // Stop the main animation loop
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    startBubbleEffect() {
        // Create visual bubble effects at electrodes
        this.bubbleInterval = setInterval(() => {
            if (!this.isRunning) return;
            
            // Create bubbles at cathode (hydrogen)
            this.createBubble('cathode');
            
            // Create bubbles at anode (oxygen) - less frequent due to 2:1 ratio
            if (Math.random() < 0.5) {
                this.createBubble('anode');
            }
        }, 300);
    }
    
    createBubble(electrode) {
        // Create animated bubble elements for visual effect
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const container = document.querySelector('.water-container');
        const electrodeElement = document.querySelector(`.electrode.${electrode === 'cathode' ? 'cathode' : 'anode'}`);
        
        if (container && electrodeElement) {
            const rect = electrodeElement.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            bubble.style.left = `${rect.left - containerRect.left + rect.width/2}px`;
            bubble.style.bottom = '20px';
            bubble.style.animationDelay = `${Math.random() * 0.5}s`;
            
            container.appendChild(bubble);
            
            // Remove bubble after animation
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, 2000);
        }
    }
    
    stopBubbleEffect() {
        // Stop bubble generation
        if (this.bubbleInterval) {
            clearInterval(this.bubbleInterval);
            this.bubbleInterval = null;
        }
        
        // Remove existing bubbles
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach(bubble => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        });
    }
    
    drawChart() {
        // Draw real-time gas production chart
        const canvas = this.elements.gasChart;
        const ctx = this.chartCtx;
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Set up chart styling
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, width, height);
        
        // Draw grid lines
        ctx.strokeStyle = '#e9ecef';
        ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let i = 0; i <= 10; i++) {
            const x = (width / 10) * i;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let i = 0; i <= 8; i++) {
            const y = (height / 8) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        if (this.chartData.time.length < 2) return;
        
        // Find max values for scaling
        const maxVolume = Math.max(
            ...this.chartData.hydrogen,
            ...this.chartData.oxygen,
            10 // Minimum scale
        );
        const maxTime = Math.max(...this.chartData.time, 10);
        
        // Draw hydrogen line (red)
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < this.chartData.time.length; i++) {
            const x = (this.chartData.time[i] / maxTime) * width;
            const y = height - (this.chartData.hydrogen[i] / maxVolume) * height;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw oxygen line (blue)
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < this.chartData.time.length; i++) {
            const x = (this.chartData.time[i] / maxTime) * width;
            const y = height - (this.chartData.oxygen[i] / maxVolume) * height;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw axis labels
        ctx.fillStyle = '#495057';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // X-axis label
        ctx.fillText('Time (s)', width / 2, height - 5);
        
        // Y-axis label (rotated)
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Volume (mL)', 0, 0);
        ctx.restore();
    }
}

// Initialize simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create and start the electrolysis simulation
    const simulation = new ElectrolysisSimulation();
    
    // Make simulation globally accessible for debugging
    window.electrolysisSimulation = simulation;
    
    console.log('Water Electrolysis Simulation loaded successfully');
});