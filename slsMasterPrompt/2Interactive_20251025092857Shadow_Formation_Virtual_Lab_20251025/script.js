/* ============================================
   SHADOW FORMATION VIRTUAL LAB - SCRIPT
   ============================================
   
   This script handles the interactive simulation
   of light rays, shadow formation, and object
   manipulation with physics-based calculations.
   
   Key Features:
   - Real-time light ray calculation
   - Tangent line computation for sphere/cube
   - Shadow projection on screen
   - Drag-and-drop interaction
   - Animation controls (Play, Pause, Reset)
   - Object type switching
   - MODIFIED: Light rays stop at the screen if it intersects,
     otherwise they extend to the end of the plotting panel
*/

// ============================================
// STATE MANAGEMENT
// ============================================

const state = {
    // Light source position
    light: { x: 50, y: 225 },
    
    // Object properties
    object: {
        type: 'sphere', // 'sphere' or 'cube'
        x: 300,
        y: 225,
        radius: 40, // for sphere
        size: 80    // for cube
    },
    
    // Screen position
    screen: { x: 500, y: 100, width: 15, height: 250 },
    
    // Animation state
    isPlaying: false,
    animationDirection: 1, // 1 for right, -1 for left
    animationSpeed: 1.5,
    
    // Dragging state
    dragging: null,
    dragOffset: { x: 0, y: 0 },
    
    // Boundaries
    boundaries: {
        lightMinX: 20,
        lightMaxX: 260, // stops before object
        objectMinX: 100,
        objectMaxX: 460, // stops before screen
        screenMinX: 470,
        screenMaxX: 580
    },
    
    // Canvas dimensions (will be set on initialization)
    canvasWidth: 600,
    canvasHeight: 450
};

// ============================================
// DOM ELEMENTS CACHE
// ============================================

const elements = {
    canvas: null,
    lightSource: null,
    objectGroup: null,
    sphere: null,
    cube: null,
    screen: null,
    lightRays: null,
    shadowGroup: null,
    playBtn: null,
    pauseBtn: null,
    resetBtn: null,
    objectSelect: null,
    tooltip: null
};
 
// ============================================
// FULLPAGE MODE + CANVAS SIZING HELPERS
// ============================================

(function enableFullpageIfNewTab() {
    try {
        if (window.self === window.top) {
            // Not embedded in an iframe => treat as "new tab" fullpage view
            document.body.classList.add('fullpage');
        }
    } catch (e) {
        // Cross-origin frame access can throw; ignore and assume not fullpage
    }
})();

function updateCanvasDimensions() {
    if (!elements.canvas) return;
    const rect = elements.canvas.getBoundingClientRect();
    state.canvasWidth = rect.width || 600;
    state.canvasHeight = rect.height || 450;
}

// ============================================
// INITIALIZATION
// ============================================

function initializeApp() {
    // Cache DOM elements
    elements.canvas = document.getElementById('simulationCanvas');
    elements.lightSource = document.getElementById('lightSource');
    elements.objectGroup = document.getElementById('objectGroup');
    elements.sphere = document.getElementById('sphere');
    elements.cube = document.getElementById('cube');
    elements.screen = document.getElementById('screen');
    elements.lightRays = document.getElementById('lightRays');
    elements.shadowGroup = document.getElementById('shadowGroup');
    elements.playBtn = document.getElementById('playBtn');
    elements.pauseBtn = document.getElementById('pauseBtn');
    elements.resetBtn = document.getElementById('resetBtn');
    elements.objectSelect = document.getElementById('objectSelect');
    elements.tooltip = document.getElementById('tooltip');
    
    // Get canvas dimensions
    updateCanvasDimensions();
    
    // Set up event listeners
    setupEventListeners();

    // Recompute canvas size on window resize (useful for 90vh resizing)
    window.addEventListener('resize', () => {
        updateCanvasDimensions();
        updateSimulation();
    });
    
    // Initial render
    updateSimulation();
    
    // Start animation loop
    requestAnimationFrame(animationLoop);
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Control buttons
    elements.playBtn.addEventListener('click', playAnimation);
    elements.pauseBtn.addEventListener('click', pauseAnimation);
    elements.resetBtn.addEventListener('click', resetSimulation);
    
    // Object selector
    elements.objectSelect.addEventListener('change', changeObject);
    
    // Dragging events
    elements.canvas.addEventListener('mousedown', onCanvasMouseDown);
    elements.canvas.addEventListener('mousemove', onCanvasMouseMove);
    elements.canvas.addEventListener('mouseup', onCanvasMouseUp);
    elements.canvas.addEventListener('mouseleave', onCanvasMouseUp);
    
    // Touch events for mobile
    elements.canvas.addEventListener('touchstart', onCanvasTouchStart);
    elements.canvas.addEventListener('touchmove', onCanvasTouchMove);
    elements.canvas.addEventListener('touchend', onCanvasTouchEnd);
    
    // Tooltip events
    elements.objectSelect.addEventListener('mouseenter', (e) => showTooltip(e.target.title));
    elements.objectSelect.addEventListener('mouseleave', hideTooltip);
}

