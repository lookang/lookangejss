// Shadow Formation Virtual Lab - Interactive Simulation
// This script handles the physics simulation, user interactions, and analytics

class ShadowFormationLab {
    constructor() {
        // Initialize simulation parameters
        this.startTime = Date.now();
        this.isAnalyticsCollapsed = false;
        
        // Get DOM elements
        this.initializeElements();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize the simulation
        this.updateSimulation();
        
        // Log initial state
        this.logAction('🚀 Simulation started', 'Initial setup complete');
    }
    
    // Initialize all DOM elements
    initializeElements() {
        // Control elements
        this.lightHeightSlider = document.getElementById('lightHeight');
        this.lightAngleSlider = document.getElementById('lightAngle');
        this.objectHeightSlider = document.getElementById('objectHeight');
        this.objectPositionSlider = document.getElementById('objectPosition');
        
        // Value display elements
        this.lightHeightValue = document.getElementById('lightHeightValue');
        this.lightAngleValue = document.getElementById('lightAngleValue');
        this.objectHeightValue = document.getElementById('objectHeightValue');
        this.objectPositionValue = document.getElementById('objectPositionValue');
        
        // SVG elements
        this.lightSource = document.getElementById('lightSource');
        this.shadowObject = document.getElementById('shadowObject');
        this.shadowShape = document.getElementById('shadowShape');
        this.lightRays = document.getElementById('lightRays');
        
        // Measurement displays
        this.shadowLength = document.getElementById('shadowLength');
        this.shadowWidth = document.getElementById('shadowWidth');
        
        // Other elements
        this.resetBtn = document.getElementById('resetBtn');
        this.insightsContent = document.getElementById('insightsContent');
        this.analyticsToggle = document.getElementById('analyticsToggle');
        this.analyticsContent = document.getElementById('analyticsContent');
        this.actionLog = document.getElementById('actionLog');
        this.clearLogBtn = document.getElementById('clearLog');
    }
    
