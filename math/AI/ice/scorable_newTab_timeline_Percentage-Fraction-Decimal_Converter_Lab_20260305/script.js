// ===== GLOBAL VARIABLES =====
let currentMode = 'percentage';
let startTime = Date.now();
let actionCount = 0;
let compareValues = [];
let currentTask = 0;

// ADDED: Variables to track task completion
let currentTaskData = null;
let taskAttempts = [];

// Structured attempt log — every Convert against a task is recorded here.
// Exposed on window so the xAPI IIFE can include it in buildFeedback / buildPayload.
let quizLog = [];
window.__quizLog = quizLog;

// ADDED: Variable to track tooltip visibility state
let isTooltipVisible = true;

// Investigation tasks for guided discovery - ENHANCED with structured data
const investigationTasks = [
    {
        description: "Try to find three different fractions that equal 0.5 (50%)",
        targetDecimal: 0.5,
        targetPercentage: 50,
        type: "multiple_fractions",
        requiredAttempts: 3,
        hint: "Remember: 1/2, 2/4, 3/6 are all equivalent fractions!"
    },
    {
        description: "What percentage equals 3/4? Can you express it as a decimal?",
        targetFraction: {numerator: 3, denominator: 4},
        targetPercentage: 75,
        targetDecimal: 0.75,
        type: "find_percentage",
        hint: "Try entering the fraction 3/4 and clicking Convert!"
    },
    {
        description: "Find a fraction that equals 0.25. How many equivalent fractions can you find?",
        targetDecimal: 0.25,
        targetPercentage: 25,
        type: "multiple_fractions",
        requiredAttempts: 2,
        hint: "Start with 1/4, then try 2/8, 3/12..."
    },
    {
        description: "Convert 0.75 to a percentage and fraction. What pattern do you notice?",
        targetDecimal: 0.75,
        targetPercentage: 75,
        type: "convert_decimal",
        hint: "Enter 0.75 in the Decimal input and click Convert!"
    },
    {
        description: "What decimal equals 1/3? Why does it have repeating digits?",
        targetFraction: {numerator: 1, denominator: 3},
        targetDecimal: 0.333,
        type: "find_decimal",
        tolerance: 0.01,
        hint: "Enter the fraction 1/3 and see what decimal you get!"
    },
    {
        description: "Find three fractions between 0.25 and 0.5",
        minDecimal: 0.25,
        maxDecimal: 0.5,
        type: "range_fractions",
        requiredAttempts: 3,
        hint: "Try fractions like 3/10, 2/5, or 7/20"
    },
    {
        description: "What happens when you convert 100% to a fraction and decimal?",
        targetPercentage: 100,
        targetDecimal: 1,
        type: "convert_percentage",
        hint: "Set the percentage slider to 100% and click Convert!"
    },
    {
        description: "Can you find a fraction that equals 0.6? Simplify it.",
        targetDecimal: 0.6,
        targetPercentage: 60,
        type: "find_and_simplify",
        expectedSimplified: {numerator: 3, denominator: 5},
        hint: "Try 6/10 first, then use the Simplify button!"
    }
];

// ===== UTILITY FUNCTIONS =====

// Calculate GCD for fraction simplification
function gcd(a, b) {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Simplify fraction
function simplifyFraction(numerator, denominator) {
    const divisor = gcd(numerator, denominator);
    return {
        numerator: numerator / divisor,
        denominator: denominator / divisor
    };
}

// Convert decimal to fraction
function decimalToFraction(decimal) {
    // Handle whole numbers
    if (decimal % 1 === 0) {
        return { numerator: decimal, denominator: 1 };
    }
    
    // Count decimal places
    let decimalStr = decimal.toString();
    let decimalPlaces = decimalStr.split('.')[1]?.length || 0;
    
    let numerator = decimal * Math.pow(10, decimalPlaces);
    let denominator = Math.pow(10, decimalPlaces);
    
    return simplifyFraction(numerator, denominator);
}

// Get elapsed time since start
function getElapsedTime() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return `t=${elapsed}s`;
}