// ============================================
// CONTROL BUTTON HANDLERS
// ============================================

function playAnimation() {
    state.isPlaying = true;
    elements.playBtn.disabled = true;
    elements.pauseBtn.disabled = false;
}

function pauseAnimation() {
    state.isPlaying = false;
    elements.playBtn.disabled = false;
    elements.pauseBtn.disabled = true;
}

function resetSimulation() {
    state.isPlaying = false;
    state.light = { x: 50, y: 225 };
    state.object = {
        type: 'sphere',
        x: 300,
        y: 225,
        radius: 40,
        size: 80
    };
    state.screen = { x: 500, y: 100, width: 15, height: 250 };
    state.animationDirection = 1;
    
    elements.objectSelect.value = 'sphere';
    updateObjectDisplay();
    updateSimulation();
    
    elements.playBtn.disabled = false;
    elements.pauseBtn.disabled = true;
}

function changeObject() {
    const newType = elements.objectSelect.value;
    state.object.type = newType;
    updateObjectDisplay();
    updateSimulation();
}

function updateObjectDisplay() {
    if (state.object.type === 'sphere') {
        elements.sphere.style.display = 'block';
        elements.cube.style.display = 'none';
    } else {
        elements.sphere.style.display = 'none';
        elements.cube.style.display = 'block';
    }
}

// ============================================
// DRAGGING HANDLERS
// ============================================

function onCanvasMouseDown(e) {
    const rect = elements.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    startDragging(x, y);
}

function onCanvasMouseMove(e) {
    const rect = elements.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    continueDragging(x, y);
}

function onCanvasMouseUp() {
    stopDragging();
}

function onCanvasTouchStart(e) {
    const rect = elements.canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    startDragging(x, y);
}

function onCanvasTouchMove(e) {
    const rect = elements.canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    continueDragging(x, y);
}

function onCanvasTouchEnd() {
    stopDragging();
}

function startDragging(x, y) {
    // Check if clicking on light source
    if (isPointInCircle(x, y, state.light.x, state.light.y, 12)) {
        state.dragging = 'light';
        state.dragOffset = { x: x - state.light.x, y: y - state.light.y };
        return;
    }
    
    // Check if clicking on object
    if (isPointInObject(x, y)) {
        state.dragging = 'object';
        state.dragOffset = { x: x - state.object.x, y: y - state.object.y };
        return;
    }
    
    // Check if clicking on screen
    if (isPointInRect(x, y, state.screen.x, state.screen.y, state.screen.width, state.screen.height)) {
        state.dragging = 'screen';
        state.dragOffset = { x: x - state.screen.x, y: y - state.screen.y };
        return;
    }
}

function continueDragging(x, y) {
    if (!state.dragging) return;
    
    const newX = x - state.dragOffset.x;
    
    if (state.dragging === 'light') {
        // Constrain light movement to X axis only
        state.light.x = Math.max(state.boundaries.lightMinX, 
                                 Math.min(newX, state.boundaries.lightMaxX));
    } else if (state.dragging === 'object') {
        // Constrain object movement to X axis only
        state.object.x = Math.max(state.boundaries.objectMinX, 
                                  Math.min(newX, state.boundaries.objectMaxX));
    } else if (state.dragging === 'screen') {
        // Constrain screen movement to X axis only
        state.screen.x = Math.max(state.boundaries.screenMinX, 
                                  Math.min(newX, state.boundaries.screenMaxX));
    }
    
    updateSimulation();
}

function stopDragging() {
    state.dragging = null;
}

// ============================================
// COLLISION DETECTION
// ============================================

function isPointInCircle(px, py, cx, cy, radius) {
    const dx = px - cx;
    const dy = py - cy;
    return Math.sqrt(dx * dx + dy * dy) <= radius;
}

