// Speed-Time and Distance-Time Graph Explorer
// Interactive tool for exploring motion graphs relationships

class GraphExplorer {
    constructor() {
        // Canvas and context setup
        this.speedCanvas = document.getElementById('speedCanvas');
        this.distanceCanvas = document.getElementById('distanceCanvas');
        this.speedCtx = this.speedCanvas.getContext('2d');
        this.distanceCtx = this.distanceCanvas.getContext('2d');
        
        // Animation state variables
        this.isPlaying = false;
        this.currentTime = 0;
        this.maxTime = 10; // 10 seconds total
        this.animationSpeed = 0.05; // Time increment per frame
        this.stepMode = false;
        this.currentGraphType = 'constant';
        
        // Data storage for graphs
        this.speedData = [];
        this.distanceData = [];
        this.totalDistance = 0;
        
        // Animation frame reference
        this.animationFrame = null;
        
        // Initialize the application
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupCanvases();
        this.generateGraphData('constant');
        this.drawGraphs();
        this.updateDisplay();
    }
    
    setupEventListeners() {
        // Graph type buttons
        document.querySelectorAll('.graph-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectGraphType(e.target.id);
            });
        });
        
        // Animation control buttons
        document.getElementById('playPause').addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        document.getElementById('reset').addEventListener('click', () => {
            this.resetAnimation();
        });
        
        document.getElementById('stepMode').addEventListener('click', () => {
            this.toggleStepMode();
        });
        
        // Canvas hover for tooltips
        this.speedCanvas.addEventListener('mousemove', (e) => {
            this.showCanvasTooltip(e, 'speed');
        });
        
        this.distanceCanvas.addEventListener('mousemove', (e) => {
            this.showCanvasTooltip(e, 'distance');
        });
        
        // Hide tooltip when mouse leaves canvas
        [this.speedCanvas, this.distanceCanvas].forEach(canvas => {
            canvas.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }
    
    setupCanvases() {
        // Set up canvas dimensions and scaling for crisp rendering
        const setupCanvas = (canvas) => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
        };
        
        setupCanvas(this.speedCanvas);
        setupCanvas(this.distanceCanvas);
    }
    
    selectGraphType(type) {
        // Update active button
        document.querySelectorAll('.graph-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(type).classList.add('active');
        
        // Generate new graph data and reset animation
        this.currentGraphType = type;
        this.resetAnimation();
        this.generateGraphData(type);
        this.drawGraphs();
    }
    
    generateGraphData(type) {
        // Clear existing data
        this.speedData = [];
        this.distanceData = [];
        
        // Generate speed-time data based on graph type
        for (let t = 0; t <= this.maxTime; t += 0.1) {
            let speed = 0;
            
            switch (type) {
                case 'constant':
                    speed = 5; // 5 m/s constant
                    break;
                    
                case 'increasing':
                    speed = t * 0.8; // Linear increase
                    break;
                    
                case 'decreasing':
                    speed = Math.max(0, 8 - t * 0.8); // Linear decrease
                    break;
                    
                case 'piecewise':
                    // Complex piecewise function
                    if (t <= 3) {
                        speed = 3; // Constant for first 3 seconds
                    } else if (t <= 6) {
                        speed = 3 + (t - 3) * 1.5; // Increasing for next 3 seconds
                    } else {
                        speed = Math.max(0, 7.5 - (t - 6) * 1.2); // Decreasing
                    }
                    break;
            }
            
            this.speedData.push({ time: t, speed: speed });
        }
        
        // Calculate distance-time data (cumulative integration)
        let cumulativeDistance = 0;
        for (let i = 0; i < this.speedData.length; i++) {
            if (i > 0) {
                const dt = this.speedData[i].time - this.speedData[i-1].time;
                const avgSpeed = (this.speedData[i].speed + this.speedData[i-1].speed) / 2;
                cumulativeDistance += avgSpeed * dt;
            }
            this.distanceData.push({ 
                time: this.speedData[i].time, 
                distance: cumulativeDistance 
            });
        }
    }
    
    drawGraphs() {
        this.drawSpeedGraph();
        this.drawDistanceGraph();
    }
    
    drawSpeedGraph() {
        const ctx = this.speedCtx;
        const canvas = this.speedCanvas;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid and axes
        this.drawGrid(ctx, width, height);
        this.drawAxes(ctx, width, height, 'Speed (m/s)', 'Time (s)');
        
        // Find max speed for scaling
        const maxSpeed = Math.max(...this.speedData.map(d => d.speed));
        const scaleY = (height - 60) / (maxSpeed * 1.1);
        const scaleX = (width - 60) / this.maxTime;
        
        // Draw speed curve
        ctx.beginPath();
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        
        this.speedData.forEach((point, index) => {
            const x = 40 + point.time * scaleX;
            const y = height - 40 - point.speed * scaleY;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw current time indicator
        if (this.currentTime <= this.maxTime) {
            const currentX = 40 + this.currentTime * scaleX;
            const currentSpeed = this.getCurrentSpeed();
            const currentY = height - 40 - currentSpeed * scaleY;
            
            // Vertical line
            ctx.beginPath();
            ctx.strokeStyle = '#ff4757';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.moveTo(currentX, 20);
            ctx.lineTo(currentX, height - 20);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Current point
            ctx.beginPath();
            ctx.fillStyle = '#ff4757';
            ctx.arc(currentX, currentY, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        // Draw scale labels
        this.drawScaleLabels(ctx, width, height, maxSpeed, this.maxTime, 'speed');
    }
    
    drawDistanceGraph() {
        const ctx = this.distanceCtx;
        const canvas = this.distanceCanvas;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid and axes
        this.drawGrid(ctx, width, height);
        this.drawAxes(ctx, width, height, 'Distance (m)', 'Time (s)');
        
        // Find max distance for scaling
        const maxDistance = Math.max(...this.distanceData.map(d => d.distance));
        const scaleY = (height - 60) / (maxDistance * 1.1);
        const scaleX = (width - 60) / this.maxTime;
        
        // Draw distance curve up to current time
        ctx.beginPath();
        ctx.strokeStyle = '#2ed573';
        ctx.lineWidth = 3;
        
        const currentDataIndex = Math.floor(this.currentTime / 0.1);
        const relevantData = this.distanceData.slice(0, currentDataIndex + 1);
        
        relevantData.forEach((point, index) => {
            const x = 40 + point.time * scaleX;
            const y = height - 40 - point.distance * scaleY;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw full curve in lighter color
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(46, 213, 115, 0.3)';
        ctx.lineWidth = 2;
        
        this.distanceData.forEach((point, index) => {
            const x = 40 + point.time * scaleX;
            const y = height - 40 - point.distance * scaleY;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Draw current time indicator
        if (this.currentTime <= this.maxTime) {
            const currentX = 40 + this.currentTime * scaleX;
            const currentDistance = this.getCurrentDistance();
            const currentY = height - 40 - currentDistance * scaleY;
            
            // Vertical line
            ctx.beginPath();
            ctx.strokeStyle = '#ff4757';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.moveTo(currentX, 20);
            ctx.lineTo(currentX, height - 20);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Current point
            ctx.beginPath();
            ctx.fillStyle = '#ff4757';
            ctx.arc(currentX, currentY, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        // Draw scale labels
        this.drawScaleLabels(ctx, width, height, maxDistance, this.maxTime, 'distance');
    }
    
    drawGrid(ctx, width, height) {
        // Draw grid lines
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let x = 40; x < width - 20; x += (width - 60) / 10) {
            ctx.beginPath();
            ctx.moveTo(x, 20);
            ctx.lineTo(x, height - 40);
            ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let y = height - 40; y > 20; y -= (height - 60) / 8) {
            ctx.beginPath();
            ctx.moveTo(40, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();
        }
    }
    
    drawAxes(ctx, width, height, yLabel, xLabel) {
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(40, 20);
        ctx.lineTo(40, height - 40);
        ctx.stroke();
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(40, height - 40);
        ctx.lineTo(width - 20, height - 40);
        ctx.stroke();
        
        // Arrow heads
        ctx.fillStyle = '#333';
        
        // Y-axis arrow
        ctx.beginPath();
        ctx.moveTo(40, 20);
        ctx.lineTo(35, 30);
        ctx.lineTo(45, 30);
        ctx.closePath();
        ctx.fill();
        
        // X-axis arrow
        ctx.beginPath();
        ctx.moveTo(width - 20, height - 40);
        ctx.lineTo(width - 30, height - 45);
        ctx.lineTo(width - 30, height - 35);
        ctx.closePath();
        ctx.fill();
    }
    
    drawScaleLabels(ctx, width, height, maxValue, maxTime, type) {
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        
        // X-axis labels (time)
        for (let i = 0; i <= 5; i++) {
            const time = (maxTime / 5) * i;
            const x = 40 + (width - 60) * (i / 5);
            ctx.fillText(time.toFixed(1), x, height - 25);
        }
        
        // Y-axis labels
        ctx.textAlign = 'right';
        for (let i = 0; i <= 4; i++) {
            const value = (maxValue / 4) * i;
            const y = height - 40 - (height - 60) * (i / 4);
            ctx.fillText(value.toFixed(1), 35, y + 3);
        }
    }
    
    getCurrentSpeed() {
        // Interpolate current speed based on time
        const index = Math.floor(this.currentTime / 0.1);
        if (index >= this.speedData.length - 1) {
            return this.speedData[this.speedData.length - 1].speed;
        }
        
        const t1 = this.speedData[index].time;
        const t2 = this.speedData[index + 1].time;
        const s1 = this.speedData[index].speed;
        const s2 = this.speedData[index + 1].speed;
        
        const ratio = (this.currentTime - t1) / (t2 - t1);
        return s1 + (s2 - s1) * ratio;
    }
    
    getCurrentDistance() {
        // Interpolate current distance based on time
        const index = Math.floor(this.currentTime / 0.1);
        if (index >= this.distanceData.length - 1) {
            return this.distanceData[this.distanceData.length - 1].distance;
        }
        
        const t1 = this.distanceData[index].time;
        const t2 = this.distanceData[index + 1].time;
        const d1 = this.distanceData[index].distance;
        const d2 = this.distanceData[index + 1].distance;
        
        const ratio = (this.currentTime - t1) / (t2 - t1);
        return d1 + (d2 - d1) * ratio;
    }
    
    updateDisplay() {
        // Update information display
        document.getElementById('currentTime').textContent = this.currentTime.toFixed(1);
        document.getElementById('currentSpeed').textContent = this.getCurrentSpeed().toFixed(1);
        document.getElementById('totalDistance').textContent = this.getCurrentDistance().toFixed(1);
        
        // Update moving object position
        const objectTrack = document.querySelector('.object-track');
        const movingObject = document.getElementById('movingObject');
        const trackWidth = objectTrack.clientWidth - 30; // Account for object width
        const progress = Math.min(this.currentTime / this.maxTime, 1);
        movingObject.style.left = (progress * trackWidth) + 'px';
    }
    
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('playPause');
        
        if (this.isPlaying) {
            btn.textContent = '⏸️ Pause';
            this.animate();
        } else {
            btn.textContent = '▶️ Play';
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
        }
    }
    
    resetAnimation() {
        this.isPlaying = false;
        this.currentTime = 0;
        document.getElementById('playPause').textContent = '▶️ Play';
        
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        this.drawGraphs();
        this.updateDisplay();
    }
    
    toggleStepMode() {
        this.stepMode = !this.stepMode;
        const btn = document.getElementById('stepMode');
        
        if (this.stepMode) {
            btn.textContent = '📋 Step: ON';
            btn.style.background = 'linear-gradient(145deg, #2ed573, #26d466)';
            btn.style.color = 'white';
        } else {
            btn.textContent = '📋 Step Mode';
            btn.style.background = '';
            btn.style.color = '';
        }
    }
    
    animate() {
        if (!this.isPlaying) return;
        
        // Increment time
        this.currentTime += this.animationSpeed;
        
        // Check if animation is complete
        if (this.currentTime >= this.maxTime) {
            this.currentTime = this.maxTime;
            this.isPlaying = false;
            document.getElementById('playPause').textContent = '▶️ Play';
        }
        
        // Update display and graphs
        this.drawGraphs();
        this.updateDisplay();
        
        // Continue animation or pause for step mode
        if (this.isPlaying) {
            if (this.stepMode) {
                // In step mode, pause after each update
                this.isPlaying = false;
                document.getElementById('playPause').textContent = '▶️ Play';
            } else {
                this.animationFrame = requestAnimationFrame(() => this.animate());
            }
        }
    }
    
    showCanvasTooltip(event, graphType) {
        const canvas = event.target;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Calculate time and value based on mouse position
        const timeRatio = Math.max(0, Math.min(1, (x - 40) / (canvas.clientWidth - 60)));
        const time = timeRatio * this.maxTime;
        
        let tooltipText = '';
        
        if (graphType === 'speed') {
            const speed = this.getSpeedAtTime(time);
            tooltipText = `Time: ${time.toFixed(1)}s\nSpeed: ${speed.toFixed(1)}m/s\n\nArea under curve = Distance traveled`;
        } else {
            const distance = this.getDistanceAtTime(time);
            tooltipText = `Time: ${time.toFixed(1)}s\nDistance: ${distance.toFixed(1)}m\n\nSlope of curve = Speed`;
        }
        
        this.showTooltip(event.clientX, event.clientY, tooltipText);
    }
    
    getSpeedAtTime(time) {
        const index = Math.floor(time / 0.1);
        if (index >= this.speedData.length - 1) {
            return this.speedData[this.speedData.length - 1].speed;
        }
        
        const t1 = this.speedData[index].time;
        const t2 = this.speedData[index + 1].time;
        const s1 = this.speedData[index].speed;
        const s2 = this.speedData[index + 1].speed;
        
        const ratio = (time - t1) / (t2 - t1);
        return s1 + (s2 - s1) * ratio;
    }
    
    getDistanceAtTime(time) {
        const index = Math.floor(time / 0.1);
        if (index >= this.distanceData.length - 1) {
            return this.distanceData[this.distanceData.length - 1].distance;
        }
        
        const t1 = this.distanceData[index].time;
        const t2 = this.distanceData[index + 1].time;
        const d1 = this.distanceData[index].distance;
        const d2 = this.distanceData[index + 1].distance;
        
        const ratio = (time - t1) / (t2 - t1);
        return d1 + (d2 - d1) * ratio;
    }
    
    showTooltip(x, y, text) {
        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = text.replace(/\n/g, '<br>');
        tooltip.style.left = (x + 10) + 'px';
        tooltip.style.top = (y - 10) + 'px';
        tooltip.classList.add('show');
    }
    
    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('show');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GraphExplorer();
});

// Handle window resize for responsive canvas
window.addEventListener('resize', () => {
    // Reinitialize canvases on resize
    setTimeout(() => {
        if (window.graphExplorer) {
            window.graphExplorer.setupCanvases();
            window.graphExplorer.drawGraphs();
        }
    }, 100);
});

// Store reference for resize handling
window.addEventListener('load', () => {
    window.graphExplorer = new GraphExplorer();
});