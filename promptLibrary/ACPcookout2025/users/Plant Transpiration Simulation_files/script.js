// Plant Transpiration Simulation Script
// This script manages the interactive simulation of plant transpiration based on environmental factors

class TranspirationSimulation {
    constructor() {
        // Initialize simulation state
        this.isRunning = false;
        this.isPaused = false;
        this.guidedMode = false;
        this.timeElapsed = 0;
        this.dataPoints = [];
        this.animationId = null;
        this.guidedStep = 0;
        
        // Environmental factors (initial values)
        this.factors = {
            light: 50,      // 0-100%
            temperature: 25, // 10-40°C
            wind: 5,        // 0-20 m/s
            humidity: 50    // 20-90%
        };
        
        // Get DOM elements
        this.initializeElements();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize graph
        this.initializeGraph();
        
        // Check if running in iframe
        this.detectIframeMode();
        
        // Initial calculation
        this.updateTranspirationRate();
    }
    
    // Initialize DOM element references
    initializeElements() {
        // Sliders
        this.lightSlider = document.getElementById('lightSlider');
        this.tempSlider = document.getElementById('tempSlider');
        this.windSlider = document.getElementById('windSlider');
        this.humiditySlider = document.getElementById('humiditySlider');
        
        // Value displays
        this.lightValue = document.getElementById('lightValue');
        this.tempValue = document.getElementById('tempValue');
        this.windValue = document.getElementById('windValue');
        this.humidityValue = document.getElementById('humidityValue');
        
        // Buttons
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.compareBtn = document.getElementById('compareBtn');
        
        // Display elements
        this.transpirationRate = document.getElementById('transpirationRate');
        this.experimentStatus = document.getElementById('experimentStatus');
        this.guidedModeToggle = document.getElementById('guidedMode');
        this.guidedInstructions = document.getElementById('guidedInstructions');
        this.instructionText = document.getElementById('instructionText');
        
        // Graph and plant elements
        this.canvas = document.getElementById('transpirationGraph');
        this.ctx = this.canvas.getContext('2d');
        this.plantSvg = document.getElementById('plantSvg');
        this.vaporParticles = document.getElementById('vaporParticles');
        
        // Tooltip
        this.tooltip = document.getElementById('tooltip');
    }
    
    // Set up all event listeners
    setupEventListeners() {
        // Slider event listeners with real-time updates
        this.lightSlider.addEventListener('input', (e) => this.updateFactor('light', e.target.value));
        this.tempSlider.addEventListener('input', (e) => this.updateFactor('temperature', e.target.value));
        this.windSlider.addEventListener('input', (e) => this.updateFactor('wind', e.target.value));
        this.humiditySlider.addEventListener('input', (e) => this.updateFactor('humidity', e.target.value));
        
        // Button event listeners
        this.startBtn.addEventListener('click', () => this.startExperiment());
        this.pauseBtn.addEventListener('click', () => this.pauseExperiment());
        this.resetBtn.addEventListener('click', () => this.resetExperiment());
        this.compareBtn.addEventListener('click', () => this.compareConditions());
        
        // Guided mode toggle
        this.guidedModeToggle.addEventListener('change', (e) => this.toggleGuidedMode(e.target.checked));
        
        // Tooltip functionality for info icons
        document.querySelectorAll('.info-icon').forEach(icon => {
            icon.addEventListener('mouseenter', (e) => this.showTooltip(e));
            icon.addEventListener('mouseleave', () => this.hideTooltip());
        });
        
        // Touch support for mobile devices
        this.setupTouchSupport();
    }
    
    // Detect if running in iframe and adjust styling
    detectIframeMode() {
        if (window.self !== window.top) {
            document.body.classList.add('iframe-mode');
        }
    }
    
