// Economic Model Interactive Visualization
// This script handles the demand-supply model with interactive controls

class EconomicModel {
    constructor() {
        // Canvas setup
        this.canvas = document.getElementById('economicGraph');
        this.ctx = this.canvas.getContext('2d');
        
        // Model parameters - linear demand and supply functions
        // Demand: P = a - bQ, Supply: P = c + dQ
        this.demandParams = { a: 20, b: 0.2 }; // Initial demand intercept and slope
        this.supplyParams = { c: 0, d: 0.2 };  // Initial supply intercept and slope
        
        // Original parameters for comparison
        this.originalDemand = { ...this.demandParams };
        this.originalSupply = { ...this.supplyParams };
        
        // Graph dimensions and scaling
        this.margin = { top: 20, right: 20, bottom: 40, left: 50 };
        this.graphWidth = this.canvas.width - this.margin.left - this.margin.right;
        this.graphHeight = this.canvas.height - this.margin.top - this.margin.bottom;
        
        // Scale factors for converting between economic units and pixels
        this.maxQ = 120;
        this.maxP = 25;
        this.scaleX = this.graphWidth / this.maxQ;
        this.scaleY = this.graphHeight / this.maxP;
        
        // Equilibrium points
        this.e1 = this.calculateEquilibrium(this.originalDemand, this.originalSupply);
        this.e2 = this.calculateEquilibrium(this.demandParams, this.supplyParams);
        
        // UI state
        this.showTR = true;
        this.showArrows = true;
        
        // Initialize controls and draw initial state
        this.initializeControls();
        this.updateDisplay();
    }
    
    // Calculate equilibrium point where demand equals supply
    calculateEquilibrium(demand, supply) {
        // Solve: demand.a - demand.b * Q = supply.c + supply.d * Q
        const Q = (demand.a - supply.c) / (demand.b + supply.d);
        const P = demand.a - demand.b * Q;
        const TR = P * Q;
        return { Q, P, TR };
    }
    
    // Initialize all control event listeners
    initializeControls() {
        // Demand shifters
        this.setupSlider('income', (value) => {
            this.demandParams.a = this.originalDemand.a + value * 0.1;
            this.updateModel();
            this.updateExplanation('income', value);
        });
        
        this.setupSlider('tastes', (value) => {
            this.demandParams.a = this.originalDemand.a + value * 0.15;
            this.updateModel();
            this.updateExplanation('tastes', value);
        });
        
        this.setupSlider('substitutes', (value) => {
            this.demandParams.a = this.originalDemand.a + value * 0.12;
            this.updateModel();
            this.updateExplanation('substitutes', value);
        });
        
        this.setupSlider('buyers', (value) => {
            this.demandParams.a = this.originalDemand.a + value * 0.2;
            this.updateModel();
            this.updateExplanation('buyers', value);
        });
        
        // Supply shifters
        this.setupSlider('technology', (value) => {
            this.supplyParams.c = this.originalSupply.c - value * 0.1; // Better tech reduces costs
            this.updateModel();
            this.updateExplanation('technology', value);
        });
        
        this.setupSlider('inputCosts', (value) => {
            this.supplyParams.c = this.originalSupply.c + value * 0.1;
            this.updateModel();
            this.updateExplanation('inputCosts', value);
        });
        
        this.setupSlider('sellers', (value) => {
            this.supplyParams.c = this.originalSupply.c - value * 0.08; // More sellers reduce price
            this.updateModel();
            this.updateExplanation('sellers', value);
        });
        
        // Button controls
        document.getElementById('resetBtn').addEventListener('click', () => this.resetAll());
        document.getElementById('toggleTR').addEventListener('click', () => this.toggleTRRectangles());
        document.getElementById('toggleArrows').addEventListener('click', () => this.toggleArrows());
    }
    
