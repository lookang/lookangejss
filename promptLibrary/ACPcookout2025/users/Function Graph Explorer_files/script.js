// Graph Explorer Application
class GraphExplorer {
    constructor() {
        // Initialize canvas and context
        this.canvas = document.getElementById('graph-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Graph properties
        this.scale = 40; // pixels per unit
        this.offsetX = 0;
        this.offsetY = 0;
        this.gridVisible = true;
        
        // Function visibility toggles
        this.showMainFunction = true;
        this.showCustomFunction = false;
        this.customFunctionExists = false;
        
        // Current function parameters
        this.currentType = 'power';
        this.powerParams = { k: 1, n: 2 };
        this.expParams = { k: 1, a: 2 };
        this.customFunction = null;
        
        // Mouse interaction
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.updateEquationDisplay();
        this.draw();
    }
    
    setupCanvas() {
        // Set canvas size to match container
        const resizeCanvas = () => {
            const rect = this.canvas.parentElement.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
            this.draw();
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }
    
    setupEventListeners() {
        // Function type selector
        document.getElementById('function-type').addEventListener('change', (e) => {
            this.currentType = e.target.value;
            this.toggleParameterControls();
            this.updateEquationDisplay();
            this.draw();
        });
        
        // Power function sliders
        document.getElementById('k-power').addEventListener('input', (e) => {
            this.powerParams.k = parseFloat(e.target.value);
            document.getElementById('k-power-value').textContent = this.powerParams.k;
            this.updateEquationDisplay();
            this.draw();
        });
        
        document.getElementById('n-power').addEventListener('input', (e) => {
            this.powerParams.n = parseInt(e.target.value);
            document.getElementById('n-power-value').textContent = this.powerParams.n;
            this.updateEquationDisplay();
            this.draw();
        });
        
        // Exponential function sliders
        document.getElementById('k-exp').addEventListener('input', (e) => {
            this.expParams.k = parseFloat(e.target.value);
            document.getElementById('k-exp-value').textContent = this.expParams.k;
            this.updateEquationDisplay();
            this.draw();
        });
        
        document.getElementById('a-exp').addEventListener('input', (e) => {
            this.expParams.a = parseInt(e.target.value);
            document.getElementById('a-exp-value').textContent = this.expParams.a;
            this.updateEquationDisplay();
            this.draw();
        });
        
        // Graph control buttons
        document.getElementById('zoom-in').addEventListener('click', () => this.zoom(1.2));
        document.getElementById('zoom-out').addEventListener('click', () => this.zoom(0.8));
        document.getElementById('reset-view').addEventListener('click', () => this.resetView());
        document.getElementById('toggle-grid').addEventListener('click', () => this.toggleGrid());
        
        // Custom equation
        document.getElementById('plot-custom').addEventListener('click', () => this.plotCustomFunction());
        
        // Function toggle buttons
        document.querySelectorAll('.toggle-function').forEach(button => {
            button.addEventListener('click', (e) => this.toggleFunction(e.target.dataset.function));
        });
        
        // Mouse interactions for panning and coordinate display
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
        this.canvas.addEventListener('mouseleave', () => this.hideCoordinates());
        
        // Touch support for mobile
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', () => this.handleTouchEnd());
    }
    
    toggleParameterControls() {
        const powerControls = document.getElementById('power-controls');
        const expControls = document.getElementById('exponential-controls');
        
        if (this.currentType === 'power') {
            powerControls.style.display = 'block';
            expControls.style.display = 'none';
        } else {
            powerControls.style.display = 'none';
            expControls.style.display = 'block';
        }
    }
    
    updateEquationDisplay() {
        if (this.currentType === 'power') {
            const { k, n } = this.powerParams;
            let equation = `y = ${k === 1 ? '' : k === -1 ? '-' : k}x`;
            if (n === 1) equation = `y = ${k}x`;
            else if (n === 0) equation = `y = ${k}`;
            else if (n === -1) equation = `y = ${k === 1 ? '' : k}/x`;
            else if (n === -2) equation = `y = ${k === 1 ? '' : k}/x²`;
            else if (n === 2) equation = `y = ${k === 1 ? '' : k}x²`;
            else if (n === 3) equation = `y = ${k === 1 ? '' : k}x³`;
            else equation = `y = ${k === 1 ? '' : k}x^${n}`;
            
            document.getElementById('power-equation').textContent = equation;
            document.getElementById('main-function').textContent = equation;
        } else {
            const { k, a } = this.expParams;
            const equation = `y = ${k === 1 ? '' : k}(${a})^x`;
            document.getElementById('exp-equation').textContent = equation;
            document.getElementById('main-function').textContent = equation;
        }
    }
    
    // Graph drawing functions
    draw() {
        this.clearCanvas();
        if (this.gridVisible) this.drawGrid();
        this.drawAxes();
        
        if (this.showMainFunction) {
            this.drawMainFunction();
        }
        
        if (this.showCustomFunction && this.customFunctionExists) {
            this.drawCustomFunction();
        }
    }
    
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#f8f9fa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawGrid() {
        this.ctx.strokeStyle = '#e9ecef';
        this.ctx.lineWidth = 1;
        
        const centerX = this.canvas.width / 2 + this.offsetX;
        const centerY = this.canvas.height / 2 + this.offsetY;
        
        // Vertical grid lines
        for (let x = centerX % this.scale; x < this.canvas.width; x += this.scale) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let y = centerY % this.scale; y < this.canvas.height; y += this.scale) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    drawAxes() {
        const centerX = this.canvas.width / 2 + this.offsetX;
        const centerY = this.canvas.height / 2 + this.offsetY;
        
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 2;
        
        // X-axis
        this.ctx.beginPath();
        this.ctx.moveTo(0, centerY);
        this.ctx.lineTo(this.canvas.width, centerY);
        this.ctx.stroke();
        
        // Y-axis
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, 0);
        this.ctx.lineTo(centerX, this.canvas.height);
        this.ctx.stroke();
        
        // Draw axis labels and tick marks
        this.drawAxisLabels(centerX, centerY);
    }
    
