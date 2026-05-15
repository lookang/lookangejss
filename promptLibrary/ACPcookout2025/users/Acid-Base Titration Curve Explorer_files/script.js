// Titration Curve Explorer - Interactive Chemistry Visualization
// This script handles the interactive titration curve visualization for acid-base chemistry
// Modified to remove titration setup and focus on curve analysis

class TitrationCurveExplorer {
    constructor() {
        // Initialize DOM elements - Removed titration setup elements
        this.canvas = document.getElementById('titration-graph');
        this.ctx = this.canvas.getContext('2d');
        this.titrationSelect = document.getElementById('titration-type');
        this.indicatorSelect = document.getElementById('indicator');
        this.startBtn = document.getElementById('start-titration');
        this.tooltip = document.getElementById('tooltip');
        
        // Titration data and curves
        this.titrationCurves = {
            'strong-strong': this.generateStrongStrongCurve(),
            'strong-weak': this.generateStrongWeakCurve(),
            'weak-strong': this.generateWeakStrongCurve(),
            'weak-weak': this.generateWeakWeakCurve()
        };
        
        // Indicator properties with color information
        this.indicators = {
            'methyl-orange': {
                name: 'Methyl Orange',
                range: [3.1, 4.4],
                acidicColor: '#ff6b6b',
                basicColor: '#ffd93d',
                description: 'Changes from red (acidic) to yellow (basic)'
            },
            'screened-methyl-orange': {
                name: 'Screened Methyl Orange',
                range: [3.2, 4.2],
                acidicColor: '#ff4757',
                basicColor: '#2ed573',
                description: 'Changes from red (acidic) to green (basic)'
            },
            'thymolphthalein': {
                name: 'Thymolphthalein',
                range: [9.3, 10.5],
                acidicColor: '#ffffff',
                basicColor: '#3742fa',
                description: 'Changes from colorless (acidic) to blue (basic)'
            }
        };
        
        // Animation and interaction state
        this.currentVolume = 0;
        this.isAnimating = false;
        this.animationSpeed = 100; // milliseconds between updates
        
        this.initializeEventListeners();
        this.setupCanvas();
        this.updateVisualization();
    }
    
