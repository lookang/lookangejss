// Product Design Sketching Strokes Identification Simulation
// This interactive tool helps students identify different sketching strokes used in product design

class SketchingStrokesSimulation {
    constructor() {
        // Initialize stroke types with their characteristics
        this.strokeTypes = [
            {
                name: 'Construction Lines',
                description: 'Light, thin lines used to establish basic proportions and structure',
                characteristics: 'Light weight, often dashed or dotted, used for guidelines'
            },
            {
                name: 'Contour Lines',
                description: 'Define the outer edges and main forms of objects',
                characteristics: 'Varied line weight, darker for closer edges, lighter for distant ones'
            },
            {
                name: 'Hatching',
                description: 'Parallel lines used to create shadows and depth',
                characteristics: 'Parallel lines in one direction, spacing determines darkness'
            },
            {
                name: 'Cross-hatching',
                description: 'Intersecting lines creating deeper shadows and texture',
                characteristics: 'Lines crossing at angles, creates darker tonal values'
            },
            {
                name: 'Stippling',
                description: 'Dots or small marks creating texture and tonal variation',
                characteristics: 'Small dots or marks, density creates different tones'
            },
            {
                name: 'Tonal Shading',
                description: 'Smooth gradations showing form and volume',
                characteristics: 'Smooth blended areas, shows three-dimensional form'
            }
        ];

        // Sample product sketches with predefined stroke areas
        this.sketches = [
            {
                name: 'Water Bottle',
                description: 'Ergonomic water bottle design sketch',
                areas: [
                    { x: 50, y: 30, width: 80, height: 40, stroke: 'Construction Lines' },
                    { x: 60, y: 80, width: 60, height: 120, stroke: 'Contour Lines' },
                    { x: 130, y: 90, width: 30, height: 100, stroke: 'Tonal Shading' },
                    { x: 40, y: 210, width: 100, height: 20, stroke: 'Hatching' }
                ]
            },
            {
                name: 'Office Chair',
                description: 'Modern office chair concept sketch',
                areas: [
                    { x: 80, y: 20, width: 60, height: 80, stroke: 'Contour Lines' },
                    { x: 150, y: 30, width: 40, height: 60, stroke: 'Cross-hatching' },
                    { x: 70, y: 110, width: 80, height: 60, stroke: 'Tonal Shading' },
                    { x: 40, y: 180, width: 120, height: 80, stroke: 'Construction Lines' }
                ]
            },
            {
                name: 'Table Lamp',
                description: 'Adjustable desk lamp design',
                areas: [
                    { x: 60, y: 40, width: 80, height: 50, stroke: 'Contour Lines' },
                    { x: 90, y: 100, width: 20, height: 80, stroke: 'Construction Lines' },
                    { x: 110, y: 50, width: 30, height: 40, stroke: 'Stippling' },
                    { x: 50, y: 190, width: 100, height: 40, stroke: 'Hatching' }
                ]
            },
            {
                name: 'Smartphone',
                description: 'Sleek smartphone concept design',
                areas: [
                    { x: 80, y: 50, width: 60, height: 120, stroke: 'Contour Lines' },
                    { x: 150, y: 60, width: 20, height: 100, stroke: 'Tonal Shading' },
                    { x: 90, y: 180, width: 40, height: 20, stroke: 'Cross-hatching' },
                    { x: 60, y: 40, width: 100, height: 10, stroke: 'Construction Lines' }
                ]
            }
        ];

        // Current state
        this.currentSketch = null;
        this.selectedStrokeType = null;
        this.identificationResults = [];
        this.zoomLevel = 1;
        this.panOffset = { x: 0, y: 0 };
        this.isPanning = false;

        this.initializeInterface();
        this.bindEvents();
        this.drawInitialCanvas();
    }

    // Initialize the user interface components
    initializeInterface() {
        this.populateSketchThumbnails();
        this.populateStrokeTypes();
        this.setupCanvas();
        this.updateFeedback('Select a sketch and stroke type to begin identification');
    }

