// ===================================
// GLOBAL VARIABLES & INITIALIZATION
// ===================================

// Canvas and context for drawing
const canvas = document.getElementById('beaker-canvas');
const ctx = canvas.getContext('2d');

// Control elements
const waterTempSlider = document.getElementById('water-temp');
const airTempSlider = document.getElementById('air-temp');
const waterTempValue = document.getElementById('water-temp-value');
const airTempValue = document.getElementById('air-temp-value');
const toggleLabelsBtn = document.getElementById('toggle-labels');
const resetBtn = document.getElementById('reset-btn');
const toggleAnalyticsBtn = document.getElementById('toggle-analytics');
const clearLogBtn = document.getElementById('clear-log-btn');

// Display elements
const explanationPanel = document.getElementById('explanation-panel');
const stateIndicator = document.getElementById('state-indicator');
const explanationText = document.getElementById('explanation-text');
const reflectionPanel = document.getElementById('reflection-panel');
const reflectionQuestions = document.getElementById('reflection-questions');
const analyticsPanel = document.getElementById('analytics-panel');
const actionLog = document.getElementById('action-log');
const tooltip = document.getElementById('tooltip');

// Simulation state
let waterTemp = 30;
let airTemp = 30;
let showLabels = true;
let startTime = Date.now();
let actionCount = 0;

// Beaker dimensions and position (responsive)
let beakerX, beakerY, beakerWidth, beakerHeight, waterLevel, lidY;

// ===================================
// INITIALIZATION
// ===================================

// Check if running in fullscreen mode
if (window.self === window.top) {
    document.body.classList.add('fullscreen');
}

// Initialize canvas size
function initCanvas() {
    const container = document.getElementById('simulation-area');
    const rect = container.getBoundingClientRect();
    canvas.width = Math.min(800, rect.width);
    canvas.height = Math.min(600, rect.height);
    
    // Calculate beaker dimensions based on canvas size
    beakerWidth = canvas.width * 0.3;
    beakerHeight = canvas.height * 0.5;
    beakerX = (canvas.width - beakerWidth) / 2;
    beakerY = canvas.height * 0.3;
    waterLevel = beakerY + beakerHeight * 0.6;
    lidY = beakerY;
}

initCanvas();
window.addEventListener('resize', () => {
    initCanvas();
    updateSimulation();
});

// ===================================
// ANALYTICS & LOGGING FUNCTIONS
// ===================================

function logAction(action, details = '') {
    actionCount++;
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    const timestamp = document.createElement('span');
    timestamp.className = 'log-timestamp';
    timestamp.textContent = `[t=${currentTime}s]`;
    
    const actionText = document.createElement('span');
    actionText.className = 'log-action';
    
    // Determine icon based on action type
    let icon = '📝';
    if (action.includes('Slider')) icon = '🎚️';
    if (action.includes('Reset')) icon = '🔄';
    if (action.includes('Preset')) icon = '⚡';
    if (action.includes('Toggle')) icon = '👁️';
    
    actionText.textContent = `${icon} ${action}`;
    
    const stateText = document.createElement('span');
    stateText.className = 'log-state';
    stateText.textContent = details;
    
    logEntry.appendChild(timestamp);
    logEntry.appendChild(actionText);
    logEntry.appendChild(stateText);
    
    actionLog.insertBefore(logEntry, actionLog.firstChild);
    
    // Auto-scroll to top
    document.getElementById('analytics-content').scrollTop = 0;
}

function clearLog() {
    actionLog.innerHTML = '';
    actionCount = 0;
    startTime = Date.now();
    logAction('Log cleared', 'Analytics reset');
}

// ===================================
// DRAWING FUNCTIONS
// ===================================

function drawBeaker() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw beaker body (glass)
    ctx.strokeStyle = '#4299e1';
    ctx.lineWidth = 4;
    ctx.fillStyle = 'rgba(173, 216, 230, 0.2)';
    
    // Left wall
    ctx.beginPath();
    ctx.moveTo(beakerX, beakerY + 10);
    ctx.lineTo(beakerX, beakerY + beakerHeight);
    ctx.stroke();
    
    // Right wall
    ctx.beginPath();
    ctx.moveTo(beakerX + beakerWidth, beakerY + 10);
    ctx.lineTo(beakerX + beakerWidth, beakerY + beakerHeight);
    ctx.stroke();
    
    // Bottom
    ctx.beginPath();
    ctx.moveTo(beakerX, beakerY + beakerHeight);
    ctx.lineTo(beakerX + beakerWidth, beakerY + beakerHeight);
    ctx.stroke();
    
    // Draw lid
    ctx.strokeStyle = '#2c5282';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(beakerX - 10, lidY);
    ctx.lineTo(beakerX + beakerWidth + 10, lidY);
    ctx.stroke();
    
    // Draw water
    const waterColor = getWaterColor(waterTemp);
    ctx.fillStyle = waterColor;
    ctx.fillRect(beakerX + 4, waterLevel, beakerWidth - 8, beakerY + beakerHeight - waterLevel - 4);
    
    // Draw water surface line
    ctx.strokeStyle = '#2c5282';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(beakerX + 4, waterLevel);
    ctx.lineTo(beakerX + beakerWidth - 4, waterLevel);
    ctx.stroke();
    
    // Draw labels if enabled
    if (showLabels) {
        drawLabels();
    }
}

