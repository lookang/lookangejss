// Linear Function Explorer - Interactive Graph Visualization
// This script handles the drawing of coordinate system, line plotting, and user interactions

class LinearFunctionExplorer {
    constructor() {
        // Get canvas and context for drawing
        this.canvas = document.getElementById('graphCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Get UI elements
        this.slopeSlider = document.getElementById('slopeSlider');
        this.interceptSlider = document.getElementById('interceptSlider');
        this.slopeValue = document.getElementById('slopeValue');
        this.interceptValue = document.getElementById('interceptValue');
        this.equationDisplay = document.getElementById('equationDisplay');
        this.resetButton = document.getElementById('resetButton');
        this.infoTooltip = document.getElementById('infoTooltip');
        
        // Graph parameters
        this.slope = 1;
        this.intercept = 0;
        
        // Canvas dimensions (will be set dynamically)
        this.canvasWidth = 400;
        this.canvasHeight = 300;
        
        // Graph coordinate system parameters
        this.gridSize = 20; // Size of each grid square in pixels
        this.originX = 0; // Will be calculated as center
        this.originY = 0; // Will be calculated as center
        
        // Initialize the application
        this.init();
    }
    
    init() {
        // Set up canvas dimensions
        this.setupCanvas();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initial draw
        this.updateGraph();
        
        // Show initial tooltip
        this.showTooltip();
    }
    
    setupCanvas() {
        // Get actual canvas dimensions from CSS
        const rect = this.canvas.getBoundingClientRect();
        this.canvasWidth = rect.width;
        this.canvasHeight = rect.height;
        
        // Set canvas internal dimensions to match display size
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        
        // Calculate origin (center of canvas)
        this.originX = this.canvasWidth / 2;
        this.originY = this.canvasHeight / 2;
        
        // Adjust grid size based on canvas size for better visibility
        this.gridSize = Math.min(this.canvasWidth, this.canvasHeight) / 15;
    }
    
    setupEventListeners() {
        // Slope slider events
        this.slopeSlider.addEventListener('input', (e) => {
            this.slope = parseFloat(e.target.value);
            this.updateDisplay();
            this.updateGraph();
        });
        
        // Y-intercept slider events
        this.interceptSlider.addEventListener('input', (e) => {
            this.intercept = parseFloat(e.target.value);
            this.updateDisplay();
            this.updateGraph();
        });
        
        // Reset button
        this.resetButton.addEventListener('click', () => {
            this.resetToDefault();
        });
        
        // Canvas hover for tooltip
        this.canvas.addEventListener('mouseenter', () => {
            this.showTooltip();
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.updateGraph();
        });
        
        // Touch support for mobile devices
        this.setupTouchSupport();
    }
    
    setupTouchSupport() {
        // Prevent default touch behaviors that might interfere
        this.slopeSlider.addEventListener('touchstart', (e) => {
            e.stopPropagation();
        });
        
        this.interceptSlider.addEventListener('touchstart', (e) => {
            e.stopPropagation();
        });
        
        // Add touch feedback
        [this.slopeSlider, this.interceptSlider].forEach(slider => {
            slider.addEventListener('touchstart', () => {
                slider.style.transform = 'scale(1.05)';
            });
            
            slider.addEventListener('touchend', () => {
                slider.style.transform = 'scale(1)';
            });
        });
    }
    
    updateDisplay() {
        // Update value displays
        this.slopeValue.textContent = this.slope.toFixed(1);
        this.interceptValue.textContent = this.intercept.toFixed(1);
        
        // Update equation display
        const slopeText = this.slope === 1 ? '' : this.slope === -1 ? '-' : this.slope.toFixed(1);
        const interceptText = this.intercept === 0 ? '' : 
                             this.intercept > 0 ? ` + ${this.intercept.toFixed(1)}` : 
                             ` - ${Math.abs(this.intercept).toFixed(1)}`;
        
        this.equationDisplay.textContent = `y = ${slopeText}x${interceptText}`;
    }
    
    updateGraph() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        // Draw coordinate system
        this.drawGrid();
        this.drawAxes();
        
        // Draw the linear function
        this.drawLine();
        
        // Draw axis labels and numbers
        this.drawLabels();
    }
    
