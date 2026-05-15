// Digital Sketching Simulator - Main JavaScript File
// Handles canvas drawing, tool selection, and interactive features

class SketchingSimulator {
    constructor() {
        // Initialize canvas and context
        this.canvas = document.getElementById('drawing-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size to match container
        this.resizeCanvas();
        
        // Drawing state variables
        this.isDrawing = false;
        this.currentTool = 'pencil';
        this.currentGrade = 'HB';
        this.currentStroke = 'construction';
        this.pressure = 0.5;
        this.strokeCount = 0;
        this.accuracy = 0;
        
        // Tool properties mapping
        this.toolProperties = {
            'pencil': {
                'HB': { opacity: 0.7, lineWidth: 1 },
                '2B': { opacity: 0.8, lineWidth: 1.5 },
                '4B': { opacity: 0.9, lineWidth: 2 },
                '6B': { opacity: 1.0, lineWidth: 2.5 }
            },
            'gel-pen': { opacity: 1.0, lineWidth: 1.5 },
            'tech-pen': { opacity: 1.0, lineWidth: 1 },
            'eraser': { opacity: 1.0, lineWidth: 10 },
            'smudge': { opacity: 0.3, lineWidth: 5 }
        };
        
        // Stroke patterns for different techniques
        this.strokePatterns = {
            'construction': { style: 'light', pattern: 'solid' },
            'contour': { style: 'bold', pattern: 'solid' },
            'hatching': { style: 'parallel', pattern: 'lines' },
            'cross-hatching': { style: 'crossed', pattern: 'lines' },
            'stippling': { style: 'dots', pattern: 'dots' },
            'tonal': { style: 'smooth', pattern: 'gradient' }
        };
        
        // Initialize event listeners
        this.initializeEventListeners();
        this.initializeTooltips();
        
        // Set initial drawing properties
        this.updateDrawingProperties();
        
        console.log('Sketching Simulator initialized successfully');
    }
    
    // Resize canvas to fit container while maintaining aspect ratio
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        // Set canvas size
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Set CSS size to match
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        console.log(`Canvas resized to ${rect.width}x${rect.height}`);
    }
    