function getWaterColor(temp) {
    // Color gradient from blue (cold) to red (hot)
    if (temp < 25) {
        return `rgba(0, 100, 255, 0.6)`;
    } else if (temp < 50) {
        return `rgba(100, 150, 255, 0.6)`;
    } else if (temp < 75) {
        return `rgba(255, 200, 100, 0.6)`;
    } else {
        return `rgba(255, 100, 50, 0.6)`;
    }
}

function drawLabels() {
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#2d3748';
    ctx.textAlign = 'center';
    
    // Lid label
    ctx.fillText('Lid', beakerX + beakerWidth / 2, lidY - 10);
    
    // Water label
    ctx.fillText('Water', beakerX + beakerWidth / 2, waterLevel + 30);
}

function drawCondensation() {
    const tempDiff = waterTemp - airTemp;
    
    if (Math.abs(tempDiff) < 2) {
        // Equilibrium - no condensation
        return;
    }
    
    if (tempDiff < 0) {
        // Cold water - condensation on outside
        // MODIFIED: Draw droplets only on the portion of glass in contact with water (water level to bottom)
        drawOutsideDroplets();
    } else {
        // Hot water - condensation on inside
        // MODIFIED: Draw droplets in a single line on lid and inner walls above water line
        drawInsideDroplets();
    }
}

// MODIFIED FUNCTION: Droplets only appear from water level to bottom in a single line on outside
function drawOutsideDroplets() {
    const dropletSize = 6;
    const spacing = dropletSize * 2; // Spacing between droplets
    
    // Calculate the height of the water section (from water level to bottom)
    const waterSectionHeight = beakerY + beakerHeight - waterLevel;
    const numDroplets = Math.floor(waterSectionHeight / spacing);
    
    ctx.fillStyle = 'rgba(100, 150, 255, 0.8)';
    
    // Left side droplets - single line from water level to bottom
    for (let i = 0; i < numDroplets; i++) {
        const y = waterLevel + (i * spacing) + spacing / 2;
        const x = beakerX - dropletSize - 5; // Fixed distance from beaker
        drawDroplet(x, y, dropletSize);
    }
    
    // Right side droplets - single line from water level to bottom
    for (let i = 0; i < numDroplets; i++) {
        const y = waterLevel + (i * spacing) + spacing / 2;
        const x = beakerX + beakerWidth + dropletSize + 5; // Fixed distance from beaker
        drawDroplet(x, y, dropletSize);
    }
    
    // Label for droplets
    if (showLabels) {
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = '#2c5282';
        ctx.textAlign = 'left';
        ctx.fillText('Water Droplets', beakerX + beakerWidth + 20, waterLevel + 20);
    }
}

// MODIFIED FUNCTION: Droplets form a single continuous line on lid and inner walls, stick together
function drawInsideDroplets() {
    const dropletSize = 5;
    const spacing = dropletSize * 1.5; // Tight spacing to make droplets stick together
    
    ctx.fillStyle = 'rgba(100, 150, 255, 0.8)';
    
    // Droplets on underside of lid - single continuous line
    const numLidDroplets = Math.floor(beakerWidth / spacing);
    for (let i = 0; i < numLidDroplets; i++) {
        const x = beakerX + 10 + (i * spacing);
        const y = lidY + 8; // Fixed position just below lid
        drawDroplet(x, y, dropletSize);
    }
    
    // Droplets on inner walls above water - single continuous line on each wall
    const wallHeight = waterLevel - lidY - 20; // Height from lid to water level
    const numWallDroplets = Math.floor(wallHeight / spacing);
    
    // Left wall - single continuous line
    for (let i = 0; i < numWallDroplets; i++) {
        const y = lidY + 20 + (i * spacing);
        const x = beakerX + 8; // Fixed position on inner left wall
        drawDroplet(x, y, dropletSize * 0.8);
    }
    
    // Right wall - single continuous line
    for (let i = 0; i < numWallDroplets; i++) {
        const y = lidY + 20 + (i * spacing);
        const x = beakerX + beakerWidth - 8; // Fixed position on inner right wall
        drawDroplet(x, y, dropletSize * 0.8);
    }
    
    // Label for droplets
    if (showLabels) {
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = '#2c5282';
        ctx.textAlign = 'center';
        ctx.fillText('Water Droplets', beakerX + beakerWidth / 2, lidY + 25);
    }
}