function isPointInObject(x, y) {
    if (state.object.type === 'sphere') {
        return isPointInCircle(x, y, state.object.x, state.object.y, state.object.radius + 5);
    } else {
        // Cube collision
        const halfSize = state.object.size / 2;
        return isPointInRect(x, y, 
                            state.object.x - halfSize, 
                            state.object.y - halfSize, 
                            state.object.size, 
                            state.object.size);
    }
}

function isPointInRect(px, py, rx, ry, rw, rh) {
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

// ============================================
// LIGHT RAY CALCULATIONS
// ============================================

/**
 * Calculate tangent lines from light source to sphere
 * Returns two points where rays touch the sphere
 */
function calculateSphereTangents() {
    const lx = state.light.x;
    const ly = state.light.y;
    const ox = state.object.x;
    const oy = state.object.y;
    const r = state.object.radius;
    
    // Distance from light to object center
    const dx = ox - lx;
    const dy = oy - ly;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist <= r) {
        // Light is inside or too close to sphere
        return null;
    }
    
    // Calculate angle to object center
    const angleToCenter = Math.atan2(dy, dx);
    
    // Calculate angle of tangent line
    const angleOffset = Math.asin(r / dist);
    
    // Two tangent angles
    const angle1 = angleToCenter + angleOffset;
    const angle2 = angleToCenter - angleOffset;
    
    // Calculate tangent points on sphere
    const point1 = {
        x: ox + r * Math.cos(angle1 + Math.PI / 2),
        y: oy + r * Math.sin(angle1 + Math.PI / 2)
    };
    
    const point2 = {
        x: ox + r * Math.cos(angle2 - Math.PI / 2),
        y: oy + r * Math.sin(angle2 - Math.PI / 2)
    };
    
    return [point1, point2];
}

/**
 * Calculate tangent lines from light source to cube
 * Returns two points where rays touch the cube edges
 */
function calculateCubeTangents() {
    const lx = state.light.x;
    const ly = state.light.y;
    const ox = state.object.x;
    const oy = state.object.y;
    const halfSize = state.object.size / 2;
    
    // Cube corners
    const top = oy - halfSize;
    const bottom = oy + halfSize;
    const left = ox - halfSize;
    const right = ox + halfSize;
    
    // Find top and bottom tangent points
    // Top tangent point (top-left or top-right corner)
    let point1;
    if (lx < ox) {
        // Light on left: use top-left corner
        point1 = { x: left, y: top };
    } else {
        // Light on right: use top-right corner
        point1 = { x: right, y: top };
    }
    
    // Bottom tangent point
    let point2;
    if (lx < ox) {
        // Light on left: use bottom-left corner
        point2 = { x: left, y: bottom };
    } else {
        // Light on right: use bottom-right corner
        point2 = { x: right, y: bottom };
    }
    
    return [point1, point2];
}

/**
 * Calculate where a ray intersects the screen
 * Returns intersection point if it exists within screen bounds
 */
function calculateScreenIntersection(rayStartX, rayStartY, rayEndX, rayEndY) {
    const screenX = state.screen.x;
    const screenTop = state.screen.y;
    const screenBottom = state.screen.y + state.screen.height;
    
    // Ray direction
    const dx = rayEndX - rayStartX;
    const dy = rayEndY - rayStartY;
    
    if (Math.abs(dx) < 0.001) {
        // Ray is vertical
        return null;
    }
    
    // Calculate t parameter for intersection with screen X
    const t = (screenX - rayStartX) / dx;
    
    if (t < 0) {
        // Screen is behind the ray
        return null;
    }
    
    // Calculate Y coordinate at screen
    const intersectY = rayStartY + t * dy;
    
    // Clamp to screen bounds
    if (intersectY < screenTop || intersectY > screenBottom) {
        return null;
    }
    
    return { x: screenX, y: intersectY };
}

/**
 * MODIFIED: Calculate ray endpoint that either stops at screen or extends to canvas edge
 * If ray intersects screen, endpoint is at screen intersection
 * Otherwise, endpoint extends to the right edge of the canvas
 */