    drawGrid() {
        // Draw grid lines
        this.ctx.strokeStyle = '#f0f0f0';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        
        // Vertical grid lines
        for (let x = this.originX % this.gridSize; x < this.canvasWidth; x += this.gridSize) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvasHeight);
        }
        
        // Horizontal grid lines
        for (let y = this.originY % this.gridSize; y < this.canvasHeight; y += this.gridSize) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvasWidth, y);
        }
        
        this.ctx.stroke();
    }
    
    drawAxes() {
        // Draw main axes
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        // X-axis
        this.ctx.moveTo(0, this.originY);
        this.ctx.lineTo(this.canvasWidth, this.originY);
        
        // Y-axis
        this.ctx.moveTo(this.originX, 0);
        this.ctx.lineTo(this.originX, this.canvasHeight);
        
        this.ctx.stroke();
        
        // Draw axis arrows
        this.drawArrows();
    }
    
    drawArrows() {
        const arrowSize = 8;
        this.ctx.fillStyle = '#333';
        
        // X-axis arrow (right)
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvasWidth - arrowSize, this.originY - arrowSize/2);
        this.ctx.lineTo(this.canvasWidth, this.originY);
        this.ctx.lineTo(this.canvasWidth - arrowSize, this.originY + arrowSize/2);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Y-axis arrow (up)
        this.ctx.beginPath();
        this.ctx.moveTo(this.originX - arrowSize/2, arrowSize);
        this.ctx.lineTo(this.originX, 0);
        this.ctx.lineTo(this.originX + arrowSize/2, arrowSize);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    drawLabels() {
        this.ctx.fillStyle = '#666';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Calculate how many units each grid represents
        const unitsPerGrid = 1;
        
        // X-axis labels
        for (let i = -10; i <= 10; i++) {
            if (i === 0) continue; // Skip origin
            
            const x = this.originX + i * this.gridSize;
            if (x > 0 && x < this.canvasWidth) {
                this.ctx.fillText(i.toString(), x, this.originY + 15);
            }
        }
        
        // Y-axis labels
        for (let i = -10; i <= 10; i++) {
            if (i === 0) continue; // Skip origin
            
            const y = this.originY - i * this.gridSize;
            if (y > 0 && y < this.canvasHeight) {
                this.ctx.fillText(i.toString(), this.originX - 15, y);
            }
        }
        
        // Origin label
        this.ctx.fillText('0', this.originX - 10, this.originY + 15);
        
        // Axis labels
        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = '#333';
        this.ctx.fillText('x', this.canvasWidth - 15, this.originY - 15);
        this.ctx.fillText('y', this.originX + 15, 15);
    }
    
    drawLine() {
        // Calculate line endpoints
        const leftX = -this.originX / this.gridSize;
        const rightX = (this.canvasWidth - this.originX) / this.gridSize;
        
        const leftY = this.slope * leftX + this.intercept;
        const rightY = this.slope * rightX + this.intercept;
        
        // Convert to canvas coordinates
        const startX = 0;
        const startY = this.originY - leftY * this.gridSize;
        const endX = this.canvasWidth;
        const endY = this.originY - rightY * this.gridSize;
        
        // Draw the line
        this.ctx.strokeStyle = '#e74c3c';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        // Highlight y-intercept point if visible
        const interceptY = this.originY - this.intercept * this.gridSize;
        if (interceptY >= 0 && interceptY <= this.canvasHeight) {
            this.ctx.fillStyle = '#27ae60';
            this.ctx.beginPath();
            this.ctx.arc(this.originX, interceptY, 6, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Add label for y-intercept
            this.ctx.fillStyle = '#27ae60';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`(0, ${this.intercept.toFixed(1)})`, this.originX + 10, interceptY - 10);
        }
    }
    
    resetToDefault() {
        // Reset to default values
        this.slope = 1;
        this.intercept = 0;
        
        // Update sliders
        this.slopeSlider.value = this.slope;
        this.interceptSlider.value = this.intercept;
        
        // Update display and graph
        this.updateDisplay();
        this.updateGraph();
        
        // Show feedback
        this.showResetFeedback();
    }
    
    showResetFeedback() {
        // Briefly highlight the reset button
        this.resetButton.style.background = '#27ae60';
        this.resetButton.textContent = 'Reset ✓';
        
        setTimeout(() => {
            this.resetButton.style.background = '';
            this.resetButton.textContent = 'Reset';
        }, 1000);
    }
    
    showTooltip() {
        this.infoTooltip.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            this.hideTooltip();
        }, 3000);
    }
    
    hideTooltip() {
        this.infoTooltip.classList.remove('show');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create the linear function explorer instance
    const explorer = new LinearFunctionExplorer();
    
    // Add some educational tips
    const tips = [
        "Try setting the slope to 0 - what happens to the line?",
        "Make the slope negative - notice how the line tilts the other way!",
        "The y-intercept is where the line crosses the y-axis",
        "Steeper slopes make the line more vertical",
        "When slope = 1, the line goes up 1 unit for every 1 unit right"
    ];
    
    let tipIndex = 0;
    
    // Show educational tips periodically
    setInterval(() => {
        if (!explorer.infoTooltip.classList.contains('show')) {
            explorer.infoTooltip.textContent = tips[tipIndex];
            explorer.showTooltip();
            tipIndex = (tipIndex + 1) % tips.length;
        }
    }, 10000);
    
    // Add keyboard shortcuts for accessibility
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'r':
            case 'R':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    explorer.resetToDefault();
                }
                break;
            case 'ArrowUp':
                if (e.target === explorer.slopeSlider) {
                    e.preventDefault();
                    explorer.slope = Math.min(5, explorer.slope + 0.1);
                    explorer.slopeSlider.value = explorer.slope;
                    explorer.updateDisplay();
                    explorer.updateGraph();
                }
                break;
            case 'ArrowDown':
                if (e.target === explorer.slopeSlider) {
                    e.preventDefault();
                    explorer.slope = Math.max(-5, explorer.slope - 0.1);
                    explorer.slopeSlider.value = explorer.slope;
                    explorer.updateDisplay();
                    explorer.updateGraph();
                }
                break;
        }
    });
    
    console.log('Linear Function Explorer initialized successfully!');
});