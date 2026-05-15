let currentTemp = 25;
let currentState = 1;
const ROOM_TEMP = 25;
const MIN_TEMP = 0;
const MAX_TEMP = 85;
const TEMP_STEP = 20;

let isAnimating = false;
let timeSpentInterval;

const analytics = {
    totalInteractions: 0,
    heatingActions: 0,
    coolingActions: 0,
    resetActions: 0,
    startTime: Date.now(),
    minTempReached: ROOM_TEMP,
    maxTempReached: ROOM_TEMP,
    activityLog: []
};

const tempValue = document.getElementById('tempValue');
const brassStrip = document.getElementById('brassStrip');
const ironStrip = document.getElementById('ironStrip');
const infoPanel = document.getElementById('infoPanel');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');
const stripContainer = document.querySelector('.strip-container');

const analyticsHeader = document.getElementById('analyticsHeader');
const analyticsContainer = document.querySelector('.analytics-container');
const totalInteractionsEl = document.getElementById('totalInteractions');
const heatingActionsEl = document.getElementById('heatingActions');
const coolingActionsEl = document.getElementById('coolingActions');
const resetActionsEl = document.getElementById('resetActions');
const explorationScoreEl = document.getElementById('explorationScore');
const timeSpentEl = document.getElementById('timeSpent');
const activityLogEl = document.getElementById('activityLog');
const clearLogBtn = document.getElementById('clearLogBtn');
const tempRangeFill = document.getElementById('tempRangeFill');
const minTempReachedEl = document.getElementById('minTempReached');
const maxTempReachedEl = document.getElementById('maxTempReached');

const stateInfo = {
    1: 'At room temperature, the bimetallic strip is straight.',
    2: 'When heated, the brass strip expands more than the iron strip, causing the bimetallic strip to bend.',
    3: 'When cooled, the brass strip contracts more than the iron strip, causing the bimetallic strip to bend in the opposite direction.'
};

function init() {
    updateDisplay();
    attachEventListeners();
    startTimeTracking();
    logActivity('Interactive started - Ready to explore!', 'log-info');
    updateAnalyticsDisplay();
}

function attachEventListeners() {
    increaseBtn.addEventListener('click', increaseTemperature);
    decreaseBtn.addEventListener('click', decreaseTemperature);
    resetBtn.addEventListener('click', resetTemperature);
    analyticsHeader.addEventListener('click', toggleAnalyticsPanel);
    clearLogBtn.addEventListener('click', clearActivityLog);
}

function setTemperature(nextTemp, source) {
    if (isAnimating || nextTemp === currentTemp) {
        return;
    }

    const oldTemp = currentTemp;
    currentTemp = Math.max(MIN_TEMP, Math.min(MAX_TEMP, nextTemp));

    if (currentTemp > ROOM_TEMP) {
        currentState = 2;
    } else if (currentTemp < ROOM_TEMP) {
        currentState = 3;
    } else {
        currentState = 1;
    }

    tempValue.textContent = currentTemp;
    updateInfoPanel();
    updateButtonStates();
    animateTemperature();
    animateStripBending(oldTemp, currentTemp);
    recordTemperatureChange(source, currentTemp, oldTemp);
}

function recordTemperatureChange(source, newTemp, oldTemp) {
    if (newTemp === oldTemp) {
        return;
    }

    analytics.totalInteractions++;
    analytics.minTempReached = Math.min(analytics.minTempReached, newTemp);
    analytics.maxTempReached = Math.max(analytics.maxTempReached, newTemp);

    if (source === 'increase') {
        analytics.heatingActions++;
        logActivity('Temperature increased to ' + newTemp + ' deg C (heating)', 'log-heating');
    } else if (source === 'decrease') {
        analytics.coolingActions++;
        logActivity('Temperature decreased to ' + newTemp + ' deg C (cooling)', 'log-cooling');
    } else if (source === 'reset') {
        analytics.resetActions++;
        logActivity('Temperature reset to room temperature (25 deg C)', 'log-reset');
    }

    updateAnalyticsDisplay();
}

function getExplorationScore() {
    const reachedCold = analytics.minTempReached <= MIN_TEMP;
    const changedTemperature = analytics.minTempReached < ROOM_TEMP || analytics.maxTempReached > ROOM_TEMP;
    const reachedHot = analytics.maxTempReached >= MAX_TEMP;
    return Number(reachedCold) + Number(changedTemperature) + Number(reachedHot);
}

function animateStripBending(startTemp, endTemp) {
    if (isAnimating) return;

    isAnimating = true;
    const duration = 1000;
    const startTime = performance.now();
    stripContainer.classList.add('animating');

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        const interpolatedTemp = startTemp + (endTemp - startTemp) * easeProgress;
        updateStripBendWithTemp(interpolatedTemp);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            updateStripBendWithTemp(endTemp);
            isAnimating = false;
            setTimeout(() => {
                stripContainer.classList.remove('animating');
            }, 100);
        }
    }

    requestAnimationFrame(animate);
}