function drawDroplet(x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add highlight for 3D effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(x - size / 3, y - size / 3, size / 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Reset fill style
    ctx.fillStyle = 'rgba(100, 150, 255, 0.8)';
}

// ===================================
// SIMULATION UPDATE FUNCTION
// ===================================

function updateSimulation() {
    // Draw the beaker and water
    drawBeaker();
    
    // Draw condensation based on temperature difference
    drawCondensation();
    
    // Update explanation panel
    updateExplanation();
    
    // Update reflection questions
    updateReflection();
}

function updateExplanation() {
    const tempDiff = waterTemp - airTemp;
    
    if (Math.abs(tempDiff) < 2) {
        // Equilibrium
        stateIndicator.textContent = '⚖️ State: Equilibrium';
        stateIndicator.style.color = '#718096';
        explanationText.textContent = 'No significant temperature difference exists between the water and air. No condensation occurs.';
    } else if (tempDiff < 0) {
        // Cold water
        stateIndicator.textContent = '❄️ State: Cold Water';
        stateIndicator.style.color = '#4299e1';
        explanationText.textContent = 'The water is cooler than the surrounding air. Water vapour in the air loses heat to the cool outer surface of the beaker and condenses into water droplets on the outside.';
    } else {
        // Hot water
        stateIndicator.textContent = '🔥 State: Hot Water';
        stateIndicator.style.color = '#e53e3e';
        explanationText.textContent = 'The water is hotter than the surrounding air. Water evaporates from the hot water. The warm water vapour loses heat to the cooler inner surfaces (lid and upper walls) and condenses into water droplets on the inside.';
    }
}

function updateReflection() {
    const tempDiff = waterTemp - airTemp;
    const questions = [];
    
    if (Math.abs(tempDiff) < 2) {
        questions.push('Why don\'t you see any water droplets when temperatures are equal?');
        questions.push('What would happen if you increased the water temperature by 10°C?');
    } else if (tempDiff < 0) {
        questions.push('Why do droplets form on the outside of the beaker?');
        questions.push('Where does the water vapour come from?');
        questions.push('What happens to the air\'s water vapour when it touches the cold beaker?');
    } else {
        questions.push('Why do droplets form on the inside of the beaker?');
        questions.push('Where does the water vapour inside the beaker come from?');
        questions.push('Why do droplets appear on the lid and not on the water surface?');
    }
    
    reflectionQuestions.innerHTML = '';
    questions.forEach(q => {
        const li = document.createElement('li');
        li.textContent = q;
        reflectionQuestions.appendChild(li);
    });
    
    reflectionPanel.classList.remove('hidden');
}

// ===================================
// EVENT LISTENERS
// ===================================

// Water temperature slider
waterTempSlider.addEventListener('input', (e) => {
    waterTemp = parseInt(e.target.value);
    waterTempValue.textContent = `${waterTemp}°C`;
    updateSimulation();
    logAction('Water temperature adjusted', `Water: ${waterTemp}°C, Air: ${airTemp}°C`);
});

// Touch support for water temperature slider
waterTempSlider.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const slider = e.target;
    const rect = slider.getBoundingClientRect();
    const percent = (touch.clientX - rect.left) / rect.width;
    const value = Math.round(percent * (slider.max - slider.min) + parseInt(slider.min));
    slider.value = Math.max(slider.min, Math.min(slider.max, value));
    waterTemp = parseInt(slider.value);
    waterTempValue.textContent = `${waterTemp}°C`;
    updateSimulation();
});

// Air temperature slider
airTempSlider.addEventListener('input', (e) => {
    airTemp = parseInt(e.target.value);
    airTempValue.textContent = `${airTemp}°C`;
    updateSimulation();
    logAction('Air temperature adjusted', `Water: ${waterTemp}°C, Air: ${airTemp}°C`);
});

// Touch support for air temperature slider
airTempSlider.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const slider = e.target;
    const rect = slider.getBoundingClientRect();
    const percent = (touch.clientX - rect.left) / rect.width;
    const value = Math.round(percent * (slider.max - slider.min) + parseInt(slider.min));
    slider.value = Math.max(slider.min, Math.min(slider.max, value));
    airTemp = parseInt(slider.value);
    airTempValue.textContent = `${airTemp}°C`;
    updateSimulation();
});