    // Populate the sketch gallery with thumbnails
    populateSketchThumbnails() {
        const thumbnailsContainer = document.getElementById('sketchThumbnails');
        
        this.sketches.forEach((sketch, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.textContent = sketch.name;
            thumbnail.dataset.sketchIndex = index;
            
            // Add tooltip for sketch description
            thumbnail.title = sketch.description;
            
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    // Populate stroke type buttons
    populateStrokeTypes() {
        const strokeTypesContainer = document.getElementById('strokeTypes');
        
        this.strokeTypes.forEach((strokeType, index) => {
            const button = document.createElement('button');
            button.className = 'stroke-btn';
            button.textContent = strokeType.name;
            button.dataset.strokeIndex = index;
            button.title = strokeType.description;
            
            strokeTypesContainer.appendChild(button);
        });
    }

    // Setup the main canvas for sketch display
    setupCanvas() {
        const canvas = document.getElementById('mainCanvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to match container
        const container = canvas.parentElement;
        canvas.width = container.clientWidth - 2; // Account for border
        canvas.height = container.clientHeight - 2;
        
        this.canvas = canvas;
        this.ctx = ctx;
    }

    // Draw initial canvas state
    drawInitialCanvas() {
        this.ctx.fillStyle = '#fafafa';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw placeholder text
        this.ctx.fillStyle = '#999';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Select a sketch to view', this.canvas.width / 2, this.canvas.height / 2);
    }

    // Bind all event listeners
    bindEvents() {
        // Sketch thumbnail selection
        document.getElementById('sketchThumbnails').addEventListener('click', (e) => {
            if (e.target.classList.contains('thumbnail')) {
                this.selectSketch(parseInt(e.target.dataset.sketchIndex));
            }
        });

        // Stroke type selection
        document.getElementById('strokeTypes').addEventListener('click', (e) => {
            if (e.target.classList.contains('stroke-btn')) {
                this.selectStrokeType(parseInt(e.target.dataset.strokeIndex));
            }
        });

        // Canvas interaction for identification
        this.canvas.addEventListener('click', (e) => {
            if (this.currentSketch && this.selectedStrokeType !== null) {
                this.handleCanvasClick(e);
            }
        });

        // Zoom controls
        document.getElementById('zoomInBtn').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoomOutBtn').addEventListener('click', () => this.zoomOut());
        document.getElementById('panBtn').addEventListener('click', () => this.togglePanMode());

        // Control buttons
        document.getElementById('resetBtn').addEventListener('click', () => this.resetSimulation());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHints());
        document.getElementById('clearResultsBtn').addEventListener('click', () => this.clearResults());
        document.getElementById('comparisonBtn').addEventListener('click', () => this.toggleComparison());

        // Confidence slider
        const confidenceSlider = document.getElementById('confidenceSlider');
        confidenceSlider.addEventListener('input', (e) => {
            document.getElementById('confidenceValue').textContent = e.target.value;
        });

        // Hint modal
        document.getElementById('closeHintBtn').addEventListener('click', () => this.hideHints());
        document.getElementById('hintModal').addEventListener('click', (e) => {
            if (e.target.id === 'hintModal') this.hideHints();
        });

        // Canvas panning
        this.canvas.addEventListener('mousedown', (e) => this.startPan(e));
        this.canvas.addEventListener('mousemove', (e) => this.updatePan(e));
        this.canvas.addEventListener('mouseup', () => this.endPan());
        this.canvas.addEventListener('mouseleave', () => this.endPan());

        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => this.handleTouch(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouch(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouch(e));

        // Tooltip functionality
        document.addEventListener('mouseover', (e) => this.showTooltip(e));
        document.addEventListener('mouseout', () => this.hideTooltip());
    }

    // Select a sketch from the gallery
    selectSketch(index) {
        // Update UI
        document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
        document.querySelector(`[data-sketch-index="${index}"]`).classList.add('active');
        
        this.currentSketch = this.sketches[index];
        document.getElementById('sketchTitle').textContent = this.currentSketch.name;
        
        this.drawSketch();
        this.createInteractionAreas();
        this.updateFeedback(`Selected: ${this.currentSketch.name}. Choose a stroke type and click on areas to identify.`);
    }

    // Select a stroke type for identification
    selectStrokeType(index) {
        // Update UI
        document.querySelectorAll('.stroke-btn').forEach(btn => btn.classList.remove('selected'));
        document.querySelector(`[data-stroke-index="${index}"]`).classList.add('selected');
        
        this.selectedStrokeType = index;
        const strokeType = this.strokeTypes[index];
        document.getElementById('selectedStroke').innerHTML = `
            <strong>${strokeType.name}</strong><br>
            <small>${strokeType.description}</small>
        `;
        
        this.updateFeedback(`Selected stroke type: ${strokeType.name}. Click on sketch areas to identify this stroke type.`);
    }

    // Draw the selected sketch on canvas
    drawSketch() {
        if (!this.currentSketch) return;
        
        // Clear canvas
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw sketch representation (simplified for demo)
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;
        
        // Draw basic sketch outline based on sketch type
        this.drawSketchContent();
        
        // Draw stroke areas as visual guides
        this.drawStrokeAreas();
    }

    // Draw sketch content based on the selected sketch
    drawSketchContent() {
        const sketch = this.currentSketch;
        this.ctx.save();
        
        // Apply zoom and pan transformations
        this.ctx.scale(this.zoomLevel, this.zoomLevel);
        this.ctx.translate(this.panOffset.x, this.panOffset.y);
        
        switch (sketch.name) {
            case 'Water Bottle':
                this.drawWaterBottle();
                break;
            case 'Office Chair':
                this.drawOfficeChair();
                break;
            case 'Table Lamp':
                this.drawTableLamp();
                break;
            case 'Smartphone':
                this.drawSmartphone();
                break;
        }
        
        this.ctx.restore();
    }

    // Draw water bottle sketch
    drawWaterBottle() {
        const ctx = this.ctx;
        
        // Construction lines (light)
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 0.5;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(50, 30, 80, 40);
        ctx.setLineDash([]);
        
        // Main contour
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(60, 80);
        ctx.lineTo(60, 200);
        ctx.lineTo(120, 200);
        ctx.lineTo(120, 80);
        ctx.closePath();
        ctx.stroke();
        
        // Cap
        ctx.strokeRect(70, 60, 40, 20);
        
        // Tonal shading
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(130, 90, 30, 100);
        
        // Hatching for shadow
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(40 + i * 5, 210);
            ctx.lineTo(40 + i * 5, 230);
            ctx.stroke();
        }
    }

    // Draw office chair sketch
    drawOfficeChair() {
        const ctx = this.ctx;
        
        // Backrest contour
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(80, 20, 60, 80);
        
        // Cross-hatching for depth
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.moveTo(150 + i * 5, 30);
            ctx.lineTo(150 + i * 5, 90);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(150, 30 + i * 7);
            ctx.lineTo(190, 30 + i * 7);
            ctx.stroke();
        }
        
        // Seat with tonal shading
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(70, 110, 80, 60);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(70, 110, 80, 60);
        
        // Base construction lines
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.strokeRect(40, 180, 120, 80);
        ctx.setLineDash([]);
    }

    // Draw table lamp sketch
    drawTableLamp() {
        const ctx = this.ctx;
        
        // Lampshade contour
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(100, 65, 40, 25, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Arm construction line
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(100, 180);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Stippling texture on shade
        ctx.fillStyle = '#666';
        for (let i = 0; i < 50; i++) {
            const x = 110 + Math.random() * 30;
            const y = 50 + Math.random() * 40;
            ctx.beginPath();
            ctx.arc(x, y, 0.5, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        // Base with hatching
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 190, 100, 40);
        
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        for (let i = 0; i < 15; i++) {
            ctx.beginPath();
            ctx.moveTo(55 + i * 6, 195);
            ctx.lineTo(55 + i * 6, 225);
            ctx.stroke();
        }
    }

    // Draw smartphone sketch
    drawSmartphone() {
        const ctx = this.ctx;
        
        // Construction guidelines
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 3]);
        ctx.strokeRect(60, 40, 100, 10);
        ctx.setLineDash([]);
        
        // Main contour
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(80, 50, 60, 120);
        
        // Screen area
        ctx.strokeRect(85, 60, 50, 90);
        
        // Tonal shading on side
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(150, 60, 20, 100);
        
        // Cross-hatching for button area
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.moveTo(90 + i * 5, 180);
            ctx.lineTo(90 + i * 5, 200);
            ctx.stroke();
        }
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(90, 180 + i * 5);
            ctx.lineTo(130, 180 + i * 5);
            ctx.stroke();
        }
    }

