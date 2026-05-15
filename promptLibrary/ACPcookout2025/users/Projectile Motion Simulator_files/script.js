// === SIMULATION PARAMETERS ===
let speed = 75;
let angle = 45;
let mass = 10;
let gravity = 9.81;
let airResistanceCoeff = 0.1;

// === PROJECTILE STATE ===
let x = 0;
let y = 0;
let vx = 0;
let vy = 0;
let time = 0;
let isFlying = false;
let trajectoryPoints = [];

// === DATA TRACKING VARIABLES ===
let maxHeight = 0;
let distanceToMaxHeight = 0;
let distanceFromMaxHeightToLanding = 0;
let totalRange = 0;
let flightTime = 0;

// === CANVAS AND RENDERING ===
let canvas, ctx;
let cannonX = 50;
let cannonY = 0;
let scale = 1;
let animationId;

// === GRID PARAMETERS ===
let gridSpacing = 50; // Grid spacing in simulation units

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    initializeCanvas();
    initializeControls();
    initializeTooltips();
    drawScene();
});

function initializeCanvas() {
    canvas = document.getElementById('simulation-canvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size to match container
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth - 4; // Account for border
    canvas.height = container.clientHeight - 4;
    
    // Update scale and cannon position
    scale = Math.min(canvas.width / 800, canvas.height / 400);
    cannonX = 50 * scale;
    cannonY = canvas.height - 50 * scale;
    
    drawScene();
}

function initializeControls() {
    // Speed slider
    const speedSlider = document.getElementById('speed-slider');
    const speedValue = document.getElementById('speed-value');
    speedSlider.addEventListener('input', function() {
        speed = parseFloat(this.value);
        speedValue.textContent = speed;
    });
    
    // Angle slider
    const angleSlider = document.getElementById('angle-slider');
    const angleValue = document.getElementById('angle-value');
    angleSlider.addEventListener('input', function() {
        angle = parseFloat(this.value);
        angleValue.textContent = angle;
        drawScene(); // Redraw to update cannon angle
    });
    
    // Mass slider
    const massSlider = document.getElementById('mass-slider');
    const massValue = document.getElementById('mass-value');
    massSlider.addEventListener('input', function() {
        mass = parseFloat(this.value);
        massValue.textContent = mass;
    });
    
    // Air resistance slider
    const airResistanceSlider = document.getElementById('air-resistance-slider');
    const airResistanceValue = document.getElementById('air-resistance-value');
    airResistanceSlider.addEventListener('input', function() {
        airResistanceCoeff = parseFloat(this.value);
        airResistanceValue.textContent = airResistanceCoeff.toFixed(2);
    });
    
    // Gravity slider
    const gravitySlider = document.getElementById('gravity-slider');
    const gravityValue = document.getElementById('gravity-value');
    gravitySlider.addEventListener('input', function() {
        gravity = parseFloat(this.value);
        gravityValue.textContent = gravity.toFixed(1);
    });
    
    // Fire button
    document.getElementById('fire-button').addEventListener('click', fireCannon);
    
    // Reset button
    document.getElementById('reset-button').addEventListener('click', resetSimulation);
}

function initializeTooltips() {
    const tooltip = document.getElementById('tooltip');
    const tooltipElements = document.querySelectorAll('.tooltip');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            tooltip.textContent = tooltipText;
            tooltip.classList.add('show');
            updateTooltipPosition(e);
        });
        
        element.addEventListener('mousemove', updateTooltipPosition);
        
        element.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
        });
    });
    
    function updateTooltipPosition(e) {
        const rect = document.getElementById('main-container').getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left + 10) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 30) + 'px';
    }
}

// === FIRING MECHANISM ===
function fireCannon() {
    if (isFlying) return; // Prevent multiple launches
    
    // Reset state and tracking variables
    isFlying = true;
    trajectoryPoints = [];
    x = 0;
    y = 0;
    time = 0;
    maxHeight = 0;
    distanceToMaxHeight = 0;
    distanceFromMaxHeightToLanding = 0;
    totalRange = 0;
    flightTime = 0;
    
    // Convert angle to radians and set initial velocity
    const angleRad = (angle * Math.PI) / 180;
    vx = speed * Math.cos(angleRad);
    vy = speed * Math.sin(angleRad);
    
    // Start animation loop
    animate();
}

function resetSimulation() {
    isFlying = false;
    trajectoryPoints = [];
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    time = 0;
    maxHeight = 0;
    distanceToMaxHeight = 0;
    distanceFromMaxHeightToLanding = 0;
    totalRange = 0;
    flightTime = 0;
    
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    updateDataDisplay();
    drawScene();
}

