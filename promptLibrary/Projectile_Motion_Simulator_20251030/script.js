/* ============================================
   PROJECTILE MOTION SIMULATOR - JAVASCRIPT
   ============================================
   This script handles all interactive functionality for the
   projectile motion simulator including:
   - Physics calculations for projectile motion
   - Real-time trajectory visualization
   - Graph generation and updates
   - User input handling and validation
   - Animation and rendering
   ============================================ */

// ============================================
// STATE MANAGEMENT
// ============================================

const state = {
    // Physics parameters
    velocity: 20,           // Initial velocity in m/s
    angle: 45,              // Launch angle in degrees
    gravity: 9.8,           // Gravity in m/s²
    initialHeight: 0,       // Initial height in meters
    airResistance: false,   // Air resistance flag
    
    // Simulation state
    isRunning: false,       // Is simulation currently running
    isPaused: false,        // Is simulation paused
    time: 0,                // Current simulation time
    maxTime: 0,             // Total flight time
    
    // Trajectory data
    trajectoryPoints: [],   // Array of {x, y} points
    velocityData: [],       // Array of velocity vectors
    
    // Results
    results: {
        maxHeight: 0,
        range: 0,
        timeOfFlight: 0,
        impactVelocity: 0
    }
};

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const elements = {
    // Input controls
    velocitySlider: document.getElementById('velocity-slider'),
    angleSlider: document.getElementById('angle-slider'),
    gravitySlider: document.getElementById('gravity-slider'),
    heightSlider: document.getElementById('height-slider'),
    airResistanceCheckbox: document.getElementById('air-resistance-checkbox'),
    
    // Value displays
    velocityValue: document.getElementById('velocity-value'),
    angleValue: document.getElementById('angle-value'),
    gravityValue: document.getElementById('gravity-value'),
    heightValue: document.getElementById('height-value'),
    
    // Buttons
    launchButton: document.getElementById('launch-button'),
    resetButton: document.getElementById('reset-button'),
    pauseButton: document.getElementById('pause-button'),
    
    // Canvas elements
    trajectoryCanvas: document.getElementById('trajectory-canvas'),
    heightGraph: document.getElementById('height-graph'),
    velocityGraph: document.getElementById('velocity-graph'),
    
    // Results display
    resultsSection: document.getElementById('results-section'),
    maxHeightDisplay: document.getElementById('max-height'),
    rangeDisplay: document.getElementById('range'),
    timeFlightDisplay: document.getElementById('time-flight'),
    impactVelocityDisplay: document.getElementById('impact-velocity'),
    
    // Tooltip
    infoTooltip: document.getElementById('info-tooltip'),
    tooltipText: document.getElementById('tooltip-text')
};

// Get canvas contexts
const trajectoryCtx = elements.trajectoryCanvas.getContext('2d');
const heightCtx = elements.heightGraph.getContext('2d');
const velocityCtx = elements.velocityGraph.getContext('2d');

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Set canvas sizes based on container
    resizeCanvases();
    
    // Add event listeners
    setupEventListeners();
    
    // Draw initial state
    drawTrajectory();
    drawGraphs();
}

