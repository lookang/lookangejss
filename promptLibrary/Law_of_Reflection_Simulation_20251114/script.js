// Law of Reflection Simulation - Interactive Physics Learning Tool
// This script handles the interactive elements and real-time updates

class ReflectionSimulation {
    constructor() {
        // Initialize simulation properties
        this.startTime = Date.now();
        this.currentAngle = 45.0; // Default angle in degrees
        this.dataPoints = []; // Store recorded measurements
        this.maxDataPoints = 7; // Limit for data table
        
        // Get DOM elements
        this.angleSlider = document.getElementById('angleSlider');
        this.angleValue = document.getElementById('angleValue');
        this.recordBtn = document.getElementById('recordBtn');
        this.plotBtn = document.getElementById('plotBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.dataTableBody = document.getElementById('dataTableBody');
        this.noDataMessage = document.getElementById('noDataMessage');
        this.graphContainer = document.getElementById('graphContainer');
        this.graphCanvas = document.getElementById('graphCanvas');
        this.logContainer = document.getElementById('logContainer');
        this.clearLogBtn = document.getElementById('clearLogBtn');
        this.analyticsToggle = document.getElementById('analyticsToggle');
        this.analyticsContent = document.getElementById('analyticsContent');
        
        // Initialize the simulation
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize the diagram
        this.updateDiagram();
        
        // Log initial state
        this.logAction('🚀', 'Simulation initialized', `Initial angle: ${this.currentAngle}°`);
    }
    
    setupEventListeners() {
        // Angle slider - handles both mouse and touch events
        this.angleSlider.addEventListener('input', (e) => {
            this.currentAngle = parseFloat(e.target.value);
            this.updateAngleDisplay();
            this.updateDiagram();
            this.logAction('🎚️', 'Angle adjusted', `New angle: ${this.currentAngle}°`);
        });
        
        // Touch support for slider
        this.angleSlider.addEventListener('touchstart', (e) => {
            e.preventDefault();
        });
        
        this.angleSlider.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const slider = e.target;
            const rect = slider.getBoundingClientRect();
            const percent = (touch.clientX - rect.left) / rect.width;
            const value = Math.max(0, Math.min(90, percent * 90));
            slider.value = value;
            this.currentAngle = parseFloat(value.toFixed(1));
            this.updateAngleDisplay();
            this.updateDiagram();
        });
        
        // Record button
        this.recordBtn.addEventListener('click', () => {
            this.recordData();
        });
        
        // Plot button
        this.plotBtn.addEventListener('click', () => {
            this.plotGraph();
        });
        
        // Reset button
        this.resetBtn.addEventListener('click', () => {
            this.resetSimulation();
        });
        
        // Clear log button
        this.clearLogBtn.addEventListener('click', () => {
            this.clearLog();
        });
        
