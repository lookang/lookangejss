// Distance-Time Graph Simulation
// This script handles car animation and real-time graph plotting
// Modified to use 3 speed buttons with increased gradient differences
// ADDED: Stopwatch functionality and ruler scale integration
// MODIFIED: Car appearance remains consistent across all speeds (same color, same size)

class DistanceTimeSimulation {
    constructor() {
        // Initialize DOM elements - modified for button-based speed control
        this.speedButtons = document.querySelectorAll('.speed-btn');
        this.speedValue = document.getElementById('speed-value');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.car = document.getElementById('car');
        this.canvas = document.getElementById('graph-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentTime = document.getElementById('current-time');
        this.currentDistance = document.getElementById('current-distance');
        
        // NEW: Stopwatch elements
        this.stopwatchTime = document.getElementById('stopwatch-time');
        this.stopwatchHand = document.getElementById('stopwatch-hand');
        
        // Simulation state variables
        this.isRunning = false;
        this.time = 0;
        this.distance = 0;
        this.speed = 0; // Start with stationary (0 m/s)
        this.dataPoints = []; // Store time-distance pairs for graph
        this.animationId = null;
        this.lastTimestamp = 0;
        
        // Speed presets for the three buttons - MODIFIED for increased gradient differences
        this.speedPresets = {
            stationary: 0,
            low: 3,      // Reduced from 5 to 3 m/s for gentler gradient
            high: 20     // Increased from 15 to 20 m/s for steeper gradient
        };
        
        // Graph configuration
        this.graphConfig = {
            maxTime: 20, // seconds
            maxDistance: 200, // meters
            gridLines: true,
            lineColor: '#667eea',
            lineWidth: 3,
            pointRadius: 3
        };
        
        this.initializeEventListeners();
        this.setupCanvas();
        this.drawGraph();
        this.updateSpeedDisplay(); // Initialize speed display
        this.updateStopwatch(); // Initialize stopwatch display
    }
    
    // Set up all event listeners for user interactions
    initializeEventListeners() {
        // Speed button interactions - replaced slider with buttons
        this.speedButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                this.speedButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Update speed based on button's data-speed attribute
                this.speed = parseInt(e.target.dataset.speed);
                this.updateSpeedDisplay();
                this.updateCarSpeed();
            });
        });
        
        // Control button interactions
        this.startBtn.addEventListener('click', () => this.startSimulation());
        this.pauseBtn.addEventListener('click', () => this.pauseSimulation());
        this.resetBtn.addEventListener('click', () => this.resetSimulation());
        
        // Touch and mouse support for mobile devices
        this.addTouchSupport();
    }
    
    // Add touch support for better mobile interaction
    addTouchSupport() {
        const buttons = document.querySelectorAll('.control-btn, .speed-btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                button.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                button.style.transform = '';
                button.click();
            });
        });
    }
    
    // Update speed display text - modified for button interface
    updateSpeedDisplay() {
        this.speedValue.textContent = `${this.speed} m/s`;
    }
    
    // NEW: Update stopwatch display and hand rotation
    updateStopwatch() {
        this.stopwatchTime.textContent = `${this.time.toFixed(1)}s`;
        
        // Rotate stopwatch hand based on time (6 degrees per second for smooth rotation)
        const rotation = (this.time * 6) % 360;
        this.stopwatchHand.style.transformOrigin = '50px 55px';
        this.stopwatchHand.style.transform = `rotate(${rotation}deg)`;
    }
    
    // Configure canvas for responsive drawing
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Set actual canvas size for crisp rendering
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        // Scale context for high DPI displays
        this.ctx.scale(dpr, dpr);
        
        // Set canvas display size
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }
    
    // Start the simulation animation
    startSimulation() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.lastTimestamp = performance.now();
            this.animate();
        }
    }
    
    // Pause the simulation
    pauseSimulation() {
        this.isRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    // Reset simulation to initial state
    resetSimulation() {
        this.pauseSimulation();
        this.time = 0;
        this.distance = 0;
        this.dataPoints = [];
        this.updateCarPosition();
        this.updateDisplayValues();
        this.updateStopwatch(); // Reset stopwatch display
        this.drawGraph();
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        
        // Reset to stationary speed and update button states
        this.speed = 0;
        this.speedButtons.forEach(btn => btn.classList.remove('active'));
        document.getElementById('stationary-btn').classList.add('active');
        this.updateSpeedDisplay();
        this.updateCarSpeed();
    }
    
    // Main animation loop using requestAnimationFrame for smooth performance
    animate(timestamp = 0) {
        if (!this.isRunning) return;
        
        // Calculate time delta for consistent animation speed
        const deltaTime = (timestamp - this.lastTimestamp) / 1000; // Convert to seconds
        this.lastTimestamp = timestamp;
        
        // Update simulation state
        if (deltaTime > 0 && deltaTime < 0.1) { // Prevent large jumps
            this.time += deltaTime;
            this.distance += this.speed * deltaTime;
            
            // Add data point for graph (every 0.1 seconds for smooth curve)
            if (this.dataPoints.length === 0 || 
                this.time - this.dataPoints[this.dataPoints.length - 1].time >= 0.1) {
                this.dataPoints.push({
                    time: this.time,
                    distance: this.distance
                });
            }
            
            // Stop if car reaches end of road
            if (this.distance >= this.graphConfig.maxDistance) {
                this.distance = this.graphConfig.maxDistance;
                this.pauseSimulation();
            }
            
            // Stop if time limit reached
            if (this.time >= this.graphConfig.maxTime) {
                this.pauseSimulation();
            }
        }
        
        // Update visual elements
        this.updateCarPosition();
        this.updateDisplayValues();
        this.updateStopwatch(); // Update stopwatch during animation
        this.drawGraph();
        
        // Continue animation
        if (this.isRunning) {
            this.animationId = requestAnimationFrame((ts) => this.animate(ts));
        }
    }
    
    // Update car position on the road based on distance traveled
    updateCarPosition() {
        const roadWidth = this.car.parentElement.clientWidth - 30; // Account for car width
        const position = (this.distance / this.graphConfig.maxDistance) * roadWidth;
        this.car.style.left = Math.min(position, roadWidth) + 'px';
    }
    
    // MODIFIED: Update car appearance - now maintains consistent appearance across all speeds
    updateCarSpeed() {
        // Car appearance remains consistent across all speeds (same color, same size)
        // Only the horizontal flip is maintained from the CSS
        // Removed all filter and scale changes to keep the same car appearance
        // The car is already horizontally flipped via CSS transform: scaleX(-1)
    }
    
    // Update time and distance display values
    updateDisplayValues() {
        this.currentTime.textContent = `Time: ${this.time.toFixed(1)}s`;
        this.currentDistance.textContent = `Distance: ${this.distance.toFixed(1)}m`;
    }
    
    // Draw the complete distance-time graph with grid and data
    drawGraph() {
        const rect = this.canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Draw grid and axes
        this.drawGrid(width, height);
        this.drawAxes(width, height);
        
        // Draw data line if we have points
        if (this.dataPoints.length > 1) {
            this.drawDataLine(width, height);
        }
        
        // Draw current point
        if (this.dataPoints.length > 0) {
            this.drawCurrentPoint(width, height);
        }
        
        // Draw axis labels
        this.drawAxisLabels(width, height);
    }
    
    // Draw grid lines for better graph readability
    drawGrid(width, height) {
        const margin = 40;
        const graphWidth = width - 2 * margin;
        const graphHeight = height - 2 * margin;
        
        this.ctx.strokeStyle = '#e2e8f0';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([2, 2]);
        
        // Vertical grid lines (time)
        for (let i = 0; i <= 10; i++) {
            const x = margin + (i / 10) * graphWidth;
            this.ctx.beginPath();
            this.ctx.moveTo(x, margin);
            this.ctx.lineTo(x, height - margin);
            this.ctx.stroke();
        }
        
        // Horizontal grid lines (distance)
        for (let i = 0; i <= 10; i++) {
            const y = height - margin - (i / 10) * graphHeight;
            this.ctx.beginPath();
            this.ctx.moveTo(margin, y);
            this.ctx.lineTo(width - margin, y);
            this.ctx.stroke();
        }
        
        this.ctx.setLineDash([]);
    }
    
    // Draw main axes
    drawAxes(width, height) {
        const margin = 40;
        
        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 2;
        
        // X-axis
        this.ctx.beginPath();
        this.ctx.moveTo(margin, height - margin);
        this.ctx.lineTo(width - margin, height - margin);
        this.ctx.stroke();
        
        // Y-axis
        this.ctx.beginPath();
        this.ctx.moveTo(margin, margin);
        this.ctx.lineTo(margin, height - margin);
        this.ctx.stroke();
    }
    
    // Draw the distance-time data line
    drawDataLine(width, height) {
        const margin = 40;
        const graphWidth = width - 2 * margin;
        const graphHeight = height - 2 * margin;
        
        this.ctx.strokeStyle = this.graphConfig.lineColor;
        this.ctx.lineWidth = this.graphConfig.lineWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        this.ctx.beginPath();
        
        // Plot all data points
        this.dataPoints.forEach((point, index) => {
            const x = margin + (point.time / this.graphConfig.maxTime) * graphWidth;
            const y = height - margin - (point.distance / this.graphConfig.maxDistance) * graphHeight;
            
            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });
        
        this.ctx.stroke();
    }
    
    // Draw current position point on the graph
    drawCurrentPoint(width, height) {
        const margin = 40;
        const graphWidth = width - 2 * margin;
        const graphHeight = height - 2 * margin;
        
        const x = margin + (this.time / this.graphConfig.maxTime) * graphWidth;
        const y = height - margin - (this.distance / this.graphConfig.maxDistance) * graphHeight;
        
        // Draw point with glow effect
        this.ctx.fillStyle = this.graphConfig.lineColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.graphConfig.pointRadius + 2, 0, 2 * Math.PI);
        this.ctx.fill();
        
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.graphConfig.pointRadius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    // Draw axis labels with values
    drawAxisLabels(width, height) {
        const margin = 40;
        const graphWidth = width - 2 * margin;
        const graphHeight = height - 2 * margin;
        
        this.ctx.fillStyle = '#4a5568';
        this.ctx.font = '10px Arial';
        this.ctx.textAlign = 'center';
        
        // X-axis labels (time)
        for (let i = 0; i <= 4; i++) {
            const x = margin + (i / 4) * graphWidth;
            const time = (i / 4) * this.graphConfig.maxTime;
            this.ctx.fillText(`${time}s`, x, height - margin + 15);
        }
        
        // Y-axis labels (distance) - MODIFIED to match ruler scale (every 50m)
        this.ctx.textAlign = 'right';
        for (let i = 0; i <= 4; i++) {
            const y = height - margin - (i / 4) * graphHeight;
            const distance = (i / 4) * this.graphConfig.maxDistance;
            this.ctx.fillText(`${distance}m`, margin - 10, y + 3);
        }
    }
}