    // Setup individual slider with callback
    setupSlider(id, callback) {
        const slider = document.getElementById(id);
        const valueDisplay = document.getElementById(id + '-value');
        
        slider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            valueDisplay.textContent = value > 0 ? `+${value}` : value.toString();
            callback(value);
        });
    }
    
    // Update model calculations and display
    updateModel() {
        this.e2 = this.calculateEquilibrium(this.demandParams, this.supplyParams);
        this.updateDisplay();
    }
    
    // Main display update function
    updateDisplay() {
        this.drawGraph();
        this.updateDataPanel();
    }
    
    // Draw the complete economic graph
    drawGraph() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw axes
        this.drawAxes();
        
        // Draw original curves (ghosted)
        this.ctx.globalAlpha = 0.3;
        this.drawDemandCurve(this.originalDemand, '#3498db', 'D₁');
        this.drawSupplyCurve(this.originalSupply, '#e74c3c', 'S₁');
        this.ctx.globalAlpha = 1.0;
        
        // Draw current curves
        this.drawDemandCurve(this.demandParams, '#2980b9', 'D₂');
        this.drawSupplyCurve(this.supplyParams, '#c0392b', 'S₂');
        
        // Draw TR rectangles if enabled
        if (this.showTR) {
            this.drawTRRectangles();
        }
        
        // Draw equilibrium points
        this.drawEquilibriumPoint(this.e1, '#7f8c8d', 'E₁');
        this.drawEquilibriumPoint(this.e2, '#e67e22', 'E₂');
        
        // Draw change arrows if enabled
        if (this.showArrows) {
            this.drawChangeArrows();
        }
    }
    
    // Draw coordinate axes with labels
    drawAxes() {
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 2;
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = '#2c3e50';
        
        // X-axis
        this.ctx.beginPath();
        this.ctx.moveTo(this.margin.left, this.canvas.height - this.margin.bottom);
        this.ctx.lineTo(this.canvas.width - this.margin.right, this.canvas.height - this.margin.bottom);
        this.ctx.stroke();
        
        // Y-axis
        this.ctx.beginPath();
        this.ctx.moveTo(this.margin.left, this.margin.top);
        this.ctx.lineTo(this.margin.left, this.canvas.height - this.margin.bottom);
        this.ctx.stroke();
        
        // Axis labels
        this.ctx.fillText('Quantity (Q)', this.canvas.width / 2 - 30, this.canvas.height - 10);
        this.ctx.save();
        this.ctx.translate(15, this.canvas.height / 2);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillText('Price (P)', -20, 0);
        this.ctx.restore();
        
        // Draw grid lines
        this.drawGridLines();
    }
    
    // Draw subtle grid lines for better readability
    drawGridLines() {
        this.ctx.strokeStyle = '#ecf0f1';
        this.ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let q = 20; q <= this.maxQ; q += 20) {
            const x = this.margin.left + q * this.scaleX;
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.margin.top);
            this.ctx.lineTo(x, this.canvas.height - this.margin.bottom);
            this.ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let p = 5; p <= this.maxP; p += 5) {
            const y = this.canvas.height - this.margin.bottom - p * this.scaleY;
            this.ctx.beginPath();
            this.ctx.moveTo(this.margin.left, y);
            this.ctx.lineTo(this.canvas.width - this.margin.right, y);
            this.ctx.stroke();
        }
    }
    
    // Draw demand curve with label
    drawDemandCurve(params, color, label) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        // Draw curve from Q=0 to where P=0
        const maxQ = Math.min(params.a / params.b, this.maxQ);
        this.ctx.moveTo(this.margin.left, this.canvas.height - this.margin.bottom - params.a * this.scaleY);
        
        for (let q = 0; q <= maxQ; q += 1) {
            const p = params.a - params.b * q;
            const x = this.margin.left + q * this.scaleX;
            const y = this.canvas.height - this.margin.bottom - p * this.scaleY;
            this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
        
        // Add label
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 14px Arial';
        this.ctx.fillText(label, this.margin.left + 10, this.margin.top + 20);
    }
    
    // Draw supply curve with label
    drawSupplyCurve(params, color, label) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        
        // Start from where P = params.c
        const startQ = Math.max(0, -params.c / params.d);
        const startP = Math.max(0, params.c);
        
        this.ctx.moveTo(
            this.margin.left + startQ * this.scaleX,
            this.canvas.height - this.margin.bottom - startP * this.scaleY
        );
        
        // Draw to maximum Q
        for (let q = startQ; q <= this.maxQ; q += 1) {
            const p = params.c + params.d * q;
            if (p > this.maxP) break;
            const x = this.margin.left + q * this.scaleX;
            const y = this.canvas.height - this.margin.bottom - p * this.scaleY;
            this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
        
        // Add label
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 14px Arial';
        this.ctx.fillText(label, this.canvas.width - this.margin.right - 30, this.canvas.height - this.margin.bottom - 10);
    }
    
    // Draw equilibrium point with label
    drawEquilibriumPoint(eq, color, label) {
        const x = this.margin.left + eq.Q * this.scaleX;
        const y = this.canvas.height - this.margin.bottom - eq.P * this.scaleY;
        
        // Draw point
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 6, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Draw dashed guides to axes
        this.ctx.strokeStyle = color;
        this.ctx.setLineDash([5, 5]);
        this.ctx.lineWidth = 1;
        
        // Horizontal guide
        this.ctx.beginPath();
        this.ctx.moveTo(this.margin.left, y);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        
        // Vertical guide
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, this.canvas.height - this.margin.bottom);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]);
        
        // Add label
        this.ctx.fillStyle = color;
        this.ctx.font = 'bold 12px Arial';
        this.ctx.fillText(label, x + 10, y - 10);
    }
    
    // Draw total revenue rectangles
    drawTRRectangles() {
        // TR1 rectangle (original equilibrium)
        this.ctx.fillStyle = 'rgba(116, 140, 171, 0.3)';
        this.ctx.fillRect(
            this.margin.left,
            this.canvas.height - this.margin.bottom - this.e1.P * this.scaleY,
            this.e1.Q * this.scaleX,
            this.e1.P * this.scaleY
        );
        
        // TR2 rectangle (new equilibrium)
        this.ctx.fillStyle = 'rgba(231, 126, 34, 0.3)';
        this.ctx.fillRect(
            this.margin.left,
            this.canvas.height - this.margin.bottom - this.e2.P * this.scaleY,
            this.e2.Q * this.scaleX,
            this.e2.P * this.scaleY
        );
        
        // Add TR labels
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = '10px Arial';
        this.ctx.fillText('TR₁', this.margin.left + 5, this.canvas.height - this.margin.bottom - 5);
        this.ctx.fillText('TR₂', this.margin.left + this.e2.Q * this.scaleX - 25, 
                         this.canvas.height - this.margin.bottom - this.e2.P * this.scaleY + 15);
    }
    
    // Draw arrows showing changes in P and Q
    drawChangeArrows() {
        const x1 = this.margin.left + this.e1.Q * this.scaleX;
        const y1 = this.canvas.height - this.margin.bottom - this.e1.P * this.scaleY;
        const x2 = this.margin.left + this.e2.Q * this.scaleX;
        const y2 = this.canvas.height - this.margin.bottom - this.e2.P * this.scaleY;
        
        this.ctx.strokeStyle = '#8e44ad';
        this.ctx.lineWidth = 2;
        
        // Horizontal arrow (ΔQ)
        if (Math.abs(x2 - x1) > 5) {
            this.drawArrow(x1, this.canvas.height - this.margin.bottom + 15, 
                          x2, this.canvas.height - this.margin.bottom + 15);
            this.ctx.fillStyle = '#8e44ad';
            this.ctx.font = '10px Arial';
            this.ctx.fillText('ΔQ', (x1 + x2) / 2 - 10, this.canvas.height - this.margin.bottom + 30);
        }
        
        // Vertical arrow (ΔP)
        if (Math.abs(y2 - y1) > 5) {
            this.drawArrow(this.margin.left - 15, y1, this.margin.left - 15, y2);
            this.ctx.fillStyle = '#8e44ad';
            this.ctx.font = '10px Arial';
            this.ctx.fillText('ΔP', this.margin.left - 35, (y1 + y2) / 2);
        }
    }
    
    // Helper function to draw arrows
    drawArrow(x1, y1, x2, y2) {
        const headLength = 8;
        const angle = Math.atan2(y2 - y1, x2 - x1);
        
        // Draw line
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        
        // Draw arrowhead
        this.ctx.beginPath();
        this.ctx.moveTo(x2, y2);
        this.ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 6), 
                       y2 - headLength * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(x2, y2);
        this.ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 6), 
                       y2 - headLength * Math.sin(angle + Math.PI / 6));
        this.ctx.stroke();
    }
    
    // Update the data comparison panel
    updateDataPanel() {
        // Calculate changes
        const deltaP = this.e2.P - this.e1.P;
        const deltaQ = this.e2.Q - this.e1.Q;
        const deltaTR = this.e2.TR - this.e1.TR;
        
        const deltaPPercent = this.e1.P !== 0 ? (deltaP / this.e1.P * 100) : 0;
        const deltaQPercent = this.e1.Q !== 0 ? (deltaQ / this.e1.Q * 100) : 0;
        const deltaTRPercent = this.e1.TR !== 0 ? (deltaTR / this.e1.TR * 100) : 0;
        
        // Update display values
        document.getElementById('p1-value').textContent = `$${this.e1.P.toFixed(2)}`;
        document.getElementById('p2-value').textContent = `$${this.e2.P.toFixed(2)}`;
        document.getElementById('dp-value').textContent = 
            `${deltaP >= 0 ? '+' : ''}$${deltaP.toFixed(2)} (${deltaPPercent.toFixed(1)}%)`;
        
        document.getElementById('q1-value').textContent = this.e1.Q.toFixed(0);
        document.getElementById('q2-value').textContent = this.e2.Q.toFixed(0);
        document.getElementById('dq-value').textContent = 
            `${deltaQ >= 0 ? '+' : ''}${deltaQ.toFixed(0)} (${deltaQPercent.toFixed(1)}%)`;
        
        document.getElementById('tr1-value').textContent = `$${this.e1.TR.toFixed(2)}`;
        document.getElementById('tr2-value').textContent = `$${this.e2.TR.toFixed(2)}`;
        document.getElementById('dtr-value').textContent = 
            `${deltaTR >= 0 ? '+' : ''}$${deltaTR.toFixed(2)} (${deltaTRPercent.toFixed(1)}%)`;
        
        // Update equilibrium point displays
        document.getElementById('e1-display').textContent = 
            `(${this.e1.Q.toFixed(0)}, $${this.e1.P.toFixed(2)})`;
        document.getElementById('e2-display').textContent = 
            `(${this.e2.Q.toFixed(0)}, $${this.e2.P.toFixed(2)})`;
    }
    
    // Update explanation text based on changes
    updateExplanation(factor, value) {
        let explanation = '';
        
        if (Math.abs(value) < 1) {
            explanation = 'Adjust the sliders to see how market shocks shift demand and supply curves, changing equilibrium price, quantity, and total revenue.';
        } else {
            const direction = value > 0 ? 'increases' : 'decreases';
            const shift = value > 0 ? 'right' : 'left';
            
            switch (factor) {
                case 'income':
                    explanation = `${direction === 'increases' ? 'Higher' : 'Lower'} income shifts demand ${shift}. `;
                    break;
                case 'tastes':
                    explanation = `${direction === 'increases' ? 'Improved' : 'Reduced'} consumer tastes shift demand ${shift}. `;
                    break;
                case 'substitutes':
                    explanation = `${direction === 'increases' ? 'Higher' : 'Lower'} substitute prices shift demand ${shift}. `;
                    break;
                case 'buyers':
                    explanation = `${direction === 'increases' ? 'More' : 'Fewer'} buyers in the market shift demand ${shift}. `;
                    break;
                case 'technology':
                    explanation = `${direction === 'increases' ? 'Better' : 'Worse'} technology shifts supply ${value > 0 ? 'right' : 'left'}. `;
                    break;
                case 'inputCosts':
                    explanation = `${direction === 'increases' ? 'Higher' : 'Lower'} input costs shift supply ${shift}. `;
                    break;
                case 'sellers':
                    explanation = `${direction === 'increases' ? 'More' : 'Fewer'} sellers shift supply ${value > 0 ? 'right' : 'left'}. `;
                    break;
            }
            
            // Add effect on equilibrium
            const priceChange = this.e2.P > this.e1.P ? 'rises' : 'falls';
            const quantityChange = this.e2.Q > this.e1.Q ? 'rises' : 'falls';
            const revenueChange = this.e2.TR > this.e1.TR ? 'increases' : 'decreases';
            
            explanation += `Price ${priceChange}, quantity ${quantityChange}, and total revenue ${revenueChange}.`;
        }
        
        document.getElementById('explanationText').textContent = explanation;
    }
    
    // Reset all controls to initial state
    resetAll() {
        // Reset sliders
        const sliders = ['income', 'tastes', 'substitutes', 'buyers', 'technology', 'inputCosts', 'sellers'];
        sliders.forEach(id => {
            const slider = document.getElementById(id);
            const valueDisplay = document.getElementById(id + '-value');
            slider.value = 0;
            valueDisplay.textContent = '0';
        });
        
        // Reset model parameters
        this.demandParams = { ...this.originalDemand };
        this.supplyParams = { ...this.originalSupply };
        
        // Update display
        this.updateModel();
        this.updateExplanation('', 0);
    }
    
    // Toggle total revenue rectangles visibility
    toggleTRRectangles() {
        this.showTR = !this.showTR;
        const button = document.getElementById('toggleTR');
        button.textContent = this.showTR ? 'Hide TR Rectangles' : 'Show TR Rectangles';
        this.drawGraph();
    }
    
    // Toggle change arrows visibility
    toggleArrows() {
        this.showArrows = !this.showArrows;
        const button = document.getElementById('toggleArrows');
        button.textContent = this.showArrows ? 'Hide Arrows' : 'Show Arrows';
        this.drawGraph();
    }
}

// Initialize the economic model when page loads
document.addEventListener('DOMContentLoaded', () => {
    new EconomicModel();
});

// Handle canvas resize for responsiveness
window.addEventListener('resize', () => {
    const canvas = document.getElementById('economicGraph');
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    
    // Maintain aspect ratio while fitting container
    const maxWidth = rect.width - 30;
    const maxHeight = rect.height - 100;
    
    if (maxWidth / maxHeight > 400 / 300) {
        canvas.style.height = maxHeight + 'px';
        canvas.style.width = (maxHeight * 400 / 300) + 'px';
    } else {
        canvas.style.width = maxWidth + 'px';
        canvas.style.height = (maxWidth * 300 / 400) + 'px';
    }
});