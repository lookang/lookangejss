// Global variables for the unit circle interactive
let canvas, ctx;
let currentAngle = 0;
let startTime = Date.now();
let actionLog = [];
let animationId;

// Mathematical constants
const CANVAS_SIZE = 300;
const CIRCLE_RADIUS = 120;
const CENTER_X = CANVAS_SIZE / 2;
const CENTER_Y = CANVAS_SIZE / 2;

// Initialize the interactive when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCanvas();
    setupEventListeners();
    updateDisplay();
    startSessionTimer();
    logAction('🚀 Session started', 'Interactive loaded');
});

/**
 * Initialize the canvas and drawing context
 */
function initializeCanvas() {
    canvas = document.getElementById('unit-circle');
    ctx = canvas.getContext('2d');
    
    // Set up high DPI support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;
    canvas.style.width = CANVAS_SIZE + 'px';
    canvas.style.height = CANVAS_SIZE + 'px';
    
    ctx.scale(dpr, dpr);
    
    // Enable touch events for mobile
    canvas.addEventListener('touchstart', handleCanvasTouch, { passive: false });
    canvas.addEventListener('touchmove', handleCanvasTouch, { passive: false });
    canvas.addEventListener('click', handleCanvasClick);
}

/**
 * Set up all event listeners for interactive elements
 */
function setupEventListeners() {
    // Angle slider
    const angleSlider = document.getElementById('angle-slider');
    angleSlider.addEventListener('input', function(e) {
        currentAngle = parseInt(e.target.value);
        updateDisplay();
        logAction('🎚️ Slider moved', `Angle set to ${currentAngle}°`);
    });
    
    // Quick angle buttons
    document.querySelectorAll('.angle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const angle = parseInt(this.dataset.angle);
            setAngle(angle);
            logAction('🎯 Quick angle', `Set to ${angle}°`);
        });
    });
    
    // Display option checkboxes
    document.getElementById('show-coordinates').addEventListener('change', function() {
        updateDisplay();
        logAction('👁️ Toggle coordinates', this.checked ? 'Shown' : 'Hidden');
    });
    
    document.getElementById('show-triangle').addEventListener('change', function() {
        updateDisplay();
        logAction('📐 Toggle triangle', this.checked ? 'Shown' : 'Hidden');
    });
    
    document.getElementById('show-grid').addEventListener('change', function() {
        updateDisplay();
        logAction('📊 Toggle grid', this.checked ? 'Shown' : 'Hidden');
    });
    
    // Reset button
    document.getElementById('reset-btn').addEventListener('click', function() {
        resetToDefault();
        logAction('🔄 Reset', 'All values reset to default');
    });
    
    // Analytics panel toggle
    document.getElementById('toggle-analytics').addEventListener('click', toggleAnalytics);
    document.getElementById('analytics-header').addEventListener('click', toggleAnalytics);
    
    // Clear log button
    document.getElementById('clear-log').addEventListener('click', function() {
        clearActionLog();
        logAction('🗑️ Log cleared', 'Action history reset');
    });
}

/**
 * Handle touch events on canvas for mobile interaction
 */
function handleCanvasTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    updateAngleFromPoint(x, y);
}

/**
 * Handle mouse clicks on canvas
 */
function handleCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    updateAngleFromPoint(x, y);
}

/**
 * Update angle based on clicked/touched point on canvas
 */
function updateAngleFromPoint(x, y) {
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    
    const deltaX = x - centerX;
    const deltaY = centerY - y; // Flip Y coordinate
    
    let angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    if (angle < 0) angle += 360;

    // Use mathematical convention: positive anticlockwise from +x
    setAngle(Math.round(angle));
    logAction('👆 Canvas click', `Angle set to ${Math.round(angle)}°`);
}

/**
 * Set the current angle and update all displays
 */
function setAngle(angle) {
    currentAngle = angle;
    document.getElementById('angle-slider').value = angle;
    updateDisplay();
}

/**
 * Reset all values to default state
 */