    // Draw stroke areas as subtle guides
    drawStrokeAreas() {
        if (!this.currentSketch) return;
        
        this.ctx.save();
        this.ctx.scale(this.zoomLevel, this.zoomLevel);
        this.ctx.translate(this.panOffset.x, this.panOffset.y);
        
        // Draw very subtle area indicators
        this.ctx.strokeStyle = 'rgba(0, 123, 255, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([2, 2]);
        
        this.currentSketch.areas.forEach(area => {
            this.ctx.strokeRect(area.x, area.y, area.width, area.height);
        });
        
        this.ctx.setLineDash([]);
        this.ctx.restore();
    }

    // Create interactive areas for identification
    createInteractionAreas() {
        const overlay = document.getElementById('interactionOverlay');
        overlay.innerHTML = ''; // Clear existing areas
        
        if (!this.currentSketch) return;
        
        this.currentSketch.areas.forEach((area, index) => {
            const areaElement = document.createElement('div');
            areaElement.className = 'highlight-area';
            areaElement.style.left = `${(area.x * this.zoomLevel) + this.panOffset.x}px`;
            areaElement.style.top = `${(area.y * this.zoomLevel) + this.panOffset.y}px`;
            areaElement.style.width = `${area.width * this.zoomLevel}px`;
            areaElement.style.height = `${area.height * this.zoomLevel}px`;
            areaElement.dataset.areaIndex = index;
            areaElement.title = `Click to identify stroke type in this area`;
            
            areaElement.addEventListener('click', (e) => {
                e.stopPropagation();
                this.identifyStroke(index);
            });
            
            overlay.appendChild(areaElement);
        });
    }