function resizeCanvases() {
    // Trajectory canvas - fill visualization area
    const trajContainer = elements.trajectoryCanvas.parentElement;
    elements.trajectoryCanvas.width = trajContainer.clientWidth;
    elements.trajectoryCanvas.height = trajContainer.clientHeight;
    
    // Graph canvases
    elements.heightGraph.width = elements.heightGraph.parentElement.clientWidth - 20;
    elements.heightGraph.height = 150;
    
    elements.velocityGraph.width = elements.velocityGraph.parentElement.clientWidth - 20;
    elements.velocityGraph.height = 150;
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Slider inputs - update state and display
    elements.velocitySlider.addEventListener('input', (e) => {
        state.velocity = parseFloat(e.target.value);
        elements.velocityValue.textContent = state.velocity.toFixed(1);
        if (!state.isRunning) drawTrajectory();
    });
    
    elements.angleSlider.addEventListener('input', (e) => {
        state.angle = parseFloat(e.target.value);
        elements.angleValue.textContent = state.angle;
        if (!state.isRunning) drawTrajectory();
    });
    
    elements.gravitySlider.addEventListener('input', (e) => {
        state.gravity = parseFloat(e.target.value);
        elements.gravityValue.textContent = state.gravity.toFixed(1);
        if (!state.isRunning) drawTrajectory();
    });
    
    elements.heightSlider.addEventListener('input', (e) => {
        state.initialHeight = parseFloat(e.target.value);
        elements.heightValue.textContent = state.initialHeight;
        if (!state.isRunning) drawTrajectory();
    });
    
    elements.airResistanceCheckbox.addEventListener('change', (e) => {
        state.airResistance = e.target.checked;
        if (!state.isRunning) drawTrajectory();
    });
    
    // Button events
    elements.launchButton.addEventListener('click', launchProjectile);
    elements.resetButton.addEventListener('click', resetSimulation);
    elements.pauseButton.addEventListener('click', togglePause);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvases();
        if (!state.isRunning) drawTrajectory();
    });
}

// ============================================
// PHYSICS CALCULATIONS
// ============================================

/**
 * Calculate trajectory points for the projectile
 * Uses kinematic equations for projectile motion
 */
function calculateTrajectory() {
    state.trajectoryPoints = [];
    state.velocityData = [];
    
    // Convert angle to radians
    const angleRad = (state.angle * Math.PI) / 180;
    
    // Initial velocity components
    const vx = state.velocity * Math.cos(angleRad);
    const vy = state.velocity * Math.sin(angleRad);
    
    // Calculate time of flight using quadratic formula
    // y = y0 + vy*t - 0.5*g*t²
    // When y = 0: 0 = h0 + vy*t - 0.5*g*t²
    const a = 0.5 * state.gravity;
    const b = -vy;
    const c = -state.initialHeight;
    
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        state.maxTime = 0;
        return;
    }
    
    state.maxTime = (-b + Math.sqrt(discriminant)) / (2 * a);
    
    // Generate trajectory points
    const timeStep = state.maxTime / 100; // 100 points for smooth curve
    let maxHeight = state.initialHeight;
    
    for (let t = 0; t <= state.maxTime; t += timeStep) {
        // Apply air resistance if enabled (simplified model)
        let velocityFactor = state.airResistance ? Math.exp(-0.1 * t) : 1;
        
        // Position calculations
        const x = vx * t * velocityFactor;
        const y = state.initialHeight + vy * t - 0.5 * state.gravity * t * t;
        
        state.trajectoryPoints.push({ x, y });
        
        // Track maximum height
        if (y > maxHeight) maxHeight = y;
        
        // Store velocity data
        const vx_t = vx * velocityFactor;
        const vy_t = vy - state.gravity * t;
        const speed = Math.sqrt(vx_t * vx_t + vy_t * vy_t);
        state.velocityData.push({ t, speed, vx: vx_t, vy: vy_t });
    }
    
    // Calculate results
    state.results.maxHeight = Math.max(0, maxHeight);
    state.results.range = vx * state.maxTime * (state.airResistance ? Math.exp(-0.1 * state.maxTime) : 1);
    state.results.timeOfFlight = state.maxTime;
    
    // Impact velocity
    const vx_final = vx * (state.airResistance ? Math.exp(-0.1 * state.maxTime) : 1);
    const vy_final = vy - state.gravity * state.maxTime;
    state.results.impactVelocity = Math.sqrt(vx_final * vx_final + vy_final * vy_final);
}

// ============================================
// VISUALIZATION - TRAJECTORY CANVAS
// ============================================

/**
 * Draw the projectile trajectory on canvas
 * Includes ground, launch point, trajectory path, and velocity vectors
 */
