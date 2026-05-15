// Riemann Sum Explorer - Interactive visualization of numerical integration
class RiemannSumExplorer {
    constructor() {
        // Get DOM elements
        this.canvas = document.getElementById('graph-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.functionSelect = document.getElementById('function-select');
        this.nSlider = document.getElementById('n-slider');
        this.nValue = document.getElementById('n-value');
        this.lowerBound = document.getElementById('lower-bound');
        this.upperBound = document.getElementById('upper-bound');
        this.methodSelect = document.getElementById('method-select');
        this.riemannResult = document.getElementById('riemann-result');
        this.exactResult = document.getElementById('exact-result');
        this.errorResult = document.getElementById('error-result');
        this.tooltip = document.getElementById('tooltip');

        // Set canvas size based on container
        this.resizeCanvas();
        
        // Mathematical functions and their exact integrals
        this.functions = {
            quadratic: {
                f: (x) => x * x,
                integral: (a, b) => (Math.pow(b, 3) - Math.pow(a, 3)) / 3,
                label: 'f(x) = x²'
            },
            cubic: {
                f: (x) => x * x * x,
                integral: (a, b) => (Math.pow(b, 4) - Math.pow(a, 4)) / 4,
                label: 'f(x) = x³'
            },
            sine: {
                f: (x) => Math.sin(x),
                integral: (a, b) => -Math.cos(b) + Math.cos(a),
                label: 'f(x) = sin(x)'
            },
            exponential: {
                f: (x) => Math.exp(x),
                integral: (a, b) => Math.exp(b) - Math.exp(a),
                label: 'f(x) = eˣ'
            }
        };

        // Initialize event listeners
        this.initEventListeners();
        
        // Initial render
        this.updateVisualization();
    }

    // Set up canvas dimensions responsively
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        // Set canvas size to fit container while maintaining aspect ratio
        const maxWidth = rect.width - 24;
        const maxHeight = rect.height - 24;
        const aspectRatio = 2; // 2:1 aspect ratio
        
        if (maxWidth / aspectRatio <= maxHeight) {
            this.canvas.width = maxWidth;
            this.canvas.height = maxWidth / aspectRatio;
        } else {
            this.canvas.height = maxHeight;
            this.canvas.width = maxHeight * aspectRatio;
        }
        
        // Set CSS size to match canvas size
        this.canvas.style.width = this.canvas.width + 'px';
        this.canvas.style.height = this.canvas.height + 'px';
    }