    // Set up all event listeners for interactions
    setupEventListeners() {
        // Slider event listeners with both input and change events for better responsiveness
        this.lightHeightSlider.addEventListener('input', () => this.handleSliderChange('lightHeight'));
        this.lightAngleSlider.addEventListener('input', () => this.handleSliderChange('lightAngle'));
        this.objectHeightSlider.addEventListener('input', () => this.handleSliderChange('objectHeight'));
        this.objectPositionSlider.addEventListener('input', () => this.handleSliderChange('objectPosition'));
        
        // Touch event support for mobile devices
        [this.lightHeightSlider, this.lightAngleSlider, this.objectHeightSlider, this.objectPositionSlider].forEach(slider => {
            slider.addEventListener('touchstart', (e) => {
                e.preventDefault();
                slider.focus();
            });
            
            slider.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = slider.getBoundingClientRect();
                const percent = (touch.clientX - rect.left) / rect.width;
                const min = parseFloat(slider.min);
                const max = parseFloat(slider.max);
                const value = min + (max - min) * Math.max(0, Math.min(1, percent));
                slider.value = value;
                this.handleSliderChange(slider.id);
            });
        });
        
        // Reset button
        this.resetBtn.addEventListener('click', () => this.resetSimulation());
        
        // Analytics toggle
        this.analyticsToggle.addEventListener('click', () => this.toggleAnalytics());
        
        // Clear log button
        this.clearLogBtn.addEventListener('click', () => this.clearActionLog());
        
        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' && e.ctrlKey) {
                e.preventDefault();
                this.resetSimulation();
            }
        });
    }
    
    // Handle slider changes and update simulation
    handleSliderChange(sliderId) {
        const slider = document.getElementById(sliderId);
        const value = parseFloat(slider.value);
        
        // Update value display
        const valueDisplay = document.getElementById(sliderId + 'Value');
        let displayValue = '';
        let actionDescription = '';
        
        switch(sliderId) {
            case 'lightHeight':
                displayValue = value + 'px';
                actionDescription = `Light height adjusted to ${value}px`;
                break;
            case 'lightAngle':
                displayValue = value + '°';
                actionDescription = `Light angle set to ${value}°`;
                break;
            case 'objectHeight':
                displayValue = value + 'px';
                actionDescription = `Object height changed to ${value}px`;
                break;
            case 'objectPosition':
                displayValue = value + 'px';
                actionDescription = `Object moved to position ${value}px`;
                break;
        }
        
        valueDisplay.textContent = displayValue;
        
        // Update simulation
        this.updateSimulation();
        
        // Log the action
        this.logAction(`🎛️ ${actionDescription}`, this.getCurrentState());
        
        // Update insights
        this.updateInsights();
    }
    
    // Main simulation update function - calculates shadow based on light physics
    updateSimulation() {
        // Get current values
        const lightHeight = parseFloat(this.lightHeightSlider.value);
        const lightAngle = parseFloat(this.lightAngleSlider.value) * Math.PI / 180; // Convert to radians
        const objectHeight = parseFloat(this.objectHeightSlider.value);
        const objectPosition = parseFloat(this.objectPositionSlider.value);
        
        // Update light source position
        const lightX = 50 + Math.sin(lightAngle) * 30; // Slight horizontal movement with angle
        const lightY = 250 - lightHeight; // Y increases downward in SVG
        this.lightSource.setAttribute('cx', lightX);
        this.lightSource.setAttribute('cy', lightY);
        
        // Update object position and height
        const objectWidth = 20;
        const objectY = 250 - objectHeight;
        this.shadowObject.setAttribute('x', objectPosition - objectWidth/2);
        this.shadowObject.setAttribute('y', objectY);
        this.shadowObject.setAttribute('height', objectHeight);
        
        // Calculate shadow using similar triangles principle
        const shadowCalculation = this.calculateShadow(lightX, lightY, objectPosition, objectHeight, objectWidth);
        
        // Update shadow shape - now properly visible with enhanced styling
        this.shadowShape.setAttribute('points', shadowCalculation.points);
        
        // Update light rays
        this.updateLightRays(lightX, lightY, objectPosition, objectHeight, objectWidth, shadowCalculation);
        
        // Update measurements
        this.shadowLength.textContent = Math.round(shadowCalculation.length) + 'px';
        this.shadowWidth.textContent = Math.round(shadowCalculation.width) + 'px';
    }
    
    // Calculate shadow geometry using physics principles - Enhanced for much better visibility
    calculateShadow(lightX, lightY, objectX, objectHeight, objectWidth) {
        const groundY = 250;
        const objectY = groundY - objectHeight;
        
        // Calculate shadow using ray tracing from light source
        const objectLeft = objectX - objectWidth/2;
        const objectRight = objectX + objectWidth/2;
        const objectTop = objectY;
        
        // Ensure light is not directly above or below the object to avoid division by zero
        if (Math.abs(lightX - objectLeft) < 0.1 || Math.abs(lightX - objectRight) < 0.1) {
            // Handle edge case where light is directly above corners - create more visible shadow
            const shadowExtension = 15; // Increased shadow extension for better visibility
            const points = [
                `${objectLeft},${groundY}`,
                `${objectRight},${groundY}`,
                `${objectRight + shadowExtension},${groundY}`,
                `${objectLeft - shadowExtension},${groundY}`
            ].join(' ');
            
            return {
                points: points,
                length: shadowExtension * 2,
                width: objectWidth + shadowExtension * 2,
                leftShadowX: objectLeft - shadowExtension,
                rightShadowX: objectRight + shadowExtension
            };
        }
        
        // Ray from light to top-left corner of object
        const leftRaySlope = (objectTop - lightY) / (objectLeft - lightX);
        const leftShadowX = objectLeft + (groundY - objectTop) / leftRaySlope;
        
        // Ray from light to top-right corner of object
        const rightRaySlope = (objectTop - lightY) / (objectRight - lightX);
        const rightShadowX = objectRight + (groundY - objectTop) / rightRaySlope;
        
        // Ensure shadow extends in the correct direction from the light
        const minShadowX = Math.min(leftShadowX, rightShadowX);
        const maxShadowX = Math.max(leftShadowX, rightShadowX);
        
        // Enhanced shadow calculation - ensure minimum visible shadow size
        const minShadowWidth = 25; // Minimum shadow width for visibility
        const actualShadowWidth = Math.abs(maxShadowX - minShadowX);
        
        let finalMinX = minShadowX;
        let finalMaxX = maxShadowX;
        
        // If shadow is too small, extend it for better visibility
        if (actualShadowWidth < minShadowWidth) {
            const center = (minShadowX + maxShadowX) / 2;
            finalMinX = center - minShadowWidth / 2;
            finalMaxX = center + minShadowWidth / 2;
        }
        
        // Create shadow points that form a proper quadrilateral with enhanced visibility
        const points = [
            `${objectLeft},${groundY}`,     // Bottom-left of object base
            `${objectRight},${groundY}`,    // Bottom-right of object base
            `${finalMaxX},${groundY}`,      // Right edge of shadow
            `${finalMinX},${groundY}`       // Left edge of shadow
        ].join(' ');
        
        // Calculate shadow dimensions
        const shadowWidth = Math.abs(finalMaxX - finalMinX);
        const shadowLength = Math.max(
            Math.abs(finalMinX - objectLeft), 
            Math.abs(finalMaxX - objectRight)
        );
        
        return {
            points: points,
            length: shadowLength,
            width: shadowWidth,
            leftShadowX: finalMinX,
            rightShadowX: finalMaxX
        };
    }
    
    // Update light rays visualization - Enhanced to show shadow formation more clearly
    updateLightRays(lightX, lightY, objectX, objectHeight, objectWidth, shadowCalc) {
        // Clear existing rays
        this.lightRays.innerHTML = '';
        
        const groundY = 250;
        const objectY = groundY - objectHeight;
        const objectLeft = objectX - objectWidth/2;
        const objectRight = objectX + objectWidth/2;
        
        // Create light rays that show shadow formation with enhanced visibility
        const rays = [
            // Main rays that create the shadow edges - made more prominent
            { x1: lightX, y1: lightY, x2: objectLeft, y2: objectY, type: 'blocked' },
            { x1: objectLeft, y1: objectY, x2: shadowCalc.leftShadowX, y2: groundY, type: 'shadow' },
            { x1: lightX, y1: lightY, x2: objectRight, y2: objectY, type: 'blocked' },
            { x1: objectRight, y1: objectY, x2: shadowCalc.rightShadowX, y2: groundY, type: 'shadow' },
            
            // Additional rays to show light distribution - enhanced for better shadow definition
            { x1: lightX, y1: lightY, x2: shadowCalc.leftShadowX - 30, y2: groundY, type: 'light' },
            { x1: lightX, y1: lightY, x2: shadowCalc.rightShadowX + 30, y2: groundY, type: 'light' },
            
            // Extra rays to better define shadow boundaries
            { x1: lightX, y1: lightY, x2: shadowCalc.leftShadowX - 15, y2: groundY, type: 'light' },
            { x1: lightX, y1: lightY, x2: shadowCalc.rightShadowX + 15, y2: groundY, type: 'light' }
        ];
        
        rays.forEach(ray => {
            const line = document.createElementNS('vendor/external_0.txt', 'line');
            line.setAttribute('x1', ray.x1);
            line.setAttribute('y1', ray.y1);
            line.setAttribute('x2', ray.x2);
            line.setAttribute('y2', ray.y2);
            
            // Enhanced styling for different ray types to improve shadow visibility
            switch(ray.type) {
                case 'blocked':
                    line.setAttribute('stroke', '#FF4444');
                    line.setAttribute('stroke-width', '3'); // Increased width
                    line.setAttribute('opacity', '0.9'); // Increased opacity
                    line.setAttribute('stroke-dasharray', '4,4');
                    break;
                case 'shadow':
                    line.setAttribute('stroke', '#333333');
                    line.setAttribute('stroke-width', '3'); // Increased width
                    line.setAttribute('opacity', '0.8'); // Increased opacity
                    line.setAttribute('stroke-dasharray', '6,6');
                    break;
                case 'light':
                    line.setAttribute('stroke', '#FFD700');
                    line.setAttribute('stroke-width', '1.5'); // Slightly increased
                    line.setAttribute('opacity', '0.5'); // Increased opacity
                    break;
            }
            
            this.lightRays.appendChild(line);
        });
    }
    
    // Update educational insights based on current configuration
    updateInsights() {
        const lightHeight = parseFloat(this.lightHeightSlider.value);
        const lightAngle = parseFloat(this.lightAngleSlider.value);
        const objectHeight = parseFloat(this.objectHeightSlider.value);
        
        let insight = '';
        
        if (lightHeight < 80) {
            insight = '🔍 Low light creates longer shadows! Notice how the shadow stretches when the light is closer to the ground.';
        } else if (lightHeight > 150) {
            insight = '☀️ High light creates shorter shadows! Like the sun at noon, higher light sources make smaller shadows.';
        } else if (Math.abs(lightAngle) > 30) {
            insight = '📐 Angled light creates asymmetric shadows! The shadow leans away from the light direction.';
        } else if (objectHeight > 90) {
            insight = '📏 Taller objects create longer shadows! Height directly affects shadow length.';
        } else {
            insight = '🎯 Perfect setup! Try changing different parameters to see how shadows respond to light position and object properties.';
        }
        
        this.insightsContent.textContent = insight;
    }
    
    // Reset simulation to default values
    resetSimulation() {
        this.lightHeightSlider.value = 100;
        this.lightAngleSlider.value = 0;
        this.objectHeightSlider.value = 60;
        this.objectPositionSlider.value = 200;
        
        // Update all displays
        this.lightHeightValue.textContent = '100px';
        this.lightAngleValue.textContent = '0°';
        this.objectHeightValue.textContent = '60px';
        this.objectPositionValue.textContent = '200px';
        
        // Update simulation
        this.updateSimulation();
        
        // Log reset action
        this.logAction('🔄 Reset to defaults', 'All parameters restored to initial values');
        
        // Update insights
        this.updateInsights();
    }
    
    // Get current state for logging
    getCurrentState() {
        return `Light: ${this.lightHeightSlider.value}px/${this.lightAngleSlider.value}°, Object: ${this.objectHeightSlider.value}px@${this.objectPositionSlider.value}px`;
    }
    
    // Log user actions for analytics
    logAction(action, details) {
        const timestamp = Math.round((Date.now() - this.startTime) / 1000);
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `
            <span class="timestamp">t=${timestamp}s</span>
            <span class="action">${action}</span>
        `;
        
        // Add tooltip with details
        if (details) {
            logEntry.title = details;
        }
        
        this.actionLog.appendChild(logEntry);
        
        // Auto-scroll to bottom
        this.actionLog.scrollTop = this.actionLog.scrollHeight;
        
        // Limit log entries to prevent memory issues
        const entries = this.actionLog.children;
        if (entries.length > 50) {
            this.actionLog.removeChild(entries[0]);
        }
    }
    
    // Toggle analytics panel visibility
    toggleAnalytics() {
        this.isAnalyticsCollapsed = !this.isAnalyticsCollapsed;
        
        if (this.isAnalyticsCollapsed) {
            this.analyticsContent.classList.add('collapsed');
            this.analyticsToggle.classList.add('collapsed');
        } else {
            this.analyticsContent.classList.remove('collapsed');
            this.analyticsToggle.classList.remove('collapsed');
        }
        
        this.logAction('📊 Analytics panel ' + (this.isAnalyticsCollapsed ? 'collapsed' : 'expanded'), 'User toggled analytics visibility');
    }
    
    // Clear action log
    clearActionLog() {
        this.actionLog.innerHTML = '<div class="log-entry"><span class="timestamp">t=0s</span><span class="action">📝 Log cleared - New session started</span></div>';
        this.startTime = Date.now();
        this.logAction('🧹 Action log cleared', 'Analytics reset for new session');
    }
}

