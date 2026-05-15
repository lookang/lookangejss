// Global variables for application state
let currentAngle = 0;
let isRadians = false;
let interactionCount = 0;
let quadrantsVisited = new Set();
let specialAnglesVisited = new Set();
let startTime = Date.now();

// Special angles for tracking (in degrees)
const specialAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

// DOM elements
const angleSlider = document.getElementById('angleSlider');
const angleValue = document.getElementById('angleValue');
const radiusLine = document.getElementById('radiusLine');
const circlePoint = document.getElementById('circlePoint');
const angleArc = document.getElementById('angleArc');
const xCoordLine = document.getElementById('xCoordLine');
const yCoordLine = document.getElementById('yCoordLine');
const coordText = document.getElementById('coordText');
const cosValue = document.getElementById('cosValue');
const sinValue = document.getElementById('sinValue');
const tanValue = document.getElementById('tanValue');
const gridGroup = document.getElementById('gridGroup');
const tooltip = document.getElementById('tooltip');

// Initialize the application
function init() {
    setupEventListeners();
    createGrid();
    updateVisualization();
    updateAnalytics();
    
    // Start time tracking
    setInterval(updateTimeSpent, 1000);
}

// Set up all event listeners for user interactions
function setupEventListeners() {
    // Angle slider interaction
    angleSlider.addEventListener('input', handleAngleChange);
    angleSlider.addEventListener('touchstart', handleTouchStart, { passive: false });
    angleSlider.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Unit selection (degrees/radians)
    document.querySelectorAll('input[name="unit"]').forEach(radio => {
        radio.addEventListener('change', handleUnitChange);
    });
    
    // Display options checkboxes
    document.getElementById('showGrid').addEventListener('change', toggleGrid);
    document.getElementById('showArc').addEventListener('change', toggleArc);
    document.getElementById('showCoords').addEventListener('change', toggleCoordinates);
    
    // Quick angle buttons
    document.querySelectorAll('.angle-btn').forEach(btn => {
        btn.addEventListener('click', handleAngleButtonClick);
        btn.addEventListener('touchstart', handleTouchStart, { passive: false });
    });
    
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetToDefault);
    
    // Tooltip functionality
    document.querySelectorAll('[title]').forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
        element.addEventListener('mousemove', moveTooltip);
    });
}

// Handle angle slider changes
function handleAngleChange(event) {
    currentAngle = parseInt(event.target.value);
    updateVisualization();
    trackInteraction();
    trackQuadrant();
    trackSpecialAngle();
}

// Handle touch events for mobile compatibility
function handleTouchStart(event) {
    event.preventDefault();
    trackInteraction();
}

function handleTouchMove(event) {
    event.preventDefault();
}

// Handle unit change between degrees and radians
function handleUnitChange(event) {
    isRadians = event.target.value === 'radians';
    updateAngleDisplay();
    trackInteraction();
}

// Handle quick angle button clicks
function handleAngleButtonClick(event) {
    const angle = parseInt(event.target.dataset.angle);
    currentAngle = angle;
    angleSlider.value = angle;
    updateVisualization();
    trackInteraction();
    trackQuadrant();
    trackSpecialAngle();
    
    // Visual feedback
    event.target.classList.add('highlight');
    setTimeout(() => event.target.classList.remove('highlight'), 500);
}

// Toggle grid display
function toggleGrid() {
    const showGrid = document.getElementById('showGrid').checked;
    gridGroup.style.display = showGrid ? 'block' : 'none';
    trackInteraction();
}

// Toggle angle arc display
function toggleArc() {
    const showArc = document.getElementById('showArc').checked;
    angleArc.style.display = showArc ? 'block' : 'none';
    trackInteraction();
}

// Toggle coordinate lines display
function toggleCoordinates() {
    const showCoords = document.getElementById('showCoords').checked;
    xCoordLine.style.display = showCoords ? 'block' : 'none';
    yCoordLine.style.display = showCoords ? 'block' : 'none';
    coordText.style.display = showCoords ? 'block' : 'none';
    trackInteraction();
}

// Reset all values to default
function resetToDefault() {
    currentAngle = 0;
    angleSlider.value = 0;
    document.querySelector('input[value="degrees"]').checked = true;
    isRadians = false;
    document.getElementById('showGrid').checked = true;
    document.getElementById('showArc').checked = true;
    document.getElementById('showCoords').checked = true;
    
    // Reset display elements
    gridGroup.style.display = 'block';
    angleArc.style.display = 'block';
    xCoordLine.style.display = 'block';
    yCoordLine.style.display = 'block';
    coordText.style.display = 'block';
    
    updateVisualization();
    trackInteraction();
}

// Create grid lines for the unit circle
function createGrid() {
    gridGroup.innerHTML = '';
    
    // Create grid lines every 30 degrees
    for (let i = 0; i < 12; i++) {
        const angle = i * 30;
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * 120;
        const y = -Math.sin(radian) * 120; // Negative for SVG coordinate system
        
        const line = document.createElementNS('vendor/external_0.txt', 'line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', '0');
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#e0e0e0');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-dasharray', '2,2');
        
        gridGroup.appendChild(line);
    }
    
    // Create concentric circles
    for (let r = 50; r <= 100; r += 50) {
        const circle = document.createElementNS('vendor/external_0.txt', 'circle');
        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', r);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', '#e0e0e0');
        circle.setAttribute('stroke-width', '1');
        circle.setAttribute('stroke-dasharray', '2,2');
        
        gridGroup.appendChild(circle);
    }
}

