// Law of Reflection Simulation JavaScript
// This script handles the interactive simulation of light reflection

class ReflectionSimulation {
    constructor() {
        // Initialize canvas and context
        this.canvas = document.getElementById('reflection-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Simulation parameters
        this.incidentAngle = 30; // degrees
        this.surfaceType = 'plane';
        this.startTime = Date.now();
        this.actionLog = [];
        
        // Canvas dimensions and center point
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.mirrorY = this.centerY + 50; // Position of mirror surface
        
        // Initialize event listeners
        this.initializeEventListeners();
        
        // Initial draw
        this.updateSimulation();
        this.logAction('🚀 Simulation started', `Initial angle: ${this.incidentAngle}°`);
    }
    
    // Set up all event listeners for user interactions
    initializeEventListeners() {
        // Angle slider control
        const angleSlider = document.getElementById('incident-angle');
        const angleValue = document.getElementById('incident-value');
        
        // Handle both mouse and touch events for slider
        angleSlider.addEventListener('input', (e) => {
            this.incidentAngle = parseInt(e.target.value);
            angleValue.textContent = `${this.incidentAngle}°`;
            this.updateSimulation();
            this.logAction('📐 Angle adjusted', `θᵢ = ${this.incidentAngle}°`);
        });
        
        // Surface type selector
        const surfaceSelect = document.getElementById('surface-type');
        surfaceSelect.addEventListener('change', (e) => {
            this.surfaceType = e.target.value;
            this.updateSimulation();
            this.logAction('🔄 Surface changed', `Type: ${this.surfaceType}`);
        });
        
        // Reset button
        const resetBtn = document.getElementById('reset-btn');
        resetBtn.addEventListener('click', () => {
            this.resetSimulation();
        });
        
        // Analytics toggle button
        const toggleAnalytics = document.getElementById('toggle-analytics');
        const analyticsPanel = document.getElementById('analytics-panel');
        
        toggleAnalytics.addEventListener('click', () => {
            analyticsPanel.classList.toggle('collapsed');
            const isCollapsed = analyticsPanel.classList.contains('collapsed');
            toggleAnalytics.textContent = isCollapsed ? '📊 Analytics' : '📊 Hide';
            this.logAction('📊 Analytics toggled', isCollapsed ? 'Hidden' : 'Shown');
        });
        
        // Clear log button
        const clearLogBtn = document.getElementById('clear-log');
        clearLogBtn.addEventListener('click', () => {
            this.clearActionLog();
        });
        
        // Tooltip functionality for main container
        const mainContainer = document.getElementById('main-container');
        const tooltip = document.getElementById('tooltip');
        
        mainContainer.addEventListener('mouseenter', (e) => {
            if (e.target === mainContainer) {
                this.showTooltip(e, 'Interactive simulation demonstrating the Law of Reflection: angle of incidence equals angle of reflection');
            }
        });
        
        mainContainer.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });
        
