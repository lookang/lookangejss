// Global state management
let currentTemp = 25; // Room temperature in Celsius
let currentState = 1; // 1: room temp, 2: heated, 3: cooled
const ROOM_TEMP = 25;
const MIN_TEMP = 0;
const MAX_TEMP = 85;
const TEMP_STEP = 20;

// Track if animation is currently running to prevent overlapping animations
let isAnimating = false;

// NEW: Analytics tracking variables
let analytics = {
    totalInteractions: 0,
    heatingActions: 0,
    coolingActions: 0,
    resetActions: 0,
    sliderUses: 0,
    startTime: Date.now(),
    minTempReached: 25,
    maxTempReached: 25,
    activityLog: []
};

// NEW: Timer for tracking time spent
let timeSpentInterval;

// DOM element references
const tempValue = document.getElementById('tempValue');
const brassStrip = document.getElementById('brassStrip');
const ironStrip = document.getElementById('ironStrip');
const infoPanel = document.getElementById('infoPanel');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');
const stripContainer = document.querySelector('.strip-container');

// NEW: Temperature slider DOM reference
const tempSlider = document.getElementById('tempSlider');
const sliderValue = document.getElementById('sliderValue');

// NEW: Analytics DOM references
const analyticsHeader = document.getElementById('analyticsHeader');
const toggleAnalytics = document.getElementById('toggleAnalytics');
const analyticsContainer = document.querySelector('.analytics-container');
const analyticsContent = document.getElementById('analyticsContent');
const totalInteractionsEl = document.getElementById('totalInteractions');
const heatingActionsEl = document.getElementById('heatingActions');
const coolingActionsEl = document.getElementById('coolingActions');
const resetActionsEl = document.getElementById('resetActions');
const sliderUsesEl = document.getElementById('sliderUses');
const timeSpentEl = document.getElementById('timeSpent');
const activityLogEl = document.getElementById('activityLog');
const clearLogBtn = document.getElementById('clearLogBtn');
const tempRangeFill = document.getElementById('tempRangeFill');
const minTempReachedEl = document.getElementById('minTempReached');
const maxTempReachedEl = document.getElementById('maxTempReached');

// Information text for each state
const stateInfo = {
    1: "At room temperature, the bimetallic strip is straight.",
    2: "When heated, the brass strip expands more than the iron strip, causing the bimetallic strip to bend.",
    3: "When cooled, the brass strip contracts more than the iron strip, causing the bimetallic strip to bend in the opposite direction."
};

/**
 * Initialize the interactive on page load
 */
function init() {
    updateDisplay();
    attachEventListeners();
    startTimeTracking(); // NEW: Start tracking time spent
    logActivity('Interactive started - Ready to explore!', 'log-info'); // NEW: Initial log entry
}

/**
 * Attach event listeners to control buttons
 */
function attachEventListeners() {
    increaseBtn.addEventListener('click', increaseTemperature);
    decreaseBtn.addEventListener('click', decreaseTemperature);
    resetBtn.addEventListener('click', resetTemperature);
    
    // NEW: Temperature slider event listener
    tempSlider.addEventListener('input', handleSliderInput);
    
    // NEW: Analytics toggle event listener
    analyticsHeader.addEventListener('click', toggleAnalyticsPanel);
    
    // NEW: Clear log button event listener
    clearLogBtn.addEventListener('click', clearActivityLog);
}

/**
 * NEW: Handle temperature slider input with real-time updates
 */
function handleSliderInput(event) {
    if (!isAnimating) {
        const oldTemp = currentTemp;
        const newTemp = parseInt(event.target.value);
        
        // Update slider value display
        sliderValue.textContent = `${newTemp}°C`;
        
        // Only proceed if temperature actually changed
        if (newTemp !== currentTemp) {
            currentTemp = newTemp;
            
            // Update state based on temperature
            if (currentTemp > ROOM_TEMP) {
                currentState = 2; // Heated state
            } else if (currentTemp < ROOM_TEMP) {
                currentState = 3; // Cooled state
            } else {
                currentState = 1; // Room temperature state
            }
            
            // Update display elements
            tempValue.textContent = currentTemp;
            updateInfoPanel();
            updateButtonStates();
            animateTemperature();
            
            // Animate the strip bending
            animateStripBending(oldTemp, currentTemp);
            
            // NEW: Track analytics for slider use
            trackSliderUse(newTemp);
        }
    }
}

/**
 * NEW: Track slider usage in analytics
 */