    // Initialize all event listeners for user interactions
    initializeEventListeners() {
        // Titration type change handler
        this.titrationSelect.addEventListener('change', () => {
            this.updateVisualization();
            this.resetTitration();
        });
        
        // Indicator change handler
        this.indicatorSelect.addEventListener('change', () => {
            this.updateIndicatorInfo();
            this.updateVisualization();
            this.resetTitration();
        });
        
        // Start titration button
        this.startBtn.addEventListener('click', () => {
            if (!this.isAnimating) {
                this.startTitration();
            } else {
                this.stopTitration();
            }
        });
        
        // Canvas hover for tooltips
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleCanvasHover(e);
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });
        
        // Touch support for mobile devices
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.handleCanvasHover(mouseEvent);
        });
    }
    
    // Setup canvas dimensions and scaling for responsive design
    setupCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        // Set canvas size based on container
        this.canvas.width = Math.min(400, rect.width - 30);
        this.canvas.height = Math.min(300, rect.height - 30);
        
        // Set up coordinate system - Modified margins to accommodate axis titles
        this.margin = { top: 20, right: 30, bottom: 50, left: 60 }; // Increased bottom and left margins for axis titles
        this.plotWidth = this.canvas.width - this.margin.left - this.margin.right;
        this.plotHeight = this.canvas.height - this.margin.top - this.margin.bottom;
    }
    
    // Generate titration curve data for strong acid - strong base
    generateStrongStrongCurve() {
        const points = [];
        for (let volume = 0; volume <= 50; volume += 0.5) {
            let pH;
            if (volume < 25) {
                // Before equivalence point
                const excessAcid = (25 - volume) * 0.1 / (25 + volume);
                pH = -Math.log10(excessAcid);
            } else if (volume === 25) {
                // Equivalence point
                pH = 7;
            } else {
                // After equivalence point
                const excessBase = (volume - 25) * 0.1 / (25 + volume);
                const pOH = -Math.log10(excessBase);
                pH = 14 - pOH;
            }
            points.push({ volume, pH: Math.max(0, Math.min(14, pH)) });
        }
        return points;
    }
    
    // Generate titration curve data for strong acid - weak base
    generateStrongWeakCurve() {
        const points = [];
        for (let volume = 0; volume <= 50; volume += 0.5) {
            let pH;
            if (volume < 25) {
                const excessAcid = (25 - volume) * 0.1 / (25 + volume);
                pH = -Math.log10(excessAcid);
            } else if (volume === 25) {
                pH = 5.3; // Acidic equivalence point
            } else {
                const excessBase = (volume - 25) * 0.1 / (25 + volume);
                const pOH = -Math.log10(excessBase) + 0.5; // Weak base correction
                pH = 14 - pOH;
            }
            points.push({ volume, pH: Math.max(0, Math.min(14, pH)) });
        }
        return points;
    }
    
    // Generate titration curve data for weak acid - strong base
    generateWeakStrongCurve() {
        const points = [];
        for (let volume = 0; volume <= 50; volume += 0.5) {
            let pH;
            if (volume < 25) {
                // Buffer region with Henderson-Hasselbalch approximation
                const ratio = volume / (25 - volume);
                pH = 4.75 + Math.log10(ratio || 0.01); // pKa = 4.75 for acetic acid
            } else if (volume === 25) {
                pH = 8.7; // Basic equivalence point
            } else {
                const excessBase = (volume - 25) * 0.1 / (25 + volume);
                const pOH = -Math.log10(excessBase);
                pH = 14 - pOH;
            }
            points.push({ volume, pH: Math.max(0, Math.min(14, pH)) });
        }
        return points;
    }
    
    // Generate titration curve data for weak acid - weak base
    generateWeakWeakCurve() {
        const points = [];
        for (let volume = 0; volume <= 50; volume += 0.5) {
            let pH;
            if (volume < 25) {
                const ratio = volume / (25 - volume);
                pH = 4.75 + Math.log10(ratio || 0.01);
            } else if (volume === 25) {
                pH = 7; // Neutral equivalence point (approximately)
            } else {
                const excessBase = (volume - 25) * 0.1 / (25 + volume);
                const pOH = -Math.log10(excessBase) + 1; // Weak base correction
                pH = 14 - pOH;
            }
            points.push({ volume, pH: Math.max(2, Math.min(12, pH)) });
        }
        return points;
    }
    
    // Main visualization update function
    updateVisualization() {
        this.drawTitrationCurve();
        this.drawIndicatorRange();
        this.updateIndicatorInfo();
        this.evaluateIndicatorSuitability();
    }
    
    // Draw the titration curve on canvas
    drawTitrationCurve() {
        const ctx = this.ctx;
        const curve = this.titrationCurves[this.titrationSelect.value];
        
        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw axes
        this.drawAxes();
        
        // Draw curve
        ctx.beginPath();
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 3;
        
        curve.forEach((point, index) => {
            const x = this.margin.left + (point.volume / 50) * this.plotWidth;
            const y = this.margin.top + (1 - point.pH / 14) * this.plotHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw current position marker if animating
        if (this.currentVolume > 0) {
            const currentPoint = this.getCurrentPoint();
            const x = this.margin.left + (this.currentVolume / 50) * this.plotWidth;
            const y = this.margin.top + (1 - currentPoint.pH / 14) * this.plotHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = '#dc3545';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    
    // Draw coordinate axes with labels
    drawAxes() {
        const ctx = this.ctx;
        
        // Set axis style
        ctx.strokeStyle = '#6c757d';
        ctx.lineWidth = 2;
        ctx.font = '12px Arial';
        ctx.fillStyle = '#495057';
        
        // Draw Y-axis (pH)
        ctx.beginPath();
        ctx.moveTo(this.margin.left, this.margin.top);
        ctx.lineTo(this.margin.left, this.margin.top + this.plotHeight);
        ctx.stroke();
        
        // Draw X-axis (Volume)
        ctx.beginPath();
        ctx.moveTo(this.margin.left, this.margin.top + this.plotHeight);
        ctx.lineTo(this.margin.left + this.plotWidth, this.margin.top + this.plotHeight);
        ctx.stroke();
        
        // Y-axis labels (pH values)
        for (let pH = 0; pH <= 14; pH += 2) {
            const y = this.margin.top + (1 - pH / 14) * this.plotHeight;
            ctx.fillText(pH.toString(), this.margin.left - 25, y + 4);
            
            // Grid lines
            ctx.beginPath();
            ctx.strokeStyle = '#e9ecef';
            ctx.lineWidth = 1;
            ctx.moveTo(this.margin.left, y);
            ctx.lineTo(this.margin.left + this.plotWidth, y);
            ctx.stroke();
        }
        
        // X-axis labels (Volume values)
        for (let vol = 0; vol <= 50; vol += 10) {
            const x = this.margin.left + (vol / 50) * this.plotWidth;
            ctx.fillStyle = '#495057';
            ctx.fillText(vol.toString(), x - 8, this.margin.top + this.plotHeight + 20);
            
            // Grid lines
            if (vol > 0) {
                ctx.beginPath();
                ctx.strokeStyle = '#e9ecef';
                ctx.lineWidth = 1;
                ctx.moveTo(x, this.margin.top);
                ctx.lineTo(x, this.margin.top + this.plotHeight);
                ctx.stroke();
            }
        }
        
        // Reset text alignment
        ctx.textAlign = 'left';
    }
    
    // Draw indicator working range on the graph
    drawIndicatorRange() {
        const indicator = this.indicators[this.indicatorSelect.value];
        const ctx = this.ctx;
        
        // Calculate range positions
        const yMin = this.margin.top + (1 - indicator.range[1] / 14) * this.plotHeight;
        const yMax = this.margin.top + (1 - indicator.range[0] / 14) * this.plotHeight;
        
        // Draw range highlight
        ctx.fillStyle = 'rgba(255, 193, 7, 0.2)';
        ctx.fillRect(this.margin.left, yMin, this.plotWidth, yMax - yMin);
        
        // Draw range borders
        ctx.strokeStyle = '#ffc107';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        ctx.beginPath();
        ctx.moveTo(this.margin.left, yMin);
        ctx.lineTo(this.margin.left + this.plotWidth, yMin);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.margin.left, yMax);
        ctx.lineTo(this.margin.left + this.plotWidth, yMax);
        ctx.stroke();
        
        ctx.setLineDash([]); // Reset line dash
    }
    
    // Update indicator information display
    updateIndicatorInfo() {
        const indicator = this.indicators[this.indicatorSelect.value];
        
        // Update range display
        document.getElementById('range-display').textContent = 
            `${indicator.range[0]} - ${indicator.range[1]}`;
        
        // Update color boxes
        document.getElementById('acidic-color').style.backgroundColor = indicator.acidicColor;
        document.getElementById('basic-color').style.backgroundColor = indicator.basicColor;
        
        // Add tooltip to color boxes
        document.getElementById('acidic-color').title = 'Acidic form color';
        document.getElementById('basic-color').title = 'Basic form color';
    }
    
    // Evaluate and display indicator suitability
    evaluateIndicatorSuitability() {
        const titration = this.titrationSelect.value;
        const indicator = this.indicators[this.indicatorSelect.value];
        const curve = this.titrationCurves[titration];
        
        // Find equivalence point
        const equivalencePoint = this.findEquivalencePoint(curve);
        const equivalencePH = equivalencePoint.pH;
        
        // Check if indicator range overlaps with steep portion
        const suitabilityElement = document.getElementById('suitability-status');
        const explanationElement = document.getElementById('explanation');
        
        let suitability, explanation;
        
        if (equivalencePH >= indicator.range[0] && equivalencePH <= indicator.range[1]) {
            suitability = 'Suitable';
            explanation = `The equivalence point (pH ${equivalencePH.toFixed(1)}) falls within the indicator's working range, ensuring a sharp color change.`;
            suitabilityElement.className = 'suitable';
        } else if (Math.abs(equivalencePH - indicator.range[0]) <= 1 || 
                   Math.abs(equivalencePH - indicator.range[1]) <= 1) {
            suitability = 'Marginal';
            explanation = `The equivalence point is close to the indicator range but may not provide the sharpest color change.`;
            suitabilityElement.className = 'marginal';
        } else {
            suitability = 'Unsuitable';
            explanation = `The equivalence point (pH ${equivalencePH.toFixed(1)}) is outside the indicator's working range, making it unsuitable for this titration.`;
            suitabilityElement.className = 'unsuitable';
        }
        
        suitabilityElement.textContent = suitability;
        explanationElement.textContent = explanation;
    }
    
    // Find the equivalence point in the titration curve
    findEquivalencePoint(curve) {
        let maxSlope = 0;
        let equivalencePoint = curve[Math.floor(curve.length / 2)];
        
        // Find point with maximum slope (steepest part of curve)
        for (let i = 1; i < curve.length - 1; i++) {
            const slope = Math.abs(curve[i + 1].pH - curve[i - 1].pH) / 
                         (curve[i + 1].volume - curve[i - 1].volume);
            if (slope > maxSlope) {
                maxSlope = slope;
                equivalencePoint = curve[i];
            }
        }
        
        return equivalencePoint;
    }
    
    // Start the titration animation
    startTitration() {
        this.isAnimating = true;
        this.startBtn.textContent = 'Stop Titration';
        this.startBtn.style.background = 'linear-gradient(45deg, #dc3545, #c82333)';
        
        this.animateTitration();
    }
    
    // Stop the titration animation
    stopTitration() {
        this.isAnimating = false;
        this.startBtn.textContent = 'Start Titration';
        this.startBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
    }
    
    // Reset titration to initial state
    resetTitration() {
        this.currentVolume = 0;
        this.isAnimating = false;
        this.startBtn.textContent = 'Start Titration';
        this.startBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        this.updateVisualization();
    }
    
    // Animate the titration process
    animateTitration() {
        if (!this.isAnimating) return;
        
        this.currentVolume += 0.5;
        
        if (this.currentVolume >= 50) {
            this.stopTitration();
            return;
        }
        
        this.updateVisualization();
        
        setTimeout(() => this.animateTitration(), this.animationSpeed);
    }
    
    // Get current point on the curve based on volume
    getCurrentPoint() {
        const curve = this.titrationCurves[this.titrationSelect.value];
        const index = Math.floor(this.currentVolume * 2); // 0.5 mL increments
        return curve[Math.min(index, curve.length - 1)];
    }
    
    // Handle canvas hover for tooltips
    handleCanvasHover(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if hover is within plot area
        if (x >= this.margin.left && x <= this.margin.left + this.plotWidth &&
            y >= this.margin.top && y <= this.margin.top + this.plotHeight) {
            
            // Calculate volume and pH from mouse position
            const volume = ((x - this.margin.left) / this.plotWidth) * 50;
            const pH = 14 - ((y - this.margin.top) / this.plotHeight) * 14;
            
            this.showTooltip(e.clientX, e.clientY, 
                `Volume: ${volume.toFixed(1)} mL<br>pH: ${pH.toFixed(1)}`);
        } else {
            this.hideTooltip();
        }
    }
    
    // Show tooltip with information
    showTooltip(x, y, content) {
        this.tooltip.innerHTML = content;
        this.tooltip.style.left = `${x + 10}px`;
        this.tooltip.style.top = `${y - 10}px`;
        this.tooltip.classList.add('show');
    }
    
    // Hide tooltip
    hideTooltip() {
        this.tooltip.classList.remove('show');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create the main application instance
    const explorer = new TitrationCurveExplorer();
    
    // Handle window resize for responsive design
    window.addEventListener('resize', () => {
        setTimeout(() => {
            explorer.setupCanvas();
            explorer.updateVisualization();
        }, 100);
    });
    
    // Add keyboard shortcuts for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            if (e.target === explorer.startBtn) {
                e.preventDefault();
                explorer.startBtn.click();
            }
        }
    });
    
    console.log('Titration Curve Explorer initialized successfully');
});