function updateStripBendWithTemp(temp) {
    const startX = 50;
    const endX = 350;
    const centerY = 100;
    const stripLength = endX - startX;
    const tempDiff = temp - ROOM_TEMP;
    const maxBend = 50;
    const bendAmount = (tempDiff / 25) * maxBend;

    if (Math.abs(tempDiff) < 5) {
        brassStrip.setAttribute('d', 'M ' + startX + ' 90 L ' + endX + ' 90');
        ironStrip.setAttribute('d', 'M ' + startX + ' 110 L ' + endX + ' 110');
        return;
    }

    const controlY = centerY - bendAmount;
    const brassPath = 'M ' + startX + ' ' + (centerY - 10) + ' Q ' + (startX + stripLength / 2) + ' ' + (controlY - 10) + ' ' + endX + ' ' + (centerY - 10);
    const ironPath = 'M ' + startX + ' ' + (centerY + 10) + ' Q ' + (startX + stripLength / 2) + ' ' + (controlY + 10) + ' ' + endX + ' ' + (centerY + 10);

    brassStrip.setAttribute('d', brassPath);
    ironStrip.setAttribute('d', ironPath);
}

function increaseTemperature() {
    setTemperature(currentTemp + TEMP_STEP, 'increase');
}

function decreaseTemperature() {
    setTemperature(currentTemp - TEMP_STEP, 'decrease');
}

function resetTemperature() {
    setTemperature(ROOM_TEMP, 'reset');
}

function updateDisplay() {
    tempValue.textContent = currentTemp;
    updateStripBendWithTemp(currentTemp);
    updateInfoPanel();
    updateButtonStates();
    updateAnalyticsDisplay();
}

function updateInfoPanel() {
    const infoNumber = infoPanel.querySelector('.info-number');
    const infoText = infoPanel.querySelector('.info-text');

    infoNumber.textContent = currentState;
    infoText.textContent = stateInfo[currentState];

    if (currentState === 2) {
        infoPanel.style.background = '#ffebee';
    } else if (currentState === 3) {
        infoPanel.style.background = '#e3f2fd';
    } else {
        infoPanel.style.background = '#fff9c4';
    }
}

function updateButtonStates() {
    increaseBtn.disabled = currentTemp >= MAX_TEMP;
    decreaseBtn.disabled = currentTemp <= MIN_TEMP;
    resetBtn.disabled = currentTemp === ROOM_TEMP;
}

function animateTemperature() {
    const tempDisplay = document.querySelector('.temp-display');
    tempDisplay.classList.remove('animate');
    void tempDisplay.offsetWidth;
    tempDisplay.classList.add('animate');
    setTimeout(() => {
        tempDisplay.classList.remove('animate');
    }, 500);
}

function startTimeTracking() {
    timeSpentInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - analytics.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timeSpentEl.textContent = minutes > 0 ? (minutes + 'm ' + seconds + 's') : (seconds + 's');
    }, 1000);
}

function logActivity(message, logClass) {
    const elapsed = Math.floor((Date.now() - analytics.startTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    const timestamp = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry ' + (logClass || 'log-info');
    logEntry.innerHTML = '<span class="log-time">' + timestamp + '</span><span class="log-message">' + message + '</span>';
    activityLogEl.insertBefore(logEntry, activityLogEl.firstChild);

    analytics.activityLog.push({ timestamp, message, logClass: logClass || 'log-info' });
    if (activityLogEl.children.length > 50) {
        activityLogEl.removeChild(activityLogEl.lastChild);
    }
}

function updateAnalyticsDisplay() {
    totalInteractionsEl.textContent = analytics.totalInteractions;
    heatingActionsEl.textContent = analytics.heatingActions;
    coolingActionsEl.textContent = analytics.coolingActions;
    resetActionsEl.textContent = analytics.resetActions;
    timeSpentEl.textContent = timeSpentEl.textContent || '0s';
    minTempReachedEl.textContent = analytics.minTempReached + ' deg C';
    maxTempReachedEl.textContent = analytics.maxTempReached + ' deg C';

    const rangeExplored = analytics.maxTempReached - analytics.minTempReached;
    const totalRange = MAX_TEMP - MIN_TEMP;
    tempRangeFill.style.width = ((rangeExplored / totalRange) * 100) + '%';

    const explorationScore = getExplorationScore();
    explorationScoreEl.textContent = explorationScore + ' / 3';
    explorationScoreEl.setAttribute('data-score', String(explorationScore));
    explorationScoreEl.setAttribute('data-max', '3');
}

function toggleAnalyticsPanel() {
    analyticsContainer.classList.toggle('collapsed');
}

function clearActivityLog() {
    activityLogEl.innerHTML = '';
    analytics.activityLog = [];

    const initialEntry = document.createElement('div');
    initialEntry.className = 'log-entry log-info';
    initialEntry.innerHTML = '<span class="log-time">00:00:00</span><span class="log-message">Interactive started - Ready to explore!</span>';
    activityLogEl.appendChild(initialEntry);
    logActivity('Activity log cleared', 'log-info');
}

function detectIframe() {
    if (window.self !== window.top) {
        document.body.classList.add('iframe');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    detectIframe();
    init();
});

window.addEventListener('resize', () => {
    updateDisplay();
});

window.addEventListener('beforeunload', () => {
    if (timeSpentInterval) {
        clearInterval(timeSpentInterval);
    }
});