function trackSliderUse(newTemp) {
    analytics.sliderUses++;
    analytics.totalInteractions++;
    
    // Update min/max temperature reached
    if (newTemp < analytics.minTempReached) {
        analytics.minTempReached = newTemp;
    }
    if (newTemp > analytics.maxTempReached) {
        analytics.maxTempReached = newTemp;
    }
    
    // Log activity
    let actionType = 'log-slider';
    let message = `Slider adjusted to ${newTemp}°C`;
    
    if (newTemp > ROOM_TEMP) {
        message += ' (heating)';
        actionType = 'log-heating';
    } else if (newTemp < ROOM_TEMP) {
        message += ' (cooling)';
        actionType = 'log-cooling';
    }
    
    logActivity(message, actionType);
    updateAnalyticsDisplay();
}

/**
 * MODIFIED: Animate the strip bending from current position to target position
 * This creates a smooth transition showing the bending process
 * @param {number} startTemp - Starting temperature
 * @param {number} endTemp - Ending temperature
 */
function animateStripBending(startTemp, endTemp) {
    // Prevent overlapping animations
    if (isAnimating) return;
    
    isAnimating = true;
    const duration = 1000; // Animation duration in milliseconds
    const startTime = performance.now();
    
    // Add glow effect during animation
    stripContainer.classList.add('animating');
    
    /**
     * Animation frame function using requestAnimationFrame for smooth animation
     */
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Clamp to 1
        
        // Use easeInOutCubic for smooth acceleration and deceleration
        const easeProgress = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        // Interpolate temperature between start and end
        const interpolatedTemp = startTemp + (endTemp - startTemp) * easeProgress;
        
        // Update strip bend based on interpolated temperature
        updateStripBendWithTemp(interpolatedTemp);
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Animation complete - ensure final position is exact
            updateStripBendWithTemp(endTemp);
            isAnimating = false;
            
            // Remove glow effect after animation
            setTimeout(() => {
                stripContainer.classList.remove('animating');
            }, 100);
        }
    }
    
    // Start the animation
    requestAnimationFrame(animate);
}

/**
 * Helper function to update strip bend based on a specific temperature value
 * Separated from updateStripBend() to allow animation interpolation
 * @param {number} temp - Temperature value to calculate bend for
 */
function updateStripBendWithTemp(temp) {
    const startX = 50;
    const endX = 350;
    const centerY = 100;
    const stripLength = endX - startX;
    
    // Calculate bend amount based on temperature difference from room temp
    const tempDiff = temp - ROOM_TEMP;
    const maxBend = 50; // Maximum vertical displacement
    const bendAmount = (tempDiff / 25) * maxBend; // Normalize to max bend
    
    if (Math.abs(tempDiff) < 5) {
        // Straight strip at room temperature with both layers visible
        const brassPath = `M ${startX} 90 L ${endX} 90`;
        const ironPath = `M ${startX} 110 L ${endX} 110`;
        
        brassStrip.setAttribute('d', brassPath);
        ironStrip.setAttribute('d', ironPath);
    } else {
        // Calculate quadratic curve for bent strip
        const controlY = centerY - bendAmount;
        
        // Brass layer (top, expands more) - outer curve
        const brassPath = `M ${startX} ${centerY - 10} Q ${startX + stripLength/2} ${controlY - 10} ${endX} ${centerY - 10}`;
        
        // Iron layer (bottom, expands less) - inner curve
        const ironPath = `M ${startX} ${centerY + 10} Q ${startX + stripLength/2} ${controlY + 10} ${endX} ${centerY + 10}`;
        
        brassStrip.setAttribute('d', brassPath);
        ironStrip.setAttribute('d', ironPath);
    }
}

/**
 * MODIFIED: Increase temperature and animate the bending
 * Now triggers smooth bending animation every time temperature changes
 * ENHANCED: Added analytics tracking
 */
function increaseTemperature() {
    if (currentTemp < MAX_TEMP && !isAnimating) {
        const oldTemp = currentTemp;
        
        currentTemp += TEMP_STEP;
        if (currentTemp > MAX_TEMP) currentTemp = MAX_TEMP;
        
        // Update state based on temperature
        if (currentTemp > ROOM_TEMP) {
            currentState = 2; // Heated state
        }
        
        // Update display elements (except strip, which will be animated)
        tempValue.textContent = currentTemp;
        tempSlider.value = currentTemp; // NEW: Sync slider
        sliderValue.textContent = `${currentTemp}°C`; // NEW: Sync slider display
        updateInfoPanel();
        updateButtonStates();
        animateTemperature();
        
        // Animate the strip bending from old to new temperature
        animateStripBending(oldTemp, currentTemp);
        
        // NEW: Track analytics
        trackHeatingAction(currentTemp);
    }
}