// === PHYSICS UPDATE (WITH AIR RESISTANCE) ===
function updateProjectileWithAirResistance() {
    const dt = 0.016; // ~60 FPS
    time += dt;
    
    // Calculate velocity magnitude for air resistance
    const velocity = Math.sqrt(vx * vx + vy * vy);
    
    // Calculate air resistance force components
    const F_air_x = -airResistanceCoeff * vx * velocity;
    const F_air_y = -airResistanceCoeff * vy * velocity;
    
    // Calculate acceleration (F = ma -> a = F/m)
    const ax = F_air_x / mass;
    const ay = -gravity + (F_air_y / mass);
    
    // Update velocity and position
    vx += ax * dt;
    vy += ay * dt;
    x += vx * dt;
    y += vy * dt;
    
    // Track maximum height
    if (y > maxHeight) {
        maxHeight = y;
        distanceToMaxHeight = x;
    }
    
    // Store point for trajectory line
    trajectoryPoints.push({x: x, y: y});
    
    // Check for landing (projectile hits the ground, y <= 0)
    if (y <= 0 && isFlying && time > 0.1) {
        isFlying = false;
        totalRange = x;
        distanceFromMaxHeightToLanding = totalRange - distanceToMaxHeight;
        flightTime = time;
        
        updateDataDisplay();
    }
}

// === ANIMATION LOOP ===
function animate() {
    if (isFlying) {
        updateProjectileWithAirResistance();
        updateDataDisplay();
    }
    
    drawScene();
    
    if (isFlying) {
        animationId = requestAnimationFrame(animate);
    }
}

// === GRID DRAWING FUNCTION ===
function drawGrid() {
    ctx.save();
    
    // Set grid line style
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    
    // Calculate grid spacing in screen coordinates
    const screenGridSpacing = gridSpacing * scale;
    
    // Draw vertical grid lines
    for (let x = cannonX % screenGridSpacing; x < canvas.width; x += screenGridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Draw horizontal grid lines
    for (let y = cannonY % screenGridSpacing; y >= 0; y -= screenGridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Draw additional horizontal lines below ground level for visual consistency
    for (let y = cannonY + screenGridSpacing; y < canvas.height; y += screenGridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    ctx.restore();
}

// === RENDERING FUNCTIONS ===
function drawScene() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid background first
    drawGrid();
    
    // Draw ground line
    ctx.strokeStyle = '#4a5d23';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, cannonY);
    ctx.lineTo(canvas.width, cannonY);
    ctx.stroke();
    
    // Draw cannon
    drawCannon();
    
    // Draw trajectory
    drawTrajectory();
    
    // Draw projectile
    if (isFlying) {
        drawProjectile();
    }
    
    // Draw markers
    drawMarkers();
}

function drawCannon() {
    ctx.save();
    ctx.translate(cannonX, cannonY);
    
    // Cannon base
    ctx.fillStyle = '#444';
    ctx.fillRect(-15 * scale, -10 * scale, 30 * scale, 20 * scale);
    
    // Cannon barrel
    ctx.save();
    ctx.rotate(-(angle * Math.PI) / 180);
    ctx.fillStyle = '#666';
    ctx.fillRect(0, -5 * scale, 40 * scale, 10 * scale);
    ctx.restore();
    
    ctx.restore();
}

function drawTrajectory() {
    if (trajectoryPoints.length < 2) return;
    
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    
    for (let i = 0; i < trajectoryPoints.length; i++) {
        const point = trajectoryPoints[i];
        const screenX = cannonX + point.x * scale;
        const screenY = cannonY - point.y * scale;
        
        if (i === 0) {
            ctx.moveTo(screenX, screenY);
        } else {
            ctx.lineTo(screenX, screenY);
        }
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawProjectile() {
    const screenX = cannonX + x * scale;
    const screenY = cannonY - y * scale;
    
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(screenX, screenY, 6 * scale, 0, 2 * Math.PI);
    ctx.fill();
}

function drawMarkers() {
    if (maxHeight > 0) {
        // Max height marker
        const maxHeightScreenX = cannonX + distanceToMaxHeight * scale;
        const maxHeightScreenY = cannonY - maxHeight * scale;
        
        // Flag at max height
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(maxHeightScreenX - 2, maxHeightScreenY - 15 * scale, 4, 15 * scale);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(maxHeightScreenX, maxHeightScreenY - 15 * scale, 12 * scale, 8 * scale);
        
        // Vertical line to ground
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(maxHeightScreenX, maxHeightScreenY);
        ctx.lineTo(maxHeightScreenX, cannonY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Max height label
        ctx.fillStyle = '#000';
        ctx.font = `${10 * scale}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText('Max Height', maxHeightScreenX, cannonY + 20 * scale);
    }
    
    if (totalRange > 0) {
        // Landing point marker
        const landingScreenX = cannonX + totalRange * scale;
        
        ctx.fillStyle = '#0066cc';
        ctx.beginPath();
        ctx.arc(landingScreenX, cannonY, 5 * scale, 0, 2 * Math.PI);
        ctx.fill();
        
        // Landing point label
        ctx.fillStyle = '#000';
        ctx.font = `${10 * scale}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText('Landing', landingScreenX, cannonY + 20 * scale);
    }
}

// === DATA DISPLAY UPDATE ===
function updateDataDisplay() {
    document.getElementById('max-height-data').textContent = maxHeight.toFixed(1) + ' m';
    document.getElementById('distance-to-peak-data').textContent = distanceToMaxHeight.toFixed(1) + ' m';
    document.getElementById('distance-from-peak-data').textContent = distanceFromMaxHeightToLanding.toFixed(1) + ' m';
    document.getElementById('total-range-data').textContent = totalRange.toFixed(1) + ' m';
    document.getElementById('flight-time-data').textContent = flightTime.toFixed(1) + ' s';
}