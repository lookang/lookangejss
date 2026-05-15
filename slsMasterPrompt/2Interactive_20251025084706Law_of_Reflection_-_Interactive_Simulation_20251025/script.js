/* ============================================
   Law of Reflection - Interactive Simulation
   Core simulation logic and interactions
   MODIFIED: Updated SVG viewBox and coordinates to eliminate negative y-axis
   ============================================ */

class ReflectionSimulation {
    constructor() {
        // Simulation state
        this.angle = 45.0; // Angle of incidence in degrees
        this.maxDataPoints = 7; // Maximum number of data points
        this.dataPoints = []; // Array to store recorded measurements
        
        // DOM elements
        this.angleSlider = document.getElementById('angleSlider');
        this.angleDisplay = document.getElementById('angleDisplay');
        this.diagram = document.getElementById('reflectionDiagram');
        this.recordBtn = document.getElementById('recordBtn');
        this.plotBtn = document.getElementById('plotBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.tableBody = document.getElementById('tableBody');
        this.tableMessage = document.getElementById('tableMessage');
        this.graphPanel = document.getElementById('graphPanel');
        this.graphCanvas = document.getElementById('graphCanvas');
        
        // Graph toggle checkboxes
        this.toggleDataPoints = document.getElementById('toggleDataPoints');
        this.toggleTheoryLine = document.getElementById('toggleTheoryLine');
        this.toggleBestFit = document.getElementById('toggleBestFit');
        
        // SVG elements for diagram
        this.incidentRay = document.getElementById('incidentRay');
        this.reflectedRay = document.getElementById('reflectedRay');
        this.incidenceArc = document.getElementById('incidenceArc');
        this.reflectionArc = document.getElementById('reflectionArc');
        this.incidenceLabel = document.getElementById('incidenceLabel');
        this.reflectionLabel = document.getElementById('reflectionLabel');
        
        // Initialize event listeners
        this.initializeEventListeners();
        
        // Draw initial diagram
        this.updateDiagram();
    }
    
    // Initialize all event listeners
    initializeEventListeners() {
        // Slider input - updates diagram in real-time
        this.angleSlider.addEventListener('input', (e) => {
            this.angle = parseFloat(e.target.value) / 10; // Convert to decimal degrees
            this.updateDiagram();
        });
        
        // Record Data button - adds current measurement to table
        this.recordBtn.addEventListener('click', () => this.recordData());
        
        // Plot Graph button - displays graph panel
        this.plotBtn.addEventListener('click', () => this.toggleGraphPanel());
        
        // Reset button - clears all data and resets simulation
        this.resetBtn.addEventListener('click', () => this.reset());
        
        // Graph toggle checkboxes - redraw graph when toggled
        this.toggleDataPoints.addEventListener('change', () => this.plotGraph());
        this.toggleTheoryLine.addEventListener('change', () => this.plotGraph());
        this.toggleBestFit.addEventListener('change', () => this.plotGraph());
    }
    
    // Update the reflection diagram based on current angle
    // MODIFIED: Adjusted coordinates for new compact viewBox (0 0 400 160) with no negative y-axis
    updateDiagram() {
        const angleRad = (this.angle * Math.PI) / 180; // Convert to radians
        const centerX = 200; // Center point on mirror
        const centerY = 100; // Mirror y-position (adjusted for compact view without negative space)
        const rayLength = 80; // Length of incident/reflected rays (adjusted for new viewBox)
        
        // Calculate incident ray endpoint (from upper left)
        const incidentX = centerX - rayLength * Math.sin(angleRad);
        const incidentY = centerY - rayLength * Math.cos(angleRad);
        
        // Calculate reflected ray endpoint (to upper right)
        const reflectedX = centerX + rayLength * Math.sin(angleRad);
        const reflectedY = centerY - rayLength * Math.cos(angleRad);
        
        // Update ray positions
        this.incidentRay.setAttribute('x1', incidentX);
        this.incidentRay.setAttribute('y1', incidentY);
        this.incidentRay.setAttribute('x2', centerX);
        this.incidentRay.setAttribute('y2', centerY);
        
        this.reflectedRay.setAttribute('x1', centerX);
        this.reflectedRay.setAttribute('y1', centerY);
        this.reflectedRay.setAttribute('x2', reflectedX);
        this.reflectedRay.setAttribute('y2', reflectedY);
        
        // Update angle arcs
        this.updateAngleArcs(angleRad, centerX, centerY);
        
        // Update angle labels (one decimal place)
        this.incidenceLabel.textContent = `i = ${this.angle.toFixed(1)}°`;
        this.reflectionLabel.textContent = `r = ${this.angle.toFixed(1)}°`;
        
        // Update angle display
        this.angleDisplay.textContent = `${this.angle.toFixed(1)}°`;
    }
    
    // Draw angle arc indicators on the diagram
    // MODIFIED: Adjusted arc radius for new compact viewBox
    updateAngleArcs(angleRad, centerX, centerY) {
        const arcRadius = 25; // Radius of angle arc (adjusted for compact view)
        
        // Incident angle arc (left side of normal)
        const incidentStartX = centerX - arcRadius * Math.sin(angleRad);
        const incidentStartY = centerY - arcRadius * Math.cos(angleRad);
        const incidentEndX = centerX;
        const incidentEndY = centerY - arcRadius;
        
        const incidentLargeArc = angleRad > Math.PI / 2 ? 1 : 0;
        const incidentArcPath = `M ${incidentStartX} ${incidentStartY} A ${arcRadius} ${arcRadius} 0 ${incidentLargeArc} 1 ${incidentEndX} ${incidentEndY}`;
        this.incidenceArc.setAttribute('d', incidentArcPath);
        
        // Reflected angle arc (right side of normal)
        const reflectedStartX = centerX;
        const reflectedStartY = centerY - arcRadius;
        const reflectedEndX = centerX + arcRadius * Math.sin(angleRad);
        const reflectedEndY = centerY - arcRadius * Math.cos(angleRad);
        
        const reflectedArcPath = `M ${reflectedStartX} ${reflectedStartY} A ${arcRadius} ${arcRadius} 0 ${incidentLargeArc} 1 ${reflectedEndX} ${reflectedEndY}`;
        this.reflectionArc.setAttribute('d', reflectedArcPath);
    }
    
    // Record current angle as a data point
    recordData() {
        // Check if maximum data points reached
        if (this.dataPoints.length >= this.maxDataPoints) {
            alert(`Maximum ${this.maxDataPoints} data points reached. Click "Reset" to clear.`);
            return;
        }
        
        // Check for duplicate angles (within 0.1° tolerance)
        const isDuplicate = this.dataPoints.some(
            point => Math.abs(point.i - this.angle) < 0.05
        );
        
        if (isDuplicate) {
            alert('This angle has already been recorded. Choose a different angle.');
            return;
        }
        
        // Add new data point (in ideal simulation, r = i)
        const newPoint = {
            trial: this.dataPoints.length + 1,
            i: this.angle,
            r: this.angle, // Law of Reflection: r = i
            delta: 0.0 // Difference between r and i (should be 0)
        };
        
        this.dataPoints.push(newPoint);
        
        // Update table display
        this.updateTable();
        
        // Enable plot button if we have data
        this.plotBtn.disabled = false;
    }
    
    // Update the data table display
    updateTable() {
        // Clear existing rows
        this.tableBody.innerHTML = '';
        
        // Hide message if data exists
        if (this.dataPoints.length > 0) {
            this.tableMessage.style.display = 'none';
        } else {
            this.tableMessage.style.display = 'block';
        }
        
        // Add data rows to table
        this.dataPoints.forEach((point) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${point.trial}</td>
                <td>${point.i.toFixed(1)}</td>
                <td>${point.r.toFixed(1)}</td>
                <td>${point.delta.toFixed(1)}</td>
            `;
            this.tableBody.appendChild(row);
        });
    }
    
    // Toggle graph panel visibility
    toggleGraphPanel() {
        if (this.dataPoints.length === 0) {
            alert('No data to plot. Record at least one measurement first.');
            return;
        }
        
        this.graphPanel.classList.toggle('hidden');
        
        // Plot graph when panel is shown
        if (!this.graphPanel.classList.contains('hidden')) {
            this.plotGraph();
        }
    }
    
    // Plot data on canvas graph
    plotGraph() {
        const ctx = this.graphCanvas.getContext('2d');
        const width = this.graphCanvas.width;
        const height = this.graphCanvas.height;
        const padding = 50; // Space for axes and labels
        const plotWidth = width - 2 * padding;
        const plotHeight = height - 2 * padding;
        
        // Clear canvas
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);
        
        // Draw axes
        this.drawAxes(ctx, width, height, padding);
        
        // Draw theory line (y = x) if enabled
        if (this.toggleTheoryLine.checked) {
            this.drawTheoryLine(ctx, padding, plotWidth, plotHeight);
        }
        
        // Draw best fit line if enabled and data exists
        if (this.toggleBestFit.checked && this.dataPoints.length > 1) {
            this.drawBestFitLine(ctx, padding, plotWidth, plotHeight);
        }
        
        // Draw data points if enabled
        if (this.toggleDataPoints.checked) {
            this.drawDataPoints(ctx, padding, plotWidth, plotHeight);
        }
    }
    
    // Draw coordinate axes
    drawAxes(ctx, width, height, padding) {
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.fillStyle = '#333';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // Axis labels
        ctx.fillStyle = '#555';
        ctx.textAlign = 'center';
        ctx.fillText('i (°)', width / 2, height - 10);
        
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('r (°)', 0, 0);
        ctx.restore();
        
        // Draw tick marks and grid labels (0, 30, 60, 90)
        const tickValues = [0, 30, 60, 90];
        const plotWidth = width - 2 * padding;
        const plotHeight = height - 2 * padding;
        
        tickValues.forEach(value => {
            const xPos = padding + (value / 90) * plotWidth;
            const yPos = height - padding - (value / 90) * plotHeight;
            
            // X-axis ticks
            ctx.beginPath();
            ctx.moveTo(xPos, height - padding);
            ctx.lineTo(xPos, height - padding + 5);
            ctx.stroke();
            ctx.fillText(value, xPos, height - padding + 18);
            
            // Y-axis ticks
            ctx.beginPath();
            ctx.moveTo(padding - 5, yPos);
            ctx.lineTo(padding, yPos);
            ctx.stroke();
            ctx.textAlign = 'right';
            ctx.fillText(value, padding - 12, yPos + 4);
            ctx.textAlign = 'center';
        });
    }
    
    // Draw theory line (y = x, representing Law of Reflection)
    drawTheoryLine(ctx, padding, plotWidth, plotHeight) {
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]); // Dashed line
        
        const width = this.graphCanvas.width;
        const height = this.graphCanvas.height;
        
        // Line from (0,0) to (90,90) in data coordinates
        const x1 = padding;
        const y1 = height - padding;
        const x2 = width - padding;
        const y2 = padding;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash
    }
    
    // Draw best fit line through first and last data points
    drawBestFitLine(ctx, padding, plotWidth, plotHeight) {
        if (this.dataPoints.length < 2) return;
        
        const width = this.graphCanvas.width;
        const height = this.graphCanvas.height;
        
        // Get first and last points
        const firstPoint = this.dataPoints[0];
        const lastPoint = this.dataPoints[this.dataPoints.length - 1];
        
        // Convert data coordinates to canvas coordinates
        const x1 = padding + (firstPoint.i / 90) * plotWidth;
        const y1 = height - padding - (firstPoint.r / 90) * plotHeight;
        const x2 = padding + (lastPoint.i / 90) * plotWidth;
        const y2 = height - padding - (lastPoint.r / 90) * plotHeight;
        
        // Draw line
        ctx.strokeStyle = '#95E1D3';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    
    // Draw data points on graph
    drawDataPoints(ctx, padding, plotWidth, plotHeight) {
        const width = this.graphCanvas.width;
        const height = this.graphCanvas.height;
        const pointRadius = 5;
        
        ctx.fillStyle = '#FF6B6B';
        
        this.dataPoints.forEach((point) => {
            // Convert data coordinates to canvas coordinates
            const x = padding + (point.i / 90) * plotWidth;
            const y = height - padding - (point.r / 90) * plotHeight;
            
            // Draw circle
            ctx.beginPath();
            ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw border
            ctx.strokeStyle = '#CC5555';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });
    }
    
    // Reset simulation to initial state
    reset() {
        // Clear data
        this.dataPoints = [];
        
        // Reset angle to 45°
        this.angle = 45.0;
        this.angleSlider.value = 450; // 45.0 * 10
        
        // Update display
        this.updateDiagram();
        this.updateTable();
        
        // Hide graph panel
        this.graphPanel.classList.add('hidden');
        
        // Reset graph toggles to default
        this.toggleDataPoints.checked = true;
        this.toggleTheoryLine.checked = true;
        this.toggleBestFit.checked = true;
        
        // Disable plot button
        this.plotBtn.disabled = true;
        
        // Clear canvas
        const ctx = this.graphCanvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, this.graphCanvas.width, this.graphCanvas.height);
    }
}

// Initialize simulation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ReflectionSimulation();
});