// Log action to analytics panel
function logAction(action, value = '') {
    actionCount++;
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span class="log-time">${getElapsedTime()}</span>
        <span class="log-action">${action}</span>
        ${value ? `<span class="log-value">${value}</span>` : ''}
    `;
    
    const actionLog = document.getElementById('action-log');
    actionLog.insertBefore(logEntry, actionLog.firstChild);
    
    // Keep only last 50 entries
    while (actionLog.children.length > 50) {
        actionLog.removeChild(actionLog.lastChild);
    }
}

// ADDED: Function to check if current conversion matches the task
function checkTaskCompletion(result) {
    if (!currentTaskData) return;
    
    const task = currentTaskData;
    const feedback = document.getElementById('task-feedback');
    let isMatch = false;
    let feedbackMessage = '';
    
    // Check based on task type
    switch(task.type) {
        case 'multiple_fractions':
            // Check if the result matches the target
            const tolerance = task.tolerance || 0.01;
            if (Math.abs(result.decimal - task.targetDecimal) < tolerance) {
                // Check if this fraction is new (not already attempted)
                const fractionKey = `${result.fraction.numerator}/${result.fraction.denominator}`;
                if (!taskAttempts.includes(fractionKey)) {
                    taskAttempts.push(fractionKey);
                    isMatch = true;
                    
                    if (taskAttempts.length >= task.requiredAttempts) {
                        feedbackMessage = `🎉 Excellent! You found ${taskAttempts.length} different fractions: ${taskAttempts.join(', ')}`;
                        feedback.className = 'task-feedback success';
                    } else {
                        feedbackMessage = `✓ Good! Found ${taskAttempts.length}/${task.requiredAttempts}: ${taskAttempts.join(', ')}. Keep going!`;
                        feedback.className = 'task-feedback attempt';
                    }
                } else {
                    feedbackMessage = `You already found ${fractionKey}. Try a different equivalent fraction!`;
                    feedback.className = 'task-feedback hint';
                }
            } else {
                feedbackMessage = `Not quite. This equals ${result.decimal.toFixed(3)}, but you need ${task.targetDecimal}`;
                feedback.className = 'task-feedback hint';
            }
            break;
            
        case 'find_percentage':
        case 'convert_decimal':
        case 'convert_percentage':
            // Check if all values match
            const percentMatch = Math.abs(result.percentage - task.targetPercentage) < 0.1;
            const decimalMatch = Math.abs(result.decimal - task.targetDecimal) < 0.01;
            
            if (percentMatch && decimalMatch) {
                isMatch = true;
                feedbackMessage = `🎉 Perfect! ${result.percentage.toFixed(1)}% = ${result.fraction.numerator}/${result.fraction.denominator} = ${result.decimal.toFixed(4)}`;
                feedback.className = 'task-feedback success';
                highlightMatchingResults();
            } else {
                feedbackMessage = `Keep trying! You got ${result.percentage.toFixed(1)}%`;
                feedback.className = 'task-feedback attempt';
            }
            break;
            
        case 'find_decimal':
            const decTolerance = task.tolerance || 0.01;
            if (Math.abs(result.decimal - task.targetDecimal) < decTolerance) {
                isMatch = true;
                feedbackMessage = `🎉 Correct! ${result.fraction.numerator}/${result.fraction.denominator} = ${result.decimal.toFixed(4)} (repeating!)`;
                feedback.className = 'task-feedback success';
                highlightMatchingResults();
            } else {
                feedbackMessage = `Try entering the fraction ${task.targetFraction.numerator}/${task.targetFraction.denominator}`;
                feedback.className = 'task-feedback hint';
            }
            break;
            
        case 'range_fractions':
            if (result.decimal > task.minDecimal && result.decimal < task.maxDecimal) {
                const fractionKey = `${result.fraction.numerator}/${result.fraction.denominator}`;
                if (!taskAttempts.includes(fractionKey)) {
                    taskAttempts.push(fractionKey);
                    isMatch = true;
                    
                    if (taskAttempts.length >= task.requiredAttempts) {
                        feedbackMessage = `🎉 Great work! You found ${taskAttempts.length} fractions in range: ${taskAttempts.join(', ')}`;
                        feedback.className = 'task-feedback success';
                    } else {
                        feedbackMessage = `✓ Good! ${taskAttempts.length}/${task.requiredAttempts} found: ${taskAttempts.join(', ')}`;
                        feedback.className = 'task-feedback attempt';
                    }
                } else {
                    feedbackMessage = `You already found ${fractionKey}. Try another!`;
                    feedback.className = 'task-feedback hint';
                }
            } else {
                feedbackMessage = `${result.decimal.toFixed(2)} is outside the range (${task.minDecimal} to ${task.maxDecimal})`;
                feedback.className = 'task-feedback hint';
            }
            break;
            
        case 'find_and_simplify':
            const targetMatch = Math.abs(result.decimal - task.targetDecimal) < 0.01;
            const isSimplified = result.fraction.numerator === task.expectedSimplified.numerator && 
                               result.fraction.denominator === task.expectedSimplified.denominator;
            
            if (targetMatch && isSimplified) {
                isMatch = true;
                feedbackMessage = `🎉 Perfect! 0.6 = ${result.fraction.numerator}/${result.fraction.denominator} (simplified!)`;
                feedback.className = 'task-feedback success';
                highlightMatchingResults();
            } else if (targetMatch && !isSimplified) {
                feedbackMessage = `✓ Correct value! Now try simplifying the fraction using the Simplify button.`;
                feedback.className = 'task-feedback attempt';
            } else {
                feedbackMessage = `Not quite. Try a fraction that equals 0.6 (or 60%)`;
                feedback.className = 'task-feedback hint';
            }
            break;
    }
    
    feedback.textContent = feedbackMessage;

    // ── Structured quiz / task attempt log for xAPI feedback ──────────────
    // Only record when the student deliberately clicks Convert or Simplify.
    // Passive updates (slider moves, every keystroke) are intentionally skipped
    // to avoid logging intermediate/incomplete values like "2" when typing "25".
    if (window.__quizLogIntent) {
        // Capture exactly what the student entered in the active input
        let _studentInput = '';
        if (currentMode === 'percentage') {
            _studentInput = (parseFloat(document.getElementById('percentage-number').value) || 0) + '%';
        } else if (currentMode === 'fraction') {
            const _n = parseInt(document.getElementById('numerator').value) || 0;
            const _d = parseInt(document.getElementById('denominator').value) || 1;
            _studentInput = _n + '/' + _d;
        } else {
            _studentInput = String(parseFloat(document.getElementById('decimal-number').value) || 0);
        }

        // Build a human-readable target string from the task definition
        let _target = '';
        if (task.minDecimal != null) {
            _target = 'Any value between ' + task.minDecimal + ' and ' + task.maxDecimal;
        } else {
            if (task.targetPercentage != null) _target += task.targetPercentage + '%';
            if (task.targetFraction)          _target += (_target ? ' = ' : '') + task.targetFraction.numerator + '/' + task.targetFraction.denominator;
            if (task.targetDecimal   != null) _target += (_target ? ' = ' : '') + task.targetDecimal;
        }
        if (task.requiredAttempts) _target += ' (' + task.requiredAttempts + ' unique answers required)';

        // What the conversion actually produced
        const _studentResult =
            result.fraction.numerator + '/' + result.fraction.denominator +
            ' = ' + result.decimal.toFixed(4) +
            ' = ' + result.percentage.toFixed(2) + '%';

        quizLog.push({
            taskNumber:      currentTask + 1,
            taskType:        task.type,
            taskDescription: task.description,
            inputMode:       currentMode,
            studentInput:    _studentInput,
            studentResult:   _studentResult,
            targetAnswer:    _target || '(see task description)',
            isMatch:         isMatch,
            feedback:        feedbackMessage,
            timestamp:       new Date().toISOString()
        });

        // Keep xAPI score in sync: correct intentional attempts / total intentional attempts
        window.__xapiQuizState = {
            score: quizLog.filter(function(e) { return e.isMatch; }).length,
            max:   quizLog.length
        };

        // Trigger xAPI flush so the SLS timeline captures every attempt in real time
        if (typeof window.__xapiFlushNow === 'function') window.__xapiFlushNow('quiz-attempt', 400);
    }
    // ──────────────────────────────────────────────────────────────────────

    if (isMatch) {
        logAction('✅ Task progress', feedbackMessage);
    }
}

// ADDED: Highlight matching results with animation
function highlightMatchingResults() {
    document.querySelectorAll('.result-value').forEach(el => {
        el.classList.add('match-highlight');
        setTimeout(() => el.classList.remove('match-highlight'), 1000);
    });
}

// ADDED: Load a new task
function loadNewTask(taskIndex) {
    currentTask = taskIndex;
    currentTaskData = investigationTasks[taskIndex];
    taskAttempts = [];
    
    // Update task description
    document.getElementById('task-description').textContent = currentTaskData.description;
    
    // Clear feedback
    const feedback = document.getElementById('task-feedback');
    feedback.textContent = '';
    feedback.className = 'task-feedback';
    
    // Add visual cue to convert button
    document.getElementById('convert-btn').classList.add('highlight');
    
    logAction('🔍 New task loaded', `Task ${taskIndex + 1}: ${currentTaskData.description.substring(0, 50)}...`);
}

// ===== VISUALIZATION FUNCTIONS =====

function drawVisualization(percentage) {
    const canvas = document.getElementById('visualization-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const containerWidth = canvas.parentElement.offsetWidth - 20;
    canvas.width = containerWidth;
    canvas.height = 160;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw 10x10 grid (100 squares)
    const gridSize = 10;
    const squareSize = Math.min((canvas.width - 40) / gridSize, 14);
    const startX = (canvas.width - (squareSize * gridSize)) / 2;
    const startY = 10;
    
    const filledSquares = Math.round(percentage);
    
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const index = i * gridSize + j;
            const x = startX + j * squareSize;
            const y = startY + i * squareSize;
            
            // Determine if this square should be filled
            if (index < filledSquares) {
                ctx.fillStyle = '#667eea';
            } else {
                ctx.fillStyle = '#e2e8f0';
            }
            
            ctx.fillRect(x, y, squareSize - 1, squareSize - 1);
            
            // Add border
            ctx.strokeStyle = '#cbd5e0';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, squareSize - 1, squareSize - 1);
        }
    }
    
    // Draw percentage bar below grid
    const barY = startY + (gridSize * squareSize) + 15;
    const barWidth = squareSize * gridSize;
    const barHeight = 20;
    
    // Background bar
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(startX, barY, barWidth, barHeight);
    
    // Filled bar
    ctx.fillStyle = '#48bb78';
    ctx.fillRect(startX, barY, (barWidth * percentage) / 100, barHeight);
    
    // Border
    ctx.strokeStyle = '#cbd5e0';
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, barY, barWidth, barHeight);
    
    // Text label
    ctx.fillStyle = '#2d3748';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${percentage.toFixed(1)}%`, canvas.width / 2, barY + barHeight + 15);
    
    // Draw compare values if in compare mode
    if (document.getElementById('compare-mode').checked && compareValues.length > 0) {
        drawCompareMarkers(ctx, startX, barY, barWidth, barHeight);
    }
}