function drawTrajectory() {
    const canvas = elements.trajectoryCanvas;
    const ctx = trajectoryCtx;
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#e8f4f8';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    drawGrid(ctx, width, height);
    
    // Calculate trajectory
    calculateTrajectory();
    
    if (state.trajectoryPoints.length === 0) {
        // Show message if no trajectory
        ctx.fillStyle = '#999';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Adjust parameters and click Launch', width / 2, height / 2);
        return;
    }
    
    // Find bounds for scaling
    const bounds = getTrajectoryBounds();
    const scale = getScale(bounds, width, height);
    
    // Draw ground line
    drawGround(ctx, width, height, scale, bounds);
    
    // Draw trajectory path
    drawTrajectoryPath(ctx, width, height, scale, bounds);
    
    // Draw launch point
    drawLaunchPoint(ctx, width, height, scale, bounds);
    
    // Draw impact point
    drawImpactPoint(ctx, width, height, scale, bounds);
    
    // Draw velocity vectors at key points
    drawVelocityVectors(ctx, width, height, scale, bounds);
    
    // Draw axes labels
    drawAxesLabels(ctx, width, height, bounds);
}

/**
 * Get the bounding box of the trajectory
 */
function getTrajectoryBounds() {
    let minX = 0, maxX = 0, minY = 0, maxY = state.initialHeight;
    
    state.trajectoryPoints.forEach(point => {
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
    });
    
    return { minX, maxX, minY, maxY };
}

/**
 * Calculate scaling factors for canvas
 */
function getScale(bounds, width, height) {
    const padding = 40;
    const rangeX = bounds.maxX - bounds.minX || 1;
    const rangeY = bounds.maxY - bounds.minY || 1;
    
    const scaleX = (width - 2 * padding) / rangeX;
    const scaleY = (height - 2 * padding) / rangeY;
    
    return { scaleX, scaleY, padding };
}

/**
 * Draw grid background
 */
function drawGrid(ctx, width, height, spacing = 50) {
    ctx.strokeStyle = '#d0e8f2';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

/**
 * Draw ground line
 */
function drawGround(ctx, width, height, scale, bounds) {
    const groundY = height - scale.padding;
    
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(scale.padding, groundY);
    ctx.lineTo(width - scale.padding, groundY);
    ctx.stroke();
    
    // Draw ground pattern
    ctx.strokeStyle = '#A0826D';
    ctx.lineWidth = 1;
    for (let x = scale.padding; x < width - scale.padding; x += 10) {
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x + 5, groundY + 5);
        ctx.stroke();
    }
}

/**
 * Draw trajectory path
 */