    drawAxisLabels(centerX, centerY) {
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        
        // X-axis labels
        for (let i = -20; i <= 20; i++) {
            if (i === 0) continue;
            const x = centerX + i * this.scale;
            if (x > 0 && x < this.canvas.width) {
                this.ctx.fillText(i.toString(), x, centerY + 15);
                // Tick marks
                this.ctx.beginPath();
                this.ctx.moveTo(x, centerY - 5);
                this.ctx.lineTo(x, centerY + 5);
                this.ctx.stroke();
            }
        }
        
        // Y-axis labels
        this.ctx.textAlign = 'right';
        for (let i = -20; i <= 20; i++) {
            if (i === 0) continue;
            const y = centerY - i * this.scale;
            if (y > 15 && y < this.canvas.height - 5) {
                this.ctx.fillText(i.toString(), centerX - 10, y + 4);
                // Tick marks
                this.ctx.beginPath();
                this.ctx.moveTo(centerX - 5, y);
                this.ctx.lineTo(centerX + 5, y);
                this.ctx.stroke();
            }
        }
    }
    
    drawMainFunction() {
        this.ctx.strokeStyle = '#e74c3c';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        let firstPoint = true;
        const step = 0.1;
        
        for (let x = -20; x <= 20; x += step) {
            let y;
            
            if (this.currentType === 'power') {
                y = this.evaluatePowerFunction(x, this.powerParams.k, this.powerParams.n);
            } else {
                y = this.evaluateExponentialFunction(x, this.expParams.k, this.expParams.a);
            }
            
            if (isFinite(y) && Math.abs(y) < 1000) {
                const screenX = this.canvas.width / 2 + this.offsetX + x * this.scale;
                const screenY = this.canvas.height / 2 + this.offsetY - y * this.scale;
                
                if (screenX >= 0 && screenX <= this.canvas.width && 
                    screenY >= 0 && screenY <= this.canvas.height) {
                    if (firstPoint) {
                        this.ctx.moveTo(screenX, screenY);
                        firstPoint = false;
                    } else {
                        this.ctx.lineTo(screenX, screenY);
                    }
                }
            } else {
                firstPoint = true;
            }
        }
        
        this.ctx.stroke();
    }
    
    drawCustomFunction() {
        if (!this.customFunction) return;
        
        this.ctx.strokeStyle = '#3498db';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        let firstPoint = true;
        const step = 0.1;
        
        for (let x = -20; x <= 20; x += step) {
            try {
                const y = this.customFunction(x);
                
                if (isFinite(y) && Math.abs(y) < 1000) {
                    const screenX = this.canvas.width / 2 + this.offsetX + x * this.scale;
                    const screenY = this.canvas.height / 2 + this.offsetY - y * this.scale;
                    
                    if (screenX >= 0 && screenX <= this.canvas.width && 
                        screenY >= 0 && screenY <= this.canvas.height) {
                        if (firstPoint) {
                            this.ctx.moveTo(screenX, screenY);
                            firstPoint = false;
                        } else {
                            this.ctx.lineTo(screenX, screenY);
                        }
                    }
                } else {
                    firstPoint = true;
                }
            } catch (e) {
                firstPoint = true;
            }
        }
        
        this.ctx.stroke();
    }
    
    // Function evaluation methods
    evaluatePowerFunction(x, k, n) {
        if (n === 0) return k;
        if (n < 0 && x === 0) return NaN;
        return k * Math.pow(x, n);
    }
    
    evaluateExponentialFunction(x, k, a) {
        return k * Math.pow(a, x);
    }
    