function drawCompareMarkers(ctx, startX, barY, barWidth, barHeight) {
    compareValues.forEach((value, index) => {
        const position = startX + (barWidth * value) / 100;
        
        // Draw marker line
        ctx.strokeStyle = '#f56565';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(position, barY - 5);
        ctx.lineTo(position, barY + barHeight + 5);
        ctx.stroke();
        
        // Draw marker label
        ctx.fillStyle = '#f56565';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${value.toFixed(1)}%`, position, barY - 10);
    });
}

// ===== CONVERSION FUNCTIONS =====

function convertFromPercentage(percentage) {
    const decimal = percentage / 100;
    const fraction = decimalToFraction(decimal);
    
    return {
        percentage: percentage,
        decimal: decimal,
        fraction: fraction
    };
}

function convertFromFraction(numerator, denominator) {
    if (denominator === 0) {
        return null;
    }
    
    const decimal = numerator / denominator;
    const percentage = decimal * 100;
    const simplified = simplifyFraction(numerator, denominator);
    
    return {
        percentage: percentage,
        decimal: decimal,
        fraction: simplified
    };
}

function convertFromDecimal(decimal) {
    const percentage = decimal * 100;
    const fraction = decimalToFraction(decimal);
    
    return {
        percentage: percentage,
        decimal: decimal,
        fraction: fraction
    };
}

// ===== UPDATE DISPLAY FUNCTIONS =====

function updateDisplay(result) {
    if (!result) {
        alert('Invalid input! Denominator cannot be zero.');
        logAction('❌ Error', 'Invalid input - denominator is zero');
        return;
    }
    
    // Update result displays
    document.getElementById('result-percentage').textContent = 
        `${result.percentage.toFixed(2)}%`;
    document.getElementById('result-fraction').textContent = 
        `${result.fraction.numerator}/${result.fraction.denominator}`;
    document.getElementById('result-decimal').textContent = 
        result.decimal.toFixed(4);
    
    // Update visualization
    drawVisualization(result.percentage);
    
    // Update explanation
    updateExplanation(result);
    
    // ADDED: Check if this matches the current task
    checkTaskCompletion(result);
}

function updateExplanation(result) {
    const explanationText = document.getElementById('explanation-text');
    
    let explanation = `${result.percentage.toFixed(1)}% means ${result.percentage.toFixed(1)} out of 100. `;
    explanation += `This equals ${result.fraction.numerator}/${result.fraction.denominator} `;
    explanation += `or ${result.decimal.toFixed(4)} in decimal form.`;
    
    // Add special cases
    if (result.percentage === 50) {
        explanation += ` This is exactly half!`;
    } else if (result.percentage === 25) {
        explanation += ` This is one quarter!`;
    } else if (result.percentage === 75) {
        explanation += ` This is three quarters!`;
    } else if (result.percentage === 100) {
        explanation += ` This represents a whole or complete amount!`;
    } else if (result.percentage === 0) {
        explanation += ` This represents nothing or zero!`;
    }
    
    explanationText.textContent = explanation;
}

// ===== EVENT HANDLERS =====

// ADDED: Tooltip close button functionality
document.getElementById('tooltip-close-btn').addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event bubbling
    const tooltip = document.getElementById('header-tooltip');
    
    if (isTooltipVisible) {
        // Hide the tooltip
        tooltip.classList.add('hidden');
        isTooltipVisible = false;
        logAction('ℹ️ Tooltip hidden', 'User closed the header tooltip');
    }
});

// ADDED: Optional - Click anywhere on tooltip to hide it (alternative interaction)
document.getElementById('header-tooltip').addEventListener('click', function(e) {
    // Only trigger if clicking the tooltip itself, not the close button
    if (e.target.id === 'header-tooltip' || e.target.id === 'tooltip-text') {
        const tooltip = document.getElementById('header-tooltip');
        
        if (isTooltipVisible) {
            tooltip.classList.add('hidden');
            isTooltipVisible = false;
            logAction('ℹ️ Tooltip hidden', 'User clicked tooltip to hide');
        }
    }
});

// Mode switching
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Hide all input sections
        document.querySelectorAll('.input-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected input section
        currentMode = this.dataset.mode;
        document.getElementById(`${currentMode}-input`).classList.add('active');
        
        logAction('🔄 Mode changed', `to ${currentMode}`);
    });
});

// Percentage slider and number input sync
const percentageSlider = document.getElementById('percentage-slider');
const percentageNumber = document.getElementById('percentage-number');

percentageSlider.addEventListener('input', function() {
    percentageNumber.value = this.value;
    const result = convertFromPercentage(parseFloat(this.value));
    updateDisplay(result);
    logAction('🎚️ Slider moved', `${this.value}%`);
});

percentageNumber.addEventListener('input', function() {
    const value = Math.max(0, Math.min(100, parseFloat(this.value) || 0));
    this.value = value;
    percentageSlider.value = value;
    const result = convertFromPercentage(value);
    updateDisplay(result);
    logAction('⌨️ Number input', `${value}%`);
});

// Touch support for slider
percentageSlider.addEventListener('touchstart', function(e) {
    logAction('👆 Touch started', 'on slider');
});

percentageSlider.addEventListener('touchend', function(e) {
    logAction('👆 Touch ended', `at ${this.value}%`);
});

// Fraction inputs
const numeratorInput = document.getElementById('numerator');
const denominatorInput = document.getElementById('denominator');

numeratorInput.addEventListener('input', function() {
    logAction('⌨️ Numerator changed', this.value);
});

denominatorInput.addEventListener('input', function() {
    logAction('⌨️ Denominator changed', this.value);
});

// Simplify fraction button
document.getElementById('simplify-btn').addEventListener('click', function() {
    const numerator = parseInt(numeratorInput.value) || 0;
    const denominator = parseInt(denominatorInput.value) || 1;
    
    const simplified = simplifyFraction(numerator, denominator);
    numeratorInput.value = simplified.numerator;
    denominatorInput.value = simplified.denominator;
    
    logAction('🔢 Fraction simplified', `${simplified.numerator}/${simplified.denominator}`);
    
    // ADDED: Auto-convert after simplifying to check task completion
    const result = convertFromFraction(simplified.numerator, simplified.denominator);
    // Simplify is also a deliberate action — record it in the quiz log
    window.__quizLogIntent = true;
    updateDisplay(result);
    window.__quizLogIntent = false;
});

// Decimal input
const decimalInput = document.getElementById('decimal-number');

decimalInput.addEventListener('input', function() {
    logAction('⌨️ Decimal input', this.value);
});

// Convert button - ENHANCED with task checking
document.getElementById('convert-btn').addEventListener('click', function() {
    let result;

    switch(currentMode) {
        case 'percentage':
            const percentage = parseFloat(percentageNumber.value) || 0;
            result = convertFromPercentage(percentage);
            logAction('✅ Converted from percentage', `${percentage}%`);
            break;

        case 'fraction':
            const numerator = parseInt(numeratorInput.value) || 0;
            const denominator = parseInt(denominatorInput.value) || 1;
            result = convertFromFraction(numerator, denominator);
            logAction('✅ Converted from fraction', `${numerator}/${denominator}`);
            break;

        case 'decimal':
            const decimal = parseFloat(decimalInput.value) || 0;
            result = convertFromDecimal(decimal);
            logAction('✅ Converted from decimal', decimal);
            break;
    }

    // Flag as an intentional attempt so checkTaskCompletion logs it to quizLog
    window.__quizLogIntent = true;
    updateDisplay(result);
    window.__quizLogIntent = false;
});

// Reset button
document.getElementById('reset-btn').addEventListener('click', function() {
    percentageSlider.value = 50;
    percentageNumber.value = 50;
    numeratorInput.value = 1;
    denominatorInput.value = 2;
    decimalInput.value = 0.5;
    
    const result = convertFromPercentage(50);
    updateDisplay(result);
    
    compareValues = [];
    
    logAction('🔄 Reset', 'All values reset to defaults');
});

// New task button - ENHANCED
document.getElementById('new-task-btn').addEventListener('click', function() {
    const nextTask = (currentTask + 1) % investigationTasks.length;
    loadNewTask(nextTask);
});

// Compare mode
const compareModeCheckbox = document.getElementById('compare-mode');
const compareDisplay = document.getElementById('compare-display');

compareModeCheckbox.addEventListener('change', function() {
    if (this.checked) {
        compareDisplay.classList.remove('compare-hidden');
        logAction('📊 Compare mode', 'enabled');
    } else {
        compareDisplay.classList.add('compare-hidden');
        compareValues = [];
        drawVisualization(parseFloat(percentageNumber.value));
        logAction('📊 Compare mode', 'disabled');
    }
});

// Add compare value
document.getElementById('add-compare-btn').addEventListener('click', function() {
    const compareValue = parseFloat(document.getElementById('compare-value').value);
    
    if (!isNaN(compareValue) && compareValue >= 0 && compareValue <= 100) {
        compareValues.push(compareValue);
        drawVisualization(parseFloat(percentageNumber.value));
        document.getElementById('compare-value').value = '';
        logAction('➕ Added compare value', `${compareValue}%`);
    } else {
        alert('Please enter a valid percentage between 0 and 100');
        logAction('❌ Invalid compare value', compareValue);
    }
});

// Analytics controls
document.getElementById('toggle-analytics-btn').addEventListener('click', function() {
    const analyticsPanel = document.getElementById('analytics-panel');
    analyticsPanel.classList.toggle('collapsed');
    
    if (analyticsPanel.classList.contains('collapsed')) {
        this.textContent = '▲ Show';
    } else {
        this.textContent = '▼ Hide';
    }
});

document.getElementById('clear-log-btn').addEventListener('click', function() {
    document.getElementById('action-log').innerHTML = '';
    actionCount = 0;
    startTime = Date.now();
    logAction('🗑️ Log cleared', 'Analytics reset');
});

// ===== INITIALIZATION =====

function initialize() {
    // Check if in iframe or standalone
    if (window.self !== window.top) {
        // In iframe - use 450px height
        document.getElementById('main-container').style.height = '450px';
    } else {
        // Standalone - use 90vh
        document.body.classList.add('fullscreen');
    }
    
    // Initialize with default values
    const result = convertFromPercentage(50);
    updateDisplay(result);
    
    // MODIFIED: Load first task with enhanced system
    loadNewTask(0);
    
    // Log initialization
    logAction('🚀 Interactive loaded', 'Ready to explore');
    
    // Handle window resize for canvas
    window.addEventListener('resize', function() {
        const currentPercentage = parseFloat(percentageNumber.value);
        drawVisualization(currentPercentage);
    });
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}