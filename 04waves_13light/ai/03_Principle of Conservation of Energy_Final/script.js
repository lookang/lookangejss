// Constants
const MASS = 1; // kg
const GRAVITY = 10; // m/s²
const DEFAULT_HEIGHT = 30; // m
const MIN_HEIGHT = 20; // m
const MAX_HEIGHT = 50; // m

// DOM elements
const heightSlider = document.getElementById('height-slider');
const heightValue = document.getElementById('height-value');
const currentHeight = document.getElementById('current-height');
const ball = document.getElementById('ball');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const keValue = document.getElementById('ke-value');
const gpeValue = document.getElementById('gpe-value');
const teValue = document.getElementById('te-value');
const canvas = document.getElementById('energy-graph');
const ctx = canvas.getContext('2d');
// Added height arrow element
const heightArrow = document.getElementById('height-arrow');
// Added axis scales container
const axisScales = document.getElementById('axis-scales');

// Animation variables
let animationId = null;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let initialHeight = DEFAULT_HEIGHT;
let currentBallHeight = DEFAULT_HEIGHT;
let velocity = 0;
let dataPoints = [];
// Added flag to track if ball has touched the floor
let ballTouchedFloor = false;
// Added variable to store the time when animation was paused
let pausedTime = 0;
// Store initial total energy for comparison
let initialTotalEnergy = 0;

// Initialize the simulation
function init() {
    // Set initial values
    heightSlider.value = DEFAULT_HEIGHT;
    // Round initial height to nearest whole number
    heightValue.textContent = Math.round(DEFAULT_HEIGHT);
    currentHeight.textContent = Math.round(DEFAULT_HEIGHT);
    
    // Position the ball at the initial height
    updateBallPosition(DEFAULT_HEIGHT);
    
    // Calculate and display initial energy values
    updateEnergyValues(DEFAULT_HEIGHT, 0);
    
    // Store initial total energy
    initialTotalEnergy = MASS * GRAVITY * DEFAULT_HEIGHT;
    
    // Draw the initial graph
    setupGraph();
    
    // Event listeners
    heightSlider.addEventListener('input', handleHeightChange);
    startStopBtn.addEventListener('click', toggleAnimation);
    resetBtn.addEventListener('click', resetSimulation);
}

// Handle height slider change
function handleHeightChange() {
    // Modified to ensure height is in steps of 5
    initialHeight = parseInt(heightSlider.value);
    // Round height to nearest whole number
    heightValue.textContent = Math.round(initialHeight);
    
    // Only update if animation is not running
    if (!isRunning) {
        currentBallHeight = initialHeight;
        // Round current height to nearest whole number
        currentHeight.textContent = Math.round(initialHeight);
        updateBallPosition(initialHeight);
        updateEnergyValues(initialHeight, 0);
        resetGraph();
        // Reset the ball touched floor flag when changing height
        ballTouchedFloor = false;
        
        // Update initial total energy when height changes
        initialTotalEnergy = MASS * GRAVITY * initialHeight;
    }
}

// Toggle animation start/stop
function toggleAnimation() {
    if (isRunning) {
        // Pause the animation
        cancelAnimationFrame(animationId);
        isRunning = false;
        // Store the time when animation was paused
        pausedTime = elapsedTime;
    } else {
        // If the ball has reached the floor and we're trying to start again, reset first
        if (currentBallHeight <= 0 || ballTouchedFloor) {
            resetSimulation();
        }
        
        // Start or resume the animation
        if (startTime === 0) {
            // First time starting
            startTime = performance.now();
            dataPoints = [];
        } else {
            // When resuming, adjust the start time to continue from where we paused
            // This ensures the elapsed time calculation continues correctly
            startTime = performance.now() - pausedTime * 1000;
        }
        
        isRunning = true;
        animateSimulation();
    }
}

// Reset the simulation
function resetSimulation() {
    // Stop any running animation
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // Reset variables
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    pausedTime = 0; // Reset the paused time
    currentBallHeight = initialHeight;
    velocity = 0;
    dataPoints = [];
    // Reset the ball touched floor flag
    ballTouchedFloor = false;
    
    // Update UI
    // Round current height to nearest whole number
    currentHeight.textContent = Math.round(initialHeight);
    updateBallPosition(initialHeight);
    updateEnergyValues(initialHeight, 0);
    resetGraph();
    
    // Reset initial total energy
    initialTotalEnergy = MASS * GRAVITY * initialHeight;
}

