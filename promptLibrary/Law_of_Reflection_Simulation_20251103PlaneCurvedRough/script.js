// Law of Reflection Simulation - Interactive Physics Learning Tool
// Designed for Secondary 1-2 students following Singapore curriculum
// MODIFIED: Fixed normal calculation to be perpendicular to surface at all points
// UPDATED: Fixed ray positioning to ensure rays are always above the surface for curved and rough mirrors

class ReflectionSimulation {
    constructor() {
        // Canvas and context setup
        this.canvas = document.getElementById('reflectionCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Simulation parameters
        this.incidentAngle = 30; // degrees
        this.surfaceType = 'plane';
        this.showGrid = false;
        this.showNormal = true;
        
        // Canvas dimensions and center point
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.surfaceY = this.centerY + 50;
        
        // ENHANCED: Draggable intersection point properties with improved interaction
        this.intersectionPoint = {
            x: this.centerX,
            y: this.surfaceY,
            radius: 10, // Increased size for better touch interaction
            isDragging: false,
            isHovered: false,
            dragOffset: { x: 0, y: 0 } // Track drag offset for smoother dragging
        };
        
        // Analytics tracking
        this.analytics = {
            interactions: 0,
            angleChanges: 0,
            surfaceChanges: 0,
            startTime: Date.now(),
            lastAngle: 30
        };
        
        // Initialize the simulation
        this.initializeEventListeners();
        this.startAnalyticsTimer();
        this.draw();
        this.setupTooltips();
    }
    
    // Set up all event listeners for user interactions
    initializeEventListeners() {
        // Angle slider control
        const angleSlider = document.getElementById('incidentAngle');
        angleSlider.addEventListener('input', (e) => {
            this.incidentAngle = parseInt(e.target.value);
            this.updateAngleDisplay();
            this.trackAngleChange();
            this.draw();
        });
        
        // Surface type dropdown
        const surfaceSelect = document.getElementById('surfaceType');
        surfaceSelect.addEventListener('change', (e) => {
            this.surfaceType = e.target.value;
            this.trackSurfaceChange();
            // Reset intersection point to center when surface type changes
            this.resetIntersectionPoint();
            this.draw();
        });
        
        // Control buttons
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetSimulation();
        });
        
        document.getElementById('toggleGrid').addEventListener('click', () => {
            this.showGrid = !this.showGrid;
            this.trackInteraction();
            this.draw();
        });
        
        document.getElementById('showNormal').addEventListener('click', (e) => {
            this.showNormal = !this.showNormal;
            e.target.classList.toggle('active');
            this.trackInteraction();
            this.draw();
        });
        