// Main visualization update function
function updateVisualization() {
    const radian = (currentAngle * Math.PI) / 180;
    const cos = Math.cos(radian);
    const sin = Math.sin(radian);
    const tan = Math.tan(radian);
    
    // Calculate positions (SVG uses inverted Y-axis)
    const x = cos * 100;
    const y = -sin * 100;
    
    // Update radius line
    radiusLine.setAttribute('x2', x);
    radiusLine.setAttribute('y2', y);
    
    // Update point on circle
    circlePoint.setAttribute('cx', x);
    circlePoint.setAttribute('cy', y);
    
    // Update coordinate lines
    xCoordLine.setAttribute('x1', x);
    xCoordLine.setAttribute('y1', y);
    xCoordLine.setAttribute('x2', x);
    xCoordLine.setAttribute('y2', '0');
    
    yCoordLine.setAttribute('x1', x);
    yCoordLine.setAttribute('y1', y);
    yCoordLine.setAttribute('x2', '0');
    yCoordLine.setAttribute('y2', y);
    
    // Update coordinate text
    coordText.setAttribute('x', x + 10);
    coordText.setAttribute('y', y - 10);
    coordText.textContent = `(${cos.toFixed(3)}, ${sin.toFixed(3)})`;
    
    // Update angle arc
    updateAngleArc(radian);
    
    // Update trigonometric values
    cosValue.textContent = cos.toFixed(3);
    sinValue.textContent = sin.toFixed(3);
    
    // Enhanced tangent calculation with improved infinity detection
    // Check for angles where tangent is undefined (90° and 270° or π/2 and 3π/2 radians)
    const normalizedAngle = currentAngle % 360;
    if (normalizedAngle === 90 || normalizedAngle === 270) {
        tanValue.textContent = '∞';
    } else if (Math.abs(tan) > 1000) {
        // For very large tangent values (approaching infinity), display infinity symbol
        tanValue.textContent = '∞';
    } else if (!isFinite(tan)) {
        // For any other non-finite values
        tanValue.textContent = '∞';
    } else {
        tanValue.textContent = tan.toFixed(3);
    }
    
    // Update angle display
    updateAngleDisplay();
    
    // Color coding based on quadrant
    updateQuadrantColors(currentAngle);
}

// Update angle arc visualization
function updateAngleArc(radian) {
    const radius = 30;
    const largeArcFlag = radian > Math.PI ? 1 : 0;
    const x = Math.cos(radian) * radius;
    const y = -Math.sin(radian) * radius;
    
    const pathData = `M ${radius} 0 A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x} ${y}`;
    angleArc.setAttribute('d', pathData);
}

// Update angle display based on current unit
function updateAngleDisplay() {
    if (isRadians) {
        const radianValue = (currentAngle * Math.PI) / 180;
        angleValue.textContent = `${radianValue.toFixed(3)} rad`;
    } else {
        angleValue.textContent = `${currentAngle}°`;
    }
}

// Update colors based on quadrant
function updateQuadrantColors(angle) {
    let color = '#4ecdc4'; // Default color
    
    if (angle >= 0 && angle < 90) {
        color = '#4ecdc4'; // Quadrant I - teal
    } else if (angle >= 90 && angle < 180) {
        color = '#45b7b8'; // Quadrant II - darker teal
    } else if (angle >= 180 && angle < 270) {
        color = '#ff9f43'; // Quadrant III - orange
    } else if (angle >= 270 && angle < 360) {
        color = '#ff6b6b'; // Quadrant IV - red
    }
    
    radiusLine.setAttribute('stroke', color);
    circlePoint.setAttribute('fill', color);
}

// Analytics tracking functions
function trackInteraction() {
    interactionCount++;
    updateAnalytics();
}

function trackQuadrant() {
    const quadrant = Math.floor(currentAngle / 90) + 1;
    quadrantsVisited.add(quadrant > 4 ? 4 : quadrant);
    updateAnalytics();
}

function trackSpecialAngle() {
    const normalizedAngle = currentAngle % 360;
    if (specialAngles.includes(normalizedAngle)) {
        specialAnglesVisited.add(normalizedAngle);
    }
    updateAnalytics();
}

function updateTimeSpent() {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timeSpent').textContent = `${timeSpent}s`;
}

function updateAnalytics() {
    document.getElementById('interactionCount').textContent = interactionCount;
    document.getElementById('quadrantsExplored').textContent = `${quadrantsVisited.size}/4`;
    document.getElementById('specialAngles').textContent = `${specialAnglesVisited.size}/16`;
}

// Tooltip functionality
function showTooltip(event) {
    const title = event.target.getAttribute('title');
    if (title) {
        tooltip.textContent = title;
        tooltip.classList.add('show');
        moveTooltip(event);
    }
}

function hideTooltip() {
    tooltip.classList.remove('show');
}

function moveTooltip(event) {
    const rect = document.body.getBoundingClientRect();
    tooltip.style.left = `${event.clientX - rect.left + 10}px`;
    tooltip.style.top = `${event.clientY - rect.top - 30}px`;
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    updateVisualization();
});

// Prevent context menu on touch devices for better UX
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.angle-btn') || e.target.closest('#angleSlider')) {
        e.preventDefault();
    }
});

// Add keyboard support for accessibility
document.addEventListener('keydown', (event) => {
    if (event.target === angleSlider) {
        // Allow arrow keys to work with slider
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            setTimeout(() => {
                currentAngle = parseInt(angleSlider.value);
                updateVisualization();
                trackInteraction();
                trackQuadrant();
                trackSpecialAngle();
            }, 0);
        }
    }
});