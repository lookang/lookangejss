// Simulation state and configuration
class AngleSimulator {
    constructor() {
        // Canvas and context
        this.canvas = document.getElementById('simulationCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Simulation state
        this.observerX = 200;
        this.objectX = 600;
        this.groundY = 250;
        this.currentObject = 'building';
        this.viewMode = 'ground';
        
        // Object properties
        this.objects = {
            building: { height: 150, width: 60, color: '#8B4513' },
            tree: { height: 100, width: 40, color: '#228B22' },
            lighthouse: { height: 120, width: 30, color: '#FF6347' }
        };
        
        // Animation
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.resizeCanvas();
        this.updateSimulation();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    setupEventListeners() {
        // Object selection buttons
        document.querySelectorAll('[data-object]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveButton(e.target, '[data-object]');
                this.currentObject = e.target.dataset.object;
                this.updateSimulation();
                this.showFeedback(`Switched to ${this.currentObject}`);
            });
        });
        
        // View mode buttons
        document.querySelectorAll('[data-mode]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveButton(e.target, '[data-mode]');
                this.viewMode = e.target.dataset.mode;
                this.updateSimulation();
                this.showFeedback(`Switched to ${this.viewMode} view`);
            });
        });
        
        // Position controls
        const positionSlider = document.getElementById('positionSlider');
        positionSlider.addEventListener('input', (e) => {
            this.observerX = parseInt(e.target.value);
            this.updateSimulation();
        });
        
        // Move buttons
        document.getElementById('moveLeft').addEventListener('click', () => {
            this.observerX = Math.max(50, this.observerX - 20);
            positionSlider.value = this.observerX;
            this.updateSimulation();
        });
        
        document.getElementById('moveRight').addEventListener('click', () => {
            this.observerX = Math.min(750, this.observerX + 20);
            positionSlider.value = this.observerX;
            this.updateSimulation();
        });
        
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.reset();
        });
        
        // Help modal
        const helpBtn = document.getElementById('helpBtn');
        const helpModal = document.getElementById('helpModal');
        const closeModal = document.getElementById('closeModal');
        
        helpBtn.addEventListener('click', () => {
            helpModal.style.display = 'block';
        });
        
        closeModal.addEventListener('click', () => {
            helpModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === helpModal) {
                helpModal.style.display = 'none';
            }
        });
        
        // Canvas interaction
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
            
            if (x >= 50 && x <= 750) {
                this.observerX = x;
                positionSlider.value = this.observerX;
                this.updateSimulation();
            }
        });
    }
    
    setActiveButton(activeBtn, selector) {
        document.querySelectorAll(selector).forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        // Set canvas size to match container
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Adjust coordinate system
        this.groundY = this.canvas.height * 0.8;
        
        this.updateSimulation();
    }
    
    updateSimulation() {
        this.clearCanvas();
        this.drawEnvironment();
        this.drawObject();
        this.drawObserver();
        this.drawAngleLine();
        this.calculateAndDisplayAngle();
        this.updateUI();
    }
    
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawEnvironment() {
        const ctx = this.ctx;
        
        // Sky gradient
        const skyGradient = ctx.createLinearGradient(0, 0, 0, this.groundY);
        skyGradient.addColorStop(0, '#87CEEB');
        skyGradient.addColorStop(1, '#E0F6FF');
        
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, this.canvas.width, this.groundY);
        
        // Ground
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(0, this.groundY, this.canvas.width, this.canvas.height - this.groundY);
        
        // Ground line
        ctx.strokeStyle = '#228B22';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, this.groundY);
        ctx.lineTo(this.canvas.width, this.groundY);
        ctx.stroke();
        
        // Clouds (decorative)
        this.drawCloud(100, 50);
        this.drawCloud(300, 80);
        this.drawCloud(500, 60);
    }
    
    drawCloud(x, y) {
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        // Draw cloud circles
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.arc(x + 15, y, 20, 0, Math.PI * 2);
        ctx.arc(x + 35, y, 15, 0, Math.PI * 2);
        ctx.arc(x + 20, y - 10, 15, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawObject() {
        const obj = this.objects[this.currentObject];
        const ctx = this.ctx;
        
        let objectY, objectHeight;
        
        if (this.viewMode === 'ground') {
            objectY = this.groundY - obj.height;
            objectHeight = obj.height;
        } else {
            // Helicopter view - object appears smaller and lower
            objectY = this.groundY - obj.height * 0.3;
            objectHeight = obj.height * 0.3;
        }
        
        // Draw object based on type
        ctx.fillStyle = obj.color;
        
        switch (this.currentObject) {
            case 'building':
                this.drawBuilding(this.objectX - obj.width/2, objectY, obj.width, objectHeight);
                break;
            case 'tree':
                this.drawTree(this.objectX, objectY, obj.width, objectHeight);
                break;
            case 'lighthouse':
                this.drawLighthouse(this.objectX - obj.width/2, objectY, obj.width, objectHeight);
                break;
        }
    }
    
    drawBuilding(x, y, width, height) {
        const ctx = this.ctx;
        
        // Main building
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x, y, width, height);
        
        // Windows
        ctx.fillStyle = '#87CEEB';
        for (let row = 0; row < Math.floor(height / 20); row++) {
            for (let col = 0; col < Math.floor(width / 15); col++) {
                ctx.fillRect(x + col * 15 + 3, y + row * 20 + 5, 8, 12);
            }
        }
        
        // Roof
        ctx.fillStyle = '#654321';
        ctx.fillRect(x - 5, y - 10, width + 10, 10);
    }
    
    drawTree(x, y, width, height) {
        const ctx = this.ctx;
        
        // Trunk
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 5, y + height * 0.7, 10, height * 0.3);
        
        // Leaves (crown)
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.arc(x, y + height * 0.3, width/2, 0, Math.PI * 2);
        ctx.fill();
        
        // Additional leaf clusters
        ctx.beginPath();
        ctx.arc(x - width/4, y + height * 0.5, width/3, 0, Math.PI * 2);
        ctx.arc(x + width/4, y + height * 0.5, width/3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawLighthouse(x, y, width, height) {
        const ctx = this.ctx;
        
        // Main tower
        ctx.fillStyle = '#FF6347';
        ctx.fillRect(x, y, width, height);
        
        // Stripes
        ctx.fillStyle = 'white';
        for (let i = 0; i < height; i += 30) {
            ctx.fillRect(x, y + i, width, 15);
        }
        
        // Light house top
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(x - 5, y - 15, width + 10, 15);
        
        // Light beam (if applicable)
        if (this.viewMode === 'ground') {
            ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
            ctx.beginPath();
            ctx.moveTo(x + width/2, y);
            ctx.lineTo(x - 50, y - 50);
            ctx.lineTo(x + width + 50, y - 50);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    drawObserver() {
        const ctx = this.ctx;
        let observerY;
        
        if (this.viewMode === 'ground') {
            observerY = this.groundY;
            // Draw person on ground
            ctx.fillStyle = '#4169E1';
            ctx.fillRect(this.observerX - 5, observerY - 20, 10, 20);
            
            // Head
            ctx.beginPath();
            ctx.arc(this.observerX, observerY - 25, 5, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Draw helicopter
            observerY = this.groundY * 0.3;
            this.drawHelicopter(this.observerX, observerY);
        }
    }
    
    drawHelicopter(x, y) {
        const ctx = this.ctx;
        
        // Helicopter body
        ctx.fillStyle = '#FF4500';
        ctx.fillRect(x - 15, y - 5, 30, 10);
        
        // Cockpit
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(x - 10, y - 8, 20, 6);
        
        // Main rotor
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 25, y - 15);
        ctx.lineTo(x + 25, y - 15);
        ctx.stroke();
        
        // Tail rotor
        ctx.beginPath();
        ctx.moveTo(x + 15, y - 10);
        ctx.lineTo(x + 15, y + 5);
        ctx.stroke();
    }
    
    drawAngleLine() {
        const ctx = this.ctx;
        const obj = this.objects[this.currentObject];
        
        let observerY, targetY;
        
        if (this.viewMode === 'ground') {
            observerY = this.groundY - 25; // Eye level
            targetY = this.groundY - obj.height; // Top of object
        } else {
            observerY = this.groundY * 0.3; // Helicopter position
            targetY = this.groundY - obj.height * 0.3; // Top of scaled object
        }
        
        // Draw sight line
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(this.observerX, observerY);
        ctx.lineTo(this.objectX, targetY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw horizontal reference line
        ctx.strokeStyle = '#0000FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.observerX, observerY);
        ctx.lineTo(this.observerX + Math.abs(this.objectX - this.observerX), observerY);
        ctx.stroke();
        
        // Draw angle arc
        this.drawAngleArc(this.observerX, observerY, targetY);
    }
    
    drawAngleArc(centerX, centerY, targetY) {
        const ctx = this.ctx;
        const radius = 40;
        
        // Calculate angle
        const deltaX = this.objectX - centerX;
        const deltaY = targetY - centerY;
        const angle = Math.atan2(-deltaY, Math.abs(deltaX));
        
        // Draw arc
        ctx.strokeStyle = '#FF6600';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        if (this.viewMode === 'ground') {
            // Elevation angle (upward)
            ctx.arc(centerX, centerY, radius, 0, -angle, true);
        } else {
            // Depression angle (downward)
            ctx.arc(centerX, centerY, radius, 0, angle, false);
        }
        
        ctx.stroke();
        
        // Draw angle label
        const labelX = centerX + radius * Math.cos(angle/2) * (deltaX > 0 ? 1 : -1);
        const labelY = centerY - radius * Math.sin(angle/2) * (this.viewMode === 'ground' ? 1 : -1);
        
        ctx.fillStyle = '#FF6600';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('θ', labelX, labelY);
    }
    
    calculateAndDisplayAngle() {
        const obj = this.objects[this.currentObject];
        
        let observerY, targetY;
        
        if (this.viewMode === 'ground') {
            observerY = this.groundY - 25;
            targetY = this.groundY - obj.height;
        } else {
            observerY = this.groundY * 0.3;
            targetY = this.groundY - obj.height * 0.3;
        }
        
        const deltaX = Math.abs(this.objectX - this.observerX);
        const deltaY = Math.abs(targetY - observerY);
        
        const angleRad = Math.atan(deltaY / deltaX);
        const angleDeg = Math.round(angleRad * 180 / Math.PI);
        
        // Update angle display
        document.getElementById('angleValue').textContent = `${angleDeg}°`;
        document.getElementById('angleType').textContent = this.viewMode === 'ground' ? 'Elevation' : 'Depression';
        
        // Update angle info overlay
        document.getElementById('currentAngle').textContent = `${angleDeg}°`;
        document.getElementById('currentType').textContent = this.viewMode === 'ground' ? 'Elevation' : 'Depression';
    }
    
    updateUI() {
        const distance = Math.abs(this.objectX - this.observerX);
        const obj = this.objects[this.currentObject];
        
        // Update distance display
        document.getElementById('distanceValue').textContent = distance;
        document.getElementById('currentDistance').textContent = `${distance}m`;
        
        // Update object height
        const displayHeight = this.viewMode === 'ground' ? obj.height : Math.round(obj.height * 0.3);
        document.getElementById('objectHeight').textContent = `${displayHeight}m`;
    }
    
    showFeedback(message) {
        const overlay = document.getElementById('feedbackOverlay');
        overlay.textContent = message;
        overlay.style.display = 'block';
        
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1500);
    }
    
    reset() {
        this.observerX = 200;
        this.currentObject = 'building';
        this.viewMode = 'ground';
        
        // Reset UI
        document.querySelector('[data-object="building"]').classList.add('active');
        document.querySelectorAll('[data-object]').forEach(btn => {
            if (btn.dataset.object !== 'building') {
                btn.classList.remove('active');
            }
        });
        
        document.querySelector('[data-mode="ground"]').classList.add('active');
        document.querySelectorAll('[data-mode]').forEach(btn => {
            if (btn.dataset.mode !== 'ground') {
                btn.classList.remove('active');
            }
        });
        
        document.getElementById('positionSlider').value = this.observerX;
        
        this.updateSimulation();
        this.showFeedback('Simulation reset to initial state');
    }
}

// Initialize the simulator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const simulator = new AngleSimulator();
    
    // Add some educational tips
    const tips = [
        "Move closer to the object to increase the angle of elevation!",
        "Notice how the angle changes as you move left and right!",
        "Try switching between different objects to see how height affects the angle!",
        "In helicopter view, you're measuring angles of depression!",
        "The angle is measured from the horizontal line to your line of sight!"
    ];
    
    let tipIndex = 0;
    setInterval(() => {
        if (document.getElementById('helpModal').style.display !== 'block') {
            simulator.showFeedback(tips[tipIndex]);
            tipIndex = (tipIndex + 1) % tips.length;
        }
    }, 10000); // Show tip every 10 seconds
});