        // Analytics toggle
        this.analyticsToggle.addEventListener('click', () => {
            this.toggleAnalytics();
        });
    }
    
    updateAngleDisplay() {
        // Update the angle value display
        this.angleValue.textContent = `${this.currentAngle.toFixed(1)}°`;
    }
    
    updateDiagram() {
        // Calculate positions for incident and reflected rays
        const centerX = 200;
        const centerY = 250;
        const rayLength = 100;
        
        // Convert angle to radians
        const angleRad = (this.currentAngle * Math.PI) / 180;
        
        // Calculate incident ray endpoint (coming from top-left)
        const incidentX = centerX - rayLength * Math.sin(angleRad);
        const incidentY = centerY - rayLength * Math.cos(angleRad);
        
        // Calculate reflected ray endpoint (going to top-right)
        const reflectedX = centerX + rayLength * Math.sin(angleRad);
        const reflectedY = centerY - rayLength * Math.cos(angleRad);
        
        // Update incident ray
        const incidentRay = document.getElementById('incidentRay');
        incidentRay.setAttribute('x1', incidentX);
        incidentRay.setAttribute('y1', incidentY);
        incidentRay.setAttribute('x2', centerX);
        incidentRay.setAttribute('y2', centerY);
        
        // Update incident arrow
        const incidentArrow = document.getElementById('incidentArrow');
        const incArrowX = centerX - 5 * Math.sin(angleRad);
        const incArrowY = centerY - 5 * Math.cos(angleRad);
        incidentArrow.setAttribute('points', `${incArrowX-2},${incArrowY-2} ${centerX},${centerY} ${incArrowX+2},${incArrowY-2}`);
        
        // Update reflected ray
        const reflectedRay = document.getElementById('reflectedRay');
        reflectedRay.setAttribute('x1', centerX);
        reflectedRay.setAttribute('y1', centerY);
        reflectedRay.setAttribute('x2', reflectedX);
        reflectedRay.setAttribute('y2', reflectedY);
        
        // Update reflected arrow
        const reflectedArrow = document.getElementById('reflectedArrow');
        const refArrowX = centerX + 5 * Math.sin(angleRad);
        const refArrowY = centerY - 5 * Math.cos(angleRad);
        reflectedArrow.setAttribute('points', `${refArrowX-2},${refArrowY-2} ${reflectedX},${reflectedY} ${refArrowX+2},${refArrowY-2}`);
        
        // Update angle arcs
        this.updateAngleArcs(angleRad);
        
        // Update angle labels
        document.getElementById('incidentAngleLabel').textContent = `i = ${this.currentAngle.toFixed(1)}°`;
        document.getElementById('reflectedAngleLabel').textContent = `r = ${this.currentAngle.toFixed(1)}°`;
        
        // Position angle labels
        const labelOffset = 35;
        document.getElementById('incidentAngleLabel').setAttribute('x', centerX - labelOffset * Math.sin(angleRad/2) - 10);
        document.getElementById('incidentAngleLabel').setAttribute('y', centerY - labelOffset * Math.cos(angleRad/2) + 5);
        document.getElementById('reflectedAngleLabel').setAttribute('x', centerX + labelOffset * Math.sin(angleRad/2) + 10);
        document.getElementById('reflectedAngleLabel').setAttribute('y', centerY - labelOffset * Math.cos(angleRad/2) + 5);
        
        // Update ray labels positions
        document.getElementById('incidentLabel').setAttribute('x', incidentX - 20);
        document.getElementById('incidentLabel').setAttribute('y', incidentY - 10);
        document.getElementById('reflectedLabel').setAttribute('x', reflectedX - 20);
        document.getElementById('reflectedLabel').setAttribute('y', reflectedY - 10);
    }
    
    updateAngleArcs(angleRad) {
        // Update the angle arc paths to show the angles visually
        const centerX = 200;
        const centerY = 250;
        const arcRadius = 20;
        
        // Incident angle arc
        const incidentArc = document.getElementById('incidentArc');
        const incStartX = centerX;
        const incStartY = centerY - arcRadius;
        const incEndX = centerX - arcRadius * Math.sin(angleRad);
        const incEndY = centerY - arcRadius * Math.cos(angleRad);
        
        const incArcPath = `M ${incStartX},${incStartY} A ${arcRadius},${arcRadius} 0 0,0 ${incEndX},${incEndY}`;
        incidentArc.setAttribute('d', incArcPath);
        
        // Reflected angle arc
        const reflectedArc = document.getElementById('reflectedArc');
        const refStartX = centerX + arcRadius * Math.sin(angleRad);
        const refStartY = centerY - arcRadius * Math.cos(angleRad);
        const refEndX = centerX;
        const refEndY = centerY - arcRadius;
        
        const refArcPath = `M ${refStartX},${refStartY} A ${arcRadius},${arcRadius} 0 0,0 ${refEndX},${refEndY}`;
        reflectedArc.setAttribute('d', refArcPath);
    }
    
    recordData() {
        // Record current angle pair to data table
        if (this.dataPoints.length >= this.maxDataPoints) {
            this.logAction('⚠️', 'Record attempt failed', 'Maximum 7 data points reached');
            return;
        }
        
        const dataPoint = {
            incident: this.currentAngle,
            reflected: this.currentAngle // Law of reflection: i = r
        };
        
        this.dataPoints.push(dataPoint);
        this.updateDataTable();
        this.logAction('📊', 'Data recorded', `i = ${this.currentAngle.toFixed(1)}°, r = ${this.currentAngle.toFixed(1)}°`);
        
        // Enable plot button if we have data
        if (this.dataPoints.length > 0) {
            this.plotBtn.disabled = false;
        }
    }
    
    updateDataTable() {
        // Clear existing table rows
        this.dataTableBody.innerHTML = '';
        
        // Add data rows
        this.dataPoints.forEach((point, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${point.incident.toFixed(1)}</td>
                <td>${point.reflected.toFixed(1)}</td>
            `;
            this.dataTableBody.appendChild(row);
        });
        
        // Hide/show no data message
        this.noDataMessage.style.display = this.dataPoints.length === 0 ? 'block' : 'none';
    }
    
    plotGraph() {
        // Generate and display the i vs r graph
        if (this.dataPoints.length === 0) return;
        
        this.graphContainer.style.display = 'block';
        this.drawGraph();
        this.logAction('📈', 'Graph plotted', `${this.dataPoints.length} data points visualized`);
    }
    
    drawGraph() {
        // Draw the graph on canvas
        const canvas = this.graphCanvas;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Set up graph parameters
        const margin = 40;
        const graphWidth = width - 2 * margin;
        const graphHeight = height - 2 * margin;
        
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // X-axis
        ctx.moveTo(margin, height - margin);
        ctx.lineTo(width - margin, height - margin);
        // Y-axis
        ctx.moveTo(margin, height - margin);
        ctx.lineTo(margin, margin);
        ctx.stroke();
        
        // Add axis labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Angle of Incidence i (°)', width / 2, height - 5);
        
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Angle of Reflection r (°)', 0, 0);
        ctx.restore();
        
        // Draw scale marks and numbers
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        
        for (let i = 0; i <= 90; i += 15) {
            const x = margin + (i / 90) * graphWidth;
            const y = height - margin + (i / 90) * graphHeight;
            
            // X-axis marks
            ctx.beginPath();
            ctx.moveTo(x, height - margin);
            ctx.lineTo(x, height - margin + 5);
            ctx.stroke();
            ctx.fillText(i.toString(), x, height - margin + 15);
            
            // Y-axis marks
            ctx.beginPath();
            ctx.moveTo(margin, height - margin - (i / 90) * graphHeight);
            ctx.lineTo(margin - 5, height - margin - (i / 90) * graphHeight);
            ctx.stroke();
            ctx.textAlign = 'right';
            ctx.fillText(i.toString(), margin - 8, height - margin - (i / 90) * graphHeight + 3);
            ctx.textAlign = 'center';
        }
        
        // Draw ideal line (i = r)
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(margin, height - margin);
        ctx.lineTo(width - margin, margin);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Plot data points
        ctx.fillStyle = '#3498db';
        this.dataPoints.forEach(point => {
            const x = margin + (point.incident / 90) * graphWidth;
            const y = height - margin - (point.reflected / 90) * graphHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            
            // Add point outline
            ctx.strokeStyle = '#2980b9';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
        
        // Add legend
        ctx.fillStyle = '#333';
        ctx.font = '10px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('● Data Points', margin + 10, margin + 20);
        ctx.strokeStyle = '#999';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(margin + 10, margin + 35);
        ctx.lineTo(margin + 30, margin + 35);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillText('- - - i = r (ideal)', margin + 35, margin + 38);
    }
    
    resetSimulation() {
        // Reset all simulation data and return to default state
        this.currentAngle = 45.0;
        this.dataPoints = [];
        
        // Update UI elements
        this.angleSlider.value = this.currentAngle;
        this.updateAngleDisplay();
        this.updateDiagram();
        this.updateDataTable();
        
        // Hide graph and disable plot button
        this.graphContainer.style.display = 'none';
        this.plotBtn.disabled = true;
        
        this.logAction('🔄', 'Simulation reset', 'All data cleared, angle reset to 45.0°');
    }
    
    logAction(icon, action, details) {
        // Add action to the analytics log
        const currentTime = Math.floor((Date.now() - this.startTime) / 1000);
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = `${icon} t=${currentTime}s: ${action} - ${details}`;
        
        this.logContainer.appendChild(logEntry);
        this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }
    
    clearLog() {
        // Clear the analytics log
        this.logContainer.innerHTML = '<div class="log-entry">🚀 Log cleared</div>';
        this.startTime = Date.now();
    }
    
    toggleAnalytics() {
        // Toggle analytics panel visibility
        const content = this.analyticsContent;
        const icon = this.analyticsToggle.querySelector('.toggle-icon');
        
        if (content.classList.contains('collapsed')) {
            content.classList.remove('collapsed');
            icon.classList.remove('rotated');
        } else {
            content.classList.add('collapsed');
            icon.classList.add('rotated');
        }
    }
}

// Initialize the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ReflectionSimulation();
});

// Handle window resize for responsive canvas
window.addEventListener('resize', () => {
    // Redraw graph if visible
    const graphContainer = document.getElementById('graphContainer');
    if (graphContainer && graphContainer.style.display !== 'none') {
        setTimeout(() => {
            const simulation = window.reflectionSim;
            if (simulation && simulation.dataPoints.length > 0) {
                simulation.drawGraph();
            }
        }, 100);
    }
});