    // Update environmental factor and recalculate transpiration
    updateFactor(factor, value) {
        this.factors[factor] = parseFloat(value);
        
        // Update display values
        switch(factor) {
            case 'light':
                this.lightValue.textContent = `${value}%`;
                break;
            case 'temperature':
                this.tempValue.textContent = `${value}°C`;
                break;
            case 'wind':
                this.windValue.textContent = `${value} m/s`;
                break;
            case 'humidity':
                this.humidityValue.textContent = `${value}%`;
                break;
        }
        
        // Recalculate transpiration rate
        this.updateTranspirationRate();
        
        // Update plant visualization
        this.updatePlantVisualization();
        
        // Handle guided mode
        if (this.guidedMode) {
            this.handleGuidedModeStep(factor);
        }
    }
    
    // Calculate transpiration rate based on environmental factors
    calculateTranspirationRate() {
        // Base rate (ml/hr)
        let baseRate = 2.0;
        
        // Light intensity effect (0-100% -> 0.5x to 2.0x multiplier)
        let lightMultiplier = 0.5 + (this.factors.light / 100) * 1.5;
        
        // Temperature effect (10-40°C -> 0.3x to 2.5x multiplier)
        let tempMultiplier = 0.3 + ((this.factors.temperature - 10) / 30) * 2.2;
        
        // Wind speed effect (0-20 m/s -> 1.0x to 2.0x multiplier)
        let windMultiplier = 1.0 + (this.factors.wind / 20) * 1.0;
        
        // Humidity effect (20-90% -> 1.8x to 0.2x multiplier - inverse relationship)
        let humidityMultiplier = 1.8 - ((this.factors.humidity - 20) / 70) * 1.6;
        
        // Calculate final rate
        let rate = baseRate * lightMultiplier * tempMultiplier * windMultiplier * humidityMultiplier;
        
        // Ensure minimum rate
        return Math.max(0.1, rate);
    }
    
    // Update transpiration rate display
    updateTranspirationRate() {
        const rate = this.calculateTranspirationRate();
        this.transpirationRate.textContent = `${rate.toFixed(1)} ml/hr`;
        
        // Update vapor particle generation rate if experiment is running
        if (this.isRunning && !this.isPaused) {
            this.updateVaporGeneration(rate);
        }
    }
    
    // Update plant visualization based on current conditions
    updatePlantVisualization() {
        const leaves = document.querySelectorAll('.leaf');
        const rate = this.calculateTranspirationRate();
        
        // Change leaf color based on transpiration rate
        const intensity = Math.min(rate / 5, 1); // Normalize to 0-1
        const greenValue = Math.floor(205 - (intensity * 50)); // Darker green = higher rate
        
        leaves.forEach(leaf => {
            leaf.setAttribute('fill', `rgb(50, ${greenValue}, 50)`);
        });
    }
    