// Initialize the simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in an iframe and adjust height accordingly
    const isInIframe = window.self !== window.top;
    const container = document.querySelector('.container');
    
    if (!isInIframe) {
        container.style.height = '90vh';
        container.style.maxHeight = '90vh';
    }
    
    // Initialize the shadow formation lab
    const shadowLab = new ShadowFormationLab();
    
    // Add window resize handler for responsive design
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            shadowLab.updateSimulation();
            shadowLab.logAction('📱 Window resized', `New dimensions: ${window.innerWidth}x${window.innerHeight}`);
        }, 250);
    });
    
    // Add visibility change handler to pause/resume when tab is not active
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            shadowLab.logAction('👁️ Tab hidden', 'User switched away from simulation');
        } else {
            shadowLab.logAction('👁️ Tab visible', 'User returned to simulation');
        }
    });
    
    // Prevent context menu on touch devices to avoid interference
    document.addEventListener('contextmenu', function(e) {
        if (e.target.closest('.slider') || e.target.closest('button')) {
            e.preventDefault();
        }
    });
    
    // Add keyboard shortcuts help
    document.addEventListener('keydown', function(e) {
        if (e.key === 'h' && e.ctrlKey) {
            e.preventDefault();
            alert('Keyboard Shortcuts:\nCtrl+R: Reset simulation\nCtrl+H: Show this help\nUse Tab to navigate controls');
            shadowLab.logAction('❓ Help accessed', 'User requested keyboard shortcuts');
        }
    });
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShadowFormationLab;
}