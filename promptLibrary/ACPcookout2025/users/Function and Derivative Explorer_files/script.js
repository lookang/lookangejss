// Function and Derivative Explorer - Interactive Graph Visualization
// This script handles the mathematical calculations, graph rendering, and user interactions

class FunctionDerivativeExplorer {
    constructor() {
        // Initialize canvas contexts and parameters
        this.functionCanvas = document.getElementById('functionCanvas');
        this.derivativeCanvas = document.getElementById('derivativeCanvas');
        this.functionCtx = this.functionCanvas.getContext('2d');
        this.derivativeCtx = this.derivativeCanvas.getContext('2d');
        
        // Graph parameters and settings
        this.scale = 40; // pixels per unit
        this.originX = 300; // center x position
        this.originY = 100; // center y position
        this.gridSize = 20; // grid spacing
        
        // Function parameters (a, b, c, d for various function types)
        this.params = { a: 1, b: 0, c: 0, d: 0 };
        this.functionType = 'quadratic';
        
        // Display toggles
        this.showFunction = true;
        this.showDerivative = true;
        this.showPoints = false;
        
        // Plotted points storage
        this.plottedPoints = [];
        
        // Initialize the application
        this.init();
    }
    
    // Initialize event listeners and render initial graphs
    init() {
        this.setupEventListeners();
        this.resizeCanvases();
        this.updateDisplay();
        
        // Handle window resize for responsive design
        window.addEventListener('resize', () => {
            this.resizeCanvases();
            this.updateDisplay();
        });
    }
    