    // Control methods
    zoom(factor) {
        this.scale *= factor;
        this.scale = Math.max(5, Math.min(200, this.scale)); // Limit zoom range
        this.draw();
    }
    
    resetView() {
        this.scale = 40;
        this.offsetX = 0;
        this.offsetY = 0;
        this.draw();
    }
    
    toggleGrid() {
        this.gridVisible = !this.gridVisible;
        this.draw();
    }
    
    toggleFunction(functionType) {
        const button = document.querySelector(`[data-function="${functionType}"]`);
        
        if (functionType === 'main') {
            this.showMainFunction = !this.showMainFunction;
            button.classList.toggle('hidden', !this.showMainFunction);
        } else if (functionType === 'custom') {
            this.showCustomFunction = !this.showCustomFunction;
            button.classList.toggle('hidden', !this.showCustomFunction);
        }
        
        this.draw();
    }
    
    plotCustomFunction() {
        const input = document.getElementById('custom-equation').value.trim();
        if (!input) return;
        
        try {
            // Parse and create custom function (simplified parser)
            this.customFunction = this.parseCustomFunction(input);
            this.customFunctionExists = true;
            this.showCustomFunction = true;
            
            // Update legend
            document.getElementById('custom-legend').style.display = 'flex';
            document.getElementById('custom-function').textContent = input;
            document.querySelector('[data-function="custom"]').classList.remove('hidden');
            
            this.draw();
        } catch (e) {
            alert('Invalid equation format. Please use formats like: 2x^3, 3(2)^x, or 0.5x^2');
        }
    }
    
    parseCustomFunction(input) {
        // Simple parser for basic functions
        // This is a simplified version - in production, you'd want a more robust parser
        const cleanInput = input.replace(/\s/g, '').toLowerCase();
        
        // Power function pattern: ax^n or ax^(n)
        const powerMatch = cleanInput.match(/^(-?\d*\.?\d*)x\^?\(?(-?\d+)\)?$/);
        if (powerMatch) {
            const k = powerMatch[1] === '' ? 1 : powerMatch[1] === '-' ? -1 : parseFloat(powerMatch[1]);
            const n = parseInt(powerMatch[2]);
            return (x) => this.evaluatePowerFunction(x, k, n);
        }
        
        // Exponential function pattern: a(b)^x
        const expMatch = cleanInput.match(/^(-?\d*\.?\d*)\((\d+)\)\^x$/);
        if (expMatch) {
            const k = expMatch[1] === '' ? 1 : expMatch[1] === '-' ? -1 : parseFloat(expMatch[1]);
            const a = parseInt(expMatch[2]);
            return (x) => this.evaluateExponentialFunction(x, k, a);
        }
        
        throw new Error('Invalid format');
    }
    
    // Mouse interaction methods
    handleMouseDown(e) {
        this.isDragging = true;
        const rect = this.canvas.getBoundingClientRect();
        this.lastMouseX = e.clientX - rect.left;
        this.lastMouseY = e.clientY - rect.top;
        this.canvas.style.cursor = 'grabbing';
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        if (this.isDragging) {
            const deltaX = mouseX - this.lastMouseX;
            const deltaY = mouseY - this.lastMouseY;
            
            this.offsetX += deltaX;
            this.offsetY += deltaY;
            
            this.lastMouseX = mouseX;
            this.lastMouseY = mouseY;
            
            this.draw();
        } else {
            // Show coordinates
            this.showCoordinates(mouseX, mouseY);
        }
    }
    
    handleMouseUp() {
        this.isDragging = false;
        this.canvas.style.cursor = 'crosshair';
    }
    
    // Touch event handlers
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.lastMouseX = touch.clientX - rect.left;
        this.lastMouseY = touch.clientY - rect.top;
        this.isDragging = true;
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        if (this.isDragging && e.touches.length === 1) {
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = touch.clientX - rect.left;
            const mouseY = touch.clientY - rect.top;
            
            const deltaX = mouseX - this.lastMouseX;
            const deltaY = mouseY - this.lastMouseY;
            
            this.offsetX += deltaX;
            this.offsetY += deltaY;
            
            this.lastMouseX = mouseX;
            this.lastMouseY = mouseY;
            
            this.draw();
        }
    }
    
    handleTouchEnd() {
        this.isDragging = false;
    }
    
    showCoordinates(mouseX, mouseY) {
        const centerX = this.canvas.width / 2 + this.offsetX;
        const centerY = this.canvas.height / 2 + this.offsetY;
        
        const x = (mouseX - centerX) / this.scale;
        const y = (centerY - mouseY) / this.scale;
        
        document.getElementById('coord-text').textContent = `(${x.toFixed(2)}, ${y.toFixed(2)})`;
        document.getElementById('coordinate-display').style.display = 'block';
    }
    
    hideCoordinates() {
        document.getElementById('coordinate-display').style.display = 'none';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GraphExplorer();
});