        // ENHANCED: Setup canvas interaction for draggable point with improved responsiveness
        this.setupCanvasInteraction();
    }
    
    // ENHANCED: Setup canvas interaction for draggable intersection point with better touch support
    setupCanvasInteraction() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => {
            this.handlePointerDown(this.getCanvasCoordinates(e));
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.handlePointerMove(this.getCanvasCoordinates(e));
        });
        
        this.canvas.addEventListener('mouseup', (e) => {
            this.handlePointerUp();
        });
        
        // Prevent context menu on right click
        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        
        // Touch events for mobile support with improved handling
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.handlePointerDown(this.getCanvasCoordinates(touch));
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.handlePointerMove(this.getCanvasCoordinates(touch));
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.handlePointerUp();
        });
        
        // Handle mouse leave to stop dragging
        this.canvas.addEventListener('mouseleave', () => {
            this.handlePointerUp();
        });
    }
    
    // ENHANCED: Get accurate canvas coordinates accounting for scaling and positioning
    getCanvasCoordinates(event) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        return {
            x: ((event.clientX || event.pageX) - rect.left) * scaleX,
            y: ((event.clientY || event.pageY) - rect.top) * scaleY
        };
    }
    
    // ENHANCED: Handle pointer down events with improved hit detection
    handlePointerDown(coords) {
        const distance = Math.sqrt(
            Math.pow(coords.x - this.intersectionPoint.x, 2) + 
            Math.pow(coords.y - this.intersectionPoint.y, 2)
        );
        
        // Check if click/touch is on the intersection point with larger hit area for touch devices
        const hitRadius = this.intersectionPoint.radius + 5; // Larger hit area
        if (distance <= hitRadius) {
            this.intersectionPoint.isDragging = true;
            // Calculate drag offset for smoother dragging
            this.intersectionPoint.dragOffset = {
                x: coords.x - this.intersectionPoint.x,
                y: coords.y - this.intersectionPoint.y
            };
            this.updateCanvasCursor('dragging');
            this.trackInteraction();
        }
    }
    
    // ENHANCED: Handle pointer move events with improved dragging and hover detection
    handlePointerMove(coords) {
        if (this.intersectionPoint.isDragging) {
            // Update intersection point position with drag offset for smoother movement
            const newX = coords.x - this.intersectionPoint.dragOffset.x;
            const newY = coords.y - this.intersectionPoint.dragOffset.y;
            this.updateIntersectionPoint(newX, newY);
            this.draw();
        } else {
            // Check hover state for visual feedback
            const distance = Math.sqrt(
                Math.pow(coords.x - this.intersectionPoint.x, 2) + 
                Math.pow(coords.y - this.intersectionPoint.y, 2)
            );
            
            const wasHovered = this.intersectionPoint.isHovered;
            this.intersectionPoint.isHovered = distance <= (this.intersectionPoint.radius + 5);
            
            // Update cursor and redraw if hover state changed
            if (wasHovered !== this.intersectionPoint.isHovered) {
                this.updateCanvasCursor(this.intersectionPoint.isHovered ? 'hovering' : 'default');
                this.draw();
            }
        }
    }
    
    // ENHANCED: Handle pointer up events
    handlePointerUp() {
        if (this.intersectionPoint.isDragging) {
            this.intersectionPoint.isDragging = false;
            this.intersectionPoint.dragOffset = { x: 0, y: 0 };
            this.updateCanvasCursor(this.intersectionPoint.isHovered ? 'hovering' : 'default');
        }
    }
    
    // ENHANCED: Update canvas cursor with CSS classes for better visual feedback
    updateCanvasCursor(state) {
        this.canvas.classList.remove('dragging', 'hovering');
        
        switch (state) {
            case 'dragging':
                this.canvas.classList.add('dragging');
                break;
            case 'hovering':
                this.canvas.classList.add('hovering');
                break;
            default:
                // Default crosshair cursor
                break;
        }
    }
    
    // ENHANCED: Update intersection point position along the surface with improved surface following
    updateIntersectionPoint(mouseX, mouseY) {
        let newX = mouseX;
        let newY = this.surfaceY;
        
        // Constrain the point to the surface based on surface type with improved calculations
        switch (this.surfaceType) {
            case 'plane':
                // For plane mirror, constrain to horizontal line with better bounds
                newX = Math.max(60, Math.min(this.canvas.width - 60, mouseX));
                newY = this.surfaceY;
                break;
                
            case 'rough':
                // For rough surface, follow the rough line more accurately
                newX = Math.max(60, Math.min(this.canvas.width - 60, mouseX));
                const roughness = Math.sin(newX * 0.1) * 3 + Math.cos(newX * 0.05) * 1.5;
                newY = this.surfaceY + roughness;
                break;
                
            case 'curved':
                // For curved mirror, follow the curve more precisely
                newX = Math.max(60, Math.min(this.canvas.width - 60, mouseX));
                // Calculate curve position using improved quadratic curve formula
                const t = (newX - 50) / (this.canvas.width - 100);
                const curveHeight = -25 * (4 * t * (1 - t)); // Enhanced curve depth
                newY = this.surfaceY + 25 + curveHeight;
                break;
        }
        
        // Update intersection point position
        this.intersectionPoint.x = newX;
        this.intersectionPoint.y = newY;
        
        // Keep the current angle but update display
        this.updateAngleDisplay();
    }
    
    // Reset intersection point to center
    resetIntersectionPoint() {
        this.intersectionPoint.x = this.canvas.width / 2;
        this.intersectionPoint.y = this.surfaceY;
        this.intersectionPoint.isDragging = false;
        this.intersectionPoint.isHovered = false;
        this.updateCanvasCursor('default');
    }
    
    // Update angle display in UI
    updateAngleDisplay() {
        document.getElementById('angleValue').textContent = `${this.incidentAngle}°`;
        document.getElementById('incidentDisplay').textContent = `${this.incidentAngle}°`;
        document.getElementById('reflectedDisplay').textContent = `${this.incidentAngle}°`;
        
        // Update law verification
        const lawCheck = document.getElementById('lawCheck');
        lawCheck.textContent = `θᵢ = θᵣ = ${this.incidentAngle}° ✓`;
        lawCheck.style.color = '#2e7d32';
    }
    
    // Update slider position to match current angle
    updateSlider() {
        document.getElementById('incidentAngle').value = this.incidentAngle;
    }
    
    // MODIFIED: Calculate surface normal vector at intersection point (perpendicular to surface)
    calculateSurfaceNormal() {
        let normalX = 0;
        let normalY = -1; // Default upward normal for plane mirror
        
        switch (this.surfaceType) {
            case 'plane':
                // For plane mirror, normal is always vertical (perpendicular to horizontal surface)
                normalX = 0;
                normalY = -1;
                break;
                
            case 'rough':
                // For rough surface, calculate local normal based on surface slope
                const dx = 2; // Small step for derivative calculation
                const x1 = this.intersectionPoint.x - dx;
                const x2 = this.intersectionPoint.x + dx;
                
                // Calculate surface heights at adjacent points
                const y1 = this.surfaceY + Math.sin(x1 * 0.1) * 3 + Math.cos(x1 * 0.05) * 1.5;
                const y2 = this.surfaceY + Math.sin(x2 * 0.1) * 3 + Math.cos(x2 * 0.05) * 1.5;
                
                // Calculate surface tangent vector
                const tangentX = x2 - x1;
                const tangentY = y2 - y1;
                
                // Normal is perpendicular to tangent (rotate tangent 90 degrees)
                normalX = -tangentY;
                normalY = tangentX;
                
                // Normalize the normal vector
                const normalLength = Math.sqrt(normalX * normalX + normalY * normalY);
                normalX /= normalLength;
                normalY /= normalLength;
                
                // Ensure normal points upward (into the medium where light comes from)
                if (normalY > 0) {
                    normalX = -normalX;
                    normalY = -normalY;
                }
                break;
                
            case 'curved':
                // For curved mirror, calculate normal based on curve tangent
                const t = (this.intersectionPoint.x - 50) / (this.canvas.width - 100);
                
                // Derivative of quadratic curve: d/dt[-25 * 4t(1-t)] = -25 * 4(1-2t)
                const curveTangentSlope = -25 * 4 * (1 - 2 * t);
                
                // Convert to actual coordinates
                const curveWidth = this.canvas.width - 100;
                const actualTangentX = curveWidth;
                const actualTangentY = curveTangentSlope;
                
                // Normal is perpendicular to tangent
                normalX = -actualTangentY;
                normalY = actualTangentX;
                
                // Normalize the normal vector
                const curveNormalLength = Math.sqrt(normalX * normalX + normalY * normalY);
                normalX /= curveNormalLength;
                normalY /= curveNormalLength;
                
                // Ensure normal points toward the center of curvature (upward for concave mirror)
                if (normalY > 0) {
                    normalX = -normalX;
                    normalY = -normalY;
                }
                break;
        }
        
        return { x: normalX, y: normalY };
    }
    
    // Main drawing function - renders the entire simulation
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid if enabled
        if (this.showGrid) {
            this.drawGrid();
        }
        
        // Draw surface based on type
        this.drawSurface();
        
        // Draw normal line if enabled (now correctly perpendicular to surface)
        if (this.showNormal) {
            this.drawNormal();
        }
        
        // Draw incident and reflected rays (now calculated based on proper normal)
        this.drawRays();
        
        // Draw angle arcs and labels (now at intersection point)
        this.drawAngles();
        
        // ENHANCED: Draw the draggable intersection point with improved visuals
        this.drawIntersectionPoint();
        
        // Draw legend
        this.drawLegend();
    }
    
    // Draw coordinate grid
    drawGrid() {
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 0.5;
        
        // Vertical lines
        for (let x = 0; x <= this.canvas.width; x += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= this.canvas.height; y += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    // ENHANCED: Draw the reflecting surface with improved visual quality
    drawSurface() {
        this.ctx.lineWidth = 4;
        
        switch (this.surfaceType) {
            case 'plane':
                // Straight mirror surface
                this.ctx.strokeStyle = '#2196F3';
                this.ctx.beginPath();
                this.ctx.moveTo(50, this.surfaceY);
                this.ctx.lineTo(this.canvas.width - 50, this.surfaceY);
                this.ctx.stroke();
                
                // Mirror backing with gradient effect
                const gradient = this.ctx.createLinearGradient(0, this.surfaceY, 0, this.surfaceY + 10);
                gradient.addColorStop(0, '#f0f0f0');
                gradient.addColorStop(1, '#d0d0d0');
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(50, this.surfaceY, this.canvas.width - 100, 10);
                break;
                
            case 'rough':
                // Rough surface with more realistic irregular pattern
                this.ctx.strokeStyle = '#FF5722';
                this.ctx.beginPath();
                this.ctx.moveTo(50, this.surfaceY);
                
                for (let x = 50; x < this.canvas.width - 50; x += 3) {
                    const roughness = Math.sin(x * 0.1) * 3 + Math.cos(x * 0.05) * 1.5;
                    this.ctx.lineTo(x, this.surfaceY + roughness);
                }
                this.ctx.stroke();
                break;
                
            case 'curved':
                // Curved mirror surface with enhanced curve
                this.ctx.strokeStyle = '#9C27B0';
                this.ctx.beginPath();
                this.ctx.moveTo(50, this.surfaceY + 25);
                this.ctx.quadraticCurveTo(this.canvas.width / 2, this.surfaceY - 25, this.canvas.width - 50, this.surfaceY + 25);
                this.ctx.stroke();
                
                // Add curve backing
                this.ctx.strokeStyle = '#E1BEE7';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(50, this.surfaceY + 27);
                this.ctx.quadraticCurveTo(this.canvas.width / 2, this.surfaceY - 23, this.canvas.width - 50, this.surfaceY + 27);
                this.ctx.stroke();
                break;
        }
    }
    
    // MODIFIED: Draw normal line perpendicular to surface at intersection point
    drawNormal() {
        const normal = this.calculateSurfaceNormal();
        const normalLength = 80;
        
        this.ctx.strokeStyle = '#666';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        // Draw normal line extending both directions from intersection point
        const normalStartX = this.intersectionPoint.x + normal.x * normalLength;
        const normalStartY = this.intersectionPoint.y + normal.y * normalLength;
        const normalEndX = this.intersectionPoint.x - normal.x * (normalLength * 0.4);
        const normalEndY = this.intersectionPoint.y - normal.y * (normalLength * 0.4);
        
        this.ctx.beginPath();
        this.ctx.moveTo(normalStartX, normalStartY);
        this.ctx.lineTo(normalEndX, normalEndY);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]); // Reset line dash
        
        // Normal label with better positioning
        this.ctx.fillStyle = '#666';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Normal', normalStartX + 15, normalStartY - 5);
    }
    
    // MODIFIED: Draw incident and reflected light rays based on proper physics laws
    // FIXED: Ensure rays are always positioned above the surface for curved and rough mirrors
    drawRays() {
        const normal = this.calculateSurfaceNormal();
        const angleRad = this.incidentAngle * Math.PI / 180;
        const rayLength = 80;
        
        // Calculate incident ray direction
        // Incident ray comes from upper left, making specified angle with normal
        const incidentDirX = Math.sin(angleRad) * normal.x - Math.cos(angleRad) * normal.y;
        const incidentDirY = Math.sin(angleRad) * normal.y + Math.cos(angleRad) * normal.x;
        
        // Calculate reflected ray direction using law of reflection
        // Reflected ray = incident ray - 2 * (incident · normal) * normal
        const dotProduct = incidentDirX * normal.x + incidentDirY * normal.y;
        const reflectedDirX = incidentDirX - 2 * dotProduct * normal.x;
        const reflectedDirY = incidentDirY - 2 * dotProduct * normal.y;
        
        // FIXED: Calculate ray endpoints ensuring they stay above the surface
        // For incident ray - ensure it comes from above the surface
        let incidentStartX = this.intersectionPoint.x - incidentDirX * rayLength;
        let incidentStartY = this.intersectionPoint.y - incidentDirY * rayLength;
        
        // For reflected ray - ensure it goes above the surface
        let reflectedEndX = this.intersectionPoint.x + reflectedDirX * rayLength;
        let reflectedEndY = this.intersectionPoint.y + reflectedDirY * rayLength;
        
        // ADDED: Safety check to ensure rays don't go below surface for curved and rough mirrors
        if (this.surfaceType === 'curved' || this.surfaceType === 'rough') {
            // Ensure incident ray starts above the surface
            if (incidentStartY > this.intersectionPoint.y - 20) {
                const adjustmentFactor = (this.intersectionPoint.y - 20 - incidentStartY) / incidentDirY;
                incidentStartX = this.intersectionPoint.x - incidentDirX * (rayLength + adjustmentFactor);
                incidentStartY = this.intersectionPoint.y - 20;
            }
            
            // Ensure reflected ray ends above the surface
            if (reflectedEndY > this.intersectionPoint.y - 20) {
                const adjustmentFactor = (this.intersectionPoint.y - 20 - reflectedEndY) / reflectedDirY;
                reflectedEndX = this.intersectionPoint.x + reflectedDirX * (rayLength + adjustmentFactor);
                reflectedEndY = this.intersectionPoint.y - 20;
            }
        }
        
        // Draw incident ray with enhanced styling
        this.ctx.strokeStyle = '#FF9800';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(incidentStartX, incidentStartY);
        this.ctx.lineTo(this.intersectionPoint.x, this.intersectionPoint.y);
        this.ctx.stroke();
        
        // Draw reflected ray with enhanced styling
        this.ctx.strokeStyle = '#4CAF50';
        this.ctx.beginPath();
        this.ctx.moveTo(this.intersectionPoint.x, this.intersectionPoint.y);
        this.ctx.lineTo(reflectedEndX, reflectedEndY);
        this.ctx.stroke();
        
        // Draw enhanced arrowheads
        this.drawArrowhead(incidentStartX, incidentStartY, this.intersectionPoint.x, this.intersectionPoint.y, '#FF9800');
        this.drawArrowhead(this.intersectionPoint.x, this.intersectionPoint.y, reflectedEndX, reflectedEndY, '#4CAF50');
        
        // UPDATED: Add ray labels with better positioning to avoid surface overlap
        this.ctx.fillStyle = '#FF9800';
        this.ctx.font = '11px Arial';
        this.ctx.textAlign = 'center';
        // Position incident ray label above the ray
        const incidentLabelX = incidentStartX - 15;
        const incidentLabelY = Math.min(incidentStartY - 5, this.intersectionPoint.y - 30);
        this.ctx.fillText('Incident Ray', incidentLabelX, incidentLabelY);
        
        this.ctx.fillStyle = '#4CAF50';
        // Position reflected ray label above the ray
        const reflectedLabelX = reflectedEndX + 15;
        const reflectedLabelY = Math.min(reflectedEndY - 5, this.intersectionPoint.y - 30);
        this.ctx.fillText('Reflected Ray', reflectedLabelX, reflectedLabelY);
    }
    
    // Draw arrowhead for rays with improved styling
    drawArrowhead(fromX, fromY, toX, toY, color) {
        const angle = Math.atan2(toY - fromY, toX - fromX);
        const arrowLength = 12;
        const arrowAngle = Math.PI / 6;
        
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = 2;
        
        // Draw filled arrowhead
        this.ctx.beginPath();
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(
            toX - arrowLength * Math.cos(angle - arrowAngle),
            toY - arrowLength * Math.sin(angle - arrowAngle)
        );
        this.ctx.lineTo(
            toX - arrowLength * Math.cos(angle + arrowAngle),
            toY - arrowLength * Math.sin(angle + arrowAngle)
        );
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    // MODIFIED: Draw angle measurement arcs based on normal direction
    // UPDATED: Ensure angle labels are positioned above the surface
    drawAngles() {
        const normal = this.calculateSurfaceNormal();
        const angleRad = this.incidentAngle * Math.PI / 180;
        const arcRadius = 35;
        
        // Calculate normal angle for arc positioning
        const normalAngle = Math.atan2(normal.y, normal.x);
        
        // Incident angle arc (measured from normal)
        this.ctx.strokeStyle = '#FF9800';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(
            this.intersectionPoint.x, 
            this.intersectionPoint.y, 
            arcRadius, 
            normalAngle - angleRad, 
            normalAngle
        );
        this.ctx.stroke();
        
        // Reflected angle arc (measured from normal)
        this.ctx.strokeStyle = '#4CAF50';
        this.ctx.beginPath();
        this.ctx.arc(
            this.intersectionPoint.x, 
            this.intersectionPoint.y, 
            arcRadius, 
            normalAngle, 
            normalAngle + angleRad
        );
        this.ctx.stroke();
        
        // UPDATED: Angle labels with better positioning relative to normal and ensuring they stay above surface
        const labelDistance = 45;
        let incidentLabelX = this.intersectionPoint.x + Math.cos(normalAngle - angleRad/2) * labelDistance;
        let incidentLabelY = this.intersectionPoint.y + Math.sin(normalAngle - angleRad/2) * labelDistance;
        let reflectedLabelX = this.intersectionPoint.x + Math.cos(normalAngle + angleRad/2) * labelDistance;
        let reflectedLabelY = this.intersectionPoint.y + Math.sin(normalAngle + angleRad/2) * labelDistance;
        
        // ADDED: Ensure angle labels don't go below surface for curved and rough mirrors
        if (this.surfaceType === 'curved' || this.surfaceType === 'rough') {
            const minY = this.intersectionPoint.y - 15; // Minimum Y position above surface
            if (incidentLabelY > minY) {
                incidentLabelY = minY;
            }
            if (reflectedLabelY > minY) {
                reflectedLabelY = minY;
            }
        }
        
        this.ctx.fillStyle = '#FF9800';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`θᵢ`, incidentLabelX, incidentLabelY);
        
        this.ctx.fillStyle = '#4CAF50';
        this.ctx.fillText(`θᵣ`, reflectedLabelX, reflectedLabelY);
    }
    
    // ENHANCED: Draw the draggable intersection point with improved visual feedback
    drawIntersectionPoint() {
        const point = this.intersectionPoint;
        
        // Draw glow effect when hovered or dragged
        if (point.isHovered || point.isDragging) {
            this.ctx.shadowColor = '#FF6B35';
            this.ctx.shadowBlur = 10;
        }
        
        // Draw outer ring for better visibility
        this.ctx.strokeStyle = point.isHovered || point.isDragging ? '#FF6B35' : '#333';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, point.radius + 3, 0, 2 * Math.PI);
        this.ctx.stroke();
        
        // Draw main point with gradient
        const gradient = this.ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius);
        gradient.addColorStop(0, point.isHovered || point.isDragging ? '#FFE0B2' : '#FFF');
        gradient.addColorStop(1, point.isHovered || point.isDragging ? '#FF6B35' : '#E0E0E0');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, point.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
        
        // Draw center dot
        this.ctx.fillStyle = '#333';
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        this.ctx.fill();
        
        // Add instructional label when hovered or dragged
        if (point.isHovered || point.isDragging) {
            this.ctx.fillStyle = '#333';
            this.ctx.font = 'bold 11px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(point.isDragging ? 'Dragging...' : 'Drag along surface!', point.x, point.y - 20);
        }
    }
    
    // ENHANCED: Draw legend with updated instructions
    drawLegend() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        this.ctx.fillRect(10, 10, 220, 100);
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(10, 10, 220, 100);
        
        this.ctx.fillStyle = '#333';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Law of Reflection:', 15, 25);
        
        this.ctx.font = '11px Arial';
        this.ctx.fillText('• Angle of incidence = Angle of reflection', 15, 40);
        this.ctx.fillText('• Both angles measured from surface normal', 15, 55);
        this.ctx.fillText('• Use slider to change angle', 15, 70);
        this.ctx.fillText('• Drag intersection point along surface', 15, 85);
        this.ctx.fillText('• Normal is always ⊥ to surface', 15, 100);
    }
    
    // ENHANCED: Reset simulation to default state
    resetSimulation() {
        this.incidentAngle = 30;
        this.surfaceType = 'plane';
        this.showGrid = false;
        this.showNormal = true;
        
        // Reset intersection point
        this.resetIntersectionPoint();
        
        // Reset UI elements
        document.getElementById('incidentAngle').value = 30;
        document.getElementById('surfaceType').value = 'plane';
        document.getElementById('showNormal').classList.add('active');
        
        this.updateAngleDisplay();
        this.trackInteraction();
        this.draw();
    }
    
    // Analytics tracking functions
    trackInteraction() {
        this.analytics.interactions++;
        this.updateAnalyticsDisplay();
    }
    
    trackAngleChange() {
        if (Math.abs(this.incidentAngle - this.analytics.lastAngle) > 0) {
            this.analytics.angleChanges++;
            this.analytics.lastAngle = this.incidentAngle;
            this.trackInteraction();
        }
    }
    
    trackSurfaceChange() {
        this.analytics.surfaceChanges++;
        this.trackInteraction();
    }
    
    // Update analytics display
    updateAnalyticsDisplay() {
        document.getElementById('interactionCount').textContent = this.analytics.interactions;
        document.getElementById('angleChanges').textContent = this.analytics.angleChanges;
        document.getElementById('surfaceChanges').textContent = this.analytics.surfaceChanges;
    }
    
    // Start timer for tracking time spent
    startAnalyticsTimer() {
        setInterval(() => {
            const timeSpent = Math.floor((Date.now() - this.analytics.startTime) / 1000);
            document.getElementById('timeSpent').textContent = `${timeSpent}s`;
        }, 1000);
    }
    
    // Setup tooltips for enhanced user experience
    setupTooltips() {
        const tooltip = document.getElementById('tooltip');
        const elements = document.querySelectorAll('[title]');
        
        elements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                tooltip.textContent = e.target.getAttribute('title');
                tooltip.classList.add('show');
            });
            
            element.addEventListener('mousemove', (e) => {
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 30 + 'px';
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });
    }
}

// Initialize the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Auto-detect iframe and adjust height accordingly
    if (window.self !== window.top) {
        // Running in iframe - use 450px height
        document.body.style.height = '450px';
    } else {
        // Running in new tab - use 90vh height
        document.body.style.height = '90vh';
    }
    
    // Start the simulation
    window.reflectionSimulation = new ReflectionSimulation();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Redraw canvas if needed
    if (window.reflectionSimulation) {
        window.reflectionSimulation.draw();
    }
});