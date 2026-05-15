// Shadow Formation Virtual Lab - JavaScript
// This script handles all interactive functionality including dragging, animation, and real-time calculations

class ShadowFormationLab {
    constructor() {
        // Initialize DOM elements
        this.svg = document.getElementById('labSvg');
        this.lightSource = document.getElementById('lightSource');
        this.objectGroup = document.getElementById('objectGroup');
        this.cubeObject = document.getElementById('cubeObject');
        this.sphereObject = document.getElementById('sphereObject');
        this.screen = document.getElementById('screen');
        this.shadow = document.getElementById('shadow');
        this.ray1 = document.getElementById('ray1');
        this.ray2 = document.getElementById('ray2');
        
        // Control elements
        this.playBtn = document.getElementById('playBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.objectSelect = document.getElementById('objectSelect');
        this.toggleAnalytics = document.getElementById('toggleAnalytics');
        this.analyticsPanel = document.getElementById('analyticsPanel');
        this.actionLog = document.getElementById('actionLog');
        this.clearLog = document.getElementById('clearLog');
        
        // Info display elements
        this.shadowHeight = document.getElementById('shadowHeight');
        this.objectDistance = document.getElementById('objectDistance');
        this.screenDistance = document.getElementById('screenDistance');
        
        // State variables
        this.isAnimating = false;
        this.animationDirection = 1;
        this.animationId = null;
        this.startTime = Date.now();
        this.isDragging = false;
        this.dragTarget = null;
        this.currentObject = 'cube';
        
        // Default positions (scaled for 800x300 viewBox)
        this.defaultPositions = {
            lightSource: { x: 100, y: 150 },
            object: { x: 370, y: 150 },
            screen: { x: 650, y: 150 }
        };
        
        // Current positions
        this.positions = { ...this.defaultPositions };
        
        // Initialize the lab
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateCalculations();
        this.logAction('🚀 Lab initialized', 'Ready to explore shadow formation');
        
        // Set initial object visibility
        this.switchObject('cube');
    }
    
    setupEventListeners() {
        // Control buttons
        this.playBtn.addEventListener('click', () => this.startAnimation());
        this.pauseBtn.addEventListener('click', () => this.pauseAnimation());
        this.resetBtn.addEventListener('click', () => this.resetLab());
        this.objectSelect.addEventListener('change', (e) => this.switchObject(e.target.value));
        this.toggleAnalytics.addEventListener('click', () => this.toggleAnalyticsPanel());
        this.clearLog.addEventListener('click', () => this.clearActionLog());
        
        // Drag and drop for desktop
        this.lightSource.addEventListener('mousedown', (e) => this.startDrag(e, 'lightSource'));
        this.objectGroup.addEventListener('mousedown', (e) => this.startDrag(e, 'object'));
        this.screen.addEventListener('mousedown', (e) => this.startDrag(e, 'screen'));
        
        // Touch events for mobile
        this.lightSource.addEventListener('touchstart', (e) => this.startDrag(e, 'lightSource'));
        this.objectGroup.addEventListener('touchstart', (e) => this.startDrag(e, 'object'));
        this.screen.addEventListener('touchstart', (e) => this.startDrag(e, 'screen'));
        
        // Global mouse/touch events
        document.addEventListener('mousemove', (e) => this.handleDrag(e));
        document.addEventListener('mouseup', () => this.endDrag());
        document.addEventListener('touchmove', (e) => this.handleDrag(e));
        document.addEventListener('touchend', () => this.endDrag());
        
        // Prevent context menu on touch devices
        this.svg.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Tooltip functionality
        this.setupTooltips();
    }
    
    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        const elements = document.querySelectorAll('[title]');
        
        elements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                tooltip.textContent = e.target.getAttribute('title');
                tooltip.classList.add('show');
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
            
            element.addEventListener('mousemove', (e) => {
                tooltip.style.left = (e.clientX + 10) + 'px';
                tooltip.style.top = (e.clientY - 30) + 'px';
            });
        });
    }
    
    startDrag(e, target) {
        e.preventDefault();
        this.isDragging = true;
        this.dragTarget = target;
        
        // Add visual feedback
        const element = target === 'lightSource' ? this.lightSource : 
                       target === 'object' ? this.objectGroup : this.screen;
        element.style.filter = 'brightness(1.2)';
        
        this.logAction('🖱️ Drag started', `Started dragging ${target}`);
    }
    
    handleDrag(e) {
        if (!this.isDragging || !this.dragTarget) return;
        
        e.preventDefault();
        
        // Get mouse/touch position relative to SVG
        const rect = this.svg.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const svgX = ((clientX - rect.left) / rect.width) * 800; // Scale to viewBox
        
        // Constrain movement and update positions
        this.updatePosition(this.dragTarget, svgX);
        this.updateCalculations();
    }
    
    updatePosition(target, newX) {
        const minX = 50;
        const maxX = 750;
        
        switch(target) {
            case 'lightSource':
                // Light source must stay left of object
                newX = Math.max(minX, Math.min(newX, this.positions.object.x - 50));
                this.positions.lightSource.x = newX;
                this.lightSource.setAttribute('cx', newX);
                document.getElementById('lightLabel').setAttribute('x', newX);
                break;
                
            case 'object':
                // Object must stay between light source and screen
                newX = Math.max(this.positions.lightSource.x + 50, 
                               Math.min(newX, this.positions.screen.x - 50));
                this.positions.object.x = newX;
                this.cubeObject.setAttribute('x', newX - 30);
                this.sphereObject.setAttribute('cx', newX);
                document.getElementById('objectLabel').setAttribute('x', newX);
                break;
                
            case 'screen':
                // Screen must stay right of object
                newX = Math.max(this.positions.object.x + 50, Math.min(newX, maxX));
                this.positions.screen.x = newX;
                this.screen.setAttribute('x', newX);
                document.getElementById('screenLabel').setAttribute('x', newX + 5);
                break;
        }
    }
    
    endDrag() {
        if (this.isDragging) {
            // Remove visual feedback
            const element = this.dragTarget === 'lightSource' ? this.lightSource : 
                           this.dragTarget === 'object' ? this.objectGroup : this.screen;
            element.style.filter = '';
            
            this.logAction('✋ Drag ended', `Finished dragging ${this.dragTarget}`);
        }
        
        this.isDragging = false;
        this.dragTarget = null;
    }
    
    switchObject(objectType) {
        this.currentObject = objectType;
        
        if (objectType === 'cube') {
            this.cubeObject.style.display = 'block';
            this.sphereObject.style.display = 'none';
        } else {
            this.cubeObject.style.display = 'none';
            this.sphereObject.style.display = 'block';
        }
        
        this.updateCalculations();
        this.logAction('🔄 Object changed', `Switched to ${objectType}`);
    }
    
    updateCalculations() {
        // Calculate light rays and shadow based on current positions
        const lightX = this.positions.lightSource.x;
        const lightY = this.positions.lightSource.y;
        const objectX = this.positions.object.x;
        const objectY = this.positions.object.y;
        const screenX = this.positions.screen.x;
        
        let topY, bottomY;
        
        if (this.currentObject === 'cube') {
            // For cube: rays tangent to top and bottom edges
            topY = objectY - 30; // Half height of cube
            bottomY = objectY + 30;
        } else {
            // For sphere: rays tangent to circle
            const radius = 30;
            const dx = objectX - lightX;
            const dy = objectY - lightY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.asin(radius / distance);
            
            topY = objectY - radius * Math.cos(angle) - (radius * Math.sin(angle)) * (dx / distance);
            bottomY = objectY + radius * Math.cos(angle) + (radius * Math.sin(angle)) * (dx / distance);
        }
        
        // Calculate ray intersections with screen
        const topRaySlope = (topY - lightY) / (objectX - lightX);
        const bottomRaySlope = (bottomY - lightY) / (objectX - lightX);
        
        const topScreenY = lightY + topRaySlope * (screenX - lightX);
        const bottomScreenY = lightY + bottomRaySlope * (screenX - lightX);
        
        // Update light rays
        this.ray1.setAttribute('x1', lightX);
        this.ray1.setAttribute('y1', lightY);
        this.ray1.setAttribute('x2', screenX);
        this.ray1.setAttribute('y2', topScreenY);
        
        this.ray2.setAttribute('x1', lightX);
        this.ray2.setAttribute('y1', lightY);
        this.ray2.setAttribute('x2', screenX);
        this.ray2.setAttribute('y2', bottomScreenY);
        
        // Update shadow on screen
        const shadowTop = Math.min(topScreenY, bottomScreenY);
        const shadowBottom = Math.max(topScreenY, bottomScreenY);
        const shadowHeight = shadowBottom - shadowTop;
        
        this.shadow.setAttribute('x', screenX);
        this.shadow.setAttribute('y', shadowTop);
        this.shadow.setAttribute('width', 10);
        this.shadow.setAttribute('height', shadowHeight);
        
        // Update info display
        this.updateInfoDisplay(shadowHeight, objectX - lightX, screenX - objectX);
    }
    
    updateInfoDisplay(shadowHeight, objectDist, screenDist) {
        // Convert pixels to cm for display (approximate scale)
        const pixelToCm = 0.1;
        
        this.shadowHeight.textContent = `${(shadowHeight * pixelToCm).toFixed(1)} cm`;
        this.objectDistance.textContent = `${(objectDist * pixelToCm).toFixed(1)} cm`;
        this.screenDistance.textContent = `${(screenDist * pixelToCm).toFixed(1)} cm`;
    }
    
    startAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.playBtn.style.background = '#28a745';
        this.animate();
        this.logAction('▶️ Animation started', 'Light source oscillation began');
    }
    
    pauseAnimation() {
        this.isAnimating = false;
        this.playBtn.style.background = '#007bff';
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.logAction('⏸️ Animation paused', 'Light source oscillation paused');
    }
    
    animate() {
        if (!this.isAnimating) return;
        
        const minX = 50;
        const maxX = this.positions.object.x - 50;
        const range = maxX - minX;
        const speed = 0.02;
        
        // Oscillate light source position
        const time = Date.now() * speed;
        const newX = minX + (Math.sin(time) + 1) * range / 2;
        
        this.updatePosition('lightSource', newX);
        this.updateCalculations();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    resetLab() {
        // Stop animation
        this.pauseAnimation();
        
        // Reset positions
        this.positions = { ...this.defaultPositions };
        
        // Update DOM elements
        this.lightSource.setAttribute('cx', this.positions.lightSource.x);
        this.lightSource.setAttribute('cy', this.positions.lightSource.y);
        document.getElementById('lightLabel').setAttribute('x', this.positions.lightSource.x);
        
        this.cubeObject.setAttribute('x', this.positions.object.x - 30);
        this.cubeObject.setAttribute('y', this.positions.object.y - 30);
        this.sphereObject.setAttribute('cx', this.positions.object.x);
        this.sphereObject.setAttribute('cy', this.positions.object.y);
        document.getElementById('objectLabel').setAttribute('x', this.positions.object.x);
        
        this.screen.setAttribute('x', this.positions.screen.x);
        document.getElementById('screenLabel').setAttribute('x', this.positions.screen.x + 5);
        
        // Reset object selection
        this.objectSelect.value = 'cube';
        this.switchObject('cube');
        
        this.updateCalculations();
        this.logAction('🔄 Lab reset', 'All elements returned to default positions');
    }
    
    toggleAnalyticsPanel() {
        this.analyticsPanel.classList.toggle('show');
        const isShowing = this.analyticsPanel.classList.contains('show');
        this.toggleAnalytics.textContent = isShowing ? '📊 Hide Analytics' : '📊 Analytics';
        this.logAction('📊 Analytics toggled', `Analytics panel ${isShowing ? 'opened' : 'closed'}`);
    }
    
    logAction(icon, description) {
        const currentTime = Math.floor((Date.now() - this.startTime) / 1000);
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `
            <span class="log-time">t=${currentTime}s</span>
            <span class="log-action">${icon} ${description}</span>
        `;
        
        this.actionLog.appendChild(logEntry);
        this.actionLog.scrollTop = this.actionLog.scrollHeight;
    }
    
    clearActionLog() {
        this.actionLog.innerHTML = '';
        this.startTime = Date.now();
        this.logAction('🗑️ Log cleared', 'Action log reset');
    }
}

// Initialize the lab when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ShadowFormationLab();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Recalculate positions if needed
    const lab = window.shadowLab;
    if (lab) {
        lab.updateCalculations();
    }
});

// Export for global access if needed
window.ShadowFormationLab = ShadowFormationLab;