function resetToDefault() {
    currentAngle = 0;
    document.getElementById('angle-slider').value = 0;
    document.getElementById('show-coordinates').checked = true;
    document.getElementById('show-triangle').checked = true;
    document.getElementById('show-grid').checked = true;
    updateDisplay();
}

/**
 * Main display update function - redraws canvas and updates values
 */
function updateDisplay() {
    drawUnitCircle();
    updateTrigValues();
    updateAngleDisplay();
}

/**
 * Draw the complete unit circle with all visual elements
 */
function drawUnitCircle() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw grid if enabled
    if (document.getElementById('show-grid').checked) {
        drawGrid();
    }
    
    // Draw axes
    drawAxes();
    
    // Draw unit circle
    ctx.beginPath();
    ctx.arc(CENTER_X, CENTER_Y, CIRCLE_RADIUS, 0, 2 * Math.PI);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Calculate current point
    // Use mathematical convention (anticlockwise positive) for point location
    const radians = currentAngle * Math.PI / 180;
    const x = CENTER_X + CIRCLE_RADIUS * Math.cos(radians);
    const y = CENTER_Y - CIRCLE_RADIUS * Math.sin(radians); // Flip Y for screen coordinates
    
    // Draw angle arc (anticlockwise from +x)
    drawAngleArc(radians);
    
    // Draw reference triangle if enabled
    if (document.getElementById('show-triangle').checked) {
        drawReferenceTriangle(x, y);
    }
    
    // Draw radius line
    ctx.beginPath();
    ctx.moveTo(CENTER_X, CENTER_Y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw point on circle
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw coordinates if enabled
    if (document.getElementById('show-coordinates').checked) {
        drawCoordinateLabels(x, y);
    }
    
    // Draw angle labels
    drawAngleLabels();

    // HUD: show slider angle clearly on canvas
    drawAngleHUD();
}

/**
 * Draw grid lines for reference
 */
function drawGrid() {
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let i = 0; i <= CANVAS_SIZE; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, CANVAS_SIZE);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let i = 0; i <= CANVAS_SIZE; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(CANVAS_SIZE, i);
        ctx.stroke();
    }
}

/**
 * Draw X and Y axes
 */
function drawAxes() {
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, CENTER_Y);
    ctx.lineTo(CANVAS_SIZE, CENTER_Y);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(CENTER_X, 0);
    ctx.lineTo(CENTER_X, CANVAS_SIZE);
    ctx.stroke();
    
    // Axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis labels
    ctx.fillText('1', CENTER_X + CIRCLE_RADIUS + 10, CENTER_Y + 5);
    ctx.fillText('-1', CENTER_X - CIRCLE_RADIUS - 10, CENTER_Y + 5);
    
    // Y-axis labels
    ctx.fillText('1', CENTER_X + 5, CENTER_Y - CIRCLE_RADIUS - 5);
    ctx.fillText('-1', CENTER_X + 5, CENTER_Y + CIRCLE_RADIUS + 15);
}

/**
 * Draw the angle arc from 0° to current angle
 */