function drawTrajectoryPath(ctx, width, height, scale, bounds) {
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    
    state.trajectoryPoints.forEach((point, index) => {
        const x = scale.padding + (point.x - bounds.minX) * scale.scaleX;
        const y = height - scale.padding - (point.y - bounds.minY) * scale.scaleY;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
}

/**
 * Draw launch point
 */
function drawLaunchPoint(ctx, width, height, scale, bounds) {
    const x = scale.padding + (0 - bounds.minX) * scale.scaleX;
    const y = height - scale.padding - (state.initialHeight - bounds.minY) * scale.scaleY;
    
    // Draw circle
    ctx.fillStyle = '#FFE66D';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw border
    ctx.strokeStyle = '#FF9800';
    ctx.lineWidth = 2;
    ctx.stroke();
}

/**
 * Draw impact point
 */
function drawImpactPoint(ctx, width, height, scale, bounds) {
    if (state.trajectoryPoints.length === 0) return;
    
    const lastPoint = state.trajectoryPoints[state.trajectoryPoints.length - 1];
    const x = scale.padding + (lastPoint.x - bounds.minX) * scale.scaleX;
    const y = height - scale.padding - (lastPoint.y - bounds.minY) * scale.scaleY;
    
    // Draw X marker
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 2;
    const size = 8;
    
    ctx.beginPath();
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x + size, y - size);
    ctx.lineTo(x - size, y + size);
    ctx.stroke();
}

/**
 * Draw velocity vectors at key points
 */
function drawVelocityVectors(ctx, width, height, scale, bounds) {
    const step = Math.floor(state.trajectoryPoints.length / 5); // 5 vectors
    if (step === 0) return;
    
    ctx.strokeStyle = '#4ECDC4';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#4ECDC4';
    
    for (let i = 0; i < state.trajectoryPoints.length; i += step) {
        const point = state.trajectoryPoints[i];
        const velocity = state.velocityData[i];
        
        if (!velocity) continue;
        
        const startX = scale.padding + (point.x - bounds.minX) * scale.scaleX;
        const startY = height - scale.padding - (point.y - bounds.minY) * scale.scaleY;
        
        // Scale velocity for visibility
        const vectorScale = 0.15;
        const endX = startX + velocity.vx * vectorScale;
        const endY = startY - velocity.vy * vectorScale;
        
        // Draw arrow
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Draw arrowhead
        const angle = Math.atan2(endY - startY, endX - startX);
        const arrowSize = 6;
        
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
    }
}

/**
 * Draw axes labels and scale
 */
function drawAxesLabels(ctx, width, height, bounds) {
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis label
    ctx.fillText('Distance (m)', width / 2, height - 10);
    
    // Y-axis label
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Height (m)', 0, 0);
    ctx.restore();
}

// ============================================
// VISUALIZATION - GRAPHS
// ============================================

/**
 * Draw height vs time graph
 */
function drawHeightGraph() {
    const canvas = elements.heightGraph;
    const ctx = heightCtx;
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    if (state.velocityData.length === 0) return;
    
    // Find max height for scaling
    const maxHeight = Math.max(...state.velocityData.map(v => {
        const t = v.t;
        return state.initialHeight + state.velocity * Math.sin((state.angle * Math.PI) / 180) * t - 0.5 * state.gravity * t * t;
    }));
    
    const padding = 30;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw height curve
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    state.velocityData.forEach((v, index) => {
        const t = v.t;
        const y = state.initialHeight + state.velocity * Math.sin((state.angle * Math.PI) / 180) * t - 0.5 * state.gravity * t * t;
        
        const x = padding + (t / state.maxTime) * graphWidth;
        const canvasY = height - padding - (y / maxHeight) * graphHeight;
        
        if (index === 0) {
            ctx.moveTo(x, canvasY);
        } else {
            ctx.lineTo(x, canvasY);
        }
    });
    
    ctx.stroke();
    
    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('0', padding - 5, height - padding + 4);
    ctx.textAlign = 'center';
    ctx.fillText(state.maxTime.toFixed(1) + 's', width - padding, height - padding + 15);
}

/**
 * Draw velocity vs time graph
 */
function drawVelocityGraph() {
    const canvas = elements.velocityGraph;
    const ctx = velocityCtx;
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    if (state.velocityData.length === 0) return;
    
    // Find max velocity
    const maxVelocity = Math.max(...state.velocityData.map(v => v.speed));
    
    const padding = 30;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw velocity curve
    ctx.strokeStyle = '#FF6B6B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    state.velocityData.forEach((v, index) => {
        const x = padding + (v.t / state.maxTime) * graphWidth;
        const canvasY = height - padding - (v.speed / maxVelocity) * graphHeight;
        
        if (index === 0) {
            ctx.moveTo(x, canvasY);
        } else {
            ctx.lineTo(x, canvasY);
        }
    });
    
    ctx.stroke();
    
    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('0', padding - 5, height - padding + 4);
    ctx.textAlign = 'center';
    ctx.fillText(state.maxTime.toFixed(1) + 's', width - padding, height - padding + 15);
}

/**
 * Draw both graphs
 */
function drawGraphs() {
    drawHeightGraph();
    drawVelocityGraph();
}