    // Generate water vapor particles - MODIFIED: Ultra-fast particle generation for immediate visual feedback
    updateVaporGeneration(rate) {
        // Clear existing particles
        this.vaporParticles.innerHTML = '';
        
        // Generate particles based on rate (significantly more particles = higher rate)
        const particleCount = Math.floor(rate * 6); // Increased from rate * 3 to rate * 6 for more visual impact
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createVaporParticle();
            }, i * (200 / particleCount)); // Reduced from 1000ms to 200ms for ultra-fast generation
        }
    }
    
    // Create individual vapor particle - MODIFIED: Ultra-fast particle removal for speeded up simulation
    createVaporParticle() {
        if (!this.isRunning || this.isPaused) return;
        
        const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        
        // Random position around leaves
        const x = 70 + Math.random() * 60;
        const y = 140 + Math.random() * 40;
        
        particle.setAttribute('cx', x);
        particle.setAttribute('cy', y);
        particle.setAttribute('r', 1 + Math.random() * 2);
        particle.setAttribute('class', 'vapor-particle');
        
        this.vaporParticles.appendChild(particle);
        
        // Remove particle after animation - Reduced from 1000ms to 300ms for ultra-fast cleanup
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 300);
    }
    
    // Initialize the graph canvas
    initializeGraph() {
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGraphAxes();
    }
    
    // Draw graph axes and labels - MODIFIED: Ultra-fast time scale for immediate results
    drawGraphAxes() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Y-axis
        ctx.moveTo(40, 20);
        ctx.lineTo(40, height - 40);
        
        // X-axis
        ctx.lineTo(width - 20, height - 40);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // X-axis label
        ctx.fillText('Time (sec)', width / 2, height - 10); // Changed from 'Time (min)' to 'Time (sec)' for ultra-fast scale
        
        // Y-axis label (rotated)
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Transpiration Rate (ml/hr)', 0, 0);
        ctx.restore();
        
        // Y-axis scale
        ctx.textAlign = 'right';
        for (let i = 0; i <= 10; i++) {
            const y = height - 40 - (i * (height - 60) / 10);
            ctx.fillText(i.toString(), 35, y + 3);
        }
        
        // X-axis scale - MODIFIED: Ultra-fast time scale showing seconds instead of minutes
        ctx.textAlign = 'center';
        for (let i = 0; i <= 10; i++) {
            const x = 40 + (i * (width - 60) / 10);
            ctx.fillText(i.toString(), x, height - 25); // Shows 0-10 seconds for ultra-fast visualization
        }
    }
    
    // Update graph with new data point - MODIFIED: Ultra-fast time scaling for immediate results
    updateGraph() {
        if (!this.isRunning) return;
        
        const rate = this.calculateTranspirationRate();
        const timePoint = this.timeElapsed / 1000; // Changed from /1000/30 to /1000 for seconds display
        
        this.dataPoints.push({ time: timePoint, rate: rate });
        
        // Redraw graph
        this.drawGraphAxes();
        
        if (this.dataPoints.length > 1) {
            const ctx = this.ctx;
            const width = this.canvas.width;
            const height = this.canvas.height;
            
            ctx.strokeStyle = '#4CAF50';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            // Draw data line - MODIFIED: Ultra-fast scale showing results in seconds
            this.dataPoints.forEach((point, index) => {
                const x = 40 + (point.time / 10) * (width - 60); // Scale to 10 seconds max for ultra-fast visualization
                const y = height - 40 - (point.rate / 10) * (height - 60); // Scale to 10 ml/hr max
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
            
            // Draw data points
            ctx.fillStyle = '#4CAF50';
            this.dataPoints.forEach(point => {
                const x = 40 + (point.time / 10) * (width - 60); // Scale to 10 seconds max
                const y = height - 40 - (point.rate / 10) * (height - 60);
                
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, 2 * Math.PI);
                ctx.fill();
            });
        }
    }
    
    // Start the experiment
    startExperiment() {
        this.isRunning = true;
        this.isPaused = false;
        this.experimentStatus.textContent = 'Running';
        
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        
        // Start animation loop
        this.animate();
        
        // Show guided instructions if in guided mode
        if (this.guidedMode) {
            this.showGuidedInstructions();
        }
    }
    
    // Pause the experiment
    pauseExperiment() {
        this.isPaused = !this.isPaused;
        this.experimentStatus.textContent = this.isPaused ? 'Paused' : 'Running';
        this.pauseBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
        
        if (!this.isPaused) {
            this.animate();
        }
    }
    
    // Reset the experiment
    resetExperiment() {
        this.isRunning = false;
        this.isPaused = false;
        this.timeElapsed = 0;
        this.dataPoints = [];
        this.guidedStep = 0;
        
        this.experimentStatus.textContent = 'Ready';
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.pauseBtn.textContent = 'Pause';
        
        // Clear vapor particles
        this.vaporParticles.innerHTML = '';
        
        // Reset graph
        this.initializeGraph();
        
        // Hide guided instructions
        this.guidedInstructions.classList.remove('show');
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    // Animation loop for real-time updates - MODIFIED: Ultra-fast update intervals for immediate results
    animate() {
        if (!this.isRunning || this.isPaused) return;
        
        this.timeElapsed += 20; // Reduced from 50ms to 20ms for ultra-fast simulation
        
        // Update graph every 100ms instead of 500ms for ultra-fast updates
        if (this.timeElapsed % 100 === 0) {
            this.updateGraph();
        }
        
        // Generate vapor particles ultra-frequently - Reduced from 250ms to 100ms
        if (this.timeElapsed % 100 === 0) {
            this.updateVaporGeneration(this.calculateTranspirationRate());
        }
        
        this.animationId = requestAnimationFrame(() => {
            setTimeout(() => this.animate(), 20); // Reduced from 50ms to 20ms for ultra-fast animation loop
        });
    }
    
    // Toggle guided mode
    toggleGuidedMode(enabled) {
        this.guidedMode = enabled;
        this.guidedStep = 0;
        
        if (enabled && !this.isRunning) {
            this.showGuidedInstructions();
        } else {
            this.guidedInstructions.classList.remove('show');
        }
    }
    
    // Show guided instructions
    showGuidedInstructions() {
        const instructions = [
            "Start by adjusting light intensity and observe the effect on transpiration rate.",
            "Now try changing temperature. Notice how higher temperatures increase transpiration.",
            "Experiment with wind speed. See how air movement affects water loss.",
            "Finally, adjust humidity. Higher humidity should decrease transpiration rate.",
            "Great! You've explored all factors. Try combining different conditions."
        ];
        
        if (this.guidedStep < instructions.length) {
            this.instructionText.textContent = instructions[this.guidedStep];
            this.guidedInstructions.classList.add('show');
        } else {
            this.guidedInstructions.classList.remove('show');
        }
    }
    
    // Handle guided mode steps
    handleGuidedModeStep(factor) {
        if (!this.guidedMode) return;
        
        const expectedFactors = ['light', 'temperature', 'wind', 'humidity'];
        
        if (factor === expectedFactors[this.guidedStep]) {
            this.guidedStep++;
            setTimeout(() => this.showGuidedInstructions(), 1000);
        }
    }
    
    // Compare conditions functionality
    compareConditions() {
        // Save current conditions
        const currentConditions = {
            factors: { ...this.factors },
            rate: this.calculateTranspirationRate()
        };
        
        // Show comparison in tooltip
        const comparisonText = `Current conditions:\nLight: ${this.factors.light}%, Temp: ${this.factors.temperature}°C\nWind: ${this.factors.wind} m/s, Humidity: ${this.factors.humidity}%\nRate: ${currentConditions.rate.toFixed(1)} ml/hr`;
        
        this.showComparisonTooltip(comparisonText);
    }
    
    // Show comparison tooltip
    showComparisonTooltip(text) {
        this.tooltip.textContent = text;
        this.tooltip.style.left = '50%';
        this.tooltip.style.top = '50%';
        this.tooltip.style.transform = 'translate(-50%, -50%)';
        this.tooltip.classList.add('show');
        
        setTimeout(() => {
            this.tooltip.classList.remove('show');
        }, 3000);
    }
    
    // Show tooltip for info icons
    showTooltip(event) {
        const tooltipText = event.target.getAttribute('data-tooltip');
        this.tooltip.textContent = tooltipText;
        
        const rect = event.target.getBoundingClientRect();
        this.tooltip.style.left = `${rect.left + rect.width / 2}px`;
        this.tooltip.style.top = `${rect.bottom + 5}px`;
        this.tooltip.style.transform = 'translateX(-50%)';
        this.tooltip.classList.add('show');
    }
    
    // Hide tooltip
    hideTooltip() {
        this.tooltip.classList.remove('show');
    }
    
    // Setup touch support for mobile devices
    setupTouchSupport() {
        // Add touch event listeners for better mobile interaction
        const sliders = [this.lightSlider, this.tempSlider, this.windSlider, this.humiditySlider];
        
        sliders.forEach(slider => {
            slider.addEventListener('touchstart', (e) => {
                e.preventDefault();
                slider.focus();
            });
            
            slider.addEventListener('touchmove', (e) => {
                e.preventDefault();
            });
        });
        
        // Prevent zoom on double tap for buttons
        const buttons = document.querySelectorAll('.control-btn');
        buttons.forEach(button => {
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                button.click();
            });
        });
    }
}

// Initialize the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TranspirationSimulation();
});