    // Handle canvas click for stroke identification
    handleCanvasClick(e) {
        if (!this.currentSketch || this.selectedStrokeType === null) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / this.zoomLevel - this.panOffset.x;
        const y = (e.clientY - rect.top) / this.zoomLevel - this.panOffset.y;
        
        // Find which area was clicked
        const clickedAreaIndex = this.currentSketch.areas.findIndex(area => 
            x >= area.x && x <= area.x + area.width &&
            y >= area.y && y <= area.y + area.height
        );
        
        if (clickedAreaIndex !== -1) {
            this.identifyStroke(clickedAreaIndex);
        }
    }

    // Process stroke identification
    identifyStroke(areaIndex) {
        const area = this.currentSketch.areas[areaIndex];
        const selectedStroke = this.strokeTypes[this.selectedStrokeType];
        const confidence = document.getElementById('confidenceSlider').value;
        
        // Check if identification is correct
        const isCorrect = area.stroke === selectedStroke.name;
        
        // Create result entry
        const result = {
            area: `Area ${areaIndex + 1}`,
            identifiedStroke: selectedStroke.name,
            actualStroke: area.stroke,
            confidence: confidence,
            isCorrect: isCorrect,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.identificationResults.push(result);
        this.updateResultsTable();
        
        // Provide feedback
        if (isCorrect) {
            this.updateFeedback(`✅ Correct! This area uses ${selectedStroke.name}. ${selectedStroke.description}`, 'success');
        } else {
            this.updateFeedback(`❌ Incorrect. This area actually uses ${area.stroke}. Try again with a different stroke type.`, 'error');
        }
        
        // Highlight the identified area temporarily
        this.highlightArea(areaIndex, isCorrect);
    }

    // Update the results table
    updateResultsTable() {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        
        this.identificationResults.forEach(result => {
            const row = document.createElement('div');
            row.className = 'table-row';
            row.innerHTML = `
                <span>${result.area}</span>
                <span>${result.identifiedStroke}</span>
                <span>${result.confidence}/5</span>
                <span>${result.isCorrect ? '✅' : '❌'}</span>
            `;
            tableBody.appendChild(row);
        });
    }

    // Highlight an area temporarily
    highlightArea(areaIndex, isCorrect) {
        const areas = document.querySelectorAll('.highlight-area');
        const area = areas[areaIndex];
        
        if (area) {
            area.style.borderColor = isCorrect ? '#28a745' : '#dc3545';
            area.style.backgroundColor = isCorrect ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)';
            
            setTimeout(() => {
                area.style.borderColor = '#007bff';
                area.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
            }, 2000);
        }
    }

    // Zoom functionality
    zoomIn() {
        this.zoomLevel = Math.min(this.zoomLevel * 1.2, 3);
        this.drawSketch();
        this.createInteractionAreas();
        document.getElementById('zoomInBtn').classList.add('active');
        setTimeout(() => document.getElementById('zoomInBtn').classList.remove('active'), 200);
    }

    zoomOut() {
        this.zoomLevel = Math.max(this.zoomLevel / 1.2, 0.5);
        this.drawSketch();
        this.createInteractionAreas();
        document.getElementById('zoomOutBtn').classList.add('active');
        setTimeout(() => document.getElementById('zoomOutBtn').classList.remove('active'), 200);
    }

    // Pan functionality
    togglePanMode() {
        this.isPanning = !this.isPanning;
        const panBtn = document.getElementById('panBtn');
        panBtn.classList.toggle('active', this.isPanning);
        this.canvas.style.cursor = this.isPanning ? 'move' : 'crosshair';
    }