// ============================================
// SIMULATION CONTROL
// ============================================

/**
 * Launch the projectile and start animation
 */
function launchProjectile() {
    if (state.isRunning) return;
    
    state.isRunning = true;
    state.isPaused = false;
    state.time = 0;
    
    // Update UI
    elements.launchButton.style.display = 'none';
    elements.pauseButton.style.display = 'flex';
    elements.velocitySlider.disabled = true;
    elements.angleSlider.disabled = true;
    elements.gravitySlider.disabled = true;
    elements.heightSlider.disabled = true;
    
    // Calculate trajectory
    calculateTrajectory();
    
    // Start animation loop
    animate();
}

/**
 * Animation loop for projectile motion
 */
function animate() {
    if (!state.isRunning) return;
    if (state.isPaused) {
        requestAnimationFrame(animate);
        return;
    }
    
    // Update time
    state.time += 0.016; // ~60fps
    
    if (state.time > state.maxTime) {
        state.time = state.maxTime;
        state.isRunning = false;
        elements.launchButton.style.display = 'flex';
        elements.pauseButton.style.display = 'none';
        showResults();
        return;
    }
    
    // Redraw trajectory with current position
    drawTrajectoryWithAnimation();
    
    requestAnimationFrame(animate);
}

/**
 * Draw trajectory with animated projectile
 */
function drawTrajectoryWithAnimation() {
    const canvas = elements.trajectoryCanvas;
    const ctx = trajectoryCtx;
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear and redraw static elements
    ctx.fillStyle = '#e8f4f8';
    ctx.fillRect(0, 0, width, height);
    drawGrid(ctx, width, height);
    
    calculateTrajectory();
    
    if (state.trajectoryPoints.length === 0) return;
    
    const bounds = getTrajectoryBounds();
    const scale = getScale(bounds, width, height);
    
    drawGround(ctx, width, height, scale, bounds);
    drawTrajectoryPath(ctx, width, height, scale, bounds);
    drawVelocityVectors(ctx, width, height, scale, bounds);
    
    // Find current position
    const index = Math.floor((state.time / state.maxTime) * (state.trajectoryPoints.length - 1));
    if (index >= 0 && index < state.trajectoryPoints.length) {
        const point = state.trajectoryPoints[index];
        const x = scale.padding + (point.x - bounds.minX) * scale.scaleX;
        const y = height - scale.padding - (point.y - bounds.minY) * scale.scaleY;
        
        // Draw animated projectile
        ctx.fillStyle = '#FF6B6B';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw glow effect
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    drawAxesLabels(ctx, width, height, bounds);
}

/**
 * Toggle pause state
 */
function togglePause() {
    state.isPaused = !state.isPaused;
    elements.pauseButton.textContent = state.isPaused ? 'Resume' : 'Pause';
}

/**
 * Reset simulation to initial state
 */
function resetSimulation() {
    state.isRunning = false;
    state.isPaused = false;
    state.time = 0;
    
    // Reset UI
    elements.launchButton.style.display = 'flex';
    elements.pauseButton.style.display = 'none';
    elements.pauseButton.textContent = 'Pause';
    elements.velocitySlider.disabled = false;
    elements.angleSlider.disabled = false;
    elements.gravitySlider.disabled = false;
    elements.heightSlider.disabled = false;
    elements.resultsSection.style.display = 'none';
    
    // Redraw
    drawTrajectory();
    drawGraphs();
}

/**
 * Display results after simulation
 */
function showResults() {
    elements.maxHeightDisplay.textContent = state.results.maxHeight.toFixed(2);
    elements.rangeDisplay.textContent = state.results.range.toFixed(2);
    elements.timeFlightDisplay.textContent = state.results.timeOfFlight.toFixed(2);
    elements.impactVelocityDisplay.textContent = state.results.impactVelocity.toFixed(2);
    
    elements.resultsSection.style.display = 'grid';
    
    // Update graphs
    drawGraphs();
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}