    // Set up all event listeners for user interactions
    setupEventListeners() {
        // Function type selector
        document.getElementById('functionType').addEventListener('change', (e) => {
            this.functionType = e.target.value;
            this.updateParameterVisibility();
            this.updateDisplay();
        });
        
        // Parameter sliders with real-time updates
        ['A', 'B', 'C', 'D'].forEach(param => {
            const slider = document.getElementById(`param${param}`);
            const valueDisplay = document.getElementById(`value${param}`);
            
            slider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                this.params[param.toLowerCase()] = value;
                valueDisplay.textContent = value.toFixed(1);
                this.updateDisplay();
            });
        });
        
        // Toggle buttons for showing/hiding elements
        document.getElementById('toggleFunction').addEventListener('click', () => {
            this.toggleDisplay('function');
        });
        
        document.getElementById('toggleDerivative').addEventListener('click', () => {
            this.toggleDisplay('derivative');
        });
        
        document.getElementById('togglePoints').addEventListener('click', () => {
            this.toggleDisplay('points');
        });
        
        // Zoom and pan controls
        document.getElementById('zoomIn').addEventListener('click', () => {
            this.scale *= 1.2;
            this.updateDisplay();
        });
        
        document.getElementById('zoomOut').addEventListener('click', () => {
            this.scale /= 1.2;
            this.updateDisplay();
        });
        
        document.getElementById('resetView').addEventListener('click', () => {
            this.scale = 40;
            this.originX = this.functionCanvas.width / 2;
            this.originY = this.functionCanvas.height / 2;
            this.plottedPoints = [];
            this.updateDisplay();
        });
        
        // Canvas click events for plotting points
        this.functionCanvas.addEventListener('click', (e) => {
            this.handleCanvasClick(e, 'function');
        });
        
        this.derivativeCanvas.addEventListener('click', (e) => {
            this.handleCanvasClick(e, 'derivative');
        });
        
        // Mouse move events for coordinate display
        this.functionCanvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e, 'function');
        });
        
        this.derivativeCanvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e, 'derivative');
        });
    }
    
    // Adjust canvas sizes based on container dimensions
    resizeCanvases() {
        const container = document.querySelector('.graph-container');
        const containerRect = container.getBoundingClientRect();
        const width = containerRect.width - 16; // Account for padding
        const height = (containerRect.height - 24) / 2; // Split between two canvases
        
        // Set canvas dimensions
        [this.functionCanvas, this.derivativeCanvas].forEach(canvas => {
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
        });
        
        // Update origin positions
        this.originX = width / 2;
        this.originY = height / 2;
    }
    
    // Show/hide parameter sliders based on function type
    updateParameterVisibility() {
        const paramDGroup = document.getElementById('paramDGroup');
        
        // Show d parameter for cubic and sine functions
        if (this.functionType === 'cubic' || this.functionType === 'sine' || this.functionType === 'exponential') {
            paramDGroup.style.display = 'flex';
        } else {
            paramDGroup.style.display = 'none';
        }
        
        // Reset parameters when changing function type
        this.resetParameters();
    }
    
    // Reset parameters to default values
    resetParameters() {
        this.params = { a: 1, b: 0, c: 0, d: 0 };
        
        // Update slider values and displays
        ['A', 'B', 'C', 'D'].forEach(param => {
            const slider = document.getElementById(`param${param}`);
            const valueDisplay = document.getElementById(`value${param}`);
            const value = this.params[param.toLowerCase()];
            
            slider.value = value;
            valueDisplay.textContent = value.toFixed(1);
        });
    }
    
    // Toggle display of function elements
    toggleDisplay(element) {
        const button = document.getElementById(`toggle${element.charAt(0).toUpperCase() + element.slice(1)}`);
        
        switch(element) {
            case 'function':
                this.showFunction = !this.showFunction;
                break;
            case 'derivative':
                this.showDerivative = !this.showDerivative;
                break;
            case 'points':
                this.showPoints = !this.showPoints;
                if (!this.showPoints) {
                    this.plottedPoints = [];
                }
                break;
        }
        
        // Update button appearance
        button.classList.toggle('active');
        this.updateDisplay();
    }
    
    // Handle canvas click events for point plotting
    handleCanvasClick(event, canvasType) {
        if (!this.showPoints) return;
        
        const canvas = canvasType === 'function' ? this.functionCanvas : this.derivativeCanvas;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Convert pixel coordinates to mathematical coordinates
        const mathX = (x - this.originX) / this.scale;
        const mathY = (this.originY - y) / this.scale;
        
        // Calculate function values at clicked x-coordinate
        const functionValue = this.evaluateFunction(mathX);
        const derivativeValue = this.evaluateDerivative(mathX);
        
        // Add point to plotted points
        this.plottedPoints.push({
            x: mathX,
            functionY: functionValue,
            derivativeY: derivativeValue,
            canvasType: canvasType
        });
        
        this.updateDisplay();
        this.updateMouseInfo(`Point: (${mathX.toFixed(2)}, ${canvasType === 'function' ? functionValue.toFixed(2) : derivativeValue.toFixed(2)})`);
    }
    
    // Handle mouse movement for coordinate display
    handleMouseMove(event, canvasType) {
        const canvas = canvasType === 'function' ? this.functionCanvas : this.derivativeCanvas;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Convert to mathematical coordinates
        const mathX = (x - this.originX) / this.scale;
        const mathY = (this.originY - y) / this.scale;
        
        // Calculate function values
        const functionValue = this.evaluateFunction(mathX);
        const derivativeValue = this.evaluateDerivative(mathX);
        
        // Update mouse info display
        const value = canvasType === 'function' ? functionValue : derivativeValue;
        this.updateMouseInfo(`x: ${mathX.toFixed(2)}, ${canvasType === 'function' ? 'f(x)' : "f'(x)"}: ${value.toFixed(2)}`);
    }
    
    // Evaluate the main function based on type and parameters
    evaluateFunction(x) {
        const { a, b, c, d } = this.params;
        
        switch(this.functionType) {
            case 'quadratic':
                return a * x * x + b * x + c;
            case 'cubic':
                return a * x * x * x + b * x * x + c * x + d;
            case 'sine':
                return a * Math.sin(b * x + c) + d;
            case 'exponential':
                return a * Math.exp(b * x) + c;
            default:
                return 0;
        }
    }
    
    // Evaluate the derivative function
    evaluateDerivative(x) {
        const { a, b, c, d } = this.params;
        
        switch(this.functionType) {
            case 'quadratic':
                return 2 * a * x + b;
            case 'cubic':
                return 3 * a * x * x + 2 * b * x + c;
            case 'sine':
                return a * b * Math.cos(b * x + c);
            case 'exponential':
                return a * b * Math.exp(b * x);
            default:
                return 0;
        }
    }
    
    // Main display update function
    updateDisplay() {
        this.clearCanvases();
        this.drawGrids();
        
        if (this.showFunction) {
            this.drawFunction(this.functionCtx, this.evaluateFunction.bind(this), '#667eea', 2);
        }
        
        if (this.showDerivative) {
            this.drawFunction(this.derivativeCtx, this.evaluateDerivative.bind(this), '#e74c3c', 2);
        }
        
        if (this.showPoints) {
            this.drawPlottedPoints();
        }
        
        this.updateEquationDisplays();
    }
    
    // Clear both canvases
    clearCanvases() {
        this.functionCtx.clearRect(0, 0, this.functionCanvas.width, this.functionCanvas.height);
        this.derivativeCtx.clearRect(0, 0, this.derivativeCanvas.width, this.derivativeCanvas.height);
    }
    
    // Draw coordinate grids on both canvases
    drawGrids() {
        [this.functionCtx, this.derivativeCtx].forEach(ctx => {
            const canvas = ctx.canvas;
            
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            
            // Draw vertical grid lines
            for (let x = 0; x < canvas.width; x += this.gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            
            // Draw horizontal grid lines
            for (let y = 0; y < canvas.height; y += this.gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            // Draw axes
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            
            // X-axis
            ctx.beginPath();
            ctx.moveTo(0, this.originY);
            ctx.lineTo(canvas.width, this.originY);
            ctx.stroke();
            
            // Y-axis
            ctx.beginPath();
            ctx.moveTo(this.originX, 0);
            ctx.lineTo(this.originX, canvas.height);
            ctx.stroke();
            
            // Draw axis labels
            ctx.fillStyle = '#666';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            
            // X-axis numbers
            for (let i = -10; i <= 10; i++) {
                if (i !== 0) {
                    const x = this.originX + i * this.scale;
                    if (x > 0 && x < canvas.width) {
                        ctx.fillText(i.toString(), x, this.originY + 15);
                    }
                }
            }
            
            // Y-axis numbers
            ctx.textAlign = 'right';
            for (let i = -5; i <= 5; i++) {
                if (i !== 0) {
                    const y = this.originY - i * this.scale;
                    if (y > 0 && y < canvas.height) {
                        ctx.fillText(i.toString(), this.originX - 5, y + 4);
                    }
                }
            }
        });
    }
    
    // Draw a function curve on the specified context
    drawFunction(ctx, func, color, lineWidth) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        
        let firstPoint = true;
        const step = 1 / this.scale; // Adaptive step size based on zoom
        
        for (let x = -ctx.canvas.width / (2 * this.scale); x <= ctx.canvas.width / (2 * this.scale); x += step) {
            const y = func(x);
            
            // Skip infinite or NaN values
            if (!isFinite(y)) continue;
            
            const pixelX = this.originX + x * this.scale;
            const pixelY = this.originY - y * this.scale;
            
            // Only draw if point is within reasonable bounds
            if (Math.abs(pixelY) < ctx.canvas.height * 2) {
                if (firstPoint) {
                    ctx.moveTo(pixelX, pixelY);
                    firstPoint = false;
                } else {
                    ctx.lineTo(pixelX, pixelY);
                }
            }
        }
        
        ctx.stroke();
    }
    
    // Draw plotted points on both canvases
    drawPlottedPoints() {
        this.plottedPoints.forEach(point => {
            // Draw on function canvas
            this.functionCtx.fillStyle = '#667eea';
            this.functionCtx.beginPath();
            this.functionCtx.arc(
                this.originX + point.x * this.scale,
                this.originY - point.functionY * this.scale,
                4,
                0,
                2 * Math.PI
            );
            this.functionCtx.fill();
            
            // Draw on derivative canvas
            this.derivativeCtx.fillStyle = '#e74c3c';
            this.derivativeCtx.beginPath();
            this.derivativeCtx.arc(
                this.originX + point.x * this.scale,
                this.originY - point.derivativeY * this.scale,
                4,
                0,
                2 * Math.PI
            );
            this.derivativeCtx.fill();
        });
    }
    
    // Update equation displays
    updateEquationDisplays() {
        const { a, b, c, d } = this.params;
        let functionEq = '';
        let derivativeEq = '';
        
        switch(this.functionType) {
            case 'quadratic':
                functionEq = `f(x) = ${a.toFixed(1)}x² + ${b.toFixed(1)}x + ${c.toFixed(1)}`;
                derivativeEq = `f'(x) = ${(2*a).toFixed(1)}x + ${b.toFixed(1)}`;
                break;
            case 'cubic':
                functionEq = `f(x) = ${a.toFixed(1)}x³ + ${b.toFixed(1)}x² + ${c.toFixed(1)}x + ${d.toFixed(1)}`;
                derivativeEq = `f'(x) = ${(3*a).toFixed(1)}x² + ${(2*b).toFixed(1)}x + ${c.toFixed(1)}`;
                break;
            case 'sine':
                functionEq = `f(x) = ${a.toFixed(1)}sin(${b.toFixed(1)}x + ${c.toFixed(1)}) + ${d.toFixed(1)}`;
                derivativeEq = `f'(x) = ${(a*b).toFixed(1)}cos(${b.toFixed(1)}x + ${c.toFixed(1)})`;
                break;
            case 'exponential':
                functionEq = `f(x) = ${a.toFixed(1)}e^(${b.toFixed(1)}x) + ${c.toFixed(1)}`;
                derivativeEq = `f'(x) = ${(a*b).toFixed(1)}e^(${b.toFixed(1)}x)`;
                break;
        }
        
        document.getElementById('equationDisplay').textContent = functionEq;
        document.getElementById('derivativeDisplay').textContent = derivativeEq;
    }
    
    // Update mouse information display
    updateMouseInfo(info) {
        document.getElementById('mouseInfo').textContent = info;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FunctionDerivativeExplorer();
});