/**
 * NEW: Track heating action in analytics
 */
function trackHeatingAction(newTemp) {
    analytics.heatingActions++;
    analytics.totalInteractions++;
    
    // Update max temperature reached
    if (newTemp > analytics.maxTempReached) {
        analytics.maxTempReached = newTemp;
    }
    
    logActivity(`Temperature increased to ${newTemp}°C (heating)`, 'log-heating');
    updateAnalyticsDisplay();
}

/**
 * MODIFIED: Decrease temperature and animate the bending
 * Now triggers smooth bending animation every time temperature changes
 * ENHANCED: Added analytics tracking
 */
function decreaseTemperature() {
    if (currentTemp > MIN_TEMP && !isAnimating) {
        const oldTemp = currentTemp;
        
        currentTemp -= TEMP_STEP;
        if (currentTemp < MIN_TEMP) currentTemp = MIN_TEMP;
        
        // Update state based on temperature
        if (currentTemp < ROOM_TEMP) {
            currentState = 3; // Cooled state
        } else if (currentTemp === ROOM_TEMP) {
            currentState = 1; // Room temperature state
        }
        
        // Update display elements (except strip, which will be animated)
        tempValue.textContent = currentTemp;
        tempSlider.value = currentTemp; // NEW: Sync slider
        sliderValue.textContent = `${currentTemp}°C`; // NEW: Sync slider display
        updateInfoPanel();
        updateButtonStates();
        animateTemperature();
        
        // Animate the strip bending from old to new temperature
        animateStripBending(oldTemp, currentTemp);
        
        // NEW: Track analytics
        trackCoolingAction(currentTemp);
    }
}

/**
 * NEW: Track cooling action in analytics
 */
function trackCoolingAction(newTemp) {
    analytics.coolingActions++;
    analytics.totalInteractions++;
    
    // Update min temperature reached
    if (newTemp < analytics.minTempReached) {
        analytics.minTempReached = newTemp;
    }
    
    logActivity(`Temperature decreased to ${newTemp}°C (cooling)`, 'log-cooling');
    updateAnalyticsDisplay();
}

/**
 * MODIFIED: Reset temperature to room temperature with animation
 * Now animates the strip returning to straight position
 * ENHANCED: Added analytics tracking
 */
function resetTemperature() {
    if (!isAnimating) {
        const oldTemp = currentTemp;
        
        currentTemp = ROOM_TEMP;
        currentState = 1;
        
        // Update display elements (except strip, which will be animated)
        tempValue.textContent = currentTemp;
        tempSlider.value = currentTemp; // NEW: Sync slider
        sliderValue.textContent = `${currentTemp}°C`; // NEW: Sync slider display
        updateInfoPanel();
        updateButtonStates();
        animateTemperature();
        
        // Animate the strip returning to straight position
        animateStripBending(oldTemp, currentTemp);
        
        // NEW: Track analytics
        trackResetAction();
    }
}

/**
 * NEW: Track reset action in analytics
 */
function trackResetAction() {
    analytics.resetActions++;
    analytics.totalInteractions++;
    
    logActivity('Temperature reset to room temperature (25°C)', 'log-reset');
    updateAnalyticsDisplay();
}

/**
 * Update all display elements based on current state
 */
function updateDisplay() {
    // Update temperature display
    tempValue.textContent = currentTemp;
    
    // NEW: Update slider position
    tempSlider.value = currentTemp;
    sliderValue.textContent = `${currentTemp}°C`;
    
    // Update bimetallic strip visualization
    updateStripBend();
    
    // Update information panel
    updateInfoPanel();
    
    // Update button states
    updateButtonStates();
}

/**
 * Calculate and update the bending of the bimetallic strip
 * Now uses the helper function for consistency
 */
function updateStripBend() {
    updateStripBendWithTemp(currentTemp);
}

/**
 * Update the information panel with current state description
 */
