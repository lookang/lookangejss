// Graph Visualizer Class - Main application logic
class LinearGraphVisualizer {
    constructor() {
        // Initialize canvas and context for drawing
        this.canvas = document.getElementById('graph-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Graph parameters and state
        this.slope = 1;
        this.intercept = 0;
        this.scale = 20; // pixels per unit
        this.offsetX = 0;
        this.offsetY = 0;
        this.showGrid = true;
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        
        // Get DOM elements for controls
        this.slopeSlider = document.getElementById('slope-slider');
        this.slopeInput = document.getElementById('slope-input');
        this.interceptSlider = document.getElementById('intercept-slider');
        this.interceptInput = document.getElementById('intercept-input');
        this.coordinateDisplay = document.getElementById('coordinate-display');
        this.mouseCoords = document.getElementById('mouse-coords');
        
        // Initialize the application
        this.setupCanvas();
        this.setupEventListeners();
        this.updateEquation();
        this.draw();
    }
    
    // Setup canvas dimensions and handle resize
    setupCanvas() {
        const resizeCanvas = () => {
            const rect = this.canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            
            // Set actual canvas size for high DPI displays
            this.canvas.width = rect.width * dpr;
            this.canvas.height = rect.height * dpr;
            
            // Scale context for high DPI
            this.ctx.scale(dpr, dpr);
            
            // Set CSS size
            this.canvas.style.width = rect.width + 'px';
            this.canvas.style.height = rect.height + 'px';
            
            this.draw();
        };
        
        // Initial setup and resize listener
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }
    
    // Setup all event listeners for user interactions
    setupEventListeners() {
        // Slope control synchronization
        this.slopeSlider.addEventListener('input', (e) => {
            this.slope = parseFloat(e.target.value);
            this.slopeInput.value = this.slope;
            this.updateEquation();
            this.draw();
        });
        
        this.slopeInput.addEventListener('input', (e) => {
            this.slope = parseFloat(e.target.value) || 0;
            this.slopeSlider.value = this.slope;
            this.updateEquation();
            this.draw();
        });
        
        // Y-intercept control synchronization
        this.interceptSlider.addEventListener('input', (e) => {
            this.intercept = parseFloat(e.target.value);
            this.interceptInput.value = this.intercept;
            this.updateEquation();
            this.draw();
        });
        
        this.interceptInput.addEventListener('input', (e) => {
            this.intercept = parseFloat(e.target.value) || 0;
            this.interceptSlider.value = this.intercept;
            this.updateEquation();
            this.draw();
        });
        
        // Action buttons
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetGraph();
        });
        
        document.getElementById('random-btn').addEventListener('click', () => {
            this.generateRandom();
        });
        