// Main animation function
function animateSimulation() {
    const now = performance.now();
    elapsedTime = (now - startTime) / 1000; // Convert to seconds
    
    // If ball has already touched floor, don't update position
    if (!ballTouchedFloor) {
        // Calculate new height based on physics (s = ut + 0.5at²)
        // For free fall, u = 0, a = g
        const displacement = 0.5 * GRAVITY * Math.pow(elapsedTime, 2);
        currentBallHeight = initialHeight - displacement;
        
        // Calculate velocity (v = u + at)
        // For free fall, u = 0, a = g
        velocity = GRAVITY * elapsedTime;
        
        // Check if the ball has reached the floor
        if (currentBallHeight <= 0) {
            currentBallHeight = 0;
            // Stop the animation when ball reaches the floor
            isRunning = false;
            // Set flag that ball has touched the floor
            ballTouchedFloor = true;
            
            // Calculate final energy values to ensure total energy conservation
            // At the bottom, all energy should be kinetic
            const finalKE = initialTotalEnergy;
            const finalPE = 0;
            
            // Update energy values with conserved total energy
            keValue.textContent = `${Math.round(finalKE)} J`;
            gpeValue.textContent = `${Math.round(finalPE)} J`;
            teValue.textContent = `${Math.round(initialTotalEnergy)} J`;
            
            // Add final data point to ensure graph shows complete energy transfer
            dataPoints.push({
                time: elapsedTime,
                ke: finalKE,
                pe: finalPE,
                te: initialTotalEnergy // Add total energy to data point
            });
            
            // Update graph one last time
            updateGraph();
            
            // Cancel animation frame
            cancelAnimationFrame(animationId);
            return;
        }
        
        // Update UI
        // Round current height to nearest whole number
        currentHeight.textContent = Math.round(currentBallHeight);
        updateBallPosition(currentBallHeight);
        updateEnergyValues(currentBallHeight, velocity);
    }
    
    // Add data point for the graph
    if (isRunning) {
        const ke = calculateKineticEnergy(velocity);
        const pe = calculatePotentialEnergy(currentBallHeight);
        dataPoints.push({
            time: elapsedTime,
            ke: ke,
            pe: pe,
            te: ke + pe // Add total energy to data point
        });
        updateGraph();
    }
    
    // Continue animation if still running
    if (isRunning) {
        animationId = requestAnimationFrame(animateSimulation);
    }
}

// Update the ball's position on screen
function updateBallPosition(height) {
    // Convert height to pixel position (inverted, since 0 is at the top in CSS)
    const containerHeight = ball.parentElement.clientHeight;
    const floorHeight = 2; // Height of the floor element
    const ballDiameter = ball.clientHeight;
    
    // Map height from [0, MAX_HEIGHT] to [containerHeight - floorHeight - ballDiameter, 0]
    const pixelPosition = containerHeight - floorHeight - ballDiameter - 
                         (height / MAX_HEIGHT) * (containerHeight - floorHeight - ballDiameter);
    
    ball.style.top = `${pixelPosition}px`;
    
    // Update height arrow
    const arrowHeight = (height / MAX_HEIGHT) * (containerHeight - floorHeight - ballDiameter);
    heightArrow.style.height = `${arrowHeight}px`;
}

// Calculate and update energy values
function updateEnergyValues(height, velocity) {
    const ke = calculateKineticEnergy(velocity);
    const pe = calculatePotentialEnergy(height);
    const te = ke + pe;
    
    // Round values to nearest whole number
    keValue.textContent = `${Math.round(ke)} J`;
    gpeValue.textContent = `${Math.round(pe)} J`;
    teValue.textContent = `${Math.round(te)} J`;
}

// Calculate kinetic energy: KE = 0.5 * m * v²
function calculateKineticEnergy(velocity) {
    return 0.5 * MASS * Math.pow(velocity, 2);
}

// Calculate potential energy: PE = m * g * h
function calculatePotentialEnergy(height) {
    return MASS * GRAVITY * Math.max(0, height);
}

// Set up the graph
function setupGraph() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    drawGrid();
    
    // Draw thicker axes with arrows
    drawAxes();
    
    // Add scale markers
    addScaleMarkers();
}