function updateInfoPanel() {
    const infoNumber = infoPanel.querySelector('.info-number');
    const infoText = infoPanel.querySelector('.info-text');
    
    infoNumber.textContent = currentState;
    infoText.textContent = stateInfo[currentState];
    
    // Update panel color based on state
    if (currentState === 2) {
        infoPanel.style.background = '#ffebee'; // Light red for heated
    } else if (currentState === 3) {
        infoPanel.style.background = '#e3f2fd'; // Light blue for cooled
    } else {
        infoPanel.style.background = '#fff9c4'; // Light yellow for room temp
    }
}

/**
 * Enable/disable buttons based on temperature limits
 */
function updateButtonStates() {
    // Disable increase button at max temperature
    increaseBtn.disabled = currentTemp >= MAX_TEMP;
    
    // Disable decrease button at min temperature
    decreaseBtn.disabled = currentTemp <= MIN_TEMP;
    
    // Disable reset button at room temperature
    resetBtn.disabled = currentTemp === ROOM_TEMP;
}

/**
 * Add pulse animation to temperature display
 */
function animateTemperature() {
    const tempDisplay = document.querySelector('.temp-display');
    tempDisplay.classList.remove('animate');
    
    // Trigger reflow to restart animation
    void tempDisplay.offsetWidth;
    
    tempDisplay.classList.add('animate');
    
    // Remove animation class after completion
    setTimeout(() => {
        tempDisplay.classList.remove('animate');
    }, 500);
}

/**
 * NEW: Start tracking time spent on the interactive
 */
function startTimeTracking() {
    timeSpentInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - analytics.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        if (minutes > 0) {
            timeSpentEl.textContent = `${minutes}m ${seconds}s`;
        } else {
            timeSpentEl.textContent = `${seconds}s`;
        }
    }, 1000);
}

/**
 * NEW: Log activity to the activity log with timestamp
 */
function logActivity(message, logClass = 'log-info') {
    const elapsed = Math.floor((Date.now() - analytics.startTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    
    const timestamp = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Create log entry
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${logClass}`;
    logEntry.innerHTML = `
        <span class="log-time">${timestamp}</span>
        <span class="log-message">${message}</span>
    `;
    
    // Add to log (prepend to show newest first)
    activityLogEl.insertBefore(logEntry, activityLogEl.firstChild);
    
    // Store in analytics
    analytics.activityLog.push({ timestamp, message, logClass });
    
    // Limit log entries to 50 to prevent performance issues
    if (activityLogEl.children.length > 50) {
        activityLogEl.removeChild(activityLogEl.lastChild);
    }
}

/**
 * NEW: Update analytics display with current values
 */
function updateAnalyticsDisplay() {
    totalInteractionsEl.textContent = analytics.totalInteractions;
    heatingActionsEl.textContent = analytics.heatingActions;
    coolingActionsEl.textContent = analytics.coolingActions;
    resetActionsEl.textContent = analytics.resetActions;
    sliderUsesEl.textContent = analytics.sliderUses;
    
    // Update temperature range exploration
    minTempReachedEl.textContent = `${analytics.minTempReached}°C`;
    maxTempReachedEl.textContent = `${analytics.maxTempReached}°C`;
    
    // Calculate temperature range fill percentage
    const rangeExplored = analytics.maxTempReached - analytics.minTempReached;
    const totalRange = MAX_TEMP - MIN_TEMP;
    const fillPercentage = (rangeExplored / totalRange) * 100;
    tempRangeFill.style.width = `${fillPercentage}%`;
}

/**
 * NEW: Toggle analytics panel visibility
 */
function toggleAnalyticsPanel() {
    analyticsContainer.classList.toggle('collapsed');
}

/**
 * NEW: Clear activity log
 */
function clearActivityLog() {
    // Keep only the initial entry
    const initialEntry = activityLogEl.querySelector('.log-entry');
    activityLogEl.innerHTML = '';
    
    // Add back initial entry
    const newInitialEntry = document.createElement('div');
    newInitialEntry.className = 'log-entry log-info';
    newInitialEntry.innerHTML = `
        <span class="log-time">00:00:00</span>
        <span class="log-message">Interactive started - Ready to explore!</span>
    `;
    activityLogEl.appendChild(newInitialEntry);
    
    // Clear stored log (keep initial entry)
    analytics.activityLog = [];
    
    logActivity('Activity log cleared', 'log-info');
}

/**
 * Detect if running in iframe and adjust styling
 */
function detectIframe() {
    if (window.self !== window.top) {
        document.body.classList.add('iframe');
    }
}

// Initialize the interactive when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    detectIframe();
    init();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    updateDisplay();
});

// NEW: Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (timeSpentInterval) {
        clearInterval(timeSpentInterval);
    }
});