// Initialize simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create simulation instance
    const simulation = new DistanceTimeSimulation();
    
    // Handle window resize for responsive canvas
    window.addEventListener('resize', () => {
        setTimeout(() => {
            simulation.setupCanvas();
            simulation.drawGraph();
        }, 100);
    });
    
    // Modified keyboard shortcuts for button-based speed control
    document.addEventListener('keydown', (e) => {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                if (simulation.isRunning) {
                    simulation.pauseSimulation();
                } else {
                    simulation.startSimulation();
                }
                break;
            case 'KeyR':
                e.preventDefault();
                simulation.resetSimulation();
                break;
            case 'Digit1':
                e.preventDefault();
                document.getElementById('stationary-btn').click();
                break;
            case 'Digit2':
                e.preventDefault();
                document.getElementById('low-speed-btn').click();
                break;
            case 'Digit3':
                e.preventDefault();
                document.getElementById('high-speed-btn').click();
                break;
        }
    });
    
    // Updated user feedback for keyboard shortcuts with new speed values
    console.log('Keyboard shortcuts: Space (start/pause), R (reset), 1 (stationary), 2 (low speed - 3 m/s), 3 (high speed - 20 m/s)');
    console.log('NEW FEATURES: Added ruler scale (10m accuracy) and animated stopwatch for better educational visualization');
    console.log('MODIFIED: Car is now horizontally flipped and maintains consistent appearance across all speeds');
});