        document.getElementById('grid-toggle').addEventListener('click', () => {
            this.toggleGrid();
        });
        
        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', () => {
            this.zoom(1.2);
        });
        
        document.getElementById('zoom-out').addEventListener('click', () => {
            this.zoom(0.8);
        });
        
        document.getElementById('zoom-reset').addEventListener('click', () => {
            this.resetZoom();
        });
        
        // Mouse interactions for coordinate display and panning
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
        
        this.canvas.addEventListener('mouseenter', () => {
            this.coordinateDisplay.classList.add('visible');
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.coordinateDisplay.classList.remove('visible');
        });
        
        // Touch support for mobile devices
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const mouseEvent = {
                clientX: touch.clientX,
                clientY: touch.clientY
            };
            this.handleMouseMove(mouseEvent);
        });
    }
    
    // Handle mouse movement for coordinate display
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Convert pixel coordinates to graph coordinates
        const graphX = this.pixelToGraphX(x);
        const graphY = this.pixelToGraphY(y);
        
        // Update coordinate display
        this.mouseCoords.textContent = `(${graphX.toFixed(1)}, ${graphY.toFixed(1)})`;
    }
    
    // Convert pixel coordinates to graph coordinates
    pixelToGraphX(pixelX) {
        const centerX = this.canvas.clientWidth / 2;
        return (pixelX - centerX + this.offsetX) / this.scale;
    }
    
    pixelToGraphY(pixelY) {
        const centerY = this.canvas.clientHeight / 2;
        return -(pixelY - centerY - this.offsetY) / this.scale;
    }
    
    // Convert graph coordinates to pixel coordinates
    graphToPixelX(graphX) {
        const centerX = this.canvas.clientWidth / 2;
        return graphX * this.scale + centerX - this.offsetX;
    }
    
    graphToPixelY(graphY) {
        const centerY = this.canvas.clientHeight / 2;
        return -graphY * this.scale + centerY + this.offsetY;
    }
    
    // Update equation display and descriptions
    updateEquation() {
        document.getElementById('slope-value').textContent = this.slope.toFixed(1);
        document.getElementById('intercept-value').textContent = this.intercept >= 0 ? this.intercept.toFixed(1) : this.intercept.toFixed(1);
        
        // Update slope description
        const slopeDesc = document.getElementById('slope-description');
        if (this.slope > 0) {
            slopeDesc.textContent = 'Positive - line goes up';
            slopeDesc.style.color = '#10b981';
        } else if (this.slope < 0) {
            slopeDesc.textContent = 'Negative - line goes down';
            slopeDesc.style.color = '#ef4444';
        } else {
            slopeDesc.textContent = 'Zero - horizontal line';
            slopeDesc.style.color = '#6b7280';
        }
        
        // Update intercept description
        const interceptDesc = document.getElementById('intercept-description');
        interceptDesc.textContent = `Line crosses y-axis at ${this.intercept.toFixed(1)}`;
    }
    
    // Reset graph to default values
    resetGraph() {
        this.slope = 1;
        this.intercept = 0;
        this.scale = 20;
        this.offsetX = 0;
        this.offsetY = 0;
        
        // Update controls
        this.slopeSlider.value = this.slope;
        this.slopeInput.value = this.slope;
        this.interceptSlider.value = this.intercept;
        this.interceptInput.value = this.intercept;
        
        this.updateEquation();
        this.draw();
    }
    
    // Generate random equation parameters
    generateRandom() {
        this.slope = (Math.random() * 8 - 4); // -4 to 4
        this.intercept = (Math.random() * 16 - 8); // -8 to 8
        
        // Round to reasonable precision
        this.slope = Math.round(this.slope * 2) / 2;
        this.intercept = Math.round(this.intercept * 2) / 2;
        
        // Update controls
        this.slopeSlider.value = this.slope;
        this.slopeInput.value = this.slope;
        this.interceptSlider.value = this.intercept;
        this.interceptInput.value = this.intercept;
        
        this.updateEquation();
        this.draw();
    }
    
    // Toggle grid visibility
    toggleGrid() {
        this.showGrid = !this.showGrid;
        const btn = document.getElementById('grid-toggle');
        btn.style.background = this.showGrid ? 
            'linear-gradient(135deg, #10b981, #059669)' : 
            'linear-gradient(135deg, #6b7280, #4b5563)';
        this.draw();
    }
    
    // Zoom functionality
    zoom(factor) {
        this.scale *= factor;
        this.scale = Math.max(5, Math.min(100, this.scale)); // Limit zoom range
        this.draw();
    }
    
    resetZoom() {
        this.scale = 20;
        this.offsetX = 0;
        this.offsetY = 0;
        this.draw();
    }
    
    // Main drawing function
    draw() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Draw grid if enabled
        if (this.showGrid) {
            this.drawGrid();
        }
        
        // Draw axes
        this.drawAxes();
        
        // Draw the linear function
        this.drawLinearFunction();
        
        // Draw axis labels
        this.drawAxisLabels();
    }
    
    // Draw coordinate grid
    drawGrid() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        
        this.ctx.strokeStyle = '#f0f0f0';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        
        // Vertical grid lines
        const startX = -Math.ceil(width / (2 * this.scale));
        const endX = Math.ceil(width / (2 * this.scale));
        for (let x = startX; x <= endX; x++) {
            const pixelX = this.graphToPixelX(x);
            if (pixelX >= 0 && pixelX <= width) {
                this.ctx.moveTo(pixelX, 0);
                this.ctx.lineTo(pixelX, height);
            }
        }
        
        // Horizontal grid lines
        const startY = -Math.ceil(height / (2 * this.scale));
        const endY = Math.ceil(height / (2 * this.scale));
        for (let y = startY; y <= endY; y++) {
            const pixelY = this.graphToPixelY(y);
            if (pixelY >= 0 && pixelY <= height) {
                this.ctx.moveTo(0, pixelY);
                this.ctx.lineTo(width, pixelY);
            }
        }
        
        this.ctx.stroke();
    }
    
    // Draw coordinate axes
    drawAxes() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        const centerX = width / 2 - this.offsetX;
        const centerY = height / 2 + this.offsetY;
        
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        // X-axis
        if (centerY >= 0 && centerY <= height) {
            this.ctx.moveTo(0, centerY);
            this.ctx.lineTo(width, centerY);
        }
        
        // Y-axis
        if (centerX >= 0 && centerX <= width) {
            this.ctx.moveTo(centerX, 0);
            this.ctx.lineTo(centerX, height);
        }
        
        this.ctx.stroke();
        
        // Draw axis arrows
        this.drawArrows(centerX, centerY, width, height);
    }
    
    // Draw arrows on axes
    drawArrows(centerX, centerY, width, height) {
        this.ctx.fillStyle = '#333';
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        
        const arrowSize = 8;
        
        // X-axis arrow (right)
        if (centerY >= 0 && centerY <= height) {
            this.ctx.beginPath();
            this.ctx.moveTo(width - arrowSize, centerY - arrowSize/2);
            this.ctx.lineTo(width, centerY);
            this.ctx.lineTo(width - arrowSize, centerY + arrowSize/2);
            this.ctx.stroke();
        }
        
        // Y-axis arrow (up)
        if (centerX >= 0 && centerX <= width) {
            this.ctx.beginPath();
            this.ctx.moveTo(centerX - arrowSize/2, arrowSize);
            this.ctx.lineTo(centerX, 0);
            this.ctx.lineTo(centerX + arrowSize/2, arrowSize);
            this.ctx.stroke();
        }
    }
    
    // Draw the linear function line
    drawLinearFunction() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        
        // Calculate line endpoints
        const leftX = this.pixelToGraphX(0);
        const rightX = this.pixelToGraphX(width);
        const leftY = this.slope * leftX + this.intercept;
        const rightY = this.slope * rightX + this.intercept;
        
        // Convert back to pixel coordinates
        const startPixelX = this.graphToPixelX(leftX);
        const startPixelY = this.graphToPixelY(leftY);
        const endPixelX = this.graphToPixelX(rightX);
        const endPixelY = this.graphToPixelY(rightY);
        
        // Draw the line
        this.ctx.strokeStyle = '#4f46e5';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(startPixelX, startPixelY);
        this.ctx.lineTo(endPixelX, endPixelY);
        this.ctx.stroke();
        
        // Highlight y-intercept point
        const interceptPixelX = this.graphToPixelX(0);
        const interceptPixelY = this.graphToPixelY(this.intercept);
        
        if (interceptPixelX >= -10 && interceptPixelX <= width + 10 && 
            interceptPixelY >= -10 && interceptPixelY <= height + 10) {
            this.ctx.fillStyle = '#ef4444';
            this.ctx.beginPath();
            this.ctx.arc(interceptPixelX, interceptPixelY, 6, 0, 2 * Math.PI);
            this.ctx.fill();
            
            // Add label for y-intercept
            this.ctx.fillStyle = '#333';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`(0, ${this.intercept.toFixed(1)})`, interceptPixelX + 10, interceptPixelY - 10);
        }
    }
    
    // Draw axis labels and tick marks
    drawAxisLabels() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        const centerX = width / 2 - this.offsetX;
        const centerY = height / 2 + this.offsetY;
        
        this.ctx.fillStyle = '#666';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        
        // X-axis labels
        if (centerY >= 0 && centerY <= height) {
            const step = Math.max(1, Math.round(10 / this.scale));
            const startX = Math.floor(this.pixelToGraphX(0) / step) * step;
            const endX = Math.ceil(this.pixelToGraphX(width) / step) * step;
            
            for (let x = startX; x <= endX; x += step) {
                if (x !== 0) {
                    const pixelX = this.graphToPixelX(x);
                    if (pixelX >= 0 && pixelX <= width) {
                        // Tick mark
                        this.ctx.strokeStyle = '#666';
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(pixelX, centerY - 5);
                        this.ctx.lineTo(pixelX, centerY + 5);
                        this.ctx.stroke();
                        
                        // Label
                        this.ctx.fillText(x.toString(), pixelX, centerY + 18);
                    }
                }
            }
        }
        
        // Y-axis labels
        if (centerX >= 0 && centerX <= width) {
            const step = Math.max(1, Math.round(10 / this.scale));
            const startY = Math.floor(this.pixelToGraphY(height) / step) * step;
            const endY = Math.ceil(this.pixelToGraphY(0) / step) * step;
            
            this.ctx.textAlign = 'right';
            for (let y = startY; y <= endY; y += step) {
                if (y !== 0) {
                    const pixelY = this.graphToPixelY(y);
                    if (pixelY >= 0 && pixelY <= height) {
                        // Tick mark
                        this.ctx.strokeStyle = '#666';
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(centerX - 5, pixelY);
                        this.ctx.lineTo(centerX + 5, pixelY);
                        this.ctx.stroke();
                        
                        // Label
                        this.ctx.fillText(y.toString(), centerX - 10, pixelY + 4);
                    }
                }
            }
        }
        
        // Origin label
        if (centerX >= 0 && centerX <= width && centerY >= 0 && centerY <= height) {
            this.ctx.textAlign = 'right';
            this.ctx.fillText('0', centerX - 10, centerY + 15);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LinearGraphVisualizer();
});

// Add keyboard shortcuts for better accessibility
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.key) {
        case 'r':
        case 'R':
            document.getElementById('reset-btn').click();
            break;
        case 'g':
        case 'G':
            document.getElementById('grid-toggle').click();
            break;
        case '+':
        case '=':
            document.getElementById('zoom-in').click();
            break;
        case '-':
            document.getElementById('zoom-out').click();
            break;
    }
});