    startPan(e) {
        if (!this.isPanning) return;
        this.lastPanPoint = { x: e.clientX, y: e.clientY };
    }

    updatePan(e) {
        if (!this.isPanning || !this.lastPanPoint) return;
        
        const deltaX = (e.clientX - this.lastPanPoint.x) / this.zoomLevel;
        const deltaY = (e.clientY - this.lastPanPoint.y) / this.zoomLevel;
        
        this.panOffset.x += deltaX;
        this.panOffset.y += deltaY;
        
        this.lastPanPoint = { x: e.clientX, y: e.clientY };
        this.drawSketch();
        this.createInteractionAreas();
    }

    endPan() {
        this.lastPanPoint = null;
    }

    // Touch event handling for mobile
    handleTouch(e) {
        e.preventDefault();
        
        if (e.type === 'touchstart' && e.touches.length === 1) {
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('click', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.handleCanvasClick(mouseEvent);
        }
    }

    // Show hints modal
    showHints() {
        const hintBody = document.getElementById('hintBody');
        hintBody.innerHTML = '';
        
        this.strokeTypes.forEach(strokeType => {
            const hintItem = document.createElement('div');
            hintItem.className = 'hint-item';
            hintItem.innerHTML = `
                <h4>${strokeType.name}</h4>
                <p><strong>Description:</strong> ${strokeType.description}</p>
                <p><strong>Characteristics:</strong> ${strokeType.characteristics}</p>
            `;
            hintBody.appendChild(hintItem);
        });
        
        document.getElementById('hintModal').classList.add('show');
    }

    hideHints() {
        document.getElementById('hintModal').classList.remove('show');
    }

    // Tooltip functionality
    showTooltip(e) {
        if (e.target.title) {
            const tooltip = document.getElementById('tooltip');
            const tooltipContent = document.getElementById('tooltipContent');
            
            tooltipContent.textContent = e.target.title;
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY - 30}px`;
            tooltip.classList.add('show');
            
            // Prevent default browser tooltip
            e.target.setAttribute('data-title', e.target.title);
            e.target.removeAttribute('title');
        }
    }

    hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('show');
        
        // Restore title attributes
        document.querySelectorAll('[data-title]').forEach(element => {
            element.title = element.getAttribute('data-title');
            element.removeAttribute('data-title');
        });
    }

    // Update feedback display
    updateFeedback(message, type = '') {
        const feedbackContent = document.getElementById('feedbackContent');
        feedbackContent.textContent = message;
        feedbackContent.className = `feedback-content ${type}`;
    }

    // Toggle comparison view
    toggleComparison() {
        // This would implement side-by-side comparison of sketches
        this.updateFeedback('Comparison view feature - would show two sketches side by side for comparison');
    }

    // Clear all results
    clearResults() {
        this.identificationResults = [];
        this.updateResultsTable();
        this.updateFeedback('Results cleared. Continue identifying stroke types.');
    }

    // Reset the entire simulation
    resetSimulation() {
        // Clear selections
        document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
        document.querySelectorAll('.stroke-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Reset state
        this.currentSketch = null;
        this.selectedStrokeType = null;
        this.identificationResults = [];
        this.zoomLevel = 1;
        this.panOffset = { x: 0, y: 0 };
        this.isPanning = false;
        
        // Reset UI
        document.getElementById('sketchTitle').textContent = 'Select a sketch to begin';
        document.getElementById('selectedStroke').innerHTML = '<span>Select a stroke type</span>';
        document.getElementById('confidenceSlider').value = 3;
        document.getElementById('confidenceValue').textContent = '3';
        document.getElementById('interactionOverlay').innerHTML = '';
        
        this.updateResultsTable();
        this.drawInitialCanvas();
        this.updateFeedback('Simulation reset. Select a sketch and stroke type to begin.');
    }
}

// Initialize the simulation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SketchingStrokesSimulation();
});

// Handle window resize for responsive canvas
window.addEventListener('resize', () => {
    setTimeout(() => {
        const canvas = document.getElementById('mainCanvas');
        const container = canvas.parentElement;
        canvas.width = container.clientWidth - 2;
        canvas.height = container.clientHeight - 2;
        
        // Redraw current content
        if (window.simulation && window.simulation.currentSketch) {
            window.simulation.drawSketch();
            window.simulation.createInteractionAreas();
        } else if (window.simulation) {
            window.simulation.drawInitialCanvas();
        }
    }, 100);
});