function calculateRayEndpoint(rayStartX, rayStartY, rayEndX, rayEndY) {
    // First check if ray intersects the screen
    const screenIntersection = calculateScreenIntersection(rayStartX, rayStartY, rayEndX, rayEndY);
    
    if (screenIntersection) {
        // Ray hits the screen, stop at intersection point
        return screenIntersection;
    }
    
    // Ray doesn't hit screen, extend to canvas edge
    // Ray direction
    const dx = rayEndX - rayStartX;
    const dy = rayEndY - rayStartY;
    const rayLength = Math.sqrt(dx * dx + dy * dy);
    
    if (rayLength < 0.001) {
        return { x: rayEndX, y: rayEndY };
    }
    
    // Normalize direction
    const dirX = dx / rayLength;
    const dirY = dy / rayLength;
    
    // Calculate how far to extend to reach canvas edge (right side at x = canvasWidth)
    const canvasEdgeX = state.canvasWidth;
    const t = (canvasEdgeX - rayStartX) / dirX;
    
    if (t > 0) {
        // Extend ray to canvas edge
        return {
            x: canvasEdgeX,
            y: rayStartY + t * dirY
        };
    }
    
    // Fallback: extend a reasonable distance
    return {
        x: rayStartX + dirX * 600,
        y: rayStartY + dirY * 600
    };
}

// ============================================
// SIMULATION UPDATE
// ============================================

function updateSimulation() {
    // Clear previous rays and shadows
    elements.lightRays.innerHTML = '';
    elements.shadowGroup.innerHTML = '';
    
    // Get tangent points based on object type
    let tangentPoints;
    if (state.object.type === 'sphere') {
        tangentPoints = calculateSphereTangents();
    } else {
        tangentPoints = calculateCubeTangents();
    }
    
    if (!tangentPoints) return;
    
    // Draw light rays and calculate shadow
    const shadowPoints = [];
    
    tangentPoints.forEach((point, index) => {
        // MODIFIED: Calculate ray endpoint that stops at screen or extends to canvas edge
        const rayEndpoint = calculateRayEndpoint(
            state.light.x, state.light.y,
            point.x, point.y
        );
        
        // Draw ray from light source through tangent point to endpoint
        const ray = document.createElementNS('external_0.txt', 'line');
        ray.setAttribute('x1', state.light.x);
        ray.setAttribute('y1', state.light.y);
        ray.setAttribute('x2', rayEndpoint.x);
        ray.setAttribute('y2', rayEndpoint.y);
        elements.lightRays.appendChild(ray);
        
        // Check if ray intersects the screen for shadow calculation
        const screenIntersection = calculateScreenIntersection(
            state.light.x, state.light.y,
            point.x, point.y
        );
        
        if (screenIntersection) {
            shadowPoints.push(screenIntersection);
        }
    });
    
    // Draw shadow on screen (only if ray intersects screen)
    if (shadowPoints.length === 2) {
        const polygon = document.createElementNS('external_0.txt', 'polygon');
        const points = `${shadowPoints[0].x},${shadowPoints[0].y} ${shadowPoints[1].x},${shadowPoints[1].y} ${state.screen.x},${state.screen.y + state.screen.height} ${state.screen.x},${state.screen.y}`;
        polygon.setAttribute('points', points);
        elements.shadowGroup.appendChild(polygon);
    }
    
    // Update DOM positions
    updateDOMPositions();
}

function updateDOMPositions() {
    // Update light source position
    elements.lightSource.setAttribute('cx', state.light.x);
    elements.lightSource.setAttribute('cy', state.light.y);
    
    // Update object position
    if (state.object.type === 'sphere') {
        elements.sphere.setAttribute('cx', state.object.x);
        elements.sphere.setAttribute('cy', state.object.y);
    } else {
        const halfSize = state.object.size / 2;
        elements.cube.setAttribute('x', state.object.x - halfSize);
        elements.cube.setAttribute('y', state.object.y - halfSize);
    }
    
    // Update screen position
    elements.screen.setAttribute('x', state.screen.x);
    elements.screen.setAttribute('y', state.screen.y);
}

// ============================================
// ANIMATION LOOP
// ============================================

function animationLoop() {
    if (state.isPlaying) {
        // Move light source left and right
        state.light.x += state.animationDirection * state.animationSpeed;
        
        // Reverse direction at boundaries
        if (state.light.x <= state.boundaries.lightMinX) {
            state.light.x = state.boundaries.lightMinX;
            state.animationDirection = 1;
        } else if (state.light.x >= state.boundaries.lightMaxX) {
            state.light.x = state.boundaries.lightMaxX;
            state.animationDirection = -1;
        }
        
        updateSimulation();
    }
    
    requestAnimationFrame(animationLoop);
}

// ============================================
// TOOLTIP MANAGEMENT
// ============================================

function showTooltip(text) {
    if (!text) return;
    elements.tooltip.textContent = text;
    elements.tooltip.classList.add('visible');
}

function hideTooltip() {
    elements.tooltip.classList.remove('visible');
}

// ============================================
// STARTUP
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}