    // Initialize all event listeners for user interaction
    initializeEventListeners() {
        // Tool selection events
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectTool(e));
        });
        
        // Stroke type selection events
        document.querySelectorAll('.stroke-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectStroke(e));
        });
        
        // Pressure slider event
        const pressureSlider = document.getElementById('pressure-slider');
        pressureSlider.addEventListener('input', (e) => this.updatePressure(e));
        
        // Canvas drawing events - mouse
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        
        // Canvas drawing events - touch
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrawing(e.touches[0]);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.draw(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.stopDrawing();
        });
        
        // Action button events
        document.getElementById('clear-btn').addEventListener('click', () => this.clearCanvas());
        document.getElementById('zoom-btn').addEventListener('click', () => this.toggleZoom());
        document.getElementById('compare-btn').addEventListener('click', () => this.toggleCompare());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHints());
        
        // Exercise button events
        document.querySelectorAll('.exercise-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.startExercise(e));
        });
        
        // Modal close event
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        
        // Window resize event
        window.addEventListener('resize', () => this.resizeCanvas());
        
        console.log('Event listeners initialized');
    }
    
    // Initialize tooltip system for user guidance
    initializeTooltips() {
        const tooltip = document.getElementById('tooltip');
        
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const text = e.target.getAttribute('data-tooltip');
                tooltip.textContent = text;
                tooltip.classList.add('show');
                this.positionTooltip(e, tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
            
            element.addEventListener('mousemove', (e) => {
                if (tooltip.classList.contains('show')) {
                    this.positionTooltip(e, tooltip);
                }
            });
        });
        
        console.log('Tooltips initialized');
    }
    
    // Position tooltip near cursor but within viewport
    positionTooltip(event, tooltip) {
        const x = event.clientX;
        const y = event.clientY;
        const tooltipRect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let left = x + 10;
        let top = y - tooltipRect.height - 10;
        
        // Adjust if tooltip goes off-screen
        if (left + tooltipRect.width > viewportWidth) {
            left = x - tooltipRect.width - 10;
        }
        if (top < 0) {
            top = y + 10;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }
    
    // Handle tool selection and update UI
    selectTool(event) {
        const button = event.target;
        const tool = button.getAttribute('data-tool');
        const grade = button.getAttribute('data-grade');
        
        // Update active state in UI
        document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update current tool properties
        this.currentTool = tool;
        if (grade) {
            this.currentGrade = grade;
        }
        
        this.updateDrawingProperties();
        console.log(`Tool selected: ${tool} ${grade || ''}`);
    }
    
    // Handle stroke type selection
    selectStroke(event) {
        const button = event.target;
        const stroke = button.getAttribute('data-stroke');
        
        // Update active state in UI
        document.querySelectorAll('.stroke-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        this.currentStroke = stroke;
        this.showStrokeGuide(stroke);
        this.updateDrawingProperties();
        console.log(`Stroke selected: ${stroke}`);
    }
    
    // Update pressure setting from slider
    updatePressure(event) {
        this.pressure = parseFloat(event.target.value);
        document.getElementById('pressure-value').textContent = Math.round(this.pressure * 100) + '%';
        this.updateDrawingProperties();
    }
    
    // Update canvas drawing properties based on current tool and settings
    updateDrawingProperties() {
        const tool = this.currentTool;
        let properties;
        
        if (tool === 'pencil') {
            properties = this.toolProperties.pencil[this.currentGrade];
        } else {
            properties = this.toolProperties[tool];
        }
        
        if (properties) {
            // Apply pressure sensitivity
            const pressureMultiplier = this.pressure;
            this.ctx.globalAlpha = properties.opacity * pressureMultiplier;
            this.ctx.lineWidth = properties.lineWidth * (0.5 + pressureMultiplier);
            
            // Set drawing mode based on tool
            if (tool === 'eraser') {
                this.ctx.globalCompositeOperation = 'destination-out';
            } else if (tool === 'smudge') {
                this.ctx.globalCompositeOperation = 'multiply';
            } else {
                this.ctx.globalCompositeOperation = 'source-over';
            }
            
            // Set stroke style based on current stroke type
            this.ctx.strokeStyle = this.getStrokeColor();
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
        }
    }
    
    // Get appropriate color for current stroke type
    getStrokeColor() {
        const strokeColors = {
            'construction': '#cccccc',
            'contour': '#333333',
            'hatching': '#666666',
            'cross-hatching': '#444444',
            'stippling': '#555555',
            'tonal': '#777777'
        };
        
        return strokeColors[this.currentStroke] || '#333333';
    }
    
    // Show visual guide for selected stroke type
    showStrokeGuide(strokeType) {
        const guide = document.getElementById('stroke-guide');
        guide.className = 'stroke-guide active';
        
        // Position guide based on stroke type
        const guideStyles = {
            'construction': { width: '200px', height: '1px', top: '50%', left: '20%' },
            'contour': { width: '150px', height: '150px', top: '25%', left: '30%', borderRadius: '50%' },
            'hatching': { width: '100px', height: '100px', top: '30%', left: '40%' },
            'cross-hatching': { width: '100px', height: '100px', top: '30%', left: '40%' },
            'stippling': { width: '80px', height: '80px', top: '35%', left: '45%', borderRadius: '50%' },
            'tonal': { width: '120px', height: '80px', top: '35%', left: '40%' }
        };
        
        const style = guideStyles[strokeType];
        if (style) {
            Object.assign(guide.style, style);
        }
        
        // Hide guide after 3 seconds
        setTimeout(() => {
            guide.classList.remove('active');
        }, 3000);
    }
    
    // Start drawing on canvas
    startDrawing(event) {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        const x = (event.clientX || event.pageX) - rect.left;
        const y = (event.clientY || event.pageY) - rect.top;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        
        // Handle special stroke types
        if (this.currentStroke === 'stippling') {
            this.drawStipple(x, y);
        }
    }
    
    // Continue drawing while mouse/touch is moving
    draw(event) {
        if (!this.isDrawing) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = (event.clientX || event.pageX) - rect.left;
        const y = (event.clientY || event.pageY) - rect.top;
        
        switch (this.currentStroke) {
            case 'stippling':
                this.drawStipple(x, y);
                break;
            case 'hatching':
                this.drawHatching(x, y);
                break;
            case 'cross-hatching':
                this.drawCrossHatching(x, y);
                break;
            default:
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
                break;
        }
        
        this.strokeCount++;
        this.updateProgress();
    }
    
    // Stop drawing
    stopDrawing() {
        if (this.isDrawing) {
            this.isDrawing = false;
            this.ctx.beginPath();
        }
    }
    
    // Draw stippling pattern (dots)
    drawStipple(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x + (Math.random() - 0.5) * 5, y + (Math.random() - 0.5) * 5, 
                    this.ctx.lineWidth * 0.5, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    // Draw hatching pattern (parallel lines)
    drawHatching(x, y) {
        const spacing = 5;
        const angle = Math.PI / 4; // 45 degrees
        
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        this.ctx.beginPath();
        this.ctx.moveTo(-10, 0);
        this.ctx.lineTo(10, 0);
        this.ctx.stroke();
        this.ctx.restore();
    }
    
    // Draw cross-hatching pattern (crossed lines)
    drawCrossHatching(x, y) {
        this.drawHatching(x, y);
        
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(-Math.PI / 4);
        this.ctx.beginPath();
        this.ctx.moveTo(-10, 0);
        this.ctx.lineTo(10, 0);
        this.ctx.stroke();
        this.ctx.restore();
    }
    
    // Clear the entire canvas
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.strokeCount = 0;
        this.updateProgress();
        console.log('Canvas cleared');
    }
    
    // Toggle zoom functionality
    toggleZoom() {
        const canvas = this.canvas;
        if (canvas.style.transform === 'scale(2)') {
            canvas.style.transform = 'scale(1)';
            canvas.style.transformOrigin = 'center';
        } else {
            canvas.style.transform = 'scale(2)';
            canvas.style.transformOrigin = 'center';
        }
        console.log('Zoom toggled');
    }
    
    // Toggle comparison view (split screen)
    toggleCompare() {
        const container = document.querySelector('.canvas-container');
        container.classList.toggle('compare-mode');
        
        if (container.classList.contains('compare-mode')) {
            // Create comparison canvas
            const compareCanvas = document.createElement('canvas');
            compareCanvas.id = 'compare-canvas';
            compareCanvas.width = this.canvas.width / 2;
            compareCanvas.height = this.canvas.height;
            compareCanvas.style.position = 'absolute';
            compareCanvas.style.right = '0';
            compareCanvas.style.top = '0';
            compareCanvas.style.border = '2px solid #3498db';
            container.appendChild(compareCanvas);
            
            // Adjust main canvas
            this.canvas.style.width = '50%';
        } else {
            // Remove comparison canvas
            const compareCanvas = document.getElementById('compare-canvas');
            if (compareCanvas) {
                compareCanvas.remove();
            }
            this.canvas.style.width = '100%';
        }
        console.log('Compare mode toggled');
    }
    
    // Show hints modal
    showHints() {
        const modal = document.getElementById('hint-modal');
        modal.style.display = 'block';
        console.log('Hints modal opened');
    }
    
    // Close modal
    closeModal() {
        const modal = document.getElementById('hint-modal');
        modal.style.display = 'none';
    }
    
    // Start guided exercise
    startExercise(event) {
        const button = event.target;
        const exercise = button.getAttribute('data-exercise');
        
        // Update active state
        document.querySelectorAll('.exercise-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Clear canvas and show exercise guide
        this.clearCanvas();
        this.showExerciseGuide(exercise);
        
        console.log(`Exercise started: ${exercise}`);
    }
    
    // Show guide for specific exercise
    showExerciseGuide(exercise) {
        const guide = document.getElementById('stroke-guide');
        guide.classList.add('active');
        
        const exercises = {
            'straight-lines': () => {
                // Show horizontal line guides
                guide.style.width = '300px';
                guide.style.height = '2px';
                guide.style.top = '30%';
                guide.style.left = '20%';
            },
            'curves': () => {
                // Show curve guide
                guide.style.width = '200px';
                guide.style.height = '100px';
                guide.style.borderRadius = '50%';
                guide.style.top = '25%';
                guide.style.left = '30%';
            },
            'shading': () => {
                // Show shading area
                guide.style.width = '150px';
                guide.style.height = '150px';
                guide.style.top = '25%';
                guide.style.left = '35%';
            },
            'texture': () => {
                // Show texture area
                guide.style.width = '120px';
                guide.style.height = '120px';
                guide.style.top = '30%';
                guide.style.left = '40%';
            }
        };
        
        if (exercises[exercise]) {
            exercises[exercise]();
        }
    }
    
    // Update progress statistics
    updateProgress() {
        document.getElementById('stroke-count').textContent = this.strokeCount;
        
        // Calculate accuracy based on stroke consistency (simplified)
        this.accuracy = Math.min(100, Math.round((this.strokeCount / 10) * 10));
        document.getElementById('accuracy').textContent = this.accuracy + '%';
    }
}

// Initialize the simulator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const simulator = new SketchingSimulator();
    console.log('Digital Sketching Simulator loaded successfully');
});

// Handle window click events for modal closing
window.addEventListener('click', (event) => {
    const modal = document.getElementById('hint-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});