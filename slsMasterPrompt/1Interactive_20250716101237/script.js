// Physics simulation class for light and shadow demonstration
class LightShadowSimulation {
    constructor() {
        // Initialize canvas and context
        this.canvas = document.getElementById('simulationCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set up canvas dimensions
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Simulation state variables
        this.isPlaying = false;
        this.animationId = null;
        
        // Physics objects with initial positions
        this.lightSource = { x: 100, y: 200, radius: 15, isDragging: false };
        this.object = { x: 300, y: 200, size: 60, type: 'cube', isDragging: false };
        this.screen = { x: 500, y: 50, width: 20, height: 300, isDragging: false };
        
        // Initialize event listeners
        this.setupEventListeners();
        
        // Start the simulation
        this.reset();
        this.draw();
    }
    
    // Resize canvas to fit container while maintaining aspect ratio
    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }
    
    // Set up all interactive event listeners
    setupEventListeners() {
        // Control buttons
        document.getElementById('playBtn').addEventListener('click', () => this.play());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        
        // Object type selector
        document.getElementById('objectType').addEventListener('change', (e) => {
            this.object.type = e.target.value;
            this.draw();
        });
        
        // Mouse and touch events for dragging
        this.canvas.addEventListener('mousedown', (e) => this.handleStart(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMove(e));
        this.canvas.addEventListener('mouseup', () => this.handleEnd());
        
        // Touch events for mobile devices
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleStart(e.touches[0]);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleMove(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.handleEnd();
        });
    }
    
    // Get mouse/touch position relative to canvas
    getEventPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    
    // Handle start of drag operation
    handleStart(e) {
        const pos = this.getEventPos(e);
        
        // Check if clicking on light source
        if (this.isPointInCircle(pos, this.lightSource)) {
            this.lightSource.isDragging = true;
            this.canvas.style.cursor = 'grabbing';
        }
        // Check if clicking on object
        else if (this.isPointInObject(pos, this.object)) {
            this.object.isDragging = true;
            this.canvas.style.cursor = 'grabbing';
        }
        // Check if clicking on screen
        else if (this.isPointInScreen(pos, this.screen)) {
            this.screen.isDragging = true;
            this.canvas.style.cursor = 'grabbing';
        }
    }
    
    // Handle drag movement
    handleMove(e) {
        const pos = this.getEventPos(e);
        
        // Update positions based on what's being dragged (x-axis only)
        if (this.lightSource.isDragging) {
            this.lightSource.x = Math.max(50, Math.min(this.canvas.width - 50, pos.x));
            this.draw();
        } else if (this.object.isDragging) {
            this.object.x = Math.max(50, Math.min(this.canvas.width - 50, pos.x));
            this.draw();
        } else if (this.screen.isDragging) {
            this.screen.x = Math.max(50, Math.min(this.canvas.width - 50, pos.x));
            this.draw();
        }
    }
    
    // Handle end of drag operation
    handleEnd() {
        this.lightSource.isDragging = false;
        this.object.isDragging = false;
        this.screen.isDragging = false;
        this.canvas.style.cursor = 'grab';
    }
    
    // Collision detection functions
    isPointInCircle(point, circle) {
        const dx = point.x - circle.x;
        const dy = point.y - circle.y;
        return dx * dx + dy * dy <= circle.radius * circle.radius;
    }
    
    isPointInObject(point, obj) {
        if (obj.type === 'cube') {
            return point.x >= obj.x - obj.size/2 && point.x <= obj.x + obj.size/2 &&
                   point.y >= obj.y - obj.size/2 && point.y <= obj.y + obj.size/2;
        } else {
            return this.isPointInCircle(point, { x: obj.x, y: obj.y, radius: obj.size/2 });
        }
    }
    
    isPointInScreen(point, screen) {
        return point.x >= screen.x - screen.width/2 && point.x <= screen.x + screen.width/2 &&
               point.y >= screen.y && point.y <= screen.y + screen.height;
    }
    