// Draw grid on the graph
function drawGrid() {
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.5;
    
    // Draw vertical grid lines
    for (let x = 0; x <= width; x += width / 10) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Draw horizontal grid lines
    for (let y = 0; y <= height; y += height / 10) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

// Draw thicker axes with arrows
function drawAxes() {
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    
    // Draw x-axis (bottom) with arrow
    ctx.beginPath();
    ctx.moveTo(0, height - 20); // Moved up to avoid overlap with label
    ctx.lineTo(width - 10, height - 20);
    ctx.stroke();
    
    // Draw x-axis arrow (pointing right)
    ctx.beginPath();
    ctx.moveTo(width - 10, height - 20);
    ctx.lineTo(width - 20, height - 25);
    ctx.lineTo(width - 20, height - 15);
    ctx.closePath();
    ctx.fillStyle = '#000';
    ctx.fill();
    
    // Draw y-axis (left) with arrow
    ctx.beginPath();
    ctx.moveTo(40, height); // Moved right to avoid overlap with label and scale
    ctx.lineTo(40, 10);
    ctx.stroke();
    
    // Draw y-axis arrow (pointing up)
    ctx.beginPath();
    ctx.moveTo(40, 10);
    ctx.lineTo(35, 20);
    ctx.lineTo(45, 20);
    ctx.closePath();
    ctx.fillStyle = '#000';
    ctx.fill();
}

// Add scale markers to the axes
function addScaleMarkers() {
    // Clear previous scale markers
    axisScales.innerHTML = '';
    
    const width = canvas.width;
    const height = canvas.height;
    const maxTime = Math.sqrt(2 * initialHeight / GRAVITY) * 1.1; // Theoretical time to fall + 10% margin
    const maxEnergy = MASS * GRAVITY * initialHeight * 1.1; // Maximum total energy + 10% margin
    
    // Add time scale markers (x-axis)
    for (let i = 0; i <= 5; i++) {
        const timeValue = (maxTime * i / 5).toFixed(1);
        const xPos = 40 + ((i / 5) * (width - 50)); // Adjusted to avoid overlap with y-axis
        
        const timeMarker = document.createElement('div');
        timeMarker.className = 'scale-marker';
        timeMarker.style.bottom = '5px';
        timeMarker.style.left = `${xPos}px`;
        timeMarker.textContent = `${timeValue}s`;
        axisScales.appendChild(timeMarker);
    }
    
    // Add energy scale markers (y-axis)
    for (let i = 0; i <= 5; i++) {
        const energyValue = Math.round(maxEnergy * i / 5);
        const yPos = (height - 20) - ((i / 5) * (height - 30));
        
        const energyMarker = document.createElement('div');
        energyMarker.className = 'scale-marker';
        energyMarker.style.left = '5px';
        energyMarker.style.top = `${yPos}px`;
        energyMarker.textContent = `${energyValue}J`;
        axisScales.appendChild(energyMarker);
    }
}

// Reset the graph
function resetGraph() {
    dataPoints = [];
    setupGraph();
}

// Update the graph with new data points
function updateGraph() {
    // Clear the canvas and redraw grid and axes
    setupGraph();
    
    if (dataPoints.length < 2) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const maxTime = Math.sqrt(2 * initialHeight / GRAVITY) * 1.1; // Theoretical time to fall + 10% margin
    const maxEnergy = MASS * GRAVITY * initialHeight * 1.1; // Maximum total energy + 10% margin
    
    // Draw KE line (red)
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    dataPoints.forEach((point, index) => {
        // Adjust x to account for y-axis offset
        const x = 40 + ((point.time / maxTime) * (width - 50)); // Adjusted to avoid overlap
        // Adjust y to account for x-axis offset
        const y = (height - 20) - ((point.ke / maxEnergy) * (height - 30));
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw PE line (blue)
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    
    dataPoints.forEach((point, index) => {
        // Adjust x to account for y-axis offset
        const x = 40 + ((point.time / maxTime) * (width - 50)); // Adjusted to avoid overlap
        // Adjust y to account for x-axis offset
        const y = (height - 20) - ((point.pe / maxEnergy) * (height - 30));
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw TE line (green) - Added as requested
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    
    dataPoints.forEach((point, index) => {
        // Adjust x to account for y-axis offset
        const x = 40 + ((point.time / maxTime) * (width - 50)); // Adjusted to avoid overlap
        // Adjust y to account for x-axis offset
        const y = (height - 20) - ((point.te / maxEnergy) * (height - 30));
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
}

// Initialize the simulation when the page loads
window.addEventListener('load', init);