function drawAngleArc(radians) {
    // Normalize sweep to [0, 2π) using mathematical (anticlockwise) angle
    let sweep = radians % (2 * Math.PI);
    if (sweep < 0) sweep += 2 * Math.PI;
    if (sweep < 0.01) return; // Don't draw for very small angles

    // Render mathematical CCW arc: draw from +x to the radius with SWEEP length.
    // On canvas, set end angle = -sweep and anticlockwise = true to avoid wrapping (prevents 360-θ).
    // This draws the shorter path starting at +x and ending at the radius tip.
    ctx.beginPath();
    ctx.arc(CENTER_X, CENTER_Y, 30, 0, -sweep, true);
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw small start/end markers to clarify arc endpoints
    // Start marker at +x axis
    ctx.beginPath();
    ctx.arc(CENTER_X + 30, CENTER_Y, 2.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#2c3e50';
    ctx.fill();

    // End marker at the arc end (screen angle = -sweep)
    const endX = CENTER_X + 30 * Math.cos(-sweep);
    const endY = CENTER_Y + 30 * Math.sin(-sweep); // screen Y positive downward
    ctx.beginPath();
    ctx.arc(endX, endY, 2.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#2c3e50';
    ctx.fill();

    // Label with the slider angle value at arc midpoint (math coords, flip Y)
    const labelRadius = 40;
    const mid = sweep / 2;
    const labelX = CENTER_X + labelRadius * Math.cos(mid);
    const labelY = CENTER_Y - labelRadius * Math.sin(mid);

    ctx.fillStyle = '#3498db';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${currentAngle}°`, labelX, labelY + 4);
}

/**
 * Draw the reference triangle showing sin, cos, and tan
 */
function drawReferenceTriangle(pointX, pointY) {
    ctx.strokeStyle = '#27ae60';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    // Vertical line (sin)
    ctx.beginPath();
    ctx.moveTo(pointX, CENTER_Y);
    ctx.lineTo(pointX, pointY);
    ctx.stroke();
    
    // Horizontal line (cos)
    ctx.beginPath();
    ctx.moveTo(CENTER_X, CENTER_Y);
    ctx.lineTo(pointX, CENTER_Y);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // Labels for sin and cos
    ctx.fillStyle = '#27ae60';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    
    // Sin label
    const sinLabelX = pointX + (pointX > CENTER_X ? 15 : -15);
    const sinLabelY = (CENTER_Y + pointY) / 2;
    ctx.fillText('sin θ', sinLabelX, sinLabelY);
    
    // Cos label
    const cosLabelX = (CENTER_X + pointX) / 2;
    const cosLabelY = CENTER_Y + (CENTER_Y > pointY ? -10 : 20);
    ctx.fillText('cos θ', cosLabelX, cosLabelY);
}

/**
 * Draw coordinate labels for the current point
 */
function drawCoordinateLabels(pointX, pointY) {
    // Use mathematical (anticlockwise) convention for coordinate display
    const radians = currentAngle * Math.PI / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    
    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'center';
    
    const labelX = pointX + (pointX > CENTER_X ? 20 : -20);
    const labelY = pointY + (pointY > CENTER_Y ? 20 : -10);
    
    ctx.fillText(`(${cos.toFixed(2)}, ${sin.toFixed(2)})`, labelX, labelY);
}

/**
 * Draw common angle labels around the circle
 */
function drawAngleLabels() {
    // Degree ticks increasing ANTICLOCKWISE from +x (mathematical convention)
    const commonAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
    
    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    
    commonAngles.forEach(angle => {
        const radians = angle * Math.PI / 180;
        const labelRadius = CIRCLE_RADIUS + 20;
        const x = CENTER_X + labelRadius * Math.cos(radians);
        const y = CENTER_Y - labelRadius * Math.sin(radians) + 3; // flip Y for screen
        
        ctx.fillText(`${angle}°`, x, y);
    });
}

// Heads-up angle display inside canvas
function drawAngleHUD() {
    ctx.save();
    ctx.fillStyle = '#111';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`θ = ${currentAngle}°`, 8, 8);
    ctx.restore();
}

/**
 * Update trigonometric values display
 */
function updateTrigValues() {
    // Use mathematical (anticlockwise) convention for trig values
    const radians = currentAngle * Math.PI / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const tan = Math.tan(radians);
    
    document.getElementById('sin-value').textContent = sin.toFixed(3);
    document.getElementById('cos-value').textContent = cos.toFixed(3);
    
    // Handle special cases for tan
    if (Math.abs(cos) < 0.001) {
        document.getElementById('tan-value').textContent = '∞';
    } else {
        document.getElementById('tan-value').textContent = tan.toFixed(3);
    }
    
    // Update coordinates
    document.getElementById('x-coord').textContent = cos.toFixed(3);
    document.getElementById('y-coord').textContent = sin.toFixed(3);
}

/**
 * Update angle display
 */
function updateAngleDisplay() {
    document.getElementById('angle-value').textContent = `${currentAngle}°`;
    document.getElementById('angle-text').textContent = `${currentAngle}°`;
}

/**
 * Toggle analytics panel visibility
 */
function toggleAnalytics() {
    const panel = document.getElementById('analytics-panel');
    panel.classList.toggle('collapsed');
    
    const action = panel.classList.contains('collapsed') ? 'collapsed' : 'expanded';
    logAction('📊 Analytics panel', `Panel ${action}`);
}

/**
 * Log user actions for learning analytics
 */
function logAction(icon, description) {
    const timestamp = Math.round((Date.now() - startTime) / 1000);
    const radians = currentAngle * Math.PI / 180;
    const entry = {
        time: timestamp,
        icon: icon,
        description: description,
        angle: currentAngle,
        sin: Math.sin(radians).toFixed(3),
        cos: Math.cos(radians).toFixed(3)
    };
    
    actionLog.push(entry);
    updateActionLogDisplay();
}

/**
 * Update the action log display
 */
function updateActionLogDisplay() {
    const logContainer = document.getElementById('action-log');
    
    // Keep only last 20 entries to prevent overflow
    if (actionLog.length > 20) {
        actionLog = actionLog.slice(-20);
    }
    
    logContainer.innerHTML = actionLog.map(entry => `
        <div class="log-entry">
            <span class="log-time">t=${entry.time}s</span>
            <span class="log-action">${entry.icon} ${entry.description}</span>
            <span class="log-state">(θ=${entry.angle}°, sin=${entry.sin}, cos=${entry.cos})</span>
        </div>
    `).reverse().join('');
    
    // Auto-scroll to top (most recent)
    logContainer.scrollTop = 0;
}

/**
 * Clear the action log
 */
function clearActionLog() {
    actionLog = [];
    updateActionLogDisplay();
}

/**
 * Start and update session timer
 */
function startSessionTimer() {
    setInterval(() => {
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        document.getElementById('session-time').textContent = `Session: ${elapsed}s`;
    }, 1000);
}

/**
 * Handle window resize to maintain responsiveness
 */
window.addEventListener('resize', function() {
    // Redraw canvas on resize
    setTimeout(updateDisplay, 100);
});

/**
 * Keyboard shortcuts for enhanced accessibility
 */
document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT') return; // Don't interfere with input fields
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            setAngle((currentAngle - 1 + 360) % 360);
            logAction('⌨️ Keyboard', 'Angle decreased by 1°');
            break;
        case 'ArrowRight':
            e.preventDefault();
            setAngle((currentAngle + 1) % 360);
            logAction('⌨️ Keyboard', 'Angle increased by 1°');
            break;
        case 'Home':
            e.preventDefault();
            setAngle(0);
            logAction('⌨️ Keyboard', 'Reset to 0°');
            break;
        case ' ':
            e.preventDefault();
            resetToDefault();
            logAction('⌨️ Keyboard', 'Space bar reset');
            break;
    }
});

// Add tooltip functionality for enhanced user experience
document.addEventListener('mouseover', function(e) {
    const tooltip = document.getElementById('info-tooltip');
    let tooltipText = '';
    
    if (e.target.classList.contains('angle-btn')) {
        tooltipText = `Set angle to ${e.target.dataset.angle}°`;
    } else if (e.target.id === 'angle-slider') {
        tooltipText = 'Drag to change angle (0° to 360°)';
    } else if (e.target.id === 'reset-btn') {
        tooltipText = 'Reset all values to default state';
    }
    
    if (tooltipText) {
        tooltip.textContent = tooltipText;
        tooltip.classList.remove('hidden');
        tooltip.style.left = e.pageX + 10 + 'px';
        tooltip.style.top = e.pageY - 30 + 'px';
    }
});

document.addEventListener('mouseout', function(e) {
    const tooltip = document.getElementById('info-tooltip');
    tooltip.classList.add('hidden');
});

// Initialize performance monitoring
console.log('🎯 Trigonometry Unit Circle Interactive loaded successfully');
console.log('📱 Touch events enabled for mobile devices');
console.log('📊 Learning analytics tracking active');
console.log('⌨️ Keyboard shortcuts: ←/→ (adjust angle), Home (reset), Space (full reset)');