    // Initialize all event listeners
    initEventListeners() {
        // Function selection change
        this.functionSelect.addEventListener('change', () => this.updateVisualization());
        
        // Number of rectangles slider
        this.nSlider.addEventListener('input', (e) => {
            this.nValue.textContent = e.target.value;
            this.updateVisualization();
        });
        
        // Integration bounds
        this.lowerBound.addEventListener('input', () => this.updateVisualization());
        this.upperBound.addEventListener('input', () => this.updateVisualization());
        
        // Method selection
        this.methodSelect.addEventListener('change', () => this.updateVisualization());
        
        // Tooltip functionality
        this.setupTooltips();
        
        // Window resize handling
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.updateVisualization();
        });
    }

    // Set up tooltip system for better UX in iframe
    setupTooltips() {
        const elementsWithTooltips = document.querySelectorAll('[title]');
        
        elementsWithTooltips.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const title = e.target.getAttribute('title');
                if (title) {
                    this.showTooltip(e, title);
                    e.target.removeAttribute('title'); // Prevent default tooltip
                    e.target.setAttribute('data-original-title', title);
                }
            });
            
            element.addEventListener('mouseleave', (e) => {
                this.hideTooltip();
                const originalTitle = e.target.getAttribute('data-original-title');
                if (originalTitle) {
                    e.target.setAttribute('title', originalTitle);
                }
            });
            
            element.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(e);
            });
        });
    }

    // Show tooltip at mouse position
    showTooltip(event, text) {
        this.tooltip.textContent = text;
        this.tooltip.classList.add('show');
        this.updateTooltipPosition(event);
    }

    // Hide tooltip
    hideTooltip() {
        this.tooltip.classList.remove('show');
    }

    // Update tooltip position
    updateTooltipPosition(event) {
        const rect = document.body.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        
        let x = event.clientX - rect.left + 10;
        let y = event.clientY - rect.top - tooltipRect.height - 10;
        
        // Keep tooltip within viewport
        if (x + tooltipRect.width > window.innerWidth) {
            x = event.clientX - rect.left - tooltipRect.width - 10;
        }
        if (y < 0) {
            y = event.clientY - rect.top + 10;
        }
        
        this.tooltip.style.left = x + 'px';
        this.tooltip.style.top = y + 'px';
    }

    // Get current function based on selection
    getCurrentFunction() {
        return this.functions[this.functionSelect.value];
    }

    // Calculate Riemann sum based on selected method
    calculateRiemannSum() {
        const func = this.getCurrentFunction();
        const a = parseFloat(this.lowerBound.value);
        const b = parseFloat(this.upperBound.value);
        const n = parseInt(this.nSlider.value);
        const method = this.methodSelect.value;
        
        if (a >= b || n <= 0) return 0;
        
        const dx = (b - a) / n;
        let sum = 0;
        
        for (let i = 0; i < n; i++) {
            let x;
            switch (method) {
                case 'left':
                    x = a + i * dx;
                    break;
                case 'right':
                    x = a + (i + 1) * dx;
                    break;
                case 'midpoint':
                    x = a + (i + 0.5) * dx;
                    break;
            }
            sum += func.f(x) * dx;
        }
        
        return sum;
    }

    // Set up coordinate system for drawing
    setupCoordinates() {
        const a = parseFloat(this.lowerBound.value);
        const b = parseFloat(this.upperBound.value);
        const func = this.getCurrentFunction();
        
        // Find y-range by sampling function
        let yMin = 0, yMax = 0;
        const samples = 100;
        for (let i = 0; i <= samples; i++) {
            const x = a + (b - a) * i / samples;
            const y = func.f(x);
            yMin = Math.min(yMin, y);
            yMax = Math.max(yMax, y);
        }
        
        // Add padding
        const yPadding = (yMax - yMin) * 0.1;
        yMin -= yPadding;
        yMax += yPadding;
        
        // Ensure minimum range
        if (yMax - yMin < 1) {
            const center = (yMax + yMin) / 2;
            yMin = center - 0.5;
            yMax = center + 0.5;
        }
        
        return { a, b, yMin, yMax };
    }

    // Convert mathematical coordinates to canvas coordinates
    mathToCanvas(x, y, bounds) {
        const { a, b, yMin, yMax } = bounds;
        const margin = 40;
        
        const canvasX = margin + (x - a) / (b - a) * (this.canvas.width - 2 * margin);
        const canvasY = this.canvas.height - margin - (y - yMin) / (yMax - yMin) * (this.canvas.height - 2 * margin);
        
        return { x: canvasX, y: canvasY };
    }

    // Draw coordinate axes
    drawAxes(bounds) {
        const { a, b, yMin, yMax } = bounds;
        const margin = 40;
        
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = '#333';
        
        // X-axis
        const xAxisY = this.mathToCanvas(0, 0, bounds).y;
        this.ctx.beginPath();
        this.ctx.moveTo(margin, xAxisY);
        this.ctx.lineTo(this.canvas.width - margin, xAxisY);
        this.ctx.stroke();
        
        // Y-axis
        const yAxisX = this.mathToCanvas(0, 0, bounds).x;
        this.ctx.beginPath();
        this.ctx.moveTo(yAxisX, margin);
        this.ctx.lineTo(yAxisX, this.canvas.height - margin);
        this.ctx.stroke();
        
        // X-axis labels
        const xSteps = 5;
        for (let i = 0; i <= xSteps; i++) {
            const x = a + (b - a) * i / xSteps;
            const pos = this.mathToCanvas(x, 0, bounds);
            this.ctx.fillText(x.toFixed(1), pos.x - 10, pos.y + 15);
        }
        
        // Y-axis labels
        const ySteps = 5;
        for (let i = 0; i <= ySteps; i++) {
            const y = yMin + (yMax - yMin) * i / ySteps;
            const pos = this.mathToCanvas(0, y, bounds);
            this.ctx.fillText(y.toFixed(1), pos.x - 25, pos.y + 3);
        }
    }

    // Draw the mathematical function curve
    drawFunction(bounds) {
        const { a, b } = bounds;
        const func = this.getCurrentFunction();
        
        this.ctx.strokeStyle = '#2563eb';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        const steps = 200;
        let firstPoint = true;
        
        for (let i = 0; i <= steps; i++) {
            const x = a + (b - a) * i / steps;
            const y = func.f(x);
            const pos = this.mathToCanvas(x, y, bounds);
            
            if (firstPoint) {
                this.ctx.moveTo(pos.x, pos.y);
                firstPoint = false;
            } else {
                this.ctx.lineTo(pos.x, pos.y);
            }
        }
        
        this.ctx.stroke();
    }

    // Draw Riemann sum rectangles
    drawRiemannRectangles(bounds) {
        const { a, b } = bounds;
        const func = this.getCurrentFunction();
        const n = parseInt(this.nSlider.value);
        const method = this.methodSelect.value;
        const dx = (b - a) / n;
        
        // Rectangle fill and stroke styles
        this.ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
        this.ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < n; i++) {
            const x1 = a + i * dx;
            const x2 = a + (i + 1) * dx;
            
            // Determine height based on method
            let height;
            switch (method) {
                case 'left':
                    height = func.f(x1);
                    break;
                case 'right':
                    height = func.f(x2);
                    break;
                case 'midpoint':
                    height = func.f(x1 + dx / 2);
                    break;
            }
            
            // Convert to canvas coordinates
            const pos1 = this.mathToCanvas(x1, 0, bounds);
            const pos2 = this.mathToCanvas(x2, 0, bounds);
            const posHeight = this.mathToCanvas(x1, height, bounds);
            
            // Draw rectangle
            const rectWidth = pos2.x - pos1.x;
            const rectHeight = pos1.y - posHeight.y;
            
            this.ctx.fillRect(pos1.x, posHeight.y, rectWidth, rectHeight);
            this.ctx.strokeRect(pos1.x, posHeight.y, rectWidth, rectHeight);
        }
    }

    // Update all calculations and display
    updateVisualization() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set up coordinate system
        const bounds = this.setupCoordinates();
        
        // Draw components
        this.drawAxes(bounds);
        this.drawRiemannRectangles(bounds);
        this.drawFunction(bounds);
        
        // Calculate and display results
        const riemannSum = this.calculateRiemannSum();
        const func = this.getCurrentFunction();
        const a = parseFloat(this.lowerBound.value);
        const b = parseFloat(this.upperBound.value);
        const exactValue = func.integral(a, b);
        const error = exactValue !== 0 ? Math.abs((riemannSum - exactValue) / exactValue * 100) : 0;
        
        // Update display
        this.riemannResult.textContent = riemannSum.toFixed(3);
        this.exactResult.textContent = exactValue.toFixed(3);
        this.errorResult.textContent = error.toFixed(2) + '%';
        
        // Add function label to canvas
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(func.label, 10, 25);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RiemannSumExplorer();
});