    // Calculate tangent points for sphere (mathematical accuracy)
    calculateSphereTangents(lightPos, spherePos, radius) {
        const dx = spherePos.x - lightPos.x;
        const dy = spherePos.y - lightPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= radius) return null; // Light inside sphere
        
        const angle = Math.asin(radius / distance);
        const baseAngle = Math.atan2(dy, dx);
        
        const angle1 = baseAngle + angle;
        const angle2 = baseAngle - angle;
        
        return {
            top: {
                x: spherePos.x - radius * Math.sin(angle1),
                y: spherePos.y + radius * Math.cos(angle1)
            },
            bottom: {
                x: spherePos.x + radius * Math.sin(angle2),
                y: spherePos.y - radius * Math.cos(angle2)
            }
        };
    }
    
    // Calculate shadow intersection with screen
    calculateShadowIntersection(lightPos, objectPoint, screenX) {
        const dx = objectPoint.x - lightPos.x;
        const dy = objectPoint.y - lightPos.y;
        
        if (dx === 0) return null; // Vertical line
        
        const slope = dy / dx;
        const t = (screenX - lightPos.x) / dx;
        
        if (t <= 0) return null; // Behind light source
        
        return {
            x: screenX,
            y: lightPos.y + slope * (screenX - lightPos.x)
        };
    }
    
    // Main drawing function
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#f0f0f0');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw light source
        this.drawLightSource();
        
        // Draw object
        this.drawObject();
        
        // Draw screen
        this.drawScreen();
        
        // Draw light rays and shadow
        this.drawLightRaysAndShadow();
        
        // Draw labels
        this.drawLabels();
    }
    
    // Draw the point light source
    drawLightSource() {
        const light = this.lightSource;
        
        // Light source glow effect
        const glowGradient = this.ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.radius * 2);
        glowGradient.addColorStop(0, 'rgba(255, 255, 0, 0.8)');
        glowGradient.addColorStop(1, 'rgba(255, 255, 0, 0)');
        this.ctx.fillStyle = glowGradient;
        this.ctx.fillRect(light.x - light.radius * 2, light.y - light.radius * 2, 
                         light.radius * 4, light.radius * 4);
        
        // Light source body
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Light source border
        this.ctx.strokeStyle = '#FFA500';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    // Draw the opaque object (cube or sphere)
    drawObject() {
        const obj = this.object;
        
        if (obj.type === 'cube') {
            // Draw cube with 3D effect
            this.ctx.fillStyle = '#8B4513';
            this.ctx.fillRect(obj.x - obj.size/2, obj.y - obj.size/2, obj.size, obj.size);
            
            // Add 3D shading
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(obj.x - obj.size/2 + 5, obj.y - obj.size/2 + 5, obj.size, obj.size);
            
            // Redraw front face
            this.ctx.fillStyle = '#8B4513';
            this.ctx.fillRect(obj.x - obj.size/2, obj.y - obj.size/2, obj.size - 5, obj.size - 5);
            
            // Border
            this.ctx.strokeStyle = '#654321';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(obj.x - obj.size/2, obj.y - obj.size/2, obj.size - 5, obj.size - 5);
        } else {
            // Draw sphere with gradient for 3D effect
            const sphereGradient = this.ctx.createRadialGradient(
                obj.x - obj.size/6, obj.y - obj.size/6, 0,
                obj.x, obj.y, obj.size/2
            );
            sphereGradient.addColorStop(0, '#FF6B6B');
            sphereGradient.addColorStop(1, '#CC2E2E');
            
            this.ctx.fillStyle = sphereGradient;
            this.ctx.beginPath();
            this.ctx.arc(obj.x, obj.y, obj.size/2, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Border
            this.ctx.strokeStyle = '#AA1E1E';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }
    
    // Draw the projection screen
    drawScreen() {
        const screen = this.screen;
        
        // Screen surface
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(screen.x - screen.width/2, screen.y, screen.width, screen.height);
        
        // Screen border
        this.ctx.strokeStyle = '#CCCCCC';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(screen.x - screen.width/2, screen.y, screen.width, screen.height);
        
        // Screen stand
        this.ctx.fillStyle = '#666666';
        this.ctx.fillRect(screen.x - 5, screen.y + screen.height, 10, 20);
    }
    
    // Draw light rays and calculate shadow
    drawLightRaysAndShadow() {
        const light = this.lightSource;
        const obj = this.object;
        const screen = this.screen;
        
        let topPoint, bottomPoint;
        
        if (obj.type === 'cube') {
            // For cube, use top and bottom edges
            topPoint = { x: obj.x, y: obj.y - obj.size/2 };
            bottomPoint = { x: obj.x, y: obj.y + obj.size/2 };
        } else {
            // For sphere, calculate tangent points mathematically
            const tangents = this.calculateSphereTangents(light, obj, obj.size/2);
            if (!tangents) return; // Light inside sphere
            
            topPoint = tangents.top;
            bottomPoint = tangents.bottom;
        }
        
        // Draw light rays
        this.ctx.strokeStyle = '#FFFF00';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        // Top ray
        this.ctx.beginPath();
        this.ctx.moveTo(light.x, light.y);
        this.ctx.lineTo(topPoint.x, topPoint.y);
        this.ctx.stroke();
        
        // Bottom ray
        this.ctx.beginPath();
        this.ctx.moveTo(light.x, light.y);
        this.ctx.lineTo(bottomPoint.x, bottomPoint.y);
        this.ctx.stroke();
        
        // Calculate shadow on screen
        const topShadow = this.calculateShadowIntersection(light, topPoint, screen.x);
        const bottomShadow = this.calculateShadowIntersection(light, bottomPoint, screen.x);
        
        if (topShadow && bottomShadow) {
            // Extend rays to screen
            this.ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
            this.ctx.beginPath();
            this.ctx.moveTo(topPoint.x, topPoint.y);
            this.ctx.lineTo(topShadow.x, topShadow.y);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(bottomPoint.x, bottomPoint.y);
            this.ctx.lineTo(bottomShadow.x, bottomShadow.y);
            this.ctx.stroke();
            
            // Draw shadow on screen
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(
                screen.x - screen.width/2,
                Math.min(topShadow.y, bottomShadow.y),
                screen.width,
                Math.abs(bottomShadow.y - topShadow.y)
            );
        }
        
        this.ctx.setLineDash([]); // Reset line dash
    }
    
    // Draw informational labels
    drawLabels() {
        this.ctx.fillStyle = '#333333';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        
        // Light source label
        this.ctx.fillText('Light Source', this.lightSource.x, this.lightSource.y + 35);
        
        // Object label
        this.ctx.fillText(this.object.type === 'cube' ? 'Cube' : 'Sphere', 
                         this.object.x, this.object.y + 50);
        
        // Screen label
        this.ctx.fillText('Screen', this.screen.x, this.screen.y - 10);
        
        // Shadow label
        this.ctx.fillText('Shadow', this.screen.x, this.screen.y + this.screen.height + 40);
    }
    
    // Animation loop
    animate() {
        if (this.isPlaying) {
            // Add subtle animation effects here if needed
            this.draw();
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }
    
    // Control functions
    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            document.getElementById('playBtn').disabled = true;
            document.getElementById('pauseBtn').disabled = false;
            this.animate();
        }
    }
    
    pause() {
        this.isPlaying = false;
        document.getElementById('playBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    reset() {
        this.pause();
        
        // Reset positions to initial values
        this.lightSource.x = 100;
        this.lightSource.y = this.canvas.height / 2;
        
        this.object.x = this.canvas.width / 2;
        this.object.y = this.canvas.height / 2;
        
        this.screen.x = this.canvas.width - 100;
        this.screen.y = 50;
        this.screen.height = this.canvas.height - 100;
        
        // Reset object type to cube
        document.getElementById('objectType').value = 'cube';
        this.object.type = 'cube';
        
        this.draw();
    }
}

// Initialize simulation when page loads
document.addEventListener('DOMContentLoaded', () => {
    new LightShadowSimulation();
});