// Toggle labels button
toggleLabelsBtn.addEventListener('click', () => {
    showLabels = !showLabels;
    updateSimulation();
    logAction('Labels toggled', showLabels ? 'Labels shown' : 'Labels hidden');
});

// Reset button
resetBtn.addEventListener('click', () => {
    waterTemp = 30;
    airTemp = 30;
    waterTempSlider.value = 30;
    airTempSlider.value = 30;
    waterTempValue.textContent = '30°C';
    airTempValue.textContent = '30°C';
    showLabels = true;
    updateSimulation();
    logAction('Simulation reset', 'All values returned to default (30°C)');
});

// Toggle analytics button
toggleAnalyticsBtn.addEventListener('click', () => {
    analyticsPanel.classList.toggle('collapsed');
    const isCollapsed = analyticsPanel.classList.contains('collapsed');
    logAction('Analytics panel toggled', isCollapsed ? 'Panel hidden' : 'Panel shown');
});

// Clear log button
clearLogBtn.addEventListener('click', clearLog);

// Preset scenario buttons
document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const waterValue = parseInt(e.target.dataset.water);
        const airValue = parseInt(e.target.dataset.air);
        
        waterTemp = waterValue;
        airTemp = airValue;
        waterTempSlider.value = waterValue;
        airTempSlider.value = airValue;
        waterTempValue.textContent = `${waterValue}°C`;
        airTempValue.textContent = `${airValue}°C`;
        
        updateSimulation();
        logAction('Preset scenario applied', `${e.target.textContent}`);
    });
});

// Canvas hover for tooltips
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    let tooltipText = '';
    
    // Check if hovering over lid
    if (y >= lidY - 10 && y <= lidY + 10 && x >= beakerX - 10 && x <= beakerX + beakerWidth + 10) {
        tooltipText = 'Lid: Covers the beaker to trap water vapour inside';
    }
    // Check if hovering over water
    else if (y >= waterLevel && y <= beakerY + beakerHeight && x >= beakerX && x <= beakerX + beakerWidth) {
        tooltipText = `Water: ${waterTemp}°C - ${waterTemp < 25 ? 'Cold' : waterTemp < 75 ? 'Warm' : 'Hot'}`;
    }
    // Check if hovering over beaker walls
    else if (y >= lidY && y <= beakerY + beakerHeight && 
             ((x >= beakerX - 5 && x <= beakerX + 5) || (x >= beakerX + beakerWidth - 5 && x <= beakerX + beakerWidth + 5))) {
        tooltipText = 'Beaker: Glass container holding the water';
    }
    
    if (tooltipText) {
        tooltip.textContent = tooltipText;
        tooltip.style.left = `${e.clientX - rect.left + 15}px`;
        tooltip.style.top = `${e.clientY - rect.top + 15}px`;
        tooltip.classList.remove('hidden');
    } else {
        tooltip.classList.add('hidden');
    }
});

canvas.addEventListener('mouseleave', () => {
    tooltip.classList.add('hidden');
});

// Touch support for tooltips
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    let tooltipText = '';
    
    if (y >= lidY - 10 && y <= lidY + 10 && x >= beakerX - 10 && x <= beakerX + beakerWidth + 10) {
        tooltipText = 'Lid: Covers the beaker to trap water vapour inside';
    } else if (y >= waterLevel && y <= beakerY + beakerHeight && x >= beakerX && x <= beakerX + beakerWidth) {
        tooltipText = `Water: ${waterTemp}°C - ${waterTemp < 25 ? 'Cold' : waterTemp < 75 ? 'Warm' : 'Hot'}`;
    } else if (y >= lidY && y <= beakerY + beakerHeight && 
               ((x >= beakerX - 5 && x <= beakerX + 5) || (x >= beakerX + beakerWidth - 5 && x <= beakerX + beakerWidth + 5))) {
        tooltipText = 'Beaker: Glass container holding the water';
    }
    
    if (tooltipText) {
        tooltip.textContent = tooltipText;
        tooltip.style.left = `${touch.clientX - rect.left + 15}px`;
        tooltip.style.top = `${touch.clientY - rect.top + 15}px`;
        tooltip.classList.remove('hidden');
        
        setTimeout(() => {
            tooltip.classList.add('hidden');
        }, 3000);
    }
});

// ===================================
// INITIAL RENDER
// ===================================

updateSimulation();
logAction('Simulation initialized', 'Water: 30°C, Air: 30°C (Equilibrium)');