        // Canvas interaction for mobile touch support
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
        });
        
        // Responsive canvas sizing
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
        
        this.resizeCanvas();
    }
    
    // Handle canvas resizing for responsive design
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const maxWidth = Math.min(400, container.clientWidth - 40);
        const aspectRatio = 300 / 400;
        
        this.canvas.style.width = maxWidth + 'px';
        this.canvas.style.height = (maxWidth * aspectRatio) + 'px';
        
        // Update center points based on actual canvas size
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.mirrorY = this.centerY + 50;
        
        this.updateSimulation();
    }
    
    // Main simulation update function
    updateSimulation() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw coordinate system and mirror
        this.drawMirrorSurface();
        this.drawNormalLine();
        
        // Calculate and draw light rays
        this.drawIncidentRay();
        this.drawReflectedRay();
        
        // Draw angle arcs and labels
        this.drawAngleArcs();
        
        // Update information display
        this.updateInfoDisplay();
    }
    
    // Draw the mirror surface
    drawMirrorSurface() {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 4;
        
        if (this.surfaceType === 'plane') {
            // Draw smooth mirror surface
            this.ctx.beginPath();
            this.ctx.moveTo(50, this.mirrorY);
            this.ctx.lineTo(this.canvas.width - 50, this.mirrorY);
            this.ctx.stroke();
            
            // Add mirror reflection effect
            this.ctx.strokeStyle = '#007bff';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(50, this.mirrorY + 2);
            this.ctx.lineTo(this.canvas.width - 50, this.mirrorY + 2);
            this.ctx.stroke();
        } else {
            // Draw rough surface with jagged line
            this.ctx.beginPath();
            this.ctx.moveTo(50, this.mirrorY);
            
            for (let x = 50; x < this.canvas.width - 50; x += 10) {
                const y = this.mirrorY + (Math.random() - 0.5) * 8;
                this.ctx.lineTo(x, y);
            }
            this.ctx.lineTo(this.canvas.width - 50, this.mirrorY);
            this.ctx.stroke();
        }
    }
    
    // Draw the normal line (perpendicular to surface)
    drawNormalLine() {
        this.ctx.strokeStyle = '#6c757d';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.mirrorY - 100);
        this.ctx.lineTo(this.centerX, this.mirrorY + 50);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]); // Reset line dash
        
        // Label the normal
        this.ctx.fillStyle = '#6c757d';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Normal', this.centerX + 20, this.mirrorY - 80);
    }
    
    // Draw incident light ray
    drawIncidentRay() {
        const angleRad = (this.incidentAngle * Math.PI) / 180;
        const rayLength = 100;
        
        // Calculate ray end point
        const startX = this.centerX - Math.sin(angleRad) * rayLength;
        const startY = this.mirrorY - Math.cos(angleRad) * rayLength;
        
        // Draw incident ray
        this.ctx.strokeStyle = '#dc3545';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(this.centerX, this.mirrorY);
        this.ctx.stroke();
        
        // Draw arrowhead for incident ray
        this.drawArrowhead(startX, startY, this.centerX, this.mirrorY, '#dc3545');
        
        // Label incident ray
        this.ctx.fillStyle = '#dc3545';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Incident Ray', startX - 20, startY - 10);
    }
    
    // Draw reflected light ray
    drawReflectedRay() {
        const angleRad = (this.incidentAngle * Math.PI) / 180;
        const rayLength = 100;
        
        // For plane mirror, reflection angle equals incident angle
        let reflectedAngle = this.incidentAngle;
        
        if (this.surfaceType === 'rough') {
            // For rough surface, add some scattering
            reflectedAngle += (Math.random() - 0.5) * 20;
        }
        
        const reflectedAngleRad = (reflectedAngle * Math.PI) / 180;
        
        // Calculate reflected ray end point
        const endX = this.centerX + Math.sin(reflectedAngleRad) * rayLength;
        const endY = this.mirrorY - Math.cos(reflectedAngleRad) * rayLength;
        
        // Draw reflected ray
        this.ctx.strokeStyle = '#28a745';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.mirrorY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        // Draw arrowhead for reflected ray
        this.drawArrowhead(this.centerX, this.mirrorY, endX, endY, '#28a745');
        
        // Label reflected ray
        this.ctx.fillStyle = '#28a745';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Reflected Ray', endX + 20, endY - 10);
    }
    
    // Draw angle measurement arcs
    drawAngleArcs() {
        const angleRad = (this.incidentAngle * Math.PI) / 180;
        const arcRadius = 40;
        
        // Incident angle arc
        this.ctx.strokeStyle = '#dc3545';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.mirrorY, arcRadius, -Math.PI/2, -Math.PI/2 + angleRad, false);
        this.ctx.stroke();
        
        // Reflected angle arc
        this.ctx.strokeStyle = '#28a745';
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.mirrorY, arcRadius, -Math.PI/2, -Math.PI/2 - angleRad, true);
        this.ctx.stroke();
        
        // Angle labels
        this.ctx.fillStyle = '#dc3545';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'center';
        
        const labelRadius = arcRadius + 15;
        const incidentLabelX = this.centerX - Math.sin(angleRad/2) * labelRadius;
        const incidentLabelY = this.mirrorY - Math.cos(angleRad/2) * labelRadius;
        this.ctx.fillText(`θᵢ=${this.incidentAngle}°`, incidentLabelX, incidentLabelY);
        
        this.ctx.fillStyle = '#28a745';
        const reflectedLabelX = this.centerX + Math.sin(angleRad/2) * labelRadius;
        const reflectedLabelY = this.mirrorY - Math.cos(angleRad/2) * labelRadius;
        this.ctx.fillText(`θᵣ=${this.incidentAngle}°`, reflectedLabelX, reflectedLabelY);
    }
    
    // Draw arrowhead for rays
    drawArrowhead(fromX, fromY, toX, toY, color) {
        const headLength = 15;
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = 2;
        
        this.ctx.beginPath();
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(
            toX - headLength * Math.cos(angle - Math.PI / 6),
            toY - headLength * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(
            toX - headLength * Math.cos(angle + Math.PI / 6),
            toY - headLength * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.stroke();
    }
    
    // Update information display panel
    updateInfoDisplay() {
        document.getElementById('display-incident').textContent = `${this.incidentAngle}°`;
        document.getElementById('display-reflected').textContent = `${this.incidentAngle}°`;
        
        const lawStatus = document.getElementById('law-status');
        if (this.surfaceType === 'plane') {
            lawStatus.textContent = 'θᵢ = θᵣ ✓';
            lawStatus.style.color = '#28a745';
        } else {
            lawStatus.textContent = 'Diffuse Reflection';
            lawStatus.style.color = '#ffc107';
        }
    }
    
    // Reset simulation to initial state
    resetSimulation() {
        this.incidentAngle = 30;
        this.surfaceType = 'plane';
        
        // Reset UI controls
        document.getElementById('incident-angle').value = 30;
        document.getElementById('incident-value').textContent = '30°';
        document.getElementById('surface-type').value = 'plane';
        
        // Reset start time and clear log
        this.startTime = Date.now();
        this.clearActionLog();
        
        this.updateSimulation();
        this.logAction('🔄 Simulation reset', 'All values restored to defaults');
    }
    
    // Show tooltip with educational information
    showTooltip(event, text) {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = text;
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY - 30 + 'px';
        tooltip.classList.add('show');
    }
    
    // Hide tooltip
    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('show');
    }
    
    // Log user actions for analytics
    logAction(action, details) {
        const currentTime = Date.now();
        const relativeTime = Math.round((currentTime - this.startTime) / 1000);
        
        const logEntry = {
            time: relativeTime,
            action: action,
            details: details,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.actionLog.push(logEntry);
        this.updateActionLogDisplay();
    }
    
    // Update the action log display
    updateActionLogDisplay() {
        const logContainer = document.getElementById('action-log');
        const latestEntries = this.actionLog.slice(-10); // Show last 10 entries
        
        logContainer.innerHTML = latestEntries.map(entry => 
            `<div class="log-entry">
                <span class="log-time">t=${entry.time}s</span> - 
                <span class="log-action">${entry.action}</span>: 
                <span class="log-value">${entry.details}</span>
            </div>`
        ).join('');
        
        // Auto-scroll to bottom
        logContainer.scrollTop = logContainer.scrollHeight;
    }
    
    // Clear action log
    clearActionLog() {
        this.actionLog = [];
        this.startTime = Date.now();
        document.getElementById('action-log').innerHTML = 
            '<div class="log-entry"><span class="log-action">📝 Log cleared</span></div>';
        this.logAction('🧹 Log cleared', 'Analytics reset');
    }
}

// Initialize simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're in an iframe or standalone
    const isInIframe = window.self !== window.top;
    
    // Add appropriate class for styling
    if (isInIframe) {
        document.body.classList.add('iframe-mode');
    } else {
        document.body.classList.add('standalone-mode');
    }
    
    // Initialize the simulation
    const simulation = new ReflectionSimulation();
    
    // Add educational context tooltip
    const mainContainer = document.getElementById('main-container');
    mainContainer.addEventListener('mouseenter', (e) => {
        if (e.target === mainContainer) {
            const tooltip = document.getElementById('tooltip');
            tooltip.innerHTML = `
                <strong>Law of Reflection</strong><br>
                The angle of incidence equals the angle of reflection<br>
                θᵢ = θᵣ (measured from the normal)
            `;
            tooltip.style.left = '50%';
            tooltip.style.top = '10px';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.classList.add('show');
        }
    });
    
    mainContainer.addEventListener('mouseleave', () => {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('show');
    });
    
    // Handle visibility changes for performance optimization
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause any animations if needed
        } else {
            // Resume animations
            simulation.updateSimulation();
        }
    });
    
    // Performance monitoring
    let frameCount = 0;
    let lastTime = performance.now();
    
    function monitorPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 5000) { // Every 5 seconds
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            console.log(`Performance: ${fps} updates per second`);
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(monitorPerformance);
    }
    
    // Start performance monitoring
    monitorPerformance();
});

// Error handling for better user experience
window.addEventListener('error', (event) => {
    console.error('Simulation error:', event.error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #dc3545;
        color: white;
        padding: 10px;
        border-radius: 5px;
        z-index: 1000;
        font-size: 14px;
    `;
    errorDiv.textContent = 'An error occurred. Please refresh the page.';
    document.body.appendChild(errorDiv);
    
    // Auto-remove error message after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
});

// Export for potential testing or external access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReflectionSimulation;
}